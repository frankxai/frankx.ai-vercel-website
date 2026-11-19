import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { campusIdeas, teachingTracks, universityProgrammes, type UniversityProgramme } from '@/content/partnerships/university-programmes'
import { experienceCases } from '@/content/partnerships/proposals/uva-rec-impact'
import s from './university-programmes.module.css'

export function SpeakerPortrait() {
  return <figure className={s.portrait}>
    <Image src="/images/portraits/frank-presenting-oracle-2025.jpg" alt="Frank Riemer presenting AI architecture during his time at Oracle" width={960} height={720} sizes="(max-width: 760px) 100vw, 41vw" priority />
    <figcaption><strong>Frank Riemer</strong><span>Founder, Starlight Intelligence<br/>Amsterdam, Netherlands</span></figcaption>
  </figure>
}

export function TeachingRecord() {
  const entries = [
    { label: 'Student teaching', title: 'MCI · The Entrepreneurial School', body: 'Frank led a student session on applying AI to individual skills and career direction.', link: experienceCases.find(item => item.id === 'students')!.links[0] },
    { label: 'Workshop facilitation', title: 'NLdigital NextGen × Young Oracle Board', body: 'Frank designed and facilitated the AI & Ikigai workshop in Amsterdam. The teaching material is available to inspect.', link: {label: 'Workshop material', url: '/workshops/ikigai-branding'} },
    { label: 'Speaking', title: 'Oracle Amsterdam Hub', body: 'The programme recap names Frank among the speakers on enterprise AI and infrastructure.', link: experienceCases.find(item => item.id === 'partners')!.links[0] },
  ]
  return <div className={s.record}>{entries.map(item => <article key={item.label}><small>{item.label}</small><h3>{item.title}</h3><p>{item.body}</p><a href={item.link.url}>{item.link.label} <ArrowUpRight size={13} aria-hidden="true"/></a></article>)}</div>
}

export function ProgrammeDesk({selected, onSelect, onBook}: {
  selected: UniversityProgramme
  onSelect: (programme: UniversityProgramme) => void
  onBook: () => void
}) {
  return <section id="programmes" className={s.desk} aria-labelledby="programmes-title">
    <div className={s.heading}><p>Programmes &amp; host fees</p><h2 id="programmes-title">Choose the work your room will do.</h2>
      <span>Invite Frank for a lecture, commission a working lab or equip your own faculty to teach the material.</span></div>
    <div className={s.menu}>
      <div className={s.choices} aria-label="Programme formats">{universityProgrammes.map(item =>
        <button type="button" key={item.id} aria-pressed={item.id === selected.id} aria-controls="programme-scope" onClick={() => onSelect(item)}>
          <span>{item.format}</span><strong>{item.fee}</strong></button>
      )}</div>
      <article id="programme-scope" className={s.scope} aria-live="polite">
        <small>{selected.format}</small><h3>{selected.name}</h3><p>{selected.session}</p>
        <dl><dt>For</dt><dd>{selected.audience}</dd><dt>Leaves with the host</dt><dd>{selected.output}</dd><dt>Budget owner</dt><dd>{selected.buyer}</dd><dt>Host prepares</dt><dd>{selected.host}</dd></dl>
        <button type="button" onClick={onBook}>Discuss this programme <ArrowRight size={16} aria-hidden="true"/></button>
      </article>
    </div>
    <p className={s.terms}>Indicative fees in EUR per engagement. Preparation and the listed materials are included. Frank confirms scope, applicable tax, travel, recording rights and any follow-up in a written quote. Dates are reserved by agreement.</p>
    <div className={s.curriculum}><h3>Four questions I teach</h3><div>{teachingTracks.map(([label,title,body,url,link]) =>
      <article key={label}><small>{label}</small><h4>{title}</h4><p>{body}</p><a href={url}>{link} <ArrowUpRight size={13} aria-hidden="true"/></a></article>)}</div></div>
    <aside className={s.sample}><div><small>Inside a Starlight teaching lab</small><h3>Can the assistant prove it finished the job?</h3><p>Students run an offline exercise, withhold a source and inspect the resulting trace. They test who can create a draft, what happens on retry and how rejected attempts change the cost. An advanced group can then design the handover from a Vercel interface to a Cloudflare Worker.</p></div>
      <div><strong>Try the exercise before booking</strong><code>node --test lab.mjs</code><a href="/workshops/ai-operating-systems/lab.mjs" download>Download the runnable lab ↓</a><a href="/workshops/ai-operating-systems/workbook.md" download>Facilitator workbook ↓</a></div></aside>
  </section>
}

export function InternationalHosts() {
  return <div className={s.international}>
    <p className={s.overline}>International hosts</p><h3>One local question. A second campus to test it.</h3>
    <p>A host identifies a course, a local practitioner and the decision students will investigate. I convene the technical mentors and prepare the lab. A second campus can rerun the same brief, then compare what changed with the language, context or tool access.</p>
    <details><summary>Explore eight possible campus briefs</summary><p>Institutes listed below are reference points for prospective collaborations. Each brief is Frank’s proposal. Participation, dates and funding need a host agreement.</p>
      <div className={s.campuses}>{campusIdeas.map(([region,name,brief,href]) => <article key={region}><small>{region}</small><h4><a href={href}>{name} ↗</a></h4><p>{brief}</p></article>)}</div>
    </details>
    <p className={s.terms}>Remote first for international hosts. A local co-facilitator can adapt examples and language. For campus delivery, the organiser confirms the travel budget, accessibility arrangements and a locally available toolset.</p>
  </div>
}
