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
              <p>I’m Frank. I build AI systems, make music, write, and teach from the work itself. My experience at Oracle shaped how I approach architecture. My creative practice keeps the question personal: what can someone actually make with it?</p>
              <p>A song starts with a feeling. A useful system starts with a problem someone cares about. Both need attention, experimentation, and the patience to keep revising. This studio is where I share that process, from an early sketch to something you can listen to, read, or build on.</p>
              <p>I care about ownership: your knowledge, your creative work, and your ability to keep building when a tool changes. Through FrankX and Starlight Intelligence, I’m working toward a future where more people have the skills and systems to turn their ideas into a life’s work.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/work-with-me" className={textLink}>Work with me <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
              <Link href="/frank-riemer" className={textLink}>Read my story <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid items-start gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <div className="min-w-0 lg:pt-6">
            <p className="mb-4 text-xs font-medium tracking-[0.14em] text-emerald-300">The miniature studio</p>
            <h3 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">Big ideas deserve a little play.</h3>
            <p className="mt-5 text-base leading-relaxed text-white/75">Mini Frank is my illustrated counterpart. Alongside the studio’s companions, he turns the messy parts of making things into stories: finding a melody, testing an idea, noticing what needs another pass.</p>
            <p className="mt-4 text-base leading-relaxed text-white/75">These scenes are part of my visual practice. The field guide opens the process, with character references, storyboards, and prompts you can adapt for your own work.</p>
            <Link href="/guides/mini-me-storyboard" className={`${textLink} mt-5`}>Explore the mini-me stories <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            <p className="mt-5 text-sm leading-relaxed text-white/60">AI-generated illustrations. Echo is an original FrankX music companion.</p>
          </div>
          <div className="grid min-w-0 grid-cols-1 items-start sm:grid-cols-2 gap-3 sm:gap-5">
            <figure>
              <Image src="/images/guides/mini-me/collection-01-01.svg" alt="Mini Frank sits on piano keys beside Echo. The poster reads: A feeling. Then a song." width={1122} height={1402} loading="lazy" unoptimized className="h-auto w-full rounded-2xl" />
              <figcaption className="mt-3 text-sm leading-relaxed text-white/65">Start with something you feel.</figcaption>
            </figure>
            <figure className="sm:pt-12">
              <Image src="/images/guides/mini-me/collection-02-08.svg" alt="Mini Frank and Echo shape a music brief: restless then released, 139 BPM house, Afro percussion, a breathy German and English lead, and a close verse opening into a wide chorus." width={1080} height={1920} loading="lazy" unoptimized className="h-auto w-full rounded-2xl" />
              <figcaption className="mt-3 text-sm leading-relaxed text-white/65">Give the idea a form you can make.</figcaption>
            </figure>
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
