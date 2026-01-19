# FrankX.AI - Creator Intelligence Platform

Next.js 15 marketing site for FrankX - conscious AI systems for creators, families, and professionals. Powers the public landing pages, products, workshops, and resource hubs at [frankx.ai](https://frankx.ai).

## Live Site Status

| Section | URL | Status |
|---------|-----|--------|
| Homepage | [frankx.ai](https://frankx.ai) | Live |
| Products | [/products](https://frankx.ai/products) | Live |
| Workshops | [/workshops](https://frankx.ai/workshops) | Live |
| Blog | [/blog](https://frankx.ai/blog) | Live |
| Research Hub | [/research](https://frankx.ai/research) | Live |
| Soulbook | [/soulbook](https://frankx.ai/soulbook) | Live |
| Inner Circle | [/inner-circle](https://frankx.ai/inner-circle) | Live |
| Updates | [/updates](https://frankx.ai/updates) | Live |

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **Content**: MDX/Markdown for blog and guides
- **Hosting**: Vercel (auto-deploys from main)
- **Email**: Resend + ConvertKit integration
- **Analytics**: Vercel Analytics

## Git Architecture

```
FrankX (Development)
├── origin → git@github.com:frankxai/FrankX.git (private)
└── vercel-website → git@github.com:frankxai/frankx.ai-vercel-website.git (production)

Workflow:
1. Develop on preview branch
2. Push to vercel-website/main for production
3. Vercel auto-deploys from frankx.ai-vercel-website
```

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Quality checks
npm run lint
npm run type-check
npm run build
```

## Testing & Verification

```bash
# Smoke tests (recommended)
npm run test:smoke        # Local
npm run test:smoke:prod   # Production

# E2E tests (requires Playwright)
npm run test:e2e
npm run test:e2e:ui

# Deployment verification
/verify-deploy  # In Claude Code
```

## Content Structure

```
app/                    # Route files and pages
├── products/           # Product landing pages
├── workshops/          # AI workshops hub
├── blog/               # Blog listing
├── research/           # Research intelligence hub
├── soulbook/           # Soulbook framework
├── updates/            # Changelog
└── ...

components/             # Shared UI components
├── ui/                 # Primitives (buttons, cards)
├── sections/           # Page sections
└── seo/                # SEO components

content/                # MDX/Markdown sources
├── blog/               # Blog articles
└── guides/             # Resource guides

lib/                    # Utilities and helpers
public/                 # Static assets
scripts/                # Build scripts
```

## Deployment

1. **Development**: Work on `preview` branch
2. **Production**: Push to `vercel-website/main`
   ```bash
   git push vercel-website preview:main
   ```
3. Vercel auto-deploys to [frankx.ai](https://frankx.ai)

## Key Features

- **Products**: Vibe OS, Soulbook, Creative AI Toolkit
- **Workshops**: AI workshops for creators and students
- **Research Hub**: Multi-agent research intelligence
- **Soulbook**: Life transformation framework
- **Blog**: AI insights and tutorials
- **Email System**: PDF delivery, newsletters

## License

Copyright FrankX. All rights reserved.
