'use client'

import { useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Search } from 'lucide-react'

import {
  getCommunityPlatformAiMode,
  type CommunityPlatformAiMode,
} from '@/lib/community-platform-ai'
import { trackEvent } from '@/lib/analytics'
import type { CommunityPlatform } from '@/lib/community-platforms'
import styles from './community-platform-guide.module.css'

type PlatformAtlasProps = {
  platforms: CommunityPlatform[]
}

type BehaviorLane =
  | 'Creator community'
  | 'Learning'
  | 'Fan and commerce'
  | 'Enterprise'
  | 'Open and owned'
  | 'Infrastructure'

type ControlMode = 'Template' | 'Managed' | 'Extensible' | 'Source-owned'
type AiMode = CommunityPlatformAiMode

const BEHAVIOR_LANES: BehaviorLane[] = [
  'Creator community',
  'Learning',
  'Fan and commerce',
  'Enterprise',
  'Open and owned',
  'Infrastructure',
]

const CONTROL_SYMBOLS: Record<ControlMode, string> = {
  Template: '○',
  Managed: '◐',
  Extensible: '◇',
  'Source-owned': '◆',
}

function behaviorLane(platform: CommunityPlatform): BehaviorLane {
  const category = platform.category.toLowerCase()
  const useCase = platform.primaryUseCase.toLowerCase()

  if (
    category.includes('infrastructure') ||
    category.includes('chat') ||
    ['Stream', 'Sendbird', 'CometChat', 'TalkJS'].includes(platform.platform)
  ) {
    return 'Infrastructure'
  }
  if (
    category.includes('open-source') ||
    category.includes('source-owned') ||
    category.includes('wordpress') ||
    category.includes('forum')
  ) {
    return 'Open and owned'
  }
  if (
    category.includes('enterprise') ||
    category.includes('customer') ||
    category.includes('event') ||
    category.includes('association')
  ) {
    return 'Enterprise'
  }
  if (
    category.includes('learning') ||
    category.includes('course') ||
    useCase.includes('academy') ||
    useCase.includes('cohort')
  ) {
    return 'Learning'
  }
  if (
    category.includes('fan') ||
    category.includes('commerce') ||
    category.includes('membership') ||
    category.includes('newsletter')
  ) {
    return 'Fan and commerce'
  }
  return 'Creator community'
}

function controlMode(platform: CommunityPlatform): ControlMode {
  const ceiling = platform.visualCustomizationCeiling.toLowerCase()
  if (ceiling.includes('source-owned') || ceiling.includes('source-extensible')) {
    return 'Source-owned'
  }
  if (
    ceiling.includes('headless') ||
    ceiling.includes('extensible') ||
    ceiling.includes('extension')
  ) {
    return 'Extensible'
  }
  if (ceiling.includes('template')) return 'Template'
  return 'Managed'
}

function evidenceLabel(status: string) {
  if (status === 'verified_live') return 'Verified live'
  if (status.startsWith('verified_')) return 'Verified with qualification'
  if (status.startsWith('watchlist_')) return 'Watchlist'
  return status.replaceAll('_', ' ')
}

export default function CommunityPlatformAtlas({ platforms }: PlatformAtlasProps) {
  const [query, setQuery] = useState('')
  const [laneFilter, setLaneFilter] = useState<'All' | BehaviorLane>('All')
  const [aiFilter, setAiFilter] = useState<'All' | AiMode>('All')
  const [selectedName, setSelectedName] = useState('Circle')
  const evidenceRef = useRef<HTMLElement>(null)
  const lastSearchSignatureRef = useRef('')

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return platforms.filter((platform) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          platform.platform,
          platform.primaryUseCase,
          platform.bestFit100kCreator,
          platform.verdict,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)
      const matchesLane = laneFilter === 'All' || behaviorLane(platform) === laneFilter
      const matchesAi = aiFilter === 'All' || getCommunityPlatformAiMode(platform) === aiFilter
      return matchesQuery && matchesLane && matchesAi
    })
  }, [aiFilter, laneFilter, platforms, query])

  const selected =
    filtered.find((platform) => platform.platform === selectedName) ?? filtered[0]
  const officialMcpCount = platforms.filter(
    (platform) => getCommunityPlatformAiMode(platform) === 'Official MCP'
  ).length

  function selectPlatform(platformName: string) {
    const selectedPlatform = platforms.find((platform) => platform.platform === platformName)
    setSelectedName(platformName)
    trackEvent('community_guide_platform_selected', {
      platform: platformName,
      lane: selectedPlatform ? behaviorLane(selectedPlatform) : 'Unknown',
    })
    if (window.matchMedia('(max-width: 1120px)').matches) {
      window.requestAnimationFrame(() => {
        evidenceRef.current?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start',
        })
      })
    }
  }

  function recordSearch() {
    const characterCount = query.trim().length
    if (!characterCount) return

    const signature = `${query.trim()}:${filtered.length}:${laneFilter}:${aiFilter}`
    if (signature === lastSearchSignatureRef.current) return
    lastSearchSignatureRef.current = signature

    trackEvent('community_guide_atlas_search', {
      character_count: characterCount,
      result_count: filtered.length,
      lane: laneFilter,
      ai_mode: aiFilter,
    })
  }

  return (
    <section id="platform-atlas" className={styles.visualSection} aria-labelledby="atlas-title">
      <header className={styles.visualHeader}>
        <div>
          <p className={styles.figureNumber}>02 / Platform research atlas</p>
          <h2 id="atlas-title">Choose by member behavior. Then inspect control.</h2>
        </div>
        <p>
          {platforms.length} products · {officialMcpCount} documentation-verified vendor-MCP
          surfaces · live, beta and experimental
        </p>
      </header>

      <div className={styles.atlasControls} aria-label="Filter the platform registry">
        <label className={styles.searchField}>
          <span>Search</span>
          <span className={styles.inputShell}>
            <Search aria-hidden="true" size={16} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onBlur={recordSearch}
              onKeyDown={(event) => {
                if (event.key === 'Enter') recordSearch()
              }}
              placeholder="Platform, use case, verdict"
            />
          </span>
        </label>
        <label>
          <span>Member behavior</span>
          <select
            value={laneFilter}
            onChange={(event) => {
              const value = event.target.value as 'All' | BehaviorLane
              setLaneFilter(value)
              trackEvent('community_guide_atlas_filter', {
                filter_type: 'member_behavior',
                filter_value: value,
              })
            }}
          >
            <option>All</option>
            {BEHAVIOR_LANES.map((lane) => (
              <option key={lane}>{lane}</option>
            ))}
          </select>
        </label>
        <label>
          <span>AI connection</span>
          <select
            value={aiFilter}
            onChange={(event) => {
              const value = event.target.value as 'All' | AiMode
              setAiFilter(value)
              trackEvent('community_guide_atlas_filter', {
                filter_type: 'ai_connection',
                filter_value: value,
              })
            }}
          >
            <option>All</option>
            <option>Official MCP</option>
            <option>API-buildable</option>
            <option>Native AI</option>
            <option>No public agent surface</option>
          </select>
        </label>
      </div>

      <div className={styles.atlasLegend} aria-label="Control model legend">
        {(Object.entries(CONTROL_SYMBOLS) as [ControlMode, string][]).map(([label, symbol]) => (
          <span key={label}>
            <b aria-hidden="true">{symbol}</b> {label}
          </span>
        ))}
      </div>

      <div className={styles.atlasBody}>
        <div className={styles.constellation} aria-label={`${filtered.length} matching platforms`}>
          {BEHAVIOR_LANES.map((lane) => {
            const lanePlatforms = filtered
              .filter((platform) => behaviorLane(platform) === lane)
              .sort((a, b) => a.platform.localeCompare(b.platform))
            const laneId = `lane-${lane.toLowerCase().replaceAll(' ', '-')}`

            if (lanePlatforms.length === 0) return null

            return (
              <section key={lane} className={styles.constellationLane} aria-labelledby={laneId}>
                <div className={styles.laneHeading}>
                  <h3 id={laneId}>{lane}</h3>
                  <span>{lanePlatforms.length}</span>
                </div>
                <div className={styles.platformTiles}>
                  {lanePlatforms.map((platform) => {
                    const mode = controlMode(platform)
                    const isSelected = selected?.platform === platform.platform
                    return (
                      <button
                        key={platform.platform}
                        type="button"
                        className={styles.platformTile}
                        data-shortlist={platform.verdict.includes('SHORTLIST') || undefined}
                        aria-pressed={isSelected}
                        onClick={() => selectPlatform(platform.platform)}
                        aria-label={`${platform.platform}, ${mode}, ${getCommunityPlatformAiMode(platform)}`}
                      >
                        <span aria-hidden="true">{CONTROL_SYMBOLS[mode]}</span>
                        {platform.platform}
                      </button>
                    )
                  })}
                </div>
              </section>
            )
          })}
          {filtered.length === 0 ? (
            <p className={styles.emptyState}>No platform matches these filters.</p>
          ) : null}
        </div>

        {selected ? (
          <section
            ref={evidenceRef}
            className={styles.evidenceRail}
            aria-live="polite"
            aria-label="Selected platform evidence"
          >
          <div className={styles.evidenceIdentity}>
            <div>
              <span>{evidenceLabel(selected.evidenceStatus)}</span>
              <h3>{selected.platform}</h3>
            </div>
            <span className={styles.controlMark}>
              {CONTROL_SYMBOLS[controlMode(selected)]} {controlMode(selected)}
            </span>
          </div>
          <p className={styles.evidenceUseCase}>{selected.primaryUseCase}</p>
          <dl>
            <div>
              <dt>Verdict</dt>
              <dd>{selected.verdict}</dd>
            </div>
            <div>
              <dt>AI path</dt>
              <dd>
                <strong>{getCommunityPlatformAiMode(selected)}</strong>
                {selected.aiMcpAgentIntegration}
              </dd>
            </div>
            <div>
              <dt>App model</dt>
              <dd>{selected.brandedAppModel}</dd>
            </div>
            <div>
              <dt>Public pricing</dt>
              <dd>{selected.publicPricing2026}</dd>
            </div>
            <div>
              <dt>Migration risk</dt>
              <dd>{selected.migrationRisk}</dd>
            </div>
          </dl>
          <div className={styles.sourceLinks}>
            {selected.primarySourceUrls.slice(0, 3).map((source, index) => (
              <a
                key={source}
                href={source}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent('community_guide_source_opened', {
                    platform: selected.platform,
                    source_index: index + 1,
                    surface: 'atlas',
                  })
                }
              >
                Evidence source {index + 1}
                <ArrowUpRight aria-hidden="true" size={14} />
              </a>
            ))}
          </div>
          <p className={styles.verifiedDate}>Last verified {selected.lastVerified}</p>
          </section>
        ) : null}
      </div>
    </section>
  )
}
