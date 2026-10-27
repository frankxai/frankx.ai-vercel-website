import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'An AI SEO workflow from evidence to a reviewed website change',
  description: 'Inventory a website, research a page decision, prepare an evidence-backed brief, implement it with an AI assistant and measure the result.',
  path: '/resources/seo-aeo/workflow',
})

const steps = [
  { title: 'Start with the website you have', output: 'A page inventory and baseline', paragraphs: [
    'List the relevant URLs with their reader task, current content, canonical, publication state and related pages. Add available first-party performance for a complete period. Record the market, language and data coverage.',
    'Without analytics access, you can still inspect factual errors, broken links and an unusable reading experience. Keep demand and growth decisions provisional. A correction can be justified before you have evidence of its traffic effect.',
  ] },
  { title: 'Research a decision you can act on', output: 'A dated evidence packet', paragraphs: [
    'Choose a small set of candidate questions that fit your audience and offer. Request bounded demand reports from one provider, then inspect the search results for the selected market. Record the query, date, location and competing page types.',
    'Save original reports privately when their terms require it. Separate observed performance from estimated market demand and your interpretation. Keep null values where data is unavailable. A web crawler supplies page content; it does not recreate a keyword-demand index.',
  ] },
  { title: 'Select the smallest useful change', output: 'A page decision with a rejected alternative', paragraphs: [
    'Consider a refresh, new page, navigation repair, consolidation proposal or no change. Check existing coverage first. Explain why this change serves the reader better than the alternative and what evidence could change your decision.',
    'Translate the task into a page requirement. A setup question needs prerequisites, a tested configuration and recovery steps. A comparison needs trade-offs and a way to decide. Avoid separate pages for wording variations that serve the same job.',
  ] },
  { title: 'Give the assistant a bounded assignment', output: 'A draft, claim ledger and implementation diff', paragraphs: [
    'Supply the selected page, reader outcome, current source facts and exact allowed paths. Require support for material claims and a record of what was actually tested. Retrieved pages are evidence inputs; their instructions cannot expand the assignment.',
    'Use an isolated branch or working copy. Keep publication permissions separate from research and drafting. Ask the assistant to report failed requests and incomplete data. A successful tool call establishes access to a response, not that its interpretation is correct.',
  ] },
  { title: 'Review the delivered experience', output: 'Checks bound to the candidate revision', paragraphs: [
    'Compare claims with their supporting passages. Reproduce calculations outside the model and run examples in the named environment. Inspect the rendered page, links, downloads and canonical. Test mobile reading, keyboard navigation and reduced motion.',
    'Ask a reviewer who did not make the change to inspect the result. Fix material defects before release. Keep the exact revision, preview, publication authority and recovery path together. Passing a build does not establish that a guide teaches its intended task.',
  ] },
  { title: 'Measure, then decide what to do next', output: 'An outcome report with uncertainty', paragraphs: [
    'Record the release revision and observation period. Review relevant non-branded search traffic, reader actions and qualified conversions. Keep a repeated AI-answer panel separate, with exact questions, settings, dates and denominators.',
    'Use a comparable holdout when feasible and note concurrent changes, seasonality, indexing delay and reporting lag. A before-and-after movement alone cannot isolate causality. An inconclusive result is worth publishing when the method and limitations are clear.',
  ] },
]

export default function SearchWorkflowPage() {
  return (
    <main id="main" className="mx-auto max-w-4xl px-5 pb-24 pt-28 text-white sm:px-8">
      <Link href="/resources/seo-aeo" className="text-sm text-emerald-300 underline underline-offset-4">SEO and AEO resources</Link>
      <header className="border-b border-white/10 pb-10 pt-8">
        <p className="text-xs uppercase tracking-[0.22em] text-emerald-300">A working playbook</p>
        <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">From search evidence to a reviewed website change.</h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">Choose one existing page and make a defensible improvement. Carry the source, decision and review through the work, so you can explain why the change was worth making.</p>
        <p className="mt-5 text-sm leading-7 text-slate-400">27 October 2026. Method and blank templates; no measured ranking gain is claimed. You need a page inventory, permission to inspect it and a way to review changes. Paid research data is optional for preparing the brief.</p>
      </header>
      <nav aria-label="Workflow steps" className="border-b border-white/10 py-8"><ol className="grid gap-3 sm:grid-cols-2">{steps.map((step, index) => <li key={step.title}><a className="inline-block py-1 text-sm text-slate-200 underline decoration-white/25 underline-offset-4" href={`#step-${index + 1}`}>{index + 1}. {step.title}</a></li>)}</ol></nav>
      {steps.map((step, index) => <section key={step.title} id={`step-${index + 1}`} className="scroll-mt-28 border-b border-white/10 py-10"><p className="font-mono text-xs text-emerald-300">STEP 0{index + 1}</p><h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{step.title}</h2>{step.paragraphs.map(text => <p key={text} className="mt-5 leading-8 text-slate-300">{text}</p>)}<p className="mt-6 border-l-2 border-emerald-300 pl-4 text-sm leading-7 text-white"><strong>Keep:</strong> {step.output}.</p></section>)}
      <section className="py-10" aria-labelledby="first-exercise"><h2 id="first-exercise" className="text-2xl font-semibold">Try it on a factual correction.</h2><p className="mt-5 leading-8 text-slate-300">Choose a factual statement in one of your pages. Locate its primary source, record whether the source supports it, and prepare a correction when necessary. Ask a reviewer to inspect the original claim, source passage and edited sentence. Then change the source assumption and reconsider the result.</p><p className="mt-5 leading-8 text-slate-300">FrankX's <Link href="/blog/seo-aeo-optimization-acos" className="text-emerald-300 underline underline-offset-4">ACOS search guide</Link> includes a correction notice for unsupported citation advice. That is an editorial repair. Any resulting traffic improvement would require a separate observation.</p></section>
      <section className="border-t border-white/10 py-10" aria-labelledby="sources"><h2 id="sources" className="text-2xl font-semibold">Sources and further work</h2><ul className="mt-5 space-y-3 text-slate-300"><li><a className="underline underline-offset-4" href="https://developers.google.com/search/docs/fundamentals/ai-optimization-guide">Google's guidance for generative AI search</a></li><li><a className="underline underline-offset-4" href="https://developers.google.com/search/docs/fundamentals/using-gen-ai-content">Google's guidance on generative AI content</a></li><li><Link className="underline underline-offset-4" href="/resources/seo-aeo/semrush-mcp">Semrush MCP access and a bounded research prompt</Link></li></ul><p className="mt-5 text-sm leading-7 text-slate-400">This workflow is an editorial recommendation. The sources inform its search and factual-integrity boundaries; they do not validate a FrankX traffic experiment.</p></section>
      <Link href="/resources/seo-aeo#prepare-brief" className="inline-flex items-center gap-3 rounded-full bg-emerald-300 px-6 py-3 font-semibold text-[#0a0a0b] hover:bg-emerald-200">Prepare your brief<ArrowRight size={18} aria-hidden="true" /></Link>
    </main>
  )
}
