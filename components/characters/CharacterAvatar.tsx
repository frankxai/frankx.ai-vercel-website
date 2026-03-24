import Image from 'next/image'
import { cn } from '@/lib/utils'

export type CharacterName =
  | 'axi'
  | 'arion'
  | 'codex'
  | 'echo'
  | 'nova'
  | 'stella'
  | 'draconia'
  | 'nero'
  | 'shinkami'
  | 'lumina'

type AvatarSize = 'sm' | 'md' | 'lg' | 'hero'

interface CharacterAvatarProps {
  character: CharacterName
  variant?: string
  size?: AvatarSize
  showName?: boolean
  showRole?: boolean
  className?: string
  glowColor?: string
}

const CHARACTER_DATA: Record<
  CharacterName,
  { name: string; role: string; domain: string; accent: string }
> = {
  axi: {
    name: 'Axi',
    role: 'Brand Guardian',
    domain: 'FrankX.AI',
    accent: '#AB47C7',
  },
  arion: {
    name: 'Arion Mamoru',
    role: 'Vision Keeper',
    domain: 'Strategy',
    accent: '#43BFE3',
  },
  codex: {
    name: 'Codex',
    role: 'AI Architect',
    domain: 'AI Architecture',
    accent: '#10B981',
  },
  echo: {
    name: 'Echo',
    role: 'Sound Weaver',
    domain: 'Music',
    accent: '#EC4899',
  },
  nova: {
    name: 'Nova',
    role: 'Content Catalyst',
    domain: 'Content',
    accent: '#F59E0B',
  },
  stella: {
    name: 'Stella',
    role: 'System Orchestrator',
    domain: 'ACOS',
    accent: '#8B5CF6',
  },
  draconia: {
    name: 'Draconia',
    role: 'Product Forge',
    domain: 'Products',
    accent: '#EF4444',
  },
  nero: {
    name: 'Nero Umbra',
    role: 'Inner Circle',
    domain: 'Premium',
    accent: '#6366F1',
  },
  shinkami: {
    name: 'Shinkami',
    role: 'Premium Architect',
    domain: 'Coaching',
    accent: '#14B8A6',
  },
  lumina: {
    name: 'Lumina Sol',
    role: 'Light Bringer',
    domain: 'Wellness',
    accent: '#FBBF24',
  },
}

const CHARACTER_IMAGES: Record<CharacterName, Record<string, string>> = {
  axi: {
    icon: '/images/mascot/axi-v3-icon.png',
    full: '/images/mascot/mascot-v25-crystal-familiar.png',
    hero: '/images/mascot/mascot-v19-hero-command-center.png',
    action: '/images/mascot/mascot-v06-prowling-action.png',
    split: '/images/mascot/mascot-v16-organic-digital-split.png',
    cyborg: '/images/mascot/mascot-v24-cyborg-fusion-head.png',
  },
  arion: { full: '/images/team/arion-mamoru.png' },
  codex: { full: '/images/team/codex-falcon.png' },
  echo: { full: '/images/team/echo-leopard.png' },
  nova: { full: '/images/team/nova-fox.png' },
  stella: { full: '/images/team/stella-owl.png' },
  draconia: { full: '/images/team/draconia-tiger.png' },
  nero: { full: '/images/team/nero-umbra.png' },
  shinkami: { full: '/images/team/shinkami.png' },
  lumina: { full: '/images/team/lumina-sol.png' },
}

const SIZE_MAP: Record<AvatarSize, { width: number; height: number }> = {
  sm: { width: 40, height: 40 },
  md: { width: 80, height: 80 },
  lg: { width: 160, height: 160 },
  hero: { width: 400, height: 400 },
}

export default function CharacterAvatar({
  character,
  variant = 'full',
  size = 'md',
  showName = false,
  showRole = false,
  className,
  glowColor,
}: CharacterAvatarProps) {
  const data = CHARACTER_DATA[character]
  const images = CHARACTER_IMAGES[character]
  const src = images[variant] || images.full || Object.values(images)[0]
  const dims = SIZE_MAP[size]
  const glow = glowColor || data.accent

  return (
    <div className={cn('inline-flex flex-col items-center gap-2', className)}>
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          boxShadow: `0 0 ${size === 'hero' ? 60 : size === 'lg' ? 40 : 20}px -8px ${glow}40`,
        }}
      >
        <Image
          src={src}
          alt={data.name}
          width={dims.width}
          height={dims.height}
          className="object-cover"
        />
      </div>
      {(showName || showRole) && (
        <div className="text-center">
          {showName && (
            <p className="text-sm font-semibold text-white">{data.name}</p>
          )}
          {showRole && (
            <p className="text-xs text-white/40">{data.role}</p>
          )}
        </div>
      )}
    </div>
  )
}

export { CHARACTER_DATA, CHARACTER_IMAGES }
