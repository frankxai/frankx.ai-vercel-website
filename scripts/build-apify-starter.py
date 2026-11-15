"""Generate a portable text-only starter from the canonical example; stdlib only."""
from pathlib import Path
root = Path(__file__).resolve().parents[1]
source = (root / 'examples/apify-research/request-plan.mjs').read_text()
source = source[:source.index("if (process.argv[1] && import.meta.url")]
fixture = (root / 'examples/apify-research/fixtures/mission.json').read_text().strip()
tests = (root / 'examples/apify-research/request-plan.test.mjs').read_text()
tests = tests[tests.index("test('both interfaces"):]
start = tests.index("test('offline command")
end = tests.index("test('unapproved hosts", start)
tests = tests[:start] + '''test('offline command prints a plan without touching fetch or exposing credentials', () => {
  const originalFetch = globalThis.fetch
  globalThis.fetch = () => { throw new Error('network forbidden') }
  try {
    const output = JSON.stringify(makeResearchPlan(fixture))
    assert.equal(JSON.parse(output).executionEnabled, false)
    assert.equal(JSON.parse(output).requiresApproval, true)
    assert.equal(output.includes('Bearer token from its secret manager'), true)
  } finally { globalThis.fetch = originalFetch }
})

''' + tests[end:]
output = source + '\nconst fixture = ' + fixture + '''\n
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.includes('--verify')) {
    const { default: assert } = await import('node:assert/strict')
    const { default: test } = await import('node:test')
''' + tests + '''
  } else {
    console.log(JSON.stringify(makeResearchPlan(fixture), null, 2))
  }
}
'''
output = '// Original FrankX teaching example. See LICENSE.txt. No network execution.\n' + output
folder = root / 'public/downloads/apify-research'
folder.mkdir(parents=True, exist_ok=True)
(folder / 'offline-starter.mjs').write_text(output)
(folder / 'LICENSE.txt').write_text((root / 'examples/apify-research/LICENSE').read_text())
(folder / 'evidence-receipt.json').write_text((root / 'docs/ops/apify-product-lane/evaluation.template.json').read_text())
print(f'offline-starter.mjs: {len(output.encode())} bytes')
