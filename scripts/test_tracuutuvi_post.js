const fs = require('fs');

async function testTraCuuTuViPost() {
  const params = new URLSearchParams({
    from: '',
    full_name: 'Test 2002',
    gender: '1', // Nam
    lich: '1',   // Dương
    hour: '19',
    minute: '30',
    day: '10',
    month: '4',
    year: '2002',
    year_view: '2026',
    month_view: '1'
  });

  const res = await fetch('https://xem.tracuutuvi.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    },
    body: params.toString()
  });

  console.log('Status:', res.status);
  const html = await res.text();
  console.log('HTML Length:', html.length);
  fs.writeFileSync('scripts/tracuutuvi_result.html', html, 'utf8');
  console.log('Saved to scripts/tracuutuvi_result.html');
}

testTraCuuTuViPost();

