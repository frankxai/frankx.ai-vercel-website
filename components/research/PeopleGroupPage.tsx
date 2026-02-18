import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  FlaskConical,
  GraduationCap,
  Hammer,
  Lightbulb,
  Palette,
  PenSquare,
  Stethoscope,
  TrendingUp,
  Music4,
  type LucideIcon,
} from 'lucide-react'
import {
  getPeopleForGroup,
  getPeopleGroup,
  getPeopleGroupLinks,
  type PeopleGroupKey,
} from '@/lib/research/people-groups'

interface PeopleGroupPageProps {
  groupKey: PeopleGroupKey
}

const iconMap: Record<PeopleGroupKey, LucideIcon> = {
  entrepreneurs: BriefcaseBusiness,
  builders: Hammer,
  'content-creators': PenSquare,
  inventors: Lightbulb,
  researcher: FlaskConical,
  professors: GraduationCap,
  doctors: Stethoscope,
  investors: TrendingUp,
  designers: Palette,
  producers: Music4,
}

const colorMap = {
  cyan: {
    badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    dot: 'bg-cyan-300',
    glow: 'from-cyan-500/12 to-cyan-500/4',
  },
  indigo: {
    badge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    dot: 'bg-indigo-300',
    glow: 'from-indigo-500/12 to-indigo-500/4',
  },
  amber: {
    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    dot: 'bg-amber-300',
    glow: 'from-amber-500/12 to-amber-500/4',
  },
  rose: {
    badge: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    dot: 'bg-rose-300',
    glow: 'from-rose-500/12 to-rose-500/4',
  },
  fuchsia: {
    badge: 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30',
    dot: 'bg-fuchsia-300',
    glow: 'from-fuchsia-500/12 to-fuchsia-500/4',
  },
  emerald: {
    badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    dot: 'bg-emerald-300',
    glow: 'from-emerald-500/12 to-emerald-500/4',
  },
}

function titlePrefix(title: string): string {
  return title.endsWith('s') ? title.slice(0, -1) : title
}

export default function PeopleGroupPage({ groupKey }: PeopleGroupPageProps) {
  const group = getPeopleGroup(groupKey)
  const people = getPeopleForGroup(groupKey)
  const top10 = people.filter((person) => person.top10Rank).slice(0, 8)
  const relatedGroups = getPeopleGroupLinks().filter((entry) => entry.key !== groupKey)
  const Icon = iconMap[groupKey]
  const colors = colorMap[group.color]

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute top-0 left-1/4 w-[60%] h-[55%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.05) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[60%] h-[50%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.04) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      <div className="relative z-10">
        <section className="pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3 text-sm mb-8 text-white/45">
              <Link href="/research" className="inline-flex items-center gap-1.5 hover:text-white/80 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Research Hub
              </Link>
              <span>/</span>
              <Link href="/research/visionaries" className="hover:text-white/80 transition-colors">
                Visionaries
              </Link>
              <span>/</span>
              <span className="text-white/70">{group.title}</span>
            </div>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                <Icon className="w-3.5 h-3.5 text-cyan-300" />
                <span className="text-xs font-semibold text-cyan-300 tracking-wider uppercase">
                  People Index / {group.shortLabel}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-5">
                {group.title}
                <span className="block bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">
                  Research Index
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/60 max-w-3xl leading-relaxed mb-8">
                {group.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xl font-bold text-white">{people.length}</p>
                  <p className="text-[11px] text-white/45">Profiles</p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xl font-bold text-white">{top10.length}</p>
                  <p className="text-[11px] text-white/45">Top 10 Overlap</p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xl font-bold text-white">{titlePrefix(group.title)}</p>
                  <p className="text-[11px] text-white/45">Archetype</p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xl font-bold text-white">Live</p>
                  <p className="text-[11px] text-white/45">Curated Index</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm text-white/45 uppercase tracking-wider mb-3">Switch Archetype</h2>
            <div className="flex flex-wrap gap-2">
              {getPeopleGroupLinks().map((entry) => {
                const active = entry.key === groupKey
                const entryColors = colorMap[entry.color]

                return (
                  <Link
                    key={entry.key}
                    href={entry.href}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      active
                        ? `${entryColors.badge}`
                        : 'bg-white/[0.02] text-white/60 border-white/[0.12] hover:bg-white/[0.08]'
                    }`}
                  >
                    {entry.shortLabel} ({entry.count})
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {top10.length > 0 ? (
          <section className="py-8 md:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-white mb-5">Top Priority in This Archetype</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {top10.map((person) => (
                  <article
                    key={person.id}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4"
                  >
                    <p className="text-[10px] text-white/40 mb-1">Top {person.top10Rank}</p>
                    <h3 className="text-base font-semibold text-white mb-1">{person.name}</h3>
                    <p className="text-xs text-white/50 line-clamp-2">{person.role}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="py-10 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-2">{group.title} Directory</h2>
            <p className="text-white/55 mb-6">Curated profiles from your research hub, filtered by archetype.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {people.map((person) => (
                <article
                  key={person.id}
                  className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.glow} opacity-30`} />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-white">{person.name}</h3>
                      {person.top10Rank ? (
                        <span className="text-[10px] px-2 py-1 rounded-full bg-white text-black font-semibold">
                          Top {person.top10Rank}
                        </span>
                      ) : null}
                    </div>

                    <p className="text-xs text-white/50 mb-2">{person.role}</p>
                    <p className="text-sm text-white/70 leading-relaxed mb-2 line-clamp-2">
                      <span className="text-white/45">Builds:</span> {person.builds}
                    </p>
                    <p className="text-xs text-white/55 leading-relaxed line-clamp-2 mb-3">{person.why}</p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {person.qualities.map((quality) => (
                        <span
                          key={`${person.id}-${quality}`}
                          className={`text-[10px] px-2 py-0.5 rounded-full border ${colors.badge}`}
                        >
                          {quality}
                        </span>
                      ))}
                    </div>

                    <a
                      href={person.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-white/75 hover:text-white transition-colors"
                    >
                      Open profile
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-white mb-4">What Else Should You Track?</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {relatedGroups.slice(0, 6).map((entry) => (
                <Link
                  key={entry.key}
                  href={entry.href}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 hover:bg-white/[0.05] transition-colors"
                >
                  <p className="text-sm font-semibold text-white mb-1">{entry.title}</p>
                  <p className="text-xs text-white/45">{entry.count} profiles</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
