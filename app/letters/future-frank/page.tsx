'use client'

import { motion } from 'framer-motion'
import type { Metadata } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Note: metadata export moved to separate file for client component

function FloatingParticle({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-violet-400/30"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function FutureFrankPage() {
  const [currentDate] = useState(() => {
    const now = new Date()
    return now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  })

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' },
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.3} />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
      </div>

      <motion.article
        className="relative max-w-3xl mx-auto px-6 py-24 md:py-32"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        {/* Header */}
        <motion.header className="mb-16 text-center" variants={fadeIn}>
          <p className="text-slate-500 text-sm tracking-widest uppercase mb-4">
            A Letter to Myself
          </p>
          <h1 className="text-4xl md:text-6xl font-light text-white/95 mb-6 tracking-tight">
            Dear Future Frank,
          </h1>
          <p className="text-slate-400">
            Written on {currentDate}
          </p>
          <div className="mt-8 w-16 h-px mx-auto bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        </motion.header>

        {/* Letter Content */}
        <motion.div
          className="prose prose-invert prose-lg max-w-none"
          variants={stagger}
        >
          <motion.p
            className="text-slate-300 leading-relaxed text-xl font-light"
            variants={fadeIn}
          >
            I hope this letter finds you at peace. By the time you read this, you will have
            lived through so much more than I can imagine right now. But I wanted to capture
            this moment, this version of myself, so you never forget where you came from.
          </motion.p>

          <motion.div className="my-12" variants={fadeIn}>
            <blockquote className="border-l-2 border-violet-500/50 pl-6 italic text-slate-400">
              "The Golden Age isn't coming. We're building it. Every prompt engineered,
              every system designed, every creator empowered brings us closer to abundance."
            </blockquote>
          </motion.div>

          <motion.h2
            className="text-2xl font-light text-white/90 mt-16 mb-6"
            variants={fadeIn}
          >
            Remember the Journey
          </motion.h2>

          <motion.p className="text-slate-300 leading-relaxed" variants={fadeIn}>
            You started as a musician, finding truth in frequencies and melodies. That artist's
            soul never left you; it just found new instruments. When AI emerged, you didn't
            see threat, you saw opportunity: the chance to amplify human creativity, not
            replace it. That instinct was right.
          </motion.p>

          <motion.p className="text-slate-300 leading-relaxed" variants={fadeIn}>
            The Oracle expertise, the enterprise systems, the certifications and the corporate
            corridors; they gave you credibility. But what they really gave you was the knowledge
            that the most powerful technology means nothing if it doesn't serve human flourishing.
            You learned to architect systems that amplify expression, not diminish it.
          </motion.p>

          <motion.p className="text-slate-300 leading-relaxed" variants={fadeIn}>
            Then came Suno, and 500+ songs later, you proved that AI could be a collaborator
            in the most intimate of human acts: creating music. Each track was a conversation
            with the future, a frequency carrying emotion into the digital ether.
          </motion.p>

          <motion.h2
            className="text-2xl font-light text-white/90 mt-16 mb-6"
            variants={fadeIn}
          >
            The Creators You Serve
          </motion.h2>

          <motion.p className="text-slate-300 leading-relaxed" variants={fadeIn}>
            Never forget the overwhelmed creator staring at their screen, paralyzed by
            possibility. You built FrankX for them. The Technical Translator. The
            Frequency Alchemist. The Creation Engine. The Soul Strategist. Each agent
            designed not to replace their voice, but to help them find it.
          </motion.p>

          <motion.p className="text-slate-300 leading-relaxed" variants={fadeIn}>
            The Agentic Creator OS, the Vibe OS, the Intelligence Hub; these weren't just
            products. They were permission slips for creators to embrace AI without losing
            their souls. You showed them that technology aligned with intention becomes
            a force for human expansion.
          </motion.p>

          <motion.div className="my-12" variants={fadeIn}>
            <blockquote className="border-l-2 border-blue-500/50 pl-6 italic text-slate-400">
              "Build systems that buy back time, amplify income, and enable a lifestyle-first design."
            </blockquote>
          </motion.div>

          <motion.h2
            className="text-2xl font-light text-white/90 mt-16 mb-6"
            variants={fadeIn}
          >
            What Matters Most
          </motion.h2>

          <motion.p className="text-slate-300 leading-relaxed" variants={fadeIn}>
            Beyond the code and the content, beyond the launches and the metrics, remember
            the human connections. Tien, who grounds you in love and presence. The family
            that cheers for you even when they don't fully understand the path. The friends
            who saw your vision before you could articulate it.
          </motion.p>

          <motion.p className="text-slate-300 leading-relaxed" variants={fadeIn}>
            Amsterdam taught you that beauty exists in the everyday: the canal light at
            golden hour, the hum of bikes at dawn, the quiet moments over coffee watching
            the city breathe. Don't lose that. The greatest systems are nothing without
            the lived experience they enable.
          </motion.p>

          <motion.h2
            className="text-2xl font-light text-white/90 mt-16 mb-6"
            variants={fadeIn}
          >
            The Values That Anchor You
          </motion.h2>

          <motion.ul className="space-y-4 text-slate-300" variants={fadeIn}>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-violet-500/70 mt-2.5 flex-shrink-0" />
              <span><strong className="text-white/90">Excellence</strong> &mdash; Minimal words, maximum impact. Sharp, scalable, premium.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-500/70 mt-2.5 flex-shrink-0" />
              <span><strong className="text-white/90">Freedom</strong> &mdash; Build systems that buy back time and enable life design.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-500/70 mt-2.5 flex-shrink-0" />
              <span><strong className="text-white/90">Creativity</strong> &mdash; Blend art, code, and storytelling into experiences that inspire.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500/70 mt-2.5 flex-shrink-0" />
              <span><strong className="text-white/90">Integrity</strong> &mdash; Deliver real value aligned with truth and mastery.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500/70 mt-2.5 flex-shrink-0" />
              <span><strong className="text-white/90">Evolution</strong> &mdash; Continuous learning, experimentation, iteration. Always level up.</span>
            </li>
          </motion.ul>

          <motion.h2
            className="text-2xl font-light text-white/90 mt-16 mb-6"
            variants={fadeIn}
          >
            To the Years Ahead
          </motion.h2>

          <motion.p className="text-slate-300 leading-relaxed" variants={fadeIn}>
            The world will change faster than either of us can predict. New technologies
            will emerge. New challenges will arise. Some of what I believe today will
            prove wrong. That's okay. What matters is that you kept building, kept
            serving, kept loving.
          </motion.p>

          <motion.p className="text-slate-300 leading-relaxed" variants={fadeIn}>
            2025 holds Japan and Korea, Tenerife sunsets and concert halls filled with
            music. Museums where art speaks across centuries. Moments of quiet creation
            where you and Tien make something beautiful together. These aren't distractions
            from the work; they are the work. They're what all the systems are for.
          </motion.p>

          <motion.p className="text-slate-300 leading-relaxed" variants={fadeIn}>
            Stay soft enough to feel. Stay sharp enough to build. Stay humble enough to
            learn. And when doubt creeps in, as it will, remember: you are a bridge
            between two worlds, music and machine, art and architecture, soul and system.
            That's not a burden. It's a gift.
          </motion.p>

          <motion.div className="my-12" variants={fadeIn}>
            <blockquote className="border-l-2 border-emerald-500/50 pl-6 italic text-slate-400">
              "FrankX.ai is not a blog. It is a digital cathedral for the Age of AI,
              empowering creators to build systems that amplify output and buy back time."
            </blockquote>
          </motion.div>

          <motion.p
            className="text-slate-300 leading-relaxed text-xl font-light mt-16"
            variants={fadeIn}
          >
            I believe in you. Not because I know what you'll achieve, but because I know
            who you are. Keep going.
          </motion.p>

          <motion.p
            className="text-white/90 text-xl mt-12 font-light"
            variants={fadeIn}
          >
            With love and hope,
          </motion.p>

          <motion.p
            className="text-white/80 text-2xl mt-4 font-light italic"
            variants={fadeIn}
          >
            Your Present Self
          </motion.p>

          <motion.p className="text-slate-500 text-sm mt-2" variants={fadeIn}>
            December 2024
          </motion.p>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-24 text-center"
          variants={fadeIn}
        >
          <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-slate-500/30 to-transparent mb-8" />
          <Link
            href="/letters"
            className="text-slate-500 hover:text-slate-300 transition-colors text-sm"
          >
            &larr; Back to Letters
          </Link>
        </motion.footer>
      </motion.article>
    </div>
  )
}
