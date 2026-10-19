export const TALLINN_STUDIO_EVENT = {
  city: 'Tallinn, Estonia',
  dates: '20 July–2 August 2026',
  officialName: 'Mindvalley U 2026',
  officialUrl: 'https://www.mindvalley.com/u',
  officialFaqUrl: 'https://www.mindvalley.com/u/faq',
  officialHeroImage:
    'https://a.storyblok.com/f/60579/1920x1080/5eaf944304/1a_fbshare_invite_1920x1080.jpg',
  officialCommunityImage:
    'https://a.storyblok.com/f/60579/1176x880/d5a0662b15/04-01-mvu.webp',
  independenceNotice:
    'An independent FrankX companion concept for people gathering in Tallinn. Not organized, sponsored, or endorsed by Mindvalley.',
} as const

export const TALLINN_AMPLIFIER_ROLES = [
  {
    id: 'speaker',
    label: 'Speaker',
    note: 'You already have the idea. Make it useful beyond the stage.',
    before: 'Sharpen the promise, audience, and one idea the room should carry.',
    inRoom: 'Add one participation moment and a consent-safe way to capture the room’s strongest questions.',
    after: 'Package the talk into a source-aware recap, action card, and clear continuation path.',
  },
  {
    id: 'coach',
    label: 'Coach',
    note: 'Turn a method into a practice people can keep using.',
    before: 'Translate the method into one clear practice map and an honest boundary.',
    inRoom: 'Pair reflection with one visible decision or behavior the participant owns.',
    after: 'Return a participant-owned practice card and an optional, consent-based check-in.',
  },
  {
    id: 'tribe-host',
    label: 'Tribe host',
    note: 'Design the room around connection with a point.',
    before: 'Frame who the room is for, why it matters now, and what people will make together.',
    inRoom: 'Use structured introductions and one shared working artifact instead of open-ended networking.',
    after: 'Publish the resource page, the room’s open questions, and one next conversation.',
  },
  {
    id: 'venue',
    label: 'Venue host',
    note: 'Offer a room that supports the work, not just the headcount.',
    before: 'Match the room, access, timing, and equipment to a format with a clear outcome.',
    inRoom: 'Support arrival, sightlines, sound, accessibility, and a calm participant flow.',
    after: 'Give the host a reusable runbook and make the next room easier to evaluate.',
  },
  {
    id: 'attendee',
    label: 'Attendee',
    note: 'Propose the small working room you wish existed.',
    before: 'Name one outcome, one useful question, and the people who should be in the room.',
    inRoom: 'Facilitate peer work around one small artifact rather than another panel conversation.',
    after: 'Share the template and leave continuation optional, specific, and easy to decline.',
  },
] as const

export type TallinnAmplifierRole = (typeof TALLINN_AMPLIFIER_ROLES)[number]['id']

export const TALLINN_AMPLIFIER_OUTCOMES = [
  {
    id: 'sharper-room',
    label: 'A sharper room',
    note: 'The promise, audience, and participation design fit together.',
    artifact: 'A one-page session spine',
  },
  {
    id: 'participant-artifact',
    label: 'A participant artifact',
    note: 'People leave with something they made, not only notes they took.',
    artifact: 'A participant-owned working map',
  },
  {
    id: 'useful-follow-through',
    label: 'Useful follow-through',
    note: 'The strongest ideas and sources survive the room without trapping anyone in a funnel.',
    artifact: 'A resource page and optional continuation',
  },
  {
    id: 'new-workshop',
    label: 'A new workshop',
    note: 'Turn the idea into a small, testable format before scaling it.',
    artifact: 'A 90-minute pilot brief',
  },
] as const

export type TallinnAmplifierOutcome = (typeof TALLINN_AMPLIFIER_OUTCOMES)[number]['id']

export const TALLINN_COLLABORATION_PATHS = [
  {
    title: 'Amplify an existing session',
    body: 'Keep the speaker’s method intact. Add a stronger frame, participant artifact, consent boundary, and useful afterlife.',
    forWhom: 'Speakers, trainers, coaches',
    role: 'speaker' as const,
    outcome: 'participant-artifact' as const,
  },
  {
    title: 'Shape a small tribe room',
    body: 'Design a focused working room around one question, one shared artifact, and one next conversation.',
    forWhom: 'Community and tribe leads',
    role: 'tribe-host' as const,
    outcome: 'sharper-room' as const,
  },
  {
    title: 'Host the right kind of room',
    body: 'Offer a venue, studio, salon, or meeting space and match it to a format that respects the room’s real constraints.',
    forWhom: 'Venues and local hosts',
    role: 'venue' as const,
    outcome: 'new-workshop' as const,
  },
  {
    title: 'Propose an attendee-led lab',
    body: 'Bring the question you want to work on with peers. Frank can help turn it into a useful, bounded micro-session.',
    forWhom: 'Attendees and builders',
    role: 'attendee' as const,
    outcome: 'useful-follow-through' as const,
  },
] as const

export const TALLINN_PUBLIC_FORMATS = [
  {
    slug: 'purpose-to-practice',
    title: 'Purpose to Practice',
    eyebrow: 'Proven foundation',
    promise: 'Turn what matters now into one small weekly practice and a 30-day experiment.',
    artifact: 'Purpose-to-practice map',
    fit: 'Creators and professionals reshaping their next chapter',
    status: 'Built from Frank’s Ikigai & Branding work',
    accent: 'amber' as const,
    sourceHref: '/workshops/ikigai-branding',
    sourceLabel: 'Explore Ikigai & Branding',
    steps: [
      'Name the real signals: meaning, demonstrated strengths, useful contribution, and this season’s limits.',
      'Write one purpose-to-practice sentence with an honest trade-off.',
      'Design a small human + AI practice with boundaries and a dated review.',
    ],
  },
  {
    slug: 'speaker-session-amplifier',
    title: 'Speaker Session Amplifier',
    eyebrow: 'Studio format',
    promise: 'Turn an existing talk, class, or coaching method into a room people can use after they leave.',
    artifact: 'Session spine, participant artifact, and resource page',
    fit: 'Speakers, coaches, trainers, and program hosts',
    status: 'Available to shape around your method',
    accent: 'cyan' as const,
    sourceHref: '/workshops',
    sourceLabel: 'Explore the workshop studio',
    steps: [
      'Protect the speaker’s core method and name the one change the room should support.',
      'Add one participant-owned artifact and one consent-safe signal from the room.',
      'Package the sources, questions, and next move without creating a forced funnel.',
    ],
  },
  {
    slug: 'agentic-builder-lab',
    title: 'Build Your First AI Agent',
    eyebrow: 'Studio format',
    promise: 'Build one working agent around a real task, then make its tools, boundaries, and evaluation visible.',
    artifact: 'A working agent and three-case evaluation sheet',
    fit: 'Creators, founders, technical professionals, and curious builders',
    status: 'Workshop architecture ready; live format to be tailored',
    accent: 'emerald' as const,
    sourceHref: '/workshops/build-first-ai-agent',
    sourceLabel: 'Explore the AI Agent workshop',
    steps: [
      'Choose one small task and define what the agent may and may not do.',
      'Connect a model, one tool, and a visible loop around the task.',
      'Test success, edge behavior, and refusal before sharing the result.',
    ],
  },
  {
    slug: 'ai-music-creation-lab',
    title: 'AI Music Creation Lab',
    eyebrow: 'Studio format',
    promise: 'Move from a musical idea to one finished track while learning the prompt, iteration, and release decisions behind it.',
    artifact: 'One original track and a reusable creation recipe',
    fit: 'Creators, musicians, storytellers, and curious first-timers',
    status: 'Built from Frank’s 12,000+ song practice; live format to be shaped',
    accent: 'amber' as const,
    sourceHref: '/music',
    sourceLabel: 'Explore FrankX Music',
    steps: [
      'Translate a feeling or story into a precise musical brief.',
      'Generate, compare, and refine with deliberate structure and taste.',
      'Finish one track and document the creative decisions worth reusing.',
    ],
  },
] as const

export type TallinnPublicFormat = (typeof TALLINN_PUBLIC_FORMATS)[number]

export const TALLINN_LEGACY_FORMAT_ALIASES: Record<string, TallinnPublicFormat['slug']> = {
  'agentic-creator-studio': 'speaker-session-amplifier',
  'build-your-agentic-team': 'agentic-builder-lab',
  'human-agent-team-charter': 'agentic-builder-lab',
  'founder-integration-salon': 'speaker-session-amplifier',
  'purpose-without-performance': 'purpose-to-practice',
  'voice-before-volume': 'speaker-session-amplifier',
  'personal-ai-coe-one-page': 'agentic-builder-lab',
  'role-clarity-agent-era': 'speaker-session-amplifier',
  'calm-work-architecture': 'purpose-to-practice',
}

export const TALLINN_PUBLIC_ROUTE_SLUGS = [
  ...TALLINN_PUBLIC_FORMATS.map((format) => format.slug),
  ...Object.keys(TALLINN_LEGACY_FORMAT_ALIASES),
]

export function getTallinnPublicFormat(slug: string) {
  const canonicalSlug = TALLINN_LEGACY_FORMAT_ALIASES[slug] ?? slug
  return TALLINN_PUBLIC_FORMATS.find((format) => format.slug === canonicalSlug)
}
