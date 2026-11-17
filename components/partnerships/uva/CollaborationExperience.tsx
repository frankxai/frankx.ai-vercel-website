'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Code2, Compass, FileText, Play, Printer, X } from 'lucide-react'
import { agentContracts, chapters, collaborationAreas, pilotSteps, proposal, sourceProjects } from '@/content/partnerships/proposals/uva-rec-impact'
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

export default function CollaborationExperience({ contracts }: { contracts: Contract[] }) {
  const [presenting, setPresenting] = useState(false)
  const [active, setActive] = useState(0)
  const [area, setArea] = useState(0)
  const [agent, setAgent] = useState(0)
  const [fullscreenNote, setFullscreenNote] = useState('')
  const dialog = useRef<HTMLDialogElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const launch = useRef<HTMLButtonElement>(null)
  const previousOverflow = useRef('')
  const focusStage = useCallback(() => { stage.current?.scrollTo({ top: 0 }); stage.current?.focus() }, [])
  const move = useCallback((index: number) => { setActive(Math.max(0, Math.min(chapters.length - 1, index))); focusStage() }, [focusStage])

  const closePresentation = useCallback(() => {
    if (document.fullscreenElement === dialog.current) void document.exitFullscreen().catch(() => {})
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
    if (dialog.current?.requestFullscreen) {
      void dialog.current.requestFullscreen().catch(() => setFullscreenNote('Presentation fills this window. Browser fullscreen is unavailable.'))
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

  const selected = collaborationAreas[area]
  const selectedAgent = contracts[agent]

  function chapter(index: number, mode: 'page' | 'stage') {
    const prefix = `${mode}-${chapters[index].id}`
    switch (index) {
      case 0: return <>
        <div className={s.heroGrid}>
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>Starlight Intelligence / A proposal for UvA</p>
            {mode === 'page' ? <h1>What becomes possible when we build <em>together?</em></h1> : <h2 className={s.heroTitle}>What becomes possible when we build <em>together?</em></h2>}
            <p className={s.subtitle}>{proposal.subtitle}</p>
            <p className={s.opening}>I’d like to explore this with you, Erik: where could the systems I’m building become useful to students, researchers and founders?</p>
            {mode === 'page' && <div className={s.heroActions}><button ref={launch} className={s.primary} onClick={startPresentation}><Play size={17} aria-hidden="true" />Start guided presentation</button><a className={s.textLink} href="#founder">Explore at your own pace <ArrowDown size={16} aria-hidden="true" /></a></div>}
          </div>
          <figure className={s.heroVisual}>
            <div className={s.visualTop}><span className={s.dot} />A working conversation<span>01—06</span></div>
            <div className={s.founderArt}><Crew row={0} column={2} name="Mini Frank, from the original crew sheet" /><div><span className={s.eyebrow}>Your host</span><strong>Frank Riemer</strong><span>Founder · AI Architect · Amsterdam</span></div></div>
            <div className={s.crewLine}>{['Nilo', 'Brio', 'Riff'].map((name, i) => <div key={name}><Crew row={i + 1} column={i === 1 ? 2 : 0} name={name} /><span>{name}</span></div>)}</div>
            <figcaption>Original crew. Real source files.<br />A little personality for a serious question.</figcaption>
          </figure>
        </div>
        <div className={s.opportunityLine}><span>The shared opportunity</span><p>Give a promising idea a place to be built, questioned and improved by people who see it differently.</p></div>
      </>
      case 1: return <>
        <Heading number="02" title="From cloud conversations to systems you can inspect.">A founder’s practice, open to a university’s questions.</Heading>
        <div className={s.founderGrid}>
          <div className={s.story}><p>I’m Frank Riemer, an AI Architect and founder based in Amsterdam. My background includes work at Oracle Cloud. Today I’m building Starlight Intelligence and sharing the methods, source files and design decisions through FrankX.</p><p>The question behind the work is practical: how can people keep control of the tools they build with, understand their limits, and leave something another person can use?</p><p>That is what I would bring into a collaboration: examples to take apart, engineering judgment, and time alongside people building their own ideas.</p><External href="https://www.frankx.ai/about">Read Frank’s background</External><span className={s.caption}>Founder-authored account. Former Oracle role; no current Oracle endorsement implied.</span></div>
          <div className={s.workIndex}>
            <a href="https://starlightintelligence.ai" target="_blank" rel="noopener noreferrer"><span>01 / Build</span><h3>Starlight Intelligence <ArrowUpRight size={20} /></h3><p>Shared memory, agent contracts and reference tools. Inspect the public source in the next chapter.</p></a>
            <a href="https://www.frankx.ai" target="_blank" rel="noopener noreferrer"><span>02 / Explain</span><h3>FrankX <ArrowUpRight size={20} /></h3><p>The founder’s public home for writing, teaching and showing the work.</p></a>
            <a href="https://agenticincome.ai" target="_blank" rel="noopener noreferrer"><span>03 / Explore commercial use</span><h3>Agentic Income <ArrowUpRight size={20} /></h3><p>A separate venture exploring how useful AI services become businesses. No earnings or adoption claims are made here.</p></a>
          </div>
        </div>
        <div className={s.statusStrip}><div><span className={s.verified}>Working in this page</span><p>Chapter navigation, source inspection and a printable brief.</p></div><div><span className={s.prototype}>Prototype / source review</span><p>Agent profiles and reference systems; runtime rehearsal pending.</p></div><div><span className={s.ambition}>Research ambition</span><p>Better learning, reproducible agent evaluations and measurable public benefit.</p></div></div>
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
        <Heading number="04" title="Different starting points. A shared way to work.">These are invitations to explore. The right question should come from the people doing the work.</Heading>
        <div className={s.mapLayout}>
          <div className={s.map} aria-label="Explore possible collaboration areas"><span className={s.mapCaption}><Compass size={17} aria-hidden="true" />Choose a starting point</span><div className={s.mapCenter}><span>One useful</span><strong>question.</strong></div>{collaborationAreas.map((item, i) => <button key={item.id} className={`${s.mapNode} ${s[`node${i}`]} ${area === i ? s.mapSelected : ''}`} aria-pressed={area === i} aria-controls={`${prefix}-area`} onClick={() => setArea(i)}><span>0{i + 1}</span><strong>{item.title}</strong><ArrowUpRight size={16} aria-hidden="true" /></button>)}</div>
          <div id={`${prefix}-area`} className={s.areaDetail}><p className={s.eyebrow}>Possibility / {selected.title}</p><h3>{selected.question}</h3><p>{selected.idea}</p><dl><dt>Something to leave behind</dt><dd>{selected.artifact}</dd><dt>A question to evaluate</dt><dd>{selected.measure}</dd></dl><p className={s.boundary}>{selected.boundary}</p></div>
        </div>
      </>
      case 4: return <>
        <Heading number="05" title="Start small enough to learn something real.">A two-week build-and-review pilot, shaped around one useful question.</Heading>
        <div className={s.pilotHeader}><span className={s.prototype}>Proposed · not scheduled</span><p>Two to four small teams · one workshop · one review<br />Participation, dates and resources to be agreed.</p></div>
        <div className={s.timeline}>{pilotSteps.map((step, i) => <article key={step.period}><span className={s.stepNumber}>0{i + 1}</span><div><span className={s.eyebrow}>{step.period}</span><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div>
        <div className={s.pilotBottom}><div><h3>What we would leave behind</h3><ul>{['One inspectable prototype per team, with its limitations.', 'A short evaluation against a baseline agreed in advance.', 'A teaching note another facilitator can reuse.'].map(x => <li key={x}><Check size={16} aria-hidden="true" />{x}</li>)}</ul></div><div><h3>The boundary</h3><p>Frank prepares the technical example and facilitates. A university contact determines institutional fit and supervision. Use public or synthetic data; agree IP, consent and a compute ceiling before starting.</p><p className={s.caption}>No student recruitment, sponsor commitment, sensitive data, academic credit or budget is assumed. Continue only after a joint review.</p></div></div>
      </>
      case 5: return <>
        <Heading number="06" title="Erik, where would you take this?">I’d value your perspective on the idea, and on the people and places where it could become useful.</Heading>
        <div className={s.conversationGrid}><div className={s.questions}><p><span>01</span>Where do you see the strongest fit with what students, researchers or founders actually need?</p><p><span>02</span>What would you change before putting this in front of a university team?</p><p><span>03</span>Who at UvA or another university would be worth learning from? A relevant introduction would be valuable.</p><p><span>04</span>Would you be open to an occasional conversation as I develop this? I’d appreciate your judgment and mentorship.</p></div><aside className={s.nextStep}><Crew row={0} column={3} name="Mini Frank listening" /><span className={s.eyebrow}>A useful next step</span><h3>Leave with one direction worth pursuing.</h3><p>A question to refine, a person to speak with, or a small pilot to shape together.</p><p>Frank writes a brief after the conversation. Any next step stays with the people who would own it.</p><button className={s.secondary} onClick={() => { closePresentation(); window.print() }}><Printer size={16} aria-hidden="true" />Print the one-page brief</button></aside></div>
      </>
    }
  }

  return <main className={s.root} data-uva-proposal="true">
    <div className={s.topbar}><a href="/partnerships" className={s.wordmark}>FrankX<span> / Starlight Intelligence</span></a><span className={s.edition}>A university conversation · {proposal.date}</span><button className={s.iconButton} aria-label="Print one-page summary" onClick={() => window.print()}><Printer size={18} /></button></div>
    <div className={s.disclosure}><span className={s.dot} /><p>Independent founder-authored proposal. Not an official UvA partnership.</p><span>Unlisted discussion draft</span></div>
    <div className={s.explore}>
      <section id="opportunity" className={`${s.section} ${s.hero}`}>{chapter(0, 'page')}</section>
      <nav className={s.chapterNav} aria-label="Presentation chapters">{chapters.map((item, i) => <a key={item.id} href={`#${item.id}`}><span>0{i + 1}</span>{item.short}</a>)}</nav>
      {chapters.slice(1).map((item, i) => <section key={item.id} id={item.id} className={s.section} aria-label={item.label}>{chapter(i + 1, 'page')}</section>)}
      <footer className={s.footer}><div><strong>A conversation proposed by Frank Riemer.</strong><p>UvA and Founder Space are named as the context for discussion. Neither has approved or endorsed this proposal. No institutional logos are used.</p></div><div><External href="https://www.uva.nl/en">University of Amsterdam</External><a href="/partnerships">FrankX partnership context <ArrowUpRight size={14} aria-hidden="true" /></a><span>Source review: {proposal.date} · Runtime rehearsal pending</span></div></footer>
    </div>
    <dialog ref={dialog} className={s.presentation} aria-label="Guided collaboration presentation" onCancel={event => { event.preventDefault(); closePresentation() }} onClose={() => { document.body.style.overflow = previousOverflow.current; setPresenting(false) }}>
      <div className={s.presentationBar}><span className={s.wordmark}>FrankX <span>/ A university conversation</span></span><span className={s.presentationStatus}>Independent proposal · no institutional endorsement</span><button className={s.iconButton} onClick={closePresentation} aria-label="Exit presentation"><X size={21} /></button></div>
      <div ref={stage} tabIndex={-1} className={s.stage} aria-label={`Chapter ${active + 1}: ${chapters[active].label}`}>{presenting && chapter(active, 'stage')}</div>
      <div className={s.presentationControls}><button className={s.secondary} disabled={active === 0} onClick={() => move(active - 1)} aria-label="Previous chapter"><ArrowLeft size={17} /> <span>Previous</span></button><div><p aria-live="polite" aria-atomic="true">{active + 1} / 6 <span>{chapters[active].short}</span></p><div className={s.dots}>{chapters.map((item, i) => <button key={item.id} aria-label={`Go to chapter ${i + 1}: ${item.label}`} aria-current={active === i ? 'step' : undefined} onClick={() => move(i)} />)}</div></div>{active === 5 ? <button className={s.primary} onClick={closePresentation}>Finish <Check size={17} /></button> : <button className={s.primary} onClick={() => move(active + 1)} aria-label="Next chapter"><span>Next</span> <ArrowRight size={17} /></button>}</div>
      <p className={s.keyboardHint}>{fullscreenNote || '← → to navigate · Home / End to jump · Esc to exit'}</p>
    </dialog>
    <article className={s.printBrief} aria-label="Printable one-page collaboration summary"><header><span>Frank Riemer / Starlight Intelligence</span><span>{proposal.date}</span></header><h1>What becomes possible<br />when we build together?</h1><p className={s.printDeck}>{proposal.subtitle}</p><p><strong>Independent founder-authored discussion draft. Not an official UvA partnership.</strong></p><div className={s.printColumns}><section><h2>The opportunity</h2><p>Connect university talent with inspectable tools and a practical setting to build, question and improve a useful idea.</p><h2>What Frank brings</h2><p>An Amsterdam-based founder and AI Architect with a background at Oracle Cloud; public Starlight protocol and reference source, and reusable working practices in Agentic Creator OS. Former role; no current Oracle endorsement implied.</p><h2>Where to explore</h2><p>Education: reproducible teaching examples. Research: compare bounded agent workflows. Entrepreneurship: test a prototype with a user. Impact: agree an outcome with the people affected.</p></section><section><h2>A bounded pilot, proposed</h2><p>Two weeks. Two to four small teams. A 90-minute workshop and a 60-minute review. Leave an inspectable prototype, evaluation and reusable teaching note.</p><h2>Agree before starting</h2><p>University contact, supervision, participants, dates, IP, consent and compute ceiling. Public or synthetic data only. No funding, institutional approval or academic credit assumed.</p><h2>The conversation with Erik</h2><p>Where is the strongest fit? What should change? Who should we learn from at UvA or elsewhere? Would occasional mentorship be useful? Leave with one next step and its owner.</p></section></div><h2>Inspect the source</h2><p className={s.printSources}>github.com/Starlight-Intelligence/Starlight-Intelligence-System<br />github.com/frankxai/agentic-creator-os</p><p><strong>Evidence status:</strong> source and interface audit reviewed; runtime rehearsal pending. No adoption, performance or impact claims.</p><footer>UvA and Founder Space have not approved or endorsed this proposal. Original crew supplied by Frank. frankx.ai/partnerships/proposal/uva-rec-impact</footer></article>
  </main>
}
