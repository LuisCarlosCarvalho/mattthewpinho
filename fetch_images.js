const fs = require('fs');

async function go() {
  const r = await fetch('https://matthewpinhomedia.myportfolio.com/work');
  const t = await r.text();
  const imgs = [...t.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => m[1]);
  const alts = [...t.matchAll(/<img[^>]+alt="([^"]*)"/g)].map(m => m[1]);
  console.log(imgs.filter(i => i.includes('format=format')));
}
go();
