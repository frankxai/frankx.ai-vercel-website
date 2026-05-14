'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Layers,
  Users,
  Mail,
  Sparkles,
  Compass,
  MessageSquareMore,
  Presentation,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import { EmailSignup } from '@/components/email-signup'
import { IkigaiWizard } from '@/components/workshops/ikigai/IkigaiWizard'
import { SynthesisPanel } from '@/components/workshops/ikigai/SynthesisPanel'
import { BrandingBridge } from '@/components/workshops/ikigai/BrandingBridge'
import { CoachGPTCard } from '@/components/workshops/ikigai/CoachGPTCard'
import { ContentOperatingPlan } from '@/components/workshops/ikigai/ContentOperatingPlan'
import { GenCreatorStack } from '@/components/workshops/ikigai/GenCreatorStack'
import { LiveArtifact } from '@/components/workshops/ikigai/LiveArtifact'
import { PresenterOverlay } from '@/components/workshops/ikigai/PresenterOverlay'
import { AuthorityBar } from '@/components/workshops/ikigai/AuthorityBar'
import { AICompanions } from '@/components/workshops/ikigai/AICompanions'
import { emptyIkigai, type IkigaiState } from '@/components/workshops/ikigai/types'
import { getWorkshopBySlug } from '@/data/workshops'
import { MODULE_4_CITATIONS, MODULE_5_CITATIONS } from '@/lib/workshop-citations'

// Update this when Frank records the Claude Cowork demo. When empty, the
// Module 6 section is hidden entirely (no empty placeholder on a public page).
const LIVE_ARTIFACT_URL = ''

const PRESENTER_SECTIONS = [
  'intro',
  'three-cs',
  'module-1',
  'synthesis',
  'brand-bridge',
  'content-plan',
  'gencreator-stack',
  // 'live-artifact' is hidden until LIVE_ARTIFACT_URL is populated
  'activation',
]

function CourseSchema() {
  const ld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Ikigai & Branding Workshop',
    description:
      'Interactive, coach-guided workshop. Map your Ikigai, write your purpose statement, translate it into a brand positioning, and ship a 30-day content plan across LinkedIn + newsletter + video.',
    url: 'https://frankx.ai/workshops/ikigai-branding',
    provider: {
      '@type': 'Person',
      name: 'Frank Riemer',
      url: 'https://frankx.ai',
      jobTitle: 'AI Architect',
    },
    educationalLevel: 'Beginner',
    timeRequired: 'PT75M',
    numberOfCredits: 7,
    isAccessibleForFree: true,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT75M',
    },
  })
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
}

export default function IkigaiBrandingWorkshopPage() {
  const workshop = getWorkshopBySlug('ikigai-branding')!
  const [ikigai, setIkigai] = useState<IkigaiState>(emptyIkigai)
  const [presenterActive, setPresenterActive] = useState(false)

  // Activate presenter overlay via ?present=1 query param (read on mount, no Suspense needed)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('present') === '1') setPresenterActive(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <CourseSchema />

      {/* Hero */}
      <section id="intro" className="relative pt-28 pb-12 overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/[0.05] via-amber-500/[0.02] to-transparent" />
        <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-violet-500/[0.06] rounded-full blur-[140px]" />
        <div className="absolute top-40 right-1/3 w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[120px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/workshops"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All workshops
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border bg-emerald-500/15 text-emerald-400 border-emerald-500/25">
                Beginner
              </span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Clock className="w-3.5 h-3.5" />
                {workshop.duration}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Layers className="w-3.5 h-3.5" />
                7 modules
              </span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Users className="w-3.5 h-3.5" />
                {workshop.audience}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Ikigai & Branding{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-400">
                Workshop
              </span>
            </h1>
            <p className="text-lg text-zinc-400 mb-6 max-w-2xl">
              {workshop.subtitle}.
            </p>

            <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
              {workshop.overview}
            </p>

            <div className="mt-8 max-w-xl">
              <CoachGPTCard />
            </div>

            {/* Presenter tools — visible to anyone, useful for facilitators */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Link
                href="/workshops/ikigai-branding/present"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-zinc-300 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-colors"
              >
                <Presentation className="w-3.5 h-3.5" />
                Open presenter mode
              </Link>
              <button
                onClick={() => setPresenterActive((v) => !v)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-zinc-400 bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] hover:text-zinc-200 transition-colors"
              >
                {presenterActive ? 'Hide' : 'Show'} on-page HUD
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ikigai Venn — visual anchor */}
      <section className="pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.01]">
            <Image
              src="/images/workshops/ikigai-branding/ikigai-venn.jpg"
              alt="Ikigai Venn diagram: four circles — what you love, what you are good at, what the world needs, what pays — intersecting at IKIGAI, with Passion, Mission, Profession, and Vocation at the pairwise overlaps."
              width={1920}
              height={960}
              priority
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlowCard color="violet">
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-300" />
                What you will leave with
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {workshop.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-emerald-400 opacity-70" />
                    <p className="text-sm text-zinc-300">{obj}</p>
                  </div>
                ))}
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-emerald-400 opacity-70" />
                  <p className="text-sm text-zinc-300">A 30-day content plan generated from your three pillars — exportable to Notion, Google Sheets, or CSV.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-emerald-400 opacity-70" />
                  <p className="text-sm text-zinc-300">The GenCreator Stack — five tools across Capture · Think · Make · Ship · Measure.</p>
                </div>
              </div>
            </div>
          </GlowCard>
        </div>
      </section>

      {/* The 3Cs */}
      <section id="three-cs" className="pb-16 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">
              Framework
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              The 3Cs — Human skills that compound with AI
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
              Your Ikigai points at what to build. The 3Cs are how you build it without getting automated around.
            </p>
          </div>

          <div className="mb-6 rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.01]">
            <Image
              src="/images/workshops/ikigai-branding/three-cs-triad.jpg"
              alt="The 3Cs as three interlocking clay forms — a violet sphere (Collaboration), an amber cube (Communication), and an emerald prism (Creation) — fused at a warm glowing core."
              width={1200}
              height={1200}
              className="w-full h-auto max-w-2xl mx-auto"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'Collaboration',
                items: [
                  'PACE: Plan → Act → Check → Evolve',
                  'PAIR with AI: Plan, Ask, Iterate, Review',
                  'Iteration speed & decision clarity',
                ],
                color: 'violet',
              },
              {
                title: 'Communication',
                items: [
                  'BLUF and SCQA frameworks',
                  'Design docs & demo scripts',
                  'Clear, reproducible outputs',
                ],
                color: 'amber',
              },
              {
                title: 'Creation',
                items: [
                  'Goldilocks scope',
                  'Build → measure → learn',
                  "Ship small, show don't tell",
                ],
                color: 'emerald',
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
              >
                <h3 className="text-base font-semibold text-white mb-3">
                  {c.title}
                </h3>
                <ul className="space-y-2">
                  {c.items.map((it, i) => (
                    <li
                      key={i}
                      className="text-sm text-zinc-400 flex items-start gap-2"
                    >
                      <span className="text-zinc-600">—</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 1: The Ikigai Map */}
      <section id="module-1" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-violet-300 mb-2">
              Module 1 · The Ikigai Map
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
              <Compass className="w-6 h-6 text-violet-300" />
              Map your four circles
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
              Four guided steps. Each with a Socratic prompt and a Coach GPT deep-link.
              Your answers save to your browser automatically.
            </p>
          </div>

          <IkigaiWizard value={ikigai} onChange={setIkigai} />
        </div>
      </section>

      {/* Module 2: Synthesis */}
      <section id="synthesis" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-amber-400 mb-2">
              Module 2 · Purpose Statement
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Write the sentence
            </h2>
          </div>
          <SynthesisPanel
            value={ikigai}
            onStatementChange={(statement) =>
              setIkigai((prev) => ({ ...prev, statement }))
            }
          />
        </div>
      </section>

      {/* Module 3: Brand Bridge */}
      <section id="brand-bridge" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.01]">
            <Image
              src="/images/workshops/ikigai-branding/purpose-to-brand-flow.jpg"
              alt="Four-step flow: Ikigai Statement → Positioning → Audience of One → Content Pillars, rendered as glass cards with gradient arrows."
              width={1920}
              height={1080}
              className="w-full h-auto"
            />
          </div>
          <BrandingBridge value={ikigai} />
        </div>
      </section>

      {/* Module 4: Content Operating Plan — NEW */}
      <section id="content-plan" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-violet-300 mb-2">
              Module 4 · Content Operating Plan
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              From positioning to publishing
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
              The pillars tell you what to write about. This module gives you the patterns, the rhythm,
              and the calendar so blank-page mornings end. Anchored to your three pillars from Module 3.
            </p>
          </div>
          <div className="mb-5">
            <AuthorityBar citations={MODULE_4_CITATIONS} label="Why this module matters" />
          </div>
          <ContentOperatingPlan value={ikigai} />
        </div>
      </section>

      {/* Module 5: GenCreator Stack + AI Companions */}
      <section id="gencreator-stack" className="pb-12 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-sky-300 mb-2">
              Module 5 · The Operating Stack
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Your AI companion. Then the 5-job stack.
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
              Two layers. First the AI brain you actually think with. Then the four other jobs you run
              every week. Opinionated, picked from the field, built to compound — not sprawl.
            </p>
          </div>
          <div className="mb-6">
            <AuthorityBar citations={MODULE_5_CITATIONS} label="Why this stack now" />
          </div>
          <div className="mb-8">
            <AICompanions />
          </div>
          <GenCreatorStack />
        </div>
      </section>

      {/* Module 6: Live Artifact — gated until Frank records */}
      {LIVE_ARTIFACT_URL && (
        <section id="live-artifact" className="pb-12 scroll-mt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <p className="text-xs font-medium uppercase tracking-wider text-amber-400 mb-2">
                Module 6 · The Artifact
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                AI-assisted. Voice-preserved.
              </h2>
              <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
                The whole workshop in one demo. Watch a LinkedIn post get written — with rejections, redirects,
                and the prompt scaffold you can keep.
              </p>
            </div>
            <LiveArtifact embedUrl={LIVE_ARTIFACT_URL} />
          </div>
        </section>
      )}

      {/* Module 7: Activation + Email capture (was Module 4) */}
      <section id="activation" className="pb-24 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="mb-2">
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-400 mb-2">
              Module 7 · Activation
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ship the brand into reality
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
              Pick one pillar. Commit to 4 visible artifacts in 30 days — one post, one short video, one conversation, one small product.
              Subscribe for the Resource Pack and a Day-7 check-in.
            </p>
          </div>

          <GlowCard color="emerald">
            <div className="p-6 sm:p-8 text-center">
              <Mail className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Get the Resource Pack
              </h3>
              <p className="text-sm text-zinc-400 mb-5 max-w-md mx-auto">
                Templates for the positioning sentence, avatar, 30-day expression plan, and the GenCreator Stack checklist. Plus a Day-7 check-in from Frank.
              </p>
              <div className="max-w-sm mx-auto">
                <EmailSignup
                  listType="ikigai-branding"
                  placeholder="Your email"
                  buttonText="Send Resource Pack"
                  compact
                />
              </div>
            </div>
          </GlowCard>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6 flex items-start gap-3">
            <MessageSquareMore className="w-5 h-5 text-violet-300 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white mb-1">
                Prefer a conversation?
              </p>
              <p className="text-sm text-zinc-400 mb-3">
                The free Ikigai &amp; Branding Coach GPT can walk you through everything on this page via chat.
              </p>
              <a
                href="/go/ikigai-coach"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-300 hover:text-violet-200"
              >
                Open the Coach GPT
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <Link
              href="/workshops"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All workshops
            </Link>
            <Link
              href="/workshops/ai-2026-graduates"
              className="inline-flex items-center gap-1.5 text-sm text-violet-300 hover:text-violet-200 transition-colors"
            >
              AI in 2026 workshop
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Presenter HUD overlay — activates via state toggle or ?present=1 */}
      <PresenterOverlay sectionIds={PRESENTER_SECTIONS} active={presenterActive} />
    </div>
  )
}
