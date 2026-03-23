# FrankX Ecosystem Infrastructure Requirements

*Essential Infrastructure for ACOS + Arcanea Unified Operating System*

---

## Executive Summary

To scale the FrankX/ACOS/Arcanea ecosystem, you need **5 core infrastructure components**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    REQUIRED INFRASTRUCTURE STACK                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   1. OBJECT STORAGE          2. SHARED DATABASE        3. VECTOR DB         │
│   ┌─────────────────┐        ┌─────────────────┐       ┌─────────────────┐  │
│   │ Cloudflare R2   │        │ Supabase/Neon   │       │ Supabase pgvec  │  │
│   │ or OCI Bucket   │        │ PostgreSQL      │       │ or Pinecone     │  │
│   └─────────────────┘        └─────────────────┘       └─────────────────┘  │
│                                                                              │
│   4. CDN/EDGE                5. BACKGROUND JOBS        6. MCP HUB           │
│   ┌─────────────────┐        ┌─────────────────┐       ┌─────────────────┐  │
│   │ Vercel Edge     │        │ Inngest/Trigger │       │ Central MCP     │  │
│   │ Cloudflare      │        │ or QStash       │       │ Registry        │  │
│   └─────────────────┘        └─────────────────┘       └─────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Object Storage (CRITICAL)

**Purpose:** Store generated images, assets, documents, backups

### Recommended Options

| Provider | Free Tier | Cost | Best For |
|----------|-----------|------|----------|
| **Cloudflare R2** | 10GB + 1M requests/mo | $0.015/GB | Global edge, no egress fees |
| **OCI Object Storage** | 10GB always free | $0.0255/GB | Oracle integration |
| **Vercel Blob** | 1GB | $0.15/GB | Simple Vercel integration |
| **Supabase Storage** | 1GB | $0.021/GB | Database integration |

### Recommendation: **Cloudflare R2**
- No egress fees (huge savings)
- S3-compatible API
- Edge caching built-in
- 10GB free tier

### Use Cases
```
R2 Bucket Structure:
├── infogenius/           # Generated infographics
│   ├── 2026-01/
│   └── 2026-02/
├── content/              # Blog images, assets
├── products/             # Course materials, downloads
├── arcanea/              # Academy visuals, gate images
├── backups/              # System backups
└── user-uploads/         # User-generated content
```

### Implementation
```typescript
// Cloudflare R2 with S3 client
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY,
    secretAccessKey: R2_SECRET_KEY,
  },
});

// Upload infographic
await r2.send(new PutObjectCommand({
  Bucket: "frankx-assets",
  Key: `infogenius/${Date.now()}-${filename}`,
  Body: imageBuffer,
  ContentType: "image/png",
}));
```

---

## 2. Shared Database (CRITICAL)

**Purpose:** Unified data layer for all projects

### Recommended Options

| Provider | Free Tier | Features | Best For |
|----------|-----------|----------|----------|
| **Supabase** | 500MB, unlimited API | Auth, Realtime, Storage | Full-stack apps |
| **Neon** | 512MB | Branching, serverless | Serverless apps |
| **PlanetScale** | 5GB reads, 1M writes | Branching, MySQL | High-scale |
| **OCI Autonomous DB** | Always free | Enterprise features | Oracle ecosystem |

### Recommendation: **Supabase PostgreSQL**
- Built-in pgvector for embeddings
- Real-time subscriptions
- Auth integration
- Storage included
- Generous free tier

### Schema Design
```sql
-- Core schemas for unified system
CREATE SCHEMA acos;      -- Agentic Creator OS
CREATE SCHEMA arcanea;   -- Arcanea system
CREATE SCHEMA content;   -- Content management
CREATE SCHEMA skills;    -- Skill tracking
CREATE SCHEMA analytics; -- Usage analytics

-- Skills tracking
CREATE TABLE skills.activations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_name TEXT NOT NULL,
  project TEXT,
  trigger_type TEXT, -- 'keyword', 'file', 'command'
  trigger_value TEXT,
  success BOOLEAN,
  duration_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content inventory
CREATE TABLE content.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT, -- 'blog', 'infographic', 'video', 'course'
  status TEXT DEFAULT 'draft',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Arcanea gate progress
CREATE TABLE arcanea.gate_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT,
  gate_number INTEGER CHECK (gate_number BETWEEN 1 AND 10),
  status TEXT DEFAULT 'locked', -- 'locked', 'in_progress', 'completed'
  completed_exercises JSONB DEFAULT '[]',
  opened_at TIMESTAMPTZ,
  certified_at TIMESTAMPTZ
);

-- Agentic Jujutsu trajectories
CREATE TABLE acos.trajectories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task TEXT NOT NULL,
  operations JSONB DEFAULT '[]',
  success_score DECIMAL(3,2) CHECK (success_score BETWEEN 0 AND 1),
  critique TEXT,
  skills_used TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  finalized_at TIMESTAMPTZ
);
```

---

## 3. Vector Database (HIGH VALUE)

**Purpose:** Semantic search, skill matching, content recommendations

### Options

| Provider | Free Tier | Dimensions | Best For |
|----------|-----------|------------|----------|
| **Supabase pgvector** | Included | Unlimited | Simple integration |
| **Pinecone** | 100K vectors | 1536 | Production scale |
| **Qdrant** | Self-host free | Unlimited | Self-hosted |
| **Weaviate** | Self-host free | Unlimited | Complex schemas |

### Recommendation: **Supabase pgvector**
- Same database as main data
- No additional service
- Good enough for 100K+ vectors

### Use Cases
```sql
-- Enable pgvector
CREATE EXTENSION vector;

-- Content embeddings for semantic search
CREATE TABLE content.embeddings (
  id UUID PRIMARY KEY REFERENCES content.items(id),
  embedding vector(1536), -- OpenAI ada-002 size
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skill matching embeddings
CREATE TABLE skills.embeddings (
  skill_name TEXT PRIMARY KEY,
  description_embedding vector(1536),
  use_cases_embedding vector(1536)
);

-- Semantic search function
CREATE OR REPLACE FUNCTION search_content(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10
)
RETURNS TABLE (id UUID, title TEXT, similarity float)
LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.title,
    1 - (e.embedding <=> query_embedding) as similarity
  FROM content.items c
  JOIN content.embeddings e ON c.id = e.id
  WHERE 1 - (e.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;
```

---

## 4. CDN / Edge Network

**Purpose:** Fast global delivery of assets, edge functions

### Current: **Vercel Edge**
Already using via frankx.ai deployment

### Enhancement: **Cloudflare**
- Pair with R2 for zero-egress CDN
- Edge workers for dynamic content
- DDoS protection included

### Architecture
```
User Request
    │
    ▼
┌─────────────┐
│ Cloudflare  │──► R2 (static assets)
│ Edge        │
└─────┬───────┘
      │
      ▼
┌─────────────┐
│ Vercel Edge │──► App (dynamic)
│ Functions   │
└─────────────┘
```

---

## 5. Background Jobs (ESSENTIAL)

**Purpose:** Async tasks, scheduled jobs, webhooks

### Options

| Provider | Free Tier | Features | Best For |
|----------|-----------|----------|----------|
| **Inngest** | 25K runs/mo | Event-driven, retries | Complex workflows |
| **Trigger.dev** | 10K runs/mo | Type-safe, realtime | Dev experience |
| **Upstash QStash** | 500 msgs/day | HTTP-based, simple | Simple queues |
| **Vercel Cron** | Included | Basic scheduling | Simple crons |

### Recommendation: **Inngest**
- Event-driven architecture
- Automatic retries
- Step functions
- Great for ACOS workflows

### Use Cases
```typescript
import { inngest } from "./client";

// Content publishing workflow
export const publishContent = inngest.createFunction(
  { id: "publish-content" },
  { event: "content/publish.requested" },
  async ({ event, step }) => {
    // Step 1: Generate images
    const images = await step.run("generate-images", async () => {
      return await infogenius.generate(event.data.topic);
    });

    // Step 2: Optimize for SEO
    await step.run("seo-optimize", async () => {
      return await seoOptimizer.analyze(event.data.content);
    });

    // Step 3: Deploy to Vercel
    await step.run("deploy", async () => {
      return await vercel.deploy(event.data.slug);
    });

    // Step 4: Distribute to social
    await step.run("social-distribute", async () => {
      return await socialDistributor.post(event.data);
    });
  }
);
```

---

## 6. MCP Hub / Registry (FUTURE)

**Purpose:** Centralized MCP server management

### Current State
MCP servers configured per-project in `.mcp.json`

### Future Architecture
```
┌─────────────────────────────────────────┐
│           MCP REGISTRY HUB              │
├─────────────────────────────────────────┤
│                                         │
│  Registered Servers:                    │
│  ├── nano-banana (image generation)     │
│  ├── github (repo management)           │
│  ├── supabase (database)                │
│  ├── browser (playwright)               │
│  └── arcanea-aios (academy)             │
│                                         │
│  Features:                              │
│  • Central configuration                │
│  • Health monitoring                    │
│  • Usage analytics                      │
│  • Auto-scaling                         │
│                                         │
└─────────────────────────────────────────┘
```

---

## Infrastructure Cost Estimate

### Free Tier Setup (MVP)
| Service | Provider | Cost |
|---------|----------|------|
| Object Storage | Cloudflare R2 | $0 (10GB free) |
| Database | Supabase | $0 (500MB free) |
| Vector DB | Supabase pgvector | $0 (included) |
| CDN | Cloudflare | $0 (free tier) |
| Hosting | Vercel | $0 (hobby) |
| Background Jobs | Inngest | $0 (25K runs) |
| **Total** | | **$0/month** |

### Production Setup
| Service | Provider | Cost |
|---------|----------|------|
| Object Storage | Cloudflare R2 | ~$5/mo (50GB) |
| Database | Supabase Pro | $25/mo |
| Vector DB | Included | $0 |
| CDN | Cloudflare Pro | $20/mo |
| Hosting | Vercel Pro | $20/mo |
| Background Jobs | Inngest Pro | $25/mo |
| **Total** | | **~$95/month** |

### Enterprise Setup (with OCI)
| Service | Provider | Cost |
|---------|----------|------|
| Object Storage | OCI | Free (10GB) |
| Database | OCI Autonomous | Free tier |
| Vector DB | OCI (pgvector) | Included |
| CDN | OCI + Cloudflare | ~$20/mo |
| Hosting | Vercel Enterprise | $150/mo |
| Background Jobs | OCI Functions | Free tier |
| **Total** | | **~$170/month** |

---

## Implementation Priority

### Phase 1: Immediate (This Week)
1. **Cloudflare R2** - Set up for infographic storage
2. **Supabase** - Create project with schemas

### Phase 2: Short-term (This Month)
3. **pgvector** - Enable for semantic search
4. **Inngest** - Set up background workflows

### Phase 3: Medium-term (Next Quarter)
5. **MCP Registry** - Centralized server management
6. **Analytics Dashboard** - Skill usage tracking

---

## Quick Setup Commands

```bash
# 1. Create Cloudflare R2 bucket
wrangler r2 bucket create frankx-assets

# 2. Create Supabase project (via dashboard or CLI)
supabase init
supabase db push

# 3. Install Inngest
npm install inngest
npx inngest-cli dev

# 4. Configure environment
cat >> .env.local << EOF
# Object Storage
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY=your_access_key
R2_SECRET_KEY=your_secret_key
R2_BUCKET_NAME=frankx-assets

# Database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key

# Background Jobs
INNGEST_EVENT_KEY=your_event_key
INNGEST_SIGNING_KEY=your_signing_key
EOF
```

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FRANKX UNIFIED INFRASTRUCTURE                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                    │
│  │   USERS     │────►│  VERCEL     │────►│  SUPABASE   │                    │
│  │             │     │  (Edge)     │     │  (Database) │                    │
│  └─────────────┘     └──────┬──────┘     └──────┬──────┘                    │
│                             │                   │                            │
│                             ▼                   ▼                            │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                    │
│  │ CLOUDFLARE  │◄───►│   INNGEST   │◄───►│  PGVECTOR   │                    │
│  │ R2 (Assets) │     │ (Jobs)      │     │ (Vectors)   │                    │
│  └─────────────┘     └──────┬──────┘     └─────────────┘                    │
│                             │                                                │
│                             ▼                                                │
│  ┌─────────────────────────────────────────────────────────┐                │
│  │                    MCP SERVERS                           │                │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │                │
│  │  │ Nano    │  │ GitHub  │  │ Browser │  │ Arcanea │    │                │
│  │  │ Banana  │  │ MCP     │  │ MCP     │  │ AIOS    │    │                │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │                │
│  └─────────────────────────────────────────────────────────┘                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

*Infrastructure designed for scale, starting free.*
