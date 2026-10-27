import Link from 'next/link'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Semrush MCP setup: access, reports and a research prompt',
  description: 'Check Semrush MCP eligibility, connect through the official setup and preserve report evidence. Includes a research prompt and explicit testing limits.',
  path: '/resources/seo-aeo/semrush-mcp',
})

const prompt = [
  'I am reviewing one existing page on my website.',
  'Ask me for the page, audience, market and authorized unit allowance.',
  'Discover the available reports and inspect their current schemas.',
  'Propose the smallest report request that can inform the decision.',
  'Do not execute paid requests before the allowance is established.',
  'Preserve evidence; distinguish estimates, observations and unknowns.',
  'Check existing site coverage before proposing a new page.',
  'Return a page decision, supporting fields and explicit unknowns.',
  'Do not publish or change accounts.',
].join('\n')

export default function SemrushMcpGuide() {
  return (
    <main id="main" className="mx-auto max-w-4xl px-5 pb-24 pt-28 text-white sm:px-8">
      <Link href="/resources/seo-aeo" className="text-sm text-emerald-300 underline underline-offset-4">SEO and AEO resources</Link>
      <header className="border-b border-white/10 pb-10 pt-8">
        <p className="text-xs uppercase tracking-[0.22em] text-emerald-300">Documentation review · 27 October 2026</p>
        <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Give your assistant a small, verifiable Semrush research task.</h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">Start by proving the account can return the report you need. Preserve that result before asking the assistant to turn it into a content decision.</p>
        <p className="mt-5 rounded-2xl border border-white/20 p-5 text-sm leading-7 text-slate-300">This guide reviews official documentation. FrankX has not tested the paid-account connection or measured its cost per task. Links on this page are ordinary editorial links; no Semrush partnership is claimed.</p>
      </header>
      <section className="border-b border-white/10 py-10"><h2 className="text-2xl font-semibold">Check the exact access before buying.</h2><p className="mt-5 leading-8 text-slate-300">Semrush's <a href="https://developer.semrush.com/api/v3/introduction/semrush-mcp/" className="text-emerald-300 underline underline-offset-4">MCP documentation</a> lists eligible subscription options, including plans with 50,000 renewing API units. MCP requests consume API units; report access depends on the subscription. Confirm the current entitlement and balance in your account.</p><p className="mt-5 leading-8 text-slate-300">Write down the decision and reports needed to support it. Compare those requirements with the account's actual access. An eligible integration does not mean every dataset is included.</p></section>
      <section className="border-b border-white/10 py-10"><h2 className="text-2xl font-semibold">Use the official connection path.</h2><p className="mt-5 leading-8 text-slate-300">The documented endpoint uses streamable HTTP and supports OAuth:</p><pre className="mt-5 overflow-x-auto rounded-2xl border border-white/15 bg-[#111113] p-5 text-sm leading-7 text-emerald-200"><code>https://mcp.semrush.com/v2/mcp</code></pre><p className="mt-5 leading-8 text-slate-300">Follow the current client-specific instructions. Authenticate with the intended account and inspect requested permissions. Keep credentials out of briefs, screenshots, repositories and downloaded evidence packets.</p></section>
      <section className="border-b border-white/10 py-10"><h2 className="text-2xl font-semibold">Discover the report before running it.</h2><p className="mt-5 leading-8 text-slate-300">Semrush documents discovery tools, <code className="font-mono text-emerald-200">get_report_schema</code> and <code className="font-mono text-emerald-200">execute_report</code>. Use the exposed schema to determine supported inputs. Set a small row limit and an authorized usage allowance before execution.</p><p className="mt-5 leading-8 text-slate-300">Record the report name, parameters, market, retrieval time, coverage, raw result reference and actual unit consumption when exposed. A failed or empty response is a result to investigate. Preserve missing demand data as unknown.</p></section>
      <section className="border-b border-white/10 py-10"><h2 className="text-2xl font-semibold">A research prompt to adapt</h2><pre className="mt-5 whitespace-pre-wrap break-words rounded-2xl border border-white/15 bg-[#111113] p-5 text-sm leading-7 text-slate-200"><code>{prompt}</code></pre><p className="mt-5 leading-8 text-slate-300">Supply your real website and budget. This prompt is an assignment template. Test the connection and record the actual result separately.</p></section>
      <section className="py-10"><h2 className="text-2xl font-semibold">Check the interpretation before implementation.</h2><p className="mt-5 leading-8 text-slate-300">Read the report yourself. Check geography, date range, units and missing coverage. Reproduce calculations outside the model. A vendor estimate can inform a decision while differing from your website's observed results.</p><p className="mt-5 leading-8 text-slate-300">To evaluate alternatives such as DataForSEO, give each provider the same decision task and record coverage, costs and review effort. Compare the decision quality rather than assuming their metrics match.</p><p className="mt-5 leading-8 text-slate-300">Continue with the <Link href="/resources/seo-aeo/workflow" className="text-emerald-300 underline underline-offset-4">complete website workflow</Link> or <Link href="/resources/seo-aeo#downloads" className="text-emerald-300 underline underline-offset-4">download an evidence record</Link>.</p></section>
    </main>
  )
}
