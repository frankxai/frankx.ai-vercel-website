# Golden-age chapter and TOC

A visitor can open a published Golden Age chapter, read the chapter title and body, and jump between sections with the table of contents: a docked panel on desktop, a toggle plus sliding panel on mobile.

## Sub-features

- `chapter-open` loads a published chapter and shows its title as an `h1`.
- `toc-desktop` keeps the table of contents on screen at 1280 and at 1024 (`lg` and up).
- `toc-mobile` hides the panel until the visitor opens the toggle at 375, then shows the same section list.
- `toc-jump` scrolls to the chosen heading after a TOC click.
- `numeral-rule` lists remaining headings after skipping chapter/source/quotable/end-chapter titles. On this checkout, bare roman or arabic numerals such as `I.` and `XI.` are included as written, so a numerals-only chapter still has a TOC.

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

- **Open chapter 1.** Go to `/golden-age/chapter-01-when-creation-calls`. Wait until an `h1` contains `When Creation Calls`. The page is not ready on the first HTML shell.
- **Desktop panel (1280 and 1024).** Measure the visible `aside#toc-panel` (`role="navigation"`, `aria-label="Table of contents"`). It is on screen, contains the heading `Table of Contents`, and includes the button labeled `II. The History You Carry`. The toggle button is not visible. Capture a screenshot and the panel box.
- **Numeral rule on chapter 1.** The visible TOC also includes a bare `I.` entry (and typically `XI.`). This is the current extractor in `ChapterReader`: it skips only headings whose text contains `chapter`, `source`, `quotable`, or `end chapter`.
- **Jump.** Click the visible TOC button `II. The History You Carry`. The heading span `#ii-the-history-you-carry` ends up in view. Capture a screenshot after the click, not only before it.
- **Mobile closed (375).** The visible `button[aria-label="Toggle table of contents"]` (`aria-controls="toc-panel"`, `aria-expanded=false`) is on screen. The visible `#toc-panel` is translated to the right so its body is off the page. On this checkout `translate-x-full` plus `right-6` leaves a measured ~24px sliver; record that width. Capture the closed state.
- **Mobile open.** Click the toggle. `aria-expanded` becomes `true` and the visible panel slides on screen with the same section labels. Capture the open state. Click `II. The History You Carry` and confirm the heading is in view.
- **Numerals-only chapter.** Go to `/golden-age/chapter-02-the-orchestration-age`. Wait for the `h1` `The Orchestration Age`. The visible TOC is not empty; it lists the bare numeral headings (`I.` through `VIII.`).
- **Proof.** Write screenshots and `measurements.json` at 1280, 1024, and 375 under the evidence directory. Include TOC texts, panel boxes, toggle state, and whether the jump target was in view.
- **Command.** `python scripts/verify/run-journey.py --journey golden-age --target local` or `--target prod`.

## Gotchas

- `ChapterReader` is wrapped with `dynamic(..., { ssr: false })`. A 200 on the chapter route can still be the pulse placeholder. Always wait for the `h1`.
- Two `#toc-panel` nodes and two toggles are in the DOM (desktop wrapper and mobile wrapper). Querying `page.locator('#toc-panel')` without filtering by visibility will hit the hidden copy.
- Tailwind `lg` starts at 1024px, so 1024 is a desktop width for this UI. 375 is the mobile case.
- The closed mobile panel uses `translate-x-full` while the aside is `right-6`, so about 24px of the panel stays on screen. Pull request #1228 (in review) translates `calc(100% + 1.5rem)` to hide that sliver. Assert the drawer is translated closed and record the sliver; do not require a 0px sliver until that change lands. After it lands, tighten the sliver ceiling.
- TOC jump uses `behavior: "smooth"`. Wait until `#ii-the-history-you-carry` is in the viewport; do not assert immediately after the click.
- On this checkout (current `main`), bare numeral headings are kept as their source text. Pull request #1228 (in review) changes that rule: skip bare numerals when the chapter also has titled headings, and label them `Section I` when every remaining heading is a numeral. When that lands, update this file and the runner assertions; do not pre-assert the new labels here or the journey will fail on this branch.
- Do not retitle book source to make the TOC prettier.
