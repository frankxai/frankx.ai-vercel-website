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
  AlertTriangle,
  ExternalLink,
} from 'lucide-react'
import {
  FRANK_CREDENTIALS,
  FRANK_RECEIPTS,
  UNSPOKEN_DOUBTS,
  MODULE_4_CITATIONS,
  MODULE_5_CITATIONS,
} from '@/lib/workshop-citations'

export interface SlideDef {
  id: string
  eyebrow: string
  title: string
  module?: string
  minutes: number
  color: 'violet' | 'amber' | 'emerald' | 'sky' | 'rose'
  /**
   * Each entry is one beat of facilitation. Keep tight — these display
   * in the speaker drawer / speaker view. Front-load action cues
   * (PAUSE, RAISE HAND, BRIDGE) so they read as a script, not an essay.
   */
  speakerNotes: string[]
  body: () => React.ReactNode
}

/**
 * The Ikigai & Branding workshop deck — 18 slides covering a 75-min flow.
 * Shared by /present (audience) and /present/speaker (facilitator).
 *
 * Authored for live facilitation: every slide has an energy cue, a
 * pulse-check prompt where useful, a bridge phrase to the next slide,
 * and 1-2 objections the room might raise out loud.
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
      'ENERGY · Hold the cover for 10 seconds in silence. Let the room settle. Eye contact.',
      'OPEN · "By the end of the next 75 minutes you will have a purpose statement, a 30-day plan, and a stack. Not a feeling. An artifact."',
      'RULE · "Phones face-down for the wizard sections. The output is yours, not theirs."',
      'BRIDGE · "Before we start — why this room, why this hour. Three minutes."',
    ],
    body: () => (
      <div className="text-center space-y-6 sm:space-y-10 max-w-5xl mx-auto px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/[0.06] text-[10px] font-medium text-violet-300 uppercase tracking-[0.18em]">
          <Compass className="w-3 h-3" />
          A 75-minute workshop
        </div>
        <div className="space-y-2">
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.95]"
            style={{ fontFamily: '"Source Serif 4", "Source Serif Pro", Georgia, serif' }}
          >
            <span className="text-white">Ikigai </span>
            <span className="text-zinc-600 font-light">&amp;</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-amber-300 to-violet-300">
              Branding
            </span>
          </h1>
        </div>
        <p className="text-base sm:text-xl lg:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
          Find what makes time disappear. Translate it into a brand the world remembers.
          Ship the plan before you leave the room.
        </p>
        <div className="pt-6 sm:pt-12 text-xs sm:text-sm text-zinc-500 tracking-wide flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-zinc-300 font-medium">Frank Riemer</span>
          <span className="text-zinc-700">·</span>
          <span>{FRANK_CREDENTIALS.role}, {FRANK_CREDENTIALS.org}</span>
          <span className="text-zinc-700">·</span>
          <span className="text-zinc-500">frankx.ai</span>
        </div>
      </div>
    ),
  },

  // ─── 1. Why listen — with receipts ───────────────────────────────
  {
    id: 'why-listen',
    eyebrow: 'Why this room. Why this hour.',
    title: 'Three artifacts in your hand. Or you walked in for nothing.',
    minutes: 4,
    color: 'amber',
    speakerNotes: [
      'ENERGY · Direct, warm. Make eye contact with three different people.',
      'OPEN · "You did not come here for inspiration. You came for output."',
      'CREDENTIAL · Read receipts aloud: "I built CoE frameworks for F500 at Oracle. Same patterns, open-sourced. Everything you see on the right ships on the same operating system."',
      'PULSE · "Raise a hand if you have read about ikigai before but never written your statement down." Pause. Expect 70% of hands.',
      'BRIDGE · "Good. Then you already know what is missing. Let us name the doubts in this room before we ignore them."',
    ],
    body: () => (
      <div className="grid lg:grid-cols-5 gap-8 items-start max-w-6xl mx-auto">
        {/* Left: positioning + 3 promises */}
        <div className="lg:col-span-3 space-y-6">
          <p className="text-2xl sm:text-3xl text-zinc-200 leading-snug font-light">
            You came here for an artifact in your hand by minute seventy-five.
            Three of them, actually.
          </p>
          <div className="space-y-3">
            {[
              { num: '01', title: 'A purpose statement', sub: 'Two lines. Fits on a business card.' },
              { num: '02', title: 'A 30-day publishing plan', sub: 'Generated from your pillars. Ships Monday.' },
              { num: '03', title: 'A GenCreator stack', sub: 'Five tools, opinionated, running by Friday.' },
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

        {/* Right: receipts (proof > claims) */}
        <div className="lg:col-span-2 rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.06] to-amber-500/[0.04] p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-300" />
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-amber-300">
              Receipts — not claims
            </p>
          </div>
          <div className="space-y-2.5">
            {FRANK_RECEIPTS.slice(0, 4).map((r, i) => (
              <div key={i} className="text-xs leading-relaxed">
                <p className="text-zinc-200 font-medium flex items-start gap-1.5">
                  <ExternalLink className="w-2.5 h-2.5 text-violet-300 mt-1 flex-shrink-0" />
                  <span>{r.artifact}</span>
                </p>
                <p className="text-zinc-500 pl-4 mt-0.5">{r.signal}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-zinc-600 pt-3 border-t border-white/[0.06] italic">
            All open at frankx.ai. Audit me before you trust me.
          </p>
        </div>
      </div>
    ),
  },

  // ─── 2. The doubts in this room (NEW) ────────────────────────────
  {
    id: 'doubts',
    eyebrow: 'Before we ignore them',
    title: 'The doubts in this room',
    minutes: 3,
    color: 'rose',
    speakerNotes: [
      'ENERGY · Soft. Conspiratorial. "Let us be honest about what you walked in thinking."',
      'READ · Each doubt aloud. Pause after each. Watch for nods.',
      'PULSE · After reading all four: "Show of hands — which one is yours? Hand stays up for one. Two, leave it up." Most people will keep theirs up for two.',
      'OBJECTION HANDLER · If someone names a fifth doubt: validate it ("legitimate concern"), promise to address it ("we will hit that at minute X"), keep moving.',
      'BRIDGE · "Good. Now we know what we are working against. Here is what you walk out with."',
    ],
    body: () => (
      <div className="grid sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {UNSPOKEN_DOUBTS.map((d, i) => (
          <div
            key={i}
            className="rounded-3xl border border-rose-500/15 bg-rose-500/[0.03] p-6 space-y-3"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-rose-400 mt-1 flex-shrink-0" />
              <p className="text-lg font-semibold text-white leading-snug">
                "{d.doubt}"
              </p>
            </div>
            <div className="pl-7 border-l border-rose-500/10 ml-2">
              <p className="text-sm text-zinc-300 leading-relaxed">
                {d.acknowledgment}
              </p>
            </div>
          </div>
        ))}
      </div>
    ),
  },

  // ─── 3. Outcomes ──────────────────────────────────────────────────
  {
    id: 'outcomes',
    eyebrow: 'The promise',
    title: 'What you walk out with',
    minutes: 3,
    color: 'amber',
    speakerNotes: [
      'ENERGY · Concrete. Land each card like a beat.',
      'READ · Read each card title. Skip the sub-text — show, don\'t tell.',
      'PULSE · "Anyone want to add a fifth thing they walk out with? Shout it." Take 1-2 voices then close the window.',
      'BRIDGE · "Time to map. Phones away. Module 1 is fifteen minutes — four circles, three minutes each."',
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

  // ─── 5. Module 1 intro ───────────────────────────────────────────
  {
    id: 'module-1-intro',
    eyebrow: 'Module 1 · 15 min',
    title: 'Map your four circles',
    module: 'Module 1',
    minutes: 3,
    color: 'violet',
    speakerNotes: [
      'ENERGY · Reset the room. Stand. Stretch. "Quick re-energize before we go inside."',
      'KEY LINE · "External evidence beats internal guessing. Other people\'s words, not yours."',
      'CIRCLE LOGIC · love + good = passion. good + paid = profession. Paid + needed = vocation. Loved + needed = mission. All four = ikigai.',
      'PULSE · "Look at the diagram. Which TWO circles do you currently sit between?" Three voices, fast.',
      'BRIDGE · "Now your turn. Four questions. Three minutes each. Specificity wins."',
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

  // ─── 6. Module 1 deep ────────────────────────────────────────────
  {
    id: 'module-1-deep',
    eyebrow: 'Module 1',
    title: 'Four questions. Specific answers.',
    module: 'Module 1',
    minutes: 12,
    color: 'violet',
    speakerNotes: [
      'ENERGY · Quiet. Working room. Walk between rows.',
      'TIMING · 3 minutes per circle. Watch the timer. Call out at 10 sec remaining.',
      'STUCK CUE · For "what I love": "Name a Tuesday afternoon last month when time disappeared."',
      'STUCK CUE · For "what I am good at": "What is the last DM or email where someone thanked you?"',
      'STUCK CUE · For "what world needs": "Whose problem still annoys you, six months after you noticed it?"',
      'PAIRED EXERCISE · After all four: "Turn to your neighbor. Read out ONE circle. Listen, do not advise." 90 seconds each.',
      'OBJECTION · "What if I love multiple things?" → "Pick the one with the most external evidence. The others are hobbies."',
      'BRIDGE · "We have inputs. Now we forge a sentence."',
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

  // ─── 7. Module 2 ─────────────────────────────────────────────────
  {
    id: 'module-2',
    eyebrow: 'Module 2 · 10 min',
    title: 'Write the sentence',
    module: 'Module 2',
    minutes: 10,
    color: 'amber',
    speakerNotes: [
      'ENERGY · Patient. This is the hardest module emotionally — committing in writing.',
      'KEY LINE · "Two to three lines. Fits on a business card. If a competitor could say the same sentence verbatim, sharpen it."',
      'TRAP · "Bad sentences sound profound. Good sentences are boring and specific." Read worked example.',
      'PAIRED · "Trade sentences with your neighbor. Their job: find one word that could be tighter. Yours: receive without defending."',
      'OBJECTION · "Mine sounds like everyone else\'s" → "Then it is. Cut the abstract noun. Replace with the specific person."',
      'BRIDGE · "Statement complete. Now we bridge it to a brand that does work in the world."',
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
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-300 mb-2">Good — specific</p>
            <p className="text-sm text-zinc-200 leading-relaxed italic">
              "I help early-career analysts turn messy spreadsheets into decisions,
              by pairing them with AI workflows, using ten years of consulting craft."
            </p>
          </div>
          <div className="rounded-2xl border border-rose-500/15 bg-rose-500/[0.03] p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-rose-400 mb-2">Bad — abstract</p>
            <p className="text-sm text-zinc-400 leading-relaxed italic">
              "I help professionals achieve their potential through innovative,
              human-centered strategies that drive transformation."
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // ─── 8. Module 3 ─────────────────────────────────────────────────
  {
    id: 'module-3',
    eyebrow: 'Module 3 · 10 min',
    title: 'The Brand Bridge',
    module: 'Module 3',
    minutes: 10,
    color: 'amber',
    speakerNotes: [
      'ENERGY · Quick. Three cards. No deep dive — they have Coach GPT for that.',
      'KEY LINE · "Three exercises. Each anchored to the Module 2 statement. Audience-of-One is the hardest."',
      'AUDIENCE-OF-ONE · "Force a single real-feeling person. Name. Job. The problem they had this Tuesday."',
      'PILLAR TEST · "Each pillar must survive 12 months of weekly posts without repeating. If you cannot name 5 example posts off the top of your head, sharpen the pillar."',
      'OBJECTION · "I serve many audiences" → "Then you cannot. Pick the one most underserved. The rest are spillover."',
      'BRIDGE · "Positioning, audience, pillars. Now the operating plan that turns these into shipped artifacts."',
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

  // ─── 9. Module 4 — authority ─────────────────────────────────────
  {
    id: 'module-4-authority',
    eyebrow: 'Module 4 · Why this matters',
    title: 'The creator economy crossed the threshold.',
    module: 'Module 4',
    minutes: 2,
    color: 'emerald',
    speakerNotes: [
      'ENERGY · Drop each stat with a beat between. Let them land.',
      'KEY LINE · "This is no longer optional. Either you publish, or your work is invisible."',
      'NUANCE · Avoid bro-marketing tone. "Publishing is not self-promotion. It is documenting craft so the right people find you."',
      'BRIDGE · "OK. So what do you actually post? Five formats. Steal them."',
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

  // ─── 10. Module 4 hooks ──────────────────────────────────────────
  {
    id: 'module-4-hooks',
    eyebrow: 'Module 4 · LinkedIn Top Voice',
    title: 'Five hook formats',
    module: 'Module 4',
    minutes: 5,
    color: 'emerald',
    speakerNotes: [
      'ENERGY · Quick read-aloud. One pattern, one example each.',
      'KEY LINE · "Pattern over creativity. Rotate the five so you never stare at a blank page."',
      'NOW-YOU · "Pick ONE format. Open your notes app. Draft a hook for your pillar in the next 90 seconds. Go." Set 90-sec timer.',
      'PULSE · After timer: "Anyone willing to read theirs? Just the hook, no preamble." Take 1-2.',
      'BRIDGE · "Five hooks rotated weekly = blank page never happens. Now the rhythm that keeps you sane."',
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
            90-second drill: pick one. Draft a hook for your pillar. Now.
          </p>
        </div>
      </div>
    ),
  },

  // ─── 11. Your Monday post (NEW — Monday first) ──────────────────
  {
    id: 'monday-post',
    eyebrow: 'Module 4 · Start small',
    title: 'Your Monday post — broken down',
    module: 'Module 4',
    minutes: 3,
    color: 'emerald',
    speakerNotes: [
      'ENERGY · Lean in. This is the relief slide — we zoom from 30 days to ONE post.',
      'KEY LINE · "Before we show you 30 days, here is ONE post. Same anatomy. Repeat 12 times."',
      'POINT TO PARTS · "Hook from format library. Body proves you did the work. Close invites response."',
      'OBJECTION · "But I have nothing to say" → "You just wrote your purpose statement and three pillars. Pick one pillar. Write one sentence about a real moment from last week. Done."',
      'BRIDGE · "One post. Then the rhythm. Then the calendar."',
    ],
    body: () => (
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.06] to-transparent p-7">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-emerald-300 mb-4">
            Anatomy of one post
          </p>
          <div className="space-y-4">
            <div className="border-l-2 border-violet-400/60 pl-4">
              <p className="text-[10px] uppercase tracking-wider text-violet-300 mb-1">Hook · 1 line</p>
              <p className="text-base text-white leading-relaxed">
                "Most analysts try to fix the spreadsheet. The fix is upstream."
              </p>
            </div>
            <div className="border-l-2 border-amber-400/60 pl-4">
              <p className="text-[10px] uppercase tracking-wider text-amber-300 mb-1">Body · 3-5 lines</p>
              <p className="text-sm text-zinc-300 leading-relaxed">
                "Last Tuesday a client paid me to delete 200 rows. Their analyst had been
                <br />maintaining a dataset that nobody read. We killed the dataset, freed her
                <br />Wednesday afternoon, and she shipped a real decision instead."
              </p>
            </div>
            <div className="border-l-2 border-emerald-400/60 pl-4">
              <p className="text-[10px] uppercase tracking-wider text-emerald-300 mb-1">Close · 1 line</p>
              <p className="text-sm text-zinc-300 leading-relaxed">
                "What is the dataset you maintain that nobody reads?"
              </p>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-zinc-500">
          One hook · one moment · one question. Five minutes to write. Repeat 12 times in 30 days.
        </p>
      </div>
    ),
  },

  // ─── 12. 30-day calendar ─────────────────────────────────────────
  {
    id: 'module-4-calendar',
    eyebrow: 'Module 4 · Now zoom out',
    title: 'Your 30-day calendar',
    module: 'Module 4',
    minutes: 3,
    color: 'emerald',
    speakerNotes: [
      'ENERGY · Visual. Sweep across the calendar. "Same Monday post, twelve times."',
      'RHYTHM · "3 Insight, 2 Build-in-Public, 1 Connection, 1 Rest. Each color = one archetype."',
      'EXPORT · "Three formats. You pick where you live. Notion, Sheet, or CSV."',
      'OBJECTION · "I cannot post six days a week" → "You can. Each post is 5 minutes. Block 60 min Sunday and batch."',
      'BRIDGE · "Plan done. Now the tools that make it sustainable."',
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

  // ─── 13. Module 5 — authority ────────────────────────────────────
  {
    id: 'module-5-authority',
    eyebrow: 'Module 5 · Why this stack',
    title: 'AI is not optional. It is operational.',
    module: 'Module 5',
    minutes: 2,
    color: 'sky',
    speakerNotes: [
      'ENERGY · Land each number. Beat between.',
      'KEY LINE · "This is normalized infrastructure now. Not novelty."',
      'NUANCE · "The discipline: pick one tool per job, master it, expand later. Most creators have 30+ subscriptions and use 3."',
      'BRIDGE · "Five AI companions. Five jobs. Most overwhelmed audience moment of the workshop. Stay with me."',
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

  // ─── 14. Module 5 stack ──────────────────────────────────────────
  {
    id: 'module-5-stack',
    eyebrow: 'Module 5 · The GenCreator Stack',
    title: 'Five jobs. One tool per job.',
    module: 'Module 5',
    minutes: 5,
    color: 'sky',
    speakerNotes: [
      'ENERGY · Fast. Five categories in 90 seconds. Do not let them ask about every tool.',
      'DISCIPLINE · "Add a tool only when an existing tool fails you twice."',
      'NOW-YOU · "Of these five jobs, which one are you currently weakest at? Mark it. That is your week-one upgrade."',
      'OBJECTION · "I do not have time to learn five tools" → "You will not. Master one job. The other four can wait."',
      'BRIDGE · "Tools chosen. Plan written. Now the final move — public commitment."',
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

  // ─── 15. Activation ──────────────────────────────────────────────
  {
    id: 'module-7',
    eyebrow: 'Module 7 · Activation',
    title: '4 visible artifacts in 30 days',
    module: 'Module 7',
    minutes: 4,
    color: 'emerald',
    speakerNotes: [
      'ENERGY · Direct. Land the stake.',
      'KEY LINE · "Public commitment increases follow-through 3×. So we make it public."',
      'COMMITMENT · "Open your phone. Text the commitment to ONE person right now. Audience-of-One person if you have one. Anyone else otherwise."',
      'TIMER · 90 seconds. Watch.',
      'PULSE · "Show of hands — who hit send?" Acknowledge the room.',
      'BRIDGE · "One thing before we close — the one line to remember if you forget everything else."',
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
        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.04] p-5 text-center">
          <p className="text-sm text-violet-200 font-medium leading-relaxed">
            Open your phone. Text the commitment to one human <span className="text-white">right now</span>.
            <br />Public commitment increases follow-through 3×.
          </p>
        </div>
      </div>
    ),
  },

  // ─── 16. If you remember nothing else (NEW) ──────────────────────
  {
    id: 'remember-this',
    eyebrow: 'Before you leave the room',
    title: 'If you remember nothing else',
    minutes: 2,
    color: 'amber',
    speakerNotes: [
      'ENERGY · Pause 5 seconds before reading. Lower your voice.',
      'READ SLOWLY · "Your purpose is not in your head. It is in the artifacts you ship."',
      'SECOND PAUSE · 5 seconds.',
      'KEY LINE · "Everything else in this room is scaffolding around that sentence."',
      'BRIDGE · "Three ways to keep going. Then we are done."',
    ],
    body: () => (
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300">
          If you remember nothing else, remember this
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
          style={{ fontFamily: '"Source Serif 4", "Source Serif Pro", Georgia, serif' }}
        >
          Your purpose is not in your head.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-amber-300 to-violet-300">
            It is in the artifacts you ship.
          </span>
        </h2>
        <p className="text-base text-zinc-500 italic max-w-2xl mx-auto leading-relaxed">
          Everything else in this room is scaffolding around that sentence.
        </p>
      </div>
    ),
  },

  // ─── 17. Outro ───────────────────────────────────────────────────
  {
    id: 'outro',
    eyebrow: 'Stay in touch',
    title: 'Three ways to keep going',
    minutes: 3,
    color: 'violet',
    speakerNotes: [
      'ENERGY · Generous. Earn the after-room conversation.',
      'QR · Show the three QR codes. Promise: "Resource Pack lands in inbox tonight."',
      'DAY-7 · "The Day-7 check-in is the secret weapon. Most workshops end at minute 75. This one ends at Day 30."',
      'OPEN MIC · "Last question or commitment — anyone want to claim their pillar out loud before we close?" Take 2-3.',
      'CLOSE · "Thank you. Now go ship the Monday post."',
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
