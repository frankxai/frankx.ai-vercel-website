import { cn } from '@/lib/utils'
import type { CloudProvider } from '@/types/ai-architecture'
import { CLOUD_PROVIDER_META } from '@/types/ai-architecture'

interface CloudProviderBadgeProps {
  provider: CloudProvider
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'minimal'
  className?: string
}

const sizeClasses = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm',
}

const colorClasses: Record<CloudProvider, { default: string; minimal: string }> = {
  aws: {
    default: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    minimal: 'bg-orange-500/10 text-orange-400',
  },
  gcp: {
    default: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    minimal: 'bg-blue-500/10 text-blue-400',
  },
  azure: {
    default: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    minimal: 'bg-cyan-500/10 text-cyan-400',
  },
  oci: {
    default: 'bg-red-500/20 text-red-400 border-red-500/30',
    minimal: 'bg-red-500/10 text-red-400',
  },
  'multi-cloud': {
    default: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    minimal: 'bg-violet-500/10 text-violet-400',
  },
}

export function CloudProviderBadge({
  provider,
  size = 'md',
  variant = 'default',
  className,
}: CloudProviderBadgeProps) {
  const meta = CLOUD_PROVIDER_META[provider]
  const colors = colorClasses[provider][variant]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variant === 'default' && 'border',
        sizeClasses[size],
        colors,
        className
      )}
      title={meta.name}
    >
      {meta.shortName}
    </span>
  )
}

export default CloudProviderBadge
