import paths from './paths.json' with { type: 'json' }
import entries from './resources.json' with { type: 'json' }
import { challengeBriefs, researchReadings } from '../partnerships/university-collaboration.ts'

export { paths }
export const intake = '/partnerships/universities#join'
export type Resource = typeof entries[number]
export type Path = typeof paths[number]

const reviewed = { language: 'en', reviewedAt: '2026-11-18' }
export const resources: Resource[] = [
  ...challengeBriefs.map(brief => ({
    ...reviewed, id: brief.id, title: brief.title, href: `/university/challenges/${brief.id}`,
    kind: 'Challenge', publisher: 'FrankX', access: 'Free brief', task: brief.task,
  })),
  ...entries,
  ...researchReadings.map(reading => ({
    ...reviewed, id: reading.id, title: reading.title, href: reading.href, task: reading.detail,
    kind: 'Research reading', publisher: reading.citation,
    access: reading.id === 'teamwork' ? 'Publisher access varies' : 'Free to read',
  })),
]

export function resourcesById(ids: string[]) {
  return ids.map(id => {
    const resource = resources.find(item => item.id === id)
    if (!resource) throw new Error('Unknown Commons resource: ' + id)
    return resource
  })
}

export function filterResources(query: string, kind: string) {
  const terms = query.trim().toLocaleLowerCase('en').split(/\s+/).filter(Boolean)
  return resources.filter(resource => {
    const fields = [resource.title, resource.task, resource.publisher, resource.kind, resource.language].join(' ').toLocaleLowerCase('en')
    return (!kind || resource.kind === kind) && terms.every(term => fields.includes(term))
  })
}
