import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  Github,
  Linkedin,
  MapPin,
  Music,
  Network,
  ShieldCheck,
} from 'lucide-react'

import { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { sitePositioning } from '@/data/site-positioning'
import { createMetadata } from '@/lib/seo'
import { socialLinks } from '@/lib/social-links'

export const metadata = createMetadata({
  title: 'About Frank Riemer',
  description:
    'Meet Frank Riemer, the AI architect and creator behind FrankX, and see how he directs a specialist agent team without outsourcing judgment or accountability.',
  path: '/about',
  image: '/images/portraits/frank-presenting-oracle-2025.jpg',
})

const aboutFaqs = [
  {
    question: 'Who is Frank Riemer?',
    answer:
      'Frank Riemer is an AI architect and creator based in Amsterdam. His work spans AI architecture, multi-agent workflows, research, books, software, music, and public learning systems.',
  },
  {
    question: 'What is FrankX?',
    answer:
      'FrankX is Frank’s public agentic workspace. Frank sets the question, context, standard, and final decision while specialist agents support research, critique, synthesis, implementation, and verification.',
  },
  {
    question: 'Are the agents the authors of FrankX?',
    answer:
      'No. Agents complete many specialist passes and produce first versions, but they cannot define Frank’s position or publish on their own. Frank owns the final published position and the standard the work is expected to meet.',
  },
  {
    question: 'What can I find on the site?',
    answer:
      'The public work includes source-led research, book intelligence, AI architectures, field guides, open agent systems, creative workflows, music, products, partnership briefs, and dated working notes.',
  },
  {
    question: 'Can I work with Frank?',
    answer:
      'Frank considers bounded architecture and partnership work when there is a real problem, useful source context, a decision owner, and a concrete result worth building. The Connect page is the direct route.',
  },
]

const workingModes = [
  {
    title: 'AI architecture',
    detail:
      'I translate enterprise experience into inspectable architectures, agent workflows, evaluation boundaries, and practical build decisions.',
    Icon: Network,
  },
  {
    title: 'The agentic workspace',
    detail:
      'Specialist agents expand how deeply and quickly I can research, challenge, structure, build, and verify. I keep the mandate and final judgment.',
    Icon: Bot,
  },
  {
    title: 'Creative practice',
    detail:
      'Books, software, music, and story work keep the technical systems connected to taste, repetition, emotion, and the difficulty of actually shipping.',
    Icon: Music,
  },
] as const

const principles = [
  'Build something inspectable before making a large claim.',
  'Keep sources, synthesis, and personal judgment visibly distinct.',
  'Use AI to expand human capacity—not to disguise the absence of a human point of view.',
  'Share the method generously, then let the work earn the invitation.',
] as const

const boundaries = [
  'A generated draft is not a FrankX position.',
  'Using a platform is not the same as being endorsed by that company.',
  'A proposed partnership is labeled differently from an active relationship.',
  'Former Oracle experience informs the work; FrankX is independent from Oracle.',
] as const

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <FAQPageJsonLd faqs={aboutFaqs} id="about-faq" />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_16%,rgba(16,185,129,0.12),transparent_32%),radial-gradient(circle_at_10%_0%,rgba(6,182,212,0.07),transparent_28%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid min-h-[86svh] max-w-7xl items-center gap-14 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[1.04fr_0.96fr] lg:px-10">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-300/80">
              Frank Riemer · Amsterdam
            </p>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              AI architect. Creator.
              <span className="block text-white/55">Working in public.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
              I build systems for understanding and creating with AI. FrankX is where the
              research, architectures, book intelligence, partnership work, guides, products,
              music, and unfinished questions accumulate in public.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/62">
              My agents complete many of the specialist passes. They do not inherit my voice,
              values, relationships, or responsibility. Those remain mine.
            </p>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href="/#current-work"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]"
              >
                Explore current work
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/workspace"
                className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium text-white/72 underline decoration-white/25 underline-offset-8 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                See how the workspace runs
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="relative w-full max-w-[560px] lg:justify-self-end" aria-label="Why Frank builds">
            <div className="absolute -inset-10 bg-emerald-400/[0.08] blur-[100px]" aria-hidden="true" />
            <div className="relative rounded-[2rem] border border-white/10 bg-[#0d1111] p-7 shadow-[0_40px_120px_rgba(0,0,0,0.38)] sm:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/80">
                Why I build
              </p>
              <blockquote className="mt-7 text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
                “Make something sturdy enough that other people can stand on it.”
              </blockquote>
              <p className="mt-7 text-base leading-7 text-white/66">
                That principle came from my father, who built houses and helped displaced families
                find footing. My materials are different. The responsibility is not.
              </p>
              <div className="mt-9 border-y border-white/[0.09]">
                {[
                  ['Inheritance', 'Migration, rebuilding, and practical care'],
                  ['Craft', 'Architecture, software, books, and music'],
                  ['Purpose', 'Human agency that grows with the systems'],
                ].map(([label, detail]) => (
                  <div
                    key={label}
                    className="grid gap-2 border-b border-white/[0.08] py-4 last:border-b-0 sm:grid-cols-[110px_1fr]"
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-300/70">
                      {label}
                    </p>
                    <p className="text-sm leading-6 text-white/68">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-24 lg:py-32" aria-labelledby="story-title">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-300/70">
              The human thread
            </p>
            <h2 id="story-title" className="mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Building is the family language.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-white/68">
            <p>
              I come from a Volga German family shaped by migration and rebuilding. My
              grandparents survived displacement in Kazakhstan. My parents came to Germany in
              the 1990s and started again with very little.
            </p>
            <p>
              My father, Witali, built houses and helped displaced families find footing. He died
              from cancer in 2019, but the lesson stayed: make something sturdy enough that other
              people can stand on it.
            </p>
            <p>
              My medium became AI systems, software, books, and music. Years in enterprise AI
              taught me how architecture survives contact with consequence. Travel and creative
              practice taught me that a technically correct system can still be lifeless. FrankX
              is my attempt to hold both truths at once.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.018] py-24 lg:py-32" aria-labelledby="work-title">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-emerald-300/70">
              How I work
            </p>
            <h2 id="work-title" className="mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
              One practice, three modes.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/65">
              The site looks broad because these modes constantly inform one another.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {workingModes.map(({ Icon, ...mode }) => (
              <article
                key={mode.title}
                className="rounded-[1.5rem] border border-white/[0.1] bg-[#0c0e0e] p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/15 bg-emerald-300/[0.055] text-emerald-300">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-7 text-xl font-semibold">{mode.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{mode.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32" aria-labelledby="principles-title">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-300/70">
              Principles
            </p>
            <h2 id="principles-title" className="mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
              What I want the work to prove.
            </h2>
          </div>
          <ol className="divide-y divide-white/[0.09] border-y border-white/[0.09]">
            {principles.map((principle, index) => (
              <li key={principle} className="grid gap-3 py-6 sm:grid-cols-[48px_1fr]">
                <span className="font-mono text-xs text-emerald-300/80">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-lg leading-8 text-white/75">{principle}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#0c0e0e] py-24" aria-labelledby="boundaries-title">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <ShieldCheck className="h-6 w-6 text-emerald-300" aria-hidden="true" />
            <h2 id="boundaries-title" className="mt-6 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Trust needs clear boundaries.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/65">
              The workspace becomes less useful when automation, affiliation, or intent is left
              ambiguous.
            </p>
          </div>
          <ul className="space-y-4">
            {boundaries.map((boundary) => (
              <li
                key={boundary}
                className="rounded-2xl border border-white/[0.09] bg-white/[0.025] px-6 py-5 text-base leading-7 text-white/72"
              >
                {boundary}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <MapPin className="mx-auto h-6 w-6 text-cyan-300" aria-hidden="true" />
          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            The best introduction is still the work.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65">
            Read something. Inspect a system. If the way I think is useful to a real question you
            are carrying, bring the material and we can see whether there is a fit.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/connect"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]"
            >
              Tell me what you’re working on
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium text-white/72 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium text-white/72 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          </div>
          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
            {sitePositioning.shortDescription}
          </p>
        </div>
      </section>
    </main>
  )
}
