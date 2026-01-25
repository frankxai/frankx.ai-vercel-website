'use client'

import { useState } from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'

type HeroImageProps = {
  title: string
  subtitle?: string
  src?: string
  alt?: string
  priority?: boolean
  className?: string
}

export default function HeroImage({
  title,
  subtitle,
  src,
  alt,
  priority = false,
  className,
}: HeroImageProps) {
  const [imgError, setImgError] = useState(false)

  if (src && !imgError) {
    return (
      <div
        className={cn(
          'relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-white/5',
          className
        )}
      >
        <Image
          src={src}
          alt={alt || title}
          fill
          sizes="(max-width: 768px) 100vw, 960px"
          className="object-cover"
          priority={priority}
          onError={() => setImgError(true)}
        />
      </div>
    )
  }

  return (
    <div
      role="img"
      aria-label={alt || title}
      className={cn(
        'relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 px-8 py-10 text-white',
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-70"
        aria-hidden
        style={{
          background:
            'radial-gradient(circle at top, rgba(16,185,129,0.35), transparent 55%), radial-gradient(circle at 25% 60%, rgba(34,211,238,0.25), transparent 50%), radial-gradient(circle at 80% 70%, rgba(245,158,11,0.2), transparent 55%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08]"
        aria-hidden
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative space-y-3">
        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
          FrankX Studio
        </span>
        <h2 className="text-2xl font-semibold leading-tight text-white md:text-3xl">{title}</h2>
        {subtitle && <p className="max-w-2xl text-sm text-white/70">{subtitle}</p>}
      </div>
    </div>
  )
}
