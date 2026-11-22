'use client'

import Image from 'next/image'
import { ArrowDown, ArrowRight, ArrowUpRight, CheckCheck, FileText, FlaskConical, GitCompareArrows, MapPin, Printer } from 'lucide-react'
import { type MouseEvent, type ReactNode, useEffect, useRef } from 'react'
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
  research: 'Research translation', cohort: 'Faculty cohort licence', executive: 'Executive lab',
}

const teachingPath = [
  { programme: 'lecture', format: 'A guest lecture', title: 'Give the room a decision.', detail: 'I bring two AI answers to a question from your syllabus. Students decide which answer they would put their name to. You keep the seminar prompts and marking rubric.', link: 'Read the lecture brief' },
  { programme: 'workshop', format: 'A half-day workshop', title: 'Let the teams build it.', detail: 'Bring a brief from a founder or a research group. Each team builds an assistant, takes away a source and hands its work to a second team to test.', link: 'See what the workshop involves' },
  { programme: 'cohort', format: 'A faculty-led series', title: 'Teach the next cohort yourself.', detail: 'Your lecturers rehearse three labs with me, then teach the first cohort using the same cases and marking rubric. We agree how the materials can be reused on campus.', link: 'Explore faculty delivery' },
] as const

const continuation = {
  lecture: { to: 'workshop', prompt: 'Ready to have the class build its own assistant?', link: 'See the half-day workshop' },
  student: { to: 'workshop', prompt: 'Have a course brief the teams could work on?', link: 'See the half-day workshop' },
  workshop: { to: 'cohort', prompt: 'Want your faculty to run the next lab?', link: 'See the faculty series' },
} as const

type Props = {
  selected: UniversityProgramme
  onSelect: (programme: UniversityProgramme, anchor?: string) => void
  guideInitiallyOpen: boolean
  fromSourceCheck: boolean
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
    <h2>Booking</h2><p>Fees are indicative. A booking is agreed in a written scope. Send your preferred dates, delivery location and course context to frank@frankx.ai. The written quote confirms scope, fees, applicable tax, travel and recording rights.</p>
    <footer>frankx.ai/partnerships/universities?programme={selected.id} · Independent teaching by Frank Riemer.</footer>
  </>
}

export default function CampusEdition({ selected, onSelect, guideInitiallyOpen, fromSourceCheck, onBook, intake, research, presentation }: Props) {
  const studentSession = experienceCases.find(item => item.id === 'students')!.links[0]
  const nldigitalProof = experienceCases.find(item => item.id === 'nldigital')!.links[1]
  const guide = useRef<HTMLDetailsElement>(null)
  const scope = useRef<HTMLElement>(null)
  const next = selected.id === 'lecture' || selected.id === 'student' || selected.id === 'workshop' ? continuation[selected.id] : undefined
  const referral = fromSourceCheck ? '&via=source-check' : ''

  useEffect(() => {
    function openLinkedGuide() {
      if (['#programmes', '#programme-scope'].includes(window.location.hash) && guide.current) {
        guide.current.open = true
        if (window.location.hash === '#programme-scope') scope.current?.scrollIntoView({ block: 'start' })
      }
    }
    openLinkedGuide()
    window.addEventListener('hashchange', openLinkedGuide)
    return () => window.removeEventListener('hashchange', openLinkedGuide)
  }, [])

  function openBrief(event: MouseEvent<HTMLAnchorElement>, id: UniversityProgramme['id'], placement: 'teaching_path' | 'continuation') {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    const item = universityProgrammes.find(programme => programme.id === id)
    if (!item || !guide.current) return
    event.preventDefault()
    guide.current.open = true
    onSelect(item, 'programme-scope')
    trackEvent('university_host_brief_open', { placement, programme: id, ...(placement === 'continuation' ? { previous_programme: selected.id } : {}) })
    requestAnimationFrame(() => {
      scope.current?.focus({ preventScroll: true })
      scope.current?.scrollIntoView({ block: 'start' })
    })
  }

  return <div className={s.edition}>
    <section id="opportunity" className={s.hero} aria-labelledby="campus-title">
      <div className={s.art}>
        <Image src="/images/partnerships/universities/campus-studio.webp" alt="Mini Frank and a student team inspecting a model together in a miniature Amsterdam studio" fill priority sizes="(max-width: 740px) 100vw, 78vw" />
        <CampusLight className={s.light} />
      </div>
      <div className={s.heroContent}>
        <p className={s.kicker}><span className={s.line} />Frank Riemer <span>/</span> Applied AI for universities</p>
        <h1 id="campus-title">Let the class<br/><em>decide.</em></h1>
        <p className={s.intro}>Put an AI-written memo on the projector. Ask who would sign it. Then take away the source behind its strongest claim.</p>
        <div className={s.actions}><a href="/partnerships/universities/source-check" className={s.cta} onClick={() => trackEvent('university_case_open', { placement: 'hero', case_id: 'source-check' })}>Try the free six-minute case <ArrowRight size={17}/></a><a href="#teaching-path" className={s.quiet}>Bring this to my course <ArrowDown size={16}/></a></div>
      </div>
      <div className={s.heroCaption}><span className={s.dot}/><span>Mini Frank storyboard</span><i/>Amsterdam studio study</div>
    </section>

    <nav className={s.nav} aria-label="University programmes"><div>
      <a href="#inside-the-lab">Inside the lab</a><a href="#your-host">Meet Frank</a><a href="#programmes" onClick={() => { if (guide.current) guide.current.open = true; trackEvent('university_host_guide_open', { placement: 'navigation' }) }}>Host briefs &amp; fees</a><a href="#join">Request dates <ArrowUpRight size={14}/></a>
    </div></nav>

    <section id="teaching-path" className={s.path} aria-labelledby="path-heading">
      <div className={s.pathLead}><p className={s.kicker}><span className={s.line}/> Teaching with Frank</p>
        <h2 id="path-heading">What could your class<br/><em>do with that question?</em></h2>
        <p>A lecturer can run the free case tomorrow. When you bring me into the room, we start with a decision that belongs to your course.</p>
        <Image src="/images/partnerships/universities/source-check.webp" alt="Mini Frank and a small orange robot examining a response slip at the classroom worktable" width={1440} height={960} sizes="(max-width: 740px) 100vw, 37vw"/>
      </div>
      <ol className={s.chapters}>{teachingPath.map(stage => <li key={stage.programme}>
        <span>{stage.format}</span><h3>{stage.title}</h3><p>{stage.detail}</p>
        <a href={`?programme=${stage.programme}${referral}#programme-scope`} onClick={event => openBrief(event, stage.programme, 'teaching_path')}>{stage.link} <ArrowRight size={15}/></a>
      </li>)}</ol>
    </section>

    <section id="inside-the-lab" className={s.lab} aria-labelledby="lab-heading">
      <div className={s.labFrame}><div className={s.labIntro}><p className={s.kicker}><span className={s.line}/> Inside the student lab</p><h2 id="lab-heading">What happens when<br/><em>a source disappears?</em></h2><p>In this 90-minute student lab, one team writes a memo with an assistant. A second team gets the evidence and tries to reproduce the finding.</p></div>
        <div className={s.clock} aria-hidden="true"><strong>90</strong><span>minutes</span></div></div>
      <ol className={s.timeline}>{phases.map(({time,title,detail,icon:Icon}) => <li key={time}><span className={s.time}><Icon size={20}/>{time}</span><h3>{title}</h3><p>{detail}</p></li>)}</ol>
      <div className={s.labLinks}><a href="/partnerships/universities/source-check" onClick={() => trackEvent('university_case_open', { placement: 'lab', case_id: 'source-check' })}>Try the six-minute memo case <ArrowRight size={16}/></a><a href="/workshops/ai-operating-systems/lab.mjs" download>Download the offline exercise <ArrowDown size={16}/></a><a href="/workshops/ai-operating-systems/workbook.md" download>Facilitator workbook <ArrowDown size={16}/></a></div>
    </section>

    <section id="your-host" className={s.host}>
      <figure><Image src="/images/portraits/frank-presenting-oracle-2025.jpg" alt="Frank Riemer presenting at Oracle" width={960} height={720} sizes="(max-width: 740px) 100vw, 38vw"/><figcaption><MapPin size={14}/> From Frank’s time at Oracle</figcaption></figure>
      <div><p className={s.kicker}><span className={s.line}/> Your host</p><h2>Frank Riemer</h2><p className={s.byline}>AI Architect · Founder, Starlight Intelligence</p>
        <p>I worked in Oracle’s EMEA AI Center of Excellence. With MCI students, I taught a session on applying AI to their own skills and career choices. In Amsterdam, I facilitated an AI &amp; Ikigai workshop for NLdigital NextGen and the Young Oracle Board.</p>
        <div className={s.evidence}><a href={studentSession.url}>MCI session account <ArrowUpRight size={15}/></a><a href={nldigitalProof.url}>NLdigital workshop record <ArrowUpRight size={15}/></a><a href="/bio">Speaker bio <ArrowUpRight size={15}/></a></div>
      </div>
    </section>

    <details id="programmes" className={s.guide} ref={guide} open={guideInitiallyOpen || undefined}>
      <summary onClick={() => { if (!guide.current?.open) trackEvent('university_host_guide_open', { placement: 'disclosure' }) }}><span><strong>Host briefs &amp; fees</strong><small>Planning dates or preparing a budget? Find the scope, preparation and fee for each format.</small></span><span className={s.disclose} aria-hidden="true">+</span></summary>
      <div className={s.desk}>
        <div className={s.choices} aria-label="Programme formats">
          {universityProgrammes.map(item => <a key={item.id} href={`?programme=${item.id}${referral}#programmes`} aria-current={selected.id === item.id ? 'true' : undefined}
            onClick={event => { if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); onSelect(item) } }}>
            <span>{programmeLabels[item.id]}</span><small>{item.id === 'student' ? 'Selected hosts · €0' : item.fee}</small><ArrowRight size={16}/></a>)}
        </div>
        <article ref={scope} tabIndex={-1} className={s.scope} id="programme-scope" aria-live="polite" aria-atomic="true">
          <div className={s.scopeTop}><span>{selected.format}</span><span>Programme brief</span></div>
          <h3>{selected.name}</h3><p>{selected.session}</p>
          <dl><div><dt>Who it’s for</dt><dd>{selected.audience}</dd></div><div><dt>What you take away</dt><dd>{selected.output}</dd></div><div><dt>Host prepares</dt><dd>{selected.host}</dd></div><div><dt>Budget owner</dt><dd>{selected.buyer}</dd></div></dl>
          <div className={s.scopeFoot}><div><small>Indicative host fee</small><strong>{selected.fee}</strong></div><a href="#join" className={s.book} onClick={onBook}>Request dates <ArrowRight size={16}/></a></div>
          {next && <div className={s.followOn}><p>{next.prompt}</p><a href={`?programme=${next.to}${referral}#programme-scope`} onClick={event => openBrief(event, next.to, 'continuation')}>{next.link} <ArrowRight size={15}/></a></div>}
        </article>
      </div>
      <div className={s.terms}><p>Fees are indicative and per engagement in EUR. A booking is agreed in a written scope. Your written quote covers preparation, materials, tax, travel and recording rights. Dates are reserved by agreement.</p><button onClick={() => { trackEvent('university_brief_print', { programme: selected.id }); window.print() }}><Printer size={15}/> Print this brief</button></div>
    </details>

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
