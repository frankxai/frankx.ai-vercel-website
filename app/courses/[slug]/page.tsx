import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarClock, CheckCircle2, Clock3, Users2 } from 'lucide-react'

import { EmailSignup } from '@/components/email-signup'
import { getPlannedCourse, plannedCourses } from '@/lib/courses/roadmap'
import { createMetadata } from '@/lib/seo'

type CourseDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return plannedCourses.map((course) => ({ slug: course.slug }))
}

export async function generateMetadata({ params }: CourseDetailPageProps) {
  const { slug } = await params
  const course = getPlannedCourse(slug)

  if (!course) {
    return createMetadata({
      title: 'Course Not Found | FrankX',
      description: 'The requested course roadmap page does not exist.',
      path: '/courses',
    })
  }

  return createMetadata({
    title: `${course.title} (Planned) | FrankX Courses`,
    description: `${course.shortDescription} Review the planned course and record your interest.`,
    path: `/courses/${course.slug}`,
  })
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params
  const course = getPlannedCourse(slug)

  if (!course) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="mx-auto max-w-5xl px-6 py-16 pt-28 space-y-14">
        <div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to course roadmap
          </Link>
        </div>

        <header className="space-y-6">
          <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-medium tracking-[0.14em] text-amber-300">
            Planned course · Interest open
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
            {course.title}
          </h1>
          <p className="text-lg text-white/65 max-w-3xl leading-relaxed">{course.summary}</p>

          <div className="grid gap-3 md:grid-cols-3 text-sm">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-white/40 mb-1">Launch Window</p>
              <p className="flex items-center gap-2 text-white/85">
                <CalendarClock className="w-4 h-4 text-emerald-300" />
                {course.launchWindow}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-white/40 mb-1">Estimated Commitment</p>
              <p className="flex items-center gap-2 text-white/85">
                <Clock3 className="w-4 h-4 text-cyan-300" />
                {course.commitment}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-white/40 mb-1">Planned Format</p>
              <p className="text-white/85">{course.format}</p>
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h2 className="text-lg font-semibold text-emerald-200 mb-2">What is true right now</h2>
          <p className="text-sm text-emerald-100/80 leading-relaxed">
            This page outlines a planned course. The form below records course interest
            and subscribes you to occasional FrankX field notes. The immediate email is the standard
            newsletter welcome. It does not enroll you or create course-specific follow-up.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-semibold">Who this is for</h2>
          <ul className="space-y-3">
            {course.audience.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                <Users2 className="w-4 h-4 text-cyan-300 mt-0.5" />
                <span className="text-white/75">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-semibold">What you should be able to do</h2>
          <ul className="space-y-3">
            {course.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                <span className="text-white/75">{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-semibold">Draft Module Outline</h2>
          <div className="grid gap-4">
            {course.outline.map((module, index) => (
              <article key={module.title} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-white/40 mb-2">Module {index + 1}</p>
                <h3 className="text-lg font-semibold text-white mb-2">{module.title}</h3>
                <p className="text-white/65 leading-relaxed">{module.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="waitlist" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Record your interest</h2>
            <p className="text-white/65 max-w-2xl">
              Tell Frank which planned course matters to you. Submitting also subscribes you to
              occasional FrankX field notes and their standard welcome email. It does not create
              course-specific notifications. Unsubscribe anytime.
            </p>
          </div>
          <EmailSignup
            listType="courses-waitlist"
            source={`/courses/${course.slug}`}
            intent={`course-${course.slug}`}
            showName
            buttonText="Record course interest"
            placeholder="you@company.com"
          />
        </section>
      </div>
    </main>
  )
}
