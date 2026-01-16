# Content Universe - Quick Start Guide

**Get creating in 5 minutes**

---

## Your First Content in 3 Steps

### 1. Navigate to Content Universe
```bash
cd /mnt/c/Users/Frank/FrankX/content-universe
```

### 2. Create Something
```bash
# Blog post (easiest start)
/blog-post conscious-ai "How to Use AI Ethically as a Creator"

# Or a Twitter thread
/thread "Suno AI is democratizing music production"

# Or a book chapter
/write-chapter year-of-creator 7 "The AI Creative Revolution"
```

### 3. Publish It
```bash
# Review what was created
ls blogs/conscious-ai/

# Run quality checks (optional but recommended)
/remove-ai-patterns blogs/conscious-ai/how-to-use-ai-ethically.md
/enhance-prose blogs/conscious-ai/how-to-use-ai-ethically.md

# Publish when ready
/publish blogs/conscious-ai/how-to-use-ai-ethically.md web
```

**That's it!** You just created, polished, and published professional content with AI agents doing the heavy lifting.

---

## The 4 Commands You'll Use Most

### 1. Create Content
```bash
/blog-post <pillar> <topic>        # SEO-optimized blog post
/thread <topic>                     # Viral Twitter thread
/write-chapter <book> <num> <topic> # Book chapter
/course-module <course> <num> <topic> # Learning module
```

### 2. Polish Content
```bash
/enhance-prose <file>       # Make prose exceptional
/remove-ai-patterns <file>  # Eliminate AI clichés
/verify-claims <file>       # Check facts
/impact-check <file>        # Ensure actionability
```

### 3. Repurpose Content
```bash
/repurpose <source-file> <target-format>

Examples:
/repurpose blogs/ai-music.md chapter     # Blog → Book chapter
/repurpose chapter-5.md thread            # Chapter → Thread
/repurpose module-3 blog                  # Course → Blog
```

### 4. Manage & Track
```bash
/content-status           # See everything
/theme-map                # Visualize connections
/publish <file> <platform> # Go live
```

---

## Your Daily Workflow

### Morning (15 minutes)
```bash
# 1. Check dashboard
/content-status

# 2. See what's needed
# (Oracle shows gaps and priorities)

# 3. Create today's content
/blog-post <pillar> <topic>
```

### Afternoon (10 minutes)
```bash
# 4. Run quality checks
/remove-ai-patterns <today's-file>
/enhance-prose <today's-file>

# 5. Publish
/publish <today's-file> web,medium,linkedin
```

### Evening (5 minutes)
```bash
# 6. Create social content
/thread <topic from blog>

# 7. Check performance
/content-status published
```

**Total**: 30 minutes for complete blog post + thread + multi-platform publishing with AI-powered quality.

---

## Content Pillars (What to Write About)

Choose a pillar for each piece:

1. **conscious-ai** (40% of content)
   - Ethical AI use, mindfulness, conscious integration
   - Examples: "Mindful AI Workflows", "Ethics for Creators"

2. **business-intelligence** (25% of content)
   - Oracle Cloud, enterprise AI, strategy
   - Examples: "OCI for AI", "Enterprise AI Strategy"

3. **creative-innovation** (20% of content)
   - AI music (Suno), creative tools, content creation
   - Examples: "Suno AI Guide", "AI Creative Tools Stack"

4. **community** (15% of content)
   - Personal stories, member spotlights, collaboration
   - Examples: "Creator Spotlight", "Community Wins"

---

## The 10 Agents (Who Does What)

You don't manage them directly - they activate automatically when needed. But it's good to know who's working for you:

**Writing Core**:
- **Literary Architect**: Story structure & hooks
- **Truth Weaver**: Research & fact-checking
- **Voice Alchemist**: Prose polish & AI pattern removal
- **Impact Engineer**: Frameworks & exercises

**Content Specialists**:
- **Blog Master**: SEO & blog posts
- **Social Media Strategist**: Threads & viral content
- **Course Architect**: Learning modules
- **Content Repurposer**: Cross-format transformation

**Orchestration**:
- **Content Universe Oracle**: Coordinates everything
- **Publishing Pipeline**: Quality gates & distribution

---

## Quality Standards (Every Piece Passes)

Before anything publishes, it automatically passes:

✓ **AI Pattern Detection** - Zero forbidden phrases
✓ **Fact Verification** - All claims sourced
✓ **Readability** - Flesch 60-70, varied sentences
✓ **Actionability** - Frameworks, examples, clear next steps
✓ **SEO** (web content) - Keywords, meta, structure

You can run these manually:
```bash
/remove-ai-patterns <file>    # Check AI patterns
/verify-claims <file>          # Check facts
/impact-check <file>           # Check actionability
/enhance-prose <file>          # Polish everything
```

---

## Repurposing Strategy

**Rule**: Every high-performer becomes 3+ formats

**Example Flow**:
1. Write blog post → Gets 2K shares (high-performer)
2. Expand to book chapter → Goes in book
3. Extract to course module → Becomes lesson
4. Create thread series → Twitter marketing
5. Make LinkedIn version → Professional audience
6. Design lead magnet PDF → Email list growth

**One idea → Six pieces of content → Compound value**

Use:
```bash
/repurpose <high-performer> <new-format>
```

---

## Where Everything Lives

```
content-universe/
├── books/
│   └── year-of-creator/       # Your book
├── blogs/
│   ├── conscious-ai/           # 40% of content
│   ├── ai-architect/           # Business intelligence
│   ├── personal-dev/           # Creative innovation
│   └── _drafts/                # Work in progress
├── social/
│   ├── threads/                # Twitter/X
│   └── linkedin/               # LinkedIn
├── courses/
│   ├── ai-music-academy/       # Music course
│   └── ai-for-creators/        # Creator course
└── _universe/
    ├── knowledge-graph.json    # Connections
    ├── case-studies/           # Research library
    └── assets/                 # Media files
```

---

## First Week Challenge

**Day 1**: Create first blog post
```bash
/blog-post conscious-ai "Why Creators Need Ethical AI Practices"
/publish <file> web
```

**Day 2**: Create social content
```bash
/thread "Ethical AI for Creators"
```

**Day 3**: Start book chapter
```bash
/write-chapter year-of-creator 7 "The Future of Creative Work"
```

**Day 4**: Repurpose high-performer
```bash
/content-status  # Find top performer
/repurpose <best-blog> chapter
```

**Day 5**: Create course content
```bash
/course-module ai-for-creators 1 "Getting Started with AI"
```

**Day 6**: Polish everything
```bash
/enhance-prose <file>
/remove-ai-patterns <file>
```

**Day 7**: Review your universe
```bash
/content-status
/theme-map
```

**After 7 days**: You'll have blog, thread, chapter, course module - all connected, all high-quality.

---

## Pro Tips

### 1. Research First
```bash
/research <topic>  # Before creating
```
Gets you case studies, stats, sources. Makes content 10x better.

### 2. Link Everything
```bash
/link-content <file1> <file2> related
```
Builds knowledge graph. System gets smarter.

### 3. Check Dashboard Weekly
```bash
/content-status
/theme-map
```
See gaps, opportunities, what's working.

### 4. Batch Quality Checks
```bash
# Run all at once:
/remove-ai-patterns <file>
/verify-claims <file>
/impact-check <file>
/enhance-prose <file>
```

### 5. Repurpose Systematically
Every month, repurpose your top 3 performers to new formats.

---

## Common Questions

**Q: Which command should I start with?**
A: `/blog-post` - Easiest, fastest, most valuable.

**Q: How long does it take to create content?**
A: Blog post: 10-15 min. Chapter: 15-20 min. Module: 20-30 min.

**Q: Do I need to know all 10 agents?**
A: No. They activate automatically. Just use the commands.

**Q: What if quality gates fail?**
A: Run the quality commands, fix issues, try again. System tells you what needs fixing.

**Q: Can I customize the system?**
A: Yes! Edit `config/content-config.json` for rules, `_universe/themes.json` for themes.

**Q: Where do I see my published content?**
A: Check `/content-status published` or browse `blogs/`, `books/`, etc.

---

## Next Steps

1. **Read**: Full README.md for deep dive
2. **Explore**: Check `.claude/skills/` to see what each agent does
3. **Create**: Start with `/blog-post` today
4. **Iterate**: Use the system daily, it compounds
5. **Customize**: Adjust configs to fit your workflow

---

## Quick Reference Card

```bash
# CREATE
/blog-post <pillar> <topic>
/thread <topic>
/write-chapter <book> <num> <topic>
/course-module <course> <num> <topic>

# POLISH
/enhance-prose <file>
/remove-ai-patterns <file>
/verify-claims <file>
/impact-check <file>

# REPURPOSE
/repurpose <source> <format>

# MANAGE
/content-status
/theme-map
/publish <file> <platforms>
```

---

**Ready? Create something.**

```bash
cd /mnt/c/Users/Frank/FrankX/content-universe
/blog-post conscious-ai "Your First Topic Here"
```

The agents are waiting. Your content universe awaits.

---

*Built for maximum creation with minimum friction.*
