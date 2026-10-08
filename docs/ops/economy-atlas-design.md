# Native economic atlas: composition decision

Issue: #854. Base: e982ccdda06cc9a0fa236fc08b8c5ed789460e0a.
Production baseline: cloud run 36999955369, 2 October 2026, research and lab at 1440×1000 and 390×844, DPR 1. Hash-verified images have sidecars and ledger entries. The research host uses Inter, dark surfaces, emerald emphasis and a restrained hierarchy. No host/navigation redesign is included.

The reader's job is to compare a concrete product and its distribution routes, identify missing evidence, and save a cost scenario for further research. A market's audience is context; it cannot establish product demand or a revenue forecast.

Exactly three directions were compared before the native interface implementation:

| Direction | Composition and typography | Imagery and interaction | Motion | Decision |
| --- | --- | --- | --- | --- |
| Evidence atlas | Desktop list / focused route diagram / product inspector. Poppins display headings, Inter body/controls; monospaced assumptions. Mobile chooses a product first, then reads channels and evidence. | Actual product-to-channel relationships drawn as SVG. Sources beside their claims. Filters, three-product comparison and editable economics. | Short opacity emphasis on the selected route; keyboard actions immediate; reduced motion static. | Selected by the maker for implementation because it answers the original visual economic-map request while retaining evidence. Founder review remains pending. |
| Guided product journey | Full-width editorial chapters: build, install, distribute, measure. Larger serif annotations and one product at a time. | Installation examples and sequential next/back decisions rather than an overview graph. | Optional chapter transitions, no scroll trapping. | Serious alternative for first-time builders; hides cross-channel comparison and adds steps for repeated research. |
| Comparison workbench | Dense horizontal columns and pinned criteria. Compact sans-serif labels and tabular figures. Mobile compares one criterion across products. | No decorative imagery; cost and evidence differences occupy the first viewport. | Instant updates, optional row emphasis. | Useful for shortlists; a less useful opening when the reader has not chosen products yet. Comparison is retained inside the atlas. |

Static composition precedes motion. The page uses the current host fonts and CSS for purposeful state changes. GSAP is reserved for a later explanatory timeline if reviewed frame evidence justifies its cost; no new animation dependency is needed for this slice. Existing button.tsx is a stub and is not treated as an accessible shadcn primitive. Native labelled inputs, buttons and disclosure elements provide the required semantics without changing shared controls.

Acceptance: filters, comparison cap, product/source inspection, editable assumptions, URL recovery, explicit local save/restore, JSON export, invalid/corrupt state recovery, touch/focus/reduced-motion, current source qualifications. Compare against using separate marketplace pages and a spreadsheet: the atlas must preserve source scope and provide a reusable scenario, while account approval and actual transaction economics still require those original sources.

Public release remains gated on native build/preview, exact-revision independent review, source qualifications, desktop/mobile refinement and stable-domain evidence. The route and dataset are now unavailable in Vercel production unless ECONOMY_ATLAS_RELEASED is explicitly enabled after accepted evidence. Preview deployments remain reviewable; a CI-only local QA flag cannot bypass the production decision. Captures and passing tests alone do not establish demand or a paid product.
