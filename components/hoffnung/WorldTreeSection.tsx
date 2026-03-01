'use client'

import Link from 'next/link'
import { ScrollReveal } from '@/components/valentines/ScrollReveal'

const LEAF_COUNT = 12

const leaves = Array.from({ length: LEAF_COUNT }, (_, i) => ({
  left: ((i * 61.8) % 100),
  size: 6 + ((i * 1.7) % 8),
  delay: (i * 1.5) % 12,
  duration: 10 + ((i * 2.3) % 8),
  drift: ((i * 7.3) % 30) - 15,
  isLight: i % 3 === 0,
}))

export function WorldTreeSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Falling golden leaves */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {leaves.map((leaf, i) => (
          <div
            key={i}
            className={leaf.isLight ? 'golden-leaf-light' : 'golden-leaf'}
            style={{
              position: 'absolute',
              left: `${leaf.left}%`,
              top: '-20px',
              width: `${leaf.size}px`,
              height: `${leaf.size * 1.4}px`,
              animationDelay: `${leaf.delay}s`,
              animationDuration: `${leaf.duration}s`,
              '--drift': `${leaf.drift}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <ScrollReveal>
          <h2 className="font-garamond text-3xl md:text-4xl text-white/90 mb-4">
            Der Weltenbaum
          </h2>
          <p className="font-lora text-center text-sky-200/50 mb-8 text-sm">
            The World Tree
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="font-lora text-white/60 leading-relaxed mb-4">
            In den ältesten Mythen der Menschheit steht ein Baum, dessen Wurzeln
            die Unterwelt berühren und dessen Krone die Sterne erreicht.
          </p>
          <p className="font-lora text-white/60 leading-relaxed mb-4">
            Yggdrasil. Der Lebensbaum. Der Weltenbaum.
          </p>
          <p className="font-lora text-white/50 leading-relaxed mb-10 italic">
            Er verbindet alles, was ist, mit allem, was war, und allem, was sein wird.
            Jedes Blatt ein Leben. Jede Wurzel eine Erinnerung. Jeder Ast eine Hoffnung.
          </p>
        </ScrollReveal>

        {/* Tree visual — stylized SVG silhouette */}
        <ScrollReveal delay={0.4}>
          <div className="relative w-48 h-64 mx-auto mb-10 animate-breathe-dawn">
            <svg
              viewBox="0 0 200 280"
              fill="none"
              className="w-full h-full"
              aria-hidden="true"
            >
              {/* Roots */}
              <path
                d="M100 250 Q70 260 40 270 M100 250 Q130 260 160 270 M100 250 Q85 265 60 275 M100 250 Q115 265 140 275"
                stroke="url(#rootGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.4"
              />
              {/* Trunk */}
              <path
                d="M100 250 Q98 200 95 160 Q92 120 100 80"
                stroke="url(#trunkGradient)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Branches */}
              <path
                d="M100 80 Q70 60 45 40 M100 80 Q130 60 155 40 M100 100 Q65 85 35 75 M100 100 Q135 85 165 75 M100 120 Q75 105 50 100 M100 120 Q125 105 150 100"
                stroke="url(#branchGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.7"
              />
              {/* Crown glow */}
              <circle cx="100" cy="60" r="55" fill="url(#crownGlow)" opacity="0.15" />
              {/* Leaf dots */}
              {[
                [45, 38], [155, 38], [35, 73], [165, 73], [50, 98], [150, 98],
                [60, 55], [140, 55], [75, 45], [125, 45], [100, 30],
              ].map(([cx, cy], idx) => (
                <circle
                  key={idx}
                  cx={cx}
                  cy={cy}
                  r="3"
                  fill={idx % 2 === 0 ? '#FCD34D' : '#7DD3FC'}
                  opacity={0.4 + (idx * 0.04)}
                />
              ))}
              <defs>
                <linearGradient id="rootGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B6914" />
                  <stop offset="100%" stopColor="#8B6914" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="trunkGradient" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#8B6914" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
                <linearGradient id="branchGradient" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
                <radialGradient id="crownGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FCD34D" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <Link
            href="/lebensbaum"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full glass-card-dawn text-amber-200/80 hover:text-amber-100 transition-colors duration-300 font-lora text-sm tracking-wide"
          >
            Erlebe den Lebensbaum
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="ml-1"
            >
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
