'use client'

import Image from 'next/image'
import {
  Compass,
  Target,
  UserCircle,
  Layers3,
  TrendingUp,
  Calendar,
  Wand2,
  Send,
  Brain,
  Mic,
  BarChart3,
  Play,
  Rocket,
  Mail,
  Sparkles,
  Award,
} from 'lucide-react'
import { FRANK_CREDENTIALS, MODULE_4_CITATIONS, MODULE_5_CITATIONS } from '@/lib/workshop-citations'

export interface SlideDef {
  id: string
  eyebrow: string
  title: string
  module?: string
  minutes: number
  color: 'violet' | 'amber' | 'emerald' | 'sky' | 'rose'
  speakerNotes: string[]
  body: () => React.ReactNode
}

/**
 * The Ikigai & Branding workshop deck — 15 slides covering a 75-min flow.
 * Shared by /present (audience) and /present/speaker (Frank's view).
 */
export const SLIDES: SlideDef[] = [
  // ─── 0. Cover ─────────────────────────────────────────────────────
  {
    id: 'cover',
    eyebrow: 'A 75-minute workshop',
    title: 'Ikigai & Branding',
    minutes: 1,
    color: 'violet',
    speakerNotes: [
      'Hold the cover for 10 seconds before speaking. Let the room settle.',
      'Open: "By the end of the next 75 minutes you will have a purpose statement, a brand positioning, and a 30-day plan. Not a feeling. An artifact."',
      'Phones face-down for the wizard sections. The output is yours, not theirs.',
    ],
    body: () => (
      <div className="text-center space-y-10 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/[0.06] text-[10px] font-medium text-violet-300 uppercase tracking-[0.18em]">
          <Compass className="w-3 h-3" />
          A 75-minute workshop
        </div>
        <div className="space-y-2">
          <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.95]"
              style={{ fontFamily: '"Source Serif 4", "Source Serif Pro", Georgia, serif' }}>
            <span className="text-white">Ikigai </span>
            <span className="text-zinc-600 font-light">&amp;</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-amber-300 to-violet-300">
              Branding
            </span>
          </h1>
        </div>
        <p className="text-xl sm:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
          Find what makes time disappear. Translate it into a brand the world remembers.
          Ship the plan before you leave the room.
        </p>
        <div className="pt-12 text-sm text-zinc-500 tracking-wide flex items-center justify-center gap-3">
          <span className="text-zinc-300 font-medium">Frank Riemer</span>
          <span className="text-zinc-700">·</span>
          <span>{FRANK_CREDENTIALS.role}, {FRANK_CREDENTIALS.org}</span>
          <span className="text-zinc-700">·</span>
          <span className="text-zinc-500">frankx.ai</span>
        </div>
      </div>
    ),
  },

  // ─── 1. Why listen ────────────────────────────────────────────────
  {
    id: 'why-listen',
    eyebrow: 'Why this room. Why this hour.',
    title: 'You did not come here for inspiration.',
    minutes: 4,
    color: 'amber',
    speakerNotes: [
      'Drop the "Why listen" framing into the room. "You did not come here for inspiration. You came for output."',
      'Credentialing: I build CoE frameworks for F500 at Oracle EMEA. Same patterns, open-sourced, run my own creator stack.',
      'Promise: 3 artifacts in your hands by minute 75. Statement, plan, stack.',
    ],
    body: () => (
      <div className="grid lg:grid-cols-5 gap-8 items-start max-w-6xl mx-auto">
        {/* Left: positioning */}
        <div className="lg:col-span-3 space-y-6">
          <p className="text-2xl sm:text-3xl text-zinc-200 leading-snug font-light">
            You came here for an artifact in your hand by minute seventy-five.
            Three of them, actually.
          </p>
          <div className="space-y-3">
            {[
              { num: '01', title: 'A purpose statement', sub: 'Two lines. Fits on a business card.' },
              { num: '02', title: 'A 30-day publishing plan', sub: 'Generated from your pillars, ready to ship Monday.' },
              { num: '03', title: 'A GenCreator stack', sub: 'Five tools, opinionated, on by Friday.' },
            ].map((p) => (
              <div key={p.num} className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="text-2xl font-bold text-violet-300/60 tabular-nums font-mono">{p.num}</div>
                <div>
                  <p className="text-base font-semibold text-white">{p.title}</p>
                  <p className="text-sm text-zinc-400">{p.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: credential card */}
        <div className="lg:col-span-2 rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.06] to-amber-500/[0.04] p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-300" />
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-amber-300">
              Why this person facilitates
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold text-white leading-tight">{FRANK_CREDENTIALS.role}</p>
            <p className="text-sm text-zinc-400">{FRANK_CREDENTIALS.org}</p>
          </div>
          <ul className="space-y-2 pt-2 border-t border-white/[0.06]">
            {FRANK_CREDENTIALS.proofPoints.map((p, i) => (
              <li key={i} className="text-xs text-zinc-400 flex items-start gap-1.5 leading-relaxed">
                <span className="text-violet-300 mt-0.5">·</span>
                <span>{p}</span>
              </li>
            ))}
            <li className="text-xs text-zinc-400 flex items-start gap-1.5 leading-relaxed">
              <span className="text-violet-300 mt-0.5">·</span>
              <span>{FRANK_CREDENTIALS.catalog}</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },

  // ─── 2. Outcomes ──────────────────────────────────────────────────
  {
    id: 'outcomes',
    eyebrow: 'The promise',
    title: 'What you walk out with',
    minutes: 3,
    color: 'amber',
    speakerNotes: [
      'Read the four bullets aloud. Pause after each.',
      'Frame: "If you write all four down today, the next 30 days plan themselves."',
    ],
    body: () => (
      <div className="grid sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {[
          { title: 'A purpose statement', sub: 'Two lines. Fits on a business card.', icon: Compass },
          { title: 'A brand positioning', sub: 'Positioning sentence + audience-of-one + 3 content pillars.', icon: Target },
          { title: 'A 30-day content plan', sub: 'Calendar generated from your pillars. Notion + Sheet + CSV.', icon: Calendar },
          { title: 'The GenCreator Stack', sub: 'Five tools across Capture · Think · Make · Ship · Measure.', icon: Wand2 },
        ].map((o) => {
          const Icon = o.icon
          return (
            <div key={o.title} className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-violet-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{o.title}</h3>
                <p className="text-sm text-zinc-400">{o.sub}</p>
              </div>
            </div>
          )
        })}
      </div>
    ),
  },

  // ─── 3. The 3Cs ───────────────────────────────────────────────────
  {
    id: '3cs',
    eyebrow: 'Framework',
    title: 'The 3Cs — Skills that compound with AI',
    minutes: 6,
    color: 'sky',
    speakerNotes: [
      'Ikigai = WHAT to build. 3Cs = HOW to build it without getting automated around.',
      'Collaboration = pair with AI (PAIR · PACE). Communication = make outputs land (BLUF · SCQA). Creation = ship small.',
    ],
    body: () => (
      <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {[
          { title: 'Collaboration', items: ['PACE: Plan → Act → Check → Evolve', 'PAIR with AI: Plan · Ask · Iterate · Review', 'Iteration speed + decision clarity'] },
          { title: 'Communication', items: ['BLUF and SCQA frameworks', 'Design docs + demo scripts', 'Clear, reproducible outputs'] },
          { title: 'Creation', items: ['Goldilocks scope', 'Build → measure → learn', "Ship small. Show, don't tell."] },
        ].map((c) => (
          <div key={c.title} className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6">
            <h3 className="text-xl font-semibold text-white mb-4">{c.title}</h3>
            <ul className="space-y-3">
              {c.items.map((i, idx) => (
                <li key={idx} className="text-sm text-zinc-400 flex items-start gap-2 leading-relaxed">
                  <span className="text-zinc-600">—</span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
  },

  // ─── 4. Module 1 intro ───────────────────────────────────────────
  {
    id: 'module-1-intro',
    eyebrow: 'Module 1 · 15 min',
    title: 'Map your four circles',
    module: 'Module 1',
    minutes: 3,
    color: 'violet',
    speakerNotes: [
      'Four circles: love · good · needs · pays.',
      "External evidence beats internal guessing. Other people's words, not yours.",
    ],
    body: () => (
      <div className="relative max-w-3xl mx-auto">
        <Image
          src="/images/workshops/ikigai-branding/ikigai-venn.jpg"
          alt="Ikigai Venn diagram"
          width={1920}
          height={960}
          priority
          className="w-full h-auto rounded-3xl border border-white/[0.06]"
        />
      </div>
    ),
  },

  // ─── 5. Module 1 deep ────────────────────────────────────────────
  {
    id: 'module-1-deep',
    eyebrow: 'Module 1',
    title: 'Four questions. Specific answers.',
    module: 'Module 1',
    minutes: 12,
    color: 'violet',
    speakerNotes: [
      'Run the wizard live. 3 min per circle. Use Coach GPT deep-links if a participant stalls.',
      'Push past generic. "Specificity beats volume."',
    ],
    body: () => (
      <div className="grid sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {[
          { label: 'What I love', q: 'What activities make time disappear for you?', hint: 'Name specific moments from the last 12 months.' },
          { label: "What I'm good at", q: 'What do people keep thanking you for?', hint: "External evidence only. Other people's words." },
          { label: 'What the world needs', q: 'Whose problem do you care about for ten years?', hint: 'The narrower the "who", the stronger the answer.' },
          { label: 'What pays', q: 'What are people already paying for in this space?', hint: 'Real invoices. Real courses. Follow the money.' },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-violet-300 mb-2">{c.label}</p>
            <p className="text-lg font-semibold text-white mb-2 leading-snug">{c.q}</p>
            <p className="text-xs text-zinc-500">{c.hint}</p>
          </div>
        ))}
      </div>
    ),
  },

  // ─── 6. Module 2 ─────────────────────────────────────────────────
  {
    id: 'module-2',
    eyebrow: 'Module 2 · 10 min',
    title: 'Write the sentence',
    module: 'Module 2',
    minutes: 10,
    color: 'amber',
    speakerNotes: [
      'Two to three lines. Fits on a business card.',
      'Quality test: if a competitor could say the same sentence verbatim, sharpen it.',
    ],
    body: () => (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.06] to-violet-500/[0.04] p-8">
          <p className="text-xs font-medium uppercase tracking-wider text-amber-400 mb-3">The template</p>
          <p className="text-2xl sm:text-3xl text-white leading-relaxed font-medium tracking-tight">
            I help <span className="text-amber-300">[who]</span> achieve <span className="text-emerald-300">[outcome]</span>
            <br />by <span className="text-violet-300">[how]</span>, using <span className="text-sky-300">[skills]</span> in <span className="text-rose-300">[domain]</span>.
          </p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">Worked example</p>
          <p className="text-base text-zinc-300 leading-relaxed italic">
            "I help early-career analysts turn messy spreadsheets into decisions,
            by pairing them with AI workflows, using ten years of consulting craft, in finance and operations teams."
          </p>
        </div>
      </div>
    ),
  },

  // ─── 7. Module 3 ─────────────────────────────────────────────────
  {
    id: 'module-3',
    eyebrow: 'Module 3 · 10 min',
    title: 'The Brand Bridge',
    module: 'Module 3',
    minutes: 10,
    color: 'amber',
    speakerNotes: [
      'Three exercises. Each anchored to the Module 2 statement.',
      'Audience-of-One is the hardest. Force a single real-feeling name.',
    ],
    body: () => (
      <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {[
          { icon: Target, title: 'Positioning Sentence', sub: 'Force a trade-off. Who you are NOT for.' },
          { icon: UserCircle, title: 'Audience of One', sub: "A single name. A specific situation. This week's problem." },
          { icon: Layers3, title: 'Three Content Pillars', sub: '12 months of posts without repeating.' },
        ].map((b) => {
          const Icon = b.icon
          return (
            <div key={b.title} className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-violet-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{b.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{b.sub}</p>
            </div>
          )
        })}
      </div>
    ),
  },

  // ─── 8. Module 4 — authority ─────────────────────────────────────
  {
    id: 'module-4-authority',
    eyebrow: 'Module 4 · Why this matters',
    title: 'The creator economy crossed the threshold.',
    module: 'Module 4',
    minutes: 2,
    color: 'emerald',
    speakerNotes: [
      'Drop the three stats one at a time. Let them land.',
      'The thesis: this is no longer optional. Either you publish, or your work is invisible.',
    ],
    body: () => (
      <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {MODULE_4_CITATIONS.map((c, i) => (
          <div key={i} className="rounded-3xl border border-amber-500/15 bg-gradient-to-br from-amber-500/[0.04] to-transparent p-6">
            <div className="text-5xl font-bold text-white tracking-tight mb-2 tabular-nums">
              {c.stat}
            </div>
            <p className="text-sm text-zinc-300 leading-snug mb-4">{c.claim}</p>
            <p className="text-[10px] uppercase tracking-wider text-amber-300/70">
              {c.source} · {c.year}
            </p>
          </div>
        ))}
      </div>
    ),
  },

  // ─── 9. Module 4 hooks ───────────────────────────────────────────
  {
    id: 'module-4-hooks',
    eyebrow: 'Module 4 · LinkedIn Top Voice',
    title: 'Five hook formats',
    module: 'Module 4',
    minutes: 5,
    color: 'emerald',
    speakerNotes: [
      'Pattern over creativity. Rotate the five so you never stare at a blank page.',
      'Have them pick ONE format and draft a real hook for their pillar live.',
    ],
    body: () => (
      <div className="grid sm:grid-cols-2 gap-3 text-sm max-w-5xl mx-auto">
        {[
          { name: 'Contrarian Take', pattern: 'Everyone says X. I think the opposite — and here is why.' },
          { name: 'Story Open', pattern: 'Last [time], [vivid moment]. Here is what it taught me.' },
          { name: 'Counter-Wisdom', pattern: 'The advice is X. The advice is wrong for [audience].' },
          { name: 'Numbered Breakdown', pattern: '[N] things I learned about Y after [proof of work].' },
          { name: 'Vulnerable Confession', pattern: 'I used to [bad pattern]. Here is what changed it.' },
        ].map((h) => (
          <div key={h.name} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
            <p className="font-semibold text-white mb-1.5">{h.name}</p>
            <p className="text-zinc-400 italic leading-relaxed text-xs">"{h.pattern}"</p>
          </div>
        ))}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4 flex items-center">
          <p className="text-emerald-200 font-medium text-sm">
            Pick ONE. Draft a hook for your pillar in the next 90 seconds.
          </p>
        </div>
      </div>
    ),
  },

  // ─── 10. 30-day calendar ─────────────────────────────────────────
  {
    id: 'module-4-calendar',
    eyebrow: 'Module 4 · The deliverable',
    title: 'Your 30-day calendar',
    module: 'Module 4',
    minutes: 3,
    color: 'emerald',
    speakerNotes: [
      'Three export formats: Notion · Google Sheet · CSV. They pick what they live in.',
      'Pro tip: 60 min Sunday batch. Schedule with Buffer / Typefully.',
    ],
    body: () => (
      <div className="space-y-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-7 gap-1.5 text-xs">
          {Array.from({ length: 28 }).map((_, i) => {
            const day = i % 7
            const isRest = day === 6
            const archetype = day < 3 ? 'Insight' : day < 5 ? 'Build' : day === 5 ? 'Connect' : 'Rest'
            const colorClass = isRest
              ? 'border-white/[0.04] bg-white/[0.01] text-zinc-700'
              : day < 3
                ? 'border-violet-500/20 bg-violet-500/[0.04] text-violet-200'
                : day < 5
                  ? 'border-amber-500/20 bg-amber-500/[0.04] text-amber-200'
                  : 'border-emerald-500/20 bg-emerald-500/[0.04] text-emerald-200'
            return (
              <div key={i} className={`rounded-lg border p-2 text-center ${colorClass}`}>
                <div className="font-semibold text-[10px]">D{i + 1}</div>
                <div className="text-[9px] mt-0.5 leading-tight">{archetype}</div>
              </div>
            )
          })}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-violet-600 text-white text-sm font-semibold">
            Notion template
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.10] text-zinc-200 text-sm font-medium">
            Google Sheet
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.10] text-zinc-200 text-sm font-medium">
            Download CSV
          </div>
        </div>
      </div>
    ),
  },

  // ─── 11. Module 5 — authority ────────────────────────────────────
  {
    id: 'module-5-authority',
    eyebrow: 'Module 5 · Why this stack',
    title: 'AI is not optional. It is operational.',
    module: 'Module 5',
    minutes: 2,
    color: 'sky',
    speakerNotes: [
      "The three numbers say the same thing: this is normalized infrastructure now, not novelty.",
      'Discipline: pick one tool per job, master it, then expand. Most creators have 30+ subscriptions and use 3.',
    ],
    body: () => (
      <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {MODULE_5_CITATIONS.map((c, i) => (
          <div key={i} className="rounded-3xl border border-sky-500/15 bg-gradient-to-br from-sky-500/[0.04] to-transparent p-6">
            <div className="text-5xl font-bold text-white tracking-tight mb-2 tabular-nums">{c.stat}</div>
            <p className="text-sm text-zinc-300 leading-snug mb-4">{c.claim}</p>
            <p className="text-[10px] uppercase tracking-wider text-sky-300/70">
              {c.source} · {c.year}
            </p>
          </div>
        ))}
      </div>
    ),
  },

  // ─── 12. Module 5 stack ──────────────────────────────────────────
  {
    id: 'module-5-stack',
    eyebrow: 'Module 5 · The GenCreator Stack',
    title: 'Five jobs. One tool per job.',
    module: 'Module 5',
    minutes: 5,
    color: 'sky',
    speakerNotes: [
      'Speed-run the 5 categories. Do not let them ask about every tool.',
      'Discipline: add a tool only when an existing tool fails you twice.',
    ],
    body: () => (
      <div className="grid grid-cols-5 gap-3 max-w-5xl mx-auto">
        {[
          { icon: Mic, title: 'Capture', tool: 'Loom' },
          { icon: Brain, title: 'Think', tool: 'Claude · ChatGPT · Gemini' },
          { icon: Wand2, title: 'Make', tool: 'Suno · NB2' },
          { icon: Send, title: 'Ship', tool: 'Buffer · Beehiiv' },
          { icon: BarChart3, title: 'Measure', tool: 'Plausible' },
        ].map((c) => {
          const Icon = c.icon
          return (
            <div key={c.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-zinc-300" />
              </div>
              <p className="text-sm font-semibold text-white mb-1">{c.title}</p>
              <p className="text-xs text-zinc-500">{c.tool}</p>
            </div>
          )
        })}
      </div>
    ),
  },

  // ─── 13. Activation ──────────────────────────────────────────────
  {
    id: 'module-7',
    eyebrow: 'Module 7 · Activation',
    title: '4 visible artifacts in 30 days',
    module: 'Module 7',
    minutes: 4,
    color: 'emerald',
    speakerNotes: [
      'Public commitment increases follow-through 3×.',
      'Have them text the commitment to one person before leaving the room.',
    ],
    body: () => (
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: TrendingUp, title: '1 post', sub: 'Pick one hook format. Ship Monday.' },
            { icon: Play, title: '1 short video', sub: '45–90 seconds. Captions on. Pillar in title.' },
            { icon: UserCircle, title: '1 conversation', sub: 'DM or email to your audience-of-one.' },
            { icon: Rocket, title: '1 small product', sub: 'Template · checklist · mini-guide.' },
          ].map((a) => {
            const Icon = a.icon
            return (
              <div key={a.title} className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-emerald-300" />
                </div>
                <p className="text-base font-semibold text-white mb-1">{a.title}</p>
                <p className="text-xs text-zinc-400 leading-relaxed">{a.sub}</p>
              </div>
            )
          })}
        </div>
      </div>
    ),
  },

  // ─── 14. Outro ───────────────────────────────────────────────────
  {
    id: 'outro',
    eyebrow: 'Stay in touch',
    title: 'Three ways to keep going',
    minutes: 3,
    color: 'violet',
    speakerNotes: [
      'Show QR codes. Promise Resource Pack lands in inbox tonight.',
      'Day-7 check-in is the secret weapon.',
    ],
    body: () => (
      <div className="grid sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {[
          { icon: Sparkles, title: 'Coach GPT', sub: 'Walk through everything in chat.', url: 'frankx.ai/go/ikigai-coach' },
          { icon: Mail, title: 'Resource Pack', sub: 'Templates + Day-7 check-in.', url: 'frankx.ai/workshops/ikigai-branding' },
          { icon: Compass, title: 'AI Architect Newsletter', sub: 'Weekly intelligence for makers.', url: 'frankx.ai/newsletter' },
        ].map((c) => {
          const Icon = c.icon
          return (
            <div key={c.title} className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-7 h-7 text-violet-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{c.title}</h3>
              <p className="text-sm text-zinc-400 mb-3">{c.sub}</p>
              <p className="text-xs text-zinc-500 font-mono break-all">{c.url}</p>
            </div>
          )
        })}
      </div>
    ),
  },
]
