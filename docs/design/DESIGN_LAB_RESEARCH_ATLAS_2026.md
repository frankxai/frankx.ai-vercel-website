# FrankX Design Lab Research Atlas 2026

Use this document as the FrankX-local bridge between the public `/design-lab` implementation and the cross-site research atlas.

Central atlas:

- `C:\Users\frank\starlight\repos\design-agent-standards\WEB_DESIGN_RESEARCH_ATLAS_2026.md`

Local implementation:

- `app/design-lab/page.tsx`
- `app/design-lab/[slug]/page.tsx`
- `app/design-lab/[slug]/DesignLabExperimentPage.tsx`
- `lib/design-lab/experiments.ts`

## What To Bring Into FrankX

FrankX should use the atlas for public, technical, founder-led proof:

- Agent design battles.
- Runtime choices: Motion vs GSAP vs R3F vs Rive vs Lottie.
- Research-backed component experiments.
- Productized design patterns and templates.
- Before/after explanations of why a winner won.

Keep FrankX copy sharp and commercial. Do not import Arcanea mythology, private JarvisOps details, local machine paths, or unfinished internal strategy into the public lab.

## First Research-Backed Lab Rounds

1. Scroll-to-proof homepage section.
   - Compare GSAP ScrollTrigger pinned proof, Motion scroll progress, and static editorial variants.
   - References: Awwwards GSAP category, Codrops scroll studies, GSAP ScrollTrigger docs.

2. AI orb presence system.
   - Compare Rive state machine, R3F shader orb, and CSS/canvas fallback.
   - Public FrankX version should explain AI agent state without pretending the orb is the product.

3. Multi-agent chat explainer.
   - Compare conversation lane, graph handoff, terminal proof, and voice transcript variants.
   - Use FrankX public framing: "how agent work becomes inspectable."

4. Research-to-product pattern library.
   - Add productized lab winners as reusable patterns after they pass visual and motion gates.
   - Use existing `relatedLinks` for references until the experiment schema gets a dedicated `researchLinks` field.

## Schema Upgrade Candidate

The current `DesignExperiment` model already covers brief, constraints, entries, scores, verdicts, and related links. For research-backed experiments, consider adding this later:

```ts
researchLinks?: {
  label: string
  href: string
  source: 'awwwards' | 'cssda' | 'webby' | 'codrops' | 'docs' | 'github' | 'site'
  takeaway: string
}[]

targetRepos?: {
  repo: string
  route?: string
  productization: 'public' | 'internal' | 'docs-first'
}[]
```

Do not add that field until the first research-backed experiment needs it in the rendered UI. For now, keep docs and `relatedLinks` enough.

## FrankX Productization Rule

An experiment can be public before it is production-ready, but a winner only becomes a FrankX pattern when:

- It passes the 2-3 second first-read test.
- It passes mobile and reduced-motion review.
- It has desktop/mobile visual evidence.
- It explains what was cut from the losing variants.
- It names the production repo and route that should absorb the pattern.
