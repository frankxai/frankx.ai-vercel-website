/**
 * Hub manifesto page renderer — the head of each /on-X/ index page.
 *
 * Renders: head-question H1, manifesto body (paragraphs split on blank lines),
 * canonical-entries list, then up to 5 cross-tagged entries with badges.
 */

import { ContemplativeReader } from './ContemplativeReader';
import { RailEntryCard } from './RailEntryCard';
import type { HubSlug, RailEntry } from '@/lib/rails/types';
import { hubs } from '@/data/rails/hubs';

interface Props {
  hub: HubSlug;
  canonical: RailEntry[];
  crossTagged: RailEntry[];
}

export function RailHubManifesto({ hub, canonical, crossTagged }: Props) {
  const config = hubs[hub];
  const paragraphs = config.manifesto.split('\n\n').filter(Boolean);

  return (
    <ContemplativeReader>
      <p className="text-[11px] tracking-[0.25em] uppercase text-ink-contemplative-faint not-prose mb-4">
        /on-{hub}/
      </p>
      <h1>{config.question}</h1>

      {paragraphs.map((p, i) => (
        <p
          key={i}
          className={i === 0 ? 'text-[1.125rem] leading-[1.75] text-ink-contemplative' : ''}
        >
          {p}
        </p>
      ))}

      <hr />

      <h2>Entries</h2>

      {canonical.length === 0 && crossTagged.length === 0 && (
        <p className="text-ink-contemplative-faint italic">
          No live entries yet. The first walk is in draft.
        </p>
      )}

      <div className="not-prose">
        {canonical.map((e) => (
          <RailEntryCard key={`${e.hub}-${e.slug}`} entry={e} />
        ))}
        {crossTagged.slice(0, 5).map((e) => (
          <RailEntryCard
            key={`xtag-${e.hub}-${e.slug}`}
            entry={e}
            showCrossTag
          />
        ))}
      </div>

      <p className="mt-16 text-[11px] tracking-[0.25em] uppercase text-ink-contemplative-faint">
        Cross-linked at:{' '}
        {(['god', 'reality', 'consciousness', 'faith'] as HubSlug[])
          .filter((h) => h !== hub)
          .map((h) => `/on-${h}/`)
          .join(' · ')}{' '}
        · /canon/
      </p>
    </ContemplativeReader>
  );
}
