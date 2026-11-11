async function inspectSites() {
  try {
    const r1 = await fetch('https://tuvi.vn/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
    console.log('tuvi.vn status:', r1.status);
    const html1 = await r1.text();
    console.log('tuvi.vn length:', html1.length);
  } catch(e) {
    console.log('tuvi.vn error:', e.message);
  }

  try {
    const r2 = await fetch('https://xem.tracuutuvi.com/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
    console.log('xem.tracuutuvi.com status:', r2.status);
    const html2 = await r2.text();
    console.log('xem.tracuutuvi.com length:', html2.length);
  } catch(e) {
    console.log('xem.tracuutuvi.com error:', e.message);
  }
}

inspectSites();

