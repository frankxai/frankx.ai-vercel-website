import type { ReactNode } from 'react'

/**
 * Crawlable skill map for a guide. The MDX owns every claim and URL.
 * This component only lays those claims out as a linked figure.
 */
export function GuideSkillMap({
  caption,
  children,
}: {
  caption: string
  children: ReactNode
}) {
  return (
    <figure
      id="skill-map"
      aria-labelledby="skill-map-caption"
      className="my-10 scroll-mt-28 border border-white/10 bg-white/[0.03]"
    >
      <figcaption
        id="skill-map-caption"
        className="border-b border-white/10 px-4 py-3 text-sm leading-6 text-white/70"
      >
        {caption}
      </figcaption>
      <ol className="grid list-none grid-cols-1 gap-px bg-white/10 p-px md:grid-cols-2">
        {children}
      </ol>
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
    <li id={`skill-${slug}`} className="bg-[#0a0a0b] px-4 py-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
        {status}
      </p>
      {safeHref ? (
        <a
          href={safeHref}
          className="mt-2 inline-block text-base font-semibold text-white underline decoration-white/25 underline-offset-4 outline-none hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {name}
        </a>
      ) : (
        <p className="mt-2 text-base font-semibold text-white">{name}</p>
      )}
      <div className="mt-2 text-sm leading-6 text-white/70">{children}</div>
    </li>
  )
}
