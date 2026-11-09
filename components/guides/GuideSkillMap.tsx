import { Children, isValidElement, type ReactElement, type ReactNode } from 'react'

/**
 * Crawlable skill map for a guide. The MDX owns every claim and URL.
 * Skills that share a status render once under that label, as a list.
 */
export function GuideSkillMap({
  caption,
  children,
}: {
  caption: string
  children: ReactNode
}) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<{
    status?: string
  }>[]
  const groups: { status: string; items: ReactElement[] }[] = []
  for (const item of items) {
    const status =
      typeof item.props.status === 'string' && item.props.status.trim()
        ? item.props.status.trim()
        : 'Status'
    const existing = groups.find((group) => group.status === status)
    if (existing) existing.items.push(item)
    else groups.push({ status, items: [item] })
  }

  return (
    <figure
      id="skill-map"
      aria-labelledby="skill-map-caption"
      className="my-10 scroll-mt-28 border border-white/10"
    >
      <figcaption
        id="skill-map-caption"
        className="border-b border-white/10 px-4 py-3 text-sm leading-6 text-white/70"
      >
        {caption}
      </figcaption>
      <div>
        {groups.map((group) => {
          const bandId = `skill-band-${group.status
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')}`
          return (
            <section
              key={group.status}
              aria-labelledby={bandId}
              className="border-b border-white/10 px-4 py-4 last:border-b-0"
            >
              <h3 id={bandId} className="text-sm font-medium text-white/80">
                {group.status}
              </h3>
              <ul className="mt-1 list-none">{group.items}</ul>
            </section>
          )
        })}
      </div>
    </figure>
  )
}

export function GuideSkill({
  name,
  status,
  href,
  children,
}: {
  name: string
  status: string
  href: string
  children: ReactNode
}) {
  const safeHref = href.startsWith('https://') ? href : undefined
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return (
    <li id={`skill-${slug}`} data-status={status} className="border-t border-white/10 py-3 first:border-t-0">
      {safeHref ? (
        <a
          href={safeHref}
          className="text-base font-semibold text-white underline decoration-white/25 underline-offset-4 outline-none hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {name}
        </a>
      ) : (
        <p className="text-base font-semibold text-white">{name}</p>
      )}
      <div className="mt-1 text-sm leading-6 text-white/70">{children}</div>
    </li>
  )
}
