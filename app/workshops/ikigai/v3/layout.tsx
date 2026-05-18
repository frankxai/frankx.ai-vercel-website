import { Noto_Serif_JP } from 'next/font/google'

/**
 * Route-segment layout for Ikigai V3.
 *
 * Why this exists: V3 is the only surface that uses Noto Serif JP. Loading
 * it from the root layout would force every page on the site to ship the
 * CJK font CSS in <head>. This segment scopes the font to /workshops/ikigai/v3
 * with preload=true so the hero kanji LCP element gets the font as a discovered
 * resource (no FOUT, minimal CLS).
 *
 * Performance audit P0: replaces the global Noto Serif JP binding in
 * app/layout.tsx (now switched to display: 'optional' as the fallback path).
 *
 * Token used by V3: --font-jp-serif (same name as global, route-segment value
 * wins inside this subtree).
 */
const notoSerifJP = Noto_Serif_JP({
  weight: ['200', '400'],
  variable: '--font-jp-serif',
  display: 'swap',
  preload: true,
})

export default function IkigaiV3Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={notoSerifJP.variable}>{children}</div>
}
