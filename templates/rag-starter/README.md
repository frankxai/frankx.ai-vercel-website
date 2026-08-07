# RAG Starter

A production-shaped retrieval-augmented generation app on the Vercel AI SDK 6 and Supabase pgvector. **Pattern: retrieve-then-generate** — embed your documents, fetch the closest chunks at query time, and stream a grounded answer with inline source citations.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffrankxai%2Ffrankx.ai-vercel-website%2Ftree%2Fmain%2Ftemplates%2Frag-starter&project-name=rag-starter&repository-name=rag-starter)

## What's inside

- **Ingestion** — paragraph-aware chunking, batch embedding via OpenAI `text-embedding-3-small`, stored in Supabase pgvector.
- **Retrieval + rerank** — cosine ANN search through a SQL `match_documents` function, then a cheap lexical-overlap rerank to sharpen the top results.
- **Streaming answers with citations** — `streamText` answers strictly from retrieved context and cites sources as `[1]`, `[2]`; the resolved sources come back as a response header and render in the UI.
- **BYOK** — the provider key is read from the `x-provider-key` request header per call. It is never written to disk or persisted.

## How it fits together

```
app/page.tsx ──▶ /api/ingest ──▶ lib/rag.ts (chunk → embed) ──▶ Supabase
app/page.tsx ──▶ /api/chat   ──▶ lib/rag.ts (embed → match → rerank)
                                     │
                                     ▼
                            streamText (grounded answer + [n] citations)
```

## Quickstart

1. **Install**

   ```bash
   npm install
   ```

2. **Set up the database** — create a project at [Supabase](https://supabase.com), then run [`supabase/schema.sql`](./supabase/schema.sql) in the SQL editor. It enables pgvector, creates the `documents` table, and defines `match_documents`.

3. **Configure env** — copy `.env.example` to `.env` and fill in `SUPABASE_URL` and `SUPABASE_ANON_KEY`. No provider secret is committed; you supply the OpenAI key in the UI (BYOK).

   ```bash
   cp .env.example .env
   ```

4. **Run**

   ```bash
   npm run dev
   ```

   Open http://localhost:3000, paste your OpenAI key, ingest a document, then ask a question.

## Recommended tools

These are plain links today and will later be swapped for affiliate links:

- [Vercel](https://vercel.com) — hosting and the AI SDK
- [Supabase](https://supabase.com) — Postgres + pgvector vector store
- [Pinecone](https://pinecone.io) — managed vector DB if you outgrow pgvector
- [Langfuse](https://langfuse.com) — tracing and evals for your RAG pipeline

## Scope (be honest)

This is a **starting point, not a turnkey production system.** It gives you a clean, readable RAG loop you can extend. Before you put it in front of real users, you'll likely want: a real document loader (PDF/HTML parsing), a stronger reranker (a cross-encoder such as Cohere Rerank), auth and rate limiting, row-level security on the `documents` table, batched/queued ingestion for large corpora, and evals + tracing. Treat the code as a foundation to build on.

---

Built by Frank Riemer · [frankx.ai/ai-architecture](https://frankx.ai/ai-architecture)
