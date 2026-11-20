import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  Compass,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Users,
} from 'lucide-react'
import {
  ICP_TRACKS,
  type AcademyMissionBridgeSpec,
} from '@/lib/learn/academy-missions'

export interface AcademyMissionBridgeProps {
  bridge: AcademyMissionBridgeSpec
}

const CURRICULUM_GUIDE_SLUG = 'ai-architect-academy-visual-curriculum-2026'

export default function AcademyMissionBridge({ bridge }: AcademyMissionBridgeProps) {
  const primaryTrack = ICP_TRACKS[bridge.primaryIcp]
  const secondaryTrack = ICP_TRACKS[bridge.secondaryIcp]
  const primaryLab = bridge.cliLabs[0]
  const secondaryLab = bridge.cliLabs[1]
  const primaryMission = bridge.siaMissions[0]
  const secondaryMission = bridge.siaMissions[1]
  const isCurriculumGuide = bridge.guideSlug === CURRICULUM_GUIDE_SLUG

  return (
    <section
      id="academy-mission-bridge"
      aria-labelledby="academy-mission-bridge-heading"
      className="not-prose mt-16 max-w-4xl mx-auto"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.10] bg-[#0d111a] p-5 sm:p-8">
        {/* Restrained obsidian-aurora light field under translucent panels */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(circle at 12% 0%, rgba(16, 185, 129, 0.11), transparent 46%), radial-gradient(circle at 88% 12%, rgba(56, 189, 248, 0.09), transparent 42%), radial-gradient(circle at 50% 100%, rgba(212, 175, 55, 0.06), transparent 48%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
        />

        <div className="relative space-y-6">
          {/* Header & ICP Track Focus */}
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
              Next step · Hands-on practice
            </p>
            <h2
              id="academy-mission-bridge-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
            >
              Put this guide to work in a real lab
            </h2>
            <p className="max-w-2xl text-[15px] leading-relaxed text-slate-300">
              Turn what you just read into an inspectable repository artifact. Start with the paired open-source lab, check your work in the browser studio, and verify the red gate before shipping.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Primary track: {primaryTrack.label}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/25 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-200">
                Secondary: {secondaryTrack.label}
              </span>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-slate-300">
                {bridge.curriculumWeek}
              </span>
            </div>
          </div>

          {/* 3-Column Execution Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* 01: Open-Source CLI Lab */}
            <div className="min-w-0 rounded-2xl border border-white/[0.08] bg-[#090d14]/90 p-4 sm:p-5 flex flex-col justify-between gap-4">
              <div className="space-y-2.5 min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                  <Terminal className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>01 · Open-source CLI lab</span>
                </div>
                <h3 className="text-base font-semibold text-white leading-snug">
                  {primaryLab.title}
                </h3>
                <p className="font-mono text-xs text-slate-400 break-all">
                  frankxai/ai-architect-academy/{primaryLab.repoPath}
                </p>
                <p className="text-xs leading-relaxed text-slate-300">
                  {primaryLab.focus}
                </p>
              </div>

              <div className="space-y-2 min-w-0">
                <div
                  role="region"
                  aria-label="CLI lab verification command"
                  tabIndex={0}
                  className="overflow-x-auto rounded-lg border border-white/[0.08] bg-[#06090f] px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                >
                  <code className="whitespace-nowrap font-mono text-[11.5px] text-emerald-300">
                    {primaryLab.runCommand}
                  </code>
                </div>
                {secondaryLab ? (
                  <a
                    href={secondaryLab.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-slate-300 underline decoration-white/25 underline-offset-4 hover:text-white motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                  >
                    <span>Companion path: {secondaryLab.repoPath}</span>
                    <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </div>

            {/* 02: Interactive SIA Studio Mission */}
            <div className="min-w-0 rounded-2xl border border-white/[0.08] bg-[#090d14]/90 p-4 sm:p-5 flex flex-col justify-between gap-4">
              <div className="space-y-2.5 min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono text-sky-300">
                  <Compass className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>02 · Studio mission</span>
                </div>
                <h3 className="text-base font-semibold text-white leading-snug">
                  {primaryMission.title}
                </h3>
                <p className="font-mono text-xs text-sky-300 break-all">
                  starlightintelligence.academy{primaryMission.siaPath}
                </p>
                <p className="text-xs leading-relaxed text-slate-300">
                  {primaryMission.school} · {primaryMission.surfaceStatus}. Inspect mission packets, architecture plates, and acceptance criteria locally in the browser.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <a
                  href={primaryMission.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-300 underline decoration-sky-300/35 underline-offset-4 hover:text-sky-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                >
                  <span>Open {primaryMission.siaPath}</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </a>
                {secondaryMission ? (
                  <div>
                    <a
                      href={secondaryMission.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-slate-300 underline decoration-white/25 underline-offset-4 hover:text-white motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                    >
                      <span>Also inspect: {secondaryMission.title}</span>
                      <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                ) : null}
              </div>
            </div>

            {/* 03: Deliverable & Non-Compensable Red Gate */}
            <div className="min-w-0 rounded-2xl border border-white/[0.08] bg-[#090d14]/90 p-4 sm:p-5 flex flex-col justify-between gap-4">
              <div className="space-y-2.5 min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
                  <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>03 · Artifact &amp; red gate</span>
                </div>
                <h3 className="text-base font-semibold text-white leading-snug">
                  Shippable portfolio output
                </h3>
                <p className="text-xs leading-relaxed text-slate-200">
                  {bridge.artifact.deliverable}
                </p>
              </div>

              <div className="rounded-xl border border-amber-400/25 bg-amber-500/[0.07] p-3 space-y-1">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                  Non-compensable red gate
                </p>
                <p className="text-xs leading-relaxed text-slate-200">
                  {bridge.artifact.redGateCondition}
                </p>
              </div>
            </div>
          </div>

          {/* Peer Critique + Agent MCP Quickstart */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Circle Peer Review Tie-In */}
            <div className="min-w-0 rounded-2xl border border-white/[0.08] bg-[#090d14]/80 p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Users className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <span>Peer critique · {bridge.circleCritique.spaceName}</span>
              </div>
              <p className="text-sm font-semibold text-white">
                {bridge.circleCritique.protocolLabel}
              </p>
              <p className="text-xs leading-relaxed text-slate-300">
                {bridge.circleCritique.promptFocus}
              </p>
            </div>

            {/* Agent /api/mcp Quickstart */}
            <div className="min-w-0 rounded-2xl border border-white/[0.08] bg-[#090d14]/80 p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 text-xs font-mono text-sky-300">
                  <Bot className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Agent quickstart · POST {bridge.mcpEntrypoint.endpointPath}</span>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10.5px] text-slate-300">
                  read-only HTTP
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                Connect your coding agent to search related guides and companion articles. Server card at{' '}
                <code className="font-mono text-slate-200">{bridge.mcpEntrypoint.serverCardPath}</code>.
              </p>
              <div
                role="region"
                aria-label="Claude Code MCP registration command"
                tabIndex={0}
                className="overflow-x-auto rounded-lg border border-white/[0.08] bg-[#06090f] px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              >
                <code className="whitespace-nowrap font-mono text-[11.5px] text-sky-200">
                  {bridge.mcpEntrypoint.cliInstallCommand}
                </code>
              </div>
              <details className="group text-xs text-slate-300">
                <summary className="cursor-pointer select-none font-medium text-slate-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400">
                  Inspect JSON-RPC call ({bridge.mcpEntrypoint.toolName})
                </summary>
                <div
                  role="region"
                  aria-label="Sample MCP JSON-RPC request body"
                  tabIndex={0}
                  className="mt-2 overflow-x-auto rounded-lg border border-white/[0.08] bg-[#06090f] p-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                >
                  <pre className="font-mono text-[11px] leading-relaxed text-slate-200">
                    {bridge.mcpEntrypoint.jsonRpcSample}
                  </pre>
                </div>
              </details>
            </div>
          </div>

          {/* Action Row: Single Primary CTA + Subordinate Links */}
          <div className="flex flex-col gap-3 border-t border-white/[0.08] pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <a
              href={primaryLab.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-[#06120e] transition-colors hover:bg-emerald-300 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              <span>Open terminal lab on GitHub</span>
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <a
                href={primaryMission.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-200 underline decoration-white/30 underline-offset-4 hover:text-white motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              >
                <span>Explore {primaryMission.title}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              </a>

              <Link
                href={
                  isCurriculumGuide
                    ? '/ai-architect-academy'
                    : `/guides/${CURRICULUM_GUIDE_SLUG}`
                }
                className="inline-flex items-center gap-1 text-slate-300 underline decoration-white/25 underline-offset-4 hover:text-white motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              >
                <span>
                  {isCurriculumGuide
                    ? 'Browse AI Architect Academy overview'
                    : 'Read the 12-week visual curriculum'}
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
