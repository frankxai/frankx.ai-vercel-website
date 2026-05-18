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
import { CommonTraps } from '@/components/workshops/ikigai/CommonTraps'
import { PromptStack } from '@/components/workshops/ikigai/PromptStack'
import { AIConnectors } from '@/components/workshops/ikigai/AIConnectors'
import { WorkshopPath } from '@/components/workshops/ikigai/WorkshopPath'
import { WorkshopProgressRail } from '@/components/workshops/ikigai/WorkshopProgressRail'
import { WORKSHOP_PROMPTS } from '@/lib/workshop-prompts'
import { emptyIkigai, type IkigaiState } from '@/components/workshops/ikigai/types'
import { getWorkshopBySlug } from '@/data/workshops'
import { MODULE_4_CITATIONS, MODULE_5_CITATIONS } from '@/lib/workshop-citations'
import { WORKSHOP_PROMPTS as ALL_PROMPTS } from '@/lib/workshop-prompts'

// Update this when Frank records the Claude Cowork demo. When empty, the
// Module 6 section is hidden entirely (no empty placeholder on a public page).
const LIVE_ARTIFACT_URL = ''

const PRESENTER_SECTIONS = [
  'intro',
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
    '@graph': [
      {
        '@type': 'Course',
        '@id': 'https://frankx.ai/workshops/ikigai-branding#course',
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
      },
      {
        // HowTo schema — agent-readable instructions for running the
        // workshop programmatically. Browser agents (Comet, Operator)
        // can parse this to execute the workshop on the user's behalf.
        '@type': 'HowTo',
        '@id': 'https://frankx.ai/workshops/ikigai-branding#howto',
        name: 'Run the Ikigai & Branding Workshop',
        description:
          'Six prompts, paste-and-run, that turn an attendee from cold open to shipped 30-day plan. Each prompt works in ChatGPT, Claude, or Gemini.',
        totalTime: 'PT75M',
        tool: ['ChatGPT', 'Claude', 'Gemini'],
        supply: [
          { '@type': 'HowToSupply', name: 'A favorite AI assistant account' },
          { '@type': 'HowToSupply', name: 'Notion, Google Sheets, or a CSV-capable tool' },
        ],
        step: ALL_PROMPTS.map((p, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: `Module ${p.module}: ${p.title}`,
          text: p.subtitle,
          url: `https://frankx.ai/workshops/ikigai-branding#prompt-${p.id}`,
          itemListElement: {
            '@type': 'HowToDirection',
            text: p.body.slice(0, 280) + '…',
          },
        })),
      },
    ],
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
      <WorkshopProgressRail />

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
            <p className="text-lg text-zinc-400 mb-6 max-w-2xl leading-relaxed">
              {workshop.subtitle}.
            </p>

            <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
              {workshop.overview}
            </p>

            {/* Primary CTA — for individuals */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#start"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-400 hover:to-violet-500 transition-colors shadow-lg shadow-violet-500/20 cursor-pointer"
              >
                Start the workshop
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="/go/ikigai-coach"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-medium text-zinc-200 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-colors cursor-pointer"
              >
                Prefer a chat? Open Coach GPT
              </a>
            </div>

            {/* Facilitator tools — small, secondary, separated */}
            <div className="mt-5 pt-5 border-t border-white/[0.04] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500">
              <span>Facilitating?</span>
              <Link
                href="/workshops/ikigai-branding/present"
                className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-violet-200 transition-colors cursor-pointer"
              >
                <Presentation className="w-3.5 h-3.5" />
                Open presenter mode
              </Link>
              <span className="text-zinc-700">·</span>
              <button
                onClick={() => setPresenterActive((v) => !v)}
                className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
              >
                {presenterActive ? 'Hide' : 'Show'} on-page HUD
              </button>
              <span className="text-zinc-700">·</span>
              <Link
                href="/workshops/ikigai-branding/present/speaker"
                target="_blank"
                className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
              >
                Speaker view
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Path-selector — orient the three user types */}
      <div id="start" className="scroll-mt-24">
        <WorkshopPath />
      </div>

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

      {/* Module 1: The Ikigai Map */}
      <section id="module-1" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-violet-300 mb-2">
              Module 1 · The Ikigai Map · ~15 min
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

          <div className="mb-5">
            <CommonTraps
              simplification="Pick ONE circle. Get it embarrassingly specific. Move on."
              traps={[
                'Listing what you wish you loved instead of what made time disappear last month',
                'Confusing "good at" with "qualified for" — what others actually thank you for beats the resume',
                'Picking "what pays" from market hype instead of real invoices you can name',
              ]}
            />
          </div>
          <div className="mb-6">
            <PromptStack module={1} prompts={WORKSHOP_PROMPTS} label="The AI-native path — paste these prompts" />
          </div>
          <details className="mb-2 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-4">
            <summary className="cursor-pointer text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Or do the wizard manually — works without AI
            </summary>
            <div className="mt-4">
              <IkigaiWizard value={ikigai} onChange={setIkigai} />
            </div>
          </details>
        </div>
      </section>

      {/* Module 2: Synthesis */}
      <section id="synthesis" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-amber-400 mb-2">
              Module 2 · Purpose Statement · ~10 min
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Write the sentence
            </h2>
          </div>
          <div className="mb-5">
            <CommonTraps
              simplification="Fill the template. Trade with your neighbor. Cut one word. Done."
              traps={[
                'Using abstract nouns (transformation, potential, journey) instead of specific verbs',
                'Writing a sentence a direct competitor could also say verbatim',
                'Trying to be poetic — good purpose statements are boring and specific',
              ]}
            />
          </div>
          <div className="mb-6">
            <PromptStack module={2} prompts={WORKSHOP_PROMPTS} label="The AI-native path" />
          </div>
          <details className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-4">
            <summary className="cursor-pointer text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Or draft manually below
            </summary>
            <div className="mt-4">
          <SynthesisPanel
            value={ikigai}
            onStatementChange={(statement) =>
              setIkigai((prev) => ({ ...prev, statement }))
            }
          />
            </div>
          </details>
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
          <CommonTraps
            simplification="Force one trade-off in positioning. Name one human in audience-of-one. Test each pillar with 5 example posts."
            traps={[
              'Choosing a demographic ("millennial women in tech") instead of a single named person with a Tuesday problem',
              'Three pillars that overlap 80% — same content, different label',
              'Skipping the positioning trade-off ("we serve everyone")',
            ]}
          />
          <PromptStack module={3} prompts={WORKSHOP_PROMPTS} label="The AI-native path" />
          <details className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-4">
            <summary className="cursor-pointer text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Or work through the bridge exercises manually
            </summary>
            <div className="mt-4">
              <BrandingBridge value={ikigai} />
            </div>
          </details>
        </div>
      </section>

      {/* Module 4: Content Operating Plan */}
      <section id="content-plan" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-violet-300 mb-2">
              Module 4 · Content Operating Plan · ~12 min
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              From positioning to publishing
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
              Pillars tell you what to write. This module gives you the rhythm, the formats, and
              the 30-day calendar — anchored to your Module 3 pillars. Monday&apos;s post written by Sunday night.
            </p>
          </div>
          <div className="mb-5">
            <CommonTraps
              simplification="Pick ONE hook format. Write Monday's post in 5 minutes. Schedule it Sunday."
              traps={[
                'Promising to post 5×/week from day 1 — the burnout pattern',
                'Reposting the same content across 4 channels (each channel has a different job)',
                'Optimizing for likes instead of dwell time and replies',
              ]}
            />
          </div>
          <div className="mb-5">
            <AuthorityBar citations={MODULE_4_CITATIONS} label="Why this module matters" />
          </div>
          <div className="mb-6">
            <PromptStack module={4} prompts={WORKSHOP_PROMPTS} label="The AI-native path — these prompts generate your plan" />
          </div>
          <div className="mb-6">
            <AIConnectors />
          </div>
          <details className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-4">
            <summary className="cursor-pointer text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Or use the interactive plan builder below
            </summary>
            <div className="mt-4">
              <ContentOperatingPlan value={ikigai} />
            </div>
          </details>
        </div>
      </section>

      {/* Module 5: GenCreator Stack + AI Companions */}
      <section id="gencreator-stack" className="pb-12 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-sky-300 mb-2">
              Module 5 · The Operating Stack · ~8 min
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Your AI companion. Then the 5-job stack.
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
              First the AI you think with daily. Then the four other jobs every creator runs.
              Opinionated, picked from the field, built to compound — not sprawl.
            </p>
          </div>
          <div className="mb-5">
            <CommonTraps
              simplification="Pick the weakest of the five jobs. Buy or master ONE tool there this week. The other four can wait."
              traps={[
                'Subscribing to 5+ AI tools, mastering none ("toolbelt envy")',
                'Letting the tool dictate the workflow ("I have Claude, what should I do with it?")',
                'Skipping Capture because it feels unsexy — the system fails at the inbox, not the output',
              ]}
            />
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
              Module 7 · Activation · ~5 min
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ship the brand into reality
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
              Pick one pillar. Commit to 4 visible artifacts in 30 days — one post, one short video, one conversation, one small product.
              Public commitment increases follow-through 3×.
            </p>
          </div>

          <PromptStack module={7} prompts={WORKSHOP_PROMPTS} label="Lock the commitment — paste this" />

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

          <Link
            href="/research/blue-zones-ikigai-ai-era"
            prefetch={false}
            className="group block rounded-2xl border border-violet-500/[0.16] bg-violet-500/[0.03] hover:bg-violet-500/[0.06] hover:border-violet-500/[0.24] p-5 sm:p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <p className="text-[10px] uppercase tracking-[0.24em] text-violet-200 mb-2">
              The research behind this workshop
            </p>
            <p className="text-sm font-semibold text-white mb-1.5 leading-snug">
              Blue Zones, Ikigai, and the AI Era
            </p>
            <p className="text-sm text-zinc-300/90 leading-relaxed [font-family:var(--font-serif-editorial)] italic">
              Kamiya 1966 &rarr; Buettner 2005 &rarr; Garc&iacute;a &amp; Miralles 2016 &rarr; Mogi 2017 &mdash; the
              full lineage of ikigai, with an honest reckoning of the 2014 Western Venn. 12-minute read.
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-violet-300 group-hover:text-violet-200 transition-colors">
              Read the research
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

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
