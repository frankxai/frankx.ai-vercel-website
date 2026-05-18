'use client'

/**
 * Ikigai Workshop — V2 (Editorial Clean)
 *
 * The 2026-05-18 revamp: kanji wisdom panel replaces generic Venn JPG,
 * Source Serif 4 editorial accents, react-markdown rendering in prompt
 * cards, 13 prompts (was 6) including M0 Initial Read, M1.5 Dream+Doubt
 * Validator, M5 AI Companions, M6 Ship Live Artifact, M8 Brand Launch Kit
 * triptych. Red/green hectoring callouts removed.
 *
 * Canonical lives at /workshops/ikigai-branding. This URL is a comparison
 * surface for the V3 cinematic alternative.
 */

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
import { ContentOperatingPlan } from '@/components/workshops/ikigai/ContentOperatingPlan'
import { GenCreatorStack } from '@/components/workshops/ikigai/GenCreatorStack'
import { LiveArtifact } from '@/components/workshops/ikigai/LiveArtifact'
import { PresenterOverlay } from '@/components/workshops/ikigai/PresenterOverlay'
import { AuthorityBar } from '@/components/workshops/ikigai/AuthorityBar'
import { AICompanions } from '@/components/workshops/ikigai/AICompanions'
import { IkigaiWisdom } from '@/components/workshops/ikigai/IkigaiWisdom'
import { PromptStack } from '@/components/workshops/ikigai/PromptStack'
import { AIConnectors } from '@/components/workshops/ikigai/AIConnectors'
import { WorkshopPath } from '@/components/workshops/ikigai/WorkshopPath'
import { WORKSHOP_PROMPTS } from '@/lib/workshop-prompts'
import { emptyIkigai, type IkigaiState } from '@/components/workshops/ikigai/types'
import { getWorkshopBySlug } from '@/data/workshops'
import { MODULE_4_CITATIONS, MODULE_5_CITATIONS } from '@/lib/workshop-citations'

const LIVE_ARTIFACT_URL = ''

const PRESENTER_SECTIONS = [
  'intro',
  'wisdom',
  'module-0',
  'module-1',
  'module-1-5',
  'synthesis',
  'brand-bridge',
  'content-plan',
  'gencreator-stack',
  'ship-artifact',
  'activation',
  'brand-launch-kit',
]

export default function IkigaiWorkshopV2Page() {
  const workshop = getWorkshopBySlug('ikigai-branding')!
  const [ikigai, setIkigai] = useState<IkigaiState>(emptyIkigai)
  const [presenterActive, setPresenterActive] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('present') === '1') setPresenterActive(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section id="intro" className="relative pt-28 pb-12 overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/[0.05] via-amber-500/[0.02] to-transparent" />
        <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-violet-500/[0.06] rounded-full blur-[140px]" />
        <div className="absolute top-40 right-1/3 w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[120px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/workshops/ikigai-branding"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to canonical
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/[0.08] text-violet-200 text-xs font-medium [font-family:var(--font-serif-editorial)] italic">
              V2 · Editorial Clean
            </div>
          </div>

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
                10 modules
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
            <p className="text-lg sm:text-xl text-zinc-300 mb-6 max-w-2xl leading-relaxed [font-family:var(--font-serif-editorial)] italic">
              {workshop.subtitle}.
            </p>

            <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
              {workshop.overview}
            </p>

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
                href="/workshops/ikigai/v3"
                className="text-amber-300/80 hover:text-amber-200 transition-colors cursor-pointer"
              >
                Compare V3 →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div id="start" className="scroll-mt-24">
        <WorkshopPath />
      </div>

      <div id="wisdom" className="scroll-mt-24">
        <IkigaiWisdom />
      </div>

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

      <section id="module-0" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-amber-300 mb-2 [font-family:var(--font-serif-editorial)] italic">
                Module 0 · Initial Read · ~3 min
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                Ask your AI what it already knows about you
              </h2>
              <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Before the Socratic walk, give your AI permission to draft a hypothesis from whatever
                memory it has of you. The walk gets sharper when you start from a real read, not a blank page.
              </p>
            </div>
            <PromptStack module={0} prompts={WORKSHOP_PROMPTS} label="Run this first" />
          </motion.div>
        </div>
      </section>

      <section id="module-1" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-300 mb-2 [font-family:var(--font-serif-editorial)] italic">
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

      <section id="module-1-5" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-300 mb-2 [font-family:var(--font-serif-editorial)] italic">
                Module 1.5 · Stress-test the loves · ~10 min
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                Slash the doubt before it slashes the dream
              </h2>
              <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed [font-family:var(--font-serif-editorial)] italic">
                Most Ikigai walks die at the same step — &ldquo;I can&rsquo;t have fun AND earn from this.&rdquo;
                This prompt asks your AI to bring proof: real people, real revenue, real frictions. No fabrication allowed.
              </p>
            </div>
            <PromptStack module={1.5} prompts={WORKSHOP_PROMPTS} label="Validate dreams against reality" />
          </motion.div>
        </div>
      </section>

      <section id="synthesis" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-amber-300 mb-2 [font-family:var(--font-serif-editorial)] italic">
              Module 2 · Purpose Statement · ~10 min
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Write the sentence
            </h2>
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

      <section id="brand-bridge" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.01]">
            <Image
              src="/images/workshops/ikigai-branding/purpose-to-brand-flow.jpg"
              alt="Four-step flow: Ikigai Statement to Positioning to Audience of One to Content Pillars."
              width={1920}
              height={1080}
              className="w-full h-auto"
            />
          </div>
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

      <section id="content-plan" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-300 mb-2 [font-family:var(--font-serif-editorial)] italic">
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

      <section id="gencreator-stack" className="pb-12 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-sky-300 mb-2 [font-family:var(--font-serif-editorial)] italic">
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
          <div className="mb-6">
            <AuthorityBar citations={MODULE_5_CITATIONS} label="Why this stack now" />
          </div>
          <div className="mb-6">
            <PromptStack module={5} prompts={WORKSHOP_PROMPTS} label="Pick your primary companion" />
          </div>
          <div className="mb-8">
            <AICompanions />
          </div>
          <GenCreatorStack />
        </div>
      </section>

      <section id="ship-artifact" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-amber-300 mb-2 [font-family:var(--font-serif-editorial)] italic">
                Module 6 · Ship the artifact · ~10 min
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                One real post. One 60-second script. Before you leave.
              </h2>
              <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                The whole workshop compresses to this: a real LinkedIn post and a 60-second video script,
                drafted live, stress-tested for slop, finalized. The artifact is the proof.
              </p>
            </div>
            <PromptStack module={6} prompts={WORKSHOP_PROMPTS} label="Ship one artifact now" />
            {LIVE_ARTIFACT_URL && (
              <div className="mt-6">
                <LiveArtifact embedUrl={LIVE_ARTIFACT_URL} />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section id="activation" className="pb-20 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="mb-2">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-300 mb-2 [font-family:var(--font-serif-editorial)] italic">
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
        </div>
      </section>

      <section id="brand-launch-kit" className="pb-24 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-300 mb-2 [font-family:var(--font-serif-editorial)] italic">
                Module 8 · Brand Launch Kit · ~15 min
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                Three visuals you walk out with
              </h2>
              <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed [font-family:var(--font-serif-editorial)] italic">
                Three prompts that generate image-gen prompts &mdash; for Nano Banana 2, GPT-Image-2, or Sora.
                A wallpaper that reminds you daily. A calendar poster that holds you accountable.
                A scribbled-mission photo that becomes your brand-launch asset across six surfaces.
              </p>
            </div>
            <PromptStack module={8} prompts={WORKSHOP_PROMPTS} label="Generate your visual kit" />
            <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 text-sm text-zinc-400 leading-relaxed">
              <p className="text-white font-medium mb-1.5">How these prompts work</p>
              <p>
                Each prompt asks your AI to write a <span className="text-zinc-200">prompt string</span> you
                paste into an image-gen tool. The chain is: <span className="text-violet-200">your AI writes the prompt</span> &rarr; <span className="text-amber-200">you paste it into NB2 / GPT-Image-2 / Sora / Midjourney</span> &rarr; <span className="text-emerald-200">you generate 4 variants, keep the best</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <PresenterOverlay sectionIds={PRESENTER_SECTIONS} active={presenterActive} />
    </div>
  )
}
