/**
 * Sticky header for the rails surfaces. The only navigation chrome these
 * pages get. Five links: the four hubs + canon. No global nav, no command
 * palette, no auth. The rails are reading-only.
 */

import Link from 'next/link';
import type { HubSlug } from '@/lib/rails/types';
import { HUB_ORDER, hubUrl } from '@/lib/rails/types';
import { hubs } from '@/data/rails/hubs';

export function RailHubHeader({ activeHub }: { activeHub?: HubSlug | 'canon' | 'study' }) {
  return (
    <header className="border-b border-white/5 bg-[#0a0a0b]/80 backdrop-blur-xl sticky top-0 z-40 print:hidden">
      <nav className="mx-auto max-w-2xl px-6 py-4 flex items-center justify-between text-[11px] tracking-[0.25em] uppercase">
        <Link
          href="/study"
          className={
            activeHub === 'study'
              ? 'text-ink-contemplative'
              : 'text-ink-contemplative-faint hover:text-ink-contemplative transition-colors'
          }
          aria-label="Study — index of rails and canon"
          aria-current={activeHub === 'study' ? 'page' : undefined}
        >
          Study
        </Link>
        <div className="flex flex-wrap gap-x-5 gap-y-2 justify-end">
          {HUB_ORDER.map((slug) => (
            <Link
              key={slug}
              href={hubUrl(slug)}
              className={
                slug === activeHub
                  ? 'text-ink-contemplative'
                  : 'text-ink-contemplative-faint hover:text-ink-contemplative-muted transition-colors'
              }
              aria-current={slug === activeHub ? 'page' : undefined}
            >
              {hubs[slug].displayTitle.replace(/^Notes on /, '')}
            </Link>
          ))}
          <Link
            href="/canon"
            className={
              activeHub === 'canon'
                ? 'text-ink-contemplative'
                : 'text-ink-contemplative-faint hover:text-ink-contemplative-muted transition-colors'
            }
            aria-current={activeHub === 'canon' ? 'page' : undefined}
          >
            Canon
          </Link>
        </div>
      </nav>
    </header>
  );
}
