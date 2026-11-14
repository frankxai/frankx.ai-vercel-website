'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, BookOpen, Check, Copy, Download, ExternalLink, GitBranch, Github, Layers, Search, SlidersHorizontal, Terminal } from 'lucide-react'
import { mapDestinations, mapSkillPacks } from '@/lib/ecosystem/destinations'
import { filterRepos, recentActivity, type MapGroup, type MapSnapshot } from '@/lib/ecosystem/model'
import styles from './map.module.css'

const dateLabel = (date: string) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(date))
const sourceTime = (date: string) => `${dateLabel(date)} ${new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }).format(new Date(date))} UTC`
const positions = [{ x: 18, y: 35 }, { x: 50, y: 35 }, { x: 82, y: 35 }, { x: 18, y: 76 }, { x: 50, y: 76 }, { x: 82, y: 76 }]

export default function LivingMap({ snapshot, renderedAt }: { snapshot: MapSnapshot; renderedAt: number }) {
  const [selected, setSelected] = useState<MapGroup>('websites')
  const [group, setGroup] = useState<MapGroup | 'all'>('all')
  const [query, setQuery] = useState('')
  const [activeOnly, setActiveOnly] = useState(true)
  const [copied, setCopied] = useState('')
  const [copyError, setCopyError] = useState('')
  const [showAll, setShowAll] = useState(false)
  const destination = mapDestinations.find(item => item.id === selected)!
  const activity = useMemo(() => recentActivity(snapshot.repos, renderedAt), [snapshot.repos, renderedAt])
  const filtered = useMemo(() => filterRepos(snapshot.repos, query, group, activeOnly), [snapshot.repos, query, group, activeOnly])
  const availableSources = snapshot.sources.filter(source => source.state === 'available')
  const verifiedCount = snapshot.repos.filter(repo => repo.source === 'github').length
  const visible = showAll ? filtered : filtered.slice(0, 12)

  function selectGroup(id: MapGroup) { setSelected(id); setGroup(id); setShowAll(false) }
  async function copyCommand(repo: string) {
    setCopied(''); setCopyError('')
    try { await navigator.clipboard.writeText(`npx skills add ${repo}`); setCopied(repo) }
    catch { setCopyError('Copy unavailable. Select the command text and copy it manually.') }
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}><GitBranch size={14} aria-hidden="true" /> FrankX / The working map</p>
            <h1>The FrankX map<span>.</span></h1>
            <p className={styles.deck}>Find the work you can use. Explore the projects, read the source, and take the skills into your own setup.</p>
          </div>
          <a href="#map-skills" className={styles.primary}>Get the skills <ArrowDown size={16} aria-hidden="true" /></a>
        </header>

        <div className={styles.summary}>
          <span><i aria-hidden="true" /> {availableSources.length === snapshot.sources.length ? 'Public sources connected' : availableSources.length ? 'Partial source coverage' : 'Showing the saved directory'}</span>
          <span>{verifiedCount} source-checked repositories</span>
          <a href="#map-sources">Dates & coverage <ArrowRight size={13} aria-hidden="true" /></a>
        </div>

        <section className={styles.explorer} aria-labelledby="explore-heading">
          <div className={styles.mapPane}>
            <div className={styles.paneHeading}><h2 id="explore-heading">Choose a direction</h2><span>Navigation map</span></div>
            <div className={styles.canvas}>
              <svg viewBox="0 0 1000 460" preserveAspectRatio="none" aria-hidden="true" className={styles.connections}>
                {positions.map((point, index) => <path key={mapDestinations[index].id} d={`M 500 62 V 94 H ${point.x * 10} V ${point.y * 4.6 - 42}`} className={selected === mapDestinations[index].id ? styles.selectedPath : ''} />)}
                <path d="M 70 244 H 930" className={styles.guideLine} />
              </svg>
              <button className={styles.root} onClick={() => { setGroup('all'); setQuery(''); setShowAll(false) }}><Layers size={15} aria-hidden="true" /> All public projects</button>
              <div className={styles.nodeGrid}>
                {mapDestinations.map((item, index) => <button key={item.id} className={`${styles.node} ${selected === item.id ? styles.selectedNode : ''}`} style={{ left: `${positions[index].x}%`, top: `${positions[index].y}%` }} onClick={() => selectGroup(item.id)} aria-pressed={selected === item.id} aria-controls="map-detail map-directory">
                  <span className={styles.nodeNumber}>0{index + 1}<ArrowRight size={14} aria-hidden="true" /></span>
                  <strong>{item.name}</strong><span>{item.verb}</span>
                </button>)}
              </div>
              <p className={styles.legend}>Lines group destinations. They do not imply software dependencies.</p>
            </div>
          </div>
          <div className={styles.detail} id="map-detail">
            <figure className={styles.preview}>
              <Image key={destination.image} src={destination.image} alt="" fill sizes="(max-width: 900px) 100vw, 360px" className={styles.previewImage} />
              <figcaption>{destination.imageLabel}</figcaption>
            </figure>
            <div className={styles.detailBody}>
              <p className={styles.eyebrow}>Selected destination</p>
              <h3>{destination.name}</h3><p>{destination.description}</p>
              <Link className={styles.primary} href={destination.href}>Explore {destination.name} <ArrowRight size={16} aria-hidden="true" /></Link>
              <div className={styles.related}>{destination.links.map(link => <Link key={link.href} href={link.href}>{link.label}<ArrowRight size={14} aria-hidden="true" /></Link>)}</div>
            </div>
          </div>
        </section>

        <section className={styles.focus} aria-labelledby="focus-heading">
          <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Current focus / public signals</p><h2 id="focus-heading">Where the code is moving</h2></div><Link href="/roadmap">Roadmap <ArrowRight size={15} aria-hidden="true" /></Link></div>
          <p className={styles.muted}>Recent pushes across the sampled public repositories. Code activity does not establish a release or a strategic commitment.</p>
          {activity.length ? <ol className={styles.activityList}>{activity.map((repo, index) => <li key={repo.id}><span className={styles.activityNumber}>0{index + 1}</span><a href={repo.url}><span>{repo.owner}</span><strong>{repo.name}</strong></a><time dateTime={repo.pushedAt!}>{dateLabel(repo.pushedAt!)}</time><GitBranch size={16} aria-hidden="true" /></li>)}</ol> : <div className={styles.empty}>No verified pushes from the past 14 days are available. Browse the directory below; source availability is listed at the end of this page.</div>}
        </section>

        <section className={styles.skills} id="map-skills" aria-labelledby="skills-heading">
          <div className={styles.sectionHead}><div><p className={styles.eyebrow}><Terminal size={14} aria-hidden="true" /> Bring the methods with you</p><h2 id="skills-heading">Two packs. Your own tools.</h2></div><Link href="/skills">Skills guide <ArrowRight size={15} aria-hidden="true" /></Link></div>
          <div className={styles.packGrid}>{mapSkillPacks.map(pack => <article key={pack.repo} className={styles.pack}><h3>{pack.name}</h3><p>{pack.description}</p><div className={styles.command}><code>npx skills add {pack.repo}</code><button onClick={() => copyCommand(pack.repo)} aria-label={`Copy ${pack.name} install command`}>{copied === pack.repo ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}</button></div><div className={styles.packLinks}><a href={`https://skills.sh/${pack.repo}`}>View on skills.sh <ExternalLink size={13} aria-hidden="true" /></a><a href={`https://github.com/${pack.repo}/archive/refs/heads/${pack.branch}.zip`}>Download ZIP <Download size={14} aria-hidden="true" /></a><a href={`https://github.com/${pack.repo}`}>Source <Github size={14} aria-hidden="true" /></a></div></article>)}</div>
          <p role="status" className={styles.copyStatus}>{copyError || (copied ? 'Install command copied.' : '')}</p>
          <p className={styles.muted}>Choose your agent in the installer. ZIP files contain the repository for manual setup; each pack’s README explains installation.</p>
        </section>

        <section className={styles.directory} id="map-directory" aria-labelledby="directory-heading">
          <div className={styles.sectionHead}><div><p className={styles.eyebrow}><Github size={14} aria-hidden="true" /> Inspect the source</p><h2 id="directory-heading">Public project directory</h2></div><a href="https://github.com/frankxai">GitHub profile <ExternalLink size={14} aria-hidden="true" /></a></div>
          <div className={styles.toolbar}>
            <div className={styles.search}><label htmlFor="map-search">Find a project</label><div><Search size={17} aria-hidden="true" /><input id="map-search" type="search" value={query} onChange={event => { setQuery(event.target.value); setShowAll(false) }} placeholder="Name, owner or description" /></div></div>
            <div className={styles.select}><label htmlFor="map-group">Area</label><select id="map-group" value={group} onChange={event => { setGroup(event.target.value as MapGroup | 'all'); setShowAll(false) }}><option value="all">All areas</option>{mapDestinations.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div>
            <label className={styles.checkbox}><input type="checkbox" checked={activeOnly} onChange={event => { setActiveOnly(event.target.checked); setShowAll(false) }} /> Hide archived</label>
          </div>
          <div className={styles.resultsLine}><span>{filtered.length} projects{group !== 'all' ? ` in ${mapDestinations.find(item => item.id === group)?.name}` : ''}</span>{(query || group !== 'all' || !activeOnly) && <button onClick={() => { setQuery(''); setGroup('all'); setActiveOnly(true); setShowAll(false) }}>Clear filters</button>}</div>
          {visible.length ? <ul className={styles.repoList}>{visible.map(repo => <li key={repo.id}><div><a href={repo.url}><strong>{repo.name}</strong><ExternalLink size={13} aria-hidden="true" /></a><span className={styles.owner}>{repo.owner}</span><p>{repo.description || 'Inspect the repository for project details.'}</p></div><div className={styles.repoMeta}><span>{repo.archived ? 'Archived' : repo.source === 'github' ? 'Public source' : 'Saved entry'}</span><span>{repo.source === 'github' && repo.pushedAt ? `Pushed ${dateLabel(repo.pushedAt)}` : `Snapshot ${dateLabel(repo.observedAt)}`}</span></div></li>)}</ul> : <div className={styles.empty}><SlidersHorizontal size={22} aria-hidden="true" /><h3>No projects match</h3><p>Try another name or clear the area filter.</p></div>}
          {!showAll && filtered.length > 12 && <button className={styles.loadMore} onClick={() => setShowAll(true)}>Show all {filtered.length} matching projects <ArrowDown size={16} aria-hidden="true" /></button>}
        </section>

        <section className={styles.beyond}><BookOpen size={22} aria-hidden="true" /><div><h2>There’s more than code here.</h2><p>Read the books, listen to the music, or follow the research behind the builds.</p></div><nav aria-label="Creative work"><Link href="/books">Books <ArrowRight size={14} aria-hidden="true" /></Link><Link href="/music">Music <ArrowRight size={14} aria-hidden="true" /></Link><Link href="/research">Research <ArrowRight size={14} aria-hidden="true" /></Link></nav></section>

        <section className={styles.sources} id="map-sources"><h2>Sources & freshness</h2><p>The latest 30 public repositories per account are sampled on an hourly cache cycle as this page is visited. Forks and private records are excluded. Older directory entries retain their original snapshot date. Areas are navigation groupings; artwork previews are existing illustrations, not live application screenshots.</p><ul>{snapshot.sources.map(source => <li key={source.owner}><a href={source.url}>{source.owner} <ExternalLink size={12} aria-hidden="true" /></a><span>{source.observedAt ? `Source response ${sourceTime(source.observedAt)}` : 'Unavailable; saved entries may be shown'}</span></li>)}</ul><p>Directory fallback: {dateLabel(snapshot.snapshotDate)}. Source failures never receive a fresh timestamp.</p></section>
      </div>
    </div>
  )
}
