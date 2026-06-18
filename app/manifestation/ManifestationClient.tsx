'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BookOpen, FlaskConical, Music, Sparkles, Compass } from 'lucide-react'
import EmailCapture from '@/components/EmailCapture'
import {
  SectionHeading,
  MechanismGrid,
  ExperimentList,
  ExerciseGrid,
  IdentityProgression,
  FaqList,
} from '@/components/manifestation/shared'
import {
  mechanisms,
  experiments,
  exercises,
  identityTiers,
  theSecret,
  thinkAndGrowRich,
} from '@/data/manifestation'

export const hubFaqs = [
  {
    question: 'Is manifestation real?',
    answer:
      'Parts of it are. Vivid mental rehearsal changes your brain and behaviour, and a specific intention biases what your attention surfaces. The metaphysical claims — that thought emits a frequency that reorders the world — are not supported. The useful move is to keep the mechanisms and drop the cosmology.',
  },
  {
    question: 'What is a Reality Architect?',
    answer:
      'Someone who turns a felt vision into shipped reality on a loop: vision becomes a spec, the spec becomes something AI helps render, the rendering ships, and the result teaches the next loop. It is the stage past "Manifestation Master" — manifestation plus the build.',
  },
  {
    question: 'How does self-made music fit in?',
    answer:
      'The emotional state you carry changes what you do. Music is the fastest reliable lever for state — tempo sets energy, mode sets mood, lyric sets the message. Building your own track for the exact state a goal needs (the Vibe OS idea) turns a vague notion of "vibration" into a concrete, repeatable tool.',
  },
  {
    question: 'Do I need to believe in anything?',
    answer:
      'No. The practice runs on how your own brain and behaviour work. You do not have to believe in the universe sending things your way — you set a clear intention, set your state, keep your attention there, and act. The results come from the loop, not from faith.',
  },
]

const navCards = [
  { href: '/the-secret', icon: BookOpen, title: 'The Secret', desc: 'The Law of Attraction, read honestly — what worked, what to ignore.' },
  { href: '/think-and-grow-rich', icon: Compass, title: 'Think and Grow Rich', desc: "Hill's 13 principles reframed as a system you can actually run." },
  { href: '/manifestation/quest', icon: Sparkles, title: 'The 10-Day Quest', desc: 'A guided loop from Manifestation Master to Reality Architect.' },
  { href: '/research/manifestation-law-of-attraction-ai-systems', icon: FlaskConical, title: 'The Research', desc: 'Mechanism vs. belief, with sources and honest limitations.' },
]

export default function ManifestationClient() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/15 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[11px] tracking-[0.25em] uppercase text-violet-300/70 mb-6">
              Manifestation · Honestly
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              I didn&rsquo;t believe in manifestation.{' '}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Then I ran it as an experiment.
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
              Things started showing up — not because the universe rearranged itself, but because
              imagination, a felt state, and focused attention changed what I noticed and what I did.
              Keep the mechanisms, drop the cosmology, set your state with your own music, and let AI
              render the vision fast. That loop makes you a Reality Architect.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/manifestation/quest"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
              >
                Start the 10-day quest
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/research/manifestation-law-of-attraction-ai-systems"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white/80 font-medium rounded-full hover:bg-white/5 transition-colors"
              >
                Read the research
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What changed for me */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white mb-4">What changed for me</h2>
          <div className="space-y-4 text-white/65 text-lg leading-relaxed">
            <p>
              For years, &ldquo;manifestation&rdquo; was a word that made me close the tab. Then two
              books got under my skin — <em>The Secret</em> and <em>Think and Grow Rich</em>. Not
              because they&rsquo;re rigorous, but because underneath the mysticism they kept circling
              something I couldn&rsquo;t dismiss.
            </p>
            <p>
              So I tried it the way I try anything: ten minutes each morning, one specific outcome,
              run like a film until I could feel the moment it landed — then one action toward it
              before noon. The thinking didn&rsquo;t move the needle. The <em>feeling</em> did. And
              when I set that feeling on purpose with my own music, then used AI to render the vision
              into something real in minutes, it stopped being a hope and became a practice I look
              forward to every day.
            </p>
          </div>
          <Link
            href="/blog/manifestation-reality-architect-ai-vibe"
            className="inline-flex items-center gap-1.5 mt-6 text-violet-300/90 hover:text-violet-200 transition-colors"
          >
            Read the full story <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* How it actually works */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <SectionHeading
          eyebrow="The mechanism"
          title="How it actually works"
          intro="Strip the cosmology and a defensible core remains. Here is what has a real mechanism, what's a useful practice, and where I hold a claim lightly."
        />
        <MechanismGrid mechanisms={mechanisms} />
      </section>

      {/* Identity progression */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <SectionHeading
          eyebrow="The path"
          title="Manifestation Master → Reality Architect"
          intro="Two stages. The first is the inner game. The second turns the felt vision into shipped reality on a loop."
        />
        <IdentityProgression tiers={identityTiers} />
      </section>

      {/* Navigation cards */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {navCards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group relative block rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-violet-500/30 transition-all"
            >
              <div className="inline-flex p-2.5 rounded-xl bg-violet-500/10 text-violet-300 mb-4">
                <c.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white mb-1">{c.title}</h3>
              <p className="text-sm text-white/50">{c.desc}</p>
              <ArrowRight className="absolute bottom-6 right-6 w-4 h-4 text-white/20 group-hover:text-violet-300 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* Exercises */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <SectionHeading
          eyebrow="The daily reps"
          title="Exercises"
          intro="The practices that make up the inner game. Short, repeatable, and built to be done — not just read."
        />
        <ExerciseGrid exercises={exercises} />
      </section>

      {/* Experiments */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <SectionHeading
          eyebrow="Test it yourself"
          title="Experiments"
          intro="Don't take my word for it. Each one has a hypothesis, a protocol, and a way to measure whether it did anything. Keep an evidence log."
        />
        <ExperimentList experiments={experiments} />
      </section>

      {/* The books */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <SectionHeading eyebrow="Where it started" title="The two books, read honestly" />
        <div className="grid md:grid-cols-2 gap-6">
          {[theSecret, thinkAndGrowRich].map((book) => (
            <Link
              key={book.slug}
              href={`/${book.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-7 hover:border-violet-500/30 transition-all"
            >
              <div className="flex items-center gap-2 text-xs text-white/40 mb-3">
                <BookOpen className="w-4 h-4" /> {book.author} · {book.year}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{book.title}</h3>
              <p className="text-white/55 mb-4">{book.oneLine}</p>
              <span className="inline-flex items-center gap-1.5 text-violet-300/90 group-hover:text-violet-200 transition-colors">
                Read my honest take <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Soft CTA: Vibe OS + email */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.07] to-transparent p-8 md:p-10">
          <div className="inline-flex p-3 rounded-xl bg-violet-500/10 text-violet-300 mb-5">
            <Music className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Set your state with your own music
          </h2>
          <p className="text-white/60 mb-6 max-w-2xl">
            The state you carry into the work changes the work. Vibe OS is the system I use to build
            tracks for an exact goal-state — tempo for energy, mode for mood, lyric for the message.
            It&rsquo;s the engine behind the alignment step in every exercise on this page.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Link
              href="/products/vibe-os"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
            >
              Explore Vibe OS <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/music-lab"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white/80 font-medium rounded-full hover:bg-white/5 transition-colors"
            >
              The Music Lab
            </Link>
          </div>
          <div className="border-t border-white/10 pt-6">
            <p className="text-white/70 font-medium mb-3">
              Get the field notes — the experiments, the music, the loop, as I refine them.
            </p>
            <EmailCapture product="manifestation" buttonText="Send me the field notes" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <SectionHeading title="Questions" />
        <FaqList faqs={hubFaqs} />
      </section>
    </div>
  )
}
