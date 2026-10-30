import Link from 'next/link'
import { ArrowRight, FileText, Check, CirclePause } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import release from '@/data/agent-team-release.json'
import { getAgentTeamCheckoutUrl } from '@/lib/agent-team-commerce'

export const metadata = createMetadata({
  title: 'FrankX Agent Team',
  description: 'Five roles for turning your business context into a reviewed post, offer paragraph and weekly plan. Inspect the evaluation toolkit and its worked example.',
  path: '/products/agent-team',
  noindex: true,
})

const roles = [
  ['Director', 'Choose one audience problem and an existing offer. Agree the brief before drafting.'],
  ['Researcher', 'Attach each claim to evidence. Leave missing sources visible.'],
  ['Strategist', 'Choose an angle and explain how it connects to your offer.'],
  ['Creator', 'Write the post, offer paragraph and call to action from the approved brief.'],
  ['Reviewer', 'Challenge the claims and scope. Return corrections for your decision.'],
]

export default function AgentTeamProductPage() {
  const checkout = getAgentTeamCheckoutUrl(release)
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-12 lg:px-8">
        <Link href="/products" className="text-sm text-emerald-300 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">FrankX products</Link>
        <section className="grid gap-12 py-12 lg:grid-cols-[1.2fr_1fr] lg:py-20" aria-labelledby="product-title">
          <div>
            <p className="text-xs tracking-[0.2em] text-emerald-300">FrankX Agent Team · {release.version}</p>
            <h1 id="product-title" className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">Give your next post a brief worth following.</h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300">Bring an existing offer and a real audience problem. Work through a brief, source check, draft and review in your own ChatGPT or Claude account.</p>
            <p className="mt-5 max-w-xl leading-relaxed text-slate-300">The worked example below shows the method: an unsupported promise is caught, removed and replaced with the actual offer scope.</p>
            <a href="#example" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-emerald-300 px-6 py-3 font-semibold text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">Inspect the worked example <ArrowRight size={18} aria-hidden="true" /></a>
            <p className="mt-5 text-sm leading-relaxed text-slate-400">Evaluation candidate. Host compatibility and five-person usability testing are pending. You direct every stage; nothing posts or runs in the background.</p>
          </div>
          <div className="self-center rounded-3xl border border-white/15 bg-white/[0.025] p-7 sm:p-9">
            <FileText className="text-emerald-300" size={26} aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-semibold">One package you can inspect.</h2>
            <ul className="mt-6 space-y-4 text-slate-300">
              {['A business-context intake and weekly plan', 'Five role cards with explicit handoffs', 'One complete content-and-offer workflow', 'Three fictional examples with rejected claims', 'An offline guide and editable Markdown files'].map(item => <li key={item} className="flex gap-3"><Check size={18} className="mt-1 shrink-0 text-emerald-300" aria-hidden="true" /><span>{item}</span></li>)}
            </ul>
            <div className="mt-8 border-t border-white/15 pt-6">
              <p className="text-3xl font-semibold">€49 <span className="text-sm font-normal text-slate-300">proposed · one-time</span></p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">A price hypothesis. The consumer total, including applicable VAT, must be verified before sales open. No willingness to pay is established.</p>
              <Link href="/checkout/agent-team" className="mt-5 inline-flex min-h-11 items-center gap-2 text-emerald-300 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{checkout ? 'Review checkout' : 'Check release status'} <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>
        <section id="example" className="border-t border-white/10 py-16" aria-labelledby="example-title">
          <p className="text-xs tracking-[0.2em] text-emerald-300">Worked example · fictional brand designer</p>
          <h2 id="example-title" className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">The review changes what gets published.</h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-slate-300">Mara has a €180 homepage review: an annotated PDF and a 20-minute walkthrough, delivered in five working days. She has no evidence of a conversion lift.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/15 p-6"><h3 className="text-sm font-medium text-slate-300">Draft rejected</h3><p className="mt-4 text-xl leading-relaxed">“My Homepage Clarity Review doubles enquiries.”</p><p className="mt-5 text-sm leading-relaxed text-slate-400">The Reviewer cannot find evidence for the promised result. It marks the claim as a blocker.</p></div>
            <div className="rounded-2xl border border-emerald-300/30 p-6"><h3 className="text-sm font-medium text-emerald-300">Corrected offer</h3><p className="mt-4 text-xl leading-relaxed">“You receive an annotated PDF and a 20-minute recorded walkthrough within five working days, for €180.”</p><p className="mt-5 text-sm leading-relaxed text-slate-300">The revised wording matches the supplied offer. Human approval is still required.</p></div>
          </div>
          <details className="mt-6 rounded-2xl border border-white/15 p-6"><summary className="cursor-pointer font-medium text-emerald-300 focus-visible:outline focus-visible:outline-2">Read the decision trail</summary><ol className="mt-5 list-decimal space-y-3 pl-5 text-slate-300"><li>Director narrows the brief to one homepage exercise for solo consultants.</li><li>Researcher separates the offer sheet from the unsupported “double enquiries” hypothesis.</li><li>Strategist chooses a useful exercise and a reply-for-scope CTA.</li><li>Creator drafts the content; Reviewer identifies the unsupported promise.</li><li>Creator corrects the text. The founder checks the final package before publishing manually.</li></ol><p className="mt-5 text-sm text-slate-400">This is an authored teaching example, not a customer result or transcript of a tested chat session.</p></details>
          <a href="/downloads/frankx-agent-team-sample.md" download className="mt-7 inline-flex min-h-11 items-center gap-2 text-emerald-300 underline underline-offset-4 focus-visible:outline focus-visible:outline-2">Download the Director sample <ArrowRight size={16} aria-hidden="true" /></a>
        </section>
        <section className="border-t border-white/10 py-16" aria-labelledby="roles-title"><h2 id="roles-title" className="text-3xl font-semibold">Five roles. You hold the decisions.</h2><div className="mt-8 divide-y divide-white/10">{roles.map(([name,job],i)=><div key={name} className="grid gap-2 py-6 sm:grid-cols-[40px_140px_1fr]"><span className="font-mono text-sm text-emerald-300">0{i+1}</span><h3 className="text-lg font-medium">{name}</h3><p className="max-w-2xl leading-relaxed text-slate-300">{job}</p></div>)}</div></section>
        <section className="grid gap-10 border-t border-white/10 py-16 md:grid-cols-2" aria-labelledby="requirements-title"><div><h2 id="requirements-title" className="text-3xl font-semibold">Check the fit before buying.</h2><p className="mt-5 leading-relaxed text-slate-300">The intended setup uses plain text in your own ChatGPT or Claude conversation. No API key, plugin or command line is required. Provider subscriptions and usage limits remain yours.</p><p className="mt-4 leading-relaxed text-slate-300">There are no connectors, automatic publishing, persistent memory or hosted agents. Copying a role card does not start a separate model. Desktop extraction and a current browser are the intended beta setup.</p></div><div><h3 className="text-xl font-semibold">What still needs proof</h3><ul className="mt-5 space-y-3 text-slate-300">{['Actual first runs in both advertised chat tools', 'Five real users, with at least four finishing unaided', 'A recorded setup video and transcript', 'Checkout, receipt, download, withdrawal and refund tests'].map(x=><li key={x} className="flex gap-3"><CirclePause className="mt-1 shrink-0 text-emerald-300" size={17} aria-hidden="true" /><span>{x}</span></li>)}</ul><p className="mt-5 text-sm leading-relaxed text-slate-400">No customer results, sales or completed acceptance study are claimed.</p></div></section>
        <section className="border-t border-white/10 py-12"><h2 className="text-2xl font-semibold">License, support and delivery</h2><p className="mt-5 max-w-3xl leading-relaxed text-slate-300">The candidate license permits one operator to adapt the toolkit for their own and client work, with no resale or redistribution of the toolkit. Proposed paid terms include 90 days of fixes and setup support, with consulting excluded. Seller identity, VAT handling, refund terms and digital-content disclosures must be finalized before checkout opens.</p><p className="mt-4 max-w-3xl leading-relaxed text-slate-300">FrankX Agent Team is a working product name; trademark clearance is not claimed. ChatGPT and Claude are third-party products with no implied endorsement.</p><p className="mt-5 text-slate-300">For consulting engagements, visit the existing <Link href="/agent-team" className="text-emerald-300 underline underline-offset-4">agent-team page</Link>.</p></section>
      </div>
    </main>
  )
}
