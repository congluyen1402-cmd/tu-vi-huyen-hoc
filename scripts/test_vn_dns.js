const dns = require('dns').promises;

const dnsServers = [
  { name: 'Google', ip: '8.8.8.8' },
  { name: 'Cloudflare', ip: '1.1.1.1' },
  { name: 'VNPT', ip: '203.162.0.181' },
  { name: 'Viettel', ip: '203.113.131.1' },
  { name: 'FPT', ip: '210.245.24.20' }
];

async function testAll() {
  for (const s of dnsServers) {
    try {
      dns.setServers([s.ip]);
      const apex = await dns.resolve4('xemtuvihuyenhoc.com').catch(e => e.message);
      const www = await dns.resolve4('www.xemtuvihuyenhoc.com').catch(e => e.message);
      console.log(`[${s.name} - ${s.ip}]`);
      console.log('  apex (xemtuvihuyenhoc.com):', apex);
      console.log('  www (www.xemtuvihuyenhoc.com):', www);
    } catch(err) {
      console.log(`[${s.name}] Error:`, err.message);
    }
  }
}

testAll();

