import Image from 'next/image'
import Link from 'next/link'
import { createMetadata } from '@/lib/seo'
import { ArrowRight, Sparkles, Code2, Music, BookOpen, Cpu, Shield, Crown, Flame, Eye } from 'lucide-react'

export const metadata = createMetadata({
  title: 'The AI Team — Creative Intelligence Specialists | FrankX',
  description:
    'Meet the 9 AI specialists powering FrankX. Each character represents a domain of creative intelligence — from architecture to music to content strategy.',
  keywords: [
    'frankx ai team',
    'ai agents',
    'creative ai specialists',
    'ai architecture team',
    'ai music production',
    'agentic creator os',
  ],
  path: '/team',
})

const team = [
  {
    name: 'Codex',
    companion: 'Talon',
    role: 'AI Architect',
    domain: 'Architecture & Systems',
    description: 'Designs production AI systems. Multi-cloud expertise, RAG patterns, agentic orchestration. The technical backbone.',
    src: '/images/team/codex-falcon.png',
    accent: '#10B981',
    icon: Code2,
    href: '/ai-architect',
    stats: ['20+ patterns', 'Multi-cloud', 'Enterprise-grade'],
  },
  {
    name: 'Echo',
    companion: 'Kira',
    role: 'Sound Weaver',
    domain: 'Music & Audio',
    description: '12,000+ songs created. Genre mastery from ambient to electronic. Prompt engineering for Suno at production scale.',
    src: '/images/team/echo-leopard.png',
    accent: '#EC4899',
    icon: Music,
    href: '/music',
    stats: ['12,000+ songs', '50+ genres', 'Production mastery'],
  },
  {
    name: 'Nova',
    companion: 'Inari',
    role: 'Content Catalyst',
    domain: 'Content & Distribution',
    description: 'Blog articles, newsletters, social content. SEO strategy, voice DNA, multi-platform distribution at scale.',
    src: '/images/team/nova-fox.png',
    accent: '#F59E0B',
    icon: BookOpen,
    href: '/blog',
    stats: ['60+ articles', '6 newsletters', 'SEO-optimized'],
  },
  {
    name: 'Stella',
    companion: 'Athena',
    role: 'System Orchestrator',
    domain: 'ACOS & Automation',
    description: '75+ skills, 38 agents, 35+ commands. The operating system that powers every creative workflow.',
    src: '/images/team/stella-owl.png',
    accent: '#8B5CF6',
    icon: Cpu,
    href: '/acos',
    stats: ['75+ skills', '38 agents', '35+ commands'],
  },
  {
    name: 'Arion',
    companion: 'Mamoru',
    role: 'Vision Keeper',
    domain: 'Strategy & Direction',
    description: 'Brand architecture, product strategy, long-term vision. Bridges enterprise thinking with creator instinct.',
    src: '/images/team/arion-mamoru.png',
    accent: '#43BFE3',
    icon: Eye,
    href: '/vision',
    stats: ['Brand DNA', 'Product strategy', 'Creator vision'],
  },
  {
    name: 'Draconia',
    companion: 'Draconis',
    role: 'Product Forge',
    domain: 'Products & Commerce',
    description: 'Digital products, template systems, affiliate architecture. Turns craft into revenue with precision.',
    src: '/images/team/draconia-tiger.png',
    accent: '#EF4444',
    icon: Flame,
    href: '/products',
    stats: ['15+ products', 'Template systems', 'Revenue engines'],
  },
  {
    name: 'Nero',
    companion: 'Umbra',
    role: 'Inner Circle',
    domain: 'Premium & Depth',
    description: 'Exclusive access, private vault, strategy intensives. Where the deepest work happens.',
    src: '/images/team/nero-umbra.png',
    accent: '#6366F1',
    icon: Shield,
    href: '/inner-circle',
    stats: ['Private vault', 'Strategy sessions', 'Exclusive access'],
  },
  {
    name: 'Shinkami',
    companion: null,
    role: 'Premium Architect',
    domain: 'Coaching & Mastery',
    description: 'Meta-consciousness. Where all streams converge into deeper understanding and personal transformation.',
    src: '/images/team/shinkami.png',
    accent: '#14B8A6',
    icon: Crown,
    href: '/coaching',
    stats: ['1:1 coaching', 'System mastery', 'Deep integration'],
  },
  {
    name: 'Lumina',
    companion: 'Sol',
    role: 'Light Bringer',
    domain: 'Learning & Guidance',
    description: 'Courses, student paths, onboarding. Makes complex systems accessible. Guides creators from zero to proficiency.',
    src: '/images/team/lumina-sol.png',
    accent: '#FBBF24',
    icon: Sparkles,
    href: '/courses',
    stats: ['Learning paths', 'Step-by-step', 'Beginner-friendly'],
  },
]

function TeamCard({ member, index }: { member: typeof team[number]; index: number }) {
  const Icon = member.icon
  return (
    <Link href={member.href} className="group block">
      <div
        className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04] hover:-translate-y-1"
        style={{ boxShadow: `0 0 60px -20px ${member.accent}10` }}
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={member.src}
            alt={`${member.name}${member.companion ? ` & ${member.companion}` : ''}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent" />

          {/* Domain badge */}
          <div className="absolute top-3 left-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md"
              style={{
                background: `${member.accent}20`,
                color: member.accent,
                border: `1px solid ${member.accent}30`,
              }}
            >
              <Icon className="h-3 w-3" />
              {member.domain.split(' & ')[0]}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-2.5">
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">
              {member.name}
              {member.companion && (
                <span className="text-white/30 font-normal"> & {member.companion}</span>
              )}
            </h3>
            <p className="text-xs font-medium mt-0.5" style={{ color: member.accent }}>
              {member.role}
            </p>
          </div>

          <p className="text-xs text-white/40 leading-relaxed line-clamp-2">
            {member.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-1.5">
            {member.stats.map((stat) => (
              <span
                key={stat}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-white/50 border border-white/[0.06]"
              >
                {stat}
              </span>
            ))}
          </div>

          {/* Explore link */}
          <div className="flex items-center gap-1 text-xs text-white/30 group-hover:text-white/60 transition-colors pt-1">
            <span>Explore</span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: `linear-gradient(90deg, transparent, ${member.accent}60, transparent)`,
          }}
        />
      </div>
    </Link>
  )
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-6xl">
          {/* Hero */}
          <section className="relative mb-16 text-center">
            {/* Axi mascot accent */}
            <div className="pointer-events-none absolute right-0 top-0 hidden w-48 opacity-15 lg:block">
              <Image
                src="/images/mascot/mascot-v25-crystal-familiar.png"
                alt=""
                width={192}
                height={192}
                className="object-contain"
                aria-hidden="true"
              />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-xs font-medium text-white/60">The Creative Intelligence Team</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl mb-4">
              <span className="text-white">Meet the </span>
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                AI Team
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-white/40 leading-relaxed mb-2">
              Nine specialists. Each one masters a different domain of creative intelligence.
              Together, they power everything on FrankX.AI.
            </p>
            <p className="text-sm text-white/25">
              These aren&apos;t mascots. They&apos;re the team.
            </p>
          </section>

          {/* Team Grid */}
          <section className="mb-20">
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
              {team.map((member, i) => (
                <TeamCard key={member.name} member={member} index={i} />
              ))}
            </div>
          </section>

          {/* Axi Section */}
          <section className="mb-20">
            <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-purple-500/5 p-8 md:p-12">
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl" />
              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <Image
                  src="/images/mascot/mascot-v05-techno-beast-standing.png"
                  alt="Axi — Brand Guardian"
                  width={200}
                  height={200}
                  className="rounded-2xl"
                  style={{ boxShadow: '0 0 60px -12px rgba(171,71,199,0.4)' }}
                />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Axi <span className="text-white/30 font-normal">— Brand Guardian</span>
                  </h2>
                  <p className="text-white/50 leading-relaxed mb-4">
                    The mascot who ties it all together. Axi appears across the site — in the favicon, the navigation,
                    the 404 page, loading states. Organic first, technology second. Fur before circuits.
                    The gold standard for everything visual.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Favicon', 'Navigation', '404 Page', 'Newsletter', 'Loading States'].map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2.5 py-1 rounded-full bg-purple-400/10 text-purple-300 border border-purple-400/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-white text-center mb-8">How the team works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Code2 className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Domain Expertise</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  Each character represents deep mastery in one domain. Codex handles architecture, Echo handles music,
                  Nova handles content. No overlap, no confusion.
                </p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                  <Cpu className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">ACOS Orchestration</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  The Agentic Creator OS coordinates all specialists. 75+ skills auto-activate based on context.
                  Stella orchestrates, the team executes.
                </p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Human Direction</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  Frank provides the vision, the taste, the quality bar. The AI team amplifies.
                  Every output is human-directed, machine-accelerated.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Link
                href="/start"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10"
              >
                Start Here <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/acos"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
              >
                Explore ACOS
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
