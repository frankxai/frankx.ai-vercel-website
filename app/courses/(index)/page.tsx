import Link from 'next/link'
import {
  ArrowRight,
  BookMarked,
  Check,
  CircleDot,
  FlaskConical,
  Radar,
  ShieldCheck,
} from 'lucide-react'
import JsonLd from '@/components/seo/JsonLd'
import CourseRecommendationCard from '@/components/learn/CourseRecommendationCard'
import { learningFieldNotes, recommendedCourses } from '@/data/learning-catalog'
import { featuredCourse, plannedCourses } from '@/lib/courses/roadmap'

const selectionCriteria = [
  ['Outcome fit', 'The course must produce a clear capability, not just expose you to a topic.'],
  ['Applied work', 'Projects and exercises carry more weight than passive video volume.'],
  ['Source quality', 'Instructor credibility and primary material are checked before placement.'],
  ['Freshness', 'Fast-moving AI content needs a visible verification date and routine review.'],
  ['Total commitment', 'Time, prerequisites, and likely cost are part of the recommendation.'],
  ['Commercial independence', 'Commission has no weight in selection or order.'],
] as const

export default function CoursesPage() {
  const courseListSchema = {
    name: 'FrankX independent AI course selections',
    description:
      'A small, independently selected shelf of AI courses, mapped to learner goals and verified for freshness.',
    numberOfItems: recommendedCourses.length,
    itemListElement: recommendedCourses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: course.title,
        description: course.verdict,
        url: course.canonicalUrl,
        provider: { '@type': 'Organization', name: course.provider },
        educationalLevel: course.level,
      },
    })),
  }

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <JsonLd type="ItemList" data={courseListSchema} />

      <section className="relative overflow-hidden border-b border-white/[0.06] pt-32">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle at 18% 12%, rgba(16,185,129,0.1), transparent 30%), radial-gradient(circle at 80% 26%, rgba(6,182,212,0.06), transparent 27%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 sm:px-6 lg:pb-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-emerald-300/75">
            FrankX course shelf
          </p>
          <h1 className="mt-7 max-w-5xl font-display text-5xl font-bold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
            The course shelf, edited.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#b8b8bd] sm:text-xl">
            A small set of AI courses worth your time—plus the FrankX programs being built in
            public. Every external pick explains who it is for, why it is here, and when it was
            last checked.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#course-picks"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              See the course picks
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/learn#choose-path"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              Start with the learning map
            </Link>
          </div>

          <div className="mt-14 grid gap-3 border-t border-white/[0.07] pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-[#98989f] sm:grid-cols-3">
            <p className="inline-flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
              No paid placement
            </p>
            <p className="inline-flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
              Affiliate links labeled
            </p>
            <p className="inline-flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
              Every pick dated
            </p>
          </div>
        </div>
      </section>

      <section id="course-picks" className="scroll-mt-24 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-300/70">
                Independent recommendations
              </p>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">
                Start with fit, not rankings.
              </h2>
              <p className="mt-5 text-[16px] leading-7 text-[#b8b8bd]">
                The right course depends on the work you want to do. These five cover practical
                AI fluency, organizational strategy, technical foundations, LLM engineering, and
                product leadership.
              </p>
              <p className="mt-5 border-l border-emerald-400/40 pl-4 text-sm leading-6 text-[#98989f]">
                These launch links are direct provider URLs. If tracked affiliate links are added
                later, each affected card will be marked before you click.
              </p>
            </div>

            <CourseRecommendationCard course={recommendedCourses[0]} featured />
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {recommendedCourses.slice(1).map((course) => (
              <CourseRecommendationCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-[#0d0d0f] py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-300/70">
                From FrankX Labs
              </p>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">
                Original programs, built in public.
              </h2>
              <p className="mt-5 text-[16px] leading-7 text-[#b8b8bd]">
                Live material and planned programs are kept separate from external
                recommendations, so availability is never ambiguous.
              </p>
            </div>

            <article className="rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.055] p-7 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-200">
                  <CircleDot className="h-3.5 w-3.5" aria-hidden="true" />
                  Module 1 live and free
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#98989f]">
                  FrankX original
                </span>
              </div>
              <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                {featuredCourse.title}
              </h3>
              <p className="mt-4 max-w-2xl text-[16px] leading-7 text-[#b8b8bd]">
                {featuredCourse.summary}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/courses/build-your-ai-creator-os/module-1"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#06110d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113]"
                >
                  Start free module
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/courses/build-your-ai-creator-os"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113]"
                >
                  View curriculum
                </Link>
              </div>
            </article>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {plannedCourses.map((course) => (
              <article
                key={course.slug}
                className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#111113] p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <FlaskConical className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                  <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#98989f]">
                    In development
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.025em] text-white">
                  {course.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#b8b8bd]">{course.shortDescription}</p>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#98989f]">
                  {course.launchWindow}
                </p>
                <Link
                  href={`/courses/${course.slug}`}
                  className="mt-auto inline-flex min-h-11 items-center gap-2 pt-7 text-sm font-medium text-white hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  View development roadmap
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="method" className="scroll-mt-24 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-300/70">
                  Selection method
                </p>
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.035em] text-white">
                What earns a place.
              </h2>
              <p className="mt-5 text-[16px] leading-7 text-[#b8b8bd]">
                FrankX is the decision layer, not another marketplace. Recommendations are
                assessed against a small set of visible criteria.
              </p>
            </div>

            <div className="border-b border-white/[0.07]">
              {selectionCriteria.map(([title, description], index) => (
                <div
                  key={title}
                  className="grid gap-3 border-t border-white/[0.07] py-6 sm:grid-cols-[40px_0.35fr_0.65fr] sm:items-start sm:px-4"
                >
                  <span className="font-mono text-[11px] text-emerald-300/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
                  <p className="text-sm leading-6 text-[#b8b8bd]">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-white/[0.08] bg-[#111113] p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300/70">
              Commercial disclosure
            </p>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-[#b8b8bd]">
              Some course links may become affiliate links. When one is active, the course card
              is labeled and FrankX may earn a commission if you enroll, at no extra cost to you.
              Commercial relationships never determine selection, verdict, or placement.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-[#0d0d0f] py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-300/70">
                Read before you enroll
              </p>
              <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-[-0.035em] text-white">
                The FrankX blog is part of the product.
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Browse all field notes
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {learningFieldNotes.map((note) => (
              <Link
                key={note.href}
                href={note.href}
                className="group flex min-h-72 flex-col rounded-2xl border border-white/[0.08] bg-[#111113] p-6 transition-colors hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <BookMarked className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.16em] text-[#98989f]">
                  {note.label} / {note.readingTime}
                </p>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.025em] text-white">
                  {note.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#b8b8bd]">{note.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-white">
                  Read field note
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-16 grid gap-8 rounded-3xl border border-white/[0.09] bg-[#111113] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <Radar className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-300/70">
                  AI Learning Radar
                </p>
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em] text-white">
                One field-tested course or workflow each week.
              </h2>
            </div>
            <Link
              href="/newsletter"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113]"
            >
              Join the Learning Radar
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
