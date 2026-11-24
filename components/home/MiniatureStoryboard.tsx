'use client'

import { useEffect, useRef, useState } from 'react'
import './miniature-storyboard.css'

const guide = '/guides/mini-me-storyboard'
const images = '/images/guides/mini-me/'
const panels = [
  { label: 'A small change.', cue: 'The box', crop: '26 20 886 530', alt: 'Mini Frank holds a black box between a blue companion and a red companion.' },
  { label: 'One more thing.', cue: 'The tangle', crop: '26 574 886 458', alt: 'Red wires spring out of the open box. Frank leans back as his companions look on.' },
  { label: 'Let’s look closer.', cue: 'The thread', crop: '26 1062 886 568', alt: 'At the workbench, Frank follows one red wire while both companions watch.' },
]

/** Camera windows into the three printed panels. All coordinates are in source SVG units. */
export default function MiniatureStoryboard() {
  const [frame, setFrame] = useState(0)
  const stage = useRef<HTMLDivElement>(null)
  const artwork = useRef<SVGSVGElement>(null)
  const opened = useRef(false)
  useEffect(() => {
    if (!opened.current || !stage.current || !artwork.current || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const surface = stage.current
    const art = artwork.current
    let cancelled = false
    let dispose: (() => void) | undefined
    import('gsap').then(({ gsap }) => {
      if (cancelled) return
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(art, { scale: 1.045, opacity: .74 }, { scale: 1, opacity: 1, duration: .48, ease: 'power3.out' })
      }, surface)
      dispose = () => media.revert()
    }).catch(() => { /* The selected frame remains visible without animation. */ })
    return () => { cancelled = true; dispose?.() }
  }, [frame])
  const active = panels[frame]
  return <section className="fx-story" aria-labelledby="miniature-story-title">
    <header className="fx-story-rule"><span>FrankX <b>/</b> The miniature studio</span><span>Storyboards &nbsp;·&nbsp; No. 02</span></header>
    <div className="fx-story-spread">
      <div className="fx-story-lead">
        <div className="fx-story-postmark"><img src={images + 'collection-02-01.svg'} alt="Mini Frank and two companions at Amsterdam Centraal" width="941" height="1672" loading="lazy"/><span>Amsterdam<br/>Centraal</span></div>
        <h3 id="miniature-story-title">Big ideas<br/>deserve a<br/><em>little play.</em></h3>
        <p>Mini Frank is my illustrated counterpart. Alongside the studio’s companions, he turns the messy parts of making things into stories.</p>
        <a href={guide}>Explore the mini-me stories <span aria-hidden="true">↗</span></a>
      </div>
      <div className="fx-story-desk">
        <div className="fx-story-index"><span>Fig. 02 &nbsp;/&nbsp; The bug story</span><span>Frame 0{frame+1} / 03</span></div>
        <div className="fx-story-stage" ref={stage}>
          <svg ref={artwork} viewBox={active.crop} preserveAspectRatio="xMidYMid meet" role="img" aria-label={active.alt}>
            <svg x={active.crop.split(' ')[0]} y={active.crop.split(' ')[1]} width={active.crop.split(' ')[2]} height={active.crop.split(' ')[3]} viewBox={active.crop} overflow="hidden">
              <image href={images+'collection-02-03.svg'} width="941" height="1672"/>
            </svg>
          </svg>
        </div>
        <div className="fx-story-caption" aria-live="polite" aria-atomic="true"><small>0{frame+1}</small><strong>{active.label}</strong></div>
        <div className="fx-story-tabs" role="group" aria-label="Choose a storyboard frame">{panels.map((p,i)=><button key={p.cue} type="button" aria-pressed={i===frame} onClick={()=>{opened.current=true;setFrame(i)}}><span>0{i+1}</span> {p.cue}</button>)}</div>
      </div>
    </div>
    <footer className="fx-story-footer"><span>Mini Frank &amp; companions</span><span>AI-generated illustrations</span></footer>
  </section>
}
