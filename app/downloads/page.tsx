import { Metadata } from 'next'
import Link from 'next/link'
import AuroraGradient from '@/components/ui/AuroraGradient'

export const metadata: Metadata = {
  title: 'Free Downloads | FrankX.AI',
  description: 'Download free guides, frameworks, and resources for AI-powered creators.',
}

const downloads = [
  {
    id: 'soulbook-guide',
    title: "The Creator's Soulbook",
    subtitle: 'Complete Life Architecture Framework',
    description: 'Map all 7 life pillars with structured reflection exercises. Includes the Life Symphony, Golden Path, and 7 Pillars frameworks.',
    previewUrl: '/downloads/preview/soulbook',
    features: ['7 Life Pillars', '3 Framework Lenses', '25+ AI Prompts', 'Obsidian Templates'],
    variant: 'purple' as const,
    icon: '📚',
  },
  {
    id: 'vibe-os-guide',
    title: 'Vibe OS Music Guide',
    subtitle: 'AI Music Creation System',
    description: 'From emotional vision to finished track in one studio session. 50+ genre-specific Suno prompts and the emotion mapping system.',
    previewUrl: '/downloads/preview/vibe-os',
    features: ['50+ Suno Prompts', 'Emotion Mapping', 'Genre Templates', 'Release Playbooks'],
    variant: 'emerald' as const,
    icon: '🎵',
  },
]

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-void">
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 mb-6">
              Free Resources
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Creator Downloads
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Beautifully designed guides and frameworks to accelerate your creative journey.
              Preview online or download as PDF.
            </p>
          </div>

          {/* Download Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {downloads.map((item) => (
              <AuroraGradient
                key={item.id}
                variant={item.variant}
                className="rounded-3xl border border-white/10 p-8 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-4xl">{item.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{item.title}</h2>
                    <p className="text-white/60">{item.subtitle}</p>
                  </div>
                </div>

                <p className="text-white/70 mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {item.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-xs font-medium text-white/80 bg-white/10 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={item.previewUrl}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-900 font-semibold rounded-xl hover:bg-white/90 transition-colors"
                  >
                    Preview & Download
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </AuroraGradient>
            ))}
          </div>

          {/* Coming Soon */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">More Coming Soon</h3>
            <p className="text-white/50 max-w-lg mx-auto">
              Creative AI Toolkit templates, Creation Chronicles swipe files,
              and the complete Obsidian vault are in development.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
