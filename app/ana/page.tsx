import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Sparkles, Users, Workflow, Brain } from 'lucide-react'

// ─── Voice-pending content ──────────────────────────────────────────────────
//
// This page is in the friendship + intellectual-partnership register.
// NOT romantic. Frank has a girlfriend; this page honors Ana's contribution
// to the work, not feelings. The placeholder voice below demonstrates the
// register — Frank rewrites in his own words once the Ana extract arrives.
//
// Quotes are placeholders until Phase 5. Never fabricate Ana's words.

const placeholderQuotes = [
  {
    text: '/* TBD: Ana extract — quote about People Intelligence */',
    context: 'On naming the people in your work',
  },
  {
    text: '/* TBD: Ana extract — quote about Event Intelligence */',
    context: 'On the data that note-taking misses',
  },
  {
    text: '/* TBD: Ana extract — quote about IFS as foundation */',
    context: 'On Self-energy as substrate',
  },
  {
    text: '/* TBD: Ana extract — quote about neuroscience grounding */',
    context: 'On the papers underneath',
  },
  {
    text: '/* TBD: Ana extract — quote about psychology + architecture */',
    context: 'On bridging disciplines',
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AnaPage() {
  return (
    <>
      {/* Hero — portrait, no jaguar, direct */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ana-amber/[0.04] via-transparent to-transparent" aria-hidden />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-28 sm:pt-32 pb-16 text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-ana-amber/30 bg-ana-amber/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-ana-amber mb-8">
            <Heart className="h-3 w-3" />
            For Ana
          </div>

          <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-10 rounded-full overflow-hidden border-2 border-ana-amber/30 shadow-2xl shadow-ana-amber/10">
            <Image
              src="/images/mascot/ana-omega-portrait-v1.jpg"
              alt="Ana-Ω portrait — Latina-boss intellectual, gold-and-emerald hood, tortoiseshell glasses with two visible nose pads, warm-amber gaze"
              fill
              priority
              sizes="256px"
              className="object-cover"
            />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ana-cream mb-6 text-balance">
            For the friend who sees{' '}
            <span className="bg-gradient-to-r from-ana-gold via-ana-amber to-ana-cream bg-clip-text text-transparent">
              what the architecture had to abstract away.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-ana-cream/70 leading-relaxed mb-2 max-w-2xl mx-auto">
            Ana — psychologist, IFS practitioner, intellectual partner.
          </p>
          <p className="text-sm text-ana-cream/50 leading-relaxed max-w-2xl mx-auto">
            This page is a thank-you. The Starlight Intelligence System became more honest because Ana put names on what I&rsquo;d been treating as background.
          </p>
        </div>
      </section>

      {/* Why this page exists — placeholder voice in friendship register */}
      <section className="border-y border-ana-amber/10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-[11px] uppercase tracking-[0.2em] text-ana-amber/70 mb-3 text-center font-semibold">
            Why this page exists
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ana-cream mb-8 text-center">
            Three things she put into the architecture.
          </h2>

          {/*
            Voice-pending. The paragraphs below are a structurally-correct
            placeholder in the right register — friendship + intellectual
            gratitude, no romance. Frank rewrites in his own words when the
            Ana extract is in. Until then, this stays noindex.
          */}
          <div className="space-y-6 text-base text-ana-cream/75 leading-relaxed">
            <p className="font-mono text-sm italic text-ana-cream/40">
              {/* PLACEHOLDER — friendship register. Frank rewrites once extract is in. */}
            </p>

            <p>
              The original Starlight Intelligence System has nine layers. It works. People use it. But Ana watched me build it and noticed three things were missing — three things her training in psychology and IFS made obvious to her, and that I, building from the architect&rsquo;s side, had abstracted into background.
            </p>
            <p>
              <strong className="text-ana-gold">People Intelligence</strong>: the relational data the system was treating as ambient. The names that mattered. The contexts behind the contexts.
            </p>
            <p>
              <strong className="text-ana-gold">Event Intelligence</strong>: the turning points note-taking misses. Not what was said — what changed. The shape of an arc, captured.
            </p>
            <p>
              <strong className="text-ana-gold">IFS as foundation</strong>: not a layer on top, a substrate underneath. Self-energy as the ground all the architecture sits on. Not content — condition.
            </p>
            <p className="text-ana-cream/55 italic">
              Without her, the system would still be clever. With her, it&rsquo;s honest.
            </p>
          </div>
        </div>
      </section>

      {/* Three contributions, with icons */}
      <section className="border-b border-ana-amber/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-ana-amber/20 bg-gradient-to-br from-ana-amber/[0.04] to-transparent p-6">
              <Users className="h-6 w-6 text-ana-amber mb-3" />
              <h3 className="text-lg font-bold text-ana-cream mb-2">People Intelligence</h3>
              <p className="text-sm text-ana-cream/65 leading-relaxed">
                The relational layer. Who is in your work, what context they bring, how the people connect to the patterns.
              </p>
            </div>
            <div className="rounded-2xl border border-ana-amber/20 bg-gradient-to-br from-ana-amber/[0.04] to-transparent p-6">
              <Workflow className="h-6 w-6 text-ana-amber mb-3" />
              <h3 className="text-lg font-bold text-ana-cream mb-2">Event Intelligence</h3>
              <p className="text-sm text-ana-cream/65 leading-relaxed">
                The turning-point capture. Not records — arcs. What changed, and why it changed when it did.
              </p>
            </div>
            <div className="rounded-2xl border border-ana-emerald/30 bg-gradient-to-br from-ana-emerald/[0.06] to-transparent p-6">
              <Heart className="h-6 w-6 text-ana-emerald mb-3" />
              <h3 className="text-lg font-bold text-ana-cream mb-2">IFS Foundation</h3>
              <p className="text-sm text-ana-cream/65 leading-relaxed">
                Self-energy as substrate. The layer beneath all the others. Internal Family Systems, anchored.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote sequence — TBD until extract */}
      <section className="border-b border-ana-amber/10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-[11px] uppercase tracking-[0.2em] text-ana-amber/70 mb-3 text-center font-semibold">
            In her words
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ana-cream mb-8 text-center">
            Five quotes, when she signs off on them being public.
          </h2>

          <div className="space-y-6">
            {placeholderQuotes.map((q, i) => (
              <figure
                key={i}
                className="rounded-2xl border border-ana-amber/15 bg-gradient-to-br from-ana-amber/[0.03] to-transparent p-6"
              >
                <Sparkles className="h-4 w-4 text-ana-amber/40 mb-3" />
                <blockquote className="text-base text-ana-cream/40 leading-relaxed font-mono italic">
                  &ldquo;{q.text}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-[11px] uppercase tracking-wider text-ana-amber/50 font-semibold">
                  {q.context}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-ana-cream/40 italic">
            Quotes are placeholders. We don&rsquo;t fabricate Ana&rsquo;s words. This section publishes once she reviews the verbatim extract and consents.
          </p>
        </div>
      </section>

      {/* What she sees that I don't — TBD */}
      <section className="border-b border-ana-amber/10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-[11px] uppercase tracking-[0.2em] text-ana-amber/70 mb-3 text-center font-semibold">
            The questions she asks that I don&rsquo;t
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ana-cream mb-8 text-center">
            Ana&rsquo;s intellectual fingerprint.
          </h2>
          <div className="rounded-2xl border border-ana-amber/15 bg-gradient-to-br from-ana-amber/[0.03] to-transparent p-8">
            <p className="text-base text-ana-cream/45 leading-relaxed font-mono italic">
              {/* TBD: Ana extract — distillation of her intellectual fingerprint, the questions she asks that Frank doesn't, the framings she brings to a problem. Public-safe, consent-gated. */}
              {/* TBD: Ana extract — her intellectual fingerprint distilled. The 3-5 questions she asks that Frank doesn&rsquo;t. The framings only she sees. Public-safe, consent-gated. */}
            </p>
          </div>
        </div>
      </section>

      {/* Footer — link to AIS */}
      <section>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20 text-center">
          <Brain className="h-8 w-8 text-ana-amber mx-auto mb-4" />
          <h2 className="font-display text-xl sm:text-2xl font-bold text-ana-cream mb-3">
            The system she helped build
          </h2>
          <p className="text-sm text-ana-cream/60 mb-6 max-w-xl mx-auto">
            If you read all the way down here, the next page is the one with the architecture.
          </p>
          <Link
            href="/ana-intelligence-system"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ana-gold to-ana-amber px-6 py-3 text-sm font-semibold text-ana-obsidian transition-all hover:from-ana-amber hover:to-ana-gold"
          >
            Ana Intelligence System
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </>
  )
}
