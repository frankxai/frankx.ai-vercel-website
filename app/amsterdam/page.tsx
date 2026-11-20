import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'

import { TrackedLink } from '@/components/analytics/TrackedLink'
import EditorialPhoto from '@/components/amsterdam/EditorialPhoto'
import JsonLd from '@/components/seo/JsonLd'
import {
  amsterdamPath, amsterdamPhotos, fieldNotePath,
  sourceCheckPath, universityInquiryPath, universityPath,
} from '@/content/amsterdam/editorial'
import { getAmsterdamDraft } from '@/lib/blog'
import { createMetadata, siteConfig } from '@/lib/seo'
import styles from '@/components/amsterdam/edition.module.css'

const title = 'Amsterdam'
const description = 'Frank Riemer’s work in Amsterdam. Try an applied AI teaching case, discuss a university collaboration, or find workshops and field notes from the city.'
const hero = amsterdamPhotos.reguliersgracht
const pageUrl = new URL(amsterdamPath, siteConfig.url).toString()
const pageMetadata = createMetadata({ title, description, path: amsterdamPath, image: hero.src })

export const metadata: Metadata = {
  ...pageMetadata,
  openGraph: {
    ...pageMetadata.openGraph,
    images: [{ url: hero.src, width: hero.width, height: hero.height, alt: hero.alt }],
  },
}

export default function AmsterdamPage() {
  const draft = getAmsterdamDraft()

  return (
    <main className={styles.edition}>
      <JsonLd type="CollectionPage" id="amsterdam-collection" data={{
        name: 'FrankX Amsterdam', url: pageUrl, description, inLanguage: 'en',
        about: { '@type': 'City', name: 'Amsterdam' },
        isPartOf: { '@type': 'WebSite', name: siteConfig.shortName, url: siteConfig.url },
      }} />

      <header className={styles.masthead}>
        <div className={styles.shell}>
          <div className={styles.hero}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>Frank Riemer · Field notes &amp; teaching</p>
              <h1>Amsterdam</h1>
              <p className={styles.lead}>
                I build and teach practical AI in Amsterdam. Start with a case you can try in six minutes,
                or bring a question from your classroom, lab or team.
              </p>
              <Link className={styles.primary} href="#university">
                University collaboration <ArrowDown size={17} aria-hidden="true" />
              </Link>
            </div>
            <EditorialPhoto photo={hero} sizes="(max-width: 760px) 94vw, (max-width: 1250px) 57vw, 700px" preload />
          </div>
          <nav className={styles.index} aria-label="On this page">
            <Link href="#university">University</Link>
            <Link href="#gatherings">Gatherings</Link>
            <Link href="#fieldwork">Fieldwork</Link>
          </nav>
        </div>
      </header>

      <section className={styles.shell + ' ' + styles.university} id="university" aria-labelledby="amsterdam-university-title">
        <div className={styles.universityIntro}>
          <p className={styles.kicker}>University collaboration</p>
          <h2 id="amsterdam-university-title">Would you sign the AI’s answer?</h2>
          <p>
            The teaching case gives students an AI-written memo and the sources behind it.
            Take a source away and ask which claim they can still defend. A lecturer can run the case
            straight from the browser.
          </p>
          <TrackedLink className={styles.textLink} href={sourceCheckPath} eventName="amsterdam_action" eventProperties={{ destination: 'teaching_case' }}>
            Try the six-minute case <ArrowRight size={17} aria-hidden="true" />
          </TrackedLink>
        </div>
        <dl className={styles.pathways}>
          <div>
            <dt>Students</dt>
            <dd>Test an answer and explain where the evidence runs out. <Link href={sourceCheckPath}>Open the exercise</Link></dd>
          </div>
          <div>
            <dt>Lecturers and programme leads</dt>
            <dd>Bring a question from your syllabus. I’ll suggest a format and what students should be able to do afterwards. <TrackedLink href={universityInquiryPath} eventName="amsterdam_action" eventProperties={{ destination: 'university_inquiry' }}>Discuss a session</TrackedLink></dd>
          </div>
          <div>
            <dt>Research groups</dt>
            <dd>Bring one finding to reproduce, an accessible dataset and a reviewer. <Link href={universityPath + '?programme=research&via=amsterdam#programme-scope'}>Read the research brief</Link></dd>
          </div>
        </dl>
      </section>

      <section className={styles.shell + ' ' + styles.ledger} aria-label="Work and gatherings in Amsterdam">
        <div className={styles.ledgerIntro}>
          <h2 id="fieldwork">Fieldwork</h2>
          <p>What people build here, how they test it, and what others can learn from it.</p>
        </div>
        <div className={styles.ledgerRows}>
          {draft && (
            <article className={styles.ledgerRow}>
              <p className={styles.kicker}>Field note · Draft</p>
              <h3><Link href={fieldNotePath}>{draft.title} <ArrowRight size={18} aria-hidden="true" /></Link></h3>
              <p>A handoff test for the day after the hackathon.</p>
            </article>
          )}
          <article className={styles.ledgerRow}>
            <p className={styles.kicker} id="gatherings">Past gathering · <time dateTime="2026-11-05">5 November 2026</time></p>
            <h3><a href="https://luma.com/supabase-lvcl">Supabase × Claude Community Meetup <ArrowUpRight size={18} aria-hidden="true" /></a></h3>
            <p>A workshop and timed build session at Epicenter Amsterdam. The organiser’s programme is available for reference.</p>
          </article>
          <article className={styles.ledgerRow}>
            <p className={styles.kicker}>Local guide</p>
            <h3><Link href="/ecosystems/amsterdam">Amsterdam founder ecosystem <ArrowRight size={18} aria-hidden="true" /></Link></h3>
            <p>A starting point for finding workspaces and founder communities. Check prices and access with the venue.</p>
          </article>
          <article className={styles.ledgerRow}>
            <p className={styles.kicker}>Project</p>
            <h3><Link href="/guides/ai-operating-systems-workshop">An offline lab for AI workflows <ArrowRight size={18} aria-hidden="true" /></Link></h3>
            <p>Define one task, record where it fails, and hand the result to a peer for review. <a className={styles.inlineLink} href="https://starlightintelligence.ai">See Starlight’s systems work</a>.</p>
          </article>
        </div>
      </section>

      <section className={styles.shell + ' ' + styles.closing} aria-labelledby="amsterdam-workshops">
        <div>
          <p className={styles.kicker}>For founders and teams</p>
          <h2 id="amsterdam-workshops">Bring a workflow to the room.</h2>
          <p>Pick a task your team actually does. We’ll shape the session around what they need to build, test or decide.</p>
        </div>
        <TrackedLink href="/workshops" className={styles.primary} eventName="amsterdam_action" eventProperties={{ destination: 'workshops' }}>
          See workshop formats <ArrowRight size={17} aria-hidden="true" />
        </TrackedLink>
      </section>
    </main>
  )
}
