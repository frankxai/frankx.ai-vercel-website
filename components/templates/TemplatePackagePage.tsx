import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  Code2,
  FileText,
  GitPullRequest,
  Image as ImageIcon,
  Layers,
  ShieldCheck,
  Sparkles,
  Waypoints,
} from 'lucide-react'

import {
  getV0TemplatePath,
  type V0TemplateEntry,
  type V0TemplateBrand,
  type V0TemplateChannel,
} from '@/data/v0-template-library'
import { getV0TemplateBlueprint } from '@/data/v0-template-blueprints'
import { getV0TemplateDemandPlan } from '@/data/v0-template-demand'
import { getV0TemplateFactoryPack, v0TemplateFactoryPrinciples } from '@/data/v0-template-packaging'
import { getV0TemplateProductionPlan } from '@/data/v0-template-production'

type TemplatePackagePageProps = {
  entry: V0TemplateEntry
  relatedEntries: V0TemplateEntry[]
}

const accentClasses: Record<V0TemplateEntry['accent'], string> = {
  emerald: 'border-emerald-300/25 bg-emerald-300/10 text-emerald-200',
  cyan: 'border-cyan-300/25 bg-cyan-300/10 text-cyan-200',
  amber: 'border-amber-300/25 bg-amber-300/10 text-amber-200',
  violet: 'border-violet-300/25 bg-violet-300/10 text-violet-200',
  rose: 'border-rose-300/25 bg-rose-300/10 text-rose-200',
  blue: 'border-blue-300/25 bg-blue-300/10 text-blue-200',
}

const stageLabels: Record<V0TemplateEntry['stage'], string> = {
  'live-pattern': 'Live pattern',
  'v0-prototype': 'v0 prototype',
  'sprint-seed': 'Sprint seed',
  'internal-system': 'Internal system',
}

const channelLabels: Record<V0TemplateChannel, string> = {
  v: 'FrankX /v',
  v0: 'v0 foundry',
  vercel: 'Vercel deploy',
  gencreator: 'GenCreator',
  animelegends: 'AnimeLegends',
  'ai-architecture': 'AI architecture',
  motion: 'Motion and 3D',
}

const brandStrategies: Record<
  V0TemplateBrand,
  {
    positioning: string
    design: string
    guardrails: string[]
  }
> = {
  FrankX: {
    positioning: 'Executive AI command layer for leverage, proof, offers, and practical systems.',
    design: 'Sharp black-glass surfaces, real proof, direct copy, low noise, and decisive CTAs.',
    guardrails: ['No vague AI assistant framing', 'No fake metrics', 'No decorative 3D without a scene brief'],
  },
  GenCreator: {
    positioning: 'Creator operating systems for content, community, product launches, and revenue loops.',
    design: 'Creator-first clarity with workflow proof, useful templates, warm precision, and visible action paths.',
    guardrails: ['No fake audience stats', 'No guru tone', 'No marketplace promise before owned packs exist'],
  },
  AnimeLegends: {
    positioning: 'Rights-safe original-world systems for lore, characters, episodes, fans, and studio pitching.',
    design: 'Cinematic world evidence, canon metadata, deterministic labels, and original visual language.',
    guardrails: ['No unlicensed anime IP', 'No generated pseudo-text', 'No public visual without canon and rights notes'],
  },
  Starlight: {
    positioning: 'Operational intelligence systems for agents, queues, ledgers, projects, and governance.',
    design: 'Dense but calm command surfaces with state, proof, keyboardable flows, and precise hierarchy.',
    guardrails: ['No fake system state', 'No generic dashboards', 'No broad agent claims without evidence'],
  },
  Arcanea: {
    positioning: 'Mythic creative operating systems for worlds, academies, codices, and creator transformation.',
    design: 'Luminous codex material, symbolic depth, readable lore, and restrained mythic language.',
    guardrails: ['No fantasy cosplay', 'No unreadable ornament', 'No public lore without canon source'],
  },
  'AI Architecture': {
    positioning: 'Practical AI architecture packs with diagrams, evals, risk controls, and implementation proof.',
    design: 'Executive-readable diagrams, sober technical copy, source-backed claims, and useful artifacts.',
    guardrails: ['No benchmark invention', 'No compliance overclaim', 'No architecture diagram without labels and README'],
  },
  Vercel: {
    positioning: 'Deployable AI business starters that move from prompt to repo to preview to PR.',
    design: 'Developer-grade clarity, framework trust, crisp app states, and visible deploy/readme paths.',
    guardrails: ['No secrets in v0', 'No auth or billing logic from visual drafts', 'No preview claim before Vercel verification'],
  },
}

const successCriteria = [
  'Named buyer, use case, and primary action.',
  'Route, preview, or package page exists before public claim.',
  'Tier A/B/C asset provenance is recorded.',
  'Desktop and mobile screenshots are inspected.',
  'README, usage notes, or implementation handoff exists.',
  'GitHub issue, draft PR, or Command Center card tracks next action.',
  'Vercel preview is verified before deployable-template promotion.',
  'Visual gate scores 26/30 or higher before public-ready status.',
]

function SectionHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body?: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm text-emerald-200">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      {body && <p className="mt-4 text-sm leading-7 text-white/62">{body}</p>}
    </div>
  )
}

function ListPanel({
  title,
  items,
  Icon = CheckCircle2,
}: {
  title: string
  items: string[]
  Icon?: typeof CheckCircle2
}) {
  return (
    <section className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
        <Icon className="h-4 w-4 text-emerald-200" />
        {title}
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-white/66">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function InlineList({
  title,
  items,
  Icon = CheckCircle2,
}: {
  title: string
  items: string[]
  Icon?: typeof CheckCircle2
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
        <Icon className="h-4 w-4 text-emerald-200" />
        {title}
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-white/62">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function StrategyPanel({
  title,
  body,
  Icon = Boxes,
}: {
  title: string
  body: string
  Icon?: typeof Boxes
}) {
  return (
    <section className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
        <Icon className="h-4 w-4 text-cyan-200" />
        {title}
      </div>
      <p className="text-sm leading-7 text-white/66">{body}</p>
    </section>
  )
}

function getArchitecturePlan(entry: V0TemplateEntry) {
  const plan = [
    'Define the data contract before polishing UI states.',
    'Document env vars, secret boundaries, and server/client ownership.',
    'Add README usage notes and a release checklist before public promotion.',
  ]

  if (entry.channels.includes('vercel')) {
    plan.push('Verify with a Vercel preview before calling this deployable.')
  }

  if (entry.channels.includes('ai-architecture')) {
    plan.push('Attach diagrams, eval criteria, risk notes, and source-backed technical claims.')
  }

  return plan
}

function getMotionPlan(entry: V0TemplateEntry) {
  if (!entry.channels.includes('motion')) {
    return [
      'Keep first pass static and readable.',
      'Use motion only for hover, focus, or state clarity after hierarchy works.',
      'No scroll choreography unless a later scene brief proves the job.',
    ]
  }

  return [
    'Create the still frame first and score it before animation.',
    'Define one motion job: hierarchy, state, causality, progress, spatial relationship, or brand memory.',
    'Add a reduced-motion static story and mobile simplification.',
    'Use 3D/WebGL only with metaphor, fallback, performance budget, and screenshot verification.',
  ]
}

export function TemplatePackagePage({ entry, relatedEntries }: TemplatePackagePageProps) {
  const accent = accentClasses[entry.accent]
  const brandStrategy = brandStrategies[entry.brand]
  const blueprint = getV0TemplateBlueprint(entry)
  const demand = getV0TemplateDemandPlan(entry)
  const factory = getV0TemplateFactoryPack(entry)
  const production = getV0TemplateProductionPlan(entry)
  const liveHref = entry.publicPreviewUrl ?? (entry.route && entry.route !== '/v' ? entry.route : undefined)
  const promptLines = factory.promptPack.brief
  const architecturePlan = [...getArchitecturePlan(entry), ...blueprint.architectureMoves]
  const motionPlan = [...getMotionPlan(entry), ...blueprint.motionMoves]

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-28 lg:grid-cols-[0.95fr_1.05fr] lg:pb-20 lg:pt-36">
          <div>
            <Link
              href="/v"
              className="mb-8 inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to /v
            </Link>
            <div className="mb-6 flex flex-wrap gap-2">
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${accent}`}>
                {stageLabels[entry.stage]}
              </span>
              {entry.channels.map((channel) => (
                <span key={channel} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/58">
                  {channelLabels[channel]}
                </span>
              ))}
            </div>
            <p className="text-sm text-white/45">{entry.brand} / {entry.family}</p>
            <h1 className="mt-3 max-w-3xl text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
              {entry.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/64">{entry.audience}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/85"
              >
                Request this template
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              {liveHref && (
                <Link
                  href={liveHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/78 transition hover:border-white/30 hover:text-white"
                >
                  View current route
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
              <a
                href={production.issue.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/78 transition hover:border-white/30 hover:text-white"
              >
                Issue #{production.issue.number}
                <GitPullRequest className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.035]">
              <div className="relative aspect-[16/10]">
                <Image
                  src={entry.previewImage}
                  alt={`${entry.title} preview visual`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {[
                { label: 'Asset tier', value: entry.assetTier },
                { label: 'Factory', value: factory.modeLabel },
                { label: 'v0 use', value: factory.v0DecisionLabel },
                { label: 'Lane issue', value: `#${production.issue.number}` },
              ].map((stat) => (
                <div key={stat.label} className="rounded-[8px] border border-white/10 bg-black/35 p-4">
                  <p className="text-sm font-medium text-white">{stat.value}</p>
                  <p className="mt-1 text-xs text-white/45">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          eyebrow="Template contract"
          title="What this package must become"
          body="Each package starts as a strategy and evidence contract, then moves through v0 only where visual exploration is useful. Codex owns the repo, data, README, release trail, and final QA."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <StrategyPanel title="Market need" body={blueprint.marketNeed} Icon={Waypoints} />
          <StrategyPanel title="Buyer promise" body={blueprint.buyerPromise} Icon={ArrowUpRight} />
          <StrategyPanel title="Product strategy" body={blueprint.productStrategy} Icon={Layers} />
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <StrategyPanel title="Demand wave" body={`${demand.waveLabel}. ${demand.communityNeed}`} Icon={Waypoints} />
          <StrategyPanel title="Winning angle" body={demand.winningAngle} Icon={Sparkles} />
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <section className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
              <Boxes className="h-4 w-4 text-cyan-200" />
              Brand strategy
            </div>
            <p className="text-sm leading-7 text-white/68">{brandStrategy.positioning}</p>
            <p className="mt-4 text-sm leading-7 text-white/58">{brandStrategy.design}</p>
            <p className="mt-4 text-sm leading-7 text-white/58">{blueprint.designThinking}</p>
          </section>
          <ListPanel title="Brand guardrails" items={brandStrategy.guardrails} Icon={ShieldCheck} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          eyebrow="Command Center lane"
          title="Owner, trigger, guardrail, proof"
          body="Every package is attached to a GitHub lane so v0 exploration, Codex hardening, assets, and public readiness move through one visible loop."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <StrategyPanel
            title="Issue owner"
            body={`${production.laneLabel}. ${production.issue.title}.`}
            Icon={GitPullRequest}
          />
          <StrategyPanel title="Market signal" body={production.communitySignal} Icon={Waypoints} />
          <StrategyPanel title="Launch decision" body={production.launchDecision} Icon={ShieldCheck} />
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <StrategyPanel title="v0 trigger" body={production.v0Trigger} Icon={Code2} />
          <StrategyPanel title="Codex trigger" body={production.codexTrigger} Icon={GitPullRequest} />
          <StrategyPanel title="Next sprint move" body={production.nextSprintMove} Icon={Layers} />
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <ListPanel title="Do not give v0" items={production.doNotUseV0For} Icon={ShieldCheck} />
          <ListPanel title="Proof still needed" items={production.proofNeeded} Icon={CheckCircle2} />
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <ListPanel title="Demand evidence" items={demand.evidenceToCollect} Icon={CheckCircle2} />
          <ListPanel title="Success criteria" items={demand.successCriteria} Icon={ShieldCheck} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-5 lg:grid-cols-3">
          <ListPanel title="Deliverables" items={entry.deliverables} Icon={Layers} />
          <ListPanel title="Package with" items={entry.packageWith} Icon={FileText} />
          <ListPanel title="Quality gates" items={entry.qualityGates} Icon={ShieldCheck} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          eyebrow="Commercial packaging"
          title="How this becomes a product, not a one-off page"
          body="The same package can be sold or reused at different levels: public preview, prompt pack, source pack, deploy pack, motion pack, or custom implementation."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {blueprint.packageTiers.map((tier) => (
            <section key={tier.label} className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-medium text-white">{tier.label}</p>
              <p className="mt-3 text-sm leading-6 text-white/62">{tier.value}</p>
            </section>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          eyebrow="Package factory"
          title="Prompt, source, asset, motion, sprint, and restart logic"
          body="This is the production contract for the template. It decides when to use v0, what to keep in Codex, what assets need inspection, and when the idea should be restarted instead of polished."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Public index', value: factory.routePlan.publicIndex },
            { label: 'Package route', value: factory.routePlan.packageRoute },
            { label: 'Lane route', value: factory.routePlan.laneRoute },
            { label: 'Command Center', value: factory.routePlan.commandCenterRecord },
          ].map((item) => (
            <section key={item.label} className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-medium text-white">{item.label}</p>
              <p className="mt-3 text-sm leading-6 text-white/62">{item.value}</p>
            </section>
          ))}
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <ListPanel title="Factory principles" items={v0TemplateFactoryPrinciples} Icon={ShieldCheck} />
          <ListPanel title="Source repo work" items={factory.sourcePack.repoWork} Icon={GitPullRequest} />
          <ListPanel title="Factory checks" items={factory.sourcePack.checks} Icon={CheckCircle2} />
          <ListPanel title="Docs to ship" items={factory.sourcePack.docs} Icon={FileText} />
          <ListPanel title="Fixtures and states" items={factory.sourcePack.fixtures} Icon={Waypoints} />
          <ListPanel title="Restart criteria" items={factory.killCriteria} Icon={ShieldCheck} />
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <section className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
              <ImageIcon className="h-4 w-4 text-cyan-200" />
              Asset pack
            </div>
            <p className="text-sm leading-7 text-white/68">{factory.assetPack.primaryAssetJob}</p>
            <p className="mt-4 text-sm leading-7 text-white/58">{factory.assetPack.sourceMethod}</p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <InlineList title="Required exports" items={factory.assetPack.requiredExports} Icon={ImageIcon} />
              <InlineList title="Inspection" items={factory.assetPack.inspection} Icon={ShieldCheck} />
            </div>
          </section>
          <section className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
              <Sparkles className="h-4 w-4 text-cyan-200" />
              Motion pack
            </div>
            <p className="text-sm leading-7 text-white/68">{factory.motionPack.motionJob}</p>
            <p className="mt-4 text-sm leading-7 text-white/58">{factory.motionPack.runtimeRoute}</p>
            <div className="mt-5">
              <InlineList title="Fallbacks" items={factory.motionPack.fallbacks} Icon={ShieldCheck} />
            </div>
          </section>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <section className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
              <Layers className="h-4 w-4 text-cyan-200" />
              Sprint sequence
            </div>
            <div className="space-y-4">
              {factory.sprintActions.map((action) => (
                <div key={`${action.owner}-${action.action}`} className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                  <p className="text-sm font-medium text-white">{action.owner}</p>
                  <p className="mt-2 text-sm leading-6 text-white/66">{action.action}</p>
                  <p className="mt-2 text-xs leading-5 text-white/45">{action.trigger}</p>
                  <p className="mt-2 text-xs leading-5 text-emerald-100/70">{action.evidence}</p>
                </div>
              ))}
            </div>
          </section>
          <div className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              {factory.skillStack.map((item) => (
                <section key={item.label} className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="mt-3 text-sm leading-6 text-white/62">{item.value}</p>
                </section>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {factory.productization.map((item) => (
                <section key={item.label} className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="mt-3 text-sm leading-6 text-white/62">{item.value}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            eyebrow="v0 brief"
            title="Spend v0 tokens only on the scoped surface"
            body="The prompt is intentionally narrow. v0 should explore visual hierarchy, responsive composition, and section rhythm. It should not invent the business, backend, or final factual claims."
          />
          <section className="rounded-[8px] border border-white/10 bg-black/45 p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
              <Code2 className="h-4 w-4 text-emerald-200" />
              v0 prompt contract
            </div>
            <pre className="whitespace-pre-wrap rounded-[8px] border border-white/10 bg-white/[0.035] p-4 text-sm leading-7 text-white/72">
              {[...promptLines, '', 'Refinement pass:', ...factory.promptPack.refinement].join('\n')}
            </pre>
          </section>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-5 lg:grid-cols-2">
          <ListPanel title="Prompt acceptance" items={factory.promptPack.acceptance} Icon={CheckCircle2} />
          <ListPanel title="Blocked v0 patterns" items={factory.promptPack.blockedPatterns} Icon={ShieldCheck} />
          <ListPanel title="v0 token budget" items={blueprint.v0Scope} Icon={Code2} />
          <ListPanel title="Codex production scope" items={blueprint.codexScope} Icon={GitPullRequest} />
          <ListPanel title="Asset production moves" items={blueprint.assetMoves} Icon={ImageIcon} />
          <ListPanel title="Architecture plan" items={architecturePlan} Icon={Waypoints} />
          <ListPanel title="Motion gate" items={motionPlan} Icon={Sparkles} />
          <ListPanel title="Agent loop" items={blueprint.agentLoop} Icon={Layers} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="border-y border-white/10 py-12">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeader
              eyebrow="Public-ready gate"
              title="The finish line is evidence, not a nice screenshot"
              body="A seed can be shown as planned, but it is not public-ready until the product package has proof, route evidence, and a release trail."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {[...successCriteria, ...blueprint.successSignals].map((criterion) => (
                <div key={criterion} className="rounded-[8px] border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex gap-3 text-sm leading-6 text-white/68">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200" />
                    <span>{criterion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedEntries.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeader eyebrow="Related packages" title="Adjacent template lanes" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {relatedEntries.map((related) => (
              <Link
                key={related.id}
                href={getV0TemplatePath(related)}
                className="group rounded-[8px] border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-2 text-sm text-white/45">
                  <Waypoints className="h-4 w-4" />
                  {related.brand} / {related.family}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">{related.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{related.nextAction}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-white">
                  Open package
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-8">
        <div className="rounded-[8px] border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm text-white/45">
                <ImageIcon className="h-4 w-4" />
                Asset source
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/68">{entry.assetSource}</p>
            </div>
            <Link
              href="/v"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/78 transition hover:border-white/30 hover:text-white"
            >
              Browse all packages
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
