import Image from 'next/image'
import Link from 'next/link'
import { paths, resourcesById } from '@/content/university/catalog'
import CommonsLink from '@/components/university/CommonsLink'
import styles from '@/components/university/commons.module.css'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'University Commons', path: '/university',
  description: 'Independent learning paths, practical AI labs and research materials from FrankX for students, professors, researchers, founders and community organisers.',
})

export default function UniversityCommonsPage() {
  const [reading] = resourcesById(['purpose-fable'])
  return <>
    <header className={styles.hero}>
      <div>
        <p className={styles.kicker}>FrankX · Independent learning collection</p>
        <h1>University Commons</h1>
        <p className={styles.lead}>Choose a question to investigate, a class to teach or a prototype to test. Each path ends with work you can take with you.</p>
        <a className={styles.primary} href="#paths">Choose your path ↓</a>
        <Link className={styles.secondary} href="/university/resources">Browse all resources</Link>
      </div>
      <aside className={styles.feature}>
        <Image src="/images/books/fable-cover.jpg" alt="" width={150} height={208} sizes="(max-width: 640px) 86px, 140px" />
        <div><p className={styles.meta}>Seminar reading · 5 min</p><h2><CommonsLink href={reading.href} event="commons_resource_open" id={reading.id}>{reading.title}</CommonsLink></h2><p>How much can a map leave out and still be useful? A fable for opening a conversation about models.</p></div>
      </aside>
    </header>
    <section id="paths" className={styles.section}>
      <h2>Choose your path</h2>
      <nav aria-label="Learning paths" className={styles.pathList}>
        {paths.map(path => <Link key={path.slug} href={'/university/' + path.slug}><strong>{path.title}</strong><span>{path.headline}</span><span aria-hidden="true">↗</span></Link>)}
      </nav>
    </section>
    <aside className={styles.note}><h2>Bring a question to Frank</h2><p>FrankX curates this collection independently. To discuss a lab, research contribution or community challenge, use the university collaboration invitation.</p><Link href="/partnerships/universities">Explore a collaboration →</Link></aside>
  </>
}
