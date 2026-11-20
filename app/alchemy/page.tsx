import Image from 'next/image'
import Link from 'next/link'
import { createMetadata } from '@/lib/seo'
import ScreeningRoom from './ScreeningRoom'
import investigations from './register.json'

export const metadata = createMetadata({
  title: 'Alchemy in motion',
  description: 'Four YouTube Shorts and three films on indigo, growing tin, memory metal, Egyptian blue and AI-designed crystals. Watch the material change, then inspect the evidence.',
  path: '/alchemy',
  image: '/images/alchemy/pigment-study.webp',
})

const textLink = 'text-cyan-200 underline decoration-cyan-200/45 underline-offset-4 hover:decoration-current'

export default function AlchemyPage() {
  return (
    <main id="main" className="min-h-screen bg-[#0a0a0b] pb-24 pt-20 text-white">
      <header className="relative isolate overflow-hidden border-b border-white/10 bg-[#090b0d]">
        <Image src="/images/alchemy/pigment-study.webp" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[70%_50%] sm:object-[center_54%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/95 via-black/65 to-black/20" />
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20 sm:px-10 sm:pb-24 sm:pt-28">
          <p className="text-sm font-medium tracking-wide text-cyan-200">FrankX field guide · Chemistry and materials</p>
          <h1 className="mt-5 max-w-2xl font-display text-6xl font-semibold leading-[0.97] tracking-tight md:text-8xl">Alchemy in motion</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-100">Watch indigo turn blue in air, tin grow branches, and a bent wire recover its shape. Each film comes with a question and a source you can inspect.</p>
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <a href="#shorts" className="rounded-full bg-cyan-100 px-5 py-3 font-semibold text-slate-950 hover:bg-white">Watch the Shorts</a>
            <Link href="/guides/alchemy" className="text-white underline underline-offset-4">Read the field guide</Link>
          </div>
        </div>
        <span className="absolute bottom-3 right-5 text-xs text-slate-300">Illustrated pigment study</span>
      </header>
      <ScreeningRoom />
      <section id="source-notes" aria-labelledby="evidence-heading" className="mx-auto max-w-7xl scroll-mt-24 border-t border-white/15 px-6 py-12 sm:px-10">
        <p className="text-sm font-medium text-cyan-200">Source notes</p>
        <h2 id="evidence-heading" className="mb-8 mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">Two claims worth checking</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <article>
            <h3 className="text-xl font-semibold">Where did the painter put the blue?</h3>
            <p className="my-3 max-w-prose leading-7 text-slate-300">Accorsi and colleagues measured a 910 nm emission maximum in cuprorivaite. On the Parthenon, Verri’s team mapped surviving Egyptian blue on a carved mantle. The map records where pigment remains. A wide border is the authors’ interpretation of the pattern.</p>
            <p className="flex flex-wrap gap-x-5 gap-y-2"><a className={textLink} href="https://doi.org/10.1039/B902563D">Laboratory measurement</a><a className={textLink} href="https://doi.org/10.15184/aqy.2023.130">Mantle of figure L · Figure 5</a></p>
          </article>
          <article>
            <h3 className="text-xl font-semibold">How close did the AI design get?</h3>
            <p className="my-3 max-w-prose leading-7 text-slate-300">The MatterGen team requested a bulk modulus of 200 GPa. Their synthesised sample measured 169 GPa. They also report tantalum and chromium occupying sites with some disorder. Keep the design target, the realised structure and the measurement on three lines in your notes.</p>
            <p className="flex flex-wrap gap-x-5 gap-y-2"><a className={textLink} href="https://doi.org/10.1038/s41586-025-08628-5">Experimental validation</a><a className={textLink} href="https://www.microsoft.com/en-us/research/blog/mattergen-a-new-paradigm-of-materials-design-with-generative-ai/">Authors’ account</a></p>
          </article>
        </div>
      </section>
      <section id="field-register" aria-labelledby="register-heading" className="mx-auto max-w-7xl scroll-mt-24 border-t border-white/15 px-6 py-12 sm:px-10">
        <h2 id="register-heading" className="font-display text-3xl font-semibold tracking-tight md:text-4xl">The material register</h2>
        <p className="mb-5 mt-3 max-w-2xl leading-7 text-slate-300">Twelve questions to take beyond the films. Open a material to find the first source and the figure, folio or section to inspect.</p>
        <div className="mb-7 flex flex-wrap gap-x-6 gap-y-3">
          <a className={textLink} href="/resources/alchemy/viewing-worksheet.md" download>Download the viewing worksheet</a>
          <a className={textLink} href="/resources/alchemy/deep-research-prompts.md" download>Download all 12 Gemini research prompts</a>
        </div>
        <div className="grid items-start gap-x-10 sm:grid-cols-2">
          {investigations.map(item => (
            <details key={item.id} className="border-t border-white/15 py-4">
              <summary className="cursor-pointer marker:text-cyan-300">
                <span className="font-medium text-white">{item.title}</span>
                <span className="ml-2 text-sm text-slate-400">{item.group}</span>
              </summary>
              <p className="my-3 leading-7 text-slate-200">{item.question}</p>
              <a className={textLink} href={item.url}>{item.source}</a>
              <p className="mt-1 text-sm text-slate-400">{item.locator}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl border-t border-white/15 px-6 py-10 sm:px-10">
        <h2 className="font-display text-2xl font-semibold">From manuscript to imagined material</h2>
        <p className="my-3 max-w-3xl leading-7 text-slate-300">A sixteenth-century craft entry describes imitation jasper. Read the folio for what its author wanted to imitate. Then try the fiction exercise in the guide: give an invented material one rule that changes what a character can afford to do.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3"><a className={textLink} href="https://cu-mkp.github.io/GR8975-edition/texts/p010r_1/">Read folio 10r</a><Link className={textLink} href="/guides/alchemy">Open the guide and worksheet</Link></div>
      </section>
    </main>
  )
}
