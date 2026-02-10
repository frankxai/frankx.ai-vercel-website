import Link from 'next/link'
import changelogData from '@/data/changelog-entries.json'

const typeStyles: Record<string, { label: string; color: string; bg: string }> = {
  shipped: { label: 'Shipped', color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20' },
  improved: { label: 'Improved', color: 'text-cyan-400', bg: 'bg-cyan-400/10 border-cyan-400/20' },
  fixed: { label: 'Fixed', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20' },
}

const impactDots: Record<string, string> = {
  major: 'w-2.5 h-2.5 bg-emerald-400',
  medium: 'w-2 h-2 bg-cyan-400',
  small: 'w-1.5 h-1.5 bg-zinc-500',
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Header */}
      <section className="border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 pt-24 pb-12">
          <Link
            href="/"
            className="text-white/40 hover:text-white/70 text-sm transition-colors mb-6 inline-block"
          >
            Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Changelog
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            What shipped this week. Real progress, no fluff.
          </p>
        </div>
      </section>

      {/* Weeks */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        {changelogData.weeks.map((week) => (
          <div key={week.id} className="mb-20">
            {/* Week Header */}
            <div className="flex items-baseline gap-4 mb-3">
              <h2 className="text-2xl font-bold">{week.label}</h2>
              <span className="text-white/30 text-sm font-mono">{week.dateRange}</span>
            </div>
            <p className="text-white/50 mb-6">{week.summary}</p>

            {/* Stats Bar */}
            <div className="flex flex-wrap gap-6 mb-10 text-sm">
              <div>
                <span className="text-white/30">Commits</span>{' '}
                <span className="text-emerald-400 font-mono font-semibold">{week.stats.commits}</span>
              </div>
              <div>
                <span className="text-white/30">Lines</span>{' '}
                <span className="text-cyan-400 font-mono font-semibold">+{week.stats.linesAdded.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-white/30">Files</span>{' '}
                <span className="text-white/70 font-mono">{week.stats.filesChanged}</span>
              </div>
              <div>
                <span className="text-white/30">New pages</span>{' '}
                <span className="text-white/70 font-mono">{week.stats.newPages}</span>
              </div>
              <div>
                <span className="text-white/30">Images</span>{' '}
                <span className="text-white/70 font-mono">{week.stats.imagesGenerated}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/5" />

              <div className="space-y-8">
                {week.entries.map((entry) => {
                  const style = typeStyles[entry.type] || typeStyles.shipped
                  const dot = impactDots[entry.impact] || impactDots.small
                  return (
                    <div key={entry.id} className="relative pl-8">
                      {/* Timeline dot */}
                      <div className={`absolute left-0 top-2 rounded-full ${dot}`} />

                      {/* Content */}
                      <div className="group">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${style.bg} ${style.color}`}>
                            {style.label}
                          </span>
                          <span className="text-white/20 text-xs font-mono">{entry.date}</span>
                          {(entry as any).commit && (
                            <span className="text-white/15 text-xs font-mono">{(entry as any).commit}</span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-1.5 group-hover:text-emerald-400 transition-colors">
                          {entry.title}
                        </h3>
                        <p className="text-white/50 text-sm leading-relaxed">
                          {entry.description}
                        </p>
                        {entry.tags && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {entry.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs text-white/25 bg-white/3 px-2 py-0.5 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Subscribe / Feed link */}
        <div className="border-t border-white/5 pt-12 text-center">
          <p className="text-white/30 text-sm mb-4">
            Follow the build in real-time
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/feed"
              className="text-sm text-white/50 hover:text-white px-4 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-all"
            >
              Live Feed
            </Link>
            <Link
              href="/rss.xml"
              className="text-sm text-white/50 hover:text-white px-4 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-all"
            >
              RSS
            </Link>
            <a
              href="https://github.com/frankxai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/50 hover:text-white px-4 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-all"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
