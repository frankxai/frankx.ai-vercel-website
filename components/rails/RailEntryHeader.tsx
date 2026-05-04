/**
 * Per-entry header: hub eyebrow, title, italic thesis sentence, version+date
 * meta. The thesis sentence is the AEO answer block — first 80 words, exact
 * answer to the title's implicit question.
 */

import type { RailEntry } from '@/lib/rails/types';
import { hubs } from '@/data/rails/hubs';

export function RailEntryHeader({ entry }: { entry: RailEntry }) {
  return (
    <header className="not-prose mb-12">
      <p className="text-[11px] tracking-[0.25em] uppercase text-ink-contemplative-faint mb-4">
        /on-{entry.hub}/ · {hubs[entry.hub].question.toLowerCase()}
      </p>
      <h1 className="font-serif-editorial text-[2.369rem] leading-[1.15] font-semibold tracking-[-0.005em] text-ink-contemplative mb-6">
        {entry.title}
      </h1>
      <p className="font-serif-editorial italic text-[1.25rem] leading-[1.7] text-ink-contemplative-muted">
        {entry.thesisSentence}
      </p>
      <p className="mt-8 text-[11px] tracking-[0.25em] uppercase text-ink-contemplative-faint">
        Written{' '}
        {new Date(entry.dateWritten).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        {' · '}v{entry.version}
        {entry.status === 'paused' && ' · paused'}
      </p>
    </header>
  );
}
