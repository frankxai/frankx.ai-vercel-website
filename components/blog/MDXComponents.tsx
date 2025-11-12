import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Lightbulb, AlertTriangle, Info, CheckCircle } from 'lucide-react'
import AffiliateLink from '@/components/affiliates/AffiliateLink'

type CalloutKind = 'info' | 'warning' | 'tip' | 'success'

interface VideoProps {
  provider: 'youtube' | 'vimeo' | 'notion'
  videoId: string
  title?: string
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

const calloutIcons: Record<CalloutKind, JSX.Element> = {
  info: <Info className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  tip: <Lightbulb className="w-5 h-5" />,
  success: <CheckCircle className="w-5 h-5" />,
}

function Callout({ children, type = 'info' }: CalloutProps) {
  return (
    <div className={`my-8 rounded-2xl border px-5 py-4 backdrop-blur ${calloutStyles[type]}`}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5">{calloutIcons[type]}</span>
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

function Video({ provider, videoId, title }: VideoProps) {
  const getEmbedUrl = () => {
    switch (provider) {
      case 'youtube':
        return `https://www.youtube.com/embed/${videoId}`
      case 'vimeo':
        return `https://player.vimeo.com/video/${videoId}`
      case 'notion':
        return videoId // Notion provides full URL
      default:
        return ''
    }
  }

  return (
    <div className="relative my-10 overflow-hidden rounded-3xl border border-white/10 bg-black/20">
      <div className="relative aspect-video">
        <iframe
          src={getEmbedUrl()}
          title={title || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  )
}

export const mdxComponents = {
  AffiliateLink,
  Link,
  Video,
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="mt-10 mb-6 text-4xl font-semibold text-white">{children}</h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="mt-16 mb-6 text-3xl font-semibold tracking-tight text-white">{children}</h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="mt-12 mb-4 text-2xl font-semibold text-white/95">{children}</h3>
  ),
  h4: ({ children }: { children: ReactNode }) => (
    <h4 className="mt-8 mb-3 text-xl font-semibold text-white/90">{children}</h4>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="mb-8 text-lg leading-[1.75] text-slate-200">{children}</p>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="mb-6 ml-5 list-disc space-y-2 text-white/75">{children}</ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="mb-6 ml-5 list-decimal space-y-2 text-white/75">{children}</ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="text-white/75">{children}</li>
  ),
  a: ({ href, children }: { href?: string; children: ReactNode }) => (
    <Link
      href={href || '#'}
      className="font-semibold text-primary-200 underline-offset-4 transition hover:text-primary-100 hover:underline"
    >
      {children}
    </Link>
  ),
  code: ({ children }: { children: ReactNode }) => (
    <code className="rounded-md bg-white/10 px-2 py-1 text-sm font-mono text-primary-100">{children}</code>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="my-6 overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/90 p-6 text-sm text-white/80">
      {children}
    </pre>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="my-8 border-l-4 border-primary-500/70 bg-primary-500/10 px-6 py-4 text-lg italic text-white/80">
      {children}
    </blockquote>
  ),
  table: ({ children }: { children: ReactNode }) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-white/10">
      <table className="min-w-full border-collapse text-sm text-white/80">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: { children: ReactNode }) => (
    <th className="border border-white/10 bg-white/10 px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-white/70">
      {children}
    </th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="border border-white/10 px-4 py-3 text-white/70">{children}</td>
  ),
  Image: CustomImage,
  Callout,
}
