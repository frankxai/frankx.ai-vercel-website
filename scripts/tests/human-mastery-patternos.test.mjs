import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')

const readJson = (relativePath) =>
  JSON.parse(readFileSync(resolve(root, relativePath), 'utf8'))
const readText = (relativePath) =>
  readFileSync(resolve(root, relativePath), 'utf8')

const graph = readJson('data/human-mastery/patternos-v0.json')
const schema = readJson('data/human-mastery/patternos.schema.json')
const sources = readJson('data/human-mastery/sources-v0.json')
const backlog = readJson('data/human-mastery/artifact-backlog-v0.json')
const constitution = readText('docs/research/human-mastery-patternos/README.md')
const evidenceStandard = readText('docs/research/human-mastery-patternos/evidence-standard.md')
const directions = readText('docs/research/human-mastery-patternos/public-experience-directions.md')

const pad = (value) => String(value).padStart(3, '0')
const expectedIds = (prefix, count) =>
  Array.from({ length: count }, (_, index) => `${prefix}-${pad(index + 1)}`)

const allSources = [
  ...sources.researchSources,
  ...sources.bookSources,
  ...sources.practitionerSources,
]
const sourceById = new Map(allSources.map((source) => [source.id, source]))

const canonicalObjects = [
  ...graph.capabilityPlanes,
  ...graph.patternIntelligenceLoop,
  ...graph.patterns,
  ...graph.drills,
  ...graph.assessments,
  ...graph.protocols,
  ...allSources,
  ...backlog.artifacts,
]
const canonicalIds = new Set(canonicalObjects.map((object) => object.id))

const allowed = {
  evidence: new Set(['E0', 'E1', 'E2', 'E3', 'E4']),
  field: new Set(['F0', 'F1', 'F2', 'F3', 'F4']),
  transfer: new Set(['T0', 'T1', 'T2', 'T3']),
  rights: new Set(['R-GREEN', 'R-RESTRICTED', 'R-PERMISSION', 'R-PROHIBITED']),
}

const assertPassport = (object) => {
  assert.ok(object.passport, `${object.id} is missing a passport`)
  assert.ok(allowed.evidence.has(object.passport.evidence), `${object.id} has invalid E grade`)
  assert.ok(allowed.field.has(object.passport.field), `${object.id} has invalid F grade`)
  assert.ok(allowed.transfer.has(object.passport.transfer), `${object.id} has invalid T grade`)
  assert.ok(allowed.rights.has(object.passport.rights), `${object.id} has invalid R status`)
  assert.ok(object.passport.rightsScope?.length >= 8, `${object.id} needs a rights scope`)
}

const hasValidIsbn13Checksum = (isbn) => {
  if (!/^\d{13}$/.test(isbn)) return false
  const sum = [...isbn].reduce(
    (total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 1 : 3),
    0,
  )
  return sum % 10 === 0
}

const evidenceObjects = [
  ...graph.patterns,
  ...graph.drills,
  ...graph.assessments,
  ...graph.protocols,
]

test('canonical inventories use exact stable IDs', () => {
  assert.deepEqual(graph.capabilityPlanes.map(({ id }) => id), expectedIds('HMP-CAP', 5))
  assert.deepEqual(graph.patternIntelligenceLoop.map(({ id }) => id), expectedIds('HMP-LOOP', 8))
  assert.deepEqual(graph.patterns.map(({ id }) => id), expectedIds('HMP-PAT', 10))
  assert.deepEqual(graph.drills.map(({ id }) => id), ['HMP-DRL-001'])
  assert.deepEqual(graph.assessments.map(({ id }) => id), ['HMP-ASM-001'])
  assert.deepEqual(graph.protocols.map(({ id }) => id), ['HMP-PRT-001'])
  assert.deepEqual(backlog.artifacts.map(({ id }) => id), expectedIds('HMP-ART', 12))
  assert.ok(allSources.every(({ id }) => /^HMP-SRC-\d{3}$/.test(id)))
})

test('five capability planes and eight-stage loop are complete and ordered', () => {
  assert.equal(graph.capabilityPlanes.length, 5)
  assert.deepEqual(
    graph.capabilityPlanes.map(({ title }) => title),
    ['Regulate & learn', 'Relate & express', 'Sense, decide & create', 'Lead & coordinate', 'Design, market & operate'],
  )
  assert.equal(graph.patternIntelligenceLoop.length, 8)
  assert.deepEqual(
    graph.patternIntelligenceLoop.map(({ verb }) => verb),
    ['Observe', 'Encode', 'Compare', 'Hypothesize', 'Generate', 'Test', 'Operationalize', 'Debrief'],
  )
  assert.deepEqual(graph.patternIntelligenceLoop.map(({ sequence }) => sequence), [1, 2, 3, 4, 5, 6, 7, 8])
})

test('all canonical IDs are globally unique', () => {
  const ids = canonicalObjects.map(({ id }) => id)
  assert.equal(new Set(ids).size, ids.length)
})

test('source ledger preserves the required research, book, and practitioner classes', () => {
  assert.equal(sources.researchSources.length, 28)
  assert.equal(sources.bookSources.length, 17)
  assert.equal(sources.practitionerSources.length, 14)
  assert.match(sourceById.get('HMP-SRC-011').title, /Brainstorming/i)
  assert.match(sourceById.get('HMP-SRC-013').title, /Teamwork/i)
  assert.match(sourceById.get('HMP-SRC-014').title, /Debriefs/i)
  assert.match(sourceById.get('HMP-SRC-015').title, /Superforecasters/i)
  assert.match(sourceById.get('HMP-SRC-016').title, /Creativity Training/i)
  assert.match(sourceById.get('HMP-SRC-017').title, /Generative AI/i)
  assert.match(sourceById.get('HMP-SRC-021').title, /Human–AI Teaming/i)
  assert.match(sourceById.get('HMP-SRC-022').title, /Complementarity/i)
  assert.match(sourceById.get('HMP-SRC-112').title, /Thinking in Systems/i)
  assert.equal(sourceById.get('HMP-SRC-009').title, 'Can Charisma Be Taught? Tests of Two Interventions')
  for (const book of sources.bookSources) {
    assert.ok(hasValidIsbn13Checksum(book.isbn13), `${book.id} needs a valid machine-resolvable ISBN-13`)
  }
})

test('every publishable object and every source has an E/F/T/R passport', () => {
  for (const object of [
    ...evidenceObjects,
    ...allSources,
    ...backlog.artifacts,
  ]) {
    assertPassport(object)
  }
})

test('all evidence references resolve and practitioner media never anchors a research claim', () => {
  const practitionerIds = new Set(sources.practitionerSources.map(({ id }) => id))
  for (const object of evidenceObjects) {
    assert.ok(object.evidenceBasis.length > 0, `${object.id} needs evidence references`)
    for (const reference of object.evidenceBasis) {
      assert.ok(sourceById.has(reference.sourceId), `${object.id} has unresolved source ${reference.sourceId}`)
      assert.ok(!practitionerIds.has(reference.sourceId), `${object.id} improperly uses practitioner media as an anchor`)
      assert.ok(reference.claim.length >= 12, `${object.id} has an underspecified claim`)
      assert.ok(reference.scope.length >= 12, `${object.id} has an underspecified evidence boundary`)
    }
  }
})

test('practitioner videos are hypothesis sources with E1 and scoped link/embed rights only', () => {
  for (const source of sources.practitionerSources) {
    assert.equal(source.mayAnchorResearchClaims, false, `${source.id} must not anchor research claims`)
    assert.equal(source.passport.evidence, 'E1', `${source.id} must remain E1 regardless of the underlying construct`)
    assert.equal(source.passport.rights, 'R-GREEN')
    assert.match(source.passport.rightsScope, /link/i)
    assert.match(source.passport.rightsScope, /embed/i)
    assert.equal(source.capturedAt, '2026-08-16')
  }
})

test('pattern and artifact cross-references resolve', () => {
  const patternIds = new Set(graph.patterns.map(({ id }) => id))
  for (const object of [...graph.drills, ...graph.assessments, ...graph.protocols]) {
    for (const patternId of object.patternIds) {
      assert.ok(patternIds.has(patternId), `${object.id} has unresolved pattern ${patternId}`)
    }
  }
  const artifactIds = new Set(backlog.artifacts.map(({ id }) => id))
  for (const artifact of backlog.artifacts) {
    for (const objectId of artifact.canonicalObjectIds) {
      assert.ok(canonicalIds.has(objectId), `${artifact.id} has unresolved object ${objectId}`)
    }
    for (const dependencyId of artifact.dependencies) {
      assert.ok(artifactIds.has(dependencyId), `${artifact.id} has unresolved dependency ${dependencyId}`)
      assert.notEqual(dependencyId, artifact.id, `${artifact.id} cannot depend on itself`)
    }
  }
})

test('artifact dependency graph is acyclic', () => {
  const dependencies = new Map(
    backlog.artifacts.map((artifact) => [artifact.id, artifact.dependencies]),
  )
  const visiting = new Set()
  const visited = new Set()

  const visit = (id) => {
    if (visited.has(id)) return
    assert.equal(visiting.has(id), false, `artifact dependency cycle reaches ${id}`)
    visiting.add(id)
    for (const dependencyId of dependencies.get(id) ?? []) visit(dependencyId)
    visiting.delete(id)
    visited.add(id)
  }

  for (const id of dependencies.keys()) visit(id)
})

test('patterns expose transfer, failure, authority, and validation boundaries', () => {
  const capabilityIds = new Set(graph.capabilityPlanes.map(({ id }) => id))
  for (const pattern of graph.patterns) {
    assert.ok(pattern.planes.length > 0)
    assert.ok(pattern.planes.every((id) => capabilityIds.has(id)), `${pattern.id} has an invalid capability plane`)
    assert.ok(pattern.triggerSignals.length > 0)
    assert.ok(pattern.failureModes.length > 0)
    assert.ok(pattern.recovery.length > 0)
    assert.ok(pattern.metrics.length > 0)
    assert.ok(pattern.authority.humanOwns.length > 0)
    assert.ok(pattern.authority.aiMay.length > 0)
    assert.ok(pattern.authority.aiMustNot.length > 0)
    assert.ok(pattern.nextValidation.length >= 20)
  }
  assert.deepEqual(graph.patterns.find(({ id }) => id === 'HMP-PAT-010').planes, expectedIds('HMP-CAP', 5))
})

test('the JSON Schema encodes the canonical inventory and prefixes', () => {
  assert.equal(schema.properties.capabilityPlanes.minItems, 5)
  assert.equal(schema.properties.capabilityPlanes.maxItems, 5)
  assert.equal(schema.properties.patternIntelligenceLoop.minItems, 8)
  assert.equal(schema.properties.patternIntelligenceLoop.maxItems, 8)
  assert.equal(schema.properties.patterns.minItems, 10)
  assert.equal(schema.properties.patterns.maxItems, 10)
  assert.equal(schema.properties.drills.maxItems, 1)
  assert.equal(schema.properties.assessments.maxItems, 1)
  assert.equal(schema.properties.protocols.maxItems, 1)
  assert.equal(schema.$defs.capabilityPlane.properties.id.pattern, '^HMP-CAP-[0-9]{3}$')
  assert.equal(schema.$defs.protocol.properties.id.pattern, '^HMP-PRT-[0-9]{3}$')
  assert.equal(schema.$defs.evidenceReference.properties.sourceId.pattern, '^HMP-SRC-[0-9]{3}$')
  assert.deepEqual(schema.$defs.planeIdArray.items.enum, expectedIds('HMP-CAP', 5))
})

test('public experience document contains exactly three directions and keeps implementation gated', () => {
  const headings = directions.match(/^## Direction [A-C] — .+$/gm) ?? []
  assert.equal(headings.length, 3)
  assert.match(headings[0], /^## Direction A — Evidence Atlas \(recommended\)$/)
  assert.match(headings[1], /^## Direction B — Field Manual$/)
  assert.match(headings[2], /^## Direction C — Pattern Console$/)
  assert.match(directions, /choice required before interface implementation/i)
  assert.match(directions, /No public UI has been implemented/i)
  assert.match(directions, /desktop and mobile/i)
})

test('constitution and evidence standard preserve scientific and rights boundaries', () => {
  assert.match(constitution, /Practitioner media generates hypotheses/i)
  assert.match(constitution, /Humans retain consequential authority/i)
  assert.match(evidenceStandard, /not a validated ranking/i)
  assert.match(evidenceStandard, /grit is the dominant predictor/i)
  assert.match(evidenceStandard, /generative AI automatically increases collective creativity/i)
  assert.match(evidenceStandard, /last-click attribution proves funnel causality/i)
  assert.match(evidenceStandard, /does not authorize transcript ingestion/i)
})

test('legacy prefixes and source namespaces are absent', () => {
  const corpus = [
    JSON.stringify(graph),
    JSON.stringify(schema),
    JSON.stringify(sources),
    JSON.stringify(backlog),
    constitution,
    evidenceStandard,
    directions,
  ].join('\n')
  for (const legacy of ['HMP-PLN', 'HMP-PRO', 'SRC-PAPER', 'SRC-BOOK', 'SRC-VIDEO']) {
    assert.equal(corpus.includes(legacy), false, `legacy namespace remains: ${legacy}`)
  }
})
