'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type publicAtlas from '@/data/economy-atlas.json'
import { calculateScenario, defaultScenario, numericFields, parseSelection, restoreSelection, serializeSelection, sourceFreshness, validScenario } from '@/lib/research/economy'
import type { AtlasSelection, Scenario } from '@/lib/research/economy'
import styles from './economy-atlas.module.css'

type Atlas = typeof publicAtlas
type View = 'explore' | 'compare' | 'economics' | 'markets' | 'regions' | 'models' | 'evidence'
const scenarioStorage = 'frankx.economy.scenario.v1'
const euro = (n: number) => new Intl.NumberFormat('en-IE', {style: 'currency', currency: 'EUR'}).format(n)
const fields: {key: typeof numericFields[number]; label: string; max?: number; step: number}[] = [
  {key: 'visits', label: 'Qualified visits per month', step: 1},
  {key: 'conversion', label: 'Conversion (%)', max: 100, step: 0.1},
  {key: 'price', label: 'Price excluding VAT (€)', step: 0.01},
  {key: 'vat', label: 'VAT (%)', max: 100, step: 0.1},
  {key: 'fee', label: 'Transaction fee (%)', max: 100, step: 0.1},
  {key: 'fixedFee', label: 'Fixed fee per order (€)', step: 0.01},
  {key: 'refund', label: 'Refund rate (%)', max: 100, step: 0.1},
  {key: 'delivery', label: 'Delivery / compute per order (€)', step: 0.01},
  {key: 'cac', label: 'Acquisition cost per visit (€)', step: 0.01},
  {key: 'fixed', label: 'Fixed monthly costs (€)', step: 0.01},
]
const valuesOf = (v: Scenario) => Object.fromEntries(numericFields.map(k => [k, String(v[k])])) as Record<typeof numericFields[number], string>
const sequence = (priority: number) => priority === 1 ? 'First experiment' : priority === 2 ? 'Next candidate' : 'Further research'

export default function EconomyAtlasClient({ atlas }: {atlas: Atlas}) {
  const ids = useMemo(() => atlas.opportunities.map(p => p.id), [atlas])
  const categories = useMemo(() => [...new Set(atlas.opportunities.map(p => p.category))], [atlas])
  const [productId, setProductId] = useState(ids[0])
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [channel, setChannel] = useState('all')
  const [firstOnly, setFirstOnly] = useState(false)
  const [compare, setCompare] = useState<string[]>([])
  const [view, setView] = useState<View>('explore')
  const [values, setValues] = useState(valuesOf(defaultScenario))
  const [basis, setBasis] = useState<Scenario['basis']>('gross')
  const [notice, setNotice] = useState('')
  const [saved, setSaved] = useState(false)
  const [sharedUrl, setSharedUrl] = useState('')
  const [today, setToday] = useState(atlas.asOf)
  const detail = useRef<HTMLElement>(null)
  const search = useRef<HTMLInputElement>(null)
  const importFile = useRef<HTMLInputElement>(null)

  function apply(s: AtlasSelection) {
    setProductId(s.product); setCategory(s.category); setQuery(s.query); setCompare(s.compare)
    setValues(valuesOf(s.scenario)); setBasis(s.scenario.basis); setChannel('all'); setFirstOnly(false)
  }
  useEffect(() => {
    const syncUrl = () => apply(parseSelection(new URLSearchParams(window.location.search), ids, categories))
    syncUrl(); setToday(new Date().toISOString().slice(0, 10))
    try {setSaved(!!localStorage.getItem(scenarioStorage))} catch {setNotice('Browser storage is unavailable. You can still share or export a scenario.')}
    window.addEventListener('popstate', syncUrl)
    return () => window.removeEventListener('popstate', syncUrl)
  }, [ids, categories])

  const scenario = {...Object.fromEntries(numericFields.map(k => [k, values[k].trim() === '' ? NaN : Number(values[k])])), basis} as Scenario
  const valid = validScenario(scenario)
  const result = valid ? calculateScenario(scenario) : null
  const selection = (): AtlasSelection => ({product: productId, compare, category, query, scenario})
  const product = atlas.opportunities.find(p => p.id === productId) || atlas.opportunities[0]
  const channels = atlas.marketplaces.filter(m => product.channelIds.includes(m.id))
  const sourceIds = [...new Set([...product.sourceIds, ...channels.flatMap(m => m.sourceIds)])]
  const filtered = atlas.opportunities.filter(p => (category === 'all' || p.category === category) && (channel === 'all' || p.channelIds.includes(channel)) && (!firstOnly || p.priority === 1) && [p.name, p.buyer, p.deliverable, p.category].join(' ').toLowerCase().includes(query.toLowerCase()))
  const comparison = compare.map(id => atlas.opportunities.find(p => p.id === id)).filter((p): p is Atlas['opportunities'][number] => !!p)

  function toggleCompare(id: string) {
    if (compare.includes(id)) setCompare(compare.filter(x => x !== id))
    else if (compare.length < 3) setCompare([...compare, id])
    else setNotice('Compare up to three products. Remove one before adding another.')
  }
  function pick(id: string, focus: boolean) {
    setProductId(id)
    if (focus) requestAnimationFrame(() => detail.current?.focus({preventScroll: false}))
  }
  function share() {
    if (!valid) return
    const url = new URL(window.location.href)
    url.search = serializeSelection(selection()); url.hash = ''
    window.history.pushState(null, '', url)
    setSharedUrl(url.href); setNotice('Share link prepared. It contains public product IDs and numeric assumptions; search text stays local.')
  }
  function save() {
    if (!valid) return
    try {localStorage.setItem(scenarioStorage, JSON.stringify({version: 1, ...selection()})); setSaved(true); setNotice('Scenario saved on this browser. It is not sent to FrankX.')}
    catch {setNotice('Save failed because browser storage is unavailable. Export the scenario to keep it.')}
  }
  function restore() {
    try {
      const raw = localStorage.getItem(scenarioStorage)
      const state = raw ? restoreSelection(raw, ids, categories) : null
      if (!state) {setNotice('No valid saved scenario was found. Current work is preserved.'); return}
      apply(state); setNotice('Saved scenario restored.'); setSharedUrl('')
    } catch {setNotice('Restore failed because browser storage is unavailable. Current work is preserved.')}
  }
  async function importScenario(file: File | undefined) {
    if (!file) return
    try {
      if (file.size > 200000) throw new Error('size')
      const state = restoreSelection(await file.text(), ids, categories)
      if (!state) throw new Error('invalid')
      apply(state); setNotice('Exported scenario imported. Review the assumptions against current source terms.'); setSharedUrl('')
    } catch {setNotice('Import failed: choose a valid atlas scenario JSON smaller than 200 KB. Current work is preserved.')}
    finally {if (importFile.current) importFile.current.value = ''}
  }
  function exportScenario() {
    if (!valid || !result) return
    const data = {version: 1, ...selection(), query: '', datasetAsOf: atlas.asOf, status: 'Illustrative assumptions; not measured demand or a revenue forecast', result, product: product.id, deliverable: product.deliverable, channels: channels.map(m => ({id: m.id, name: m.name, gate: m.gate, evidenceStatus: m.evidenceStatus})), sources: atlas.sources.filter(s => sourceIds.includes(s.id))}
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'}))
    const link = document.createElement('a'); link.href = url; link.download = 'frankx-economic-scenario.json'; link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000); setNotice('Scenario exported with its product, channels and source records.')
  }
  function sourceList(recordIds: string[]) {
    return <ul className={styles.sourceList}>{atlas.sources.filter(s => recordIds.includes(s.id)).map(s => <li key={s.id}>
      <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title} <span aria-hidden="true">↗</span><span className={styles.srOnly}> (opens a new tab)</span></a>
      <p>{s.note}</p><small>{s.claimReview === 'qualified' ? 'Qualified summary' : 'Claim review pending'} · {s.resolution === 'full-page' ? 'Full-page retrieval' : 'Excerpt retrieval'} · Checked {s.checkedAt} · {sourceFreshness(s.checkedAt, s.refreshDays, new Date(today))} retrieval</small>
    </li>)}</ul>
  }

  return <section id="atlas-explorer" className={styles.explorer} aria-label="Economic atlas explorer">
    <div className={styles.toolbar}>
      <nav className={styles.views} aria-label="Atlas views">{([['explore', 'Explore'], ['compare', `Compare (${compare.length})`], ['economics', 'Costs'], ['markets', 'Channels'], ['regions', 'Regions'], ['models', 'Business models'], ['evidence', 'Evidence']] as [View, string][]).map(([id, label]) => <button type="button" key={id} aria-pressed={view === id} onClick={() => setView(id)}>{label}</button>)}</nav>
      <div className={styles.actions}><button type="button" onClick={share} disabled={!valid}>Share</button><button type="button" onClick={save} disabled={!valid}>Save here</button><button type="button" onClick={restore} disabled={!saved}>Restore</button><button type="button" onClick={exportScenario} disabled={!valid}>Export scenario</button><button type="button" onClick={() => importFile.current?.click()}>Import</button><input ref={importFile} type="file" accept="application/json,.json" className={styles.srOnly} tabIndex={-1} aria-label="Import scenario JSON" onChange={e => void importScenario(e.target.files?.[0])} /></div>
    </div>
    <p className={styles.notice} role="status">{notice || 'A proposal is a route to test. Prices, demand and product sales remain unmeasured.'}</p>
    {sharedUrl && <p className={styles.shareLink}><label htmlFor="atlas-share">Share this scenario</label><input id="atlas-share" value={sharedUrl} readOnly onFocus={e => e.currentTarget.select()} /><a href={sharedUrl}>Open scenario</a></p>}

    {view === 'explore' && <>
      <div className={styles.filters}>
        <label>Search products<input ref={search} type="search" value={query} onChange={e => setQuery(e.target.value.slice(0, 120))} placeholder="Terminal, skins, workflow…" maxLength={120} /></label>
        <label>Product family<select value={category} onChange={e => setCategory(e.target.value)}><option value="all">All families</option>{categories.map(c => <option key={c}>{c}</option>)}</select></label>
        <label>Distribution channel<select value={channel} onChange={e => setChannel(e.target.value)}><option value="all">All channels</option>{atlas.marketplaces.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}</select></label>
        <label className={styles.check}><input type="checkbox" checked={firstOnly} onChange={e => setFirstOnly(e.target.checked)} /> First experiments</label>
        <button type="button" onClick={() => {setCategory('all'); setChannel('all'); setQuery(''); setFirstOnly(false); search.current?.focus()}}>Reset filters</button>
      </div>
      <div className={styles.workspace}>
        <section className={styles.products} aria-label="Product proposals">
          <div className={styles.columnHeading}><h2>Product proposals</h2><span aria-live="polite">{filtered.length} / {atlas.opportunities.length}</span></div>
          {filtered.length ? <ul>{filtered.map(p => <li key={p.id} data-selected={p.id === product.id}>
            <button type="button" className={styles.productPick} aria-pressed={p.id === product.id} onClick={e => pick(p.id, e.detail === 0)}><small>{p.category}</small><strong>{p.name}</strong><span>{p.buyer}</span><small>{sequence(p.priority)}</small></button>
            <label className={styles.compareCheck}><input type="checkbox" checked={compare.includes(p.id)} onChange={() => toggleCompare(p.id)} /> Compare<span className={styles.srOnly}> {p.name}</span></label>
          </li>)}</ul> : <p className={styles.empty}>No matching proposals. Reset filters to see the full atlas.</p>}
        </section>
        <div className={styles.productWorkspace}>
          <section className={styles.routeMap} aria-labelledby="route-heading">
            <div className={styles.columnHeading}><h2 id="route-heading">From product to distribution</h2><span>Proposed route</span></div>
            <svg className={styles.diagram} viewBox="0 0 800 270" role="img" aria-labelledby="diagram-title diagram-desc">
              <title id="diagram-title">{product.name}: proposed distribution routes</title><desc id="diagram-desc">Deliver {product.deliverable}. Proposed channels: {channels.map(m => m.name).join(', ')}. Connections show research relationships, not sales volume.</desc>
              <text x="20" y="24" className={styles.graphLabel}>Create</text><text x="290" y="24" className={styles.graphLabel}>Package and deliver</text><text x="570" y="24" className={styles.graphLabel}>Distribute</text>
              <path d="M245 135 C267 135 267 135 290 135" className={styles.edge} />
              {channels.slice(0, 4).map((m, i) => <path key={m.id} d={`M525 135 C545 135 545 ${65 + i * 56} 565 ${65 + i * 56}`} className={styles.edge} />)}
              <rect x="20" y="96" width="225" height="78" rx="12" className={styles.nodePrimary} /><text x="38" y="126" className={styles.nodeText}>{product.name.length > 26 ? product.name.slice(0, 24) + '…' : product.name}</text><text x="38" y="150" className={styles.graphLabel}>{product.category}</text>
              <rect x="290" y="96" width="235" height="78" rx="12" className={styles.node} /><text x="308" y="126" className={styles.nodeText}>A finished, usable product</text><text x="308" y="150" className={styles.graphLabel}>Rights · installation · support</text>
              {channels.slice(0, 4).map((m, i) => <g key={m.id}><rect x="565" y={44 + i * 56} width="215" height="42" rx="10" className={styles.node} /><text x="582" y={70 + i * 56} className={styles.nodeText}>{m.name.length > 25 ? m.name.slice(0, 23) + '…' : m.name}</text></g>)}
            </svg>
            <ol className={styles.mobilePath}><li><small>Create</small><strong>{product.name}</strong></li><li><small>Package and deliver</small><span>{product.deliverable}</span></li><li><small>Research distribution</small><span>{channels.map(m => m.name).join(' · ')}</span></li></ol>
            <p className={styles.caption}>Connections show possible routes. Line width does not represent demand, audience size or sales. {channels.length > 4 ? `${channels.length - 4} more channels are listed below.` : ''}</p>
          </section>
          <section className={styles.inspector} ref={detail} tabIndex={-1} aria-labelledby="product-title">
            <div className={styles.productTitle}><div><p className={styles.eyebrow}>{product.category} · {sequence(product.priority)}</p><h2 id="product-title">{product.name}</h2></div><span className={styles.price}>{euro(product.priceHypothesisEUR.low)}–{euro(product.priceHypothesisEUR.high)}<small>Untested price range</small></span></div>
            <dl className={styles.specification}><div><dt>Who it could help</dt><dd>{product.buyer}</dd></div><div><dt>What they receive</dt><dd>{product.deliverable}</dd></div><div><dt>What could fail</dt><dd>{product.risk}</dd></div><div><dt>Next test</dt><dd>{product.experiment}</dd></div></dl>
            <div className={styles.inspectorActions}><button type="button" onClick={() => toggleCompare(product.id)}>{compare.includes(product.id) ? 'Remove from comparison' : 'Add to comparison'}</button><button type="button" onClick={() => {setValues({...values, price: String(product.priceHypothesisEUR.low)}); setView('economics')}}>Model costs at {euro(product.priceHypothesisEUR.low)}</button></div>
            <h3>Distribution requirements</h3><ul className={styles.channelList}>{channels.map(m => <li key={m.id}><div><strong>{m.name}</strong><span>{m.evidenceStatus === 'qualified' ? 'Qualified summary' : 'Review pending'}</span></div><p>{m.gate}</p>{m.evidenceStatus === 'qualified' && <p>{m.economics}</p>}</li>)}</ul>
            <details className={styles.evidence}><summary>Inspect {sourceIds.length} source records for this route</summary>{sourceIds.length ? sourceList(sourceIds) : <p>No source record is attached to this proposal. The route needs research.</p>}</details>
          </section>
        </div>
      </div>
    </>}

    {view === 'compare' && <section className={styles.contentSection}><h2>Compare a shortlist.</h2><p>Up to three proposals. Every price is an experiment hypothesis; none establishes willingness to pay.</p>{comparison.length ? <><div className={styles.tableScroll} role="region" aria-label="Product comparison" tabIndex={0}><table><caption>Product, buyer, delivery, risk and next experiment</caption><thead><tr><th scope="col">Criterion</th>{comparison.map(p => <th key={p.id} scope="col">{p.name}<button type="button" onClick={() => toggleCompare(p.id)} aria-label={`Remove ${p.name}`}>Remove</button></th>)}</tr></thead><tbody>{(['buyer', 'deliverable', 'risk', 'experiment'] as const).map(key => <tr key={key}><th scope="row">{{buyer: 'Buyer', deliverable: 'Deliverable', risk: 'Risk', experiment: 'Next test'}[key]}</th>{comparison.map(p => <td key={p.id}>{p[key]}</td>)}</tr>)}<tr><th scope="row">Untested price</th>{comparison.map(p => <td key={p.id}>{euro(p.priceHypothesisEUR.low)}–{euro(p.priceHypothesisEUR.high)}</td>)}</tr><tr><th scope="row">Sales evidence</th>{comparison.map(p => <td key={p.id}>Not collected</td>)}</tr></tbody></table></div><button type="button" onClick={() => setCompare([])}>Clear comparison</button></> : <p className={styles.empty}>Select products in Explore to create a comparison.</p>}</section>}

    {view === 'economics' && <section className={styles.contentSection}><h2>Change assumptions. See the costs.</h2><p>Illustrative monthly EUR scenario. Set your actual contract fees; these defaults are not a marketplace quote or forecast.</p><div className={styles.calculator}><form onSubmit={e => e.preventDefault()} className={styles.calcFields}>{fields.map(f => <label key={f.key}>{f.label}<input name={f.key} type="number" min="0" max={f.max ?? 1e9} step={f.step} value={values[f.key]} onChange={e => setValues({...values, [f.key]: e.target.value})} required /></label>)}<label>Percentage-fee basis<select value={basis} onChange={e => setBasis(e.target.value as Scenario['basis'])}><option value="gross">Price including VAT</option><option value="net">Price excluding VAT</option></select></label><button type="button" onClick={() => {setValues(valuesOf(defaultScenario)); setBasis(defaultScenario.basis)}}>Reset assumptions</button></form><aside className={styles.calcResult}><p>Illustrative monthly contribution</p><output aria-live="polite" className={styles.contribution}>{result ? euro(result.contribution) : 'Invalid assumptions'}</output>{result ? <dl>{([['Expected orders', result.orders.toFixed(2)], ['Revenue after refunds', euro(result.revenue)], ['Transaction fees', euro(result.fees)], ['Delivery / compute', euro(result.delivery)], ['Acquisition', euro(result.acquisition)], ['Fixed monthly costs', euro(result.fixed)]]).map(([name, value]) => <div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}</dl> : <p role="alert">Enter finite, non-negative numbers. Percentages must be between 0 and 100. Save, share and export resume when inputs are valid.</p>}<p className={styles.caption}>Before business income tax and omitted costs. This model retains transaction fees and delivery costs on refunded orders. VAT is passed through; currency conversion, payout charges and tier thresholds require separate calculation.</p></aside></div><h3>Experiments with stop conditions</h3><div className={styles.experimentList}>{atlas.experiments.map(e => <article key={e.id}><small>{e.id} · Not run</small><h4>{atlas.opportunities.find(p => p.id === e.opportunityId)?.name}</h4><p>{e.hypothesis}</p><p><strong>Proposed acceptance:</strong> {e.success}</p><p><strong>Stop when:</strong> {e.stop}</p><p className={styles.caption}>{e.budget}</p></article>)}</div></section>}

    {view === 'markets' && <section className={styles.contentSection}><h2>Distribution is a product decision.</h2><p>Published fee summaries are qualified only where the full primary page was reviewed. Other channel economics remain hidden until claim review.</p><ul className={styles.records}>{atlas.marketplaces.map(m => <li key={m.id}><div><h3>{m.name}</h3><small>{m.region} · {m.type} · {m.evidenceStatus === 'qualified' ? 'Qualified summary' : 'Claim review pending'}</small></div><p>{m.products}</p><p><strong>Requirement:</strong> {m.gate}</p><p>{m.evidenceStatus === 'qualified' ? m.economics : 'Fee and commercial terms need review. Use the attached source as a research lead.'}</p><button type="button" onClick={() => {setChannel(m.id); setCategory('all'); setQuery(''); setFirstOnly(false); setView('explore')}}>Find proposals for {m.name}</button><details><summary>Sources ({m.sourceIds.length})</summary>{sourceList(m.sourceIds)}</details></li>)}</ul></section>}

    {view === 'regions' && <section className={styles.contentSection}><h2>Localize the product and the research.</h2><p>Regional sequences are proposed test order. No regional sales or willingness-to-pay evidence has been collected.</p><ul className={styles.records}>{atlas.regions.map(r => <li key={r.id}><h3>{r.name}</h3><p>{r.formats}</p><p>{r.hypothesis}</p><details><summary>Legal research leads · review pending</summary><p>{r.legal}</p>{sourceList(r.sourceIds)}</details></li>)}</ul><h3>Product-specific obligations</h3><p>These are questions for classification and local review, not legal clearance.</p>{atlas.regulation.map(r => <details className={styles.evidence} key={r.name}><summary>{r.name}: {r.trigger}</summary><p>{r.action}</p>{sourceList(r.sourceIds)}</details>)}</section>}

    {view === 'models' && <section className={styles.contentSection}><h2>Choose what the buyer owns.</h2><p>These models describe delivery and operating responsibilities. Naming a model does not establish a viable business.</p><ul className={styles.records}>{atlas.models.map(m => <li key={m.id}><h3>{m.name}</h3><p>{m.definition}</p><p><strong>Operating burden:</strong> {m.burden}</p><p><strong>Examples:</strong> {m.examples}</p></li>)}</ul><h3>From research to feedback</h3><ol className={styles.process}>{atlas.architecture.map(a => <li key={a.name}><h4>{a.name}</h4><p>{a.behavior}</p></li>)}</ol></section>}

    {view === 'evidence' && <section className={styles.contentSection}><h2>Inspect what each source establishes.</h2><p>{atlas.sources.filter(s => s.claimReview === 'qualified').length} qualified summaries; {atlas.sources.filter(s => s.claimReview !== 'qualified').length} records await claim review. Retrieval dates describe when a source was accessed. They do not certify that its terms apply to your account.</p><details className={styles.evidence}><summary>Provider audience figures · historical context</summary><p>Units, reporting periods and populations differ. These figures cannot be added, converted into paying buyers or used as the map’s line widths. Claims remain under review.</p><ul className={styles.records}>{atlas.metrics.map(m => <li key={m.id}><h3>{m.ecosystem}</h3><p>{new Intl.NumberFormat('en').format(m.value)} {m.unit} · {m.metric} · {m.period}</p><p>{m.limit}</p>{sourceList(m.sourceIds)}</li>)}</ul></details>{sourceList(atlas.sources.map(s => s.id))}</section>}
  </section>
}
