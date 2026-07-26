import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Cloud,
  ExternalLink,
  HardDrive,
  LineChart,
  Monitor,
  Network,
  ShieldCheck,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Computer Field Guide | FrankX',
  description:
    'A founder and creator guide to RTX 5090 workstations, cloud GPU rental, AI mini PCs, DGX Spark, and private AI factory setups.',
  alternates: {
    canonical: '/ai-computer',
  },
}

const decisionOptions = [
  {
    name: 'Cloud and API only',
    price: 'EUR 0 upfront',
    capability: 'Best frontier reasoning and occasional GPU bursts.',
    verdict: 'Start here if you are below 20 heavy GPU hours per week.',
    risk: 'Metered spend, file-transfer friction, privacy limits, and rented queues.',
  },
  {
    name: 'Current laptop + local LLM',
    price: 'EUR 0-200',
    capability: 'Ollama, LM Studio, Jan, small and mid-size local models.',
    verdict: 'Best first step before buying hardware.',
    risk: 'Limited video/image speed and model size.',
  },
  {
    name: 'RTX 5080 workstation',
    price: 'EUR 3.1k+',
    capability: 'Strong 16GB CUDA workstation.',
    verdict: 'Good PC, weak flagship AI-lab choice.',
    risk: '16GB VRAM is the constraint you will feel first.',
  },
  {
    name: 'RTX 5090 workstation',
    price: 'EUR 7k class',
    capability: '32GB CUDA VRAM for local creator AI, media, and model workflows.',
    verdict: 'Best first serious FrankX AI lab machine.',
    risk: 'High upfront cost; exact BOM, PSU, airflow, and warranty matter.',
  },
  {
    name: 'Ryzen AI Max+ mini PC',
    price: 'EUR 3.1k class',
    capability: '128GB unified memory and efficient always-on local LLM node.',
    verdict: 'Best Node-02 after the 5090.',
    risk: 'Not a CUDA creator GPU replacement.',
  },
  {
    name: 'DGX Spark / GB10',
    price: 'EUR 5.5k class EU',
    capability: 'NVIDIA AI appliance with 128GB unified memory.',
    verdict: 'Specialist lab node, not the first creator workstation.',
    risk: 'Less useful as a daily Windows creator desktop.',
  },
]

const roiRows = [
  { use: '10h/week', cloud: 'EUR 479/y', local: 'EUR 1,644/y', read: 'Cloud wins financially.' },
  { use: '20h/week', cloud: 'EUR 958/y', local: 'EUR 1,771/y', read: 'Cloud still wins if friction is low.' },
  { use: '40h/week', cloud: 'EUR 1,915/y', local: 'EUR 2,026/y', read: 'Near break-even; local wins on speed/privacy.' },
  { use: '80h/week', cloud: 'EUR 3,830/y', local: 'EUR 2,536/y', read: 'Local wins.' },
  { use: '24/7', cloud: 'EUR 8,043/y', local: 'EUR 3,657/y', read: 'Local wins strongly.' },
]

const phases = [
  {
    name: 'Subscription CoE',
    icon: Cloud,
    audience: 'Most creators and founders',
    stack: 'ChatGPT, Claude, Perplexity, API budget, no hardware leap.',
  },
  {
    name: 'Local Starter',
    icon: Brain,
    audience: 'Privacy-curious builders',
    stack: 'Current laptop, Ollama or LM Studio, 8B-32B models by memory tier.',
  },
  {
    name: 'AI Workstation',
    icon: Monitor,
    audience: 'Daily creator labs',
    stack: 'RTX 5090, CUDA, ComfyUI, local LLMs, editing, coding, batch media.',
  },
  {
    name: 'Private AI Factory',
    icon: Network,
    audience: 'Advanced founders and studios',
    stack: '5090 workstation plus always-on AI Max+ or DGX node, NAS, scheduler, RAG vault.',
  },
]

const currentBuys = [
  {
    vendor: 'Azerty',
    machine: 'Xenith Epic Corsair Dark / Snow',
    price: 'EUR 6,999',
    why: 'Best Netherlands buy-now reference: 9950X3D, RTX 5090, 64GB RAM, 4TB SSD, Windows 11 Pro, 4-year hardware warranty.',
  },
  {
    vendor: 'ALTERNATE',
    machine: 'Ryzen 9 / RTX 5090 Gaming PC',
    price: 'EUR 7,799',
    why: 'Premium parts reference and good business-quote target, but current public configuration is expensive.',
  },
  {
    vendor: 'Caseking',
    machine: '9950X3D / ASUS TUF RTX 5090 / 64GB / 8TB',
    price: 'EUR 7,199.90',
    why: 'Strong German reference with larger storage and a creator-friendly ProArt-class motherboard.',
  },
  {
    vendor: 'GMKtec',
    machine: 'EVO-X2 Ryzen AI Max+ 395 128GB',
    price: 'EUR 3,079.99',
    why: 'Best current EU Node-02 candidate for always-on local LLM and memory-heavy AI workflows.',
  },
]

const sourceLinks = [
  { label: 'NVIDIA RTX 5090', href: 'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/' },
  { label: 'NVIDIA RTX 5080', href: 'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5080/' },
  { label: 'NVIDIA DGX Spark', href: 'https://www.nvidia.com/en-us/products/workstations/dgx-spark/' },
  { label: 'AMD Ryzen AI Max+ 395', href: 'https://www.amd.com/en/products/processors/laptop/ryzen/ai-300-series/amd-ryzen-ai-max-plus-395.html' },
  { label: 'RunPod GPU pricing', href: 'https://www.runpod.io/pricing' },
  { label: 'Azerty RTX 5090 desktop', href: 'https://azerty.nl/product/xenith-epic-corsair-dark-ryzen-9-9950x3d/9338150' },
  { label: 'ALTERNATE RTX 5090 desktop', href: 'https://www.alternate.nl/ALTERNATE/Ryzen-9-RTX-5090-Gaming-pc-Powered-by-ASUS/html/product/1938725' },
  { label: 'Caseking PC systems', href: 'https://www.caseking.de/en/pc-systems' },
  { label: 'GMKtec EVO-X2 EU', href: 'https://de.gmktec.com/en/products/gmktec-evo-x2-amd-ryzen%E2%84%A2-ai-max-395-mini-pc-1' },
]

function DecisionMap() {
  return (
    <svg
      viewBox="0 0 760 460"
      role="img"
      aria-label="AI computer decision map from cloud to private AI factory"
      className="h-full min-h-[360px] w-full"
    >
      <defs>
        <linearGradient id="aiComputerLine" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#12d18e" />
          <stop offset="100%" stopColor="#24c9df" />
        </linearGradient>
      </defs>
      <rect width="760" height="460" rx="18" fill="#0d1114" />
      <path d="M108 348 C210 250 270 220 382 228 C500 236 540 128 654 104" fill="none" stroke="url(#aiComputerLine)" strokeWidth="4" />
      <path d="M112 122 H650" stroke="#2b3339" strokeWidth="1" />
      <path d="M112 228 H650" stroke="#2b3339" strokeWidth="1" />
      <path d="M112 348 H650" stroke="#2b3339" strokeWidth="1" />
      {[
        { x: 112, y: 348, title: 'Cloud/API', sub: 'low upfront' },
        { x: 246, y: 282, title: 'Local starter', sub: 'use what you own' },
        { x: 382, y: 228, title: 'RTX 5090', sub: 'creator workstation' },
        { x: 526, y: 160, title: 'AI Max+ node', sub: 'always-on LLM' },
        { x: 654, y: 104, title: 'Private factory', sub: 'multi-node lab' },
      ].map((node) => (
        <g key={node.title}>
          <circle cx={node.x} cy={node.y} r="16" fill="#10181c" stroke="url(#aiComputerLine)" strokeWidth="3" />
          <text x={node.x} y={node.y + 36} textAnchor="middle" fill="#f5f7f8" fontSize="18" fontWeight="700">
            {node.title}
          </text>
          <text x={node.x} y={node.y + 58} textAnchor="middle" fill="#a4adb5" fontSize="13">
            {node.sub}
          </text>
        </g>
      ))}
      <text x="40" y="54" fill="#12d18e" fontSize="13" fontWeight="800">
        FRANKX AI COMPUTER FIELD GUIDE
      </text>
      <text x="40" y="84" fill="#f5f7f8" fontSize="28" fontWeight="800">
        Buy capability only when the workflow is real.
      </text>
      <text x="40" y="414" fill="#a4adb5" fontSize="14">
        Last researched June 26, 2026. Retail prices move quickly; confirm exact BOM before purchase.
      </text>
    </svg>
  )
}

export default function AIComputerPage() {
  return (
    <main className="min-h-screen bg-[#08090a] text-white">
      <section className="border-b border-white/10 px-6 pb-16 pt-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
              AI Computer Field Guide
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-none tracking-normal text-white md:text-7xl">
              The founder-grade guide to buying an AI computer.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
              Most people should start with cloud tools and the laptop they already own. Daily creator and founder labs should
              move toward a 32GB VRAM workstation, then add an always-on local model node when the work justifies it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/blog/do-you-need-rtx-5090-for-ai-2026"
                className="inline-flex items-center gap-2 rounded-md bg-emerald-300 px-4 py-3 text-sm font-bold text-black transition hover:bg-emerald-200"
              >
                Read the RTX 5090 verdict <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog/best-local-llm-2026"
                className="inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-3 text-sm font-bold text-white transition hover:border-cyan-300/60 hover:text-cyan-100"
              >
                Match models to RAM <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="min-h-[360px] overflow-hidden rounded-lg border border-white/10 bg-[#0d1114] shadow-2xl shadow-emerald-950/30">
            <DecisionMap />
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ['Current best first buy', 'RTX 5090 workstation'],
              ['Cloud break-even', 'Around 40h/week'],
              ['Node-02 candidate', 'Ryzen AI Max+ 395'],
              ['Public principle', 'Rank by utility, not commission'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                <p className="text-sm text-white/45">{label}</p>
                <p className="mt-2 text-2xl font-black text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Decision matrix</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal md:text-5xl">What each machine actually buys you</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {decisionOptions.map((option) => (
              <article key={option.name} className="rounded-lg border border-white/10 bg-[#101214] p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-black text-white">{option.name}</h3>
                  <span className="shrink-0 rounded-md border border-emerald-300/25 bg-emerald-300/10 px-2 py-1 text-xs font-bold text-emerald-200">
                    {option.price}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/62">{option.capability}</p>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-sm font-bold text-white">{option.verdict}</p>
                  <p className="mt-2 text-sm leading-6 text-white/45">Risk: {option.risk}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">ROI snapshot</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal md:text-5xl">The 5090 is a workflow bet, not just a compute bet.</h2>
            <p className="mt-5 text-base leading-7 text-white/62">
              The spreadsheet says cloud GPU rental is cheaper for occasional work. Local ownership starts to make sense near
              daily heavy use, then wins hard when the lab becomes production infrastructure.
            </p>
            <div className="mt-6 rounded-lg border border-amber-300/25 bg-amber-300/10 p-4 text-sm leading-6 text-amber-50">
              Assumptions: RunPod RTX 5090 at USD 0.99/hour, EUR/USD 0.93, electricity at EUR 0.35/kWh, three-year ownership,
              35% resale value, and a 0.70kW active 5090 workstation planning draw.
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-white/10">
            <table className="w-full min-w-[680px] border-collapse bg-[#101214] text-left text-sm">
              <thead className="bg-white/[0.04] text-xs uppercase text-white/45">
                <tr>
                  <th className="px-4 py-3">Heavy GPU use</th>
                  <th className="px-4 py-3">Cloud 5090 rental</th>
                  <th className="px-4 py-3">Local 5090 annualized</th>
                  <th className="px-4 py-3">Read</th>
                </tr>
              </thead>
              <tbody>
                {roiRows.map((row) => (
                  <tr key={row.use} className="border-t border-white/10">
                    <td className="px-4 py-4 font-bold text-white">{row.use}</td>
                    <td className="px-4 py-4 text-white/68">{row.cloud}</td>
                    <td className="px-4 py-4 text-emerald-200">{row.local}</td>
                    <td className="px-4 py-4 text-white/58">{row.read}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Build phases</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal md:text-5xl">From paid tools to a private AI factory</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {phases.map((phase, index) => {
              const Icon = phase.icon
              return (
                <article key={phase.name} className="rounded-lg border border-white/10 bg-[#101214] p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md border border-emerald-300/25 bg-emerald-300/10 text-emerald-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-5 font-mono text-xs font-bold text-white/38">Phase {index + 1}</p>
                  <h3 className="mt-2 text-xl font-black text-white">{phase.name}</h3>
                  <p className="mt-3 text-sm font-bold text-cyan-100">{phase.audience}</p>
                  <p className="mt-3 text-sm leading-6 text-white/58">{phase.stack}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Current shortlist</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal md:text-5xl">EU options worth checking first</h2>
              <p className="mt-5 text-base leading-7 text-white/62">
                These are not permanent endorsements. They are the best current reference points for the Netherlands/Germany
                buying lane, and every listing needs a final BOM check before payment.
              </p>
            </div>
            <div className="grid gap-4">
              {currentBuys.map((buy) => (
                <article key={buy.vendor} className="rounded-lg border border-white/10 bg-[#101214] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-xl font-black text-white">{buy.vendor}</h3>
                    <span className="rounded-md border border-cyan-300/25 bg-cyan-300/10 px-2 py-1 text-xs font-bold text-cyan-100">
                      {buy.price}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-white/84">{buy.machine}</p>
                  <p className="mt-3 text-sm leading-6 text-white/58">{buy.why}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0d1114] px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: 'Partner standard',
              text: 'Affiliate links are acceptable only when the recommendation would stay the same without commission.',
            },
            {
              icon: HardDrive,
              title: 'Purchase gate',
              text: 'Confirm exact GPU, PSU, motherboard, RAM layout, SSD model, warranty, invoice, and substitution policy.',
            },
            {
              icon: LineChart,
              title: 'Update cadence',
              text: 'Retail prices, GPU rental rates, and model requirements move quickly. Treat this as a living guide.',
            },
          ].map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                <Icon className="h-6 w-6 text-emerald-300" />
                <h3 className="mt-4 text-xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{item.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Source ledger</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal md:text-5xl">Research links used for this page</h2>
              <p className="mt-5 text-base leading-7 text-white/62">
                Last researched June 26, 2026. Specifications and prices can change; verify the vendor page before ordering.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {sourceLinks.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#101214] px-4 py-3 text-sm font-bold text-white/82 transition hover:border-emerald-300/40 hover:text-emerald-100"
                >
                  {source.label}
                  <ExternalLink className="h-4 w-4 text-white/35 transition group-hover:text-emerald-200" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto rounded-lg border border-emerald-300/25 bg-emerald-300/10 p-6 md:flex md:items-center md:justify-between md:gap-8 lg:max-w-7xl">
          <div>
            <h2 className="text-2xl font-black text-white">The short answer</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-emerald-50/78">
              Buy the RTX 5090 workstation first if the AI lab becomes daily work. Use cloud/API when the work is occasional.
              Add Ryzen AI Max+ or DGX Spark later when you need an always-on local model node.
            </p>
          </div>
          <Link
            href="/affiliates"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-bold text-black transition hover:bg-emerald-50 md:mt-0"
          >
            Partner disclosure <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
