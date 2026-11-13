export type MapGroup = 'arcanea' | 'acos' | 'websites' | 'creator-tools' | 'products' | 'research'
export interface PublicMapRepo {
  id: string; name: string; owner: string; description: string; url: string; group: MapGroup
  pushedAt: string | null; observedAt: string; source: 'github' | 'snapshot'; archived: boolean; stars: number | null
}
export interface MapSource { owner: string; url: string; state: 'available' | 'unavailable'; observedAt: string | null }
export interface MapSnapshot { repos: PublicMapRepo[]; sources: MapSource[]; snapshotDate: string }
const OWNERS = new Set(['frankxai', 'starlight-intelligence', 'arcanea-labs'])
export function classifyRepo(owner: string, name: string): MapGroup {
  if (owner.toLowerCase() === 'arcanea-labs' || /arcanea|arcanean/i.test(name)) return 'arcanea'
  if (owner.toLowerCase() === 'starlight-intelligence' || /starlight|acos|agentic-creator-os/i.test(name)) return 'acos'
  if (/skills|claude-code|awesome-|^agents$/i.test(name)) return 'creator-tools'
  if (/frankx|academy|content/i.test(name)) return 'websites'
  if (/vibe-os|investor|production-agent|soulbook/i.test(name)) return 'products'
  return 'research'
}
function validDate(value: unknown): value is string {
  return typeof value === 'string' && Number.isFinite(Date.parse(value))
}
/** Public DTO: no private metadata, internal notes or arbitrary upstream URLs. */
export function normalizePublicRepo(value: unknown, observedAt: string): PublicMapRepo | null {
  if (!value || typeof value !== 'object') return null
  const repo = value as Record<string, unknown>
  const owner = repo.owner as { login?: unknown } | undefined
  if (repo.private !== false || repo.fork !== false || typeof owner?.login !== 'string') return null
  if (!OWNERS.has(owner.login.toLowerCase()) || typeof repo.name !== 'string' || !/^[\w.-]+$/.test(repo.name)) return null
  const id = `${owner.login}/${repo.name}`
  if (repo.full_name !== id) return null
  return {
    id, name: repo.name, owner: owner.login,
    description: typeof repo.description === 'string' ? repo.description.slice(0, 400) : '',
    url: `https://github.com/${id}`, group: classifyRepo(owner.login, repo.name),
    pushedAt: validDate(repo.pushed_at) ? repo.pushed_at : null,
    observedAt, source: 'github', archived: repo.archived === true,
    stars: typeof repo.stargazers_count === 'number' && Number.isFinite(repo.stargazers_count) ? Math.max(0, repo.stargazers_count) : null,
  }
}
export function recentActivity(repos: PublicMapRepo[], now: number, limit = 4): PublicMapRepo[] {
  return repos.filter(repo => repo.source === 'github' && !repo.archived && repo.pushedAt &&
    Date.parse(repo.pushedAt) <= now && now - Date.parse(repo.pushedAt) < 14 * 86400000)
    .sort((a, b) => Date.parse(b.pushedAt!) - Date.parse(a.pushedAt!) || a.id.localeCompare(b.id))
    .slice(0, limit)
}
export function filterRepos(repos: PublicMapRepo[], query: string, group: MapGroup | 'all', activeOnly: boolean) {
  const term = query.trim().toLowerCase()
  return repos.filter(repo => (group === 'all' || repo.group === group) && (!activeOnly || !repo.archived) &&
    `${repo.id} ${repo.description}`.toLowerCase().includes(term))
}
