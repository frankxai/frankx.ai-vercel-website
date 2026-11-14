export type TocHeading = {
  id: string
  text: string
  level: 2 | 3
}

export type TocSection = {
  id: string
  text: string
  children: TocHeading[]
}

/**
 * Group a flat list of H2 and H3 headings into top-level H2 sections with nested H3 children.
 * Leading H3s before the first H2 are ignored so section counts reflect top-level H2 structure only.
 */
export function groupTocSections(headings: TocHeading[]): TocSection[] {
  const sections: TocSection[] = []
  for (const heading of headings) {
    if (heading.level === 2) {
      sections.push({ id: heading.id, text: heading.text, children: [] })
    } else if (sections.length > 0) {
      sections[sections.length - 1].children.push(heading)
    }
  }
  return sections
}
