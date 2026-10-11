'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Check, ExternalLink, GitBranch, Github, Layers3, Play, Workflow } from 'lucide-react'
import { showroomSystems } from '@/data/ai-architecture/showroom'
import { trackEvent } from '@/lib/analytics'
import styles from './ArchitectureShowroom.module.css'

const Diagram = dynamic(() => import('./ArchitectureDiagram'), {
  ssr: false,
  loading: () => <div className={styles.diagramLoading}>Loading the architecture canvas… The component list below remains available.</div>,
})

function record(action: string, system: string) {
  trackEvent('ai_architecture_showroom_action', { action, system })
}

export function ArchitectureShowroom() {
  const [selected, setSelected] = useState(showroomSystems[0].id)
  const [stepId, setStepId] = useState(showroomSystems[0].steps[0].id)
  const system = showroomSystems.find(item => item.id === selected) ?? showroomSystems[0]
  const step = system.steps.find(item => item.id === stepId) ?? system.steps[0]
  const nodes = system.steps.map(item => ({
    id: item.id, position: { x: item.x, y: item.y },
    data: { label: item.label, technology: item.technology, type: item.type },
  }))
  const edges = system.connections.map(([source, target], i) => ({ id: `${system.id}-${i}`, source, target }))

  return (
    <div className={styles.showroom}>
      <section className={styles.hero} aria-labelledby="architecture-title">
        <Image src="/images/ai-architecture/intelligence-campus-v1.webp" alt="" fill sizes="100vw" preload className={styles.heroImage} />
        <div className={styles.heroVeil} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>FrankX / AI architecture</p>
          <h1 id="architecture-title">Your next idea.<br />Built as a <span>system.</span></h1>
          <p className={styles.heroDeck}>Open the architecture. Inspect the code. Deploy a starting point you can make your own.</p>
          <p className={styles.heroProof}>FrankX retrieval and agent-team starters sit beside maintained cloud references. Every preview names the setup work that remains.</p>
          <a href="#architecture-studio" className={styles.primary} onClick={() => record('explore', selected)}>
            Explore the systems <ArrowDown size={17} aria-hidden="true" />
          </a>
          <div className={styles.heroLinks}>
            <a href="#working-edition">Read the field guide</a><span aria-hidden="true">/</span><a href="#architecture-tools">Choose your tools</a>
          </div>
        </div>
        <div className={styles.heroCaption}><span>01 / Intelligence campus</span><span>Original AI-generated editorial artwork</span></div>
      </section>

      <nav className={styles.index} aria-label="Architecture sections">
        <a href="#architecture-studio"><Layers3 size={17} aria-hidden="true" /> Interactive systems</a>
        <a href="#architecture-tools"><Workflow size={17} aria-hidden="true" /> Tools & workflows</a>
        <a href="#architecture-shop"><GitBranch size={17} aria-hidden="true" /> Kits & advisory</a>
        <a href="#official-architectures"><Github size={17} aria-hidden="true" /> Official references</a>
      </nav>

      <section id="architecture-studio" className={styles.section} aria-labelledby="studio-title">
        <div className={styles.sectionHeader}>
          <div><p className={styles.eyebrow}>Inside the build</p><h2 id="studio-title">From the idea<br />to the moving parts.</h2></div>
          <p>Choose a system. Follow its boundaries. Select a component to see what it owns, then open the source or deployment setup.</p>
        </div>
        <div className={styles.selector} role="group" aria-label="Choose a system">
          {showroomSystems.map((item, i) => <button type="button" key={item.id} aria-pressed={selected === item.id} onClick={() => {
            setSelected(item.id); setStepId(item.steps[0].id); record('select_system', item.id)
          }}><span>0{i + 1}</span>{item.label}<ArrowRight size={16} aria-hidden="true" /></button>)}
        </div>
        <div className={styles.workbench}>
          <div className={styles.project}>
            <div className={styles.projectImage}><Image src={system.image} alt="" fill sizes="(max-width: 900px) 100vw, 360px" /></div>
            <div className={styles.projectBody}>
              <p className={styles.projectOwner}>{system.owner}</p>
              <h3>{system.title}</h3><p>{system.description}</p>
              <a href={system.deploy} target="_blank" rel="noopener" className={styles.primary} onClick={() => record('deploy_opened', system.id)}>{system.deployLabel}<ExternalLink size={15} aria-hidden="true" /></a>
              <a href={system.source} target="_blank" rel="noopener" className={styles.sourceLink} onClick={() => record('source_opened', system.id)}>{system.sourceLabel ? <ExternalLink size={16} aria-hidden="true" /> : <Github size={16} aria-hidden="true" />} {system.sourceLabel ?? 'Inspect the source'} <ArrowRight size={15} aria-hidden="true" /></a>
              <p className={styles.smallLabel}>Before you deploy</p>
              <ul className={styles.requirements}>{system.requirements.map(item => <li key={item}><Check size={14} aria-hidden="true" />{item}</li>)}</ul>
            </div>
          </div>
          <div className={styles.canvasColumn}>
            <div className={styles.canvasBar}><span><span className={styles.statusDot} /> Architecture preview</span><span>React Flow / source-backed</span></div>
            <div className={styles.canvas}>
              <Diagram key={system.id} nodes={nodes} edges={edges} interactive editable={false} onNodeSelect={id => setStepId(id)} className={styles.diagram} />
            </div>
            <ol className={styles.mobileFlow} aria-label="Architecture components and connections">
              {system.steps.map((item, index) => {
                const next = system.connections.filter(([source]) => source === item.id).map(([, target]) => system.steps.find(component => component.id === target)?.label).filter(Boolean)
                return <li key={item.id}>
                  <button type="button" aria-pressed={item.id === step.id} onClick={() => setStepId(item.id)}>
                    <span className={styles.flowNumber}>{String(index + 1).padStart(2, '0')}</span>
                    <span><strong>{item.label}</strong><small>{item.technology}</small></span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                  <p>{next.length ? `Connects to: ${next.join(' · ')}` : 'Output boundary'}</p>
                </li>
              })}
            </ol>
            <div className={styles.inspector} aria-live="polite">
              <p className={styles.smallLabel}>Selected component / {step.technology}</p>
              <h4>{step.label}</h4><p>{step.description}</p>
            </div>
          </div>
        </div>
        <div className={styles.components} role="group" aria-label="Inspect components without using the canvas">
          {system.steps.map(item => <button type="button" key={item.id} aria-pressed={item.id === step.id} onClick={() => setStepId(item.id)}>{item.label}</button>)}
        </div>
        <p className={styles.scope}><strong>What this preview shows.</strong> The diagram describes the linked implementation. It does not run a model or show live telemetry. {system.limitation}</p>
      </section>

      <section id="architecture-tools" className={`${styles.section} ${styles.toolsSection}`} aria-labelledby="tools-title">
        <div className={styles.sectionHeader}>
          <div><p className={styles.eyebrow}>The tools behind the system</p><h2 id="tools-title">Build the workflow.<br />Make the output worth seeing.</h2></div>
          <p>Connect automation to a real app, then bring image and video production into the workflow when the work calls for it.</p>
        </div>
        <p className={styles.disclosure}>The Higgsfield link is an affiliate link. If you buy through it, I may earn a commission at no extra cost to you.</p>
        <div className={styles.toolLayout}>
          <article className={styles.creativeTool}>
            <div className={styles.creativeArt}><Image src="/images/ai-architecture/intelligence-campus-v1.webp" alt="" fill sizes="(max-width: 900px) 100vw, 60vw" /></div>
            <div className={styles.creativeCopy}><p className={styles.eyebrow}>Image & video production</p><h3>The visual layer<br />of your next product.</h3><p>Explore Higgsfield for image and video creation. Keep asset generation separate from publishing so you can inspect each result.</p><a href="/go/higgsfield" target="_blank" rel="sponsored noopener" className={styles.primary} onClick={() => record('affiliate_opened', 'higgsfield')}>Explore Higgsfield <ExternalLink size={16} aria-hidden="true" /></a><span className={styles.affiliateLabel}>Affiliate link</span></div>
          </article>
          <div className={styles.toolRows}>
            <article><Workflow size={23} aria-hidden="true" /><div><p className={styles.smallLabel}>Automation</p><h3>n8n + workers</h3><p>Provision the editor, queue, database, and workers. Add your workflows after setup.</p><a href="https://railway.com/deploy/n8n-with-workers" target="_blank" rel="noopener" onClick={() => record('deploy_opened', 'n8n')}>Open n8n deployment <ArrowRight size={15} aria-hidden="true" /></a></div></article>
            <article><Play size={23} aria-hidden="true" /><div><p className={styles.smallLabel}>Local AI</p><h3>n8n + Ollama + Qdrant</h3><p>Inspect n8n’s Docker Compose starter and included chat workflow. Review its production limits before hosting it.</p><a href="https://github.com/n8n-io/self-hosted-ai-starter-kit" target="_blank" rel="noopener" onClick={() => record('source_opened', 'n8n-local')}>Get the self-hosted starter <ArrowRight size={15} aria-hidden="true" /></a></div></article>
          </div>
        </div>
      </section>

      <section id="architecture-shop" className={styles.section} aria-labelledby="shop-title">
        <div className={styles.sectionHeader}><div><p className={styles.eyebrow}>Choose your next move</p><h2 id="shop-title">Start with code.<br />Get help with the hard decisions.</h2></div><p>Open starters give you an inspectable foundation. For a workflow bundle or a review of your own architecture, follow the dedicated offer.</p></div>
        <div className={styles.offerRows}>
          <Link href="/products/starter-kit" onClick={() => record('offer_opened', 'starter-kit')}><span>01 / Workflow bundle</span><h3>System Architect Starter Kit</h3><p>Inspect the n8n and content workflow offer, its contents, and launch availability.</p><ArrowRight aria-hidden="true" /></Link>
          <Link href="/ai-architect" onClick={() => record('review_opened', 'architecture-review')}><span>02 / Architecture review</span><h3>Find the decision to close first.</h3><p>Review model access, loop boundaries, retrieved context, and where a long run lives.</p><ArrowRight aria-hidden="true" /></Link>
          <Link href="/contact" onClick={() => record('advisory_opened', 'contact')}><span>03 / Work with Frank</span><h3>Bring your own system.</h3><p>Discuss an architecture workshop, implementation sprint, or advisory engagement.</p><ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>
    </div>
  )
}
