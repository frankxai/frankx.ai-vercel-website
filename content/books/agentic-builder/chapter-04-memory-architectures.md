# Chapter 4: Memory Architectures for Agents

> "A man's real possession is his memory. In nothing else is he rich, in nothing else is he poor."
> -- Alexander Smith

---

## I. The Stateless Trap

The agent you built in Chapter 3 has a fatal flaw: it forgets everything the moment it exits. Every invocation starts from zero. It does not remember what it did yesterday. It does not know your preferences. It cannot learn from mistakes it made an hour ago. It is a brilliant amnesiac -- capable of extraordinary reasoning within a session and incapable of accumulating knowledge across sessions.

This is the stateless trap, and most deployed agents are stuck in it. They handle each conversation as an isolated event, burning context window tokens to re-establish facts that should be permanently known. The user explains their tech stack for the fifth time. The agent re-discovers that the database is PostgreSQL, not MySQL. The same error occurs, and the same debugging process unfolds, because the agent has no record of solving this exact problem before.

Memory is what transforms an agent from a tool you use into a system that works for you. Tools do the same thing every time. Systems compound. They get better with use. They accumulate understanding. They learn your codebase, your conventions, your priorities.

This chapter covers the four types of agent memory, how to implement each one, and when to use which.

---

## II. The Four Memory Types

Cognitive science distinguishes multiple memory systems in the human brain. The same taxonomy maps cleanly to agent architectures, and the mapping is not metaphorical -- it is structural. Each memory type serves a distinct function that the others cannot replicate.

### Working Memory

Working memory is the information the agent is actively processing: the current context window. It includes the system prompt, the conversation history, tool results from the current session, and any injected context. Working memory is fast (zero retrieval latency -- it is already in the prompt), limited (bounded by the context window), and volatile (lost when the session ends).

Every LLM-based agent has working memory by default. The challenge is managing it: what stays in the context window, what gets summarized, and what gets evicted when space runs low.

### Episodic Memory

Episodic memory is the record of specific past events: conversations, tool interactions, decisions, and their outcomes. "On March 15, I debugged a Redis connection timeout in the payment service. The root cause was a missing `connectTimeout` parameter in the client config. The fix was to add `connectTimeout: 5000` to `redis.config.ts`."

Episodic memory answers the question: "Have I seen this before?" It prevents repeated mistakes and enables pattern recognition across sessions.

### Semantic Memory

Semantic memory is structured knowledge about the domain: facts, relationships, hierarchies, and schemas. "The production database is PostgreSQL 15.4. The API uses Express.js with TypeScript. The deploy target is Vercel. Environment variables are in `.env.local`."

Semantic memory answers the question: "What do I know about this?" It eliminates the need to re-discover static facts on every invocation.

### Procedural Memory

Procedural memory is knowledge of how to perform specific tasks: learned procedures, refined workflows, and accumulated skills. "To deploy to production: 1. Run tests, 2. Build the project, 3. Push to main, 4. Verify the Vercel deployment, 5. Check the production URL."

Procedural memory answers the question: "How do I do this?" It encodes expertise that improves with repetition.

---

## III. Working Memory Management

The context window is the most valuable real estate in your agent's architecture. Every token counts. Effective working memory management is the difference between an agent that handles complex tasks and one that chokes on context limits.

### The Sliding Window Problem

In the Chapter 3 agent, every message accumulates in the `messages` array. After 15-20 iterations with verbose tool outputs, the array can easily consume 50,000+ tokens. The model's context window is finite. At some point, you must choose what to keep and what to discard.

### Strategy 1: Truncation

The simplest approach: when the messages array exceeds a threshold, drop the oldest messages.

```typescript
function truncateMessages(
  messages: Message[],
  maxTokens: number,
  estimateTokens: (msg: Message) => number
): Message[] {
  let totalTokens = messages.reduce((sum, msg) => sum + estimateTokens(msg), 0);

  // Always keep the first message (the original goal)
  const preserved = [messages[0]];
  const candidates = messages.slice(1);

  // Drop oldest messages until under budget
  let startIndex = 0;
  while (totalTokens > maxTokens && startIndex < candidates.length - 2) {
    totalTokens -= estimateTokens(candidates[startIndex]);
    startIndex++;
  }

  return [...preserved, ...candidates.slice(startIndex)];
}
```

Truncation is fast and simple but lossy. The agent may lose important context from early in the conversation.

### Strategy 2: Summarization

A better approach: when the context grows too large, summarize older interactions into a compact representation and replace the original messages with the summary.

```typescript
async function summarizeOlderMessages(
  client: Anthropic,
  messages: Message[],
  keepRecent: number
): Promise<Message[]> {
  if (messages.length <= keepRecent + 1) return messages;

  const goal = messages[0];
  const toSummarize = messages.slice(1, messages.length - keepRecent);
  const toKeep = messages.slice(messages.length - keepRecent);

  // Generate a summary of older interactions
  const summaryResponse = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: "Summarize the following agent interaction history concisely. " +
            "Focus on: key decisions made, tools used and their results, " +
            "errors encountered and how they were resolved, and current " +
            "progress toward the goal. Omit verbose tool outputs.",
    messages: [
      {
        role: 'user',
        content: `Goal: ${extractText(goal)}\n\nInteraction history:\n${
          toSummarize.map(m => `[${m.role}]: ${extractText(m)}`).join('\n\n')
        }`
      }
    ]
  });

  const summaryText = extractText(summaryResponse);

  return [
    goal,
    {
      role: 'user',
      content: `[CONTEXT SUMMARY - Previous ${toSummarize.length} messages summarized]\n${summaryText}`
    },
    ...toKeep
  ];
}
```

Summarization preserves the semantic content while reducing token count. The cost is an additional API call for the summary, which is typically small relative to the ongoing agent conversation.

### Strategy 3: Structured Context Injection

The most sophisticated approach: instead of keeping the entire conversation in the messages array, maintain a structured state object that is serialized into the system prompt on each iteration.

```typescript
interface AgentState {
  goal: string;
  plan: string[];
  completedSteps: { step: string; result: string; timestamp: number }[];
  currentStep: string;
  knownFacts: Record<string, string>;
  errors: { step: string; error: string; resolution: string }[];
}

function buildSystemPrompt(basePrompt: string, state: AgentState): string {
  return `${basePrompt}

## Current Task State

**Goal**: ${state.goal}

**Plan**:
${state.plan.map((s, i) => `${i + 1}. ${s}`).join('\n')}

**Completed**:
${state.completedSteps.map(s => `- ${s.step}: ${s.result}`).join('\n')}

**Current Step**: ${state.currentStep}

**Known Facts**:
${Object.entries(state.knownFacts).map(([k, v]) => `- ${k}: ${v}`).join('\n')}

**Previous Errors**:
${state.errors.map(e => `- ${e.step}: ${e.error} (resolved: ${e.resolution})`).join('\n')}
`;
}
```

This approach gives you precise control over what the agent remembers within a session. The state object is updated after each iteration, and the system prompt is rebuilt with current state. Old messages can be aggressively pruned because the essential information is captured in the state.

---

## IV. Episodic Memory: Learning from Experience

Episodic memory persists across sessions. When the agent encounters a situation it has seen before, it can retrieve the relevant episode and apply past learning.

### File-Based Episodic Memory

The simplest implementation: append each significant interaction to a log file. On startup, load recent episodes into the context.

```typescript
import { appendFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';

interface Episode {
  timestamp: string;
  goal: string;
  outcome: 'success' | 'failure' | 'partial';
  summary: string;
  toolsUsed: string[];
  lessonsLearned: string[];
}

class EpisodicMemory {
  private logPath: string;

  constructor(memoryDir: string) {
    this.logPath = join(memoryDir, 'episodes.jsonl');
  }

  async record(episode: Episode): Promise<void> {
    await mkdir(join(this.logPath, '..'), { recursive: true });
    await appendFile(this.logPath, JSON.stringify(episode) + '\n');
  }

  async retrieveRecent(count: number): Promise<Episode[]> {
    try {
      const content = await readFile(this.logPath, 'utf-8');
      const lines = content.trim().split('\n').filter(Boolean);
      return lines
        .slice(-count)
        .map(line => JSON.parse(line) as Episode);
    } catch {
      return [];
    }
  }

  async retrieveRelevant(goal: string, count: number): Promise<Episode[]> {
    // Simple keyword matching -- upgrade to embeddings for production
    const episodes = await this.retrieveRecent(100);
    const goalWords = new Set(goal.toLowerCase().split(/\s+/));

    const scored = episodes.map(ep => {
      const epWords = new Set(
        `${ep.goal} ${ep.summary}`.toLowerCase().split(/\s+/)
      );
      const overlap = [...goalWords].filter(w => epWords.has(w)).length;
      return { episode: ep, score: overlap };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map(s => s.episode);
  }
}
```

At the end of each agent run, record the episode:

```typescript
const memory = new EpisodicMemory('.agent/memory');

// After agent completes
await memory.record({
  timestamp: new Date().toISOString(),
  goal: originalGoal,
  outcome: result.success ? 'success' : 'failure',
  summary: result.output.slice(0, 500),
  toolsUsed: [...new Set(result.toolCalls.map(tc => tc.tool))],
  lessonsLearned: extractLessons(result) // LLM-generated lessons from the run
});
```

At the start of each run, inject relevant episodes into the system prompt:

```typescript
const relevantEpisodes = await memory.retrieveRelevant(goal, 3);
if (relevantEpisodes.length > 0) {
  systemPrompt += '\n\n## Relevant Past Experience\n';
  for (const ep of relevantEpisodes) {
    systemPrompt += `\n### ${ep.goal} (${ep.outcome})\n`;
    systemPrompt += `${ep.summary}\n`;
    systemPrompt += `Lessons: ${ep.lessonsLearned.join('; ')}\n`;
  }
}
```

### The CLAUDE.md Pattern

A powerful variant of episodic memory is the CLAUDE.md pattern, used by Claude Code and adopted across the Claude ecosystem. Instead of a structured log, the agent maintains a markdown file that serves as persistent context across sessions.

```typescript
class ClaudeMdMemory {
  private filePath: string;

  constructor(projectRoot: string) {
    this.filePath = join(projectRoot, 'CLAUDE.md');
  }

  async read(): Promise<string> {
    try {
      return await readFile(this.filePath, 'utf-8');
    } catch {
      return '';
    }
  }

  async addSection(heading: string, content: string): Promise<void> {
    const existing = await this.read();
    const newSection = `\n## ${heading}\n\n${content}\n`;

    if (existing.includes(`## ${heading}`)) {
      // Update existing section
      const updated = existing.replace(
        new RegExp(`## ${heading}[\\s\\S]*?(?=\\n## |$)`),
        newSection.trim()
      );
      await writeFile(this.filePath, updated);
    } else {
      await appendFile(this.filePath, newSection);
    }
  }

  async getSection(heading: string): Promise<string | null> {
    const content = await this.read();
    const match = content.match(
      new RegExp(`## ${heading}\\n\\n([\\s\\S]*?)(?=\\n## |$)`)
    );
    return match ? match[1].trim() : null;
  }
}
```

The CLAUDE.md pattern is effective because:

1. It is human-readable. You can open the file and see what the agent knows.
2. It is human-editable. You can correct mistakes, add context, or adjust priorities.
3. It is version-controlled. Git tracks changes to the agent's knowledge over time.
4. It is injected automatically. The file is loaded into the system prompt at session start.

I use this pattern extensively in ACOS. The project CLAUDE.md contains architecture decisions, naming conventions, deployment procedures, and known issues. Every agent session starts with this context, eliminating the ramp-up period that would otherwise consume the first several interactions.

---

## V. Semantic Memory: Structured Knowledge

Semantic memory stores facts and relationships that the agent needs to know but that are too numerous or too detailed to keep in the system prompt permanently.

### Vector Database Implementation

For large knowledge bases, vector databases enable semantic retrieval: find information that is conceptually related to a query, not just keyword-matched.

```typescript
interface SemanticMemory {
  store(key: string, content: string, metadata?: Record<string, unknown>): Promise<void>;
  search(query: string, limit?: number): Promise<SearchResult[]>;
  delete(key: string): Promise<void>;
}

interface SearchResult {
  key: string;
  content: string;
  similarity: number;
  metadata?: Record<string, unknown>;
}

// Implementation using an embedding model and a vector store
class VectorSemanticMemory implements SemanticMemory {
  private embedder: EmbeddingModel;
  private store: VectorStore;

  constructor(embedder: EmbeddingModel, store: VectorStore) {
    this.embedder = embedder;
    this.store = store;
  }

  async store(key: string, content: string, metadata?: Record<string, unknown>): Promise<void> {
    const embedding = await this.embedder.embed(content);
    await this.store.upsert({
      id: key,
      vector: embedding,
      payload: { content, ...metadata }
    });
  }

  async search(query: string, limit = 5): Promise<SearchResult[]> {
    const queryEmbedding = await this.embedder.embed(query);
    const results = await this.store.search(queryEmbedding, limit);

    return results.map(r => ({
      key: r.id,
      content: r.payload.content as string,
      similarity: r.score,
      metadata: r.payload
    }));
  }

  async delete(key: string): Promise<void> {
    await this.store.delete(key);
  }
}
```

Integrating vector search into the agent loop:

```typescript
async function buildContextWithSemanticMemory(
  goal: string,
  memory: SemanticMemory,
  basePrompt: string
): Promise<string> {
  // Search for relevant knowledge
  const relevant = await memory.search(goal, 5);

  if (relevant.length === 0) return basePrompt;

  let contextBlock = '\n\n## Relevant Knowledge\n';
  for (const result of relevant) {
    if (result.similarity < 0.5) continue; // Skip low-relevance results
    contextBlock += `\n### ${result.key} (relevance: ${(result.similarity * 100).toFixed(0)}%)\n`;
    contextBlock += result.content + '\n';
  }

  return basePrompt + contextBlock;
}
```

### When to Use File-Based vs. Vector vs. Graph Memory

The choice depends on the nature of the knowledge:

**File-based (CLAUDE.md, JSONL)**: Best for structured, curated knowledge that changes infrequently. Project conventions, architecture decisions, deployment procedures. Human-readable and human-editable. Works without additional infrastructure.

**Vector database (Qdrant, Pinecone, Chroma)**: Best for large, unstructured knowledge bases where retrieval is by semantic similarity. Documentation, past conversations, research notes. Scales to millions of entries. Requires an embedding model and a vector store.

**Graph database (Neo4j, or in-memory graphs)**: Best for knowledge with rich relationships. "Service A depends on Service B. Service B uses Database C. Database C is hosted on Server D." Graph queries can traverse relationships that neither keyword search nor vector similarity can efficiently express.

```typescript
// Graph memory for relationship-rich domains
interface GraphMemory {
  addEntity(id: string, type: string, properties: Record<string, unknown>): Promise<void>;
  addRelation(from: string, relation: string, to: string): Promise<void>;
  query(pattern: string): Promise<GraphResult[]>;
  getNeighbors(id: string, depth?: number): Promise<GraphNode[]>;
}

// Example: understanding a microservice architecture
await graph.addEntity('payment-service', 'service', { language: 'typescript', port: 3001 });
await graph.addEntity('user-service', 'service', { language: 'typescript', port: 3002 });
await graph.addEntity('postgres-main', 'database', { version: '15.4', host: 'db.internal' });
await graph.addRelation('payment-service', 'depends_on', 'user-service');
await graph.addRelation('payment-service', 'reads_from', 'postgres-main');
await graph.addRelation('user-service', 'writes_to', 'postgres-main');

// Agent can now query: "What services depend on postgres-main?"
const dependents = await graph.query('(?)-[:reads_from|writes_to]->(postgres-main)');
// Returns: payment-service, user-service
```

---

## VI. Procedural Memory: Learning How

Procedural memory stores learned procedures -- sequences of actions that accomplish specific tasks. Unlike episodic memory (which records what happened), procedural memory records how to do something, refined through experience.

### Skill Files

The most practical implementation of procedural memory is the skill file: a structured document that describes a procedure, including prerequisites, steps, error handling, and verification.

```typescript
interface Skill {
  name: string;
  description: string;
  triggers: string[];     // Keywords or patterns that activate this skill
  prerequisites: string[];
  steps: SkillStep[];
  errorHandlers: ErrorHandler[];
  verification: string;
  lastUsed: string;
  successRate: number;     // Tracked over time
  refinements: string[];   // Notes from past executions
}

interface SkillStep {
  description: string;
  tool: string;
  inputTemplate: Record<string, unknown>;
  expectedOutput: string;
}

class ProceduralMemory {
  private skillsDir: string;

  constructor(skillsDir: string) {
    this.skillsDir = skillsDir;
  }

  async findSkill(goal: string): Promise<Skill | null> {
    const skills = await this.loadAllSkills();
    // Check triggers
    for (const skill of skills) {
      const goalLower = goal.toLowerCase();
      if (skill.triggers.some(t => goalLower.includes(t.toLowerCase()))) {
        return skill;
      }
    }
    return null;
  }

  async recordRefinement(skillName: string, refinement: string): Promise<void> {
    const skill = await this.loadSkill(skillName);
    if (skill) {
      skill.refinements.push(`[${new Date().toISOString()}] ${refinement}`);
      skill.lastUsed = new Date().toISOString();
      await this.saveSkill(skill);
    }
  }

  async updateSuccessRate(skillName: string, succeeded: boolean): Promise<void> {
    const skill = await this.loadSkill(skillName);
    if (skill) {
      // Exponential moving average
      const alpha = 0.2;
      skill.successRate = alpha * (succeeded ? 1 : 0) + (1 - alpha) * skill.successRate;
      await this.saveSkill(skill);
    }
  }

  private async loadAllSkills(): Promise<Skill[]> {
    const fs = await import('fs/promises');
    const files = await fs.readdir(this.skillsDir);
    const skills: Skill[] = [];
    for (const file of files) {
      if (file.endsWith('.json')) {
        const content = await fs.readFile(join(this.skillsDir, file), 'utf-8');
        skills.push(JSON.parse(content));
      }
    }
    return skills;
  }

  private async loadSkill(name: string): Promise<Skill | null> {
    try {
      const fs = await import('fs/promises');
      const content = await fs.readFile(
        join(this.skillsDir, `${name}.json`), 'utf-8'
      );
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  private async saveSkill(skill: Skill): Promise<void> {
    const fs = await import('fs/promises');
    await fs.writeFile(
      join(this.skillsDir, `${skill.name}.json`),
      JSON.stringify(skill, null, 2)
    );
  }
}
```

The skill file pattern is used in ACOS to manage 75+ skills across 38 agents. Each skill has activation triggers, step-by-step procedures, and refinement logs that accumulate with use. When an agent encounters a task that matches a skill trigger, it loads the skill and follows the procedure rather than reasoning from scratch. The success rate tracking surfaces skills that need refinement -- if a skill's success rate drops below a threshold, it gets flagged for review.

---

## VII. The Compound Effect

Memory architectures are not independent systems. They interact and amplify each other:

1. **Working memory** is the agent's scratch pad. It holds the current conversation plus injected context from the other three memory types.

2. **Episodic memory** provides relevant history: "last time you did this, here is what happened." This is injected into working memory at the start of each session.

3. **Semantic memory** provides domain knowledge: "here are the facts relevant to your current goal." This is retrieved via semantic search and injected into working memory on each iteration or at session start.

4. **Procedural memory** provides learned procedures: "here is how to accomplish this type of task." This is matched by trigger keywords and injected when relevant.

The compound effect: an agent with all four memory types does not just remember more -- it reasons better. Episodic memory prevents repeated mistakes. Semantic memory eliminates redundant discovery. Procedural memory provides tested procedures. Working memory orchestrates all of it in service of the current goal.

Over time, the improvement is not linear but exponential. Each successful task generates episodes that inform future tasks. Each learned fact reduces the cognitive overhead of future interactions. Each refined procedure increases the success rate of future executions.

An agent you use for one week is useful. An agent you use for one month is valuable. An agent you use for one year is indispensable. The difference is memory.

---

## VIII. Implementation Checklist

Start with file-based memory. It requires no infrastructure, is human-readable, and handles most use cases. Add vector search when your knowledge base exceeds what fits in a system prompt. Add graph memory when relationships between entities are critical to your domain.

The practical starting point:

1. Add a CLAUDE.md file to your project. Populate it with conventions, architecture decisions, and known issues. Inject it into the system prompt.

2. Add episodic logging. At the end of each agent run, append a structured episode to a JSONL file. At the start of each run, load the most recent and most relevant episodes.

3. Add working memory management. Implement summarization for long conversations. Set a token budget and enforce it.

4. Add procedural memory when you notice the agent performing the same multi-step tasks repeatedly. Extract the procedure into a skill file with triggers, steps, and verification.

Each layer adds value independently. Together, they transform a stateless tool into a system that learns.
