const https = require('https');

async function testLive() {
  const res = await fetch('https://www.xemtuvihuyenhoc.com/');
  const html = await res.text();
  console.log('HTML length:', html.length);
  
  // Find stylesheets
  const linkMatches = html.match(/href="([^"]+\.css[^"]*)"/g) || [];
  console.log('Stylesheets:', linkMatches);
  
  for (const lm of linkMatches) {
    const url = lm.replace('href="', '').replace('"', '');
    const fullUrl = url.startsWith('http') ? url : `https://www.xemtuvihuyenhoc.com${url.startsWith('/') ? '' : '/'}${url}`;
    try {
      const cssRes = await fetch(fullUrl);
      console.log(`CSS ${fullUrl} -> Status: ${cssRes.status}, Content-Type: ${cssRes.headers.get('content-type')}`);
    } catch (e) {
      console.log(`CSS ${fullUrl} -> ERROR:`, e.message);
    }
  }

  // Find scripts
  const scriptMatches = html.match(/src="([^"]+\.js[^"]*)"/g) || [];
  console.log('Scripts:', scriptMatches);
  for (const sm of scriptMatches.slice(0, 5)) {
    const url = sm.replace('src="', '').replace('"', '');
    const fullUrl = url.startsWith('http') ? url : `https://www.xemtuvihuyenhoc.com${url.startsWith('/') ? '' : '/'}${url}`;
    try {
      const sRes = await fetch(fullUrl);
      console.log(`Script ${fullUrl} -> Status: ${sRes.status}, Content-Type: ${sRes.headers.get('content-type')}`);
    } catch (e) {
      console.log(`Script ${fullUrl} -> ERROR:`, e.message);
    }
  }
}

testLive();

