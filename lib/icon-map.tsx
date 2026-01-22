import {
  type LucideIcon,
  Bot,
  Brain,
  Wand2,
  Palette,
  Music,
  Video,
  Code,
  TrendingUp,
  Users,
  Target,
  MessageSquare,
  Zap,
  Sparkles,
  Mic,
  Image,
  Pen,
  Cpu,
} from 'lucide-react'

export type IconName =
  | 'Bot'
  | 'Brain'
  | 'Wand2'
  | 'Palette'
  | 'Music'
  | 'Video'
  | 'Code'
  | 'TrendingUp'
  | 'Users'
  | 'Target'
  | 'MessageSquare'
  | 'Zap'
  | 'Sparkles'
  | 'Mic'
  | 'Image'
  | 'Pen'
  | 'Cpu'

const iconMap: Record<IconName, LucideIcon> = {
  Bot,
  Brain,
  Wand2,
  Palette,
  Music,
  Video,
  Code,
  TrendingUp,
  Users,
  Target,
  MessageSquare,
  Zap,
  Sparkles,
  Mic,
  Image,
  Pen,
  Cpu,
}

export function getIcon(name: IconName): LucideIcon {
  return iconMap[name]
}

// Static icon renderer component for use in JSX to avoid "component created during render" lint errors
// Usage: <IconRenderer name="Bot" className="w-8 h-8" />
export function IconRenderer({ name, className }: { name: IconName; className?: string }) {
  const Icon = iconMap[name]
  return <Icon className={className} />
}
