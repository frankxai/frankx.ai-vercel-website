import Image from 'next/image'
import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { MDXComponents } from 'mdx/types'
import AffiliateLink from '@/components/affiliates/AffiliateLink'

type CalloutKind = 'info' | 'warning' | 'tip' | 'success'

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
}
