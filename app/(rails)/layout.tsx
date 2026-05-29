/**
 * Root layout for the contemplative rails route group.
 *
 * Sets noindex/nofollow site-wide for these surfaces. Frank lifts this manually
 * in `docs/rails/launch-gate.md` after answering the §11 forcing questions.
 * Until then the rails are reachable by direct URL only — not indexed, not
 * linked from the global navigation, not surfaced in /network or homepage.
 *
 * Per safety hardening §0 of the implementation plan:
 *   - No global FrankX nav is rendered (the parent app/layout.tsx still loads
 *     it, but the rails pages position their own RailHubHeader on top, and
 *     the visual treatment makes the rail subtree feel like its own publication).
 *   - No newsletter form, no "Work with me", no contact CTAs anywhere
 *     downstream of this layout.
 */

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function RailsRootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
