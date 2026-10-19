import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Download, ExternalLink } from 'lucide-react'
import { JoeiWorkbench } from './workbench'
import styles from './studio.module.css'

export const metadata: Metadata = {
  title: 'Joei’s story studio | Friends of FrankX',
  description: 'A personal invitation from Frank: a proposed storytelling crew, printable products and creative workflows for Joei Chan.',
  alternates: { canonical: 'https://frankx.ai/friends/joei' },
  robots: { index: false, follow: false },
  openGraph: { title: 'A little story studio for Joei', description: 'A creative proposal from Frank, with original robot characters and hands-on story experiments.', url: 'https://frankx.ai/friends/joei', images: ['/images/friends/joei/crew-sheet.webp'] },
}

const crew = [
  ['Echo', 'Listen closely', 'Finds the thread in approved notes. Keeps sources and your wording together.'],
  ['Moss', 'Make room for play', 'Drafts story invitations, circle activities and screen-free exercises.'],
  ['Pip', 'Keep the brief clear', 'Coordinates the work, checks the inputs and keeps the weekly brief on track.'],
  ['Folio', 'Shape the pages', 'Turns a draft into a readable deck, workbook or facilitator guide.'],
  ['Sunny', 'Prepare the handoff', 'Checks the approved pack, formats files and writes the client handoff.'],
]
const products = [
  { number: '01', name: 'Pocket story deck', price: '€19–29', format: 'Printable deck', copy: '24 invitations to tell a small, real story. A gentle entry point for adult circles.', command: '/story-deck' },
  { number: '02', name: 'A circle in a box', price: '€39–59', format: 'Self-guided circle pack', copy: 'A 60-minute gathering with an opening, story cards, a listening agreement and a closing ritual.', command: '/circle' },
  { number: '03', name: 'The speaker’s storybook', price: '€59–89', format: 'Practice workbook', copy: 'A story inventory, three-minute talk outline, rehearsal pages and a feedback rubric.', command: '/speaker-kit' },
  { number: '04', name: 'Stories at work', price: '€149–249', format: 'Facilitator kit', copy: 'A team-session agenda, printable exercises, slide outline and a follow-up template.', command: '/team-session' },
]

export default function JoeiPage() {
  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.hero}>
          <div className={styles.topline}><Link href="/friends">← Friends of FrankX</Link><span>A personal proposal · from Frank</span></div>
          <p className={styles.eyebrow}>Made for Joei</p>
          <h1>A little studio.<br />A lot of <em>stories.</em></h1>
          <p className={styles.intro}>Joei, I made you a small creative world: five robot companions, printable ideas and a way to prepare the work you bring into a room.</p>
          <p className={styles.source}>Your <a href="https://joei-chan.com/" target="_blank" rel="noopener noreferrer">storytelling, speaking and creative sessions <ExternalLink size={12} aria-hidden="true" /></a> are the starting point. These are my proposals for you to explore; they carry no endorsement from you.</p>
          <a className={styles.primary} href="#workbench">Try your story crew <ArrowDown size={17} aria-hidden="true" /></a>
          <figure className={styles.heroImage}>
            <Image src="/images/friends/joei/crew-sheet.webp" width={1600} height={900} alt="Original concept lineup of Echo, Moss, Pip, Folio and Sunny on a warm cream background." sizes="(max-width: 1200px) 100vw, 1160px" preload />
            <figcaption>Imagined studio · original characters · a proposal, ready to play with</figcaption>
          </figure>
        </header>

        <section className={styles.section} aria-labelledby="crew-title">
          <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Meet the companions</p><h2 id="crew-title">A crew with a job.<br />You keep the voice.</h2></div><p>Give each assistant one clear responsibility. You choose the story, approve the draft and decide what leaves the studio.</p></div>
          <figure className={styles.image}><Image src="/images/friends/joei/crew-sheet.webp" width={1600} height={900} alt="Character design sheet showing Echo, Moss, Pip, Folio and Sunny, five original robots with distinct silhouettes and storytelling tools." sizes="(max-width: 1200px) 100vw, 1160px" /></figure>
          <div className={styles.crew}>{crew.map(([name, role, copy], i) => <article key={name}><span className={styles.number}>{String(i + 1).padStart(2, '0')}</span><h3>{name}</h3><p className={styles.role}>{role}</p><p>{copy}</p></article>)}</div>
        </section>

        <section className={styles.section} aria-labelledby="flow-title">
          <p className={styles.eyebrow}>The delivery path · conceptual</p><h2 id="flow-title">From a spark<br />to something someone can use.</h2>
          <p className={styles.deck}>The characters make the responsibilities visible. The review is yours.</p>
          <ol className={styles.flow} aria-label="Proposed client delivery workflow">
            {[
              ['01', 'Your source', 'Approved notes, purpose and audience'],
              ['02', 'Echo', 'A sourced brief in your voice'],
              ['03', 'Moss + Folio', 'Activities and a readable draft'],
              ['04', 'Joei reviews', 'Keep, rewrite or reject'],
              ['05', 'Sunny delivers', 'Approved files and a handoff'],
            ].map(([n, title, detail], i) => <li key={title} className={i === 3 ? styles.review : ''}><span>{n}</span><h3>{title}</h3><p>{detail}</p>{i < 4 && <ArrowRight className={styles.flowArrow} size={18} aria-hidden="true" />}</li>)}
          </ol>
          <p className={styles.note}><a href="/images/friends/joei/workflow-infographic.svg" target="_blank" rel="noopener noreferrer">Open the illustrated workflow infographic</a>. Pip coordinates each brief; Folio can prepare visual direction. A client’s words enter only with permission; every factual claim keeps its source.</p>
          <figure className={styles.image}><Image src="/images/friends/joei/client-delivery.webp" width={1600} height={900} alt="Concept scene of the story crew preparing printable cards, a workbook, a facilitator guide and presentation materials for a client." sizes="(max-width: 1200px) 100vw, 1160px" /><figcaption>Delivery concepts · the demo below contains sample outputs</figcaption></figure>
        </section>

        <section id="workbench" className={styles.section} aria-labelledby="workbench-title"><p className={styles.eyebrow}>Your command desk</p><h2 id="workbench-title">Choose the work.<br />See the crew assemble.</h2><p className={styles.deck}>These slash commands are portable briefs you can copy into an AI tool. This page previews the plan locally; it does not run AI agents.</p><JoeiWorkbench /></section>

        <section className={styles.section} aria-labelledby="products-title"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>Four things to test</p><h2 id="products-title">Small products.<br />Useful beyond the session.</h2></div><p>Start with the story deck. Test one real pack with a small group, revise it, then decide whether it earns a place in your shop.</p></div><div className={styles.products}>{products.map(product => <article key={product.number}><div className={styles.productTop}><span className={styles.number}>{product.number}</span><span>{product.format}</span></div><h3>{product.name}</h3><p>{product.copy}</p><div className={styles.productBottom}><strong>{product.price}</strong><code>{product.command}</code></div></article>)}</div><p className={styles.note}>Proposed price tests, not current offers. Nothing here is purchasable. Audience feedback, production cost and Joei’s approval determine the final product.</p></section>

        <section className={styles.section} aria-labelledby="garden-title"><p className={styles.eyebrow}>A door into Arcanea</p><h2 id="garden-title">What happens when<br />a story grows a world?</h2><p className={styles.deck}>Arcanea is my original fantasy and creative-world project. I imagine a story garden where your invitations meet invented places, curious companions and paper adventures.</p><figure className={styles.image}><Image src="/images/friends/joei/story-garden.webp" width={1600} height={900} alt="Proposed Arcanea story garden: the original robot crew prepares illustrated pages with adults at a table in a vast tree at sunset." sizes="(max-width: 1200px) 100vw, 1160px" /></figure><div className={styles.gardenFoot}><p>This garden is a new collaboration concept. It is not established Arcanea canon or an agreed partnership. We can start with one printable quest: a doorway, a difficult choice and a story told around a table.</p><a className={styles.secondary} href="https://arcanea.ai" target="_blank" rel="noopener noreferrer">Explore Arcanea <ExternalLink size={16} aria-hidden="true" /></a></div></section>

        <section className={styles.handoff} aria-labelledby="handoff-title"><div><p className={styles.eyebrow}>Take the studio with you</p><h2 id="handoff-title">The next step is<br />one real story.</h2><p>Download the starter kit, choose a brief and edit it until it sounds like you. Keep the files and run the briefs in the tool you prefer.</p></div><a className={styles.primary} href="/downloads/joei-story-studio.zip" download><Download size={18} aria-hidden="true" /> Download the starter kit</a></section>
        <footer className={styles.footer}><span>Made by Frank · original robot concepts · prepared for Joei</span><a href="https://joei-chan.com/" target="_blank" rel="noopener noreferrer">Joei’s official site <ExternalLink size={13} aria-hidden="true" /></a></footer>
      </div>
    </main>
  )
}
