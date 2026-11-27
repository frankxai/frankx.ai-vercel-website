# Aurora primary action baselines

Four PNGs cover the primary waitlist link on the Aurora UI Kit product and checkout pages at viewport widths of 390 and 1440 CSS pixels, height 900, device scale 1 and reduced motion. Source is FrankX `0f3968a44fa35d612731e2a46c24c2028c6f1344` with the pre-stage checkout guard from #1271 (`71f293d086069474bf4b625856efeab6b66ab475`).

Capture used Chrome Headless Shell 156.0.8078.47, pinned by Puppeteer 25.16.0, and a production Next.js 16.4.5 build of the actual route, registry, components, global styles, liquid styles and Tailwind configuration. The isolated root loaded the repository's Inter asset and body classes. Full-page screenshots from CI cover the production shell separately.

The test captures a focused link after fonts settle. It rejects changed dimensions or more than two percent of pixels changing by over 32 in any RGBA channel. CI writes actual images to the evidence artifact. Accept an intentional visual change by reviewing those actuals on the exact candidate and committing the approved images; CI never overwrites references.

Lighthouse CI separately runs three simulated mobile navigations per Aurora route, against a local build. It enforces route medians of 1800 ms LCP and 0.05 CLS. Field p75 and INP require production interaction telemetry.
