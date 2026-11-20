import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { TrackedLink } from '@/components/analytics/TrackedLink'
import { MDXContent } from '@/components/blog/MDXContent'
import JsonLd from '@/components/seo/JsonLd'
import { amsterdamPath, amsterdamPhotos, fieldNotePath, universityInquiryPath } from '@/content/amsterdam/editorial'
import type { BlogPost } from '@/lib/blog'
import { contentLicense, siteConfig } from '@/lib/seo'
import EditorialPhoto from './EditorialPhoto'
import styles from './edition.module.css'

export default function FieldNotePreview({ post }: { post: BlogPost }) {
  const photo = amsterdamPhotos.oosterdok
  const url = new URL(fieldNotePath, siteConfig.url).toString()

  return (
    <main className={styles.edition}>
      <link rel="license" href={contentLicense.url} />
      <JsonLd type="Article" id="amsterdam-field-note-draft" data={{
        headline: post.title, description: post.description,
        author: { '@type': 'Person', name: post.author, url: siteConfig.url + '/about' },
        dateCreated: post.date, inLanguage: 'en', mainEntityOfPage: url,
        image: new URL(photo.src, siteConfig.url).toString(), license: contentLicense.url,
      }} />
      <article className={styles.note}>
        <header className={styles.shell + ' ' + styles.noteHeader}>
          <Link href={amsterdamPath} className={styles.backLink}><ArrowLeft size={16} aria-hidden="true" /> Amsterdam</Link>
          <p className={styles.kicker}>Field note · Editorial draft</p>
          <h1>{post.title}</h1>
          <p className={styles.lead}>{post.description}</p>
          <p className={styles.byline}>{post.author} <span aria-hidden="true">/</span> {post.readingTime}</p>
          <EditorialPhoto photo={photo} sizes="(max-width: 760px) 94vw, 900px" preload />
        </header>
        <div className={styles.prose}>
          <MDXContent source={post.content ?? ''} />
          <aside className={styles.noteAction}>
            <h2>Bring the case into a class</h2>
            <p>Share the course, the people in the room and the decision students should be able to defend.</p>
            <TrackedLink className={styles.textLink} href={universityInquiryPath} eventName="amsterdam_action" eventProperties={{ destination: 'university_inquiry', placement: 'field_note' }}>
              Discuss a university session <ArrowRight size={17} aria-hidden="true" />
            </TrackedLink>
          </aside>
        </div>
      </article>
    </main>
  )
}
