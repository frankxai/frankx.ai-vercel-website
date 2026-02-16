import type { Metadata } from 'next'
import Link from 'next/link'
import PrintButton from './PrintButton'

export const metadata: Metadata = {
  title: 'The 7 Pillars Framework — Soulbook by FrankX',
  description:
    'A one-page framework for building every dimension of your life. Energy, Mind, Soul, Craft, Capital, Circle, Legacy. Print or save as PDF.',
}

const pillars = [
  {
    number: 1,
    title: 'Energy',
    subtitle: 'The Foundation',
    keyPractices: [
      'Morning Protocol: light, movement, cold, hydration within 90 minutes',
      'Energy Audit: track inputs, drains, and levels for one week',
      'Sleep as investment: 7-8h non-negotiable, consistent schedule',
      'Nutrition timing: eat for performance, not just pleasure',
    ],
    question: 'What gave you energy this week? What drained it?',
    chapter: 'chapter-01-energy',
  },
  {
    number: 2,
    title: 'Mind',
    subtitle: 'The Operating System',
    keyPractices: [
      'Cognitive load management: single-task deep work blocks',
      'Input diet: curate information sources ruthlessly',
      'Mental models: learn frameworks, not just facts',
      'Stress inoculation: controlled discomfort builds resilience',
    ],
    question: 'What thought pattern is holding you back right now?',
    chapter: 'chapter-02-mind',
  },
  {
    number: 3,
    title: 'Soul',
    subtitle: 'The Compass',
    keyPractices: [
      'Values clarity: name your top 5 non-negotiable values',
      'Solitude practice: 20 minutes daily without input',
      'Alignment check: does your calendar match your values?',
      'Purpose iteration: purpose evolves — revisit quarterly',
    ],
    question: 'If you could only do one thing for the rest of your life, what would it be?',
    chapter: 'chapter-03-soul',
  },
  {
    number: 4,
    title: 'Craft',
    subtitle: 'The Work',
    keyPractices: [
      'Deliberate practice: focused effort at the edge of ability',
      '10,000 hours with feedback, not just repetition',
      'Ship consistently: finished work beats perfect plans',
      'Master one thing before diversifying',
    ],
    question: 'What skill would 10x your impact if you mastered it?',
    chapter: 'chapter-04-craft',
  },
  {
    number: 5,
    title: 'Capital',
    subtitle: 'The Leverage',
    keyPractices: [
      'Income diversification: build multiple revenue streams',
      'Savings rate > income level for wealth building',
      'Invest in assets that compound: skills, relationships, equity',
      'Financial literacy: understand tax, debt, and compound interest',
    ],
    question: 'How many income streams do you have? What could you add?',
    chapter: 'chapter-05-capital',
  },
  {
    number: 6,
    title: 'Circle',
    subtitle: 'The Network',
    keyPractices: [
      'Audit your top 5: you become the average of your closest people',
      'Give first: create value before asking for anything',
      'Prune deliberately: distance from chronic negativity',
      'Build across domains: diverse networks > deep silos',
    ],
    question: 'Who in your life elevates you? Who drains you?',
    chapter: 'chapter-06-circle',
  },
  {
    number: 7,
    title: 'Legacy',
    subtitle: 'The Long Game',
    keyPractices: [
      'Think in decades, act in days',
      'Build things that outlast you: systems, content, institutions',
      'Teach what you know: legacy compounds through others',
      'Design for your future self, not your current comfort',
    ],
    question: 'What would you want people to say about you in 30 years?',
    chapter: 'chapter-07-legacy',
  },
]

export default function FrameworkPage() {
  return (
    <main className="min-h-screen bg-black text-white print:bg-white print:text-black">
      {/* Print styles */}
      <style>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .print-break { page-break-after: always; }
          a { color: inherit !important; text-decoration: none !important; }
        }
      `}</style>

      {/* Screen-only top bar */}
      <div className="no-print sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/soulbook" className="text-sm text-white/50 hover:text-white transition-colors">
            &larr; Back to Soulbook
          </Link>
          <PrintButton />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 print:py-6 print:px-8">
        {/* Header */}
        <header className="text-center mb-12 print:mb-8">
          <p className="text-xs font-medium text-amber-400/70 uppercase tracking-[0.2em] mb-3 print:text-gray-500">
            Soulbook Framework
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 print:text-3xl">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent print:text-black">
              7 Pillars of a Complete Life
            </span>
          </h1>
          <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed print:text-gray-600">
            A practical framework for building every dimension of your life.
            Read the full chapters free at{' '}
            <span className="text-white/60 print:text-black font-medium">frankx.ai/soulbook</span>
          </p>
        </header>

        {/* Pillars */}
        <div className="space-y-6 print:space-y-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-6 print:border-gray-200 print:bg-white print:p-4 print:rounded-lg"
            >
              <div className="flex items-start gap-4">
                {/* Number */}
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 print:bg-gray-100">
                  <span className="text-lg font-bold text-amber-400 print:text-gray-700">
                    {pillar.number}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <h2 className="text-xl font-bold text-white print:text-black">
                      {pillar.title}
                    </h2>
                    <span className="text-xs text-white/25 print:text-gray-400">
                      {pillar.subtitle}
                    </span>
                  </div>

                  {/* Practices */}
                  <ul className="space-y-1.5 mb-3">
                    {pillar.keyPractices.map((practice, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/50 print:text-gray-600">
                        <span className="text-white/20 mt-0.5 print:text-gray-400">&#x2022;</span>
                        {practice}
                      </li>
                    ))}
                  </ul>

                  {/* Reflection question */}
                  <div className="rounded-lg bg-white/[0.03] border border-white/[0.04] px-4 py-3 print:bg-gray-50 print:border-gray-200">
                    <p className="text-xs text-white/25 uppercase tracking-wider mb-1 print:text-gray-500">
                      Reflect
                    </p>
                    <p className="text-sm text-white/60 italic print:text-gray-700">
                      {pillar.question}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How to use */}
        <section className="mt-12 print:mt-8">
          <h2 className="text-xl font-bold mb-4 text-white/80 print:text-black">
            How to Use This Framework
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:gap-3">
            {[
              { step: '1', title: 'Assess', desc: 'Rate each pillar 1-10. Which scores lowest? Start there.' },
              { step: '2', title: 'Read', desc: 'Read the full chapter for your weakest pillar at frankx.ai/soulbook.' },
              { step: '3', title: 'Practice', desc: 'Pick one key practice per pillar. Apply daily for 30 days.' },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-lg border border-white/[0.06] bg-white/[0.015] p-4 text-center print:border-gray-200 print:bg-white"
              >
                <span className="text-2xl font-bold text-amber-400/40 print:text-gray-400">
                  {item.step}
                </span>
                <h3 className="font-semibold text-white/70 mt-1 print:text-black">{item.title}</h3>
                <p className="text-xs text-white/35 mt-1 leading-relaxed print:text-gray-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-white/[0.06] text-center print:border-gray-200 print:mt-8">
          <p className="text-xs text-white/20 print:text-gray-400">
            Soulbook &mdash; 7 Pillars of a Complete Life &mdash; frankx.ai/soulbook
          </p>
          <p className="text-xs text-white/15 mt-1 print:text-gray-300">
            11 books, 82 chapters, all free to read
          </p>
        </footer>

        {/* Screen-only CTA */}
        <div className="no-print mt-8 text-center">
          <Link
            href="/soulbook"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all"
          >
            Start Reading the Full Chapters
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  )
}
