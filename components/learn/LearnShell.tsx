import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bot,
  Braces,
  BriefcaseBusiness,
  Building2,
  Check,
  Cloud,
  Code2,
  Compass,
  Layers3,
  Palette,
  Radar,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { learningPaths, type LearningPath } from '@/data/learning-paths'
import {
  learningFieldNotes,
  learningOutcomes,
  recommendedCourses,
} from '@/data/learning-catalog'
import CourseRecommendationCard from '@/components/learn/CourseRecommendationCard'

const outcomeIcons = [BriefcaseBusiness, Code2, Building2, Compass, Palette]

const pathIcons: Record<string, typeof Bot> = {
  'claude-mastery': Bot,
  'codex-mastery': Braces,
  'chatgpt-mastery': Sparkles,
  'gemini-mastery': Compass,
  'antigravity-mastery': Layers3,
  'aws-bedrock-mastery': Cloud,
  'azure-ai-foundry-mastery': Cloud,
  'oracle-oci-genai-mastery': Cloud,
}

const modelPaths = learningPaths.filter((path) => path.category === 'model-maker')
const cloudPaths = learningPaths.filter((path) => path.category === 'cloud')

function PathRow({ path }: { path: LearningPath }) {
  const Icon = pathIcons[path.slug] ?? BookOpen

  return (
    <Link
      href={`/learn/${path.slug}`}
      className="group grid gap-5 border-t border-white/[0.07] py-6 transition-colors hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-300 sm:grid-cols-[48px_1fr_auto] sm:items-center sm:px-4"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-emerald-200">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span>
        <span className="block font-display text-xl font-semibold tracking-[-0.02em] text-white">
          {path.title}
        </span>
        <span className="mt-1 block max-w-2xl text-sm leading-6 text-[#98989f]">
          {path.description}
        </span>
      </span>
      <span className="flex items-center gap-4 sm:justify-end">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#98989f]">
          {path.estimatedHours}h path
        </span>
        <ArrowRight
          className="h-4 w-4 text-[#98989f] transition-transform group-hover:translate-x-1 group-hover:text-white"
          aria-hidden="true"
        />
      </span>
    </Link>
  )
}

export default function LearnShell() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.06] pt-32">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle at 18% 12%, rgba(16,185,129,0.11), transparent 31%), radial-gradient(circle at 82% 28%, rgba(6,182,212,0.07), transparent 28%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 sm:px-6 lg:pb-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-emerald-300/75">
            FrankX Learn
          </p>
          <h1 className="mt-7 max-w-5xl font-display text-5xl font-bold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
            The shortest credible path through AI.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#b8b8bd] sm:text-xl">
            Independent course selections, official resources, and build paths mapped to what
            you want to become capable of doing.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#choose-path"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              Choose your learning path
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/courses"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              Browse course picks
            </Link>
          </div>

          <div className="mt-14 grid gap-3 border-t border-white/[0.07] pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-[#98989f] sm:grid-cols-3">
            <p className="inline-flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
              Independent selection
            </p>
            <p className="inline-flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
              Affiliate links labeled
            </p>
            <p className="inline-flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
              Recommendations dated
            </p>
          </div>
        </div>
      </section>

      <section id="choose-path" className="scroll-mt-24 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-300/70">
                Start with the outcome
              </p>
              <h2 className="mt-5 max-w-md font-display text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">
                Choose what you want to be able to do.
              </h2>
              <p className="mt-5 max-w-md text-[16px] leading-7 text-[#b8b8bd]">
                Tools change faster than curricula. Capability is the stable way to choose what
                deserves your next ten hours.
              </p>
            </div>

            <div className="border-b border-white/[0.07]">
              {learningOutcomes.map((outcome, index) => {
                const Icon = outcomeIcons[index] ?? BookOpen

                return (
                  <Link
                    key={outcome.id}
                    href={outcome.href}
                    className="group grid gap-5 border-t border-white/[0.07] py-7 transition-colors hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-300 sm:grid-cols-[48px_1fr_auto] sm:items-start sm:px-4"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-emerald-200">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-display text-2xl font-semibold tracking-[-0.025em] text-white">
                        {outcome.title}
                      </span>
                      <span className="mt-1 block text-xs font-medium uppercase tracking-[0.1em] text-emerald-200/75">
                        {outcome.audience}
                      </span>
                      <span className="mt-3 block max-w-xl text-sm leading-6 text-[#b8b8bd]">
                        {outcome.capability}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-[#98989f] transition-colors group-hover:text-white">
                      {outcome.routeLabel}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="course-picks" className="scroll-mt-24 border-y border-white/[0.06] bg-[#0d0d0f] py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-300/70">
                Editor&apos;s course shelf
              </p>
              <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">
                Five courses that earn the time.
              </h2>
            </div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              See the full course shelf
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <p className="mt-6 max-w-3xl text-[16px] leading-7 text-[#b8b8bd]">
            These are direct provider links today. If affiliate tracking is activated, the
            relevant card will say so. Payment never changes selection or placement.
          </p>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <CourseRecommendationCard course={recommendedCourses[0]} featured />
            <div className="grid gap-5">
              {recommendedCourses.slice(1, 3).map((course) => (
                <CourseRecommendationCard key={course.slug} course={course} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-300/70">
                Free ecosystem maps
              </p>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.035em] text-white">
                Learn from the source.
              </h2>
              <p className="mt-5 text-[16px] leading-7 text-[#b8b8bd]">
                Eight free FrankX portals organize official material, strong walkthroughs, and
                original architecture notes around the platforms people actually use.
              </p>
            </div>

            <div>
              <div className="mb-6 flex items-center gap-3">
                <Bot className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                <h3 className="font-display text-xl font-semibold text-white">Model makers</h3>
              </div>
              <div className="border-b border-white/[0.07]">
                {modelPaths.map((path) => (
                  <PathRow key={path.id} path={path} />
                ))}
              </div>

              <div className="mb-6 mt-12 flex items-center gap-3">
                <Cloud className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                <h3 className="font-display text-xl font-semibold text-white">Cloud AI</h3>
              </div>
              <div className="border-b border-white/[0.07]">
                {cloudPaths.map((path) => (
                  <PathRow key={path.id} path={path} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-[#0d0d0f] py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid overflow-hidden rounded-3xl border border-white/[0.09] bg-[#111113] lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-7 sm:p-10 lg:p-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-300/70">
                FrankX original
              </p>
              <h2 className="mt-5 max-w-2xl font-display text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">
                AI Architect Academy
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#b8b8bd]">
                The technical school for moving from prototypes to production: architecture
                patterns, Claude skills, multi-cloud reference systems, and five core paths.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/ai-architect-academy"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#06110d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113]"
                >
                  Enter the Academy
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href="https://github.com/frankxai/ai-architect-academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113]"
                  aria-label="Open the AI Architect Academy repository on GitHub (opens in a new tab)"
                >
                  View the open-source work
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="border-t border-white/[0.08] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#98989f]">
                Academy proof
              </p>
              <ul className="mt-6 space-y-5">
                {[
                  'Five documented learning paths',
                  'Enterprise architecture pattern library',
                  'Multi-cloud implementation references',
                  'Open-source repository and reusable skills',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[#b8b8bd]">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-300/70">
                FrankX field notes
              </p>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.035em] text-white">
                Read before you enroll.
              </h2>
              <p className="mt-5 text-[16px] leading-7 text-[#b8b8bd]">
                The blog is the editorial layer: comparisons, learning orders, and practical
                tradeoffs that a marketplace description cannot give you.
              </p>
            </div>

            <div className="border-b border-white/[0.07]">
              {learningFieldNotes.map((note) => (
                <Link
                  key={note.href}
                  href={note.href}
                  className="group grid gap-4 border-t border-white/[0.07] py-7 transition-colors hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-300 sm:grid-cols-[1fr_auto] sm:px-4"
                >
                  <span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300/70">
                      {note.label} / {note.readingTime}
                    </span>
                    <span className="mt-3 block font-display text-2xl font-semibold tracking-[-0.025em] text-white">
                      {note.title}
                    </span>
                    <span className="mt-3 block max-w-2xl text-sm leading-6 text-[#b8b8bd]">
                      {note.description}
                    </span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 self-center text-[#98989f] transition-transform group-hover:translate-x-1 group-hover:text-white"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <Radar className="h-5 w-5 text-emerald-300" aria-hidden="true" />
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-300/70">
                AI Learning Radar
              </p>
            </div>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">
              One signal a week. No course landfill.
            </h2>
            <p className="mt-5 max-w-2xl text-[16px] leading-7 text-[#b8b8bd]">
              The course, model update, or build path that is worth your time—plus the reason it
              earned a place.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <Link
              href="/newsletter"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              Join the Learning Radar
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/courses#method"
              className="inline-flex min-h-11 items-center justify-center text-sm font-medium text-[#b8b8bd] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Read the selection method
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
