'use client'

import Image from 'next/image'
import Link from 'next/link'

import { brandLogos } from '@/data/brand-logos'
import { LogoStrip } from '@/components/ui/LogoStrip'

export default function TrustedByBlock() {
  return (
    <section className="py-12 sm:py-16 md:py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.4em] text-emerald-300/70">
            Built with the leading AI stack
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mt-3 sm:mt-4">
            Real tools. Real workflows. Real outputs.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/60 mt-3 sm:mt-4">
            Every logo below links to a short case study showing how the tool fits into our creator
            and intelligence systems.
          </p>
        </div>

        <div className="mt-8 sm:mt-10">
          <LogoStrip
            logos={brandLogos}
            variant="marquee"
            size="md"
            speed={45}
            linkMode="case-study"
          />
        </div>

        <div className="mt-10 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {brandLogos.map((logo) => (
            <div
              key={logo.slug}
              id={logo.caseStudy.anchor}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 transition hover:border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/10 opacity-0 transition group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl border border-white/10 bg-white/5">
                    <Image
                      src={logo.logo}
                      alt={`${logo.name} logo`}
                      width={56}
                      height={28}
                      className={`h-5 w-auto object-contain ${
                        logo.treatment === 'mono' ? 'opacity-80' : 'opacity-90'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40">
                      {logo.name}
                    </p>
                    <h3 className="text-base sm:text-lg font-semibold text-white">{logo.caseStudy.title}</h3>
                  </div>
                </div>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-white/60 leading-relaxed">
                  {logo.caseStudy.summary}
                </p>
                <Link
                  href={logo.caseStudy.href}
                  className="mt-4 sm:mt-5 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-300 hover:text-emerald-200 transition-colors"
                >
                  {logo.caseStudy.cta}
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
