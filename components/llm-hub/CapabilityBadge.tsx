import Link from 'next/link'
import { CAPABILITIES, type Capability } from '@/lib/llm-hub/capabilities'

interface CapabilityBadgeProps {
  capability: Capability
  href?: string
  size?: 'sm' | 'md'
}

export function CapabilityBadge({ capability, href, size = 'sm' }: CapabilityBadgeProps) {
  const meta = CAPABILITIES[capability]
  const Icon = meta.icon
  const sizeClasses =
    size === 'sm'
      ? 'text-[10px] px-2 py-0.5 gap-1'
      : 'text-xs px-3 py-1 gap-1.5'
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'

  const inner = (
    <span
      className={`inline-flex items-center rounded-full border bg-white/[0.03] uppercase tracking-wider font-medium ${sizeClasses}`}
      style={{
        color: meta.accent,
        borderColor: `${meta.accent}33`,
      }}
    >
      <Icon className={iconSize} aria-hidden />
      {meta.short}
    </span>
  )

  if (!href) return inner
  return (
    <Link href={href} className="transition-opacity hover:opacity-80">
      {inner}
    </Link>
  )
}
