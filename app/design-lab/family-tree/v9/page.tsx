'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { familyNodes, familyEdges, sideColors } from '@/lib/family-tree-data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export default function FamilyTreeV9() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const frankSectionRef = useRef<HTMLDivElement>(null)
  const parentsSectionRef = useRef<HTMLDivElement>(null)
  const gorteSectionRef = useRef<HTMLDivElement>(null)
  const riemerSectionRef = useRef<HTMLDivElement>(null)
  const fullTreeRef = useRef<HTMLDivElement>(null)

  // Card refs
  const frankCardRef = useRef<HTMLDivElement>(null)
  const tienCardRef = useRef<HTMLDivElement>(null)
  const doraCardRef = useRef<HTMLDivElement>(null)
  const witaliCardRef = useRef<HTMLDivElement>(null)
  const davidCardRef = useRef<HTMLDivElement>(null)
  const dorotheaCardRef = useRef<HTMLDivElement>(null)
  const alexanderCardRef = useRef<HTMLDivElement>(null)
  const paulinaCardRef = useRef<HTMLDivElement>(null)

  // Line refs
  const frankTienLineRef = useRef<SVGPathElement>(null)
  const parentsLineRef = useRef<SVGPathElement>(null)
  const doraParentsLineRef = useRef<SVGPathElement>(null)
  const witaliParentsLineRef = useRef<SVGPathElement>(null)
  const gorteLineRef = useRef<SVGPathElement>(null)
  const riemerLineRef = useRef<SVGPathElement>(null)

  // Background layer refs
  const bgLayer1Ref = useRef<HTMLDivElement>(null)
  const bgLayer2Ref = useRef<HTMLDivElement>(null)
  const bgLayer3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([frankCardRef.current, tienCardRef.current], { x: (i) => i === 0 ? -600 : 600, opacity: 0 })
      gsap.set([doraCardRef.current, witaliCardRef.current], { y: 100, opacity: 0 })
      gsap.set([davidCardRef.current, dorotheaCardRef.current], { scale: 0.8, opacity: 0 })
      gsap.set([alexanderCardRef.current, paulinaCardRef.current], { scale: 0.8, opacity: 0 })

      // Hero section - parallax background with pinning
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.set(bgLayer1Ref.current, { y: progress * 100 })
          gsap.set(bgLayer2Ref.current, { y: progress * 200 })
          gsap.set(bgLayer3Ref.current, { y: progress * 300 })
        },
      })

      // Frank section - cards fly in from sides
      const frankTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: frankSectionRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
      })

      frankTimeline
        .to(frankCardRef.current, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0)
        .to(tienCardRef.current, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0)
        .to(frankTienLineRef.current, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, 0.5)

      // Pin Frank section briefly
      ScrollTrigger.create({
        trigger: frankSectionRef.current,
        start: 'top top',
        end: '+=50%',
        pin: true,
      })

      // Parents section - animate up with stagger
      const parentsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: parentsSectionRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
      })

      parentsTimeline
        .to(doraCardRef.current, { y: 0, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.5)' }, 0)
        .to(witaliCardRef.current, { y: 0, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.5)' }, 0.2)
        .to(parentsLineRef.current, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, 0.5)
        .to(doraParentsLineRef.current, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut' }, 0.8)
        .to(witaliParentsLineRef.current, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut' }, 0.8)

      // Gorte grandparents - fade in with golden glow
      const gorteTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: gorteSectionRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
      })

      gorteTimeline
        .to(davidCardRef.current, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.4)' }, 0)
        .to(dorotheaCardRef.current, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.4)' }, 0.15)
        .to(gorteLineRef.current, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, 0.5)

      // Riemer grandparents - fade in with cyan glow
      const riemerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: riemerSectionRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
      })

      riemerTimeline
        .to(alexanderCardRef.current, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.4)' }, 0)
        .to(paulinaCardRef.current, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.4)' }, 0.15)
        .to(riemerLineRef.current, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, 0.5)

      // Full tree reveal - camera pull back effect
      const fullTreeTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: fullTreeRef.current,
          start: 'top center',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      fullTreeTimeline.to(fullTreeRef.current, {
        scale: 0.85,
        duration: 1,
        ease: 'power2.inOut',
      })
    }, containerRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const frank = familyNodes.find((n) => n.id === 'frank-riemer')!
  const tien = familyNodes.find((n) => n.id === 'tien')!
  const dora = familyNodes.find((n) => n.id === 'dora-riemer')!
  const witali = familyNodes.find((n) => n.id === 'witali-riemer')!
  const david = familyNodes.find((n) => n.id === 'david-gorte')!
  const dorothea = familyNodes.find((n) => n.id === 'dorothea-gorte')!
  const alexander = familyNodes.find((n) => n.id === 'alexander-riemer')!
  const paulina = familyNodes.find((n) => n.id === 'paulina-riemer')!

  const renderCard = (
    node: typeof frank,
    ref: React.RefObject<HTMLDivElement>,
    className?: string
  ) => {
    const colors = sideColors[node.side]
    return (
      <div
        ref={ref}
        className={`relative p-6 rounded-2xl backdrop-blur-xl border ${colors.border} ${className}`}
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
          boxShadow: `0 0 40px ${colors.hex}40, 0 8px 32px rgba(0,0,0,0.4)`,
        }}
      >
        <div className="space-y-2">
          <div className={`text-sm font-medium ${colors.text} uppercase tracking-wider`}>
            {node.role}
          </div>
          <div className="text-2xl font-bold text-white">{node.name}</div>
          {node.bornName && (
            <div className="text-sm text-white/50">{node.bornName}</div>
          )}
          {node.location && (
            <div className="text-sm text-white/60 flex items-center gap-2 mt-3">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {node.location}
            </div>
          )}
          {node.details && (
            <div className="text-xs text-white/40 space-y-1 mt-3 border-t border-white/10 pt-3">
              {node.details.map((detail, i) => (
                <div key={i}>{detail}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0f] text-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Parallax Background Layers */}
        <div
          ref={bgLayer1Ref}
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div
          ref={bgLayer2Ref}
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139,92,246,0.3) 1px, transparent 0)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div
          ref={bgLayer3Ref}
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(6,182,212,0.3) 1px, transparent 0)`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center space-y-6 px-6">
          <div className="text-sm font-medium text-white/50 uppercase tracking-[0.3em]">
            V9 — Cinematic Scroll
          </div>
          <h1
            className="text-8xl font-bold bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #f59e0b 100%)',
            }}
          >
            Familie Riemer
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            GSAP ScrollTrigger experience
          </p>
          <div className="pt-8 flex flex-col items-center gap-4">
            <div className="text-xs text-white/40 uppercase tracking-widest">Scroll to explore</div>
            <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* Frank & Tien Section */}
      <section ref={frankSectionRef} className="relative min-h-screen flex items-center justify-center px-6">
        <div className="relative max-w-6xl w-full">
          <div className="grid grid-cols-2 gap-12">
            {renderCard(frank, frankCardRef)}
            {renderCard(tien, tienCardRef)}
          </div>

          {/* Connection Line */}
          <svg className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 pointer-events-none">
            <path
              ref={frankTienLineRef}
              d="M 320 64 L 640 64"
              stroke="#f43f5e"
              strokeWidth="3"
              fill="none"
              strokeDasharray="320"
              strokeDashoffset="320"
              style={{ filter: 'drop-shadow(0 0 8px #f43f5e)' }}
            />
          </svg>
        </div>
      </section>

      {/* Parents Section */}
      <section ref={parentsSectionRef} className="relative min-h-screen flex items-center justify-center px-6 py-24">
        <div className="relative max-w-6xl w-full">
          <div className="grid grid-cols-2 gap-12 mb-24">
            {renderCard(dora, doraCardRef)}
            {renderCard(witali, witaliCardRef)}
          </div>

          <div className="grid grid-cols-1 gap-12">
            {renderCard(frank, useRef(null), 'mx-auto max-w-md opacity-20')}
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Parents to Parents */}
            <path
              ref={parentsLineRef}
              d="M 320 160 L 640 160"
              stroke="#10b981"
              strokeWidth="3"
              fill="none"
              strokeDasharray="320"
              strokeDashoffset="320"
              style={{ filter: 'drop-shadow(0 0 8px #10b981)' }}
            />
            {/* Dora to Frank */}
            <path
              ref={doraParentsLineRef}
              d="M 320 240 L 320 420 L 480 420"
              stroke="#10b981"
              strokeWidth="2"
              fill="none"
              strokeDasharray="340"
              strokeDashoffset="340"
              style={{ filter: 'drop-shadow(0 0 6px #10b981)' }}
            />
            {/* Witali to Frank */}
            <path
              ref={witaliParentsLineRef}
              d="M 640 240 L 640 420 L 480 420"
              stroke="#10b981"
              strokeWidth="2"
              fill="none"
              strokeDasharray="340"
              strokeDashoffset="340"
              style={{ filter: 'drop-shadow(0 0 6px #10b981)' }}
            />
          </svg>
        </div>
      </section>

      {/* Gorte Grandparents Section */}
      <section ref={gorteSectionRef} className="relative min-h-screen flex items-center justify-center px-6 py-24">
        <div className="relative max-w-6xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-400 mb-2">Maternal Grandparents</h2>
            <p className="text-white/50">Familie Gorte</p>
          </div>

          <div className="grid grid-cols-2 gap-12 mb-24">
            {renderCard(david, davidCardRef)}
            {renderCard(dorothea, dorotheaCardRef)}
          </div>

          <div className="grid grid-cols-1 gap-12">
            {renderCard(dora, useRef(null), 'mx-auto max-w-md opacity-20')}
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Grandparents to Grandparents */}
            <path
              ref={gorteLineRef}
              d="M 320 180 L 640 180"
              stroke="#f59e0b"
              strokeWidth="3"
              fill="none"
              strokeDasharray="320"
              strokeDashoffset="320"
              style={{ filter: 'drop-shadow(0 0 12px #f59e0b)' }}
            />
            {/* To Dora */}
            <path
              d="M 480 260 L 480 440"
              stroke="#f59e0b"
              strokeWidth="2"
              fill="none"
              opacity="0.3"
            />
          </svg>
        </div>
      </section>

      {/* Riemer Grandparents Section */}
      <section ref={riemerSectionRef} className="relative min-h-screen flex items-center justify-center px-6 py-24">
        <div className="relative max-w-6xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-cyan-400 mb-2">Paternal Grandparents</h2>
            <p className="text-white/50">Familie Riemer</p>
          </div>

          <div className="grid grid-cols-2 gap-12 mb-24">
            {renderCard(alexander, alexanderCardRef)}
            {renderCard(paulina, paulinaCardRef)}
          </div>

          <div className="grid grid-cols-1 gap-12">
            {renderCard(witali, useRef(null), 'mx-auto max-w-md opacity-20')}
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Grandparents to Grandparents */}
            <path
              ref={riemerLineRef}
              d="M 320 180 L 640 180"
              stroke="#06b6d4"
              strokeWidth="3"
              fill="none"
              strokeDasharray="320"
              strokeDashoffset="320"
              style={{ filter: 'drop-shadow(0 0 12px #06b6d4)' }}
            />
            {/* To Witali */}
            <path
              d="M 480 260 L 480 440"
              stroke="#06b6d4"
              strokeWidth="2"
              fill="none"
              opacity="0.3"
            />
          </svg>
        </div>
      </section>

      {/* Full Tree Reveal Section */}
      <section ref={fullTreeRef} className="relative min-h-screen flex items-center justify-center px-6 py-24">
        <div className="relative max-w-7xl w-full">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">The Complete Picture</h2>
            <p className="text-xl text-white/60">Three generations, one family</p>
          </div>

          {/* Compact Full Tree Layout */}
          <div className="space-y-16">
            {/* Generation 0: Grandparents */}
            <div className="grid grid-cols-4 gap-8">
              {renderCard(david, useRef(null), 'scale-90')}
              {renderCard(dorothea, useRef(null), 'scale-90')}
              {renderCard(alexander, useRef(null), 'scale-90')}
              {renderCard(paulina, useRef(null), 'scale-90')}
            </div>

            {/* Generation 1: Parents */}
            <div className="grid grid-cols-2 gap-12 max-w-3xl mx-auto">
              {renderCard(dora, useRef(null))}
              {renderCard(witali, useRef(null))}
            </div>

            {/* Generation 2: Current */}
            <div className="grid grid-cols-2 gap-12 max-w-3xl mx-auto">
              {renderCard(frank, useRef(null))}
              {renderCard(tien, useRef(null))}
            </div>
          </div>

          {/* All Connection Lines (static for final view) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            {/* Gorte grandparents connection */}
            <line x1="25%" y1="15%" x2="37.5%" y2="15%" stroke="#f59e0b" strokeWidth="2" />
            {/* Riemer grandparents connection */}
            <line x1="62.5%" y1="15%" x2="75%" y2="15%" stroke="#06b6d4" strokeWidth="2" />
            {/* Gorte to Dora */}
            <line x1="31.25%" y1="20%" x2="31.25%" y2="40%" stroke="#f59e0b" strokeWidth="2" />
            <line x1="31.25%" y1="40%" x2="37.5%" y2="40%" stroke="#f59e0b" strokeWidth="2" />
            {/* Riemer to Witali */}
            <line x1="68.75%" y1="20%" x2="68.75%" y2="40%" stroke="#06b6d4" strokeWidth="2" />
            <line x1="68.75%" y1="40%" x2="62.5%" y2="40%" stroke="#06b6d4" strokeWidth="2" />
            {/* Parents connection */}
            <line x1="37.5%" y1="45%" x2="62.5%" y2="45%" stroke="#10b981" strokeWidth="2" />
            {/* Parents to Frank */}
            <line x1="50%" y1="50%" x2="50%" y2="65%" stroke="#10b981" strokeWidth="2" />
            <line x1="37.5%" y1="65%" x2="50%" y2="65%" stroke="#10b981" strokeWidth="2" />
            <line x1="62.5%" y1="65%" x2="50%" y2="65%" stroke="#10b981" strokeWidth="2" />
            {/* Frank to Tien */}
            <line x1="37.5%" y1="72.5%" x2="62.5%" y2="72.5%" stroke="#f43f5e" strokeWidth="2" />
          </svg>
        </div>
      </section>

      {/* Spacer for final scroll */}
      <div className="h-screen" />
    </div>
  )
}
