import assert from 'node:assert/strict'
import test from 'node:test'
import { once } from 'node:events'
import net from 'node:net'
import { startNextServer, stopManagedProcess } from './helpers/managed-next-process.mjs'

test('image workflow pages, model data and discovery render from the production build', { timeout: 60000 }, async () => {
  const listener = net.createServer().listen(0, '127.0.0.1')
  await once(listener, 'listening')
  const { port } = listener.address()
  await new Promise((resolve) => listener.close(resolve))
  const child = startNextServer({ cwd: process.cwd(), port })
  child.stdout.resume()
  child.stderr.resume()
  const base = `http://127.0.0.1:${port}`
  try {
    let ready = false
    for (let attempt = 0; attempt < 100; attempt++) {
      try { if ((await fetch(`${base}/research/image-workflows/protocol.json`)).ok) { ready = true; break } } catch {}
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
    assert.ok(ready, 'production server becomes ready')
    const read = async (path) => {
      const response = await fetch(base + path, { signal: AbortSignal.timeout(15000) })
      assert.equal(response.status, 200, path)
      return response.text()
    }
    for (const path of ['/blog/chatgpt-images-2-5-creator-founder-workflows', '/guides/reference-to-campaign', '/llm-hub/gpt-image-2-5-flare', '/llm-hub/gpt-image-2-5-sunburst']) {
      const html = await read(path)
      const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? ''
      const canonicals = [...head.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/g)].map((m) => m[1])
      assert.deepEqual(canonicals, [`https://www.frankx.ai${path}`], path)
      assert.ok(html.includes('application/ld+json'), `${path} includes structured data`)
    }
    const guide = await read('/guides/reference-to-campaign')
    assert.ok(guide.includes('/research/image-workflows/evaluate.mjs'))
    const rows = JSON.parse(await read('/llm-hub.json'))
    for (const variant of ['flare', 'sunburst']) {
      const model = rows.find((r) => r.id === `gpt-image-2-5-${variant}`)
      assert.equal(model.apiId, `gpt-image-2.5-${variant}`)
      assert.equal(model.input, null)
      assert.equal(model.output, null)
      assert.equal(model.imagePricing.image_output, 30)
      assert.deepEqual(model.capabilities, ['image-gen'])
    }
    const protocol = JSON.parse(await read('/research/image-workflows/protocol.json'))
    assert.equal(protocol.lastMeasured, null)
    assert.equal(protocol.measuredRuns, 0)
    const receipts = JSON.parse(await read('/research/model-arena/receipts.json'))
    assert.ok(receipts.plannedEvaluations.some((p) => p.id === protocol.id && p.status === 'not_run'))
    const discovery = await read('/llms.txt')
    assert.ok(discovery.includes('/research/image-workflows/protocol.json'))
    const sitemap = await read('/sitemap.xml')
    assert.ok(sitemap.includes('/guides/reference-to-campaign'))
    assert.ok(sitemap.includes('/blog/chatgpt-images-2-5-creator-founder-workflows'))
  } finally {
    await stopManagedProcess(child)
  }
})
