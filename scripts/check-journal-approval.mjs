/** Read-only CI gate. Agents must never self-post the owner approval receipt. */
import fs from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import matter from 'gray-matter'

export function hasJournalApproval(comments, head) {
  return comments.some((comment) => comment.user?.login === 'frankxai' &&
    comment.user?.type === 'User' && comment.body?.trim() === `approve founder journal publication ${head}`)
}

async function run() {
  if (process.env.GITHUB_EVENT_NAME !== 'pull_request') {
    console.log('Journal publication approval is checked on pull requests.'); return
  }
  const event = JSON.parse(await fs.readFile(process.env.GITHUB_EVENT_PATH, 'utf8'))
  const pr = event.pull_request
  const repository = event.repository.full_name
  if (repository !== 'frankxai/frankx.ai-vercel-website') throw new Error('Unexpected journal publisher.')
  const api = async (endpoint) => {
    const response = await fetch(`https://api.github.com/repos/${repository}/${endpoint}`, {
      headers: { Accept: 'application/vnd.github+json', ...(process.env.GH_READ_TOKEN ? { Authorization: `Bearer ${process.env.GH_READ_TOKEN}` } : {}) },
    })
    if (!response.ok) throw new Error(`Journal approval lookup failed (${response.status}); no approval inferred.`)
    return response.json()
  }
  const paginate = async (endpoint) => {
    const all = []
    for (let page = 1; ; page++) {
      const rows = await api(`${endpoint}?per_page=100&page=${page}`)
      all.push(...rows)
      if (rows.length < 100) return all
    }
  }
  const files = await paginate(`pulls/${pr.number}/files`)
  let needsApproval = false
  for (const file of files) {
    if (!/^content\/journal\/(?!_).*\.mdx?$/.test(file.filename) || file.status === 'removed') continue
    const result = await api(`contents/${file.filename}?ref=${pr.head.sha}`)
    const { data } = matter(Buffer.from(result.content, 'base64').toString('utf8'))
    if (data.published === true) needsApproval = true
  }
  if (!needsApproval) { console.log('Journal drafts only; no publication requested.'); return }
  const comments = await paginate(`issues/${pr.number}/comments`)
  if (!hasJournalApproval(comments, pr.head.sha)) throw new Error(`Frank must comment: approve founder journal publication ${pr.head.sha}. Then rerun CI. Approval is invalidated by every new commit.`)
  console.log(`Frank approved journal publication at ${pr.head.sha}.`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  run().catch(error => { console.error(error.message); process.exitCode = 1 })
}
