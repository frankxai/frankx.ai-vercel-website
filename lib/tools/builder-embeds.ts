import programsFile from '../../data/affiliate/programs.json' with { type: 'json' }
import {
  assetDecision,
  programToRecord,
  sponsorDecision,
  toolSlug,
  type AssetProvenance,
  type ProgramSource,
  type ToolRecord,
} from './record.ts'

const DISCLOSURE = 'Some links on this page are affiliate links. If you buy through them, I may earn a commission at no extra cost to you. I only recommend tools I actually use or have tested.'

type Audience = 'design' | 'affiliate'

export type EmbedView = {
  id: string
  name: string
  job: string
  audience: Audience
  relationshipLabel: string
  href: string
  rel: 'sponsored noopener' | 'noopener'
  sponsored: boolean
  image?: string
  disclosure?: string
}

type Seed = {
  name: string
  job: string
  productUrl: string
  audience: Audience
  catalog: boolean
}

const SEEDS: readonly Seed[] = [
  { name: 'Figma', job: 'Design the interface, the components, and the prototype in the browser.', productUrl: 'https://www.figma.com', audience: 'design', catalog: false },
  { name: 'Framer', job: 'Design a site and publish it without a separate build step.', productUrl: 'https://www.framer.com', audience: 'design', catalog: false },
  { name: 'Webflow', job: 'Build and host a visual site with its own content model.', productUrl: 'https://webflow.com', audience: 'design', catalog: false },
  { name: 'Canva', job: 'Lay out brand graphics and simple pages.', productUrl: 'https://www.canva.com', audience: 'design', catalog: true },
  { name: 'Notion', job: 'Keep the spec and the operating notes beside the build.', productUrl: 'https://www.notion.so', audience: 'design', catalog: true },
  { name: 'ElevenLabs', job: 'Generate and edit a voice the product can ship.', productUrl: 'https://elevenlabs.io', audience: 'affiliate', catalog: true },
  { name: 'Gamma', job: 'Turn an outline into a deck a client can read.', productUrl: 'https://gamma.app', audience: 'affiliate', catalog: true },
  { name: 'Descript', job: 'Edit a talking-head recording as a transcript.', productUrl: 'https://www.descript.com', audience: 'affiliate', catalog: true },
]

const catalog = programsFile as { programs: ProgramSource[] }

function recordFor(seed: Seed): ToolRecord {
  if (!seed.catalog) {
    return {
      id: toolSlug(seed.name),
      name: seed.name,
      job: seed.job,
      bestFor: seed.job,
      caution: '',
      price: '',
      capabilities: [],
      evidence: 'not-tested',
      verifiedOn: '',
      usedIn: [],
      relationship: { kind: 'editorial' },
      oracleExcluded: false,
    }
  }
  const program = catalog.programs.find((entry) => entry.tool.toLowerCase() === seed.name.toLowerCase())
  return programToRecord(program ?? { tool: seed.name, hasProgram: false, status: 'closed' })
}

export function presentEmbed(
  record: ToolRecord,
  options: {
    productUrl: string
    audience: Audience
    job: string
    asset?: AssetProvenance
    now?: Date
  },
): EmbedView | null {
  if (toolSlug(record.name) === 'higgsfield' || record.id === 'higgsfield') return null
  const decision = sponsorDecision(record, options.now ?? new Date())
  const visual = assetDecision(options.asset)
  const sponsored = decision.sponsored && Boolean(decision.href)
  const relationshipLabel = sponsored
    ? 'Sponsored'
    : record.relationship.kind === 'program-closed'
      ? 'Program closed'
      : 'Editorial'
  return {
    id: record.id,
    name: record.name,
    job: options.job,
    audience: options.audience,
    relationshipLabel,
    href: sponsored && decision.href ? decision.href : options.productUrl,
    rel: sponsored ? 'sponsored noopener' : 'noopener',
    sponsored,
    image: visual.show ? visual.src : undefined,
    disclosure: sponsored ? DISCLOSURE : undefined,
  }
}

export function builderEmbeds(now = new Date()): EmbedView[] {
  return SEEDS.flatMap((seed) => {
    const view = presentEmbed(recordFor(seed), {
      productUrl: seed.productUrl,
      audience: seed.audience,
      job: seed.job,
      asset: { kind: 'unknown' },
      now,
    })
    return view ? [view] : []
  })
}
