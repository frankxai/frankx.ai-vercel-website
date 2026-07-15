import { PrintWorksheetButton } from '@/components/tallinn-experience/PrintWorksheetButton'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Purpose-to-Practice Plan — Printable worksheet',
  description: 'The print-ready two-page worksheet for the independent Purpose to Practice session in Tallinn.',
  path: '/experiences/tallinn-2026/purpose-to-practice/map',
  noindex: true,
})

const signals = [
  {
    number: '01',
    title: 'Everyday meaning',
    prompt: 'Which people, activities, moments, or responsibilities feel meaningful or energising now?',
  },
  {
    number: '02',
    title: 'Demonstrated strengths',
    prompt: 'What do people already trust you to notice, make, decide, or improve?',
  },
  {
    number: '03',
    title: 'Useful contribution',
    prompt: 'Who could benefit from what you know or do?',
  },
  {
    number: '04',
    title: 'This season',
    prompt: 'What limits must this practice respect—energy, money, care, time, or attention?',
  },
] as const

const roles = [
  { n: 'A1', role: 'Research helper', output: 'Relevant sources and open questions' },
  { n: 'A2', role: 'Drafting helper', output: 'First draft, plan, or summary' },
  { n: 'A3', role: 'Quality checker', output: 'Gaps, risks, and reasons to stop' },
] as const

function WritingLines({ count = 3 }: { count?: number }) {
  return (
    <div aria-hidden="true" className="mt-5 space-y-5">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="h-px bg-slate-300" />
      ))}
    </div>
  )
}
export default function HumanAiPracticeMapPage() {
  return (
    <main id="tallinn-worksheet" className="min-h-screen bg-[#08090b] px-4 pb-16 pt-28 text-white sm:px-8 print:bg-white print:p-0 print:text-slate-950">
      <style>{`
        @media print {
          @page { size: A4; margin: 10mm; }
          body { background: white !important; }
          body * { visibility: hidden; }
          #tallinn-worksheet, #tallinn-worksheet * { visibility: visible; }
          #tallinn-worksheet { position: absolute; left: 0; top: 0; min-height: 0 !important; }
          .worksheet-sheet { box-shadow: none !important; break-after: page; }
          .worksheet-sheet:last-of-type { break-after: auto; }
        }
      `}</style>

      <div className="mx-auto mb-6 flex max-w-[210mm] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <TrackedLink href="/experiences/tallinn-2026/purpose-to-practice" eventName="tallinn_worksheet_back" eventProperties={{ destination: 'purpose_to_practice' }} className="text-sm text-slate-400 underline decoration-white/20 underline-offset-4 hover:text-white">
            ← Purpose to Practice
          </TrackedLink>
          <p className="mt-2 text-xs text-slate-500">Review or print two A4 working pages. No participant data is stored.</p>
        </div>
        <PrintWorksheetButton />
      </div>

      <section className="worksheet-sheet mx-auto min-h-[277mm] max-w-[210mm] bg-[#fffdf8] p-7 text-slate-950 shadow-[0_24px_90px_rgba(0,0,0,0.45)] sm:p-10 print:min-h-[277mm] print:p-6">
        <header className="flex items-start justify-between gap-6 border-b border-slate-300 pb-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">Purpose to Practice · working map 01/02</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em]">What matters now</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">Start with real moments from your life. These questions support reflection; they are not a test or a complete definition of ikigai.</p>
          </div>
          <div className="min-w-36 text-xs leading-6 text-slate-500">
            <p>Name __________________</p>
            <p>Date ___________________</p>
          </div>
        </header>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 print:grid-cols-2">
          {signals.map((signal) => (
            <article key={signal.number} className="min-h-52 border border-slate-300 p-5">
              <p className="font-mono text-[10px] font-semibold text-amber-700">{signal.number}</p>
              <h2 className="mt-4 text-lg font-bold">{signal.title}</h2>
              <p className="mt-2 text-xs leading-5 text-slate-600">{signal.prompt}</p>
              <WritingLines count={3} />
            </article>
          ))}
        </div>

        <div className="mt-5 border-2 border-slate-900 p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">One honest trade-off</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">To make this practice real, what will you decline, reduce, postpone, or stop?</p>
          <WritingLines count={2} />
        </div>

        <div className="mt-5 bg-slate-950 p-6 text-white print:bg-slate-950 print:text-white">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300">Purpose-to-practice sentence</p>
          <p className="mt-3 text-sm leading-6 text-slate-200">In this season, I will use <strong>[strength]</strong> to help <strong>[who]</strong> move toward <strong>[useful change]</strong>, while protecting <strong>[boundary]</strong>.</p>
          <div aria-hidden="true" className="mt-7 space-y-6">
            <div className="h-px bg-white/50" />
            <div className="h-px bg-white/50" />
          </div>
        </div>

        <footer className="mt-6 flex items-center justify-between border-t border-slate-300 pt-4 text-[9px] leading-4 text-slate-500">
          <p>Independent session; not organized, sponsored, or endorsed by Mindvalley.</p>
          <p>FrankX · this worksheet belongs to the participant</p>
        </footer>
      </section>

      <section className="worksheet-sheet mx-auto mt-8 min-h-[277mm] max-w-[210mm] bg-white p-7 text-slate-950 shadow-[0_24px_90px_rgba(0,0,0,0.45)] sm:p-10 print:mt-0 print:min-h-[277mm] print:p-6">
        <header className="border-b border-slate-300 pb-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-700">Purpose to Practice · working map 02/02</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em]">Your weekly practice and 30-day trial</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">AI may help you research, draft, and check. You keep responsibility for meaning, consent, important decisions, and the final commitment.</p>
        </header>

        <div className="mt-7 grid gap-5 sm:grid-cols-[0.9fr_1.1fr] print:grid-cols-[0.9fr_1.1fr]">
          <section className="border border-slate-300 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-700">Weekly practice</p>
            <dl className="mt-5 space-y-5 text-xs">
              <div>
                <dt className="font-bold">Trigger</dt>
                <dd className="mt-1 text-slate-500">When and where does the practice begin?</dd>
                <WritingLines count={1} />
              </div>
              <div>
                <dt className="font-bold">Human move</dt>
                <dd className="mt-1 text-slate-500">What do I notice, choose, or decide?</dd>
                <WritingLines count={2} />
              </div>
              <div>
                <dt className="font-bold">Evidence</dt>
                <dd className="mt-1 text-slate-500">What useful change will I inspect?</dd>
                <WritingLines count={2} />
              </div>
              <div>
                <dt className="font-bold">Review</dt>
                <dd className="mt-1 text-slate-500">When do I continue, change, or stop?</dd>
                <WritingLines count={1} />
              </div>
            </dl>
          </section>

          <section className="border border-slate-300 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-700">Three ways AI may help</p>
            <div className="mt-5 divide-y divide-slate-300 border-y border-slate-300">
              {roles.map((role) => (
                <div key={role.n} className="grid grid-cols-[2.2rem_1fr] gap-3 py-3 text-xs">
                  <p className="font-mono font-bold text-cyan-700">{role.n}</p>
                  <div>
                    <p className="font-bold">{role.role}</p>
                    <p className="mt-1 text-slate-500">{role.output}</p>
                    <p className="mt-3 border-b border-slate-300 pb-1 text-slate-400">My version:</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <p className="text-xs font-bold">Sources the AI may use</p>
              <WritingLines count={2} />
            </div>
          </section>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 print:grid-cols-2">
          <section className="border-2 border-slate-900 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">Human-only decisions</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">What may no AI tool publish, promise, spend, send, or decide without you?</p>
            <WritingLines count={3} />
          </section>
          <section className="border-2 border-slate-900 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">Stop conditions</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">When must the AI stop and hand the work back to you?</p>
            <WritingLines count={3} />
          </section>
        </div>

        <section className="mt-5 bg-slate-950 p-6 text-white print:bg-slate-950 print:text-white">
          <div className="flex items-center justify-between gap-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">30-day experiment</p>
            <p className="text-[10px] text-slate-400">Small · reversible · dated · easy to review</p>
          </div>
          <div className="mt-5 grid gap-5 text-xs sm:grid-cols-2 print:grid-cols-2">
            <div>
              <p className="text-slate-400">From / until</p>
              <div className="mt-4 h-px bg-white/50" />
            </div>
            <div>
              <p className="text-slate-400">What progress would count?</p>
              <div className="mt-4 h-px bg-white/50" />
            </div>
            <div>
              <p className="text-slate-400">One person I may ask for feedback</p>
              <div className="mt-4 h-px bg-white/50" />
            </div>
            <div>
              <p className="text-slate-400">Weekly review appointment</p>
              <div className="mt-4 h-px bg-white/50" />
            </div>
          </div>
        </section>

        <footer className="mt-6 flex items-center justify-between border-t border-slate-300 pt-4 text-[9px] leading-4 text-slate-500">
          <p>This is an educational reflection worksheet—not therapy, medical, legal, or employment advice.</p>
          <p>Purpose-to-Practice Plan · v0.1</p>
        </footer>
      </section>
    </main>
  )
}
