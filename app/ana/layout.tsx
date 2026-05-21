import type { Metadata } from 'next'

// Voice-pending pages stay out of the index until the Ana extract is in
// and Frank has reviewed the populated copy. Both this layout and the page
// emit `noindex`. Once Phase 5 lands and Frank approves, flip these to indexable.
export const metadata: Metadata = {
  title: 'Ana — collaborator, friend, the one who sees',
  description:
    'A page for Ana — the friend whose intellectual contribution made the architecture honest. People Intelligence. Event Intelligence. IFS as foundation.',
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: 'https://frankx.ai/ana' },
}

export default function AnaLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-ana-obsidian min-h-screen">{children}</div>
}
