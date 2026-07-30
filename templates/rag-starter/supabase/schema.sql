-- RAG starter schema for Supabase pgvector.
-- Run this in the Supabase SQL editor (or `supabase db push`) before first use.

-- 1. Enable the pgvector extension.
create extension if not exists vector;

-- 2. Document chunks table.
--    text-embedding-3-small produces 1536-dimensional vectors.
create table if not exists documents (
  id          bigint generated always as identity primary key,
  source      text not null,          -- where the chunk came from (filename, url, title)
  content     text not null,          -- the chunk text
  embedding   vector(1536) not null,  -- the chunk embedding
  created_at  timestamptz not null default now()
);

-- 3. Approximate-nearest-neighbour index for fast retrieval.
--    hnsw (pgvector >= 0.5.0) gives better recall and query speed than ivfflat
--    and needs no training or minimum row count.
create index if not exists documents_embedding_idx
  on documents
  using hnsw (embedding vector_cosine_ops);

-- 4. Similarity search function. Returns the top `match_count` chunks by cosine
--    similarity, filtered to those above `match_threshold` (0..1).
create or replace function match_documents (
  query_embedding vector(1536),
  match_threshold float default 0.2,
  match_count     int   default 8
)
returns table (
  id         bigint,
  source     text,
  content    text,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.source,
    documents.content,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
$$;
