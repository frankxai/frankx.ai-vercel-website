import 'server-only'
import manifest from '@/data/repos-manifest.json'
import { manifestRepoToPublicRepo, type MapSnapshot, type PublicMapRepo } from './model'
import { readPublicSource } from './source'

// Public endpoints only. Never attach GITHUB_TOKEN: this data is rendered publicly.
const SOURCES = [
  { owner: 'frankxai', path: 'users/frankxai/repos' },
  { owner: 'Starlight-Intelligence', path: 'orgs/Starlight-Intelligence/repos' },
  { owner: 'Arcanea-Labs', path: 'orgs/Arcanea-Labs/repos' },
] as const
export async function getMapSnapshot(): Promise<MapSnapshot> {
  const results = await Promise.all(SOURCES.map(async ({ owner, path }) => {
    const url = `https://api.github.com/${path}?sort=pushed&direction=desc&per_page=30&type=${owner === 'frankxai' ? 'owner' : 'public'}`
    return readPublicSource(owner, url, sourceUrl => fetch(sourceUrl, {
      headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
      next: { revalidate: 3600, tags: ['public-ecosystem-map'] },
      signal: AbortSignal.timeout(4000),
    }))
  }))
  const repos = new Map<string, PublicMapRepo>()
  // Historical navigation fallback. Never serialize notes, priorities or private records.
  for (const repo of manifest.repos) {
    const entry = manifestRepoToPublicRepo(repo, manifest.lastUpdated)
    if (entry) repos.set(entry.id.toLowerCase(), entry)
  }
  for (const result of results) for (const repo of result.repos) repos.set(repo.id.toLowerCase(), repo)
  return { repos: [...repos.values()].sort((a, b) => a.id.localeCompare(b.id)), sources: results.map(result => result.source), snapshotDate: manifest.lastUpdated }
}
