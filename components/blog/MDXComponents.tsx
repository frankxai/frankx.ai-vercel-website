import Image from 'next/image'
import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { MDXComponents } from 'mdx/types'
import AffiliateLink from '@/components/affiliates/AffiliateLink'
import Diagram from '@/components/blog/Diagram'
import { InlineLeadMagnet } from '@/components/conversion/InlineLeadMagnet'
import { buildInlineVideoSchema } from '@/lib/video-schema'

// Embed components for immersive media
import {
  YouTubeEmbed as BaseYouTubeEmbed,
  TikTokEmbed,
  InstagramEmbed,
  TwitterEmbed,
  SpotifyEmbed,
  VimeoEmbed,
  FigmaEmbed,
  CodePenEmbed,
  LoomEmbed,
} from '@/components/embeds'

// Enhanced YouTubeEmbed with inline VideoObject schema for SEO
function YouTubeEmbed(props: { id: string; title?: string; [key: string]: unknown }) {
  const schema = buildInlineVideoSchema(props.id, props.title)
  return (
    <>
      <BaseYouTubeEmbed {...props} />
      <script
        type="application/ld+json"
        suppressHydrationWarning
      >
        {JSON.stringify(schema)}
      </script>
    </>
  )
}

type CalloutKind = 'info' | 'warning' | 'tip' | 'success'

interface CalloutProps {
  children: ReactNode
  type?: CalloutKind
}

const calloutStyles: Record<CalloutKind, { border: string; bg: string; icon: string; label: string }> = {
  info: { border: 'border-sky-400/30', bg: 'bg-sky-400/[0.06]', icon: 'text-sky-400', label: 'Note' },
  warning: { border: 'border-amber-400/30', bg: 'bg-amber-400/[0.06]', icon: 'text-amber-400', label: 'Warning' },
  tip: { border: 'border-emerald-400/30', bg: 'bg-emerald-400/[0.06]', icon: 'text-emerald-400', label: 'Tip' },
  success: { border: 'border-emerald-400/30', bg: 'bg-emerald-400/[0.06]', icon: 'text-emerald-400', label: 'Success' },
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
  const style = calloutStyles[type]
  return (
    <aside className={`my-10 rounded-xl border ${style.border} ${style.bg} px-6 py-5`}>
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 shrink-0 ${style.icon}`}>{getCalloutIcon(type)}</span>
        <div className="flex-1">
          <span className={`text-xs font-semibold uppercase tracking-wider ${style.icon}`}>{style.label}</span>
          <div className="mt-1 text-[15px] leading-relaxed text-white/80 [&>p]:mb-0">{children}</div>
        </div>
      </div>
    </aside>
  )
}

function CustomImage({ src, alt, ...props }: any) {
  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-xl border border-white/[0.08]">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={630}
          className="h-auto w-full"
          {...props}
        />
      </div>
      {alt && alt !== 'image' && (
        <figcaption className="mt-3 text-center text-sm text-white/40">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}

export const mdxComponents: MDXComponents = {
  // ── Headings ──────────────────────────────────────────────────────────
  h1: ({ children, ...props }: ComponentPropsWithoutRef<'h1'>) => (
    <h1 className="mt-14 mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className="mt-14 mb-5 text-2xl font-bold tracking-tight text-white md:text-3xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="mt-10 mb-4 text-xl font-semibold text-white md:text-2xl" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: ComponentPropsWithoutRef<'h4'>) => (
    <h4 className="mt-8 mb-3 text-lg font-semibold text-white/90" {...props}>
      {children}
    </h4>
  ),

  // ── Body text ─────────────────────────────────────────────────────────
  p: ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => (
    <p className="mb-5 text-[17px] leading-[1.8] text-white/85" {...props}>
      {children}
    </p>
  ),

  // ── Lists ─────────────────────────────────────────────────────────────
  ul: ({ children, ...props }: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="mb-6 space-y-2.5 pl-1 article-list" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="mb-6 space-y-2.5 pl-1 article-ol" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ComponentPropsWithoutRef<'li'>) => (
    <li className="text-[17px] leading-[1.7] text-white/85 pl-6 relative" {...props}>
      {children}
    </li>
  ),

  // ── Links ─────────────────────────────────────────────────────────────
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) => (
    <Link
      href={href || '#'}
      className="text-emerald-400 underline decoration-emerald-400/30 underline-offset-[3px] transition-colors hover:text-emerald-300 hover:decoration-emerald-300/50"
      {...props}
    >
      {children}
    </Link>
  ),

  // ── Inline code ───────────────────────────────────────────────────────
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => (
    <code
      className="rounded-md border border-white/[0.08] bg-white/[0.06] px-1.5 py-0.5 text-[0.9em] font-mono text-emerald-300/90"
      {...props}
    >
      {children}
    </code>
  ),

  // ── Code blocks ───────────────────────────────────────────────────────
  pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => (
    <div className="my-8 overflow-hidden rounded-xl border border-white/[0.08]">
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      <pre
        className="overflow-x-auto bg-[#0d1117] p-5 text-sm leading-relaxed text-white/80 font-mono"
        {...props}
      >
        {children}
      </pre>
    </div>
  ),

  // ── Blockquote ────────────────────────────────────────────────────────
  blockquote: ({ children, ...props }: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="article-blockquote my-10 border-l-2 border-emerald-500/40 pl-6 md:pl-8"
      {...props}
    >
      <div className="font-serif-italic text-xl leading-relaxed text-white/70 md:text-[22px] md:leading-[1.6] [&>p]:mb-0">
        {children}
      </div>
    </blockquote>
  ),

  // ── Tables ────────────────────────────────────────────────────────────
  table: ({ children, ...props }: ComponentPropsWithoutRef<'table'>) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-white/[0.08]">
      <table className="min-w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: ComponentPropsWithoutRef<'thead'>) => (
    <thead className="border-b border-white/[0.08] bg-white/[0.03]" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/60"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: ComponentPropsWithoutRef<'td'>) => (
    <td className="px-4 py-3 text-white/75 border-b border-white/[0.04]" {...props}>
      {children}
    </td>
  ),
  tr: ({ children, ...props }: ComponentPropsWithoutRef<'tr'>) => (
    <tr className="hover:bg-white/[0.02] transition-colors" {...props}>
      {children}
    </tr>
  ),

  // ── Horizontal rule ───────────────────────────────────────────────────
  hr: () => (
    <div className="my-12 flex items-center justify-center gap-2">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/50" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
    </div>
  ),

  // ── Strong & emphasis ─────────────────────────────────────────────────
  strong: ({ children, ...props }: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-white" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: ComponentPropsWithoutRef<'em'>) => (
    <em className="text-white/80 not-italic font-medium" {...props}>
      {children}
    </em>
  ),

  // ── Custom components ─────────────────────────────────────────────────
  Image: CustomImage,
  Diagram,
  Callout,
  AffiliateLink,
  Link,
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
  // Conversion components
  InlineLeadMagnet,
}
