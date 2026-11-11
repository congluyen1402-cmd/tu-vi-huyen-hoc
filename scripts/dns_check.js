const dns = require('dns').promises;

async function checkDNS() {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
  
  console.log('--- Apex Domain: xemtuvihuyenhoc.com ---');
  try {
    const a = await dns.resolve4('xemtuvihuyenhoc.com');
    console.log('A records:', a);
  } catch (e) { console.log('A error:', e.message); }

  try {
    const ns = await dns.resolveNs('xemtuvihuyenhoc.com');
    console.log('NS records:', ns);
  } catch (e) { console.log('NS error:', e.message); }

  try {
    const txt = await dns.resolveTxt('xemtuvihuyenhoc.com');
    console.log('TXT records:', txt);
  } catch (e) { console.log('TXT error:', e.message); }

  console.log('--- Subdomain: www.xemtuvihuyenhoc.com ---');
  try {
    const cname = await dns.resolveCname('www.xemtuvihuyenhoc.com');
    console.log('CNAME records:', cname);
  } catch (e) { console.log('CNAME error:', e.message); }

  try {
    const aWww = await dns.resolve4('www.xemtuvihuyenhoc.com');
    console.log('www A records:', aWww);
  } catch (e) { console.log('www A error:', e.message); }
}

checkDNS();

