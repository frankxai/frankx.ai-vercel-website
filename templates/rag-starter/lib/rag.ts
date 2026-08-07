import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { createOpenAI } from '@ai-sdk/openai';
import { embed, embedMany } from 'ai';

const EMBEDDING_MODEL = 'text-embedding-3-small';
const CHUNK_SIZE = 1000; // characters
const CHUNK_OVERLAP = 150; // characters carried into the next chunk

export type RetrievedChunk = {
  id: number;
  source: string;
  content: string;
  similarity: number;
};

// Minimal schema so the client doesn't infer `never` for inserts/RPC.
// Regenerate with `supabase gen types typescript` once your schema grows.
// The Views/Functions keys are required for supabase-js to treat this as a
// valid schema (otherwise `.from()`/`.rpc()` fall back to `never`).
type DocumentRow = { source: string; content: string; embedding: number[] };
type MatchArgs = { query_embedding: number[]; match_threshold: number; match_count: number };
type Database = {
  public: {
    Tables: {
      documents: {
        Row: DocumentRow & { id: number };
        Insert: DocumentRow;
        Update: Partial<DocumentRow>;
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: {
      match_documents: {
        Args: MatchArgs;
        Returns: { id: number; source: string; content: string; similarity: number }[];
      };
    };
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};

let supabaseClient: SupabaseClient<Database> | null = null;

function supabase() {
  if (supabaseClient) return supabaseClient;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be set.');
  }
  supabaseClient = createClient<Database>(url, key);
  return supabaseClient;
}

// BYOK: the caller passes the provider key per-request. We never read it from
// disk or persist it. Falls back to OPENAI_API_KEY only for local convenience.
function embeddings(providerKey?: string) {
  const apiKey = providerKey || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('No provider key. Send one in the `x-provider-key` header.');
  }
  return createOpenAI({ apiKey }).textEmbeddingModel(EMBEDDING_MODEL);
}

// Split on paragraph boundaries first, then pack paragraphs into overlapping
// windows. Keeps related sentences together far better than a blind char split.
export function chunk(text: string): string[] {
  const clean = text.replace(/\r\n/g, '\n').trim();
  if (!clean) return [];

  const paragraphs = clean.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const chunks: string[] = [];
  let current = '';

  for (const para of paragraphs) {
    if (current.length + para.length + 2 <= CHUNK_SIZE) {
      current = current ? `${current}\n\n${para}` : para;
      continue;
    }
    if (current) chunks.push(current);
    if (para.length <= CHUNK_SIZE) {
      current = para;
    } else {
      // A single oversized paragraph: hard-split with overlap.
      for (let i = 0; i < para.length; i += CHUNK_SIZE - CHUNK_OVERLAP) {
        chunks.push(para.slice(i, i + CHUNK_SIZE));
      }
      current = '';
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

// Ingest a document: chunk -> embed -> store.
export async function ingest(
  source: string,
  text: string,
  providerKey?: string
): Promise<number> {
  const chunks = chunk(text);
  if (chunks.length === 0) return 0;

  const { embeddings: vectors } = await embedMany({
    model: embeddings(providerKey),
    values: chunks,
  });

  const rows = chunks.map((content, i) => ({
    source,
    content,
    embedding: vectors[i],
  }));

  const { error } = await supabase().from('documents').insert(rows);
  if (error) throw new Error(`Insert failed: ${error.message}`);
  return rows.length;
}

// Retrieve the most relevant chunks for a query, then rerank by a blend of
// similarity and lexical overlap. This is a cheap, dependency-free reranker —
// swap in a cross-encoder (e.g. Cohere Rerank) for higher precision.
export async function retrieve(
  query: string,
  providerKey?: string,
  topK = 5
): Promise<RetrievedChunk[]> {
  const { embedding } = await embed({
    model: embeddings(providerKey),
    value: query,
  });

  const { data, error } = await supabase().rpc('match_documents', {
    query_embedding: embedding,
    match_threshold: 0.2,
    match_count: topK * 3, // over-fetch, then rerank down to topK
  });
  if (error) throw new Error(`Retrieval failed: ${error.message}`);

  const candidates = (data ?? []) as RetrievedChunk[];
  const terms = query.toLowerCase().split(/\W+/).filter((t) => t.length > 2);

  return candidates
    .map((c) => {
      const text = c.content.toLowerCase();
      const hits = terms.filter((t) => text.includes(t)).length;
      const lexical = terms.length ? hits / terms.length : 0;
      const score = 0.75 * c.similarity + 0.25 * lexical;
      return { ...c, similarity: score };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);
}

// Format retrieved chunks into a context block with numbered citations.
export function buildContext(chunks: RetrievedChunk[]): string {
  if (chunks.length === 0) return 'No relevant context was found.';
  return chunks
    .map((c, i) => `[${i + 1}] (source: ${c.source})\n${c.content}`)
    .join('\n\n');
}
