async function fetchTuViVn(tc) {
  const params = new URLSearchParams({
    name: tc.name,
    dayOfDOB: tc.day.toString(),
    monthOfDOB: tc.month.toString(),
    yearOfDOB: tc.year.toString(),
    calendar: tc.isSolar ? 'true' : 'false',
    hourOfDOB: tc.hour.toString(),
    minOfDOB: tc.min.toString(),
    gender: (tc.gender === 'nam') ? 'true' : 'false',
    viewYear: '2026',
    viewMonth: '1'
  });

  const res = await fetch('https://tuvi.vn/la-so', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0'
    },
    body: params.toString()
  });

  return await res.text();
}

async function run() {
  const cases = [
    { name: 'Tran Cong Luyen', day: 10, month: 4, year: 2002, hour: 19, min: 30, gender: 'nam', isSolar: true },
    { name: 'Nguyen Thi Mai', day: 15, month: 8, year: 1995, hour: 6, min: 15, gender: 'nu', isSolar: true },
    { name: 'Pham Thu Huong', day: 20, month: 11, year: 1988, hour: 22, min: 30, gender: 'nu', isSolar: true },
    { name: 'Hoang Van Bach', day: 12, month: 9, year: 1977, hour: 11, min: 15, gender: 'nam', isSolar: true }
  ];

  for (const c of cases) {
    console.log(`\n=== CASE: ${c.name} (${c.gender}) ===`);
    const html = await fetchTuViVn(c);
    for (let p = 0; p < 12; p++) {
      const cIdx = html.indexOf(`id="cung${p}"`);
      if (cIdx !== -1) {
        const chunk = html.slice(cIdx, cIdx + 20000);
        const mTH = chunk.match(/khoi-tieu-han[^"]*"[^>]*>([\s\S]*?)<\/div>/);
        const mKNH = chunk.match(/id="KNH\d+"[^>]*>([\s\S]*?)<\/p>/);
        const tieuHan = mTH ? mTH[1].replace(/<[^>]+>/g, '').trim() : '';
        const thangHan = mKNH ? mKNH[1].trim() : '';
        console.log(`Palace ${p}: tieuHan = "${tieuHan}", thangHan = "${thangHan}"`);
      }
    }
  }
}

run().catch(console.error);

