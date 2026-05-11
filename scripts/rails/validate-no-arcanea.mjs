#!/usr/bin/env node
/**
 * Bans Arcanea / Vel'Tara / Guardian / SIP / SIS / frequency-Hz mythology
 * from the contemplative rails. The rails sit in the FrankX-clean register
 * (per CLAUDE.md feedback_frankx_brand_clean): Arcanean mythology lives in
 * /ultraworld and the Arcanea repo, never on the rails.
 *
 * Run: node scripts/rails/validate-no-arcanea.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';

const BANNED = [
  'Arcanea', 'Vel\'Tara', 'Vel\'Thaan', 'Eldrian', 'Guardian',
  'Luminor', 'Shinkami', 'Lumina', 'SIP', 'SIS', 'Arcanean',
  '174Hz', '285Hz', '396Hz', '417Hz', '528Hz',
  '639Hz', '741Hz', '852Hz', '963Hz', '1111Hz',
  'Soul Frequency', 'Soulbook',
];

const errors = [];
const files = await glob('content/{rails,canon}/**/*.md', { cwd: process.cwd() });

for (const f of files) {
  const txt = fs.readFileSync(path.join(process.cwd(), f), 'utf8');
  for (const term of BANNED) {
    const re = new RegExp(`\\b${term.replace(/'/g, "\\'")}\\b`, 'i');
    if (re.test(txt)) {
      errors.push(`${f}: contains banned term "${term}" — rails stay FrankX-clean`);
    }
  }
}

if (errors.length) {
  console.error('Rail Arcanea-leak check FAILED:\n' + errors.map((e) => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log('✓ No Arcanea mythology leaks in rails');
