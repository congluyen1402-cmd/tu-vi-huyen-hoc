async function testTuViVnPost() {
  const params = new URLSearchParams({
    name: 'Test 2002',
    dayOfDOB: '10',
    monthOfDOB: '4',
    yearOfDOB: '2002',
    calendar: 'true',
    hourOfDOB: '19',
    minOfDOB: '30',
    gender: 'true',
    viewYear: '2026',
    viewMonth: '1'
  });

  const res = await fetch('https://tuvi.vn/la-so', {
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
  require('fs').writeFileSync('scripts/tuvivn_result.html', html, 'utf8');
  console.log('Saved to scripts/tuvivn_result.html');
}

testTuViVnPost();

