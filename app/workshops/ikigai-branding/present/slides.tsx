import type { ReactNode } from 'react'

/**
 * The Ikigai & Branding workshop deck.
 *
 * Grounded in the canonical workshop (app/workshops/ikigai-branding/page.tsx):
 * the seven-module arc + the core principle — "Never ask the participant to
 * complete the system. Make the assistant complete the system from weak signals."
 *
 * Each slide's body() is rendered by the presenter shell (present/page.tsx),
 * which supplies the eyebrow + title chrome (except for the cover).
 */

export interface Slide {
  id: string
  eyebrow?: string
  title: string
  /** Suggested minutes on this slide — shown in the notes drawer. */
  minutes: number
  speakerNotes: string[]
  body: () => ReactNode
}

const accentV = 'text-violet-300'
const accentA = 'text-amber-300'

function Lead({ children }: { children: ReactNode }) {
  return <p className="text-lg sm:text-xl text-zinc-300 leading-[1.7] max-w-3xl">{children}</p>
}

function Cards({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">{children}</div>
}

function Card({
  k,
  title,
  children,
  accent = 'violet',
}: {
  k: string
  title: string
  children: ReactNode
  accent?: 'violet' | 'amber'
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
      <p
        className={`text-[11px] tracking-[0.2em] uppercase font-medium mb-2 ${
          accent === 'amber' ? accentA : accentV
        }`}
      >
        {k}
      </p>
      <p className="text-base font-semibold text-white mb-1.5">{title}</p>
      <p className="text-sm text-zinc-400 leading-relaxed">{children}</p>
    </div>
  )
}

export const SLIDES: Slide[] = [
  {
    id: 'cover',
    eyebrow: 'Ikigai & Branding · live workshop',
    title: 'Ikigai & Branding',
    minutes: 2,
    speakerNotes: [
      'Welcome. One sentence on who you are: AI Architect at Oracle EMEA, building the same CoE frameworks for individuals.',
      'Frame the promise: leave with an audience map, an angle, a hook bank, a 7-day plan, and a premium visual — all built live with an AI partner.',
      'Set the tone: we build, we do not lecture.',
    ],
    body: () => (
      <div className="max-w-4xl">
        <div className="flex gap-3 mb-8 leading-none font-light text-white/90 select-none" aria-hidden>
          <span className="text-5xl sm:text-7xl">生</span>
          <span className="text-5xl sm:text-7xl">き</span>
          <span className="text-5xl sm:text-7xl">甲</span>
          <span className="text-5xl sm:text-7xl">斐</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight mb-5">
          Ikigai &amp; Branding
        </h1>
        <Lead>
          Find the reason worth waking for — then turn it into a brand an AI partner helps you ship
          every day.
        </Lead>
        <p className="mt-8 text-sm text-zinc-500 font-mono">
          ← → to move · N for notes · F for fullscreen
        </p>
      </div>
    ),
  },
  {
    id: 'the-question',
    eyebrow: 'Why this, why now',
    title: 'Most creators have the talent. Few have the reason.',
    minutes: 3,
    speakerNotes: [
      'The bottleneck is rarely skill — it is clarity. People post without a center.',
      'Ikigai is not a personality quiz; it is a forcing function for a brand that compounds.',
      'Promise: by the end, the AI carries the system so you carry the message.',
    ],
    body: () => (
      <div className="space-y-6">
        <Lead>
          Output without a center reads as noise. The work that compounds comes from a clear answer
          to one question: <span className="text-white">what are you uniquely here to do?</span>
        </Lead>
        <Lead>
          We answer it the Japanese way — at the intersection of four circles — and then we make an
          AI partner hold the whole system for you.
        </Lead>
      </div>
    ),
  },
  {
    id: 'four-circles',
    eyebrow: 'The framework',
    title: 'Ikigai lives where four circles meet.',
    minutes: 5,
    speakerNotes: [
      'Walk each circle. Keep it concrete — ask for one real example per circle from the room.',
      'The center is not a job title; it is a posture you can publish from.',
      'Transition: most frameworks stop here. We go one step further — into branding.',
    ],
    body: () => (
      <Cards>
        <Card k="愛 · Love" title="What you love" accent="violet">
          The themes you return to without being paid — the tabs you keep open.
        </Card>
        <Card k="得意 · Skill" title="What you are good at">
          The thing people already ask you for. Evidence over aspiration.
        </Card>
        <Card k="役割 · Mission" title="What the world needs" accent="amber">
          The problem you would fix even if no one watched.
        </Card>
        <Card k="価値 · Value" title="What you can be paid for">
          Where the first three meet a market. The center is here.
        </Card>
      </Cards>
    ),
  },
  {
    id: 'core-principle',
    eyebrow: 'The principle that runs the whole workshop',
    title: 'Never ask the participant to complete the system.',
    minutes: 4,
    speakerNotes: [
      'This is the spine. Read it aloud. Most AI workshops fail because they hand people a blank prompt.',
      'Our prompts complete the system from weak signals — one messy sentence is enough.',
      'Demo this live in the next section with a deliberately vague input.',
    ],
    body: () => (
      <div className="space-y-6">
        <p className="text-2xl sm:text-3xl font-semibold text-white leading-snug max-w-3xl">
          Make the assistant complete the system{' '}
          <span className={accentV}>from weak signals.</span>
        </p>
        <Lead>
          You should never face a blank page. Give the AI one rough sentence about who you help, and
          it returns the map, the angle, and the next seven days — ready to edit, not to invent.
        </Lead>
      </div>
    ),
  },
  {
    id: 'the-arc',
    eyebrow: 'What we build today',
    title: 'Seven modules. One operating partner.',
    minutes: 3,
    speakerNotes: [
      'Give the map before the territory. People relax when they can see the whole arc.',
      'Each module is one prompt that completes the system from your weak signals.',
      'The Coach prompt carries all seven as a single paste for after the workshop.',
    ],
    body: () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl text-zinc-300">
        {[
          'Audience Problem Map',
          'Content Angle',
          'Hook Bank',
          '7-Day Plan',
          'Publish — Post + 3 Versions',
          'Premium Visual',
          'Proactive Partner',
        ].map((m, i) => (
          <div key={m} className="flex items-center gap-3 border-b border-white/[0.06] py-2">
            <span className="font-mono text-sm text-violet-300/70">{`0${i + 1}`}</span>
            <span className="text-base">{m}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'modules-1-2',
    eyebrow: 'Modules 1–2 · Clarity',
    title: 'Map the audience, then find the angle.',
    minutes: 6,
    speakerNotes: [
      'Module 1: the AI infers the audience’s real problem from a one-line description of who you help.',
      'Module 2: it converts that problem into an angle only you can own — tied to your ikigai center.',
      'Run both live. Use a volunteer’s rough input.',
    ],
    body: () => (
      <Cards>
        <Card k="Module 1" title="Audience Problem Map" accent="violet">
          One line about who you help → the unspoken problem, the stakes, and the words they use.
        </Card>
        <Card k="Module 2" title="Content Angle" accent="violet">
          The problem map → a positioning angle anchored to your ikigai center, not a generic niche.
        </Card>
      </Cards>
    ),
  },
  {
    id: 'modules-3-4',
    eyebrow: 'Modules 3–4 · Momentum',
    title: 'Build the hook bank and the seven-day plan.',
    minutes: 6,
    speakerNotes: [
      'Module 3: a bank of hooks in your voice — visual, audio, and text openers, not clickbait.',
      'Module 4: a concrete 7-day publishing plan so momentum survives the room.',
      'Kamiya: ikigai is felt in daily, lived action — the plan is where it becomes real.',
    ],
    body: () => (
      <Cards>
        <Card k="Module 3" title="Hook Bank" accent="amber">
          The angle → a stack of openers in your voice. Tri-modal: what they see, hear, and read.
        </Card>
        <Card k="Module 4" title="7-Day Plan" accent="amber">
          The hooks → a day-by-day plan. Small, shippable, repeatable. Momentum over heroics.
        </Card>
      </Cards>
    ),
  },
  {
    id: 'modules-5-7',
    eyebrow: 'Modules 5–7 · Ship',
    title: 'Publish, dress it premium, keep a partner.',
    minutes: 7,
    speakerNotes: [
      'Module 5: one post plus three platform versions — the publish prompt does the adaptation.',
      'Module 6: a premium visual via the generation stack — cinema, not stock.',
      'Module 7: the proactive partner that keeps completing the system after today.',
    ],
    body: () => (
      <Cards>
        <Card k="Module 5" title="Publish — Post + 3 Versions" accent="amber">
          One idea → a finished post and three platform-native rewrites in your voice.
        </Card>
        <Card k="Module 6" title="Premium Visual" accent="violet">
          The post → a premium hero image. Composed, on-brand, never generated-and-prayed.
        </Card>
        <Card k="Module 7" title="Proactive Partner" accent="violet">
          The whole arc → an assistant that keeps completing the system from weak signals.
        </Card>
      </Cards>
    ),
  },
  {
    id: 'gencreator-stack',
    eyebrow: 'The engine underneath',
    title: 'One operator. An army of agents.',
    minutes: 4,
    speakerNotes: [
      'This is the GenCreator stack — the same CoE architecture used at enterprise scale, at 1/5000th the cost.',
      'You direct; the agents draft, dress, and distribute.',
      'The brand is the registry of taste, not any single tool.',
    ],
    body: () => (
      <div className="space-y-5">
        <Lead>
          Behind the seven modules sits one idea: you are the architect, and a system of agents does
          the drafting, the dressing, and the distribution.
        </Lead>
        <div className="flex flex-wrap gap-2">
          {['Strategy', 'Voice', 'Hooks', 'Visuals', 'Publishing', 'Learning'].map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-zinc-300"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'the-artifact',
    eyebrow: 'What you leave with',
    title: 'Not notes. A working system.',
    minutes: 3,
    speakerNotes: [
      'Make the takeaway tangible: map + angle + hook bank + 7-day plan + one premium visual + the Coach prompt.',
      'It runs after you walk out — that is the whole point.',
      'Invite them to open the Coach prompt now.',
    ],
    body: () => (
      <ul className="space-y-3 text-lg text-zinc-300 max-w-2xl">
        {[
          'An audience problem map in their own words',
          'A positioning angle only you can own',
          'A hook bank in your voice',
          'A concrete 7-day publishing plan',
          'One premium, on-brand visual',
          'The Coach prompt — the whole arc as one paste',
        ].map((x) => (
          <li key={x} className="flex items-start gap-3">
            <span className={`mt-1 ${accentA}`} aria-hidden>
              ▸
            </span>
            {x}
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: 'kanji-close',
    eyebrow: 'The four marks we leave on',
    title: 'Depth. Form. Essence. Practice.',
    minutes: 2,
    speakerNotes: [
      '究 depth, 型 form, 本 essence, 塾 practice — the discipline behind the brand.',
      'Ikigai is felt in the doing. The system makes the doing daily.',
      'Hand to the CTA.',
    ],
    body: () => (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
        {[
          { k: '究', r: 'kyū', m: 'depth' },
          { k: '型', r: 'kata', m: 'form' },
          { k: '本', r: 'hon', m: 'essence' },
          { k: '塾', r: 'juku', m: 'practice' },
        ].map((c) => (
          <div
            key={c.k}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 text-center"
          >
            <div className="text-4xl sm:text-5xl text-white/90 font-light mb-3">{c.k}</div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">{c.r}</p>
            <p className="text-sm text-zinc-300 mt-1">{c.m}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'cta',
    eyebrow: 'Keep building',
    title: 'Take the system home.',
    minutes: 2,
    speakerNotes: [
      'Point to the workshop page for the full prompt stack and the Coach prompt.',
      'Offer the next step: the newsletter / inner circle for the ongoing CoE.',
      'Close on the promise: a reason worth waking for, shipped daily.',
    ],
    body: () => (
      <div className="space-y-6 max-w-2xl">
        <Lead>
          Every prompt from today lives on the workshop page. Open the Coach prompt, paste your one
          rough sentence, and let the system complete the rest.
        </Lead>
        <p className="text-base text-zinc-400">
          frankx.ai/workshops/ikigai-branding
        </p>
      </div>
    ),
  },
]
