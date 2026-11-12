# Golden-age chapter and TOC

A visitor can open a published Golden Age chapter, read the chapter title and body, and jump between sections with the table of contents: a docked panel on desktop, a toggle plus sliding panel on mobile.

## Sub-features

- `chapter-open` loads a published chapter and shows its title as an `h1`.
- `toc-desktop` keeps the table of contents on screen at 1280 and at 1024 (`lg` and up). The desktop instance stays focusable: it does not receive `inert` or `aria-hidden`.
- `toc-mobile` hides the panel until the visitor opens the toggle at 375, then shows the same section list. When the mobile drawer is closed it is fully off-screen and is `inert` plus `aria-hidden`; those attributes are omitted once it is open.
- `toc-jump` scrolls to the chosen heading after a TOC click. Jump ids stay derived from the original heading text, not from a TOC label.
- `numeral-rule` skips chapter/source/quotable/end-chapter titles, then applies the conditional numeral rule in `extractChapterToc`: bare roman or arabic numerals (`I.`, `XI.`, `3.`) are dropped when the chapter also has titled headings, and are kept with a `Section I` label when every remaining heading is a bare numeral.

## How to get to it (user POV)

- Open `/golden-age` and choose a published chapter.
- Open a chapter URL directly, for example `/golden-age/chapter-01-when-creation-calls` or `/golden-age/chapter-02-the-orchestration-age`.
- On a narrow viewport, choose the control labeled `Toggle table of contents`.
- On a wide viewport, use the docked `Table of contents` navigation.

## Driving it with Python Playwright

Preconditions:

- Local: `python scripts/verify/run-journey.py --doctor --target local` is clean for this SHA. Prod: the production ready probe passes.
- Chrome is available to Playwright as `channel="chrome"`.
- The chapter body is a client-only mount. Wait for the chapter `h1` before asserting the TOC.

- **Open chapter 1.** Go to `/golden-age/chapter-01-when-creation-calls`. Wait until an `h1` named exactly `When Creation Calls` is visible. The page is not ready on the first HTML shell.
- **Desktop panel (1280 and 1024).** Measure the visible `aside#toc-panel` (`role="navigation"`, `aria-label="Table of contents"`). It is on screen, contains the heading `Table of Contents`, and includes the button labeled `II. The History You Carry`. The toggle button is not visible. The visible (desktop) panel has no `inert` attribute and no `aria-hidden`. Capture a screenshot and the panel box.
- **Numeral rule on chapter 1.** The visible TOC starts at `II. The History You Carry` and does not list bare `I.` or `XI.`, nor `Section I` or `Section XI`. Those bare headings are skipped because chapter 1 also has titled sections. Jump ids still come from the original heading, so the History heading is `#ii-the-history-you-carry`.
- **Jump.** Click the visible TOC button `II. The History You Carry`. The heading span `#ii-the-history-you-carry` ends up in view. Capture a screenshot after the click, not only before it.
- **Mobile closed (375).** The visible `button[aria-label="Toggle table of contents"]` (`aria-controls="toc-panel"`, `aria-expanded=false`) is on screen. The mobile `#toc-panel` is translated with `translate-x-[calc(100%+1.5rem)]` (from `tocPanelTranslateClass(false)` / `TOC_PANEL_CLOSED_TRANSLATE`) so the sliver is 0px — the panel's left edge is at or past the viewport width. `tocPanelInertProps("mobile", false)` sets `inert={true}` and `aria-hidden={true}` only in this state. Capture the closed state, the sliver width, and those attributes.
- **Mobile open.** Click the toggle. `aria-expanded` becomes `true`, the panel uses `translate-x-0` and is on screen with the same chapter 1 labels, and `inert` / `aria-hidden` are omitted. Capture the open state. Click `II. The History You Carry` and confirm `#ii-the-history-you-carry` is in view.
- **Numerals-only chapter.** Go to `/golden-age/chapter-02-the-orchestration-age`. Wait for the `h1` named exactly `The Orchestration Age`. The visible TOC lists `Section I` through `Section VIII` (eight labelled entries, not bare `I.`–`VIII.`). The book source itself is still `## I.` and is not retitled.
- **Proof.** Write screenshots and `measurements.json` at 1280, 1024, and 375 under the evidence directory. Include TOC texts, panel boxes, sliver, inert/aria-hidden, toggle state, and whether the jump target was in view.
- **Command.** `python scripts/verify/run-journey.py --journey golden-age --target local` or `--target prod`.

## Gotchas

- `ChapterReader` is wrapped with `dynamic(..., { ssr: false })`. A 200 on the chapter route can still be the pulse placeholder. Always wait for the `h1` named exactly `When Creation Calls`; a markdown `h1` such as `CHAPTER 1: WHEN CREATION CALLS` also exists in the body.
- Two `#toc-panel` nodes and two toggles are in the DOM (`variant="desktop"` in a `hidden lg:block` wrapper and `variant="mobile"` in an `lg:hidden` wrapper). Always target the visible instance. The hidden mobile instance may be inert even at desktop widths because that copy starts closed.
- Tailwind `lg` starts at 1024px, so 1024 is a desktop width for this UI. 375 is the mobile case.
- The closed mobile translate is `translate-x-[calc(100%+1.5rem)] lg:translate-x-0` so `right-6` (1.5rem) does not leave a sliver. Require a 0px sliver (allow 1px for subpixel rounding).
- React 18.3: `inert={true}` is passed only when the mobile instance is closed. The attribute is omitted otherwise (`inert={false}` can still emit `inert` in HTML). Assert absence of the attribute on the desktop panel and on the open mobile panel, not `inert="false"`.
- TOC jump uses `behavior: "smooth"`. Wait until `#ii-the-history-you-carry` is in the viewport; do not assert immediately after the click.
- Do not retitle book source to make the TOC prettier. `sourceText` stays `I.`; only the TOC label becomes `Section I`.
