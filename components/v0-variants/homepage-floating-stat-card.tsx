// v0 Homepage component: floating-stat-card
// Chat: kp1UCsrMJI8

'use client'

interface FloatingStatCardProps {
  value: string
  label: string
  delay?: number
  className?: string
}

export function FloatingStatCard({
  value,
  label,
  delay = 0,
  className = '',
}: FloatingStatCardProps) {
  const animationClass =
    delay === 0
      ? 'animate-float'
      : delay === 1
        ? 'animate-float-delayed'
        : 'animate-float-slow'

  return (
    <div
      className={`glassmorphic rounded-xl p-6 ${animationClass} ${className}`}
      style={{ animationDelay: `${delay * 0.5}s` }}
    >
      <div className="text-gradient text-3xl font-bold tracking-tight">{value}</div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  )
}
