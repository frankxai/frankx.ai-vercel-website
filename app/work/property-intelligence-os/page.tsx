import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  CopyCheck,
  Cpu,
  Database,
  Download,
  ExternalLink,
  FileText,
  Gauge,
  GitBranch,
  Home,
  KeyRound,
  Layers3,
  LifeBuoy,
  LockKeyhole,
  PackageOpen,
  PlugZap,
  Rocket,
  Route,
  ServerCog,
  ShieldCheck,
  Store,
  UsersRound,
  Workflow,
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { PropertyExperiencePreview } from '@/components/work/PropertyExperiencePreview'

export const metadata = createMetadata({
  title: 'Work - Property Intelligence OS',
  description:
    'A premium rental-property operating system and downloadable starter kit: repo-native owner workspace, renter portal, listing studio, support triage, and Codex/Claude-ready workflows.',
  path: '/work/property-intelligence-os',
})

const SITE_URL = 'https://frankx.ai'
const version = '0.1.0'
const releaseDate = '2026-07-05'
const assetName = `property-intelligence-starter-kit-v${version}.zip`
const zipUrl = `/downloads/${assetName}`
const checksumUrl = `/downloads/property-intelligence-starter-kit-v${version}.sha256`
const checksumSha256 =
  '7a6c9b171be77a54e366796dc5f1997e8455680d8deeaa94c014c77782e8070e'

const downloadAssets = [
  {
    title: 'Starter kit ZIP',
    href: zipUrl,
    detail: 'Public-safe package with the product manifest, README, v0/Vercel prompt, and partner implementation guide.',
    icon: PackageOpen,
    cta: 'Download ZIP',
  },
  {
    title: 'v0 / Vercel prompt',
    href: `/downloads/property-intelligence-starter-kit-v${version}/V0_PROMPT.md`,
    detail: 'A build brief for recreating the portal experience with modern Next.js and Vercel defaults.',
    icon: Rocket,
    cta: 'Open prompt',
  },
  {
    title: 'Partner guide',
    href: `/downloads/property-intelligence-starter-kit-v${version}/PARTNER_IMPLEMENTATION.md`,
    detail: 'How an implementer packages this into paid installs, retainers, and premium owner operations.',
    icon: BriefcaseBusiness,
    cta: 'Open guide',
  },
  {
    title: 'Agent team map',
    href: `/downloads/property-intelligence-starter-kit-v${version}/AGENT_TEAM.md`,
    detail: 'Role-by-role operating model for steward, listing, inquiry, renter guide, maintenance, privacy, QA, and partner agents.',
    icon: UsersRound,
    cta: 'Open agents',
  },
  {
    title: 'MCP architecture',
    href: `/downloads/property-intelligence-starter-kit-v${version}/MCP_RAILWAY_ARCHITECTURE.md`,
    detail: 'Railway-ready MCP boundary with resources, tools, prompts, environment variables, health checks, and safety rules.',
    icon: ServerCog,
    cta: 'Open MCP',
  },
  {
    title: 'Install runbook',
    href: `/downloads/property-intelligence-starter-kit-v${version}/INSTALL_RUNBOOK.md`,
    detail: 'Step-by-step owner or agency installation path from repos to preview to agent dry-runs and retainer loop.',
    icon: Workflow,
    cta: 'Open runbook',
  },
  {
    title: 'Release manifest',
    href: `/downloads/property-intelligence-starter-kit-v${version}/manifest.json`,
    detail: 'Machine-readable scope, boundaries, repos, gates, and template positioning for the release.',
    icon: CopyCheck,
    cta: 'Open manifest',
  },
]

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
  {
    label: 'Public kit',
    value: `v${version}`,
    detail: 'downloadable ZIP, checksum, v0 prompt, partner guide, release manifest',
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
  'An implementer can fork the template, install it for one owner, and sell a managed operating service.',
  'The visual experience feels like a premium property operator, not a generic AI SaaS dashboard.',
]

const productLanes = [
  {
    title: 'Owner self-service',
    copy: 'A property owner can add approved facts, publish a premium property page, review inquiries, and approve agent drafts without learning a heavy suite first.',
    icon: Home,
  },
  {
    title: 'Renter self-service',
    copy: 'A renter gets one calm portal for stay or rental information, support, documents, renewal interest, and urgent escalation.',
    icon: KeyRound,
  },
  {
    title: 'Implementer business',
    copy: 'A partner can sell setup, content migration, listing refresh, support knowledge-base hardening, and managed weekly operations.',
    icon: UsersRound,
  },
  {
    title: 'Agency operating layer',
    copy: 'A real estate agency can standardize property websites, inquiry triage, vacancy reporting, and approved answer workflows across a portfolio.',
    icon: Store,
  },
]

const platformLayers = [
  {
    title: 'Premium web layer',
    detail: 'Next.js App Router on Vercel: property pages, renter portal, inquiry/support forms, owner dashboard, listing studio, and preview gates.',
    icon: Gauge,
  },
  {
    title: 'Approved source layer',
    detail: 'GitHub and MDX/YAML hold public-safe property facts, policies, listing copy, FAQs, workflow docs, and release decisions.',
    icon: GitBranch,
  },
  {
    title: 'Runtime data layer',
    detail: 'Secure database and object storage handle inquiries, tickets, renter sessions, documents, and sanitized issue summaries.',
    icon: Database,
  },
  {
    title: 'Agent service layer',
    detail: 'Codex, Claude Code, role markdown, skills, commands, approval checkpoints, and MCP tools draft work without making owner commitments.',
    icon: Cpu,
  },
  {
    title: 'Hosted MCP layer',
    detail: 'Railway-ready MCP service exposes property search, listing draft, support triage, approval status, and privacy-scan tools.',
    icon: ServerCog,
  },
  {
    title: 'Integration layer',
    detail: 'EstateSync, ImmoScout24, Kleinanzeigen, Immowelt, email, WhatsApp, calendar, Stripe, e-signature, and vendor routing enter after manual proof.',
    icon: PlugZap,
  },
]

const businessModels = [
  {
    title: 'Community template',
    price: 'Free / open-core',
    detail: 'Public starter kit and Vercel/v0 prompt create reach, trust, and implementer adoption.',
    icon: PackageOpen,
  },
  {
    title: 'Owner install',
    price: '1,500-7,500 EUR setup',
    detail: 'Property onboarding, facts, photos, portal, inquiry flow, listing drafts, and owner training.',
    icon: Home,
  },
  {
    title: 'Managed operating service',
    price: '300-2,000 EUR monthly',
    detail: 'Weekly owner review, FAQ updates, listing refresh, support knowledge hygiene, analytics, and agent run audit.',
    icon: Workflow,
  },
  {
    title: 'Agency/partner license',
    price: 'Revenue share or seat bundle',
    detail: 'White-label implementation playbook, private install runbook, support standards, and premium quality gates.',
    icon: BriefcaseBusiness,
  },
]

const launchGates = [
  'Public repo release contains no renter data, access secrets, owner-private facts, or hidden credentials.',
  'Portal passes lint, typecheck, build, smoke, mobile/desktop visual QA, and Vercel preview verification.',
  'MCP server passes tool smoke tests and runs with least-privilege environment variables on Railway or equivalent.',
  'Human approval is mandatory for pricing, availability, lease terms, refunds, legal statements, urgent repairs, and personal data.',
  'Partner can complete a sample install from the download kit, template repos, and setup checklist without founder intervention.',
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
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/work` },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Property Intelligence OS',
        item: `${SITE_URL}/work/property-intelligence-os`,
      },
    ],
  }

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'FrankX work - Property Intelligence OS',
    description:
      'A premium work surface for the FrankX Property Intelligence OS: renter portal, owner workspace, listing studio, support triage, and approval-gated agent workflows.',
    url: `${SITE_URL}/work/property-intelligence-os`,
    isPartOf: {
      '@type': 'CollectionPage',
      name: 'FrankX work',
      url: `${SITE_URL}/work`,
    },
    hasPart: [
      {
        '@type': 'CreativeWork',
        name: 'Property Intelligence OS',
        url: `${SITE_URL}/work/property-intelligence-os`,
      },
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
        className="relative min-h-[88vh] overflow-hidden border-b border-white/10 pt-28 sm:pt-32"
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
              Built brother-first for German rental operations, then packaged as a repeatable GitHub and Vercel template: owner workspace, renter portal, listing studio, support triage, Railway-ready MCP, and Codex/Claude workflows.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={zipUrl}
                download={assetName}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#04110f] transition-colors hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/70 focus:ring-offset-2 focus:ring-offset-[#0a0a0b]"
              >
                Download starter kit
                <Download className="h-4 w-4" aria-hidden />
              </a>
              <Link
                href="#architecture"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-white/35"
              >
                See architecture
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          <HeroProductVisual />
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#080b0d] py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 px-0 sm:grid-cols-2 lg:grid-cols-5">
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

      <DownloadKitSection />

      <section className="border-b border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Self-service product"
            title="The product serves the owner, renter, implementer, and agency."
            copy="The market is full of property tools. The wedge here is an AI-native operating layer that is easy to install, safe to supervise, and premium enough to justify better renter expectations."
          />
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {productLanes.map((lane) => {
              const Icon = lane.icon
              return (
                <article
                  key={lane.title}
                  className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_1px_0_rgba(255,255,255,0.05)_inset]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-200">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">{lane.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{lane.copy}</p>
                </article>
              )
            })}
          </div>
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

      <ArchitectureSection />

      <BusinessModelSection />

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
      <div className="absolute inset-0 bg-[#070a0c]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_18%,rgba(45,212,191,0.16),transparent_46%),linear-gradient(145deg,rgba(16,185,129,0.08),transparent_38%,rgba(245,158,11,0.055))]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080b0d] to-transparent" />
    </div>
  )
}

function HeroProductVisual() {
  return (
    <div className="relative flex min-h-[68vh] items-center lg:pl-4">
      <div className="relative w-full overflow-hidden rounded-[2.4rem] border border-white/12 bg-[#0b0f14]/85 p-4 shadow-[0_40px_140px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-5">
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent" aria-hidden />
        <div className="rounded-[1.8rem] border border-white/10 bg-black/25 p-3 sm:p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300/60">
                Live template proof
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">
                Vercel renter portal and owner cockpit
              </h2>
            </div>
            <a
              href={zipUrl}
              download={assetName}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3.5 py-2 text-xs font-semibold text-emerald-100 transition-colors hover:bg-emerald-300/15"
            >
              <Download className="h-3.5 w-3.5" aria-hidden />
              v{version} kit
            </a>
          </div>

          <div className="overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#080b0d]">
            <Image
              src="/images/property-intelligence/portal-desktop.png"
              alt="Property Intelligence OS portal desktop preview"
              width={1440}
              height={1000}
              priority
              className="h-auto w-full"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                label: 'Agent drafts',
                value: 'Codex and Claude ready',
                icon: Bot,
              },
              {
                label: 'Human gates',
                value: 'approval before commitments',
                icon: ShieldCheck,
              },
              {
                label: 'Runtime',
                value: 'Vercel + Railway MCP path',
                icon: ServerCog,
              },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-white/8 bg-white/[0.035] p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-200">
                  <Icon className="h-4 w-4" aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs leading-5 text-slate-500">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DownloadKitSection() {
  return (
    <section id="download-kit" className="border-b border-white/10 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div>
          <SectionHeader
            eyebrow="Public release candidate"
            title="A real starter kit people can download, fork, and sell around."
            copy="The free package is deliberately useful but bounded: it gives owners and implementers the operating model, the build prompt, and partner guide without leaking private install data."
          />
          <div className="mt-7 rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-200">
                <LockKeyhole className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Safe public boundary</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  The download contains template strategy, not renter data. Private property facts, portal access codes, payments, lease terms, and owner decisions stay inside the installed workspace.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[#0d1116] p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {downloadAssets.map((asset) => {
              const Icon = asset.icon
              return (
                <a
                  key={asset.title}
                  href={asset.href}
                  download={asset.href === zipUrl ? assetName : undefined}
                  className="group rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-5 transition-colors hover:border-emerald-300/25 hover:bg-white/[0.055] focus:outline-none focus:ring-2 focus:ring-emerald-300/50"
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-200">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-100">
                      {asset.cta}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">{asset.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{asset.detail}</p>
                </a>
              )
            })}
          </div>

          <div className="mt-5 rounded-[1.45rem] border border-white/10 bg-black/20 p-5">
            <dl className="grid gap-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-slate-500">Version</dt>
                <dd className="mt-1 font-mono text-emerald-100">v{version}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Released</dt>
                <dd className="mt-1 font-mono text-slate-300">{releaseDate}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Checksum</dt>
                <dd className="mt-1">
                  <a href={checksumUrl} className="font-mono text-xs leading-5 text-emerald-100 hover:text-emerald-200">
                    {checksumSha256.slice(0, 18)}...
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArchitectureSection() {
  return (
    <section id="architecture" className="border-b border-white/10 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Hosted AI architecture"
          title="Vercel front end, GitHub source of truth, Railway-ready MCP, human approvals."
          copy="This is designed as agentic-as-a-service infrastructure: the agents know their lanes, the data boundary is explicit, and integrations are added only after the manual workflow proves useful."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {platformLayers.map((layer) => {
            const Icon = layer.icon
            return (
              <article
                key={layer.title}
                className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_1px_0_rgba(255,255,255,0.05)_inset]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-white">{layer.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{layer.detail}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function BusinessModelSection() {
  return (
    <section id="partner-business" className="border-b border-white/10 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-[1.12fr_0.88fr] lg:px-8">
        <div>
          <SectionHeader
            eyebrow="Business substrate"
            title="Free template at the edge, paid installs and managed operations in the center."
            copy="The winning shape is not only software. It is a productized service business: implementers can sell setup, owners get relief, renters get clarity, and agencies get a repeatable premium operating standard."
          />
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {businessModels.map((model) => {
              const Icon = model.icon
              return (
                <article
                  key={model.title}
                  className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_1px_0_rgba(255,255,255,0.05)_inset]"
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10 text-amber-100">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-slate-300">
                      {model.price}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">{model.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{model.detail}</p>
                </article>
              )
            })}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-white/10 bg-[#0d1116] p-6 sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-200">
              <ShieldCheck className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300/60">
                Launch gates
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Product-ready means verifiable.
              </h2>
            </div>
          </div>
          <ul className="grid gap-3">
            {launchGates.map((gate) => (
              <li
                key={gate}
                className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-white/8 bg-white/[0.025] p-4"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-200" aria-hidden />
                <span className="text-sm leading-6 text-slate-300">{gate}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
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
