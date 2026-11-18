import Link from 'next/link'
import CatalogSearch from '@/components/university/CatalogSearch'
import styles from '@/components/university/commons.module.css'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({ title: 'Resource catalogue | University Commons', description: 'Find a practical brief, offline lab, research reading or teaching resource.', path: '/university/resources' })

export default function ResourcesPage() {
  return <>
    <Link href="/university" className={styles.back}>← University Commons</Link>
    <h1>Resource catalogue</h1>
    <p className={styles.lead}>Choose a format or search by the work you want to do. Each entry names its source, language and access conditions.</p>
    <CatalogSearch />
  </>
}
