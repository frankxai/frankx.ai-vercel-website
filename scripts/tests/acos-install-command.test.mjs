import assert from 'node:assert/strict'
import { test } from 'node:test'
import { installCommand } from '../../lib/acos/install-command.ts'

for (const harness of ['claude', 'cursor', 'antigravity', 'grok']) {
  test(`${harness} Bash setup stays in the user's project`, () => {
    const command = installCommand(harness, 'bash')
    assert.match(command, /git clone --depth 1 https:\/\/github\.com\/frankxai\/agentic-creator-os\.git && bash/)
    assert.match(command, new RegExp(`install\\.sh --platform=${harness} --target=\\.$`))
    assert.doesNotMatch(command, /cd agentic-creator-os/)
  })

  test(`${harness} PowerShell setup stops if clone fails`, () => {
    const command = installCommand(harness, 'powershell')
    assert.match(command, /if \(\$LASTEXITCODE -eq 0\)/)
    assert.match(command, /bin\/bash\.exe/)
    assert.match(command, new RegExp(`install\\.sh --platform=${harness} --target=\\.`))
    assert.doesNotMatch(command, /Set-Location/)
  })
}
