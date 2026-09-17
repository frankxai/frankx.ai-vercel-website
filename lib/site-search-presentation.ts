import type { SiteSearchItem } from './site-search'

export function buildSearchPresentation(results: SiteSearchItem[], query: string) {
  const groups = new Map<string, SiteSearchItem[]>()

  if (query.trim()) {
    if (results.length) groups.set('Results', results)
  } else {
    for (const item of results) {
      const group = groups.get(item.group) ?? []
      group.push(item)
      groups.set(item.group, group)
    }
  }

  // Assign indices after presentation order is settled. Rendering, keyboard
  // selection, and activation must refer to this same sequence.
  let index = 0
  const sections = Array.from(groups, ([label, items]) => ({
    label,
    entries: items.map((item) => ({ item, index: index++ })),
  }))

  return {
    sections,
    items: sections.flatMap((section) => section.entries.map((entry) => entry.item)),
  }
}
