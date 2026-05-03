/**
 * Listing card for a rail entry — used on hub indexes and on canon
 * cited-in lists. Editorial typography, no images, no decoration.
 */

import Link from 'next/link';
import type { RailEntry } from '@/lib/rails/types';
import { hubUrl } from '@/lib/rails/types';

export function RailEntryCard({
  entry,
  showCrossTag = false,
}: {
  entry: RailEntry;
  /** True when shown on a hub where the entry is cross-tagged (not canonical). */
  showCrossTag?: boolean;
}) {
  const url = `${hubUrl(entry.hub)}/${entry.slug}`;
  return (
    <Link
      href={url}
      className="block py-10 border-b border-white/8 group transition-colors"
    >
      <div className="flex items-baseline justify-between gap-6">
        <h3 className="font-serif-editorial text-[1.333rem] leading-[1.3] font-semibold text-ink-contemplative group-hover:text-white transition-colors">
          {entry.title}
        </h3>
        {showCrossTag && (
          <span className="shrink-0 text-[10px] tracking-[0.25em] uppercase text-ink-contemplative-faint">
            from /on-{entry.hub}/
          </span>
        )}
      </div>
      <p className="mt-3 font-serif-editorial text-[1rem] leading-[1.65] text-ink-contemplative-muted line-clamp-3">
        {entry.thesisSentence}
      </p>
      <p className="mt-4 text-[11px] tracking-[0.25em] uppercase text-ink-contemplative-faint">
        {new Date(entry.datePublished).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        {entry.version ? ` · v${entry.version}` : ''}
      </p>
    </Link>
  );
}
