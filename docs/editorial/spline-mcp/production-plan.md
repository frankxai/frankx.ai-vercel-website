# Spline MCP Article + Experience Production Plan

Status: editorial draft ready; visual direction awaiting approval; local Spline MCP lab not yet run  
Owner: FrankX  
Series: The AI-Native Creative Stack  
Part 1 route: `/blog/spline-mcp-ai-design-workflow-2026`

## 1. Decision first

Ship this as a four-part build-in-public series, not a single inflated tutorial.

1. **Architecture now:** publish the documented production boundary, workflow, business cases, and test contract.
2. **MCP lab next:** build one canonical scene through the local Spline desktop MCP and capture the evidence.
3. **Next.js production pass:** add the click-to-load embed, analytics, accessibility, performance proof, and downloadable package.
4. **Business result:** report interaction and conversion data, then decide which experience products deserve continued investment.

The governing architecture is:

> Spline owns spatial presentation and interaction. Next.js and Vercel own semantic content, application state, identity, protected data, analytics, revenue logic, deployment, and rollback.

The current cloud environment can research, write, review GitHub, and verify Vercel. It cannot honestly run Spline MCP because the server is bundled with the local macOS/Windows desktop app and routes calls to an open editor tab over `127.0.0.1`.

## 2. Success definition

The project succeeds only if all five outcomes are true:

| Outcome | Acceptance signal |
|---|---|
| Editorial authority | The article makes one decisive argument, cites primary sources, and never presents a future lab result as measured fact. |
| Visual proof | The scene explains the architecture through interaction; it is not an ornamental 3D object. |
| Production quality | The article remains useful without JavaScript, the embed is click-to-load, and a mobile/reduced-motion fallback exists. |
| Reusable media | One owned scene yields the live embed, hero, diagram, OG card, social loop, source file, and interchange export. |
| Business value | The scene has a named conversion hypothesis and instrumentation from load through qualified CTA. |

North-star hypothesis:

> Readers who complete the architecture scene will show higher intent for the next implementation article, a downloadable architecture kit, or a paid FrankX architecture review.

## 3. Audience and editorial job

Primary reader: AI architect, ambitious engineer, product designer, or technical creator evaluating whether Spline belongs in a serious production stack.

The article must help that reader make four decisions:

1. What Spline MCP changes compared with prompt-to-image or prompt-to-model tools.
2. Which layer Spline should own—and which layers it must not own.
3. Which export and integration mode fits the use case.
4. How to budget model tokens, Spline credits, MCP calls, runtime weight, and human review without confusing the meters.

Editorial tone: precise, technically warm, first-person where there is an actual FrankX decision, and explicit about what remains untested.

## 4. Series architecture

| Part | Working title | Evidence requirement | Commercial bridge |
|---:|---|---|---|
| 1 | Spline MCP: The AI-Native 3D Design Workflow | official sources + production architecture | join the build / architecture review |
| 2 | We Built an Interactive 3D Article with Spline MCP | local MCP trace, screenshots, credit/call log | downloadable scene kit |
| 3 | Production Spline in Next.js: Performance and Control | Vercel Preview, Web Vitals, accessibility and failure tests | implementation sprint |
| 4 | Turning Interactive 3D into Business Outcomes | interaction and conversion data | experience-system advisory or production retainer |

Part 1 should contain no claim that depends on the future scene. Part 2 owns the hands-on narrative. Part 3 owns the integration code and measurements. Part 4 owns the economics.

## 5. Three visual directions

No final hero, scene, poster, or social asset should be produced until one direction is selected.

### A — Agentic Orrery

An obsidian and dark-glass “experience kernel” with orbiting architectural layers: Brief → Agent → MCP → Spline → Next.js/Vercel.

- **Expression:** cinematic, spatial, iconic.
- **Motion:** slow inertial separation after activation; no perpetual camera drift.
- **Type:** Poppins and Inter; JetBrains Mono for node labels; one restrained Playfair italic thesis line.
- **Color:** `#0A0A0B`, emerald and cyan, with one violet exception.
- **Strength:** strongest immediate brand memory and social hero.
- **Risk:** lower explanatory density and a harder mobile translation.
- **Prohibited:** galaxies, generic AI brains, particle fog, glowing network clichés.

### B — Spatial Field Manual

A warm-ivory editorial specimen: an exploded isometric stack with graphite annotations and restrained oxidized-teal signals.

- **Expression:** tactile, analytical, magazine-like.
- **Motion:** matte planes separate on scroll and reassemble into the production stack.
- **Type:** Playfair for thesis, Inter body, JetBrains Mono marginalia.
- **Color:** warm ivory, graphite, oxidized teal, one muted solar accent.
- **Strength:** highest readability and accessibility; excellent downloadable diagram.
- **Risk:** may under-prove Spline and drift toward generic beige thought leadership.
- **Prohibited:** scrapbook decoration, gratuitous paper textures, faux vintage interface chrome.

### C — Scene Graph Ledger — recommended

A live build theatre: article thesis and architecture on the left; one persistent owned Spline artifact on the right. A captioned ledger advances through Intent → tool call → scene diff → human approval → embed → measured outcome while the object visibly assembles.

- **Expression:** inspectable system, production evidence, editorial theatre.
- **Motion:** one signature build sequence controlled by an explicit “Run the architecture” action.
- **Type:** Inter/Poppins for editorial hierarchy; JetBrains Mono for the ledger without a hacker-terminal aesthetic.
- **Color:** carbon/matte black, white, FrankX emerald/cyan, restrained wireframe overlays.
- **Layout:** desktop 5/7 split; mobile poster + explicit “Load 3D” + vertical HTML stepper.
- **Strength:** demonstrates the article’s claim, fits FrankX’s inspectable-systems posture, and creates the best proof assets for parts 2–4.
- **Risk:** requires stronger coordination between the scene’s named states and the article’s HTML ledger.
- **Prohibited:** fake logs, unreadable microtype, rain-of-code effects, constant ambient motion.

Recommendation: select **C**. It makes the article itself the test harness. Direction A is the fallback if the priority is maximum launch-image impact; B is the fallback if accessibility and print-like editorial reuse dominate.

## 6. Canonical test artifact

Name: **The Agentic Experience Compiler**

The scene visualizes one idea: intent becomes an editable scene, the scene becomes a bounded runtime, and the runtime becomes measurable distribution.

Required system states:

1. **Design** — Intent, Agent, Spline/Hana, Scene Graph.
2. **Runtime** — Scene Graph, Next.js, protected application boundary.
3. **Distribution** — Vercel, analytics, derivative media, business outcome.
4. **Complete** — the full operating loop visible with ownership boundaries intact.

Required named nodes:

- `intent`
- `agent`
- `spline_hana`
- `scene_graph`
- `nextjs`
- `vercel`
- `derivative_media`

Required interactions:

- hover/tap reveals a short responsibility and boundary;
- three HTML-owned mode controls select Design, Runtime, and Distribution;
- page scroll may advance states after explicit activation;
- one completion event is emitted to the parent application;
- reduced motion swaps orbital movement for opacity and discrete state changes;
- mobile uses a simplified camera and touch-safe targets.

Production law:

- exactly one Spline embed;
- click-to-activate behind an owned poster;
- all essential copy and CTA remain HTML;
- no external texture or model dependency in v1;
- no more than two lights;
- procedural or simple materials;
- automatic WebGPU/WebGL renderer selection;
- no scene secret, API token, personal data, or canonical customer state.

## 7. Agent workflow

Use a maker–verifier–approver sequence.

| Role | Responsibility | Must not do |
|---|---|---|
| Experience Director | owns concept, direction, scene contract, conversion job | edit the scene ad hoc after approval |
| Spline Builder | one writer agent operates the live scene through MCP | publish or change the visual target |
| Visual Critic | evaluates screenshots, hierarchy, mobile translation, brand fit | mutate the same scene |
| Web Integrator | owns embed boundary, fallback, events, accessibility and loading | move business state into Spline |
| Release Verifier | tests Vercel Preview, routes, performance and failure modes | approve its own unverified work |
| Human Approver | accepts the visual target and production evidence | approve from a single desktop screenshot |

Run three authoring passes only:

1. **Structure pass:** hierarchy, proportions, naming, camera, responsive composition.
2. **Material pass:** surfaces, light, depth, contrast, brand fit.
3. **Interaction/performance pass:** states, events, mobile, reduced motion, compression, export.

After each pass, capture the viewport and scene/object inventory. The critic returns a ranked defect list. The builder fixes only defects tied to the approved contract.

## 8. Asset and download system

Every visual derives from the owned canonical scene. Do not hotlink or republish Spline showcase imagery.

| Placement | Asset ID | Output | Storage |
|---|---|---|---|
| Article hero | `ast_frankx_spline_mcp_hero_v1` | 2400px PNG master + 1600px WebP | Vercel Blob master, optimized local delivery asset |
| Architecture fallback | `ast_frankx_spline_mcp_diagram_v1` | 1600×900 WebP | local public path |
| Interactive poster | `ast_frankx_spline_mcp_poster_v1` | 1600×1000 WebP | local public path |
| Social card | `ast_frankx_spline_mcp_og_v1` | 1200×630 PNG/WebP | local public path |
| Motion loop | `ast_frankx_spline_mcp_loop_v1` | 16:9 and 9:16 MP4 | Vercel Blob |
| Editable source | `ast_frankx_spline_mcp_source_v1` | `.spline` | Vercel Blob download |
| Web runtime | `ast_frankx_spline_mcp_runtime_v1` | `.splinecode` or Spline runtime URL | Spline host; archive in Blob if entitlement allows |
| Interchange | `ast_frankx_spline_mcp_glb_v1` | `.glb` | Vercel Blob download |

Every asset record must include version, creator, creation method, rights basis, source relationship, dimensions, byte size, checksum, alt text, and publication status.

Package:

```text
spline-agentic-visual-stack/
├── README.md
├── LICENSE-NOTES.md
├── scene-manifest.json
├── source/agentic-experience-compiler.spline
├── runtime/agentic-experience-compiler.splinecode
├── interchange/agentic-experience-compiler.glb
├── images/hero-2400.png
├── images/hero-1600.webp
├── images/architecture-fallback.webp
├── images/og-1200x630.png
├── video/loop-16x9.mp4
├── video/loop-9x16.mp4
└── evidence/
    ├── mcp-call-summary.md
    ├── performance-panel.png
    └── device-test-matrix.md
```

The `.spline` file is the editable source. The `.splinecode` artifact is the web runtime. The `.glb` is portable geometry and basic material data; it is not a faithful backup of Spline animation, events, physics, environment, variables, components, or interactivity.

## 9. Budgeting policy

Track five meters separately: model tokens, MCP calls, Spline AI credits, runtime weight, and human review.

First-scene planning envelope:

- model tokens: 20k–50k total across build and critique;
- Spline plan: begin on Pro with the included 3,000 monthly AI credits;
- authoring: three bounded scene passes, one critic pass per stage;
- AI model generation: zero external models in v1 unless the contract cannot be met procedurally;
- MCP calls: log the baseline; do not invent a numeric platform limit;
- human approvals: direction, desktop composition, mobile/reduced-motion state, release evidence.

Upgrade to Max only when the lab shows the public MCP/credit limits are the bottleneck. Do not compensate for a weak scene contract with longer open-ended agent runs.

## 10. Next.js integration contract

Phase 1 uses the existing click-to-load universal embed pattern rather than adding a new runtime dependency.

Implementation requirements:

1. add `spline` as an embed type;
2. accept an explicit owned poster;
3. render no iframe or viewer before activation;
4. keep a meaningful `alt` and textual equivalent;
5. emit load, first-interaction, mode-change, completion, and CTA events;
6. preserve a poster and explanatory copy if the scene fails;
7. register `SplineEmbed` with the MDX renderer;
8. render existing SeriesNav below the hero for all series posts;
9. add no new package for the first proof;
10. graduate to the React/Next.js Code API only when application state sharing is required.

The first live scene belongs after the architecture thesis, not as the LCP hero. A later flagship article variant may use Direction C’s 5/7 first-viewport split after performance evidence proves it safe.

## 11. Analytics and decision thresholds

Events:

- `spline_loaded`
- `spline_first_interaction`
- `architecture_mode_changed`
- `scene_completed`
- `spline_download_clicked`
- `spline_architecture_cta_clicked`

Report both absolute counts and the funnel:

```text
article view
  → viewer activation
  → first interaction
  → mode change
  → completion
  → download or qualified CTA
```

The scene should continue only if it achieves one of these after a meaningful traffic sample:

- materially higher qualified CTA rate among scene completers;
- substantial download demand for the architecture/source kit;
- repeatable asset reuse that reduces the cost of future launches; or
- direct demand for an implementation workshop or production sprint.

## 12. Release sequence and gates

### Gate 0 — research and editorial

- article passes FrankX voice, claims, AI-slop, citation, link, and discoverability checks;
- all volatile claims are dated;
- lab results are clearly marked as future work.

### Gate 1 — direction approval

- Frank selects A, B, or C;
- one reference board, one visual thesis, one prohibited-pattern list;
- no scene generation before approval.

### Gate 2 — local Spline MCP lab

- desktop Spline and Codex show a live connection;
- scene passes three bounded authoring loops;
- MCP call summary, screenshots, credit delta, and source snapshot captured.

### Gate 3 — media package

- hero, poster, OG, diagram, video, `.spline`, `.splinecode`, and `.glb` exported;
- manifest, rights, checksums, alt text, dimensions, and versions complete;
- large binaries uploaded to Blob, not normal Git history.

### Gate 4 — GitHub and Vercel Preview

- feature branch only; draft pull request;
- Vercel Git integration produces Preview;
- build, content, type, lint, link, claims, and discoverability checks pass;
- no production promotion.

### Gate 5 — experience verification

- desktop and mobile visual review;
- keyboard and reduced-motion review;
- poster and script-failure review;
- no iframe before activation;
- FAQ and Article JSON-LD present;
- source download resolves;
- compare LCP, INP, and CLS before/after;
- analytics events observed in Preview.

### Gate 6 — human approval and production

- approver receives visual evidence, test matrix, performance delta, unresolved risks, and rollback path;
- merge only after explicit approval;
- verify the production route and analytics after Vercel deploys `main`.

## 13. GitHub change set

Editorial PR now:

- `content/blog/spline-mcp-ai-design-workflow-2026.mdx`
- `docs/editorial/spline-mcp/production-plan.md`
- `docs/editorial/spline-mcp/scene-contract.md`
- `docs/editorial/spline-mcp/asset-manifest.json`

Implementation PR after direction + local lab:

- owned image assets;
- `UniversalEmbed` Spline support and poster option;
- embed export and MDX registration;
- visible series navigation;
- runtime URL/manifest wiring;
- analytics and tests.

Do not commit the `.spline`, `.splinecode`, `.glb`, MP4, or high-resolution master directly to the existing multi-gigabyte repository.

## 14. Verification commands

```bash
pnpm content:check
pnpm test:blog-discoverability
pnpm type-check
pnpm lint
pnpm links:check:static
pnpm ai-slop:audit:strict
pnpm build
pnpm merge:gate:ci
```

Evidence is incomplete until the Vercel Preview route has been inspected on desktop and mobile and the download/failure states have been exercised.

## 15. Immediate next decision

Select the art direction:

- **A** for maximum cinematic memory;
- **B** for maximum editorial clarity;
- **C** for the strongest proof of the agentic workflow (**recommended**).

After that selection, run the local desktop MCP scene contract in `scene-contract.md`. Do not rewrite the article around the first generated result; improve the scene until it satisfies the approved contract.
