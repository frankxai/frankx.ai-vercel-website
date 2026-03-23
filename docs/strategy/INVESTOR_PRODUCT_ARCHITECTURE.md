# Investor Intelligence — Product Architecture

## Why Investors Pay

Investors spend **time** on repetitive research that AI can automate:

- 8-15 hours per due diligence report → AI agent does it in 20 minutes
- 2-3 hours/day screening deal flow → n8n pipeline delivers scored deals at 7am
- 40+ hours per quarterly LP report → automation compiles, writes, formats, sends

**The pitch**: "Ship institutional-grade research with AI tools built by an AI architect."

Investors don't want to learn prompt engineering. They want **drop-in systems** that work immediately.

---

## Product Architecture

```
INVESTOR INTELLIGENCE ECOSYSTEM
================================

DISCOVERY (frankx.ai/investor)
│
├─ FREE ($0) ─────────────────────────────────────────
│  └─ Investor Starter Kit
│     ├─ PDF: "AI-Powered Investment Research" guide
│     ├─ 5 Claude Code prompts (stock screening)
│     └─ Notion deal tracker (basic)
│     → Goal: Email capture, prove competence
│
├─ TEMPLATES ($27-47) ────────────────────────────────
│  ├─ Deal Flow CRM (Notion export)
│  ├─ Portfolio Tracker (Obsidian vault zip)
│  ├─ n8n Deal Sourcing Pipeline (JSON + setup PDF)
│  └─ Market Research Prompt Pack (SKILL.md + 20 prompts)
│  → Goal: Quick wins, build trust
│
├─ AGENT PACKS ($97-297) ────────────────────────────
│  ├─ Due Diligence Agent Pack (5 agents + n8n)
│  ├─ Competitive Intelligence System (3 workflows)
│  ├─ Stock Research Agent (workspace config)
│  ├─ Market Sentiment Analyzer (n8n + agent)
│  └─ LP Reporting Automation (full pipeline)
│  → Goal: Real automation, time savings
│
├─ PLATFORM ($297-697) ──────────────────────────────
│  ├─ ★ IACOS (Investor ACOS) — THE FLAGSHIP
│  │   ├─ CLAUDE.md (investor-tuned instructions)
│  │   ├─ skills/ (12 investor skills)
│  │   ├─ agents/ (6 agent profiles)
│  │   ├─ hooks/ (data validation, source checking)
│  │   ├─ Coworker configuration
│  │   ├─ Claude Desktop project setup
│  │   └─ 40-page setup + methodology guide (PDF)
│  │
│  ├─ Intelligence Platform Architecture (blueprint)
│  ├─ Deal Flow Engine (8 n8n workflows)
│  └─ Complete Stack Bundle (everything, 40% off)
│  → Goal: Transform how they work
│
└─ CONSULTING ($2,500+) ─────────────────────────────
   └─ Custom investor AI architecture
   → Goal: High-touch, relationship-based
```

---

## What Each Product Actually Is (File-Level)

### Configuration Products (Claude Code / Coworker)

```
product-folder/
├── CLAUDE.md          # Custom instructions for Claude Code
├── SKILL.md           # Reusable skill definition
├── skills/            # Multiple skill files
│   ├── due-diligence.md
│   ├── market-research.md
│   └── financial-analysis.md
├── agents/            # Agent profile definitions
│   ├── analyst.md
│   └── researcher.md
├── hooks/             # Automation hooks
├── .coworker/         # Coworker-specific config
│   └── config.json
├── README.md          # Setup guide
└── docs/
    └── guide.pdf      # Premium setup + methodology guide
```

### Workflow Products (n8n)

```
product-folder/
├── workflows/
│   ├── deal-sourcing.json      # Importable n8n workflow
│   ├── deal-scoring.json
│   └── notification.json
├── README.md                    # Setup guide with screenshots
├── docs/
│   ├── setup-guide.pdf          # Step-by-step with images
│   └── customization-guide.pdf  # How to adapt to your needs
└── examples/
    └── sample-output.md         # What the workflow produces
```

### Template Products (Notion / Obsidian)

```
product-folder/
├── notion/
│   └── template-url.md     # Notion template duplication link
├── obsidian/
│   └── vault.zip            # Complete Obsidian vault
├── README.md
└── docs/
    └── walkthrough.pdf
```

### Architecture Products (Blueprints)

```
product-folder/
├── architecture/
│   ├── system-design.md     # Full architecture document
│   ├── data-flow.md         # Data pipeline specifications
│   └── diagrams/            # Mermaid + image diagrams
├── iac/
│   ├── terraform/           # Infrastructure as Code
│   └── docker-compose.yml
├── agents/                   # Agent configs for the system
├── workflows/                # n8n workflows
├── README.md
└── docs/
    └── deployment-guide.pdf
```

---

## Product Management System

### Git-Based (Primary)

Everything lives in `frankxai/investor-intelligence`:

```
investor-intelligence/
├── products/                    # Product registry
│   └── manifest.json            # All products: id, status, version, price
├── agents/
│   ├── due-diligence/           # Product: DD Agent Pack
│   │   ├── v1.0/                # Versioned releases
│   │   ├── README.md
│   │   └── CHANGELOG.md
│   └── ...
├── workflows/
│   └── deal-sourcing/
│       ├── v1.0/
│       └── ...
├── architectures/
├── tools/
├── iacos/                       # THE FLAGSHIP
│   ├── CLAUDE.md
│   ├── skills/
│   ├── agents/
│   └── ...
└── releases/                    # Built product zips (via GitHub Releases)
```

**Versioning**: Semantic versioning per product (v1.0, v1.1, v2.0)
**Releases**: GitHub Releases with zip attachments per product
**Changelog**: Per-product CHANGELOG.md

### Data Layer (frankx.ai)

```
data/investor-products.json      # Product catalog (storefront data)
data/investor-manifest.json      # Product management (status, versions, sales)
```

### Payment Integration

**Phase 1 (Now)**: Gumroad for digital delivery

- Each product → Gumroad listing → download link
- Product links stored in investor-products.json `cta.href`

**Phase 2 (Soon)**: Stripe MCP

- Direct checkout on frankx.ai
- Stripe Checkout sessions via API route
- Webhook for fulfillment (grant GitHub repo access or send download link)
- Revenue tracking in dashboard

**Phase 3 (Future)**: GitHub Sponsors / License Keys

- Access to private repo for subscribers
- License key system for premium products

### Tools Needed

| Tool         | Purpose                                      | Status     |
| ------------ | -------------------------------------------- | ---------- |
| Git + GitHub | Product source control, releases, versioning | Ready      |
| Gumroad      | Payment + delivery (Phase 1)                 | Ready      |
| Stripe MCP   | Direct payment on frankx.ai (Phase 2)        | Coming     |
| Resend MCP   | Email delivery, onboarding sequences         | Ready      |
| Notion MCP   | Creating/managing Notion template products   | Ready      |
| n8n          | Building workflow products + testing         | Need setup |
| Claude Code  | Building IACOS, agent configs, skills        | Ready      |

---

## User Personas & Why They Buy

### 1. VC Analyst (Institutional)

- **Pain**: Drowning in deal flow, DD takes too long, LP reports are painful
- **Buys**: DD Agent Pack ($197), LP Reporting ($297), IACOS ($497)
- **Outcome**: 10x faster DD, automated LP reports, consistent analysis quality

### 2. Angel Investor (Solo)

- **Pain**: No team, can't afford analysts, misses good deals
- **Buys**: Deal Flow CRM ($27), Competitive Intel ($97), Research Workspace ($147)
- **Outcome**: Institutional-quality research on a solo budget

### 3. Retail Investor (Individual)

- **Pain**: Information overload, no systematic research process
- **Buys**: Starter Kit (Free), Market Research Prompts ($47), Stock Research Agent ($97)
- **Outcome**: Structured approach to stock analysis, sentiment-driven alerts

### 4. Family Office (Enterprise)

- **Pain**: Need custom intelligence systems, portfolio-wide monitoring
- **Buys**: Intelligence Platform ($497), Complete Stack ($697), Consulting ($2,500+)
- **Outcome**: Custom-built AI intelligence infrastructure

---

## Product Roadmap

### Launch Batch (Build Now)

1. Investor Starter Kit (FREE) — lead magnet
2. IACOS v1.0 — flagship, highest perceived value
3. Market Research Prompt Pack ($47) — easy win, validates market
4. Deal Flow CRM ($27) — Notion template, quick to build

### Batch 2 (Next Sprint)

5. Due Diligence Agent Pack ($197) — needs real agent testing
6. n8n Deal Sourcing Pipeline ($37) — needs n8n instance
7. Stock Research Agent ($97) — Claude Code workspace config

### Batch 3 (Following Sprint)

8. LP Reporting Automation ($297) — complex, needs PDF generation
9. Competitive Intelligence System ($97) — multiple workflows
10. Intelligence Platform Architecture ($497) — documentation-heavy

### Batch 4 (After Validation)

11-14. Remaining products based on what sells in Batch 1-3

---

## Revenue Projections (Conservative)

| Month   | Products Live  | Monthly Revenue (est.) |
| ------- | -------------- | ---------------------- |
| Month 1 | 4 (Batch 1)    | $200-500               |
| Month 2 | 7 (+ Batch 2)  | $500-1,500             |
| Month 3 | 10 (+ Batch 3) | $1,500-4,000           |
| Month 6 | 14 (all)       | $3,000-8,000           |

Key assumption: 10-30 sales/month across all products, weighted toward lower-priced items.

---

## Dashboard Requirements (frankx.ai/frankx-investment-dashboard)

- Product inventory table (name, category, price, status, version, sales count)
- Revenue summary cards (total, this month, by category)
- Product status pipeline (Draft → Building → Testing → Listed → Live)
- Quick actions: Edit product, create release, view analytics
- Protected route (admin only)
