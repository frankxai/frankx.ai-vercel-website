export type MascotMood =
  | 'waving'
  | 'thinking'
  | 'celebrating'
  | 'pointing'
  | 'chill'
  | 'chibi'
  | 'hero'

export type StreamId =
  | 'creation-chronicles'
  | 'ai-architect'
  | 'music-lab'
  | 'arcanea'
  | 'investor'
  | 'inner-circle'

export type BlockType =
  | 'intro'
  | 'section'
  | 'pullquote'
  | 'list'
  | 'code'
  | 'cta'
  | 'aside'
  | 'signoff'

export interface Block {
  type: BlockType
  heading?: string
  body?: string
  items?: string[]
  href?: string
  label?: string
  language?: string
  author?: string
}

export interface IssueFrontmatter {
  stream: StreamId
  subject: string
  preheader: string
  slug: string
  date: string
  mascotMood?: MascotMood
  status?: 'draft' | 'published'
  ctaUrl?: string
  ctaLabel?: string
  subjectVariants?: string[]
}

export interface CompiledIssue {
  frontmatter: IssueFrontmatter
  blocks: Block[]
  raw: string
  filePath: string
}

export interface PublishTarget {
  resend?: { audienceId: string; topicIds: string[] }
  beehiiv?: { publicationId: string; tag: string }
  rss?: boolean
}

export interface PublishResult {
  issueId: string
  sentAt: string
  platforms: {
    resend?: { ok: boolean; id?: string; error?: string }
    beehiiv?: { ok: boolean; id?: string; error?: string }
    rss?: { ok: boolean; url?: string; error?: string }
  }
  subjectVariant: string
  utmCampaign: string
  dryRun: boolean
}
