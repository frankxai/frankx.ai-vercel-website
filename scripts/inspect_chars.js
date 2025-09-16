const fs = require('fs');
const file = process.argv[2];
const needle = process.argv[3] || '';
const s = fs.readFileSync(file, 'utf8');
let i = 0;
if (needle) {
  i = s.indexOf(needle);
  console.log('indexOf needle', i);
}
const seg = s.slice(i, i + 200);
console.log(seg);
let out = '';
for (const ch of seg) {
  out += `${ch}[${ch.codePointAt(0).toString(16)}] `;
}
console.log(out);

