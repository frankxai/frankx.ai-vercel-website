'use client'

import Image from 'next/image'
import type { BrandLogo } from '@/data/brand-logos'

type LogoStripVariant = 'marquee' | 'grid'
type LogoStripSize = 'sm' | 'md' | 'lg'
type LogoStripLinkMode = 'brand' | 'case-study'

interface LogoStripProps {
  logos: BrandLogo[]
  variant?: LogoStripVariant
  size?: LogoStripSize
  className?: string
  speed?: number
  pauseOnHover?: boolean
  linkMode?: LogoStripLinkMode
}

const sizeClasses: Record<LogoStripSize, string> = {
  sm: 'h-5 max-w-[120px]',
  md: 'h-7 max-w-[150px]',
  lg: 'h-9 max-w-[180px]',
}

export function LogoStrip({
  logos,
  variant = 'marquee',
  size = 'md',
  className = '',
  speed = 35,
  pauseOnHover = true,
  linkMode = 'brand',
}: LogoStripProps) {
  const duplicatedLogos = variant === 'marquee' ? [...logos, ...logos] : logos

  const itemClassName =
    'group flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-5 py-3 text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]'

  const getHref = (logo: BrandLogo) => {
    if (linkMode === 'case-study') {
      return `#${logo.caseStudy.anchor}`
    }
    return logo.brandUrl
  }

  const renderLogo = (logo: BrandLogo, index: number) => (
    <a
      key={`${logo.slug}-${index}`}
      href={getHref(logo)}
      className={itemClassName}
      aria-label={`${logo.name} ${linkMode === 'case-study' ? 'case study' : 'website'}`}
      target={linkMode === 'brand' ? '_blank' : undefined}
      rel={linkMode === 'brand' ? 'noopener noreferrer' : undefined}
    >
      <Image
        src={logo.logo}
        alt={`${logo.name} logo`}
        width={160}
        height={40}
        className={`w-auto object-contain ${sizeClasses[size]} ${
          logo.treatment === 'mono'
            ? 'opacity-70 brightness-0 invert'
            : 'opacity-90'
        } transition-opacity group-hover:opacity-100`}
      />
    </a>
  )

  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 ${className}`}>
        {logos.map(renderLogo)}
      </div>
    )
  }

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div
        className={`relative ${pauseOnHover ? 'group' : ''}`}
        style={{
          maskImage:
            'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          className={`flex w-max items-center gap-6 py-2 ${
            pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
          } animate-logo-marquee motion-reduce:animate-none`}
          style={{ animationDuration: `${speed}s` }}
        >
          {duplicatedLogos.map(renderLogo)}
        </div>
      </div>
    </div>
  )
}

export default LogoStrip
