export type HarnessId = 'claude' | 'cursor' | 'antigravity' | 'grok'
export type ShellId = 'bash' | 'powershell'

const CLONE = 'git clone --depth 1 https://github.com/frankxai/agentic-creator-os.git'

/** The public installer reads its source from the clone but writes project files to cwd. */
export function installCommand(harness: HarnessId, shell: ShellId): string {
  const script = `./agentic-creator-os/install.sh --platform=${harness} --target=.`

  if (shell === 'powershell') {
    const gitBash = "& (Join-Path (Split-Path (Split-Path (Get-Command git).Source)) 'bin/bash.exe')"
    return `${CLONE}; if ($LASTEXITCODE -eq 0) { ${gitBash} ${script} }`
  }

  return `${CLONE} && bash ${script}`
}
