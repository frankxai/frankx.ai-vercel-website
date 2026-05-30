/**
 * ContemplativeReader — the editorial-dark typographic frame for all rails
 * surfaces (/on-god/, /on-reality/, /on-consciousness/, /on-faith/, /canon/).
 *
 * Same `void` foundation as the rest of FrankX. Different register: Source
 * Serif 4 body, warm-cream ink, wider line-length (max-w-2xl ≈ 70ch on
 * serif), generous line-height (1.85), doubled section padding.
 *
 * No global navigation chrome on rails — the rails do not flow back into
 * funnels. The only navigation is the hub-row sticky header.
 */

import type { ReactNode } from 'react';

export function ContemplativeReader({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`min-h-screen bg-[#0a0a0b] ${className}`}>
      <article
        className="
          mx-auto max-w-2xl px-6 py-32 lg:py-40
          font-serif-editorial text-[1.0625rem] leading-[1.85]
          text-ink-contemplative-muted
          [&_h1]:font-serif-editorial [&_h1]:font-semibold [&_h1]:text-ink-contemplative
          [&_h1]:text-[2.369rem] [&_h1]:leading-[1.15] [&_h1]:tracking-[-0.005em]
          [&_h1]:mb-8
          [&_h2]:font-serif-editorial [&_h2]:font-semibold [&_h2]:text-ink-contemplative
          [&_h2]:text-[1.777rem] [&_h2]:leading-[1.25] [&_h2]:mt-16 [&_h2]:mb-6
          [&_h3]:font-serif-editorial [&_h3]:font-semibold [&_h3]:text-ink-contemplative
          [&_h3]:text-[1.333rem] [&_h3]:leading-[1.3] [&_h3]:mt-12 [&_h3]:mb-4
          [&_p]:my-6
          [&_p_a]:underline [&_p_a]:underline-offset-4
          [&_p_a]:decoration-ink-contemplative-faint
          [&_p_a:hover]:decoration-ink-contemplative
          [&_p_a:hover]:text-ink-contemplative
          [&_blockquote]:border-l-2 [&_blockquote]:border-ink-contemplative-faint
          [&_blockquote]:pl-6 [&_blockquote]:my-10 [&_blockquote]:italic
          [&_blockquote]:text-ink-contemplative
          [&_blockquote_p]:my-2
          [&_hr]:my-16 [&_hr]:border-white/10
          [&_strong]:text-ink-contemplative [&_strong]:font-semibold
          [&_em]:italic
          [&_ul]:my-6 [&_ul]:pl-6 [&_ul]:list-disc [&_ul]:marker:text-ink-contemplative-faint
          [&_ol]:my-6 [&_ol]:pl-6 [&_ol]:list-decimal [&_ol]:marker:text-ink-contemplative-faint
          [&_li]:my-2
          [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-ink-contemplative-faint
          [&_a:hover]:decoration-ink-contemplative
          print:bg-white print:text-black
          print:[&_h1]:text-black print:[&_h2]:text-black print:[&_h3]:text-black
          print:[&_blockquote]:text-black
          print:[&_strong]:text-black
          print:[&_a]:text-black print:[&_a]:no-underline
        "
      >
        {children}
      </article>
    </div>
  );
}
