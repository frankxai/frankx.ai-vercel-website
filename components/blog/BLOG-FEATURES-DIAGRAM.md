# Blog Features Architecture

```
┌─────────────────────────────────────────────────────────┐
│ Blog Post Page (/blog/[slug]/page.tsx)                 │
└─────────────────────────────────────────────────────────┘
                          │
                          ├─ Server Components
                          │  ├─ MDXContent (renders markdown)
                          │  ├─ JsonLd (SEO schema)
                          │  ├─ Breadcrumbs
                          │  └─ HeroImage
                          │
                          └─ Client Components (New)
                             │
                             ├─ BlogReadingProgress
                             │  └─ Shows only if wordCount ≥ 1500
                             │     ├─ Fixed top bar
                             │     ├─ Scroll listener (passive)
                             │     └─ Gradient progress indicator
                             │
                             ├─ BlogArticleContent (wrapper)
                             │  ├─ Wraps MDXContent
                             │  └─ Provides BlogSharePopover
                             │     ├─ Selection event listener
                             │     ├─ Shows if selection ≥ 10 chars
                             │     └─ Share to X / LinkedIn / Copy
                             │
                             └─ BlogPostEndZone
                                ├─ BlogFeedback
                                │  ├─ localStorage vote tracking
                                │  ├─ API: POST /api/feedback
                                │  ├─ API: GET /api/feedback?type=blog&slug=...
                                │  └─ Shows aggregate if total ≥ 10
                                │
                                ├─ Share Buttons
                                │  ├─ X (Twitter)
                                │  ├─ LinkedIn
                                │  └─ Copy Link
                                │
                                ├─ Related Posts (optional)
                                │  └─ Filtered by category/tags (max 3)
                                │
                                └─ Newsletter Signup
                                   └─ EmailSignup component (existing)
```

## Data Flow

### Reading Progress
```
User scrolls → handleScroll() → calculate % → update width
                                              ↓
                                    Gradient bar animates
```

### Text Selection Share
```
User selects text → debounce(200ms) → selection ≥ 10 chars?
                                              ↓
                                        Show popover
                                              ↓
                                    User clicks action
                                              ↓
                          ┌─────────────┬──────────────┬─────────┐
                          ↓             ↓              ↓         ↓
                      Share X    Share LinkedIn   Copy    Dismiss
```

### Feedback System
```
User votes → Check localStorage → Already voted?
                                         ↓ No
                              Save to localStorage
                                         ↓
                              POST /api/feedback
                                         ↓
                          Append to blog-post-feedback.jsonl
                                         ↓
                              Negative vote?
                                         ↓ Yes
                              Show comment textarea
                                         ↓
                              POST comment (optional)
                                         ↓
                              Show thank you message
```

### Related Posts Filter
```
allPosts → filter(slug !== current) → filter(category match OR tag overlap)
                                              ↓
                                         slice(0, 3)
                                              ↓
                                    Map to card format
                                              ↓
                                    Render grid layout
```

## File Structure

```
components/blog/
├── BlogSharePopover.tsx       # Text selection → share
├── BlogReadingProgress.tsx    # Top progress bar
├── BlogFeedback.tsx           # Thumbs up/down + comments
├── BlogPostEndZone.tsx        # Feedback + share + related + newsletter
├── BlogArticleContent.tsx     # Client wrapper for MDXContent
├── MDXContent.tsx             # Server-side MDX rendering (existing)
└── MDXComponents.tsx          # MDX component overrides (existing)

app/api/feedback/
└── route.ts                   # GET/POST feedback API (updated)

data/feedback/
├── blog-post-feedback.jsonl   # Blog votes (new)
└── chapter-feedback.jsonl     # Book votes (existing)
```

## API Schema

### POST /api/feedback
```typescript
// Blog post vote
{
  type: 'blog_post_feedback',
  slug: string,
  feedback: 'positive' | 'negative',
  timestamp: string
}

// Blog post comment
{
  type: 'blog_post_comment',
  slug: string,
  feedback: 'positive' | 'negative',
  comment: string,
  timestamp: string
}
```

### GET /api/feedback
```
Query: ?type=blog&slug=article-slug

Response:
{
  positive: number,
  negative: number,
  total: number
}

Cache-Control: public, max-age=3600
```

## Performance Optimizations

1. **Reading Progress**: Passive scroll listener, no forced reflows
2. **Share Popover**: 200ms debounce, cleanup on unmount
3. **Feedback API**: 1-hour cache on GET, append-only JSONL writes
4. **Related Posts**: Server-side filter, max 3 results
5. **Client Components**: Isolated, only where interactivity needed

## User Experience Flow

```
1. User arrives → Progress bar appears (if long article)
                           ↓
2. User reads → Selects interesting quote
                           ↓
3. Share popover appears → User shares or copies
                           ↓
4. User scrolls to end → BlogPostEndZone
                           ↓
5. User votes (thumbs) → Optional comment
                           ↓
6. User sees related posts → Clicks to continue reading
                           ↓
7. User subscribes to newsletter (or skips)
```

## localStorage Keys

```
blog-feedback-{slug}  # User's vote: 'positive' | 'negative'
```

## Brand Consistency

All components use FrankX design system:
- Colors: emerald-500, cyan-500, white/opacity
- Borders: white/10, white/20
- Backgrounds: white/[0.02], white/5
- Typography: 17px/1.8 body, Inter font
- Shadows: Premium glassmorphic effects
- Icons: Heroicons inline SVG (no Phosphor)
