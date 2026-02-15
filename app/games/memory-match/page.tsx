'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  Clock,
  Zap,
  Star,
  Sparkles,
} from 'lucide-react'

// ============================================================================
// TYPES & CONFIG
// ============================================================================

interface Card {
  id: number
  symbol: string
  color: string
  matched: boolean
}

type Difficulty = 'easy' | 'medium' | 'hard'

const difficultyConfig: Record<Difficulty, { pairs: number; cols: string; label: string; description: string }> = {
  easy:   { pairs: 6,  cols: 'grid-cols-3 sm:grid-cols-4', label: 'Easy', description: '6 pairs' },
  medium: { pairs: 10, cols: 'grid-cols-4 sm:grid-cols-5', label: 'Medium', description: '10 pairs' },
  hard:   { pairs: 15, cols: 'grid-cols-5 sm:grid-cols-6', label: 'Hard', description: '15 pairs' },
}

// Symbol pool — distinctive glyphs that work at small sizes on dark bg
const symbolPool = [
  { symbol: '\u2660', color: 'text-violet-400' },   // spade
  { symbol: '\u2665', color: 'text-rose-400' },      // heart
  { symbol: '\u2666', color: 'text-amber-400' },     // diamond
  { symbol: '\u2663', color: 'text-emerald-400' },   // club
  { symbol: '\u2605', color: 'text-yellow-400' },    // star
  { symbol: '\u2736', color: 'text-cyan-400' },      // 6-pointed star
  { symbol: '\u2756', color: 'text-fuchsia-400' },   // diamond minus
  { symbol: '\u273A', color: 'text-orange-400' },    // 16-pointed asterisk
  { symbol: '\u2740', color: 'text-pink-400' },      // flower
  { symbol: '\u2742', color: 'text-lime-400' },      // asterisk
  { symbol: '\u2756', color: 'text-indigo-400' },    // diamond
  { symbol: '\u2726', color: 'text-sky-400' },       // 4-pointed star
  { symbol: '\u2738', color: 'text-teal-400' },      // heavy 8-pointed
  { symbol: '\u2734', color: 'text-red-400' },       // 8-pointed star
  { symbol: '\u2741', color: 'text-blue-400' },      // petal flower
]

// ============================================================================
// GAME LOGIC
// ============================================================================

function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function createDeck(pairs: number): Card[] {
  const selected = symbolPool.slice(0, pairs)
  const cards: Card[] = []
  selected.forEach((s, i) => {
    cards.push({ id: i * 2, symbol: s.symbol, color: s.color, matched: false })
    cards.push({ id: i * 2 + 1, symbol: s.symbol, color: s.color, matched: false })
  })
  return shuffle(cards)
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function getStarRating(moves: number, pairs: number): number {
  const optimal = pairs // minimum moves = number of pairs
  const ratio = moves / optimal
  if (ratio <= 1.5) return 3
  if (ratio <= 2.5) return 2
  return 1
}

// ============================================================================
// CARD COMPONENT
// ============================================================================

function GameCard({
  card,
  isFlipped,
  isDisabled,
  isWrong,
  onClick,
}: {
  card: Card
  isFlipped: boolean
  isDisabled: boolean
  isWrong: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled || card.matched || isFlipped}
      className="relative aspect-square w-full cursor-pointer perspective-[600px] disabled:cursor-default"
      aria-label={isFlipped || card.matched ? `Card: ${card.symbol}` : 'Hidden card'}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{
          rotateY: isFlipped || card.matched ? 180 : 0,
          x: isWrong ? [0, -4, 4, -3, 2, 0] : 0,
        }}
        transition={isWrong
          ? { x: { duration: 0.4, ease: 'easeInOut' }, rotateY: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
          : { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
        }
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Back face (hidden state) */}
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.08] flex items-center justify-center hover:border-white/[0.15] hover:bg-white/[0.05] transition-colors"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-white/[0.06]" />
        </div>

        {/* Front face (revealed state) */}
        <div
          className={`absolute inset-0 rounded-xl border flex items-center justify-center transition-colors duration-200 ${
            card.matched
              ? 'bg-emerald-500/10 border-emerald-500/30'
              : isWrong
              ? 'bg-rose-500/10 border-rose-500/40'
              : 'bg-white/[0.04] border-violet-500/30'
          }`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className={`text-2xl sm:text-3xl md:text-4xl ${card.color} select-none`}>
            {card.symbol}
          </span>
        </div>
      </motion.div>

      {/* Match glow */}
      {card.matched && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-emerald-500/10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.1, 1] }}
          transition={{ duration: 0.6 }}
        />
      )}
    </button>
  )
}

// ============================================================================
// DIFFICULTY SELECTOR
// ============================================================================

function DifficultySelector({
  selected,
  onSelect,
}: {
  selected: Difficulty
  onSelect: (d: Difficulty) => void
}) {
  return (
    <div className="flex gap-2">
      {(Object.keys(difficultyConfig) as Difficulty[]).map((d) => {
        const cfg = difficultyConfig[d]
        const isSelected = d === selected
        return (
          <button
            key={d}
            onClick={() => onSelect(d)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              isSelected
                ? 'bg-violet-500/20 border border-violet-500/40 text-violet-300'
                : 'bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white/70 hover:border-white/[0.12]'
            }`}
          >
            {cfg.label}
            <span className="text-xs ml-1 opacity-60">({cfg.description})</span>
          </button>
        )
      })}
    </div>
  )
}

// ============================================================================
// GAME OVER MODAL
// ============================================================================

function GameOverModal({
  moves,
  time,
  stars,
  pairs,
  onRestart,
  onChangeDifficulty,
}: {
  moves: number
  time: number
  stars: number
  pairs: number
  onRestart: () => void
  onChangeDifficulty: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-sm rounded-2xl bg-[#0a0a12] border border-white/[0.08] p-8 text-center"
      >
        <div className="flex justify-center gap-1 mb-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2 + i * 0.15, type: 'spring', stiffness: 400 }}
            >
              <Star
                className={`w-8 h-8 ${i <= stars ? 'text-amber-400 fill-amber-400' : 'text-white/10'}`}
              />
            </motion.div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-white mb-2">
          {stars === 3 ? 'Perfect!' : stars === 2 ? 'Great job!' : 'Complete!'}
        </h2>
        <p className="text-sm text-white/40 mb-6">
          You matched all {pairs} pairs
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="text-lg font-semibold text-white">{moves}</div>
            <div className="text-xs text-white/40">Moves</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="text-lg font-semibold text-white">{formatTime(time)}</div>
            <div className="text-xs text-white/40">Time</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onRestart}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-violet-500 text-white font-medium hover:bg-violet-600 transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </button>
          <button
            onClick={onChangeDifficulty}
            className="flex-1 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.08] transition-all text-sm font-medium"
          >
            Difficulty
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================================================
// MAIN GAME
// ============================================================================

export default function MemoryMatchPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [cards, setCards] = useState<Card[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [showDifficultyPicker, setShowDifficultyPicker] = useState(true)
  const [wrongPair, setWrongPair] = useState<number[]>([])
  const [lastMatch, setLastMatch] = useState<string>('')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const config = difficultyConfig[difficulty]

  // Initialize deck
  const initGame = useCallback((d: Difficulty) => {
    const cfg = difficultyConfig[d]
    setCards(createDeck(cfg.pairs))
    setFlipped([])
    setMoves(0)
    setTime(0)
    setGameStarted(false)
    setGameComplete(false)
    setIsChecking(false)
    setShowDifficultyPicker(false)
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  // Start timer on first flip
  useEffect(() => {
    if (gameStarted && !gameComplete) {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [gameStarted, gameComplete])

  // Check for game completion
  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.matched)) {
      setGameComplete(true)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [cards])

  // Handle card click
  const handleCardClick = useCallback(
    (index: number) => {
      if (isChecking) return
      if (flipped.includes(index)) return
      if (cards[index].matched) return

      if (!gameStarted) setGameStarted(true)

      const newFlipped = [...flipped, index]
      setFlipped(newFlipped)

      if (newFlipped.length === 2) {
        setMoves((m) => m + 1)
        setIsChecking(true)

        const [first, second] = newFlipped
        if (cards[first].symbol === cards[second].symbol) {
          // Match — celebrate
          setLastMatch(cards[first].symbol)
          setTimeout(() => setLastMatch(''), 600)
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c, i) =>
                i === first || i === second ? { ...c, matched: true } : c
              )
            )
            setFlipped([])
            setIsChecking(false)
          }, 500)
        } else {
          // No match — shake wrong pair
          setWrongPair([first, second])
          setTimeout(() => {
            setWrongPair([])
            setFlipped([])
            setIsChecking(false)
          }, 800)
        }
      }
    },
    [flipped, cards, isChecking, gameStarted]
  )

  const stars = getStarRating(moves, config.pairs)
  const matchedCount = cards.filter((c) => c.matched).length / 2

  // Difficulty picker screen
  if (showDifficultyPicker) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium text-violet-300">Memory Match</span>
          </div>

          <h1 className="text-3xl font-semibold text-white mb-2">Choose your difficulty</h1>
          <p className="text-white/40 mb-8">Match all pairs to win. Fewer moves = more stars.</p>

          <div className="space-y-3">
            {(Object.keys(difficultyConfig) as Difficulty[]).map((d) => {
              const cfg = difficultyConfig[d]
              return (
                <button
                  key={d}
                  onClick={() => {
                    setDifficulty(d)
                    initGame(d)
                  }}
                  className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-violet-500/30 hover:bg-violet-500/5 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white font-medium">{cfg.label}</span>
                      <span className="text-white/30 text-sm ml-2">{cfg.description}</span>
                    </div>
                    <Zap className="w-4 h-4 text-white/20 group-hover:text-violet-400 transition-colors" />
                  </div>
                </button>
              )
            })}
          </div>

          <Link
            href="/games"
            className="inline-flex items-center gap-2 mt-8 text-sm text-white/30 hover:text-white/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Games Lab
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/[0.04] bg-[#030712]/90 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/games"
              className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Games</span>
            </Link>
            <div className="h-4 w-px bg-white/[0.08]" />
            <DifficultySelector
              selected={difficulty}
              onSelect={(d) => {
                setDifficulty(d)
                initGame(d)
              }}
            />
          </div>

          <button
            onClick={() => initGame(difficulty)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-white/50 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-white/50">
              <Zap className="w-4 h-4 text-violet-400" />
              <span className="font-medium text-white">{moves}</span>
              <span>moves</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/50">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span className="font-medium text-white">{formatTime(time)}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-white/50">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="font-medium text-white">
              {matchedCount}/{config.pairs}
            </span>
            <span>matched</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1 rounded-full bg-white/[0.04] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
            initial={{ width: '0%' }}
            animate={{ width: `${(matchedCount / config.pairs) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Game board */}
      <div className="max-w-xl mx-auto px-4 pb-12">
        <div className={`grid ${config.cols} gap-2 sm:gap-3`}>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.035,
                duration: 0.35,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <GameCard
                card={card}
                isFlipped={flipped.includes(index)}
                isDisabled={isChecking}
                isWrong={wrongPair.includes(index)}
                onClick={() => handleCardClick(index)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Game over modal */}
      <AnimatePresence>
        {gameComplete && (
          <GameOverModal
            moves={moves}
            time={time}
            stars={stars}
            pairs={config.pairs}
            onRestart={() => initGame(difficulty)}
            onChangeDifficulty={() => setShowDifficultyPicker(true)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
