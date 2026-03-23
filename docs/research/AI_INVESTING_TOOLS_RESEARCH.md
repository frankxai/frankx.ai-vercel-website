# AI-Powered Investing Tools Research (Feb 2026)

_Research for /research/investing-with-ai-agents page_

---

## Portfolio Trackers

### Ghostfolio (7.6k stars) — RECOMMENDED for stocks/ETFs

- Angular + NestJS + Prisma + PostgreSQL. Docker-native.
- Handles stocks, ETFs, crypto, manual assets (real estate, gold)
- Portfolio rebalancing, ROAI calculations across multiple timeframes
- Self-hosted, privacy-first
- REST API accessible from Claude Code
- No AI features built-in — pure tracking

### rotki (3.1k stars) — RECOMMENDED for crypto + tax

- Python backend, Vue frontend. Local-first, AGPLv3.
- 20+ exchange connections via read-only API
- Tracks DeFi protocols (Aave, Compound, Uniswap, MakerDAO, Yearn, Curve)
- Jurisdiction-specific tax reports
- Free tier limits historical data to 2 weeks
- Python backend directly scriptable from Claude Code

### Maybe Finance / Sure fork (45k stars, ARCHIVED)

- Original project shut down mid-2023. Stars are misleading.
- Community fork "Sure" (we-promise/sure) is the active version
- Rails + React stack. Net worth, budgeting, investment benchmarking
- Less depth than Ghostfolio for pure portfolio analytics

---

## Trading Frameworks

### Freqtrade + FreqAI (40k stars) — MOST BATTLE-TESTED

- Python crypto trading bot. Strategy backtesting + live trading.
- FreqAI: embedded ML module (scikit-learn, LightGBM, XGBoost, PyTorch, RL)
- Model retrains on rolling window during live trading
- MCP server in development
- Crypto-only. Overfitting is primary failure mode.
- Claude Code can write/debug strategy files directly

### Jesse (5k stars) — CLEANEST API

- Python crypto trading framework for strategy research
- Built-in GPT assistant for strategy development
- Spot, futures, DEX support. Paper trading available.
- Smaller community than Freqtrade
- Claude Code natural fit for generating Jesse strategy classes

### Superalgos (4k stars) — TOO COMPLEX

- Visual drag-and-drop crypto strategy designer
- Extreme complexity. Not for retail investors.
- Poor Claude Code integration (visual scripting paradigm)

---

## OpenBB (31k stars) — HIGHEST VALUE INTEGRATION

- Terminal (CLI) has been officially sunset
- Replaced by OpenBB Platform (SDK) + OpenBB Workspace (web app)
- Python SDK with data from ~100 vendors
- SOC 2 Type II compliant (opened to institutional users)
- **Has MCP server** — wraps API endpoints as MCP tools
- Claude Code + OpenBB MCP = complete agentic research pipeline
- Fetch earnings, fundamentals, SEC filings, sentiment — all from Claude Code
- Free data providers have rate limits; full depth needs paid subscriptions

---

## AI + Finance Models

### FinGPT (18.5k stars)

- Open-source financial LLM (Columbia/Cornell researchers)
- LoRA fine-tuning on Llama 2, ChatGLM for financial NLP
- Sentiment analysis, stock price forecasting, earnings analysis
- Outperformed BloombergGPT on public benchmarks (narrow tasks)
- Research project, not production software. Needs GPU.

### FinRobot (6k stars)

- Multi-agent platform on top of FinGPT
- Unifies LLMs, RL, quant analytics
- Academic design — substantial engineering needed for real deployment

---

## Perplexity Finance

- 45M active users (100%+ growth from 22M in early 2025)
- Live stock summaries: price, P/E, market cap, volume, dividends
- Earnings breakdowns with management commentary
- Side-by-side company comparisons
- Source attribution on every claim
- NOT a portfolio tracker. No persistent memory.
- Cannot replace DCF models or quant analysis.
- **Best for**: daily market monitoring, news triage, quick research
- **Workflow**: Perplexity for monitoring → Claude for deep analysis

---

## Claude Code for Investing

- Documented case: Claude Code managing $100k paper portfolio, beat market in one month
- Finance Agent Benchmark: 44.5% accuracy (on par with o3, above 30% average)
- Builds: DCF models, Monte Carlo simulations, portfolio optimization scripts
- MCP connections to: Alpaca (brokerage), Morningstar, Google Sheets, OpenBB
- **Always cross-check**: Hallucination risk on specific prices/dates/metrics

### Recommended Claude Code Investing Workflow

1. OpenBB MCP → fetch fundamentals, filings, price history
2. Claude Code → reason, analyze, write optimization scripts
3. Ghostfolio/rotki → track real positions
4. Perplexity → daily news monitoring
5. Human → final decision, trade execution

---

## Summary Table

| Tool               | Stars | Active? | Retail-ready?       | Claude Code fit   |
| ------------------ | ----- | ------- | ------------------- | ----------------- |
| Ghostfolio         | 7.6k  | Yes     | High (stocks/ETFs)  | Good (REST API)   |
| rotki              | 3.1k  | Yes     | Medium (crypto/tax) | Good (Python)     |
| Freqtrade          | 40k   | Yes     | Medium (crypto)     | Strong (Python)   |
| Jesse              | 5k    | Yes     | Medium (crypto)     | Strong (Python)   |
| OpenBB Platform    | 31k   | Yes     | High                | Very strong (MCP) |
| FinGPT             | 18.5k | Yes     | Low (research/ML)   | Moderate          |
| Perplexity Finance | N/A   | Yes     | High (research)     | Complementary     |

---

## Recommended Stack for Retail AI Investor (2026)

**Research**: Perplexity Finance (daily) + OpenBB Platform via MCP (deep analysis)
**Tracking**: Ghostfolio (stocks/ETFs) or rotki (crypto)
**Analysis**: Claude Code via OpenBB MCP
**Trading**: Freqtrade + FreqAI (crypto only, advanced users)
**LLM models**: Claude > FinGPT for 99% of retail use cases
