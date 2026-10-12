import test from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { validateApprovedClaims, findUnsupportedGeneratedGrades } from '../check-research-publication.mjs'

const good = {
  schemaVersion: 1,
  claims: [{
    id: 'sample-claim',
    domain: 'frontier-reasoning-models',
    text: 'A narrow claim with a specified test context and outcome.',
    dossier: Object.fromEntries([
      'question', 'scope', 'method', 'inclusionCriteria', 'exclusionCriteria',
      'limitations', 'contraryEvidence', 'correctionCheck', 'rightsDecision',
    ].map((field) => [field, `A specific reviewed statement for ${field} in this bounded example.`])),
    status: 'supported-synthesis',
    sources: [{
      url: 'https://doi.org/10.1234/example',
      title: 'An individual study',
      locator: 'Table 2',
      type: 'journal',
      version: '2026-09-28 edition',
    }],
    draftedBy: 'Research author',
    reviewedBy: 'Frank Riemer',
    reviewedAt: '2026-09-28',
    reviewReceipt: {
      repository: 'frankxai/frankx.ai-vercel-website',
      prNumber: 100,
      headSha: 'a'.repeat(40),
      reviewId: 123,
      reviewerLogin: 'independent-human',
      reviewedAt: '2026-09-28',
    },
  }],
}

const validateShape = (input) => validateApprovedClaims(input, { verifyReviewReceipt: () => true })

test('a claim needs a direct locator, full dossier and externally verified receipt', () => {
  assert.deepEqual(validateShape(good), [])
  assert.match(validateApprovedClaims(good).join(' '), /external review attestation not verified/)
})

test('generated search and self links cannot become citations', () => {
  for (const url of [
    'https://scholar.google.com/scholar?q=quantum',
    'https://arxiv.org/search/?query=quantum',
    'https://www.frankx.ai/research/quantum-computing',
    'https://pubmed.ncbi.nlm.nih.gov/?term=quantum',
    'https://scholar.google.co.uk/scholar?q=quantum',
    'https://search.crossref.org/?q=quantum',
  ]) {
    const input = structuredClone(good)
    input.claims[0].sources[0].url = url
    assert.match(validateShape(input).join(' '), /individual publication/)
  }
})

test('publication fails without a locator and independent human review', () => {
  const input = structuredClone(good)
  input.claims[0].sources[0].locator = ''
  input.claims[0].reviewedBy = 'AI'
  input.claims[0].reviewedAt = '2026-02-30'
  const failures = validateShape(input).join(' ')
  assert.match(failures, /locator/)
  assert.match(failures, /human reviewer/)
  assert.match(failures, /valid review date/)
})

test('replication cannot be inferred from one publication', () => {
  const input = structuredClone(good)
  input.claims[0].status = 'independently-replicated'
  assert.match(validateShape(input).join(' '), /replication/)
})

test('a duplicated source and boolean receipt do not establish replication', () => {
  const input = structuredClone(good)
  input.claims[0].status = 'independently-replicated'
  input.claims[0].sources[0].studyId = 'study-one'
  input.claims[0].sources[0].organization = 'Lab One'
  input.claims[0].sources.push({ ...input.claims[0].sources[0] })
  input.claims[0].replicationReceipt = true
  const failures = validateShape(input).join(' ')
  assert.match(failures, /distinct studies/)
  assert.match(failures, /structured independent replication receipt/)
})

test('independent replication needs distinct studies and a dated protocol and result', () => {
  const input = structuredClone(good)
  input.claims[0].status = 'independently-replicated'
  input.claims[0].sources[0].studyId = 'study-one'
  input.claims[0].sources[0].organization = 'Lab One'
  input.claims[0].sources.push({
    url: 'https://doi.org/10.1234/replication', title: 'An independent study',
    locator: 'Results section', type: 'journal', version: '2026-09-28 edition',
    studyId: 'study-two', organization: 'Lab Two',
  })
  input.claims[0].replicationReceipt = {
    team: 'Lab Two', performedAt: '2026-09-20',
    protocolUrl: 'https://osf.io/protocol-123', resultUrl: 'https://osf.io/results-123',
  }
  assert.deepEqual(validateShape(input), [])
  input.claims[0].replicationReceipt.team = 'Lab One'
  assert.match(validateShape(input).join(' '), /structured independent replication receipt/)
})

test('reviewer identity is normalized before separation', () => {
  const input = structuredClone(good)
  input.claims[0].draftedBy = '  FRANK   RIEMER  '
  assert.match(validateShape(input).join(' '), /drafter and reviewer must be distinct/)
})

test('generated reviewer, missing dossier and fabricated review text fail', () => {
  const input = structuredClone(good)
  input.claims[0].reviewedBy = 'Codex Agent'
  delete input.claims[0].dossier.method
  input.claims[0].reviewReceipt = 'a'.repeat(40)
  const failures = validateShape(input).join(' ')
  assert.match(failures, /human reviewer/)
  assert.match(failures, /dossier method/)
  assert.match(failures, /structured review receipt/)
})

test('generated search citations and synthetic grades fail closed', () => {
  const bad = `{
    "url": "https://scholar.google.com/scholar?q=example",
    "type": "journal",
    "confidence": "high",
    "evidenceQuality": "rct",
    "replicationStatus": "replicated",
    "crossRefCount": 12
  }`
  const failures = findUnsupportedGeneratedGrades({ 'fixture.ts': bad })
  assert.match(failures.join(' '), /search URL/)
  assert.match(failures.join(' '), /type journal/)
  assert.match(failures.join(' '), /confidence high/)
  assert.match(failures.join(' '), /evidenceQuality rct/)
  assert.match(failures.join(' '), /replicationStatus replicated/)
  assert.match(failures.join(' '), /synthetic crossRefCount/)
  assert.deepEqual(findUnsupportedGeneratedGrades({
    'lib/research/sources.ts': 'export const domainSources: Record<string, ResearchSource[]> = {}\nexport interface ResearchSource { type: SourceType }',
    'lib/research/validated-claims.ts': "export type ConfidenceLevel = 'high'\nexport const validatedClaims: ValidatedClaim[] = []\nexport const researchBriefs: Record<string, ResearchBrief> = {}",
  }), [])
  assert.deepEqual(findUnsupportedGeneratedGrades({
    'approved.ts': '{ "url": "https://doi.org/10.1234/example", "type": "journal", "confidence": "high" }',
  }), [])
  const selfRef = findUnsupportedGeneratedGrades({
    'sources.ts': "{ url: '/research/example', type: 'official' }",
  }).join(' ')
  assert.match(selfRef, /self-referential citation/)
  const typescriptGrade = findUnsupportedGeneratedGrades({
    'claims.ts': "{ confidence: 'high', replicationStatus: 'replicated', evidenceQuality: 'rct' }",
  }).join(' ')
  assert.match(typescriptGrade, /confidence high/)
  assert.match(typescriptGrade, /replicationStatus replicated/)
  assert.match(typescriptGrade, /evidenceQuality rct/)
})

test('committed research registries do not carry generated grades', () => {
  const failures = findUnsupportedGeneratedGrades({
    'lib/research/sources.ts': readFileSync(new URL('../../lib/research/sources.ts', import.meta.url), 'utf8'),
    'lib/research/validated-claims.ts': readFileSync(new URL('../../lib/research/validated-claims.ts', import.meta.url), 'utf8'),
  })
  assert.deepEqual(failures, [])
})

test('the research hub generator refuses to write', () => {
  const script = fileURLToPath(new URL('../build-100-research-hubs.mjs', import.meta.url))
  const result = spawnSync(process.execPath, [script], { encoding: 'utf8' })
  assert.equal(result.status, 1)
  assert.match(result.stderr, /fail-closed/)
})
