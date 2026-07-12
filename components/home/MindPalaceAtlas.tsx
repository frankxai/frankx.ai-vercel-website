'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  Boxes,
  Brain,
  Building,
  Flame,
  Headphones,
  Network,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'

import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'

let pluginsRegistered = false

type PalaceRoom = {
  id: string
  coordinate: string
  name: string
  role: string
  description: string
  href: string
  domain: string
  icon: LucideIcon
  accent: 'emerald' | 'cyan' | 'sky' | 'violet' | 'amber' | 'rose' | 'lime' | 'orange'
  position: string
  arrival: { x: number; y: number }
  external?: boolean
  center?: boolean
}

const palaceRooms: PalaceRoom[] = [
  {
    id: 'starlight',
    coordinate: 'A1',
    name: 'Starlight Intelligence',
    role: 'Intelligence substrate',
    description: 'The research, provenance, and intelligence-system layer beneath the work.',
    href: 'https://starlightintelligence.org',
    domain: 'starlightintelligence.org',
    icon: Brain,
    accent: 'sky',
    position: 'lg:col-start-1 lg:row-start-1',
    arrival: { x: -72, y: -46 },
    external: true,
  },
  {
    id: 'architecture',
    coordinate: 'A2',
    name: 'AI Architecture',
    role: 'Systems and AI CoE',
    description: 'Blueprints for AI operating systems, Centers of Excellence, and production agents.',
    href: '/ai-architecture',
    domain: 'frankx.ai/ai-architecture',
    icon: Building,
    accent: 'emerald',
    position: 'lg:col-start-2 lg:row-start-1',
    arrival: { x: 0, y: -72 },
  },
  {
    id: 'acos',
    coordinate: 'A3',
    name: 'ACOS',
    role: 'Agent orchestration',
    description: 'Skills, agents, commands, and quality loops for repeatable knowledge work.',
    href: '/acos',
    domain: 'frankx.ai/acos',
    icon: Boxes,
    accent: 'cyan',
    position: 'lg:col-start-3 lg:row-start-1',
    arrival: { x: 72, y: -46 },
  },
  {
    id: 'gencreator',
    coordinate: 'B1',
    name: 'GenCreator',
    role: 'Creator systems',
    description: 'Education and operating models for creators building with generative intelligence.',
    href: 'https://gencreator.ai',
    domain: 'gencreator.ai',
    icon: Sparkles,
    accent: 'violet',
    position: 'lg:col-start-1 lg:row-start-2',
    arrival: { x: -86, y: 0 },
    external: true,
  },
  {
    id: 'frankx',
    coordinate: 'B2',
    name: 'FrankX.AI',
    role: 'Studio and gateway',
    description: 'The public home where architecture, music, research, products, and field notes meet.',
    href: '/',
    domain: 'frankx.ai',
    icon: Network,
    accent: 'emerald',
    position: 'lg:col-start-2 lg:row-start-2',
    arrival: { x: 0, y: 0 },
    center: true,
  },
  {
    id: 'vibe-os',
    coordinate: 'B3',
    name: 'Vibe OS',
    role: 'Music practice',
    description: 'An evolving creative practice connecting songs, prompting, learning, and release craft.',
    href: '/products/vibe-os',
    domain: 'frankx.ai/products/vibe-os',
    icon: Headphones,
    accent: 'rose',
    position: 'lg:col-start-3 lg:row-start-2',
    arrival: { x: 86, y: 0 },
  },
  {
    id: 'arcanea',
    coordinate: 'C1',
    name: 'Arcanea',
    role: 'Creative worlds',
    description: 'Story, worldbuilding, creative education, and AI-native imagination in its own brand world.',
    href: 'https://www.arcanea.ai',
    domain: 'arcanea.ai',
    icon: Flame,
    accent: 'orange',
    position: 'lg:col-start-1 lg:row-start-3',
    arrival: { x: -72, y: 46 },
    external: true,
  },
  {
    id: 'agentic-income',
    coordinate: 'C2',
    name: 'Agentic Income',
    role: 'Products and revenue',
    description: 'Commercial systems for turning useful AI workflows into owned products and leverage.',
    href: 'https://www.agenticincome.ai',
    domain: 'agenticincome.ai',
    icon: TrendingUp,
    accent: 'lime',
    position: 'lg:col-start-2 lg:row-start-3',
    arrival: { x: 0, y: 72 },
    external: true,
  },
  {
    id: 'library',
    coordinate: 'C3',
    name: 'Library',
    role: 'Knowledge systems',
    description: 'Books, deep reads, notes, and reusable methods for learning in public.',
    href: '/library',
    domain: 'frankx.ai/library',
    icon: BookOpenText,
    accent: 'amber',
    position: 'lg:col-start-3 lg:row-start-3',
    arrival: { x: 72, y: 46 },
  },
]

const corridors = [
  { id: 'starlight', x: 150, y: 108 },
  { id: 'architecture', x: 450, y: 108 },
  { id: 'acos', x: 750, y: 108 },
  { id: 'gencreator', x: 150, y: 325 },
  { id: 'vibe-os', x: 750, y: 325 },
  { id: 'arcanea', x: 150, y: 542 },
  { id: 'agentic-income', x: 450, y: 542 },
  { id: 'library', x: 750, y: 542 },
]

const accentClasses: Record<PalaceRoom['accent'], { icon: string; line: string; active: string }> = {
  emerald: {
    icon: 'border-emerald-300/25 bg-emerald-300/[0.08] text-emerald-200',
    line: 'stroke-emerald-300',
    active: 'border-emerald-300/40 bg-emerald-300/[0.07]',
  },
  cyan: {
    icon: 'border-cyan-300/25 bg-cyan-300/[0.08] text-cyan-200',
    line: 'stroke-cyan-300',
    active: 'border-cyan-300/40 bg-cyan-300/[0.07]',
  },
  sky: {
    icon: 'border-sky-300/25 bg-sky-300/[0.08] text-sky-200',
    line: 'stroke-sky-300',
    active: 'border-sky-300/40 bg-sky-300/[0.07]',
  },
  violet: {
    icon: 'border-violet-300/25 bg-violet-300/[0.08] text-violet-200',
    line: 'stroke-violet-300',
    active: 'border-violet-300/40 bg-violet-300/[0.07]',
  },
  amber: {
    icon: 'border-amber-300/25 bg-amber-300/[0.08] text-amber-200',
    line: 'stroke-amber-300',
    active: 'border-amber-300/40 bg-amber-300/[0.07]',
  },
  rose: {
    icon: 'border-rose-300/25 bg-rose-300/[0.08] text-rose-200',
    line: 'stroke-rose-300',
    active: 'border-rose-300/40 bg-rose-300/[0.07]',
  },
  lime: {
    icon: 'border-lime-300/25 bg-lime-300/[0.08] text-lime-200',
    line: 'stroke-lime-300',
    active: 'border-lime-300/40 bg-lime-300/[0.07]',
  },
  orange: {
    icon: 'border-orange-300/25 bg-orange-300/[0.08] text-orange-200',
    line: 'stroke-orange-300',
    active: 'border-orange-300/40 bg-orange-300/[0.07]',
  },
}

function RoomCard({
  room,
  activeRoom,
  onActivate,
}: {
  room: PalaceRoom
  activeRoom: string | null
  onActivate: (roomId: string | null) => void
}) {
  const Icon = room.icon
  const accent = accentClasses[room.accent]
  const isActive = activeRoom === room.id
  const isQuiet = activeRoom !== null && !isActive && room.id !== 'frankx'

  return (
    <Link
      data-palace-room
      data-room-id={room.id}
      href={room.href}
      target={room.external ? '_blank' : undefined}
      rel={room.external ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => onActivate(room.id)}
      onMouseLeave={() => onActivate(null)}
      onFocus={() => onActivate(room.id)}
      onBlur={() => onActivate(null)}
      onClick={() =>
        trackEvent('frankx_mind_palace_route_selected', {
          route: room.id,
          href: room.href,
          surface: 'homepage_mind_palace_v2',
        })
      }
      className={cn(
        'group relative flex h-full min-h-[176px] flex-col overflow-hidden rounded-xl border border-white/[0.09] bg-[#0b0f12]/95 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.24)] transition-[border-color,background-color,opacity,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#07090b]',
        'hover:-translate-y-1 hover:border-white/20 hover:bg-[#10161a]',
        room.position,
        room.center && 'border-emerald-300/30 bg-[linear-gradient(145deg,rgba(16,185,129,0.13),rgba(8,15,18,0.98)_58%)]',
        isActive && accent.active,
        isQuiet && 'opacity-50',
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_25%,rgba(255,255,255,0.025),transparent_72%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />

      <div className="relative flex items-start justify-between gap-4">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg border', accent.icon)}>
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </div>
        <span className="font-mono text-[10px] text-white/35">{room.coordinate}</span>
      </div>

      <div className="relative mt-5 flex-1">
        <p className="text-[11px] font-medium text-white/45">{room.role}</p>
        <h3 className="mt-1.5 text-lg font-semibold tracking-[-0.025em] text-white">{room.name}</h3>
        <p className="mt-2 text-[13px] leading-5 text-white/50">{room.description}</p>
      </div>

      <div className="relative mt-4 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3">
        <span className="min-w-0 truncate font-mono text-[9px] text-white/30">{room.domain}</span>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/35 transition-colors group-hover:text-white/75" aria-hidden="true" />
      </div>
    </Link>
  )
}

export function MindPalaceAtlas() {
  const rootRef = useRef<HTMLElement>(null)
  const [activeRoom, setActiveRoom] = useState<string | null>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      if (!pluginsRegistered) {
        gsap.registerPlugin(ScrollTrigger)
        pluginsRegistered = true
      }

      const rooms = gsap.utils.toArray<HTMLElement>('[data-palace-room]', root)
      const corridorElements = gsap.utils.toArray<SVGLineElement>('[data-palace-corridor]', root)
      const media = gsap.matchMedia()

      media.add(
        {
          desktop: '(min-width: 1024px)',
          reducedMotion: '(prefers-reduced-motion: reduce)',
          coarsePointer: '(pointer: coarse)',
        },
        (context) => {
          const conditions = context.conditions as {
            desktop: boolean
            reducedMotion: boolean
            coarsePointer: boolean
          }

          if (!conditions.desktop || conditions.reducedMotion || conditions.coarsePointer) {
            gsap.set(rooms, { clearProps: 'all' })
            gsap.set(corridorElements, { strokeDasharray: 1, strokeDashoffset: 0 })
            return
          }

          const roomById = new Map(palaceRooms.map((room) => [room.id, room]))
          const center = rooms.find((room) => room.dataset.roomId === 'frankx')
          const satellites = rooms.filter((room) => room.dataset.roomId !== 'frankx')

          gsap.set(corridorElements, { strokeDasharray: 1, strokeDashoffset: 1 })

          const timeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: root,
              start: 'top 72%',
              end: 'top 20%',
              scrub: 0.55,
              fastScrollEnd: true,
              preventOverlaps: 'frankx-mind-palace-v2',
              invalidateOnRefresh: true,
            },
          })

          if (center) {
            timeline.fromTo(center, { autoAlpha: 0.2, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.65 })
          }

          timeline
            .fromTo(
              satellites,
              {
                autoAlpha: 0.12,
                x: (index, element) => roomById.get((element as HTMLElement).dataset.roomId ?? '')?.arrival.x ?? 0,
                y: (index, element) => roomById.get((element as HTMLElement).dataset.roomId ?? '')?.arrival.y ?? 20,
                scale: 0.965,
              },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 1.6,
                stagger: 0.08,
                force3D: true,
              },
              0.22,
            )
            .to(corridorElements, { strokeDashoffset: 0, duration: 1.1, stagger: 0.05 }, 0.72)
        },
      )

      return () => media.revert()
    },
    { scope: rootRef },
  )

  return (
    <section
      ref={rootRef}
      id="mind-palace"
      aria-labelledby="mind-palace-title"
      className="relative overflow-hidden border-t border-white/[0.07] py-24 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_47%,rgba(16,185,129,0.09),transparent_26%),radial-gradient(circle_at_12%_12%,rgba(34,211,238,0.05),transparent_24%),radial-gradient(circle_at_88%_86%,rgba(245,158,11,0.04),transparent_24%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.08em] text-emerald-200/75">The Mind Palace</p>
            <h2 id="mind-palace-title" className="mt-4 max-w-xl text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
              One studio. A connected portfolio.
            </h2>
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              FrankX is the public gateway into a wider body of work: intelligence infrastructure,
              agent systems, creator education, music, story worlds, knowledge, and ventures. Each
              room is real. Follow the route that matches what you want to build.
            </p>
            <p className="mt-5 border-l border-emerald-200/30 pl-5 text-sm leading-6 text-white/45">
              The homepage shows the public rooms. Private family spaces and internal operations stay private by design.
            </p>
          </div>
        </div>

        <div className="relative mt-14 hidden min-h-[650px] lg:block" aria-label="Connected FrankX ventures and systems">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 900 650"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {corridors.map((corridor) => {
              const room = palaceRooms.find((candidate) => candidate.id === corridor.id)
              if (!room) return null
              const accent = accentClasses[room.accent]
              const isActive = activeRoom === corridor.id
              const isQuiet = activeRoom !== null && !isActive

              return (
                <line
                  key={corridor.id}
                  data-palace-corridor
                  data-room-id={corridor.id}
                  x1="450"
                  y1="325"
                  x2={corridor.x}
                  y2={corridor.y}
                  pathLength="1"
                  vectorEffect="non-scaling-stroke"
                  className={cn('transition-opacity duration-300', accent.line, isActive ? 'opacity-75' : 'opacity-20', isQuiet && 'opacity-[0.08]')}
                  strokeWidth={isActive ? 1.5 : 1}
                />
              )
            })}
          </svg>

          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-7">
            {palaceRooms.map((room) => (
              <RoomCard key={room.id} room={room} activeRoom={activeRoom} onActivate={setActiveRoom} />
            ))}
          </div>
        </div>

        <div className="relative mt-12 lg:hidden">
          <div className="absolute bottom-6 left-5 top-6 w-px bg-gradient-to-b from-emerald-200/50 via-cyan-200/25 to-amber-200/20" aria-hidden="true" />
          <div className="space-y-4">
            {palaceRooms.map((room) => (
              <div key={room.id} className="relative pl-10">
                <span className="absolute left-[17px] top-7 h-2 w-2 -translate-x-1/2 rounded-full border border-[#07090b] bg-emerald-200 shadow-[0_0_16px_rgba(110,231,183,0.55)]" aria-hidden="true" />
                <RoomCard room={room} activeRoom={null} onActivate={() => undefined} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/[0.07] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-white/45">
            This is the curated entrance. The complete ecosystem map tracks the larger portfolio,
            its public boundaries, and the systems still evolving behind it.
          </p>
          <Link
            href="/ecosystem"
            onClick={() => trackEvent('frankx_mind_palace_ecosystem_opened', { surface: 'homepage_mind_palace_v2' })}
            className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-emerald-200/25 bg-emerald-200/[0.08] px-6 text-sm font-semibold text-emerald-100 transition-colors hover:border-emerald-200/45 hover:bg-emerald-200/[0.13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
          >
            Open the complete ecosystem
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
