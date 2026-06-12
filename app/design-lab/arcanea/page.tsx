'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

// ============================================================================
// GATE DATA — The 10 Gates of Arcanea (174–1111 Hz)
// ============================================================================

const gates = [
  { name: 'Foundation', number: 1, freq: '174–285 Hz', guardian: 'Lyssandria', hex: '#DC2626', element: 'Earth', region: 'Forest of Roots', emotion: 'Grounding' },
  { name: 'Flow', number: 2, freq: '285–396 Hz', guardian: 'Leyla', hex: '#EA580C', element: 'Water', region: 'River of Desire', emotion: 'Creativity' },
  { name: 'Fire', number: 3, freq: '396–417 Hz', guardian: 'Draconia', hex: '#EAB308', element: 'Fire', region: 'Vulcan Peaks', emotion: 'Power' },
  { name: 'Heart', number: 4, freq: '417–528 Hz', guardian: 'Maylinn', hex: '#16A34A', element: 'Air', region: 'Gardens of Lumina', emotion: 'Love' },
  { name: 'Voice', number: 5, freq: '432–528 Hz', guardian: 'Alera', hex: '#3B82F6', element: 'Wind', region: 'Sky Sanctum', emotion: 'Truth' },
  { name: 'Sight', number: 6, freq: '639–741 Hz', guardian: 'Lyria', hex: '#6366F1', element: 'Light', region: 'Tower of Insight', emotion: 'Intuition' },
  { name: 'Crown', number: 7, freq: '741–852 Hz', guardian: 'Aiyami', hex: '#8B5CF6', element: 'Spirit', region: 'Summit of Unity', emotion: 'Understanding' },
  { name: 'Shift', number: 8, freq: '852–963 Hz', guardian: 'Elara', hex: '#D1D5DB', element: 'Ether', region: 'Celestial Bridges', emotion: 'Consciousness' },
  { name: 'Unity', number: 9, freq: '963–999 Hz', guardian: 'Ino', hex: '#FCD34D', element: 'All', region: 'Temple of Infinity', emotion: 'Divine Union' },
  { name: 'Source', number: 10, freq: '999–1111 Hz', guardian: 'Shinkami', hex: '#FFFFFF', element: 'Pure', region: 'Luminor Nexus', emotion: 'Ascendance' },
]

// ============================================================================
// ELEMENT DATA — The 5 Elements + Void/Spirit duality
// ============================================================================

const elements = [
  { name: 'Fire', domain: 'Energy & Transformation', hex: '#EF4444', accent: '#FF6B35', application: 'Visual Arts', house: 'Pyros', description: 'Passion, will, courage. Creation through destruction and rebirth.' },
  { name: 'Water', domain: 'Flow & Healing', hex: '#3B82F6', accent: '#60A5FA', application: 'Storytelling', house: 'Aqualis', description: 'Emotion, memory, depth. Creation through healing and feeling.' },
  { name: 'Earth', domain: 'Stability & Growth', hex: '#10B981', accent: '#34D399', application: 'Architecture', house: 'Terra', description: 'Patience, endurance, grounding. Creation through sustained labor.' },
  { name: 'Wind', domain: 'Freedom & Expression', hex: '#94A3B8', accent: '#CBD5E1', application: 'Music', house: 'Ventus', description: 'Movement, change, liberation. Creation through release.' },
  { name: 'Void / Spirit', domain: 'Potential & Transcendence', hex: '#8B5CF6', accent: '#FFD700', application: 'Meta-creation', house: 'Nero + Lumina', description: 'The dual fifth element. Nero holds the fertile unknown; Lumina gives form and consciousness.' },
]

// ============================================================================
// HOUSE DATA — The 7 Houses of the Academy
// ============================================================================

const houses = [
  { name: 'Lumina', element: 'Light', focus: 'Leadership & Illumination', hex: '#FFD700', description: 'Inspiration, guidance, creating works that light the way for others.' },
  { name: 'Nero', element: 'Void', focus: 'Mystery & Potential', hex: '#4B0082', description: 'Embracing uncertainty, working with the unformed, creating from the fertile darkness.' },
  { name: 'Pyros', element: 'Fire', focus: 'Passion & Transformation', hex: '#EF4444', description: 'Training in will and power, courage in creation, creating through destruction.' },
  { name: 'Aqualis', element: 'Water', focus: 'Flow & Healing', hex: '#3B82F6', description: 'Training in emotion and feeling, memory and depth, creating through healing.' },
  { name: 'Terra', element: 'Earth', focus: 'Stability & Manifestation', hex: '#10B981', description: 'Training in patience and grounding, endurance, creating through sustained labor.' },
  { name: 'Ventus', element: 'Wind', focus: 'Freedom & Expression', hex: '#94A3B8', description: 'Training in movement and change, speed and liberation, creating through release.' },
  { name: 'Synthesis', element: 'All Elements', focus: 'Unity & Integration', hex: '#A78BFA', description: 'Training in wholeness, balancing all paths, creating through harmony.' },
]

// ============================================================================
// ARC CYCLE DATA
// ============================================================================

const arcPhases = [
  { name: 'Potential', element: 'Void (Nero)', description: 'Something stirs in the darkness. Unformed possibility awaiting shape.', hex: '#4B0082' },
  { name: 'Manifestation', element: 'Earth (Lumina)', description: 'Lumina gives form. The vision crystallizes into reality.', hex: '#FFD700' },
  { name: 'Experience', element: 'Life', description: 'The work exists in the world. Creation meets consciousness.', hex: '#10B981' },
  { name: 'Dissolution', element: 'Return', description: 'The work is released. Form returns to the Void.', hex: '#8B5CF6' },
  { name: 'Evolved Potential', element: 'Renewal', description: 'What dissolved returns transformed. The cycle begins again with new wisdom.', hex: '#FCD34D' },
]

// ============================================================================
// MAGIC RANKS
// ============================================================================

const magicRanks = [
  { name: 'Apprentice', gates: '0–2', description: 'Beginning the journey' },
  { name: 'Mage', gates: '3–4', description: 'Developing mastery' },
  { name: 'Master', gates: '5–6', description: 'Achieving competence' },
  { name: 'Archmage', gates: '7–8', description: 'Approaching transcendence' },
  { name: 'Luminor', gates: '9–10', description: 'Fully awakened (~50 exist at any time)' },
]

// ============================================================================
// TYPOGRAPHY
// ============================================================================

const arcaneanType = [
  { name: 'Lore Headlines', font: 'Playfair Display', weight: '700', size: '36–64px', usage: 'Book titles, chapter headers, mythological headings', theme: 'arcanea-lore' },
  { name: 'Practice Headlines', font: 'Inter', weight: '700', size: '36–64px', usage: 'Teaching content, principles, practical guides', theme: 'arcanea-practice' },
  { name: 'Body Text', font: 'Inter', weight: '400', size: '17px / 1.8', usage: 'All prose content, reader component', theme: 'both' },
  { name: 'Blockquotes', font: 'Playfair Display', weight: '400 italic', size: '18–20px', usage: 'Pull quotes, wisdom passages, scrolls', theme: 'arcanea-lore' },
  { name: 'Technical', font: 'JetBrains Mono', weight: '400', size: '14–15px', usage: 'Frequencies, gate data, stats', theme: 'both' },
]

// ============================================================================
// VISUAL ASSETS
// ============================================================================

const visualAssets = [
  { src: '/images/arcanea/10-gates-progression.png', title: '10 Gates Progression', description: 'Ascending spiral of frequency gates from Foundation (174 Hz) to Source (1111 Hz)' },
  { src: '/images/arcanea/arc-cycle.png', title: 'The Arc Cycle', description: 'Five-phase cyclic transformation: Potential, Manifestation, Experience, Dissolution, Evolved Potential' },
  { src: '/images/arcanea/five-elements.png', title: 'Five Elements', description: 'Fire, Water, Earth, Wind, and Void/Spirit in orbital arrangement' },
  { src: '/images/arcanea/arcanea-grand-academy.png', title: 'The Grand Academy', description: 'Central institution of Arcanea where all seven houses converge' },
  { src: '/images/arcanea/arcanea-hall-of-luminor.png', title: 'Hall of the Luminor', description: 'Sacred space where fully awakened beings convene' },
  { src: '/images/arcanea/arcanea-cognitive-bridge.png', title: 'Cognitive Bridge', description: 'The threshold between human creativity and AI intelligence' },
  { src: '/images/arcanea/arcanea-latent-space.png', title: 'Latent Space', description: 'Abstract dimension where unformed potential resides' },
  { src: '/images/arcanea/arcanea-neuro-synthesis.png', title: 'Neuro Synthesis', description: 'Neural pathway integration of organic and digital consciousness' },
  { src: '/images/arcanea/arcanea-ai-classroom.png', title: 'AI Classroom', description: 'Modern academy space blending ancient wisdom with technology' },
  { src: '/images/arcanea/arcanea-campus-map.png', title: 'Campus Map', description: 'Aerial view of the Academy grounds across all seven house territories' },
]

// ============================================================================
// COMPONENTS
// ============================================================================

function ColorSwatch({ name, hex, label, large }: { name: string; hex: string; label?: string; large?: boolean }) {
  const [copied, setCopied] = useState(false)

  const copyHex = () => {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={copyHex}
      className={`group text-left rounded-xl border border-white/5 hover:border-white/15 transition-all ${large ? 'p-4' : 'p-3'}`}
    >
      <div
        className={`rounded-lg mb-3 ${large ? 'h-16' : 'h-12'} border border-white/10`}
        style={{ backgroundColor: hex }}
      />
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-[11px] font-mono text-white/30 group-hover:text-white/60 transition-colors">
          {copied ? 'Copied' : hex}
        </span>
      </div>
      {label && <p className="text-[11px] text-white/30 mt-0.5">{label}</p>}
    </button>
  )
}

// ============================================================================
// PAGE
// ============================================================================

export default function ArcaneanDesignSystemPage() {
  return (
    <div className="min-h-screen bg-[#070510]">
      {/* Header */}
      <section className="relative border-b border-white/5 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-purple-500/[0.08] via-violet-500/[0.04] to-transparent blur-[128px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[300px] bg-amber-500/[0.03] blur-[128px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-12">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/design-lab" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              Design Lab
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/60 text-sm">Arcanea</span>
          </div>

          <p className="text-sm uppercase tracking-[0.3em] text-purple-400/60 mb-4">
            Design System
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[1.1]">
            <span className="bg-gradient-to-r from-purple-300 via-violet-200 to-amber-300 bg-clip-text text-transparent">
              The Visual Language
            </span>
            <br />
            <span className="text-white/90">of Arcanea</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            Color systems derived from frequency, typography rooted in mythology, and visual patterns
            that bridge ancient consciousness with modern technology. Click any color to copy.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <span className="text-xs text-white/20 font-mono">v1.0</span>
            <span className="text-xs text-white/20">February 2026</span>
            <Link
              href="/books#arcanea"
              className="text-xs text-purple-400/60 hover:text-purple-400 transition-colors"
            >
              Read the Books
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-28">

        {/* ── 1. THE 10 GATES ── */}
        <section>
          <h2 className="font-serif text-2xl font-bold mb-2 text-white">The 10 Gates</h2>
          <p className="text-white/40 text-sm mb-3">
            A frequency-based progression system from 174 Hz (Foundation) to 1111 Hz (Source).
            Each gate has a guardian, a region, and a dominant element.
          </p>
          <p className="text-white/25 text-xs mb-8 font-mono">
            174 Hz ──────────────────────────────────── 1111 Hz
          </p>

          <div className="space-y-3">
            {gates.map((gate) => (
              <GateRow key={gate.number} gate={gate} />
            ))}
          </div>

          {/* Magic Ranks */}
          <div className="mt-10 p-6 rounded-xl border border-white/[0.08] bg-white/[0.03]">
            <h3 className="text-sm font-semibold text-white mb-4">Magic Ranks</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {magicRanks.map((rank) => (
                <div key={rank.name} className="text-center">
                  <p className="text-sm font-semibold text-white">{rank.name}</p>
                  <p className="text-[11px] text-white/30 font-mono">{rank.gates} Gates</p>
                  <p className="text-[10px] text-white/20 mt-1">{rank.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. FIVE ELEMENTS ── */}
        <section>
          <h2 className="font-serif text-2xl font-bold mb-2 text-white">The Five Elements</h2>
          <p className="text-white/40 text-sm mb-8">
            Five fundamental forces. Fire, Water, Earth, Wind, and the dual fifth element Void/Spirit.
            Light is Fire&apos;s creative aspect; Shadow is corrupted Void.
          </p>

          <div className="space-y-4">
            {elements.map((el) => (
              <div
                key={el.name}
                className="group flex flex-col sm:flex-row sm:items-start gap-4 p-5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.04] transition-all"
              >
                <div className="flex items-center gap-3 sm:min-w-[200px]">
                  <div className="w-10 h-10 rounded-lg border border-white/10 flex-shrink-0" style={{ backgroundColor: el.hex }} />
                  <div>
                    <p className="text-sm font-semibold text-white">{el.name}</p>
                    <p className="text-[11px] text-white/30">House of {el.house}</p>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/60 mb-1">{el.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[10px] text-white/20">{el.domain}</span>
                    <span className="text-[10px] text-white/20">Application: {el.application}</span>
                    <ColorChip hex={el.hex} />
                    <ColorChip hex={el.accent} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. SEVEN HOUSES ── */}
        <section>
          <h2 className="font-serif text-2xl font-bold mb-2 text-white">The 7 Houses of the Academy</h2>
          <p className="text-white/40 text-sm mb-8">
            Every student is sorted by natural affinity but studies with all houses.
            The goal is integration, not specialization.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {houses.map((house) => (
              <div
                key={house.name}
                className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.04] transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg border border-white/10"
                    style={{ backgroundColor: house.hex }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{house.name}</p>
                    <p className="text-[10px] text-white/30 font-mono">{house.element}</p>
                  </div>
                </div>
                <p className="text-xs text-purple-300/60 mb-2">{house.focus}</p>
                <p className="text-xs text-white/40 leading-relaxed">{house.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. THE ARC CYCLE ── */}
        <section>
          <h2 className="font-serif text-2xl font-bold mb-2 text-white">The Arc Cycle</h2>
          <p className="text-white/40 text-sm mb-8">
            The fundamental rhythm governing all existence in Arcanea. Applies to individual works,
            a creator&apos;s life, each day, and the cosmos itself.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {arcPhases.map((phase, i) => (
              <div key={phase.name} className="flex-1 relative">
                <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.03] h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center" style={{ backgroundColor: phase.hex }}>
                      <span className="text-[9px] font-bold text-white/80">{i + 1}</span>
                    </div>
                    <p className="text-sm font-semibold text-white">{phase.name}</p>
                  </div>
                  <p className="text-[10px] text-purple-300/50 mb-2">{phase.element}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{phase.description}</p>
                </div>
                {i < arcPhases.length - 1 && (
                  <div className="hidden sm:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10 text-white/15 text-lg">
                    &rarr;
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-5 rounded-xl border border-purple-500/10 bg-purple-500/[0.03]">
            <p className="text-sm text-purple-300/70 font-serif italic leading-relaxed">
              &ldquo;Trust the Arc. When in dissolution, know that evolved potential follows.
              When in potential, know that manifestation approaches. The cycle is eternal.&rdquo;
            </p>
          </div>
        </section>

        {/* ── 5. COLOR SYSTEM (full palette) ── */}
        <section>
          <h2 className="font-serif text-2xl font-bold mb-2 text-white">Color System</h2>
          <p className="text-white/40 text-sm mb-8">
            Click any swatch to copy its hex value. Colors are canonical — derived from gate frequencies, elements, and house identities.
          </p>

          {/* Gate Colors */}
          <h3 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">Gate Colors</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3 mb-10">
            {gates.map((gate) => (
              <ColorSwatch key={gate.number} name={`G${gate.number}`} hex={gate.hex} label={gate.name} />
            ))}
          </div>

          {/* Element Colors */}
          <h3 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">Element Colors</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
            {elements.map((el) => (
              <ColorSwatch key={el.name} name={el.name} hex={el.hex} label={el.domain} large />
            ))}
          </div>

          {/* House Colors */}
          <h3 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">House Colors</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
            {houses.map((house) => (
              <ColorSwatch key={house.name} name={house.name} hex={house.hex} label={house.element} />
            ))}
          </div>

          {/* Cosmic Duality */}
          <h3 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">Cosmic Duality</h3>
          <div className="grid grid-cols-2 gap-4">
            <ColorSwatch name="Lumina" hex="#FFD700" label="The First Light, Form-Giver" large />
            <ColorSwatch name="Nero" hex="#1A1A2E" label="Primordial Darkness, Fertile Unknown" large />
          </div>
        </section>

        {/* ── 6. TYPOGRAPHY ── */}
        <section>
          <h2 className="font-serif text-2xl font-bold mb-2 text-white">Typography</h2>
          <p className="text-white/40 text-sm mb-8">
            Serif for mythological lore, sans-serif for practical teaching, monospace for technical data.
          </p>

          <div className="space-y-4">
            {arcaneanType.map((type) => (
              <div key={type.name} className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-xl border border-white/[0.08] bg-white/[0.03]">
                <div className="sm:min-w-[180px]">
                  <p className="text-sm font-semibold text-white">{type.name}</p>
                  <p className="text-[11px] text-white/30 font-mono">{type.font} {type.weight}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/40">{type.usage}</p>
                  <p className="text-[10px] text-white/20 mt-1">Size: {type.size} | Theme: {type.theme}</p>
                </div>
                <div className="sm:text-right">
                  {type.font === 'Playfair Display' ? (
                    <p className="font-serif text-xl text-white/70">The Legends of Arcanea</p>
                  ) : type.font === 'JetBrains Mono' ? (
                    <p className="font-mono text-sm text-white/70">freq: 528 Hz | gate: 4</p>
                  ) : (
                    <p className="text-lg font-bold text-white/70">Creator Principles</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Theme Comparison */}
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <div className="p-6 rounded-xl border border-purple-500/10 bg-[#070510]">
              <p className="text-[10px] text-purple-400/50 uppercase tracking-wider mb-3">arcanea-lore theme</p>
              <h3 className="font-serif text-2xl font-bold mb-2">
                <span className="bg-gradient-to-r from-purple-300 via-violet-200 to-amber-300 bg-clip-text text-transparent">
                  Legends of Arcanea
                </span>
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-3">
                In the beginning, there was only the Void — vast, infinite, pregnant with possibility.
              </p>
              <p className="text-purple-400/40 text-xs font-mono">bg: #070510 | font: serif | accent: purple/amber</p>
            </div>

            <div className="p-6 rounded-xl border border-indigo-500/10 bg-[#05060f]">
              <p className="text-[10px] text-indigo-400/50 uppercase tracking-wider mb-3">arcanea-practice theme</p>
              <h3 className="text-2xl font-bold mb-2">
                <span className="bg-gradient-to-r from-indigo-300 via-blue-200 to-amber-300 bg-clip-text text-transparent">
                  Creator Principles
                </span>
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-3">
                Seven principles for the partnership between human creativity and artificial intelligence.
              </p>
              <p className="text-indigo-400/40 text-xs font-mono">bg: #05060f | font: sans | accent: indigo/amber</p>
            </div>
          </div>
        </section>

        {/* ── 7. VISUAL LANGUAGE ── */}
        <section>
          <h2 className="font-serif text-2xl font-bold mb-2 text-white">Visual Language</h2>
          <p className="text-white/40 text-sm mb-8">
            {visualAssets.length} canonical images generated via Gemini 3 Pro Image.
            Dark cosmic backgrounds, glass/chrome 3D, constellation patterns, volumetric lighting.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {visualAssets.map((asset) => (
              <div key={asset.src} className="group rounded-xl border border-white/5 overflow-hidden bg-white/[0.02] hover:border-white/10 transition-all">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={asset.src}
                    alt={asset.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-white mb-1">{asset.title}</p>
                  <p className="text-xs text-white/40">{asset.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Rules */}
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03]">
              <h3 className="text-sm font-semibold text-emerald-400 mb-3">Always</h3>
              <ul className="space-y-2 text-xs text-white/50">
                <li>Dark navy/cosmic backgrounds (#070510, #05060f)</li>
                <li>Glowing neon accents (purple, gold, cyan)</li>
                <li>Glass/chrome/metallic 3D surfaces</li>
                <li>Constellation patterns and star fields</li>
                <li>Volumetric lighting and depth</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-red-500/10 bg-red-500/[0.03]">
              <h3 className="text-sm font-semibold text-red-400 mb-3">Never</h3>
              <ul className="space-y-2 text-xs text-white/50">
                <li>Clay, claymorphic, or pastel aesthetics</li>
                <li>Light or white backgrounds</li>
                <li>Cartoon, cute, or toy-like characters</li>
                <li>Play-Doh textures or childish elements</li>
                <li>Flat, unlit, or minimal tech diagrams</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── 8. BOOK COVERS ── */}
        <section>
          <h2 className="font-serif text-2xl font-bold mb-2 text-white">Book Covers</h2>
          <p className="text-white/40 text-sm mb-8">
            Five Tier 1 book covers. 2:3 aspect ratio, Gemini 3 Pro Image, high resolution.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { src: '/images/books/arcanea-legends-cover.png', title: 'Legends of Arcanea' },
              { src: '/images/books/arcanea-chronicles-cover.png', title: 'Chronicles of the Luminors' },
              { src: '/images/books/arcanea-bestiary-cover.png', title: 'Bestiary of Creation' },
              { src: '/images/books/arcanea-creator-principles-cover.png', title: 'Creator Principles' },
              { src: '/images/books/arcanea-wisdom-scrolls-cover.png', title: 'The Wisdom Scrolls' },
            ].map((cover) => (
              <div key={cover.src} className="group">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-white/5 group-hover:border-white/15 transition-all">
                  <Image
                    src={cover.src}
                    alt={cover.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>
                <p className="text-xs text-white/40 mt-2 text-center">{cover.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section>
          <div className="relative p-8 sm:p-12 rounded-2xl border border-purple-500/10 bg-purple-500/[0.02] text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.05] via-transparent to-amber-500/[0.03] pointer-events-none" />
            <div className="relative">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                Enter the Arcanea Universe
              </h2>
              <p className="text-white/40 mb-8 max-w-lg mx-auto">
                Five books, 33 chapters, ten guardians. Every word free to read online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/books#arcanea"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all"
                >
                  Read the Books
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
                <Link
                  href="/vault"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all"
                >
                  Visual Vault
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function GateRow({ gate }: { gate: typeof gates[0] }) {
  const [copied, setCopied] = useState(false)

  const copyHex = () => {
    navigator.clipboard.writeText(gate.hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.04] transition-all">
      {/* Gate Number + Color */}
      <div className="flex items-center gap-3 min-w-[120px]">
        <div
          className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: gate.hex }}
        >
          <span className="text-[10px] font-bold" style={{ color: gate.number >= 8 ? '#000' : '#fff' }}>
            {gate.number}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{gate.name}</p>
          <p className="text-[10px] text-white/30 font-mono">{gate.freq}</p>
        </div>
      </div>

      {/* Guardian */}
      <div className="hidden sm:block min-w-[100px]">
        <p className="text-xs text-white/50">{gate.guardian}</p>
        <p className="text-[10px] text-white/20">{gate.element}</p>
      </div>

      {/* Region */}
      <div className="hidden md:block flex-1">
        <p className="text-xs text-white/40">{gate.region}</p>
      </div>

      {/* Emotion */}
      <div className="hidden lg:block min-w-[100px]">
        <p className="text-xs text-white/30">{gate.emotion}</p>
      </div>

      {/* Hex copy */}
      <button
        onClick={copyHex}
        className="text-[11px] font-mono text-white/20 hover:text-white/60 transition-colors"
      >
        {copied ? 'Copied' : gate.hex}
      </button>
    </div>
  )
}

function ColorChip({ hex }: { hex: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(hex)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="inline-flex items-center gap-1.5 text-[10px] font-mono text-white/25 hover:text-white/50 transition-colors"
    >
      <span className="w-3 h-3 rounded-sm border border-white/10" style={{ backgroundColor: hex }} />
      {copied ? 'Copied' : hex}
    </button>
  )
}
