'use client'

import { useEffect, useRef } from 'react'
import { initAtlas, type AtlasRefs } from './atlas-engine'
import type { Lang } from './atlas-data'
import './atlas.css'

interface AtlasProps {
  defaultLang?: Lang
  /** Override the topojson URL (defaults to /globe/countries-50m.json). */
  topoUrl?: string
  /** href for the discreet back-link chip. Set to null to hide. */
  backHref?: string | null
  /** Visible label on the back-link chip. */
  backLabel?: string
}

/**
 * Atlas — a fullscreen, trilingual (EN/DE/HR) canvas globe.
 *
 * React owns the DOM scaffolding; the imperative render loop is mounted in
 * `useEffect` and torn down on unmount via the cleanup function returned by
 * `initAtlas`.
 */
export default function Atlas({
  defaultLang = 'en',
  topoUrl,
  backHref = '/',
  backLabel = '← frankx.ai',
}: AtlasProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)
  const loadingTextRef = useRef<HTMLSpanElement>(null)
  const coordsRef = useRef<HTMLDivElement>(null)
  const compassStarRef = useRef<SVGGElement>(null)

  const cardRef = useRef<HTMLElement>(null)
  const cardFlagRef = useRef<HTMLSpanElement>(null)
  const cardEmojiRef = useRef<HTMLSpanElement>(null)
  const cardTitleRef = useRef<HTMLHeadingElement>(null)
  const cardAltsRef = useRef<HTMLDivElement>(null)
  const cardKindRef = useRef<HTMLSpanElement>(null)
  const cardMetaRef = useRef<HTMLDivElement>(null)
  const cardFactRef = useRef<HTMLParagraphElement>(null)
  const cardCloseRef = useRef<HTMLButtonElement>(null)
  const cardWordBlockRef = useRef<HTMLDivElement>(null)
  const wordLblRef = useRef<HTMLDivElement>(null)
  const wordRowRef = useRef<HTMLDivElement>(null)
  const cardListenRef = useRef<HTMLButtonElement>(null)
  const cardFlyRef = useRef<HTMLButtonElement>(null)
  const cardNearRef = useRef<HTMLButtonElement>(null)
  const listenLblRef = useRef<HTMLSpanElement>(null)
  const flyLblRef = useRef<HTMLSpanElement>(null)
  const nearLblRef = useRef<HTMLSpanElement>(null)

  const btnQuizRef = useRef<HTMLButtonElement>(null)
  const btnQuizLblRef = useRef<HTMLSpanElement>(null)
  const btnResetRef = useRef<HTMLButtonElement>(null)
  const btnResetLblRef = useRef<HTMLSpanElement>(null)
  const btnSpinRef = useRef<HTMLButtonElement>(null)
  const btnSpinLblRef = useRef<HTMLSpanElement>(null)
  const btnRandomRef = useRef<HTMLButtonElement>(null)
  const btnRandomLblRef = useRef<HTMLSpanElement>(null)
  const spinStateRef = useRef<HTMLSpanElement>(null)
  const placesListRef = useRef<HTMLDivElement>(null)
  const placeCountRef = useRef<HTMLSpanElement>(null)
  const placesHeadRef = useRef<HTMLSpanElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const plateRef = useRef<HTMLDivElement>(null)
  const showAllRef = useRef<HTMLInputElement>(null)
  const langGroupRef = useRef<HTMLDivElement>(null)

  const quizRef = useRef<HTMLDivElement>(null)
  const quizPromptRef = useRef<HTMLDivElement>(null)
  const quizTargetRef = useRef<HTMLDivElement>(null)
  const quizRoundLblRef = useRef<HTMLSpanElement>(null)
  const quizScoreLblRef = useRef<HTMLSpanElement>(null)
  const quizStreakLblRef = useRef<HTMLSpanElement>(null)
  const quizRoundRef = useRef<HTMLElement>(null)
  const quizScoreRef = useRef<HTMLElement>(null)
  const quizStreakRef = useRef<HTMLElement>(null)
  const quizFeedbackRef = useRef<HTMLDivElement>(null)
  const quizSkipRef = useRef<HTMLButtonElement>(null)
  const quizEndRef = useRef<HTMLButtonElement>(null)
  const quizListenRef = useRef<HTMLButtonElement>(null)
  const quizProgressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const langBtns = langGroupRef.current?.querySelectorAll<HTMLButtonElement>('button[data-lang]')
    if (
      !canvasRef.current || !loadingRef.current || !loadingTextRef.current || !coordsRef.current ||
      !cardRef.current || !cardTitleRef.current || !cardAltsRef.current || !cardKindRef.current ||
      !cardMetaRef.current || !cardFactRef.current || !cardCloseRef.current || !cardWordBlockRef.current ||
      !wordLblRef.current || !wordRowRef.current || !cardListenRef.current || !cardFlyRef.current ||
      !cardNearRef.current || !listenLblRef.current || !flyLblRef.current || !nearLblRef.current ||
      !cardFlagRef.current || !cardEmojiRef.current ||
      !btnQuizRef.current || !btnQuizLblRef.current || !btnResetRef.current || !btnResetLblRef.current ||
      !btnSpinRef.current || !btnSpinLblRef.current || !btnRandomRef.current || !btnRandomLblRef.current ||
      !spinStateRef.current || !placesListRef.current || !placeCountRef.current || !placesHeadRef.current ||
      !hintRef.current || !brandRef.current || !plateRef.current || !showAllRef.current ||
      !quizRef.current || !quizPromptRef.current || !quizTargetRef.current ||
      !quizRoundLblRef.current || !quizScoreLblRef.current || !quizStreakLblRef.current ||
      !quizRoundRef.current || !quizScoreRef.current || !quizStreakRef.current ||
      !quizFeedbackRef.current || !quizSkipRef.current || !quizEndRef.current || !quizListenRef.current || !quizProgressRef.current ||
      !langBtns
    ) return

    const refs: AtlasRefs = {
      canvas: canvasRef.current,
      loading: loadingRef.current,
      loadingText: loadingTextRef.current,
      coords: coordsRef.current,
      compassStar: compassStarRef.current as unknown as SVGElement | null,
      card: cardRef.current,
      cardFlag: cardFlagRef.current,
      cardEmoji: cardEmojiRef.current,
      cardTitle: cardTitleRef.current,
      cardAlts: cardAltsRef.current,
      cardKind: cardKindRef.current,
      cardMeta: cardMetaRef.current,
      cardFact: cardFactRef.current,
      cardClose: cardCloseRef.current,
      cardWordBlock: cardWordBlockRef.current,
      wordLbl: wordLblRef.current,
      wordRow: wordRowRef.current,
      cardListen: cardListenRef.current,
      cardFly: cardFlyRef.current,
      cardNear: cardNearRef.current,
      listenLbl: listenLblRef.current,
      flyLbl: flyLblRef.current,
      nearLbl: nearLblRef.current,
      btnQuiz: btnQuizRef.current,
      btnQuizLbl: btnQuizLblRef.current,
      btnReset: btnResetRef.current,
      btnResetLbl: btnResetLblRef.current,
      btnSpin: btnSpinRef.current,
      btnSpinLbl: btnSpinLblRef.current,
      btnRandom: btnRandomRef.current,
      btnRandomLbl: btnRandomLblRef.current,
      spinState: spinStateRef.current,
      placesList: placesListRef.current,
      placeCount: placeCountRef.current,
      placesHead: placesHeadRef.current,
      hint: hintRef.current,
      brand: brandRef.current,
      plate: plateRef.current,
      showAll: showAllRef.current,
      quiz: quizRef.current,
      quizPrompt: quizPromptRef.current,
      quizTarget: quizTargetRef.current,
      quizRoundLbl: quizRoundLblRef.current,
      quizScoreLbl: quizScoreLblRef.current,
      quizStreakLbl: quizStreakLblRef.current,
      quizRound: quizRoundRef.current,
      quizScore: quizScoreRef.current,
      quizStreak: quizStreakRef.current,
      quizFeedback: quizFeedbackRef.current,
      quizSkip: quizSkipRef.current,
      quizEnd: quizEndRef.current,
      quizListen: quizListenRef.current,
      quizProgress: quizProgressRef.current,
      langBtns,
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const dispose = initAtlas(refs, { defaultLang, topoUrl })
    return () => {
      dispose()
      document.body.style.overflow = prevOverflow
    }
  }, [defaultLang, topoUrl])

  return (
    <div ref={rootRef} className="atlas-root">
      <div className="mark tl" />
      <div className="mark tr" />
      <div className="mark bl" />
      <div className="mark br" />

      {backHref !== null && (
        <a className="atlas-back" href={backHref}>
          {backLabel}
        </a>
      )}

      <div ref={langGroupRef} className="lang" role="group" aria-label="Language">
        <button data-lang="en">EN</button>
        <button data-lang="de">DE</button>
        <button data-lang="hr">HR</button>
        <span className="sep" />
        <label className="all">
          <input ref={showAllRef} type="checkbox" /> All
        </label>
      </div>

      <div className="bar">
        <div ref={brandRef} className="brand">
          Atlas <em>— Explore the World</em>
        </div>
        <div ref={plateRef} className="plate">Plate I</div>
      </div>

      <div ref={coordsRef} className="coords">LAT 00°00′N · LON 000°00′E</div>

      <div className="compass" aria-hidden="true">
        <div className="ring" />
        <svg viewBox="0 0 84 84">
          <g ref={compassStarRef} style={{ transformOrigin: '42px 42px' }}>
            <polygon points="42,10 46,40 42,70 38,40" fill="#1b2324" />
            <polygon points="10,42 40,38 70,42 40,46" fill="#1b2324" opacity="0.35" />
          </g>
        </svg>
        <span className="label n">N</span>
        <span className="label s">S</span>
        <span className="label e">E</span>
        <span className="label w">W</span>
      </div>

      <div className="stage">
        <canvas ref={canvasRef} className="globe" />
      </div>

      <aside ref={cardRef} className="card" aria-hidden="true">
        <button ref={cardCloseRef} className="close" aria-label="Close">×</button>
        <div className="kicker">
          <span className="dot" />
          <span ref={cardKindRef}>Country</span>
        </div>
        <div className="title-row">
          <span ref={cardFlagRef} className="flag" aria-hidden="true" />
          <h2 ref={cardTitleRef}>—</h2>
          <span ref={cardEmojiRef} className="c-emoji" aria-hidden="true" />
        </div>
        <div ref={cardAltsRef} className="alts" />
        <div ref={cardMetaRef} className="meta" />
        <p ref={cardFactRef} className="fact" />
        <div ref={cardWordBlockRef} className="word" style={{ display: 'none' }}>
          <div ref={wordLblRef} className="lbl">Word of the place</div>
          <div ref={wordRowRef} className="row" />
        </div>
        <div className="actions">
          <button ref={cardListenRef} title="Listen">🔊 <span ref={listenLblRef}>Listen</span></button>
          <button ref={cardFlyRef}><span ref={flyLblRef}>Fly here</span></button>
          <button ref={cardNearRef}><span ref={nearLblRef}>Nearby</span></button>
        </div>
      </aside>

      <div className="controls">
        <button ref={btnQuizRef} className="btn primary">
          <svg className="ico" viewBox="0 0 16 16" fill="none">
            <path d="M3 8a5 5 0 1 0 10 0 5 5 0 0 0-10 0zm5-3v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span ref={btnQuizLblRef}>Play: Find the country</span>
        </button>
        <button ref={btnResetRef} className="btn">
          <svg className="ico" viewBox="0 0 16 16" fill="none">
            <path d="M3 8a5 5 0 0 1 8.5-3.5M13 3v3h-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span ref={btnResetLblRef}>Reset view</span>
          <span className="kbd">R</span>
        </button>
        <button ref={btnSpinRef} className="btn">
          <svg className="ico" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M8 3v5l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span ref={btnSpinLblRef}>Auto-spin</span>
          <span ref={spinStateRef} className="kbd">ON</span>
        </button>
        <button ref={btnRandomRef} className="btn">
          <svg className="ico" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="8" cy="8" r="1.2" fill="currentColor" />
          </svg>
          <span ref={btnRandomLblRef}>Surprise me</span>
        </button>
      </div>

      <div className="places">
        <div className="head">
          <span ref={placesHeadRef}>Places to explore</span>
          <span className="line" />
          <span ref={placeCountRef}>—</span>
        </div>
        <div ref={placesListRef} className="list" />
      </div>

      <div ref={hintRef} className="hint" />

      <div ref={quizRef} className="quiz" aria-hidden="true">
        <div ref={quizPromptRef} className="prompt">Find</div>
        <div ref={quizTargetRef} className="target">—</div>
        <div className="hud">
          <span><span ref={quizRoundLblRef}>Round</span> <b ref={quizRoundRef}>1/10</b></span>
          <span><span ref={quizScoreLblRef}>Score</span> <b ref={quizScoreRef}>0</b></span>
          <span><span ref={quizStreakLblRef}>Streak</span> <b ref={quizStreakRef}>0</b></span>
        </div>
        <div ref={quizFeedbackRef} className="feedback" />
        <div className="bar">
          <button ref={quizListenRef} className="listen" aria-label="Hear the country name">🔊</button>
          <button ref={quizSkipRef}>Skip</button>
          <button ref={quizEndRef}>End game</button>
        </div>
        <div className="progress">
          <div ref={quizProgressRef} className="fill" />
        </div>
      </div>

      <div ref={loadingRef} className="loading">
        <span ref={loadingTextRef}>Charting the world</span>
        <span className="dots"><span /><span /><span /></span>
      </div>
    </div>
  )
}
