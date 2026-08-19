# Shorts / Reels — Wk1 (30–60s, one insight, one artifact)

Production route: screen-capture + voiceover cut in Descript, or Higgsfield Shorts Studio from the YouTube long-form once it exists. Captions burned in (HyperFrames caption pass or Descript). Hook must land inside the first 2 seconds — cold open on the number, no intro.

## Short 1 — "668 broken assets" (Thu 7/9)

Artifact on screen: the audit report scrolling, then the broken-image grid.

| t | On screen | VO / caption |
|---|---|---|
| 0–2s | Report header, "668" zoomed | "Our AI agents found 668 broken assets. On OUR OWN websites." |
| 2–8s | Scroll the findings list | "Here's the scary part — nothing was down. Every page returned 200. Monitoring was green." |
| 8–18s | Broken-image grid | "524 of these came from one cause: cached pages pointing at deployments that don't exist anymore. No dashboard on earth flags that." |
| 18–28s | PR #217 diff | "And the newsletter? It accepted every signup — and silently dropped it. The form said success. The list never grew." |
| 28–38s | Agent crawl running (terminal) | "The fix: an agent that uses the site like a stranger. Every link, every image, every form. Every day." |
| 38–45s | Report → frankx.ai/research | "We're fixing all of it in public this month. Report's on the research hub — frankx dot ai slash research." |

## Short 2 — "The form that lies" (Sat 7/11)

Artifact: the signup form on screen, then the code.

| t | On screen | VO / caption |
|---|---|---|
| 0–2s | Cursor hits Subscribe, big "SUCCESS ✓" | "This form is lying." |
| 2–10s | Network tab: 200 response | "It returns 200. The user thinks they subscribed. The owner thinks they got a subscriber. Both are wrong." |
| 10–20s | The missing-table error in logs | "Behind it: a database table that was never created. The API caught the error and swallowed it. We found this on our own site." |
| 20–30s | Fix diff | "Worst failure class on the web: errors that report success. Nobody complains, because the affected people are the ones you never hear from." |
| 30–40s | Checklist frame | "Test your forms with a real address this week. Then check the data actually landed. That's it — that's the whole tip." |

Post-production gate: run each cut through the Higgsfield virality predictor before it enters the approval queue; keep hook-strength notes with the file.
