'use client'

/** Gradient fade divider with aurora glow between sections. */
export function SectionDivider({ className = '', glow = false }: { className?: string; glow?: boolean }) {
  return (
    <div className={`relative py-1 ${className}`} aria-hidden="true">
      {glow && (
        <div className="absolute inset-0 -my-8 pointer-events-none">
          <div className="mx-auto h-16 max-w-2xl bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.06),transparent_70%)] blur-sm" />
        </div>
      )}
      <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  )
}
