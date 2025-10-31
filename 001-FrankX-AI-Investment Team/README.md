# 🤖 AI Investment Analysis System

> **Sophisticated Multi-Agent Investment Research Platform**
>
> Institutional-grade financial analysis powered by Claude AI for stocks and cryptocurrencies. From deep fundamental research to 30-second "vibe checks" - your personal AI investment team.

---

## 🎯 What This System Does

This is a **multi-agent AI system** that provides:

✅ **Deep Fundamental Analysis** - Company financials, valuation models, competitive positioning
✅ **Technical Analysis** - Fibonacci levels, chart patterns, momentum indicators
✅ **Sentiment Analysis** - News, social media, institutional flow tracking
✅ **Risk Management** - Portfolio optimization, position sizing, stop-loss recommendations
✅ **Crypto On-Chain Analysis** - Whale tracking, token economics, DeFi metrics
✅ **Quick Vibe Checks** - 30-second investment thesis validation
✅ **Automated Reports** - HTML investment memos and daily summaries

### 🎨 Design Philosophy

**Two Investment Modes:**
1. **Analytical Mode** - Comprehensive multi-agent research (5-10 minutes)
2. **Vibe Mode** - Quick gut-check validation (< 30 seconds)

**Platform:** Claude AI + MCP Servers (not n8n, not Perplexity)
**Why:** Native financial data integration, superior reasoning, conversational interface

---

## 📁 Project Structure

```
001-FrankX-AI-Investment Team/
├── README.md                          ← You are here
├── claude.md                          ← Full system architecture (read this!)
├── agent.md                           ← Agent specifications & prompts
├── config/
│   ├── mcp_servers.json              ← MCP server configuration
│   └── api_keys.env.example          ← API key template
├── database/
│   └── schema.sql                    ← PostgreSQL database schema
└── reports/
    └── investment_analysis_template.html  ← Report template
```

---

## 🚀 Quick Start (30 Minutes to First Analysis)

### Prerequisites

- **Claude Desktop** (or Claude API access)
- **Free API Accounts** (see setup below)
- **PostgreSQL** (optional but recommended)
- **Node.js** (for MCP servers)

### Step 1: Read the Documentation (5 min)

**Start here:** Open `claude.md` for complete system overview

**Then read:** `agent.md` for agent details and prompt engineering

### Step 2: Set Up Free APIs (10 min)

Create free accounts for:

1. **Anthropic Claude** - https://console.anthropic.com/
2. **Alpha Vantage** - https://www.alphavantage.co/support/#api-key (25 calls/day free)
3. **Finnhub** - https://finnhub.io/register (60 calls/min free)
4. **CoinGecko** - Works without key (10K calls/month)
5. **NewsAPI** - https://newsapi.org/register (100 calls/day free)

**Save your keys:** Copy `config/api_keys.env.example` to `.env` and fill in your keys.

### Step 3: Configure MCP Servers (10 min)

**Option A: Claude Desktop GUI**
1. Open Claude Desktop
2. Settings → MCP Servers
3. Click "Add Server"
4. Add `financial-datasets` and `investmcp` (see `config/mcp_servers.json`)

**Option B: Manual Configuration**
1. Copy content from `config/mcp_servers.json`
2. Add to Claude Desktop config file:
   - **macOS:** `~/.config/claude/claude_desktop_config.json`
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
3. Restart Claude Desktop

### Step 4: Test Your First Analysis (5 min)

Open Claude Desktop and try:

```
"Give me a quick vibe check on Apple (AAPL)"
```

or

```
"Analyze Tesla stock comprehensively"
```

**You should see:**
- MCP servers being called for financial data
- Multi-agent analysis (fundamental, technical, sentiment)
- Structured recommendation with reasoning

---

## 🎓 Usage Examples

### Example 1: Quick Vibe Check

**You ask:**
```
Quick vibe check on Ethereum, thinking about buying
```

**AI responds in < 30 seconds:**
```
🎯 VIBE CHECK: Ethereum (ETH)

Quick Take: CAUTIOUSLY BULLISH

Price: $2,315
Fibonacci Support: $2,100 (38.2%) | Resistance: $2,500
RSI: 62 (healthy momentum)
Trend: Above all MAs 📈

✅ Strong fundamentals
✅ Positive funding rates
⚠️  Overbought on 4hr RSI

Sentiment: 71% Bullish

Verdict: Solid long-term hold, consider waiting for
dip to $2,100 for better entry. Stop below $1,950.

Want deeper analysis? (Reply 'yes')
```

### Example 2: Deep Stock Analysis

**You ask:**
```
Give me a comprehensive analysis of NVIDIA (NVDA)
```

**AI responds with:**
- **Fundamental Analysis** - Revenue growth, margins, cash flow, valuation
- **Technical Analysis** - Fibonacci levels, RSI, MACD, chart patterns
- **Sentiment Analysis** - News tone, social media buzz, analyst ratings
- **Risk Assessment** - Beta, volatility, position sizing recommendations
- **Trade Setup** - Entry price, stop-loss, targets, risk/reward ratio

**Output:** Structured JSON + Natural language explanation + HTML report

### Example 3: Portfolio Review

**You ask:**
```
Review my portfolio and suggest rebalancing
```

**AI analyzes:**
- Current vs target allocation
- Correlation matrix
- Risk concentration
- Tax implications
- Specific buy/sell recommendations

### Example 4: Research Question

**You ask:**
```
What are the best AI semiconductor stocks right now?
```

**AI delivers:**
- Screened list of AI chip companies
- Ranked by fundamental + technical scores
- Portfolio allocation suggestions
- Entry points and risk levels

---

## 💰 Cost Structure

### Free Tier (Start Here)

**Monthly Cost: $0-20**

**Included:**
- Unlimited analyses
- Free API data sources
- 10 specialized AI agents
- Database (self-hosted PostgreSQL)
- HTML report generation

**Limitations:**
- Daily API rate limits (25-250 calls/day depending on source)
- No real-time data (15min+ delayed)
- Manual report generation

**Perfect for:** Learning, backtesting, long-term investing

### Tier 1: Enhanced Data ($50-100/mo)

**Unlock:**
- Real-time stock data (Polygon.io $29/mo)
- Premium crypto data (CoinGecko Analyst $129/mo or just use free tier)
- Enhanced news feeds

**New Capabilities:**
- Intraday trading signals
- Real-time portfolio tracking
- Options flow analysis

### Tier 2: Advanced Analytics ($150-300/mo)

**Unlock:**
- Alternative data sources
- Premium sentiment data (LunarCrush, Santiment)
- Backtesting infrastructure

### Tier 3: Execution & Automation ($300-500/mo)

**Unlock:**
- Broker API integration (Alpaca, Interactive Brokers)
- Automated execution
- Tax-loss harvesting
- Advanced portfolio optimization

### Tier 4: Institutional ($1000+/mo)

**Unlock:**
- S&P Global Capital IQ
- FactSet integration
- Bloomberg Terminal data access

---

## 🏗️ Architecture Overview

### The Agent Team

**Core Analysts:**
1. **Fundamental Analyst** - Financials, valuation, business quality
2. **Technical Analyst** - Charts, Fibonacci, indicators
3. **Sentiment Analyst** - News, social, institutional signals
4. **Risk Manager** - Portfolio protection, position sizing
5. **Macro Analyst** - Economic trends, market cycles

**Specialists:**
6. **Crypto On-Chain Analyst** - Blockchain data, whale tracking
7. **Earnings/News Monitor** - Corporate events, SEC filings

**Strategic:**
8. **Portfolio Manager** - Asset allocation, rebalancing
9. **Vibe Validator** - Quick investment checks (30 seconds)
10. **Report Generator** - Documentation, memos, HTML reports

### How Agents Collaborate

```
User Query
    ↓
Router Agent (identifies type of analysis needed)
    ↓
┌──────────────────────────────────────────────┐
│  Parallel Agent Execution:                   │
│  • Fundamental → Financial analysis          │
│  • Technical → Chart patterns & levels       │
│  • Sentiment → News & social media          │
│  • Risk → Portfolio impact assessment        │
└──────────────────────────────────────────────┘
    ↓
Portfolio Manager (synthesizes all insights)
    ↓
Report Generator (creates documentation)
    ↓
User receives comprehensive analysis
```

### Technology Stack

**AI & LLM:**
- Claude 4 Sonnet (primary reasoning)
- OpenAI Embeddings (vector search)
- LangChain (agent orchestration)

**Data:**
- PostgreSQL + pgvector (primary database)
- Qdrant (vector similarity search - optional)
- Redis (caching - optional)

**Integration:**
- MCP Servers (Model Context Protocol)
- Free API sources (Alpha Vantage, Finnhub, CoinGecko)
- Premium APIs (Polygon.io, S&P Global - optional)

**Automation:**
- n8n workflows (scheduled tasks)
- Python scripts (data processing)

---

## 🗄️ Database Setup (Optional but Recommended)

### Why You Need a Database

- **Portfolio tracking** - Track positions, transactions, performance
- **Analysis caching** - Avoid re-analyzing same stocks
- **Historical insights** - Learn from past analyses
- **Vector search** - Semantic search across research

### Quick Setup

**1. Install PostgreSQL:**
```bash
# macOS
brew install postgresql

# Windows
# Download from https://www.postgresql.org/download/

# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib
```

**2. Create Database:**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database and user
CREATE DATABASE investment_db;
CREATE USER invest_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE investment_db TO invest_user;
\q
```

**3. Enable pgvector:**
```bash
psql -U postgres -d investment_db
CREATE EXTENSION vector;
\q
```

**4. Run Schema:**
```bash
psql -U invest_user -d investment_db -f database/schema.sql
```

**5. Update .env:**
```
DATABASE_URL=postgresql://invest_user:your_password@localhost:5432/investment_db
```

### Cloud Alternative (No Setup)

Use **Supabase** (free tier):
1. Sign up at https://supabase.com
2. Create project
3. Get connection string
4. Run `database/schema.sql` in Supabase SQL editor

---

## 📊 Example Workflows

### Daily Morning Routine

**AI Command:**
```
"Give me my daily investment briefing"
```

**What Happens:**
1. Checks overnight market moves
2. Scans your portfolio for significant changes
3. Looks for earnings/news on holdings
4. Identifies new opportunities
5. Generates summary email

**Output:** 2-3 page HTML report delivered to email

### New Investment Idea

**AI Command:**
```
"I'm interested in renewable energy stocks, what do you recommend?"
```

**What Happens:**
1. Screens renewable sector stocks
2. Filters by fundamental quality
3. Ranks by technical strength + valuation
4. Provides top 5 picks with reasoning
5. Suggests portfolio allocation

### Pre-Earnings Analysis

**AI Command:**
```
"Apple earnings tomorrow, what should I expect?"
```

**What Happens:**
1. Analyzes consensus estimates
2. Reviews historical earnings patterns
3. Checks sentiment leading up to event
4. Calculates potential price moves
5. Recommends position adjustments

---

## 🔐 Security & Best Practices

### API Key Management

**DO:**
✅ Store keys in `.env` file (gitignored)
✅ Use environment variables
✅ Rotate keys quarterly
✅ Use password manager (1Password, Bitwarden)

**DON'T:**
❌ Commit `.env` to git
❌ Share keys in screenshots
❌ Use same keys across projects
❌ Store in plain text files

### Trading Safety

**If using execution features (Tier 3+):**

⚠️ **ALWAYS paper trade first (6+ months)**
⚠️ Set position size limits (max 5% per position)
⚠️ Implement daily loss limits
⚠️ Require manual approval for trades >$1000
⚠️ Use comprehensive logging
⚠️ Start with small amounts ($500-1000)

### Compliance

- This system is for **personal use only**
- NOT financial advice
- Backtesting ≠ future performance
- Understand regulations in your jurisdiction
- Consult licensed advisors for major decisions

---

## 🛠️ Troubleshooting

### MCP Servers Not Connecting

**Symptoms:** Claude says "I don't have access to financial data"

**Solutions:**
1. Check Claude Desktop → Settings → MCP Servers (should show green status)
2. Restart Claude Desktop
3. Verify Node.js installed: `node --version`
4. Try manual install: `npm install -g @financial-datasets/mcp-server`
5. Check logs in Claude Desktop settings

### API Rate Limits

**Symptoms:** "API quota exceeded" errors

**Solutions:**
1. Check rate limits in `.env` file
2. Implement caching (use database)
3. Spread requests over time
4. Upgrade to paid API tiers
5. Use multiple API keys (round-robin)

### Database Connection Issues

**Symptoms:** "Connection refused" or "authentication failed"

**Solutions:**
1. Verify PostgreSQL is running: `pg_isready`
2. Check connection string in `.env`
3. Verify user permissions
4. Check firewall settings
5. Try connecting manually: `psql -U invest_user -d investment_db`

### Slow Analysis Speed

**Symptoms:** Analysis takes > 60 seconds

**Solutions:**
1. Enable caching in database
2. Use "quick mode" for fast checks
3. Reduce number of data sources
4. Pre-fetch common symbols
5. Consider using Redis for caching

---

## 📚 Learning Resources

### Understanding the System

1. **Start:** Read `claude.md` (comprehensive architecture)
2. **Then:** Read `agent.md` (agent details and prompts)
3. **Practice:** Run sample analyses in Claude Desktop
4. **Customize:** Modify prompts in `agent.md` for your style

### Investment Education

**Free Resources:**
- Investopedia (basics) - https://www.investopedia.com
- Corporate Finance Institute (fundamentals) - https://corporatefinanceinstitute.com
- TradingView Education (technical analysis) - https://www.tradingview.com/education/

**Technical Analysis:**
- Fibonacci Retracements explained
- RSI and MACD indicators
- Support and resistance levels
- Chart pattern recognition

**Fundamental Analysis:**
- Financial statement analysis
- Valuation methods (DCF, comparable companies)
- Industry analysis frameworks
- Competitive advantage assessment

### GitHub Projects to Study

**Inspiration:**
- FinRobot - https://github.com/AI4Finance-Foundation/FinRobot
- TradingAgents - https://github.com/TauricResearch/TradingAgents
- InvestMCP - https://github.com/arrpitk/InvestMCP

---

## 🎯 Roadmap & Future Features

### Phase 1: Core System (✅ Complete)
- [x] Multi-agent architecture
- [x] Free API integrations
- [x] Database schema
- [x] MCP server configuration
- [x] HTML report templates
- [x] Documentation

### Phase 2: Enhanced Analysis (Next)
- [ ] Python implementation of agents
- [ ] Backtesting framework
- [ ] Portfolio tracking dashboard
- [ ] Automated daily reports
- [ ] Mobile-responsive web interface

### Phase 3: Automation (Future)
- [ ] n8n workflow templates
- [ ] Email/Slack notifications
- [ ] Scheduled analysis tasks
- [ ] Alert system for price targets
- [ ] Auto-rebalancing recommendations

### Phase 4: Advanced Features (Future)
- [ ] Options strategy analyzer
- [ ] Machine learning price predictions
- [ ] Correlation analysis across assets
- [ ] Tax-loss harvesting automation
- [ ] Social sentiment trending

### Phase 5: Execution (Advanced Users)
- [ ] Broker API integration (Alpaca)
- [ ] Paper trading mode
- [ ] Automated execution (with safeguards)
- [ ] Performance tracking
- [ ] Trade journal automation

---

## 🤝 Contributing & Customization

### Customizing Agents

Want to modify how agents analyze?

1. Open `agent.md`
2. Find the agent you want to customize
3. Edit the system prompt
4. Test in Claude Desktop
5. Iterate based on results

**Example:** Make the Fundamental Analyst more focused on growth stocks:
- Add emphasis on revenue growth vs profitability
- Prioritize TAM (Total Addressable Market) analysis
- Adjust P/E ratio tolerance for high-growth companies

### Adding New Agents

Create a new specialist agent:

1. Define role and specialization
2. Specify data sources needed
3. Write system prompt
4. Create output format
5. Test and refine

**Example Ideas:**
- ESG Analyst (environmental, social, governance)
- Dividend Income Specialist
- Crypto DeFi Protocol Analyzer
- Real Estate Investment Trust (REIT) Analyst

---

## ⚖️ Disclaimer

**READ THIS CAREFULLY:**

This system is for **EDUCATIONAL and RESEARCH purposes ONLY**. It does NOT constitute:
- Financial advice
- Investment recommendations
- Offers to buy or sell securities
- Professional investment counsel

**Important Points:**
- All investment decisions carry risk
- Past performance ≠ future results
- AI analysis may contain errors or inaccuracies
- Always do your own research (DYOR)
- Consult licensed financial advisors for major decisions
- Start with paper trading before real money
- Understand tax implications in your jurisdiction

**Regulatory Compliance:**
- This is a personal research tool
- Not for commercial use without proper licensing
- Not for managing others' money
- Comply with all securities laws in your region

**USE AT YOUR OWN RISK.**

---

## 📞 Support & Community

### Getting Help

**Issues with setup?**
1. Check troubleshooting section above
2. Review `claude.md` for detailed setup instructions
3. Verify all prerequisites are installed
4. Test components individually

**Want to discuss strategies?**
- This is a personal tool - be careful sharing publicly
- Consider joining investment communities (Reddit r/investing, r/stocks)
- Always maintain operational security (don't reveal positions)

### Feedback & Improvements

Found a bug or have a suggestion?
- Document the issue
- Include reproduction steps
- Share (if not sensitive)

---

## 🙏 Acknowledgments

Built with:
- **Claude AI** by Anthropic (primary reasoning engine)
- **MCP Protocol** (Model Context Protocol)
- **Open source financial APIs** (Alpha Vantage, Finnhub, CoinGecko)
- **PostgreSQL** + pgvector (database)
- Inspiration from TradingAgents, FinRobot, and other open-source projects

---

## 📄 License

**Personal Use Only**

This system is provided as-is for personal educational and research purposes.

Redistribution, commercial use, or managing third-party funds requires:
- Proper financial licenses
- Regulatory compliance
- Professional liability insurance
- Legal consultation

**Components:**
- Original code/documentation: Personal use only
- Third-party APIs: Subject to their respective terms of service
- Claude AI: Subject to Anthropic's usage policies

---

## 🚀 Ready to Start?

**Next Steps:**

1. ✅ **You've read this README**
2. 📖 **Read `claude.md`** for full architecture
3. 🔑 **Get free API keys** (15 minutes)
4. ⚙️ **Configure MCP servers** (10 minutes)
5. 🎯 **Run your first analysis** (5 minutes)

**Total time to first analysis: 30 minutes**

**First command to try:**
```
"Quick vibe check on [your favorite stock]"
```

**Then try:**
```
"Give me a comprehensive analysis of [ticker]"
```

---

## 📬 Version Info

- **Version:** 1.0
- **Last Updated:** January 15, 2025
- **Platform:** Claude AI with MCP Servers
- **Status:** Production Ready (Free Tier)

---

**Happy Investing! 📈🤖**

*Remember: The best investment is in your own education. Use this tool to learn, not just to trade.*
