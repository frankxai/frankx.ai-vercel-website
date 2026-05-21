#!/usr/bin/env node
/**
 * Generate the 4 strategic hub heroes via NB2 / NB Pro.
 *
 * Per the 2026-05-03 design audit:
 *   - library/library-os-hero       (Library OS flagship)
 *   - library/library-collection-hero (book-spines abstract)
 *   - watch/watch-os-hero           (recording corner)
 *   - workshops/workshop-os-hero    (mid-session room)
 *
 * Uses scripts/lib/nb-image.mjs which auto-loads GEMINI_API_KEY from
 * ~/Arcanea/.env.local. Each prompt is design-thinking compliant
 * (## CONCEPT / ## ART DIRECTION / ## PALETTE / ## LIGHTING / ## NEGATIVE).
 *
 * Run: node scripts/generate-hub-heroes.mjs
 *
 * Skip flag (skip individual heroes):
 *   SKIP=watch-os-hero,workshop-os-hero node scripts/generate-hub-heroes.mjs
 */
import { resolve } from 'node:path';
import { generateImage } from './lib/nb-image.mjs';

const HEROES = [
  {
    slug: 'library-os-hero',
    outputDir: 'public/images/library',
    aspect: '16:9',
    prompt: `## CONCEPT
Library OS flagship hero — a personal book intelligence system on a creator's
working desk. The moment where a finished book becomes a permanent asset.

## ART DIRECTION
Late-night studio. Single warm pool of light from a desk lamp at upper-right;
deep neutral shadows everywhere else. 35mm equivalent, slight depth-of-field
on the foreground spine. A stack of 5-7 hardcover books, varied heights, one
open with subtle margin notes visible (no readable copy). A laptop in the
back corner glowing softly. Notebook + pen alongside. Rule-of-thirds.

## PALETTE
Foundation void (#0a0a0b). Warm cream lamplight (#E8DDD0). Book spines
oxblood, deep teal, faded olive. One emerald accent (laptop text indicator).
NO amber-soul, no purple bias.

## LIGHTING
Single-source warm tungsten ~3000K. Hard fall-off into shadow. Real-photographed
quality, not AI-glow.

## NEGATIVE
No people, no faces, no AI-perfect skin, no brand logos, no Kindle/iPad UI,
no stock-photo bookshelf, no string lights, no over-saturated colors, no neon.`,
  },
  {
    slug: 'library-collection-hero',
    outputDir: 'public/images/library',
    aspect: '16:9',
    prompt: `## CONCEPT
Library index hero — a row of 7-9 hardcover book spines, edge-on, photographed
from below at a shallow angle so the spines arc slightly upward. Catalog as
collection. Companion to library-os-hero but more abstract.

## ART DIRECTION
Camera position: slightly below shelf level, looking up at a shallow 12°
angle. Books fill the frame width. Each spine a different color but all in
the deep-jewel palette (no bright yellows, no neon). Subtle gradient of
warm rim-light from upper-right grazing across the spines, picking up
embossed type detail (illegible, just texture). Background falls into pure
void above the books.

## PALETTE
Foundation void (#0a0a0b) above and below. Spines: deep oxblood, forest
emerald, navy, faded olive, ochre, charcoal, plum, burnt orange. One spine
in cream as visual accent. Rim light warm cream (#E8DDD0).

## LIGHTING
Single warm-cream rim from upper-right at 30°. Falloff to deep shadow on
spine fronts. Texture (cloth weave, leather grain, foil-stamped letters)
visible but never sharp.

## NEGATIVE
No labels readable, no brand logos, no library-stock-photo feel, no modern
paperback covers, no white background, no library-of-congress dome, no
people, no hands.`,
  },
  {
    slug: 'watch-os-hero',
    outputDir: 'public/images/watch',
    aspect: '16:9',
    prompt: `## CONCEPT
Watch hub hero — a creator's recording corner just before the camera rolls.
The set is ready, no human visible, but the room knows what is coming.

## ART DIRECTION
Two professional studio key lights bouncing onto a fabric-textured deep-grey
wall. A single dark wooden chair, slightly off-center. Teleprompter glowing
softly outside the main camera line. Camera tripod silhouette far-frame-right,
out of focus. 35mm full-frame, mid-shot wide. Composition diagonal: lights
upper-left → chair center → camera lower-right.

## PALETTE
Foundation void (#0a0a0b). Cool tungsten primary (#FFE4B5 from key lights),
slight emerald rim from a phantom screen. Wall texture in charcoal #2a2a2e.
Studio cinematic.

## LIGHTING
Three-point but only key + fill visible; rim is implied. Soft falloff. Hint
of bounce light from below the chair, not from above.

## NEGATIVE
No people, no faces, no logos, no script visible on teleprompter, no Apple
products visible, no podcast-stock-photo aesthetic, no purple/pink lighting,
no bookshelf in background, no plant decor, no LED strips.`,
  },
  {
    slug: 'workshop-os-hero',
    outputDir: 'public/images/workshops',
    aspect: '16:9',
    prompt: `## CONCEPT
Workshop hub hero — a working room mid-session. The composition signals
"we are in the middle of building something together," not "we are about
to perform."

## ART DIRECTION
Wide table photographed from a slightly elevated 3/4 angle. Five-to-seven
laptops and open notebooks spread across, varied — some with frameworks
sketched, some closed. One large whiteboard at the head of the frame with
half-drawn structure (boxes, arrows — readable as architecture but not
readable as copy). Late-afternoon golden light through a tall window
slanting across the table. Empty chairs (the people just stepped out).

## PALETTE
Warm late-afternoon (3500K). Wood tabletop in walnut. Notebook covers in
muted forest green / oxblood / cream — varied. Whiteboard pure-white but
weathered. Laptop screens off or showing low-detail abstract shapes (no
readable UI, no logos). Single soft amber accent from the window light.

## LIGHTING
Strong directional sunlight from camera-right window. Long warm shadows
to camera-left. Practical fill from indoor ceiling, dimmed. Hint of dust
in the light beam.

## NEGATIVE
No people, no faces, no presentation slide visible, no specific brands,
no MacBook glowing-Apple-logo, no fairy lights, no plants in foreground,
no stock-photo "team meeting" composition, no glass-walled-corporate-office
feel.`,
  },
];

const SKIP = (process.env.SKIP || '').split(',').filter(Boolean);
const ROOT = resolve(process.cwd());

console.log(`Generating ${HEROES.length - SKIP.length} of ${HEROES.length} hub heroes via NB Pro (2K).`);
console.log(`Skipping: ${SKIP.length ? SKIP.join(', ') : 'none'}`);
console.log('');

let ok = 0;
let fail = 0;

for (const hero of HEROES) {
  if (SKIP.includes(hero.slug)) {
    console.log(`⊘ skip ${hero.slug}`);
    continue;
  }

  const out = resolve(ROOT, hero.outputDir, hero.slug + '.webp');
  console.log(`\n→ Generating ${hero.slug}...`);
  console.log(`   output: ${out}`);
  try {
    const result = await generateImage({
      prompt: hero.prompt,
      outputPath: out,
      model: 'nbpro', // NB Pro for hero quality
      aspectRatio: hero.aspect,
      imageSize: '2K',
      verbose: true,
    });
    console.log(`✓ ${result.path}`);
    ok++;
  } catch (err) {
    console.error(`✗ ${hero.slug}: ${err.message}`);
    fail++;
  }
}

console.log(`\nDone: ${ok} generated, ${fail} failed${SKIP.length ? `, ${SKIP.length} skipped` : ''}`);
process.exit(fail === 0 ? 0 : 1);
