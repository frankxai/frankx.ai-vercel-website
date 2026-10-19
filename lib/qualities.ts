export const qualitySlugs = ['freedom', 'mastery', 'meaning', 'connection'] as const

export type QualitySlug = (typeof qualitySlugs)[number]

export type QualityLink = {
  title: string
  href: string
  note: string
  kind: 'Research' | 'Essay' | 'Book chapter' | 'Build'
}

export type Quality = {
  slug: QualitySlug
  number: string
  name: string
  role: string
  shortRole: string
  axiom: string
  thesis: string
  definition: string
  origin: string
  practice: string[]
  decisionQuestions: string[]
  shadow: string
  ambition: string
  image: string
  imageAlt: string
  accent: 'emerald' | 'cyan' | 'amber' | 'sky'
  researchQuestion: string
  evidence: QualityLink[]
}

export const qualities: Quality[] = [
  {
    slug: 'freedom',
    number: '01',
    name: 'Freedom',
    role: 'The direction',
    shortRole: 'Direction',
    axiom: 'Freedom is the point of the system.',
    thesis:
      'I build for greater command of time, place, attention, and direction — and for systems that increase that agency for other people.',
    definition:
      'Freedom, for me, is not the absence of commitments. It is the power to choose the right ones. It means being able to move through time, space, mind, and inner life without handing the steering wheel to inherited fear, default work, or somebody else\'s system. It also means building conditions in which other people can direct more of their own lives.',
    origin:
      'I have always resisted structures that make a person smaller. That instinct became a design criterion: if a business, technology, or routine gives me more output but less agency, it is not progress. The work must create room to think, to move, to make, and to become more fully myself.',
    practice: [
      'Design businesses that are not prisons for their founders.',
      'Use automation to return attention and choice, not to create a new dependency.',
      'Build portable skills, assets, and systems that preserve optionality.',
      'Treat another person\'s agency as a product requirement, not a marketing promise.',
    ],
    decisionQuestions: [
      'Does this give people more real agency or only the feeling of control?',
      'What new dependency does this choice create?',
      'Will this still expand my life after the initial excitement passes?',
    ],
    shadow: 'Freedom without responsibility becomes escape. The test is not whether I can leave; it is whether I can choose, commit, and remain able to change course.',
    ambition:
      'I want to keep building companies, tools, and personal operating systems that let more people own their time, knowledge, creative leverage, and direction — while helping move our species toward greater capability without greater submission.',
    image: '/images/qualities/freedom.webp',
    imageAlt: 'A dark workshop opening onto a wide ocean horizon at first light',
    accent: 'sky',
    researchQuestion:
      'Which forms of AI and economic leverage measurably increase human agency — and which merely relocate dependence?',
    evidence: [
      {
        title: 'What You Own',
        href: '/books/great-transition/chapter-05-what-you-own',
        note: 'A chapter about ownership as durable agency when platforms, jobs, and markets change.',
        kind: 'Book chapter',
      },
      {
        title: 'The Great Transition: Build Your Own Business',
        href: '/blog/the-great-transition-build-your-own-business',
        note: 'The practical argument for moving from rented certainty toward self-directed work.',
        kind: 'Essay',
      },
      {
        title: 'Creator Economy & AI',
        href: '/research/creator-economy-ai',
        note: 'The live research domain tracking how AI changes creator leverage, ownership, and dependency.',
        kind: 'Research',
      },
    ],
  },
  {
    slug: 'mastery',
    number: '02',
    name: 'Mastery',
    role: 'The method',
    shortRole: 'Method',
    axiom: 'Skill is the asset no one can take from you.',
    thesis:
      'Tools change and titles disappear. The ability to see, practice, judge, and make survives.',
    definition:
      'Mastery is a lifetime relationship with quality. It is the slow construction of judgment: knowing what good looks like, noticing what is weak, and staying with the work long enough to close the distance. I do not see mastery as a medal. I see it as a practice that keeps moving as the craft moves.',
    origin:
      'I grew up beside my father on construction sites. He was a master craftsman and builder. Across hours, weeks, months, and years, I watched the work make its own demands: measure carefully, understand the material, make it sturdy, leave it better. My materials are now AI systems, software, words, music, workshops, communities, brands, businesses, body, and relationships. The standard did not change.',
    practice: [
      'Accumulate repetitions, then study the difference between volume and progress.',
      'Build taste and judgment alongside technical capability.',
      'Ship enough real work for reality to correct the theory.',
      'Carry craft across disciplines without pretending the apprenticeship is finished.',
    ],
    decisionQuestions: [
      'What part of this work requires judgment rather than more tools?',
      'Am I practicing the hard part or repeating the comfortable part?',
      'What would make this sturdy enough for someone else to rely on?',
    ],
    shadow: 'Mastery without freedom becomes servitude to the standard. Perfectionism can make quality an excuse never to finish.',
    ambition:
      'I intend to keep becoming more capable across AI, music, writing, communication, speaking, workshops, communities, brands, businesses, health, and relationship — not to collect identities, but to build an unusually broad and dependable instrument for meaningful work.',
    image: '/images/qualities/mastery.webp',
    imageAlt: 'Experienced and younger hands measuring a precise timber joint together',
    accent: 'cyan',
    researchQuestion:
      'How does human mastery change when AI compresses execution — and which forms of practice still build durable judgment?',
    evidence: [
      {
        title: 'Craft',
        href: '/books/self-development/chapter-04-craft',
        note: 'The book chapter where skill, standards, and repeated construction become a way of life.',
        kind: 'Book chapter',
      },
      {
        title: 'The Creator\'s Life Architecture',
        href: '/blog/creators-life-architecture-guide',
        note: 'A whole-life system for practicing across work, body, relationships, and direction.',
        kind: 'Essay',
      },
      {
        title: '12,000 Songs: Production Lessons',
        href: '/blog/suno-ai-12000-songs-production-lessons',
        note: 'A field report on what high-volume creative practice teaches that theory cannot.',
        kind: 'Essay',
      },
    ],
  },
  {
    slug: 'meaning',
    number: '03',
    name: 'Meaning',
    role: 'The compass',
    shortRole: 'Compass',
    axiom: 'A working system still needs a worthy direction.',
    thesis:
      'Meaning decides which problems deserve years, how I interpret what happens, and what the work asks people to become.',
    definition:
      'Meaning is the connection between effort and what is worth serving. I have never been satisfied by work that succeeds economically and fails existentially. Money matters because it sustains choice and action; it cannot be the only answer to why a life, company, book, or system should consume our finite attention.',
    origin:
      'Growing up, I often felt the tension between making money and making something matter. I kept asking why: why this work, why this way, why now, and who does it help us become? That search runs through the questions of purpose, ikigai, “start with why,” relevance, perception, and the stories through which people organize reality.',
    practice: [
      'Name the human consequence before optimizing the mechanism.',
      'Connect goals to values, memory, attention, relationships, and action.',
      'Separate personal conviction from claims that require external evidence.',
      'Choose work that can remain worth doing after novelty and applause fade.',
    ],
    decisionQuestions: [
      'If this succeeds, what changes in a human life?',
      'Would I still care about this without the status attached to it?',
      'What evidence would show that the stated purpose is present in the actual work?',
    ],
    shadow: 'Meaning without action becomes abstraction. A beautiful explanation is not yet a useful life.',
    ambition:
      'I will keep developing Meaning OS as both a personal discipline and an AI architecture question: how systems can help people realize what matters without pretending to decide it for them.',
    image: '/images/qualities/meaning.webp',
    imageAlt: 'Manuscript pages, plans, and a circuit board joined by one warm thread',
    accent: 'amber',
    researchQuestion:
      'Can AI support relevance, coherence, and wise action without replacing human judgment about what matters?',
    evidence: [
      {
        title: 'Meaning as an Operating System',
        href: '/research/meaning-os',
        note: 'The source-led research program on relevance realization, coherence, and AI architecture.',
        kind: 'Research',
      },
      {
        title: 'Meaning as an Operating System',
        href: '/blog/meaning-as-operating-system',
        note: 'The editorial argument for organizing goals, values, attention, and action around coherence.',
        kind: 'Essay',
      },
      {
        title: 'Soul',
        href: '/books/self-development/chapter-03-soul',
        note: 'A chapter about recovering an inner criterion for what deserves a life.',
        kind: 'Book chapter',
      },
    ],
  },
  {
    slug: 'connection',
    number: '04',
    name: 'Connection',
    role: 'The multiplier',
    shortRole: 'Multiplier',
    axiom: 'Capability compounds between people.',
    thesis:
      'I love connecting the people, ideas, disciplines, and systems that belong together — then helping them make something none could make alone.',
    definition:
      'Connection is not reach, follower count, or a room full of contacts. It is the quality of relation and what becomes possible because that relation exists. At its best, connection creates trust, coherence, shared courage, and a third intelligence that does not belong to either person alone.',
    origin:
      'Again and again, I find myself introducing people, translating between worlds, convening a room, or spotting the missing relationship between ideas. Sometimes the thing I make is not an object at all. It is the room in which other people can make something together.',
    practice: [
      'Connect people around a real possibility, not vague networking.',
      'Translate between technology, creativity, business, and human experience.',
      'Build rooms where contribution is legible and trust has a structure.',
      'Protect boundaries so connection remains chosen, honest, and generative.',
    ],
    decisionQuestions: [
      'What becomes possible together that is impossible alone?',
      'Does this relationship increase honesty and agency for everyone involved?',
      'What boundary would make this connection more trustworthy?',
    ],
    shadow: 'Connection without boundaries becomes self-erasure or consensus. Unity that requires sameness is not unity.',
    ambition:
      'I want to build communities, workshops, partnerships, books, and agentic systems that make cooperation more coherent — joining human and machine capability without reducing the dignity or distinctiveness of either person.',
    image: '/images/qualities/connection.webp',
    imageAlt: 'Five makers combining books, timber, music, and systems around an Amsterdam studio table',
    accent: 'emerald',
    researchQuestion:
      'Which structures help groups and human–AI systems build trust, shared understanding, and genuinely collective intelligence?',
    evidence: [
      {
        title: 'The Third Mind',
        href: '/books/the-wordless-laws-book-two/the-third-mind',
        note: 'A chapter about the intelligence that can emerge in a relationship between minds.',
        kind: 'Book chapter',
      },
      {
        title: 'Coherence Is an Engineering Property',
        href: '/blog/coherence-is-an-engineering-property',
        note: 'An essay on designing systems whose parts can actually work together.',
        kind: 'Essay',
      },
      {
        title: 'What Is a GenCreator?',
        href: '/blog/what-is-a-gencreator',
        note: 'The public invitation to create across disciplines and share the capability with others.',
        kind: 'Essay',
      },
    ],
  },
]

export const qualitiesBySlug = Object.fromEntries(
  qualities.map((quality) => [quality.slug, quality]),
) as Record<QualitySlug, Quality>

export function getQuality(slug: string): Quality | undefined {
  return qualities.find((quality) => quality.slug === slug)
}

export function getQualitiesForHref(href: string): Quality[] {
  return qualities.filter((quality) => quality.evidence.some((item) => item.href === href))
}

export const qualitySystem = [
  { name: 'Freedom', role: 'sets the direction', detail: 'the open space the structure is built to protect' },
  { name: 'Mastery', role: 'makes it stand', detail: 'the material knowledge, tolerance, and repetition' },
  { name: 'Meaning', role: 'chooses the plan', detail: 'the reason this structure should exist at all' },
  { name: 'Connection', role: 'holds it together', detail: 'the joinery between people, parts, and possibilities' },
] as const

export const qualityReflectionPrompts = [
  'What do you want more freedom to choose?',
  'What craft are you willing to practice for years?',
  'What deserves that effort?',
  'Who or what must become connected for it to exist?',
] as const
