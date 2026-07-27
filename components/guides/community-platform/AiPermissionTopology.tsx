'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Play, RotateCcw } from 'lucide-react'

import { getCommunityPlatformAiMode } from '@/lib/community-platform-ai'
import type { CommunityPlatform } from '@/lib/community-platforms'
import styles from './community-platform-guide.module.css'

const STEPS = [
  {
    label: 'Read',
    detail: 'Activity, members, posts, progress',
    scope: 'Allowed',
  },
  {
    label: 'Reason',
    detail: 'Find stalled onboarding and unanswered questions',
    scope: 'Private workspace',
  },
  {
    label: 'Approve',
    detail: 'A human reviews the proposed consequential action',
    scope: 'Required',
  },
  {
    label: 'Act',
    detail: 'Create, update, message or moderate through scoped tools',
    scope: 'Logged',
  },
]

type AiPermissionTopologyProps = {
  platforms: CommunityPlatform[]
}

function compactExamples(platforms: CommunityPlatform[]) {
  const names = platforms.slice(0, 4).map((platform) => platform.platform)
  return `${names.join(' · ')}${platforms.length > names.length ? ` · +${platforms.length - names.length}` : ''}`
}

function sourceFor(platform: CommunityPlatform | undefined) {
  if (!platform) return null
  return (
    platform.primarySourceUrls.find((source) => source.toLowerCase().includes('mcp')) ??
    platform.primarySourceUrls[0] ??
    null
  )
}

export default function AiPermissionTopology({ platforms }: AiPermissionTopologyProps) {
  const [phase, setPhase] = useState(-1)
  const timers = useRef<number[]>([])
  const officialMcp = platforms.filter(
    (platform) => getCommunityPlatformAiMode(platform) === 'Official MCP'
  )
  const apiBuildable = platforms.filter(
    (platform) => getCommunityPlatformAiMode(platform) === 'API-buildable'
  )
  const nativeAi = platforms.filter(
    (platform) => getCommunityPlatformAiMode(platform) === 'Native AI'
  )
  const sourceOwned = platforms.filter((platform) =>
    platform.visualCustomizationCeiling.toLowerCase().includes('source')
  )
  const aiRoutes = [
    {
      label: 'Native AI',
      platforms: nativeAi,
      description: 'Vendor controls the tools, context and interface.',
    },
    {
      label: 'Official MCP',
      platforms: officialMcp,
      description: 'Vendor-documented tools connect external agents to live platform data.',
    },
    {
      label: 'API + webhooks',
      platforms: apiBuildable,
      description: 'Your team owns orchestration, policy, evaluation and recovery.',
    },
    {
      label: 'Headless / source-owned',
      platforms: sourceOwned,
      description: 'Maximum product control, security duty and operating liability.',
    },
  ]

  function clearTimers() {
    timers.current.forEach((timer) => window.clearTimeout(timer))
    timers.current = []
  }

  function runCycle() {
    clearTimers()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      setPhase(STEPS.length - 1)
      return
    }

    setPhase(0)
    STEPS.slice(1).forEach((_, index) => {
      timers.current.push(window.setTimeout(() => setPhase(index + 1), (index + 1) * 650))
    })
  }

  function resetCycle() {
    clearTimers()
    setPhase(-1)
  }

  useEffect(() => () => clearTimers(), [])

  return (
    <section id="ai-topology" className={styles.visualSection} aria-labelledby="ai-topology-title">
      <header className={styles.visualHeader}>
        <div>
          <p className={styles.figureNumber}>03 / AI permission topology</p>
          <h2 id="ai-topology-title">AI may observe broadly. Consequential writes cross a human gate.</h2>
        </div>
        <div className={styles.motionControls}>
          <button type="button" onClick={runCycle} disabled={phase >= 0 && phase < 3}>
            <Play aria-hidden="true" size={16} />
            Run one governed cycle
          </button>
          <button type="button" onClick={resetCycle} aria-label="Reset the governed AI cycle">
            <RotateCcw aria-hidden="true" size={16} />
            Reset
          </button>
        </div>
      </header>

      <div className={styles.permissionMap} data-phase={phase}>
        <div className={styles.readZone} aria-hidden="true">
          Read and reason zone
        </div>
        <div className={styles.writeZone} aria-hidden="true">
          Consequential write zone
        </div>
        <div className={styles.approvalBoundary} aria-hidden="true">
          <span>human approval boundary</span>
        </div>
        <ol>
          {STEPS.map((step, index) => (
            <li key={step.label} data-active={phase >= index || undefined}>
              <span className={styles.stepIndex}>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{step.label}</h3>
                <p>{step.detail}</p>
              </div>
              <span className={styles.stepScope}>{step.scope}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.aiRoutes} aria-label="Four registry-derived AI integration models">
        {aiRoutes.map((route) => {
          const source = sourceFor(route.platforms[0])
          return (
            <div key={route.label}>
              <span>
                {route.label} · {route.platforms.length}
              </span>
              <p>{route.description}</p>
              <p className={styles.routeExamples}>{compactExamples(route.platforms)}</p>
              {source ? (
                <a href={source} target="_blank" rel="noreferrer">
                  Inspect source
                  <ArrowUpRight aria-hidden="true" size={13} />
                </a>
              ) : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}
