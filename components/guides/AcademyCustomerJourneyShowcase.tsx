'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Layers,
  ShieldCheck,
  Terminal,
  Users,
} from 'lucide-react'
import {
  ICP_TRACKS,
  academyBridgeForGuide,
  guidesForIcpTrack,
  type CircleCritiqueTieIn,
  type IcpTrackDefinition,
  type IcpTrackId,
  type PairedCliLab,
} from '@/lib/learn/academy-missions'

interface RoleBlueprint {
  order: 0 | 1 | 2 | 3
  roleTitle:
    | 'Enterprise AI Architect'
    | 'Agentic Product Engineer'
    | 'Technical Founder / CTO'
    | 'Applied AI Lead'
  curatedGuideSlug: string
  curatedGuideLabel: string
  ritualGuideSlug: string
  stdlibLabSourceSlug: string
  stdlibLabIndex: number
  cliCommand: string
  cliExpectedOutcome: string
  dayOnePain: string
  week12Capstone: string
}

interface DerivedRoleJourney {
  track: IcpTrackDefinition
  order: number
  roleTitle: RoleBlueprint['roleTitle']
  dayOnePain: string
  guideHref: string
  guideLabel: string
  guideCurriculumWeek: string
  guideDeliverable: string
  guideRedGate: string
  stdlibLab: PairedCliLab
  cliCommand: string
  cliExpectedOutcome: string
  circleCritique: CircleCritiqueTieIn
  week12Capstone: string
  mappedGuidesCount: number
}

const ROLE_BLUEPRINTS_BY_TRACK: Record<IcpTrackId, RoleBlueprint> = {
  'enterprise-architect': {
    order: 0,
    roleTitle: 'Enterprise AI Architect',
    curatedGuideSlug: 'vercel-agent-runtime-decisions',
    curatedGuideLabel: 'Vercel agent runtimes: Python, Daemons, Drives',
    ritualGuideSlug: 'vercel-agent-runtime-decisions',
    stdlibLabSourceSlug: 'vercel-agent-runtime-decisions',
    stdlibLabIndex: 0,
    cliCommand:
      'python labs/04-trust-boundary-firewall/cli.py --run-suite --emit-receipt .lab/firewall-receipt.json',
    cliExpectedOutcome:
      'Runs 5 offline fault scenarios (prompt breakout, ambient authority, spend gate, path traversal, metadata SSRF) and writes a SHA-256 receipt.',
    dayOnePain:
      'Untrusted retrieval chunks and webhook payloads share prompt context with privileged tool credentials, while multi-cloud model gateways ship without a tested restore runbook or named plane owner.',
    week12Capstone:
      'Nine-stage architecture dossier (00-frame.md through 07-runbook.md), verified offline disaster-recovery dry-run receipt (exit 0), and live peer defense clearing all five trust-boundary red gates.',
  },
  'production-builder': {
    order: 1,
    roleTitle: 'Agentic Product Engineer',
    curatedGuideSlug: 'vercel-ai-sdk',
    curatedGuideLabel: 'Vercel AI SDK for builders',
    ritualGuideSlug: 'vercel-ai-sdk',
    stdlibLabSourceSlug: 'vercel-ai-sdk',
    stdlibLabIndex: 1,
    cliCommand:
      'python labs/05-eval-admission-gate/cli.py --run-gate --emit-receipt .lab/admission-receipt.json',
    cliExpectedOutcome:
      'Executes 5 non-compensable meta-audit checks (M1 to M5) against locked golden trajectories and calibration anchors with zero API keys.',
    dayOnePain:
      'Tool-calling loops pass clean local notebook runs yet fail under production inputs when long documents lose chunk overlap, provider failover drops schemas, or average eval scores mask a safety fault.',
    week12Capstone:
      'Hybrid lexical-dense retrieval pipeline, schema-validated MCP tool server, bounded maker-checker state machine, and SHA-256-locked golden trajectory gate blocking transcript illusions in CI.',
  },
  'workflow-operator': {
    order: 2,
    roleTitle: 'Technical Founder / CTO',
    curatedGuideSlug: 'founder-ai-stack-2026',
    curatedGuideLabel: "Founder's AI stack 2026: build fast, stay lean",
    ritualGuideSlug: 'ai-operating-systems-workshop',
    stdlibLabSourceSlug: 'community-platform-for-creators',
    stdlibLabIndex: 1,
    cliCommand:
      'python labs/04-trust-boundary-firewall/cli.py --inject-fault F3_UNAPPROVED_SPEND --emit-receipt .lab/spend-gate-receipt.json',
    cliExpectedOutcome:
      'Verifies that side-effecting credit or spend actions fail closed without a single-use, digest-bound human approval token.',
    dayOnePain:
      'Teams wire autonomous agents onto customer email, billing, and CRM workflows before naming a human owner, setting a hard token budget, or separating assist-only work from full automation.',
    week12Capstone:
      'Signed AI department packet assigning every runtime plane an owner, fallback gateway, dated cost ceiling, and fail-closed human approval gate for spend or outbound communication.',
  },
  'technical-creator': {
    order: 3,
    roleTitle: 'Applied AI Lead',
    curatedGuideSlug: 'frankx-skill-creation-methodology',
    curatedGuideLabel: 'The skill creation methodology',
    ritualGuideSlug: 'elevenlabs-voice-guide',
    stdlibLabSourceSlug: 'frankx-skill-creation-methodology',
    stdlibLabIndex: 1,
    cliCommand:
      'python labs/05-eval-admission-gate/cli.py --verify-candidate labs/05-eval-admission-gate/exercises/faulty_starter.py',
    cliExpectedOutcome:
      'Demonstrates productive failure: exposes 4 of 5 meta-gate breaches on the naive averaging starter before you harden calibration and lockfile checks.',
    dayOnePain:
      'Applied AI teams ship skills, voice briefings, and media pipelines without calibrated graders or provenance logs, so model updates quietly degrade output structure and rights compliance.',
    week12Capstone:
      'Versioned SKILL.md capability pack, five-anchor calibrated evaluation gate (M1 to M5), provenance-logged multimodal and WebVTT specs, and Day-7 changed-constraint transfer sign-off.',
  },
}

const ROLE_JOURNEYS: readonly DerivedRoleJourney[] = Object.values(ICP_TRACKS)
  .map((track) => {
    const blueprint = ROLE_BLUEPRINTS_BY_TRACK[track.id]
    const guideBridge = academyBridgeForGuide(blueprint.curatedGuideSlug)
    const ritualBridge = academyBridgeForGuide(blueprint.ritualGuideSlug)
    const labBridge = academyBridgeForGuide(blueprint.stdlibLabSourceSlug)
    const stdlibLab =
      labBridge.cliLabs[blueprint.stdlibLabIndex] ?? labBridge.cliLabs[0]

    return {
      track,
      order: blueprint.order,
      roleTitle: blueprint.roleTitle,
      dayOnePain: blueprint.dayOnePain,
      guideHref: `/guides/${guideBridge.guideSlug}`,
      guideLabel: blueprint.curatedGuideLabel,
      guideCurriculumWeek: guideBridge.curriculumWeek,
      guideDeliverable: guideBridge.artifact.deliverable,
      guideRedGate: guideBridge.artifact.redGateCondition,
      stdlibLab,
      cliCommand: blueprint.cliCommand,
      cliExpectedOutcome: blueprint.cliExpectedOutcome,
      circleCritique: ritualBridge.circleCritique,
      week12Capstone: blueprint.week12Capstone,
      mappedGuidesCount: guidesForIcpTrack(track.id).length,
    }
  })
  .sort((a, b) => a.order - b.order)

interface ArchitecturePlate {
  id: string
  tabLabel: string
  heading: string
  summary: string
  src: string
  alt: string
  width: number
  height: number
  invariantNote: string
}

const ARCHITECTURE_PLATES: readonly ArchitecturePlate[] = [
  {
    id: 'funnel',
    tabLabel: '01 · Guide-to-lab progression',
    heading: 'Five verified stages from free guide to capability receipt',
    summary:
      'Every implementation guide routes into a 15-minute unaided Monday diagnosis, an offline Python or TypeScript repository lab, an interactive mission check, and weekly peer critique.',
    src: '/images/diagrams/academy/guide-to-academy-funnel.svg',
    alt: 'Five-stage progression from free FrankX guides to unaided diagnostic, open-source CLI lab, interactive studio mission, and Circle peer review with a Day-7 transfer loop',
    width: 1200,
    height: 620,
    invariantNote:
      'Exit check: each stage produces an inspectable file or test exit code before hints or solutions open.',
  },
  {
    id: 'routing',
    tabLabel: '02 · Multi-ICP routing matrix',
    heading: 'Four role tracks routed across one twelve-week spine',
    summary:
      'Architects, product engineers, founders, and applied AI leads enter at the exact week and fault-injected lab matching their active production bottleneck while sharing one red-gate bar.',
    src: '/images/diagrams/academy/multi-icp-routing-matrix.svg',
    alt: 'Multi-ICP routing matrix mapping four builder tracks to entry cadence weeks, open-source CLI labs, studio mission surfaces, and non-compensable red-gate artifacts',
    width: 1200,
    height: 680,
    invariantNote:
      'Routing rule: every FrankX guide declares distinct primary and secondary tracks so readers skip generic introductory material.',
  },
  {
    id: 'verification',
    tabLabel: '03 · Dual-mode verification loop',
    heading: 'Human principal and coding agent separated from the examiner gate',
    summary:
      'Builders read architectural trade-offs while coding agents query stateless read-only POST /api/mcp tools; an acoustic wall blocks self-attestation when red gates run.',
    src: '/images/diagrams/academy/dual-mode-verification-loop.svg',
    alt: 'Dual-mode verification architecture showing human builder reading guides and coding agent calling POST /api/mcp, separated from independent red-gate examination by an acoustic wall',
    width: 1200,
    height: 640,
    invariantNote:
      'Independence rule: the agent session that drafts or coaches a lab candidate never grades or approves its own release receipt.',
  },
]

interface ScaffoldingPhase {
  id: string
  badge: string
  heading: string
  providedRatio: string
  builderRatio: string
  providedByAcademy: string
  ownedByBuilder: string
  exitEvidence: string
}

const SCAFFOLDING_PHASES: readonly ScaffoldingPhase[] = [
  {
    id: 'worked-trace',
    badge: 'Weeks 1-3 Worked Trace',
    heading: 'Annotate a full worked trace and diagnose seeded faults unaided',
    providedRatio: '75% scaffolded',
    builderRatio: '25% builder-authored',
    providedByAcademy:
      'Complete reference architecture, failure incident logs, and deterministic test suites across workflow triage, hybrid RRF chunking, and prompt quarantine.',
    ownedByBuilder:
      'Run the 15-minute Monday unaided diagnosis (assistance = "none"), isolate the exact root-cause seam, and patch the failing retrieval or trust-boundary check.',
    exitEvidence:
      'Recorded priorAttemptDigest plus passing offline unit tests on Lab 01 and Lab 04.',
  },
  {
    id: 'completion-scaffold',
    badge: 'Weeks 4-6 Completion Scaffold',
    heading: 'Complete missing tool schemas and maker-checker state transitions',
    providedRatio: '50% scaffolded',
    builderRatio: '50% builder-authored',
    providedByAcademy:
      'Typed module boundaries, mock transport harnesses, and state-machine skeletons with intentionally omitted validation, budget ceilings, and handoff guards.',
    ownedByBuilder:
      'Author strict MCP input schemas, compile portable SKILL.md packages without shell-expansion bugs, and enforce bounded maker-checker separation.',
    exitEvidence:
      'Passing Lab 02 and Lab 03 suites with zero inline secrets or unbounded agent loops.',
  },
  {
    id: 'contract-spec',
    badge: 'Weeks 7-9 Contract Spec',
    heading: 'Implement admission gates from locked contracts and golden fixtures',
    providedRatio: '25% scaffolded',
    builderRatio: '75% builder-authored',
    providedByAcademy:
      'Input/output JSON contracts, SHA-256 fixture lockfiles, three-tier calibration anchors, and non-compensable safety veto specifications.',
    ownedByBuilder:
      'Build the full evaluation admission gate, detect transcript illusions in durable tool logs, and enforce design and audio provenance rules from scratch.',
    exitEvidence:
      'EvalAdmissionReceipt.v1 clearing all five meta-audit gates (M1 through M5).',
  },
  {
    id: 'greenfield-capstone',
    badge: 'Weeks 10-12 Greenfield Capstone',
    heading: 'Defend a greenfield system with a verified restore dry-run',
    providedRatio: '0% scaffolded',
    builderRatio: '100% builder-authored',
    providedByAcademy:
      'Production constraints, adversarial Day-7 constraint-shift prompt (latency spike or residency lock), and peer-defense rubric only.',
    ownedByBuilder:
      'Author the nine-stage architecture dossier (00-frame.md to 07-runbook.md) in a blank directory, execute a clean disaster-recovery restore, and defend cold.',
    exitEvidence:
      'Dry-run restore exit code 0 and independent Circle peer sign-off (Reviewer != Learner).',
  },
]

function handleRovingTabKeyDown(
  event: KeyboardEvent<HTMLButtonElement>,
  currentIndex: number,
  total: number,
  onSelect: (nextIndex: number) => void,
  refs: Array<HTMLButtonElement | null>
) {
  let nextIndex: number | null = null

  if (event.key === 'ArrowRight') {
    nextIndex = (currentIndex + 1) % total
  } else if (event.key === 'ArrowLeft') {
    nextIndex = (currentIndex - 1 + total) % total
  } else if (event.key === 'Home') {
    nextIndex = 0
  } else if (event.key === 'End') {
    nextIndex = total - 1
  }

  if (nextIndex !== null) {
    event.preventDefault()
    onSelect(nextIndex)
    refs[nextIndex]?.focus()
  }
}

export default function AcademyCustomerJourneyShowcase() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0)
  const [activePlateIndex, setActivePlateIndex] = useState(0)
  const [activePhaseIndex, setActivePhaseIndex] = useState(0)
  const [diagramZoom, setDiagramZoom] = useState<'fit' | 'detail'>('fit')
  const [copiedRoleTrack, setCopiedRoleTrack] = useState<IcpTrackId | null>(null)

  const roleTabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const plateTabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const phaseTabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const activeRole = ROLE_JOURNEYS[activeRoleIndex] ?? ROLE_JOURNEYS[0]
  const activePlate = ARCHITECTURE_PLATES[activePlateIndex] ?? ARCHITECTURE_PLATES[0]
  const activePhase = SCAFFOLDING_PHASES[activePhaseIndex] ?? SCAFFOLDING_PHASES[0]

  async function handleCopyCommand(trackId: IcpTrackId, command: string) {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(command)
        setCopiedRoleTrack(trackId)
        window.setTimeout(() => {
          setCopiedRoleTrack((prev) => (prev === trackId ? null : prev))
        }, 2200)
      }
    } catch {
      // Clipboard access can be denied in restricted browser contexts; code stays selectable.
    }
  }

  const isCopied = copiedRoleTrack === activeRole.track.id

  return (
    <section
      id="academy-customer-journey"
      aria-labelledby="academy-journey-heading"
      className="py-20 border-t border-white/5"
    >
      <div className="mx-auto max-w-6xl px-6 space-y-12">
        {/* Part 1: 4-ICP Role Switcher */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.10] bg-[#0d111a] p-6 sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
          />

          <div className="space-y-8">
            <div className="max-w-3xl space-y-3">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-300">
                Role-routed entry · Four builder tracks
              </p>
              <h2
                id="academy-journey-heading"
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                Choose your role and run an offline verification loop
              </h2>
              <p className="text-base leading-relaxed text-slate-300">
                Pick the track closest to your daily engineering responsibility. Each route connects a source-backed FrankX guide to a zero-key Python standard-library lab on GitHub, a structured Circle critique ritual, and a concrete Week 12 capstone artifact.
              </p>
            </div>

            {/* Accessible 4-ICP Tablist */}
            <div
              role="tablist"
              aria-label="Select an engineering or leadership role track"
              aria-orientation="horizontal"
              className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {ROLE_JOURNEYS.map((journey, index) => {
                const selected = index === activeRoleIndex
                const tabId = `academy-icp-tab-${journey.track.id}`
                const panelId = `academy-icp-panel-${journey.track.id}`

                return (
                  <button
                    key={journey.track.id}
                    ref={(el) => {
                      roleTabRefs.current[index] = el
                    }}
                    type="button"
                    role="tab"
                    id={tabId}
                    aria-selected={selected}
                    aria-controls={panelId}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveRoleIndex(index)}
                    onKeyDown={(event) =>
                      handleRovingTabKeyDown(
                        event,
                        index,
                        ROLE_JOURNEYS.length,
                        setActiveRoleIndex,
                        roleTabRefs.current
                      )
                    }
                    className={`rounded-2xl border p-4 text-left transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
                      selected
                        ? 'border-emerald-400/60 bg-[#0b1f1a] text-white'
                        : 'border-white/[0.08] bg-[#090d14] text-slate-300 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-emerald-300">
                      {journey.track.cadenceWeeks}
                    </span>
                    <span className="mt-1 block text-base font-semibold text-white">
                      {journey.roleTitle}
                    </span>
                    <span className="mt-1.5 block text-xs text-slate-300">
                      Spine track: {journey.track.label} ({journey.mappedGuidesCount} guides)
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Active ICP Tabpanel */}
            <div
              role="tabpanel"
              id={`academy-icp-panel-${activeRole.track.id}`}
              aria-labelledby={`academy-icp-tab-${activeRole.track.id}`}
              tabIndex={0}
              className="space-y-5 rounded-2xl border border-white/[0.08] bg-[#090d14] p-5 sm:p-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                <div>
                  <p className="font-mono text-xs text-emerald-300">
                    Active profile · {activeRole.roleTitle}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    {activeRole.track.roleSummary}
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 font-mono text-xs font-medium text-sky-200">
                  {activeRole.mappedGuidesCount} mapped FrankX guides
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                {/* Left 5 cols: Day-1 Pain + Curated Guide */}
                <div className="space-y-4 lg:col-span-5">
                  <div className="rounded-2xl border border-amber-400/25 bg-[#141008] p-4 sm:p-5 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold text-amber-300">
                      <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>01 · Day-1 production pain</span>
                    </div>
                    <h3 className="text-base font-semibold text-white">
                      Day-1 production bottleneck
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-200">
                      {activeRole.dayOnePain}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/[0.08] bg-[#0d121c] p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 font-mono text-xs text-sky-300">
                        <BookOpen className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>02 · Curated FrankX guide</span>
                      </div>
                      <span className="font-mono text-xs text-slate-300">
                        {activeRole.guideCurriculumWeek}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-white">
                      Curated implementation guide
                    </h3>
                    <p className="text-sm font-medium text-slate-100">
                      {activeRole.guideLabel}
                    </p>
                    <p className="text-xs leading-relaxed text-slate-300">
                      Target artifact: {activeRole.guideDeliverable}.
                    </p>
                    <Link
                      href={activeRole.guideHref}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-300 underline decoration-sky-300/40 underline-offset-4 hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                    >
                      <span>Read {activeRole.guideHref}</span>
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                {/* Right 7 cols: Stdlib CLI Lab + Circle Ritual + Week 12 Capstone */}
                <div className="space-y-4 lg:col-span-7">
                  <div className="rounded-2xl border border-emerald-400/25 bg-[#071310] p-4 sm:p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 font-mono text-xs text-emerald-300">
                        <Terminal className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>03 · Runnable Python stdlib lab</span>
                      </div>
                      <a
                        href={activeRole.stdlibLab.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300 underline decoration-emerald-300/40 underline-offset-4 hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                      >
                        <span>frankxai/ai-architect-academy/{activeRole.stdlibLab.repoPath}</span>
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    </div>

                    <h3 className="text-base font-semibold text-white">
                      Offline Python stdlib lab
                    </h3>
                    <p className="text-sm font-medium text-emerald-100">
                      {activeRole.stdlibLab.title}
                    </p>
                    <p className="text-xs leading-relaxed text-slate-200">
                      {activeRole.cliExpectedOutcome}
                    </p>

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div
                        role="region"
                        aria-label="Runnable Python stdlib lab command"
                        tabIndex={0}
                        className="min-w-0 flex-1 overflow-x-auto rounded-xl border border-white/[0.10] bg-[#05080d] px-3.5 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                      >
                        <code className="whitespace-nowrap font-mono text-xs text-emerald-300">
                          {activeRole.cliCommand}
                        </code>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyCommand(activeRole.track.id, activeRole.cliCommand)
                        }
                        aria-label={`Copy Python CLI command for ${activeRole.roleTitle}`}
                        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/15 px-4 py-2 text-xs font-semibold text-emerald-200 hover:bg-emerald-400/25 transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                            <span>Copy command</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="sr-only" aria-live="polite">
                      {isCopied
                        ? `Copied command for ${activeRole.roleTitle} to clipboard.`
                        : ''}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/[0.08] bg-[#0d121c] p-4 sm:p-5 space-y-2">
                      <div className="flex items-center gap-2 font-mono text-xs text-cyan-300">
                        <Users className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>04 · Circle cohort space ritual</span>
                      </div>
                      <h3 className="text-base font-semibold text-white">
                        Circle cohort critique
                      </h3>
                      <p className="text-sm font-medium text-cyan-200">
                        {activeRole.circleCritique.spaceName}
                      </p>
                      <p className="font-mono text-xs text-slate-300">
                        {activeRole.circleCritique.protocolLabel}
                      </p>
                      <p className="text-xs leading-relaxed text-slate-300">
                        {activeRole.circleCritique.promptFocus}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/[0.08] bg-[#0d121c] p-4 sm:p-5 space-y-2">
                      <div className="flex items-center gap-2 font-mono text-xs text-emerald-300">
                        <Award className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>05 · Week 12 capstone outcome</span>
                      </div>
                      <h3 className="text-base font-semibold text-white">
                        Defended production artifact
                      </h3>
                      <p className="text-xs leading-relaxed text-slate-200">
                        {activeRole.week12Capstone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Visual Architecture & 12-Week Faded-Scaffolding Explorer */}
        <div className="rounded-[2rem] border border-white/[0.10] bg-[#0d111a] p-6 sm:p-10 space-y-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-300">
                System topology · Backward-fading curriculum
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Visual architecture and 12-week faded scaffolding
              </h2>
              <p className="text-base leading-relaxed text-slate-300">
                Inspect the three SVG topology plates behind the curriculum, then step through how weekly lab support fades from annotated worked traces in Week 1 to a blank-directory capstone defense in Week 12.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-slate-300">Diagram view:</span>
              <button
                type="button"
                aria-pressed={diagramZoom === 'fit'}
                onClick={() => setDiagramZoom('fit')}
                className={`rounded-full border px-3.5 py-1.5 font-mono text-xs font-medium transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
                  diagramZoom === 'fit'
                    ? 'border-sky-400/60 bg-sky-500/15 text-white'
                    : 'border-white/15 bg-[#090d14] text-slate-300 hover:text-white'
                }`}
              >
                Fit width
              </button>
              <button
                type="button"
                aria-pressed={diagramZoom === 'detail'}
                onClick={() => setDiagramZoom('detail')}
                className={`rounded-full border px-3.5 py-1.5 font-mono text-xs font-medium transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
                  diagramZoom === 'detail'
                    ? 'border-sky-400/60 bg-sky-500/15 text-white'
                    : 'border-white/15 bg-[#090d14] text-slate-300 hover:text-white'
                }`}
              >
                100% pan view
              </button>
            </div>
          </div>

          {/* 3-SVG Plate Switcher Tablist */}
          <div
            role="tablist"
            aria-label="Select an academy architecture diagram"
            aria-orientation="horizontal"
            className="grid grid-cols-1 gap-2.5 md:grid-cols-3"
          >
            {ARCHITECTURE_PLATES.map((plate, index) => {
              const selected = index === activePlateIndex
              const tabId = `academy-plate-tab-${plate.id}`
              const panelId = `academy-plate-panel-${plate.id}`

              return (
                <button
                  key={plate.id}
                  ref={(el) => {
                    plateTabRefs.current[index] = el
                  }}
                  type="button"
                  role="tab"
                  id={tabId}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActivePlateIndex(index)}
                  onKeyDown={(event) =>
                    handleRovingTabKeyDown(
                      event,
                      index,
                      ARCHITECTURE_PLATES.length,
                      setActivePlateIndex,
                      plateTabRefs.current
                    )
                  }
                  className={`rounded-2xl border p-4 text-left transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
                    selected
                      ? 'border-sky-400/60 bg-[#0b1926] text-white'
                      : 'border-white/[0.08] bg-[#090d14] text-slate-300 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span className="block font-mono text-xs text-sky-300">
                    {plate.tabLabel}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-white">
                    {plate.heading}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Active SVG Plate Panel */}
          <div
            role="tabpanel"
            id={`academy-plate-panel-${activePlate.id}`}
            aria-labelledby={`academy-plate-tab-${activePlate.id}`}
            tabIndex={0}
            className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#090d14] p-4 sm:p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-lg font-semibold text-white">
                {activePlate.heading}
              </h3>
              <span className="font-mono text-xs text-slate-300">
                {activePlate.src}
              </span>
            </div>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-300">
              {activePlate.summary}
            </p>

            <div
              role="region"
              aria-label={`Diagram viewport: ${activePlate.heading}`}
              tabIndex={0}
              className="overflow-x-auto rounded-xl border border-white/10 bg-[#05080d] p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
              <Image
                src={activePlate.src}
                alt={activePlate.alt}
                width={activePlate.width}
                height={activePlate.height}
                unoptimized
                className="mx-auto h-auto w-full max-w-none"
                style={
                  diagramZoom === 'detail'
                    ? { minWidth: 1080 }
                    : { minWidth: 680 }
                }
              />
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-emerald-400/20 bg-[#071310] px-4 py-3">
              <ShieldCheck
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300"
                aria-hidden="true"
              />
              <p className="text-xs leading-relaxed text-slate-200">
                {activePlate.invariantNote}
              </p>
            </div>
          </div>

          {/* 4-Phase Faded-Scaffolding Progression */}
          <div className="space-y-4 border-t border-white/[0.08] pt-8">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-300">
                <Layers className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Four-phase scaffolding progression</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Twelve-week backward-fading progression
              </h3>
              <p className="max-w-3xl text-sm leading-relaxed text-slate-300">
                Worked examples accelerate early mental models, then gradually hand full design and verification ownership to you before Week 12.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Select a three-week faded-scaffolding phase"
              aria-orientation="horizontal"
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
            >
              {SCAFFOLDING_PHASES.map((phase, index) => {
                const selected = index === activePhaseIndex
                const tabId = `academy-phase-tab-${phase.id}`
                const panelId = `academy-phase-panel-${phase.id}`

                return (
                  <button
                    key={phase.id}
                    ref={(el) => {
                      phaseTabRefs.current[index] = el
                    }}
                    type="button"
                    role="tab"
                    id={tabId}
                    aria-selected={selected}
                    aria-controls={panelId}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActivePhaseIndex(index)}
                    onKeyDown={(event) =>
                      handleRovingTabKeyDown(
                        event,
                        index,
                        SCAFFOLDING_PHASES.length,
                        setActivePhaseIndex,
                        phaseTabRefs.current
                      )
                    }
                    className={`rounded-2xl border p-4 text-left transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
                      selected
                        ? 'border-emerald-400/60 bg-[#0b1f1a] text-white'
                        : 'border-white/[0.08] bg-[#090d14] text-slate-300 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className="block font-mono text-xs font-semibold text-emerald-300">
                      {phase.badge}
                    </span>
                    <span className="mt-1.5 block text-xs font-medium text-slate-200">
                      {phase.providedRatio} · {phase.builderRatio}
                    </span>
                  </button>
                )
              })}
            </div>

            <div
              role="tabpanel"
              id={`academy-phase-panel-${activePhase.id}`}
              aria-labelledby={`academy-phase-tab-${activePhase.id}`}
              tabIndex={0}
              className="grid grid-cols-1 gap-4 rounded-2xl border border-white/[0.08] bg-[#090d14] p-5 sm:p-6 md:grid-cols-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
              <div className="space-y-2">
                <p className="font-mono text-xs text-emerald-300">
                  {activePhase.badge}
                </p>
                <h4 className="text-base font-semibold text-white">
                  {activePhase.heading}
                </h4>
                <p className="font-mono text-xs text-sky-300">
                  {activePhase.providedRatio} / {activePhase.builderRatio}
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="font-mono text-xs font-semibold text-slate-200">
                  Provided baseline
                </p>
                <p className="text-xs leading-relaxed text-slate-300">
                  {activePhase.providedByAcademy}
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-mono text-xs font-semibold text-slate-200">
                  Your responsibility &amp; exit check
                </p>
                <p className="text-xs leading-relaxed text-slate-300">
                  {activePhase.ownedByBuilder}
                </p>
                <p className="rounded-lg border border-white/[0.08] bg-[#05080d] px-3 py-2 font-mono text-[11px] text-emerald-300">
                  {activePhase.exitEvidence}
                </p>
              </div>
            </div>
          </div>

          {/* Action Row: Single Primary CTA + External Academy Link */}
          <div className="flex flex-col gap-4 border-t border-white/[0.08] pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <Link
              href="/guides/ai-architect-academy-visual-curriculum-2026"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#06120e] hover:bg-emerald-300 transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              <span>Read the 12-week visual curriculum guide</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <a
                href="https://aiarchitectacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-slate-200 underline decoration-white/30 underline-offset-4 hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              >
                <span>Open aiarchitectacademy.com</span>
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>

              <a
                href="https://github.com/frankxai/ai-architect-academy/tree/main/labs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-300 underline decoration-white/25 underline-offset-4 hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              >
                <span>Browse all offline labs on GitHub</span>
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
