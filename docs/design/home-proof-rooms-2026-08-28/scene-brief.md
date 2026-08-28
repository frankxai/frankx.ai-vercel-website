# Homepage proof rooms — scene brief

Date: 2026-08-28

Surface: `https://frankx.ai/` homepage, AI Architecture and Music Lab scenes

Selected direction: Proof rooms

## Experience thesis

Turn two repeated hub summaries into two proof-led entry rooms. An AI architect or technical leader should be able to inspect a production pattern and open the field guide. An AI music creator should be able to recognize a working studio practice and open the Music Lab. Each room must earn its place after the broader products catalog by adding evidence, audience fit, and a clearer next action.

## Audience and job

### AI Architecture

- Recipient: AI architects, technical founders, platform leads, and AI CoE builders who already understand agent terminology.
- Session job: judge whether the architecture material contains deployable patterns, boundaries, and human controls.
- First win: identify one relevant architecture route and reach its working field guide in one click.
- Proof threshold: visible mechanism and named constraints, not a decorative dashboard.
- Primary action: Open the AI Architecture field guide.

### Music Lab

- Recipient: technically curious music creators using Suno or AI-assisted production workflows.
- Session job: judge whether the lab contains usable prompt methods, releases, and production practice.
- First win: choose between the prompt guide, state-change essay, or playable track archive.
- Proof threshold: a believable working studio artifact and real public routes, not a text-heavy generated infographic.
- Primary action: Open the Music Lab.

## Product loop

Visible artifact → scan three proof routes → choose the field guide or lab → inspect a deeper working artifact → continue through the destination's own content and conversion path.

The homepage scene qualifies interest. It does not add a new form or parallel funnel.

## Current truth and copy-preservation gate

### Preserve

- `AI Architecture`: exact category and search phrase; concise, established, and specific.
- `Music Lab`: established route identity and concise product name.
- `Production Agentic AI Systems`, `MCP Server Architecture`, and `Suno Prompt Engineering Guide`: direct matches to real content routes.
- All existing href destinations: verified as real local routes or blog slugs and independently checked as live HTTP 200 responses.

### Replace

- `Enterprise AI` → `Production AI systems`: names the mechanism and includes builders outside formal enterprise programs.
- AI deck → `Reference designs for agent workflows, MCP infrastructure, orchestration, and human oversight—documented with the constraints and deployment choices intact.` The replacement is more concrete and puts inspectable decisions next to the claim.
- `Agent Patterns & Pillars` → `Seven pillars of production agents`: replaces an abbreviated label with the article's specific framework.
- `Explore AI Architecture` → `Open the AI Architecture field guide`: names the destination and next action.
- `Music Production` → `AI music production`: increases topic clarity without adding a claim.
- Music deck → `A working archive of AI songs, Suno prompt systems, production notes, and playable instruments—built from daily studio practice.` The replacement describes what a visitor can inspect.
- `Science of State Change` → `How music changes your state`: clearer to a first-time reader while preserving the route.
- `Browse All Tracks` → `Browse releases and tracks`: avoids implying that every created track is publicly indexed.
- `Enter Music Lab` → `Open the Music Lab`: a direct action in FrankX language.

## Exactly three directions considered

### 1. Proof rooms — selected

- Composition: two full-width asymmetric scenes with a copy rail and an inspectable artifact.
- Typography: static Poppins headings, compact Inter deck, JetBrains Mono only for true state or metadata.
- Imagery: two text-free Tier B stills with deterministic HTML/SVG overlays.
- Interaction: focus or hover on a proof link highlights its corresponding artifact layer.
- Motion: Track A only; 140–220ms focus/state transitions. Reduced motion shows the final state.
- Mobile: heading, artifact, deck, rounded CTA, then proof links. No hidden architecture image.
- Score: 28/30.

### 2. Twin workbench

- Composition: one central object switches between architecture and music.
- Typography: one umbrella statement and two state headings.
- Imagery: one hybrid workbench.
- Interaction: accessible two-state control.
- Motion: 250–400ms crossfade.
- Risk: adds decision complexity and competes with the existing Mind Palace selector.
- Score: 26/30.

### 3. Editorial case files

- Composition: numbered dossier and liner-note spreads with margin annotations.
- Typography: strongest editorial scale and calmest reading posture.
- Imagery: documentary stills with deterministic annotations.
- Interaction: minimal annotation emphasis.
- Motion: nearly still.
- Risk: less product-like and less effective at audience qualification.
- Score: 27/30.

## Selected scene system

- Brand mode: FrankX product/technical for architecture; FrankX soul/cultural for music.
- Palette: existing void `#0a0a0b`; restrained emerald architecture accents; amber music accents. No purple-blue SaaS gradient.
- Material: graphite, black glass, brushed metal, paper-thin signal lines, tactile studio controls.
- Typography: existing Poppins, Inter, and JetBrains Mono roles. Prose remains still.
- Shape: one large rounded scene surface per room, one rounded-full primary CTA, restrained proof-link rows.
- Asset method: Tier B generated text-free still plus Tier C code-authored proof overlays.
- Motion job: connect a focused proof link to the relevant visual layer. No new scroll runtime and no new page-level set-piece.
- Mobile: the artifact stays visible and appears before the deck; interaction becomes a static three-item proof key.
- Accessibility: `aria-labelledby`, visible focus, minimum 44px CTA, semantic lists, descriptive alt text, reduced-motion parity.
- Performance: responsive WebP/AVIF-ready stills, correct aspect ratio, no video, no new dependency.

## Image-generation prompts

### Architecture still

```text
Use case: stylized-concept
Asset type: FrankX homepage architecture proof-room still, 16:10
Primary request: a restrained graphite architecture workbench representing a production agent system through four physical layers—workflow, orchestration, observability, and human approval—with one precise emerald signal path connecting them
Scene/backdrop: nocturnal executive AI lab, dark graphite and brushed metal, real depth, quiet negative space
Style/medium: cinematic industrial product photography blended with high-end architectural model rendering; crisp, believable, inspectable
Composition/framing: wide 16:10 scene; main layered mechanism centered inside an 80% safe zone; shallow three-quarter camera angle; generous dark breathing room around the object for deterministic overlays
Lighting/mood: controlled edge lighting, restrained emerald and cyan signal light, calm high-trust atmosphere
Constraints: no text, no letters, no numbers, no logos, no people, no robots, no screens with fake UI, no orb, no neural network, no node cloud, no watermark
Avoid: generic sci-fi control room, bright neon, purple-blue gradient, decorative circuitry, illegible micro-detail
```

### Music still

```text
Use case: stylized-concept
Asset type: FrankX homepage Music Lab proof-room still, 16:10
Primary request: a late-night working music studio centered on a tactile modular instrument and a luminous physical waveform, expressing AI-assisted music production as daily craft
Scene/backdrop: intimate dark studio with black glass, graphite hardware, brushed metal, acoustic material, and one restrained amber/copper light field
Style/medium: cinematic product photography with believable studio materials and controlled editorial art direction
Composition/framing: wide 16:10 scene; instrument and waveform centered inside an 80% safe zone; quiet negative space for deterministic HTML overlays; no cropped focal controls
Lighting/mood: warm amber and copper highlights with a very subtle emerald bridge signal; intimate, precise, human, late-night
Constraints: no text, no letters, no numbers, no logos, no people, no branded DAW interface, no fake dashboard, no watermark
Avoid: rainbow neon, festival stage, sci-fi spaceship console, purple-blue gradient, generic equalizer wallpaper, unreadable controls
```

## Verification contract

- [x] Current desktop and mobile states captured before implementation.
- [x] Generated exports inspected at full resolution and exact 16:10 crop.
- [x] All eight routes checked against the protected Vercel preview.
- [x] Component lint, strict language audit, production compile, TypeScript, static generation, and post-build tests passed.
- [x] Preview HTML contains both stable section IDs, both image assets, both CTAs, and both labeled resource navigations.
- [ ] Desktop/mobile rendered capture, keyboard/reduced-motion inspection, console review, and overflow review. The machine-performance contract currently holds browser QA below the required 8 GB RAM reserve.
- [ ] Independent final visual review after rendered captures exist. Direction selection and source-level review were performed by separate reviewers before implementation.
