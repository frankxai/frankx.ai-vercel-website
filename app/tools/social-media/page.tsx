import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Database,
  Network,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import SocialMediaToolAtlas from '@/components/tools/SocialMediaToolAtlas'
import {
  SOCIAL_MEDIA_TOOLS,
  SOCIAL_TOOL_LAST_VERIFIED,
} from '@/data/social-media-tools'
import { createMetadata, siteConfig } from '@/lib/seo'

import styles from './social-media-tools.module.css'

const title = 'Best Social Media Tools 2026: Decision Atlas'
const description =
  'Compare Metricool, Pallyy, Postiz, Blotato, Buffer, HubSpot, Sprout Social and 8 more by role, price, API, MCP, approvals and evidence.'

export const metadata: Metadata = createMetadata({
  title,
  description,
  path: '/tools/social-media',
  image: '/images/blog/visual-system/social/social-media-tool-decision-atlas-og.png',
  keywords: [
    'best social media management tools 2026',
    'Metricool vs Pallyy',
    'Metricool vs Buffer',
    'Postiz vs Blotato',
    'social media tool for founders',
    'social media API for developers',
    'social media MCP server',
    'Sprout Social vs Hootsuite vs HubSpot',
  ],
})

const faqs = [
  {
    question: 'Is Metricool better than Pallyy?',
    answer:
      'Metricool is stronger when analytics depth, competitor reporting, multi-brand operations, or an official MCP connection are central. Pallyy is the cleaner one-brand choice when low operating cost and a focused publishing workflow matter more. There is no universal winner.',
  },
  {
    question: 'What is the best social media management tool for a solo founder?',
    answer:
      'Pallyy is the default FrankX starting point for one compact brand. Metricool is the upgrade when analytics or MCP access becomes important, while Buffer remains the simple baseline and Typefully can be better for a text-first founder voice.',
  },
  {
    question: 'Which social media tool is best for AI agents and automation?',
    answer:
      'Use an API-first boundary when agents must publish reliably. Ayrshare, Upload-Post, Postiz, Mixpost, Buffer, and Typefully expose documented automation surfaces; Metricool and several others expose MCP. Keep human approval before consequential publishing and keep the content record outside the scheduler.',
  },
  {
    question: 'Is HubSpot or Sprout Social worth it for a small brand?',
    answer:
      'Usually not for scheduling alone. HubSpot becomes rational when social activity must connect to an existing CRM and revenue-attribution system. Sprout Social becomes rational when a larger team needs governance, engagement, listening, service workflows, and reporting depth.',
  },
  {
    question: 'Do affiliate programs affect the rankings?',
    answer:
      'No. Product fit is scored before commercial status is displayed. A public affiliate program is not the same as a verified FrankX relationship, and this release uses official product links rather than tracked affiliate links.',
  },
]

const researchSources = [
  {
    title: 'ReAct',
    subtitle: 'Reasoning and acting in a governed loop',
    href: 'https://arxiv.org/abs/2210.03629',
  },
  {
    title: 'AutoGen',
    subtitle: 'Multi-agent conversation as an orchestration pattern',
    href: 'https://www.microsoft.com/en-us/research/publication/autogen-enabling-next-gen-llm-applications-via-multi-agent-conversation-framework/',
  },
  {
    title: 'NIST AI RMF: GenAI Profile',
    subtitle: 'Risk, measurement, and human accountability',
    href: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence',
  },
  {
    title: 'Model Context Protocol',
    subtitle: 'A current interoperability specification—not a quality score',
    href: 'https://modelcontextprotocol.io/specification/2026-07-28',
  },
]

export default function SocialMediaToolsPage() {
  const canonicalUrl = `${siteConfig.url}/tools/social-media`

  return (
    <main className={styles.page}>
      <JsonLd
        type="CollectionPage"
        data={{
          name: title,
          description,
          url: canonicalUrl,
          dateModified: SOCIAL_TOOL_LAST_VERIFIED,
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: SOCIAL_MEDIA_TOOLS.length,
            itemListElement: SOCIAL_MEDIA_TOOLS.map((tool, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: tool.name,
              url: tool.productUrl,
            })),
          },
        }}
      />
      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }}
      />

      <div className={styles.ambient} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroInner}>
          <Breadcrumbs
            items={[
              { label: 'Tools', href: '/tools' },
              { label: 'Social media decision atlas', href: '/tools/social-media' },
            ]}
          />

          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <Sparkles aria-hidden="true" size={14} />
              FrankX tool intelligence · 2026 field edition
            </p>
            <h1>
              Choose the system your brand can <em>actually operate.</em>
            </h1>
            <p className={styles.heroLead}>
              Metricool sounds cooler. That is not the decision. This atlas routes fifteen
              social platforms by operating role, public cost, evidence, control, and the way
              an agent system can use them safely.
            </p>
            <div className={styles.heroActions}>
              <a href="#role-router-title">
                Route my decision
                <ArrowDownRight aria-hidden="true" size={16} />
              </a>
              <Link href="/blog/best-social-media-management-tools-founders-2026">
                Read the founder guide
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </div>

          <div className={styles.heroProof}>
            <div><strong>15</strong><span>sourced tools</span></div>
            <div><strong>5</strong><span>operating roles</span></div>
            <div><strong>08.28</strong><span>verified in 2026</span></div>
            <p>
              Prices and capabilities change. Every product card opens the primary source used
              for the current record.
            </p>
          </div>

          <figure className={styles.heroFigure}>
            <div className={styles.figureChrome}>
              <span>Decision atlas / role topology</span>
              <span>Live evidence under every node</span>
            </div>
            <Image
              src="/images/tools/social-media/social-tool-decision-atlas.svg"
              alt="Five operating-role lanes connect founders, creator-led brands, developer brands, agencies, and enterprises to a shortlist of social-media tool architectures."
              width={1600}
              height={980}
              priority
            />
            <figcaption>
              The map is editorial. The registry beneath it is the source of truth.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.directAnswer} aria-labelledby="direct-answer-title">
        <div>
          <p>Direct answer / Metricool vs the field</p>
          <h2 id="direct-answer-title">Is Metricool better?</h2>
        </div>
        <div className={styles.answerBody}>
          <p className={styles.answerLead}>
            <strong>Better for analytics and MCP-connected operations. Not better at every job.</strong>
          </p>
          <p>
            For one FrankX-sized brand, Pallyy is still the clean default: focused surface, clear
            economics, enough publishing and approval capability. Metricool wins when reporting,
            competitor intelligence, multi-brand control, or its official MCP interface will be
            used. Postiz and Mixpost win when source and deployment control matter. Ayrshare and
            Upload-Post win when the product itself needs a social API. Sprout Social, Hootsuite,
            and HubSpot only become rational when governance or CRM attribution pays for the suite.
          </p>
          <Link href="/blog/pallyy-vs-metricool-2026">
            Open the complete Pallyy vs Metricool face-off
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>

      <SocialMediaToolAtlas />

      <section className={styles.controlPlane} aria-labelledby="control-plane-title">
        <div className={styles.controlPlaneIntro}>
          <p>04 / Agent operating model</p>
          <h2 id="control-plane-title">The scheduler is a side-effect boundary.</h2>
          <p>
            A multi-agent system should not confuse the publishing tool with memory, strategy, or
            truth. Keep the canonical brief and evidence upstream. Let specialist agents propose
            work. Require approval. Then use the platform API or MCP surface to execute and record
            the result.
          </p>
        </div>

        <div className={styles.controlPlaneVisual}>
          <div className={styles.controlNode} data-tone="source">
            <Database aria-hidden="true" size={18} />
            <span>01</span>
            <strong>Source + brand memory</strong>
            <p>Claims, offers, voice, rights, campaign state</p>
          </div>
          <div className={styles.controlNode} data-tone="agent">
            <Network aria-hidden="true" size={18} />
            <span>02</span>
            <strong>Specialist agent cell</strong>
            <p>Research, plan, adapt, critique, measure</p>
          </div>
          <div className={styles.controlNode} data-tone="approval">
            <ShieldCheck aria-hidden="true" size={18} />
            <span>03</span>
            <strong>Human release gate</strong>
            <p>Voice, truth, context, risk, final consent</p>
          </div>
          <div className={styles.controlNode} data-tone="publish">
            <ArrowUpRight aria-hidden="true" size={18} />
            <span>04</span>
            <strong>API / MCP publish</strong>
            <p>Platform execution with an idempotent receipt</p>
          </div>
          <div className={styles.controlNode} data-tone="learn">
            <Sparkles aria-hidden="true" size={18} />
            <span>05</span>
            <strong>Measure + learn</strong>
            <p>Outcome evidence returns to the next brief</p>
          </div>
        </div>

        <div className={styles.architectureRules}>
          <p><span>Keep</span> strategy, source material, brand memory, and performance history in an owned system of record.</p>
          <p><span>Delegate</span> reversible research, drafting, adaptation, and analysis to specialist agents.</p>
          <p><span>Gate</span> brand-sensitive or consequential publication with a named human approver.</p>
          <p><span>Record</span> tool, version, payload hash, destination, timestamp, and resulting platform ID.</p>
        </div>
      </section>

      <section className={styles.researchSection} aria-labelledby="research-title">
        <div className={styles.researchIntro}>
          <p>05 / Research foundation</p>
          <h2 id="research-title">Papers shape the operating model. They do not pick the vendor.</h2>
          <p>
            The research foundation supports the loop—reason, act, coordinate, govern, observe.
            Product rankings come from current official documentation and declared evidence, not
            from borrowing authority from an academic paper.
          </p>
          <Link href="/research">
            Enter the FrankX research hub
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <div className={styles.researchLedger}>
          {researchSources.map((source, index) => (
            <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>{source.title}</strong>
                <p>{source.subtitle}</p>
              </div>
              <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          ))}
        </div>
      </section>

      <section className={styles.editorialSection} aria-labelledby="editorial-title">
        <div className={styles.sectionLabel}>
          <p>06 / Canonical reading</p>
          <h2 id="editorial-title">From field map to operating decision.</h2>
        </div>
        <div className={styles.articleCards}>
          <Link href="/blog/best-social-media-management-tools-founders-2026">
            <span>Ultimate guide · high-intent decision</span>
            <BookOpen aria-hidden="true" size={22} />
            <h3>Best Social Media Management Tools for Founders in 2026</h3>
            <p>Role routing, category map, cost model, agent architecture, and a 30-day adoption plan.</p>
            <strong>Read the guide <ArrowRight aria-hidden="true" size={14} /></strong>
          </Link>
          <Link href="/blog/pallyy-vs-metricool-2026">
            <span>Face-off · one-brand decision</span>
            <BookOpen aria-hidden="true" size={22} />
            <h3>Pallyy vs Metricool: Which Is Better in 2026?</h3>
            <p>A direct comparison of pricing, analytics, automation, collaboration, and fit by growth stage.</p>
            <strong>Read the face-off <ArrowRight aria-hidden="true" size={14} /></strong>
          </Link>
        </div>
      </section>

      <section className={styles.methodSection} aria-labelledby="method-title">
        <div>
          <p>Method + commercial policy</p>
          <h2 id="method-title">Evidence first. Commercial status adjacent.</h2>
        </div>
        <div>
          <p>
            We checked official pricing, product, API, MCP, help-center, and program pages on{' '}
            <time dateTime={SOCIAL_TOOL_LAST_VERIFIED}>28 August 2026</time>. “Official
            documentation” means the record is supported by a first-party source. It does not mean
            FrankX has completed a same-prompt benchmark or production pilot.
          </p>
          <p>
            Several products operate public affiliate or partner programs. No tracked FrankX
            relationship is asserted in this release, and all product calls-to-action use official
            destination URLs. If a commercial relationship is activated later, it will be disclosed
            beside the link and will not change the fit score.
          </p>
          <div className={styles.evidenceKey}>
            <span><i data-tone="official" />Official documentation</span>
            <span><i data-tone="pilot" />First-party pilot</span>
            <span><i data-tone="claim" />Vendor claim</span>
            <span><i data-tone="untested" />Not tested</span>
          </div>
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="faq-title">
        <div className={styles.sectionLabel}>
          <p>07 / Extractable answers</p>
          <h2 id="faq-title">Questions founders ask before they buy.</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {faq.question}
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <div>
          <p>Keep the system smaller than the story.</p>
          <h2>Choose one role. Prove one loop. Add complexity only when evidence asks for it.</h2>
        </div>
        <a href="#role-router-title">
          Return to the decision atlas
          <ArrowUpRight aria-hidden="true" size={18} />
        </a>
      </section>
    </main>
  )
}
