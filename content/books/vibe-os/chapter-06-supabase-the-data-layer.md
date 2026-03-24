# Supabase — The Data Layer

> "Data is a precious thing and will last longer than the systems themselves."
> — Tim Berners-Lee

---

## I. Why You Need a Database

Most solo creators do not think they need a database. They store content in markdown files, track subscribers in their email provider, and manage products in their payment platform.

This works until it doesn't.

The moment you need to cross-reference data — which subscribers bought which products? Which blog posts drive the most signups? Which coaching applicants have the highest engagement scores? — you need a relational data layer. You need a database.

Supabase provides this layer at a cost and complexity level appropriate for a one-person studio: free tier for development, $25/month for production, with PostgreSQL as the underlying engine — the most battle-tested relational database in the world.

---

## II. Supabase Architecture

Supabase is not just a database. It is four services packaged together:

**PostgreSQL database.** Full SQL database with row-level security, real-time subscriptions, and automatic API generation. Every table you create is immediately accessible via a REST API and a real-time WebSocket API — no backend code required.

**Authentication.** Email/password auth, OAuth providers (Google, GitHub, Twitter), magic links, and phone auth. Supabase Auth integrates with Next.js middleware, enabling protected routes and role-based access with minimal code.

**Storage.** S3-compatible object storage for files, images, and media. Integrated with the auth system — you can create storage policies that restrict file access based on the authenticated user.

**Edge Functions.** Serverless functions (Deno runtime) for custom backend logic. Useful for webhooks, scheduled tasks, and complex data processing that doesn't fit in a Next.js API route.

For the Vibe OS creator stack, the primary use is the database and auth layers. Storage is handled by Vercel Blob (simpler for the Next.js deployment model). Edge Functions are used sparingly — most backend logic lives in Next.js API routes.

---

## III. Schema Design for Creators

The creator database schema centers on four entities:

```sql
-- Subscribers: people who have signed up
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  source TEXT, -- where they signed up (blog, landing page, etc.)
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Products: digital products for sale
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  stripe_price_id TEXT,
  download_url TEXT, -- Vercel Blob URL
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Purchases: who bought what
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscriber_id UUID REFERENCES subscribers(id),
  product_id UUID REFERENCES products(id),
  stripe_session_id TEXT,
  amount_cents INTEGER NOT NULL,
  purchased_at TIMESTAMPTZ DEFAULT now()
);

-- Content analytics: what content drives engagement
CREATE TABLE content_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  event_type TEXT NOT NULL, -- 'pageview', 'signup', 'purchase'
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

Four tables. Each serving a clear purpose. The relationships between them answer the questions that matter:

- "Which blog posts drive the most signups?" → JOIN content_signals with subscribers on source.
- "What is the lifetime value of subscribers from organic search?" → JOIN subscribers with purchases, filtered by source.
- "Which products are most popular?" → GROUP BY product_id in purchases, ORDER BY count.

This schema is intentionally minimal. Most creators overcomplicate their data model before they have enough data to justify the complexity. Start with four tables. Add more when the data demands it, not before.

---

## IV. Row-Level Security

Supabase's killer feature for creator applications is Row-Level Security (RLS) — database-level access control that ensures users can only access data they are authorized to see.

```sql
-- Enable RLS on subscribers table
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Only the service role can read subscriber data
CREATE POLICY "Service role reads subscribers"
  ON subscribers FOR SELECT
  USING (auth.role() = 'service_role');

-- Subscribers can read their own purchase history
CREATE POLICY "Users read own purchases"
  ON purchases FOR SELECT
  USING (subscriber_id = auth.uid());
```

RLS eliminates an entire category of security vulnerabilities — the kind where a frontend bug accidentally exposes other users' data. With RLS, the database itself enforces access control, regardless of what the application code does.

For a solo creator, RLS provides enterprise-grade data security without enterprise-grade security engineering. The policies are written once and enforced on every query, automatically.

---

## V. Real-Time Subscriptions

Supabase provides real-time data via WebSocket subscriptions. When a row is inserted, updated, or deleted, all subscribed clients receive the change instantly.

For creator applications, real-time is useful for:

**Live dashboards.** Display real-time subscriber counts, purchase notifications, and engagement metrics on an admin dashboard. Each new signup appears on the dashboard within milliseconds.

**Notification systems.** Trigger notifications when specific events occur — a high-value purchase, a coaching application, a subscriber milestone.

**Collaborative editing.** If you build tools for your community (writing tools, project trackers, shared workspaces), real-time enables multi-user collaboration.

```typescript
// Subscribe to new purchases in real-time
const channel = supabase
  .channel('purchases')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'purchases',
  }, (payload) => {
    console.log('New purchase:', payload.new)
    // Trigger notification, update dashboard, etc.
  })
  .subscribe()
```

---

## VI. Integration with the Vibe OS Stack

Supabase integrates with every other layer of the Vibe OS stack:

**Next.js.** The `@supabase/ssr` package provides server-side Supabase access in Next.js App Router. Server Components can query the database directly. API routes handle mutations. Middleware manages authentication.

**Vercel.** Supabase environment variables (URL and anon key) are stored in Vercel's environment variable system. The connection is direct — Supabase runs on its own infrastructure, Vercel connects via HTTPS.

**n8n.** n8n has a native Supabase node for automated workflows. The Content Atomizer can write analytics data to Supabase after processing. The Email Nurture workflow can check subscriber status in Supabase before sending.

**Stripe.** After a successful Stripe checkout, the webhook handler writes the purchase to Supabase. This creates the revenue record that powers the financial analytics.

**MCP.** The Supabase MCP server (available in the MCP ecosystem) allows Claude Code to query and manage the database directly. This enables AI-assisted data operations: "Show me the top 10 content pieces by signup conversion" is a natural language query that the MCP server translates to SQL.

The integration pattern: every layer of the stack reads from and writes to Supabase. The database is the single source of truth. The other layers are consumers and producers of data.

---

## VII. Cost Analysis

| Tier | Cost | Includes |
|------|------|----------|
| Free | $0 | 500MB database, 1GB storage, 50K monthly active users |
| Pro | $25/month | 8GB database, 100GB storage, unlimited users, daily backups |
| Team | $599/month | Everything in Pro + SOC2, SSO, priority support |

For a creator with under 10,000 subscribers and under 100 products, the Free tier is sufficient. The moment you need daily backups or point-in-time recovery, upgrade to Pro.

The Pro tier at $25/month provides more database capability than most startups need in their first year. For a solo creator, it is infrastructure that would have cost $50,000/year to build and maintain ten years ago.

This is the Vibe OS thesis in action: enterprise-grade infrastructure at creator-scale pricing. Supabase gives you PostgreSQL — the same database that powers Instagram, Spotify, and the New York Times — for the price of a monthly streaming subscription.

Use it. The data layer is the foundation that makes everything else measurable, optimizable, and compounding.
