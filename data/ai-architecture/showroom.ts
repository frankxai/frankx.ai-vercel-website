// These previews describe the linked source. They do not execute model calls.
const SOURCE = 'https://github.com/frankxai/frankx.ai-vercel-website/tree/171d2143d8f9aeaa855b8cc0891030d0dd5312f0/templates'

export type ShowroomStep = {
  id: string
  label: string
  technology: string
  type: 'client' | 'gateway' | 'service' | 'database' | 'queue' | 'ai'
  description: string
  x: number
  y: number
}

export type ShowroomSystem = {
  id: string
  label: string
  title: string
  description: string
  image: string
  owner: string
  source: string
  sourceLabel?: string
  deploy: string
  deployLabel: string
  requirements: string[]
  limitation: string
  steps: ShowroomStep[]
  connections: [string, string][]
}

function vercelClone(directory: string, name: string, env?: string) {
  const url = new URL('https://vercel.com/new/clone')
  url.searchParams.set('repository-url', `${SOURCE}/${directory}`)
  url.searchParams.set('project-name', name)
  url.searchParams.set('repository-name', name)
  if (env) {
    url.searchParams.set('env', env)
    url.searchParams.set('envDescription', 'Apply supabase/schema.sql, then enter your project URL and anon key. Supply your model key in the app.')
    url.searchParams.set('envLink', `${SOURCE}/${directory}#quickstart`)
  }
  return url.toString()
}

export const showroomSystems: ShowroomSystem[] = [
  {
    id: 'retrieval', label: 'Knowledge app', title: 'Give every answer a source.',
    description: 'Ingest documents, retrieve relevant passages, and stream an answer with citations. Inspect the seams before you connect your own data.',
    image: '/images/ai-architecture/knowledge-vault-v1.webp', owner: 'FrankX · MIT starter',
    source: `${SOURCE}/rag-starter`, deploy: vercelClone('rag-starter', 'frankx-rag', 'SUPABASE_URL,SUPABASE_ANON_KEY'), deployLabel: 'Deploy to Vercel',
    requirements: ['Vercel account', 'Supabase project + schema.sql', 'Your OpenAI API key'],
    limitation: 'Starter scope: add authentication, document permissions, rate limits, and retrieval evaluation before serving private data.',
    steps: [
      { id: 'web', label: 'Chat interface', technology: 'Next.js', type: 'client', description: 'app/page.tsx sends your query and a per-request provider key. The UI renders streamed text and source references.', x: 0, y: 110 },
      { id: 'ingest', label: 'Document ingestion', technology: 'Chunk + embed', type: 'service', description: 'app/api/ingest/route.ts splits text into paragraph-aware chunks and creates embeddings through lib/rag.ts.', x: 230, y: 0 },
      { id: 'retrieve', label: 'Retrieve + rerank', technology: 'lib/rag.ts', type: 'service', description: 'The query embedding selects passages using match_documents; a lexical-overlap rerank reorders the candidates.', x: 230, y: 200 },
      { id: 'store', label: 'Document store', technology: 'Supabase · pgvector', type: 'database', description: 'supabase/schema.sql defines documents and the vector search function. Apply the SQL before using the app.', x: 470, y: 0 },
      { id: 'answer', label: 'Grounded response', technology: 'AI SDK · streamText', type: 'ai', description: 'app/api/chat/route.ts passes retrieved passages as context and streams the answer with numbered citations.', x: 470, y: 200 },
    ], connections: [['web','ingest'],['ingest','store'],['web','retrieve'],['store','retrieve'],['retrieve','answer']],
  },
  {
    id: 'team', label: 'Agent team', title: 'See who does the work.',
    description: 'An orchestrator delegates research and writing to tools. The app streams each step so you can inspect the handoff and the result.',
    image: '/images/ai-architecture/agent-engine-v1.webp', owner: 'FrankX · MIT starter',
    source: `${SOURCE}/multi-agent`, deploy: vercelClone('multi-agent', 'frankx-agent-team'), deployLabel: 'Deploy to Vercel',
    requirements: ['Vercel account', 'Your OpenAI API key', 'A search provider for real research'],
    limitation: 'The search tool returns deterministic sample results. Replace it with a real search API. The orchestrator stops after at most eight steps.',
    steps: [
      { id: 'web', label: 'Task interface', technology: 'Next.js', type: 'client', description: 'app/page.tsx displays streamed tool calls, their inputs and outputs, and the final response.', x: 0, y: 100 },
      { id: 'plan', label: 'Orchestrator', technology: 'AI SDK · 8-step cap', type: 'ai', description: 'lib/agents.ts constructs researchAgent with search and write tools and stepCountIs(8) as its exit condition.', x: 230, y: 100 },
      { id: 'search', label: 'Research tool', technology: 'Sample results', type: 'service', description: 'The search execute function currently returns canned snippets. This is the explicit integration seam for a search API.', x: 470, y: 0 },
      { id: 'write', label: 'Writer agent', technology: 'generateText', type: 'ai', description: 'The write tool sends the supplied notes to a focused model call. It asks the writer to stay within those notes.', x: 470, y: 200 },
    ], connections: [['web','plan'],['plan','search'],['search','plan'],['plan','write'],['write','plan']],
  },
  {
    id: 'workers', label: 'Cloud workers', title: 'Let the job outlive the request.',
    description: 'A reference design for a coordinator, two specialist workers, Redis, and Postgres. Requests create tasks; workers carry them forward.',
    image: '/images/ai-architecture/agent-engine-v1.webp', owner: 'Railway · official reference',
    source: 'https://github.com/railwayapp-templates/multi-agent-system', deploy: 'https://railway.com/deploy/multi-agent-system', deployLabel: 'Review Railway setup',
    requirements: ['Railway account + hosting budget', 'Your OpenAI API key', 'Review service variables and access'],
    limitation: 'The repository describes six services; Railway’s deployment setup currently lists one. Compare the topology before deploying. An end-to-end model run has not been verified here.',
    steps: [
      { id: 'api', label: 'Task API', technology: 'FastAPI', type: 'gateway', description: 'POST /tasks creates a task; GET /tasks/{id} retrieves the result from the orchestrator service.', x: 0, y: 100 },
      { id: 'queue', label: 'Work queues', technology: 'Redis', type: 'queue', description: 'Agent-specific Redis queues dispatch research and writing. Workers poll their own queue.', x: 230, y: 100 },
      { id: 'research', label: 'Research worker', technology: 'OpenAI', type: 'ai', description: 'The researcher calls the model, stores its output, and queues follow-up work for the writer.', x: 470, y: 0 },
      { id: 'write', label: 'Writing worker', technology: 'OpenAI', type: 'ai', description: 'The writer consumes queued work and saves the article to the task state.', x: 470, y: 200 },
      { id: 'db', label: 'Task state', technology: 'Postgres', type: 'database', description: 'The initialization service creates the tasks table. Agent output and completion state are persisted here.', x: 710, y: 100 },
    ], connections: [['api','queue'],['queue','research'],['research','queue'],['queue','write'],['research','db'],['write','db'],['db','api']],
  },
  {
    id: 'n8n', label: 'n8n automation', title: 'Separate the editor from execution.',
    description: 'A hosted n8n queue-mode stack separates the workflow editor, workers, execution queue, and database. Bring your workflows and credentials after setup.',
    image: '/images/ai-architecture/knowledge-vault-v1.webp', owner: 'Railway · community template',
    source: 'https://railway.com/deploy/n8n-with-workers', sourceLabel: 'Review template details', deploy: 'https://railway.com/new/template/n8n-with-workers', deployLabel: 'Open n8n deployment',
    requirements: ['Railway account + hosting budget', 'Review encryption and database variables', 'Import workflows and connect credentials'],
    limitation: 'This deploys the n8n runtime. AI workflow imports, model credentials, and production hardening are separate steps.',
    steps: [
      { id: 'editor', label: 'Workflow editor', technology: 'n8n main', type: 'client', description: 'The main n8n service exposes the editor and receives workflow triggers.', x: 0, y: 100 },
      { id: 'queue', label: 'Execution queue', technology: 'Redis', type: 'queue', description: 'Queue mode passes execution jobs to the worker service rather than running them all in the editor process.', x: 230, y: 100 },
      { id: 'worker', label: 'Workflow worker', technology: 'n8n worker', type: 'service', description: 'Workers execute the imported workflows. Configure the same encryption key and database connection as the main service.', x: 470, y: 0 },
      { id: 'db', label: 'Execution store', technology: 'Postgres', type: 'database', description: 'The database retains workflow definitions, credentials, and execution data. Configure backups and retention for your use case.', x: 470, y: 200 },
    ], connections: [['editor','queue'],['queue','worker'],['editor','db'],['worker','db']],
  },
]
