import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import Ajv2020 from 'ajv/dist/2020.js'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')

const readJson = (relativePath) =>
  JSON.parse(readFileSync(resolve(root, relativePath), 'utf8'))
const readText = (relativePath) =>
  readFileSync(resolve(root, relativePath), 'utf8')
const clone = (value) => structuredClone(value)

const graph = readJson('data/human-mastery/patternos-v0.json')
const graphSchema = readJson('data/human-mastery/patternos.schema.json')
const sources = readJson('data/human-mastery/sources-v0.json')
const sourcesSchema = readJson('data/human-mastery/sources.schema.json')
const backlog = readJson('data/human-mastery/artifact-backlog-v0.json')
const backlogSchema = readJson('data/human-mastery/artifact-backlog.schema.json')
const constitution = readText('docs/research/human-mastery-patternos/README.md')
const evidenceStandard = readText('docs/research/human-mastery-patternos/evidence-standard.md')
const directions = readText('docs/research/human-mastery-patternos/public-experience-directions.md')

const ajv = new Ajv2020({ allErrors: true, strict: true })
ajv.addFormat('date', {
  type: 'string',
  validate: (value) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`)),
})

const validators = {
  graph: ajv.compile(graphSchema),
  sources: ajv.compile(sourcesSchema),
  backlog: ajv.compile(backlogSchema),
}

const pad = (value) => String(value).padStart(3, '0')
const expectedIds = (prefix, count) =>
  Array.from({ length: count }, (_, index) => `${prefix}-${pad(index + 1)}`)

const allSources = (ledger = sources) => [
  ...ledger.researchSources,
  ...ledger.bookSources,
  ...ledger.practitionerSources,
]

const evidenceObjects = (value = graph) => [
  ...value.patterns,
  ...value.drills,
  ...value.assessments,
  ...value.protocols,
]

const canonicalObjects = (g = graph, ledger = sources, queue = backlog) => [
  ...g.capabilityPlanes,
  ...g.patternIntelligenceLoop,
  ...g.patterns,
  ...g.drills,
  ...g.assessments,
  ...g.protocols,
  ...allSources(ledger),
  ...queue.artifacts,
]

const hasValidIsbn13Checksum = (isbn) => {
  if (!/^\d{13}$/.test(isbn)) return false
  const sum = [...isbn].reduce(
    (total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 1 : 3),
    0,
  )
  return sum % 10 === 0
}

const passportEnums = {
  evidence: new Set(['E0', 'E1', 'E2', 'E3', 'E4']),
  field: new Set(['F0', 'F1', 'F2', 'F3', 'F4']),
  transfer: new Set(['T0', 'T1', 'T2', 'T3']),
  rights: new Set(['R-GREEN', 'R-RESTRICTED', 'R-PERMISSION', 'R-PROHIBITED']),
}

function semanticErrors(g, ledger, queue) {
  const errors = []
  const sourcesFlat = allSources(ledger)
  const sourceById = new Map(sourcesFlat.map((source) => [source.id, source]))
  const practitionerIds = new Set(ledger.practitionerSources.map(({ id }) => id))
  const objects = canonicalObjects(g, ledger, queue)
  const objectById = new Map(objects.map((object) => [object.id, object]))

  const ids = objects.map(({ id }) => id)
  if (new Set(ids).size !== ids.length) errors.push('canonical IDs must be globally unique')

  const versions = [g.metadata.version, ledger.metadata.version, queue.metadata.version]
  if (new Set(versions).size !== 1) errors.push('dataset metadata versions drifted')
  const updated = [g.metadata.updated, ledger.metadata.updated, queue.metadata.updated]
  if (new Set(updated).size !== 1) errors.push('dataset metadata updated dates drifted')

  for (const metadata of [g.metadata, ledger.metadata, queue.metadata]) {
    for (const gate of ['curation', 'review']) {
      const receipt = metadata.provenance[gate]
      if (receipt.status === 'pending' && receipt.actor !== null) {
        errors.push(`${gate} pending status must not name an actor`)
      }
      if (receipt.status === 'approved' && !receipt.actor) {
        errors.push(`${gate} approval requires an actor`)
      }
    }
  }

  const canonicalUrls = new Map()
  for (const source of sourcesFlat) {
    if (source.identity.canonicalUrl !== source.locator) {
      errors.push(`${source.id} identity canonicalUrl differs from locator`)
    }
    const prior = canonicalUrls.get(source.identity.canonicalUrl)
    if (prior) errors.push(`${source.id} duplicates canonical source locator from ${prior}`)
    canonicalUrls.set(source.identity.canonicalUrl, source.id)
  }

  for (const book of ledger.bookSources) {
    if (!hasValidIsbn13Checksum(book.isbn13)) errors.push(`${book.id} has an invalid ISBN-13`)
    const first = book.editionIdentity.workFirstPublicationYear
    if (Number.isInteger(first) && first > book.editionIdentity.editionPublicationYear) {
      errors.push(`${book.id} edition predates the recorded first publication`)
    }
    if (book.editionIdentity.workFirstPublicationYearStatus === 'unavailable' && first !== null) {
      errors.push(`${book.id} unavailable first-publication year must be null`)
    }
  }

  for (const source of ledger.practitionerSources) {
    if (source.mayAnchorResearchClaims !== false) {
      errors.push(`${source.id} practitioner media may not anchor research claims`)
    }
    if (source.canonicalUrl !== source.locator || source.identity.canonicalUrl !== source.canonicalUrl) {
      errors.push(`${source.id} video URL fields drifted`)
    }
    if (!source.canonicalUrl.endsWith(`v=${source.videoId}`)) {
      errors.push(`${source.id} video ID differs from canonical URL`)
    }
  }

  for (const object of evidenceObjects(g)) {
    if (object.evidenceBasis.length === 0) errors.push(`${object.id} lacks evidence references`)
    for (const reference of object.evidenceBasis) {
      const source = sourceById.get(reference.sourceId)
      if (!source) errors.push(`${object.id} has unresolved source ${reference.sourceId}`)
      if (practitionerIds.has(reference.sourceId)) {
        errors.push(`${object.id} uses practitioner media as a research anchor`)
      }
      if (reference.claimLocator.status === 'hold') {
        if (reference.claimLocator.locator !== null || reference.publicationStatus !== 'hold') {
          errors.push(`${object.id} held claim locator is not fail-closed`)
        }
      } else if (!reference.claimLocator.locator) {
        errors.push(`${object.id} verified claim locator is empty`)
      }
    }
  }

  const routes = new Map()
  const artifactIds = new Set(queue.artifacts.map(({ id }) => id))
  for (const artifact of queue.artifacts) {
    const priorRoute = routes.get(artifact.publicRoute)
    if (priorRoute) errors.push(`${artifact.id} duplicates route from ${priorRoute}`)
    routes.set(artifact.publicRoute, artifact.id)

    for (const objectId of artifact.canonicalObjectIds) {
      if (!objectById.has(objectId)) errors.push(`${artifact.id} has unresolved object ${objectId}`)
    }
    for (const dependencyId of artifact.dependencies) {
      if (!artifactIds.has(dependencyId)) errors.push(`${artifact.id} has unresolved dependency ${dependencyId}`)
      if (dependencyId === artifact.id) errors.push(`${artifact.id} depends on itself`)
    }
    for (const sourceId of artifact.evidenceBasis.sourceIds) {
      if (!sourceById.has(sourceId)) errors.push(`${artifact.id} has unresolved evidence source ${sourceId}`)
    }
    for (const objectId of artifact.evidenceBasis.derivedFromObjectIds) {
      if (!artifact.canonicalObjectIds.includes(objectId)) {
        errors.push(`${artifact.id} evidence derivation is not a canonical object`)
      }
    }
    if (artifact.evidenceBasis.sourceIds.length === 0 && artifact.evidenceBasis.status !== 'hold') {
      errors.push(`${artifact.id} has an unanchored evidence grade that is not held`)
    }
    if (artifact.evidenceBasis.status === 'hold' && artifact.evidenceBasis.publicationEligible) {
      errors.push(`${artifact.id} held evidence is publication eligible`)
    }
  }

  const dependencies = new Map(queue.artifacts.map(({ id, dependencies }) => [id, dependencies]))
  const visiting = new Set()
  const visited = new Set()
  const visit = (id) => {
    if (visited.has(id)) return
    if (visiting.has(id)) {
      errors.push(`artifact dependency cycle reaches ${id}`)
      return
    }
    visiting.add(id)
    for (const dependency of dependencies.get(id) ?? []) visit(dependency)
    visiting.delete(id)
    visited.add(id)
  }
  for (const id of dependencies.keys()) visit(id)

  return errors
}

const assertSchemaInvalid = (validate, value, label) => {
  assert.equal(validate(value), false, `${label} unexpectedly passed schema validation`)
  assert.ok(validate.errors?.length, `${label} produced no validation detail`)
}

const assertSemanticInvalid = (g, ledger, queue, pattern) => {
  const errors = semanticErrors(g, ledger, queue)
  assert.ok(errors.some((error) => pattern.test(error)), `Expected ${pattern}, got: ${errors.join('; ')}`)
}

test('Draft 2020-12 schemas compile and validate all three canonical datasets', () => {
  assert.equal(validators.graph(graph), true, JSON.stringify(validators.graph.errors))
  assert.equal(validators.sources(sources), true, JSON.stringify(validators.sources.errors))
  assert.equal(validators.backlog(backlog), true, JSON.stringify(validators.backlog.errors))
  assert.deepEqual(semanticErrors(graph, sources, backlog), [])
})

test('schema validation rejects missing provenance and fail-open claim locators', () => {
  const missingProvenance = clone(graph)
  delete missingProvenance.metadata.provenance
  assertSchemaInvalid(validators.graph, missingProvenance, 'missing provenance')

  const fakeVerifiedLocator = clone(graph)
  fakeVerifiedLocator.patterns[0].evidenceBasis[0].claimLocator.status = 'verified'
  fakeVerifiedLocator.patterns[0].evidenceBasis[0].claimLocator.locator = null
  assertSchemaInvalid(validators.graph, fakeVerifiedLocator, 'verified null locator')
})

test('source schema rejects incomplete platform identity and false review approval', () => {
  const missingChannel = clone(sources)
  delete missingChannel.practitionerSources[0].channel
  assertSchemaInvalid(validators.sources, missingChannel, 'missing practitioner channel')

  const fakeApproval = clone(sources)
  fakeApproval.metadata.provenance.review.status = 'approved'
  assertSchemaInvalid(validators.sources, fakeApproval, 'approval without reviewer actor')
})

test('backlog schema rejects absent and fail-open artifact evidence bases', () => {
  const missingBasis = clone(backlog)
  delete missingBasis.artifacts[0].evidenceBasis
  assertSchemaInvalid(validators.backlog, missingBasis, 'missing artifact evidence basis')

  const emptyVerifiedBasis = clone(backlog)
  emptyVerifiedBasis.artifacts[1].evidenceBasis.status = 'verified'
  emptyVerifiedBasis.artifacts[1].evidenceBasis.publicationEligible = true
  assertSchemaInvalid(validators.backlog, emptyVerifiedBasis, 'verified evidence without sources')
})

test('semantic mutations reject edition reversal, duplicate routes and locators, and metadata drift', () => {
  const reversedEdition = clone(sources)
  reversedEdition.bookSources[0].editionIdentity.editionPublicationYear = 2000
  assertSemanticInvalid(graph, reversedEdition, backlog, /edition predates/)

  const duplicateRoute = clone(backlog)
  duplicateRoute.artifacts[1].publicRoute = duplicateRoute.artifacts[0].publicRoute
  assertSemanticInvalid(graph, sources, duplicateRoute, /duplicates route/)

  const duplicateLocator = clone(sources)
  duplicateLocator.bookSources[1].locator = duplicateLocator.bookSources[0].locator
  duplicateLocator.bookSources[1].identity.canonicalUrl = duplicateLocator.bookSources[0].locator
  assertSemanticInvalid(graph, duplicateLocator, backlog, /duplicates canonical source locator/)

  const driftedVersion = clone(backlog)
  driftedVersion.metadata.version = '0.2.1'
  assertSemanticInvalid(graph, sources, driftedVersion, /versions drifted/)
})

test('semantic mutations reject practitioner anchors and unresolved evidence', () => {
  const practitionerAnchor = clone(graph)
  practitionerAnchor.patterns[0].evidenceBasis[0].sourceId = 'HMP-SRC-201'
  assertSemanticInvalid(practitionerAnchor, sources, backlog, /practitioner media as a research anchor/)

  const unresolved = clone(graph)
  unresolved.patterns[0].evidenceBasis[0].sourceId = 'HMP-SRC-999'
  assertSemanticInvalid(unresolved, sources, backlog, /unresolved source/)
})

test('canonical inventories use exact stable IDs', () => {
  assert.deepEqual(graph.capabilityPlanes.map(({ id }) => id), expectedIds('HMP-CAP', 5))
  assert.deepEqual(graph.patternIntelligenceLoop.map(({ id }) => id), expectedIds('HMP-LOOP', 8))
  assert.deepEqual(graph.patterns.map(({ id }) => id), expectedIds('HMP-PAT', 10))
  assert.deepEqual(graph.drills.map(({ id }) => id), ['HMP-DRL-001'])
  assert.deepEqual(graph.assessments.map(({ id }) => id), ['HMP-ASM-001'])
  assert.deepEqual(graph.protocols.map(({ id }) => id), ['HMP-PRT-001'])
  assert.deepEqual(backlog.artifacts.map(({ id }) => id), expectedIds('HMP-ART', 12))
  assert.equal(new Set(canonicalObjects().map(({ id }) => id)).size, canonicalObjects().length)
})

test('five capability planes and eight-stage loop remain complete and ordered', () => {
  assert.deepEqual(
    graph.capabilityPlanes.map(({ title }) => title),
    ['Regulate & learn', 'Relate & express', 'Sense, decide & create', 'Lead & coordinate', 'Design, market & operate'],
  )
  assert.deepEqual(
    graph.patternIntelligenceLoop.map(({ verb }) => verb),
    ['Observe', 'Encode', 'Compare', 'Hypothesize', 'Generate', 'Test', 'Operationalize', 'Debrief'],
  )
  assert.deepEqual(graph.patternIntelligenceLoop.map(({ sequence }) => sequence), [1, 2, 3, 4, 5, 6, 7, 8])
})

test('source ledger preserves 28 research, 17 book, and 14 practitioner records', () => {
  assert.equal(sources.researchSources.length, 28)
  assert.equal(sources.bookSources.length, 17)
  assert.equal(sources.practitionerSources.length, 14)
  assert.equal(sources.researchSources.find(({ id }) => id === 'HMP-SRC-013').title, 'Measuring Shared Team Mental Models: A Meta-Analysis')
  for (const book of sources.bookSources) assert.ok(hasValidIsbn13Checksum(book.isbn13), book.id)
})

test('book identity separates work-first and edition publication years', () => {
  const expected = {
    'HMP-SRC-101': [2004, 2017, 'verified'],
    'HMP-SRC-108': [1998, 2017, 'verified'],
    'HMP-SRC-109': [2005, 2017, 'hold'],
    'HMP-SRC-113': [1995, 2009, 'verified'],
    'HMP-SRC-117': [1996, 2011, 'hold'],
  }
  for (const [id, [first, edition, identityStatus]] of Object.entries(expected)) {
    const book = sources.bookSources.find((item) => item.id === id)
    assert.equal(book.editionIdentity.workFirstPublicationYear, first)
    assert.equal(book.editionIdentity.editionPublicationYear, edition)
    assert.equal(book.identity.status, identityStatus)
  }
  assert.deepEqual(
    sources.bookSources.filter(({ identity }) => identity.status === 'hold').map(({ id }) => id),
    ['HMP-SRC-102', 'HMP-SRC-105', 'HMP-SRC-109', 'HMP-SRC-117'],
  )
})

test('practitioner records match exact YouTube oEmbed title, channel, and video identity', () => {
  const expected = [
    ['HMP-SRC-201', "3 Skills You NEED to Prepare Yourself for What's Coming", 'Tony Robbins', 'K-jOtLM9c7o'],
    ['HMP-SRC-202', 'If You Only Watch One Charisma Video, Make It This', 'Charisma on Command', 'CHvB1qgWAoI'],
    ['HMP-SRC-203', 'The 5 Vocal Foundations of Great Communication | Vinh Giang on UNSTOPPABLE', 'Kerwin Rae Podcast Clips', 'CuaY4qe4V34'],
    ['HMP-SRC-204', 'Think Fast, Talk Smart: Communication Techniques', 'Stanford Graduate School of Business', 'HAnw168huqA'],
    ['HMP-SRC-205', '73. Listen Up: Why It’s Better to Be Interested than Interesting', 'Stanford Graduate School of Business', '6alxMdRseTw'],
    ['HMP-SRC-206', '3 steps to turn everyday get-togethers into transformative gatherings | Priya Parker', 'TED', 'ppfONdsOkWI'],
    ['HMP-SRC-207', 'Design Sprint WORKSHOP -  (Lightning Decision Jam AJ&Smart)', 'AJ&Smart', '33hBnZzoFAg'],
    ['HMP-SRC-208', 'What Is Psychological Safety?', 'Harvard Business Review', 'GZgmoxOgfig'],
    ['HMP-SRC-209', 'Linda Hill: How to manage for collective creativity', 'TED', 'DjcZrtcBZi4'],
    ['HMP-SRC-210', 'The Expert Myth', 'Veritasium', '5eW6Eagr9XA'],
    ['HMP-SRC-211', "Gary Klein's introduction to NDM and RPD", 'ShadowBox Training', 'QKpMLYwLRR4'],
    ['HMP-SRC-212', "Why you think you're right -- even if you're wrong | Julia Galef", 'TED', 'w4RLfVxTGH4'],
    ['HMP-SRC-213', 'Expert Political Judgment: How Good Is It? How Can We Know? | Philip Tetlock | Talks at Google', 'Talks at Google', 'f73A-HB-08M'],
    ['HMP-SRC-214', 'Grit: The Power of Passion and Perseverance | Angela Lee Duckworth | TED', 'TED', 'H14bBuluwB8'],
  ]
  for (const [id, title, channel, videoId] of expected) {
    const source = sources.practitionerSources.find((item) => item.id === id)
    assert.equal(source.title, title)
    assert.equal(source.channel.name, channel)
    assert.equal(source.videoId, videoId)
    assert.equal(source.identity.verificationMethod, 'youtube-oembed')
    assert.equal(source.identity.verifiedAt, '2026-08-25')
  }
})

test('every evidence reference has a visible fail-closed claim-level locator state', () => {
  const references = evidenceObjects().flatMap(({ evidenceBasis }) => evidenceBasis)
  assert.equal(references.length, 26)
  for (const reference of references) {
    assert.equal(reference.claimLocator.status, 'hold')
    assert.equal(reference.claimLocator.locator, null)
    assert.equal(reference.publicationStatus, 'hold')
    assert.match(reference.claimLocator.reason, /do not publish/i)
  }
})

test('artifact evidence grades resolve to source IDs or remain explicitly unanchored and held', () => {
  const sourceIds = new Set(allSources().map(({ id }) => id))
  for (const artifact of backlog.artifacts) {
    assert.equal(artifact.publicationStatus, 'hold')
    assert.equal(artifact.evidenceBasis.status, 'hold')
    assert.equal(artifact.evidenceBasis.publicationEligible, false)
    assert.ok(artifact.evidenceBasis.sourceIds.every((id) => sourceIds.has(id)), artifact.id)
    if (artifact.evidenceBasis.sourceIds.length === 0) assert.match(artifact.evidenceBasis.rationale, /No source-level mapping/i)
  }
})

test('every publishable object and source preserves the E/F/T/R passport', () => {
  for (const object of [...evidenceObjects(), ...allSources(), ...backlog.artifacts]) {
    assert.ok(object.passport, `${object.id} is missing a passport`)
    assert.ok(passportEnums.evidence.has(object.passport.evidence), `${object.id} evidence`)
    assert.ok(passportEnums.field.has(object.passport.field), `${object.id} field`)
    assert.ok(passportEnums.transfer.has(object.passport.transfer), `${object.id} transfer`)
    assert.ok(passportEnums.rights.has(object.passport.rights), `${object.id} rights`)
    assert.ok(object.passport.rightsScope.length >= 8, `${object.id} rights scope`)
  }
})

test('practitioner videos remain E1 hypothesis sources with link/embed-only rights', () => {
  for (const source of sources.practitionerSources) {
    assert.equal(source.mayAnchorResearchClaims, false)
    assert.equal(source.passport.evidence, 'E1')
    assert.equal(source.passport.rights, 'R-GREEN')
    assert.match(source.passport.rightsScope, /link/i)
    assert.match(source.passport.rightsScope, /embed/i)
  }
})

test('patterns retain transfer, failure, authority, and validation boundaries', () => {
  const capabilityIds = new Set(graph.capabilityPlanes.map(({ id }) => id))
  for (const pattern of graph.patterns) {
    assert.ok(pattern.planes.every((id) => capabilityIds.has(id)), pattern.id)
    assert.ok(pattern.triggerSignals.length > 0)
    assert.ok(pattern.failureModes.length > 0)
    assert.ok(pattern.recovery.length > 0)
    assert.ok(pattern.metrics.length > 0)
    assert.ok(pattern.authority.humanOwns.length > 0)
    assert.ok(pattern.authority.aiMay.length > 0)
    assert.ok(pattern.authority.aiMustNot.length > 0)
    assert.ok(pattern.nextValidation.length >= 20)
  }
})

test('machine provenance remains pending until named humans curate and review it', () => {
  for (const metadata of [graph.metadata, sources.metadata, backlog.metadata]) {
    assert.equal(metadata.provenance.repair.inputCommit, '96b3aed71c5047b50dc59b8514f2d00d4ae87346')
    assert.equal(metadata.provenance.curation.status, 'pending')
    assert.equal(metadata.provenance.curation.actor, null)
    assert.equal(metadata.provenance.review.status, 'pending')
    assert.equal(metadata.provenance.review.actor, null)
  }
})

test('public experience document retains exactly three gated directions', () => {
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

test('legacy prefixes and source namespaces remain absent', () => {
  const corpus = [graph, graphSchema, sources, sourcesSchema, backlog, backlogSchema]
    .map((value) => JSON.stringify(value))
    .join('\n')
  for (const legacy of ['HMP-PLN', 'HMP-PRO', 'SRC-PAPER', 'SRC-BOOK', 'SRC-VIDEO']) {
    assert.equal(corpus.includes(legacy), false, `legacy namespace remains: ${legacy}`)
  }
})
