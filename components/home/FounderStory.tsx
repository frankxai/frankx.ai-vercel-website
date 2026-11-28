import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const textLink = 'inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-medium text-emerald-300 transition-colors hover:text-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-void'

/** An editorial chapter. Illustrations describe creative practice, not agent execution. */
export function FounderStory() {
  return (
    <section id="why-i-build" aria-labelledby="founder-story-title" className="scroll-mt-24 border-t border-white/5 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <figure className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white/5">
              <Image src="/images/portraits/frank-presenting-oracle-2025.jpg" alt="Frank Riemer presenting AI architecture during his time at Oracle" fill sizes="(min-width: 1024px) 420px, (min-width: 640px) 640px, 100vw" loading="lazy" className="object-cover object-[36%_50%]" />
            </div>
            <figcaption className="mt-4 text-sm leading-relaxed text-white/65">
              Frank Riemer · AI Architect, musician and founder.<br />
              Presenting at Oracle, 2025. Today, building independently.
            </figcaption>
          </figure>
          <div className="min-w-0">
            <p className="mb-4 text-xs font-medium tracking-[0.14em] text-emerald-300">Why I build</p>
            <h2 id="founder-story-title" className="max-w-xl text-balance font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              I want more people to make what they imagine.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/75">
              <p>I make music in Amsterdam. I also spend a lot of time with people who have an idea for something they want to build. My favourite part is the first version they can put in someone else’s hands.</p>
              <p>Here you can listen to a track, look through the takes I kept and the ones I cut, or take a blueprint back to your own desk.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/work-with-me" className={textLink}>Work with me <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
              <Link href="/frank-riemer" className={textLink}>Read my story <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>

        <nav aria-label="Continue with Frank" className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-2 border-t border-white/10 pt-6">
          <Link href="/coaching" className={textLink}>Explore coaching <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          <Link href="/guides" className={textLink}>Find a practical guide <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          <Link href="/research" className={textLink}>Explore the research <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </nav>
      </div>
    </section>
  )
}
