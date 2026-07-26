// Manifestation / Reality Architect — shared content spine.
//
// One source of truth for the hub (/manifestation), the two book pages
// (/the-secret, /think-and-grow-rich), and the interactive quest
// (/manifestation/quest). Voice: explorer-builder reporting what happened
// and what the mechanism is — not a manifestation coach. Where a claim is
// belief rather than evidence, it is labelled as such.
//
// The honest thesis: imagination + felt emotional state + focused attention
// + a music-driven alignment system (Vibe OS) + generative AI is a practical
// loop for moving an idea from your head into the world faster — and enjoying
// the daily act of making it.

export interface Mechanism {
  id: string
  title: string
  /** Plain-language description of how it actually works. */
  description: string
  /** The named mechanism / where the evidence comes from. */
  evidence: string
  /** lucide icon name, mapped in the page. */
  icon: string
  /** 'evidence' = research-backed, 'practice' = useful framing, 'belief' = metaphysical claim, held lightly. */
  grade: 'evidence' | 'practice' | 'belief'
}

export const mechanisms: Mechanism[] = [
  {
    id: 'imagination',
    title: 'Imagination rehearses reality',
    description:
      'When you vividly picture an outcome and let yourself feel it, your brain fires many of the same circuits it uses for the real thing. Mental rehearsal is not wishful — it is practice. It pre-loads the motor and perceptual patterns you will later run for real.',
    evidence:
      'Motor-imagery research (Pascual-Leone, 1995) showed mental practice produced measurable cortical change comparable to a fraction of physical practice. Used for decades in elite sport.',
    icon: 'Brain',
    grade: 'evidence',
  },
  {
    id: 'attention',
    title: 'Attention filters what you notice',
    description:
      'You cannot consciously process most of what hits your senses. Your brain runs a filter that promotes whatever you have flagged as important. Hold a clear, specific intention and that filter starts surfacing the people, openings, and resources that were always there but invisible.',
    evidence:
      'Selective attention and the reticular activating system: the brain prioritises goal-relevant stimuli. This is the grounded core of "you attract what you focus on" — it is filtering, not magic.',
    icon: 'Filter',
    grade: 'evidence',
  },
  {
    id: 'state',
    title: 'Emotional state changes what you do',
    description:
      'The feeling you carry into a day shapes the actions you take in it. Depleted, you avoid; energised and clear, you reach. This is the lever The Secret gestures at with "vibration" — and where self-made music becomes a real tool, not a metaphor.',
    evidence:
      'Affect and behaviour: valence (mood) and arousal (energy) measurably shift approach behaviour and persistence. Vibe OS engineers these two dials with tempo, mode, and lyric on purpose.',
    icon: 'Music',
    grade: 'evidence',
  },
  {
    id: 'ai',
    title: 'AI externalises the vision instantly',
    description:
      'The old gap between "I can see it clearly" and "it exists" was measured in months. Generative AI collapses it to minutes — an image, a track, a landing page, a working plan. Seeing your imagined thing rendered back at you sharpens the intention and feeds the loop.',
    evidence:
      'Idea-to-artifact time has dropped by orders of magnitude. The limiting factor is no longer capability or capital — it is clarity of what you actually want.',
    icon: 'Sparkles',
    grade: 'practice',
  },
]

export interface IdentityTier {
  id: string
  name: string
  tagline: string
  description: string
  markers: string[]
}

export const identityTiers: IdentityTier[] = [
  {
    id: 'manifestation-master',
    name: 'Manifestation Master',
    tagline: 'You can reliably set a vision and feel it as real.',
    description:
      'A Manifestation Master has a daily practice: get specific about an outcome, rehearse it in imagination until it feels real, hold the state, and keep attention on it long enough that the filter starts working. The inner game is steady.',
    markers: [
      'Writes the vision down with specificity, not vagueness',
      'Runs a daily imagination + feeling session and means it',
      'Uses state on purpose — including self-made music to set it',
      'Notices the openings the filter surfaces, and acts on them',
    ],
  },
  {
    id: 'reality-architect',
    name: 'Reality Architect',
    tagline: 'You turn the felt vision into shipped reality on a loop.',
    description:
      'A Reality Architect adds the build. The inner game feeds a system: vision becomes a spec, the spec becomes something AI helps render, the rendering ships, and the result teaches the next loop. Manifestation stops being a hope and becomes a production line you enjoy running.',
    markers: [
      'Converts a vision into a written spec (definiteness of purpose)',
      'Uses AI to render the vision into a real artifact, fast',
      'Ships something small and watches what comes back',
      'Compounds — each loop makes the next one sharper',
    ],
  },
]

export interface Experiment {
  id: string
  title: string
  /** What you are actually testing. */
  hypothesis: string
  /** Ordered steps to run it. */
  protocol: string[]
  /** How you will know if it did anything — keep it observable. */
  measure: string
  /** Rough commitment. */
  duration: string
  tag: 'imagination' | 'attention' | 'state' | 'ai' | 'system'
}

export const experiments: Experiment[] = [
  {
    id: 'vivid-rehearsal',
    title: 'The 10-minute vivid rehearsal',
    hypothesis:
      'Rehearsing one specific outcome in full sensory detail each morning makes me act differently toward it during the day.',
    protocol: [
      'Pick one concrete outcome you want in the next 90 days. Write it in one sentence.',
      'Each morning, sit for 10 minutes and run it like a film — see it, hear it, feel the moment it lands.',
      'Before you open your eyes, name one action today that moves toward it.',
      'Do that action before noon.',
    ],
    measure:
      'Count the days you took the named action. At day 14, compare against a typical fortnight. Did follow-through go up?',
    duration: '14 days · 10 min/day',
    tag: 'imagination',
  },
  {
    id: 'intention-filter',
    title: 'The attention-filter test',
    hypothesis:
      'Writing a specific intention primes me to notice opportunities I would otherwise miss.',
    protocol: [
      'Write one specific thing you are looking for (a collaborator, a tool, a kind of conversation).',
      'Read it once each morning. Do not actively hunt for it.',
      'Keep a one-line log each evening: did anything related surface today?',
    ],
    measure:
      'At day 10, read your log. Count the relevant things that "showed up." Most people are surprised — that is the filter, not luck.',
    duration: '10 days · 2 min/day',
    tag: 'attention',
  },
  {
    id: 'state-soundtrack',
    title: 'Score your goal-state',
    hypothesis:
      'A track built for the exact state I need to work from improves the quality and ease of that work.',
    protocol: [
      'Name the state your goal needs from you (focused calm, bold energy, steady confidence).',
      'Generate a track for it — use the Vibe OS state library to set tempo, mode, and lyric.',
      'Play it at the start of each work block on that goal for a week.',
      'Rate each session 1–5 for ease and focus.',
    ],
    measure:
      'Average your ratings across the week vs. your usual. A full point of lift is meaningful.',
    duration: '7 days · per work block',
    tag: 'state',
  },
  {
    id: 'render-the-vision',
    title: 'Render the vision in one sitting',
    hypothesis:
      'Seeing my imagined thing rendered by AI sharpens the vision and makes me more likely to build the real one.',
    protocol: [
      'Take the outcome you have been rehearsing. Describe it to an image or music model in detail.',
      'Generate it. Sit with what comes back — what is right, what is off?',
      'Refine the prompt until the artifact matches the feeling. Keep the best one where you will see it.',
      'Write the first real-world step the artifact makes obvious.',
    ],
    measure:
      'Did the rendered version change or sharpen your vision? Did you take the real step within 48 hours?',
    duration: '1 sitting · ~45 min',
    tag: 'ai',
  },
  {
    id: 'one-loop',
    title: 'Run one full Reality Architect loop',
    hypothesis:
      'Turning a vision into a spec → an AI-rendered artifact → a shipped thing → a lesson is a repeatable way to make ideas real.',
    protocol: [
      'See: write the vision as a one-paragraph spec — what it is, who it is for, what "done" looks like.',
      'Build: use AI to render a first version (a page, a track, a draft, a prototype).',
      'Ship: put it in front of one real person or publish it small.',
      'Learn: write the one thing the response taught you. Feed it into the next loop.',
    ],
    measure:
      'You completed a loop if something real exists that did not before, and you can name the lesson. Ship beats perfect.',
    duration: '1 week · one cycle',
    tag: 'system',
  },
]

export interface Exercise {
  id: string
  title: string
  description: string
  steps: string[]
  duration: string
  icon: string
}

export const exercises: Exercise[] = [
  {
    id: 'morning-vision',
    title: 'Morning vision session',
    description:
      'The daily reps. Specific outcome, felt in detail, before the day pulls you anywhere.',
    steps: [
      'One sentence: the outcome, stated as if it is already true.',
      'Ten minutes: run it as a film with full sensory detail and let the feeling rise.',
      'Land on one action for today and commit to the hour you will do it.',
    ],
    duration: '10 min',
    icon: 'Sunrise',
  },
  {
    id: 'scripting',
    title: 'Scripting the future memory',
    description:
      'Write a day in your future in past tense, as if it already happened. Specificity is the point.',
    steps: [
      'Date a page three to six months out.',
      'Write that day in past tense — what you did, who was there, how it felt.',
      'Name the two or three real things that had to be true for that day to exist.',
    ],
    duration: '15 min',
    icon: 'PenLine',
  },
  {
    id: 'vibe-align',
    title: 'Vibe alignment',
    description:
      'Set state on purpose. Build the soundtrack for the person you have to be to do the work.',
    steps: [
      'Name the state the work needs (focused calm, bold energy, steady confidence).',
      'Pick the Vibe OS dials: tempo for energy, mode for mood, lyric for the message.',
      'Generate the track, then start your work block inside it.',
    ],
    duration: '10 min + work block',
    icon: 'Music',
  },
  {
    id: 'render-it',
    title: 'Render it with AI',
    description:
      'Externalise the vision. Make the thing in your head visible so you can sharpen it.',
    steps: [
      'Describe the imagined outcome to an image, music, or text model in full detail.',
      'Generate, compare against the feeling, refine the prompt, repeat.',
      'Keep the closest version where you will see it daily.',
    ],
    duration: '30 min',
    icon: 'Sparkles',
  },
  {
    id: 'evidence-log',
    title: 'Evidence log',
    description:
      'Track what shows up. The log is what turns "I think this works" into something you can actually read.',
    steps: [
      'Each evening, write one line: anything that moved toward the vision today.',
      'Mark whether you made it happen, or it surfaced on its own.',
      'Re-read weekly. Patterns — and momentum — become visible.',
    ],
    duration: '2 min/day',
    icon: 'NotebookPen',
  },
]

// ── Page FAQs ──────────────────────────────────────────────────────────────
// Kept here (a plain module) rather than in the 'use client' page components,
// so the server pages can import them for JSON-LD without Next.js turning them
// into client-reference proxies (which breaks .map during prerender).

export const hubFaqs = [
  {
    question: 'Is manifestation real?',
    answer:
      'Parts of it are. Vivid mental rehearsal changes your brain and behaviour, and a specific intention biases what your attention surfaces. The metaphysical claims — that thought emits a frequency that reorders the world — are not supported. The useful move is to keep the mechanisms and drop the cosmology.',
  },
  {
    question: 'What is a Reality Architect?',
    answer:
      'Someone who turns a felt vision into shipped reality on a loop: vision becomes a spec, the spec becomes something AI helps render, the rendering ships, and the result teaches the next loop. It is the stage past "Manifestation Master" — manifestation plus the build.',
  },
  {
    question: 'How does self-made music fit in?',
    answer:
      'The emotional state you carry changes what you do. Music is the fastest reliable lever for state — tempo sets energy, mode sets mood, lyric sets the message. Building your own track for the exact state a goal needs (the Vibe OS idea) turns a vague notion of "vibration" into a concrete, repeatable tool.',
  },
  {
    question: 'Do I need to believe in anything?',
    answer:
      'No. The practice runs on how your own brain and behaviour work. You do not have to believe in the universe sending things your way — you set a clear intention, set your state, keep your attention there, and act. The results come from the loop, not from faith.',
  },
]

export const questFaqs = [
  {
    question: 'What is the Reality Architect Quest?',
    answer:
      'A guided 10-day loop that takes you from setting a vision and feeling it as real (Manifestation Master) to turning it into something shipped (Reality Architect). Each day is one practice: name it, feel it, render it with AI, set your state with music, build, ship, and learn.',
  },
  {
    question: 'Do I need an account?',
    answer:
      'No. Your progress lives in your browser (localStorage) — nothing is sent to a server. The honest trade-off: switching devices or clearing browser data resets your map.',
  },
  {
    question: 'Do I have to do one day per day?',
    answer:
      'No. The order matters more than the pace — each day builds on the last. Go a day at a time, or block a weekend. Mark a day done when you have actually run the practice, not just read it.',
  },
  {
    question: 'Do I need Vibe OS or paid tools?',
    answer:
      'No. The state-setting step works with any music you make or choose. Vibe OS makes it deliberate — tempo, mode, and lyric tuned to a goal-state — but the loop runs without it.',
  },
]

// ── The Books ────────────────────────────────────────────────────────────
// Honest summaries used on /the-secret and /think-and-grow-rich. The register
// matches the library: useful, often dated or mystical, still foundational.

export interface BookPrinciple {
  name: string
  claim: string
  /** The grounded reframe — what it actually maps to. */
  reframe: string
}

export const theSecret = {
  slug: 'the-secret',
  title: 'The Secret',
  author: 'Rhonda Byrne',
  year: 2006,
  oneLine:
    'The pop-culture distillation of the Law of Attraction: thoughts and feelings shape what comes into your life.',
  honestTake:
    'The Secret overpromises and skips the work — "ask, believe, receive" leaves out the receive-by-doing part, and the quantum-physics framing is metaphor, not science. But strip the mysticism and a real mechanism is left standing: what you focus on and how you feel changes what you notice and what you do. That part is worth taking seriously.',
  whatWorked: [
    'Getting specific about what I actually wanted — vagueness was the real problem.',
    'Feeling the outcome as real, not just thinking about it — the feeling is what changed my behaviour.',
    'Gratitude as a state-setter — it reliably moved me into a better mood to work from.',
  ],
  whatToIgnore: [
    'The implication that thinking alone delivers results without action.',
    'The "quantum" and "frequency of the universe" claims — held as metaphor, not mechanism.',
    'Anything that blames you for hardship because you "attracted" it.',
  ],
  principles: [
    {
      name: 'Ask',
      claim: 'Get clear and specific about what you want.',
      reframe: 'Define the outcome precisely. Clarity is what lets the attention filter and a real plan engage.',
    },
    {
      name: 'Believe',
      claim: 'Feel it as already yours.',
      reframe: 'Vivid felt rehearsal pre-loads the behaviour and steadies the state you act from.',
    },
    {
      name: 'Receive',
      claim: 'Let it come to you.',
      reframe: 'Notice what the filter surfaces — then act on it. Receiving is mostly recognising and moving.',
    },
  ] as BookPrinciple[],
}

export const thinkAndGrowRich = {
  slug: 'think-and-grow-rich',
  title: 'Think and Grow Rich',
  author: 'Napoleon Hill',
  year: 1937,
  oneLine:
    'The original success-system book — thirteen principles drawn from studying high achievers, framed as a method.',
  honestTake:
    'Hill is uneven and occasionally mystical, and the research method behind it does not meet a modern bar. But more than The Secret, it insists on a system — desire made definite, written down, rehearsed daily, pursued with persistence and other minds. Read as a set of mechanisms rather than a creed, much of it holds up and maps cleanly onto how you actually build.',
  // The thirteen, compressed into the load-bearing ones with grounded reframes.
  principles: [
    {
      name: 'Definiteness of Purpose',
      claim: 'A burning desire for one definite goal.',
      reframe: 'This is a spec. One clear outcome, written down, beats a fog of wishes — same reason a good brief beats vibes.',
    },
    {
      name: 'Faith',
      claim: 'Belief that the goal is attainable.',
      reframe: 'Expectancy changes effort and persistence. You work differently when you believe it can land.',
    },
    {
      name: 'Auto-Suggestion',
      claim: 'Repeated self-statements impress the goal on the subconscious.',
      reframe: 'Daily mental rehearsal — the same motor-imagery mechanism elite performers use.',
    },
    {
      name: 'Organised Planning',
      claim: 'Turn desire into a concrete plan and act.',
      reframe: 'The build step. A vision with no plan stays a vision; the plan is where architecture starts.',
    },
    {
      name: 'The Mastermind',
      claim: 'Two or more minds aligned on a definite goal outperform one.',
      reframe: 'Your peer group — and now your AI agents — as a coordinated council. Aligned minds compound.',
    },
    {
      name: 'Persistence',
      claim: 'Sustained effort through setbacks.',
      reframe: 'The loop, run again after it breaks. Compounding only happens to people who keep shipping.',
    },
  ] as BookPrinciple[],
}

// ── The Quest ────────────────────────────────────────────────────────────
// A 10-day Reality Architect quest at /manifestation/quest. Each day is one
// practice that walks Manifestation Master → Reality Architect. Progress is
// stored in localStorage; no account, no server.

export interface QuestDay {
  day: number
  title: string
  focus: string
  /** The core practice for the day. */
  practice: string
  /** State to set first — references a Vibe OS goal-state. */
  vibeState: string
  /** The AI-creation move that makes the day's vision tangible. */
  aiStep: string
  /** What to write in the evidence log tonight. */
  evidencePrompt: string
}

export const MANIFESTATION_QUEST_LENGTH = 10

export const questDays: QuestDay[] = [
  {
    day: 1,
    title: 'Name the vision',
    focus: 'Specificity',
    practice: 'Write the one outcome you want in the next 90 days, in a single concrete sentence. Vague is the enemy.',
    vibeState: 'focused calm (80–100 BPM, major, instrumental)',
    aiStep: 'Ask an AI to interview you for 5 questions that make the outcome sharper, then rewrite the sentence.',
    evidencePrompt: 'Write the final sentence. Note how it differs from your first draft.',
  },
  {
    day: 2,
    title: 'Feel it as real',
    focus: 'Imagination',
    practice: 'Run a 10-minute vivid rehearsal of the moment the outcome lands. Full sensory detail. Let the feeling rise.',
    vibeState: 'steady confidence (90–110 BPM, major, warm pads)',
    aiStep: 'Have AI generate a short first-person "scene" of that moment from your description. Read it back.',
    evidencePrompt: 'What did the rehearsal feel like? What detail surprised you?',
  },
  {
    day: 3,
    title: 'Render the vision',
    focus: 'Externalise',
    practice: 'Make the imagined thing visible — an image, a mood board, a track that sounds like the outcome.',
    vibeState: 'creative flow (90–115 BPM, major, piano/strings)',
    aiStep: 'Generate the artifact with an image or music model. Refine until it matches the feeling. Keep the best.',
    evidencePrompt: 'Did seeing it change the vision? Paste or describe what you kept.',
  },
  {
    day: 4,
    title: 'Score your state',
    focus: 'State',
    practice: 'Build your goal-state soundtrack and do one real work block inside it. Set state on purpose.',
    vibeState: 'your goal-state — pick the Vibe OS dials deliberately',
    aiStep: 'Use the Vibe OS state library to generate a Suno prompt for the exact state, then make the track.',
    evidencePrompt: 'Rate the work block 1–5 for ease and focus. What changed vs. your usual?',
  },
  {
    day: 5,
    title: 'Write the spec',
    focus: 'Definiteness',
    practice: 'Turn the vision into a one-paragraph spec: what it is, who it is for, what "done" looks like.',
    vibeState: 'focused calm (80–100 BPM, major, instrumental)',
    aiStep: 'Ask AI to pressure-test the spec — what is unclear, what is missing? Tighten it.',
    evidencePrompt: 'Paste the final spec. You just crossed from Master to Architect.',
  },
  {
    day: 6,
    title: 'Set the filter',
    focus: 'Attention',
    practice: 'Write the one specific thing you are looking for to move this forward. Read it once. Do not hunt.',
    vibeState: 'open awareness (70–90 BPM, major, ambient)',
    aiStep: 'Ask AI for 10 non-obvious places or ways that thing tends to show up. Keep the list nearby.',
    evidencePrompt: 'Tonight: did anything related surface? Log it, even if small.',
  },
  {
    day: 7,
    title: 'Build the first version',
    focus: 'Build',
    practice: 'Use AI to render a real first version of the thing — a page, a draft, a prototype, a track.',
    vibeState: 'creative flow (90–115 BPM, major, piano/strings)',
    aiStep: 'Co-build it with AI in one sitting. Done and rough beats perfect and imagined.',
    evidencePrompt: 'What exists now that did not this morning? Link or describe it.',
  },
  {
    day: 8,
    title: 'Ship it small',
    focus: 'Ship',
    practice: 'Put the first version in front of one real person, or publish it somewhere small. Cross the line.',
    vibeState: 'bold energy (115–135 BPM, major, driving)',
    aiStep: 'Have AI draft the message or post that ships it. Send it yourself.',
    evidencePrompt: 'Who saw it? What was the very first response?',
  },
  {
    day: 9,
    title: 'Read the signal',
    focus: 'Learn',
    practice: 'Look at what came back. Write the one thing the response actually taught you.',
    vibeState: 'steady confidence (90–110 BPM, major, warm pads)',
    aiStep: 'Ask AI to help you separate signal from noise in the feedback. Name the single lesson.',
    evidencePrompt: 'Write the one lesson. It is the input to your next loop.',
  },
  {
    day: 10,
    title: 'Close the loop',
    focus: 'Compound',
    practice: 'Define the next loop using what you learned. Decide what you keep doing daily from here.',
    vibeState: 'your goal-state — make it a standing ritual',
    aiStep: 'Ask AI to draft your repeatable weekly loop (See → Build → Ship → Learn) as a checklist you will reuse.',
    evidencePrompt: 'Write your standing loop and the daily practice you are keeping. You are running the system now.',
  },
]
