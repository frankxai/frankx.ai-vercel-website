# Investor Intelligence Vertical — Product Plan

_Created: 2026-02-18_
_Status: Phase 1 In Progress_

---

## Vision

Transform the Investor Intelligence vertical from an institutional-focused product catalog into a comprehensive AI-powered investment toolkit for everyone — from retail investors on Revolut to crypto holders on SwissBorg to institutional deal flow managers.

---

## Current State (Pre-Rebuild)

- **Hub page**: `/investor` — 4 product categories (agents, workflows, architectures, tools)
- **Data**: 15 products in `data/investor-products.json`, dual-track pricing
- **Audience**: Primarily institutional (VCs, angels, PE firms)
- **Sub-pages**: `/investor/agents`, `/investor/workflows`, `/investor/architectures`, `/investor/tools`
- **Navigation**: 5 items in Investors mega-menu dropdown

## Target Audience (Expanded)

### Primary: Everyday Investors

- Use platforms like Revolut, eToro for stocks and ETFs
- Want AI to help research before buying
- Time-constrained, need efficient research workflows
- Budget: $0-47 for tools

### Secondary: Crypto & DeFi Investors

- Active on Crypto.com, SwissBorg, Nexo
- Need yield optimization, token analysis, market sentiment
- More technically savvy, open to automation
- Budget: $27-97 for tools

### Tertiary: AI-Forward Researchers

- Use Perplexity, Claude, ChatGPT for deep research
- Want structured prompts and workflows
- May build their own tools with Claude Code
- Budget: $47-297 for premium content

### Quaternary: Institutional (Kept)

- VCs, angels, PE firms
- Deal flow automation, due diligence at scale
- Budget: $297-697 for full systems

---

## Phase 1: Hub Redesign (Week 1) — IN PROGRESS

### Changes

- [x] Update hero from institutional to inclusive messaging
- [x] Add "Platforms I Use" section (Revolut, eToro, Crypto.com, SwissBorg, Nexo)
- [x] Add "AI Research Stack" section (Perplexity, Claude, Claude Code)
- [x] Update audience segments (Everyday, Crypto, Institutional)
- [x] Update navigation labels and descriptions
- [x] Update CTA from "Free Starter Kit" to "Start Investing Smarter"

### Deliverables

- Updated `/investor` hub page
- Updated NavigationMega investor section

---

## Phase 2: AI Investment Research Page (Week 2)

### Route: `/research/investing-with-ai-agents`

### Content Sections

1. **Introduction**: Why AI changes investing for individuals
2. **Platform Deep Dives**: Revolut, eToro, Crypto.com, SwissBorg, Nexo
   - Features comparison
   - Best for which investor type
   - Fees and considerations
3. **AI Research Workflow**: Step-by-step guide
   - Start with Perplexity for broad research
   - Deep dive with Claude for analysis
   - Execute with Claude Code for automation
4. **Investment Prompt Library**: 20+ prompts for Claude/GPT
   - Stock fundamental analysis
   - Crypto token evaluation
   - Portfolio rebalancing strategy
   - Risk assessment & stress testing
   - Market sentiment analysis
   - Earnings call summarization
   - Competitive landscape analysis
   - Macro economic impact assessment
5. **GitHub Tool Reviews**: What actually works
   - Portfolio trackers (rotki, ghostfolio, maybe-finance)
   - Trading frameworks (freqtrade, jesse-ai)
   - Research terminals (OpenBB)
   - Data aggregation tools
6. **Perplexity Finance Research Hub**: Setup guide and best practices

### Technical

- Add domain to `lib/research/domains.ts`
- Create research content with validated claims
- Add FAQ section for SEO
- Link from investor hub and research hub
- Add to NavigationMega under Research & Tools

---

## Phase 3: Investor Toolkit with Claude Code (Week 3-4)

### Concept: ACOS Investor Fork

A Claude Code configuration that turns the terminal into an investment research station.

### Components

**1. Claude Code Config** (`.claude/` directory)

- Investment-specific CLAUDE.md with prompts and workflows
- Pre-built slash commands: `/research-stock`, `/analyze-crypto`, `/portfolio-check`
- Memory system for tracking investment theses and decisions
- Auto-logging of research sessions

**2. Next.js Portfolio Dashboard** (Vercel template)

- Portfolio tracker with Recharts visualization
- Stock/crypto price lookup (CoinGecko, Yahoo Finance free APIs)
- Investment thesis logger with date stamps
- Research notes system (markdown-based)
- Watchlist management
- Deployable on Vercel for free

**3. Automation Workflows**

- n8n templates for price alerts (email/Slack)
- Weekly portfolio summary generator
- News aggregation pipeline (filtered by holdings)
- Earnings calendar tracker

### Technical Implementation

- GitHub template repo: `frankxai/investor-toolkit`
- Include: CLAUDE.md, Next.js app, n8n workflow JSONs
- Deploy buttons on investor hub (Vercel one-click)
- Tiered: Free (basic) / $47 (premium prompts + dashboard) / $97 (full toolkit)

---

## Phase 4: Advanced Features (Month 2+)

### Autonomous Agent Execution

- Paper trading first (absolutely no real money at risk)
- Rule-based strategies: "Buy X when RSI < 30 and sentiment > 0.6"
- Claude Code integration for strategy definition and backtesting
- Full logging and audit trail for all decisions
- Human approval gate before any "real" execution

### Real-Time Monitoring

- WebSocket price feeds via free APIs
- Alert system for portfolio events (price thresholds, volume spikes)
- Sentiment tracking dashboard
- Market hours awareness

### Institutional Products (Refresh)

- Keep existing products but refresh copy and UI
- Add case studies and ROI calculators
- Enterprise pricing tier with custom support

---

## Revenue Model

| Tier       | Price | Content                                                  |
| ---------- | ----- | -------------------------------------------------------- |
| Free       | $0    | Research page, 5 investment prompts, Perplexity guide    |
| Starter    | $27   | 20+ prompts, Claude Code config, basic dashboard         |
| Pro        | $97   | Full toolkit, n8n workflows, advanced dashboard, updates |
| Enterprise | $297+ | Custom agents, institutional features, priority support  |

---

## Platform Affiliate Potential

| Platform   | Affiliate Program    | Estimated Commission          |
| ---------- | -------------------- | ----------------------------- |
| Revolut    | Yes                  | Varies by market              |
| eToro      | Yes (eToro Partners) | CPA model                     |
| Crypto.com | Yes (Referral)       | $25-50 per qualifying signup  |
| SwissBorg  | Yes (Referral)       | % of friend's staking rewards |
| Nexo       | Yes (Referral)       | $25 BTC per qualifying signup |

_Research affiliate terms before implementing. Include FTC/proper disclosures on all affiliate links._

---

## GitHub Open-Source Tools to Review

### Portfolio Management

- `rotki/rotki` — Open-source portfolio tracker (crypto + traditional)
- `ghostfolio/ghostfolio` — Open-source wealth management software
- `maybe-finance/maybe` — OS personal finance + investing

### Trading & Research

- `freqtrade/freqtrade` — Crypto trading bot framework (Python)
- `jesse-ai/jesse` — Advanced crypto trading framework
- `Superalgos/Superalgos` — Open-source trading intelligence platform

### AI + Finance

- `OpenBB-finance/OpenBB` — Open-source financial research terminal (formerly GamestonkTerminal)
- LangChain finance agent chains
- Various Claude Code custom configs for financial analysis

---

## Technical Stack

- **Frontend**: Next.js 15 + Tailwind CSS (existing FrankX stack)
- **Charts**: Recharts (already compatible with Next.js)
- **Data APIs**: CoinGecko (free), Yahoo Finance (free), Alpha Vantage (free tier)
- **AI**: Claude API (via BYOK pattern), Perplexity API (optional)
- **Automation**: n8n (self-hosted or cloud)
- **Deployment**: Vercel (dashboard template, one-click deploy)

---

## Success Metrics

| Metric                                 | Target                | Timeline    |
| -------------------------------------- | --------------------- | ----------- |
| Research page traffic                  | 500+ monthly visitors | 2 months    |
| Prompt downloads                       | 100+                  | First month |
| Toolkit signups                        | 50+                   | First month |
| Platform referral clicks               | Track via UTM         | Ongoing     |
| Newsletter signups from investor pages | 30+                   | First month |

---

## File Map

| File                                     | Status       | Purpose                       |
| ---------------------------------------- | ------------ | ----------------------------- |
| `app/investor/page.tsx`                  | Updated      | Hub with platforms + AI tools |
| `app/investor/layout.tsx`                | Existing     | SEO metadata                  |
| `data/investor-products.json`            | Needs update | Add retail-focused products   |
| `lib/investor.ts`                        | Needs update | Add platform + tool types     |
| `app/research/investing-with-ai-agents/` | To create    | Research deep-dive page       |
| `docs/strategy/INVESTOR_TOOLKIT_PLAN.md` | This file    | Strategy document             |
