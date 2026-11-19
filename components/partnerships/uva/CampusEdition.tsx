'use client'

import Image from 'next/image'
import { ArrowDown, ArrowRight, ArrowUpRight, CheckCheck, FileText, FlaskConical, GitCompareArrows, MapPin, Printer } from 'lucide-react'
import { type ReactNode } from 'react'
import { experienceCases } from '@/content/partnerships/proposals/uva-rec-impact'
import { campusIdeas, teachingTracks, universityProgrammes, type UniversityProgramme } from '@/content/partnerships/university-programmes'
import { trackEvent } from '@/lib/analytics'
import CampusLight from './CampusLight'
import s from './campus-edition.module.css'

const phases = [
  { time: '0–15 min', title: 'Set the baseline', detail: 'Write a decision memo from the supplied sources. Mark the claim a reviewer should check first.', icon: FileText },
  { time: '15–60 min', title: 'Remove a source', detail: 'Run the assistant again with evidence missing. Record whether it asks for help or makes a claim it cannot support.', icon: FlaskConical },
  { time: '60–90 min', title: 'Exchange the work', detail: 'Give the trace to another team. They repeat the test and decide which claims they can defend.', icon: GitCompareArrows },
]
const programmeLabels: Record<UniversityProgramme['id'], string> = {
  lecture: 'Guest lecture', keynote: 'Keynote & discussion', student: 'Student lab', workshop: 'Half-day workshop',
  research: 'Research collaboration', cohort: 'Faculty cohort licence', executive: 'Executive lab',
}

type Props = {
  selected: UniversityProgramme
  onSelect: (programme: UniversityProgramme) => void
  onBook: () => void
  intake: ReactNode
  research: ReactNode
  presentation: ReactNode
}

export function HostBrief({ selected }: { selected: UniversityProgramme }) {
  return <>
    <header><span>Frank Riemer · Starlight Intelligence</span><span>University host brief</span></header>
    <h1>{selected.name}</h1><p><strong>{selected.format} · {selected.fee}</strong></p><p>{selected.session}</p>
    <h2>Participants</h2><p>{selected.audience}</p><h2>What you take away</h2><p>{selected.output}</p>
    <h2>Host preparation</h2><p>{selected.host}</p><h2>Budget owner</h2><p>{selected.buyer}</p>
    <h2>Booking</h2><p>Send your preferred dates, delivery location and course context to frank@frankx.ai. The written quote confirms scope, fees, applicable tax, travel and recording rights.</p>
    <footer>frankx.ai/partnerships/universities?programme={selected.id} · Independent teaching by Frank Riemer.</footer>
  </>
}

export default function CampusEdition({ selected, onSelect, onBook, intake, research, presentation }: Props) {
  const studentSession = experienceCases.find(item => item.id === 'students')!.links[0]
  return <div className={s.edition}>
    <section id="opportunity" className={s.hero} aria-labelledby="campus-title">
      <div className={s.art}>
        <Image src="/images/partnerships/universities/campus-studio.webp" alt="Mini Frank and a student team inspecting a model together in a miniature Amsterdam studio" fill priority sizes="(max-width: 740px) 100vw, 78vw" />
        <CampusLight className={s.light} />
      </div>
      <div className={s.heroContent}>
        <p className={s.kicker}><span className={s.line} />Frank Riemer <span>/</span> University programmes</p>
        <h1 id="campus-title">Teach AI by<br/><em>building it.</em></h1>
        <p className={s.intro}>Bring a question from your course. I’ll help your students build an assistant, find where it fails, and hand the evidence to someone else.</p>
        <div className={s.actions}><a href="/partnerships/universities/source-check" className={s.cta} onClick={() => trackEvent('university_case_open', { placement: 'hero', case_id: 'source-check' })}>Try the free teaching case <ArrowRight size={17}/></a><a href="#programmes" className={s.quiet}>Compare programmes <ArrowDown size={16}/></a></div>
      </div>
      <div className={s.heroCaption}><span className={s.dot}/><span>Mini Frank storyboard</span><i/>Amsterdam studio study</div>
    </section>

    <nav className={s.nav} aria-label="University programmes"><div>
      <a href="#programmes">Programmes &amp; fees</a><a href="#inside-the-lab">Sample lab</a><a href="#your-host">Teaching record</a><a href="#join">Request dates <ArrowUpRight size={14}/></a>
    </div></nav>

    <section id="programmes" className={s.section} aria-labelledby="formats-heading">
      <p className={s.kicker}><span className={s.line}/> Host guide</p>
      <div className={s.spreadHead}><h2 id="formats-heading">Choose a programme.</h2><p>Compare the work, the preparation and the indicative fee before you request dates.</p></div>
      <div className={s.desk}>
        <div className={s.choices} aria-label="Programme formats">
          {universityProgrammes.map(item => <a key={item.id} href={`?programme=${item.id}#programmes`} aria-current={selected.id === item.id ? 'true' : undefined}
            onClick={event => { if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); onSelect(item) } }}>
            <span>{programmeLabels[item.id]}</span><small>{item.id === 'student' ? 'Selected hosts · €0' : item.fee}</small><ArrowRight size={16}/></a>)}
        </div>
        <article className={s.scope} id="programme-scope" aria-live="polite" aria-atomic="true">
          <div className={s.scopeTop}><span>{selected.format}</span><span>Programme brief</span></div>
          <h3>{selected.name}</h3><p>{selected.session}</p>
          <dl><div><dt>Who it’s for</dt><dd>{selected.audience}</dd></div><div><dt>What you take away</dt><dd>{selected.output}</dd></div><div><dt>Host prepares</dt><dd>{selected.host}</dd></div><div><dt>Budget owner</dt><dd>{selected.buyer}</dd></div></dl>
          <div className={s.scopeFoot}><div><small>Indicative host fee</small><strong>{selected.fee}</strong></div><a href="#join" className={s.book} onClick={onBook}>Request dates <ArrowRight size={16}/></a></div>
        </article>
      </div>
      <div className={s.terms}><p>Fees are per engagement in EUR. Your written quote covers preparation, materials, tax, travel and recording rights. Dates are reserved by agreement.</p><button onClick={() => { trackEvent('university_brief_print', { programme: selected.id }); window.print() }}><Printer size={15}/> Print this brief</button></div>
    </section>

    <section id="inside-the-lab" className={s.lab} aria-labelledby="lab-heading">
      <div className={s.labFrame}><div className={s.labIntro}><p className={s.kicker}><span className={s.line}/> Inside the student lab</p><h2 id="lab-heading">What happens when<br/><em>a source disappears?</em></h2><p>A sample 90-minute session. Students use a decision memo to test whether an assistant knows when its evidence runs out.</p></div>
        <div className={s.clock} aria-hidden="true"><strong>90</strong><span>minutes</span></div></div>
      <ol className={s.timeline}>{phases.map(({time,title,detail,icon:Icon}) => <li key={time}><span className={s.time}><Icon size={20}/>{time}</span><h3>{title}</h3><p>{detail}</p></li>)}</ol>
      <div className={s.labLinks}><a href="/partnerships/universities/source-check" onClick={() => trackEvent('university_case_open', { placement: 'lab', case_id: 'source-check' })}>Try the six-minute memo case <ArrowRight size={16}/></a><a href="/workshops/ai-operating-systems/lab.mjs" download>Download the offline exercise <ArrowDown size={16}/></a><a href="/workshops/ai-operating-systems/workbook.md" download>Facilitator workbook <ArrowDown size={16}/></a></div>
    </section>

    <section id="your-host" className={s.host}>
      <figure><Image src="/images/portraits/frank-presenting-oracle-2025.jpg" alt="Frank Riemer presenting at Oracle" width={960} height={720} sizes="(max-width: 740px) 100vw, 38vw"/><figcaption><MapPin size={14}/> From Frank’s time at Oracle</figcaption></figure>
      <div><p className={s.kicker}><span className={s.line}/> Your host</p><h2>Frank Riemer</h2><p className={s.byline}>AI Architect · Founder, Starlight Intelligence</p>
        <p>I worked in Oracle’s EMEA AI Center of Excellence. With MCI students, I taught a session on applying AI to their own skills and career choices. In Amsterdam, I facilitated an AI &amp; Ikigai workshop for NLdigital NextGen and the Young Oracle Board.</p>
        <div className={s.evidence}><a href={studentSession.url}>MCI session account <ArrowUpRight size={15}/></a><a href="/workshops/ikigai-branding">NLdigital workshop material <ArrowUpRight size={15}/></a><a href="/bio">Speaker bio <ArrowUpRight size={15}/></a></div>
      </div>
    </section>

    <section className={s.booking} aria-label="Book a university programme">
      <div className={s.bookingPath}><span><FileText/> Choose a format</span><i/><span><MapPin/> Share campus &amp; dates</span><i/><span><CheckCheck/> Agree the scope</span></div>
      {intake}
    </section>
    <details className={s.dossier} id="university-dossier"><summary>Research, challenges &amp; teaching materials <span aria-hidden="true">+</span></summary>
      <div className={s.dossierLinks}>{presentation}<div>{teachingTracks.map(([label,, ,url]) => <a key={label} href={url}>{label}<ArrowUpRight size={14}/></a>)}</div></div>
      {research}
      <div className={s.international}><h3>Ideas for international hosts</h3><p>These are proposed campus briefs. A local organiser and Frank would agree participation and scope.</p>{campusIdeas.map(([region,name,brief,href]) => <details key={region}><summary>{region}</summary><p>{brief} <a href={href}>{name} ↗</a></p></details>)}</div>
    </details>
  </div>
}
