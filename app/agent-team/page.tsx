import Link from 'next/link'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { claudeAgents } from '@/lib/agents'
import { projectMilestones, segmentProfiles, testimonials, testimonialIcon } from '@/lib/hub'
import { createMetadata, siteConfig } from '@/lib/seo'
import { ArrowRight, ArrowUpRight, CalendarDays, Check, Sparkles } from 'lucide-react'

export const metadata = createMetadata({
  title: 'Agent Team – Claude Partners Orchestrating Conscious AI Systems',
  description:
    'Meet the Claude partners powering FrankX engagements. Explore the workflows, deliverables, and engagement tiers that bring conscious AI systems to life.',
  keywords: [
    'frankx agent team',
    'claude agents',
    'conscious ai consulting',
    'ai strategy workshop',
    'ai retainer services',
  ],
  path: '/agent-team',
})

const offerPillars = [
  {
    title: 'Claude-Native Operating System',
    description:
      'Shared rituals, dashboards, and backlogs that keep every agent aligned with your principles and outcomes.',
  },
  {
    title: 'Creative & Technical Delivery',
    description:
      'Narrative, sonic, and architectural workflows ship together so launches feel cohesive across every channel.',
  },
  {
    title: 'Evidence of Progress',
    description:
      'Scorecards, briefs, and artifacts make it simple to prove the value of conscious intelligence to stakeholders.',
  },
]

const milestoneStatusStyles: Record<'shipping' | 'in-progress' | 'incubating', string> = {
  shipping: 'border-emerald-400/50 bg-emerald-500/10 text-emerald-200',
  'in-progress': 'border-amber-400/50 bg-amber-500/10 text-amber-200',
  incubating: 'border-sky-400/50 bg-sky-500/10 text-sky-200',
}

type EngagementFeature = { label: string; href?: string }

type EngagementTier = {
  id: string
  title: string
  price: string
  priceDetail: string
  description: string
  href: string
  ctaLabel: string
  schemaPrice: string
  availability: string
  features: EngagementFeature[]
}

const toAbsoluteUrl = (href: string) => {
  if (href.startsWith('http') || href.startsWith('mailto:')) return href
  return new URL(href, siteConfig.url).toString()
}

export default function AgentTeamPage() {
  const creatorOperatingSystem = projectMilestones.find(
    (milestone) => milestone.title === 'Creator Operating System',
  )
  const familyNavigator = projectMilestones.find((milestone) =>
    milestone.title.includes('Family Intelligence Navigator'),
  )

  const engagementTiers: EngagementTier[] = [
    {
      id: 'briefing',
      title: 'Free Intelligence Briefing',
      price: 'Included',
      priceDetail: '30-minute orientation',
      description:
        'Assess your current AI maturity, identify the right agent entry points, and receive segment-specific recommendations.',
      href: '/start',
      ctaLabel: 'Book the briefing',
      schemaPrice: '0',
      availability: 'https://schema.org/InStock',
      features: [
        { label: 'Soul Frequency Assessment debrief tailored to your team.', href: '/soul-frequency-assessment' },
        { label: 'Clarity on which Claude agent to activate first.' },
        { label: 'Access to the Start Here orientation experience.', href: '/start' },
      ],
    },
    {
      id: 'workshop',
      title: 'Activation Workshop',
      price: '$2,500',
      priceDetail: 'Half-day collaborative intensive',
      description:
        'Design Claude workflows, governance guardrails, and launch plans alongside the full agent team.',
      href: '/founder-playbook',
      ctaLabel: 'Reserve your workshop',
      schemaPrice: '2500',
      availability: 'https://schema.org/LimitedAvailability',
      features: [
        { label: 'Custom workflow maps and prompts from each Claude partner.' },
        {
          label: `Includes the ${creatorOperatingSystem?.title ?? 'Creator Operating System'} template library.`,
          href: creatorOperatingSystem?.cta?.href ?? '/templates',
        },
        { label: 'Launch and measurement plan ready for executive review.' },
      ],
    },
    {
      id: 'retainer',
      title: 'Intelligence Retainer',
      price: '$5,000+ / month',
      priceDetail: 'Ongoing partnership',
      description:
        'Sustain momentum with weekly co-creation rituals, executive reporting, and rollout support from every agent.',
      href: 'mailto:hello@frankx.ai?subject=Intelligence%20Retainer',
      ctaLabel: 'Request a proposal',
      schemaPrice: '5000',
      availability: 'https://schema.org/LimitedAvailability',
      features: [
        { label: 'Dedicated Starlight Architect systems lead and governance oversight.' },
        {
          label: 'Creation Engine + Frequency Alchemist launch pods for major releases.',
          href: creatorOperatingSystem?.cta?.href ?? '/templates',
        },
        {
          label: `Priority enrollment for ${familyNavigator?.title ?? 'upcoming cohort programs'}.`,
          href: familyNavigator?.cta?.href ?? '/start',
        },
      ],
    },
  ]

  const productStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'FrankX Agent Team',
    description:
      'Claude-powered consulting collective delivering conscious AI strategy, creative systems, and executive alignment.',
    brand: {
      '@type': 'Brand',
      name: siteConfig.shortName,
      url: siteConfig.url,
    },
    offers: engagementTiers.map((tier) => ({
      '@type': 'Offer',
      name: tier.title,
      price: tier.schemaPrice,
      priceCurrency: 'USD',
      description: tier.description,
      availability: tier.availability,
      url: toAbsoluteUrl(tier.href),
    })),
  }

  const TestimonialIcon = testimonialIcon

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <main className="px-6 pt-28 pb-20">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
        />

        <div className="mx-auto max-w-6xl space-y-20">
          <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-br from-indigo-900/70 via-slate-950 to-slate-950 p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.28),_transparent_65%)]" aria-hidden />
            <div className="relative grid gap-12 lg:grid-cols-[1.15fr,0.85fr]">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                  Claude Agent Collective
                </span>
                <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
                  Claude partners orchestrating conscious intelligence for your ecosystem
                </h1>
                <p className="text-lg text-white/80 leading-relaxed">
                  Four specialized Claude agents collaborate with FrankX to architect, launch, and steward the systems your teams,
                  families, and communities rely on. Every engagement blends enterprise-grade rigor with creative rituals.
                </p>
                <ul className="grid gap-3 text-sm text-white/80 sm:grid-cols-2">
                  <li className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-4 w-4 text-primary-300" aria-hidden />
                    <span>Enterprise architecture and foresight tuned to your culture.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-4 w-4 text-primary-300" aria-hidden />
                    <span>Creative launch pods that encode your unique frequency in every asset.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-4 w-4 text-primary-300" aria-hidden />
                    <span>Safety rituals, governance, and metrics ready for executive review.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-4 w-4 text-primary-300" aria-hidden />
                    <span>Ongoing programs and templates that keep your teams aligned.</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                  <Link
                    href="/start"
                    className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 shadow-lg shadow-primary-900/20 transition-transform hover:-translate-y-0.5 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-100"
                  >
                    Book a free briefing
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
                  </Link>
                  <Link
                    href="#tiers"
                    className="inline-flex items-center justify-center rounded-xl border border-white/40 px-8 py-4 font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                  >
                    Explore engagement tiers
                    <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden />
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur">
                  <h2 className="text-lg font-semibold text-white">How the collective shows up</h2>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    Engagements combine strategic foresight, creative production, and measurement so leaders can show proof of progress
                    while staying grounded in human outcomes.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {offerPillars.map((pillar) => (
                    <div key={pillar.title} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/80">
                      <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
                      <p className="mt-2 leading-relaxed">{pillar.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-3xl font-semibold text-white">Meet the Claude partners in your corner</h2>
              <p className="text-sm text-white/70 leading-relaxed">
                Every agent mirrors a dimension of the FrankX practice—system architecture, storytelling, sonic identity, and foresight.
                Together they deliver engagements that feel human while satisfying enterprise expectations.
              </p>
            </div>
            <div className="grid gap-6">
              {claudeAgents.map((agent) => (
                <div key={agent.id} className="rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                        <agent.icon className="h-6 w-6" aria-hidden />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{agent.name}</h3>
                        <p className="text-sm text-white/60">{agent.focus}</p>
                      </div>
                    </div>
                    <Link
                      href={agent.cta.href}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                    >
                      {agent.cta.label}
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                  <p className="mt-4 text-sm text-white/70 leading-relaxed">{agent.role}</p>
                  <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-semibold text-white">Core workflows</h4>
                      <ul className="mt-3 space-y-3 text-sm text-white/70">
                        {agent.workflows.map((workflow) => (
                          <li key={workflow} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 text-primary-300" aria-hidden />
                            <span className="leading-relaxed">{workflow}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Signature deliverables</h4>
                      <ul className="mt-3 space-y-3 text-sm text-white/70">
                        {agent.deliverables.map((deliverable) => (
                          <li key={deliverable} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 text-primary-300" aria-hidden />
                            <span className="leading-relaxed">{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8" id="segments">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-3xl font-semibold text-white">Segmented entry points for every relationship</h2>
              <p className="text-sm text-white/70 leading-relaxed">
                Whether you are bringing AI to family conversations, studio launches, or executive programs, the segment profiles guide you to the
                right starting rituals and resources. Each CTA leads to assets already shipping inside the hub.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {segmentProfiles.map((segment) => {
                const SegmentIcon = segment.icon
                return (
                  <div key={segment.id} className="flex h-full flex-col rounded-4xl border border-white/10 bg-white/5 p-7 backdrop-blur">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white">
                        <SegmentIcon className="h-5 w-5" aria-hidden />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{segment.title}</h3>
                        <p className="mt-2 text-sm text-white/70 leading-relaxed">{segment.description}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-white/60 leading-relaxed">{segment.transformation}</p>
                    <div className="mt-6 space-y-3">
                      <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Immediate needs</h4>
                      <ul className="space-y-3 text-sm text-white/70">
                        {segment.needs.map((need) => (
                          <li key={need} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 text-primary-300" aria-hidden />
                            <span className="leading-relaxed">{need}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3 pt-2">
                      {segment.ctas.map((cta, index) => (
                        <Link
                          key={cta.label}
                          href={cta.href}
                          className={
                            index === 0
                              ? 'inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 shadow hover:bg-slate-100'
                              : 'inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 hover:bg-white/10'
                          }
                        >
                          {cta.label}
                          <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="space-y-8" id="tiers">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-3xl font-semibold text-white">Choose the engagement that fits your next move</h2>
              <p className="text-sm text-white/70 leading-relaxed">
                Each tier unlocks a focused layer of the agent team. Start with a free briefing, co-design a workshop, or bring the full collective in on retainer.
                Every path links directly to the resources and programs already live inside the hub.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {engagementTiers.map((tier) => (
                <div key={tier.id} className="flex h-full flex-col rounded-4xl border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-slate-950 p-7">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">{tier.priceDetail}</span>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{tier.title}</h3>
                    <p className="mt-2 text-sm text-white/60 leading-relaxed">{tier.description}</p>
                    <div className="mt-4 text-lg font-semibold text-white">{tier.price}</div>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-white/70">
                    {tier.features.map((feature) => (
                      <li key={feature.label} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-primary-300" aria-hidden />
                        {feature.href ? (
                          <Link href={feature.href} className="leading-relaxed text-white hover:text-slate-100">
                            {feature.label}
                          </Link>
                        ) : (
                          <span className="leading-relaxed">{feature.label}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex-1" />
                  <Link
                    href={tier.href}
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-100"
                  >
                    {tier.ctaLabel}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-3xl font-semibold text-white">Proof from teams already in motion</h2>
              <p className="text-sm text-white/70 leading-relaxed">
                Leaders across startups, enterprises, and creative communities rely on the agent team to translate vision into measurable progress.
                Their words capture the mix of rigor and resonance you can expect.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <TestimonialIcon className="h-6 w-6 text-primary-300" aria-hidden />
                  <p className="mt-4 text-sm text-white/80 leading-relaxed">“{testimonial.quote}”</p>
                  <div className="mt-6 text-sm text-white/60">
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div>{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8" id="programs">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-3xl font-semibold text-white">Upcoming programs and deliverables</h2>
              <p className="text-sm text-white/70 leading-relaxed">
                Track the living roadmap that retainer partners access first. Each milestone connects to a tangible resource or program you can plug into.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {projectMilestones.map((milestone) => (
                <div key={milestone.title} className="flex h-full flex-col rounded-4xl border border-white/10 bg-white/5 p-7 backdrop-blur">
                  <span
                    className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${milestoneStatusStyles[milestone.status]}`}
                  >
                    <CalendarDays className="h-4 w-4" aria-hidden />
                    {milestone.status.replace('-', ' ')}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-white">{milestone.title}</h3>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">{milestone.description}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.35em] text-white/50">Focus</p>
                  <p className="text-sm text-white/60 leading-relaxed">{milestone.focus}</p>
                  {milestone.eta ? <p className="mt-3 text-xs text-white/50">{milestone.eta}</p> : null}
                  {milestone.cta ? (
                    <Link
                      href={milestone.cta.href}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:bg-white/10"
                    >
                      {milestone.cta.label}
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-4xl border border-white/10 bg-gradient-to-r from-primary-500/20 via-primary-600/15 to-sky-500/20 p-10 text-center">
            <h2 className="text-3xl font-semibold text-white">Ready to orchestrate your agent collective?</h2>
            <p className="mt-4 text-sm text-white/80 leading-relaxed">
              Start with a briefing, dive into a workshop, or craft a bespoke retainer. The FrankX agent team is ready to co-create systems that
              honor your people and accelerate your roadmap.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/start"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-100"
              >
                Schedule a briefing
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="mailto:hello@frankx.ai?subject=Conscious%20AI%20Engagement"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
              >
                Email the studio
                <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
