import { Globe, Cpu, Mic2, Users, GitBranch, Music2 } from 'lucide-react'
import { MotionSection, MotionItem } from './MotionLayer'

type Beat = {
  Icon: typeof Globe
  label: string
  body: string
}

const BEATS: Beat[] = [
  {
    Icon: Globe,
    label: 'Amsterdam · EMEA reach',
    body: 'Based in Amsterdam, with experience supporting AI architecture, workshops, and partner work across EMEA.',
  },
  {
    Icon: Users,
    label: 'Builder audience',
    body: 'Focused public channels across the site, newsletter, GitHub, and LinkedIn for coding-agent CoE patterns and creator systems.',
  },
  {
    Icon: Mic2,
    label: 'Speaking and workshops',
    body: 'Workshop and speaking formats across AI architecture, creator systems, and human-centered agent workflows.',
  },
  {
    Icon: Cpu,
    label: 'Bounded agent roles',
    body: 'A public catalog of specialist roles across research, architecture, production, critique, and verification—with Frank accountable for the final decision.',
  },
  {
    Icon: GitBranch,
    label: 'Open body of work',
    body: 'ACOS, SIS (31-tool MCP), AI Architect Academy curriculum, OCI Claude Code skill pack. Public, reviewable, running.',
  },
  {
    Icon: Music2,
    label: 'Daily creative practice',
    body: 'Music, publishing, research, workshops, and product systems keep the architecture grounded in repeated production work.',
  },
]

/**
 * Operator profile band on the /partnerships hub.
 *
 * Sits between hero and the active-partnership card. Surfaces the operator
 * profile that earns the right to claim peer-tier partnerships — every beat
 * here is verifiable from public artifacts.
 *
 * Motion: section reveals on scroll, cards stagger in at 80ms each.
 * Hover: 1px gradient-border treatment via inset ring + subtle bg lift.
 */
export function SovereignNodeBand() {
  return (
    <MotionSection
      aria-labelledby="operator-profile-heading"
      className="border-t border-white/5 py-24 lg:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <MotionItem className="mb-12 max-w-2xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            Operator profile
          </p>
          <h2
            id="operator-profile-heading"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3"
            style={{
              fontFamily: 'var(--font-poppins, Poppins), Inter, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            A human-led, agent-powered practice.
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            I direct the work from Amsterdam. Specialist agents expand the
            research and production capacity; the relationship, judgment, and
            final accountability remain mine.
          </p>
        </MotionItem>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {BEATS.map(({ Icon, label, body }) => (
            <MotionItem
              key={label}
              className="group relative rounded-2xl bg-white/[0.025] border border-white/[0.08] p-5 lg:p-6 transition-all duration-300 hover:bg-white/[0.04] hover:border-emerald-500/25 hover:-translate-y-px"
            >
              {/* 1px gradient border on hover — emerald → cyan, subtle */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(6,182,212,0.10) 100%)',
                  WebkitMask:
                    'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  padding: '1px',
                }}
              />
              <div className="relative flex items-start gap-3">
                <div
                  aria-hidden
                  className="flex-shrink-0 w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-emerald-500/15 group-hover:border-emerald-500/30"
                >
                  <Icon className="w-4 h-4 text-emerald-300" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] tracking-[0.18em] uppercase text-emerald-400/70 font-medium mb-2">
                    {label}
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            </MotionItem>
          ))}
        </div>
      </div>
    </MotionSection>
  )
}
