import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const read = (rel) => readFileSync(resolve(root, rel), 'utf8')

const SHOT_03 = `Reference: the approved studio character and room.
Start: medium close view, seated character looking at the closed notebook.
Action: the character takes a breath and looks toward the piano.
Camera: one slow forward push, eye level, no orbit or cut.
End: hold the expression briefly so the editor has a clean exit.
Continuity: same clothing, hair, window light and notebook position.
Avoid: additional people, changing props, text overlays, scene transitions.`

const guidePath = 'content/guides/higgsfield-ai-video-guide.mdx'
const briefPath = 'public/downloads/higgsfield-shot-brief.md'
const ledgerPath = 'public/downloads/higgsfield-shot-ledger.csv'
const diagramPath = 'public/images/editorial/higgsfield-three-shot-stop-rule.svg'
const visualsPath = 'data/editorial-visuals.json'
const programsPath = 'data/affiliate/programs.json'
const journeyPath = 'scripts/qa/book-journey.mjs'
const readerPath = 'scripts/qa/higgsfield-reader-journey.mjs'

test('the hub guide states an acceptance check and puts the brief beside the stop rule', () => {
  const guide = read(guidePath)
  const figureAt = guide.indexOf('<ArticleFigure id="higgsfield-three-shot-stop-rule" />')
  const nextAt = guide.indexOf('## Choose your starting point', figureAt)
  const beside = guide.slice(figureAt, nextAt)
  assert.ok(figureAt > 0 && nextAt > figureAt)
  assert.match(beside, /\/downloads\/higgsfield-shot-brief\.md/)
  assert.match(beside, /\/downloads\/higgsfield-shot-ledger\.csv/)
  assert.equal(guide.includes('never burned'), false)
  assert.equal(guide.includes('remains locked'), false)
  assert.equal(guide.includes('fpr='), false)
  assert.equal(guide.includes('console.higgsfield.ai'), false)
  assert.match(guide, /Accept the clip only when the face still matches your reference still/)
  assert.match(guide, /No guarantee is established here/)
  assert.match(guide, /https:\/\/open\.higgsfield\.ai\//)
  assert.match(guide, /The labels are historical/)
  assert.match(guide, /id="tW40b122Rbs"/)
  assert.match(guide, /structuredData=\{false\}/)
  assert.match(guide, /affiliateId="higgsfield"/)
  assert.equal(guide.includes(SHOT_03), true)
})

test('the worksheet, ledger, and diagram stay free of invented jobs and likeness locks', () => {
  const brief = read(briefPath)
  const ledger = read(ledgerPath).trim().split(/\r?\n/)
  const diagram = read(diagramPath)
  const visuals = JSON.parse(read(visualsPath))
  assert.equal(brief.includes(SHOT_03), true)
  assert.equal(brief.includes('fpr='), false)
  assert.equal(diagram.includes('fpr='), false)
  assert.equal(diagram.includes('remains locked'), false)
  assert.match(diagram, /role="img"/)
  assert.match(diagram, /<title id="title">Three shots\. One stop rule\.<\/title>/)
  assert.match(diagram, /Accept only if the face still matches the reference/)
  assert.deepEqual(ledger, [
    'shot_id,attempt,model,prompt_version,reference,credits,job_id,status,accepted,reason,next_change',
    'S01,1,,v1,,,,pending,no,,',
    'S02,1,,v1,,,,pending,no,,',
    'S03,1,,v1,,,,pending,no,,',
  ])
  const visual = visuals['higgsfield-three-shot-stop-rule']
  assert.equal(visual.src, '/images/editorial/higgsfield-three-shot-stop-rule.svg')
  assert.equal(visual.kind, 'diagram')
  assert.equal(visual.rights, 'original')
  assert.equal(visual.caption.includes('remains locked'), false)
  assert.match(visual.caption, /accept the face only when it still matches the reference/)
})

test('the public hop record keeps the issued query and does not publish a rate', () => {
  const { programs } = JSON.parse(read(programsPath))
  const program = programs.find(item => item.aliases?.includes('higgsfield'))
  assert.equal(program.ourLink, 'https://higgsfield.ai?fpr=frank-255866')
  assert.equal(program.useHop, true)
  assert.equal(program.status, 'active')
  assert.equal(program.commission, 'See partner dashboard')
  assert.equal(program.recurring, 'See partner dashboard')
  assert.equal(String(program.commission).includes('%'), false)
})

test('the built reader journey runs on the existing book server', () => {
  const journey = read(journeyPath)
  const reader = read(readerPath)
  assert.equal(journey.includes('runHiggsfieldReader('), true)
  assert.equal(journey.split("next', 'start'").length - 1, 1)
  assert.match(reader, /\/guides\/higgsfield-ai-video-guide/)
  assert.match(reader, /\/go\/higgsfield/)
  assert.match(reader, /DNT/)
  assert.equal(reader.includes("next', 'start'"), false)
  assert.equal(reader.includes('spawn('), false)
})
