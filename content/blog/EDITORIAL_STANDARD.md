# Creation Chronicles — Editorial Standard

The operating standard for every article. Goal: writing that is **credible, human, and genuinely useful** — and that search engines and AI answer engines reward rather than penalize. This is not a style suggestion; it's the bar.

---

## 1. Author canon (keep this accurate everywhere)

Frank Riemer is a **AI Architect & Creator**. He is now independent, building agentic AI systems and creating music with AI.

- ✅ "AI Architect & Creator", "former enterprise AI architect", "enterprise AI/cloud experience", "production AI architecture experience"
- ❌ Present-tense Oracle employment claims (inaccurate)
- Oracle Cloud / OCI **expertise** is still fair to cite — it's the credibility, not a current employer.

Canonical bio (short): *AI Architect & Creator. Now builds agentic systems independently and makes music with AI.*

Profiles (use for `sameAs` / links): x.com/frankxeth · linkedin.com/in/frank-x-riemer · github.com/frankxai · youtube.com/@frankxai

---

## 2. Voice — professional, credible, lightly human

Aim for the register of a sharp senior engineer writing to peers: confident, specific, occasionally dry-funny. **Credibility first, personality second.**

- **Lead with the result or the claim**, then back it with how you know.
- **Show the work**: real numbers, real tools, real trade-offs, things that broke.
- **Humor is seasoning, not the meal** — a wry aside, an honest "this took me three tries," never a meme-stack or forced "haha AI" bit. If a joke would make a smart reader wince, cut it.
- **Modern, not trying-to-be-cool.** No buzzword soup, no "🚀 game-changer," no hype adjectives doing the work that evidence should.
- **No spiritual/guru register** ("soul-aligned", "awakening") unless the piece is explicitly that lane.

The test: *would a skeptical practitioner trust this and keep reading?*

---

## 3. Anti-AI-slop checklist (kills the "obviously generated" smell)

Reject a draft if it has any of these:

- [ ] Empty intros ("In today's fast-paced world…", "Imagine a world where…")
- [ ] Listicle padding with no specifics — every bullet must carry a fact, number, or concrete example
- [ ] Hedge-everything tone ("can help you potentially improve…") — commit to claims
- [ ] Repetition / restating the same point in three paragraphs
- [ ] Symmetrical "On one hand… on the other hand…" filler with no verdict
- [ ] Invented stats or unverifiable claims — if you can't source it, don't assert it
- [ ] "As an AI", "delve", "tapestry", "in the realm of", "it's worth noting that" <!-- ai-slop-allow -->
- [ ] No first-hand signal — at least one thing only the author could have written (a number, a failure, a specific config)

---

## 4. E-E-A-T — why Google ranks this as human-quality, not "AI spam"

Google does **not** penalize AI assistance; it penalizes *low-value, unhelpful* content. The way through is Experience-Expertise-Authoritativeness-Trust:

1. **First-hand experience.** Write what was actually built/tested. Specific tools, versions, costs, and what went wrong. This is the single strongest signal and the hardest to fake.
2. **Identified, credentialed author.** Real byline, portrait, bio with the ex-Oracle credential, and `sameAs` links to real profiles. (Wired into the Article schema — keep it intact.)
3. **Specificity over generality.** Numbers, named systems, dated facts, screenshots/diagrams. Originality beats coverage.
4. **Freshness honesty.** Use `lastUpdated` when revised; date-stamped claims age gracefully. Don't leave "2025 roadmap" framing live in 2026 without a pointer to the current version.
5. **Structure for humans and answer engines.** TL;DR in the first 100 words, question-based H2s, a real FAQ (feeds FAQPage schema), 3+ genuine internal links.
6. **Substance length.** Match depth to the topic; never pad to hit a word count. A tight 1,200 useful words beats 3,000 of filler.

If a piece has real experience + a real author + real specifics, it reads human *because it is* — and that's exactly what ranks.

---

## 5. Per-article ship checklist

- [ ] Frontmatter: `title`, `description`, `date`, `category`, `tags`, `image` all present
- [ ] Hero image exists on disk (no broken refs) — see `scripts/visuals/generate-hero-art.mjs`
- [ ] TL;DR in first 100 words · question-based H2s · FAQ (5+) · 3+ internal links
- [ ] Author canon respected (no present-tense Oracle employment)
- [ ] Anti-slop checklist passes
- [ ] One thing only Frank could have written
