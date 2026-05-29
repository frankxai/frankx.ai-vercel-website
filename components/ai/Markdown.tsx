'use client'

import { useMemo } from 'react'
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'
import { cn } from '@/lib/utils'

/**
 * Lightweight markdown renderer for AI answers (chat bubbles + /ask pages).
 *
 * Uses `marked` (already a dependency) → DOMPurify sanitize → styled HTML.
 * We deliberately avoid the heavier MDX `evaluate()` pipeline used for authored
 * blog posts: chat answers stream as plain markdown strings and must render
 * cheaply on every token flush. Styling mirrors the site's article typography
 * (emerald links, mono code) at a chat-appropriate scale.
 *
 * `variant="chat"` = compact, for message bubbles.
 * `variant="prose"` = larger, for /ask answer bodies.
 */

marked.setOptions({ gfm: true, breaks: true })

const SANITIZE_CONFIG = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'del', 'code', 'pre', 'blockquote',
    'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'h4', 'hr', 'table',
    'thead', 'tbody', 'tr', 'th', 'td',
  ],
  ALLOWED_ATTR: ['href', 'target', 'rel'],
}

export default function Markdown({
  content,
  variant = 'chat',
  className,
}: {
  content: string
  variant?: 'chat' | 'prose'
  className?: string
}) {
  const html = useMemo(() => {
    const raw = marked.parse(content ?? '', { async: false }) as string
    const clean = DOMPurify.sanitize(raw, SANITIZE_CONFIG)
    // Force external-safe link attributes on anything that survived sanitize.
    return clean.replace(/<a /g, '<a rel="noopener noreferrer" ')
  }, [content])

  const base =
    variant === 'chat'
      ? cn(
          'studio-md text-[14px] leading-relaxed',
          '[&_p]:my-2 first:[&_p]:mt-0 last:[&_p]:mb-0',
          '[&_a]:text-cyan-300 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-cyan-200',
          '[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5',
          '[&_li]:my-1',
          '[&_h1]:mt-3 [&_h1]:mb-1.5 [&_h1]:text-base [&_h1]:font-semibold',
          '[&_h2]:mt-3 [&_h2]:mb-1.5 [&_h2]:text-[15px] [&_h2]:font-semibold',
          '[&_h3]:mt-2.5 [&_h3]:mb-1 [&_h3]:text-sm [&_h3]:font-semibold',
          '[&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[12.5px] [&_code]:text-emerald-300/90',
          '[&_pre]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-white/10 [&_pre]:bg-black/40 [&_pre]:p-3 [&_pre]:text-[12.5px]',
          '[&_pre_code]:bg-transparent [&_pre_code]:p-0',
          '[&_blockquote]:border-l-2 [&_blockquote]:border-emerald-500/40 [&_blockquote]:pl-3 [&_blockquote]:text-white/70',
          '[&_table]:my-2 [&_table]:w-full [&_table]:text-[13px] [&_th]:border-b [&_th]:border-white/15 [&_th]:py-1 [&_th]:text-left [&_td]:border-b [&_td]:border-white/[0.06] [&_td]:py-1'
        )
      : cn(
          'studio-md text-[17px] leading-[1.8] text-white/85',
          '[&_p]:my-4',
          '[&_a]:text-emerald-400 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-emerald-300',
          '[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6',
          '[&_li]:my-1.5',
          '[&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white',
          '[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white',
          '[&_code]:rounded-md [&_code]:border [&_code]:border-white/10 [&_code]:bg-white/[0.06] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[15px] [&_code]:text-emerald-300/90',
          '[&_pre]:my-5 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-white/10 [&_pre]:bg-black/40 [&_pre]:p-4',
          '[&_pre_code]:border-0 [&_pre_code]:bg-transparent [&_pre_code]:p-0',
          '[&_blockquote]:border-l-2 [&_blockquote]:border-emerald-500/40 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-white/75'
        )

  return <div className={cn(base, className)} dangerouslySetInnerHTML={{ __html: html }} />
}
