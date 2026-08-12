'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'

import QualityFrame from '@/components/qualities/QualityFrame'
import { qualities, type QualitySlug } from '@/lib/qualities'

export default function QualitiesMap() {
  const [active, setActive] = useState<QualitySlug>('freedom')
  const sectionRefs = useRef<Array<HTMLElement | null>>([])
  const reduceMotion = useReducedMotion()
  const activeIndex = qualities.findIndex((item) => item.slug === active)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const nearest = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0]

        if (nearest) setActive(nearest.target.getAttribute('data-quality') as QualitySlug)
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: 0 },
    )

    sectionRefs.current.forEach((section) => section && observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <div className="max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-emerald-300/75">
          One structure · four constraints
        </p>
        <h2 className="mt-5 max-w-xl font-display text-3xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">
          The qualities work as a system.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
          Freedom sets the direction. Mastery provides the method. Meaning chooses the plan.
          Connection multiplies what the structure can hold. When I neglect one, I can feel the others distort.
        </p>

      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div className="hidden lg:block">
          <div className="sticky top-28 flex min-h-[34rem] items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0c0c0d] p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.08),transparent_48%)]" />
            <QualityFrame active={active} step={reduceMotion ? 4 : activeIndex + 1} />
            <p className="absolute bottom-6 left-6 font-mono text-[9px] uppercase tracking-[0.18em] text-white/50">
              {reduceMotion ? 'Complete structure' : `Assembly ${String(activeIndex + 1).padStart(2, '0')} / 04`}
            </p>
          </div>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {qualities.map((quality, index) => (
            <article
              key={quality.slug}
              ref={(element) => { sectionRefs.current[index] = element }}
              data-quality={quality.slug}
              className="flex min-h-[28rem] flex-col justify-center py-12 lg:min-h-[72svh] lg:py-20"
            >
              <div className="mb-8 flex justify-center lg:hidden">
                <QualityFrame active={quality.slug} step={index + 1} />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300/65">
                {quality.number} · {quality.role}
              </p>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
                {quality.axiom}
              </h3>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/58">{quality.thesis}</p>
              <p className="mt-6 border-l border-amber-200/30 pl-5 text-sm leading-7 text-white/48">
                {quality.shadow}
              </p>
              <Link
                href={`/qualities/${quality.slug}`}
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-full text-sm font-medium text-emerald-300 transition-colors hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
              >
                Enter {quality.name}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
