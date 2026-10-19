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
    'group flex items-center justify-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]'

  const getHref = (logo: BrandLogo) => {
    if (linkMode === 'case-study') {
      return `#${logo.caseStudy.anchor}`
    }
    return logo.brandUrl
  }

  // In the marquee the logo list is rendered twice for a seamless loop. The
  // second copy is decoration: it is hidden from assistive tech, removed from
  // the tab order, and not shown at all when the visitor prefers reduced motion.
  const renderLogo = (logo: BrandLogo, index: number) => {
    const isDuplicate = variant === 'marquee' && index >= logos.length
    return (
      <a
        key={`${logo.slug}-${index}`}
        href={getHref(logo)}
        className={`${itemClassName}${isDuplicate ? ' motion-reduce:hidden' : ''}`}
        aria-label={`${logo.name} ${linkMode === 'case-study' ? 'guide' : 'website'}`}
        aria-hidden={isDuplicate ? true : undefined}
        tabIndex={isDuplicate ? -1 : undefined}
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
  }

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
        className={`relative [-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_8%,black_92%,transparent_100%)] [mask-image:linear-gradient(90deg,transparent_0%,black_8%,black_92%,transparent_100%)] motion-reduce:[-webkit-mask-image:none] motion-reduce:[mask-image:none] ${pauseOnHover ? 'group' : ''}`}
      >
        <div
          className={`flex w-max items-center gap-6 py-2 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center ${
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
