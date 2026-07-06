import {
  Building2,
  Cloud,
  Cpu,
  Network,
  Radar,
  ShieldCheck,
  Workflow,
} from 'lucide-react'

import {
  CTASection,
  PlatformCard,
  PlatformHero,
  PlatformShell,
  SectionHeader,
  SystemFlow,
} from '@/components/platform/platform-ui'
import {
  cloudAudienceCards,
  cloudPillars,
  coeConsumptionFlow,
} from '@/data/platform'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Cloud AI Systems | From AI Hype to Cloud Workloads',
  description:
    'Cloud AI systems for teams that need prototypes, MCP-connected workflows, AI CoE operating systems, governance, and production-ready workload architecture.',
  path: '/cloud',
  keywords: [
    'cloud AI',
    'AI CoE',
    'MCP architecture',
    'AI prototype sprint',
    'cloud workloads',
    'AI architecture',
  ],
})

const pillarIcons = [Building2, Network, Workflow, Cpu, ShieldCheck]
const audienceIcons = [Radar, Cpu, Building2, Cloud, Network]

export default function CloudPage() {
  return (
    <PlatformShell>
      <PlatformHero
        eyebrow="Cloud AI Architecture"
        title="From AI Hype"
        highlight="to Cloud Workloads"
        deck="FrankX.ai helps cloud teams, partners, AI CoEs, and ambitious builders turn AI ideas into prototypes, MCP-connected workflows, and production-ready cloud architecture."
        primaryCta={{ label: 'Start a prototype sprint', href: '/cloud/prototype-sprints' }}
        secondaryCta={{ label: 'Explore the AI CoE system', href: '/cloud/ai-coe' }}
        metrics={[
          { value: 'AI CoE', label: 'Demand to workload operating system' },
          { value: 'MCP', label: 'Agent-to-cloud integration layer' },
          { value: '10 days', label: 'Prototype sprint format' },
        ]}
        visualTitle="Cloud workload path"
        visualItems={[
          'Use case signal',
          'Working prototype',
          'MCP and data integration',
          'Cloud architecture',
          'Production roadmap',
        ]}
      />

      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Who It Serves"
            title="Cloud AI for teams that need useful execution."
            deck="The wedge is practical: choose the right use case, build the smallest honest prototype, then map the path into cloud services, governance, and field reuse."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {cloudAudienceCards.map((card, index) => (
              <PlatformCard
                key={card.title}
                title={card.title}
                excerpt={card.excerpt}
                href={card.href}
                tags={card.tags}
                icon={audienceIcons[index] ?? Cloud}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Core Framework"
            title="The AI CoE Consumption Engine"
            deck="A repeatable flow for moving from account signal to selected use case, prototype, cloud architecture, governance, executive demo, and field asset."
          />
          <div className="mt-10">
            <SystemFlow steps={coeConsumptionFlow} />
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Platform Pillars"
            title="Five systems that turn cloud AI into work."
            deck="The pages below are built as the commercial and research spine for the FrankX.ai cloud wedge."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cloudPillars.map((pillar, index) => (
              <PlatformCard
                key={pillar.title}
                title={pillar.title}
                excerpt={pillar.excerpt}
                href={pillar.href}
                tags={pillar.tags}
                icon={pillarIcons[index] ?? Workflow}
                className={index === 0 ? 'lg:col-span-2' : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Cloud AI Execution"
        title="Need the research translated into a working system?"
        deck="Start with one high-value process. Leave with a prototype, architecture map, demo narrative, and a clear production path."
        primary={{ label: 'Request a sprint', href: '/contact' }}
        secondary={{ label: 'Read the research hub', href: '/research' }}
      />
    </PlatformShell>
  )
}
