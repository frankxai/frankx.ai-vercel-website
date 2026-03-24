# The Operating Manual

> "Plans are worthless, but planning is everything."
> — Dwight D. Eisenhower

---

## I. The System in Operation

Nine chapters of architecture. This chapter is the operating manual — the day-to-day practices, troubleshooting procedures, and maintenance routines that keep the Vibe OS stack running smoothly.

Infrastructure without operations is a sculpture. Beautiful, perhaps, but static. The operating manual makes the infrastructure alive — responsive, adaptive, and continuously improving.

---

## II. Daily Operations

### Morning Check (5 minutes)

Before starting any creative work, verify the infrastructure:

**1. Vercel status.** Check the latest deployment status. If the last deploy failed, investigate before creating new content. A broken deployment means published content is not reaching the audience.

```bash
# Quick deployment check via CLI
vercel ls --prod
```

Or use the Vercel MCP server from Claude Code:
```
"Check the latest Vercel deployment status for frankx.ai"
```

**2. n8n health.** Verify that automated workflows are running. The most common failure: Railway restarts the n8n instance, and webhook endpoints need re-registration.

```bash
# Check n8n via API
curl -s https://your-n8n.railway.app/api/v1/workflows \
  -H "X-N8N-API-KEY: $N8N_API_KEY" | jq '.data | length'
```

Expected output: the number of active workflows (25 for the full Vibe OS stack).

**3. Email deliverability.** Check Resend dashboard for bounce rate and spam complaints. If bounce rate exceeds 2% or spam complaints exceed 0.1%, investigate immediately — these metrics affect all future email deliverability.

### Content Session (60-90 minutes)

The primary creative session follows the Vibe Architecture daily protocol:

1. Load the relevant skill file in Claude Code
2. Create the compound content piece
3. Run through quality gates
4. Publish and distribute

### End-of-Day Check (5 minutes)

1. Commit all changes to git
2. Push to production if new content was published
3. Log the day's output in the evidence journal
4. Verify the deployment succeeded

---

## III. Weekly Maintenance

### Sunday Review (30 minutes)

**Infrastructure review (10 min):**
- Vercel: any failed deployments this week? Investigate root causes.
- n8n: any failed workflow executions? Check execution logs.
- Supabase: database storage usage trending? Row counts growing as expected?
- Email: week-over-week open rate change? Any deliverability issues?

**Cost review (5 min):**
- Vercel usage: bandwidth, serverless function invocations, blob storage
- Claude API: token usage (if using API beyond Claude Code)
- Railway: n8n compute hours
- Total spend vs. $50/month budget

**Content review (15 min):**
- What was published this week?
- What performed best (by engagement depth, not views)?
- What is queued for next week?
- Any content gaps that need filling?

---

## IV. Monthly Maintenance

### Infrastructure Audit (1 hour)

**Dependency updates.**
```bash
# Check for outdated packages
npm outdated

# Update non-breaking changes
npm update

# For major version updates, test thoroughly before deploying
```

**Security review.**
- Rotate any API keys that have been in use for 90+ days
- Review Vercel environment variables for any that are no longer needed
- Check npm audit for vulnerability alerts
- Verify that no secrets have been accidentally committed to git

**Performance review.**
- Vercel Analytics: Core Web Vitals (LCP, FID, CLS)
- Page load times for key pages
- Serverless function cold start times
- Blob storage access patterns (any frequently accessed files that should be cached?)

**Database maintenance.**
- Supabase: check for unused indexes, orphaned rows, tables approaching row limits
- Clean up development/test data
- Verify RLS policies are correctly enforced

---

## V. Troubleshooting Guide

### Problem: Vercel deployment fails

**Symptom:** Push to main succeeds, but Vercel build fails.

**Common causes:**
1. **Serverless function too large (>250MB).** Fix: add entries to `outputFileTracingExcludes` in next.config.mjs. Common culprits: large image directories in `public/`.
2. **TypeScript errors.** Fix: run `npx tsc --noEmit` locally to identify and fix errors before pushing.
3. **Missing environment variables.** Fix: check Vercel dashboard → Project Settings → Environment Variables. Ensure all required variables are set for the Production environment.
4. **Build timeout (>45 minutes).** Fix: optimize the build. Common cause: too many pages being statically generated. Use ISR or SSR for pages that don't need SSG.

### Problem: n8n webhooks not firing

**Symptom:** External services (Next.js, Stripe) call n8n webhook URLs, but workflows don't execute.

**Common causes:**
1. **Workflow not active.** Fix: activate the workflow in n8n UI.
2. **Webhook URL changed after Railway restart.** Fix: set `WEBHOOK_URL` environment variable in Railway to your custom domain or Railway URL.
3. **Missing `httpMethod: "POST"` in webhook node.** Fix: edit the webhook node and explicitly set the HTTP method.
4. **Missing `webhookId` property.** Fix: ensure the webhook node has a unique webhookId.
5. **Workflow updated without deactivate/reactivate.** Fix: deactivate the workflow, then reactivate it. This re-registers all webhooks.

### Problem: Email going to spam

**Symptom:** Resend shows emails as "delivered" but subscribers report they are in spam/junk folders.

**Common causes:**
1. **Missing DNS records.** Fix: verify SPF, DKIM, and DMARC records in your domain's DNS settings. Use Resend's verification tool.
2. **High bounce rate.** Fix: clean your email list. Remove addresses that have bounced.
3. **Spammy content.** Fix: avoid ALL CAPS, excessive exclamation marks, and words like "FREE!!!" in subject lines.
4. **New domain reputation.** Fix: warm up your sending domain gradually. Start with 50 emails/day and increase over 2-4 weeks.

### Problem: Git push hangs in WSL

**Symptom:** `git push` hangs indefinitely when pushing to GitHub from WSL.

**Cause:** Windows git-credential-manager.exe interference.

**Fix:** Temporarily switch to SSH:
```bash
git remote set-url origin git@github.com:your-org/your-repo.git
git push
# Then restore HTTPS if desired:
git remote set-url origin https://github.com/your-org/your-repo.git
```

### Problem: Claude Code context degradation

**Symptom:** Claude Code starts producing lower-quality output, ignoring loaded skill files, or "forgetting" instructions from earlier in the conversation.

**Cause:** Context window filling with accumulated conversation history.

**Fix:** Start a fresh session. The context window is finite (1M tokens). Long sessions accumulate tool results, file reads, and conversation that can push important instructions out of the active attention window. Fresh sessions reload CLAUDE.md and skill files with full priority.

**Prevention:** Keep sessions under 90 minutes for intensive work. Use explicit context transfer between sessions: at the end of Session 1, ask Claude to summarize the key decisions and state. At the start of Session 2, provide the summary.

---

## VI. Disaster Recovery

### Scenario: Production site goes down

1. Check Vercel status page (vercel.com/status)
2. If Vercel is operational, check latest deployment for errors
3. If deployment is the issue, revert: `git revert HEAD && git push`
4. If Vercel is down, wait — your site will come back when Vercel recovers
5. If data is affected, Supabase has daily backups (Pro tier)

### Scenario: Lost access to a service

1. All API keys are stored in Vercel environment variables — accessible from the dashboard
2. All code is in GitHub — accessible from any machine
3. All content is in markdown files — portable, readable, version-controlled
4. n8n workflows can be exported as JSON and reimported

### Scenario: Need to migrate off a service

**Vercel → Netlify/Cloudflare:** Next.js is framework-agnostic for hosting. Change deployment target, adjust configuration, redeploy.

**Supabase → any PostgreSQL:** Supabase is standard PostgreSQL. Export with `pg_dump`, import to any PostgreSQL host.

**Resend → any email:** Email templates are React components in your codebase. Adapt to SendGrid/Postmark/SES by changing the API calls.

**n8n → any automation:** Workflows export as JSON. Many can be reimplemented in Make/Zapier, though n8n's code nodes are harder to migrate.

The Vibe OS stack is designed for portability. No proprietary lock-in. Every component uses standard formats and protocols. The migration cost for any single service is measured in hours, not weeks.

---

## VII. The Maintenance Philosophy

The Vibe OS stack requires approximately 2 hours per month of maintenance — less than the time spent maintaining a car, a home, or a garden.

The maintenance philosophy:

**Automate the predictable.** Deployment is automated (git push). Email sequences are automated (n8n). Content distribution is automated (Content Atomizer). Monitoring is automated (Vercel Analytics). Human attention is reserved for the unpredictable.

**Fix the root cause.** When a problem recurs, fix the underlying cause — do not apply band-aids. A webhook that fails every time Railway restarts needs a startup script, not manual reactivation.

**Document what you learn.** Every troubleshooting session produces knowledge. Capture that knowledge in the troubleshooting guide (this chapter). The guide grows over time, reducing future troubleshooting time.

**Invest in simplicity.** Every tool, every integration, every automation adds complexity. Complexity is the enemy of reliability. Before adding a new tool, ask: "Can I achieve this with what I already have?" Usually, yes.

The stack is $50/month. The maintenance is 2 hours/month. The output is unlimited.

This is the Vibe OS promise: infrastructure so simple that maintaining it is an afterthought, freeing your attention for the work that matters.

Build the stack. Run the manual. Create without friction.

The infrastructure serves you. Not the other way around.
