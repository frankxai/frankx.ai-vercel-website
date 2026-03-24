'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye,
  Volume2,
  Wind,
  Droplets,
  Hand,
  Waves,
  Brain,
  Infinity as InfinityIcon,
  ArrowRight,
  Clock,
  Sparkles,
  Circle,
} from 'lucide-react'

// ── Gate definitions — the 8 sensory doors ──────────────────────────────────

const gates = [
  {
    id: 'see',
    roman: 'I',
    title: 'SEE',
    question: 'What do you see right now?',
    instruction:
      "Look around. Don't name what you see as good or bad. Just see: shape, light, depth, movement. Let objects dissolve into pure visual experience. Nothing needs to mean anything right now.",
    pause: 5,
    icon: Eye,
    color: '#43BFE3',
    rgb: '67, 191, 227',
    tradition: 'Cakkhu — the eye base',
  },
  {
    id: 'hear',
    roman: 'II',
    title: 'HEAR',
    question: 'What do you hear?',
    instruction:
      'Start with the nearest sound. Then find the sound underneath it. Then the sound underneath that. Then the silence that holds all sounds. Notice: silence is not empty — it is the ground of everything.',
    pause: 8,
    icon: Volume2,
    color: '#7C3AED',
    rgb: '124, 58, 237',
    tradition: 'Sota — the ear base',
  },
  {
    id: 'smell',
    roman: 'III',
    title: 'SMELL',
    question: 'What do you smell?',
    instruction:
      "Even if 'nothing' — notice the quality of this air. Is it warm or cold? Dry or humid? This air is always something. It is the air of this exact moment, which will never exist again in exactly this way.",
    pause: 5,
    icon: Wind,
    color: '#10B981',
    rgb: '16, 185, 129',
    tradition: 'Ghāna — the nose base',
  },
  {
    id: 'taste',
    roman: 'IV',
    title: 'TASTE',
    question: 'What do you taste?',
    instruction:
      'What is in your mouth right now? Life always leaves a trace. The mouth knows things the mind forgets. Even the taste of nothing is the taste of this particular silence.',
    pause: 4,
    icon: Droplets,
    color: '#F59E0B',
    rgb: '245, 158, 11',
    tradition: 'Jivhā — the tongue base',
  },
  {
    id: 'feel',
    roman: 'V',
    title: 'FEEL',
    question: 'What does your body feel?',
    instruction:
      "Weight. Temperature. The breath moving in and out. Notice: you don't have to breathe — it breathes you. You are being breathed right now. The body is not a problem to manage. It is your oldest intelligence.",
    pause: 8,
    icon: Hand,
    color: '#F43F5E',
    rgb: '244, 63, 94',
    tradition: 'Kāya — the body base',
  },
  {
    id: 'sense',
    roman: 'VI',
    title: 'SENSE',
    question: 'What does your whole body sense?',
    instruction:
      "Feel your entire body as one sensing organ. Not a body you are inside — you ARE the body, sensing. The boundary between inside and outside begins to soften. You are not observing the world. You are the world, observing itself.",
    pause: 6,
    icon: Waves,
    color: '#14B8A6',
    rgb: '20, 184, 166',
    tradition: 'Tantric somatic awakening',
  },
  {
    id: 'mind',
    roman: 'VII',
    title: 'MIND',
    question: 'What thought is here right now?',
    instruction:
      "Don't follow the thought. Watch it arrive like a cloud moving across an open sky. Watch it pass. Notice: the sky doesn't move — the thoughts move through it. The sky is what you are. Thoughts are what visit.",
    pause: 8,
    icon: Brain,
    color: '#6366F1',
    rgb: '99, 102, 241',
    tradition: 'Mana — the mind base (sixth sense)',
  },
  {
    id: 'witness',
    roman: 'VIII',
    title: 'WITNESS',
    question: 'What remains when thought is quiet?',
    instruction:
      "You don't need to answer. The question itself opens a space. That which notices the thought is not itself a thought. The witness cannot be witnessed. It is the eye that sees but cannot see itself. Rest here.",
    pause: 12,
    icon: InfinityIcon,
    color: '#CBD5E1',
    rgb: '203, 213, 225',
    tradition: 'The Now — Eckhart Tolle',
  },
] as const

// ── Depth levels ──────────────────────────────────────────────────────────────

const levels = [
  {
    name: 'The Gate',
    duration: '30 sec',
    gates: 'Gates I + V',
    description: 'See and Feel only. Minimum viable presence. Before every session, every day.',
    color: '#43BFE3',
    rgb: '67, 191, 227',
  },
  {
    name: 'The Scan',
    duration: '2 min',
    gates: 'All 8 Gates',
    description: 'Full cycle with short pauses. Daily default. The standard morning practice.',
    color: '#7C3AED',
    rgb: '124, 58, 237',
  },
  {
    name: 'The Arrival',
    duration: '5 min',
    gates: 'All 8 + Extended',
    description: 'Before deep creative work. Full gates with longer silences between each.',
    color: '#10B981',
    rgb: '16, 185, 129',
  },
  {
    name: 'The Witness',
    duration: '10 min',
    gates: 'Full + Reflection',
    description: 'For creative blocks and emotional resets. The mind becomes the object.',
    color: '#F59E0B',
    rgb: '245, 158, 11',
  },
  {
    name: 'The Still',
    duration: '20+ min',
    gates: 'Open Awareness',
    description: 'No structure. No guide. No screen. Weekly deep practice. Let go completely.',
    color: '#CBD5E1',
    rgb: '203, 213, 225',
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function PresenceClient() {
  const [activeGate, setActiveGate] = useState<string | null>(null)
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null)

  const activeGateData = gates.find((g) => g.id === activeGate)

  return (
    <main className="min-h-screen bg-[#06070f] text-white overflow-x-hidden">

      {/* ── Ambient background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {/* Deep breathing orb — slow pulse */}
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.07) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(67, 191, 227, 0.05) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm text-white/40 mb-12 tracking-widest uppercase">
            <Circle className="w-2 h-2 fill-violet-500 text-violet-500" />
            Full Presence Activation
          </div>

          {/* Breathing word */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.15em] mb-8 text-white/90"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            Arrive.
          </motion.h1>

          <p className="text-white/40 text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-light mb-6">
            Before you create — be here.
            <br />
            Eight sensory gates. Five depth levels.
            <br />
            The ritual that changes what you build from.
          </p>

          <p className="text-white/20 text-sm max-w-md mx-auto leading-relaxed">
            Rooted in Buddhist six sense-bases, Taoist flow, Tantric somatic awakening,
            and Eckhart Tolle's Now. Built for creators who want to work from depth.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-2 text-white/20"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs tracking-widest uppercase">The Eight Gates</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* ── The mantra ───────────────────────────────────────────────────────── */}
      <section className="relative max-w-3xl mx-auto px-6 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.5 }}
          className="space-y-3"
        >
          {[
            'What do you see?',
            'What do you hear?',
            'What do you smell?',
            'What do you taste?',
            'What do you feel?',
            'What does your body sense?',
            'What thought does your mind have?',
            'What remains when thought is quiet?',
          ].map((q, i) => (
            <motion.p
              key={q}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.8 }}
              className="text-white/30 text-xl md:text-2xl font-light italic"
            >
              {q}
            </motion.p>
          ))}
        </motion.div>
      </section>

      {/* ── The 8 Gates ──────────────────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-white/80 mb-4">
            The Eight Gates
          </h2>
          <p className="text-white/30 max-w-lg mx-auto">
            Each gate is a door into this moment. Click to open. Sit with the question.
            There are no wrong answers — only deeper noticing.
          </p>
        </motion.div>

        {/* Gate grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {gates.map((gate, i) => {
            const Icon = gate.icon
            const isActive = activeGate === gate.id

            return (
              <motion.button
                key={gate.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                onClick={() => setActiveGate(isActive ? null : gate.id)}
                className="relative group rounded-2xl border text-left p-5 transition-all duration-500 cursor-pointer overflow-hidden"
                style={{
                  borderColor: isActive ? `rgba(${gate.rgb}, 0.4)` : 'rgba(255,255,255,0.06)',
                  background: isActive
                    ? `rgba(${gate.rgb}, 0.08)`
                    : 'rgba(255,255,255,0.02)',
                  boxShadow: isActive ? `0 0 40px rgba(${gate.rgb}, 0.12)` : 'none',
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, rgba(${gate.rgb}, 0.1) 0%, transparent 70%)`,
                  }}
                />

                {/* Roman numeral */}
                <span
                  className="block text-xs font-mono tracking-widest mb-3 transition-colors duration-300"
                  style={{ color: isActive ? gate.color : 'rgba(255,255,255,0.2)' }}
                >
                  {gate.roman}
                </span>

                {/* Icon */}
                <div className="mb-3">
                  <Icon
                    className="w-5 h-5 transition-colors duration-300"
                    style={{ color: isActive ? gate.color : 'rgba(255,255,255,0.3)' }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-sm font-semibold tracking-wider transition-colors duration-300"
                  style={{ color: isActive ? gate.color : 'rgba(255,255,255,0.6)' }}
                >
                  {gate.title}
                </h3>

                {/* Question preview */}
                <p className="text-xs text-white/30 mt-1 leading-relaxed line-clamp-2">
                  {gate.question}
                </p>

                {/* Pause indicator */}
                <div className="flex items-center gap-1 mt-3">
                  <Clock className="w-3 h-3 text-white/20" />
                  <span className="text-xs text-white/20">{gate.pause}s pause</span>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Expanded gate detail */}
        <AnimatePresence mode="wait">
          {activeGateData && (
            <motion.div
              key={activeGateData.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div
                className="rounded-2xl border p-8 md:p-12 relative overflow-hidden"
                style={{
                  borderColor: `rgba(${activeGateData.rgb}, 0.2)`,
                  background: `rgba(${activeGateData.rgb}, 0.04)`,
                }}
              >
                {/* Background glow */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse, rgba(${activeGateData.rgb}, 0.1) 0%, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 max-w-2xl mx-auto text-center">
                  {/* Gate header */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <span
                      className="text-xs font-mono tracking-widest"
                      style={{ color: `rgba(${activeGateData.rgb}, 0.6)` }}
                    >
                      {activeGateData.roman}
                    </span>
                    <span className="text-white/20">·</span>
                    <span
                      className="text-xs font-mono tracking-widest"
                      style={{ color: `rgba(${activeGateData.rgb}, 0.6)` }}
                    >
                      {activeGateData.tradition}
                    </span>
                  </div>

                  {/* The question — spoken aloud */}
                  <motion.p
                    className="text-2xl md:text-3xl font-light mb-8 leading-relaxed"
                    style={{ color: activeGateData.color }}
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {activeGateData.question}
                  </motion.p>

                  {/* Instruction */}
                  <p className="text-white/50 text-lg leading-relaxed mb-8">
                    {activeGateData.instruction}
                  </p>

                  {/* Silence indicator */}
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm"
                    style={{
                      borderColor: `rgba(${activeGateData.rgb}, 0.2)`,
                      color: `rgba(${activeGateData.rgb}, 0.6)`,
                    }}
                  >
                    <Clock className="w-3 h-3" />
                    Sit with this for {activeGateData.pause} seconds before moving on
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Five Depth Levels ─────────────────────────────────────────────────── */}
      <section className="relative max-w-5xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-white/80 mb-4">
            Five Depths
          </h2>
          <p className="text-white/30 max-w-lg mx-auto">
            Start at The Gate. Go deeper when you're ready.
            The practice meets you where you are.
          </p>
        </motion.div>

        <div className="space-y-3">
          {levels.map((level, i) => (
            <motion.div
              key={level.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              onHoverStart={() => setHoveredLevel(i)}
              onHoverEnd={() => setHoveredLevel(null)}
              className="group rounded-xl border transition-all duration-500 overflow-hidden cursor-default"
              style={{
                borderColor:
                  hoveredLevel === i
                    ? `rgba(${level.rgb}, 0.3)`
                    : 'rgba(255,255,255,0.06)',
                background:
                  hoveredLevel === i
                    ? `rgba(${level.rgb}, 0.06)`
                    : 'rgba(255,255,255,0.02)',
              }}
            >
              <div className="flex items-center gap-6 p-5">
                {/* Level number */}
                <div
                  className="w-10 h-10 rounded-full border flex items-center justify-center text-sm font-mono flex-shrink-0 transition-colors duration-500"
                  style={{
                    borderColor:
                      hoveredLevel === i
                        ? `rgba(${level.rgb}, 0.5)`
                        : 'rgba(255,255,255,0.1)',
                    color: hoveredLevel === i ? level.color : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {i + 1}
                </div>

                {/* Name + gates */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-white/80">{level.name}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full border font-mono transition-colors duration-500"
                      style={{
                        borderColor: `rgba(${level.rgb}, 0.3)`,
                        color: level.color,
                      }}
                    >
                      {level.gates}
                    </span>
                  </div>
                  <p className="text-white/40 text-sm">{level.description}</p>
                </div>

                {/* Duration */}
                <div className="text-right flex-shrink-0">
                  <div
                    className="text-lg font-light transition-colors duration-500"
                    style={{ color: hoveredLevel === i ? level.color : 'rgba(255,255,255,0.3)' }}
                  >
                    {level.duration}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Philosophy block ──────────────────────────────────────────────────── */}
      <section className="relative max-w-3xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <blockquote className="text-2xl md:text-3xl font-light text-white/60 leading-relaxed mb-8">
            &ldquo;The present moment is the only moment available to us,
            and it is the door to all moments.&rdquo;
          </blockquote>
          <p className="text-white/25 text-sm tracking-widest uppercase">
            Thich Nhat Hanh
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-16 pt-16 border-t border-white/[0.06]"
        >
          <blockquote className="text-xl md:text-2xl font-light text-white/50 leading-relaxed mb-8">
            &ldquo;Realize deeply that the present moment is all you ever have.
            Make the Now the primary focus of your life.&rdquo;
          </blockquote>
          <p className="text-white/20 text-sm tracking-widest uppercase">
            Eckhart Tolle — The Power of Now
          </p>
        </motion.div>
      </section>

      {/* ── Integration CTAs ──────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-light text-white/70 mb-3">
              This is the gate before the work.
            </h2>
            <p className="text-white/30 max-w-lg mx-auto">
              In ACOS, Full Presence Activation runs before every session.
              In the Rituals system, it is the first protocol of the day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* ACOS CTA */}
            <Link
              href="/acos"
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:border-emerald-500/30 hover:bg-emerald-500/[0.04] transition-all duration-500"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white/70 mb-2 group-hover:text-white transition-colors">
                Agentic Creator OS
              </h3>
              <p className="text-white/30 text-sm mb-4">
                FPA is the entry ritual for every ACOS work session. Presence before intelligence.
              </p>
              <div className="flex items-center gap-1 text-emerald-400/60 text-sm group-hover:text-emerald-400 transition-colors">
                Explore ACOS <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            {/* Rituals CTA */}
            <Link
              href="/rituals"
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:border-amber-500/30 hover:bg-amber-500/[0.04] transition-all duration-500"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="font-semibold text-white/70 mb-2 group-hover:text-white transition-colors">
                Daily Rituals
              </h3>
              <p className="text-white/30 text-sm mb-4">
                See how FPA integrates with the Morning Prime and Deep Build blocks of the daily system.
              </p>
              <div className="flex items-center gap-1 text-amber-400/60 text-sm group-hover:text-amber-400 transition-colors">
                View Rituals <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            {/* The Still — no screen CTA */}
            <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <div className="w-8 h-8 rounded-lg bg-slate-500/10 flex items-center justify-center mb-4">
                <InfinityIcon className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="font-semibold text-white/70 mb-2">
                Level V — The Still
              </h3>
              <p className="text-white/30 text-sm mb-4">
                Put the screen down. No guide. No structure. No timer. 20 minutes.
                This is the practice that cannot be hosted on a website.
              </p>
              <p className="text-slate-400/40 text-sm italic">
                No link needed. You already know what to do.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
