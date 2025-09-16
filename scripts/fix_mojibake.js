const fs = require('fs');

function fixContent(s) {
  const REPL = '\uFFFD'; // replacement char
  // Common artifacts seen: REPL + '?' + '"' (dash-like), REPL + '?', REPL + '^z'
  return s
    .replace(new RegExp(REPL + '\\?"', 'g'), ' — ')
    .replace(new RegExp(REPL + '\\?', 'g'), ' — ')
    .replace(new RegExp(REPL + '\\^z', 'g'), '∞');
}

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/fix_mojibake.js <file>');
  process.exit(1);
}
const raw = fs.readFileSync(file, 'utf8');
const fixed = fixContent(raw);
if (fixed !== raw) {
  fs.writeFileSync(file, fixed, 'utf8');
  console.log('Fixed mojibake in', file);
} else {
  console.log('No changes for', file);
}

