import Link from 'next/link'
import { notFound } from 'next/navigation'
import { challengeBriefs } from '@/content/partnerships/university-collaboration'
import { paths } from '@/content/university/catalog'
import { createMetadata } from '@/lib/seo'
import styles from '@/components/university/commons.module.css'

type Props = { params: Promise<{ slug: string }> }
export const dynamicParams = false
export const generateStaticParams = () => challengeBriefs.map(brief => ({ slug: brief.id }))
async function getBrief({ params }: Props) {
  const { slug } = await params
  return challengeBriefs.find(brief => brief.id === slug) ?? notFound()
}
export async function generateMetadata(props: Props) {
  const brief = await getBrief(props)
  return createMetadata({ title: brief.title, description: brief.task, path: '/university/challenges/' + brief.id })
}
export default async function ChallengePage(props: Props) {
  const brief = await getBrief(props)
  const related = paths.filter(path => [...path.sequence, ...path.also].includes(brief.id))
  return <>
    <Link href="/university/resources" className={styles.back}>← Resource catalogue</Link>
    <p className={styles.kicker}>Challenge · {brief.discipline}</p><h1>{brief.title}</h1><p className={styles.lead}>{brief.task}</p>
    <dl className={styles.brief}>{[['What to make', brief.deliverable], ['What data to use', brief.data], ['Peer review', brief.review]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <h2>Continue with a learning path</h2><nav aria-label="Related paths" className={styles.pathList}>{related.map(path => <Link key={path.slug} href={'/university/' + path.slug}>{path.title}<span>{path.headline}</span></Link>)}</nav>
  </>
}
