import editionsData from '@/data/newsletter-editions.json'
import experimentsData from '@/data/newsletter-experiments.json'
import offersData from '@/data/newsletter-offers.json'
import panelsData from '@/data/newsletter-simulation-panels.json'
import { getAllIssues, getPublishedIssues } from '@/lib/newsletter-issues'
import { getStreams } from '@/lib/newsletter'
import type {
  NewsletterEdition,
  NewsletterCalendarItem,
  NewsletterExperiment,
  NewsletterInventory,
  NewsletterOffer,
  NewsletterProviderStatus,
  NewsletterSimulationPanel,
} from './types'

function inferPillar(issue: { issue: number; theme?: string }): NewsletterEdition['pillar'] {
  const theme = (issue.theme || '').toLowerCase()
  if (theme.includes('talent')) return 'talent'
  if (theme.includes('technology') || theme.includes('stack')) return 'technology'
  if (theme.includes('data')) return 'data'
  if (theme.includes('ethics') || theme.includes('governance')) return 'ethics'
  if (theme.includes('case')) return 'case-study'
  if (theme.includes('workshop') || theme.includes('field')) return 'education'
  return issue.issue >= 10 ? 'case-study' : 'strategy'
}

function inferOfferId(issueNumber: number): string {
  if (issueNumber <= 3) return 'free-newsletter'
  if (issueNumber === 4 || issueNumber === 5) return 'inner-circle'
  if (issueNumber === 6) return 'builder-lab-primer'
  if (issueNumber === 7 || issueNumber === 8 || issueNumber === 11) return 'acos-system'
  if (issueNumber === 9) return 'alliance-enterprise'
  return 'builder-lab-primer'
}

function inferStreamId(issueNumber: number): string {
  if (issueNumber === 3 || issueNumber === 10) return 'creation-chronicles'
  if (issueNumber === 4 || issueNumber === 12) return 'inner-circle'
  return 'ai-architect'
}

function buildCalendarItems(issues: ReturnType<typeof getAllIssues>, editions: NewsletterEdition[]): NewsletterCalendarItem[] {
  const issueItems = issues.map((issue) => ({
    issue: issue.issue,
    slug: issue.slug,
    title: issue.subject.replace(/^Issue \d+:\s*/i, ''),
    date: issue.date,
    status: issue.status,
    pillar: inferPillar(issue),
    streamId: inferStreamId(issue.issue),
    offerId: inferOfferId(issue.issue),
    source: 'issue' as const,
    userRole: issue.spotlight || issue.theme || 'Weekly operating note',
    primaryCta:
      issue.issue === 5
        ? 'Reply with one AI workflow and classify it as task, system, or compounding bet.'
        : 'Read, reply, and connect the idea to one working artifact.',
    connectsTo: issue.connectsTo || [],
  }))

  const plannedItems = editions
    .filter((edition) => !issues.some((issue) => issue.issue === edition.issue))
    .map((edition) => ({
      issue: edition.issue,
      slug: edition.slug,
      title: edition.title,
      date: edition.plannedDate,
      status: edition.status,
      pillar: edition.pillar,
      streamId: edition.streamId,
      offerId: edition.offerId,
      source: 'plan' as const,
      userRole: 'Planned issue brief and production slot',
      primaryCta:
        edition.offerId === 'alliance-enterprise'
          ? 'Invite high-intent readers to a scoping conversation.'
          : 'Invite readers into the next useful artifact or reply loop.',
      connectsTo: edition.contentRefs,
    }))

  return [...issueItems, ...plannedItems].sort((a, b) => a.issue - b.issue)
}

function getProviderStatus(): NewsletterProviderStatus[] {
  const beehiivConfigured = Boolean(process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID)
  const resendConfigured = Boolean(process.env.RESEND_API_KEY)

  return [
    {
      provider: 'repo',
      configured: true,
      role: 'Source of truth for issues, variants, simulation reports, approval packets, and archive pages.',
      liveActionAllowed: false,
    },
    {
      provider: 'resend',
      configured: resendConfigured,
      role: 'Transactional email, welcome flows, test sends, topic tags, and fallback delivery.',
      liveActionAllowed: false,
    },
    {
      provider: 'beehiiv',
      configured: beehiivConfigured,
      role: 'Growth, publishing, referrals, sponsorship readiness, and analytics once approval is granted.',
      liveActionAllowed: false,
    },
    {
      provider: 'substack',
      configured: false,
      role: 'V1 optional mirror only. Not the operational backend.',
      liveActionAllowed: false,
    },
  ]
}

export function getNewsletterInventory(): NewsletterInventory {
  const issues = getAllIssues()
  const published = getPublishedIssues()
  const editions = editionsData.editions as NewsletterEdition[]
  const experiments = experimentsData.experiments as NewsletterExperiment[]
  const providerStatus = getProviderStatus()
  const calendarItems = buildCalendarItems(issues, editions)

  return {
    generatedAt: new Date().toISOString(),
    issues,
    streams: getStreams(),
    editions,
    calendarItems,
    experiments,
    offers: offersData.offers as NewsletterOffer[],
    panels: panelsData.panels as NewsletterSimulationPanel[],
    providerStatus,
    stats: {
      totalIssues: issues.length,
      publishedIssues: published.length,
      draftIssues: issues.filter((issue) => issue.status === 'draft' || issue.status === 'staged').length,
      plannedEditions: editions.filter((edition) => edition.status === 'planned' || edition.status === 'draft').length,
      trackedEditions: calendarItems.length,
      activeExperiments: experiments.filter((experiment) => experiment.status !== 'sent').length,
      approvalBlockedChannels: providerStatus
        .filter((provider) => provider.provider !== 'repo' && !provider.liveActionAllowed)
        .map((provider) => provider.provider),
    },
  }
}
