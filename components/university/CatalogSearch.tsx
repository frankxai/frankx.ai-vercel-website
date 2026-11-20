'use client'

import { useState } from 'react'
import { filterResources, resources } from '@/content/university/catalog'
import ResourceList from './ResourceList'
import styles from './commons.module.css'

const kinds = Array.from(new Set(resources.map(item => item.kind))).sort()

export default function CatalogSearch() {
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState('')
  const matches = filterResources(query, kind)
  function reset() {
    setQuery('')
    setKind('')
  }
  return <>
    <noscript><style>{'[data-commons-filters] {display:none!important}'}</style><p>All resources are listed below. Use your browser’s Find command to search this page.</p></noscript>
    <div role="search" aria-label="Find a Commons resource" data-commons-filters className={styles.filters}>
      <label>Search resources<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Try rubric or community" autoComplete="off" /></label>
      <label>Format<select value={kind} onChange={e => setKind(e.target.value)}>
        <option value="">All formats</option>{kinds.map(value => <option key={value}>{value}</option>)}
      </select></label>
      <button type="button" onClick={reset}>Clear filters</button>
    </div>
    <h2 className={styles.count} aria-live="polite" aria-atomic="true">{matches.length} {matches.length === 1 ? 'resource' : 'resources'}</h2>
    {matches.length ? <ResourceList items={matches} /> : <p>Try a shorter search term or clear the format filter.</p>}
  </>
}
