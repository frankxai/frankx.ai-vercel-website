type NavigationGroup = {
  label: string
  items: readonly string[]
}

export function resolveNavigationGroups<T extends { name: string }>(
  items: readonly T[],
  groups: readonly NavigationGroup[],
): { label: string; items: T[] }[] {
  const assigned = new Set<T>()
  const resolved: { label: string; items: T[] }[] = []

  for (const group of groups) {
    const groupItems: T[] = []
    for (const name of group.items) {
      const item = items.find((candidate) => candidate.name === name)
      if (item && !assigned.has(item)) {
        assigned.add(item)
        groupItems.push(item)
      }
    }
    if (groupItems.length > 0) {
      resolved.push({ label: group.label, items: groupItems })
    }
  }

  // Curation may group destinations, but must never silently remove them.
  const remaining = items.filter((item) => !assigned.has(item))
  if (remaining.length > 0) {
    resolved.push({ label: 'More to explore', items: remaining })
  }

  return resolved
}
