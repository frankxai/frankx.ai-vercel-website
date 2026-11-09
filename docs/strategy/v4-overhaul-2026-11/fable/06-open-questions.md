# 06. Eight questions for Frank

**State:** 5 November 2026. Each question names the slices it blocks in [05-project-plan.md](05-project-plan.md), a recommendation, and what the alternative costs. Where the v4 README already asked the question, this file sharpens it to the decision the builder needs.

## Q1. Which menu direction: A (five doors, visual), B (six doors with Research), or C (intent-led)?

Blocks 2.2 and 2.10. **Recommendation: B**, as specified in 02 section 10, with one correction to the IA pack: the Build door's action reads "Inspect the systems", not "Explore AI Architecture", because VOICE-LIBRARY bans "Explore" CTAs and door tiles are spots or icons, not 4:5 photos, because VISUAL-SYSTEM limits menu imagery to one 128px spot per door. Cost of A: the evidence stays inside the Founder door and the Research door's SEO entry points have no home in the header; the test diff is smaller. Cost of C: every pinned label changes, two tests are rewritten from scratch, and the shipped founder pivot is contradicted in the header.

## Q2. Which three destinations carry the closing offer on every SEO page?

Blocks 2.5 and, through it, 2.7 and the hub footers. **Recommendation:** `/waitlist?intent=vibe-os` for music and creative-state topics, `/workshops/build-first-ai-agent` for agents, models and architecture, `/acos` for Claude Code and creator-system topics; the newsletter when nothing matches. All three resolve in `data/route-index.json`; `vibe-os` exists in `lib/diagnostic/waitlist-intents.ts:45`. Cost of the alternative (one offer, the newsletter everywhere): simpler test, but research and guides keep linking zero products, which audit 06 measured as the funnel's missing floor.

## Q3. Which eight to ten tools make the public founder setup, and which of them do you use daily?

Blocks 2.3 and 2.4. The registry has first-party verification for Higgsfield and Wispr only; ElevenLabs has a link but no `checkedOn`, so it renders as "no referral" until you confirm the date. **Recommendation:** Claude Code, Vercel, Supabase, Wispr Flow, Higgsfield, ElevenLabs, Descript, Notion, Suno and Cloudflare, with Railway, RunPod and the other 23 catalogue items in the collapsed registry list. Also confirm which "programs in flight" on `/partners` are real applications; the page hides that section until you do. Cost of waiting: `/stack` keeps 33 tools, three raw referral parameters and a disclosure the agenticincome rule forbids.

## Q4. Which name does the newsletter keep: Creation Chronicles, Signal Loop, or "the briefs"?

Blocks the final wording in 2.6 and the Founder door's fifth destination in 2.2. Interim copy says "the newsletter". **Recommendation: Signal Loop**, because `app/start/page.tsx` and FOUNDER-LANGUAGE-CODE already use it and `creation-chronicles` is also a product intent in `waitlist-intents.ts:48`, so the two names collide in analytics. Cost of Creation Chronicles: the product and the list share a name and a reader cannot tell which they joined. Cost of "the briefs": no name, so no recognisable sender.

## Q5. Which ACOS count source and which paid tiers stay on `/acos`?

Blocks 2.6 and 2.8. **Recommendation:** land draft PR #1097 if it derives counts from the ACOS repository; otherwise generate `data/acos/public-surface.json` from `verify-public-surface.mjs` and print "as of {date}". Keep the two paid tiers as "Get launch updates" email captures, with Apache-2.0 named correctly. Cost of keeping typed counts: the page contradicts itself today (`app/acos/page.tsx:38-43`, `:107`, `:205`) and the agent hub repeats "99-agent" at `:166`. Cost of removing the tiers: the only priced offer on the page disappears while nothing is purchasable anyway; low.

## Q6. Which boundary, budget and name for Frank's AI?

Blocks 4.2, 4.4, 4.5 and 4.6. Three parts: the monthly budget that sets the daily spend cap and the per-IP limits (proposed 5 per minute, 30 per day); the refusal boundary on money, health and clients (04 proposes fixed lines: no financial, medical, legal or tax advice, no income claims, no client or employer names, the Oracle disclaimer when asked); the UI name ("Frank's AI" recommended over "Ask Frank", because the panel sits on `/ask` and must never read as Frank speaking) and the fate of the BYOK route (recommended: return 410 and keep the playground page with a notice). Cost of a looser boundary: one bad answer about dosing or earnings is a brand and legal exposure that no eval fully prevents. Cost of no budget: the route cannot ship, since the spend cap denies when unset.

## Q7. Which indexing and review policy applies to restored research prose?

Blocks 3.1, 3.3 and 3.4. Two decisions. First, who may act as the human reviewer the verifier accepts (you only, or a named list of GitHub logins); the verifier fails closed without it. Second, whether "analysis, unreviewed" pages and the seven authored briefs stay `noindex` (recommended until each carries at least three individual sources with locators) or are indexed with the banner. **Recommendation:** you as the only reviewer for the first two dossiers, then a named list; `noindex` for analysis and briefs until sourced. Cost of indexing early: the October integrity hold is undone in search results before the evidence exists. Cost of a single reviewer: wave 3 moves at the pace of your reviews, roughly one dossier per week.

## Q8. Which cast spelling, which releases, and which image spend?

Blocks 2.10, 4.9 and 4.10. Confirm the spelling Brio (repository canon) over Biro; say whether Nilo, Brio and Riff are released for any public scene or stay private this wave; and approve or decline credit spend for the six menu spots and the research hub hero if the visual producer's briefs call for raster (SVG spots cost nothing). Axi, used on `/blog` today, is not in the VISUAL-SYSTEM cast: confirm it keeps its existing placements and gets no new ones, or name it a cast member. Cost of releasing a character without a model sheet: a likeness drawn from memory, which VISUAL-SYSTEM forbids and no gate catches after the fact. Cost of declining spend: the menu ships with Lucide icons and proof chips, which is the specified fallback.
