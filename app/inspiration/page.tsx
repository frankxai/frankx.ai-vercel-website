import Link from 'next/link'
import dreamData from '@/data/dream-100.json'

export const metadata = {
  title: 'Inspiration | Creators & Builders I Learn From',
  description: 'A curated list of the creators, engineers, and builders who shape how I think about AI, music, design, and building in public.',
}

const categoryColors: Record<string, string> = {
  'ai-builders': 'from-violet-500/20 to-purple-600/20 border-violet-500/30',
  'creator-economy': 'from-amber-500/20 to-orange-600/20 border-amber-500/30',
  'music-production': 'from-pink-500/20 to-rose-600/20 border-pink-500/30',
  'open-source': 'from-emerald-500/20 to-green-600/20 border-emerald-500/30',
  'enterprise-ai': 'from-cyan-500/20 to-blue-600/20 border-cyan-500/30',
  'design-craft': 'from-fuchsia-500/20 to-purple-600/20 border-fuchsia-500/30',
}

const categoryAccent: Record<string, string> = {
  'ai-builders': 'text-violet-400',
  'creator-economy': 'text-amber-400',
  'music-production': 'text-pink-400',
  'open-source': 'text-emerald-400',
  'enterprise-ai': 'text-cyan-400',
  'design-craft': 'text-fuchsia-400',
}

const linkLabels: Record<string, string> = {
  x: 'X',
  website: 'Web',
  youtube: 'YouTube',
  github: 'GitHub',
}

export default function InspirationPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Header */}
      <section className="border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-12">
          <Link
            href="/"
            className="text-white/40 hover:text-white/70 text-sm transition-colors mb-6 inline-block"
          >
            Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Inspiration
          </h1>
          <p className="text-white/50 text-lg max-w-2xl">
            Creators, engineers, and builders who shape how I think about AI, music, design, and building in public.
            Not influencers — practitioners who ship.
          </p>
        </div>
      </section>

      {/* Categories */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        {dreamData.categories.map((category) => {
          const people = dreamData.people.filter(
            (p) => p.category === category.id
          )
          if (people.length === 0) return null

          return (
            <section key={category.id} className="mb-16">
              <div className="mb-6">
                <h2 className={`text-2xl font-bold ${categoryAccent[category.id] || 'text-white'}`}>
                  {category.label}
                </h2>
                <p className="text-white/40 text-sm mt-1">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {people.map((person) => (
                  <div
                    key={person.name}
                    className={`relative rounded-xl border bg-gradient-to-br p-5 transition-all hover:scale-[1.02] hover:border-white/20 ${
                      categoryColors[category.id] || 'border-white/10'
                    } ${person.featured ? 'ring-1 ring-white/10' : ''}`}
                  >
                    {person.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] text-white/30 uppercase tracking-wider font-medium">
                          Featured
                        </span>
                      </div>
                    )}

                    <h3 className="text-lg font-semibold mb-0.5">{person.name}</h3>
                    <p className="text-white/40 text-xs mb-3">{person.role}</p>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                      {person.why}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {Object.entries(person.links).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-white/30 hover:text-white/70 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 transition-all"
                        >
                          {linkLabels[platform] || platform}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}

        {/* Footer note */}
        <div className="border-t border-white/5 pt-12 text-center">
          <p className="text-white/25 text-sm max-w-lg mx-auto">
            This list grows as I discover new builders worth learning from.
            It's not about follower counts — it's about craft, depth, and shipping real work.
          </p>
        </div>
      </div>
    </div>
  )
}
