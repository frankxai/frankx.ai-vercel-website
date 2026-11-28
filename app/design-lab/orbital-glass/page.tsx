import Image from 'next/image'
import type { Metadata } from 'next'
import { Compass, FlaskConical, Hammer, Eye, RefreshCw, Rocket } from 'lucide-react'
import { siteConfig } from '@/lib/seo'
import { OrbitalGlass, type OrbitalSatellite } from '@/components/orbital-glass/OrbitalGlass'

export const metadata: Metadata = {
  title: 'Orbital glass | Design Lab',
  description:
    'Numbered glass chips on a ring around a focal lens, over a real photograph. The ring shows the order of a loop.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${siteConfig.url}/design-lab/orbital-glass` },
}

const iconClass = 'h-full w-full'

// One source for the chip, the lens readout and the definition below, so the
// ring and the list can never disagree. The list is the non-moving equivalent.
// Each body is short enough to fit the lens.
const steps = [
  {
    id: 'plan',
    title: 'Plan',
    detail: 'Spec and test first',
    body: 'Write the spec and the acceptance test before any code.',
    icon: <Compass className={iconClass} />,
  },
  {
    id: 'build',
    title: 'Build',
    detail: 'Smallest passing change',
    body: 'Make the smallest change that passes the test.',
    icon: <Hammer className={iconClass} />,
  },
  {
    id: 'review',
    title: 'Review',
    detail: 'Read the diff cold',
    body: 'Read the diff as a stranger would.',
    icon: <Eye className={iconClass} />,
  },
  {
    id: 'test',
    title: 'Test',
    detail: 'Run it in a real browser',
    body: 'Run it in a real browser at 375, 768 and 1440 px.',
    icon: <FlaskConical className={iconClass} />,
  },
  {
    id: 'ship',
    title: 'Ship',
    detail: 'One validated push',
    body: 'Push once, after the repository’s own gates pass.',
    icon: <Rocket className={iconClass} />,
  },
  {
    id: 'reflect',
    title: 'Reflect',
    detail: 'Write down what changed',
    body: 'Record what changed and what to do differently.',
    icon: <RefreshCw className={iconClass} />,
  },
] as const

const loop: readonly OrbitalSatellite[] = steps.map(({ id, title, detail, body, icon }) => ({
  id,
  title,
  detail,
  body,
  icon,
  href: `#step-${id}`,
}))

interface PageProps {
  searchParams: Promise<{ spectrum?: string }>
}

export default async function OrbitalGlassLabPage({ searchParams }: PageProps) {
  // Lab-only switch so both spectra can be reviewed. A real page picks one.
  // Tech is the default because design.md names it the site's spectrum.
  const { spectrum: requested } = await searchParams
  const spectrum = requested === 'soul' ? 'soul' : 'tech'

  return (
    <main className="mx-auto max-w-6xl px-6 py-24">
      <header className="max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.25em] text-white/60">Design lab</p>
        <h1 className="mt-4 font-display text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl">
          Orbital glass
        </h1>
        <p className="mt-6 max-w-lg text-white/60">
          Numbered glass chips on a ring around a focal lens, over a real photograph. From 960 px wide, with motion
          allowed, the ring turns; hover or focus a chip and it eases to a stop while the lens reads out that step.
          Everywhere else it holds still.
        </p>
      </header>

      <section className="mt-16" aria-label="Orbital glass demonstration">
        <OrbitalGlass
          label="The build loop in six steps"
          spectrum={spectrum}
          satellites={loop}
          subject={
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/60">The loop</p>
              <p className="mt-2 font-display text-xl font-medium leading-tight text-white">Plan to reflect</p>
            </div>
          }
          backdrop={
            <Image
              src="/images/library/library-os-hero.jpg"
              alt=""
              fill
              preload
              sizes="(min-width: 1152px) 1152px, 100vw"
              style={{ objectPosition: '70% 50%' }}
            />
          }
        />
      </section>

      <section className="mt-24 border-t border-white/5 pt-12" aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="text-base font-medium text-white">
          The six steps
        </h2>
        <p className="mt-2 max-w-xl text-sm text-white/55">
          The same loop without the motion. Each chip above links to its step here.
        </p>
        <dl className="mt-6 grid max-w-3xl gap-x-10 gap-y-5 text-sm sm:grid-cols-2">
          {steps.map((step, index) => (
            <div key={step.id} id={`step-${step.id}`} className="scroll-mt-24">
              <dt className="font-medium text-white">
                <span className="mr-2 font-mono text-[11px] text-white/50">{String(index + 1).padStart(2, '0')}</span>
                {step.title}
              </dt>
              <dd className="mt-1 leading-relaxed text-white/60">{step.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-24 border-t border-white/5 pt-12">
        <h2 className="text-base font-medium text-white">What this costs</h2>
        <ul className="mt-4 max-w-3xl space-y-3 text-sm leading-relaxed text-white/60">
          <li>
            <span className="text-white/80">Tier</span>: the ring turns when the container is 960 px or wider and
            motion is allowed. At that width with reduced motion it holds still. Below it, the six steps become a
            stack.
          </li>
          <li>
            <span className="text-white/80">Budget</span>: more than 35% of a 90-frame window over 22 ms between
            frames freezes the ring in place. A browser capped at 30 fps reads as over budget. The glass stays, with
            a lighter blur.
          </li>
          <li>
            <span className="text-white/80">Pause</span>: hovering or focusing a chip eases the ring to a stop. It
            also pauses off-screen, and a visible button pauses it until you resume.
          </li>
          <li>
            <span className="text-white/80">Motion</span>: GSAP drives CSS custom properties for position and
            surface alpha, plus the backdrop&apos;s transform. No layout properties and no text.
          </li>
          <li>
            <span className="text-white/80">Payload</span>: no new dependency. GSAP, the liquid tokens and the
            glass recipe already ship with the site.
          </li>
          <li>
            <span className="text-white/80">Not applied anywhere yet</span>: this route is the only surface using
            the component.
          </li>
        </ul>
      </section>
    </main>
  )
}
