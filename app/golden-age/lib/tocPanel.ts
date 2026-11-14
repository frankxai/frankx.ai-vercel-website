/**
 * Availability and closed-state geometry for the golden-age TOC panel.
 *
 * The panel is `fixed` with `right-6` (1.5rem). `translate-x-full` only moves
 * it by its own width, so a 24px sliver stays in the viewport. Adding the
 * right offset (`calc(100% + 1.5rem)`) sends the closed mobile panel fully
 * off-screen. At lg+ the desktop instance stays put via `lg:translate-x-0`.
 *
 * React is 18.3 in this repo. @types/react types `inert` as boolean, but
 * React 18 is not guaranteed to treat `inert={false}` as "not inert" (it may
 * still emit the attribute, and a present `inert` value is inert in HTML).
 * Set `inert={true}` only when the mobile instance is closed; omit the
 * attribute otherwise so the desktop (lg+) instance stays focusable.
 */
export const TOC_PANEL_CLOSED_TRANSLATE =
  'translate-x-[calc(100%+1.5rem)] lg:translate-x-0';
export const TOC_PANEL_OPEN_TRANSLATE = 'translate-x-0';

export type TocVariant = 'desktop' | 'mobile';

export function tocPanelTranslateClass(isOpen: boolean): string {
  return isOpen ? TOC_PANEL_OPEN_TRANSLATE : TOC_PANEL_CLOSED_TRANSLATE;
}

export function tocPanelInertProps(
  variant: TocVariant,
  isOpen: boolean,
): { inert?: true; 'aria-hidden'?: true } {
  const hideFromA11y = variant === 'mobile' && !isOpen;
  if (!hideFromA11y) return {};
  return { inert: true, 'aria-hidden': true };
}
