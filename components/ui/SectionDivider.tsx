'use client'

/** Gradient fade divider between sections. Replaces hard border-t lines. */
export function SectionDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`relative py-1 ${className}`} aria-hidden="true">
      <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  )
}
