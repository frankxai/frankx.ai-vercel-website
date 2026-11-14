import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizePublicRepo, recentActivity, filterRepos } from '../../lib/ecosystem/model.ts'
const observed = '2026-11-14T00:00:00Z'
const raw = { name: 'skills', full_name: 'frankxai/skills', owner: { login: 'frankxai' }, private: false, fork: false, archived: false, pushed_at: '2026-11-13T12:00:00Z', description: 'Architecture methods', stargazers_count: 3 }
const repo = () => normalizePublicRepo(raw, observed)
test('public projection excludes private, missing visibility, forks and unexpected owners', () => {
  for (const change of [{ private: true }, { private: undefined }, { fork: true }, { owner: { login: 'other' } }, { name: '../secret' }]) assert.equal(normalizePublicRepo({ ...raw, ...change }, observed), null)
})
test('URL and DTO are constructed without upstream links or internal metadata', () => {
  const result = normalizePublicRepo({ ...raw, html_url: 'javascript:alert(1)', notes: 'private', actionItem: 'internal' }, observed)
  assert.equal(result.url, 'https://github.com/frankxai/skills')
  assert.equal(JSON.stringify(result).includes('internal'), false)
  assert.equal(JSON.stringify(result).includes('private'), false)
})
test('owner-qualified identity prevents cross-organization name collisions', () => {
  const second = normalizePublicRepo({ ...raw, owner: { login: 'Arcanea-Labs' }, full_name: 'Arcanea-Labs/skills' }, observed)
  assert.notEqual(repo().id, second.id)
  assert.equal(second.group, 'arcanea')
})
test('recent focus never promotes snapshots, archived, future, invalid or old pushes', () => {
  const valid = repo()
  const candidates = [valid, { ...valid, id: 'saved', source: 'snapshot' }, { ...valid, id: 'archived', archived: true }, { ...valid, id: 'old', pushedAt: '2026-01-01T00:00:00Z' }, { ...valid, id: 'future', pushedAt: '2027-01-01T00:00:00Z' }, { ...valid, id: 'invalid', pushedAt: null }]
  assert.deepEqual(recentActivity(candidates, Date.parse(observed)).map(r => r.id), ['frankxai/skills'])
})
test('combined filtering supports descriptions, owners, areas, archive control and empty results', () => {
  const repos = [repo(), { ...repo(), id: 'frankxai/archived', archived: true }]
  assert.equal(filterRepos(repos, ' ARCHITECTURE ', 'creator-tools', true).length, 1)
  assert.equal(filterRepos(repos, 'frankxai', 'all', false).length, 2)
  assert.equal(filterRepos(repos, '', 'research', true).length, 0)
  assert.equal(filterRepos(repos, 'unmatched', 'all', true).length, 0)
})
test('invalid dates and missing stars remain unknown', () => {
  const result = normalizePublicRepo({ ...raw, pushed_at: 'not-a-date', stargazers_count: undefined }, observed)
  assert.equal(result.pushedAt, null)
  assert.equal(result.stars, null)
})

const { readPublicSource } = await import('../../lib/ecosystem/source.ts')
const url = 'https://api.github.com/users/frankxai/repos?type=owner'
test('HTTP, transport, JSON, and source date failures return unavailable without a timestamp', async () => {
  const fetchers = [async () => { throw new Error('timeout') }, async () => new Response('{}', { status: 429 }), async () => new Response('not-json'), async () => new Response(JSON.stringify([raw])), async () => new Response('{}', { headers: { date: observed } })]
  for (const fetcher of fetchers) {
    const result = await readPublicSource('frankxai', url, fetcher)
    assert.equal(result.source.state, 'unavailable')
    assert.equal(result.source.observedAt, null)
    assert.deepEqual(result.repos, [])
  }
})
test('successful source retains upstream date, filters private records and accepts empty public results', async () => {
  const result = await readPublicSource('frankxai', url, async () => new Response(JSON.stringify([raw, { ...raw, private: true }]), { headers: { date: observed } }))
  assert.equal(result.source.observedAt, observed.replace('00Z', '00.000Z'))
  assert.equal(result.repos.length, 1)
  const empty = await readPublicSource('frankxai', url, async () => new Response('[]', { headers: { date: observed } }))
  assert.equal(empty.source.state, 'available')
  assert.equal(empty.repos.length, 0)
})
