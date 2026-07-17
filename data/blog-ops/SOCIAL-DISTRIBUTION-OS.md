# Social Distribution OS — FrankX Blog

**Version:** 2026-07-15  
**Gate:** No external social send without Frank (or explicit inversion veto window).  
**SSOT:** Update `data/blog-ops/article-registry-master.*` after each publish pack.

---

## 1. Goal

Every published post can ship with a **distribution pack** without ad-hoc design:

| Asset | Size | Path pattern |
|---|---|---|
| OG / LinkedIn wide | 1200×630 | crop from hero or `public/images/social/blog/<slug>/wide.*` |
| X card | 1200×628 | same family |
| IG square | 1080×1080 | quote or diagram crop |
| Copy pack | md | `content/social/blog/<slug>.md` |

Prefer **exact text overlays in code** (Remotion / HTML capture) over AI text-in-image.

---

## 2. Day 0–7 schedule

| When | Action | Owner | Human gate? |
|---|---|---|---|
| Day 0 | Publish blog; verify live URL + OG debugger | agent | no |
| Day 0 +0h | Draft X + LinkedIn copy (not post) | agent | **yes before post** |
| Day 0 +2h | Optional X short | human/agent | **yes** |
| Day 0 +4h | LinkedIn long | human/agent | **yes** |
| Day 1 | Carousel / quote cards | agent assets | yes to post |
| Day 2 | Newsletter candidate list | agent | yes to send |
| Day 7 | Metrics note in registry | agent | no |

---

## 3. Copy templates (fill, don't spam)

### X (≤240 chars ideal)

```
{ONE insight from the post}.

{Who it's for} → full write-up:
https://frankx.ai/blog/{slug}
```

### LinkedIn

```
{Hook — specific problem, 1–2 lines}

What I mapped in the new frankx.ai post:
1. {point}
2. {point}
3. {point}

Read: https://frankx.ai/blog/{slug}

{Soft CTA — Start Here / newsletter — not hard sell}
```

### Newsletter blurb

```
Subject: {promise, not clickbait}
Body: 80–120 words + single link + why it matters this week.
```

---

## 4. OG verification checklist

1. Open `https://frankx.ai/blog/{slug}`  
2. View source / Next metadata: `og:image` matches wired hero  
3. LinkedIn Post Inspector / X Card Validator when shipping flagships  
4. Confirm image ≥300KB quality and 16:9 crop survives badge overlays  

---

## 5. Registry fields to set after pack

- `socialPackPath`
- `socialStatus`: `drafted | approved | posted | skipped`
- `postedChannels`
- `postedAt` (only after real post)

---

## 6. Anti-patterns

- Auto-posting from cron without Frank  
- Same generic "excited to share" AI sludge  
- SVG wallpaper as OG image  
- Five channels same second (looks botty)  
- Claims in social stronger than article evidence  

---

## 7. Scale ops

- Flagships (featured / tool roundups): full pack  
- Long-tail: OG + one channel draft only  
- Batch generation Fridays; human approval weekends/Monday  

*Social is distribution, not the demand engine. FrankX essay quality remains primary.*
