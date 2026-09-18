import visuals from '@/data/editorial-visuals.json'
import { LiquidGlassImage } from './LiquidGlassImage'

/** Registry-backed figure: every asset keeps its caption and provenance. */
export function ArticleFigure({ id }: { id: keyof typeof visuals }) {
  const visual = visuals[id]
  if (!visual) throw new Error(`Unknown editorial visual: ${id}`)
  return <LiquidGlassImage {...visual} />
}
