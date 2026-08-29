import Link from 'next/link'
import {
  ArrowRight,
  Brain,
  CircleDot,
  FlaskConical,
  Headphones,
  HeartPulse,
  Leaf,
  MoonStar,
  Sparkles,
  Wind,
} from 'lucide-react'

import JsonLd from '@/components/seo/JsonLd'
import { createMetadata, siteConfig } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'The Human Layer for Founders',
  description:
    'A post-rational, evidence-aware field guide to founder attention, meditation, breathwork, sound, neurotechnology, manifestation, dream practice, and plant-medicine research boundaries.',
  path: '/human-layer',
  keywords: [
    'founder meditation',
    'founder breathwork',
    'founder performance',
    'post-rational spirituality',
    'sound healing research',
    'manifestation mental rehearsal',
    'plant medicine harm reduction',
    'neurotechnology founders',
  ],
})

const lenses = [
  {
    name: 'Established',
    description:
      'Supported by a mature body of evidence or widely accepted clinical and performance practice.',
    className: 'border-emerald-300/25 bg-emerald-300/[0.06] text-emerald-200',
  },
  {
    name: 'Emerging',
    description:
      'Promising research exists, but methods, mechanisms, or effect sizes remain unsettled.',
    className: 'border-cyan-300/25 bg-cyan-300/[0.06] text-cyan-200',
  },
  {
    name: 'Experiential',
    description:
      'People report value in direct practice; personal experience is not presented as universal proof.',
    className: 'border-amber-300/25 bg-amber-300/[0.06] text-amber-200',
  },
  {
    name: 'Symbolic',
    description:
      'Used as metaphor, ritual, or meaning-making language without turning symbolism into a scientific claim.',
    className: 'border-violet-300/25 bg-violet-300/[0.06] text-violet-200',
  },
] as const

const practices = [
  {
    title: 'Meditation & attention',
    description:
      'Practical attention training, reflective distance, and decision hygiene for founders operating under uncertainty.',
    lens: 'Established',
    Icon: CircleDot,
  },
  {
    title: 'Slow & paced breathing',
    description:
      'Gentle slow and paced breathing examined as an established self-regulation practice, with scope and contraindications kept visible.',
    lens: 'Established',
    Icon: Wind,
  },
  {
    title: 'Intensive breathwork',
    description:
      'Faster, deeper, or extended practices have a less settled evidence base alongside reported personal experiences. Intensity, screening, and contraindications stay explicit.',
    lens: 'Emerging · Experiential',
    Icon: Wind,
  },
  {
    title: 'Sound & deep listening',
    description:
      'Music, rhythm, voice, silence, and sound-bath practice explored through attention, emotion, culture, and personal experience.',
    lens: 'Emerging',
    Icon: Headphones,
  },
  {
    title: 'Neurotechnology',
    description:
      'Neurofeedback, wearables, stimulation research, and quantified-state tools examined without treating a device score as the whole person.',
    lens: 'Emerging',
    Icon: Brain,
  },
  {
    title: 'Mind–body recovery',
    description:
      'Sleep, movement, interoception, recovery rituals, and the operational conditions that make clear founder judgment more likely.',
    lens: 'Established',
    Icon: HeartPulse,
  },
  {
    title: 'Dream practice',
    description:
      'Dream journaling, lucid-dream research, incubation, and symbolic reflection—useful as inquiry, not prophecy.',
    lens: 'Emerging',
    Icon: MoonStar,
  },
  {
    title: 'Manifestation as practice',
    description:
      'Mental rehearsal, selective attention, identity, intention, and aligned action—without promises that thought alone controls external events.',
    lens: 'Experiential',
    Icon: Sparkles,
  },
  {
    title: 'Silva Method & guided imagery',
    description:
      'A historically influential language for relaxation, visualization, and intuition, separated into testable, experiential, and symbolic elements.',
    lens: 'Experiential',
    Icon: FlaskConical,
  },
  {
    title: 'Plant-medicine research',
    description:
      'Research literacy, legal context, screening questions, integration research, and harm reduction. No protocols, sourcing, dosing, treatment promises, or pressure to participate.',
    lens: 'Emerging',
    Icon: Leaf,
  },
] as const

const humanLayerSchema = {
  '@id': `${siteConfig.url}/human-layer#page`,
  name: 'The Human Layer for Founders',
  description:
    'An evidence-aware collection on founder attention, embodied practice, meaning, and post-rational inquiry.',
  url: `${siteConfig.url}/human-layer`,
  isPartOf: { '@id': `${siteConfig.url}/#website` },
  about: { '@id': `${siteConfig.url}/#frank-riemer` },
}

export default function HumanLayerPage() {
  return (
    <main id="main" tabIndex={-1} className="min-h-screen bg-[#0a0a0b] text-white">
      <JsonLd
        type="CollectionPage"
        data={humanLayerSchema}
        id="human-layer-schema"
      />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_12%,rgba(245,158,11,0.11),transparent_34%),radial-gradient(circle_at_14%_0%,rgba(139,92,246,0.07),transparent_28%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-28 sm:px-8 lg:pb-24 lg:pt-32">
          <div className="max-w-4xl">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-amber-300/80">
              The Human Layer · Founder Statecraft
            </p>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Rational enough to test.
              <span className="block font-serif font-normal italic text-amber-100/75">
                Human enough to wonder.
              </span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
              Founders do not make decisions as disembodied machines. Attention,
              physiology, story, meaning, relationships, and environment all
              enter the room. The Human Layer studies that reality without
              asking science to become religion—or spirituality to pretend it is
              science.
            </p>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href="#practices"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-[#171006] transition-colors hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]"
              >
                Explore the field
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/founder-stack"
                className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium text-white/72 underline decoration-white/25 underline-offset-8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
              >
                Map your Founder Stack
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-28" aria-labelledby="lenses-title">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber-300/75">
                Claim language
              </p>
              <h2
                id="lenses-title"
                className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
              >
                Four lenses, shown every time.
              </h2>
              <p className="mt-6 text-base leading-7 text-white/65">
                A practice can be useful without every explanation for it being
                proven. The lens tells you what kind of statement you are
                reading.
              </p>
            </div>

            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {lenses.map((lens) => (
                <article
                  key={lens.name}
                  className="grid gap-3 py-5 sm:grid-cols-[140px_1fr] sm:items-start"
                >
                  <span
                    className={`w-fit rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${lens.className}`}
                  >
                    {lens.name}
                  </span>
                  <p className="text-sm leading-6 text-white/64">
                    {lens.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="practices"
        className="scroll-mt-20 border-y border-white/[0.07] bg-[#0c0e0e] py-24 lg:py-28"
        aria-labelledby="practices-title"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-violet-300/70">
              The field
            </p>
            <h2
              id="practices-title"
              className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
            >
              Practices worth examining carefully.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/65">
              Each topic will grow into source-led field notes, bounded
              practices where appropriate, and explicit boundaries. This hub is
              the governing map.
            </p>
          </div>

          <div className="mt-14 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {practices.map(({ Icon, ...practice }) => (
              <article
                key={practice.title}
                className="grid gap-5 py-7 sm:grid-cols-[52px_1fr_auto] sm:items-start"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/15 bg-amber-300/[0.05] text-amber-200">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {practice.title}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/64">
                    {practice.description}
                  </p>
                </div>
                <span className="w-fit rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/55 sm:justify-self-end">
                  {practice.lens}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" aria-labelledby="boundary-title">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="rounded-[2rem] border border-amber-300/15 bg-amber-300/[0.035] p-6 sm:p-8 lg:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber-200/75">
              Boundary
            </p>
            <h2
              id="boundary-title"
              className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl"
            >
              No certainty theatre.
            </h2>
            <div className="mt-6 grid gap-6 text-sm leading-7 text-white/64 md:grid-cols-2">
              <p>
                Human Layer content is educational and reflective. It does not
                diagnose, treat, prescribe, promise manifestation outcomes, or
                replace qualified medical and mental-health care.
              </p>
              <p>
                Plant-medicine coverage stays within research literacy,
                legality, screening, integration, and harm reduction. FrankX
                does not provide substances, protocols, sourcing, dosing
                instructions, or treatment claims.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
