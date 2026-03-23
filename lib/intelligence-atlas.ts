export type AtlasVolume = {
  number: number
  title: string
  status: string
  release: string
  summary: string
  href: string
  wordCount: string
}

export type AtlasMetric = {
  value: string
  label: string
  detail: string
}

export type AtlasAction = {
  title: string
  description: string
  href: string
  label: string
}

export const atlasVolumes: AtlasVolume[] = [
  {
    number: 1,
    title: 'Volume I — Architecting the Agentic Era',
    status: 'Published',
    release: 'January 2025',
    summary:
      '10,000-word field report on the 2025 intelligence landscape, the frontier of agentic systems, and the frameworks powering FrankX creators.',
    href: '/blog/frankx-intelligence-atlas-volume-1',
    wordCount: '10,000 words',
  },
  {
    number: 2,
    title: 'Volume II — Designing Multi-Agent Creative Studios',
    status: 'In Draft',
    release: 'February 2025',
    summary:
      'Deep practice for orchestrating swarms of creative and operational agents across music, narrative, and community programs.',
    href: '',
    wordCount: '10,000 words',
  },
  {
    number: 3,
    title: 'Volume III — Revenue Engines for Intelligence Products',
    status: 'Research Sprint',
    release: 'March 2025',
    summary:
      'Monetization archetypes, pricing ladders, and distribution rituals for agent-enhanced product ecosystems.',
    href: '',
    wordCount: '10,000 words',
  },
  {
    number: 4,
    title: 'Volume IV — Conscious AI for Families & Education',
    status: 'Planned',
    release: 'April 2025',
    summary:
      'Safety rituals, pedagogy frameworks, and shared language to bring households and classrooms into the intelligence era.',
    href: '',
    wordCount: '10,000 words',
  },
  {
    number: 5,
    title: 'Volume V — Enterprise Architectures & Governance',
    status: 'Planned',
    release: 'May 2025',
    summary:
      'Blueprints for enterprise alignment: risk controls, regulatory readiness, and cultural adoption at scale.',
    href: '',
    wordCount: '10,000 words',
  },
  {
    number: 6,
    title: 'Volume VI — Intelligence-Driven Music & Media',
    status: 'Planned',
    release: 'June 2025',
    summary:
      'New rituals for composing with Suno, video synthesis, and live performance companions that keep the artist at the center.',
    href: '',
    wordCount: '10,000 words',
  },
  {
    number: 7,
    title: 'Volume VII — Infrastructure, Compute, and Sustainability',
    status: 'Planned',
    release: 'July 2025',
    summary:
      'Supply chain intelligence, energy-aware architectures, and the road to responsible hyperscale compute.',
    href: '',
    wordCount: '10,000 words',
  },
  {
    number: 8,
    title: 'Volume VIII — Community, Distribution & Ecosystems',
    status: 'Planned',
    release: 'August 2025',
    summary:
      'Partner playbooks, community runbooks, and experience design that keep the intelligence movement human.',
    href: '',
    wordCount: '10,000 words',
  },
  {
    number: 9,
    title: 'Volume IX — Capital, Investment & Economic Impact',
    status: 'Planned',
    release: 'September 2025',
    summary:
      'Funding maps, corporate venture trends, and the new balance sheets for intelligence-first companies.',
    href: '',
    wordCount: '10,000 words',
  },
  {
    number: 10,
    title: 'Volume X — Futures, Ethics & Planetary Intelligence',
    status: 'Planned',
    release: 'October 2025',
    summary:
      'Signals beyond the horizon: alignment breakthroughs, civic intelligence, and long-term stewardship of AI.',
    href: '',
    wordCount: '10,000 words',
  },
]

export const atlasMetrics: AtlasMetric[] = [
  {
    value: '100,000+',
    label: 'Words of field intelligence',
    detail: 'Ten volumes synthesizing research, experiments, and operator playbooks.',
  },
  {
    value: '45',
    label: 'Frameworks & canvases',
    detail: 'Actionable models to deploy across product, community, and enterprise motions.',
  },
  {
    value: '9',
    label: 'Futures still to publish',
    detail: 'Each volume expands the atlas with creator-first intelligence rituals.',
  },
]

export const atlasActions: AtlasAction[] = [
  {
    title: 'Dive into Volume I',
    description: 'Read the 10,000-word architecting the agentic era report and deploy the included frameworks.',
    href: '/blog/frankx-intelligence-atlas-volume-1',
    label: 'Published January 2025',
  },
  {
    title: 'Track the 2025 roadmap',
    description: 'Map your initiatives to the release cadence for Volumes II–X and reserve collaboration slots.',
    href: '/intelligence-atlas#roadmap',
    label: 'Monthly drops',
  },
  {
    title: 'Contribute field research',
    description: 'Share telemetry, case studies, and governance practices to inform future atlas updates.',
    href: 'mailto:hello@frankx.ai?subject=FrankX%20Intelligence%20Atlas%20Contribution',
    label: 'Partner with FrankX',
  },
]
