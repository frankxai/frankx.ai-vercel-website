export type YouTubeChannel = {
  key: string
  name: string
  url: string
  purpose: string
}

export const youtubeChannels = {
  frankx: {
    key: 'frankx',
    name: 'FrankX',
    url: 'https://youtube.com/@frankxai',
    purpose: 'Primary FrankX channel',
  },
  anthropic: {
    key: 'anthropic',
    name: 'Anthropic',
    url: 'https://youtube.com/@anthropic-ai',
    purpose: 'Official Claude and Anthropic updates',
  },
  netNinja: {
    key: 'netNinja',
    name: 'Net Ninja',
    url: 'https://youtube.com/@NetNinja',
    purpose: 'Developer tutorials',
  },
  kevinStratvert: {
    key: 'kevinStratvert',
    name: 'Kevin Stratvert',
    url: 'https://youtube.com/@KevinStratvert',
    purpose: 'AI productivity tutorials',
  },
  lexFridman: {
    key: 'lexFridman',
    name: 'Lex Fridman',
    url: 'https://youtube.com/@lexfridman',
    purpose: 'Long-form AI interviews',
  },
  oracleCloudInfrastructure: {
    key: 'oracleCloudInfrastructure',
    name: 'Oracle Cloud Infrastructure',
    url: 'https://youtube.com/@OracleCloudInfrastructure',
    purpose: 'Official Oracle Cloud technical channel',
  },
} as const satisfies Record<string, YouTubeChannel>

export const youtubeEmbedSurfaces = [
  {
    surface: '/learn',
    intent: 'Curated learning paths and featured creators',
    channels: ['anthropic', 'netNinja', 'kevinStratvert', 'lexFridman'],
  },
  {
    surface: '/ai-architecture/multi-cloud-comparison',
    intent: 'Oracle cloud demo and architecture videos',
    channels: ['oracleCloudInfrastructure'],
  },
  {
    surface: '/about',
    intent: 'Primary FrankX channel reference',
    channels: ['frankx'],
  },
] as const

