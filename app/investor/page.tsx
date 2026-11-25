import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

import s from './investor.module.css'

const revision = '905cdff265da5f65b4279e9b86f0c3fb3b59fb48'
const collection = `https://github.com/frankxai/geninvestor-skills/blob/${revision}`
const caseFolder = `${collection}/examples/paying-studios`
const caseUrl = `${caseFolder}/README.md`
const archiveUrl = `https://codeload.github.com/frankxai/geninvestor-skills/zip/${revision}`
const reviewUrl = `${caseFolder}/review.md`
const methodUrl = `${collection}/skills/source-check/SKILL.md`

export default function InvestorHubPage() {
  return (
    <main className={s.page}>
      <header className={s.cover}>
        <div className={s.wrap}>
          <p className={s.byline}>Frank Riemer <span aria-hidden="true">/</span> Investor field notes</p>
          <div className={s.coverGrid}>
            <div className={s.coverCopy}>
              <p className={s.label}>Fictional case for the partner meeting</p>
              <h1>Six paid-plan flags.<br /><em>How many paying studios?</em></h1>
              <p className={s.lead}>A film editor fixes a name in a transcript. The correction follows the film into its next cut. The founder says 75% of the pilot paid. What would you put in the memo?</p>
              <div className={s.actions}>
                <a className={s.primary} href="#case">Try the case <ArrowDown size={16} aria-hidden="true" /></a>
                <Link className={s.quiet} href="/about">Meet Frank</Link>
              </div>
            </div>
            <figure className={s.plate}>
              <div className={s.plateImage}>
                <Image src="/images/gencreator/gencreator-framework-hero.webp" alt="A ring of translucent green glass panels surrounds the light at the centre of the GenCreator studio illustration." fill priority sizes="(max-width: 760px) 94vw, (max-width: 1200px) 43vw, 560px" />
              </div>
              <figcaption><span>Studio illustration</span><a href="https://gencreator.ai">GenCreator <ArrowUpRight size={14} aria-hidden="true" /></a></figcaption>
            </figure>
          </div>
        </div>
      </header>

      <section id="case" className={s.case} aria-labelledby="case-title">
        <div className={s.wrap}>
          <div className={s.rule}><span>GenInvestor</span><span>Five minutes · Fictional case</span></div>
          <div className={s.caseGrid}>
            <div>
              <h2 id="case-title">Write the sentence you would <em>say to the founder.</em></h2>
              <p>The packet contains a workspace roster, a dashboard snapshot, a settlement ledger and three first-cut delivery records. Give ChatGPT or Claude the same four records. Keep the answer key closed until you have a memo.</p>
              <a className={s.inkButton} href={caseUrl}>Open the case on GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
              <p className={s.small}>Copy the single text block into a fresh chat. <a href="https://chatgpt.com/">Open ChatGPT</a> <span aria-hidden="true">·</span> <a href="https://claude.ai/new">Open Claude</a></p>
            </div>
            <div className={s.sourceSheet}>
              <div className={s.sheetHead}><span>Source packet</span><span>03–17 Nov 2026</span></div>
              <dl>
                <div><dt>Roster</dt><dd>Who entered the pilot?</dd></div>
                <div><dt>Plan flags</dt><dd>Which features were switched on?</dd></div>
                <div><dt>Ledger</dt><dd>Who paid after refunds?</dd></div>
                <div><dt>Delivery log</dt><dd>Which cuts needed the founder?</dd></div>
              </dl>
              <details>
                <summary>What changes when you remove the ledger?</summary>
                <p>The team can still count flagged workspaces and describe the editors’ first cuts. The number of paying studios becomes unknown. Ask for dated receipts and refunds joined to studio IDs.</p>
                <a href={reviewUrl}>Read the complete reviewer’s key</a>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className={s.routes} id="ai-tools" aria-labelledby="further-title">
        <div className={s.wrap}>
          <div className={s.rule}><span>Further work</span><span>FrankX · Amsterdam</span></div>
          <div className={s.routesGrid}>
            <div><h2 id="further-title">Take the method <em>into the room.</em></h2><p>Give a portfolio team the instructions, teach a second case, or bring Frank a question about a build.</p><Link className={s.quiet} href="/ecosystem">Explore Frank’s portfolio</Link></div>
            <div className={s.directory}>
              <a href={archiveUrl}><strong>Download the free collection</strong><span>Four research skills, the studio case and its answer key. ZIP, 25 KB.</span></a>
              <a href={methodUrl}><strong>Read the source-check instructions</strong><span>One Markdown file for your next company memo.</span></a>
              <Link href="/partnerships/universities/source-check"><strong>Teach the campus case</strong><span>Change one source and see which conclusion survives.</span></Link>
              <Link href="/partnerships"><strong>Work with Frank</strong><span>Research, architecture and workshops for partner teams.</span></Link>
              <Link href="/research"><strong>Read the research</strong><span>Inspect the sources behind Frank’s published work.</span></Link>
            </div>
          </div>
          <details className={s.retail} id="platforms">
            <summary>Personal investing platform directory</summary>
            <p>The original platform links from this page.</p>
            <nav aria-label="Personal investing platforms">
              <a href="https://revolut.com">Revolut</a>
              <a href="https://etoro.com">eToro</a>
              <a href="https://crypto.com">Crypto.com</a>
              <a href="https://swissborg.com">SwissBorg</a>
              <a href="https://nexo.com">Nexo</a>
            </nav>
          </details>
        </div>
      </section>
    </main>
  )
}
