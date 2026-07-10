import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  ExternalLink,
  FileText,
  Github,
  Layers3,
  Network,
  ShieldCheck,
} from 'lucide-react'

type LatestPost = {
  slug: string
  title: string
  description: string
  category: string
  readingTime: string
}

type FrankXProductionHomeProps = {
  latestPosts?: LatestPost[]
}

const proofArtifacts = [
  {
    type: 'Open system',
    title: 'Agentic Creator OS',
    description:
      'A public, inspectable operating system for agent skills, commands, workflows, and creator delivery.',
    href: 'https://github.com/frankxai/agentic-creator-os',
    action: 'Inspect the repository',
    external: true,
    Icon: Github,
  },
  {
    type: 'Field guide',
    title: 'Production agentic AI systems',
    description:
      'A practical guide to the architecture, control points, and failure modes behind multi-agent delivery.',
    href: '/blog/production-agentic-ai-systems',
    action: 'Read the guide',
    external: false,
    Icon: FileText,
  },
  {
    type: 'Architecture library',
    title: 'Blueprints you can examine',
    description:
      'Reference architectures and implementation patterns for teams moving from isolated tools to governed workflows.',
    href: '/ai-architecture/blueprints',
    action: 'Review the blueprints',
    external: false,
    Icon: Network,
  },
]

const engagementSteps = [
  {
    number: '01',
    title: 'Map the operating reality',
    detail: 'People, decisions, data, tools, risk, and the handoffs where work currently stalls.',
  },
  {
    number: '02',
    title: 'Design the smallest useful system',
    detail: 'One bounded workflow with clear ownership, evaluation, cost limits, and a human override.',
  },
  {
    number: '03',
    title: 'Prove it in the work',
    detail: 'A working artifact, operating notes, and a decision on what should scale next—or stop.',
  },
]

const ecosystemRoutes = [
  {
    label: 'For creator systems',
    title: 'GenCreator',
    description:
      'The focused home for creator workflows, education, community, and repeatable publishing systems.',
    href: 'https://gencreator.ai',
  },
  {
    label: 'For revenue systems',
    title: 'Agentic Income',
    description:
      'The focused home for productized agent workflows, income experiments, and evidence-led monetization.',
    href: 'https://agenticincome.ai',
  },
]

export default function FrankXProductionHome({
  latestPosts = [],
}: FrankXProductionHomeProps) {
  return (
    <main className="relative overflow-hidden bg-[#0a0a0b] text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(circle_at_68%_12%,rgba(16,185,129,0.12),transparent_34%),radial-gradient(circle_at_18%_0%,rgba(6,182,212,0.06),transparent_28%)]"
        aria-hidden="true"
      />

      <section className="relative mx-auto grid min-h-[88svh] min-w-0 max-w-7xl items-center gap-14 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:pt-24">
        <div className="min-w-0 max-w-3xl">
          <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-300/70">
            FrankX / AI architecture and operator systems
          </p>
          <h1 className="max-w-full font-display text-5xl font-bold leading-[0.98] tracking-[-0.045em] text-white sm:max-w-4xl sm:text-6xl lg:text-7xl">
            Make AI a working system,
            <span className="block text-white/44">not a stack of experiments.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/58 sm:text-xl">
            I design the architecture, agent workflows, and operating controls that turn scattered
            AI activity into work a founder or team can inspect, run, and improve.
          </p>

          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Link
              href="/ai-architecture"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]"
            >
              Review the architecture
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link
              href="/work-with-me"
              className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium text-white/62 underline decoration-white/20 underline-offset-8 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Discuss an architecture engagement
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-12 flex max-w-2xl flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-xs leading-5 text-white/40">
            <span>Former Oracle AI architect</span>
            <span>Independent practice</span>
            <span>Public systems and field notes</span>
          </div>
          <p className="mt-3 max-w-xl text-[11px] leading-5 text-white/28">
            FrankX is independent and is not affiliated with, endorsed by, or sponsored by Oracle.
          </p>
        </div>

        <div className="relative mx-auto w-full min-w-0 max-w-[520px] lg:justify-self-end">
          <div className="absolute -inset-10 bg-emerald-400/10 blur-[100px]" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1111] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <div className="relative aspect-[4/5] min-h-[540px]">
              <Image
                src="/images/portraits/frank-presenting-oracle-2025.jpg"
                alt="Frank Riemer presenting an AI architecture session"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 42vw"
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#08100d] via-[#08100d]/15 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300/70">
                  Evidence before adjectives
                </p>
                <p className="mt-3 max-w-sm text-base leading-7 text-white/78">
                  Architecture is useful when a team can see the decisions, operate the workflow,
                  and know when the system is wrong.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.018] py-24 lg:py-32" aria-labelledby="proof-title">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-emerald-300/60">
                Inspectable proof
              </p>
              <h2 id="proof-title" className="mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Start with the artifacts.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-white/48">
                No maturity theater. These are working systems, technical notes, and blueprints you
                can examine before deciding whether the approach fits your work.
              </p>
            </div>

            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {proofArtifacts.map(({ Icon, ...artifact }) => (
                <article key={artifact.title} className="group grid gap-5 py-7 sm:grid-cols-[44px_1fr_auto] sm:items-start">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/15 bg-emerald-300/[0.055] text-emerald-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/32">{artifact.type}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{artifact.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/46">{artifact.description}</p>
                  </div>
                  <Link
                    href={artifact.href}
                    target={artifact.external ? '_blank' : undefined}
                    rel={artifact.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex min-h-10 items-center gap-2 self-center text-sm font-medium text-emerald-300/78 transition hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  >
                    {artifact.action}
                    {artifact.external ? <ExternalLink className="h-4 w-4" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32" aria-labelledby="engagement-title">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-300/60">
                One primary route
              </p>
              <h2 id="engagement-title" className="mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Executive AI architecture.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-white/48">
                For founders and teams with important work, too many tools, and no shared operating
                model. The engagement begins with one bounded decision—not a transformation promise.
              </p>
              <Link
                href="/work-with-me"
                className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/14 bg-white/[0.045] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/24 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                See how we can work together
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="relative border-l border-white/[0.09] pl-7 sm:pl-10">
              {engagementSteps.map((step, index) => (
                <article key={step.number} className={index === engagementSteps.length - 1 ? 'pb-0' : 'pb-14'}>
                  <span className="absolute -left-[5px] mt-2 h-[9px] w-[9px] rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(103,232,249,0.5)]" aria-hidden="true" />
                  <p className="font-mono text-[11px] text-cyan-300/55">{step.number}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                  <p className="mt-3 max-w-xl text-base leading-7 text-white/46">{step.detail}</p>
                </article>
              ))}

              <div className="mt-14 rounded-2xl border border-white/[0.09] bg-white/[0.025] p-6">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-white/82">The operating constraint</p>
                    <p className="mt-2 text-sm leading-6 text-white/44">
                      Human approval stays at consequential boundaries. Costs, evaluations, failure
                      paths, and rollback are part of the architecture—not launch-week cleanup.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#0c0e0e] py-24" aria-labelledby="ecosystem-title">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/34">Focused handoffs</p>
              <h2 id="ecosystem-title" className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                The right product should own the next step.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-white/45">
                FrankX is the architecture and founder-intelligence front door. Creator delivery and
                revenue experiments have their own focused homes.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {ecosystemRoutes.map((route) => (
                <Link
                  key={route.title}
                  href={route.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[250px] flex-col rounded-[1.5rem] border border-white/[0.09] bg-white/[0.025] p-6 transition hover:border-white/18 hover:bg-white/[0.045] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/32">{route.label}</p>
                  <h3 className="mt-8 text-2xl font-semibold">{route.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/45">{route.description}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-emerald-300/72 group-hover:text-emerald-200">
                    Visit {route.title}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section className="py-24 lg:py-32" aria-labelledby="notes-title">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="flex flex-col gap-5 border-b border-white/[0.08] pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-emerald-300/55">Field notes</p>
                <h2 id="notes-title" className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">What I am learning in the work.</h2>
              </div>
              <Link href="/blog" className="inline-flex min-h-10 items-center gap-2 text-sm text-white/52 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
                Browse all notes <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="divide-y divide-white/[0.08]">
              {latestPosts.slice(0, 3).map((post) => (
                <article key={post.slug} className="grid gap-4 py-7 sm:grid-cols-[0.28fr_1fr_auto] sm:items-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">{post.category} / {post.readingTime}</p>
                  <div>
                    <h3 className="text-lg font-semibold text-white/86">{post.title}</h3>
                    <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-white/42">{post.description}</p>
                  </div>
                  <Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/52 transition hover:border-emerald-300/30 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-white/[0.07] py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Layers3 className="mx-auto h-6 w-6 text-emerald-300/65" aria-hidden="true" />
          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Start with one consequential workflow.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/46">
            We will map it, choose the smallest architecture that can prove value, and make the next
            decision from evidence.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/work-with-me" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]">
              Discuss the workflow <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <span className="inline-flex items-center gap-2 text-xs text-white/32">
              <Check className="h-4 w-4 text-emerald-300/65" aria-hidden="true" />
              Scope confirmed before work begins
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}
