// Daily Dares — the content spine of /dare and /quest.
//
// Each day references existing site content by id/slug instead of duplicating it:
// prompts resolve against lib/prompts.ts, books against data/book-reviews.ts,
// videos against the watch vault (data/video-vault-100.json), learning paths
// against data/learning-paths.ts. Only the dare framing itself is authored here.
//
// The quest runs 30 days in 6 chapters of 5. Chapters follow Think and Grow
// Rich principles, translated into mechanisms (see data/book-reviews.ts for
// the register: "uneven, often mystical, still foundational").

export interface DareMindStretch {
  title: string
  body: string
  videoId?: string // YouTube id from data/video-vault-100.json
  videoTitle?: string
  videoChannel?: string
  learningPathSlug?: string // → /learn/[slug]
}

export interface DarePrompt {
  promptId: string // id from lib/prompts.ts (free tier only)
  framing: string
}

export interface DareMindConcept {
  title: string
  body: string
  bookSlug?: string // → /library/[slug]
  quoteIndex?: number // index into that book's quotes array
}

export type DareEffort = 'two-minutes' | 'ten-minutes' | 'an-hour'

export interface DareGoodDeed {
  title: string
  body: string
  effort: DareEffort
}

export interface DailyDare {
  day: number // 1-30
  chapterId: string
  title: string
  mindStretch: DareMindStretch
  prompt: DarePrompt
  mindConcept: DareMindConcept
  goodDeed: DareGoodDeed
}

export interface QuestChapter {
  id: string
  title: string
  principle: string
  summary: string
  days: [number, number] // inclusive
  bookSlug: string
  icon: string // lucide icon name, mapped in pages
}

export const questChapters: QuestChapter[] = [
  {
    id: 'definite-aim',
    title: 'Definite Aim',
    principle: 'Desire — Think and Grow Rich, Ch. 2',
    summary:
      'Hill\'s first principle, stripped of mysticism: a specific target backed by a plan beats a vague wish every time. This week you name one aim precisely enough that you could fail at it — and point your attention, your tools, and your AI at it.',
    days: [1, 5],
    bookSlug: 'think-and-grow-rich',
    icon: 'target',
  },
  {
    id: 'trained-belief',
    title: 'Trained Belief',
    principle: 'Faith — Think and Grow Rich, Ch. 3',
    summary:
      'Hill called it faith. Modern research calls it self-efficacy and the placebo response: belief is a rehearsed state, and your biology takes it seriously. This week you train belief the way you train a muscle — with evidence, repetition, and rehearsal.',
    days: [6, 10],
    bookSlug: 'you-are-the-placebo',
    icon: 'sparkles',
  },
  {
    id: 'workshop-of-the-mind',
    title: 'The Workshop of the Mind',
    principle: 'Imagination — Think and Grow Rich, Ch. 6',
    summary:
      'Imagination is a simulation engine: it prototypes futures before you build them. Hill said every fortune started as a recombination of known ideas. This week you run the simulator on purpose — and use generative AI as a second imagination.',
    days: [11, 15],
    bookSlug: 'think-and-grow-rich',
    icon: 'lightbulb',
  },
  {
    id: 'programming-the-default',
    title: 'Programming the Default',
    principle: 'Auto-Suggestion — Think and Grow Rich, Ch. 4',
    summary:
      'Repetition plus emotion writes the defaults you run on — Hill\'s auto-suggestion, refined by a century of habit science. This week you stop running inherited defaults and write your own: habits, environment, inputs, and the instructions your AI runs on.',
    days: [16, 20],
    bookSlug: 'atomic-habits',
    icon: 'repeat',
  },
  {
    id: 'one-step-past-failure',
    title: 'One Step Past Failure',
    principle: 'Persistence — Think and Grow Rich, Ch. 9',
    summary:
      'The most cited chapter in the book, and the least mystical: persistence is a trained response, not a personality trait. Most people quit roughly where success begins. This week you practice continuing — on the work, on the body, and on the conversations you\'ve been avoiding.',
    days: [21, 25],
    bookSlug: 'cant-hurt-me',
    icon: 'mountain',
  },
  {
    id: 'two-minds',
    title: 'Two Minds',
    principle: 'The Mastermind — Think and Grow Rich, Ch. 10',
    summary:
      'Two or more minds in harmony toward a definite objective produce a third intelligence greater than either alone. Carnegie credited this principle for everything. This week the quest becomes literal: you build with others, serve others, and bring someone with you.',
    days: [26, 30],
    bookSlug: 'think-and-grow-rich',
    icon: 'users',
  },
]

export const dailyDares: DailyDare[] = [
  // ─── Chapter 1: Definite Aim (days 1-5) ───────────────────────────────────
  {
    day: 1,
    chapterId: 'definite-aim',
    title: 'Name the thing',
    mindStretch: {
      title: 'A network learns by being shown a target',
      body: 'A neural network is just numbers adjusting toward a target it can measure. No target, no learning — for machines and, it turns out, for you. Watch how the whole system organizes around one defined objective.',
      videoId: 'aircAruvnKk',
      videoTitle: 'But What Is a Neural Network?',
      videoChannel: '3Blue1Brown',
    },
    prompt: {
      promptId: 'goal-setting-framework',
      framing: 'Run this with one honest input: the thing you actually want this year. Notice how much sharper the answer gets when you stop hedging.',
    },
    mindConcept: {
      title: 'Thoughts are things — when they have a target',
      body: 'Hill opens with a claim that sounds mystical and isn\'t: a thought becomes a material force when it is definite, repeated, and backed by a plan. His six-step formula is really a commitment device — it forces specificity and daily contact with the aim. Vague intentions produce vague lives; that part is just mechanics.',
      bookSlug: 'think-and-grow-rich',
      quoteIndex: 0,
    },
    goodDeed: {
      title: 'Pick up three pieces of trash',
      body: 'On your way somewhere today, pick up three pieces of litter and bin them. Nobody will see it. That\'s the point — day one is about acting on a decision, not an audience.',
      effort: 'two-minutes',
    },
  },
  {
    day: 2,
    chapterId: 'definite-aim',
    title: 'Make it specific enough to fail',
    mindStretch: {
      title: 'Attention is selective by design',
      body: 'The mechanism behind modern AI is called attention: the model learns what to weight and what to ignore. Your mind runs the same trick. A definite aim is an attention allocation — it tells your brain what counts as signal.',
      videoId: 'eMlx5fFNoYc',
      videoTitle: 'Attention in Transformers, Visually Explained',
      videoChannel: '3Blue1Brown',
    },
    prompt: {
      promptId: 'explain-concept',
      framing: 'Use the Feynman prompt on your own aim from yesterday. If you can\'t explain it simply enough for a 12-year-old, it isn\'t definite yet.',
    },
    mindConcept: {
      title: 'Weak desires bring weak results',
      body: 'Hill\'s test for desire is intensity plus precision. A goal you can\'t fail at isn\'t a goal — it\'s a mood. The fix isn\'t hype, it\'s specificity: exact outcome, exact date, exact price you\'re willing to pay. Specific targets recruit effort that vague ones never touch.',
      bookSlug: 'think-and-grow-rich',
      quoteIndex: 5,
    },
    goodDeed: {
      title: 'Send one specific compliment',
      body: 'Message someone one thing they did well — named precisely, not "you\'re great." Specificity is the theme today; it works on people too.',
      effort: 'two-minutes',
    },
  },
  {
    day: 3,
    chapterId: 'definite-aim',
    title: 'Draw the map',
    mindStretch: {
      title: 'Learn anything with the Feynman loop',
      body: 'Pick the skill your aim requires. The Feynman technique — explain, find the gap, go back, simplify — is the fastest known loop for real understanding. It\'s also exactly how you should be using AI: as the student you teach.',
      videoId: 'MlJdMr3O5J4',
      videoTitle: 'How to Study Way More Effectively (Feynman Technique)',
      videoChannel: 'Freedom in Thought',
    },
    prompt: {
      promptId: 'learning-path',
      framing: 'Have AI design the learning path from where you are to your aim. You\'ll disagree with parts of it — that disagreement is your actual curriculum.',
    },
    mindConcept: {
      title: 'The limits are mostly acknowledged, not real',
      body: 'Hill\'s line about the mind\'s limitations is easy to misread as magic. The grounded version: most ceilings are inherited assumptions that were never tested. A map to your aim makes the assumed limits visible — and most of them dissolve under inspection.',
      bookSlug: 'think-and-grow-rich',
      quoteIndex: 8,
    },
    goodDeed: {
      title: 'Make way for someone',
      body: 'Hold the door, give up the seat, let the rushed person ahead of you in line. Small yields, done deliberately, all day.',
      effort: 'two-minutes',
    },
  },
  {
    day: 4,
    chapterId: 'definite-aim',
    title: 'Do more than the ask',
    mindStretch: {
      title: 'The math of 1% better',
      body: 'One percent better every day is 37× better in a year — not motivation, arithmetic. James Clear walks the compounding logic that turns a definite aim into a daily unit of work.',
      videoId: 'U_nzqnXWvSo',
      videoTitle: 'Atomic Habits: How to Get 1% Better Every Day',
      videoChannel: 'James Clear',
    },
    prompt: {
      promptId: 'weekly-planning',
      framing: 'Plan this week around your aim — one needle-moving block per day. Let AI hold the structure so your willpower doesn\'t have to.',
    },
    mindConcept: {
      title: 'Over-delivery compounds',
      body: 'Hill noticed that the people who did more than they were paid for ended up paid for more than they did. Strip the 1937 wording and it\'s reputation compounding: every over-delivery is a deposit other people remember. It\'s the slowest, surest leverage there is.',
      bookSlug: 'think-and-grow-rich',
      quoteIndex: 10,
    },
    goodDeed: {
      title: 'Do a chore that isn\'t yours',
      body: 'Dishes you didn\'t dirty, a bin you didn\'t fill, a task someone else was dreading. Do it without announcing it.',
      effort: 'ten-minutes',
    },
  },
  {
    day: 5,
    chapterId: 'definite-aim',
    title: 'Recruit the machines',
    mindStretch: {
      title: 'Agentic workflows: AI that pursues a goal',
      body: 'Andrew Ng on the shift from AI that answers to AI that iterates toward an objective — drafting, critiquing, revising. The same loop you\'re building this week, implemented in software. This is where AI is going; get there early.',
      videoId: 'sal78ACtGTc',
      videoTitle: "What's Next for AI Agentic Workflows",
      videoChannel: 'Andrew Ng',
      learningPathSlug: 'claude-mastery',
    },
    prompt: {
      promptId: 'brainstorm-ideas',
      framing: 'Ask for twenty ways AI could accelerate your specific aim. Eighteen will be mediocre. Two will be worth the whole exercise.',
    },
    mindConcept: {
      title: 'Knowledge organized toward an end',
      body: 'Hill\'s "specialized knowledge" chapter is about organization, not accumulation: Ford didn\'t know everything, he knew how to summon anyone who did. You now have that button on your desk. General knowledge is cheap; knowledge aimed at a definite purpose is the scarce thing.',
      bookSlug: 'think-and-grow-rich',
      quoteIndex: 6,
    },
    goodDeed: {
      title: 'Walk with a bag',
      body: 'Take your usual walk, bring a bag, fill it with litter. Beach, park, street — wherever you are. One bag, one walk, visibly better place.',
      effort: 'ten-minutes',
    },
  },

  // ─── Chapter 2: Trained Belief (days 6-10) ────────────────────────────────
  {
    day: 6,
    chapterId: 'trained-belief',
    title: 'Meet your future self',
    mindStretch: {
      title: 'You are not done becoming',
      body: 'Psychologist Dan Gilbert\'s finding: people at every age believe they\'ve finished changing — and they\'re wrong every time. The "end of history illusion." Belief in a future self is not delusion; assuming you\'re finished is.',
      videoId: 'XNbaR54Gpj4',
      videoTitle: 'The Psychology of Your Future Self',
      videoChannel: 'TED',
    },
    prompt: {
      promptId: 'gratitude-practice',
      framing: 'Gratitude here isn\'t sentiment — it\'s evidence collection. Run the practice and watch it build a case file that things tend to work out when you work.',
    },
    mindConcept: {
      title: 'A thought repeated becomes a state of being',
      body: 'Dispenza\'s placebo research makes Hill\'s "faith" chapter measurable: a thought, repeated and felt, consolidates into belief, and belief changes behavior and biology. You don\'t choose whether this loop runs. You only choose what you feed it.',
      bookSlug: 'you-are-the-placebo',
      quoteIndex: 4,
    },
    goodDeed: {
      title: 'Catch someone doing it right',
      body: 'Write down three things people around you did right today. Tell at least one of them, specifically.',
      effort: 'two-minutes',
    },
  },
  {
    day: 7,
    chapterId: 'trained-belief',
    title: 'Your body is listening',
    mindStretch: {
      title: 'The neuroscience of drive',
      body: 'Huberman on dopamine as the molecule of pursuit, not pleasure — and how to manage it so motivation is something you generate rather than wait for. Belief has a chemistry; learn the dials.',
      videoId: 'vA50EK70whE',
      videoTitle: 'How to Increase Motivation & Drive',
      videoChannel: 'Huberman Lab',
    },
    prompt: {
      promptId: 'meditation-guidance',
      framing: 'Ten minutes, guided by AI, tuned to you. The skill being trained is meta: noticing what your mind says when you stop directing it.',
    },
    mindConcept: {
      title: 'Every word is an instruction',
      body: 'The placebo effect is the body responding to expectation — measurably, repeatably. Which means your running commentary about yourself isn\'t commentary; it\'s input. "I\'m terrible at this" is not an observation. It\'s a program, mid-installation.',
      bookSlug: 'you-are-the-placebo',
      quoteIndex: 1,
    },
    goodDeed: {
      title: 'Greet five strangers',
      body: 'Eye contact, a real hello, maybe a smile. Five people. Watch how many give it straight back — the feedback loop is immediate.',
      effort: 'two-minutes',
    },
  },
  {
    day: 8,
    chapterId: 'trained-belief',
    title: 'Rehearse the future',
    mindStretch: {
      title: 'Dopamine: the engine you\'re already driving',
      body: 'Huberman on how peaks, baselines, and crashes of dopamine shape what you find worth doing. If you understand this system, the mystery of "some days I believe, some days I don\'t" mostly evaporates.',
      videoId: 'QmOF0crdyRU',
      videoTitle: 'Controlling Your Dopamine',
      videoChannel: 'Huberman Lab',
    },
    prompt: {
      promptId: 'morning-routine-design',
      framing: 'Design a morning that rehearses the person you\'re becoming, not the person you\'ve been. Keep it small enough to survive a bad night\'s sleep.',
    },
    mindConcept: {
      title: 'The body can\'t tell rehearsal from reality',
      body: 'Athletes train with mental rehearsal because motor circuits fire whether the rep is physical or vividly imagined. The same applies to courage, calm, and difficult conversations. Visualization isn\'t wishing — it\'s a practice rep your nervous system records as real.',
      bookSlug: 'you-are-the-placebo',
      quoteIndex: 11,
    },
    goodDeed: {
      title: 'Encourage a small creator',
      body: 'Find something made by someone with a tiny audience — a song, a post, an app — and leave a genuine, specific comment. Early encouragement is disproportionately powerful.',
      effort: 'two-minutes',
    },
  },
  {
    day: 9,
    chapterId: 'trained-belief',
    title: 'Evidence beats affirmation',
    mindStretch: {
      title: 'Focus is trainable',
      body: 'A toolkit of mechanisms — visual anchors, ultradian cycles, deliberate defocus — that turn concentration from a trait into a protocol. Belief in your ability to focus grows the same way everything in this chapter grows: from evidence.',
      videoId: 'yb5zpo5WDG4',
      videoTitle: 'Focus Toolkit: Tools to Improve Focus',
      videoChannel: 'Huberman Lab',
    },
    prompt: {
      promptId: 'chatgpt-study-notes',
      framing: 'Take the hardest thing you\'re learning right now and turn it into structured notes with AI. Finishing one hard study session is worth ten affirmations.',
    },
    mindConcept: {
      title: 'Change the belief, change the biology',
      body: 'Bandura\'s self-efficacy research found the strongest source of belief is mastery experience — small wins, banked. Affirmation without evidence collapses under pressure; evidence without ceremony quietly holds. Stack wins so small they\'re unfalsifiable, then let the record argue for you.',
      bookSlug: 'you-are-the-placebo',
      quoteIndex: 5,
    },
    goodDeed: {
      title: 'Fill one donation bag',
      body: 'One bag: clothes, books, gear you haven\'t touched in a year. Set it by the door for the donation run. Someone needs it more than your closet does.',
      effort: 'ten-minutes',
    },
  },
  {
    day: 10,
    chapterId: 'trained-belief',
    title: 'Rewrite the inner monologue',
    mindStretch: {
      title: 'Nine Stoic rules, two thousand years of testing',
      body: 'The Stoics ran the longest experiment in cognitive training on record: what you repeatedly tell yourself becomes how you see. These nine rules are the surviving results.',
      videoId: 'heh5XLwZVOY',
      videoTitle: '9 Stoic Rules For A Better Life',
      videoChannel: 'Daily Stoic',
    },
    prompt: {
      promptId: 'rewrite-improve',
      framing: 'Take one harsh sentence you say to yourself and have AI rewrite it to be true but fair — the way you\'d say it to a friend. Then say that version instead.',
    },
    mindConcept: {
      title: 'Belief is a thought you keep thinking',
      body: 'Dispenza\'s definition removes the mystery: a belief is just a thought with enough repetitions behind it that the alternative feels unthinkable. Which means beliefs aren\'t found or lost — they\'re practiced. Choose the reps deliberately and the belief follows on schedule.',
      bookSlug: 'you-are-the-placebo',
      quoteIndex: 10,
    },
    goodDeed: {
      title: 'Tell a friend what you believe about them',
      body: 'One sentence, specific, sincere: "I believe you could ___ because I\'ve watched you ___." Borrowed belief is real belief — be the lender today.',
      effort: 'two-minutes',
    },
  },

  // ─── Chapter 3: The Workshop of the Mind (days 11-15) ─────────────────────
  {
    day: 11,
    chapterId: 'workshop-of-the-mind',
    title: 'Open the workshop',
    mindStretch: {
      title: 'Rick Rubin on the creative act',
      body: 'The most decorated producer alive can\'t play instruments and barely touches a mixing board. What he brings is trained imagination — taste, and the conviction to follow it. Watch what creation looks like when the instrument is the mind itself.',
      videoId: 'sE1teB5bN-w',
      videoTitle: 'Rick Rubin on the Creative Act',
      videoChannel: '60 Minutes',
    },
    prompt: {
      promptId: 'dalle-illustration',
      framing: 'Render the picture you\'ve been carrying in your head — your aim, achieved, as a scene. Getting it out of your skull and onto a screen changes its status from dream to draft.',
    },
    mindConcept: {
      title: 'If you can\'t see it in imagination first',
      body: 'Hill split imagination in two: synthetic (recombining what exists — most fortunes) and creative (genuinely new). Both, he insisted, are muscles. The bank-balance line sounds like magic until you read it as engineering: every built thing was specified somewhere first, and the first drafting table is imagination.',
      bookSlug: 'think-and-grow-rich',
      quoteIndex: 11,
    },
    goodDeed: {
      title: 'Make something small for someone',
      body: 'A doodle, a note, a tiny playlist, a photo edited with care. Hand-made and unprompted. The point is making for, not making at.',
      effort: 'ten-minutes',
    },
  },
  {
    day: 12,
    chapterId: 'workshop-of-the-mind',
    title: 'Machines that imagine',
    mindStretch: {
      title: 'A model that dreams in video',
      body: 'Text in, moving world out. Whatever you think about generative video, sit with the fact that imagination — the prototyping of unreal scenes — is no longer exclusively biological. Your workshop just acquired power tools.',
      videoId: 'nbPbK1xYSNY',
      videoTitle: 'OpenAI Sora: The Age of AI Is Here!',
      videoChannel: 'Two Minute Papers',
    },
    prompt: {
      promptId: 'ai-video-script-generator',
      framing: 'Script a 60-second film about the world your aim creates. You\'re not making the film today — you\'re practicing specifying a future in enough detail to build.',
    },
    mindConcept: {
      title: 'Problems are soluble',
      body: 'Physicist David Deutsch\'s claim is the most optimistic sentence in science: anything not forbidden by the laws of physics is achievable, given the right knowledge. Every "impossible" is either physics or a missing explanation — and explanations are exactly what imagination manufactures.',
      bookSlug: 'fabric-of-reality',
      quoteIndex: 0,
    },
    goodDeed: {
      title: 'Clean a stretch of shoreline or green',
      body: 'Beach, riverbank, park edge — ten minutes, whatever fits in your hands or a bag. Water and wild places carry litter furthest; that\'s where small cleanups count double.',
      effort: 'ten-minutes',
    },
  },
  {
    day: 13,
    chapterId: 'workshop-of-the-mind',
    title: 'Recombine the world',
    mindStretch: {
      title: 'Prompting as a visual language',
      body: 'Image models respond to the precision of your imagination: style, light, lens, mood. Learning to prompt well is learning to see what you\'re imagining clearly enough to describe it — which was always the hard part.',
      videoId: 'VUDjpOY3YeE',
      videoTitle: "MidJourney Tutorial: Full Beginner's Guide",
    },
    prompt: {
      promptId: 'midjourney-abstract-art',
      framing: 'Make something abstract: combine two things that don\'t belong together and see what the model finds in the gap. Synthetic imagination, on demand.',
    },
    mindConcept: {
      title: 'Why the universe seems to conspire',
      body: 'Coelho\'s most quoted line describes a real mechanism wearing a poetic coat. Commit to a definite aim and your attention re-tunes: you notice doors, people, and openings that were always there. The universe didn\'t move. Your filter did. That\'s the grounded version of the "law of attraction" — and it actually works.',
      bookSlug: 'the-alchemist',
      quoteIndex: 0,
    },
    goodDeed: {
      title: 'Introduce two people',
      body: 'Think of two people who would genuinely benefit from knowing each other. Make the introduction today, with one line on why. Recombination works on people too.',
      effort: 'two-minutes',
    },
  },
  {
    day: 14,
    chapterId: 'workshop-of-the-mind',
    title: 'Compose the state you need',
    mindStretch: {
      title: 'Writing songs with AI',
      body: 'Music is imagination you can hear. Watch how lyric and style prompts shape a generated song — then consider that focus, calm, and drive all have soundtracks, and you can now compose them.',
      videoId: 'sIx3LNV51bQ',
      videoTitle: 'Suno V4.5: Complete AI Music Tutorial',
    },
    prompt: {
      promptId: 'suno-ambient-electronic',
      framing: 'Generate the focus track for your deep-work block. You\'re scoring the film of your own working day — make it sound like the person who finishes.',
    },
    mindConcept: {
      title: 'Attention is the budget; everything else is spending',
      body: 'Strip Dispenza\'s language to the mechanism and one law survives every test: where attention goes, energy and skill follow. Your attention is the single resource that everything — phones, feeds, fears — competes for. Imagination is just attention pointed at what doesn\'t exist yet.',
      bookSlug: 'becoming-supernatural',
      quoteIndex: 12,
    },
    goodDeed: {
      title: 'Send someone a soundtrack',
      body: 'Make or pick a track for one specific person — for their commute, their grind, their rough week — and send it with a sentence about why it\'s theirs.',
      effort: 'ten-minutes',
    },
  },
  {
    day: 15,
    chapterId: 'workshop-of-the-mind',
    title: 'Build a small world',
    mindStretch: {
      title: 'Build GPT from scratch',
      body: 'Karpathy builds a language model from empty file to working code. You don\'t need to follow every line — watch enough to replace "AI is magic" with "AI is comprehensible." Demystified tools are usable tools.',
      videoId: 'kCc8FmEb1nY',
      videoTitle: "Let's Build GPT from Scratch",
      videoChannel: 'Andrej Karpathy',
    },
    prompt: {
      promptId: 'suno-indie-folk',
      framing: 'Write a song about the thing you\'re building — the honest version, doubts included. Folk has carried work songs for centuries; yours can carry this quest.',
    },
    mindConcept: {
      title: 'The universe requires minds',
      body: 'Deutsch\'s deepest point: the laws of physics don\'t merely permit computation, evolution, and understanding — they require that such things can exist. Your imagination is not an accident bolted onto the universe. It is one of the things the universe does.',
      bookSlug: 'fabric-of-reality',
      quoteIndex: 8,
    },
    goodDeed: {
      title: 'Thank a teacher',
      body: 'Write to a teacher or mentor who shaped you — even decades later. Tell them one specific thing that stuck. These messages get kept.',
      effort: 'ten-minutes',
    },
  },

  // ─── Chapter 4: Programming the Default (days 16-20) ──────────────────────
  {
    day: 16,
    chapterId: 'programming-the-default',
    title: 'Every action is a vote',
    mindStretch: {
      title: 'Gradient descent: learning as tiny repeated updates',
      body: 'A network doesn\'t learn in leaps — it learns by millions of small corrections, each nudging the weights toward better. Habit formation is the same algorithm running on wetware. Watch the math of becoming.',
      videoId: 'IHZwWFHWa-w',
      videoTitle: 'Gradient Descent: How Neural Networks Learn',
      videoChannel: '3Blue1Brown',
    },
    prompt: {
      promptId: 'habit-design',
      framing: 'Design one keystone habit that serves your aim. Anchor it to something you already do daily — you\'re wiring into existing circuitry, not building new.',
    },
    mindConcept: {
      title: 'You are voting whether you mean to or not',
      body: 'Clear\'s reframe dissolves the drama of identity change: every action is a vote for a type of person, and the election never ends. You don\'t need a unanimous result — just a reliable majority. Hill called the underlying machinery auto-suggestion; Clear gives it a ballot box.',
      bookSlug: 'atomic-habits',
      quoteIndex: 1,
    },
    goodDeed: {
      title: 'Make the route cleaner by default',
      body: 'Same walk as day 5, new rule: any litter directly on your path gets picked up, every time, from now on. Not an event — a default.',
      effort: 'two-minutes',
    },
  },
  {
    day: 17,
    chapterId: 'programming-the-default',
    title: 'Write your own system prompt',
    mindStretch: {
      title: 'Claude Code: instructions that become behavior',
      body: 'Developers write a file of standing instructions and the AI obeys it every session, automatically. Standing instructions that shape every future action — that\'s a system prompt, and you\'re running one too. Yours just isn\'t written down yet.',
      videoId: 'hq8J-nj_Sr0',
      videoTitle: "Build Anything with Claude Code, Here's How",
      videoChannel: 'David Ondrej',
      learningPathSlug: 'claude-mastery',
    },
    prompt: {
      promptId: 'claude-md-generator',
      framing: 'Generate a CLAUDE.md for a project — then notice what you just did: wrote defaults a mind will follow without re-deciding. Now draft the same file for yourself: five standing instructions you want to run on.',
    },
    mindConcept: {
      title: 'The four laws are an installer',
      body: 'Obvious, attractive, easy, satisfying — Clear\'s four laws are the installation procedure for any default you want running. Hill prescribed repetition charged with emotion; Clear engineered the same insight into checkboxes. Either way, the program installs through repetition, not intention.',
      bookSlug: 'atomic-habits',
      quoteIndex: 5,
    },
    goodDeed: {
      title: 'Schedule kindness',
      body: 'Set a recurring daily reminder with one word on it: "someone." When it fires, do one small kind thing for whoever is nearest. Automate the trigger, improvise the act.',
      effort: 'two-minutes',
    },
  },
  {
    day: 18,
    chapterId: 'programming-the-default',
    title: 'Design the environment',
    mindStretch: {
      title: 'AI tools without the hype',
      body: 'Simon Willison — one of the most level-headed voices in AI — on what these tools actually do well today. Your information environment is part of your environment; this is what a clean input looks like.',
      videoId: 'uRuLgar5XZw',
      videoTitle: 'AI Tools Without the Hype',
      videoChannel: 'Simon Willison',
      learningPathSlug: 'gemini-mastery',
    },
    prompt: {
      promptId: 'personal-ai-coe-blueprint',
      framing: 'Design your personal AI setup the way enterprises design theirs — what runs where, for what, with what standards. An environment that makes the good path the easy path.',
    },
    mindConcept: {
      title: 'The invisible hand on your behavior',
      body: 'Clear\'s most underrated law: environment beats willpower, roughly always. The fruit on the counter gets eaten; the guitar in the closet doesn\'t get played. Stop negotiating with yourself inside a room rigged against you — re-rig the room.',
      bookSlug: 'atomic-habits',
      quoteIndex: 4,
    },
    goodDeed: {
      title: 'Reset a shared space',
      body: 'Kitchen at work, family living room, the gym rack — leave one shared space better than you found it, including the mess that isn\'t yours.',
      effort: 'ten-minutes',
    },
  },
  {
    day: 19,
    chapterId: 'programming-the-default',
    title: 'Systems over goals',
    mindStretch: {
      title: 'The real secret of productivity',
      body: 'Ali Abdaal\'s honest take: the productive people aren\'t more disciplined, they\'ve built systems where the work mostly happens by default. Goals set the direction; the system does the carrying.',
      videoId: 'tQSKyvjsUuI',
      videoTitle: 'My Complete Productivity System',
      videoChannel: 'Ali Abdaal',
    },
    prompt: {
      promptId: 'ai-coe-weekly-review',
      framing: 'Run a weekly review with AI as the facilitator: what moved, what stalled, what gets dropped. A system without a review loop is a system drifting.',
    },
    mindConcept: {
      title: 'You fall to the level of your systems',
      body: 'The most quoted sentence Clear wrote, because it survives contact with reality: ambition is common, systems are rare, and on the hard days the system is all that shows up. Build for the worst Tuesday, not the best Monday.',
      bookSlug: 'atomic-habits',
      quoteIndex: 0,
    },
    goodDeed: {
      title: 'Help before being asked',
      body: 'Spot someone mid-struggle — carrying, fixing, figuring out — and offer before they have to ask. Asking costs people more than helping costs you.',
      effort: 'ten-minutes',
    },
  },
  {
    day: 20,
    chapterId: 'programming-the-default',
    title: 'Curate the inputs',
    mindStretch: {
      title: 'The case for digital minimalism',
      body: 'Cal Newport\'s argument isn\'t anti-technology — it\'s pro-intention: your attention is being farmed, and the crop is your default thoughts. Decide your inputs or they\'ll be decided commercially.',
      videoId: '3E7hkPZ-HTk',
      videoTitle: 'Why You Should Quit Social Media',
      videoChannel: 'Cal Newport',
    },
    prompt: {
      promptId: 'chatgpt-meal-planner',
      framing: 'Defaults run on glucose too. Have AI plan a week of meals you\'d actually eat — one less daily decision, one more default pointing the right way.',
    },
    mindConcept: {
      title: 'You get what you repeat',
      body: 'Five words that compress Hill\'s subconscious chapter and a century of behavioral research. The subconscious acts on whatever reaches it most often with the most feeling — it doesn\'t audit the source. Feeds, friends, food, self-talk: it\'s all reps. Curate accordingly.',
      bookSlug: 'atomic-habits',
      quoteIndex: 14,
    },
    goodDeed: {
      title: 'Review a small business',
      body: 'That café, barber, repair shop you quietly love? Leave the five-star review with specifics. Three minutes of your typing is real revenue for them.',
      effort: 'two-minutes',
    },
  },

  // ─── Chapter 5: One Step Past Failure (days 21-25) ────────────────────────
  {
    day: 21,
    chapterId: 'one-step-past-failure',
    title: 'Meet the procrastinator',
    mindStretch: {
      title: 'Inside the mind of a master procrastinator',
      body: 'Tim Urban\'s instant-gratification monkey is the funniest accurate model of why we quit. Laugh, then notice: the panic monster only saves you when there\'s a deadline. Your aim doesn\'t have one. That\'s the trap this week breaks.',
      videoId: 'arj7oStGLkU',
      videoTitle: 'Inside the Mind of a Master Procrastinator',
      videoChannel: 'TED',
    },
    prompt: {
      promptId: 'explicit-scope-discipline',
      framing: 'Scope one task precisely with AI, then finish exactly that — no more, no less. Persistence starts with the radical act of completing what you said.',
    },
    mindConcept: {
      title: 'One step beyond the greatest failure',
      body: 'Hill interviewed five hundred successful people and kept hearing the same shape of story: the breakthrough sat just past the point where most people stop. Not because the universe rewards suffering — because hard problems cluster their progress at the end. Quitting at 90% pays 0%.',
      bookSlug: 'think-and-grow-rich',
      quoteIndex: 2,
    },
    goodDeed: {
      title: 'Finish the postponed favor',
      body: 'That thing you said you\'d send, fix, or return — the one helping someone else that keeps sliding. Today it ships.',
      effort: 'ten-minutes',
    },
  },
  {
    day: 22,
    chapterId: 'one-step-past-failure',
    title: 'The 40% rule',
    mindStretch: {
      title: 'Models that think longer do better',
      body: 'Reasoning models like DeepSeek R1 improved not by knowing more but by persisting longer — generating, checking, and correcting their own steps. Test-time effort, literally. The frontier of AI rediscovered persistence.',
      videoId: 'o0Fc5_zHvzo',
      videoTitle: 'DeepSeek R1: The Era of Reasoning Models',
      videoChannel: 'AI Explained',
    },
    prompt: {
      promptId: 'research-paper-summarizer',
      framing: 'Pick a paper or technical piece you\'d normally bounce off and work through it with AI as your reading partner. Don\'t skim — persist until it actually makes sense.',
    },
    mindConcept: {
      title: 'When you think you\'re done, you\'re at 40%',
      body: 'Goggins\' number isn\'t physiology — it\'s a calibration error he\'s naming: the first quit signal arrives long before actual capacity. You don\'t have to live at the limit. You do have to know the gauge reads low, so the signal informs you instead of commanding you.',
      bookSlug: 'cant-hurt-me',
      quoteIndex: 0,
    },
    goodDeed: {
      title: 'Plog it',
      body: 'Exercise outside today — run, walk, ride — and carry out the litter you pass. The Swedes call it plogging. Body trained, place cleaned, one session.',
      effort: 'ten-minutes',
    },
  },
  {
    day: 23,
    chapterId: 'one-step-past-failure',
    title: 'Resistance points true north',
    mindStretch: {
      title: 'The long one you\'ve been avoiding',
      body: 'Karpathy\'s deep dive is hours long, dense, and worth more than a hundred summaries. Today\'s stretch is the act itself: choose the long, hard version of learning on purpose. Watch as much as you can hold; come back for the rest.',
      videoId: '7xTGNNLPyMI',
      videoTitle: 'Deep Dive into LLMs like ChatGPT',
      videoChannel: 'Andrej Karpathy',
    },
    prompt: {
      promptId: 'ai-coding-pair-session',
      framing: 'Pair with AI on the task you\'ve been dodging — code or otherwise. Resistance shrinks when there\'s a competent partner in the room, even a silicon one.',
    },
    mindConcept: {
      title: 'The fear is the compass',
      body: 'Pressfield\'s rule: the more a task matters to your growth, the more Resistance you\'ll feel toward it. Which converts dread into navigation — the project you keep avoiding is usually the exact one to do next. Fear, read correctly, is a priority queue.',
      bookSlug: 'the-war-of-art',
      quoteIndex: 0,
    },
    goodDeed: {
      title: 'Have the avoided conversation',
      body: 'The apology, the thank-you, the "are we okay?" — the kind conversation you\'ve been circling. Resistance points true north here too.',
      effort: 'ten-minutes',
    },
  },
  {
    day: 24,
    chapterId: 'one-step-past-failure',
    title: 'Callus the mind',
    mindStretch: {
      title: 'Why you\'re actually tired',
      body: 'Most exhaustion isn\'t physical — it\'s decision fatigue, fragmented attention, and a nervous system that never downshifts. Understand the real causes and "I\'m too tired" loses most of its veto power.',
      videoId: 'KyxYdicOzTg',
      videoTitle: "Why You're Always Tired",
      videoChannel: 'After Skool',
    },
    prompt: {
      promptId: 'health-fitness-ai-coe',
      framing: 'Build your health system with AI — training, recovery, food, sleep. The mind persists exactly as well as the body carrying it.',
    },
    mindConcept: {
      title: 'Calluses form where the friction is',
      body: 'Goggins\' image is precise: calluses only form where skin meets resistance, repeatedly. Comfort produces no adaptation — anywhere, ever. The point isn\'t to seek suffering; it\'s to stop interpreting friction as a malfunction. Friction is the gym.',
      bookSlug: 'cant-hurt-me',
      quoteIndex: 9,
    },
    goodDeed: {
      title: 'Lend your hands for an hour',
      body: 'Someone near you has a physical task too big for them — moving, hauling, garden, repair. Give them an hour of your back and hands.',
      effort: 'an-hour',
    },
  },
  {
    day: 25,
    chapterId: 'one-step-past-failure',
    title: 'The obstacle is data',
    mindStretch: {
      title: 'Finite and infinite games',
      body: 'Sinek\'s distinction changes what "failure" even means: in a finite game you lose; in an infinite game you only fall behind for a while. Your aim is an infinite game. Setbacks are scores, not verdicts.',
      videoId: '_osKgFwKoDQ',
      videoTitle: 'The Finite and Infinite Games of Leadership',
      videoChannel: 'Simon Sinek · Talks at Google',
    },
    prompt: {
      promptId: 'system-prompt-design',
      framing: 'Design an AI coach persona that holds your standard when you won\'t — the voice that asks "is this done, or is this comfortable?" Save it. Use it on the bad days.',
    },
    mindConcept: {
      title: 'What stands in the way becomes the way',
      body: 'Marcus Aurelius ran an empire through plague and war on one operating principle: the impediment to action advances action. Every blocked plan contains the next plan\'s information. Hill said it softer — every failure carries the seed of equivalent benefit — but the Roman said it first, under worse conditions.',
      bookSlug: 'meditations',
      quoteIndex: 1,
    },
    goodDeed: {
      title: 'Ten pieces, one walk',
      body: 'Day 1 was three pieces of trash. Today it\'s ten. Same act, trained capacity — persistence made visible in the simplest possible metric.',
      effort: 'ten-minutes',
    },
  },

  // ─── Chapter 6: Two Minds (days 26-30) ────────────────────────────────────
  {
    day: 26,
    chapterId: 'two-minds',
    title: 'The third intelligence',
    mindStretch: {
      title: 'AI agents that work as a team',
      body: 'The most capable AI systems now are teams: agents with different roles critiquing and improving each other\'s work. Hill\'s mastermind principle, implemented in software seventy years later. Alignment between minds is a real force multiplier — silicon or otherwise.',
      videoId: 'KrRD7r7y7NY',
      videoTitle: 'The Rise of AI Agents',
      videoChannel: 'Andrew Ng',
    },
    prompt: {
      promptId: 'email-professional',
      framing: 'Write to one person you want thinking alongside you — a collaborator, a mentor, your quest partner. Clear ask, genuine reason, send it today.',
    },
    mindConcept: {
      title: 'Two or more minds in harmony',
      body: 'Hill\'s most durable idea: minds aligned on a definite objective produce a third intelligence neither has alone. Carnegie called it the entire secret of his fortune. Modern versions surround you — founding teams, writing rooms, training partners, the friend doing this quest with you. The mechanism is honest feedback plus shared stakes.',
      bookSlug: 'think-and-grow-rich',
    },
    goodDeed: {
      title: 'Name your partner\'s edge',
      body: 'Tell the person doing this quest with you — or your closest ally — one thing they\'re genuinely better at than you. Specifically. Masterminds run on this currency.',
      effort: 'two-minutes',
    },
  },
  {
    day: 27,
    chapterId: 'two-minds',
    title: 'A why can carry any how',
    mindStretch: {
      title: 'Demis Hassabis: solving intelligence to solve everything else',
      body: 'The DeepMind founder\'s definite aim is the largest one on record — and listen to how calmly he holds it. A serious purpose doesn\'t need volume. It needs decades.',
      videoId: 'Gfr50f6ZBvo',
      videoTitle: 'Demis Hassabis: DeepMind & Superintelligence',
      videoChannel: 'Lex Fridman',
    },
    prompt: {
      promptId: 'linkedin-thought-leadership',
      framing: 'Share one real thing this quest taught you — publicly, plainly, no guru voice. Teaching in the open is how one mind becomes useful to many.',
    },
    mindConcept: {
      title: 'Those who have a why',
      body: 'Frankl watched, under the worst conditions ever recorded, who endured: not the strongest, but those whose lives pointed at something beyond themselves. A why is not motivation — motivation fluctuates. A why is load-bearing structure. Build one and the hows get lighter.',
      bookSlug: 'mans-search-for-meaning',
      quoteIndex: 1,
    },
    goodDeed: {
      title: 'Give an hour to your community',
      body: 'Food bank, beach cleanup, community garden, library shelf, youth club — one volunteered hour, somewhere local. Bring the quest partner if you can.',
      effort: 'an-hour',
    },
  },
  {
    day: 28,
    chapterId: 'two-minds',
    title: 'Service is the shortcut',
    mindStretch: {
      title: 'The one-person business model',
      body: 'Dan Koe\'s model is service at scale: one person, aided by AI, solving real problems for real people. Notice the engine underneath — value flows toward whoever helps most usefully. Commerce, at its best, is systematized service.',
      videoId: 'BZ2nSULolKI',
      videoTitle: 'The One-Person Business Model',
      videoChannel: 'Dan Koe',
    },
    prompt: {
      promptId: 'blog-post-structure',
      framing: 'Structure a post teaching the most useful thing you know — the thing people always ask you about. Knowledge unshared is knowledge on standby.',
    },
    mindConcept: {
      title: 'Self-forgetting is the most human act',
      body: 'Frankl\'s observation cuts against the entire self-improvement aisle: we become most ourselves when we forget ourselves — absorbed in a cause to serve or a person to love. The saints knew this; the psychiatrist proved it in the camps. Service isn\'t the detour from your aim. Done right, it is the aim.',
      bookSlug: 'mans-search-for-meaning',
      quoteIndex: 7,
    },
    goodDeed: {
      title: 'Teach one thing from the quest',
      body: 'Show someone one thing this quest gave you — a prompt technique, an idea, the trash-bag walk. Teaching is the deed and the proof of learning, in one move.',
      effort: 'ten-minutes',
    },
  },
  {
    day: 29,
    chapterId: 'two-minds',
    title: 'Strengthen the home network',
    mindStretch: {
      title: 'A long conversation between two sharp minds',
      body: 'Karpathy and Fridman for hours: ideas built, challenged, and improved in real time. This is the mastermind in its natural habitat — long-form conversation. Notice how different it is from exchanging takes.',
      videoId: 'cdiD-9MMpb0',
      videoTitle: 'Andrej Karpathy: Tesla AI, Self-Driving, AGI',
      videoChannel: 'Lex Fridman',
    },
    prompt: {
      promptId: 'family-ai-coe-setup',
      framing: 'Set up an AI system your family actually uses — homework help, planning, the questions nobody wants to google. Your first mastermind was issued at birth; give it tools.',
    },
    mindConcept: {
      title: 'Love the people fate dealt you',
      body: 'Marcus Aurelius, surrounded by senators he couldn\'t choose and family he couldn\'t change, set the only workable policy: accept what fate binds you to, and love the people it brings — with the whole heart, not the spare one. Two thousand years later there is still no better advice about home.',
      bookSlug: 'meditations',
      quoteIndex: 12,
    },
    goodDeed: {
      title: 'Call someone older, ask for a story',
      body: 'Phone — not text — a parent, grandparent, or elder. Ask one question: "What\'s a story I\'ve never heard?" Then just listen. These calls are finite; the stories don\'t keep.',
      effort: 'ten-minutes',
    },
  },
  {
    day: 30,
    chapterId: 'two-minds',
    title: 'Close the loop, start again',
    mindStretch: {
      title: 'Where this is all going',
      body: 'Altman on the trajectory of AI — the tools you\'ve been learning for thirty days are the earliest versions you\'ll ever use again. You\'re not late. You\'re absurdly early. Plan like it.',
      videoId: 'jvqFAi7vkBc',
      videoTitle: 'Sam Altman: OpenAI, GPT-5, Sora, Power & AGI',
      videoChannel: 'Lex Fridman',
    },
    prompt: {
      promptId: 'ai-coe-maturity-assessment',
      framing: 'Assess the system you\'ve built this month — aim, beliefs, defaults, persistence, allies. Score it honestly, then let AI help you plan cycle two.',
    },
    mindConcept: {
      title: 'Master of the inputs, therefore of the destiny',
      body: 'Hill\'s closing claim earns its size by now: you\'ve spent thirty days proving you can choose the aim, train the belief, run the simulator, install the defaults, continue past the quit signal, and multiply through others. "Master of your destiny" is just the compound interest on those six choices, repeated.',
      bookSlug: 'think-and-grow-rich',
      quoteIndex: 4,
    },
    goodDeed: {
      title: 'Pass the torch',
      body: 'Challenge one more person to start the quest at day 1 — send them frankx.ai/dare with a sentence about what it did for you. The mastermind grows one invitation at a time.',
      effort: 'two-minutes',
    },
  },
]
