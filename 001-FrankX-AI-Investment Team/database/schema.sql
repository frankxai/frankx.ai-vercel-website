-- Investment Analysis System - PostgreSQL Database Schema
-- Version: 1.0
-- Requires: PostgreSQL 15+ with pgvector extension

-- ============================================
-- EXTENSIONS
-- ============================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable vector similarity search (for semantic search)
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================
-- PORTFOLIOS TABLE
-- User investment portfolios
-- ============================================

CREATE TABLE portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    cash_balance DECIMAL(20, 2) DEFAULT 0.00,
    total_value DECIMAL(20, 2),
    inception_date DATE DEFAULT CURRENT_DATE,
    risk_tolerance VARCHAR(20) CHECK (risk_tolerance IN ('conservative', 'moderate', 'aggressive')),
    target_allocation JSONB, -- {"stocks": 60, "crypto": 20, "bonds": 10, "cash": 10}
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolios_user ON portfolios(user_id);
CREATE INDEX idx_portfolios_created ON portfolios(created_at DESC);

-- ============================================
-- POSITIONS TABLE
-- Current holdings in portfolios
-- ============================================

CREATE TABLE positions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    symbol VARCHAR(20) NOT NULL,
    asset_type VARCHAR(20) NOT NULL CHECK (asset_type IN ('stock', 'crypto', 'etf', 'bond', 'option')),
    quantity DECIMAL(20, 8) NOT NULL,
    avg_cost DECIMAL(20, 8) NOT NULL,
    current_price DECIMAL(20, 8),
    market_value DECIMAL(20, 2),
    unrealized_pnl DECIMAL(20, 2),
    pnl_percentage DECIMAL(10, 4),
    allocation_percentage DECIMAL(5, 2),
    first_purchase_date DATE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT positive_quantity CHECK (quantity > 0),
    CONSTRAINT positive_cost CHECK (avg_cost >= 0)
);

CREATE INDEX idx_positions_portfolio ON positions(portfolio_id);
CREATE INDEX idx_positions_symbol ON positions(symbol);
CREATE INDEX idx_positions_asset_type ON positions(asset_type);
CREATE UNIQUE INDEX idx_positions_unique ON positions(portfolio_id, symbol);

-- ============================================
-- TRANSACTIONS TABLE
-- Buy/sell transaction history
-- ============================================

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    symbol VARCHAR(20) NOT NULL,
    asset_type VARCHAR(20) NOT NULL,
    transaction_type VARCHAR(10) NOT NULL CHECK (transaction_type IN ('buy', 'sell', 'dividend', 'split', 'transfer')),
    quantity DECIMAL(20, 8) NOT NULL,
    price DECIMAL(20, 8) NOT NULL,
    commission DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(20, 2) NOT NULL,
    notes TEXT,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT positive_quantity CHECK (quantity > 0),
    CONSTRAINT positive_price CHECK (price >= 0)
);

CREATE INDEX idx_transactions_portfolio ON transactions(portfolio_id);
CREATE INDEX idx_transactions_symbol ON transactions(symbol);
CREATE INDEX idx_transactions_date ON transactions(executed_at DESC);
CREATE INDEX idx_transactions_type ON transactions(transaction_type);

-- ============================================
-- MARKET DATA CACHE
-- Cached price and market data
-- ============================================

CREATE TABLE market_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    symbol VARCHAR(20) NOT NULL,
    asset_type VARCHAR(20) NOT NULL,
    price DECIMAL(20, 8) NOT NULL,
    volume DECIMAL(20, 2),
    market_cap DECIMAL(20, 2),
    change_24h DECIMAL(10, 4),
    change_7d DECIMAL(10, 4),
    high_24h DECIMAL(20, 8),
    low_24h DECIMAL(20, 8),
    timestamp TIMESTAMP NOT NULL,
    data_source VARCHAR(50) NOT NULL,
    raw_data JSONB, -- Store full API response for reference
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_market_data_symbol ON market_data(symbol);
CREATE INDEX idx_market_data_symbol_time ON market_data(symbol, timestamp DESC);
CREATE UNIQUE INDEX idx_market_data_unique ON market_data(symbol, timestamp, data_source);

-- ============================================
-- ANALYSIS HISTORY
-- AI agent analysis results
-- ============================================

CREATE TABLE analysis_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    symbol VARCHAR(20) NOT NULL,
    asset_type VARCHAR(20) NOT NULL,
    agent_type VARCHAR(50) NOT NULL, -- fundamental, technical, sentiment, etc.
    analysis_type VARCHAR(50) NOT NULL,
    input_data JSONB,
    output_data JSONB NOT NULL,
    recommendation VARCHAR(20) CHECK (recommendation IN ('strong_buy', 'buy', 'hold', 'sell', 'strong_sell', 'avoid')),
    confidence_score DECIMAL(5, 2), -- 0-100
    reasoning TEXT,
    key_metrics JSONB,
    data_quality VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_analysis_symbol ON analysis_history(symbol);
CREATE INDEX idx_analysis_agent ON analysis_history(agent_type);
CREATE INDEX idx_analysis_date ON analysis_history(created_at DESC);
CREATE INDEX idx_analysis_recommendation ON analysis_history(recommendation);

-- ============================================
-- EMBEDDINGS (Vector Storage)
-- For semantic search across research
-- ============================================

CREATE TABLE embeddings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('news', 'analysis', 'transcript', 'research', 'comment')),
    symbol VARCHAR(20),
    title VARCHAR(500),
    content_text TEXT NOT NULL,
    embedding VECTOR(1536), -- OpenAI ada-002 dimensions (or adjust for your embedding model)
    metadata JSONB,
    source_url TEXT,
    published_at TIMESTAMP,
    sentiment_score DECIMAL(5, 2), -- -1.00 to 1.00
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_embeddings_symbol ON embeddings(symbol);
CREATE INDEX idx_embeddings_type ON embeddings(content_type);
CREATE INDEX idx_embeddings_date ON embeddings(created_at DESC);
-- Vector similarity search index (IVFFlat for large datasets)
CREATE INDEX idx_embeddings_vector ON embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- ============================================
-- WATCHLISTS
-- User stock/crypto watchlists
-- ============================================

CREATE TABLE watchlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    symbols TEXT[], -- Array of ticker symbols
    alert_rules JSONB, -- Custom alert conditions
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_watchlists_user ON watchlists(user_id);

-- ============================================
-- ALERTS
-- Price alerts and notifications
-- ============================================

CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    alert_type VARCHAR(20) NOT NULL CHECK (alert_type IN ('price_above', 'price_below', 'percent_change', 'volume_spike', 'news')),
    condition_value DECIMAL(20, 8),
    message TEXT,
    triggered_at TIMESTAMP,
    acknowledged BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_alerts_user ON alerts(user_id);
CREATE INDEX idx_alerts_symbol ON alerts(symbol);
CREATE INDEX idx_alerts_active ON alerts(active, triggered_at);

-- ============================================
-- REPORTS
-- Generated investment reports
-- ============================================

CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID REFERENCES portfolios(id),
    report_type VARCHAR(50) NOT NULL CHECK (report_type IN ('daily_summary', 'portfolio_review', 'stock_analysis', 'trade_journal', 'investment_memo')),
    title VARCHAR(500) NOT NULL,
    content_html TEXT,
    content_markdown TEXT,
    metadata JSONB,
    file_path TEXT, -- Path to PDF/HTML file if exported
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reports_portfolio ON reports(portfolio_id);
CREATE INDEX idx_reports_type ON reports(report_type);
CREATE INDEX idx_reports_date ON reports(generated_at DESC);

-- ============================================
-- FIBONACCI LEVELS CACHE
-- Pre-calculated Fibonacci retracement levels
-- ============================================

CREATE TABLE fibonacci_levels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    symbol VARCHAR(20) NOT NULL,
    timeframe VARCHAR(10) NOT NULL, -- daily, weekly, etc.
    swing_high DECIMAL(20, 8) NOT NULL,
    swing_low DECIMAL(20, 8) NOT NULL,
    level_0 DECIMAL(20, 8),
    level_236 DECIMAL(20, 8),
    level_382 DECIMAL(20, 8),
    level_500 DECIMAL(20, 8),
    level_618 DECIMAL(20, 8),
    level_786 DECIMAL(20, 8),
    level_100 DECIMAL(20, 8),
    extension_1618 DECIMAL(20, 8),
    extension_2618 DECIMAL(20, 8),
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP
);

CREATE INDEX idx_fibonacci_symbol ON fibonacci_levels(symbol, timeframe);
CREATE INDEX idx_fibonacci_valid ON fibonacci_levels(valid_until);

-- ============================================
-- AGENT PERFORMANCE METRICS
-- Track agent accuracy and performance
-- ============================================

CREATE TABLE agent_performance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_type VARCHAR(50) NOT NULL,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(10, 4),
    measurement_date DATE NOT NULL,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unique_agent_metric_date UNIQUE (agent_type, metric_name, measurement_date)
);

CREATE INDEX idx_agent_perf_type ON agent_performance(agent_type);
CREATE INDEX idx_agent_perf_date ON agent_performance(measurement_date DESC);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for portfolios
CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE ON portfolios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for watchlists
CREATE TRIGGER update_watchlists_updated_at BEFORE UPDATE ON watchlists
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate position metrics
CREATE OR REPLACE FUNCTION calculate_position_metrics()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate market value
    NEW.market_value = NEW.quantity * COALESCE(NEW.current_price, NEW.avg_cost);

    -- Calculate unrealized P&L
    NEW.unrealized_pnl = (COALESCE(NEW.current_price, NEW.avg_cost) - NEW.avg_cost) * NEW.quantity;

    -- Calculate P&L percentage
    IF NEW.avg_cost > 0 THEN
        NEW.pnl_percentage = ((COALESCE(NEW.current_price, NEW.avg_cost) - NEW.avg_cost) / NEW.avg_cost) * 100;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for position calculations
CREATE TRIGGER calculate_position_metrics_trigger BEFORE INSERT OR UPDATE ON positions
    FOR EACH ROW EXECUTE FUNCTION calculate_position_metrics();

-- ============================================
-- VIEWS
-- ============================================

-- Portfolio summary view
CREATE VIEW portfolio_summary AS
SELECT
    p.id,
    p.name,
    p.user_id,
    p.cash_balance,
    p.total_value,
    COUNT(pos.id) as position_count,
    SUM(pos.market_value) as invested_value,
    SUM(pos.unrealized_pnl) as total_unrealized_pnl,
    CASE WHEN SUM(pos.market_value - pos.unrealized_pnl) > 0
         THEN (SUM(pos.unrealized_pnl) / SUM(pos.market_value - pos.unrealized_pnl)) * 100
         ELSE 0
    END as total_return_percentage,
    p.updated_at
FROM portfolios p
LEFT JOIN positions pos ON p.id = pos.portfolio_id
GROUP BY p.id, p.name, p.user_id, p.cash_balance, p.total_value, p.updated_at;

-- Top performers view
CREATE VIEW top_performers AS
SELECT
    symbol,
    asset_type,
    AVG(pnl_percentage) as avg_return,
    COUNT(*) as holdings_count
FROM positions
WHERE pnl_percentage IS NOT NULL
GROUP BY symbol, asset_type
ORDER BY avg_return DESC
LIMIT 20;

-- Recent analysis view
CREATE VIEW recent_analysis AS
SELECT
    symbol,
    agent_type,
    recommendation,
    confidence_score,
    reasoning,
    created_at
FROM analysis_history
ORDER BY created_at DESC
LIMIT 50;

-- ============================================
-- SEED DATA (Optional)
-- ============================================

-- Insert sample portfolio for testing
INSERT INTO portfolios (user_id, name, description, cash_balance, risk_tolerance)
VALUES ('demo_user', 'Demo Portfolio', 'Sample portfolio for testing', 10000.00, 'moderate');

-- ============================================
-- MAINTENANCE QUERIES
-- ============================================

-- Vacuum and analyze for performance
-- Run periodically: VACUUM ANALYZE;

-- Clean old market data cache (older than 30 days)
-- DELETE FROM market_data WHERE created_at < NOW() - INTERVAL '30 days';

-- Clean old analysis history (older than 90 days)
-- DELETE FROM analysis_history WHERE created_at < NOW() - INTERVAL '90 days';

-- ============================================
-- BACKUP COMMANDS
-- ============================================

-- Full database backup:
-- pg_dump -U invest_user -d investment_db > backup_$(date +%Y%m%d).sql

-- Restore from backup:
-- psql -U invest_user -d investment_db < backup_20250115.sql

-- ============================================
-- USEFUL QUERIES
-- ============================================

-- Get portfolio performance
-- SELECT * FROM portfolio_summary WHERE user_id = 'your_user_id';

-- Get all positions for a portfolio
-- SELECT * FROM positions WHERE portfolio_id = 'your_portfolio_id' ORDER BY allocation_percentage DESC;

-- Get recent transactions
-- SELECT * FROM transactions WHERE portfolio_id = 'your_portfolio_id' ORDER BY executed_at DESC LIMIT 20;

-- Search similar content (vector search)
-- SELECT title, content_text, 1 - (embedding <=> query_embedding) AS similarity
-- FROM embeddings
-- WHERE symbol = 'AAPL'
-- ORDER BY embedding <=> query_embedding
-- LIMIT 10;

-- Get recent analysis for a symbol
-- SELECT * FROM analysis_history WHERE symbol = 'NVDA' ORDER BY created_at DESC LIMIT 5;
