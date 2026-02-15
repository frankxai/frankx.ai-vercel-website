'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, RotateCcw, Trophy, Share2, Infinity } from 'lucide-react'

// ── Game Animations ─────────────────────────────────
const GAME_STYLES = `
@keyframes letter-flip {
  0% { transform: scaleY(1); }
  45% { transform: scaleY(0); }
  55% { transform: scaleY(0); }
  100% { transform: scaleY(1); }
}
@keyframes letter-bounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
@keyframes key-press {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.92); }
}
@keyframes win-bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
}
.letter-reveal { animation: letter-flip 0.5s ease-in-out forwards; }
.letter-type { animation: letter-bounce 0.1s ease-out; }
.key-active { animation: key-press 0.1s ease-out; }
.win-dance { animation: win-bounce 0.6s ease-in-out; }
`

// ============================================================================
// WORD LIST (curated common 5-letter words)
// ============================================================================

const WORDS = [
  'about','above','after','again','alarm','allow','among','anger','angel','anime',
  'apple','arena','arise','avoid','basic','beach','begin','being','below','bench',
  'birth','black','blade','blame','blank','blast','blaze','bleed','blend','bless',
  'blind','block','blood','bloom','blown','blues','board','bonus','boost','bound',
  'brain','brand','brave','bread','break','breed','brick','brief','bring','broad',
  'broke','brook','brown','brush','build','built','bunch','burst','buyer','cable',
  'cargo','carry','catch','cause','chain','chair','chase','cheap','check','chess',
  'chief','child','chunk','civic','claim','class','clean','clear','climb','cling',
  'clock','clone','close','cloud','coach','coast','coral','could','count','cover',
  'crack','craft','crane','crash','crazy','cream','crews','crisp','cross','crowd',
  'crown','cruel','crush','curve','cycle','daily','dance','debut','decay','defer',
  'demon','dense','depth','dirty','dodge','doubt','dozen','draft','drain','drama',
  'drank','drawn','dream','dress','drift','drink','drive','drown','dying','eager',
  'early','earth','eight','elect','elite','ember','empty','enemy','enjoy','enter',
  'equal','error','event','every','exact','exam','exist','extra','faith','false',
  'fault','feast','fence','fewer','fiber','field','fifth','fifty','fight','final',
  'flame','flash','fleet','flesh','flint','float','flood','floor','flour','fluid',
  'flush','focus','force','forge','forum','found','frame','frank','fraud','fresh',
  'front','frost','fruit','funds','ghost','giant','given','glass','globe','glory',
  'going','grace','grade','grain','grand','grant','grasp','grass','grave','great',
  'green','grind','gross','group','grove','grown','guard','guess','guide','guilt',
  'habit','happy','harsh','haven','heart','heavy','herbs','honor','horse','hotel',
  'house','human','humor','hurry','ideal','image','imply','index','indie','inner',
  'input','irony','ivory','jewel','joint','judge','juice','knife','knock','label',
  'large','laser','later','laugh','layer','learn','least','legal','level','light',
  'limit','lines','links','liver','local','logic','loose','lover','lower','loyal',
  'lucky','lunar','lunch','magic','major','maker','maple','march','match','mayor',
  'media','mercy','merit','metal','midst','might','minor','minus','model','money',
  'month','moral','motor','mount','mouse','mouth','moved','movie','music','naive',
  'nerve','never','night','noble','noise','north','novel','nurse','occur','ocean',
  'offer','often','olive','onset','opera','orbit','order','organ','other','outer',
  'owner','oxide','paint','panel','panic','paper','party','pasta','patch','pause',
  'peace','pearl','penny','phase','phone','photo','piano','piece','pilot','pitch',
  'pixel','pizza','place','plain','plane','plant','plate','plaza','plead','plumb',
  'point','polar','pound','power','press','price','pride','prime','print','prior',
  'prize','probe','proof','proud','prove','pulse','punch','pupil','queen','query',
  'quest','queue','quick','quiet','quite','quote','radar','radio','raise','rally',
  'range','rapid','ratio','reach','ready','realm','rebel','reign','relax','reply',
  'rider','rifle','right','rigid','risky','rival','river','robot','rocky','rogue',
  'roman','rough','round','route','royal','rugby','ruler','rural','sadly','saint',
  'salad','scale','scare','scene','scope','score','sense','serve','seven','shade',
  'shake','shall','shame','shape','share','shark','sharp','sheep','sheer','sheet',
  'shelf','shell','shift','shire','shock','shore','short','shout','sight','sigma',
  'since','sixth','sixty','sized','skill','skull','slate','sleep','slice','slide',
  'slope','smart','smell','smile','smoke','snake','solar','solid','solve','sorry',
  'south','space','spare','spark','speak','spear','speed','spell','spend','spice',
  'spine','spoke','spoon','sport','squad','stack','staff','stage','stain','stake',
  'stale','stamp','stand','stark','start','state','steal','steam','steel','steep',
  'steer','stern','stick','still','stock','stone','stood','store','storm','story',
  'stove','strap','straw','strip','stuck','study','stuff','style','sugar','suite',
  'super','surge','swamp','swear','sweep','sweet','swept','swing','sword','table',
  'taste','teach','tempo','tense','terms','theft','theme','thick','thing','think',
  'third','thorn','those','three','threw','throw','thumb','tidal','tiger','tight',
  'timer','tired','title','today','token','topic','total','touch','tough','tower',
  'toxic','trace','track','trade','trail','train','trait','treat','trend','trial',
  'tribe','trick','troop','truck','truly','trunk','trust','truth','tumor','tunes',
  'twist','ultra','uncle','under','union','unite','unity','until','upper','upset',
  'urban','usage','usual','valid','value','vapor','vault','verse','video','vigor',
  'viral','virus','visit','vital','vivid','vocal','voice','voter','wages','waste',
  'watch','water','weave','weigh','weird','whale','wheat','wheel','where','which',
  'while','white','whole','whose','width','witch','women','world','worry','worse',
  'worst','worth','would','wound','wrath','write','wrong','wrote','yield','young',
  'youth','judge','magic','nerve','ocean','pizza','quest','raise','solar','tiger',
]

// Remove duplicates
const WORD_LIST = [...new Set(WORDS)]

function getDailyWord(): string {
  // Deterministic daily word based on date
  const now = new Date()
  const start = new Date(2026, 0, 1) // Jan 1 2026
  const dayIndex = Math.floor((now.getTime() - start.getTime()) / 86400000)
  return WORD_LIST[dayIndex % WORD_LIST.length]
}

function getRandomWord(): string {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
}

// ============================================================================
// TYPES
// ============================================================================

type LetterState = 'correct' | 'present' | 'absent' | 'empty' | 'tbd'
type GameMode = 'daily' | 'unlimited'

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
]

const STATE_COLORS: Record<LetterState, string> = {
  correct: 'bg-emerald-500 border-emerald-500 text-white',
  present: 'bg-amber-500 border-amber-500 text-white',
  absent: 'bg-white/[0.08] border-white/[0.12] text-white/50',
  empty: 'bg-transparent border-white/[0.12]',
  tbd: 'bg-white/[0.04] border-white/[0.15] text-white',
}

const KEY_COLORS: Record<LetterState, string> = {
  correct: 'bg-emerald-500 text-white',
  present: 'bg-amber-500 text-white',
  absent: 'bg-white/[0.06] text-white/30',
  empty: 'bg-white/[0.08] text-white/70 hover:bg-white/[0.12]',
  tbd: 'bg-white/[0.08] text-white/70',
}

// ============================================================================
// GAME LOGIC
// ============================================================================

function evaluateGuess(guess: string, target: string): LetterState[] {
  const result: LetterState[] = Array(5).fill('absent')
  const targetChars = target.split('')
  const used = Array(5).fill(false)

  // First pass: correct positions
  for (let i = 0; i < 5; i++) {
    if (guess[i] === target[i]) {
      result[i] = 'correct'
      used[i] = true
    }
  }

  // Second pass: present but wrong position
  for (let i = 0; i < 5; i++) {
    if (result[i] === 'correct') continue
    for (let j = 0; j < 5; j++) {
      if (!used[j] && guess[i] === targetChars[j]) {
        result[i] = 'present'
        used[j] = true
        break
      }
    }
  }

  return result
}

// ============================================================================
// PAGE
// ============================================================================

export default function WordForgePage() {
  const [mode, setMode] = useState<GameMode>('daily')
  const [targetWord, setTargetWord] = useState(() => getDailyWord())
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing')
  const [letterStates, setLetterStates] = useState<Record<string, LetterState>>({})
  const [shake, setShake] = useState(false)
  const [message, setMessage] = useState('')
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)

  // Load streak
  useEffect(() => {
    const saved = localStorage.getItem('word-forge-streak')
    const best = localStorage.getItem('word-forge-best-streak')
    if (saved) setStreak(parseInt(saved, 10))
    if (best) setBestStreak(parseInt(best, 10))
  }, [])

  const showMessage = useCallback((msg: string, duration = 1500) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), duration)
  }, [])

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== 5) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      showMessage('Not enough letters')
      return
    }

    const guess = currentGuess.toLowerCase()

    // Check if it's a valid word (relaxed — accept any 5-letter combo)
    const evaluation = evaluateGuess(guess, targetWord)
    const newGuesses = [...guesses, guess]
    setGuesses(newGuesses)
    setCurrentGuess('')

    // Update keyboard state
    const newStates = { ...letterStates }
    for (let i = 0; i < 5; i++) {
      const letter = guess[i].toUpperCase()
      const current = newStates[letter]
      if (evaluation[i] === 'correct') {
        newStates[letter] = 'correct'
      } else if (evaluation[i] === 'present' && current !== 'correct') {
        newStates[letter] = 'present'
      } else if (!current || current === 'empty') {
        newStates[letter] = 'absent'
      }
    }
    setLetterStates(newStates)

    // Check win/lose
    if (guess === targetWord) {
      setGameStatus('won')
      const newStreak = streak + 1
      setStreak(newStreak)
      localStorage.setItem('word-forge-streak', String(newStreak))
      if (newStreak > bestStreak) {
        setBestStreak(newStreak)
        localStorage.setItem('word-forge-best-streak', String(newStreak))
      }
      showMessage(['Genius!', 'Magnificent!', 'Impressive!', 'Splendid!', 'Great!', 'Phew!'][newGuesses.length - 1] || 'Nice!', 3000)
    } else if (newGuesses.length >= 6) {
      setGameStatus('lost')
      setStreak(0)
      localStorage.setItem('word-forge-streak', '0')
      showMessage(targetWord.toUpperCase(), 5000)
    }
  }, [currentGuess, targetWord, guesses, letterStates, streak, bestStreak, showMessage])

  const handleKey = useCallback(
    (key: string) => {
      if (gameStatus !== 'playing') return

      if (key === 'ENTER') {
        submitGuess()
      } else if (key === '⌫' || key === 'BACKSPACE') {
        setCurrentGuess(prev => prev.slice(0, -1))
      } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess(prev => prev + key)
      }
    },
    [gameStatus, currentGuess, submitGuess]
  )

  // Physical keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const key = e.key.toUpperCase()
      if (key === 'ENTER' || key === 'BACKSPACE' || /^[A-Z]$/.test(key)) {
        e.preventDefault()
        handleKey(key)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleKey])

  const resetGame = useCallback((newMode?: GameMode) => {
    const m = newMode || mode
    setMode(m)
    setTargetWord(m === 'daily' ? getDailyWord() : getRandomWord())
    setGuesses([])
    setCurrentGuess('')
    setGameStatus('playing')
    setLetterStates({})
    setMessage('')
  }, [mode])

  const shareResult = useCallback(() => {
    const grid = guesses.map(guess => {
      const eval_ = evaluateGuess(guess, targetWord)
      return eval_.map(s => s === 'correct' ? '🟩' : s === 'present' ? '🟨' : '⬛').join('')
    }).join('\n')

    const text = `Word Forge ${mode === 'daily' ? '(Daily)' : ''} ${guesses.length}/6\n\n${grid}\n\nfrankx.ai/games/word-forge`

    if (navigator.share) {
      navigator.share({ text })
    } else {
      navigator.clipboard.writeText(text)
      showMessage('Copied to clipboard!')
    }
  }, [guesses, targetWord, mode, showMessage])

  // Build grid rows
  const rows = Array(6).fill(null).map((_, rowIdx) => {
    if (rowIdx < guesses.length) {
      const guess = guesses[rowIdx]
      const eval_ = evaluateGuess(guess, targetWord)
      return guess.split('').map((letter, i) => ({
        letter: letter.toUpperCase(),
        state: eval_[i] as LetterState,
      }))
    } else if (rowIdx === guesses.length) {
      return Array(5).fill(null).map((_, i) => ({
        letter: currentGuess[i]?.toUpperCase() || '',
        state: (currentGuess[i] ? 'tbd' : 'empty') as LetterState,
      }))
    }
    return Array(5).fill({ letter: '', state: 'empty' as LetterState })
  })

  return (
    <div className="min-h-[100dvh] bg-[#030712] flex flex-col">
      <style dangerouslySetInnerHTML={{ __html: GAME_STYLES }} />
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#030712]/90 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/games" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Games
          </Link>
          <h1 className="text-sm font-medium text-white">Word Forge</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => resetGame(mode === 'daily' ? 'unlimited' : 'daily')}
              className="p-2 rounded-lg hover:bg-white/[0.06] text-white/50 hover:text-white transition-all"
              title={mode === 'daily' ? 'Switch to Unlimited' : 'Switch to Daily'}
            >
              {mode === 'daily' ? <Infinity className="w-4 h-4" /> : <Trophy className="w-4 h-4" />}
            </button>
            {mode === 'unlimited' && (
              <button onClick={() => resetGame('unlimited')} className="p-2 rounded-lg hover:bg-white/[0.06] text-white/50 hover:text-white transition-all">
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mode + Stats */}
      <div className="max-w-lg mx-auto w-full px-4 py-3 flex items-center justify-between">
        <span className="text-xs px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/40">
          {mode === 'daily' ? 'Daily Challenge' : 'Unlimited'}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/30">Streak: <span className="text-emerald-400 font-medium">{streak}</span></span>
          <span className="text-xs text-white/30">Best: <span className="text-amber-400 font-medium">{bestStreak}</span></span>
        </div>
      </div>

      {/* Message Toast */}
      {message && (
        <div className="max-w-lg mx-auto w-full px-4 mb-2">
          <div className="text-center py-2 px-4 rounded-lg bg-white/[0.1] text-sm font-medium text-white">
            {message}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="flex-1 flex items-start justify-center px-4 pt-2">
        <div className={`grid grid-rows-6 gap-[6px] ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
          {rows.map((row, ri) => (
            <div key={ri} className="grid grid-cols-5 gap-[6px]">
              {row.map((cell, ci) => {
                const isRevealed = ri < guesses.length
                const isCurrentRow = ri === guesses.length
                const isTyping = isCurrentRow && cell.letter !== ''
                const isWinRow = gameStatus === 'won' && ri === guesses.length - 1

                return (
                  <div
                    key={ci}
                    className={`w-[56px] h-[56px] sm:w-[62px] sm:h-[62px] flex items-center justify-center border-2 rounded-lg text-xl font-bold transition-all duration-300 ${STATE_COLORS[cell.state]} ${isRevealed ? 'letter-reveal' : ''} ${isTyping ? 'letter-type' : ''} ${isWinRow ? 'win-dance' : ''}`}
                    style={{
                      animationDelay: isRevealed ? `${ci * 120}ms` : isWinRow ? `${ci * 80}ms` : undefined,
                    }}
                  >
                    {cell.letter}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Win/Lose actions */}
      {gameStatus !== 'playing' && (
        <div className="max-w-lg mx-auto w-full px-4 py-3 flex items-center justify-center gap-3">
          {gameStatus === 'won' && (
            <button
              onClick={shareResult}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-medium text-sm hover:bg-emerald-600 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share Result
            </button>
          )}
          {mode === 'unlimited' && (
            <button
              onClick={() => resetGame('unlimited')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-500 text-white font-medium text-sm hover:bg-violet-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              New Word
            </button>
          )}
        </div>
      )}

      {/* On-Screen Keyboard */}
      <div className="max-w-lg mx-auto w-full px-1 pb-4 pt-2">
        {KEYBOARD_ROWS.map((row, ri) => (
          <div key={ri} className="flex justify-center gap-[4px] mb-[4px]">
            {row.map((key) => {
              const isWide = key === 'ENTER' || key === '⌫'
              const state = letterStates[key] || 'empty'
              return (
                <button
                  key={key}
                  onClick={() => handleKey(key)}
                  className={`${isWide ? 'px-3 min-w-[52px]' : 'min-w-[32px] sm:min-w-[36px]'} h-[48px] rounded-lg text-sm font-medium transition-all active:scale-95 ${KEY_COLORS[state]}`}
                >
                  {key}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
