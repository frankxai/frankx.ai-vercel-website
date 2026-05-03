/**
 * Per-entry footer: AI involvement statement (mandatory), CC license badge,
 * cross-tagged hub links, "Cite this entry" widget.
 *
 * No social-share buttons, no comment box, no newsletter form, no "follow
 * Frank" links. The rails do not flow back into funnels.
 */

import Link from 'next/link';
import type { RailEntry, HubSlug } from '@/lib/rails/types';
import { hubUrl } from '@/lib/rails/types';
import { hubs } from '@/data/rails/hubs';
import { CiteEntry } from './CiteEntry';

const SITE = 'https://frankx.ai';

export function RailEntryFooter({ entry }: { entry: RailEntry }) {
  return (
    <footer className="not-prose mt-24 pt-12 border-t border-white/8 space-y-10">
      <p className="text-[0.875rem] leading-[1.65] text-ink-contemplative-faint italic">
        {entry.aiInvolvement}
      </p>

      <CiteEntry entry={entry} siteUrl={SITE} />

      <div className="space-y-3">
        <p className="text-[11px] tracking-[0.25em] uppercase text-ink-contemplative-faint">
          Cross-linked at:{' '}
          {entry.crossTags.map((slug, i) => (
            <span key={slug}>
              {i > 0 && ' · '}
              <Link
                href={hubUrl(slug as HubSlug)}
                className="text-ink-contemplative-muted hover:text-ink-contemplative"
              >
                /on-{slug}/
              </Link>
            </span>
          ))}
          {' · '}
          <Link
            href="/canon"
            className="text-ink-contemplative-muted hover:text-ink-contemplative"
          >
            /canon/
          </Link>
        </p>

        <p className="text-[11px] tracking-[0.25em] uppercase text-ink-contemplative-faint">
          License:{' '}
          <a
            href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-contemplative-muted hover:text-ink-contemplative"
          >
            CC BY-NC-ND 4.0
          </a>
          {' · '}attribution required, no commercial use, no derivatives
        </p>
      </div>
    </footer>
  );
}
