# Investment Analysis AI Agent System - System Architecture

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture Philosophy](#architecture-philosophy)
3. [Core Components](#core-components)
4. [Agent Team Structure](#agent-team-structure)
5. [Data Sources & APIs](#data-sources--apis)
6. [Database Architecture](#database-architecture)
7. [Technology Stack](#technology-stack)
8. [Setup Instructions](#setup-instructions)
9. [Usage Workflows](#usage-workflows)
10. [Scaling Strategy](#scaling-strategy)

---

## System Overview

This investment analysis system is a sophisticated multi-agent AI platform designed to provide institutional-grade financial analysis for stocks and cryptocurrencies. The system supports both deep analytical research and quick "vibe check" investment validation.

### Key Design Principles

1. **Conversational First**: Interact with your investment research through natural language
2. **Multi-Agent Architecture**: Specialized AI agents collaborate like a professional investment team
3. **Data-Driven**: Real-time market data, fundamental metrics, sentiment analysis, and technical indicators
4. **Scalable**: Start 100% free, upgrade to premium data as needed
5. **Transparent**: Every decision includes reasoning and source citations
6. **Flexible**: Supports both systematic analysis and intuition-based investing

### System Capabilities

**Analysis Modes:**
- Deep fundamental analysis (company financials, competitive positioning)
- Technical analysis (Fibonacci levels, indicators, chart patterns)
- Sentiment analysis (social media, news, market psychology)
- Portfolio risk management (diversification, position sizing)
- Quick vibe checks (30-second investment validation)

**Asset Coverage:**
- Global stocks (all major exchanges)
- Cryptocurrencies (Bitcoin, Ethereum, altcoins)
- ETFs and index funds
- Options (with premium data)

---

## Architecture Philosophy

### Why Multi-Agent?

The system mirrors a professional investment firm with specialized roles:

```
Investment Research Firm
├── Fundamental Analysts → Deep company analysis
├── Technical Analysts → Chart patterns, indicators
├── Sentiment Analysts → Market psychology
├── Risk Managers → Portfolio protection
├── Portfolio Managers → Asset allocation
└── Research Director → Synthesis & decisions
```

Each agent has:
- Specialized knowledge domain
- Specific data sources
- Unique analytical methods
- Clear decision protocols

### Communication Pattern

Agents collaborate through structured workflows:

```
User Query → Router → Relevant Agents → Synthesizer → User
                ↓
          Data Sources
          (APIs, DB, MCP)
```

**Example Flow:**
1. User: "Should I buy Tesla stock?"
2. Router assigns to: Fundamental, Technical, Sentiment agents
3. Each agent analyzes in parallel
4. Synthesizer combines insights
5. Response includes: recommendation, confidence, reasoning, data citations

---

## Core Components

### 1. Claude AI (LLM Core)

**Role**: Central reasoning engine for all agents

**Why Claude:**
- Superior analytical reasoning
- Long context window (200k tokens)
- Excellent with financial documents
- Built-in MCP server support
- Structured output capabilities

**Configuration:**
```yaml
model: claude-sonnet-4
temperature: 0.3  # Lower for consistent financial analysis
max_tokens: 4096
system_prompt: "See agent.md for each agent's prompt"
```

### 2. MCP (Model Context Protocol) Servers

**Role**: Connect Claude to external data sources

**Active MCP Servers:**

```json
{
  "financial-datasets": {
    "url": "mcp://financial-datasets",
    "description": "Stock fundamentals, prices, statements",
    "capabilities": ["income_statements", "balance_sheets", "price_history"]
  },
  "investmcp": {
    "url": "mcp://investmcp",
    "description": "Technical indicators, stock analysis",
    "capabilities": ["technical_analysis", "fibonacci", "indicators"]
  },
  "polygon-io": {
    "url": "mcp://polygon.io",
    "description": "Real-time market data (premium)",
    "capabilities": ["realtime_prices", "options_flow", "market_depth"]
  },
  "crypto-data": {
    "url": "mcp://coingecko",
    "description": "Cryptocurrency market data",
    "capabilities": ["crypto_prices", "market_caps", "defi_metrics"]
  }
}
```

### 3. Database Layer (PostgreSQL + pgvector)

**Role**: Persistent storage for positions, analysis, and embeddings

**Tables:**
- `portfolios` - User accounts and allocations
- `positions` - Current holdings
- `transactions` - Trade history
- `market_data` - Cached price/volume data
- `analysis_history` - AI-generated insights
- `embeddings` - Vector representations for semantic search

### 4. n8n Workflow Automation

**Role**: Scheduled tasks and automation

**Workflows:**
- Daily market data refresh
- Portfolio rebalancing checks
- News/sentiment monitoring
- Report generation
- Alert triggers

### 5. Vector Database (Qdrant)

**Role**: Semantic search across investment research

**Stored Content:**
- News articles (embeddings)
- Earnings call transcripts
- Investment research reports
- Your analysis history
- Market commentary

**Use Cases:**
- "Find similar market conditions"
- "What happened when P/E ratios were this high?"
- "Show me crypto projects with similar tokenomics"

---

## Agent Team Structure

### Core Analysis Agents

#### 1. Fundamental Analyst
**Specialization**: Company financials and valuation
- Revenue growth trends
- Profitability metrics (margins, ROIC, ROE)
- Balance sheet health
- Cash flow analysis
- Competitive positioning
- Management quality assessment

**Data Sources**: Financial statements, SEC filings, earnings calls

#### 2. Technical Analyst
**Specialization**: Chart patterns and indicators
- Fibonacci retracement levels
- Support/resistance zones
- Moving averages (SMA, EMA)
- Momentum indicators (RSI, MACD, Stochastic)
- Volume analysis
- Trend identification

**Data Sources**: Price/volume history, technical indicator APIs

#### 3. Sentiment Analyst
**Specialization**: Market psychology and social signals
- Social media sentiment (Reddit, Twitter/X)
- News sentiment analysis
- Institutional positioning
- Retail vs. institutional flow
- Fear & Greed Index
- Put/call ratios

**Data Sources**: News APIs, Reddit API, Twitter/X, options data

#### 4. Risk Manager
**Specialization**: Portfolio protection and position sizing
- Value at Risk (VaR) calculations
- Portfolio correlation analysis
- Position sizing recommendations
- Stop-loss placement
- Diversification scoring
- Black swan event assessment

**Data Sources**: Portfolio holdings, market volatility data

#### 5. Macro Analyst
**Specialization**: Economic trends and market cycles
- Interest rate environment
- Economic indicators (GDP, unemployment, inflation)
- Market cycle positioning
- Sector rotation analysis
- Global macro trends
- Fed policy interpretation

**Data Sources**: FRED API, World Bank, economic calendars

### Specialized Agents

#### 6. Crypto On-Chain Analyst
**Specialization**: Blockchain data and token metrics
- Whale wallet movements
- Exchange in/outflows
- Network activity (transactions, active addresses)
- Token economics (supply schedules, burn rate)
- DeFi protocol metrics (TVL, yield)
- Network health (hash rate, validator count)

**Data Sources**: Blockchain explorers, DeFi analytics platforms

#### 7. Earnings/News Monitor (Stocks)
**Specialization**: Corporate events and news
- Earnings call analysis
- SEC filing alerts (10-K, 10-Q, 8-K)
- Management guidance changes
- Insider trading activity
- M&A announcements
- Product launches

**Data Sources**: SEC EDGAR, news feeds, company IR sites

### Strategic Agents

#### 8. Portfolio Manager
**Specialization**: Asset allocation and optimization
- Portfolio construction
- Rebalancing recommendations
- Tax-loss harvesting
- Diversification optimization
- Risk-adjusted return maximization
- Cash management

**Data Sources**: Portfolio database, market data

#### 9. Vibe Validator
**Specialization**: Quick investment thesis checks
- Rapid multi-factor screening
- Red flag detection
- Sanity check on impulse ideas
- Simple buy/hold/avoid recommendation
- Key metrics at-a-glance

**Data Sources**: All agents (rapid synthesis)

#### 10. Report Generator
**Specialization**: Investment documentation
- Comprehensive investment memos
- Portfolio performance reports
- Risk assessment documents
- HTML/PDF export
- Executive summaries

**Data Sources**: All agent outputs

---

## Data Sources & APIs

### Free Tier Data Sources

#### Stock Market APIs

**Alpha Vantage** (Primary fundamentals)
```yaml
endpoint: https://www.alphavantage.co/query
rate_limit: 25 calls/day (free tier)
capabilities:
  - Fundamental data (income, balance, cash flow)
  - Daily/intraday prices
  - Technical indicators
  - Economic indicators
api_key: YOUR_KEY_HERE
```

**Finnhub** (Real-time prices)
```yaml
endpoint: https://finnhub.io/api/v1
rate_limit: 60 calls/minute (free tier)
capabilities:
  - Real-time quotes
  - Company news
  - Basic fundamentals
  - Insider trading
api_key: YOUR_KEY_HERE
```

**Financial Modeling Prep** (Comprehensive data)
```yaml
endpoint: https://financialmodelingprep.com/api/v3
rate_limit: 250 calls/day (free tier)
capabilities:
  - Financial statements
  - Stock screener
  - Historical prices
  - Key metrics
api_key: YOUR_KEY_HERE
```

**Yahoo Finance** (Backup/supplement)
```yaml
method: yfinance Python library
rate_limit: Unofficial, use sparingly
capabilities:
  - Historical prices
  - Basic fundamentals
  - Options data
  - Dividends
```

#### Cryptocurrency APIs

**CoinGecko** (Primary crypto data)
```yaml
endpoint: https://api.coingecko.com/api/v3
rate_limit: 10,000 calls/month (free tier)
capabilities:
  - Crypto prices
  - Market cap data
  - Volume analysis
  - DeFi metrics
  - NFT data
api_key: Not required (Demo tier)
```

**CoinMarketCap** (Alternative crypto data)
```yaml
endpoint: https://pro-api.coinmarketcap.com/v1
rate_limit: 10,000 credits/month (free tier)
capabilities:
  - Crypto listings
  - Market metrics
  - Historical data
  - Exchange rankings
api_key: YOUR_KEY_HERE
```

**Blockchain Explorers** (On-chain data)
```yaml
etherscan:
  endpoint: https://api.etherscan.io/api
  capabilities: [transactions, balances, contracts, gas]
bscscan:
  endpoint: https://api.bscscan.com/api
  capabilities: [BSC blockchain data]
```

#### News & Sentiment

**NewsAPI.org**
```yaml
endpoint: https://newsapi.org/v2
rate_limit: 100 requests/day (free tier)
capabilities:
  - Business news
  - Source filtering
  - Keyword search
  - Date range queries
api_key: YOUR_KEY_HERE
```

**Reddit API** (Sentiment source)
```yaml
method: PRAW (Python Reddit API Wrapper)
capabilities:
  - r/wallstreetbets posts
  - r/stocks discussion
  - r/cryptocurrency sentiment
  - Comment analysis
api_key: Reddit developer account
```

#### Economic Data

**FRED (Federal Reserve Economic Data)**
```yaml
endpoint: https://api.stlouisfed.org/fred
rate_limit: None (free)
capabilities:
  - 800,000+ economic time series
  - GDP, unemployment, inflation
  - Interest rates
  - Market indices
api_key: YOUR_KEY_HERE (free registration)
```

### Premium Tier Upgrades

**Polygon.io** ($29-199/month)
- Real-time stock data
- Options flow
- Institutional-grade APIs

**S&P Global Capital IQ** (Enterprise)
- Comprehensive fundamentals
- Earnings call transcripts
- Private company data

**Alternative Data Providers**
- Quiver Quantitative (social sentiment)
- LunarCrush (crypto social metrics)
- Santiment (on-chain analytics)

---

## Database Architecture

### PostgreSQL Schema

#### Core Tables

**portfolios**
```sql
CREATE TABLE portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    cash_balance DECIMAL(20, 2) DEFAULT 0,
    total_value DECIMAL(20, 2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

**positions**
```sql
CREATE TABLE positions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID REFERENCES portfolios(id),
    symbol VARCHAR(20) NOT NULL,
    asset_type VARCHAR(20) NOT NULL, -- 'stock', 'crypto', 'etf'
    quantity DECIMAL(20, 8) NOT NULL,
    avg_cost DECIMAL(20, 8) NOT NULL,
    current_price DECIMAL(20, 8),
    market_value DECIMAL(20, 2),
    unrealized_pnl DECIMAL(20, 2),
    pnl_percentage DECIMAL(10, 4),
    last_updated TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_positions_portfolio ON positions(portfolio_id);
CREATE INDEX idx_positions_symbol ON positions(symbol);
```

**transactions**
```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID REFERENCES portfolios(id),
    symbol VARCHAR(20) NOT NULL,
    transaction_type VARCHAR(10) NOT NULL, -- 'buy', 'sell'
    quantity DECIMAL(20, 8) NOT NULL,
    price DECIMAL(20, 8) NOT NULL,
    commission DECIMAL(10, 2) DEFAULT 0,
    total_amount DECIMAL(20, 2) NOT NULL,
    notes TEXT,
    executed_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_transactions_portfolio ON transactions(portfolio_id);
CREATE INDEX idx_transactions_symbol ON transactions(symbol);
CREATE INDEX idx_transactions_date ON transactions(executed_at);
```

**market_data** (Cache)
```sql
CREATE TABLE market_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(20) NOT NULL,
    asset_type VARCHAR(20) NOT NULL,
    price DECIMAL(20, 8) NOT NULL,
    volume DECIMAL(20, 2),
    market_cap DECIMAL(20, 2),
    change_24h DECIMAL(10, 4),
    timestamp TIMESTAMP NOT NULL,
    data_source VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_market_data_symbol_time ON market_data(symbol, timestamp DESC);
CREATE UNIQUE INDEX idx_market_data_unique ON market_data(symbol, timestamp, data_source);
```

**analysis_history**
```sql
CREATE TABLE analysis_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(20) NOT NULL,
    agent_type VARCHAR(50) NOT NULL, -- 'fundamental', 'technical', etc.
    analysis_type VARCHAR(50) NOT NULL,
    input_data JSONB,
    output_data JSONB NOT NULL,
    recommendation VARCHAR(20), -- 'buy', 'hold', 'sell', 'avoid'
    confidence_score DECIMAL(5, 2), -- 0-100
    reasoning TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_analysis_symbol ON analysis_history(symbol);
CREATE INDEX idx_analysis_agent ON analysis_history(agent_type);
CREATE INDEX idx_analysis_date ON analysis_history(created_at DESC);
```

**embeddings** (Vector storage)
```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type VARCHAR(50) NOT NULL, -- 'news', 'analysis', 'transcript'
    symbol VARCHAR(20),
    content_text TEXT NOT NULL,
    embedding VECTOR(1536), -- OpenAI ada-002 dimensions
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_embeddings_symbol ON embeddings(symbol);
CREATE INDEX idx_embeddings_vector ON embeddings USING ivfflat (embedding vector_cosine_ops);
```

### Vector Database (Qdrant) Collections

**financial_news**
```yaml
collection_name: financial_news
vector_size: 1536
distance: Cosine
payload_schema:
  symbol: keyword
  title: text
  source: keyword
  published_at: datetime
  sentiment_score: float
```

**investment_research**
```yaml
collection_name: investment_research
vector_size: 1536
distance: Cosine
payload_schema:
  symbol: keyword
  research_type: keyword
  analyst: keyword
  created_at: datetime
  recommendation: keyword
```

**earnings_transcripts**
```yaml
collection_name: earnings_transcripts
vector_size: 1536
distance: Cosine
payload_schema:
  symbol: keyword
  quarter: keyword
  year: integer
  speaker: keyword
  sentiment: float
```

---

## Technology Stack

### Core Technologies

**Backend:**
- **Python 3.11+**: Primary programming language
- **FastAPI**: REST API (if building web interface)
- **SQLAlchemy**: ORM for PostgreSQL
- **psycopg3**: PostgreSQL adapter
- **asyncio**: Async operations

**AI/ML:**
- **Claude API**: Primary LLM (Anthropic)
- **LangChain**: Agent orchestration
- **OpenAI Embeddings**: Text vectorization
- **scikit-learn**: Statistical analysis

**Data:**
- **PostgreSQL 15+**: Primary database
- **pgvector**: Vector similarity search
- **Qdrant**: Advanced vector database
- **Redis**: Caching layer (optional)

**APIs & Integration:**
- **requests**: HTTP client
- **aiohttp**: Async HTTP client
- **yfinance**: Yahoo Finance wrapper
- **python-binance**: Crypto exchange
- **praw**: Reddit API

**Automation:**
- **n8n**: Workflow automation (self-hosted)
- **APScheduler**: Python job scheduling
- **Celery**: Distributed task queue (advanced)

**Frontend:**
- **HTML5/CSS3/JavaScript**: Static dashboards
- **Chart.js / TradingView**: Data visualization
- **Bootstrap**: UI framework

### Development Tools

**Version Control:**
```bash
git
GitHub/GitLab for remote hosting
```

**Package Management:**
```bash
pip / pipenv / poetry
requirements.txt for dependencies
```

**Testing:**
```bash
pytest - unit tests
pytest-asyncio - async tests
```

**Code Quality:**
```bash
black - code formatting
flake8 - linting
mypy - type checking
```

---

## Setup Instructions

### Prerequisites

**Required:**
- Python 3.11 or higher
- PostgreSQL 15 or higher
- Git
- Claude API key (Anthropic account)

**Optional:**
- Docker (for containerization)
- n8n (for workflow automation)
- Qdrant (for advanced vector search)

### Step-by-Step Setup

#### 1. Clone Repository

```bash
# Create project directory
mkdir investment-system
cd investment-system

# Initialize git
git init

# Create directory structure
mkdir -p config database agents workflows reports data web
```

#### 2. Python Environment

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install --upgrade pip
pip install anthropic langchain sqlalchemy psycopg[binary] pgvector
pip install requests yfinance pandas numpy
pip install fastapi uvicorn pydantic
pip install python-dotenv praw newsapi-python
pip install qdrant-client openai
```

#### 3. Database Setup

```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres psql
CREATE DATABASE investment_db;
CREATE USER invest_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE investment_db TO invest_user;
\q

# Enable pgvector extension
sudo -u postgres psql -d investment_db
CREATE EXTENSION vector;
\q

# Run schema
psql -U invest_user -d investment_db -f database/schema.sql
```

#### 4. API Keys Configuration

Create `.env` file:
```bash
# Copy template
cp config/api_keys.env.example .env

# Edit with your keys
nano .env
```

**.env content:**
```bash
# Claude AI
ANTHROPIC_API_KEY=sk-ant-your-key-here

# Stock APIs (Free Tier)
ALPHA_VANTAGE_API_KEY=your-key
FINNHUB_API_KEY=your-key
FMP_API_KEY=your-key

# Crypto APIs
COINGECKO_API_KEY=  # Optional, free tier works without
COINMARKETCAP_API_KEY=your-key

# News & Sentiment
NEWSAPI_KEY=your-key
REDDIT_CLIENT_ID=your-id
REDDIT_CLIENT_SECRET=your-secret
REDDIT_USER_AGENT=InvestmentBot/1.0

# Economic Data
FRED_API_KEY=your-key

# Database
DATABASE_URL=postgresql://invest_user:your_password@localhost:5432/investment_db

# Vector DB (if using Qdrant)
QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=  # Optional for local

# OpenAI (for embeddings)
OPENAI_API_KEY=sk-your-key  # Optional, for vector search
```

#### 5. MCP Server Configuration

**Create `~/.config/claude/mcp_settings.json`:**
```json
{
  "mcpServers": {
    "financial-datasets": {
      "command": "npx",
      "args": ["-y", "@financial-datasets/mcp-server"]
    },
    "investmcp": {
      "command": "npx",
      "args": ["-y", "investmcp"]
    }
  }
}
```

**Or use Claude Desktop GUI:**
1. Open Claude Desktop
2. Settings → MCP Servers
3. Add servers from the list above

#### 6. Initialize Database

```bash
# Run migrations
python database/migrations/001_initial_schema.py

# Seed sample data (optional)
python database/seed_data.py
```

#### 7. Test Setup

```bash
# Test database connection
python -c "from sqlalchemy import create_engine; import os; engine = create_engine(os.getenv('DATABASE_URL')); print('DB Connected!' if engine.connect() else 'Failed')"

# Test Claude API
python -c "import anthropic; client = anthropic.Anthropic(); print('Claude API works!')"

# Test data sources
python data/test_apis.py
```

#### 8. First Agent Test

```bash
# Test fundamental analyst
python agents/fundamental.py --symbol AAPL

# Test technical analyst
python agents/technical.py --symbol NVDA

# Test vibe validator (quick check)
python agents/vibe_validator.py --symbol BTC-USD
```

---

## Usage Workflows

### Workflow 1: Deep Stock Analysis

**User Command:**
```
"Give me a comprehensive analysis of Tesla (TSLA)"
```

**System Process:**

1. **Router** identifies this as deep analysis request
2. **Parallel Agent Execution:**
   - Fundamental Analyst: Fetches financials, calculates metrics
   - Technical Analyst: Analyzes chart, identifies levels
   - Sentiment Analyst: Scans news, social media
   - Macro Analyst: Assesses sector trends, EV market
   - Risk Manager: Evaluates volatility, correlations

3. **Synthesis:**
   - Portfolio Manager combines all insights
   - Report Generator creates formatted output

4. **Output:**
```markdown
# Tesla (TSLA) Investment Analysis
**Generated**: 2025-01-15 14:30 UTC
**Recommendation**: HOLD (Confidence: 75%)

## Executive Summary
Tesla shows strong fundamentals with growing revenue...

## Fundamental Analysis
- Revenue Growth: 24% YoY
- P/E Ratio: 65 (vs. industry avg 18)
- Free Cash Flow: $12.3B (improving)
[Full metrics...]

## Technical Analysis
- Current Price: $242.50
- Fibonacci Support: $225 (38.2%), $210 (50%)
- RSI: 58 (neutral)
- MACD: Bullish crossover pending
[Chart link...]

## Sentiment Analysis
- News Sentiment: 68% Positive
- Reddit r/stocks: Neutral (mixed opinions)
- Institutional Flow: Net buying (+$450M this week)

## Risk Assessment
- Volatility: High (beta 2.1)
- Recommended Position Size: 2-3% of portfolio
- Stop Loss: $220 (-9%)

## Recommendation
HOLD current positions. Consider adding on dip to $225 support.
Wait for technical confirmation before new entries.
```

### Workflow 2: Quick Vibe Check

**User Command:**
```
"Quick vibe check on Ethereum, thinking about buying"
```

**System Process:**

1. **Vibe Validator** agent activates (optimized for speed)
2. **Rapid Data Fetch:**
   - Current price from cache/API
   - Pre-calculated technical indicators
   - Latest sentiment snapshot

3. **Output (< 30 seconds):**
```
🎯 VIBE CHECK: Ethereum (ETH)

Quick Take: CAUTIOUSLY BULLISH

Current Price: $2,315
Fibonacci Levels:
  🟢 Support: $2,100 (38.2%), $1,950 (50%)
  🔴 Resistance: $2,500 (23.6%), $2,750

Key Signals:
  ✅ Above 50-day MA
  ✅ Positive funding rates (market optimism)
  ⚠️  High correlation with BTC (0.85)
  ⚠️  Overbought on 4hr RSI (72)

Sentiment: 71% Bullish (Twitter, Reddit)

One-Line Verdict:
Solid long-term hold if you believe in Ethereum fundamentals,
but consider waiting for dip to $2,100 for better risk/reward.

Want deep analysis? (Reply 'yes')
```

### Workflow 3: Portfolio Rebalancing

**User Command:**
```
"Review my portfolio and suggest rebalancing"
```

**System Process:**

1. **Fetch Portfolio** from database
2. **Portfolio Manager** agent analyzes:
   - Current allocation vs. target
   - Correlation matrix
   - Risk concentration
   - Tax implications

3. **Output:**
```
# Portfolio Rebalancing Recommendation

## Current Allocation
- US Stocks: 45% (target: 40%)
- International: 15% (target: 20%)
- Crypto: 25% (target: 20%)
- Cash: 15% (target: 20%)

## Risk Metrics
- Portfolio Beta: 1.3 (moderate-high risk)
- Sharpe Ratio: 1.8 (good)
- Max Drawdown: -22% (acceptable)
- Top 3 Holdings: 35% (concentrated)

## Rebalancing Actions
1. Reduce: NVDA (-$2,500) → Lock in gains
2. Reduce: BTC (-$1,000) → Trim overweight
3. Add: VXUS (+$2,000) → International exposure
4. Add: Cash (+$1,500) → Dry powder

Tax Impact: +$450 capital gains (short-term)

Proceed with rebalancing? (yes/no)
```

### Workflow 4: Daily Market Summary

**Automated (n8n workflow):**

Every day at 9:00 AM:
1. Fetch overnight market moves
2. Scan portfolio for significant changes
3. Check for earnings/news on holdings
4. Generate summary email/notification

**Example Output:**
```
📊 Daily Investment Briefing - Jan 15, 2025

Market Overview:
- S&P 500: +0.8% (bullish continuation)
- Nasdaq: +1.2% (tech strength)
- Bitcoin: -2.1% (profit taking)

Your Portfolio: +0.5% ($1,250)
Top Movers:
  🚀 NVDA: +3.2% ($450)
  📉 ETH: -2.8% (-$320)

Alerts:
⚠️  Apple earnings tomorrow after close
⚠️  Fed speaks at 2pm - expect volatility
✅ Tesla hit your $240 buy alert

Actions Needed:
- Consider taking profits on NVDA (up 45% since purchase)
- Review Apple position before earnings

Full report: [link]
```

### Workflow 5: Research Question

**User Command:**
```
"What are the best semiconductor stocks for AI growth?"
```

**System Process:**

1. **Research Mode** activated
2. **Multi-step process:**
   - Screen semiconductor stocks (data APIs)
   - Filter for AI exposure (fundamental analysis)
   - Rank by metrics (technical + fundamental scores)
   - Vector search for similar past analyses

3. **Output:**
```
# Top Semiconductor Stocks for AI Growth

## Screening Criteria
- Exposure to AI chip market
- Revenue growth > 15%
- Gross margins > 50%
- Technical strength (above 200-day MA)

## Top 5 Picks

### 1. NVIDIA (NVDA) - Score: 92/100
✅ Dominant AI GPU market share (95%)
✅ Strong fundamentals (60% revenue growth)
⚠️  Valuation stretched (P/E: 65)
Entry: Wait for dip to $120 (Fibonacci support)

### 2. AMD (AMD) - Score: 85/100
✅ Growing data center revenue
✅ Competitive AI chips (MI300)
✅ More attractive valuation vs NVDA
Entry: Current levels or $140 support

### 3. ASML (ASML) - Score: 82/100
✅ Essential for chip manufacturing
✅ Near-monopoly on EUV lithography
⚠️  Exposure to China regulation risk
Entry: $900-950 range

[More picks...]

## Portfolio Allocation Suggestion
- 40% NVDA (core holding)
- 30% AMD (growth + value)
- 20% ASML (infrastructure play)
- 10% TSM (diversification)

Risk Level: Moderate-High (sector concentration)
```

---

## Scaling Strategy

### Phase 1: Free Tier (Current)

**Capabilities:**
- Manual analysis on-demand
- Free API data sources
- Local database
- Basic automation
- HTML reports

**Cost:** $0-20/month (Claude API usage only)

**Limitations:**
- API rate limits
- No real-time data
- Manual report generation
- Limited historical data

### Phase 2: Enhanced ($50-100/month)

**Upgrades:**
- Polygon.io real-time data ($29/mo)
- Premium crypto data (CoinGecko Analyst $129/mo)
- Automated daily reports
- Cloud database (Supabase/Railway)
- Slack/email notifications

**New Capabilities:**
- Intraday trading signals
- Real-time portfolio tracking
- Options analysis
- Enhanced sentiment data

### Phase 3: Professional ($300-500/month)

**Upgrades:**
- Alternative data sources
- Backtesting infrastructure
- Broker API integration (Alpaca)
- Advanced technical indicators
- Dedicated server/VPS

**New Capabilities:**
- Automated trade execution
- Quantitative strategies
- Advanced portfolio optimization
- Tax optimization

### Phase 4: Institutional ($1000+/month)

**Upgrades:**
- S&P Global Capital IQ
- FactSet integration
- Bloomberg Terminal data
- Dedicated infrastructure
- Multi-user support

**New Capabilities:**
- Institutional-grade research
- Complex derivatives analysis
- Private market intelligence
- Custom factor models

---

## Security & Best Practices

### API Key Management
```bash
# Never commit .env to git
echo ".env" >> .gitignore

# Use environment variables
export $(cat .env | xargs)

# Rotate keys quarterly
# Store in password manager (1Password, Bitwarden)
```

### Database Security
```sql
-- Use strong passwords
-- Enable SSL connections
-- Regular backups
-- Principle of least privilege
```

### Trade Execution Safety
```python
# NEVER auto-execute without:
# 1. Paper trading first (6+ months)
# 2. Position size limits
# 3. Daily loss limits
# 4. Manual approval for large trades
# 5. Comprehensive logging
```

### Compliance
- This system is for PERSONAL USE only
- Not financial advice
- Backtesting ≠ future performance
- Understand regulations in your jurisdiction

---

## Monitoring & Maintenance

### Daily Tasks
- [ ] Check API rate limit usage
- [ ] Review overnight market moves
- [ ] Verify data freshness
- [ ] Check for agent errors

### Weekly Tasks
- [ ] Backup database
- [ ] Review agent performance
- [ ] Update market data cache
- [ ] Check for API changes

### Monthly Tasks
- [ ] Rotate API keys
- [ ] Review and optimize prompts
- [ ] Update financial data
- [ ] Performance analysis

### Quarterly Tasks
- [ ] System architecture review
- [ ] Cost optimization
- [ ] Feature prioritization
- [ ] Security audit

---

## Next Steps

1. **Read `agent.md`** for detailed agent specifications
2. **Set up free API accounts** (see Data Sources section)
3. **Configure MCP servers** in Claude Desktop
4. **Initialize database** with provided schema
5. **Test first analysis** with a stock you know well
6. **Iterate and improve** based on results

---

## Support & Community

**Official Resources:**
- Claude Documentation: https://docs.anthropic.com
- MCP Protocol: https://modelcontextprotocol.io
- PostgreSQL: https://postgresql.org/docs

**GitHub Projects for Inspiration:**
- FinRobot: https://github.com/AI4Finance-Foundation/FinRobot
- TradingAgents: https://github.com/TauricResearch/TradingAgents
- InvestMCP: https://github.com/arrpitk/InvestMCP

**Financial Data APIs:**
- Alpha Vantage: https://www.alphavantage.co
- CoinGecko: https://www.coingecko.com/en/api
- FRED: https://fred.stlouisfed.org/docs/api

---

## Disclaimer

This system is for EDUCATIONAL and RESEARCH purposes only. It does NOT constitute financial advice. All investment decisions carry risk. Past performance does not guarantee future results. Always do your own research and consult with licensed financial advisors before making investment decisions.

**USE AT YOUR OWN RISK.**

---

*Version: 1.0*
*Last Updated: 2025-01-15*
*Maintained by: Your Name*
