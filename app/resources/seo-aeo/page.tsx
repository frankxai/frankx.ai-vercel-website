import Link from 'next/link'
import { ArrowRight, Download, FileJson, FileText, Table2 } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import EvidenceBrief from '@/components/search-intelligence/EvidenceBrief'

export const metadata = createMetadata({
  title: 'SEO and AEO playbooks for AI-assisted website work',
  description: 'Turn search evidence into a reviewable website improvement. Explore the workflow, prepare a brief and download free evidence and measurement templates.',
  path: '/resources/seo-aeo',
})

const reading = [
  { href: '/resources/seo-aeo/workflow', label: 'The complete workflow', title: 'From search data to a reviewed website change', detail: 'Choose a page, collect the evidence, brief your assistant and check what it produces.' },
  { href: '/resources/seo-aeo/semrush-mcp', label: 'Data access', title: 'Connect Semrush MCP with a bounded research task', detail: 'Check access, discover reports and preserve the result. Documentation reviewed; paid-account execution is untested.' },
  { href: '/blog/aeo-playbook-get-cited-by-ai-2026', label: 'Measurement', title: 'Investigate AI citations with a repeatable question panel', detail: 'Keep mentions, citations, recommendations and referrals distinguishable.' },
  { href: '/blog/aeo-knowledge-graph-2026', label: 'Content relationships', title: 'Connect pages and the evidence behind them', detail: 'Use a content graph when it improves retrieval and maintenance decisions.' },
]

const downloads = [
  { file: 'content-brief.md', name: 'Content brief', detail: 'Reader, evidence, permissions and acceptance in one editable file.', icon: FileText },
  { file: 'evidence-record.json', name: 'Evidence record', detail: 'A blank record that keeps missing values explicitly unknown.', icon: FileJson },
  { file: 'measurement-log.csv', name: 'Measurement log', detail: 'A spreadsheet-ready header for your own observations.', icon: Table2 },
  { file: 'experiment-protocol.md', name: 'Experiment protocol', detail: 'Define the comparison, observation window and stop rule.', icon: FileText },
]

export default function SearchResourcesPage() {
  return (
    <main id="main" className="bg-[#0a0a0b] text-white">
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-28 sm:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-300"><Link href="/resources" className="underline underline-offset-4">Resources</Link><span aria-hidden="true" className="mx-3">/</span>SEO and AEO</nav>
        <header className="grid items-start gap-10 border-b border-white/10 pb-14 pt-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">Search and website practice</p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">Make your next website change worth making.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Use search evidence to decide what to improve, then give your AI assistant a brief you can inspect. Start with one page and carry its sources through to the finished change.</p>
            <Link href="/resources/seo-aeo/workflow" className="mt-8 inline-flex items-center gap-3 rounded-full bg-emerald-300 px-6 py-3 font-semibold text-[#0a0a0b] hover:bg-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">Read the workflow<ArrowRight aria-hidden="true" size={18} /></Link>
            <p className="mt-5 text-sm leading-6 text-slate-400">Guides and blank working templates. No paid account is needed to prepare a brief.</p>
          </div>
          <aside aria-label="A page decision you can inspect" className="rounded-3xl border border-white/15 bg-[#111113] p-6 sm:p-8">
            <p className="font-mono text-xs text-emerald-300">THE WORKING RECORD</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">What supports this change?</h2>
            <dl className="mt-6 divide-y divide-white/10 text-sm">
              {[
                ['Observation', 'A dated source or report'],
                ['Decision', 'A reason to change this page'],
                ['Implementation', 'A draft and inspectable diff'],
                ['Review', 'Claims and behaviour checked'],
                ['Outcome', 'Measured later, with limits'],
              ].map(([term, detail], index) => <div key={term} className="py-4 first:pt-0"><dt className="font-semibold text-white"><span className="mr-3 font-mono text-emerald-300">0{index + 1}</span>{term}</dt><dd className="mt-2 pl-8 leading-6 text-slate-300">{detail}</dd></div>)}
            </dl>
            <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-6 text-slate-400">This is a workflow outline. It does not represent a completed traffic experiment.</p>
          </aside>
        </header>

        <section aria-labelledby="reading-title" className="py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">Choose your task</p>
          <h2 id="reading-title" className="mt-3 text-3xl font-semibold tracking-tight">Read, then make something useful.</h2>
          <div className="mt-8 divide-y divide-white/10">
            {reading.map((item, index) => <article key={item.href} className="grid gap-3 py-7 sm:grid-cols-[11rem_1fr] sm:gap-8"><p className="font-mono text-xs leading-6 text-emerald-300">0{index + 1} / {item.label}</p><div><h3 className="text-xl font-semibold leading-7"><Link href={item.href} className="underline decoration-white/25 underline-offset-4 hover:decoration-emerald-300">{item.title}</Link></h3><p className="mt-3 max-w-2xl leading-7 text-slate-300">{item.detail}</p></div></article>)}
          </div>
        </section>

        <section aria-labelledby="sources-title" className="border-t border-white/10 py-16">
          <h2 id="sources-title" className="text-3xl font-semibold tracking-tight">Choose data for the decision.</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div><h3 className="text-lg font-semibold">Your search performance</h3><p className="mt-3 leading-7 text-slate-300">Use the first-party reports available for your website. Record the period and missing coverage before interpreting a trend.</p></div>
            <div><h3 className="text-lg font-semibold">Market estimates</h3><p className="mt-3 leading-7 text-slate-300">Evaluate Semrush or DataForSEO for a bounded research task. Keep provider estimates distinct from your own site's results.</p></div>
            <div><h3 className="text-lg font-semibold">Page content</h3><p className="mt-3 leading-7 text-slate-300">Use Firecrawl, a specified Apify Actor or a self-hosted crawler to inspect pages. Extraction alone cannot tell you search demand.</p></div>
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-7 text-slate-400">These are editorial options. Links in this hub do not establish a partner relationship, account access or a tested comparison. See the <Link href="/affiliates" className="text-slate-200 underline underline-offset-4">affiliate policy</Link> for monetized recommendations elsewhere.</p>
        </section>

        <section id="downloads" aria-labelledby="downloads-title" className="scroll-mt-28 border-t border-white/10 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">Free working files</p>
          <h2 id="downloads-title" className="mt-3 text-3xl font-semibold tracking-tight">Keep the method. Use your own data.</h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">Download the blank files directly. They contain no measured results, account keys or hidden installation steps.</p>
          <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
            {downloads.map(({ file, name, detail, icon: Icon }) => <li key={file} className="border-b border-white/10 py-6"><a href={`/downloads/seo-aeo/${file}`} download className="inline-flex min-h-11 items-center gap-3 text-lg font-semibold underline decoration-white/25 underline-offset-4 hover:decoration-emerald-300"><Icon aria-hidden="true" size={20} className="text-emerald-300" />{name}<Download aria-hidden="true" size={16} /></a><p className="mt-2 leading-7 text-slate-300">{detail}</p><p className="mt-2 font-mono text-xs text-slate-400">{file}</p></li>)}
          </ul>
        </section>

        <EvidenceBrief />

        <section aria-labelledby="experiments-title" className="border-t border-white/10 py-16">
          <h2 id="experiments-title" className="text-3xl font-semibold tracking-tight">Experiments worth repeating.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">Use these protocols to test your own workflow. They are proposed comparisons; this page reports no winning tool or search uplift.</p>
          <div className="mt-8 space-y-4">
            <details className="rounded-2xl border border-white/15 p-5"><summary className="cursor-pointer text-lg font-semibold">Prompt-only research versus a sourced brief</summary><p className="mt-4 max-w-3xl leading-7 text-slate-300">Give both arms the same task, model and time allowance. Change only the evidence access. Review source support, accepted output, cost and human correction time. Record failures as well as successes.</p></details>
            <details className="rounded-2xl border border-white/15 p-5"><summary className="cursor-pointer text-lg font-semibold">Hosted extraction versus a self-hosted crawler</summary><p className="mt-4 max-w-3xl leading-7 text-slate-300">Freeze a permitted URL set and manually label the required fields. Compare accuracy, missing fields, retries, runtime cost and maintenance effort. Hold the demand-data source constant.</p></details>
          </div>
        </section>

        <footer className="border-t border-white/10 pt-8 text-sm leading-7 text-slate-400">Editorial revision: 27 October 2026. Search outcomes remain unmeasured here. <Link href="/blog/seo-aeo-optimization-acos" className="text-slate-200 underline underline-offset-4">Read the corrected ACOS content workflow.</Link></footer>
      </div>
    </main>
  )
}
