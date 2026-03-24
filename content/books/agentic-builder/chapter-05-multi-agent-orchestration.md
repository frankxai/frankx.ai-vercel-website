# Chapter 5: Multi-Agent Orchestration

> "No man is an island, entire of itself; every man is a piece of the continent, a part of the main."
> -- John Donne

---

## I. The Scaling Wall

A single agent with the right tools can accomplish remarkable things. It can research topics, write code, manage files, query databases, and synthesize findings. But there is a ceiling. As the number of tools grows, tool selection accuracy degrades. As the task complexity grows, the context window fills with intermediate state that crowds out the original objective. As the scope grows, the agent attempts to hold too many concerns in its working memory simultaneously.

This is the scaling wall. Not a hard failure -- a gradual degradation in quality, coherence, and reliability. An agent with 15 tools performs well. An agent with 50 tools starts picking wrong ones. An agent with 150 tools is unreliable.

The solution is the same one that software engineering discovered decades ago: decomposition. Instead of one system that does everything, build multiple systems with clear boundaries and defined interfaces. Instead of one agent with every tool, build multiple agents with distinct competencies.

One agent is a tool. Multiple agents working together are a team.

---

## II. Orchestration Patterns

There are four fundamental patterns for coordinating multiple agents. Each has distinct characteristics that make it appropriate for different problem structures.

### Pattern 1: Sequential Pipeline

Agents execute in a fixed order, each transforming the output of the previous stage.

```
[Input] → Agent A → Agent B → Agent C → [Output]
```

The pipeline is appropriate when the task has a natural sequential decomposition: research, then draft, then review. Each agent receives the full output of the previous agent as its input. There are no loops, no branching, no parallel execution.

```typescript
interface PipelineStage {
  name: string;
  agent: Agent;
  transform?: (input: string) => string; // Optional input transformation
}

async function runPipeline(
  input: string,
  stages: PipelineStage[]
): Promise<string> {
  let current = input;

  for (const stage of stages) {
    console.log(`\n[Pipeline] Stage: ${stage.name}`);
    const stageInput = stage.transform ? stage.transform(current) : current;
    const result = await stage.agent.run(stageInput);

    if (!result.success) {
      throw new Error(
        `Pipeline failed at stage '${stage.name}': ${result.output}`
      );
    }

    current = result.output;
  }

  return current;
}

// Usage: Research → Write → Review pipeline
const pipeline: PipelineStage[] = [
  {
    name: 'research',
    agent: createAgent({
      systemPrompt: "You are a research agent. Investigate the given topic thoroughly. Return structured findings with sources.",
      tools: [webSearch, readUrl, extractContent]
    })
  },
  {
    name: 'write',
    agent: createAgent({
      systemPrompt: "You are a writing agent. Using the provided research, write a comprehensive article. Follow the structure: introduction, key findings, analysis, conclusion.",
      tools: [writeFile, readFile]
    }),
    transform: (research) => `Write an article based on this research:\n\n${research}`
  },
  {
    name: 'review',
    agent: createAgent({
      systemPrompt: "You are an editorial agent. Review the article for accuracy, clarity, and completeness. Return the revised article with improvements.",
      tools: [readFile, writeFile, webSearch]  // Can fact-check claims
    }),
    transform: (draft) => `Review and improve this article:\n\n${draft}`
  }
];

const article = await runPipeline("AI agents in healthcare 2026", pipeline);
```

**Strengths**: Simple to implement, easy to debug, predictable execution order.

**Weaknesses**: No parallelism, no feedback loops, one stage's failure blocks everything downstream.

### Pattern 2: Parallel Fan-Out

Multiple agents work simultaneously on independent subtasks, and their results are aggregated.

```
            ┌→ Agent A →┐
[Input] → ──┼→ Agent B →┼── [Aggregate] → [Output]
            └→ Agent C →┘
```

Fan-out is appropriate when a task can be decomposed into independent subtasks that do not depend on each other's outputs.

```typescript
interface FanOutTask {
  name: string;
  agent: Agent;
  input: string;
}

interface FanOutResult {
  name: string;
  success: boolean;
  output: string;
  durationMs: number;
}

async function fanOut(tasks: FanOutTask[]): Promise<FanOutResult[]> {
  const startTime = Date.now();

  const results = await Promise.allSettled(
    tasks.map(async (task): Promise<FanOutResult> => {
      const taskStart = Date.now();
      const result = await task.agent.run(task.input);
      return {
        name: task.name,
        success: result.success,
        output: result.output,
        durationMs: Date.now() - taskStart
      };
    })
  );

  return results.map((r, i) => {
    if (r.status === 'fulfilled') return r.value;
    return {
      name: tasks[i].name,
      success: false,
      output: `Agent error: ${r.reason}`,
      durationMs: Date.now() - startTime
    };
  });
}

// Usage: Analyze a codebase from multiple angles simultaneously
const analysisResults = await fanOut([
  {
    name: 'security-audit',
    agent: securityAgent,
    input: `Audit this codebase for security vulnerabilities: ${codebaseSummary}`
  },
  {
    name: 'performance-review',
    agent: performanceAgent,
    input: `Identify performance bottlenecks in: ${codebaseSummary}`
  },
  {
    name: 'architecture-review',
    agent: architectureAgent,
    input: `Review the architecture of: ${codebaseSummary}`
  }
]);
```

**Strengths**: Fast (wall-clock time = slowest agent, not sum of all agents), naturally parallel.

**Weaknesses**: No inter-agent communication, requires independent subtasks, aggregation can be non-trivial.

### Pattern 3: Hierarchical Delegation

A coordinator agent receives a goal, decomposes it, delegates subtasks to specialist agents, and synthesizes their results. The coordinator can re-delegate, request revisions, and manage the overall workflow dynamically.

```
                     [Coordinator]
                    /      |      \
              Agent A   Agent B   Agent C
                |         |         |
             Result A  Result B  Result C
                    \      |      /
                     [Synthesis]
```

This is the most powerful and most common pattern for complex tasks.

```typescript
interface SpecialistAgent {
  name: string;
  description: string;
  capabilities: string[];
  agent: Agent;
}

interface DelegationRequest {
  specialist: string;
  task: string;
  context: string;
  expectedOutput: string;
}

class Coordinator {
  private client: Anthropic;
  private specialists: Map<string, SpecialistAgent>;
  private conversationLog: string[];

  constructor(specialists: SpecialistAgent[]) {
    this.client = new Anthropic();
    this.specialists = new Map(specialists.map(s => [s.name, s]));
    this.conversationLog = [];
  }

  async orchestrate(goal: string): Promise<string> {
    const systemPrompt = this.buildCoordinatorPrompt();

    const messages: Anthropic.MessageParam[] = [
      { role: 'user', content: goal }
    ];

    // The coordinator's tool: delegate to specialists
    const coordinatorTools: Anthropic.Tool[] = [
      {
        name: 'delegate',
        description:
          'Delegate a subtask to a specialist agent. Choose the specialist ' +
          'based on the task requirements. Provide clear, self-contained ' +
          'instructions -- the specialist has no access to your conversation ' +
          'history unless you include it in the context.',
        input_schema: {
          type: 'object' as const,
          properties: {
            specialist: {
              type: 'string',
              description: `Name of the specialist. Available: ${
                [...this.specialists.keys()].join(', ')
              }`
            },
            task: {
              type: 'string',
              description: 'Clear description of what the specialist should accomplish.'
            },
            context: {
              type: 'string',
              description: 'Relevant context the specialist needs. Include any outputs from previous delegations that inform this task.'
            }
          },
          required: ['specialist', 'task', 'context']
        }
      },
      {
        name: 'request_revision',
        description:
          'Send a specialist\'s output back for revision with specific feedback. ' +
          'Use when the output is close but needs improvement.',
        input_schema: {
          type: 'object' as const,
          properties: {
            specialist: { type: 'string', description: 'Specialist to revise.' },
            originalOutput: { type: 'string', description: 'The output to revise.' },
            feedback: { type: 'string', description: 'Specific revision instructions.' }
          },
          required: ['specialist', 'originalOutput', 'feedback']
        }
      }
    ];

    let iterations = 0;
    const maxIterations = 20;

    while (iterations < maxIterations) {
      iterations++;

      const response = await this.client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: systemPrompt,
        tools: coordinatorTools,
        messages
      });

      if (response.stop_reason === 'end_turn') {
        const textBlocks = response.content.filter(
          (b): b is Anthropic.TextBlock => b.type === 'text'
        );
        return textBlocks.map(b => b.text).join('\n');
      }

      if (response.stop_reason === 'tool_use') {
        messages.push({ role: 'assistant', content: response.content });

        const toolResults: Anthropic.ToolResultBlockParam[] = [];

        for (const block of response.content) {
          if (block.type !== 'tool_use') continue;

          const input = block.input as Record<string, string>;
          let result: string;

          if (block.name === 'delegate') {
            result = await this.executeDelegation(
              input.specialist,
              input.task,
              input.context
            );
          } else if (block.name === 'request_revision') {
            result = await this.executeDelegation(
              input.specialist,
              `Revise the following output based on this feedback:\n\nFeedback: ${input.feedback}\n\nOriginal output:\n${input.originalOutput}`,
              ''
            );
          } else {
            result = `Unknown coordinator tool: ${block.name}`;
          }

          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: result
          });
        }

        messages.push({ role: 'user', content: toolResults });
      }
    }

    return 'Coordinator exceeded maximum iterations.';
  }

  private async executeDelegation(
    specialistName: string,
    task: string,
    context: string
  ): Promise<string> {
    const specialist = this.specialists.get(specialistName);
    if (!specialist) {
      return `Error: Unknown specialist '${specialistName}'. Available: ${
        [...this.specialists.keys()].join(', ')
      }`;
    }

    console.log(`\n[Coordinator] Delegating to ${specialistName}: ${task.slice(0, 100)}...`);

    const fullInput = context
      ? `Context:\n${context}\n\nTask:\n${task}`
      : task;

    const result = await specialist.agent.run(fullInput);

    this.conversationLog.push(
      `[${specialistName}] Task: ${task.slice(0, 200)}\n` +
      `Result: ${result.output.slice(0, 500)}`
    );

    return result.success
      ? result.output
      : `Specialist '${specialistName}' failed: ${result.output}`;
  }

  private buildCoordinatorPrompt(): string {
    const specialistList = [...this.specialists.values()]
      .map(s => `- **${s.name}**: ${s.description}. Capabilities: ${s.capabilities.join(', ')}`)
      .join('\n');

    return `You are a coordinator agent. Your role is to accomplish complex goals by delegating subtasks to specialist agents and synthesizing their results.

## Available Specialists
${specialistList}

## Coordination Principles

1. **Decompose first**: Before delegating, break the goal into clear subtasks.
2. **Match specialists to tasks**: Choose the specialist whose capabilities best fit each subtask.
3. **Provide complete context**: Specialists have no memory of previous delegations. Include all relevant information in the context field.
4. **Verify and synthesize**: After receiving results, verify they meet requirements. Request revisions if needed. Synthesize all results into a coherent final output.
5. **Handle failures**: If a specialist fails, try a different approach or specialist. Do not repeat the same delegation.

## Output
When all subtasks are complete, produce a final synthesis that addresses the original goal. Do not use the delegate tool in your final response -- just provide the answer.`;
  }
}
```

### Pattern 4: Peer-to-Peer Negotiation

Agents communicate directly with each other to reach consensus or coordinate actions. There is no central coordinator -- agents negotiate roles, share information, and resolve conflicts through direct messaging.

This pattern is the most complex and the least commonly deployed in production. It is appropriate for adversarial scenarios (red team vs. blue team), consensus problems (multiple agents must agree on a decision), and simulation environments (agents modeling different stakeholders).

I mention it for completeness but recommend starting with hierarchical delegation. It covers 90% of real-world multi-agent use cases with a fraction of the complexity.

---

## III. Building a Three-Agent System

Let us build a concrete multi-agent system: a code improvement pipeline with three specialized agents.

- **Explore**: Reads the codebase, understands the structure, identifies the relevant files
- **Build**: Implements changes based on the exploration findings
- **Review**: Verifies the changes, runs tests, identifies issues

```typescript
import Anthropic from '@anthropic-ai/sdk';

// Assume the Agent class from Chapter 3 with a `run(goal: string)` method

// --- Specialist Definitions ---

const exploreAgent: SpecialistAgent = {
  name: 'explore',
  description: 'Codebase exploration and analysis. Reads files, understands structure, identifies patterns and issues.',
  capabilities: ['read files', 'list directories', 'search code', 'analyze architecture'],
  agent: createAgent({
    systemPrompt:
      "You are an exploration agent. Your job is to thoroughly understand " +
      "a codebase or a specific part of it. Read files, examine structure, " +
      "and produce a detailed analysis. Your output will be used by other " +
      "agents to make changes, so be precise about file paths, function " +
      "names, and current behavior.\n\n" +
      "Always include:\n" +
      "- File paths of relevant files\n" +
      "- Current code snippets that will need to change\n" +
      "- Dependencies and imports that affect the change\n" +
      "- Potential risks or side effects",
    tools: [readFile, listDirectory, searchCode],
    maxIterations: 15
  })
};

const buildAgent: SpecialistAgent = {
  name: 'build',
  description: 'Code implementation. Writes, modifies, and creates files based on specifications.',
  capabilities: ['write files', 'modify code', 'create new files', 'install packages'],
  agent: createAgent({
    systemPrompt:
      "You are a build agent. You implement code changes based on " +
      "detailed specifications. You receive context from an exploration " +
      "agent including file paths, current code, and requirements.\n\n" +
      "Rules:\n" +
      "- Read the target file before modifying it\n" +
      "- Make minimal, focused changes\n" +
      "- Preserve existing code style\n" +
      "- Add comments only where the logic is non-obvious\n" +
      "- Report exactly what you changed and why",
    tools: [readFile, writeFile, runCommand],
    maxIterations: 15
  })
};

const reviewAgent: SpecialistAgent = {
  name: 'review',
  description: 'Code review and verification. Reads changes, runs tests, identifies issues.',
  capabilities: ['read files', 'run tests', 'compare code', 'identify bugs'],
  agent: createAgent({
    systemPrompt:
      "You are a review agent. You verify code changes made by other " +
      "agents. Your job is to ensure correctness, completeness, and " +
      "quality.\n\n" +
      "Review checklist:\n" +
      "1. Read the modified files and verify the changes are correct\n" +
      "2. Run the test suite and report results\n" +
      "3. Check for obvious bugs, edge cases, or missing error handling\n" +
      "4. Verify the changes match the original requirements\n" +
      "5. List any issues found with severity (critical/warning/info)\n\n" +
      "Output format:\n" +
      "- APPROVED: if changes are correct and tests pass\n" +
      "- CHANGES REQUESTED: if issues need to be fixed (list specific issues)\n" +
      "- BLOCKED: if there are critical problems that prevent approval",
    tools: [readFile, listDirectory, runCommand],
    maxIterations: 10
  })
};

// --- Orchestration ---

async function improveCode(request: string): Promise<string> {
  const coordinator = new Coordinator([exploreAgent, buildAgent, reviewAgent]);

  const goal = `
Improve the codebase based on this request: "${request}"

Follow this process:
1. Delegate to 'explore' to understand the current codebase state relevant to this request
2. Based on the exploration results, delegate to 'build' to implement the changes. Include the full exploration context so the build agent knows exactly what to modify.
3. After implementation, delegate to 'review' to verify the changes. Include both the original request and the exploration context so the reviewer can verify completeness.
4. If the reviewer requests changes, delegate back to 'build' with the specific feedback.
5. When the reviewer approves, synthesize a summary of all changes made.
`;

  return coordinator.orchestrate(goal);
}

// Run it
const result = await improveCode(
  "Add input validation to the user registration endpoint in src/routes/auth.ts"
);
console.log(result);
```

---

## IV. Communication Between Agents

The critical challenge in multi-agent systems is information transfer. Each agent has its own context window. When the coordinator delegates to a specialist, it must package all relevant context into the delegation message. When the specialist returns results, the coordinator must extract the essential information and route it to the next specialist.

### The Context Packaging Problem

Consider what happens when the coordinator delegates from Explore to Build:

1. Explore reads 10 files and produces a 3,000-word analysis
2. The coordinator receives this analysis
3. The coordinator must now construct a delegation to Build that includes:
   - The relevant parts of Explore's analysis
   - The original user request
   - Any additional instructions for the Build agent

If the coordinator simply forwards Explore's entire output, it works -- but it consumes significant context in Build's window. If the coordinator summarizes too aggressively, Build may miss critical details.

The practical solution is structured output. Train your agents to produce structured analyses rather than prose:

```typescript
// Instruct the explore agent to output structured findings
const exploreOutput = `
## Exploration Findings

### Target Files
- src/routes/auth.ts (lines 45-89): User registration handler
- src/middleware/validate.ts: Existing validation middleware (not used in auth routes)
- src/types/user.ts: User type definition

### Current Implementation
The registration endpoint accepts POST /auth/register with body { email, password, name }.
No input validation is performed. The handler passes raw body directly to db.createUser().

### Required Changes
1. Add email format validation (RFC 5322)
2. Add password strength requirements (min 8 chars, 1 uppercase, 1 number)
3. Add name length validation (1-100 chars)
4. Sanitize inputs before database insertion

### Dependencies
- Consider using the existing validate.ts middleware pattern
- zod is already in package.json (v3.22.4) -- use it for schema validation
`;
```

Structured output reduces the coordinator's cognitive overhead. It can forward specific sections to the Build agent rather than the entire exploration output.

---

## V. Failure Modes and Mitigations

Multi-agent systems introduce failure modes that do not exist in single-agent systems. Understanding these failures is essential for building reliable orchestrations.

### 1. Circular Delegation

The coordinator delegates to Agent A, which (through some chain of events) causes the coordinator to delegate back to Agent A with essentially the same task. The system loops indefinitely.

**Mitigation**: Track delegation history. If the same specialist receives a substantially similar task within a short window, the coordinator should recognize the loop and try a different approach.

```typescript
class DelegationTracker {
  private history: { specialist: string; taskHash: string; timestamp: number }[] = [];

  isCircular(specialist: string, task: string): boolean {
    const hash = this.hashTask(task);
    const recent = this.history.filter(
      h => h.specialist === specialist &&
           h.taskHash === hash &&
           Date.now() - h.timestamp < 60000 // Within last minute
    );
    return recent.length >= 2; // Same task delegated twice = circular
  }

  record(specialist: string, task: string): void {
    this.history.push({
      specialist,
      taskHash: this.hashTask(task),
      timestamp: Date.now()
    });
  }

  private hashTask(task: string): string {
    // Simple content-based hash (first 200 chars, normalized)
    return task.slice(0, 200).toLowerCase().replace(/\s+/g, ' ').trim();
  }
}
```

### 2. Context Pollution

Agent A's output contains assumptions or directives that confuse Agent B. For example, Agent A's analysis includes "next, implement the validation logic" -- and Agent B interprets this as an instruction rather than a summary of what needs to happen.

**Mitigation**: Clearly delimit agent outputs. Use structured formats (JSON, markdown with headers) that separate observations from instructions. The coordinator should frame delegations explicitly: "The following is the analysis from the explore agent. Your task is..."

### 3. Conflicting Agent Outputs

Two agents provide contradictory information or recommendations. The security agent says "add rate limiting to all endpoints." The performance agent says "remove middleware from hot paths."

**Mitigation**: This is the coordinator's job. Give the coordinator explicit instructions for resolving conflicts:

```
When specialists provide conflicting recommendations:
1. Identify the specific conflict
2. Evaluate each recommendation against the original goal
3. If both are valid, find a compromise (e.g., rate limiting with caching)
4. If one is clearly superior, explain why and adopt it
5. Never silently ignore a specialist's recommendation
```

### 4. Specialist Scope Creep

A specialist agent, given broad instructions, goes beyond its intended scope -- the Build agent starts refactoring unrelated code, or the Review agent starts implementing fixes instead of reporting issues.

**Mitigation**: Constrain specialist system prompts tightly. Define what the agent should and should not do. Limit tool access: the Review agent should not have `write_file`. If it cannot write files, it cannot implement fixes.

---

## VI. Real-World Reference: ACOS Orchestration

The patterns described in this chapter are not theoretical. ACOS -- the Agentic Cognitive Operating System I use for my personal and professional work -- coordinates 38 agents across six domains.

The architecture follows hierarchical delegation with domain specialization:

- **Technical Architect**: System design, backend, API architecture
- **Frontend Designer**: UI/UX, component design, accessibility
- **Content Engine**: Blog articles, courses, SEO
- **SEO Intelligence**: Search optimization, keyword strategy, structured data
- **Music Producer**: AI music creation, Suno prompts, genre production
- **DevOps Engineer**: Deployment, CI/CD, monitoring

Each agent has:
- A defined role and system prompt
- Specific skills (75+ total across all agents)
- Activation triggers (keywords or patterns that auto-select the agent)
- Tool access limited to its domain

The coordination rules are explicit:

1. When a task arrives, match it against activation triggers to select the primary agent
2. If the task spans multiple domains, the coordinator decomposes it and delegates to relevant specialists
3. Each specialist operates independently within its tools and context
4. Results flow back to the coordinator for synthesis
5. Conflicts are resolved by the coordinator based on the original goal

The key lesson from operating this system for months: specificity beats generality. An agent with 10 well-chosen tools and a focused system prompt outperforms an agent with 50 tools and a generic prompt. The decomposition into specialized agents is not just an organizational convenience -- it directly improves the quality of each agent's output.

---

## VII. Starting Your Multi-Agent System

Begin with two agents and a pipeline. Do not start with a coordinator and five specialists. The overhead of orchestration is real, and you need to calibrate it against the complexity of your actual tasks.

Practical starting points:

1. **Write + Review pipeline**: One agent implements, another verifies. This catches errors that a single agent would miss and is immediately valuable for code generation tasks.

2. **Research + Synthesis fan-out**: Multiple agents research different aspects of a question simultaneously, and a synthesizer combines their findings. This is faster than sequential research and produces more comprehensive results.

3. **Coordinator + 2 specialists**: When your pipeline or fan-out needs dynamic task decomposition, introduce a coordinator. Start with two specialists whose boundaries are clear and whose capabilities are distinct.

Scale by adding specialists, not by making existing agents broader. When a specialist's scope grows too large, split it into two. When a new domain arises, create a new specialist rather than expanding an existing one.

The goal is not the maximum number of agents. The goal is the minimum number of agents that handle your tasks reliably. For most engineering workflows, three to five agents with clear specializations will outperform both a single overloaded agent and a swarm of fifteen loosely-defined ones.

Multi-agent orchestration is coordination, not multiplication. The value is not in having more agents -- it is in having the right agents, with the right boundaries, communicating through the right protocols.
