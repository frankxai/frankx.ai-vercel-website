'use client'

import { useMemo, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  ExternalLink,
  Filter,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

import { trackEvent } from '@/lib/analytics'
import {
  SOCIAL_MEDIA_TOOLS,
  SOCIAL_TOOL_CAPABILITIES,
  SOCIAL_TOOL_ROLES,
  type SocialMediaTool,
  type SocialToolCapability,
  type SocialToolRole,
} from '@/data/social-media-tools'

import styles from './social-media-tool-atlas.module.css'

function scoreLabel(score: number) {
  if (score >= 92) return 'Leading fit'
  if (score >= 82) return 'Strong fit'
  if (score >= 70) return 'Situational fit'
  return 'Specialist fit'
}

function toolInitials(name: string) {
  return name
    .split(/\s|-+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function ExternalToolLink({
  tool,
  href,
  label,
  surface,
}: {
  tool: SocialMediaTool
  href: string
  label: string
  surface: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent('social_tool_external_opened', {
          tool: tool.id,
          surface,
          destination: label.toLowerCase().replaceAll(' ', '_'),
        })
      }
    >
      {label}
      <ArrowUpRight aria-hidden="true" size={14} />
    </a>
  )
}

export default function SocialMediaToolAtlas() {
  const [role, setRole] = useState<SocialToolRole>('solo-founder')
  const [query, setQuery] = useState('')
  const [capability, setCapability] = useState<'All' | SocialToolCapability>('All')
  const [selectedId, setSelectedId] = useState('pallyy')
  const [compareIds, setCompareIds] = useState(['pallyy', 'metricool', 'buffer'])
  const evidenceRef = useRef<HTMLElement>(null)

  const roleDefinition = SOCIAL_TOOL_ROLES.find((item) => item.id === role)!

  const sortedTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return [...SOCIAL_MEDIA_TOOLS]
      .filter((tool) => {
        const matchesQuery =
          !normalizedQuery ||
          [tool.name, tool.category, tool.summary, tool.bestFor, tool.automation]
            .join(' ')
            .toLowerCase()
            .includes(normalizedQuery)
        const matchesCapability =
          capability === 'All' || tool.capabilities.includes(capability)
        return matchesQuery && matchesCapability
      })
      .sort((a, b) => b.roleScores[role] - a.roleScores[role])
  }, [capability, query, role])

  const selected =
    SOCIAL_MEDIA_TOOLS.find((tool) => tool.id === selectedId) ?? sortedTools[0]

  const comparedTools = compareIds
    .map((id) => SOCIAL_MEDIA_TOOLS.find((tool) => tool.id === id))
    .filter((tool): tool is SocialMediaTool => Boolean(tool))

  function chooseRole(nextRole: SocialToolRole) {
    const definition = SOCIAL_TOOL_ROLES.find((item) => item.id === nextRole)!
    setRole(nextRole)
    setSelectedId(definition.shortlist[0])
    setCompareIds(definition.shortlist)
    trackEvent('social_tool_role_selected', { role: nextRole })
  }

  function chooseTool(tool: SocialMediaTool) {
    setSelectedId(tool.id)
    trackEvent('social_tool_selected', {
      tool: tool.id,
      role,
      fit_score: tool.roleScores[role],
    })

    if (window.matchMedia('(max-width: 980px)').matches) {
      window.requestAnimationFrame(() => {
        evidenceRef.current?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
          block: 'start',
        })
      })
    }
  }

  function toggleCompare(toolId: string) {
    setCompareIds((current) => {
      const next = current.includes(toolId)
        ? current.filter((id) => id !== toolId)
        : current.length >= 3
          ? [...current.slice(1), toolId]
          : [...current, toolId]

      trackEvent('social_tool_compare_changed', {
        tool: toolId,
        action: current.includes(toolId) ? 'removed' : 'added',
        role,
        compare_count: next.length,
      })
      return next
    })
  }

  return (
    <>
      <section className={styles.roleSection} aria-labelledby="role-router-title">
        <div className={styles.sectionHeader}>
          <div>
            <p>01 / Decision router</p>
            <h2 id="role-router-title">Begin with the operating role.</h2>
          </div>
          <span>One market does not imply one winner.</span>
        </div>

        <div className={styles.roleTabs} role="tablist" aria-label="Choose your operating role">
          {SOCIAL_TOOL_ROLES.map((item, index) => (
            <button
              key={item.id}
              id={`role-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={role === item.id}
              aria-controls="role-recommendation"
              onClick={() => chooseRole(item.id)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <small>{item.eyebrow}</small>
              <strong>{item.label}</strong>
            </button>
          ))}
        </div>

        <div
          id="role-recommendation"
          className={styles.roleRecommendation}
          role="tabpanel"
          aria-labelledby={`role-tab-${role}`}
          aria-live="polite"
        >
          <div className={styles.roleNarrative}>
            <span className={styles.kicker}>Your decision job</span>
            <h3>{roleDefinition.job}</h3>
            <p>{roleDefinition.decision}</p>
          </div>
          <div className={styles.shortlist} aria-label={`${roleDefinition.label} shortlist`}>
            {roleDefinition.shortlist.map((id, index) => {
              const tool = SOCIAL_MEDIA_TOOLS.find((item) => item.id === id)!
              return (
                <button key={tool.id} type="button" onClick={() => chooseTool(tool)}>
                  <span>{index + 1}</span>
                  <div>
                    <small>{scoreLabel(tool.roleScores[role])}</small>
                    <strong>{tool.name}</strong>
                    <p>{tool.category}</p>
                  </div>
                  <ArrowUpRight aria-hidden="true" size={16} />
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className={styles.atlasSection} aria-labelledby="atlas-title">
        <div className={styles.sectionHeader}>
          <div>
            <p>02 / Evidence atlas</p>
            <h2 id="atlas-title">Inspect the fit. Open the source.</h2>
          </div>
          <span>{SOCIAL_MEDIA_TOOLS.length} tools · 8 capability signals · 3-way comparison</span>
        </div>

        <div className={styles.controls} aria-label="Filter the tool registry">
          <label>
            <span>Search the field</span>
            <div>
              <Search aria-hidden="true" size={16} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Tool, use case, API, MCP…"
              />
            </div>
          </label>
          <label>
            <span>Required capability</span>
            <div>
              <Filter aria-hidden="true" size={15} />
              <select
                value={capability}
                onChange={(event) => {
                  const value = event.target.value as 'All' | SocialToolCapability
                  setCapability(value)
                  trackEvent('social_tool_capability_filtered', {
                    capability: value,
                    role,
                  })
                }}
              >
                <option>All</option>
                {SOCIAL_TOOL_CAPABILITIES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          </label>
          <p>
            Ranked for <strong>{roleDefinition.label}</strong>. Scores route attention; official
            documentation supplies the facts.
          </p>
        </div>

        <div className={styles.atlasBody}>
          <div className={styles.toolField} aria-label={`${sortedTools.length} matching tools`}>
            {sortedTools.map((tool, index) => {
              const score = tool.roleScores[role]
              const isSelected = selected?.id === tool.id
              const isCompared = compareIds.includes(tool.id)
              return (
                <article
                  key={tool.id}
                  className={styles.toolTile}
                  data-selected={isSelected || undefined}
                  data-leading={index < 3 || undefined}
                >
                  <button
                    type="button"
                    className={styles.toolSelect}
                    aria-pressed={isSelected}
                    onClick={() => chooseTool(tool)}
                  >
                    <span className={styles.monogram} aria-hidden="true">
                      {toolInitials(tool.name)}
                    </span>
                    <span className={styles.toolIdentity}>
                      <small>{tool.category}</small>
                      <strong>{tool.name}</strong>
                      <span>{tool.price}</span>
                    </span>
                    <span className={styles.score}>
                      <strong>{score}</strong>
                      <small>{scoreLabel(score)}</small>
                    </span>
                  </button>
                  <button
                    type="button"
                    className={styles.compareToggle}
                    aria-pressed={isCompared}
                    onClick={() => toggleCompare(tool.id)}
                  >
                    <span aria-hidden="true">{isCompared ? <Check size={12} /> : null}</span>
                    {isCompared ? 'In comparison' : 'Compare'}
                  </button>
                </article>
              )
            })}
            {sortedTools.length === 0 ? (
              <div className={styles.emptyState}>
                <Search aria-hidden="true" size={24} />
                <h3>No tool matches that combination.</h3>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setCapability('All')
                  }}
                >
                  Reset the atlas
                </button>
              </div>
            ) : null}
          </div>

          {selected ? (
            <section
              ref={evidenceRef}
              className={styles.evidenceRail}
              aria-live="polite"
              aria-label={`${selected.name} evidence`}
            >
              <div className={styles.evidenceTopline}>
                <span>{selected.evidenceClass}</span>
                <strong>{selected.roleScores[role]} / 100 role fit</strong>
              </div>
              <div className={styles.evidenceTitle}>
                <span className={styles.monogram} aria-hidden="true">
                  {toolInitials(selected.name)}
                </span>
                <div>
                  <small>{selected.category}</small>
                  <h3>{selected.name}</h3>
                </div>
              </div>
              <p className={styles.evidenceSummary}>{selected.summary}</p>
              <dl>
                <div>
                  <dt>Best when</dt>
                  <dd>{selected.bestFor}</dd>
                </div>
                <div>
                  <dt>Watch for</dt>
                  <dd>{selected.caution}</dd>
                </div>
                <div>
                  <dt>Public price</dt>
                  <dd>
                    <strong>{selected.price}</strong>
                    {selected.priceDetail}
                  </dd>
                </div>
                <div>
                  <dt>Agent path</dt>
                  <dd>{selected.automation}</dd>
                </div>
                <div>
                  <dt>Deployment</dt>
                  <dd>{selected.deployment}</dd>
                </div>
              </dl>
              <div className={styles.capabilityList} aria-label="Documented capabilities">
                {selected.capabilities.map((item) => (
                  <span key={item}>
                    <Check aria-hidden="true" size={11} />
                    {item}
                  </span>
                ))}
              </div>
              <div className={styles.evidenceLinks}>
                <ExternalToolLink
                  tool={selected}
                  href={selected.productUrl}
                  label="Official product"
                  surface="evidence_rail"
                />
                <ExternalToolLink
                  tool={selected}
                  href={selected.pricingUrl}
                  label="Current pricing"
                  surface="evidence_rail"
                />
                {selected.sources.map((source) => (
                  <ExternalToolLink
                    key={source.url}
                    tool={selected}
                    href={source.url}
                    label={source.label}
                    surface="evidence_rail"
                  />
                ))}
              </div>
              <div className={styles.commercialStatus}>
                <ShieldCheck aria-hidden="true" size={17} />
                <div>
                  <strong>{selected.affiliate.program}</strong>
                  <p>{selected.affiliate.frankxRelationship}. Commercial status does not affect fit score.</p>
                  {selected.affiliate.programUrl ? (
                    <ExternalToolLink
                      tool={selected}
                      href={selected.affiliate.programUrl}
                      label="Program terms"
                      surface="commercial_status"
                    />
                  ) : null}
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </section>

      <section className={styles.compareSection} aria-labelledby="compare-title">
        <div className={styles.sectionHeader}>
          <div>
            <p>03 / Decision table</p>
            <h2 id="compare-title">Compare the architecture, not the adjective.</h2>
          </div>
          <span>{comparedTools.length} of 3 selected</span>
        </div>

        {comparedTools.length > 0 ? (
          <>
            <div className={styles.comparisonTableWrap}>
              <table className={styles.comparisonTable}>
                <thead>
                  <tr>
                    <th scope="col">Decision signal</th>
                    {comparedTools.map((tool) => (
                      <th key={tool.id} scope="col">
                        <span>{toolInitials(tool.name)}</span>
                        {tool.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{roleDefinition.label} fit</th>
                    {comparedTools.map((tool) => (
                      <td key={tool.id}>
                        <strong>{tool.roleScores[role]} / 100</strong>
                        {scoreLabel(tool.roleScores[role])}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Public price</th>
                    {comparedTools.map((tool) => (
                      <td key={tool.id}>{tool.price}</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Automation boundary</th>
                    {comparedTools.map((tool) => (
                      <td key={tool.id}>{tool.automation}</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Deployment</th>
                    {comparedTools.map((tool) => (
                      <td key={tool.id}>{tool.deployment}</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Best fit</th>
                    {comparedTools.map((tool) => (
                      <td key={tool.id}>{tool.bestFor}</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Commercial status</th>
                    {comparedTools.map((tool) => (
                      <td key={tool.id}>
                        {tool.affiliate.program}
                        <small>{tool.affiliate.frankxRelationship}</small>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.mobileComparisons}>
              {comparedTools.map((tool) => (
                <article key={tool.id}>
                  <div>
                    <span>{toolInitials(tool.name)}</span>
                    <div>
                      <small>{tool.category}</small>
                      <h3>{tool.name}</h3>
                    </div>
                    <strong>{tool.roleScores[role]}</strong>
                  </div>
                  <dl>
                    <div><dt>Price</dt><dd>{tool.price}</dd></div>
                    <div><dt>Automation</dt><dd>{tool.automation}</dd></div>
                    <div><dt>Best fit</dt><dd>{tool.bestFor}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.emptyComparison}>
            <Sparkles aria-hidden="true" size={20} />
            Select up to three tools in the atlas to build a comparison.
          </div>
        )}
      </section>
    </>
  )
}
