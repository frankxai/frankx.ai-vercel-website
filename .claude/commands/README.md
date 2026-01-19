# FrankX.AI Website Commands

Local slash commands for the FrankX.AI website project. These commands are specific to website development and content creation.

## Command Hierarchy

```
/factory                    # Publishing Factory (Agentic Creator OS)
├── /factory-seo            # SEO optimization
├── /factory-aeo            # AI Engine Optimization (FAQ, schema)
├── /factory-qa             # Quality gate checks
└── /factory-pdf            # PDF lead magnet creation

/log-session                # Global session logging (cross-project)

/frankx-ai-*                # Website-specific operations
├── /frankx-ai-daily        # Daily intelligence ops
├── /frankx-ai-build        # Comprehensive build
├── /frankx-ai-blog         # Blog article creation
├── /frankx-ai-seo          # Site-wide SEO
├── /frankx-ai-deploy       # Vercel deployment
└── ...more
```

## Publishing Factory Commands (NEW)

| Command | Purpose | Use When |
|---------|---------|----------|
| `/factory` | Full publishing orchestrator | Creating any content |
| `/factory-seo` | SEO optimization | Optimizing for search |
| `/factory-aeo` | AI Engine Optimization | Optimizing for ChatGPT/Perplexity citations |
| `/factory-qa` | Quality gatekeeper | Pre-publish validation |
| `/factory-pdf` | PDF lead magnet builder | Creating downloadable guides |
| `/log-session` | Global session logging | Recording work across projects |

## Global Session Logging

All sessions log to: `/mnt/c/Users/Frank/docs/AI_GLOBAL_SESSIONS.md`

| Magic Word | Action |
|------------|--------|
| "Log this to global" | Appends session entry |
| "What did we publish?" | Reads FrankX entries |
| "Show today's sessions" | Filters by date |

## Website Operations Commands

| Command | Purpose | Primary Agent |
|---------|---------|---------------|
| `/frankx-ai-daily` | Daily intelligence operations | All |
| `/frankx-ai-build` | Comprehensive build session | All |
| `/frankx-ai-blog` | Create and publish blog articles | Creation Engine |
| `/frankx-ai-prompts` | Manage prompt library | Technical Translator |
| `/frankx-ai-products` | Update product pages | Soul Strategist |
| `/frankx-ai-seo` | SEO optimization | Creation Engine |
| `/frankx-ai-deploy` | Deploy to Vercel | - |
| `/frankx-ai-agents` | Agent orchestration | All |
| `/frankx-ai-components` | UI component development | Technical Translator |
| `/frankx-ai-analytics` | Performance analysis | - |
| `/frankx-ai-content-pipeline` | End-to-end content workflow | All |

## Workflow Combinations

### Publishing Factory (Recommended)
```
/factory             → Create content with full pipeline
/factory-qa          → Validate before publish
/frankx-ai-deploy    → Ship to production
```

### Article Creation
```
/factory             → Research → Write → Edit → SEO → AEO
/factory-qa          → Check Voice, Claims, SEO, AEO, Schema
/frankx-ai-deploy    → Publish
/generate-social     → Distribution angles
```

### PDF Lead Magnet
```
/factory-pdf         → Create PDF guide
/factory-qa          → Validate
/frankx-ai-deploy    → Upload + landing page
```

### SEO + AEO Optimization
```
/factory-seo         → Traditional search optimization
/factory-aeo         → AI citation optimization
/factory-qa          → Verify all checks pass
```

### Daily Website Work
```
/frankx-ai-daily     → Start your day
/frankx-ai-build     → Execute work
/frankx-ai-deploy    → Ship changes
```

### Legacy Content Creation
```
/frankx-ai-blog      → Write article (simpler workflow)
/polish-content      → Refine voice (global command)
/generate-images     → Create visuals (global command)
/frankx-ai-deploy    → Publish
/generate-social     → Distribute (global command)
```

### Product Updates
```
/frankx-ai-products  → Update product
/frankx-ai-seo       → Optimize SEO
/frankx-ai-deploy    → Deploy
```

### Prompt Library
```
/frankx-ai-prompts   → Add/update prompts
/frankx-ai-deploy    → Deploy
```

## Agent Integration

These commands integrate with the four FrankX agents:

1. **Technical Translator** - Tutorials, tools, technical clarity
2. **Creation Engine** - Content, copy, product descriptions
3. **Soul Strategist** - Transformation journeys, messaging
4. **Frequency Alchemist** - Music, Suno, vibrational content

## Skill Integration

Commands reference these skills:
- `/skill frankx-brand` - Voice and visual consistency
- `/skill ui-ux-design-expert` - Design decisions
- `/skill suno-prompt-architect` - Music content
- `/skill frontend-design:frontend-design` - Component creation

## Related Global Commands

These global commands complement website work:
- `/frankx-best-website` - Multi-agent website development
- `/polish-content` - Content polishing
- `/generate-images` - Image generation
- `/generate-social` - Social media content
- `/review-content` - Content review and approval

## Usage

In Claude Code, type the command name:
```
/frankx-ai-daily
```

Commands expand to full prompts with context, checklists, and workflows.

## Customization

Edit command files in `.claude/commands/` to customize workflows for your needs.
