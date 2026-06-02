import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Mic,
  Video,
  Music,
  Utensils,
  Plane,
  MonitorPlay,
  FileText,
  Workflow,
  Clock,
  Sparkles,
} from 'lucide-react'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'How the Studio operates — capture-to-publish flows | FrankX',
  description:
    'Four concrete operator flows. Voice memo on a walk → 5 published pieces. Talking-head capture → multi-platform. Restaurant photo + voice → IG + blog. Music drop → cross-promo. Phone-to-publish in under 2 hours.',
  alternates: { canonical: 'https://frankx.ai/studio/operating' },
  openGraph: {
    title: 'How the Studio operates — capture-to-publish flows',
    description: 'Four concrete operator flows from capture to publish.',
    url: 'https://frankx.ai/studio/operating',
    siteName: 'FrankX',
    type: 'website',
  },
}

const flows = [
  {
    id: 'voice-to-five',
    icon: Mic,
    title: 'Voice memo → five published pieces',
    elapsed: '~70 minutes capture-to-publish',
    color: 'emerald',
    capture: 'Frank walks the dog. Records an 8-minute voice memo on the OnePlus 15R about agent-framework tradeoffs.',
    sync: 'Tap "Drop to FrankX" share. Tasker classifies mime, drops to Syncthing inbox. LAN sync to Windows: ~2s.',
    classify: 'Watcher mime-sorts to ~/_inbox/voice/<date>/. SessionStart hook surfaces pending. /intake-classify dispatches audio-producer.',
    produce: [
      'Transcribe via Whisper (90s)',
      'Detect 3 ideas: framework tradeoffs / personal use case / a-CES anecdote',
      'Identify 90s podcast snippet at 03:42-05:12',
      'Brand-voice gate runs on every text output',
    ],
    outputs: [
      'Blog draft (1500 words on framework comparison)',
      'Podcast snippet (90s extracted audio + script)',
      'LinkedIn carousel outline (framework matrix as 7 slides)',
      'X thread (3 tweets, one per idea)',
      'Newsletter section (200-word distillation)',
    ],
    forcingFn: 'NLDigital workshop in 5 days → bias LinkedIn + newsletter weights upward',
    operator: 'Frank reviews via /admin/inbox. Edits one phrase in the carousel. Approves 4 of 5; defers podcast snippet.',
  },
  {
    id: 'talking-head-multi',
    icon: Video,
    title: 'Talking-head video → multi-platform',
    elapsed: '~3 hours capture-to-publish',
    color: 'cyan',
    capture: 'Frank records a 6-minute talking-head on iPhone (er, OnePlus). Topic: how IIS multi-agent debate catches biases.',
    sync: 'Share to "Drop to FrankX". Mime detects video → routes to talking-head subfolder. Syncthing replicates.',
    classify: 'Classifier reads frame samples + transcribes audio. Tags `talking-head-video`, spectrum=tech, archetype=Builder.',
    produce: [
      'Whisper transcription with timestamps',
      'video-producer (/talking-head-ship) handles long-form composition in Remotion',
      'content-vault-clipper extracts 3 short cuts',
      'visual-intelligence dispatches Higgsfield Soul-ID for B-roll cutaways',
      'hook-engineer writes 3 hook variants per short',
    ],
    outputs: [
      'YouTube long-form (8-minute final cut + thumbnail)',
      '3 YouTube Shorts (captioned, lower-thirds)',
      '3 TikTok variants (re-cut for native syntax)',
      'Paired blog post (long-form companion essay)',
      'LinkedIn announcement post',
    ],
    forcingFn: 'IIS OSS extraction in 4 weeks → cross-link from video description to /intelligence-system + GitHub repo',
    operator: 'Review long-form first. Approve. Cascade approves the 3 Shorts. Schedule blog for publish day.',
  },
  {
    id: 'restaurant-cycle',
    icon: Utensils,
    title: 'Restaurant photo + voice → IG + blog',
    elapsed: '~10 minutes capture-to-publish',
    color: 'amber',
    capture: 'Frank takes a photo at a restaurant in Amsterdam. Records a 30-second voice note about the chef\'s technique.',
    sync: 'Two shares: photo + voice memo. Both land in same 10-min batch window. Watcher groups them.',
    classify: 'Classifier reads both: `photo-food` + `voice-memo` paired. EXIF GPS preserved. Spectrum=soul.',
    produce: [
      'food-producer reads visual: dish, composition, lighting, mood',
      'audio-producer transcribes opinion',
      'Pairs them: caption is sensory-specific (not generic praise)',
      'Generates IG carousel + Threads + travel-blog fragment + Stories frame',
    ],
    outputs: [
      'Instagram carousel (4 frames: hero + 3 detail shots)',
      'Threads post (single, opens conversation)',
      'Travel-blog fragment (auto-appends to "Amsterdam, May 2026" entry)',
      'Stories frame (lo-fi, 2-line overlay)',
    ],
    forcingFn: 'No active function for food today, but maintains soul-spectrum cadence on IG',
    operator: 'Approve all 4. Ship to IG + Threads. Travel-blog entry queued for weekly digest.',
  },
  {
    id: 'music-drop',
    icon: Music,
    title: 'Music track export → cross-promo',
    elapsed: '~45 minutes capture-to-publish',
    color: 'rose',
    capture: 'Friday morning. Frank exports a new Suno track for the weekly album drop. Drops .mp3 into the music subfolder.',
    sync: 'Single file. Syncthing replicates. Watcher mime-sorts to `~/_inbox/music/track/<date>/`.',
    classify: 'Classifier reads metadata + duration. Tags `music-track`. Spectrum=soul. Friday cadence forcing function active.',
    produce: [
      'music-catalog-indexer registers the track',
      'vis-producer dispatches NB2 album cover at 3000×3000',
      'music-video-batch generates a lyric video draft (queued, not immediate)',
      'content-social-distributor writes IG carousel + Spotify-companion post + Threads teaser',
    ],
    outputs: [
      'Album cover (NB2 2K+, soul spectrum)',
      'Lyric video (queued for batch)',
      'Instagram carousel announcement (4 frames)',
      'Spotify-companion post for IG',
      'Threads teaser (conversation-starter)',
      'Catalog index entry (12,001st song)',
    ],
    forcingFn: 'Spotify Friday drop is the forcing function itself — this IS the deadline',
    operator: 'Approve cover after Council 6-step gate. Ship to Distrokid + IG + Threads. Lyric video processes overnight.',
  },
]

export default function StudioOperatingPage() {
  return (
    <main id="main" className="min-h-screen bg-[#0a0a0b] text-white">
      {/* HERO */}
      <section className="px-6 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 mb-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] rounded-full"
          >
            <ArrowRight className="h-4 w-4 rotate-180" aria-hidden />
            Studio
          </Link>
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-6">
            How the Studio operates · 4 concrete flows
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 max-w-4xl">
            Phone capture
            <br />
            <span className="text-emerald-400">to publish.</span>
          </h1>
          <p className="text-[17px] leading-relaxed text-white/80 max-w-2xl mb-10">
            Four real flows. From the moment Frank taps "Drop to FrankX" on the Android share menu
            to the moment a published post lives on a platform. No fiction; this is what the system
            actually does.
          </p>
        </div>
      </section>

      {/* THE 4 FLOWS */}
      <section className="border-t border-white/5 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl space-y-12">
          {flows.map((flow) => {
            const Icon = flow.icon
            return (
              <article
                key={flow.id}
                className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 lg:p-10"
              >
                <header className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-md bg-emerald-500/10 ring-1 ring-emerald-400/30">
                      <Icon className="h-5 w-5 text-emerald-400" aria-hidden />
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-white/40">
                      <Clock className="h-3 w-3" aria-hidden />
                      {flow.elapsed}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
                    {flow.title}
                  </h2>
                </header>

                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Left: capture + sync + classify + produce */}
                  <div className="space-y-6">
                    <FlowStep label="01 — Capture (L0)" body={flow.capture} />
                    <FlowStep label="02 — Sync (L1)" body={flow.sync} />
                    <FlowStep label="03 — Classify (L2)" body={flow.classify} />
                    <div>
                      <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-2">
                        04 — Produce (L4)
                      </p>
                      <ul className="space-y-1.5 text-sm text-white/65 leading-relaxed">
                        {flow.produce.map((step, i) => (
                          <li key={i} className="flex items-baseline gap-2">
                            <span className="text-emerald-400/50">·</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: outputs + forcing fn + operator */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-2">
                        05 — Outputs
                      </p>
                      <ul className="space-y-1.5 text-sm text-white/65 leading-relaxed">
                        {flow.outputs.map((out, i) => (
                          <li key={i} className="flex items-baseline gap-2">
                            <Sparkles className="h-3 w-3 text-emerald-400/70 shrink-0 mt-1" aria-hidden />
                            <span>{out}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <FlowStep label="Forcing function" body={flow.forcingFn} subtle />
                    <FlowStep label="06 — Operator review" body={flow.operator} subtle />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* RHYTHM */}
      <section className="border-t border-white/5 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
            The cadence this enables
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-6">
            Operator-time stays under 2 hours per day.
          </h2>
          <div className="space-y-5 text-[17px] leading-relaxed text-white/80">
            <p>
              Most creator-content operators spend 4-6 hours per day on production: capture +
              editing + writing + posting + analytics. The Studio compresses that to ~90 minutes by
              moving 70%+ of the work to producers that run in parallel, gated only at the human
              review step.
            </p>
            <p>
              The remaining 90 minutes is the part only Frank can do: judgment. Does this caption
              ring true? Does this thumbnail represent the system honestly? Does this newsletter
              section earn the subscribe? Producers ship candidates; Frank ships verdicts.
            </p>
            <p>
              The forcing functions calendar provides the rhythm. Workshop in 5 days bumps LinkedIn
              cadence. Album drop on Friday bumps cover-gen priority. CIS MV1 keeps Bluesky alive
              daily. The system follows your commitments; you do not chase the system.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-4">
            See the producers.
          </h2>
          <p className="text-[17px] leading-relaxed text-white/80 mb-10">
            Each flow above is a composition of L4 producer specialists. Each producer has its own
            deep-dive at <code className="font-mono text-emerald-400/80">/studio/&lt;producer&gt;</code>.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              Producer index
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/studio/calendar"
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 text-sm font-medium text-white/80 ring-1 ring-white/10 hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              Forcing functions calendar
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function FlowStep({ label, body, subtle }: { label: string; body: string; subtle?: boolean }) {
  return (
    <div>
      <p
        className={`text-[11px] tracking-[0.25em] uppercase font-medium mb-2 ${subtle ? 'text-white/40' : 'text-emerald-400/60'}`}
      >
        {label}
      </p>
      <p className={`text-sm leading-relaxed ${subtle ? 'text-white/55' : 'text-white/70'}`}>{body}</p>
    </div>
  )
}
