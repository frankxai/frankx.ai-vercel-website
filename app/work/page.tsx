import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import {
  listEngagements,
  listLiveSubstrate,
  listLiveWhitelabelOrCreator,
  listPast,
} from '@/content/work'
import { EngagementCard } from '@/components/work/EngagementCard'

export const metadata = createMetadata({
  title: 'Work — Substrate-provider engagements | FrankX',
  description:
    'Where Frank Riemer builds with creators and companies. Open-source substrate underneath a bounded consulting layer. Sovereign on both sides — not employee, not on the deck.',
  path: '/work',
})

const SITE_URL = 'https://frankx.ai'

export default function WorkHubPage() {
  const liveSubstrate = listLiveSubstrate()
  const liveWhitelabelOrCreator = listLiveWhitelabelOrCreator()
  const past = listPast()
  const all = listEngagements()

  const isEmpty =
    liveSubstrate.length === 0 &&
    liveWhitelabelOrCreator.length === 0 &&
    past.length === 0

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Work',
        item: `${SITE_URL}/work`,
      },
    ],
  }

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'FrankX work — substrate-provider engagements',
    description:
      'How Frank Riemer collaborates with creators and companies — substrate-provider engagements, whitelabel and creator builds, past work.',
    url: `${SITE_URL}/work`,
    hasPart: all.map((e) => ({
      '@type': 'WebPage',
      name: e.name,
      url: `${SITE_URL}/work/${e.slug}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.06] via-transparent to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(6,182,212,0.06),_transparent_60%)]"
        />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            Work
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-5 max-w-3xl"
            style={{
              fontFamily: 'var(--font-poppins, Poppins), Inter, sans-serif',
            }}
          >
            Where I build with creators and companies.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
            Substrate provider. Not employee. Not on the deck. Frank ships
            open-source substrate underneath the engagement; the client builds
            their business on top. Both stay sovereign.
          </p>
        </div>
      </section>

      <FeaturedSystemsSection />

      {/* Empty state — first substrate engagement is private until consent */}
      {isEmpty ? (
        <EmptyHubExplainer />
      ) : (
        <>
          {/* Substrate engagements */}
          {liveSubstrate.length > 0 ? (
            <SectionShell
              eyebrow="Substrate engagements"
              heading="Open substrate underneath the build."
              intro="The client keeps the brand, the clients, and the equity. Frank keeps the substrate open. Both stay sovereign."
              id="substrate"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                {liveSubstrate.map((e) => (
                  <EngagementCard key={e.slug} engagement={e} />
                ))}
              </div>
            </SectionShell>
          ) : (
            <SectionShell
              eyebrow="Substrate engagements"
              heading="First substrate engagement publishes once consent is granted."
              intro="A boutique coaching company is currently in the substrate-provider conversation. The page goes live the moment they ratify the framing."
              id="substrate"
            >
              <EmptyRowCard
                title="In private intake"
                body="An engagement is being shaped under NDA. When the client consents to public substrate-provider framing, the card and detail page publish here."
              />
            </SectionShell>
          )}

          {/* Whitelabel + creator builds */}
          {liveWhitelabelOrCreator.length > 0 ? (
            <SectionShell
              eyebrow="Whitelabel and creator builds"
              heading="Frank's tech under the client's brand, or a single-creator hub built end-to-end."
              intro="Same engineering bar as the substrate work — different commercial shape."
              id="whitelabel"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                {liveWhitelabelOrCreator.map((e) => (
                  <EngagementCard key={e.slug} engagement={e} />
                ))}
              </div>
            </SectionShell>
          ) : null}

          {/* Past work */}
          {past.length > 0 ? (
            <SectionShell
              eyebrow="Past work"
              heading="Shipped and done."
              intro="Engagements that closed cleanly. Case studies link below."
              id="past"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                {past.map((e) => (
                  <EngagementCard key={e.slug} engagement={e} />
                ))}
              </div>
            </SectionShell>
          ) : null}
        </>
      )}

      {/* Cross-link to partnerships + substrate */}
      <CrossLinkRow />

      {/* Closing CTA */}
      <section className="border-t border-white/5 py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-500/[0.08] via-white/[0.02] to-transparent border border-emerald-500/20 p-8 sm:p-12 text-center">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/70 font-medium mb-4">
              Substrate-provider conversation
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3 leading-snug">
              If a substrate-first engagement maps to where you&apos;re going.
            </h2>
            <p className="text-sm text-zinc-400 mb-6 max-w-md mx-auto leading-relaxed">
              30 minutes. Peer-architect. We walk through where the open
              substrate fits, what the bounded consulting layer would cover,
              and whether both sides stay sovereign through it.
            </p>
            <Link
              href="https://calendar.app.google/xS56zYpYw69R9vQj6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-[#0a0a0b]"
            >
              Open the conversation
              <ArrowUpRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function FeaturedSystemsSection() {
  return (
    <section
      aria-labelledby="featured-systems-heading"
      className="border-t border-white/5 py-14 lg:py-16"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
            Featured systems
          </p>
          <h2
            id="featured-systems-heading"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight"
          >
            Current build surfaces that sit under the work hub.
          </h2>
        </div>
        <Link
          href="/work/property-intelligence-os"
          className="group block rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.045] p-5 transition-colors hover:border-emerald-300/35 hover:bg-emerald-400/[0.07] focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-200">
                  Property Intelligence OS
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-emerald-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </div>
              <p className="text-lg font-semibold text-white">
                Rental-property operating system, renter portal, listing
                studio, and owner approval workflow.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                The premium example experience now lives on its own work
                subpage, with the hub remaining the broader engagement index.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-left md:min-w-[320px]">
              {[
                ['4 repos', 'template stack'],
                ['9 roles', 'agent team'],
                ['4 channels', 'listing flow'],
              ].map(([value, label]) => (
                <div
                  key={value}
                  className="rounded-xl border border-white/10 bg-black/20 p-3"
                >
                  <p className="text-sm font-semibold text-white">{value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Section shell — eyebrow + heading + intro + children                        */
/* -------------------------------------------------------------------------- */

function SectionShell({
  eyebrow,
  heading,
  intro,
  id,
  children,
}: {
  eyebrow: string
  heading: string
  intro: string
  id: string
  children: React.ReactNode
}) {
  const headingId = `${id}-heading`
  return (
    <section
      aria-labelledby={headingId}
      className="border-t border-white/5 py-20 lg:py-24"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            {eyebrow}
          </p>
          <h2
            id={headingId}
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3"
          >
            {heading}
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">{intro}</p>
        </div>
        {children}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Empty-state explainer — renders when no live or past engagements public    */
/* -------------------------------------------------------------------------- */

function EmptyHubExplainer() {
  return (
    <section
      aria-labelledby="empty-hub-heading"
      className="border-t border-white/5 py-20 lg:py-24"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
          What this hub is for
        </p>
        <h2
          id="empty-hub-heading"
          className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-5"
        >
          The substrate-provider model, made public.
        </h2>
        <div className="space-y-5 text-base text-zinc-300 leading-relaxed">
          <p>
            Frank builds open-source substrate — Starlight Intelligence
            System, ACOS, Library OS — under MIT licenses at{' '}
            <Link
              href="https://github.com/frankxai"
              className="text-emerald-300 hover:text-emerald-200 underline decoration-emerald-300/30 underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/frankxai
            </Link>
            . When a creator or company wants to build on top, the engagement
            is a bounded consulting layer over the open spine. The client keeps
            the brand, the clients, and the equity. Frank keeps the substrate
            open. Both stay sovereign.
          </p>
          <p>
            First engagements are currently in private intake. The cards
            publish here when the client consents to the substrate-provider
            framing. Past work will land in the lower section as it clears.
          </p>
          <p>
            The shape: no equity, no exclusive licensing, no salary, no deck
            slot. Quarterly architecture review plus a bounded async window.
            Renewable, ratified each quarter.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <SidebarLink
            href="/partnerships"
            eyebrow="Partnerships"
            label="Model and platform provider conversations"
          />
          <SidebarLink
            href="/research"
            eyebrow="Research"
            label="What the practice is publishing publicly"
          />
          <SidebarLink
            href="/starlight-intelligence-system"
            eyebrow="Substrate"
            label="Starlight Intelligence System — the open spine"
          />
        </div>
      </div>
    </section>
  )
}

function EmptyRowCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl bg-white/[0.025] border border-white/[0.08] border-dashed p-6">
      <p className="text-[11px] tracking-[0.2em] uppercase text-emerald-400/60 font-medium mb-3">
        {title}
      </p>
      <p className="text-sm text-zinc-400 leading-relaxed">{body}</p>
    </article>
  )
}

function SidebarLink({
  href,
  eyebrow,
  label,
}: {
  href: string
  eyebrow: string
  label: string
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl bg-white/[0.025] border border-white/[0.08] p-4 transition-colors hover:bg-white/[0.04] hover:border-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
    >
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-[10px] tracking-[0.2em] uppercase text-emerald-400/60 font-medium">
          {eyebrow}
        </p>
        <ArrowUpRight
          className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-300 transition-colors"
          aria-hidden
        />
      </div>
      <p className="text-sm text-zinc-300 leading-relaxed">{label}</p>
    </Link>
  )
}

/* -------------------------------------------------------------------------- */
/* Cross-link row — quiet jump to /partnerships                                */
/* -------------------------------------------------------------------------- */

function CrossLinkRow() {
  return (
    <section className="border-t border-white/5 py-16 lg:py-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-sm text-zinc-500 mb-3">
          Looking for the model, cloud, and silicon provider conversations?
        </p>
        <Link
          href="/partnerships"
          className="inline-flex items-center gap-1.5 text-sm text-emerald-300 hover:text-emerald-200 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400/60 rounded"
        >
          Partnerships hub
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
        </Link>
      </div>
    </section>
  )
}
