import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Compass,
  Flame,
  Hammer,
  Handshake,
  Heart,
  Home,
  Network,
  RefreshCw,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react'

const SITE_URL = 'https://frankx.ai'

export const metadata: Metadata = {
  title: "The Builder's Line — What My Father Built With His Hands, What We Must Build in Our Minds",
  description:
    "A son's translation of master builder Witali Riemer's craftsman ethics: foundation before facade, quiet mastery, and the sacred counterweight of protecting the builder.",
  alternates: {
    canonical: `${SITE_URL}/the-builders-line`,
  },
  openGraph: {
    title: "The Builder's Line — What My Father Built With His Hands, What We Must Build in Our Minds",
    description:
      'A son’s translation of Witali Riemer’s craftsman ethics for founders, creators, engineers, and strivers who need an operating code that carries life without breaking the builder.',
    url: `${SITE_URL}/the-builders-line`,
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: "The Builder's Line — A Son's Inheritance",
    description:
      'Craftsman ethics and sovereign state architecture for people building homes, systems, companies, and lives in the age of AI.',
  },
}

const principles = [
  {
    number: '01',
    icon: Sparkles,
    title: 'The Ruin Is Raw Material',
    text:
      'What looks broken to an untrained eye is unorganized potential. Do not lament starting with a tangled problem, an imperfect foundation, or humble origins.',
  },
  {
    number: '02',
    icon: Hammer,
    title: 'Foundation Before Facade',
    text:
      'If the load-bearing members are hollow, surface ornament is a deceit. Data models, core logic, and substrate integrity come before polish.',
  },
  {
    number: '03',
    icon: Compass,
    title: 'Decide, Then Resource',
    text:
      'Do not wait for perfect weather, abundant capital, or external permission to decide the structure will stand. Commitment shapes the reality around it.',
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Measure Twice, Cut Once',
    text:
      'Rigour and precision up front are always cheaper than downstream remediation. Never rush the framing to satisfy an impatient eye.',
  },
  {
    number: '05',
    icon: Shield,
    title: 'Silence Before Crowds',
    text:
      'True craftsmanship requires no audience. Avoid seeking applause during early construction; let the level, the plumb line, and the finished roof speak.',
  },
  {
    number: '06',
    icon: Network,
    title: 'Hands in the Material',
    text:
      'Architecture that never touches code, stone, prompts, or real users ceases to be craftsmanship and degenerates into abstract opinion.',
  },
  {
    number: '07',
    icon: Home,
    title: 'Home Is Sacred Infrastructure',
    text:
      'Shelter is not a lifestyle trophy. A true home is the base layer for safety, intimacy, recovery, discipline, and future possibility.',
  },
  {
    number: '08',
    icon: Brain,
    title: 'AI Amplifies Agency, Never Replaces It',
    text:
      'Neural models multiply leverage and speed. They cannot provide ethics, standards, taste, backbone, or a purpose worth building for.',
  },
  {
    number: '09',
    icon: Heart,
    title: 'Build to Shelter Others',
    text:
      'Creative strength is either generative or it is vanity. Build systems, assets, and shelters that carry and protect human life.',
  },
  {
    number: '10',
    icon: Flame,
    title: 'Leave a Line, Not a Monument',
    text:
      'The ultimate test is not whether the work flatters you in the moment. The test is whether someone not yet born can stand inside what you created.',
  },
]

const counterweights = [
  {
    number: '11',
    icon: Shield,
    title: 'The Builder Is Part of the Structure',
    text:
      'Biological depletion is a load-bearing structural fault, not a moral failure. If the builder collapses from chronic overdraw, the entire roof falls in.',
  },
  {
    number: '12',
    icon: Handshake,
    title: 'Asking Is a Craftsman’s Tool',
    text:
      'Refusing help is not nobility; it is introducing a single point of failure into the project. No master framer lifts a heavy ridge beam alone out of pride.',
  },
  {
    number: '13',
    icon: RefreshCw,
    title: 'Maintenance Is Construction',
    text:
      'Sleep, nervous system down-regulation, movement, and medical screenings are not time stolen from building. They are the mortar that keeps the wall standing.',
  },
  {
    number: '14',
    icon: Users,
    title: 'The Line Continues Through People',
    text:
      'A completed house or digital platform is only half the legacy. Build so that the human relationships you foster outlast the structures you leave behind.',
  },
]

const audiences = [
  'Sons and daughters carrying an immigrant parent’s quiet sacrifices forward into modern crafts.',
  'Strivers and creators who lacked a father’s presence and need a grounded, usable standard.',
  'Founders, engineers, and AI architects drowning in digital abstraction who need physical grounding.',
  'Builders carrying heavy responsibilities who must learn to protect their own biological vessel.',
]

const videoSeeds = [
  {
    title: 'Foundation before facade',
    hook: 'My father never polished what could not bear structural weight.',
  },
  {
    title: 'Decide before the means arrive',
    hook: 'He saw the house standing before the money or the papers existed.',
  },
  {
    title: 'The ruin is raw material',
    hook: 'Others saw an abandoned brick wreck. He saw apple trees and dry cellars.',
  },
  {
    title: 'The unshielded builder',
    hook: 'He gave us a home, but he starved his own biological engine. Never make that trade.',
  },
  {
    title: 'The line continues',
    hook: 'He built with stone and mortar. I build with code and intelligence. Same line.',
  },
  {
    title: 'Maintenance is building',
    hook: 'Rest is not time stolen from the build. Rest is the mortar that prevents the collapse.',
  },
]

function JsonLd() {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: "The Builder's Line — What My Father Built With His Hands, What We Must Build in Our Minds",
    description: metadata.description,
    author: {
      '@type': 'Person',
      name: 'Frank Riemer',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FrankX',
      url: SITE_URL,
    },
    datePublished: '2026-07-09',
    dateModified: '2026-09-09',
    mainEntityOfPage: `${SITE_URL}/the-builders-line`,
    about: principles.map((p) => p.title).join(', '),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: "The Builder's Line", item: `${SITE_URL}/the-builders-line` },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
    />
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-amber-300/70">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-zinc-400">{description}</p>
    </div>
  )
}

export default function BuildersLinePage() {
  return (
    <main className="min-h-screen bg-[#080807] text-white">
      <JsonLd />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.2),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(234,179,8,0.1),transparent_28%),linear-gradient(180deg,#11100c_0%,#080807_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080807] to-transparent" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-28 sm:pb-24 sm:pt-36 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-amber-200/80">
              <Hammer className="h-3.5 w-3.5" />
              A Son’s Inheritance & Builder Ethics
            </div>
            <h1 className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              The Builder’s Line
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-8 text-zinc-300 sm:text-2xl sm:leading-9">
              What my father built with his hands, what we must build in our minds. A craftsman code
              drawn from master builder Witali Riemer: foundation before facade, quiet relentless execution,
              and the essential counterweight—protecting the builder from being consumed by the build.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/witali"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-200 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-100"
              >
                Read Witali’s story
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog/the-builder-and-the-belief"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                Read the flagship essay
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="rounded-[2rem] border border-amber-300/20 bg-gradient-to-br from-amber-300/12 to-white/[0.03] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-amber-300/70">
                The Son’s Perspective
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                I am not a father yet. I am an apprentice of the line.
              </h2>
            </div>
            <div className="space-y-4 text-base leading-8 text-zinc-300">
              <p>
                I spent a decade on scaffolding between ages five and fifteen, watching a Volga-German
                immigrant haul bricks in Seesen with bare hands and an unbreakable plumb line.
                He taught me that you do not polish what cannot bear structural load.
              </p>
              <p>
                Yet he also died at forty-eight from cancer, having worked twenty-five years with zero margin
                for rest. True inheritance is not repeating your father’s blindspots out of loyalty; it is
                honoring the foundation he built while installing the structural counterweights he lacked.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="principles" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <SectionHeading
          eyebrow="The 10 Craftsman Principles"
          title="Ten foundational axioms of structural honesty."
          description="The medium changes—from brick and mortar to code, agents, and systems. The craftsman standards beneath it remain permanent."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {principles.map((principle) => {
            const Icon = principle.icon
            return (
              <article
                key={principle.number}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <Icon className="h-7 w-7 text-amber-200" />
                  <span className="font-display text-sm font-semibold text-white/20">
                    {principle.number}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{principle.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="border-t border-white/10 bg-amber-500/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <SectionHeading
            eyebrow="The Missing Counterweights"
            title="Four structural laws that preserve the builder."
            description="Relentless execution without margin is not heroism; it is self-destruction. These four principles ensure the builder survives the build."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {counterweights.map((counterweight) => {
              const Icon = counterweight.icon
              return (
                <article
                  key={counterweight.number}
                  className="rounded-3xl border border-amber-400/20 bg-amber-400/[0.03] p-6 shadow-2xl shadow-black/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Icon className="h-7 w-7 text-amber-300" />
                    <span className="font-display text-sm font-semibold text-amber-300/30">
                      {counterweight.number}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                    {counterweight.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">{counterweight.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading
              eyebrow="Who Needs This"
              title="A line for those who build things that matter."
              description="The lineage is craftsman. The perspective is filial. The application is universal."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {audiences.map((audience) => (
                <div
                  key={audience}
                  className="rounded-2xl border border-white/10 bg-[#080807] p-5"
                >
                  <Users className="h-5 w-5 text-amber-200" />
                  <p className="mt-4 text-sm leading-6 text-zinc-300">{audience}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Short-form spine"
          title="Principles forged in stone, carried into the mind."
          description="Tactile, grounded truths for founders and creators who refuse to burn themselves out."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {videoSeeds.map((seed) => (
            <div
              key={seed.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/70">
                {seed.title}
              </p>
              <p className="mt-4 text-base leading-7 text-zinc-300">“{seed.hook}”</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-zinc-300">
                <Heart className="h-3.5 w-3.5" />
                The Continuous Line
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Make the wisdom portable.
              </h2>
            </div>
            <div className="space-y-4 text-base leading-8 text-zinc-300">
              <p>
                My father built with brick, wood, concrete, and hands.
                We build with language, code, AI models, and distributed systems.
                Different material. Same line.
              </p>
              <p>
                Do not sacrifice your life to the thing you are building. Your people need the shelter
                of your work, but they need the warmth of your life even more.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/witali"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-amber-200 transition hover:text-amber-100"
                >
                  Return to Witali’s memorial
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/blog/the-builder-and-the-belief"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-zinc-200"
                >
                  Read the essay
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
