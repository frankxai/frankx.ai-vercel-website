import { normalizePublicRepo, type MapSource, type PublicMapRepo } from './model.ts'

/** Isolated parsing boundary: a failed source never gets a fabricated observation date. */
export async function readPublicSource(owner: string, url: string, fetcher: (url: string) => Promise<Response>): Promise<{ source: MapSource; repos: PublicMapRepo[] }> {
  try {
    const response = await fetcher(url)
    if (!response.ok) throw new Error('Source unavailable')
    const raw: unknown = await response.json()
    if (!Array.isArray(raw)) throw new Error('Invalid source')
    const date = response.headers.get('date')
    if (!date || !Number.isFinite(Date.parse(date))) throw new Error('Missing source date')
    const observedAt = new Date(date).toISOString()
    const repos = raw.map(repo => normalizePublicRepo(repo, observedAt)).filter((repo): repo is PublicMapRepo => repo !== null && repo.owner.toLowerCase() === owner.toLowerCase())
    return { source: { owner, url, state: 'available', observedAt }, repos }
  } catch {
    return { source: { owner, url, state: 'unavailable', observedAt: null }, repos: [] }
  }
}
