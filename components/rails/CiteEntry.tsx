/**
 * "Cite this entry" widget — generates APA, MLA, and Chicago citation strings
 * for a rail entry. Lifts the seriousness signal: real research publications
 * make this easy.
 *
 * Server component, no JS — three citations rendered statically. Readers can
 * select-copy any of them.
 */

import type { RailEntry } from '@/lib/rails/types';
import { hubUrl } from '@/lib/rails/types';

interface Props {
  entry: RailEntry;
  siteUrl: string;
}

function dateParts(dateStr: string) {
  const d = new Date(dateStr);
  return {
    year: d.getFullYear(),
    month: d.toLocaleDateString('en-US', { month: 'long' }),
    day: d.getDate(),
    iso: d.toISOString().slice(0, 10),
  };
}

export function CiteEntry({ entry, siteUrl }: Props) {
  const url = `${siteUrl}${hubUrl(entry.hub)}/${entry.slug}`;
  const { year, month, day } = dateParts(entry.datePublished);

  const apa = `Riemer, F. (${year}, ${month} ${day}). ${entry.title}. FrankX. ${url}`;
  const mla = `Riemer, Frank. "${entry.title}." FrankX, ${day} ${month} ${year}, ${url}.`;
  const chicago = `Riemer, Frank. "${entry.title}." FrankX (${month} ${day}, ${year}). ${url}.`;

  return (
    <details className="border border-white/8 rounded-md">
      <summary className="cursor-pointer px-4 py-3 text-[11px] tracking-[0.25em] uppercase text-ink-contemplative-muted hover:text-ink-contemplative">
        Cite this entry
      </summary>
      <div className="px-4 py-4 space-y-4 text-[0.875rem] leading-[1.6] text-ink-contemplative-muted font-serif-editorial border-t border-white/8">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-ink-contemplative-faint mb-1">APA</p>
          <p className="select-text">{apa}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-ink-contemplative-faint mb-1">MLA</p>
          <p className="select-text">{mla}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-ink-contemplative-faint mb-1">Chicago</p>
          <p className="select-text">{chicago}</p>
        </div>
      </div>
    </details>
  );
}
