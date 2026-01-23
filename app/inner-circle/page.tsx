'use client'

import Link from 'next/link'
import { EmailSignup } from '@/components/email-signup'

// Metadata moved to layout or static export
const pageMetadata = {
  title: 'Inner Circle | Intelligence Vault & Creative Community',
  description:
    'Join the Inner Circle for exclusive access to intelligence vault, live ritual labs, and agentic support. Where creative pioneers build the future together.',
  keywords: [
    'frankx inner circle',
    'creative intelligence community',
    'creation chronicles vault',
    'agentic community',
    'creative intelligence membership'
  ],
  path: '/inner-circle'
}

const membershipBenefits = [
  {
    title: 'Creation Chronicles Vault',
    description:
      'Private library of prompt packs, templates, sonic drops, and behind-the-scenes tutorials updated weekly.'
  },
  {
    title: 'Live Ritual Labs',
    description: 'Monthly activation sessions for music, storytelling, and agent orchestration with the FrankX team.'
  },
  {
    title: 'Agent Desk Support',
    description: 'Submit prompts, workflows, or governance questions and receive guided responses from specialist agents.'
  }
]

const cadence = [
  {
    label: 'Weekly',
    title: 'Creation Chronicles Dispatch',
    description: 'Story + soundtrack + system drop to keep you building the Golden Age with momentum.'
  },
  {
    label: 'Monthly',
    title: 'Inner Circle Lab',
    description: 'Live run-through of new frameworks, Q&A, and breakout sessions with fellow members.'
  },
  {
    label: 'Quarterly',
    title: 'Strategy Intensives',
    description: 'Optional upgrade: deep-dive with the Agent Collective to recalibrate launches and governance.'
  }
]

const tiers = [
  {
    name: 'Signal',
    price: 'Free',
    description: 'Creation Chronicles newsletter + public drops to stay aligned with FrankX intelligence.',
    perks: ['Weekly dispatch', 'Early product notices', 'Selected Creation Chronicles essays'],
    ctaLabel: 'Join Creation Chronicles',
    ctaHref: 'https://frankx.ck.page/creation-chronicles'
  },
  {
    name: 'Inner Circle',
    price: 'Waitlist',
    description: 'Full Inner Circle access with vault, labs, private soundtrack releases, and direct agent support.',
    perks: ['Creation Chronicles vault', 'Live ritual labs', 'Priority agent desk support'],
    ctaLabel: 'Join Waitlist',
    ctaHref: '#signup'
  },
  {
    name: 'Alliance',
    price: 'Custom',
    description: 'Enterprise or studio partnership integrating Inner Circle benefits with bespoke strategy work.',
    perks: ['Executive briefings', 'Agentic dashboards', 'Co-created launches & governance'],
    ctaLabel: 'Request Strategy Intensive',
    ctaHref: 'mailto:hello@frankx.ai?subject=FrankX%20Alliance%20Inquiry'
  }
]

const waitlistForm = {
  description:
    'Add your email to be the first to receive Inner Circle pricing, launch bonuses, and the Inner Circle onboarding guide.'
}

export default function RealmPage() {
  return (
    <div className="min-h-screen bg-void text-slate-100">
      <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-primary-900/40 via-slate-950 to-purple-900/30">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-24 text-center">
          <span className="self-center rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            Inner Circle
          </span>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            The Inner Circle for Creative Intelligence Pioneers
          </h1>
          <p className="text-sm text-white/70 sm:text-base">
            Step behind the curtain. Access the vault, sonic rituals, and agent desk that keep our closest friends, family,
            and collaborators moving faster than the frontier.
          </p>
          <div className="max-w-md mx-auto">
            <EmailSignup
              listType="inner-circle"
              placeholder="Enter your email"
              buttonText="Join the Waitlist"
              redirectTo="/thank-you"
              showName={true}
            />
            <Link
              href="/creation-chronicles"
              className="mt-4 inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
            >
              Explore Creation Chronicles
            </Link>
          </div>
        </div>
      </header>

      <main className="space-y-20 py-16">
        <section className="px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-semibold text-white">Why the Inner Circle Exists</h2>
            <p className="mt-4 text-sm text-white/70">
              The Inner Circle packages everything we build so you can launch the Golden Age in your own world: daily stories,
              sonic frequency shifts, governance-ready playbooks, and direct access to the agent collective.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {membershipBenefits.map((benefit) => (
                <div key={benefit.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-3 text-sm text-white/70">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-3xl font-semibold text-white">Cadence & Rituals</h2>
            <p className="mt-3 text-sm text-white/70">
              Expect a rhythm that balances momentum with reflection. Every touchpoint is designed to inspire action and
              provide support.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {cadence.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
                  <div className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">{item.label}</div>
                  <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-semibold text-white text-center">Membership Pathway</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 text-center"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">{tier.name}</div>
                  <div className="mt-4 text-3xl font-bold text-primary-200">{tier.price}</div>
                  <p className="mt-3 text-sm text-white/70">{tier.description}</p>
                  <ul className="mt-5 flex-1 space-y-2 text-sm text-white/70 text-left list-disc list-inside">
                    {tier.perks.map((perk) => (
                      <li key={perk}>{perk}</li>
                    ))}
                  </ul>
                  <Link
                    href={tier.ctaHref}
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-purple-600 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:-translate-y-1"
                  >
                    {tier.ctaLabel}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <h2 className="text-3xl font-semibold text-white">Reserve Your Spot</h2>
            <p className="mt-3 text-sm text-white/70">{waitlistForm.description}</p>
            <div className="mt-6 flex justify-center">
              <EmailSignup
                listType="inner-circle"
                placeholder="Enter your email"
                buttonText="Join the Waitlist"
                redirectTo="/thank-you"
                showName={true}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

