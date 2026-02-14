import Link from 'next/link'
import Image from 'next/image'
import changelogData from '@/data/changelog-entries.json'

const typeStyles: Record<string, { label: string; color: string; bg: string; glow: string }> = {
  shipped: { label: 'Shipped', color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20', glow: 'shadow-emerald-500/20' },
  improved: { label: 'Improved', color: 'text-cyan-400', bg: 'bg-cyan-400/10 border-cyan-400/20', glow: 'shadow-cyan-500/20' },
  fixed: { label: 'Fixed', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20', glow: 'shadow-amber-500/20' },
}

const impactStyles: Record<string, { dot: string; ring: string }> = {
  major: { dot: 'w-3 h-3 bg-emerald-400', ring: 'ring-4 ring-emerald-400/20' },
  medium: { dot: 'w-2.5 h-2.5 bg-cyan-400', ring: 'ring-2 ring-cyan-400/10' },
  small: { dot: 'w-2 h-2 bg-zinc-500', ring: '' },
}

function StatPill({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex flex-col items-center px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
      <span className={`text-lg font-bold font-mono ${accent || 'text-white/80'}`}>{value}</span>
      <span className="text-[11px] text-white/30 uppercase tracking-wider mt-0.5">{label}</span>
    </div>
  )
}

function MetricBadge({ label, before, after, unit }: { label: string; before: string; after: string; unit: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
      <span className="text-xs text-white/40">{label}</span>
      <span className="text-xs text-white/30 line-through">{before}{unit}</span>
      <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
      <span className="text-xs text-emerald-400 font-semibold">{after}{unit}</span>
    </div>
  )
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-white/5">
        {/* Gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.03] via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 pt-28 pb-14">
          <Link
            href="/"
            className="text-white/30 hover:text-white/60 text-sm transition-colors mb-8 inline-flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400/70 text-sm font-medium tracking-wide uppercase">Live Updates</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Changelog
          </h1>
          <p className="text-white/40 text-lg max-w-xl">
            What shipped this week. Real progress, no fluff.
          </p>
        </div>
      </section>

      {/* Weeks */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {changelogData.weeks.map((week, weekIndex) => (
          <div key={week.id} className="mb-24">
            {/* Week Header Card */}
            <div className="relative mb-10 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
              {/* Subtle top accent line */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-baseline gap-3">
                    <h2 className="text-3xl font-bold">{week.label}</h2>
                    <span className="text-white/20 text-sm font-mono">{week.dateRange}</span>
                  </div>
                  <p className="text-white/40 mt-2 max-w-lg text-sm leading-relaxed">{week.summary}</p>
                </div>
                {weekIndex === 0 && (
                  <span className="self-start px-3 py-1 text-xs font-medium rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                    Latest
                  </span>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                <StatPill label="Commits" value={String(week.stats.commits)} accent="text-emerald-400" />
                <StatPill label="Lines" value={`+${(week.stats.linesAdded / 1000).toFixed(0)}k`} accent="text-cyan-400" />
                <StatPill label="Files" value={String(week.stats.filesChanged)} />
                <StatPill label="Pages" value={String(week.stats.newPages)} />
                <StatPill label="Images" value={String(week.stats.imagesGenerated)} />
              </div>
            </div>

            {/* Entries */}
            <div className="space-y-4">
              {week.entries.map((entry) => {
                const style = typeStyles[entry.type] || typeStyles.shipped
                const impact = impactStyles[entry.impact || 'small'] || impactStyles.small
                const e = entry as any
                const linkUrl = e.blogUrl || e.url
                const hasImage = !!e.image
                const hasMetrics = !!e.metrics
                const isMajor = entry.impact === 'major'

                const card = (
                  <div className={`group relative rounded-xl border transition-all duration-300 overflow-hidden ${
                    isMajor
                      ? 'bg-white/[0.03] border-white/[0.08] hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/5'
                      : 'bg-white/[0.015] border-white/[0.05] hover:border-white/[0.10] hover:bg-white/[0.025]'
                  }`}>
                    {/* Hero image for major entries */}
                    {hasImage && (
                      <div className="relative w-full aspect-[21/9] overflow-hidden">
                        <Image
                          src={e.image}
                          alt={entry.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent" />
                      </div>
                    )}

                    <div className={`p-5 ${hasImage ? '-mt-12 relative z-10' : ''}`}>
                      {/* Top row: badge + date + commit */}
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${style.bg} ${style.color}`}>
                          {style.label}
                        </span>
                        <span className="text-white/20 text-xs font-mono">{entry.date}</span>
                        {(entry as any).commit && (
                          <span className="text-white/10 text-xs font-mono bg-white/[0.03] px-2 py-0.5 rounded">
                            {(entry as any).commit}
                          </span>
                        )}
                        {/* Impact indicator */}
                        <div className={`rounded-full ${impact.dot} ${impact.ring} ml-auto`} />
                      </div>

                      {/* Title */}
                      <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                        linkUrl ? 'group-hover:text-emerald-400' : ''
                      }`}>
                        {entry.title}
                        {linkUrl && (
                          <svg className="inline-block w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        )}
                      </h3>

                      {/* Description */}
                      <p className="text-white/45 text-sm leading-relaxed mb-3">
                        {entry.description}
                      </p>

                      {/* Metrics badge */}
                      {hasMetrics && (
                        <div className="mb-3">
                          <MetricBadge
                            label={e.metrics.label}
                            before={e.metrics.before}
                            after={e.metrics.after}
                            unit={e.metrics.unit}
                          />
                        </div>
                      )}

                      {/* Bottom row: tags + link */}
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex flex-wrap gap-1.5">
                          {entry.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] text-white/25 bg-white/[0.03] px-2 py-0.5 rounded-md border border-white/[0.04]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {linkUrl && (
                          <span className="text-xs text-emerald-400/60 group-hover:text-emerald-400 transition-colors flex items-center gap-1">
                            {e.blogUrl ? 'Read more' : 'View'}
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )

                // Wrap in Link if there's a URL
                if (linkUrl) {
                  return (
                    <Link key={entry.id} href={linkUrl} className="block">
                      {card}
                    </Link>
                  )
                }
                return <div key={entry.id}>{card}</div>
              })}
            </div>
          </div>
        ))}

        {/* Footer CTA */}
        <div className="border-t border-white/5 pt-14">
          <div className="text-center mb-8">
            <p className="text-white/50 text-sm mb-2">Follow the build in real-time</p>
            <p className="text-white/20 text-xs">Updates every week. Every commit tracked.</p>
          </div>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/feed"
              className="text-sm text-white/60 hover:text-white px-5 py-2.5 rounded-xl border border-white/10 hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all inline-flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Feed
            </Link>
            <Link
              href="/blog"
              className="text-sm text-white/60 hover:text-white px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/20 transition-all"
            >
              Blog
            </Link>
            <Link
              href="/rss.xml"
              className="text-sm text-white/60 hover:text-white px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/20 transition-all"
            >
              RSS
            </Link>
            <a
              href="https://github.com/frankxai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 hover:text-white px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/20 transition-all"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
