import { readFile } from 'node:fs/promises'

const sourcePath = new URL('../data/ai-architecture/official-sources.json', import.meta.url)
const sources = JSON.parse(await readFile(sourcePath, 'utf8'))
const urls = [...new Set(sources.flatMap((source) => [source.docsUrl, source.repoUrl]))]

const results = []
for (const url of urls) {
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': 'FrankX-Architecture-Link-Check/1.0' },
      signal: AbortSignal.timeout(20_000),
    })
    results.push({ url, status: response.status, finalUrl: response.url })
    if (!response.ok) process.exitCode = 1
  } catch (error) {
    results.push({
      url,
      status: 'ERROR',
      error: error instanceof Error ? error.message : String(error),
    })
    process.exitCode = 1
  }
}

console.log(JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2))
