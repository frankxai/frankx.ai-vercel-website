#!/usr/bin/env node
/**
 * Generate 10 Golden Age cover lab variants.
 * Usage: node scripts/generate-golden-age-lab.mjs [--only 1,2,3]
 */
import { mkdirSync, existsSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateImage } from './lib/nb-image.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(__dirname, '..')
const OUT = resolve(REPO, 'public/images/books/golden-age-lab')
mkdirSync(OUT, { recursive: true })

const onlyArg = process.argv.find((a, i) => process.argv[i - 1] === '--only')
const only = onlyArg
  ? onlyArg.split(',').map((n) => parseInt(n, 10))
  : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const variants = [
  {
    n: 1,
    id: 'v01-clothbound-bickford-smith',
    prompt: `## CONCEPT
Penguin Clothbound Classics luxury for a modern intelligence manifesto. Material object-language as flat cover design.

## ART DIRECTION
Coralie Bickford-Smith school: fine cloth grain field, gold foil stamp, subtle repeating micro-pattern of twin interlocking rings almost invisible until close. Ultra premium.

## SCENE
FLAT full-bleed book cover graphic 2:3, not a photo of a physical book. Deep charcoal-black cloth texture fills entire frame. Barely-there embossed pattern of overlapping circles. Centered gold foil title THE GOLDEN AGE OF INTELLIGENCE.

## COMPOSITION
Upper 45%: title in three lines Didone gold foil capitals. Center: single horizontal tungsten-gold filament rule. Below: italic subtitle Awakening the Two Most Powerful Devices Ever Created. Bottom: Frank Riemer. Safe margins 8%.

## LIGHTING
Even soft print lighting; foil gentle specular.

## PALETTE
#0A0A0B, #C9A84C, #E8B85C, #1A1A1F.

## TYPOGRAPHY
Bodoni gold foil title; elegant italic subtitle; small sans author.

## MOOD
Quiet museum luxury. Authority without shouting.

## STYLE REFERENCES
Coralie Bickford-Smith Penguin Clothbound, Knopf prestige.

TECHNICAL: 1600x2560 flat graphic, no 3D hardcover mockup, no people, no robots, no neon purple.`,
  },
  {
    n: 2,
    id: 'v02-mendelsund-dual-spheres',
    prompt: `## CONCEPT
One abstract symbol: two luminous spheres — organic amber-rose (human) and crystalline emerald-cyan (machine) — nearly touching with a hairline gold bridge of light.

## ART DIRECTION
Peter Mendelsund modernist semi-abstract. Symbol does the work.

## SCENE
FLAT cover. Matte near-black field. Center two soft spheres approaching, thin gold filament bridge. No literal brain, no robots.

## COMPOSITION
Title THE GOLDEN AGE OF INTELLIGENCE refined gold upper third. Symbol center. Subtitle small. Author Frank Riemer bottom.

## LIGHTING
Spheres self-illuminate; deep void elsewhere.

## PALETTE
#0A0A0B, #E8B85C, #06b6d4, #10b981, #C9A84C.

## TYPOGRAPHY
Clean prestige Didone or refined sans gold.

## MOOD
Civilizational clarity; Machines of Loving Grace optimism.

## STYLE REFERENCES
Peter Mendelsund Kafka redesigns, modernist Knopf.

TECHNICAL: flat 2:3, no book photo, no people.`,
  },
  {
    n: 3,
    id: 'v03-kidd-conceptual-20w',
    prompt: `## CONCEPT
Chip Kidd conceptual punch: vast black field, massive gold title, and a single tiny glowing 20-watt filament emphasizing small power that changes everything.

## ART DIRECTION
Chip Kidd witty conceptual hierarchy, bold smart not cute.

## SCENE
FLAT pure black cover. Aggressive stacked gold title THE GOLDEN AGE OF INTELLIGENCE top half. Lower third: tiny coiled luminous filament alone in space. Optional micro line 20 WATTS.

## COMPOSITION
Title 50%. Tiny filament conceptual object. Subtitle small. Author Frank Riemer bottom.

## LIGHTING
Filament sole light; theatrical flat design.

## PALETTE
#000000, #C9A84C, #FFF5D6 filament hot.

## TYPOGRAPHY
Bold confident display + classic gold.

## MOOD
Smart manifesto. Attention + intellect.

## STYLE REFERENCES
Chip Kidd conceptual jackets.

TECHNICAL: flat 2:3, no 3D book mockup.`,
  },
  {
    n: 4,
    id: 'v04-corral-atmospheric-dawn',
    prompt: `## CONCEPT
Rodrigo Corral atmospheric literary: dawn of intelligence as a golden weather-band of light in deep space-ink.

## ART DIRECTION
Literary gravitas, painterly atmosphere, adult emotional prestige.

## SCENE
FLAT cover. Deep indigo-black wash with horizontal band of golden dawn light like a brain-wave horizon. Suggestion of two distant aligned suns. No literal brain.

## COMPOSITION
Title elegant gold serif in upper dark. Horizon glow mid. Subtitle in glow. Author bottom.

## LIGHTING
Cinematic gradient; luminous band attractor.

## PALETTE
#07060C, #C9A84C, #F0D78C, #2A1F0A.

## TYPOGRAPHY
Literary serif generous tracking.

## MOOD
Beautiful future, solemn hope.

## STYLE REFERENCES
Rodrigo Corral literary covers, FSG prestige.

TECHNICAL: flat 2:3, not 3D book.`,
  },
  {
    n: 5,
    id: 'v05-moss-poster-profile',
    prompt: `## CONCEPT
Olly Moss graphic poster icon: classical head profile in gold line dissolving into geometric crystal facets — human to machine continuum.

## ART DIRECTION
Bold limited palette poster, collectible silhouette.

## SCENE
FLAT cover deep navy. Large gold-line stylized human profile facing right; rear skull becomes emerald/cyan geometric crystals. Vector-clean.

## COMPOSITION
Icon center 55%. Title strong condensed gold caps top or bottom. Author Frank Riemer small. Subtitle optional small.

## LIGHTING
Flat graphic slight depth gradient.

## PALETTE
#0B1220, #C9A84C, #10b981, #06b6d4.

## TYPOGRAPHY
Poster type highly legible thumbnail.

## MOOD
Modern myth, high attention, collectible.

## STYLE REFERENCES
Olly Moss posters.

TECHNICAL: flat 2:3, stylized not photoreal face, no photo book.`,
  },
  {
    n: 6,
    id: 'v06-hische-lettering-art',
    prompt: `## CONCEPT
Jessica Hische lettering-as-art: custom gold display lettering fills the cover; a luminous filament threads the word INTELLIGENCE.

## ART DIRECTION
Master lettering, warm craft, contemporary gift-book desire.

## SCENE
FLAT cover soft black-brown field. Enormous artful gold lettering THE GOLDEN AGE OF INTELLIGENCE as primary art. Thin filament through INTELLIGENCE.

## COMPOSITION
Lettering 70%. Tiny subtitle. Author Frank Riemer bottom small caps.

## LIGHTING
Foil gold on dark; soft bloom on filament.

## PALETTE
#12100E, #D4AF37, #E8B85C.

## TYPOGRAPHY
Hero decorative yet readable.

## MOOD
Warm authority, craft love.

## STYLE REFERENCES
Jessica Hische lettering covers.

TECHNICAL: flat 2:3 type-forward.`,
  },
  {
    n: 7,
    id: 'v07-pak-generative-minimal',
    prompt: `## CONCEPT
Pak / Art Blocks refined generative wealth: one perfect gold parametric curve (linked dual loops) on pure black. No crypto clichés.

## ART DIRECTION
Sparse expensive mathematical beauty, black museum wall.

## SCENE
FLAT absolute black. Center continuous gold-wire generative curve suggesting two linked loops (dual intelligence). No chains, apes, UI, QR.

## COMPOSITION
Curve center. Title THE GOLDEN AGE OF INTELLIGENCE thin modern gold grotesk small precise top or bottom. Author minimal Frank Riemer.

## LIGHTING
Curve soft self-glow; rest void.

## PALETTE
#000000, #C9A84C, #F5E6B8 micro.

## TYPOGRAPHY
Ultra-thin luxury sans.

## MOOD
Quiet ultra-wealth, collector, future-native.

## STYLE REFERENCES
Pak aesthetic, Art Blocks long-form generative (refined).

TECHNICAL: flat 2:3, no blockchain icons.`,
  },
  {
    n: 8,
    id: 'v08-hara-white-quiet-luxury',
    prompt: `## CONCEPT
Kenya Hara emptiness × Taschen white luxury: warm off-white field, black Didone title, one gold filament spark.

## ART DIRECTION
Radical white space confidence, Japanese editorial calm, intellectual modern.

## SCENE
FLAT cover warm off-white paper #F7F3EA with visible paper tooth. Large black Didone title THE GOLDEN AGE OF INTELLIGENCE. Single black horizontal filament with one gold spark. Word GOLDEN may carry gold ink accent.

## COMPOSITION
Massive margins. Title upper-center. Filament below. Sparse subtitle. Author bottom.

## LIGHTING
Flat daylight print; paper luxury.

## PALETTE
#F7F3EA, #0A0A0B, #C9A84C.

## TYPOGRAPHY
Black Didone on white max thumb contrast.

## MOOD
Design museum, calm authority.

## STYLE REFERENCES
Kenya Hara, MUJI design philosophy, Taschen monographs.

TECHNICAL: flat 2:3 white luxury.`,
  },
  {
    n: 9,
    id: 'v09-rebel-offwhite-experimental',
    prompt: `## CONCEPT
Rebellious modern manifesto: industrial black with gold/white experimental type, crop marks, refined "20W > 17000MW" conceptual stamp.

## ART DIRECTION
Elevated Off-White quotation language × experimental culture covers — rebellious not cheap.

## SCENE
FLAT matte black. Large title THE GOLDEN AGE OF INTELLIGENCE with design quotation marks or corner crop marks. Diagonal thin gold stripe. Center refined stamp badge: 20W > 17,000 MW. Author FRANK RIEMER industrial small caps.

## COMPOSITION
Asymmetric type blocks, high energy designed. Subtitle secondary.

## LIGHTING
Flat high contrast graphic.

## PALETTE
#0A0A0B, #F5F5F0, #C9A84C, #EAB308 optional.

## TYPOGRAPHY
Grotesque + serif controlled clash.

## MOOD
Founder rebel, modern attention magnet.

## STYLE REFERENCES
Elevated street-luxury design language, experimental book design.

TECHNICAL: flat 2:3 sharp type no 3D book.`,
  },
  {
    n: 10,
    id: 'v10-liquid-couture-inlay',
    prompt: `## CONCEPT
Ultra-lush liquid couture: molten gold and emerald-cyan streams braiding into a luminous knot — dual intelligence as jewelry-grade inlay.

## ART DIRECTION
Iris van Herpen fluid forms × high jewelry lacquer inlay. Maximal craft, one focal story.

## SCENE
FLAT cover with rich material illusion. Near-black base. Center two liquid streams molten gold and emerald-cyan braiding into one knot. Micro filigree. Title refined gold Didone above inlay: THE GOLDEN AGE OF INTELLIGENCE. Subtitle delicate. Author Frank Riemer bottom.

## COMPOSITION
Inlay knot center 45%. Title upper. Deep luxury margins.

## LIGHTING
Specular liquid metal highlights, jewel depth, cinematic.

## PALETTE
#050508, #D4AF37, #E8B85C, #0D9488, #22D3EE.

## TYPOGRAPHY
Clean elegant foil Didone; type does not fight inlay.

## MOOD
Ultra-rich desirable fashion-tech flagship gift.

## STYLE REFERENCES
Iris van Herpen, high jewelry campaigns, luxury lacquer packaging — not cheap chrome AI stock.

TECHNICAL: flat 2:3 material richness, no photographed book, no people.`,
  },
]

const results = []
for (const v of variants) {
  if (!only.includes(v.n)) continue
  const outputPath = resolve(OUT, `gai-${v.id}.jpg`)
  console.error(`\n=== Generating ${v.n}/10 ${v.id} ===`)
  try {
    const result = await generateImage({
      prompt: v.prompt,
      outputPath,
      model: 'nb2',
      aspectRatio: '2:3',
      imageSize: '2K',
      enforceDesignThinking: true,
      fallback: true,
    })
    results.push({ n: v.n, id: v.id, status: 'ok', ...result })
    console.error(`✓ ${outputPath}`)
  } catch (err) {
    results.push({ n: v.n, id: v.id, status: 'error', error: String(err?.message || err) })
    console.error(`✗ ${v.id}:`, err?.message || err)
  }
}

const summaryPath = resolve(OUT, 'lab-results.json')
writeFileSync(summaryPath, JSON.stringify({ at: new Date().toISOString(), results }, null, 2))
console.log(JSON.stringify({ out: OUT, summaryPath, results }, null, 2))
