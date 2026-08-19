import Link from 'next/link'
import {
  ArrowDown,
  ArrowRight,
  Check,
  Download,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react'

import { MDXContent } from '@/components/blog/MDXContent'
import LearnHubSection from '@/components/learn/LearnHubSection'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { getCommunityPlatformAiMode } from '@/lib/community-platform-ai'
import type { GuideDoc } from '@/lib/guides'
import type { CommunityPlatform } from '@/lib/community-platforms'
import { portalsForGuide } from '@/lib/learn/related-portals'

import AiPermissionTopology from './AiPermissionTopology'
import CommunityGuideMeasurement from './CommunityGuideMeasurement'
import CommunityPlatformAtlas from './CommunityPlatformAtlas'
import styles from './community-platform-guide.module.css'

type CommunityPlatformGuidePageProps = {
  guide: GuideDoc
  platforms: CommunityPlatform[]
}

const CONTROL_LANES = [
  {
    number: '01',
    model: 'Hosted',
    example: 'Circle Business',
    acquired: 'Fast launch, native community operations, MCP and APIs',
    inherited: 'Vendor interface, quotas, app shell and migration seams',
    decision: 'Production pilot',
  },
  {
    number: '02',
    model: 'Branded app',
    example: 'Circle Plus · Disciple · Mighty Pro',
    acquired: 'Own-name listing, icon, push and stronger brand presence',
    inherited: 'Managed templates, contract terms and store-payment constraints',
    decision: 'After mobile habit is proven',
  },
  {
    number: '03',
    model: 'Headless',
    example: 'Custom shell + rented engine',
    acquired: 'Owned onboarding, discovery and critical interface moments',
    inherited: 'Authentication seams, API limits and two-system operations',
    decision: 'When one screen blocks the loop',
  },
  {
    number: '04',
    model: 'Custom product',
    example: 'Source, primitives and roadmap',
    acquired: 'Interface, behavior, data model and strategic optionality',
    inherited: 'Security, safety, uptime, payments, releases and permanent team',
    decision: 'Only when behavior is the moat',
  },
]

const TIMELINE = [
  {
    day: 'Before day 1',
    title: 'Define the promise',
    evidence: '12–20 interviews · one repeated member job',
    architecture: 'No platform commitment',
  },
  {
    day: 'Days 1–30',
    title: 'Prove activation',
    evidence: 'Time to first value · response quality · week-one return',
    architecture: 'Circle / Mighty / Whop bake-off, then one pilot',
  },
  {
    day: 'Days 31–60',
    title: 'Prove the loop',
    evidence: 'Cohort retention · peer contribution · recurring outcome',
    architecture: 'Stay native; automate only repeated work',
  },
  {
    day: 'Days 61–90',
    title: 'Prove economics and limits',
    evidence: 'Willingness to pay · renewal intent · repeated constraint',
    architecture: 'Earn the next ownership layer',
  },
]

function sourceHost(source: string) {
  try {
    return new URL(source).hostname.replace(/^www\./, '')
  } catch {
    return 'source'
  }
}

function ControlLiabilitySpectrum() {
  return (
    <section
      id="control-spectrum"
      className={styles.visualSection}
      aria-labelledby="control-spectrum-title"
    >
      <header className={styles.visualHeader}>
        <div>
          <p className={styles.figureNumber}>01 / Control–liability spectrum</p>
          <h2 id="control-spectrum-title">Every layer of control comes with a layer of operations.</h2>
        </div>
        <p>Move right only when evidence pays the carrying cost.</p>
      </header>

      <div className={styles.spectrumAxis} aria-hidden="true">
        <span>Rent more</span>
        <span>Own more</span>
      </div>
      <ol className={styles.controlLanes}>
        {CONTROL_LANES.map((lane, index) => (
          <li key={lane.model} data-current={index === 0 || undefined}>
            <div className={styles.laneTopline}>
              <span>{lane.number}</span>
              {index === 0 ? <strong>Recommended now</strong> : <span>{lane.decision}</span>}
            </div>
            <h3>{lane.model}</h3>
            <p className={styles.laneExample}>{lane.example}</p>
            <dl>
              <div>
                <dt>Control acquired</dt>
                <dd>{lane.acquired}</dd>
              </div>
              <div>
                <dt>Liability inherited</dt>
                <dd>{lane.inherited}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </section>
  )
}

function EvidenceTimeline() {
  return (
    <section id="proof-system" className={styles.visualSection} aria-labelledby="proof-system-title">
      <header className={styles.visualHeader}>
        <div>
          <p className={styles.figureNumber}>04 / The 90-day evidence line</p>
          <h2 id="proof-system-title">Audience earns the pilot. Behavior earns the architecture.</h2>
        </div>
        <p>A 100,000-person following is distribution, not product evidence.</p>
      </header>

      <ol className={styles.timeline}>
        {TIMELINE.map((stage, index) => (
          <li key={stage.day}>
            <div className={styles.timelineMarker}>
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <p className={styles.timelineDay}>{stage.day}</p>
            <h3>{stage.title}</h3>
            <dl>
              <div>
                <dt>Evidence</dt>
                <dd>{stage.evidence}</dd>
              </div>
              <div>
                <dt>Architecture</dt>
                <dd>{stage.architecture}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>

      <div className={styles.decisionFork} aria-label="Day 90 architecture outcomes">
        <span>Day 90 decision</span>
        <div>
          <p>
            <strong>Stay native</strong>
            Loop works; constraints are minor.
          </p>
          <p>
            <strong>Branded app</strong>
            Mobile habit and brand surface matter.
          </p>
          <p>
            <strong>Headless</strong>
            One critical journey needs ownership.
          </p>
          <p>
            <strong>Custom</strong>
            A repeated proprietary behavior is the moat.
          </p>
        </div>
      </div>
    </section>
  )
}

function ResearchReleaseStatus({
  platformCount,
  officialMcpCount,
}: {
  platformCount: number
  officialMcpCount: number
}) {
  return (
    <section className={styles.researchStatus} aria-labelledby="research-status-title">
      <div className={styles.statusIntro}>
        <p className={styles.figureNumber}>28 July research release</p>
        <h2 id="research-status-title">The evidence level travels with every recommendation.</h2>
        <p>
          Eleven additional systems were reconciled into the source registry. Podia is no longer
          named without a row; beta and waitlist products remain qualified rather than promoted
          by novelty.
        </p>
      </div>

      <div className={styles.statusLegend} aria-label="Research evidence levels">
        <p>
          <span>Documentation verified</span>
          Current capability or pricing found in a primary vendor source.
        </p>
        <p>
          <span>Vendor claim / beta</span>
          Public claim retained with maturity and production-risk qualification.
        </p>
        <p>
          <span>Independent validation pending</span>
          No firsthand product trial, customer interview, load test, or export drill is claimed.
        </p>
      </div>

      <div className={styles.statusDownloads}>
        <p>
          <strong>{platformCount} products</strong>
          <span>
            20 evidence fields · {officialMcpCount} documentation-verified vendor MCP surfaces
          </span>
        </p>
        <TrackedLink
          href="/downloads/community-platform-vendor-due-diligence-checklist.csv"
          download
          prefetch={false}
          eventName="community_guide_download"
          eventProperties={{ asset: 'vendor_checklist', surface: 'research_status' }}
        >
          <Download aria-hidden="true" size={16} />
          Vendor diligence checklist
        </TrackedLink>
        <TrackedLink
          href="/downloads/starlight-community-os-blueprint.md"
          download
          prefetch={false}
          eventName="community_guide_download"
          eventProperties={{ asset: 'control_plane_blueprint', surface: 'research_status' }}
        >
          <Download aria-hidden="true" size={16} />
          Ownership blueprint
        </TrackedLink>
      </div>
    </section>
  )
}

function FullRegistry({ platforms }: { platforms: CommunityPlatform[] }) {
  return (
    <section id="full-registry" className={styles.registrySection} aria-labelledby="registry-title">
      <div className={styles.registryHeading}>
        <div>
          <p className={styles.figureNumber}>Source registry</p>
          <h2 id="registry-title">All {platforms.length} researched products</h2>
          <p>
            Primary sources and qualified current reporting, pricing, AI path, app model and
            FrankX verdict. Last verified 28 July 2026.
          </p>
        </div>
        <TrackedLink
          className={styles.downloadButton}
          href="/downloads/community-platform-matrix-2026.csv"
          download
          prefetch={false}
          eventName="community_guide_download"
          eventProperties={{ asset: 'platform_matrix', surface: 'source_registry' }}
        >
          <Download aria-hidden="true" size={17} />
          Download the {platforms.length}-platform CSV
        </TrackedLink>
      </div>

      <details className={styles.registryDetails}>
        <summary>
          Inspect the complete comparison
          <span>{platforms.length} rows · 20 source fields</span>
        </summary>
        <div className={styles.registryTableWrap}>
          <table className={styles.registryTable}>
            <caption className="sr-only">
              Community platform comparison last verified 28 July 2026
            </caption>
            <thead>
              <tr>
                <th scope="col">Platform</th>
                <th scope="col">Primary job</th>
                <th scope="col">Control ceiling</th>
                <th scope="col">AI / agent path</th>
                <th scope="col">Branded app model</th>
                <th scope="col">Public pricing</th>
                <th scope="col">Verdict</th>
                <th scope="col">Sources</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map((platform) => (
                <tr key={platform.platform}>
                  <th scope="row">
                    {platform.platform}
                    <span>{platform.evidenceStatus.replaceAll('_', ' ')}</span>
                  </th>
                  <td>{platform.primaryUseCase}</td>
                  <td>{platform.visualCustomizationCeiling}</td>
                  <td>{platform.aiMcpAgentIntegration}</td>
                  <td>{platform.brandedAppModel}</td>
                  <td>{platform.publicPricing2026}</td>
                  <td>{platform.verdict}</td>
                  <td>
                    <div className={styles.tableSources}>
                      {platform.primarySourceUrls.slice(0, 3).map((source) => (
                        <a
                          key={source}
                          href={source}
                          target="_blank"
                          rel="noreferrer"
                          data-community-platform={platform.platform}
                        >
                          {sourceHost(source)}
                          <ExternalLink aria-hidden="true" size={12} />
                        </a>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  )
}

export default function CommunityPlatformGuidePage({
  guide,
  platforms,
}: CommunityPlatformGuidePageProps) {
  return (
    <main className={styles.page}>
      <CommunityGuideMeasurement />
      <JsonLd
        type="ItemList"
        id="community-platform-registry"
        data={{
          name: 'Community platform research registry, July 2026',
          numberOfItems: platforms.length,
          itemListElement: platforms.map((platform, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: platform.platform,
            ...(platform.primarySourceUrls[0] ? { url: platform.primarySourceUrls[0] } : {}),
          })),
        }}
      />
      <div className={styles.heroWrap}>
        <Breadcrumbs
          items={[
            { label: 'Guides', href: '/guides' },
            { label: guide.title, href: `/guides/${guide.slug}` },
          ]}
        />

        <section className={styles.hero} aria-labelledby="community-guide-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              FrankX decision system · {platforms.length} platforms · July 2026
            </p>
            <h1 id="community-guide-title">{guide.title}</h1>
            <p className={styles.heroDescription}>{guide.description}</p>
            <div className={styles.heroRecommendation}>
              <span>Production recommendation</span>
              <p>
                <strong>Circle Business for the 90-day pilot.</strong> Run a Whop technical
                spike and a Mighty Scale discovery test before committing. Build custom only
                when a repeated member behavior—not visual ambition—proves the moat.
              </p>
            </div>
            <div className={styles.heroActions}>
              <a href="#platform-atlas">
                Explore the atlas
                <ArrowDown aria-hidden="true" size={17} />
              </a>
              <TrackedLink
                href="/downloads/community-platform-matrix-2026.csv"
                download
                prefetch={false}
                eventName="community_guide_download"
                eventProperties={{ asset: 'platform_matrix', surface: 'hero' }}
              >
                <Download aria-hidden="true" size={17} />
                Download research
              </TrackedLink>
            </div>
          </div>

          <figure className={styles.heroTopology}>
            <figcaption className="sr-only">
              Decision topology from rented infrastructure to owned product behavior
            </figcaption>
            <div className={styles.topologyLabel}>
              <span>OWNERSHIP TOPOLOGY</span>
              <span>Move only when evidence clears the gate</span>
            </div>
            <ol>
              <li data-active="true">
                <span>01</span>
                <div>
                  <strong>Rent the engine</strong>
                  <p>Identity · payments · moderation · notifications</p>
                </div>
                <b>Circle</b>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Operate the intelligence</strong>
                  <p>Official MCP · API · workflows · approval policy</p>
                </div>
                <b>AI layer</b>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Own critical surfaces</strong>
                  <p>Branded app · custom onboarding · headless journeys</p>
                </div>
                <b>Evidence gate</b>
              </li>
              <li>
                <span>04</span>
                <div>
                  <strong>Build the behavior</strong>
                  <p>Matching · reputation · creation tools · new social primitive</p>
                </div>
                <b>Moat</b>
              </li>
            </ol>
            <div className={styles.topologyFooter}>
              <ShieldCheck aria-hidden="true" size={17} />
              <span>Human approval remains between AI reasoning and consequential writes.</span>
            </div>
          </figure>
        </section>
      </div>

      <nav className={styles.sectionNav} aria-label="Guide sections">
        <div>
          <a href="#control-spectrum">Control</a>
          <a href="#platform-atlas">{platforms.length}-platform atlas</a>
          <a href="#ai-topology">AI topology</a>
          <a href="#proof-system">90-day proof</a>
          <a href="#analysis">Deep guide</a>
          <a href="#full-registry">Source registry</a>
        </div>
      </nav>

      <div className={styles.decisionStrip} aria-label="Executive decision">
        <p>
          <span>Winner now</span>
          <strong>Circle Business</strong>
          Best balance of premium community, courses, workflows, API, headless option and
          official MCP.
        </p>
        <ArrowRight aria-hidden="true" />
        <p>
          <span>Technical dark horse</span>
          <strong>Whop</strong>
          Best overlooked surface for commerce plus custom embedded web and React Native
          experiences.
        </p>
        <ArrowRight aria-hidden="true" />
        <p>
          <span>Build trigger</span>
          <strong>Proprietary behavior</strong>
          Custom becomes rational only when a repeated, high-value interaction cannot be
          expressed by the platform.
        </p>
      </div>

      <ResearchReleaseStatus
        platformCount={platforms.length}
        officialMcpCount={
          platforms.filter(
            (platform) => getCommunityPlatformAiMode(platform) === 'Official MCP'
          ).length
        }
      />

      <div className={styles.visuals}>
        <ControlLiabilitySpectrum />
        <CommunityPlatformAtlas platforms={platforms} />
        <AiPermissionTopology platforms={platforms} />
        <EvidenceTimeline />
      </div>

      <section id="analysis" className={styles.articleSection} aria-labelledby="analysis-title">
        <div className={styles.articleIntro}>
          <div>
            <p className={styles.figureNumber}>The complete architecture guide</p>
            <h2 id="analysis-title">The decision, the exceptions and the production path</h2>
          </div>
          <p>
            {guide.readingTime} · Written by {guide.author} · Last verified{' '}
            {new Date(guide.updated || guide.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
        <div className={styles.articleGrid}>
          <div className={styles.articleMargin} aria-label="Guide thesis">
            <span>THE RULE</span>
            <p>Rent the commodity. Own the promise. Build only the behavior that becomes the moat.</p>
            <a href="#full-registry">
              Inspect the source registry
              <ArrowRight aria-hidden="true" size={15} />
            </a>
          </div>
          <article className={styles.articleBody}>
            <MDXContent source={guide.content} />
          </article>
        </div>
      </section>

      <FullRegistry platforms={platforms} />

      {guide.faqs && guide.faqs.length > 0 ? (
        <section className={styles.faqSection} aria-labelledby="guide-faq-heading">
          <div>
            <p className={styles.figureNumber}>Decision support</p>
            <h2 id="guide-faq-heading">Frequently asked questions</h2>
          </div>
          <div className={styles.faqList}>
            {guide.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <Check aria-hidden="true" size={17} />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      <div className={styles.relatedLearning}>
        <LearnHubSection
          relatedPortals={portalsForGuide(guide.slug)}
          variant="compact"
          eyebrow="Keep learning"
          blurb="Curated official docs and expert channels for the architecture layers in this guide."
        />
      </div>

      <footer className={styles.guideFooter}>
        <p>
          Research date: 28 July 2026 · {platforms.length} unique products · 20 evidence fields ·
          no undisclosed commercial ranking.
        </p>
        <Link href="/guides">
          More FrankX guides
          <ArrowRight aria-hidden="true" size={15} />
        </Link>
      </footer>
    </main>
  )
}
