# Enterprise RAG Platform

Production-ready Retrieval-Augmented Generation system with multi-provider AI, pgvector storage, and real-time document processing.

## Quick Deploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/frankx-rag?referralCode=RAILWAY_REF)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/frankxai/enterprise-rag-template)

## Architecture

```
Client → Next.js Frontend → FastAPI Backend → pgvector + Redis
                                            → Claude / GPT-4 / Gemini
                                            → Document Processor
```

## Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.11+
- **Database**: PostgreSQL + pgvector extension
- **Cache**: Redis (optional)
- **AI**: Anthropic Claude, OpenAI, Google Gemini (multi-provider)
- **Deploy**: Railway (backend), Vercel (frontend)

## Setup

1. Clone this repo
2. Copy `.env.example` to `.env.local`
3. Add your API keys
4. `npm install && npm run dev`

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Claude API key |
| `DATABASE_URL` | Yes | PostgreSQL with pgvector |
| `OPENAI_API_KEY` | No | For embeddings |
| `REDIS_URL` | No | Caching layer |

## License

Commercial license included with purchase. Use in client projects, SaaS products, or internal tools.

---

Built by [FrankX](https://frankx.ai) — AI Architect
