# Reliable workflow lab: design decision

Owning issue: https://github.com/frankxai/frankx.ai-vercel-website/issues/858

Base: e982ccdda06cc9a0fa236fc08b8c5ed789460e0a. Scope: new nested Creator OS lab, bounded discovery links, truthful metadata and sitemap. Homepage excluded.

## Three source-grounded directions

1. **Editorial field guide.** Extend the existing workshop page's evidence-led prose with a long-form article and downloadable worksheet. Strong reading flow, but weak connection between instruction and learner output.
2. **Build bench — selected.** Preserve the site's obsidian, emerald, Inter and Poppins language. Put an inspectable fictional artifact beside the lesson promise; six server-rendered lessons lead into a focused, portable workspace. Best fit for the requested useful transformation and currently available infrastructure.
3. **Cohort room.** Lead with participants, peer conversations and mentor feedback. Not selected: an operational cohort, hosted reviews and mentor availability are not established. Publishing those promises would misrepresent availability.

## Experience thesis

A creator already using a conversational assistant wants to turn plausible drafts into repeatable work they can inspect. The valuable result is one bounded specification, three observed tests and a portable review packet. The page proves the method through a fictional source-to-draft example, not a testimonial or performance claim. The primary action is start lesson one; the workbench is available immediately without signup. A trusted peer can use the exported review template in an existing group.

## Composition and interaction

Read order: task promise → fictional artifact → authorship → lesson path → source recipe → learner work → peer review → teaching basis. Native details, anchors, form controls and download. No new imagery, font family or decorative motion. Motion cut because the artifact and lesson hierarchy carry the explanation, and animation adds no instructional meaning.

Delivery: a cacheable HTML App Route at the same nested course URL. The initial React route inherited roughly 350 KB of JavaScript and site-wide styles/font preloads, and mobile Lighthouse LCP exceeded the 2.5-second budget. The independently reviewed focused document retains the build-bench composition and exposes Courses/Creator OS return links. The typed model is the single source for both tests and a small native module compiled with existing TypeScript. Assets use content hashes, retain published generations, and pass a source-integrity check. No global navigation, music, provider or homepage implementation is changed. Readable lessons and a real blank Markdown worksheet are available without JavaScript.

The existing Inter, Poppins SemiBold and JetBrains Mono families are self-hosted as Latin WOFF2 subsets. FontTools identity/axis inspection and the included OFL license/copyright evidence are recorded in font-inventory.json. No new runtime dependency is added. No learner-input analytics are collected in the standalone lab.

## Review and evidence

Maker: Codex root. Independent verifier: education_verifier, required by world-class-web-release. Approver: Frank, who explicitly requested GitHub and Vercel release. Direction B independently recommended before implementation. Screenshots and test evidence are recorded against the candidate before merge; publication approval does not imply founder pedagogical review or learner validation.

Required matrix: 375, 768 and 1440 pixels; keyboard, reduced motion, current browser, corrupt/unavailable storage, current-state export, three failure tests, truthful provenance and metadata. Site is dark-only; light theme is not an offered state. Device saving is opt-in; no draft content belongs in analytics or URLs. No runtime LLM, payment provider or hosted peer forum is added.

Rollback: revert the bounded release commit through a PR; preserve established URLs. No data migration is required. Stored drafts use a namespaced version-1 key and strict bounded parsing.
