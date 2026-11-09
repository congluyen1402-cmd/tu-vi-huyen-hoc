const { spawn } = require('child_process');
const http = require('http');

async function run() {
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
    console.log('Chrome opened targets:', listRes.length);

    const wsUrl = listRes[0].webSocketDebuggerUrl;
    const WebSocket = require('ws'); // wait, let's see if ws is installed
  } catch (e) {
    console.log('Error:', e.message);
  } finally {
    chromeProcess.kill();
  }
}

run();
