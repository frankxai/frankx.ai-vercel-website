'use client'

import { brandLogos } from '@/data/brand-logos'
import { LogoStrip } from '@/components/ui/LogoStrip'

interface AILabsMarqueeProps {
  className?: string
  speed?: number
  pauseOnHover?: boolean
  title?: string
}

export function AILabsMarquee({
  className = '',
  speed = 35,
  pauseOnHover = true,
  title = 'Powered by Leading AI',
}: AILabsMarqueeProps) {
  return (
    <div className={`w-full overflow-hidden py-4 sm:py-6 md:py-8 ${className}`}>
      {title && (
        <p className="mb-4 sm:mb-6 text-center text-xs sm:text-sm font-medium uppercase tracking-wider sm:tracking-widest text-white/50">
          {title}
        </p>
      )}
      <LogoStrip
        logos={brandLogos}
        variant="marquee"
        size="md"
        speed={speed}
        pauseOnHover={pauseOnHover}
        linkMode="brand"
      />
    </div>
  )
}

export default AILabsMarquee
