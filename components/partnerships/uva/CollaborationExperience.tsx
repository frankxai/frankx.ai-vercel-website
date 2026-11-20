'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Code2, FileText, Play, Printer, X } from 'lucide-react'
import { agentContracts, chapters, experienceCases, pilotSteps, proposal, sourceProjects } from '@/content/partnerships/proposals/uva-rec-impact'
import { audiences, challengeBriefs, fellowshipUrl, researchReadings, researchTracks, type AudienceId } from '@/content/partnerships/university-collaboration'
import CollaborationIntake from './CollaborationIntake'
import CampusEdition, { HostBrief } from './CampusEdition'
import { universityProgrammes, type UniversityProgramme } from '@/content/partnerships/university-programmes'
import { trackEvent } from '@/lib/analytics'
import s from './collaboration.module.css'

type Contract = (typeof agentContracts)[number] & { markdown: string }

function Crew({ row, column = 0, name, className = '' }: { row: number; column?: number; name: string; className?: string }) {
  return <span role="img" aria-label={name} className={`${s.crew} ${className}`} style={{ '--crew-x': `${column * 100 / 3}%`, '--crew-y': `${row * 100 / 3}%` } as CSSProperties} />
}

function External({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={`${s.external} ${className}`}>{children}<ArrowUpRight size={15} aria-hidden="true" /><span className={s.srOnly}> (opens in a new tab)</span></a>
}

function Heading({ number, title, children }: { number: string; title: string; children?: ReactNode }) {
  return <header className={s.chapterHeading}><p className={s.eyebrow}>{number} / A conversation about building together</p><h2>{title}</h2>{children && <p className={s.lead}>{children}</p>}</header>
}

export default function CollaborationExperience({ contracts, context = 'proposal', initialProgrammeId, fromSourceCheck = false }: { contracts: Contract[]; context?: 'public' | 'proposal'; initialProgrammeId?: string; fromSourceCheck?: boolean }) {
  const isPublic = context === 'public'
  const initialProgramme = universityProgrammes.find(item => item.id === initialProgrammeId)
  const [programme, setProgramme] = useState<UniversityProgramme>(initialProgramme ?? (isPublic ? universityProgrammes.find(item => item.id === 'lecture')! : universityProgrammes[0]))
  const [bookProgramme, setBookProgramme] = useState(Boolean(initialProgramme) || !isPublic)
  const [challengeChosen, setChallengeChosen] = useState(false)
  function chooseProgramme(item: UniversityProgramme, anchor?: string) {
    setProgramme(item)
    setBookProgramme(true)
    setChallengeChosen(false)
    const url = new URL(window.location.href)
    url.searchParams.set('programme', item.id)
    if (anchor) url.hash = anchor
    window.history.replaceState(window.history.state, '', url)
    trackEvent('university_programme_select', { programme: item.id })
  }
  const [presenting, setPresenting] = useState(false)
  const [active, setActive] = useState(0)
  const [track, setTrack] = useState(0)
  const [challenge, setChallenge] = useState(0)
  const [audience, setAudience] = useState<AudienceId>('academic')
  const [agent, setAgent] = useState(0)
  const [experience, setExperience] = useState(0)
  const [fullscreenNote, setFullscreenNote] = useState('')
  const dialog = useRef<HTMLDialogElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const launch = useRef<HTMLButtonElement>(null)
  const previousOverflow = useRef('')
  const ownsFullscreen = useRef(false)
  const focusStage = useCallback(() => { stage.current?.scrollTo({ top: 0 }); stage.current?.focus() }, [])
  const move = useCallback((index: number) => { setActive(Math.max(0, Math.min(chapters.length - 1, index))); focusStage() }, [focusStage])

  const closePresentation = useCallback(() => {
    if (ownsFullscreen.current && document.fullscreenElement) void document.exitFullscreen().catch(() => {})
    ownsFullscreen.current = false
    dialog.current?.close()
    setPresenting(false)
    document.body.style.overflow = previousOverflow.current
    launch.current?.focus()
  }, [])

  function startPresentation() {
    previousOverflow.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setActive(0)
    setFullscreenNote('')
    dialog.current?.showModal()
    setPresenting(true)
    focusStage()
    // Fullscreen is progressive enhancement; the modal remains usable on iOS and when denied.
    if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
      void document.documentElement.requestFullscreen().then(() => {
        ownsFullscreen.current = Boolean(document.fullscreenElement)
        if (!ownsFullscreen.current) setFullscreenNote('Presentation fills this window. Browser fullscreen is unavailable.')
      }).catch(() => setFullscreenNote('Presentation fills this window. Browser fullscreen is unavailable.'))
    } else setFullscreenNote('Presentation fills this window. Browser fullscreen is unavailable.')
  }

  useEffect(() => {
    if (!presenting) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') { event.preventDefault(); closePresentation(); return }
      const target = event.target as HTMLElement
      // Preserve native keyboard behavior inside the map, contract disclosures and controls.
      if (target.closest('button, a, summary, input, textarea, select, pre')) return
      if (['ArrowRight', 'PageDown'].includes(event.key)) { event.preventDefault(); move(active + 1) }
      if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); move(active - 1) }
      if (event.key === 'Home') { event.preventDefault(); move(0) }
      if (event.key === 'End') { event.preventDefault(); move(chapters.length - 1) }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [presenting, active, closePresentation, move])

  useEffect(() => {
    const element = dialog.current
    return () => { if (element?.open) document.body.style.overflow = previousOverflow.current }
  }, [])

  const selectedExperience = experienceCases[experience]
  const selected = researchTracks[track]
  const selectedChallenge = challengeBriefs[challenge]
  const selectedAgent = contracts[agent]

  function joinAs(role: AudienceId, booking = false) {
    setBookProgramme(booking)
    setAudience(role)
    if (presenting) closePresentation()
    requestAnimationFrame(() => { const target = document.getElementById('join'); target?.scrollIntoView({ block: 'start' }); target?.focus({ preventScroll: true }) })
  }

  function chapter(index: number, mode: 'page' | 'stage') {
    const prefix = `${mode}-${chapters[index].id}`
    switch (index) {
      case 0: return <>
        <div className={s.heroGrid}>
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>Starlight Intelligence / University collaborations</p>
            {mode === 'page' ? <h1>What becomes possible when we build <em>together?</em></h1> : <h2 className={s.heroTitle}>What becomes possible when we build <em>together?</em></h2>}
            <p className={s.subtitle}>{proposal.subtitle}</p>
            <p className={s.opening}>A place to connect hands-on AI engineering with research, teaching and the next generation of founders.</p>
            {mode === 'page' && <div className={s.heroActions}><button ref={launch} className={s.primary} onClick={startPresentation}><Play size={17} aria-hidden="true" />Start guided presentation</button><a className={s.textLink} href="#conversation">Find your way in <ArrowDown size={16} aria-hidden="true" /></a></div>}
          </div>
          <figure className={s.heroVisual}>
            <div className={s.visualTop}><span className={s.dot} />People, questions, working systems<span>01—06</span></div>
            <div className={s.founderArt}><Crew row={0} column={2} name="Mini Frank, from the original crew sheet" /><div><span className={s.eyebrow}>Your host</span><strong>Frank Riemer</strong><span>Founder · AI Architect · Amsterdam</span></div></div>
            <div className={s.crewLine}>{['Nilo', 'Brio', 'Riff'].map((name, i) => <div key={name}><Crew row={i + 1} column={i === 1 ? 2 : 0} name={name} /><span>{name}</span></div>)}</div>
            <figcaption>Meet the crew. Inspect the work.<br />Human judgment stays at the centre.</figcaption>
          </figure>
        </div>
        <div className={s.opportunityLine}><span>The shared opportunity</span><p>Give a promising idea a place to be built, questioned and improved by people who see it differently.</p></div>
      </>
      case 1: return <>
        <Heading number="02" title="From enterprise AI adoption to building the next generation of AI founders.">Experience to build on. A new direction to shape together.</Heading>
        <div className={s.founderGrid}>
          <div className={s.story}><p>I’m Frank Riemer, an Amsterdam-based founder and former AI Architect in Oracle’s EMEA AI Center of Excellence. My work has connected enterprise AI, technology partners, student sessions and practical workshops.</p><p>Now I’m building Starlight Intelligence. I want to bring the questions that matter in enterprise adoption into the earliest stages of a founder’s work: what is useful, what can be trusted, and what will it take for someone else to use it?</p><p>A university brings different strengths: research depth, critical inquiry and people approaching the same problem from different disciplines. I’d like to explore what we could build at that intersection.</p><span className={s.caption}>Former Oracle role. This independent proposal carries no employer, client or institutional endorsement.</span></div>
          <div className={s.workIndex}>
            <a href="https://starlightintelligence.ai" target="_blank" rel="noopener noreferrer"><span>01 / Build</span><h3>Starlight Intelligence <ArrowUpRight size={20} /></h3><p>Shared memory, agent contracts and reference tools. Inspect the public source in the next chapter.</p></a>
            <a href="https://www.frankx.ai" target="_blank" rel="noopener noreferrer"><span>02 / Explain</span><h3>FrankX <ArrowUpRight size={20} /></h3><p>The founder’s public home for writing, teaching and showing the work.</p></a>
            <a href="https://agenticincome.ai" target="_blank" rel="noopener noreferrer"><span>03 / Explore commercial use</span><h3>Agentic Income <ArrowUpRight size={20} /></h3><p>A separate venture exploring how useful AI services become businesses. No earnings or adoption claims are made here.</p></a>
          </div>
        </div>
        <div className={s.experienceIntro}><p className={s.eyebrow}>Selected experience / inspect the record</p><h3>Experience across enterprise, education and the AI ecosystem.</h3><p>Different settings, different responsibilities. Choose a moment to see the work, its source and what it could contribute here.</p></div>
        <div className={s.experienceLayout}>
          <nav className={s.experienceTimeline} aria-label="Experience timeline">{experienceCases.map((item, i) => <button key={item.id} aria-pressed={experience === i} aria-controls={`${prefix}-experience`} className={experience === i ? s.experienceSelected : ''} onClick={() => setExperience(i)}><span className={s.experiencePoint} /><span><small>{item.period}</small><strong>{item.title}</strong></span><ArrowUpRight size={15} aria-hidden="true" /></button>)}</nav>
          <article id={`${prefix}-experience`} className={s.experienceCase} aria-live="polite"><div className={s.caseMeta}><span className={s.verified}>{selectedExperience.role}</span><span>{String(experience + 1).padStart(2, '0')} / 07</span></div><p className={s.eyebrow}>{selectedExperience.setting}</p><h4>{selectedExperience.title}</h4><p>{selectedExperience.text}</p><div className={s.caseTransfer}><span className={s.eyebrow}>What I would bring to a university</span><p>{selectedExperience.transfer}</p></div><p className={s.caption}>{selectedExperience.proof}</p><div className={s.linkRow}>{selectedExperience.links.map(link => <External key={link.url} href={link.url}>{link.label}</External>)}</div><p className={s.boundary}>{selectedExperience.boundary}</p></article>
        </div>
        <div className={s.statusStrip}><div><span className={s.verified}>Working in this page</span><p>Chapter navigation, source inspection and a printable brief.</p></div><div><span className={s.prototype}>Source & prototypes</span><p>Agent profiles and reference systems; runtime rehearsal pending.</p></div><div><span className={s.ambition}>Research ambition</span><p>Better learning, reproducible agent evaluations and measurable public benefit.</p></div></div>
      </>
      case 2: return <>
        <Heading number="03" title="Open the files. Ask difficult questions.">Start with the contracts, then decide which behavior is worth testing.</Heading>
        <div className={s.evidenceNote}><FileText size={19} aria-hidden="true" /><div><strong>{proposal.evidence.label}</strong><p>{proposal.evidence.detail}</p>{proposal.evidence.reportUrl && <External href={proposal.evidence.reportUrl}>Canonical evidence report</External>}</div></div>
        <div className={s.sourceGrid}>{sourceProjects.map(project => <article key={project.name} className={s.sourceCard}><span className={s.verified}>{project.status}</span><p className={s.eyebrow}>{project.category}</p><h3>{project.name}</h3><p>{project.description}</p><p className={s.inspectPrompt}>{project.inspect}</p><div className={s.linkRow}><External href={project.url}>GitHub</External><External href={project.artifact}>Pinned source</External></div><p className={s.caption}><a href={project.licenseUrl} target="_blank" rel="noopener noreferrer">{project.license}</a></p><p className={s.caption}>{project.limit}</p></article>)}</div>
        <div className={s.demoStrip}><div><span className={s.prototype}>Recorded demonstration</span><h3>Follow a saved mission</h3><p>Inspect files, artifacts and provenance. This is a replay: its approval pause is staged and diagnostics were not run.</p><External href="https://starlightintelligence.ai/missions?example=recorded">Explore the recorded mission</External></div><div><span className={s.verified}>Read-only interface checked</span><h3>Inspect the department catalog</h3><p>The audit received a live response. Packages remain release candidates or research previews; this does not run or install agents.</p><External href="https://starlightintelligence.ai/api/v1/departments">View the public JSON catalog</External><span className={s.caption}>Checked 17 November 2026. Rehearse before presenting.</span></div></div>
        <div className={s.agentIntro}><div><p className={s.eyebrow}>Agent-team explorer</p><h3>What does an agent agree to do?</h3></div><p>The crew are visual guides. These are actual agent profiles, not a claim that the characters operate the systems.</p></div>
        <div className={s.agentExplorer}>
          <div className={s.agentChoices} aria-label="Choose an agent contract">{contracts.map((item, i) => <button key={item.id} aria-pressed={agent === i} aria-controls={`${prefix}-contract`} className={agent === i ? s.agentSelected : ''} onClick={() => setAgent(i)}><Crew row={item.row} column={item.column} name={`${item.host}, visual guide`} /><span><strong>{item.name}</strong><small>Inspect Markdown <ArrowRight size={13} aria-hidden="true" /></small></span></button>)}</div>
          <div className={s.agentDetail} id={`${prefix}-contract`}><span className={s.eyebrow}>Source profile / {selectedAgent.host} guides this view</span><h4>{selectedAgent.name}</h4><p>{selectedAgent.purpose}</p><p className={s.caption}>{selectedAgent.limit}</p><External href={selectedAgent.source}>View original contract on GitHub</External><details key={`${mode}-${selectedAgent.id}`} className={s.contract}><summary><Code2 size={16} aria-hidden="true" />Read the complete Markdown contract</summary><pre tabIndex={0} aria-label={`${selectedAgent.name} Markdown contract`}><code>{selectedAgent.markdown}</code></pre></details></div>
        </div>
      </>
      case 3: return <>
        <Heading number="04" title="The solo company is a research question.">What becomes possible when one person can work with professional AI assistants? Start with hypotheses that could be wrong.</Heading>
        <div className={s.researchTabs} aria-label="Choose a research question">{researchTracks.map((item, i) => <button key={item.id} aria-pressed={track === i} aria-controls={`${prefix}-research`} onClick={() => setTrack(i)}>{item.label}</button>)}</div>
        <div id={`${prefix}-research`} className={s.researchPanel}>
          <div className={s.researchQuestion}><span className={s.prototype}>Proposed study / no findings yet</span><h3>{selected.title}</h3><p>{selected.question}</p><div className={s.hypothesis}><span className={s.eyebrow}>Working hypothesis</span><p>{selected.hypothesis}</p></div></div>
          <figure className={s.studyDiagram} aria-label="Study design: compare three conditions using a common evaluation"><figcaption>Different conditions. A common standard.</figcaption><div className={s.conditionGrid}>{selected.conditions.map((condition, i) => <div key={condition}><span className={s.conditionMark}>{String.fromCharCode(65 + i)}</span><strong>{condition}</strong></div>)}</div><div className={s.studyConnector} aria-hidden="true" /><div className={s.studyRubric}><span className={s.eyebrow}>Evaluate the accepted work</span><div>{selected.measures.map(measure => <span key={measure}><Check size={14} aria-hidden="true" />{measure}</span>)}</div></div><p className={s.caption}>Conceptual study design. No measured results are shown.</p></figure>
          <div className={s.protocolRow}><div><span className={s.eyebrow}>Comparison</span><p>{selected.compare}</p></div><div><span className={s.eyebrow}>Contribution</span><p>{selected.output}</p></div></div><p className={s.boundary}>{selected.limit}</p>
        </div>
        <details className={s.readings}><summary>Research foundations &amp; how we would test this</summary><div className={s.readingGrid}>{researchReadings.map(item => <article key={item.href}><span className={s.eyebrow}>{item.citation}</span><h4><External href={item.href}>{item.title}</External></h4><p>{item.detail}</p></article>)}</div><p className={s.boundary}>These studies inform the questions; they do not validate Starlight. Agree the protocol, primary outcome, sample size and analysis with an academic lead before recruiting. Separate exploratory observations from confirmatory tests, report uncertainty and negative results, and agree consent, retention and publication rights.</p></details>
      </>
      case 4: return <>
        <Heading number="05" title="A real question. A small build. An honest review.">Start with a guest lecture, shape a dedicated challenge, then decide whether a longer research collaboration is warranted.</Heading>
        <div className={s.formatStrip}><div><span>01 / Introduce</span><strong>Guest lecture</strong><p>A proposed 45–60 minute session: live source inspection, a worked example and critical discussion.</p></div><div><span>02 / Apply</span><strong>Student challenge</strong><p>A bounded brief, facilitation, a prototype and review by another team.</p></div><div><span>03 / Investigate</span><strong>Research collaboration</strong><p>A jointly designed protocol, named supervision and an agreement before data collection.</p></div></div>
        <div className={s.challengeIntro}><p className={s.eyebrow}>Choose a starting brief</p><span className={s.prototype}>Proposed · not open for enrolment</span></div>
        <div className={s.challengeChoices} aria-label="Choose a challenge">{challengeBriefs.map((item, i) => <button key={item.id} aria-pressed={challenge === i} aria-controls={`${prefix}-challenge`} onClick={() => { setChallenge(i); setChallengeChosen(true) }}><span>0{i + 1}</span><strong>{item.title}</strong><ArrowUpRight size={18} aria-hidden="true" /></button>)}</div>
        <article id={`${prefix}-challenge`} className={s.challengeDetail}><div><span className={s.eyebrow}>{selectedChallenge.discipline}</span><h3>{selectedChallenge.title}</h3><p>{selectedChallenge.task}</p></div><dl><dt>Leave behind</dt><dd>{selectedChallenge.deliverable}</dd><dt>Data boundary</dt><dd>{selectedChallenge.data}</dd><dt>The review question</dt><dd>{selectedChallenge.review}</dd></dl></article>
        <div className={s.pilotHeader}><span className={s.prototype}>Illustrative two-week pilot</span><p>Two to four small teams · one workshop · one review<br />Dates, resources and participation to be agreed.</p></div>
        <div className={s.timeline}>{pilotSteps.map((step, i) => <article key={step.period}><span className={s.stepNumber}>0{i + 1}</span><div><span className={s.eyebrow}>{step.period}</span><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div>
        <div className={s.pilotBottom}><div><h3>Frank prepares and facilitates.</h3><p>A clear brief, an inspectable technical example, office-hour support within the agreed scope and a reusable teaching note.</p></div><div><h3>The academic lead shapes the learning.</h3><p>Institutional fit, supervision, assessment and any research ethics review. Students retain their own intellectual property subject to applicable institutional rules; no Starlight purchase or IP assignment is required.</p><p className={s.caption}>Agree staffing, accessibility, consent, data rights, compute limits and costs before starting. Infrastructure, delivery, sponsorship and follow-up remain separate decisions.</p></div></div>
      </>
      case 5: return <>
        <Heading number="06" title="There is more than one way to build together.">Bring a research question, a course, a technical challenge or a problem that deserves better tools.</Heading>
        <div className={s.audienceGrid}>{audiences.map(item => <article key={item.id}><p className={s.eyebrow}>{item.label}</p><h3>{item.title}</h3><p>{item.offer}</p><button className={s.textLink} onClick={() => joinAs(item.id)}>Explore this together <ArrowRight size={16} aria-hidden="true" /><span className={s.srOnly}> as {item.label.toLowerCase()}</span></button></article>)}</div>
        <aside className={s.fellowship}><div><span className={s.prototype}>REC Impact Fellowship / proposed route</span><h3>A home for sustained collaboration.</h3><p>REC Impact’s fellowship connects professionals with university talent and expertise, experiments and joint student projects. I’m exploring how my engineering and founder practice could contribute through this route.</p><External href={fellowshipUrl}>Read the official fellowship programme</External>{context === 'proposal' && <p className={s.caption}>Following the conversation with Erik Boer on 17 November: shape the research focus, potential student work and a written scope. This is Frank’s account of the conversation. Institutional commitments remain to be agreed.</p>}</div><div className={s.agreement}><span className={s.eyebrow}>An agreement to shape</span><ol><li><strong>Purpose &amp; people</strong><span>Research question, academic contact, supervision and responsibilities.</span></li><li><strong>Work &amp; resources</strong><span>Deliverables, time commitment, access, compute and funding.</span></li><li><strong>Rights &amp; review</strong><span>IP, data, publication, consent, attribution and a decision to continue.</span></li></ol><p className={s.boundary}>Fellowship participation and a collaboration agreement are not confirmed. No UvA appointment, endorsement or funding is claimed.</p></div></aside>
        {mode === 'page' && !isPublic && <CollaborationIntake audience={audience} onAudienceChange={setAudience} challenge={selectedChallenge.title} />}
        <div className={s.continueLinks}><a href="/research">Explore Frank’s research <ArrowUpRight size={15} aria-hidden="true" /></a><a href="/agentic-builder-lab">Visit the Agentic Builder Lab <ArrowUpRight size={15} aria-hidden="true" /></a><a href="/partnerships">Technology partnerships <ArrowUpRight size={15} aria-hidden="true" /></a></div>
      </>
    }
  }

  return <main className={s.root} data-uva-proposal="true">
    {isPublic ? <div className={s.explore}>
      <CampusEdition selected={programme} onSelect={chooseProgramme} guideInitiallyOpen={Boolean(initialProgramme)} fromSourceCheck={fromSourceCheck}
        onBook={() => { trackEvent('university_dates_request', { programme: programme.id }); setChallengeChosen(false); joinAs(audience, true) }}
        intake={<CollaborationIntake publicBooking fromSourceCheck={fromSourceCheck} audience={audience} onAudienceChange={setAudience}
          challenge={challengeChosen ? selectedChallenge.title : ''} programme={bookProgramme ? programme : undefined}
          onProgrammeChange={item => { if (item) chooseProgramme(item); else setBookProgramme(false) }} />}
        presentation={<button ref={launch} onClick={startPresentation}><Play size={16} aria-hidden="true"/> Start guided presentation</button>}
        research={chapters.slice(1).map((item, i) => <section key={item.id} id={item.id} className={s.section} aria-label={item.label}>{chapter(i + 1, 'page')}</section>)}
      />
    </div> : <>
    <div className={s.topbar}><a href="/partnerships" className={s.wordmark}>FrankX<span> / Starlight Intelligence</span></a><span className={s.edition}>Research, learning & entrepreneurship</span><button className={s.iconButton} aria-label="Print one-page summary" onClick={() => window.print()}><Printer size={18} /></button></div>
    <div className={s.disclosure}><span className={s.dot} /><p>Independent founder-authored proposal. Not an official UvA partnership.</p><span>Unlisted discussion draft</span></div>
    <div className={s.explore}>
      <section id="opportunity" className={`${s.section} ${s.hero}`}>{chapter(0, 'page')}</section>
      <nav className={s.chapterNav} aria-label="Presentation chapters">{chapters.map((item, i) => <a key={item.id} href={`#${item.id}`}><span>0{i + 1}</span>{item.short}</a>)}</nav>
      {chapters.slice(1).map((item, i) => <section key={item.id} id={item.id} className={s.section} aria-label={item.label}>{chapter(i + 1, 'page')}</section>)}
      <footer className={s.footer}><div><strong>A conversation proposed by Frank Riemer.</strong><p>UvA and Founder Space are named as the context for discussion. Neither has approved or endorsed this proposal. No institutional logos are used.</p></div><div><a href="/partnerships/universities">Public collaboration invitation <ArrowUpRight size={14} aria-hidden="true" /></a><External href="https://www.uva.nl/en">University of Amsterdam</External><a href="/partnerships">FrankX partnership context <ArrowUpRight size={14} aria-hidden="true" /></a><span>Source review: {proposal.date} · Runtime rehearsal pending</span></div></footer>
    </div>
    </>}
    <dialog ref={dialog} className={s.presentation} aria-label="Guided collaboration presentation" onCancel={event => { event.preventDefault(); closePresentation() }} onClose={() => { document.body.style.overflow = previousOverflow.current; setPresenting(false) }}>
      <div className={s.presentationBar}><span className={s.wordmark}>FrankX <span>/ A university conversation</span></span><span className={s.presentationStatus}>Independent proposal · no institutional endorsement</span><button className={s.iconButton} onClick={closePresentation} aria-label="Exit presentation"><X size={21} /></button></div>
      <div ref={stage} tabIndex={-1} className={s.stage} aria-label={`Chapter ${active + 1}: ${chapters[active].label}`}>{presenting && chapter(active, 'stage')}</div>
      <div className={s.presentationControls}><button className={s.secondary} disabled={active === 0} onClick={() => move(active - 1)} aria-label="Previous chapter"><ArrowLeft size={17} /> <span>Previous</span></button><div><p aria-live="polite" aria-atomic="true">{active + 1} / 6 <span>{chapters[active].short}</span></p><div className={s.dots}>{chapters.map((item, i) => <button key={item.id} aria-label={`Go to chapter ${i + 1}: ${item.label}`} aria-current={active === i ? 'step' : undefined} onClick={() => move(i)} />)}</div></div>{active === 5 ? <button className={s.primary} onClick={closePresentation}>Finish <Check size={17} /></button> : <button className={s.primary} onClick={() => move(active + 1)} aria-label="Next chapter"><span>Next</span> <ArrowRight size={17} /></button>}</div>
      <p className={s.keyboardHint}>{fullscreenNote || '← → to navigate · Home / End to jump · Esc to exit'}</p>
    </dialog>
    <article className={s.printBrief} aria-label={isPublic ? 'Printable university host brief' : 'Printable one-page collaboration summary'}>{isPublic ? <HostBrief selected={programme}/> : <><header><span>Frank Riemer / Starlight Intelligence</span><span>{proposal.date}</span></header><h1>What becomes possible<br />when we build together?</h1><p className={s.printDeck}>{proposal.subtitle}</p><p><strong>Independent founder-authored discussion draft. Not an official UvA partnership.</strong></p><div className={s.printColumns}><section><h2>The opportunity</h2><p>Connect university talent with inspectable tools and a practical setting to build, question and improve a useful idea.</p><h2>What Frank brings</h2><p>Former Oracle EMEA AI CoE architect, with publicly documented student teaching, NLdigital workshop delivery and technology partner programme contributions. Now building independent Starlight systems with inspectable source. No employer or institutional endorsement implied.</p><h2>The research question</h2><p>When can professional AI assistants help a solo founder build a better digital product? Compare accepted quality, human effort, rework, compute cost and retained understanding. Proposed studies; no findings claimed.</p></section><section><h2>A bounded pilot, proposed</h2><p>Two weeks. Two to four small teams. A 90-minute workshop and a 60-minute review. Leave an inspectable prototype, evaluation and reusable teaching note.</p><h2>Agree before starting</h2><p>University contact, supervision, participants, dates, IP, consent and compute ceiling. Public or synthetic data only. No funding, institutional approval or academic credit assumed.</p><h2>Join the conversation</h2><p>Students, academic leads, technology providers, founders and impact partners: bring a question, your context and a useful next step. REC Impact Fellowship participation is under exploration; no appointment or agreement is confirmed.</p></section></div><h2>Inspect the source</h2><p className={s.printSources}>github.com/Starlight-Intelligence/Starlight-Intelligence-System<br />github.com/frankxai/agentic-creator-os</p><p><strong>Evidence status:</strong> source and interface audit reviewed; runtime rehearsal pending. No adoption, performance or impact claims.</p><footer>UvA and Founder Space have not approved or endorsed this proposal. Original crew supplied by Frank. frankx.ai/partnerships/universities · frank@frankx.ai</footer></>}</article>
  </main>
}
