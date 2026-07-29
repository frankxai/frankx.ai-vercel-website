import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  CircleAlert,
  FileCheck2,
  FolderOpen,
  MessageSquareText,
  RefreshCcw,
  ShieldCheck,
} from 'lucide-react'

import JsonLd from '@/components/seo/JsonLd'
import {
  OPENAI_MASTERY_VERIFIED_AT,
  getResourcesForMode,
  openAIRolePaths,
} from '@/data/openai-mastery'

const curriculum = [
  {
    number: '01',
    title: 'Choose a Work-shaped outcome',
    description:
      'Start with a substantial deliverable—a report, deck, spreadsheet, Site, or operating plan—not a quick question.',
    proof: 'You can name the audience, finished artifact, deadline, and review standard.',
  },
  {
    number: '02',
    title: 'Assemble approved context',
    description:
      'Gather the relevant files, connected tools, trusted sources, and constraints before the task begins.',
    proof: 'The source pack is small enough to inspect and clear about which inputs are authoritative.',
  },
  {
    number: '03',
    title: 'Define checkpoints and acceptance',
    description:
      'Tell Work where to pause, what needs approval, what it must verify, and how the final artifact will be judged.',
    proof: 'A reviewer could use the acceptance criteria without guessing your intent.',
  },
  {
    number: '04',
    title: 'Steer without taking the task back',
    description:
      'Answer questions, correct assumptions, and change direction at useful checkpoints while Work keeps ownership of the deliverable.',
    proof: 'Corrections improve the result without restarting the entire workflow.',
  },
  {
    number: '05',
    title: 'Inspect, package, and measure',
    description:
      'Open every generated artifact, verify material claims, document limitations, and package successful patterns for reuse.',
    proof: 'The workflow has an owner, a review date, a fallback, and evidence for the next decision.',
  },
]

const workRoles = openAIRolePaths.filter(
  (role) => role.primarySurface === 'work',
)
const workResources = getResourcesForMode('work')

export default function ChatGPTWorkMasteryPage() {
  const courseSchema = {
    name: 'ChatGPT Work Mastery',
    description:
      'A structured path for choosing, directing, reviewing, and reusing substantial ChatGPT Work workflows.',
    url: 'https://frankx.ai/learn/chatgpt-work-mastery',
    provider: {
      '@type': 'Organization',
      name: 'FrankX',
      url: 'https://frankx.ai',
    },
    educationalLevel: 'Beginner to intermediate',
    learningResourceType: 'Course',
    timeRequired: 'PT6H',
    dateModified: OPENAI_MASTERY_VERIFIED_AT,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT6H',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }

  const breadcrumbSchema = {
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://frankx.ai',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Learn',
        item: 'https://frankx.ai/learn',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'OpenAI Mastery',
        item: 'https://frankx.ai/learn/openai',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'ChatGPT Work Mastery',
        item: 'https://frankx.ai/learn/chatgpt-work-mastery',
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#08090a] text-white">
      <JsonLd id="chatgpt-work-course" type="Course" data={courseSchema} />
      <JsonLd
        id="chatgpt-work-breadcrumbs"
        type="BreadcrumbList"
        data={breadcrumbSchema}
      />

      <section className="relative overflow-hidden border-b border-white/[0.07] pt-32">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(125deg, rgba(16,185,129,0.13), transparent 38%), linear-gradient(310deg, rgba(6,182,212,0.06), transparent 26%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 sm:px-6 lg:pb-28">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#a9a9af]">
            <Link
              href="/learn/openai"
              className="text-emerald-300 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              OpenAI Mastery
            </Link>
            <span aria-hidden="true">/</span>
            <span>ChatGPT Work</span>
            <span aria-hidden="true">/</span>
            <span>Verified {OPENAI_MASTERY_VERIFIED_AT}</span>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_0.78fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <BriefcaseBusiness
                  className="h-5 w-5 text-emerald-300"
                  aria-hidden="true"
                />
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-200/80">
                  The deliverable lane
                </p>
              </div>
              <h1 className="mt-7 max-w-4xl font-display text-5xl font-bold leading-[0.97] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                Give Work an outcome worth reviewing.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#b8b8bd] sm:text-xl">
                ChatGPT Work gathers context, completes multiple steps, and
                produces finished documents, presentations, spreadsheets, Sites,
                and other artifacts. Your job is to define the outcome and keep
                judgment visible.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#curriculum"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090a]"
                >
                  Start the path
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="https://learn.chatgpt.com/docs/get-started-with-work"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090a]"
                >
                  Official Work guide
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/[0.1] bg-[#101113]">
              <div className="border-b border-white/[0.08] p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-[#8e8e95]">
                  Use the right mode
                </p>
                <p className="mt-3 text-sm leading-6 text-[#b8b8bd]">
                  Work is for substantial, reviewable outcomes. Keep lightweight
                  exploration in Chat and repository work in Codex.
                </p>
              </div>
              <div className="grid gap-px bg-white/[0.08] sm:grid-cols-2">
                <Link
                  href="/learn/chatgpt-mastery"
                  className="group bg-[#101113] p-6 transition-colors hover:bg-white/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300"
                >
                  <MessageSquareText
                    className="h-4 w-4 text-cyan-200"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-sm font-semibold text-white">Use Chat</p>
                  <p className="mt-1 text-xs leading-5 text-[#8e8e95]">
                    Questions, brainstorming, drafting, comparison.
                  </p>
                </Link>
                <Link
                  href="/learn/codex-mastery"
                  className="group bg-[#101113] p-6 transition-colors hover:bg-white/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-300"
                >
                  <FileCheck2
                    className="h-4 w-4 text-amber-200"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-sm font-semibold text-white">Use Codex</p>
                  <p className="mt-1 text-xs leading-5 text-[#8e8e95]">
                    Repositories, diffs, tests, technical review.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="curriculum" className="scroll-mt-24 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-300/75">
                Five-part curriculum
              </p>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                The operating loop matters more than the interface.
              </h2>
              <p className="mt-5 max-w-md text-[16px] leading-7 text-[#b8b8bd]">
                A good Work task has a named outcome, approved context, review
                checkpoints, and an accountable human. Learn that loop once and
                apply it across roles.
              </p>
            </div>

            <div className="border-b border-white/[0.08]">
              {curriculum.map((lesson) => (
                <article
                  key={lesson.number}
                  className="grid gap-5 border-t border-white/[0.08] py-8 sm:grid-cols-[48px_1fr]"
                >
                  <span className="font-mono text-sm text-emerald-200">
                    {lesson.number}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.025em] text-white">
                      {lesson.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#b8b8bd]">
                      {lesson.description}
                    </p>
                    <p className="mt-4 flex items-start gap-3 border-l border-emerald-300/25 pl-4 text-xs leading-5 text-emerald-100/70">
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      Evidence: {lesson.proof}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#0d0e10] py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
            <div className="rounded-3xl border border-emerald-300/20 bg-emerald-300/[0.045] p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <FolderOpen
                  className="h-5 w-5 text-emerald-300"
                  aria-hidden="true"
                />
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-200/75">
                  Starter project
                </p>
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white">
                Build a weekly operating brief.
              </h2>
              <p className="mt-5 max-w-2xl text-[16px] leading-7 text-[#b8b8bd]">
                Put last week&apos;s notes, metrics, and open decisions in one
                approved folder. Ask Work for a brief with an executive summary,
                decisions, risks, owners, and next actions. Inspect every source,
                number, and section before reuse.
              </p>
              <ol className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  'Define the audience and finished artifact.',
                  'Mark authoritative inputs and review checkpoints.',
                  'Open the final files and record corrections.',
                ].map((step, index) => (
                  <li
                    key={step}
                    className="border-t border-white/[0.09] pt-4 text-sm leading-6 text-[#b8b8bd]"
                  >
                    <span className="mb-2 block font-mono text-[10px] text-emerald-200">
                      0{index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl border border-white/[0.1] bg-[#101113] p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <CircleAlert
                  className="h-5 w-5 text-amber-200"
                  aria-hidden="true"
                />
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-100/70">
                  Review gate
                </p>
              </div>
              <ul className="mt-7 space-y-5">
                {[
                  'Verify important numbers, names, dates, quotes, and claims.',
                  'Open every generated document, sheet, slide, page, and tab.',
                  'Confirm the correct and most current sources were used.',
                  'Document missing information and unsupported assumptions.',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-[#b8b8bd]"
                  >
                    <ShieldCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300"
                      aria-hidden="true"
                    />
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
          <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-300/75">
                Role applications
              </p>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white">
                One operating loop. Different outcomes.
              </h2>
              <p className="mt-5 text-[16px] leading-7 text-[#b8b8bd]">
                The role changes the source pack, artifact, and review standard.
                It does not require a separate academy.
              </p>
            </div>

            <div className="border-b border-white/[0.08]">
              {workRoles.map((role) => (
                <article
                  key={role.id}
                  className="grid gap-4 border-t border-white/[0.08] py-7 sm:grid-cols-[160px_1fr]"
                >
                  <h3 className="text-sm font-semibold text-emerald-200">
                    {role.label}
                  </h3>
                  <div>
                    <p className="text-sm leading-6 text-[#b8b8bd]">
                      {role.promise}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-[#8e8e95]">
                      First task: {role.firstTask}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#0d0e10] py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-300/75">
                Official sequence
              </p>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white">
                Learn Work from current sources.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#a9a9af]">
              Work launched on July 9. Upcoming Academy sessions are labeled as
              such and should become replays when OpenAI publishes them.
            </p>
          </div>

          <div className="mt-12 border-b border-white/[0.08]">
            {workResources.map((resource) => (
              <a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-4 border-t border-white/[0.08] py-6 transition-colors hover:bg-white/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-300 sm:grid-cols-[1fr_auto] sm:px-3"
                aria-label={`${resource.title} from ${resource.provider} (opens in a new tab)`}
              >
                <span>
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-xl font-semibold text-white">
                      {resource.title}
                    </span>
                    <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.13em] text-[#a9a9af]">
                      {resource.status}
                    </span>
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-[#a9a9af]">
                    {resource.summary}
                  </span>
                  {resource.editorialNote && (
                    <span className="mt-2 block text-xs leading-5 text-amber-100/65">
                      {resource.editorialNote}
                    </span>
                  )}
                  {resource.recordedBeforeWorkLaunch && (
                    <span className="mt-2 block text-xs leading-5 text-amber-100/65">
                      Recorded before ChatGPT Work launched. The workflow still
                      applies; current nontechnical users should start in Work.
                    </span>
                  )}
                </span>
                <span className="flex items-center gap-2 self-center text-xs font-medium text-[#8e8e95] group-hover:text-white">
                  {resource.provider}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          <RefreshCcw
            className="mx-auto h-5 w-5 text-emerald-300"
            aria-hidden="true"
          />
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white">
            Choose the complete OpenAI path.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-7 text-[#b8b8bd]">
            Return to the central guide to compare Work with Chat and Codex, or
            move directly into the developer path.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/learn/openai"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090a]"
            >
              Open the central guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/learn/codex-mastery"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090a]"
            >
              Continue to Codex
            </Link>
          </div>
          <p className="mt-8 text-xs leading-5 text-[#77777f]">
            Independent FrankX curriculum. Not affiliated with or endorsed by
            OpenAI.
          </p>
        </div>
      </section>
    </main>
  )
}
