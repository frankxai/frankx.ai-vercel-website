import Link from 'next/link'
import { ArrowLeft, Book, Music2, Bot, CheckCircle, Palette, Share2, Waves, Star, ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Vibe OS Documentation — AI Music Production System | FrankX.ai',
  description: 'Learn how to use Vibe OS for AI music production. Suno prompt engineering, quality validation, album art creation, and distribution strategy.',
}

export default function VibeOSDocsPage() {
  return (
    <main className="relative min-h-screen bg-void">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.1),transparent_50%)]" />
      </div>

      {/* Header */}
      <div className="relative border-b border-white/10 bg-space/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <Link
            href="/products/vibe-os"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Vibe OS
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative mx-auto max-w-4xl px-6 py-16">
        {/* Hero */}
        <div className="mb-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
            <Book className="h-4 w-4" />
            Documentation
          </div>
          <h1 className="font-display mb-4 text-4xl font-bold text-white sm:text-5xl">
            Vibe OS Documentation
          </h1>
          <p className="text-lg text-white/70">
            Everything you need to produce professional AI music with engineered prompts, quality validation, and a complete distribution pipeline.
          </p>
        </div>

        {/* Quick Start */}
        <div className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="mb-4 text-2xl font-bold text-white">Quick Start</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-bold text-cyan-300">
                1
              </div>
              <div>
                <h3 className="font-semibold text-white">Launch the Music Producer Agent</h3>
                <p className="mt-1 text-sm text-white/60">
                  Go to the <Link href="/products/vibe-os/app" className="text-cyan-400 hover:underline">Vibe OS App</Link> and click &ldquo;Launch Agent&rdquo; on the Music Producer card. Free tier gives you 10 prompts per day.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-300">
                2
              </div>
              <div>
                <h3 className="font-semibold text-white">Describe Your Intent</h3>
                <p className="mt-1 text-sm text-white/60">
                  Tell the agent what you want: the emotion, genre, use case, or cognitive state. Example: &ldquo;I need a deep focus track for coding, minimal techno, 128 BPM.&rdquo;
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm font-bold text-violet-300">
                3
              </div>
              <div>
                <h3 className="font-semibold text-white">Copy the Suno Prompt & Generate</h3>
                <p className="mt-1 text-sm text-white/60">
                  The agent produces a Suno-ready prompt with precise BPM, key, instrumentation, and production notes. Copy it into Suno and generate your track.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-300">
                4
              </div>
              <div>
                <h3 className="font-semibold text-white">Validate & Distribute</h3>
                <p className="mt-1 text-sm text-white/60">
                  Run the track through the 15-point quality rubric. Score 12+ points? Generate album art, then follow the distribution playbook to push to Spotify, Apple Music, and social.
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* Core System Modules */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-white">The 5 Core Modules</h2>
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-cyan-500/20 p-2">
                  <Music2 className="h-5 w-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Module 1: Prompt Engineering Library</h3>
              </div>
              <p className="text-white/70">
                50+ genre-specific, flow-state, and commercial-ready Suno prompts. Each prompt uses a layered instruction architecture: primary layer (musical structure), secondary (psychological impact), tertiary (technical specs), quaternary (platform requirements). Includes flow state optimization prompts with binaural beat integration, cinematic production templates, and social media-optimized commercial formats.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-emerald-500/20 p-2">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Module 2: 15-Point Quality Validation</h3>
              </div>
              <p className="text-white/70">
                Professional rubric across 4 categories: Composition (5pts — melodic coherence, harmonic sophistication, rhythmic consistency, structural flow, genre authenticity), Production (5pts — mix balance, frequency response, dynamic range, stereo imaging, master quality), Flow State (3pts — attention sustainability, energy consistency, cognitive load), and Commercial Viability (2pts — platform optimization, uniqueness factor). Target: 12+ points for release quality.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-violet-500/20 p-2">
                  <Palette className="h-5 w-5 text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Module 3: Album Art & Visual Creation</h3>
              </div>
              <p className="text-white/70">
                AI art generation workflows for Gemini, ChatGPT, and Midjourney. Includes visual style prompts calibrated for album covers, KlingAI animation templates for social media loops (15-second vertical format for Stories/Reels, 30-second landscape for YouTube), and brand-aligned visual identity systems.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-amber-500/20 p-2">
                  <Share2 className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Module 4: Distribution & Monetization</h3>
              </div>
              <p className="text-white/70">
                Platform-specific strategies for Spotify (playlist targeting), Apple Music (editorial opportunities), TikTok (trending sound creation), YouTube Music (SEO optimization), and SoundCloud/Bandcamp. Includes DistroKid integration workflow, licensing pathways (productivity apps, meditation platforms, corporate wellness), and revenue optimization.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-purple-500/20 p-2">
                  <Bot className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Module 5: Music Producer Agent</h3>
              </div>
              <p className="text-white/70">
                AI-powered Suno prompt engineering agent with neuro-state targeting. Transforms your emotional intent into psychoacoustic precision — BPM, key, mode, instrumentation calibrated for specific brain states (Alpha for creativity, Beta for focus, Theta for meditation, Delta for sleep). Powered by multi-LLM intelligence with cost-aware model routing.
              </p>
            </div>
          </div>
        </div>

        {/* AI Agents Reference */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-white">AI Agent Reference</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-5">
              <div className="mb-2 flex items-center gap-2">
                <Music2 className="h-4 w-4 text-purple-400" />
                <h3 className="font-semibold text-white">Music Producer</h3>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-400">Free</span>
              </div>
              <p className="text-sm text-white/60">Suno prompt engineering, neuro-state targeting, genre workflows. 10/day free.</p>
            </div>
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5">
              <div className="mb-2 flex items-center gap-2">
                <Bot className="h-4 w-4 text-cyan-400" />
                <h3 className="font-semibold text-white">Creation Engine</h3>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-400">Free</span>
              </div>
              <p className="text-sm text-white/60">SEO content creation, multi-format output, keyword intelligence. 5/day free.</p>
            </div>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <div className="mb-2 flex items-center gap-2">
                <Waves className="h-4 w-4 text-emerald-400" />
                <h3 className="font-semibold text-white">Frequency Alchemist</h3>
                <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-xs text-cyan-400">Club</span>
              </div>
              <p className="text-sm text-white/60">Binaural beats, brainwave entrainment, therapeutic soundscapes. Vibe Club required.</p>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
              <div className="mb-2 flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-400" />
                <h3 className="font-semibold text-white">Starlight Architect</h3>
                <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-400">Pro</span>
              </div>
              <p className="text-sm text-white/60">Multi-agent orchestration, LLM routing, cost optimization. Pro tier required.</p>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-cyan-500/5 p-8">
          <h2 className="mb-4 text-xl font-semibold text-white">Resources</h2>
          <div className="space-y-4">
            <Link
              href="/products/vibe-os/app"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10"
            >
              <Bot className="h-5 w-5 text-cyan-400" />
              <div className="flex-1">
                <div className="font-semibold text-white">Vibe OS App Dashboard</div>
                <div className="text-sm text-white/60">Launch agents, browse prompts, validate tracks</div>
              </div>
              <ExternalLink className="h-4 w-4 text-white/30" />
            </Link>

            <Link
              href="/blog/vibe-os-platform-introduction"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10"
            >
              <Book className="h-5 w-5 text-emerald-400" />
              <div className="flex-1">
                <div className="font-semibold text-white">Platform Introduction</div>
                <div className="text-sm text-white/60">Full guide to the multi-LLM agent ecosystem</div>
              </div>
              <ExternalLink className="h-4 w-4 text-white/30" />
            </Link>

            <Link
              href="/vibe"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10"
            >
              <Waves className="h-5 w-5 text-violet-400" />
              <div className="flex-1">
                <div className="font-semibold text-white">Vibe OS Ecosystem</div>
                <div className="text-sm text-white/60">Explore the full ecosystem: agents, intelligence layers, platforms</div>
              </div>
              <ExternalLink className="h-4 w-4 text-white/30" />
            </Link>

            <Link
              href="/newsletter"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10"
            >
              <Music2 className="h-5 w-5 text-amber-400" />
              <div className="flex-1">
                <div className="font-semibold text-white">Monthly Vibe Pack Updates</div>
                <div className="text-sm text-white/60">Get 20 curated Suno prompts delivered monthly</div>
              </div>
              <ExternalLink className="h-4 w-4 text-white/30" />
            </Link>
          </div>
        </div>

        {/* Support */}
        <div className="mt-12 text-center">
          <p className="text-sm text-white/50">
            Need help or have questions?{' '}
            <a
              href="mailto:hello@frankx.ai?subject=Vibe%20OS%20Question"
              className="text-cyan-400 underline-offset-4 transition-colors hover:underline"
            >
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
