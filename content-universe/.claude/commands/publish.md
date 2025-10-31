# Publish

Run publishing pipeline and distribute content to specified platforms.

## Parameters
- `<content-file>` - Path to content (relative to content-universe/)
- `<platforms>` - Where to publish (comma-separated)
- `[schedule]` - Optional: "now" or date-time (default: now)

## Platform Options
- `web` - FrankX.ai website / GitHub Pages / Vercel
- `medium` - Medium publication
- `linkedin` - LinkedIn article
- `substack` - Substack newsletter
- `twitter` - Twitter/X (thread if applicable)
- `email` - Send to email list
- `course-platform` - Thinkific / Teachable / Custom LMS
- `kindle` - Kindle Direct Publishing (books only)
- `all-social` - Twitter + LinkedIn + Instagram

## Usage
```
/publish blogs/conscious-ai/ai-ethics.md web,medium
/publish social/threads/suno-ai-thread.md twitter now
/publish books/year-of-creator/chapter-5.md kindle "2025-06-15 09:00"
```

## What This Does

Runs the complete publishing pipeline:

### Phase 1: Pre-Publication Quality Gates (2-5 min)
1. **AI Pattern Detection** - Scans and removes all forbidden phrases
2. **Fact Verification** - Checks all claims have sources
3. **Readability Analysis** - Flesch 60-70, sentence variety
4. **SEO Optimization** - Keywords, meta data (web content)
5. **Actionability Check** - Frameworks, examples, CTA present
6. **Final Review** - Manual approval if issues found

### Phase 2: Format Conversion (1-3 min)
- **Web**: Markdown → HTML with meta tags, schema markup
- **Medium**: Markdown → Medium-compatible HTML
- **LinkedIn**: Markdown → LinkedIn article format
- **Email**: Markdown → Responsive email HTML
- **Kindle**: Markdown → EPUB/MOBI with cover
- **Social**: Extract optimal snippets

### Phase 3: Platform Distribution (2-5 min)
- **Upload** content via APIs or manual instructions
- **Configure** platform-specific settings
- **Set up** analytics tracking
- **Generate** social promotion snippets
- **Schedule** if not publishing immediately

### Phase 4: Post-Publication (1-2 min)
- **Update** knowledge graph (published status)
- **Generate** social promotion plan
- **Set up** performance tracking
- **Create** follow-up content queue

## Output

### Publishing Report

```markdown
## Publication: [Content Title]

### Quality Gates: ✓ PASSED
- AI Patterns: ✓ 0 found (12 auto-removed)
- Facts: ✓ All verified (2 sources avg)
- Readability: ✓ Flesch 67
- SEO: ✓ Score 94/100
- Actionability: ✓ 2 frameworks, 4 examples, clear CTA

### Published To:
✓ FrankX.ai: https://frankx.ai/blog/ai-ethics-creators
✓ Medium: https://medium.com/@frankx/ai-ethics-creators-abc123
  - Canonical URL set to frankx.ai
  - Tags: AI, Ethics, Creators

⏰ Scheduled:
  - Email: June 15, 2025 at 9:00am EST (1,240 subscribers)
  - LinkedIn: June 15, 2025 at 12:00pm EST

### Analytics Configured:
✓ Google Analytics 4 tracking
✓ Conversion goals (email signup)
✓ Social share buttons
✓ UTM parameters for campaigns

### Promotion Plan Generated:
**Day 1 (Today)**:
  - Twitter thread (ready to post)
  - LinkedIn announcement
  - Email to subscribers

**Day 3**:
  - Quote graphic series (5 images ready)
  - Engage with comments

**Day 7**:
  - Repurposed angle thread
  - Community discussion post

### Performance Tracking:
Dashboard: https://analytics.frankx.ai/content/abc123
Report in: 7 days, 30 days
```

### What's Included

**For Web Publishing:**
- SEO-optimized HTML
- Social sharing meta tags (Open Graph + Twitter Cards)
- Schema.org markup
- Responsive images
- Sitemap updated
- RSS feed updated

**For Social:**
- Platform-native formatting
- Optimal posting time suggested
- Engagement strategy
- First-hour action plan

**For Email:**
- Responsive HTML template
- Plain text version
- Subject line A/B test options
- Preview text optimized
- Unsubscribe compliance

## Quality Gate Details

If quality gates find issues:

**Blocking Issues** (Must fix before publishing):
- Unverified critical claims
- >10 AI pattern instances
- Readability < 50
- No CTA or action steps

**Warning Issues** (Should fix but not blocking):
- Some claims need better sources
- 1-5 AI patterns remain
- Readability 50-60 or 70-80
- Generic CTA

**Recommendations** (Nice to have):
- Additional examples suggested
- SEO improvements available
- Engagement optimizations

You'll be prompted to:
- **Auto-fix** - Let pipeline fix automatically
- **Manual review** - Fix yourself then retry
- **Override** - Publish anyway (not recommended)

## Scheduling

### Immediate Publishing
```
/publish content.md web now
```

### Scheduled Publishing
```
/publish content.md web,email "2025-06-15 09:00"
```

Time format: `YYYY-MM-DD HH:MM` (24-hour, EST)

Optimal times:
- **Blog posts**: Tuesday-Thursday, 9-11am EST
- **Email**: Tuesday-Thursday, 9am EST
- **Twitter**: Mon-Fri, 9-11am or 1-3pm EST
- **LinkedIn**: Tue-Thu, 7-9am or 12pm EST

## What Happens Next

After publishing:
1. **Monitor** first hour (critical for algorithms)
2. **Engage** with comments/replies
3. **Track** performance in dashboard
4. **Repurpose** high-performers after 7-30 days
5. **Update** if needed (corrections, additions)

Quick actions after publish:
- `/enhance-prose <content>` - If updating
- `/repurpose <content> <format>` - If performing well
- `/content-status` - Check overall performance

---

**Time estimate**: 5-15 minutes for complete publishing pipeline.
