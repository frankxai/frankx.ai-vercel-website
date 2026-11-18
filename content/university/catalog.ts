import paths from './paths.json' with { type: 'json' }
import entries from './resources.json' with { type: 'json' }
import { challengeBriefs, researchReadings } from '../partnerships/university-collaboration.ts'

export { paths }
export const intake = '/partnerships/universities#join'
type Entry = typeof entries[number]
type Review = NonNullable<Entry['editorialReview']>
export type Resource = Pick<Entry, 'id' | 'title' | 'href' | 'kind' | 'task' | 'publisher' | 'access' | 'language' | 'reviewedAt'> & { editorialReview?: Review }
export type Path = typeof paths[number]

const reviewed = { language: 'en', reviewedAt: '2026-11-18' }
export const resources: Resource[] = [
  ...challengeBriefs.map(brief => ({
    ...reviewed, id: brief.id, title: brief.title, href: '/university/challenges/' + brief.id,
    kind: 'Challenge', publisher: 'FrankX', access: 'Free brief', task: brief.task,
  })),
  ...entries.filter(entry => entry.placement !== 'supplement' && entry.editorialReview?.publicationStatus !== 'held'),
  ...researchReadings.map(reading => ({
    ...reviewed, id: reading.id, title: reading.title, href: reading.href, task: reading.detail,
    kind: 'Research reading', publisher: reading.citation,
    access: reading.id === 'teamwork' ? 'Publisher access varies' : 'Free to read',
  })),
]

const supplements = entries.filter(entry =>
  entry.placement === 'supplement' && entry.editorialReview?.publicationStatus === 'proposed-for-commons' &&
  entry.editorialReview.status === 'verified' && entry.editorialReview.accessModel === 'free'
)
export const allResources: Resource[] = [...resources, ...supplements]

export function resourcesById(ids: string[]) {
  return ids.map(id => {
    const resource = allResources.find(item => item.id === id)
    if (!resource) throw new Error('Unknown Commons resource: ' + id)
    return resource
  })
}

export function filterResources(query: string, kind: string, includeSupplements = false) {
  const terms = query.trim().toLocaleLowerCase('en').split(/\s+/).filter(Boolean)
  const collection = includeSupplements ? allResources : resources
  return collection.filter(resource => {
    const fields = [resource.title, resource.task, resource.publisher, resource.kind, resource.language].join(' ').toLocaleLowerCase('en')
    return (!kind || resource.kind === kind) && terms.every(term => fields.includes(term))
  })
}
