import type { Metadata } from 'next'
import Image from 'next/image'
import SourceDesk from './SourceDesk'
import { samplePath } from './case'
import s from './sample.module.css'

const title = 'Would you sign this AI-written memo? | FrankX teaching case'
const description = 'Teach AI source evaluation in six minutes. Inspect a campus memo, remove a source and compare two decisions. Includes the facilitator notes and answer key.'
const image = '/images/partnerships/universities/source-check.webp'
export const metadata: Metadata = {
  title: { absolute: title }, description, alternates: { canonical: samplePath },
  openGraph: { title, description, url: samplePath, images: [{ url: image, alt: 'Mini Frank inspecting an exit slip in the Amsterdam teaching studio' }] },
  twitter: { card: 'summary_large_image', title, description, images: [image] },
}

export default function SourceCheckPage() {
  return <main className={s.page}>
    <header className={s.cover}>
      <div className={s.photo}><Image src={image} alt="Mini Frank examines a response slip at the studio worktable." fill priority sizes="(max-width: 700px) 100vw, 53vw"/></div>
      <div className={s.heading}>
        <a href="/partnerships/universities" className={s.back}>← University programmes</a>
        <p className={s.kicker}>Frank Riemer <span>/</span> Free teaching case</p>
        <h1>Would you sign<br/><em>this AI-written memo?</em></h1>
        <p className={s.deck}>A campus director wants to run a second lab. You have six minutes to decide what the first one actually proved.</p>
        <div className={s.heroLinks}><a className={s.primary} href="#source-desk">Inspect the memo <span aria-hidden="true">↓</span></a><a className={s.textLink} href="#faculty-kit">Teach this case</a></div>
      </div>
    </header>
    <SourceDesk/>
  </main>
}
