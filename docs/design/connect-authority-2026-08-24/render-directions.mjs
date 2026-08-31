import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const sharp = require(
  'C:/Users/frank/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp',
)

const here = path.dirname(fileURLToPath(import.meta.url))
const repo = path.resolve(here, '../../..')
const presentingPhoto = path.join(
  repo,
  'public/images/portraits/frank-presenting-oracle-2025.jpg',
)
const workshopPhoto = path.join(
  repo,
  'public/images/oracle-events/oracle-workshop-P1081706.jpg',
)

const xml = (body) => Buffer.from(`
  <svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
    ${body}
  </svg>
`)

async function photoBuffer(file, width, height, grayscale = false) {
  let image = sharp(file).resize(width, height, { fit: 'cover', position: 'centre' })
  if (grayscale) image = image.grayscale()
  return image.modulate({ saturation: grayscale ? 0 : 0.78 }).png().toBuffer()
}

async function renderWorkingIntelligence() {
  const photo = await photoBuffer(presentingPhoto, 535, 675)
  const frame = xml(`
    <rect width="1200" height="675" fill="#f3efe6"/>
    <rect x="0" y="0" width="24" height="675" fill="#2157d5"/>
    <line x1="72" y1="68" x2="610" y2="68" stroke="#171915" stroke-opacity=".3"/>
    <text x="72" y="48" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#171915">Frank Riemer · AI Architect</text>
    <rect x="72" y="112" width="13" height="13" fill="#2157d5"/>
    <text x="100" y="124" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#39423b">One operator. Systems built to be understood.</text>
    <text x="72" y="210" font-family="Arial, sans-serif" font-size="62" font-weight="600" letter-spacing="-3" fill="#11130f">
      <tspan x="72" dy="0">Complex AI decisions</tspan>
      <tspan x="72" dy="66">into systems</tspan>
      <tspan x="72" dy="66">people can operate.</tspan>
    </text>
    <text x="72" y="445" font-family="Arial, sans-serif" font-size="19" fill="#4d5148">
      <tspan x="72" dy="0">Architecture, workflows, governance, adoption.</tspan>
      <tspan x="72" dy="30">Agents accelerate the work. Frank owns the judgment.</tspan>
    </text>
    <rect x="72" y="535" width="248" height="58" fill="#171915"/>
    <text x="101" y="571" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#ffffff">Bring a real question →</text>
    <line x1="354" y1="553" x2="610" y2="553" stroke="#171915" stroke-opacity=".35"/>
    <text x="354" y="582" font-family="Arial, sans-serif" font-size="13" fill="#5f635a">Static first frame · editorial evidence</text>
    <text x="72" y="640" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#2157d5">Direction 01 · Working intelligence</text>
  `)

  await sharp(frame)
    .composite([{ input: photo, left: 665, top: 0 }])
    .png()
    .toFile(path.join(here, 'direction-01-working-intelligence.png'))
}

async function renderEngineersAtelier() {
  const photo = await photoBuffer(workshopPhoto, 430, 420)
  const frame = xml(`
    <rect width="1200" height="675" fill="#dfe1dc"/>
    <rect x="0" y="0" width="1200" height="74" fill="#252925"/>
    <text x="44" y="46" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#f3efe6">Frank Riemer · Engineer's atelier</text>
    <text x="1000" y="46" font-family="Courier New, monospace" font-size="14" fill="#f3efe6">study / 02</text>
    <line x1="44" y1="110" x2="1156" y2="110" stroke="#252925"/>
    <text x="44" y="139" font-family="Courier New, monospace" font-size="13" fill="#5a5e58">Workshop evidence</text>
    <rect x="44" y="173" width="430" height="420" fill="#b8bcb6"/>
    <rect x="44" y="173" width="9" height="420" fill="#c84f2b"/>
    <text x="520" y="212" font-family="Arial, sans-serif" font-size="50" font-weight="700" letter-spacing="-2" fill="#252925">
      <tspan x="520" dy="0">Build the decision</tspan>
      <tspan x="520" dy="55">before the machine.</tspan>
    </text>
    <text x="520" y="336" font-family="Arial, sans-serif" font-size="18" fill="#4c504a">
      <tspan x="520" dy="0">A workshop surface that exposes the parts:</tspan>
      <tspan x="520" dy="29">question → boundary → evidence → handoff.</tspan>
    </text>
    <line x1="520" y1="425" x2="1118" y2="425" stroke="#252925"/>
    <circle cx="555" cy="481" r="20" fill="#252925"/>
    <circle cx="733" cy="481" r="20" fill="#252925"/>
    <circle cx="911" cy="481" r="20" fill="#252925"/>
    <circle cx="1083" cy="481" r="20" fill="#c84f2b"/>
    <line x1="575" y1="481" x2="713" y2="481" stroke="#252925" stroke-width="2"/>
    <line x1="753" y1="481" x2="891" y2="481" stroke="#252925" stroke-width="2"/>
    <line x1="931" y1="481" x2="1063" y2="481" stroke="#252925" stroke-width="2"/>
    <text x="532" y="528" font-family="Courier New, monospace" font-size="12" fill="#4c504a">Question</text>
    <text x="708" y="528" font-family="Courier New, monospace" font-size="12" fill="#4c504a">Boundary</text>
    <text x="886" y="528" font-family="Courier New, monospace" font-size="12" fill="#4c504a">Evidence</text>
    <text x="1060" y="528" font-family="Courier New, monospace" font-size="12" fill="#4c504a">Handoff</text>
    <text x="520" y="618" font-family="Arial, sans-serif" font-size="14" fill="#5a5e58">Material: aluminum, paper, oxide · Motion: one artifact assembly</text>
  `)

  await sharp(frame)
    .composite([{ input: photo, left: 44, top: 173 }])
    .png()
    .toFile(path.join(here, 'direction-02-engineers-atelier.png'))
}

async function renderFieldDossier() {
  const photo = await photoBuffer(workshopPhoto, 500, 675, true)
  const frame = xml(`
    <rect width="1200" height="675" fill="#f7f5ef"/>
    <rect x="500" y="0" width="700" height="675" fill="#10110f"/>
    <line x1="546" y1="68" x2="1150" y2="68" stroke="#f7f5ef" stroke-opacity=".35"/>
    <text x="546" y="48" font-family="Courier New, monospace" font-size="13" fill="#f7f5ef">Field dossier / Frank Riemer / AI Architect</text>
    <text x="546" y="187" font-family="Georgia, serif" font-size="69" font-weight="400" fill="#f7f5ef">
      <tspan x="546" dy="0">Evidence</tspan>
      <tspan x="546" dy="73">before claims.</tspan>
    </text>
    <text x="550" y="363" font-family="Arial, sans-serif" font-size="18" fill="#c7c8c1">
      <tspan x="550" dy="0">Every promise points to a source.</tspan>
      <tspan x="550" dy="30">Every relationship carries a status.</tspan>
      <tspan x="550" dy="30">Every next step belongs to a human.</tspan>
    </text>
    <line x1="550" y1="480" x2="1150" y2="480" stroke="#f7f5ef" stroke-opacity=".35"/>
    <text x="550" y="521" font-family="Courier New, monospace" font-size="13" fill="#f7f5ef">01 / Architecture decisions</text>
    <text x="550" y="557" font-family="Courier New, monospace" font-size="13" fill="#f7f5ef">02 / Relationship ledger</text>
    <text x="550" y="593" font-family="Courier New, monospace" font-size="13" fill="#f7f5ef">03 / Public operating proof</text>
    <text x="36" y="635" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#ffffff">Direction 03 · Field dossier</text>
  `)

  await sharp(frame)
    .composite([{ input: photo, left: 0, top: 0 }])
    .png()
    .toFile(path.join(here, 'direction-03-field-dossier.png'))
}

await renderWorkingIntelligence()
await renderEngineersAtelier()
await renderFieldDossier()
