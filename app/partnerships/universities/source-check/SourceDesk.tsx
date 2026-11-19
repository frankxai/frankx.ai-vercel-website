'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDownToLine, ArrowRight, Check, FileText, FolderOpen } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { universityProgrammes } from '@/content/partnerships/university-programmes'
import { claim, decisions, evidence, rounds, samplePath, type Decision } from './case'
import s from './sample.module.css'

export default function SourceDesk() {
  const [step, setStep] = useState<0 | 1>(0)
  const [answers, setAnswers] = useState<Decision[]>([])
  const roundTitle = useRef<HTMLHeadingElement>(null)
  const feedback = useRef<HTMLDivElement>(null)
  const round = rounds[step]
  const choice = answers[step]
  const complete = answers.length === 2

  useEffect(() => {
    if (choice) feedback.current?.focus()
    else if (step === 1) roundTitle.current?.focus()
  }, [choice, step])

  function respond(decision: Decision) {
    if (choice) return
    setAnswers(previous => [...previous, decision])
    trackEvent(step === 0 ? 'university_case_start' : 'university_case_complete', { case_id: 'source-check' })
  }

  const trace = {
    case_id: 'source-check', version: 1, fixture: 'fictional-campus-pilot', claim,
    runs: answers.map((decision, index) => ({
      run: index + 1, available_sources: rounds[index].sources, reviewer_decision: decision,
      reference_decision: rounds[index].expected, cited_sources: rounds[index].citations, supported_wording: rounds[index].finding,
    })),
  }
  const hostProgrammes = universityProgrammes.filter(item => item.id === 'lecture' || item.id === 'workshop')

  return <>
    <section id="source-desk" className={s.desk}>
      <div className={s.inner}>
        <div className={s.overline}><span>Evidence desk</span><span>Fictional campus pilot</span></div>
        <div className={s.workgrid}>
          <article className={s.memo}><p className={s.document}><FileText size={17}/> Decision memo · extract</p>
            <blockquote>“{claim}”</blockquote><p className={s.note}>Prepared for the campus programme director. Your signature clears the finding for circulation.</p>
          </article>
          <div className={s.packet}><h2><FolderOpen size={19}/> Source packet</h2>
            <ul>{evidence.map(record => {
              const available = round.sources.includes(record.id)
              return <li className={available ? '' : s.missing} key={record.id}>
                <span className={s.fileId}>{record.id}</span><div><small>{record.file}</small>
                <strong>{available ? record.value + ' ' + record.label : 'Source removed'}</strong>
                <p>{available ? record.note : 'This record is unavailable in the replay.'}</p></div></li>
            })}</ul>
          </div>
        </div>
        <div className={s.review}><div>
          <p className={s.run}>Review {step + 1} of 2</p><h2 ref={roundTitle} tabIndex={-1}>{round.title}</h2><p>{round.instruction}</p>
        </div><div className={s.judgment} aria-label="Choose your editorial decision">
          {decisions.map(decision => <button type="button" key={decision.id} disabled={Boolean(choice)} data-picked={choice === decision.id}
            onClick={() => respond(decision.id)}>{decision.label}{choice === decision.id ? <Check size={16} aria-hidden="true"/> : <ArrowRight size={16} aria-hidden="true"/>}</button>)}
        </div></div>
        {choice && <div tabIndex={-1} ref={feedback} className={s.feedback}>
          <p className={s.run}>{choice === round.expected ? 'Your decision matches the evidence' : 'Compare your decision with the evidence'}</p>
          <h3>{round.finding}</h3><p>{round.reason}</p><p className={s.key}>Reference decision · {decisions.find(decision => decision.id === round.expected)?.label}</p>
          {step === 0 ? <>
            <figure className={s.distribution}><div aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} data-group={i < 9 ? 'yes' : i < 12 ? 'no' : 'unknown'}/>)}</div>
              <figcaption>18 attendees <span>9 yes · 3 no · 6 unknown</span></figcaption></figure>
            <button type="button" className={s.primary} onClick={() => setStep(1)}>Remove the exit slips and replay <ArrowRight size={16}/></button></> :
            <div className={s.resultLinks}><a className={s.primary} href={'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(trace, null, 2))} download="source-check-review.json">Save your review trace <ArrowDownToLine size={16}/></a>
              <button className={s.textLink} type="button" onClick={() => { setAnswers([]); setStep(0); roundTitle.current?.focus() }}>Start again</button></div>}
        </div>}
      </div>
    </section>
    <section className={s.faculty} id="faculty-kit"><div className={s.inner}>
      <div className={s.overline}><span>For the lecturer</span><span>Classroom edition</span></div>
      <div className={s.facultyGrid}><div><h2>Put the memo<br/><em>on the projector.</em></h2><p>Show the three records and ask for a vote. Then take the exit slips away. Who changes their verdict, and what sentence would they sign now?</p>
        <a className={s.darkButton} href={samplePath + '/teaching-kit'} download onClick={() => trackEvent('university_case_kit_download', { case_id: 'source-check' })}>Download the teaching kit <ArrowDownToLine size={16}/></a>
        <small>Markdown · source packet, timings, answer key and four-point rubric</small></div>
        <aside><p className={s.run}>Engineering note</p><h3>One input changes.<br/>The verdict should follow.</h3><p>The two runs keep the memo fixed and vary the available source IDs. This browser exercise uses a fixed answer key. Give a live assistant the same two cases and compare its citations and decision with the reference.</p>
          <div className={s.techLinks}><a className={s.inkLink} href={samplePath + '/eval-fixtures'} download>Download evaluation fixtures (.json) <ArrowDownToLine size={15}/></a><a className={s.inkLink} href="/guides/ai-operating-systems-workshop">Read the engineering curriculum <ArrowRight size={15}/></a></div></aside>
      </div>
    </div></section>
    <section className={s.host}><div className={s.inner}><p className={s.kicker}>Bring Frank to your course</p>
      <h2>What decision should <em>your students</em> be able to defend?</h2>
      <p>Send a syllabus and one decision from the field. I’ll adapt the case to your course and give the next reviewer a way to check the work.</p>
      <div className={s.programmes}>{hostProgrammes.map(item => <a key={item.id} href={'/partnerships/universities?programme=' + item.id + '&via=source-check#programmes'}
        onClick={() => trackEvent('university_case_host_click', { programme: item.id, case_id: 'source-check', completed: complete })}>
        <span>{item.format}</span><strong>{item.name}</strong><p>{item.output}</p><b>{item.fee} <ArrowRight size={17}/></b></a>)}</div>
      <a className={s.textLink} href="/partnerships/universities#your-host">See Frank’s teaching record <ArrowRight size={15}/></a>
    </div></section>
  </>
}
