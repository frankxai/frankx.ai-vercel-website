import assert from 'node:assert/strict'
import test from 'node:test'

const ROUTES = ['/waitlist', '/newsletter']

test('existing capture routes must not 404', async () => {
  const base = (process.env.BASE_URL || 'https://www.frankx.ai').replace(/\/$/, '')
  for (const route of ROUTES) {
    const res = await fetch(base + route, { method: 'HEAD', redirect: 'follow' })
    assert.notEqual(res.status, 404, route + ' returned 404')
  }
})
