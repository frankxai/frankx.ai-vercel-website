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
    <main className="min-h-screen text-white print:bg-white print:text-black relative overflow-hidden">
      {/* Background with mesh gradients */}
      <div className="fixed inset-0 -z-10 print:hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080A12] via-[#050508] to-black" />
        {/* Floating gradient orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-radial from-amber-500/10 via-transparent to-transparent blur-3xl animate-blob" />
        <div className="absolute bottom-[-30%] right-[-15%] w-[600px] h-[600px] rounded-full bg-gradient-radial from-purple-500/8 via-transparent to-transparent blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-[40%] left-[60%] w-[400px] h-[400px] rounded-full bg-gradient-radial from-cyan-500/6 via-transparent to-transparent blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .print-break { page-break-after: always; }
          a { color: inherit !important; text-decoration: none !important; }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 15s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      {/* Screen-only top bar - liquid glass */}
      <div className="no-print sticky top-0 z-50 backdrop-blur-2xl bg-gradient-to-b from-black/60 via-black/40 to-transparent border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href="/soulbook"
            className="text-sm text-white/50 hover:text-white transition-all duration-300 flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">&larr;</span>
            <span>Back to Soulbook</span>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="/products/soulbook-7-pillars-framework.pdf"
              download
              className="text-xs px-4 py-1.5 rounded-full bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.08] text-white/60 hover:text-white hover:border-amber-500/30 transition-all duration-300"
            >
              Download PDF
            </a>
            <PrintButton />
          </div>
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

        {/* Pillars - Liquid Glass Cards */}
        <div className="space-y-6 print:space-y-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="group rounded-2xl relative overflow-hidden print:border print:border-gray-200 print:bg-white print:p-4 print:rounded-lg transition-all duration-500 hover:scale-[1.01]"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%), rgba(15,16,24,0.6)',
                backdropFilter: 'blur(40px) saturate(150%)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              {/* Top edge highlight - simulates glass refraction */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent print:hidden" />

              <div className="flex items-start gap-4 p-6 print:p-0">
                {/* Number - Liquid button style */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden group-hover:scale-110 transition-transform duration-300 print:bg-gray-100 print:w-10 print:h-10 print:rounded-lg"
                  style={{
                    background: 'linear-gradient(180deg, rgba(245,158,11,0.15) 0%, rgba(245,158,11,0.05) 100%)',
                    border: '1px solid rgba(245,158,11,0.2)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(245,158,11,0.15)',
                  }}
                >
                  <span className="text-lg font-bold bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent print:text-gray-700 print:bg-none">
                    {pillar.number}
                  </span>
                  {/* Subtle shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 print:hidden" />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <h2 className="text-xl font-bold text-white print:text-black tracking-tight">
                      {pillar.title}
                    </h2>
                    <span className="text-xs text-white/25 print:text-gray-400 font-medium">
                      {pillar.subtitle}
                    </span>
                  </div>

                  {/* Practices */}
                  <ul className="space-y-2 mb-4">
                    {pillar.keyPractices.map((practice, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-white/55 print:text-gray-600 leading-relaxed">
                        <span className="text-amber-400/40 mt-0.5 print:text-gray-400 font-bold">›</span>
                        <span className="flex-1">{practice}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Reflection question - nested glass card */}
                  <div
                    className="rounded-xl px-4 py-3.5 print:bg-gray-50 print:border print:border-gray-200 print:rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(245,158,11,0.02) 100%)',
                      border: '1px solid rgba(245,158,11,0.12)',
                    }}
                  >
                    <p className="text-[10px] font-bold text-amber-400/70 uppercase tracking-[0.15em] mb-1.5 print:text-gray-500">
                      Reflect
                    </p>
                    <p className="text-sm text-white/60 italic leading-relaxed print:text-gray-700">
                      {pillar.question}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How to use - Premium cards */}
        <section className="mt-16 print:mt-8">
          <div className="text-center mb-8 print:mb-4">
            <h2 className="text-2xl font-bold text-white print:text-black mb-2 tracking-tight">
              How to Use This Framework
            </h2>
            <p className="text-sm text-white/40 print:text-gray-500">Three steps to start building a complete life</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 print:gap-3">
            {[
              { step: '01', title: 'Assess', desc: 'Rate each pillar 1-10. Which scores lowest? That's where you start.' },
              { step: '02', title: 'Read', desc: 'Read the full chapter for your weakest pillar. Each is practical and immediately useful.' },
              { step: '03', title: 'Practice', desc: 'Pick one key practice per pillar. Apply daily for 30 days. Small actions compound.' },
            ].map((item, i) => (
              <div
                key={item.step}
                className="group relative rounded-2xl p-6 text-center overflow-hidden print:border print:border-gray-200 print:bg-white print:p-4 transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%), rgba(15,16,24,0.8)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                {/* Top highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent print:hidden" />

                <div
                  className="text-4xl font-bold mb-3 bg-clip-text text-transparent print:text-gray-400"
                  style={{
                    backgroundImage: 'linear-gradient(180deg, rgba(245,158,11,0.5) 0%, rgba(245,158,11,0.15) 100%)',
                  }}
                >
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 print:text-black">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed print:text-gray-500">
                  {item.desc}
                </p>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 print:hidden pointer-events-none" />
              </div>
            ))}
          </div>
        </section>

        {/* Screen-only Download CTA - Liquid button */}
        <div className="no-print mt-16 text-center">
          <div
            className="inline-block rounded-3xl p-8 max-w-2xl mx-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(168,85,247,0.06) 100%), rgba(15,16,24,0.8)',
              border: '1px solid rgba(245,158,11,0.15)',
              backdropFilter: 'blur(60px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            <h3 className="text-xl font-bold text-white mb-3">Take It With You</h3>
            <p className="text-sm text-white/50 mb-6 leading-relaxed">
              Download the PDF for offline access, or start reading the full chapters with exercises and progress tracking.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {/* Liquid Metal Download Button */}
              <a
                href="/products/soulbook-7-pillars-framework.pdf"
                download
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,229,160,1) 0%, rgba(212,175,55,1) 40%, rgba(184,134,11,1) 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.2), 0 4px 16px rgba(212,175,55,0.4), 0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                <span className="relative z-10 font-semibold text-sm text-gray-900">Download PDF (644 KB)</span>
                <svg className="relative z-10 w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>

              {/* Glass secondary button */}
              <Link
                href="/soulbook"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.2)',
                }}
              >
                Read Full Chapters
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/[0.04] text-center print:border-gray-200 print:mt-8">
          <div className="mb-3">
            <p className="text-sm font-semibold text-white/40 print:text-gray-600">FrankX</p>
            <p className="text-xs text-amber-400/40 print:text-gray-500 mt-1">frankx.ai/soulbook</p>
          </div>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto mb-3 print:hidden" />
          <p className="text-xs text-white/20 print:text-gray-400">
            11 books · 82 chapters · All free to read · Build what matters.
          </p>
        </footer>
      </div>
    </main>
  )
}
