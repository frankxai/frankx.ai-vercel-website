import type { QualitySlug } from '@/lib/qualities'

const nodes: Array<{
  slug: QualitySlug
  label: string
  position: string
  line: string
}> = [
  { slug: 'freedom', label: 'Open space', position: 'left-1/2 top-0 -translate-x-1/2', line: 'left-1/2 top-8 h-[calc(50%-2rem)] w-px' },
  { slug: 'mastery', label: 'Tolerance', position: 'right-0 top-1/2 -translate-y-1/2', line: 'right-8 top-1/2 h-px w-[calc(50%-2rem)]' },
  { slug: 'meaning', label: 'Load path', position: 'bottom-0 left-1/2 -translate-x-1/2', line: 'bottom-8 left-1/2 h-[calc(50%-2rem)] w-px' },
  { slug: 'connection', label: 'Joinery', position: 'left-0 top-1/2 -translate-y-1/2', line: 'left-8 top-1/2 h-px w-[calc(50%-2rem)]' },
]

interface QualityFrameProps {
  active?: QualitySlug
  step?: number
}

export default function QualityFrame({ active, step = 4 }: QualityFrameProps) {
  const beamClass = (visible: boolean) =>
    `absolute bg-gradient-to-r from-amber-100/45 via-white/[0.22] to-cyan-200/45 transition-[opacity,transform] duration-500 motion-reduce:transition-none ${
      visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
    }`

  return (
    <div className="relative aspect-square w-full max-w-[29rem]" aria-hidden="true">
      <div className="absolute inset-[12%] bg-void/75 shadow-[0_0_80px_rgba(16,185,129,0.08)]">
        <span className={`${beamClass(step >= 1)} left-0 top-0 h-px w-full origin-left`} />
        <span className={`${beamClass(step >= 2)} right-0 top-0 h-full w-px origin-top`} />
        <span className={`${beamClass(step >= 3)} bottom-0 left-0 h-px w-full origin-right`} />
        <span className={`${beamClass(step >= 4)} bottom-0 left-0 h-full w-px origin-bottom`} />
        <span className="absolute -left-px -top-px h-8 w-8 border-l-2 border-t-2 border-amber-200/55" />
        <span className="absolute -right-px -top-px h-8 w-8 border-r-2 border-t-2 border-cyan-300/55" />
        <span className="absolute -bottom-px -left-px h-8 w-8 border-b-2 border-l-2 border-emerald-300/55" />
        <span className="absolute -bottom-px -right-px h-8 w-8 border-b-2 border-r-2 border-sky-300/55" />
        <div className={`absolute inset-[23%] border bg-void transition-colors duration-500 motion-reduce:transition-none ${step >= 4 ? 'border-emerald-200/20' : 'border-white/10'}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_58%)]" />
          <div className="absolute inset-x-4 top-1/2 h-px bg-white/10" />
          <div className="absolute inset-y-4 left-1/2 w-px bg-white/10" />
        </div>
      </div>

      {nodes.map((node) => {
        const selected = !active || active === node.slug
        return (
          <div key={node.slug}>
            <div
              className={`absolute ${node.line} transition-colors duration-300 motion-reduce:transition-none ${
                selected ? 'bg-emerald-300/35' : 'bg-white/[0.08]'
              }`}
            />
            <div
              className={`absolute ${node.position} rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors duration-300 motion-reduce:transition-none ${
                selected
                  ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200'
                  : 'border-white/10 bg-void text-white/50'
              }`}
            >
              {node.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}
