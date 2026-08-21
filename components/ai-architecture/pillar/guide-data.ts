import type { StackLayer } from './ReferenceStackScene'

/**
 * The seven planes of a production AI system, authored top-down: what the reader
 * touches first is listed first, and the plane everything else depends on sits at
 * the base. `boundary` describes the seam *below* each plane — the thing that
 * changes character when a request crosses it.
 */
export const referenceStack: StackLayer[] = [
  {
    id: 'experience',
    index: '07',
    name: 'Experience',
    role: 'Stream partial work, and let a human interrupt it or approve it.',
    parts: ['Streaming UI', 'Interruption', 'Approval'],
    boundary: 'human boundary — approval and interruption live here or nowhere',
  },
  {
    id: 'observability',
    index: '06',
    name: 'Observability',
    role: 'Record every model call, tool call, and token as one traceable run.',
    parts: ['Traces', 'Spans', 'Cost + latency'],
    boundary: 'evidence boundary — below this line you are guessing',
  },
  {
    id: 'evaluation',
    index: '05',
    name: 'Evaluation',
    role: 'Decide whether a change made the system better, before users do.',
    parts: ['Offline suites', 'Trajectories', 'Online sampling'],
    boundary: 'correctness boundary — the loop is only as good as what grades it',
  },
  {
    id: 'orchestration',
    index: '04',
    name: 'Orchestration',
    role: 'Choose the shape: fixed workflow, one agent loop, or many.',
    parts: ['The loop', 'Durable execution', 'Handoffs'],
    boundary: 'privilege boundary — the loop decides what gets called with real permissions',
  },
  {
    id: 'tools',
    index: '03',
    name: 'Tool surface',
    role: 'Expose capability with schemas, scopes, and an audit trail.',
    parts: ['MCP servers', 'Schemas', 'Scopes'],
    boundary: 'trust boundary — everything returned from here is untrusted input',
  },
  {
    id: 'context',
    index: '02',
    name: 'Context and retrieval',
    role: 'Put the right tokens in the window, and leave the rest out.',
    parts: ['Hybrid search', 'Rerank', 'Memory'],
    boundary: 'relevance boundary — retrieval failures arrive disguised as model failures',
  },
  {
    id: 'model',
    index: '01',
    name: 'Model access',
    role: 'Reach a model, survive it being slow, wrong, or gone.',
    parts: ['Gateway', 'Routing', 'Fallback', 'Cache'],
    boundary: 'vendor boundary — swap cost is decided the day you build this',
  },
]

export type ShapeChoice = {
  shape: string
  useWhen: string
  cost: string
  failure: string
}

/** The orchestration decision, stated as a table because it is a table. */
export const shapeChoices: ShapeChoice[] = [
  {
    shape: 'Fixed workflow',
    useWhen: 'You can name every step before the request arrives.',
    cost: 'No adaptation when the input is not what you planned for.',
    failure: 'Stays confident and goes silently wrong once reality drifts from the graph.',
  },
  {
    shape: 'Single agent loop',
    useWhen: 'The steps are unknown but the task is one coherent piece of work.',
    cost: 'Latency and spend grow with the length of the loop.',
    failure: 'The loop loses track of its own earlier decisions as the window fills.',
  },
  {
    shape: 'Parallel sub-agents',
    useWhen: 'Breadth-first gathering, where each lookup is independent of the others.',
    cost: 'A merge step you have to design, and results that can contradict.',
    failure: 'Duplicated work, and summaries that disagree with no way to adjudicate.',
  },
  {
    shape: 'Sequential sub-agents',
    useWhen: 'Work that mutates shared state and must not interleave.',
    cost: 'Throughput. You gave up the parallelism on purpose.',
    failure: 'Slow enough that someone proposes parallelising the writes again.',
  },
]

export type FailureMode = {
  name: string
  looksLike: string
  actualCause: string
  fix: string
}

/**
 * Failure modes are listed by what an operator actually sees first, because the
 * observed symptom and the real cause almost never sit in the same plane.
 */
export const failureModes: FailureMode[] = [
  {
    name: 'Answers degrade as the conversation grows',
    looksLike: 'The model was fine for ten turns and then started contradicting itself.',
    actualCause: 'The window filled with its own transcript. Early decisions fell out of attention.',
    fix: 'Compact deliberately: summarise closed sub-tasks, keep decisions, drop the reasoning that produced them.',
  },
  {
    name: 'Retrieval looks healthy, answers are wrong',
    looksLike: 'Search returns plausible documents and the answer still misses.',
    actualCause: 'Chunking split the answer across boundaries, or the reranker never saw the right candidate.',
    fix: 'Measure retrieval separately from generation. A generation eval cannot see a recall problem.',
  },
  {
    name: 'A tool result changes the agent’s goal',
    looksLike: 'The agent does something nobody asked for, citing a document.',
    actualCause: 'Injection. Retrieved and tool-returned text was treated as instruction, not data.',
    fix: 'Keep untrusted content out of the instruction position, and gate side effects behind approval.',
  },
  {
    name: 'Costs move without a deploy',
    looksLike: 'Spend rises on a week with no releases.',
    actualCause: 'Cache misses, retry storms, or a loop whose exit condition depends on model output.',
    fix: 'Budget per run, not per month. Cap loop iterations in code rather than in the prompt.',
  },
  {
    name: 'Evals pass, production regresses',
    looksLike: 'Green suite, unhappy users.',
    actualCause: 'The suite grades final answers while the failure is in the trajectory.',
    fix: 'Grade the path as well as the destination, and keep a sample of real traffic in the loop.',
  },
]
