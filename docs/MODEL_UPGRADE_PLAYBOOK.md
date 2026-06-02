# Model Upgrade Playbook

> Every time a stronger model ships, we run the whole site back through this loop so
> frankx.ai stays at top state: current information, true brand voice, no AI slop,
> excellent visuals. Driven by `docs/HUB_REGISTRY.md` / `.csv`.

## When to run
- A new frontier model is available (the trigger).
- Quarterly, regardless, for freshness.
- Before any major launch / email blast.

## The loop (per hub, highest priority first)

1. **Pick the batch** — sort the registry by `priority` then oldest `reviewed_date`. P0/P1 first.
2. **Read the live page** — via the authenticated Vercel fetch (`web_fetch_vercel_url` on `https://www.frankx.ai/<route>`) so you audit what visitors actually see.
3. **Audit against four axes:**
   - **Voice** — true brand voice (direct, technical, warm; results over claims; no guru language). Run `bash scripts/voice-audit.sh <path>`.
   - **Freshness** — dates, model names, stats, "coming soon" that already shipped, dead links.
   - **Accuracy** — every claim verifiable (counts, credentials). No inflation (cf. 630→90 skills).
   - **Visual** — layout, hierarchy, spacing, responsive, a11y (`/ui-ux-pro-max`, `/web-design-expert`, `/ui-ux-design-expert`). Screenshot QA via `/gstack` against local `next dev` or the Vercel preview.
4. **Fix on a branch** — never edit `main` directly. Surgical edits; preserve intentional registers (contemplative/rails, product names, German family pages).
5. **Verify** — `npm run type-check` + Vercel preview build green. Local `next build` can't fetch Google Fonts in the sandbox — rely on the preview.
6. **Ship** — squash-merge to `main`; confirm the production deploy reaches READY (not ERROR) before moving on.
7. **Update the registry** — set `voice`, `fresh`, `reviewed_model`, `reviewed_date` for each hub touched.

## Brand-voice ruleset (the bar)

**Keep (legitimate, on-brand):**
- "AI transformation", "AI Center of Excellence", "enterprise AI" — standard enterprise terms.
- Product proper nouns: Vibe OS, ACOS, Soulbook, GenCreator, Soul Frequency, Starlight Intelligence.
- The contemplative register on `/(rails)`, `/canon`, `/on-*`, `/soulbook`.

**Rewrite (guru-slop / LLM tells):**
- "soul-aligned", "soul purpose", "transformation rituals", "awakening", "consciousness" (as marketing), "elevate your", "unlock the power", "unleash", "supercharge", "harness the power", "synergy", "seamless", "cutting-edge", "game-changing", "revolutionary", "next level", "deep dive", "delve", "embark on a journey", "in today's fast-paced world", "whether you're…", "look no further", "tapestry", "testament to".
- Replace with concrete, specific, demonstrated language. Show the work, then name it.

**Decision (2026-06-02):** Keep named products/personas; fix only the generic guru-slop in surrounding copy. Never rename a product. Roll out autonomously to main, P0/P1 first. Verify + correct all numeric claims.

**Test:** "If someone asks 'what does that mean specifically?' — can you answer with examples and evidence?" If not, rewrite.

## Status key
Definition of done per hub for a model generation: `voice=clean`, `fresh=current`, `reviewed_*` = current model + date.
