# Investment Analysis AI Agents - Detailed Specifications

## Table of Contents
1. [Agent Overview](#agent-overview)
2. [Core Analysis Agents](#core-analysis-agents)
3. [Specialized Agents](#specialized-agents)
4. [Strategic Agents](#strategic-agents)
5. [Agent Communication Protocol](#agent-communication-protocol)
6. [Prompt Engineering](#prompt-engineering)
7. [Decision-Making Framework](#decision-making-framework)
8. [Performance Metrics](#performance-metrics)

---

## Agent Overview

### Agent Design Principles

Each agent in the investment analysis system follows these core principles:

1. **Single Responsibility**: Each agent has one specialized domain
2. **Explicit Reasoning**: All conclusions include transparent logic chains
3. **Data Citations**: Every claim references specific data points
4. **Confidence Scoring**: Recommendations include certainty levels (0-100%)
5. **Risk Awareness**: Agents acknowledge limitations and uncertainties

### Agent Base Template

```yaml
agent_name: [Agent Name]
specialization: [Domain expertise]
primary_role: [Main function]
data_sources: [List of APIs/data]
output_format: Structured JSON + natural language
temperature: 0.3  # Lower for consistency
max_tokens: 4096
```

### Common Agent Capabilities

All agents can:
- Access historical analysis from database
- Perform vector similarity search on past research
- Cache results to minimize API calls
- Operate in "quick mode" (30s) or "deep mode" (5min)
- Provide explanations at multiple technical levels

---

## Core Analysis Agents

### 1. Fundamental Analyst

**Role**: Deep dive into company financials and business fundamentals

#### System Prompt

```
You are an expert Fundamental Analyst specializing in equity research. Your role is to analyze company financial statements, business models, and competitive positioning to determine intrinsic value.

ANALYSIS FRAMEWORK:
1. Financial Health Assessment
   - Revenue trends (3-5 year analysis)
   - Profitability metrics (gross/operating/net margins)
   - Cash flow quality (operating CF, free CF)
   - Balance sheet strength (debt ratios, liquidity)

2. Valuation Analysis
   - P/E ratio vs. industry and historical averages
   - PEG ratio (P/E to growth)
   - Price-to-Book, Price-to-Sales
   - DCF model (when sufficient data)
   - Comparable company analysis

3. Business Quality
   - Competitive advantages (moat)
   - Management effectiveness (ROIC, capital allocation)
   - Industry positioning
   - Growth prospects

4. Red Flags to Check
   - Declining margins
   - Rising debt without revenue growth
   - Deteriorating cash conversion
   - Accounting irregularities
   - Management turnover

OUTPUT FORMAT:
- Rating: Strong Buy / Buy / Hold / Sell / Strong Sell
- Confidence: 0-100% (based on data quality and clarity)
- Fair Value Estimate: $X (with range)
- Key Metrics Summary (table format)
- Investment Thesis (2-3 paragraphs)
- Risk Factors (bullet points)
- Data Sources (citations)

CONSTRAINTS:
- Use only verified financial data from official sources
- Acknowledge data gaps or uncertainties
- Compare to sector averages and competitors
- Consider macroeconomic context
- Flag if analysis is limited by data availability

Always provide specific numbers with units and timeframes.
```

#### Data Sources Priority

1. **Primary**: SEC filings (10-K, 10-Q) via Financial Datasets API
2. **Secondary**: Financial Modeling Prep for calculated metrics
3. **Tertiary**: Alpha Vantage for historical trends
4. **Validation**: Yahoo Finance for cross-reference

#### Analysis Workflow

```python
def fundamental_analysis(symbol: str, depth: str = "standard") -> dict:
    """
    Perform fundamental analysis on a stock

    Args:
        symbol: Stock ticker (e.g., "AAPL")
        depth: "quick" | "standard" | "deep"

    Returns:
        {
            "rating": str,
            "confidence": float,
            "fair_value": float,
            "fair_value_range": [low, high],
            "metrics": {
                "revenue_growth_3y": float,
                "operating_margin": float,
                "roe": float,
                "debt_to_equity": float,
                "pe_ratio": float,
                "peg_ratio": float,
                ...
            },
            "thesis": str,
            "risks": [str],
            "data_quality": str,
            "timestamp": datetime
        }
    """
    # 1. Fetch financial statements (income, balance, cash flow)
    # 2. Calculate key metrics
    # 3. Perform valuation analysis
    # 4. Compare to peers and sector
    # 5. Generate investment thesis
    # 6. Identify risk factors
    # 7. Assign rating and confidence
    pass
```

#### Example Output

```json
{
  "symbol": "AAPL",
  "rating": "BUY",
  "confidence": 82,
  "fair_value": 195,
  "fair_value_range": [180, 210],
  "current_price": 175,
  "upside_potential": 11.4,
  "metrics": {
    "revenue_ttm": "383.3B",
    "revenue_growth_3y": "7.8%",
    "operating_margin": "30.1%",
    "net_margin": "25.3%",
    "roe": "160.5%",
    "roic": "55.2%",
    "free_cash_flow": "99.6B",
    "debt_to_equity": "1.63",
    "current_ratio": "0.93",
    "pe_ratio": 28.5,
    "peg_ratio": 2.1,
    "pe_vs_sector": "+35%",
    "dividend_yield": "0.5%"
  },
  "thesis": "Apple demonstrates exceptional business quality with industry-leading margins (30% operating) and capital efficiency (160% ROE). The company generates massive free cash flow ($100B annually) supporting both shareholder returns and R&D investment. While trading at a premium valuation (P/E: 28.5 vs sector 21), this is justified by sustainable competitive advantages including ecosystem lock-in, brand strength, and recurring services revenue. The ongoing shift to services (22% of revenue, growing 16% YoY) provides multiple expansion opportunity.",
  "positives": [
    "Exceptional capital efficiency (ROE: 160%, ROIC: 55%)",
    "Strong cash generation ($100B FCF annually)",
    "Growing services revenue (16% YoY, higher margins)",
    "Dominant ecosystem with high switching costs",
    "Share buyback program ($90B annually) supports EPS growth"
  ],
  "risks": [
    "Premium valuation limits upside (P/E: 28.5, PEG: 2.1)",
    "iPhone revenue concentration (52% of sales)",
    "Regulatory pressure on App Store fees (antitrust)",
    "China exposure (19% of revenue, geopolitical risk)",
    "Slowing hardware growth in mature markets"
  ],
  "data_quality": "Excellent - Full financials available",
  "last_updated": "2025-01-15T14:30:00Z"
}
```

---

### 2. Technical Analyst

**Role**: Chart analysis, pattern recognition, and trading signals

#### System Prompt

```
You are an expert Technical Analyst specializing in price action, chart patterns, and technical indicators. Your role is to identify optimal entry/exit points and short to medium-term price trends.

ANALYSIS FRAMEWORK:
1. Trend Identification
   - Primary trend (daily/weekly charts)
   - Support and resistance levels
   - Moving averages (20/50/200 SMA/EMA)
   - Trend strength indicators

2. Fibonacci Analysis
   - Calculate retracement levels (23.6%, 38.2%, 50%, 61.8%, 78.6%)
   - Identify extension targets
   - Determine current position in Fibonacci structure
   - Highlight key support/resistance zones

3. Momentum Indicators
   - RSI (Relative Strength Index): Overbought/oversold
   - MACD: Trend direction and momentum
   - Stochastic Oscillator: Entry/exit signals
   - Volume analysis: Confirm price movements

4. Chart Patterns
   - Continuation patterns (flags, triangles, rectangles)
   - Reversal patterns (head & shoulders, double top/bottom)
   - Candlestick patterns (doji, engulfing, hammer)
   - Pattern completion and targets

5. Risk Management Levels
   - Optimal entry price
   - Stop-loss placement
   - Take-profit targets (conservative, moderate, aggressive)
   - Risk-reward ratio

OUTPUT FORMAT:
- Signal: Strong Buy / Buy / Neutral / Sell / Strong Sell
- Confidence: 0-100%
- Entry Range: $X - $Y
- Stop Loss: $Z
- Targets: [T1, T2, T3]
- Risk/Reward: X:Y ratio
- Key Levels (support/resistance)
- Chart narrative (explain the setup)

CONSTRAINTS:
- Use multiple timeframes (15min, 1hr, 4hr, daily, weekly)
- Never rely on single indicator
- Acknowledge false signal risks
- Consider volume confirmation
- Account for market conditions (trending vs ranging)

Always provide specific price levels, not vague descriptions.
```

#### Key Indicators Calculated

```python
# Fibonacci Retracement
def calculate_fibonacci(high: float, low: float, trend: str = "uptrend") -> dict:
    """
    Calculate Fibonacci retracement levels

    Returns:
        {
            "0.0": low,
            "23.6": level,
            "38.2": level,
            "50.0": level,
            "61.8": level,
            "78.6": level,
            "100.0": high,
            "extension_161.8": level,
            "extension_261.8": level
        }
    """
    diff = high - low
    if trend == "uptrend":
        return {
            "0.0": low,
            "23.6": high - (diff * 0.236),
            "38.2": high - (diff * 0.382),
            "50.0": high - (diff * 0.500),
            "61.8": high - (diff * 0.618),
            "78.6": high - (diff * 0.786),
            "100.0": high,
            "extension_161.8": high + (diff * 0.618),
            "extension_261.8": high + (diff * 1.618)
        }
    # Downtrend calculation...

# RSI
def calculate_rsi(prices: list, period: int = 14) -> float:
    """Relative Strength Index (0-100)"""
    # Implementation using pandas/ta-lib

# MACD
def calculate_macd(prices: list) -> dict:
    """
    MACD (Moving Average Convergence Divergence)

    Returns:
        {
            "macd_line": float,
            "signal_line": float,
            "histogram": float,
            "signal": "bullish" | "bearish" | "neutral"
        }
    """
    # Implementation

# Volume Profile
def analyze_volume(prices: list, volumes: list, period: int = 20) -> dict:
    """
    Volume analysis

    Returns:
        {
            "avg_volume": float,
            "current_volume_ratio": float,  # vs average
            "volume_trend": "increasing" | "decreasing",
            "volume_confirmation": bool
        }
    """
```

#### Example Output

```json
{
  "symbol": "NVDA",
  "signal": "BUY",
  "confidence": 78,
  "timeframe": "Daily",
  "current_price": 482.50,

  "fibonacci_levels": {
    "swing_high": 505.48,
    "swing_low": 405.20,
    "current_position": "Near 38.2% retracement",
    "levels": {
      "23.6": 481.80,
      "38.2": 467.12,
      "50.0": 455.34,
      "61.8": 443.56,
      "extension_161.8": 567.45
    }
  },

  "support_levels": [467.12, 455.34, 443.56],
  "resistance_levels": [495.00, 505.48, 520.00],

  "indicators": {
    "rsi_14": {
      "value": 58,
      "signal": "Neutral (healthy)",
      "interpretation": "Not overbought or oversold"
    },
    "macd": {
      "macd_line": 12.5,
      "signal_line": 10.2,
      "histogram": 2.3,
      "signal": "Bullish crossover",
      "strength": "Moderate"
    },
    "moving_averages": {
      "sma_20": 475.30,
      "sma_50": 465.80,
      "sma_200": 420.15,
      "signal": "Above all MAs - bullish trend"
    },
    "volume": {
      "current_vs_avg": 1.15,
      "trend": "Slightly above average",
      "confirmation": true
    }
  },

  "chart_pattern": {
    "pattern": "Bull flag consolidation",
    "status": "Forming",
    "breakout_level": 490,
    "target_on_breakout": 530,
    "probability": "65%"
  },

  "trade_setup": {
    "entry_range": [475, 482],
    "optimal_entry": 477,
    "stop_loss": 467,
    "targets": [
      {"level": 495, "type": "conservative"},
      {"level": 510, "type": "moderate"},
      {"level": 530, "type": "aggressive"}
    ],
    "risk_reward_ratio": "1:2.8",
    "position_size_recommendation": "2-3% of portfolio"
  },

  "narrative": "NVDA is in a strong uptrend, currently consolidating near the 38.2% Fibonacci retracement level ($467) after a strong move from $405 to $505. The stock is holding above all major moving averages, indicating bullish momentum. RSI at 58 shows room for upside without being overbought. MACD shows a recent bullish crossover, confirming positive momentum. Volume is slightly elevated, supporting the current price action. A bull flag pattern is forming, suggesting continuation higher if resistance at $490 is breached. Entry in the $475-482 range offers good risk/reward with stop below the 50% Fib level at $467.",

  "timeframe_confluence": {
    "15min": "Bullish",
    "1hr": "Bullish",
    "4hr": "Bullish",
    "daily": "Bullish",
    "weekly": "Strong Bullish"
  },

  "risks": [
    "Market-wide selloff could trigger stop loss",
    "Bull flag pattern could fail (35% probability)",
    "Resistance at $490-495 level has been tested twice",
    "High beta (2.1) means amplified market moves"
  ],

  "last_updated": "2025-01-15T14:35:00Z"
}
```

---

### 3. Sentiment Analyst

**Role**: Gauge market psychology and social sentiment

#### System Prompt

```
You are an expert Sentiment Analyst specializing in market psychology, social media analysis, and news sentiment. Your role is to quantify the emotional and psychological state of market participants regarding specific assets.

ANALYSIS FRAMEWORK:
1. News Sentiment Analysis
   - Aggregate sentiment from financial news (past 7 days)
   - Weight by source credibility (Bloomberg > Reddit)
   - Identify sentiment shifts and catalysts
   - Track headline tone and keyword frequency

2. Social Media Monitoring
   - Reddit (r/wallstreetbets, r/stocks, r/investing)
   - Twitter/X (fintwit influencers, keyword tracking)
   - Discord communities (crypto-specific)
   - Sentiment polarity (-1 to +1 scale)
   - Volume of mentions (buzz factor)

3. Institutional Signals
   - Analyst upgrades/downgrades
   - Institutional ownership changes (13F filings)
   - Options flow (unusual activity)
   - Insider trading (buys vs sells)
   - Short interest trends

4. Market Psychology Indicators
   - Put/Call ratio
   - Fear & Greed Index
   - Crypto Fear & Greed Index
   - VIX (for market-wide sentiment)
   - Funding rates (crypto futures)

5. Contrarian Indicators
   - Extreme sentiment levels (90%+ bullish/bearish)
   - Retail vs institutional divergence
   - Sentiment vs price action divergence

OUTPUT FORMAT:
- Overall Sentiment: Very Bearish / Bearish / Neutral / Bullish / Very Bullish
- Sentiment Score: -100 to +100
- Confidence: 0-100%
- Breakdown by source (news, social, institutional)
- Notable mentions and quotes
- Sentiment trend (improving/deteriorating)
- Contrarian signals (if any)
- Catalysts identified

CONSTRAINTS:
- Distinguish between noise and signal
- Weight by source quality and reach
- Consider sentiment vs fundamentals divergence
- Flag manipulation attempts (pump & dump patterns)
- Acknowledge limitations of sentiment data

Provide specific examples and quotes to support sentiment assessment.
```

#### Data Collection Methods

```python
def analyze_sentiment(symbol: str, lookback_days: int = 7) -> dict:
    """
    Comprehensive sentiment analysis

    Returns:
        {
            "overall_score": int,  # -100 to +100
            "sentiment_label": str,
            "confidence": float,
            "news_sentiment": {...},
            "social_sentiment": {...},
            "institutional_sentiment": {...},
            "contrarian_signals": [...],
            "trending_keywords": [...],
            "sentiment_trend": str
        }
    """
    # 1. Fetch news articles
    news_articles = fetch_news(symbol, days=lookback_days)
    news_sentiment = analyze_news_sentiment(news_articles)

    # 2. Scrape social media
    reddit_posts = fetch_reddit(symbol, subreddits=["wallstreetbets", "stocks"])
    twitter_mentions = fetch_twitter(symbol, influencers=True)
    social_sentiment = analyze_social_sentiment(reddit_posts, twitter_mentions)

    # 3. Institutional signals
    analyst_ratings = fetch_analyst_ratings(symbol)
    options_flow = fetch_options_activity(symbol)
    institutional_sentiment = analyze_institutional_signals(analyst_ratings, options_flow)

    # 4. Synthesize
    overall = synthesize_sentiment(news_sentiment, social_sentiment, institutional_sentiment)

    return overall
```

#### Example Output

```json
{
  "symbol": "TSLA",
  "overall_sentiment": "Bullish",
  "sentiment_score": 68,
  "confidence": 75,
  "analysis_period": "Past 7 days",

  "news_sentiment": {
    "score": 72,
    "label": "Moderately Bullish",
    "article_count": 145,
    "positive": 58,
    "neutral": 25,
    "negative": 17,
    "top_sources": {
      "Bloomberg": 65,
      "CNBC": 70,
      "Reuters": 68,
      "Seeking Alpha": 75
    },
    "key_themes": [
      "Strong Q4 deliveries beat expectations",
      "China Gigafactory expansion progress",
      "FSD beta improvements getting positive reviews",
      "Price cuts boosting volume in Europe"
    ],
    "sample_headlines": [
      "Tesla Delivers Record 484K Vehicles in Q4, Beats Estimates (Bloomberg, +85 sentiment)",
      "Analysts Raise Price Targets After Delivery Beat (CNBC, +78 sentiment)",
      "Competition Intensifying in EV Market (Reuters, -40 sentiment)"
    ]
  },

  "social_sentiment": {
    "score": 71,
    "label": "Bullish",
    "mention_volume": "Very High (12,450 mentions)",
    "volume_vs_average": "+340%",

    "reddit": {
      "score": 65,
      "r_wallstreetbets": {
        "sentiment": 70,
        "posts": 2850,
        "top_post": "'TSLA to 500 EOW' - 8.2k upvotes",
        "bullish_keywords": ["moon", "calls", "buy the dip"],
        "bearish_keywords": ["overvalued", "competition"]
      },
      "r_stocks": {
        "sentiment": 60,
        "posts": 450,
        "discussion_tone": "Cautiously optimistic"
      }
    },

    "twitter": {
      "score": 77,
      "mentions": 8920,
      "influencer_sentiment": 80,
      "notable_mentions": [
        "@ARKInvest: Reiterating $2000 price target (500k followers)",
        "@GaryBlack00: Delivery beat confirms demand strength (125k followers)"
      ],
      "trending_hashtags": ["#TSLA", "#ElectricVehicles", "#TeslaBull"]
    }
  },

  "institutional_sentiment": {
    "score": 62,
    "label": "Moderately Bullish",

    "analyst_ratings": {
      "upgrades_7d": 5,
      "downgrades_7d": 1,
      "current_consensus": "Buy",
      "avg_price_target": 295,
      "vs_current_price": "+15%",
      "rating_distribution": {
        "strong_buy": 12,
        "buy": 18,
        "hold": 15,
        "sell": 3,
        "strong_sell": 1
      }
    },

    "options_flow": {
      "put_call_ratio": 0.45,
      "interpretation": "Bullish (more calls than puts)",
      "unusual_activity": "Large call volume at $280 strike (Mar expiry)",
      "net_flow": "+$45M bullish"
    },

    "insider_trading": {
      "last_30d_buys": 2,
      "last_30d_sells": 5,
      "net_direction": "Slightly bearish",
      "note": "CEO regular diversification sales"
    },

    "institutional_ownership": {
      "q4_change": "+2.3%",
      "trend": "Increasing",
      "top_buyers": ["ARK Innovation ETF", "Vanguard"]
    }
  },

  "sentiment_trend": {
    "direction": "Improving",
    "7d_change": "+15 points",
    "momentum": "Strong",
    "inflection_points": [
      "Jan 10: Delivery numbers released (spike +25 points)",
      "Jan 12: Analyst upgrades began (+10 points)"
    ]
  },

  "contrarian_signals": [
    "WSB mention volume +340% (possible overheating)",
    "Retail vs institutional divergence (retail more bullish)",
    "Sentiment at 68 - approaching extreme optimism zone (>75)"
  ],

  "catalysts": [
    "Q4 earnings call (Jan 24) - high anticipation",
    "FSD beta wider rollout expected this month",
    "Potential India factory announcement"
  ],

  "risks": [
    "Sentiment-driven rallies can reverse quickly",
    "High WSB interest often precedes volatility",
    "Retail euphoria can be contrarian indicator",
    "Competition narrative building in media"
  ],

  "last_updated": "2025-01-15T14:40:00Z"
}
```

---

### 4. Risk Manager

**Role**: Portfolio protection, position sizing, and risk assessment

#### System Prompt

```
You are an expert Risk Manager specializing in portfolio risk assessment, position sizing, and capital preservation. Your role is to identify and quantify risks, recommend protective measures, and optimize portfolio construction for risk-adjusted returns.

ANALYSIS FRAMEWORK:
1. Position-Level Risk
   - Individual position volatility (beta, standard deviation)
   - Maximum drawdown potential
   - Stop-loss placement recommendations
   - Position size as % of portfolio
   - Concentration risk

2. Portfolio-Level Risk
   - Portfolio beta and volatility
   - Value at Risk (VaR) - 95% and 99% confidence
   - Maximum expected drawdown
   - Sharpe ratio (risk-adjusted returns)
   - Sortino ratio (downside risk focus)
   - Correlation matrix analysis

3. Diversification Assessment
   - Asset class distribution
   - Sector concentration
   - Geographic exposure
   - Correlation between holdings
   - Diversification score (0-100)

4. Market Risk Factors
   - Interest rate sensitivity
   - Inflation exposure
   - Currency risk (for international holdings)
   - Liquidity risk
   - Geopolitical risk factors

5. Scenario Analysis
   - Bull case portfolio performance
   - Base case portfolio performance
   - Bear case portfolio performance
   - Black swan event stress test
   - Historical crisis scenario replay (2008, 2020)

OUTPUT FORMAT:
- Overall Risk Rating: Very Low / Low / Moderate / High / Very High
- Risk Score: 0-100 (higher = riskier)
- Value at Risk (95%): $X maximum 1-day loss
- Recommended Actions: [list of specific steps]
- Position sizing recommendations
- Stop-loss levels for each holding
- Hedging suggestions (if appropriate)
- Rebalancing opportunities

CONSTRAINTS:
- Consider user's risk tolerance (conservative/moderate/aggressive)
- Account for time horizon
- Factor in liquidity needs
- Acknowledge model limitations
- Provide specific, actionable recommendations

Always quantify risks with specific numbers and probabilities.
```

#### Risk Calculations

```python
def assess_portfolio_risk(portfolio: dict, market_data: dict) -> dict:
    """
    Comprehensive portfolio risk assessment

    Args:
        portfolio: {
            "positions": [{"symbol": str, "shares": int, "cost_basis": float}],
            "cash": float,
            "risk_tolerance": "conservative" | "moderate" | "aggressive"
        }
        market_data: Historical prices and volatility data

    Returns:
        {
            "risk_score": int,
            "risk_rating": str,
            "var_95": float,
            "max_drawdown": float,
            "sharpe_ratio": float,
            "beta": float,
            "position_risks": [...],
            "recommendations": [...]
        }
    """
    # Calculate portfolio metrics
    portfolio_value = calculate_portfolio_value(portfolio)
    returns = calculate_historical_returns(portfolio, market_data)
    volatility = calculate_portfolio_volatility(returns)
    beta = calculate_portfolio_beta(returns, market_data["SPY"])

    # Risk metrics
    var_95 = calculate_var(returns, confidence=0.95)
    var_99 = calculate_var(returns, confidence=0.99)
    max_dd = calculate_max_drawdown(returns)
    sharpe = calculate_sharpe_ratio(returns)

    # Correlation analysis
    correlation_matrix = calculate_correlation_matrix(portfolio, market_data)
    diversification_score = calculate_diversification(correlation_matrix)

    # Position-level analysis
    position_risks = []
    for position in portfolio["positions"]:
        pos_risk = analyze_position_risk(position, market_data)
        position_risks.append(pos_risk)

    # Generate recommendations
    recommendations = generate_risk_recommendations(
        portfolio_value, volatility, position_risks, correlation_matrix
    )

    return {
        "risk_score": calculate_risk_score(volatility, beta, diversification_score),
        "risk_rating": map_score_to_rating(risk_score),
        "var_95": var_95,
        "var_99": var_99,
        "max_drawdown": max_dd,
        "sharpe_ratio": sharpe,
        "beta": beta,
        "volatility_annual": volatility * (252 ** 0.5),  # Annualized
        "diversification_score": diversification_score,
        "position_risks": position_risks,
        "correlation_matrix": correlation_matrix,
        "recommendations": recommendations
    }
```

#### Example Output

```json
{
  "portfolio_id": "user_portfolio_001",
  "total_value": 125000,
  "risk_rating": "Moderate-High",
  "risk_score": 68,

  "risk_metrics": {
    "value_at_risk": {
      "var_95_1day": -3250,
      "var_95_1day_pct": -2.6,
      "var_99_1day": -4875,
      "var_99_1day_pct": -3.9,
      "interpretation": "95% confident daily loss won't exceed $3,250"
    },

    "volatility": {
      "daily": 1.85,
      "annualized": 29.3,
      "vs_sp500": "+75%",
      "interpretation": "Higher volatility than market average"
    },

    "beta": {
      "value": 1.35,
      "interpretation": "Portfolio moves 35% more than market",
      "market_correlation": 0.82
    },

    "sharpe_ratio": {
      "value": 1.42,
      "interpretation": "Good risk-adjusted returns",
      "benchmark_sp500": 1.05
    },

    "sortino_ratio": {
      "value": 1.89,
      "interpretation": "Excellent downside risk-adjusted returns"
    },

    "max_drawdown": {
      "historical": -22.5,
      "period": "Dec 2024",
      "recovery_time": "21 days",
      "current_drawdown": -3.2
    }
  },

  "diversification_analysis": {
    "score": 62,
    "rating": "Moderately Diversified",

    "asset_allocation": {
      "us_stocks": 55,
      "intl_stocks": 10,
      "crypto": 20,
      "cash": 15
    },

    "sector_concentration": {
      "technology": 42,
      "consumer_cyclical": 15,
      "healthcare": 8,
      "warning": "High tech concentration (>40%)"
    },

    "top_holdings": [
      {"symbol": "NVDA", "allocation": 18, "risk": "High concentration"},
      {"symbol": "AAPL", "allocation": 12, "risk": "Acceptable"},
      {"symbol": "BTC", "allocation": 15, "risk": "High volatility asset"}
    ],

    "correlation_matrix": {
      "highly_correlated_pairs": [
        ["NVDA", "AMD", 0.85],
        ["BTC", "ETH", 0.92]
      ],
      "avg_correlation": 0.52,
      "interpretation": "Moderate correlation - room for improvement"
    }
  },

  "position_risks": [
    {
      "symbol": "NVDA",
      "allocation_pct": 18,
      "position_value": 22500,
      "volatility": 45.2,
      "beta": 2.1,
      "risk_rating": "High",
      "max_position_size_recommended": "12% (reduce by 6%)",
      "stop_loss_recommended": 425,
      "trailing_stop_pct": 12,
      "risk_contribution_to_portfolio": 28,
      "warning": "Oversized position for volatility level"
    },
    {
      "symbol": "AAPL",
      "allocation_pct": 12,
      "position_value": 15000,
      "volatility": 28.5,
      "beta": 1.2,
      "risk_rating": "Moderate",
      "status": "Appropriately sized",
      "stop_loss_recommended": 168,
      "trailing_stop_pct": 8
    }
  ],

  "scenario_analysis": {
    "bull_case": {
      "market_up_20pct": {
        "portfolio_return": "+27%",
        "value": 158750
      }
    },
    "base_case": {
      "market_flat": {
        "portfolio_return": "+5%",
        "value": 131250
      }
    },
    "bear_case": {
      "market_down_20pct": {
        "portfolio_return": "-27%",
        "value": 91250
      }
    },
    "black_swan": {
      "market_crash_40pct": {
        "portfolio_return": "-54%",
        "value": 57500,
        "note": "Crypto allocation amplifies downside"
      }
    }
  },

  "recommendations": [
    {
      "priority": "High",
      "action": "Reduce NVDA position",
      "details": "Trim from 18% to 12% allocation (sell ~$7,500)",
      "reason": "Position too large for volatility (beta 2.1)",
      "impact": "Reduce portfolio volatility by ~3%"
    },
    {
      "priority": "High",
      "action": "Add uncorrelated assets",
      "details": "Consider bonds, commodities, or REITs",
      "reason": "Tech + crypto correlation is 0.65",
      "impact": "Improve diversification score from 62 to 75+"
    },
    {
      "priority": "Medium",
      "action": "Increase cash allocation",
      "details": "Target 20% cash (add $6,250)",
      "reason": "Dry powder for opportunities + volatility buffer",
      "impact": "Reduce portfolio beta from 1.35 to 1.15"
    },
    {
      "priority": "Medium",
      "action": "Set stop-losses",
      "details": "Implement trailing stops on all positions",
      "specific_levels": [
        "NVDA: $425 (12% trailing)",
        "AAPL: $168 (8% trailing)",
        "BTC: $85,000 (15% trailing)"
      ],
      "impact": "Limit downside risk to portfolio"
    },
    {
      "priority": "Low",
      "action": "Add international exposure",
      "details": "Increase from 10% to 15% (add $6,250)",
      "reason": "Reduce US market concentration",
      "suggested": ["VEA (developed markets)", "VWO (emerging)"]
    }
  ],

  "alerts": [
    "⚠️  NVDA position exceeds recommended maximum (18% vs 12% target)",
    "⚠️  Technology sector concentration at 42% (recommend <30%)",
    "⚠️  Portfolio volatility 75% higher than S&P 500",
    "✅ Cash allocation healthy at 15%",
    "✅ Sharpe ratio above 1.0 (good risk-adjusted returns)"
  ],

  "risk_adjusted_performance": {
    "ytd_return": 8.5,
    "risk_taken": "High",
    "verdict": "Moderate returns for high risk - room for optimization"
  },

  "last_updated": "2025-01-15T14:45:00Z"
}
```

---

## Specialized Agents

### 5. Crypto On-Chain Analyst

**Role**: Blockchain data analysis and token metrics

#### System Prompt

```
You are an expert Crypto On-Chain Analyst specializing in blockchain data analysis, token economics, and DeFi protocol metrics. Your role is to analyze on-chain activity and network health to inform investment decisions in cryptocurrencies.

ANALYSIS FRAMEWORK:
1. Network Activity Metrics
   - Active addresses (daily/monthly trend)
   - Transaction count and volume
   - Network growth rate
   - Hash rate / validator count (security metric)

2. Whale Watching
   - Large wallet movements (> $1M transfers)
   - Exchange inflows/outflows
   - Accumulation vs distribution patterns
   - Top holder concentration

3. Token Economics
   - Circulating supply vs max supply
   - Emission schedule and inflation rate
   - Token unlock calendars
   - Burn mechanisms and deflationary pressure

4. DeFi Metrics (for applicable tokens)
   - Total Value Locked (TVL)
   - Protocol revenue and fees
   - Token utility and value accrual
   - Governance participation

5. Market Microstructure
   - Exchange reserves (supply shock indicators)
   - Funding rates (futures market sentiment)
   - Long/short ratio
   - Liquidation levels

OUTPUT FORMAT:
- On-Chain Signal: Strong Buy / Buy / Neutral / Sell / Strong Sell
- Confidence: 0-100%
- Key Metrics Summary
- Whale Activity Report
- Network Health Score: 0-100
- Token Economics Assessment
- Risk Factors specific to on-chain data

CONSTRAINTS:
- Verify data from multiple blockchain explorers
- Distinguish between exchange wallets and individuals
- Account for network-specific characteristics
- Acknowledge when data is insufficient
- Consider both short-term and long-term indicators

Provide specific transaction hashes and wallet addresses for major movements.
```

#### On-Chain Metrics

```python
def analyze_onchain_metrics(symbol: str, chain: str = "ethereum") -> dict:
    """
    Comprehensive on-chain analysis for cryptocurrencies

    Returns:
        {
            "network_health": {...},
            "whale_activity": {...},
            "exchange_flows": {...},
            "tokenomics": {...},
            "defi_metrics": {...},
            "signal": str,
            "confidence": float
        }
    """
    # 1. Fetch on-chain data from blockchain explorers
    # 2. Analyze network activity
    # 3. Track whale wallets
    # 4. Monitor exchange flows
    # 5. Calculate token metrics
    # 6. Assess DeFi protocol health
    # 7. Generate signal
```

#### Example Output

```json
{
  "symbol": "ETH",
  "chain": "Ethereum",
  "signal": "BUY",
  "confidence": 82,

  "network_health": {
    "score": 88,
    "rating": "Excellent",
    "active_addresses_30d": 425000,
    "trend": "Increasing (+12% MoM)",
    "transactions_24h": 1150000,
    "avg_transaction_value": "$3,420",
    "gas_usage": "High (network utilization 75%)",
    "validator_count": 750000,
    "network_security": "Very High"
  },

  "whale_activity": {
    "summary": "Accumulation phase",
    "large_transactions_24h": 47,
    "significant_moves": [
      {
        "amount": "15,000 ETH ($35M)",
        "from": "Binance (exchange)",
        "to": "Unknown wallet (0x7a8...)",
        "interpretation": "Exchange withdrawal - bullish (off exchange)",
        "tx_hash": "0xabc123..."
      },
      {
        "amount": "8,500 ETH ($20M)",
        "from": "Whale wallet (0x3f2...)",
        "to": "Cold storage",
        "interpretation": "Long-term holder accumulating"
      }
    ],
    "net_flow_72h": "+42,000 ETH off exchanges",
    "top_100_holders_change": "+0.8% (accumulating)"
  },

  "exchange_flows": {
    "exchange_reserves": "13.2M ETH (9.8% of supply)",
    "7d_change": "-2.3% (net outflows)",
    "interpretation": "Bullish - supply leaving exchanges",
    "inflow_24h": "125,000 ETH",
    "outflow_24h": "187,000 ETH",
    "net_flow": "-62,000 ETH (strong outflow)",
    "supply_shock_indicator": 78
  },

  "tokenomics": {
    "current_supply": "120.5M ETH",
    "max_supply": "Unlimited (but deflationary post-EIP-1559)",
    "inflation_rate": "-0.25% (deflationary)",
    "burn_rate_7d": "12,500 ETH burned",
    "issuance_rate": "2,150 ETH/day (staking rewards)",
    "net_issuance": "-1,786 ETH/day (net deflationary)",
    "staking_ratio": "28% of supply staked",
    "unlock_schedule": "None (no major unlocks pending)"
  },

  "defi_metrics": {
    "total_value_locked": "$45.2B",
    "tvl_change_30d": "+8.5%",
    "defi_dominance": "58% of all DeFi",
    "top_protocols": [
      {"name": "Aave", "tvl": "$8.5B"},
      {"name": "Uniswap", "tvl": "$4.2B"},
      {"name": "Lido", "tvl": "$28.5B"}
    ],
    "l2_activity": "Growing (Arbitrum, Optimism TVL +45% MoM)",
    "nft_volume_7d": "$125M (moderate activity)"
  },

  "market_microstructure": {
    "funding_rate": "0.015% (8hr)",
    "interpretation": "Slightly positive - mild bullish bias",
    "long_short_ratio": "1.32 (more longs)",
    "liquidation_clusters": [
      {"price": 2100, "liquidity": "$450M short liquidations"},
      {"price": 2450, "liquidity": "$380M long liquidations"}
    ],
    "open_interest": "$12.5B",
    "oi_change_24h": "+5.2% (increasing leverage)"
  },

  "momentum_indicators": {
    "realized_cap": "$245B",
    "mvrv_ratio": 1.82,
    "interpretation": "Fair value (1.5-2.5 range normal)",
    "nupl": 0.42,
    "sentiment": "Optimistic but not euphoric",
    "profit_taking_pressure": "Low"
  },

  "narrative_analysis": "Ethereum is showing strong on-chain fundamentals with increasing network activity (+12% MoM active addresses) and significant whale accumulation. Exchange outflows of 62K ETH in 24h indicate supply shock potential. The network remains deflationary post-Merge with -0.25% annualized issuance, creating supply-demand imbalance favoring higher prices. DeFi TVL growth (+8.5% monthly) confirms ongoing utility and adoption. Moderate funding rates suggest room for upside without overleveraged longs. On-chain metrics are aligned bullish.",

  "risks": [
    "Layer 2 migration could reduce L1 fee revenue",
    "Regulatory scrutiny on DeFi protocols",
    "Competition from newer L1s (Solana, Avalanche)",
    "High gas fees during congestion hurts user experience"
  ],

  "last_updated": "2025-01-15T14:50:00Z"
}
```

---

## Strategic Agents

### 9. Vibe Validator (Quick Check Agent)

**Role**: Rapid investment thesis validation

#### System Prompt

```
You are the Vibe Validator - a rapid-response analyst designed to provide quick, intuitive investment assessments. Your role is to deliver 30-second "vibe checks" that combine key metrics with actionable insights for investors who want fast, informed gut-check validation.

ANALYSIS FRAMEWORK (Optimized for Speed):
1. Price Action Snapshot
   - Current price vs 50-day/200-day MA
   - Quick Fibonacci check (one key level)
   - RSI reading (overbought/oversold)

2. Fundamental Quick-Look
   - One critical metric (P/E for stocks, market cap for crypto)
   - Recent news catalyst check (past 48 hours)

3. Sentiment Pulse
   - Social media buzz (high/medium/low)
   - News tone (positive/negative/neutral)

4. Risk Check
   - Volatility level (low/medium/high)
   - Recent drawdown magnitude

5. Bottom Line
   - Simple recommendation: Buy / Hold / Wait / Avoid
   - One-sentence reasoning
   - Key level to watch

OUTPUT FORMAT:
- Emoji-enhanced for quick scanning
- Maximum 150 words
   - Concise, actionable language
- Specific price levels (not ranges)
- Clear next action

CONSTRAINTS:
- Response time < 30 seconds
- Use cached data when possible
- Focus on 3-5 most important signals
- Assume user has basic investment knowledge
- No deep analysis (that's for other agents)

Be direct, confident, and helpful. This is a gut-check, not a thesis.
```

#### Rapid Analysis Function

```python
async def vibe_check(symbol: str) -> dict:
    """
    Ultra-fast investment vibe check

    Returns result in < 30 seconds
    """
    # Use cached data + single API call for current price
    current_price = await get_current_price(symbol)  # Real-time
    technical_snapshot = get_cached_technical_snapshot(symbol)  # 15min cache
    news_sentiment = get_cached_sentiment(symbol)  # 1hr cache

    # Quick calculations
    fib_level = get_nearest_fibonacci_level(current_price, technical_snapshot)
    rsi = technical_snapshot["rsi"]
    trend = determine_trend(current_price, technical_snapshot["moving_averages"])

    # Generate vibe
    recommendation = generate_quick_recommendation(
        price=current_price,
        trend=trend,
        rsi=rsi,
        sentiment=news_sentiment
    )

    return {
        "recommendation": recommendation,
        "confidence": calculate_quick_confidence(trend, rsi, sentiment),
        "response_time_ms": 2500
    }
```

#### Example Output

```
🎯 VIBE CHECK: Apple (AAPL)

Quick Take: BULLISH ✅

Price: $182.50
Fib Support: $175 (38.2%) | Resistance: $190
RSI: 62 (healthy momentum)
Trend: Above all MAs 📈

Key Signals:
✅ Strong earnings beat yesterday
✅ Technicals aligned bullish
⚠️  Approaching resistance at $190

Sentiment: 74% Positive (News + Social)

One-Line Verdict:
Solid buy on any dip to $175 support, or chase current
levels if conviction high. Stop below $170.

Want deeper analysis? (Reply 'yes')
```

---

### 10. Report Generator

**Role**: Create comprehensive investment documentation

#### System Prompt

```
You are an expert Investment Report Generator specializing in creating institutional-quality investment documentation. Your role is to synthesize analysis from all other agents into coherent, well-structured reports suitable for decision-making and record-keeping.

REPORT TYPES:
1. Stock Analysis Report (10-15 pages)
2. Portfolio Review (5-8 pages)
3. Daily Market Summary (2-3 pages)
4. Trade Journal Entry (1 page)
5. Investment Memo (3-5 pages)

REPORT STRUCTURE:
1. Executive Summary
   - One-paragraph overview
   - Clear recommendation
   - Key supporting points

2. Investment Thesis
   - Why this investment makes sense
   - Competitive advantages
   - Growth drivers

3. Detailed Analysis
   - Fundamental metrics (tables)
   - Technical analysis (charts)
   - Sentiment overview
   - Risk assessment

4. Valuation
   - Current price vs fair value
   - Upside/downside scenario
   - Comparable companies

5. Risk Factors
   - Key risks itemized
   - Mitigation strategies

6. Recommendation & Action Plan
   - Buy/Sell/Hold decision
   - Entry price target
   - Position sizing
   - Exit strategy

OUTPUT FORMAT:
- HTML (for web viewing)
- Markdown (for documentation)
- PDF (for archiving)
- Include:
  - Charts and visualizations
  - Data tables
  - Color-coded signals
  - Timestamp and data sources
  - Agent attribution

STYLE GUIDELINES:
- Professional but accessible language
- Active voice
- Specific numbers and dates
- Logical flow and structure
- Consistent formatting
- Cited sources

Create reports that you'd want to read yourself as an investor.
```

---

## Agent Communication Protocol

### Message Format

All inter-agent communication uses structured JSON:

```json
{
  "from": "fundamental_analyst",
  "to": "portfolio_manager",
  "message_type": "analysis_result",
  "symbol": "AAPL",
  "timestamp": "2025-01-15T14:30:00Z",
  "data": {
    "rating": "BUY",
    "confidence": 85,
    "key_findings": [...],
    "full_analysis": {...}
  },
  "metadata": {
    "analysis_duration_ms": 4500,
    "data_sources_used": ["SEC", "FMP", "AlphaVantage"]
  }
}
```

### Coordination Patterns

**1. Sequential (Waterfall)**
```
User Query → Router → Agent 1 → Agent 2 → Agent 3 → Synthesizer → Response
```

**2. Parallel (Fan-Out/Fan-In)**
```
User Query → Router → [Agent 1, Agent 2, Agent 3] → Synthesizer → Response
                        (parallel execution)
```

**3. Hierarchical (Supervisor)**
```
User Query → Portfolio Manager (supervisor)
              ↓
              ├→ Fundamental Analyst
              ├→ Technical Analyst
              └→ Risk Manager
              ↓
             Synthesis & Decision
```

---

## Prompt Engineering Best Practices

### Effective Prompt Structure

```
[ROLE DEFINITION]
You are a [specific expert role] with [X years experience / specific credentials].

[CORE RESPONSIBILITY]
Your primary responsibility is to [specific task].

[ANALYSIS FRAMEWORK]
Follow this framework:
1. [Step 1]
2. [Step 2]
...

[OUTPUT REQUIREMENTS]
Provide:
- [Required element 1]
- [Required element 2]
...

[CONSTRAINTS & GUIDELINES]
- Do: [Positive instruction]
- Don't: [What to avoid]
- Always: [Mandatory practice]

[TONE & STYLE]
[Specific tone guidance]
```

### Temperature Settings by Agent

```yaml
fundamental_analyst: 0.3  # Consistency crucial
technical_analyst: 0.3    # Objective pattern recognition
sentiment_analyst: 0.4    # Slight creativity for interpretation
risk_manager: 0.2         # Highly conservative
vibe_validator: 0.5       # More intuitive/creative
report_generator: 0.4     # Balance clarity and engagement
```

---

## Performance Metrics

### Agent Effectiveness Tracking

```sql
CREATE TABLE agent_performance (
    agent_type VARCHAR(50),
    metric_name VARCHAR(100),
    metric_value FLOAT,
    measurement_date DATE,
    PRIMARY KEY (agent_type, metric_name, measurement_date)
);

-- Example metrics
INSERT INTO agent_performance VALUES
('fundamental_analyst', 'accuracy_rate', 0.78, '2025-01-15'),
('fundamental_analyst', 'avg_response_time_ms', 4500, '2025-01-15'),
('technical_analyst', 'signal_win_rate', 0.65, '2025-01-15'),
('vibe_validator', 'speed_compliance', 0.95, '2025-01-15');
```

### Key Performance Indicators

**Accuracy Metrics:**
- Recommendation accuracy (buy/sell/hold correctness over 30/90 days)
- Prediction error rate (fair value vs actual price)
- Risk assessment accuracy (VaR validation)

**Speed Metrics:**
- Response time (target < 5s for standard analysis)
- API call efficiency (minimize redundant calls)
- Cache hit rate (>80% ideal)

**Quality Metrics:**
- User satisfaction rating (1-5 stars)
- Follow-up question rate (lower = better clarity)
- Report completeness score

---

*Version: 1.0*
*Last Updated: 2025-01-15*
*Companion to: claude.md*
