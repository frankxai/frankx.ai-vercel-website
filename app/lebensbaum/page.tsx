'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LebensTree } from '@/components/hoffnung/LebensTree'

export default function LebensbaumPage() {
  const [showTitle, setShowTitle] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowTitle(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-screen h-screen bg-[#070B14] overflow-hidden">
      {/* Cinematic background — faded tree image under interactive canvas */}
      <Image
        src="/images/hoffnung/lebensbaum-hero.png"
        alt=""
        fill
        className="object-cover object-center opacity-20"
        priority
        quality={75}
        sizes="100vw"
      />
      <LebensTree fullscreen />

      {/* Floating title — fades after 4s */}
      <div
        className="absolute top-8 left-8 z-20 transition-opacity duration-1000"
        style={{ opacity: showTitle ? 1 : 0, pointerEvents: showTitle ? 'auto' : 'none' }}
      >
        <h1
          className="text-3xl md:text-4xl font-light tracking-tight text-white/60"
          style={{ fontFamily: 'var(--font-garamond), EB Garamond, serif' }}
        >
          Lebensbaum
        </h1>
        <p
          className="text-sm text-sky-200/40 mt-1 italic"
          style={{ fontFamily: 'var(--font-lora), Lora, serif' }}
        >
          Berühre die Äste
        </p>
      </div>

      {/* Back button */}
      <Link
        href="/hoffnung"
        className="absolute top-8 right-8 z-20 text-white/30 hover:text-white/60 transition-colors duration-300 text-sm"
        style={{ fontFamily: 'var(--font-lora), Lora, serif' }}
      >
        &#8592; Zurück
      </Link>

      {/* Subtle instruction for mobile */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/20 text-xs text-center md:hidden transition-opacity duration-1000"
        style={{ opacity: showTitle ? 1 : 0 }}
      >
        Berühre den Bildschirm
      </div>
    </div>
  )
}
