import Link from 'next/link'
import {
  ArrowRight,
  Clock,
  Code,
  FileText,
  Image,
  Music,
  PenTool,
  Rocket,
  type LucideIcon,
} from 'lucide-react'

interface GuideDoc {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  category?: string
  tags?: string[]
}

interface GuidesPageClientProps {
  guides: GuideDoc[]
}

type GuideCategory = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  slugs: string[]
}

const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    id: 'visual',
    title: 'Visual systems',
    description: 'Image generation, product photography, and repeatable brand decisions.',
    icon: Image,
    slugs: [
      'midjourney-guide',
      'image-generation-mastery',
      'product-photography-ai',
      'brand-identity-design',
    ],
  },
  {
    id: 'content',
    title: 'Research and publishing',
    description: 'Writing, documentation, source work, and content workflows that can be maintained.',
    icon: PenTool,
    slugs: [
      'agentic-obsidian-second-brain',
      'ai-writing-system',
      'claude-anthropic-guide',
      'openai-chatgpt-guide',
      'perplexity-ai-guide',
      'top-50-ai-prompts',
    ],
  },
  {
    id: 'audio',
    title: 'Music and voice',
    description: 'Prompting, production, voice, and the release decisions around creative audio.',
    icon: Music,
    slugs: ['suno-prompt-playbook', 'elevenlabs-voice-guide', 'ai-music-production'],
  },
  {
    id: 'founder',
    title: 'Founder practice',
    description: 'Decision frameworks and operating patterns for building with a small team and AI.',
    icon: Rocket,
    slugs: [
      'modern-guide',
      'skills-library-playbook',
      'agent-collective-operating-system',
      'founder-ai-stack-2026',
    ],
  },
  {
    id: 'development',
    title: 'Agent and development workflows',
    description: 'Coding agents, orchestration, automation boundaries, and production handoffs.',
    icon: Code,
    slugs: [
      'claude-code-getting-started',
      'multi-agent-orchestration',
      'ai-automation-patterns',
    ],
  },
]

function GuideCard({ guide }: { guide: GuideDoc }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group grid min-h-[190px] grid-rows-[1fr_auto] rounded-[1.35rem] border border-white/[0.09] bg-white/[0.022] p-6 transition-colors hover:border-emerald-300/25 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
    >
      <div>
        <h3 className="text-lg font-semibold leading-snug text-white">{guide.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/65">{guide.description}</p>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-white/55">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {guide.readingTime}
        </span>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-300 group-hover:text-emerald-200">
          Read
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}

function CategorySection({
  category,
  guides,
}: {
  category: GuideCategory
  guides: GuideDoc[]
}) {
  const categoryGuides = guides.filter((guide) => category.slugs.includes(guide.slug))
  if (categoryGuides.length === 0) return null

  const Icon = category.icon

  return (
    <section className="border-t border-white/[0.08] py-14" aria-labelledby={`guide-category-${category.id}`}>
      <div className="grid gap-8 lg:grid-cols-[0.34fr_1fr] lg:gap-14">
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/[0.055] text-cyan-300">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 id={`guide-category-${category.id}`} className="mt-5 text-2xl font-semibold">
            {category.title}
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/62">{category.description}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {categoryGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function GuidesPageClient({ guides }: GuidesPageClientProps) {
  const openingGuide = guides.find((guide) => guide.slug === 'modern-guide') ?? guides[0]
  const categorizedSlugs = new Set(GUIDE_CATEGORIES.flatMap((category) => category.slugs))
  const uncategorizedGuides = guides.filter(
    (guide) => !categorizedSlugs.has(guide.slug) && guide.slug !== openingGuide?.slug,
  )

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.07] pb-20 pt-32">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_8%,rgba(16,185,129,0.1),transparent_30%),radial-gradient(circle_at_12%_0%,rgba(6,182,212,0.06),transparent_26%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-300/80">
            Field guides · methods from the work
          </p>
          <div className="mt-6 grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:gap-20">
            <div>
              <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                Methods that survived
                <span className="block text-white/55">the work.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
                These guides begin with a build, a research question, or a repeated creative
                practice. I publish the method when it becomes clear enough for someone else to
                test—not when a tool needs another tutorial.
              </p>
            </div>

            {openingGuide && (
              <Link
                href={`/guides/${openingGuide.slug}`}
                className="group rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/[0.045] p-7 transition-colors hover:border-emerald-300/35 hover:bg-emerald-300/[0.065] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200/75">
                  A useful first guide
                </p>
                <h2 className="mt-5 text-2xl font-semibold">{openingGuide.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/65">
                  {openingGuide.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 group-hover:text-emerald-200">
                  Read the guide
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        {GUIDE_CATEGORIES.map((category) => (
          <CategorySection key={category.id} category={category} guides={guides} />
        ))}

        {uncategorizedGuides.length > 0 && (
          <section className="border-t border-white/[0.08] py-14" aria-labelledby="more-guides">
            <div className="grid gap-8 lg:grid-cols-[0.34fr_1fr] lg:gap-14">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-white/72">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 id="more-guides" className="mt-5 text-2xl font-semibold">More from the work</h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/62">
                  Additional methods that do not fit neatly inside one practice.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {uncategorizedGuides.map((guide) => (
                  <GuideCard key={guide.slug} guide={guide} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <section className="border-t border-white/[0.07] bg-[#0c0e0e] py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            Want the reasoning behind the method?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65">
            Open the research for sources and open questions, or inspect the workspace to see
            how a guide moves from raw material to a reviewed public page.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/research"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0c0e0e]"
            >
              Open the research
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/workspace"
              className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium text-white/72 underline decoration-white/25 underline-offset-8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Inspect the workflow
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
