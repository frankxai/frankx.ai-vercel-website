'use client'

import { useState, useCallback } from 'react'
import Confetti from 'react-confetti'

// Cherry blossom pink confetti colors
const BLOSSOM_COLORS = ['#fda4af', '#f472b6', '#fce7f3', '#be185d', '#fff1f2', '#d4a373']

export function HiddenHeart() {
  const [revealed, setRevealed] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleClick = useCallback(() => {
    if (revealed) return
    setRevealed(true)
    setShowConfetti(true)
    // Stop confetti after 5 seconds
    setTimeout(() => setShowConfetti(false), 5000)
  }, [revealed])

  return (
    <div className="relative py-20 flex flex-col items-center">
      {showConfetti && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 400}
          height={typeof window !== 'undefined' ? window.innerHeight : 800}
          numberOfPieces={150}
          colors={BLOSSOM_COLORS}
          recycle={false}
          gravity={0.08}
          wind={0.01}
          tweenDuration={5000}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 100 }}
        />
      )}

      <button
        onClick={handleClick}
        className="group relative focus:outline-none"
        aria-label="Hidden heart"
      >
        {/* The small heart */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-6 h-6 transition-all duration-700 ${
            revealed
              ? 'text-rose-400 scale-125'
              : 'text-white/[0.08] hover:text-rose-400/30 animate-heart-pulse'
          }`}
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      </button>

      {/* Revealed message */}
      <div
        className={`mt-6 text-center transition-all duration-1000 ${
          revealed
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <p className="font-cursive text-xl md:text-2xl text-rose-300/80">
          You found the hidden heart.
        </p>
        <p className="font-cursive text-xl md:text-2xl text-rose-300/60 mt-1">
          Just like you found mine.
        </p>
      </div>
    </div>
  )
}
