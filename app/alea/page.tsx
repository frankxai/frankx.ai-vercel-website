'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// ── Data ────────────────────────────────────────────────────────────────────

const BIRTHDAY = new Date('2020-03-21')
const CURRENT_AGE = 6

const EMOJI_PAIRS = ['🦋', '🐬', '🦄', '🌈', '🐱', '🦊', '🐸', '🌻']

const CANVAS_COLORS = [
  '#f43f5e', // rose
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#ec4899', // pink
]

const BIRTHDAY_WISHES = [
  { lang: 'Deutsch', flag: '🇩🇪', text: 'Alles Gute zum Geburtstag, Alea!', sub: 'Heute wirst du 6 Jahre alt!' },
  { lang: 'English', flag: '🇬🇧', text: 'Happy Birthday, Alea!', sub: 'Today you turn 6 years old!' },
  { lang: 'Hrvatski', flag: '🇭🇷', text: 'Sretan rođendan, Alea!', sub: 'Danas puniš 6 godina!' },
  { lang: 'Русский', flag: '🇷🇺', text: 'С днём рождения, Алеа!', sub: 'Сегодня тебе 6 лет!' },
]

const POEMS = [
  {
    title: 'Für Alea',
    lang: '🇩🇪',
    lines: [
      'Ein Stern fiel vom Himmel,',
      'so hell und so klar,',
      'und wurde ein Mädchen —',
      'wunderbar!',
      '',
      'Mit Augen wie Sterne,',
      'mit Lachen wie Wind,',
      'die Welt wird viel schöner,',
      'weil du darin bist, mein Kind.',
      '',
      'Sechs Kerzen auf dem Kuchen stehn,',
      'sechs Jahre — wie die Zeit vergeht!',
      'Doch was du bist, das bleibt bestehen:',
      'ein Licht, das niemals untergeht.',
    ],
  },
  {
    title: 'For Alea',
    lang: '🇬🇧',
    lines: [
      'A little star fell from the sky,',
      'it landed here — and that is why',
      'the flowers bloom a little more,',
      'the ocean sings along the shore.',
      '',
      'You are six years old today,',
      'the world is bright, the world is play.',
      'With every year you learn, you grow —',
      'a universe of things to know.',
      '',
      'And when at night the stars appear,',
      'remember this: they whisper clear —',
      'the bravest hearts are kind and true,',
      'and one of them, dear child, is you.',
    ],
  },
  {
    title: 'Za Aleu',
    lang: '🇭🇷',
    lines: [
      'Mala zvijezda sjaji,',
      'u noći tako toplo —',
      'to si ti, Alea,',
      'srce puno i mokro.',
      '',
      'Šest godina smijeh i igra,',
      'svaki dan je tvoja knjiga.',
      'U svakom listu nova priča,',
      'u tvojim očima — sva veličina.',
    ],
  },
  {
    title: 'Для Алеи',
    lang: '🇷🇺',
    lines: [
      'Маленькая звёздочка упала с небес,',
      'и стала девочкой — о, чудо чудес!',
      '',
      'Шесть лет на свете — шесть лучей,',
      'шесть песен радости твоей.',
      'Расти, сияй, мечтай, играй —',
      'ты маленький, прекрасный рай.',
    ],
  },
]

// ── Wise Words (Valentine's-inspired literary quotes adapted for a child) ───

const WISE_WORDS = [
  {
    quote: 'Und jedem Anfang wohnt ein Zauber inne, der uns beschützt und der uns hilft, zu leben.',
    author: 'Hermann Hesse',
    translation: 'Every beginning holds a magic that protects us and helps us live.',
    accent: 'rose',
  },
  {
    quote: 'Man sieht nur mit dem Herzen gut. Das Wesentliche ist für die Augen unsichtbar.',
    author: 'Antoine de Saint-Exupéry',
    translation: 'One sees clearly only with the heart. What is essential is invisible to the eye.',
    accent: 'gold',
  },
  {
    quote: 'Be yourself; everyone else is already taken.',
    author: 'Oscar Wilde',
    accent: 'violet',
  },
]

const STORIES = [
  {
    title: 'The Little Star Who Wanted to Dance',
    emoji: '⭐',
    text: 'Once upon a time, in a sky full of stars, there was one little star who didn\'t want to just twinkle. She wanted to dance! Every night she would wiggle and spin, and the other stars would giggle. "Stars don\'t dance!" they said. But the little star kept trying. One night, she spun so fast that she left a trail of light across the sky — and all the children below looked up and said, "Look! A shooting star! Make a wish!" And from that night on, every dancing star became a wish for someone below.',
  },
  {
    title: 'Der Regenbogenfisch und die Mondmuschel',
    emoji: '🐠',
    text: 'Tief im Meer lebte ein kleiner Fisch mit Schuppen so bunt wie ein Regenbogen. Eines Tages fand er eine Muschel, die im Mondlicht leuchtete. "Was bist du?" fragte der Fisch. "Ich bin eine Mondmuschel," flüsterte sie. "Wenn du mich ans Ohr hältst, hörst du die Träume aller Kinder der Welt." Der kleine Fisch hörte ganz genau hin — und lächelte, denn er hörte ein kleines Mädchen namens Alea, das davon träumte, unter dem Meer zu schwimmen.',
  },
]

// ── Floating Decorations ────────────────────────────────────────────────────

const FLOATING_ITEMS = ['🎈', '⭐', '🦋', '💫', '🌸', '✨', '🎀', '🌟', '💖', '🎂']

function FloatingDecorations() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {FLOATING_ITEMS.map((emoji, i) => (
        <div
          key={i}
          className="absolute animate-float text-2xl sm:text-3xl"
          style={{
            left: `${8 + i * 9}%`,
            animationDelay: `${i * 1.3}s`,
            animationDuration: `${8 + (i % 4) * 2}s`,
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  )
}

// ── Memory Game ─────────────────────────────────────────────────────────────

type Card = { id: number; emoji: string; flipped: boolean; matched: boolean }

function createDeck(): Card[] {
  const pairs = [...EMOJI_PAIRS, ...EMOJI_PAIRS]
  // Shuffle
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pairs[i], pairs[j]] = [pairs[j], pairs[i]]
  }
  return pairs.map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }))
}

function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(createDeck)
  const [selected, setSelected] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)
  const lockRef = useRef(false)

  const handleFlip = useCallback(
    (id: number) => {
      if (lockRef.current) return
      const card = cards[id]
      if (card.flipped || card.matched) return

      const next = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c))
      const nextSelected = [...selected, id]
      setCards(next)
      setSelected(nextSelected)

      if (nextSelected.length === 2) {
        setMoves((m) => m + 1)
        lockRef.current = true
        const [a, b] = nextSelected
        if (next[a].emoji === next[b].emoji) {
          // Match!
          setTimeout(() => {
            setCards((prev) => {
              const updated = prev.map((c) =>
                c.id === a || c.id === b ? { ...c, matched: true } : c
              )
              if (updated.every((c) => c.matched)) setWon(true)
              return updated
            })
            setSelected([])
            lockRef.current = false
          }, 400)
        } else {
          // No match — flip back
          setTimeout(() => {
            setCards((prev) => prev.map((c) => (c.id === a || c.id === b ? { ...c, flipped: false } : c)))
            setSelected([])
            lockRef.current = false
          }, 900)
        }
      }
    },
    [cards, selected]
  )

  const reset = () => {
    setCards(createDeck())
    setSelected([])
    setMoves(0)
    setWon(false)
    lockRef.current = false
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-lg font-medium text-slate-600">
          Züge: <span className="font-bold text-violet-600">{moves}</span>
        </p>
        <button
          onClick={reset}
          className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-200 active:scale-95"
        >
          Nochmal! 🔄
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => handleFlip(card.id)}
            className={`aspect-square rounded-2xl text-3xl sm:text-4xl font-bold shadow-md transition-all duration-300 ${
              card.flipped || card.matched
                ? 'bg-white border-2 border-violet-200 scale-100'
                : 'bg-gradient-to-br from-violet-400 to-pink-400 text-white hover:scale-105 active:scale-95'
            } ${card.matched ? 'opacity-70 ring-2 ring-emerald-300' : ''}`}
            whileTap={{ scale: 0.9 }}
          >
            {card.flipped || card.matched ? card.emoji : '?'}
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {won && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 rounded-2xl bg-gradient-to-r from-emerald-100 to-cyan-100 p-6 text-center"
          >
            <p className="text-3xl">🎉🌟🎉</p>
            <p className="mt-2 text-xl font-bold text-emerald-700">Gewonnen!</p>
            <p className="text-emerald-600">
              Du hast es in {moves} Zügen geschafft!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Drawing Canvas ──────────────────────────────────────────────────────────

function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [color, setColor] = useState(CANVAS_COLORS[0])
  const [brushSize, setBrushSize] = useState(8)
  const isDrawing = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })

  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    if ('touches' in e) {
      const touch = e.touches[0]
      return { x: (touch.clientX - rect.left) * scaleX, y: (touch.clientY - rect.top) * scaleY }
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY }
  }

  const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    isDrawing.current = true
    lastPos.current = getPos(e)
  }

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    if (!isDrawing.current) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return
    const pos = getPos(e)
    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = color
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    lastPos.current = pos
  }

  const stopDraw = () => {
    isDrawing.current = false
  }

  const clear = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  useEffect(() => {
    clear()
  }, [])

  return (
    <div className="mx-auto max-w-lg">
      {/* Color picker */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
        {CANVAS_COLORS.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`h-12 w-12 rounded-full border-4 transition-transform active:scale-90 ${
              color === c ? 'border-slate-800 scale-110' : 'border-white shadow-md'
            }`}
            style={{ backgroundColor: c }}
            aria-label={`Color ${c}`}
          />
        ))}
        <button
          onClick={() => setColor('#ffffff')}
          className={`flex h-12 w-12 items-center justify-center rounded-full border-4 text-lg shadow-md transition-transform active:scale-90 ${
            color === '#ffffff' ? 'border-slate-800 scale-110' : 'border-slate-200'
          }`}
          style={{ backgroundColor: '#ffffff' }}
          aria-label="Eraser"
        >
          🧹
        </button>
      </div>
      {/* Brush size */}
      <div className="mb-4 flex items-center justify-center gap-3">
        <span className="text-sm text-slate-500">Klein</span>
        <input
          type="range"
          min={3}
          max={24}
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="h-2 w-32 appearance-none rounded-full bg-slate-200 accent-violet-500"
        />
        <span className="text-sm text-slate-500">Groß</span>
        <button
          onClick={clear}
          className="ml-4 rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-200 active:scale-95"
        >
          Neu 🗑️
        </button>
      </div>
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={600}
        height={450}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
        className="w-full cursor-crosshair rounded-2xl border-4 border-dashed border-violet-200 bg-white shadow-inner touch-none"
        style={{ aspectRatio: '4/3' }}
      />
    </div>
  )
}

// ── Star Catcher Mini-Game ──────────────────────────────────────────────────

function StarCatcher() {
  const [score, setScore] = useState(0)
  const [stars, setStars] = useState<{ id: number; x: number; y: number; emoji: string }[]>([])
  const [playing, setPlaying] = useState(false)
  const nextId = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const spawnStar = useCallback(() => {
    const emojis = ['⭐', '🌟', '💫', '✨', '🌈']
    setStars((prev) => [
      ...prev.slice(-12),
      {
        id: nextId.current++,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 70,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      },
    ])
  }, [])

  const start = () => {
    setScore(0)
    setStars([])
    setPlaying(true)
    intervalRef.current = setInterval(spawnStar, 800)
    setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setPlaying(false)
    }, 25000)
  }

  const catchStar = (id: number) => {
    setScore((s) => s + 1)
    setStars((prev) => prev.filter((s) => s.id !== id))
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-lg font-medium text-slate-600">
          Sterne: <span className="font-bold text-amber-600">{score}</span>
        </p>
        {!playing && (
          <button
            onClick={start}
            className="rounded-full bg-amber-100 px-5 py-2 text-sm font-bold text-amber-700 transition hover:bg-amber-200 active:scale-95"
          >
            {score > 0 ? 'Nochmal! ⭐' : 'Spielen! ⭐'}
          </button>
        )}
        {playing && (
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-600">
            Fang die Sterne!
          </span>
        )}
      </div>
      <div className="relative h-64 overflow-hidden rounded-2xl border-4 border-dashed border-amber-200 bg-gradient-to-b from-indigo-950 via-indigo-900 to-purple-950">
        {/* Starfield background dots */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`bg-${i}`}
            className="absolute h-1 w-1 rounded-full bg-white/30"
            style={{ left: `${5 + i * 4.5}%`, top: `${10 + (i * 17) % 80}%` }}
          />
        ))}
        <AnimatePresence>
          {stars.map((star) => (
            <motion.button
              key={star.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 2 }}
              transition={{ duration: 0.3 }}
              onClick={() => catchStar(star.id)}
              className="absolute text-3xl transition-transform active:scale-150"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
            >
              {star.emoji}
            </motion.button>
          ))}
        </AnimatePresence>
        {!playing && score === 0 && (
          <div className="flex h-full items-center justify-center">
            <p className="text-lg text-white/60">Drück &quot;Spielen&quot; und fang die Sterne!</p>
          </div>
        )}
        {!playing && score > 0 && (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="text-4xl">🌟</p>
            <p className="mt-2 text-xl font-bold text-amber-300">{score} Sterne gefangen!</p>
            <p className="text-white/60">Super gemacht!</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Section Wrapper ─────────────────────────────────────────────────────────

function Section({
  id,
  emoji,
  title,
  bg,
  children,
}: {
  id: string
  emoji: string
  title: string
  bg?: string
  children: React.ReactNode
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={`rounded-3xl p-6 sm:p-10 ${bg || 'bg-white/70'} shadow-lg backdrop-blur-sm`}
    >
      <h2 className="mb-6 text-center text-2xl sm:text-3xl font-bold text-slate-800">
        <span className="mr-2">{emoji}</span>
        {title}
      </h2>
      {children}
    </motion.section>
  )
}

// ── Main Page ───────────────────────────────────────────────────────────────

export default function AleaPage() {
  return (
    <>
      {/* Global CSS for floating animation */}
      <style jsx global>{`
        @keyframes float-up {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-10vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float-up linear infinite;
        }
      `}</style>

      <div className="relative min-h-screen bg-gradient-to-b from-rose-50 via-amber-50 via-60% to-sky-50">
        <FloatingDecorations />

        <div className="relative z-10 mx-auto max-w-3xl space-y-8 px-4 py-12 sm:py-20">
          {/* ── Hero ───────────────────────────────────────────────── */}
          <motion.header
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center"
          >
            <div className="mb-6 text-6xl sm:text-8xl">🎂</div>
            <h1 className="bg-gradient-to-r from-rose-600 via-violet-600 to-sky-600 bg-clip-text text-4xl sm:text-6xl font-extrabold leading-tight text-transparent">
              Alles Gute zum Geburtstag, Alea!
            </h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              className="mx-auto mt-8 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-pink-400 shadow-xl shadow-violet-200"
            >
              <span className="text-5xl font-black text-white">{CURRENT_AGE}</span>
            </motion.div>
            <p className="mt-4 text-lg text-slate-500">Jahre voller Wunder</p>
          </motion.header>

          {/* ── Multilingual Wishes ────────────────────────────────── */}
          <Section id="wishes" emoji="🌍" title="Geburtstagswünsche" bg="bg-white/60">
            <div className="grid gap-4 sm:grid-cols-2">
              {BIRTHDAY_WISHES.map((wish) => (
                <motion.div
                  key={wish.lang}
                  whileHover={{ scale: 1.03 }}
                  className="rounded-2xl border border-white/60 bg-white/80 p-5 text-center shadow-sm transition"
                >
                  <p className="text-3xl">{wish.flag}</p>
                  <p className="mt-2 text-lg font-bold text-slate-800">{wish.text}</p>
                  <p className="mt-1 text-sm text-slate-500">{wish.sub}</p>
                  <p className="mt-1 text-xs font-medium text-slate-400">{wish.lang}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ── Poetry Garden ──────────────────────────────────────── */}
          <Section id="poems" emoji="🌷" title="Gedichte für Alea" bg="bg-gradient-to-br from-rose-50/80 to-violet-50/80">
            <div className="space-y-8">
              {POEMS.map((poem) => (
                <div key={poem.title} className="rounded-2xl bg-white/70 p-6 shadow-sm">
                  <h3 className="mb-3 text-center text-lg font-bold text-rose-600">
                    {poem.lang} {poem.title}
                  </h3>
                  <div className="space-y-1 text-center">
                    {poem.lines.map((line, i) =>
                      line === '' ? (
                        <div key={i} className="h-3" />
                      ) : (
                        <p key={i} className="font-serif text-lg italic text-slate-700">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Memory Game (FIRST — engagement hook for a child) ── */}
          <Section id="game" emoji="🧩" title="Memory Spiel" bg="bg-gradient-to-br from-violet-50/80 to-pink-50/80">
            <p className="mb-6 text-center text-base text-slate-600">
              Finde die passenden Paare! Tippe auf die Karten.
            </p>
            <MemoryGame />
          </Section>

          {/* ── Star Catcher ───────────────────────────────────────── */}
          <Section id="stars" emoji="🌟" title="Sterne Fangen" bg="bg-gradient-to-br from-amber-50/80 to-orange-50/80">
            <p className="mb-6 text-center text-base text-slate-600">
              Tippe so schnell du kannst auf die Sterne!
            </p>
            <StarCatcher />
          </Section>

          {/* ── Drawing Studio ─────────────────────────────────────── */}
          <Section id="draw" emoji="🎨" title="Malstudio" bg="bg-gradient-to-br from-sky-50/80 to-emerald-50/80">
            <p className="mb-6 text-center text-base text-slate-600">
              Mal ein Bild! Wähle eine Farbe und zeichne mit dem Finger.
            </p>
            <DrawingCanvas />
          </Section>

          {/* ── Stories ────────────────────────────────────────────── */}
          <Section id="stories" emoji="📖" title="Geschichten" bg="bg-gradient-to-br from-amber-50/80 to-rose-50/80">
            <div className="space-y-6">
              {STORIES.map((story) => (
                <div key={story.title} className="rounded-2xl bg-white/70 p-6 shadow-sm">
                  <h3 className="mb-3 flex items-center justify-center gap-2 text-lg font-bold text-amber-700">
                    <span className="text-2xl">{story.emoji}</span>
                    {story.title}
                  </h3>
                  <p className="text-base leading-relaxed text-slate-700">{story.text}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Music from Uncle Frank ─────────────────────────────── */}
          <Section id="music" emoji="🎵" title="Musik von Onkel Frank" bg="bg-gradient-to-br from-cyan-50/80 to-violet-50/80">
            <p className="mb-6 text-center text-slate-500">
              Onkel Frank macht Musik mit KI. Hier sind Lieder zum Träumen und Tanzen!
            </p>

            {/* Golden Frequencies — healing/ambient */}
            <h3 className="mb-3 text-lg font-bold text-amber-600">✨ Golden Frequencies — Zum Träumen</h3>
            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              {[
                { title: 'Golden Frequencies', desc: 'Sanfte Klänge zum Einschlafen', sunoId: '5281ac63-ed5a-4933-b8ae-10d2312f3c1a', emoji: '🌙' },
                { title: 'Golden Frequency Choir', desc: 'Ein Chor aus aller Welt', sunoId: '69fa45d3-8d45-4f6d-9424-9361cc95fe0a', emoji: '🌍' },
                { title: 'Golden Frequencies v4', desc: 'Heilende Klänge (528Hz)', sunoId: '3841ae2a-1147-4adb-8b4e-c0491d554fee', emoji: '💫' },
                { title: 'Golden Frequency Choir (Extended)', desc: 'Die lange Version zum Entspannen', sunoId: 'b1c58d80-f4d6-45aa-8ffc-c531be288a5a', emoji: '🎶' },
              ].map((t) => (
                <a
                  key={t.sunoId}
                  href={`https://suno.com/song/${t.sunoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl bg-white/70 p-4 shadow-sm transition hover:bg-white hover:shadow-md active:scale-95"
                >
                  <span className="text-2xl">{t.emoji}</span>
                  <div>
                    <p className="font-bold text-slate-800 group-hover:text-amber-600">{t.title}</p>
                    <p className="text-xs text-slate-400">{t.desc}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Magical & Orchestral */}
            <h3 className="mb-3 text-lg font-bold text-violet-600">🦄 Magische Musik — Zum Tanzen</h3>
            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              {[
                { title: 'Magical Times', desc: 'Symphonisch und magisch', sunoId: '74856905-1e50-419c-ad15-92081a743511', emoji: '✨' },
                { title: 'Lumina', desc: 'Orchestral und voller Seele', sunoId: '1fc13c04-a7b3-427d-bff0-cac92ee524ae', emoji: '🌟' },
                { title: 'Arcanean Legends', desc: 'Wie aus einem Märchenfilm', sunoId: 'eb702834-22c6-44b3-8d5b-bba83c1e9801', emoji: '🏰' },
                { title: 'Arcanean Starlight', desc: 'Sternenlicht und Abenteuer', sunoId: '5d17255b-f997-4f4c-82ea-9fa1d5aa982a', emoji: '⭐' },
              ].map((t) => (
                <a
                  key={t.sunoId}
                  href={`https://suno.com/song/${t.sunoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl bg-white/70 p-4 shadow-sm transition hover:bg-white hover:shadow-md active:scale-95"
                >
                  <span className="text-2xl">{t.emoji}</span>
                  <div>
                    <p className="font-bold text-slate-800 group-hover:text-violet-600">{t.title}</p>
                    <p className="text-xs text-slate-400">{t.desc}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Full playlist link */}
            <div className="text-center">
              <a
                href="https://suno.com/playlist/77e7f75f-24b4-4c8f-b02c-10eff76a7052"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-amber-100 px-6 py-3 font-medium text-amber-700 transition hover:bg-amber-200 active:scale-95"
              >
                Alle Golden Frequencies anhören 🎧
              </a>
            </div>
          </Section>

          {/* ── Learn Music ────────────────────────────────────────── */}
          <Section id="learn-music" emoji="🎹" title="Musik Lernen" bg="bg-gradient-to-br from-pink-50/80 to-amber-50/80">
            <p className="mb-6 text-center text-slate-500">
              Möchtest du selbst Musik machen? Onkel Frank hat die besten Lehrer gefunden!
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/music/learn/piano"
                className="group rounded-2xl bg-gradient-to-br from-rose-100 to-pink-50 border border-rose-200 p-6 shadow-sm transition hover:shadow-lg hover:scale-[1.02] active:scale-95"
              >
                <div className="text-center">
                  <span className="text-5xl">🎹</span>
                  <h3 className="mt-2 text-xl font-bold text-rose-700">Klavier</h3>
                  <p className="mt-1 text-sm text-slate-500">88 Tasten, unendliche Möglichkeiten</p>
                  <p className="mt-3 text-xs font-medium text-rose-500">4 Lehrer · 6 erste Lieder · Übe-Tipps →</p>
                </div>
              </Link>
              <Link
                href="/music/learn/violin"
                className="group rounded-2xl bg-gradient-to-br from-violet-100 to-purple-50 border border-violet-200 p-6 shadow-sm transition hover:shadow-lg hover:scale-[1.02] active:scale-95"
              >
                <div className="text-center">
                  <span className="text-5xl">🎻</span>
                  <h3 className="mt-2 text-xl font-bold text-violet-700">Geige</h3>
                  <p className="mt-1 text-sm text-slate-500">Die Stimme des Orchesters</p>
                  <p className="mt-3 text-xs font-medium text-violet-500">4 Lehrer · 6 erste Stücke · Inspiration →</p>
                </div>
              </Link>
              <Link
                href="/music/learn"
                className="group rounded-2xl bg-gradient-to-br from-amber-100 to-orange-50 border border-amber-200 p-6 shadow-sm transition hover:shadow-lg hover:scale-[1.02] active:scale-95"
              >
                <div className="text-center">
                  <span className="text-5xl">🎸</span>
                  <h3 className="mt-2 text-xl font-bold text-amber-700">Gitarre</h3>
                  <p className="mt-1 text-sm text-slate-500">Drei Akkorde und die Wahrheit</p>
                  <p className="mt-3 text-xs font-medium text-amber-500">Alle Instrumente entdecken →</p>
                </div>
              </Link>
              <Link
                href="/music/learn"
                className="group rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 border border-emerald-200 p-6 shadow-sm transition hover:shadow-lg hover:scale-[1.02] active:scale-95"
              >
                <div className="text-center">
                  <span className="text-5xl">🎤</span>
                  <h3 className="mt-2 text-xl font-bold text-emerald-700">Singen</h3>
                  <p className="mt-1 text-sm text-slate-500">Dein erstes Instrument — deine Stimme</p>
                  <p className="mt-3 text-xs font-medium text-emerald-500">Alle Instrumente entdecken →</p>
                </div>
              </Link>
            </div>
          </Section>

          {/* ── Language Corner ─────────────────────────────────────── */}
          <Section id="languages" emoji="🗣️" title="Sprachen Ecke" bg="bg-gradient-to-br from-emerald-50/80 to-cyan-50/80">
            <p className="mb-6 text-center text-slate-500">
              Alea spricht viele Sprachen! Hier sind einige Wörter zum Üben.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { de: 'Schmetterling', en: 'Butterfly', hr: 'Leptir', ru: 'Бабочка', emoji: '🦋' },
                { de: 'Stern', en: 'Star', hr: 'Zvijezda', ru: 'Звезда', emoji: '⭐' },
                { de: 'Regenbogen', en: 'Rainbow', hr: 'Duga', ru: 'Радуга', emoji: '🌈' },
                { de: 'Mond', en: 'Moon', hr: 'Mjesec', ru: 'Луна', emoji: '🌙' },
                { de: 'Blume', en: 'Flower', hr: 'Cvijet', ru: 'Цветок', emoji: '🌸' },
                { de: 'Herz', en: 'Heart', hr: 'Srce', ru: 'Сердце', emoji: '💖' },
              ].map((word) => (
                <div key={word.de} className="flex items-center gap-3 rounded-2xl bg-white/70 p-4 shadow-sm">
                  <span className="text-3xl">{word.emoji}</span>
                  <div className="text-sm leading-relaxed">
                    <p><span className="font-bold text-slate-800">🇩🇪</span> {word.de}</p>
                    <p><span className="font-bold text-slate-800">🇬🇧</span> {word.en}</p>
                    <p><span className="font-bold text-slate-800">🇭🇷</span> {word.hr}</p>
                    <p><span className="font-bold text-slate-800">🇷🇺</span> {word.ru}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── From Uncle Frank ────────────────────────────────────── */}
          <Section id="uncle" emoji="💌" title="Von Onkel Frank" bg="bg-gradient-to-br from-rose-50/80 to-amber-50/80">
            <div className="rounded-2xl bg-white/80 p-6 sm:p-8 shadow-sm">
              <div className="prose prose-slate mx-auto max-w-none text-center">
                <p className="text-lg leading-relaxed">
                  Liebe Alea,
                </p>
                <p className="mt-4 text-base leading-relaxed">
                  heute wirst du sechs Jahre alt. Sechs! Das sind sechs Sommer,
                  sechs Weihnachten, und unzählige Abenteuer.
                </p>
                <p className="mt-4 text-base leading-relaxed">
                  Diese Seite ist mein Geschenk an dich. Jedes Jahr an deinem
                  Geburtstag kommt etwas Neues dazu — neue Spiele, neue Geschichten,
                  neue Rätsel. Wenn du größer wirst, wachsen die Abenteuer mit dir.
                </p>
                <p className="mt-4 text-base leading-relaxed">
                  Du bist mutig, klug und wunderbar. Vergiss das nie.
                </p>
                <p className="mt-6 text-lg font-bold text-rose-500">
                  Dein Onkel Frank 💖
                </p>
              </div>
            </div>
          </Section>

          {/* ── Wise Words (for when she's older) ─────────────────── */}
          <Section id="wisdom" emoji="📜" title="Weise Worte" bg="bg-gradient-to-br from-amber-50/80 to-white/80">
            <p className="mb-6 text-center text-sm text-slate-600">
              Worte von klugen Menschen — für dich, wenn du sie eines Tages liest.
            </p>
            <div className="space-y-4">
              {WISE_WORDS.map((w) => (
                <div
                  key={w.author}
                  className={`rounded-2xl border-l-4 bg-white/70 p-5 shadow-sm ${
                    w.accent === 'rose'
                      ? 'border-rose-300'
                      : w.accent === 'gold'
                        ? 'border-amber-300'
                        : 'border-violet-300'
                  }`}
                >
                  <p className="font-serif text-lg italic leading-relaxed text-slate-700">
                    &ldquo;{w.quote}&rdquo;
                  </p>
                  {'translation' in w && w.translation && (
                    <p className="mt-2 text-base text-slate-600">{w.translation}</p>
                  )}
                  <p className="mt-2 text-sm font-medium text-slate-600">— {w.author}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Growing With You ────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-violet-100/60 to-rose-100/60 p-6 sm:p-10 text-center shadow-lg backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold text-violet-800">🌱 Diese Seite wächst mit dir</h2>
            <p className="mt-4 text-slate-600">
              Jedes Jahr an deinem Geburtstag kommt etwas Neues hinzu.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {[
                { age: 6, label: 'Spiele & Gedichte', active: true },
                { age: 7, label: 'Rätsel & Geschichten', active: false },
                { age: 8, label: 'Musik machen', active: false },
                { age: 9, label: 'Erste Projekte', active: false },
                { age: 10, label: 'Meditation & Achtsamkeit', active: false },
              ].map((year) => (
                <div
                  key={year.age}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    year.active
                      ? 'bg-violet-500 text-white shadow-md'
                      : 'bg-white/60 text-slate-400'
                  }`}
                >
                  {year.age} — {year.label}
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── Footer ─────────────────────────────────────────────── */}
          <footer className="pb-8 text-center">
            <p className="text-sm text-slate-400">
              Made with 💖 by{' '}
              <Link href="/" className="text-violet-400 hover:text-violet-600">
                Uncle Frank
              </Link>
            </p>
            <p className="mt-1 text-xs text-slate-300">frankx.ai/alea</p>
          </footer>
        </div>
      </div>
    </>
  )
}
