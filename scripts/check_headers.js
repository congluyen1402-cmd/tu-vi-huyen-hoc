async function checkHeaders() {
  const r1 = await fetch('https://xemtuvihuyenhoc.com', { redirect: 'manual' });
  console.log('--- Apex Domain Headers ---');
  console.log('Status:', r1.status);
  for (const [k, v] of r1.headers.entries()) {
    console.log(`${k}: ${v}`);
  }

  const r2 = await fetch('https://www.xemtuvihuyenhoc.com');
  console.log('\n--- www Domain Headers ---');
  console.log('Status:', r2.status);
  for (const [k, v] of r2.headers.entries()) {
    console.log(`${k}: ${v}`);
  }
}

checkHeaders();

