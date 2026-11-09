const { spawn } = require('child_process');

async function runAudit() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9222/json/list').then(r => r.json());
    const page = listRes.find(p => p.type === 'page');
    if (!page) throw new Error('No page target found');

    const ws = new WebSocket(page.webSocketDebuggerUrl);
    let id = 1;
    const pending = new Map();

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        pending.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    const consoleLogs = [];
    const longTasks = [];
    const requests = [];

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        pending.get(msg.id).resolve(msg.result);
        pending.delete(msg.id);
      } else if (msg.method) {
        if (msg.method === 'Runtime.consoleAPICalled') {
          const type = msg.params.type;
          const text = msg.params.args.map(a => a.value || a.description || '').join(' ');
          consoleLogs.push({ type, text, location: msg.params.stackTrace ? msg.params.stackTrace.callFrames[0] : null });
        } else if (msg.method === 'Log.entryAdded') {
          consoleLogs.push({ type: msg.params.entry.level, text: msg.params.entry.text, source: msg.params.entry.source });
        } else if (msg.method === 'Network.responseReceived') {
          requests.push({
            url: msg.params.response.url,
            status: msg.params.response.status,
            mimeType: msg.params.response.mimeType,
            headers: msg.params.response.headers
          });
        }
      }
    };

    await new Promise((resolve) => ws.onopen = resolve);

    // Enable domains
    await send('Page.enable');
    await send('Network.enable');
    await send('Runtime.enable');
    await send('Log.enable');

    // Throttling: Slow 4G (500kbps, 400ms RTT)
    await send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 400,
      downloadThroughput: (500 * 1024) / 8,
      uploadThroughput: (500 * 1024) / 8,
      connectionType: 'cellular3g'
    });

    // CPU Throttling: 4x slowdown
    await send('Emulation.setCPUThrottlingRate', { rate: 4 });

    // Inject PerformanceObserver for long tasks before navigation
    await send('Page.addScriptToEvaluateOnNewDocument', {
      source: `
        window.__longTasks = [];
        try {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              window.__longTasks.push({
                name: entry.name,
                duration: entry.duration,
                startTime: entry.startTime,
                attribution: entry.attribution ? entry.attribution.map(a => ({ name: a.name, containerType: a.containerType, containerSrc: a.containerSrc })) : []
              });
            }
          });
          observer.observe({ entryTypes: ['longtask'] });
        } catch(e) {}
      `
    });

    console.log('Navigating to http://localhost:8080/ with Slow 4G + 4x CPU slowdown...');
    await send('Page.navigate', { url: 'http://localhost:8080/' });

    // Wait for load and animations
    await new Promise(r => setTimeout(r, 7000));

    // Evaluate long tasks collected
    const evalRes = await send('Runtime.evaluate', {
      expression: 'JSON.stringify(window.__longTasks || [])',
      returnByValue: true
    });
    const capturedLongTasks = JSON.parse(evalRes.result.value || '[]');

    console.log('\n=============================================');
    console.log('=== SLOW 4G + 4X CPU THROTTLING AUDIT ===');
    console.log('=============================================');
    console.log(`Total Requests Loaded in 7s: ${requests.length}`);
    console.log(`Console Logs / Warnings / Errors Recorded: ${consoleLogs.length}`);
    
    console.log('\n--- Console Errors & Warnings ---');
    const warningsErrors = consoleLogs.filter(l => ['error', 'warning', 'warn'].includes(l.type));
    if (warningsErrors.length === 0) {
      console.log('No console errors or warnings recorded on initial page load.');
    } else {
      warningsErrors.forEach(l => {
        console.log(`[${l.type.toUpperCase()}] ${l.text}`);
      });
    }

    console.log('\n--- Main Long Tasks (duration > 50ms under 4x CPU) ---');
    console.log(`Total Long Tasks detected: ${capturedLongTasks.length}`);
    capturedLongTasks.sort((a,b) => b.duration - a.duration).forEach((lt, idx) => {
      console.log(`${idx + 1}. Duration: ${lt.duration.toFixed(1)} ms at ${lt.startTime.toFixed(0)} ms (attribution: ${JSON.stringify(lt.attribution)})`);
    });

    ws.close();
  } catch (err) {
    console.error('Audit failed:', err);
  } finally {
    chromeProcess.kill();
  }
}

runAudit();
