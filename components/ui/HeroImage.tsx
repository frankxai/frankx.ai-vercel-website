import { LiquidGlassImage } from '@/components/blog/LiquidGlassImage'
import { cn } from '@/lib/utils'

type HeroImageProps = {
  title: string
  subtitle?: string
  src?: string
  alt?: string
  priority?: boolean
  className?: string
  thumbnailHook?: string
  category?: string
}

export default function HeroImage({
  title,
  subtitle,
  src,
  alt,
  priority = true,
  className,
  thumbnailHook,
  category,
}: HeroImageProps) {
  if (src) {
    if (!thumbnailHook) {
      return (
        <LiquidGlassImage
          src={src}
          alt={alt || title}
          caption={subtitle}
          priority={priority}
          className={className}
        />
      )
    }

    return (
      <div className="relative">
        <LiquidGlassImage
          src={src}
          alt={alt || title}
          caption={subtitle}
          priority={priority}
          className={className}
        />
        <div className="pointer-events-none absolute left-4 top-4 sm:left-6 sm:top-6 z-10 max-w-[min(26rem,calc(100%-2rem))] rounded-2xl border border-white/15 bg-[#0a0f1c]/85 px-4 py-2.5 backdrop-blur-xl shadow-2xl">
          {category && (
            <p className="text-[11px] font-medium tracking-wide text-emerald-400">
              {category}
            </p>
          )}
          <p className="text-sm sm:text-base font-semibold leading-snug tracking-tight text-white">
            {thumbnailHook}
          </p>
        </div>
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
        <p className="text-2xl font-semibold leading-tight text-white md:text-3xl">{title}</p>
        {subtitle && <p className="max-w-2xl text-sm text-white/70">{subtitle}</p>}
      </div>
    </div>
  )
}
