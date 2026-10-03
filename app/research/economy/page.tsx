import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createMetadata } from '@/lib/seo'
import { economyAtlasAvailable } from '@/lib/research/economy-release'
import atlas from '@/data/economy-atlas.json'
import EconomyAtlasClient from './economy-atlas-client'
import styles from './economy-atlas.module.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = createMetadata({
  title: 'Economic atlas: products, marketplaces and costs',
  description: 'Compare 73 product proposals, 30 distribution channels and their evidence. Inspect sources and save an illustrative cost scenario. Demand remains unmeasured.',
  path: '/research/economy',
  canonical: 'https://www.frankx.ai/research/economy',
  noindex: true,
})

export default function EconomyPage() {
  if (!economyAtlasAvailable(process.env)) notFound()
  return (
    <main className={styles.atlas} id="economic-atlas">
      <header className={styles.hero}>
        <nav aria-label="Breadcrumb"><Link href="/research">Research</Link><span aria-hidden="true"> / </span><span>Economic atlas</span></nav>
        <p className={styles.eyebrow}>Products, distribution and evidence</p>
        <h1>What could you build?<br /><span>Where could it sell?</span></h1>
        <p className={styles.deck}>This atlas connects {atlas.opportunities.length} product proposals to {atlas.marketplaces.length} distribution channels. Pick a product, inspect the sources and test the costs. Suggested prices are untested; sales and willingness to pay remain unknown.</p>
        <div className={styles.heroLinks}><a href="#atlas-explorer">Explore the atlas <span aria-hidden="true">↗</span></a><Link href="/research/methodology">Read the methodology</Link></div>
        <p className={styles.researchNote}>Research preview · Dataset dated {atlas.asOf} · {atlas.sources.length} source records · Source retrieval is separate from claim review</p>
      </header>
      <EconomyAtlasClient atlas={atlas} />
      <footer className={styles.endnote}>
        <h2>Use this to choose the next test.</h2>
        <p>Channel rules, seller approval, rights, consumer duties and taxes depend on the actual product and account. The atlas records possibilities and evidence gaps. Each experiment needs a budget and a stop condition before it runs.</p>
        <div className={styles.heroLinks}><Link href="/research/sources">Research sources</Link><a href="/research/economy/atlas.json" download>Download public dataset</a></div>
      </footer>
    </main>
  )
}
