const fs = require('fs');

async function testKNH() {
  for (const year of ['2024', '2025', '2026']) {
    const params = new URLSearchParams({
      name: 'Test',
      dayOfDOB: '10',
      monthOfDOB: '4',
      yearOfDOB: '2002',
      calendar: 'true',
      hourOfDOB: '19',
      minOfDOB: '30',
      gender: 'true',
      viewYear: year,
      viewMonth: '1'
    });

    const res = await fetch('https://tuvi.vn/la-so', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });
    const html = await res.text();
    const knh1 = html.match(/id="KNH1">([^<]*)</)?.[1];
    const knh5 = html.match(/id="KNH5">([^<]*)</)?.[1];
    console.log(`Year ${year}: KNH1=${knh1}, KNH5=${knh5}`);
  }
}

testKNH();

