import { visionaries, type VisionaryPerson } from '@/lib/research/visionaries'

export type PeopleGroupKey =
  | 'entrepreneurs'
  | 'builders'
  | 'content-creators'
  | 'inventors'
  | 'researcher'
  | 'professors'
  | 'doctors'
  | 'investors'
  | 'designers'
  | 'producers'

export interface PeopleGroup {
  key: PeopleGroupKey
  slug: string
  title: string
  shortLabel: string
  description: string
  color: 'cyan' | 'indigo' | 'amber' | 'rose' | 'fuchsia' | 'emerald'
}

export const peopleGroups: PeopleGroup[] = [
  {
    key: 'entrepreneurs',
    slug: 'entrepreneurs',
    title: 'Entrepreneurs',
    shortLabel: 'Entrepreneurs',
    description: 'Founders and business builders turning ideas into durable companies.',
    color: 'amber',
  },
  {
    key: 'builders',
    slug: 'builders',
    title: 'Builders',
    shortLabel: 'Builders',
    description: 'Engineers and operators known for shipping real systems and tools.',
    color: 'indigo',
  },
  {
    key: 'content-creators',
    slug: 'content-creators',
    title: 'Content Creators',
    shortLabel: 'Creators',
    description: 'Educators and media creators who turn knowledge into repeatable distribution.',
    color: 'rose',
  },
  {
    key: 'inventors',
    slug: 'inventors',
    title: 'Inventors',
    shortLabel: 'Inventors',
    description: 'Pioneers who introduced new paradigms, methods, or products.',
    color: 'fuchsia',
  },
  {
    key: 'researcher',
    slug: 'researcher',
    title: 'Researchers',
    shortLabel: 'Researchers',
    description: 'Research leaders moving the frontier with evidence and rigorous experimentation.',
    color: 'cyan',
  },
  {
    key: 'professors',
    slug: 'professors',
    title: 'Professors',
    shortLabel: 'Professors',
    description: 'Academic teachers and lab leaders translating theory into practical frameworks.',
    color: 'emerald',
  },
  {
    key: 'doctors',
    slug: 'doctors',
    title: 'Doctors',
    shortLabel: 'Doctors',
    description: 'Doctoral-level thinkers and psychologists shaping evidence-based human performance.',
    color: 'emerald',
  },
  {
    key: 'investors',
    slug: 'investors',
    title: 'Investors',
    shortLabel: 'Investors',
    description: 'Capital allocators and strategic thinkers with long-game decision quality.',
    color: 'amber',
  },
  {
    key: 'designers',
    slug: 'designers',
    title: 'Designers',
    shortLabel: 'Designers',
    description: 'Design leaders proving how taste, interface, and clarity become leverage.',
    color: 'fuchsia',
  },
  {
    key: 'producers',
    slug: 'producers',
    title: 'Producers',
    shortLabel: 'Producers',
    description: 'Music producers and creative directors with world-class output systems.',
    color: 'rose',
  },
]

const groupKeywords: Record<PeopleGroupKey, string[]> = {
  entrepreneurs: ['founder', 'cofounder', 'ceo', 'entrepreneur', 'operator'],
  builders: ['engineer', 'builder', 'toolmaker', 'open source', 'creator of', 'systems engineer'],
  'content-creators': ['creator', 'writer', 'educator', 'podcaster', 'interviewer', 'author'],
  inventors: ['inventor', 'pioneer', 'creator of', 'technologist', 'iconographer'],
  researcher: ['researcher', 'research scientist', 'scientist', 'research lead', 'research engineer'],
  professors: ['professor'],
  doctors: ['psychologist', 'clinical', 'nobel laureate'],
  investors: ['investor', 'capital allocator'],
  designers: ['designer', 'design', 'iconographer', 'interface'],
  producers: ['producer', 'composer', 'songwriter', 'music creator', 'creative director', 'arranger'],
}

const groupManualAdds: Record<PeopleGroupKey, string[]> = {
  entrepreneurs: [
    'guillermo-rauch',
    'harrison-chase',
    'aidan-gomez',
    'nathan-barry',
    'sahil-lavingia',
    'justin-welsh',
    'alex-hormozi',
    'tobias-van-schneider',
    'pharrell-williams',
  ],
  builders: [
    'simon-willison',
    'theo-browne',
    'dan-abramov',
    'evan-you',
    'rich-harris',
    'armin-ronacher',
    'tj-holowaychuk',
    'kelsey-hightower',
    'paco-coursey',
    'rauno-freiberg',
    'bret-victor',
  ],
  'content-creators': [
    'ali-abdaal',
    'dan-koe',
    'david-perell',
    'pat-flynn',
    'tim-ferriss',
    'lenny-rachitsky',
    'jay-clouse',
    'andrew-huang',
    'wes-bos',
    'kent-c-dodds',
  ],
  inventors: [
    'geoffrey-hinton',
    'richard-sutton',
    'bret-victor',
    'suzanne-ciani',
    'imogen-heap',
    'don-norman',
    'susan-kare',
    'refik-anadol',
  ],
  researcher: [
    'andrej-karpathy',
    'fei-fei-li',
    'demis-hassabis',
    'dario-amodei',
    'ilya-sutskever',
    'yann-lecun',
    'geoffrey-hinton',
    'yoshua-bengio',
    'richard-sutton',
    'david-silver',
    'noam-brown',
    'sebastian-bubeck',
    'carol-dweck',
    'angela-duckworth',
    'bj-fogg',
    'daniel-kahneman',
    'adam-grant',
  ],
  professors: ['fei-fei-li', 'percy-liang', 'chelsea-finn', 'stuart-russell', 'cal-newport'],
  doctors: [
    'carol-dweck',
    'angela-duckworth',
    'daniel-kahneman',
    'adam-grant',
    'mihaly-csikszentmihalyi',
    'geoffrey-hinton',
    'yoshua-bengio',
    'fei-fei-li',
  ],
  investors: ['naval-ravikant', 'charlie-munger', 'warren-buffett', 'ray-dalio', 'annie-duke'],
  designers: [
    'jony-ive',
    'dieter-rams',
    'don-norman',
    'susan-kare',
    'paula-scher',
    'john-maeda',
    'julie-zhuo',
    'ryan-singer',
    'rauno-freiberg',
    'paco-coursey',
    'tobias-van-schneider',
    'jessica-walsh',
    'khoi-vinh',
  ],
  producers: [
    'brian-eno',
    'rick-rubin',
    'hans-zimmer',
    'trent-reznor',
    'finneas-oconnell',
    'quincy-jones',
    'nile-rodgers',
    'ar-rahman',
    'andrew-huang',
  ],
}

const groupManualRemoves: Partial<Record<PeopleGroupKey, string[]>> = {
  doctors: ['peter-drucker'],
}

function inText(person: VisionaryPerson, keyword: string): boolean {
  const text = `${person.role} ${person.builds} ${person.why}`.toLowerCase()
  return text.includes(keyword)
}

function matchesByKeyword(person: VisionaryPerson, key: PeopleGroupKey): boolean {
  return groupKeywords[key].some((keyword) => inText(person, keyword))
}

function sortPeople(a: VisionaryPerson, b: VisionaryPerson): number {
  const aRank = a.top10Rank ?? 999
  const bRank = b.top10Rank ?? 999

  if (aRank !== bRank) {
    return aRank - bRank
  }

  return a.name.localeCompare(b.name)
}

export function getPeopleGroup(key: PeopleGroupKey): PeopleGroup {
  const group = peopleGroups.find((entry) => entry.key === key)

  if (!group) {
    throw new Error(`Unknown people group: ${key}`)
  }

  return group
}

export function getPeopleForGroup(key: PeopleGroupKey): VisionaryPerson[] {
  const manualAdd = new Set(groupManualAdds[key] ?? [])
  const manualRemove = new Set(groupManualRemoves[key] ?? [])

  return visionaries
    .filter((person) => {
      const matched = manualAdd.has(person.id) || matchesByKeyword(person, key)
      return matched && !manualRemove.has(person.id)
    })
    .sort(sortPeople)
}

export function getPeopleGroupLinks() {
  return peopleGroups.map((group) => ({
    ...group,
    count: getPeopleForGroup(group.key).length,
    href: `/research/${group.slug}`,
  }))
}
