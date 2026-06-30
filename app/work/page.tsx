import Link from 'next/link'
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  FileText,
  Gauge,
  GitBranch,
  Home,
  KeyRound,
  Layers3,
  LifeBuoy,
  LockKeyhole,
  Route,
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import {
  listEngagements,
  listLiveSubstrate,
  listLiveWhitelabelOrCreator,
  listPast,
} from '@/content/work'
import { EngagementCard } from '@/components/work/EngagementCard'
import { PropertyExperiencePreview } from '@/components/work/PropertyExperiencePreview'

export const metadata = createMetadata({
  title: 'Work - Property Intelligence OS | FrankX',
  description:
    'A premium rental-property operating system: repo-native owner workspace, renter portal, listing studio, support triage, and agent-assisted workflows.',
  path: '/work',
})

const SITE_URL = 'https://frankx.ai'

const proof = [
  {
    label: 'Operating spine',
    value: '4 repos',
    detail: 'strategy source, owner template, brother install, Vercel portal',
  },
  {
    label: 'Agent team',
    value: '9 roles',
    detail: 'steward, concierge, listing ops, maintenance, privacy, visual QA',
  },
  {
    label: 'Listing flow',
    value: '4 channels',
    detail: 'own website, Kleinanzeigen, ImmoScout24, Immowelt',
  },
  {
    label: 'V1 trust rule',
    value: 'Human gate',
    detail: 'no pricing, lease, availability, or urgent commitments without owner approval',
  },
]

const repoStack = [
  {
    name: 'property-intelligence-system',
    role: 'Private product source',
    detail: 'Research, operating manual, schemas, governance, release gates, and commercial roadmap.',
    icon: GitBranch,
  },
  {
    name: 'property-os-template',
    role: 'Public-safe owner template',
    detail: 'Codex and Claude-ready workspace with runbooks, issue templates, approval gates, and privacy scans.',
    icon: FileText,
  },
  {
    name: 'brother-property-os',
    role: 'First private install',
    detail: 'Placeholder-safe German pilot workspace ready for approved real property facts and owner workflows.',
    icon: Home,
  },
  {
    name: 'property-portal-template',
    role: 'Vercel renter portal',
    detail: 'Next.js App Router portal with property page, inquiry flow, renter support, owner cockpit, and listing admin.',
    icon: Gauge,
  },
]

const operatingLoop = [
  'Capture approved property facts once.',
  'Publish a premium renter-facing self-service layer.',
  'Draft channel-ready listings under owner review.',
  'Route inquiries and maintenance into a clean owner queue.',
  'Review vacancy, pricing proof, support risk, and next actions weekly.',
]

const successCriteria = [
  'A renter can answer common stay, support, and suitability questions without messaging the owner.',
  'The owner sees only the decisions that matter: availability, price, legal terms, urgent issues, and publication.',
  'Every listing draft carries its missing-fact checklist before it reaches a public channel.',
  'No renter names, access secrets, payment details, or private owner facts enter public/template artifacts.',
  'The visual experience feels like a premium property operator, not a generic AI SaaS dashboard.',
]

const relatedLinks = [
  {
    title: 'Hospitality Intelligence',
    href: '/hospitality-intelligence',
    detail: 'The neighboring hospitality operating-system surface already live in the FrankX ecosystem.',
    external: false,
  },
  {
    title: 'Hospitality OS',
    href: '/hospitality-os',
    detail: 'Related owner/operator workflow thinking for stays, guest care, and property experience.',
    external: false,
  },
  {
    title: 'Jojo Hospitality Kit',
    href: '/downloads/jojo-hospitality-intelligence-kit',
    detail: 'Download-kit pattern for turning a private operator system into a repeatable public asset.',
    external: false,
  },
  {
    title: 'AI Architecture Templates',
    href: '/ai-architecture/templates',
    detail: 'Where the reusable template and install offer can sit once the pilot proof is packaged.',
    external: false,
  },
  {
    title: 'Agent Team',
    href: '/agent-team',
    detail: 'The broader FrankX agent-team pattern this property OS specializes for real estate operations.',
    external: false,
  },
  {
    title: 'GitHub source universe',
    href: 'https://github.com/frankxai',
    detail: 'Public FrankX repositories and open-source substrate when a repo is ready to publish.',
    external: true,
  },
]

export default function WorkHubPage() {
  const liveSubstrate = listLiveSubstrate()
  const liveWhitelabelOrCreator = listLiveWhitelabelOrCreator()
  const past = listPast()
  const all = listEngagements()

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/work` },
    ],
  }

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'FrankX work - Property Intelligence OS and substrate-provider engagements',
    description:
      'A premium work surface for FrankX systems: property intelligence, renter portals, owner operating systems, and substrate-provider engagements.',
    url: `${SITE_URL}/work`,
    hasPart: [
      {
        '@type': 'CreativeWork',
        name: 'Property Intelligence OS',
        url: `${SITE_URL}/work#property-intelligence-os`,
      },
      ...all.map((e) => ({
        '@type': 'WebPage',
        name: e.name,
        url: `${SITE_URL}/work/${e.slug}`,
      })),
    ],
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

      <section
        id="property-intelligence-os"
        className="relative min-h-[calc(100vh-4rem)] overflow-hidden border-b border-white/10 pt-28 sm:pt-32"
      >
        <HeroAtmosphere />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pb-20">
          <div className="flex min-h-[68vh] flex-col justify-center">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-300/70">
              FrankX Work / Property Intelligence OS
            </p>
            <h1
              className="max-w-4xl text-5xl font-bold leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-7xl"
              style={{
                fontFamily: 'var(--font-poppins, Poppins), Inter, sans-serif',
              }}
            >
              A premium operating system for rental properties.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Built brother-first for German rental operations, then packaged as a repeatable GitHub and Vercel template: owner workspace, renter portal, listing studio, support triage, and Codex/Claude-ready workflows.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#example"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#04110f] transition-colors hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/70 focus:ring-offset-2 focus:ring-offset-[#0a0a0b]"
              >
                Explore the example
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="#related"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-white/35"
              >
                Link map
              </Link>
            </div>
          </div>

          <HeroCommandSurface />
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#080b0d] py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 px-0 sm:grid-cols-2 lg:grid-cols-4">
          {proof.map((item) => (
            <article key={item.label} className="bg-[#0a0d10] p-6 sm:p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300/60">
                {item.label}
              </p>
              <strong className="mt-3 block text-2xl font-semibold tracking-tight text-white">
                {item.value}
              </strong>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="example" className="border-b border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Example experience"
            title="One property, four calm surfaces."
            copy="The premium move is not a louder dashboard. It is a renter page that answers questions, an owner cockpit that preserves decisions, and agents that draft without overstepping."
          />
          <PropertyExperiencePreview />
        </div>
      </section>

      <section id="operating-system" className="border-b border-white/10 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-[0.84fr_1.16fr] lg:px-8">
          <div>
            <SectionHeader
              eyebrow="Operating system"
              title="The repo is the source of approved truth."
              copy="Small owners do not need a heavy property-management suite first. They need a premium front desk, a clean renter answer layer, and a disciplined work queue."
            />
          </div>
          <div className="grid gap-3">
            {repoStack.map((repo) => {
              const Icon = repo.icon
              return (
                <article
                  key={repo.name}
                  className="grid grid-cols-[auto_1fr] gap-4 rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_1px_0_rgba(255,255,255,0.05)_inset]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-200">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-mono text-sm font-semibold text-white">
                        {repo.name}
                      </h3>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-400">
                        {repo.role}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{repo.detail}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-[#0d1116] p-7 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-200">
                <Route className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300/60">
                  Weekly loop
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  How the owner runs it.
                </h2>
              </div>
            </div>
            <ol className="grid gap-3">
              {operatingLoop.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[2rem_1fr] gap-3 rounded-2xl border border-white/8 bg-white/[0.025] p-4"
                >
                  <span className="font-mono text-sm text-emerald-200">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm leading-6 text-slate-300">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#0d1116] p-7 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-300/10 text-amber-200">
                <CheckCircle2 className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/60">
                  Success criteria
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  The bar is operational proof.
                </h2>
              </div>
            </div>
            <ul className="grid gap-3">
              {successCriteria.map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-white/8 bg-white/[0.025] p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-200" aria-hidden />
                  <span className="text-sm leading-6 text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="related" className="border-b border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Related FrankX surfaces"
            title="The property work sits inside the larger FrankX system."
            copy="This launch page points into the existing hospitality, template, agent, and architecture surfaces so the property OS does not live as an isolated demo."
          />
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relatedLinks.map((link) => (
              <RelatedLinkCard key={link.href} {...link} />
            ))}
          </div>
        </div>
      </section>

      <EngagementRegistry
        liveSubstrate={liveSubstrate}
        liveWhitelabelOrCreator={liveWhitelabelOrCreator}
        past={past}
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-300/60">
            Private install path
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            First prove it for one real owner. Then package the template.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">
            The brother pilot becomes the evidence. The template becomes the product. The premium web experience becomes the reason owners can charge more and answer less.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-[#0a0a0b]"
            >
              Plan an install
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/ai-architecture/templates"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-white/35"
            >
              Template lane
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] opacity-30" />
      <div className="absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-emerald-400/[0.09] blur-[140px]" />
      <div className="absolute right-[-12rem] top-28 h-[34rem] w-[34rem] rounded-full bg-cyan-400/[0.08] blur-[130px]" />
      <div className="absolute bottom-[-12rem] left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-amber-300/[0.05] blur-[120px]" />
    </div>
  )
}

function HeroCommandSurface() {
  return (
    <div className="relative flex min-h-[68vh] items-center lg:pl-4">
      <div className="relative w-full overflow-hidden rounded-[2.4rem] border border-white/12 bg-[#0b0f14]/85 p-4 shadow-[0_40px_140px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-5">
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent" aria-hidden />
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.035] p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300/60">
                  Owner cockpit
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">
                  Urban Haven Sample
                </h2>
              </div>
              <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-100">
                approval gates active
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                ['Listings', '4 drafts'],
                ['Support', '2 queued'],
                ['Vacancy', 'owner review'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/8 bg-black/20 p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3">
              {[
                {
                  label: 'Inquiry Concierge',
                  value: 'Draft reply from approved facts only',
                  icon: Bot,
                },
                {
                  label: 'Maintenance Triage',
                  value: 'Urgent path requires owner confirmation',
                  icon: LifeBuoy,
                },
                {
                  label: 'Listing Ops',
                  value: 'Kleinanzeigen copy ready for review',
                  icon: ClipboardList,
                },
              ].map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.025] p-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-200">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="text-xs text-slate-500">{value}</p>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200">
                  <KeyRound className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-200/60">
                    Renter portal
                  </p>
                  <p className="text-sm text-white">Move-in information without access secrets in Git.</p>
                </div>
              </div>
              <div className="space-y-2">
                {['Wi-Fi policy', 'Trash schedule', 'Urgent escalation'].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-xl bg-black/20 px-3 py-2">
                    <span className="text-xs text-slate-300">{item}</span>
                    <LockKeyhole className="h-3.5 w-3.5 text-emerald-200" aria-hidden />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300/60">
                Channel studio
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {['Own site', 'Kleinanzeigen', 'ImmoScout24', 'Immowelt'].map((channel) => (
                  <div key={channel} className="rounded-xl border border-white/8 bg-black/20 px-3 py-2 text-xs text-slate-300">
                    {channel}
                  </div>
                ))}
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string
  title: string
  copy: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-300/60">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">{copy}</p>
    </div>
  )
}

function RelatedLinkCard({
  title,
  href,
  detail,
  external,
}: {
  title: string
  href: string
  detail: string
  external: boolean
}) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-6 transition-colors hover:border-emerald-300/25 hover:bg-white/[0.055] focus:outline-none focus:ring-2 focus:ring-emerald-300/50"
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.05] text-emerald-200">
          {external ? <ExternalLink className="h-5 w-5" aria-hidden /> : <Layers3 className="h-5 w-5" aria-hidden />}
        </div>
        <ArrowUpRight className="h-4 w-4 text-slate-500 transition-colors group-hover:text-emerald-200" aria-hidden />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
    </Link>
  )
}

function EngagementRegistry({
  liveSubstrate,
  liveWhitelabelOrCreator,
  past,
}: {
  liveSubstrate: ReturnType<typeof listLiveSubstrate>
  liveWhitelabelOrCreator: ReturnType<typeof listLiveWhitelabelOrCreator>
  past: ReturnType<typeof listPast>
}) {
  const hasPublicEngagements =
    liveSubstrate.length > 0 || liveWhitelabelOrCreator.length > 0 || past.length > 0

  return (
    <section className="border-b border-white/10 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Work registry"
          title="Public engagements publish only after consent."
          copy="The property OS can be shown because it uses template-safe sample facts. Client engagements stay private until the framing is approved."
        />

        {hasPublicEngagements ? (
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...liveSubstrate, ...liveWhitelabelOrCreator, ...past].map((engagement) => (
              <EngagementCard key={engagement.slug} engagement={engagement} />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              ['Private intake', 'Client work remains off the public route until consent is explicit.'],
              ['Template-safe proof', 'The property OS example uses approved sample facts and no renter data.'],
              ['Production path', 'The next public artifacts are install notes, template downloads, and a Vercel preview.'],
            ].map(([title, body]) => (
              <article key={title} className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300/60">
                  {title}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
