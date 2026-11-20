import Link from 'next/link'
import { notFound } from 'next/navigation'
import { paths, resourcesById, intake } from '@/content/university/catalog'
import CommonsLink from '@/components/university/CommonsLink'
import ResourceList from '@/components/university/ResourceList'
import styles from '@/components/university/commons.module.css'
import { createMetadata } from '@/lib/seo'

type Props = { params: Promise<{ audience: string }> }
export const dynamicParams = false
export const generateStaticParams = () => paths.map(path => ({ audience: path.slug }))

async function getPath({ params }: Props) {
  const { audience } = await params
  return paths.find(path => path.slug === audience) ?? notFound()
}

export async function generateMetadata(props: Props) {
  const path = await getPath(props)
  return createMetadata({ title: path.title + ' | University Commons', description: path.outcome, path: '/university/' + path.slug })
}

export default async function AudiencePage(props: Props) {
  const path = await getPath(props)
  return <>
    <Link href="/university" className={styles.back}>← University Commons</Link>
    <p className={styles.kicker}>{path.title}</p><h1>{path.headline}</h1><p className={styles.lead}>{path.outcome}</p>
    <section className={styles.section}><h2>Your working sequence</h2><ResourceList ordered items={resourcesById(path.sequence)} /></section>
    <section className={styles.section}><h2>For a deeper look</h2><ResourceList items={resourcesById(path.also)} /></section>
    <div className={styles.note}><CommonsLink href={intake} event="commons_inquiry_open" id={path.slug}>{path.invitation} →</CommonsLink><Link className={styles.secondary} href="/university/resources">Browse all resources</Link></div>
  </>
}
