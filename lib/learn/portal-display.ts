import {
  Brain,
  Music2,
  Zap,
  ImageIcon,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

/**
 * Shared presentation maps for /learn portal cards. Kept in lib/ rather than
 * in data/learning-paths.ts so the data file stays pure runtime values (no
 * React imports). Both LearnShell (listing page) and LearnHubSection (cross
 * section reuse) import from here so a new icon or color is wired once.
 */

export const iconMap: Record<string, LucideIcon> = {
  brain: Brain,
  music: Music2,
  zap: Zap,
  image: ImageIcon,
  sparkles: Sparkles,
}

export const colorMap: Record<string, string> = {
  emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-400',
  cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20 text-cyan-400',
  amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-400',
  violet: 'from-violet-500/20 to-violet-500/5 border-violet-500/20 text-violet-400',
  sky: 'from-sky-500/20 to-blue-500/5 border-sky-500/20 text-sky-400',
}

export const playButtonBgMap: Record<string, string> = {
  emerald: 'bg-emerald-500/80 group-hover:bg-emerald-500',
  cyan: 'bg-cyan-500/80 group-hover:bg-cyan-500',
  amber: 'bg-amber-500/80 group-hover:bg-amber-500',
  violet: 'bg-violet-500/80 group-hover:bg-violet-500',
  sky: 'bg-sky-500/80 group-hover:bg-sky-500',
}
