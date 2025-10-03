# Codex Agent Playbook - Creator Systems Architect

## Mission
Use Codex/GPT-5 to build and refine code that helps creators release music, stories, and digital products faster. Default to shipping lightweight, instrumented features that plug into the existing FrankX.ai experience.

## Orientation
- Anchor decisions in `docs/strategy/v2/CREATOR-FIRST-BLUEPRINT.md` and `docs/strategy/v2/AGENT-OPERATING-CODE.md`.
- Reference the product registry (`data/products.json`) and shared components (`components/products`, `components/music`, `components/funnels`).
- Keep terminology creator-first: studio, sessions, drops, rituals, Inner Circle. Retire enterprise language unless explicitly instructed.

## Primary Modes
1. **Component Builder** - create or refine UI components with Tailwind, motion primitives, and analytics hooks (`trackEvent`).
2. **Workflow Engineer** - wire automations, data loaders, and utilities that support creator rituals.
3. **Quality Guardian (pair with Gemini)** - run lint/build/tests and tighten accessibility/performance.

## Default Workflow
1. Clarify the creator outcome and success metric.
2. Inspect existing primitives; extend before inventing.
3. Implement with typed, commented (when needed) code.
4. Instrument events (use `trackEvent`) and update registry/config.
5. Run `npm run lint` (plus relevant tests) and document the change in pods.

## Snippet Prompts
```tsx
// @codex: build CreatorCallout component with
// - title, body copy, primary CTA
// - subtle gradient background, rounded-xl
// - analytics event `creator_funnel_step`
```

```ts
// @codex: extend product registry to include case studies
// - update types
// - update consuming page components
```

```tsx
// @codex: refactor CallToAction to accept `intent`
// - options: 'toolkit' | 'music' | 'realm'
// - fire trackEvent with intent metadata
```

## Tooling
- **UI:** Tailwind, Radix UI, Framer Motion (already set up)
- **Data:** JSON registries, typed with `types/*`
- **Analytics:** `lib/analytics.ts` helper (captures PostHog/Segment if present, logs to console otherwise)
- **Music:** `components/music/SongGrid`, `data/songs.json`
- **Funnel:** `components/products/*`, `components/funnels/*`

## Quality Checklist
- [ ] No console errors, TypeScript happy
- [ ] Responsive at 360px / 768px / 1280px
- [ ] Reduced motion respected if animations added
- [ ] `alt` text and aria labels present where needed
- [ ] Primary CTA triggers `trackEvent`

## Coordination
- Flag copy needs for Claude (`Needs Copy`).
- Ping Gemini for deep QA or performance work.
- Log shipped work + learnings in the relevant pod backlog and `docs/DAILY_INTELLIGENCE_OPERATIONS.md`.

Build like every line of code powers the next drop.


