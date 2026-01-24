import Image from 'next/image'
import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { MDXComponents } from 'mdx/types'
import AffiliateLink from '@/components/affiliates/AffiliateLink'

// Embed components for immersive media
import {
  YouTubeEmbed,
  TikTokEmbed,
  InstagramEmbed,
  TwitterEmbed,
  SpotifyEmbed,
  VimeoEmbed,
  FigmaEmbed,
  CodePenEmbed,
  LoomEmbed,
} from '@/components/embeds'

type CalloutKind = 'info' | 'warning' | 'tip' | 'success'

// ============================================================================
// ARCHITECTURE DIAGRAM COMPONENTS
// ============================================================================

interface DecisionBoxProps {
  title: string
  children: ReactNode
}

function DecisionBox({ title, children }: DecisionBoxProps) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-slate-900/40 backdrop-blur">
      <div className="border-b border-cyan-500/20 bg-cyan-500/10 px-6 py-3">
        <h4 className="text-sm font-bold uppercase tracking-widest text-cyan-300">{title}</h4>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

interface ComparisonGridProps {
  children: ReactNode
}

function ComparisonGrid({ children }: ComparisonGridProps) {
  return (
    <div className="my-8 grid gap-4 md:grid-cols-2">
      {children}
    </div>
  )
}

interface ComparisonCardProps {
  title: string
  subtitle?: string
  pros?: string[]
  cons?: string[]
  color?: 'cyan' | 'emerald' | 'violet' | 'amber'
  children?: ReactNode
}

const comparisonColors = {
  cyan: {
    border: 'border-cyan-500/30',
    bg: 'from-cyan-950/30 to-slate-900/50',
    header: 'bg-cyan-500/10 border-cyan-500/20',
    title: 'text-cyan-300',
    check: 'text-emerald-400',
    cross: 'text-rose-400',
  },
  emerald: {
    border: 'border-emerald-500/30',
    bg: 'from-emerald-950/30 to-slate-900/50',
    header: 'bg-emerald-500/10 border-emerald-500/20',
    title: 'text-emerald-300',
    check: 'text-emerald-400',
    cross: 'text-rose-400',
  },
  violet: {
    border: 'border-violet-500/30',
    bg: 'from-violet-950/30 to-slate-900/50',
    header: 'bg-violet-500/10 border-violet-500/20',
    title: 'text-violet-300',
    check: 'text-emerald-400',
    cross: 'text-rose-400',
  },
  amber: {
    border: 'border-amber-500/30',
    bg: 'from-amber-950/30 to-slate-900/50',
    header: 'bg-amber-500/10 border-amber-500/20',
    title: 'text-amber-300',
    check: 'text-emerald-400',
    cross: 'text-rose-400',
  },
}

function ComparisonCard({ title, subtitle, pros, cons, color = 'cyan', children }: ComparisonCardProps) {
  const colors = comparisonColors[color]
  return (
    <div className={`overflow-hidden rounded-xl border ${colors.border} bg-gradient-to-br ${colors.bg}`}>
      <div className={`border-b ${colors.header} px-5 py-3`}>
        <h5 className={`font-bold ${colors.title}`}>{title}</h5>
        {subtitle && <p className="text-xs text-white/50">{subtitle}</p>}
      </div>
      <div className="p-5 text-sm">
        {pros && pros.length > 0 && (
          <ul className="mb-3 space-y-1">
            {pros.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-white/70">
                <span className={colors.check}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {cons && cons.length > 0 && (
          <ul className="space-y-1">
            {cons.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-white/70">
                <span className={colors.cross}>×</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {children}
      </div>
    </div>
  )
}

interface TechStackProps {
  layers: { name: string; services: string; color?: string }[]
}

function TechStack({ layers }: TechStackProps) {
  const layerColors = ['cyan', 'emerald', 'violet', 'amber', 'rose', 'sky']
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-white/10">
      {layers.map((layer, i) => {
        const colorClass = layerColors[i % layerColors.length]
        return (
          <div
            key={i}
            className={`flex items-center border-b border-white/10 last:border-b-0 bg-gradient-to-r from-${colorClass}-950/30 to-transparent`}
          >
            <div className={`w-40 shrink-0 border-r border-white/10 bg-${colorClass}-500/10 px-4 py-3`}>
              <span className={`text-sm font-bold text-${colorClass}-300`}>{layer.name}</span>
            </div>
            <div className="px-4 py-3 text-sm text-white/60">{layer.services}</div>
          </div>
        )
      })}
    </div>
  )
}

interface ArchitectureImageProps {
  src: string
  alt: string
  caption?: string
}

function ArchitectureImage({ src, alt, caption }: ArchitectureImageProps) {
  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 to-slate-950 p-1">
        <Image
          src={src}
          alt={alt}
          width={1408}
          height={768}
          className="w-full rounded-xl"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-white/50">{caption}</figcaption>
      )}
    </figure>
  )
}

interface CalloutProps {
  children: ReactNode
  type?: CalloutKind
}

const calloutStyles: Record<CalloutKind, string> = {
  info: 'border-sky-400/40 bg-sky-400/10 text-sky-100',
  warning: 'border-amber-400/40 bg-amber-400/10 text-amber-100',
  tip: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-100',
  success: 'border-primary-400/40 bg-primary-500/10 text-primary-100',
}

// Inline SVG icons to avoid React version conflicts with lucide-react in RSC
const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path strokeWidth="2" d="M12 16v-4m0-4h.01" />
  </svg>
)

const WarningIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
)

const LightbulbIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

function getCalloutIcon(type: CalloutKind) {
  switch (type) {
    case 'info': return <InfoIcon />
    case 'warning': return <WarningIcon />
    case 'tip': return <LightbulbIcon />
    case 'success': return <CheckIcon />
  }
}

function Callout({ children, type = 'info' }: CalloutProps) {
  return (
    <div className={`my-8 rounded-2xl border px-5 py-4 backdrop-blur ${calloutStyles[type]}`}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5">{getCalloutIcon(type)}</span>
        <div className="flex-1 text-sm leading-relaxed text-white/90">{children}</div>
      </div>
    </div>
  )
}

function CustomImage({ src, alt, ...props }: any) {
  return (
    <div className="relative my-10 overflow-hidden rounded-3xl border border-white/10">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={630}
        className="h-auto w-full"
        {...props}
      />
    </div>
  )
}

export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }: ComponentPropsWithoutRef<'h1'>) => (
    <h1 className="mt-10 mb-6 text-4xl font-semibold text-white" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => (
    <h2 className="mt-10 mb-4 text-3xl font-semibold text-white" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="mt-8 mb-3 text-2xl font-semibold text-white/90" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: ComponentPropsWithoutRef<'h4'>) => (
    <h4 className="mt-6 mb-2 text-xl font-semibold text-white/80" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => (
    <p className="mb-6 text-base leading-relaxed text-white/70" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="mb-6 ml-5 list-disc space-y-2 text-white/75" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="mb-6 ml-5 list-decimal space-y-2 text-white/75" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ComponentPropsWithoutRef<'li'>) => (
    <li className="text-white/75" {...props}>
      {children}
    </li>
  ),
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) => (
    <Link
      href={href || '#'}
      className="font-semibold text-primary-200 underline-offset-4 transition hover:text-primary-100 hover:underline"
      {...props}
    >
      {children}
    </Link>
  ),
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => (
    <code className="rounded-md bg-white/10 px-2 py-1 text-sm font-mono text-primary-100" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => (
    <pre className="my-6 overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/90 p-6 text-sm text-white/80" {...props}>
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className="my-8 border-l-4 border-primary-500/70 bg-primary-500/10 px-6 py-4 text-lg italic text-white/80" {...props}>
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }: ComponentPropsWithoutRef<'table'>) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-white/10">
      <table className="min-w-full border-collapse text-sm text-white/80" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: ComponentPropsWithoutRef<'th'>) => (
    <th className="border border-white/10 bg-white/10 px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-white/70" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: ComponentPropsWithoutRef<'td'>) => (
    <td className="border border-white/10 px-4 py-3 text-white/70" {...props}>
      {children}
    </td>
  ),
  Image: CustomImage,
  Callout,
  AffiliateLink,
  Link,
  // Architecture diagram components
  DecisionBox,
  ComparisonGrid,
  ComparisonCard,
  TechStack,
  ArchitectureImage,
  // Embed components for immersive media in blog posts
  YouTubeEmbed,
  TikTokEmbed,
  InstagramEmbed,
  TwitterEmbed,
  SpotifyEmbed,
  VimeoEmbed,
  FigmaEmbed,
  CodePenEmbed,
  LoomEmbed,
}
