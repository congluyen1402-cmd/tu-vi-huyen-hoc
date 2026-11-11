async function inspectTuViVn() {
  const r = await fetch('https://tuvi.vn/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await r.text();
  const form = html.match(/<form[\s\S]*?action=["']\/la-so["'][\s\S]*?<\/form>/i)?.[0] || '';
  console.log('Form action="/la-so":');
  const inputs = [...form.matchAll(/<(input|select|textarea)[^>]*name=["']([^"']*)["'][^>]*>/gi)];
  inputs.forEach(inp => console.log(inp[0]));
}

inspectTuViVn();

