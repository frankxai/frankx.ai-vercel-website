# Chapter 3: Building Your First Agent

> "The best way to predict the future is to implement it."
> -- David Heinemeier Hansson

---

## I. From Theory to Running Code

You understand what an agent is. You understand how tools work. Now we build one.

This chapter constructs a complete agent from scratch using TypeScript and Anthropic's Claude API. Not a framework. Not an abstraction layer. Raw API calls, a tool execution loop, and explicit state management. When you understand the mechanics at this level, every framework becomes transparent -- you will see the loop underneath LangChain, CrewAI, and the Claude Agent SDK because you will have written it yourself.

The agent we build will:

1. Accept a goal in natural language
2. Break the goal into steps
3. Execute each step using available tools
4. Handle errors and adapt its plan
5. Maintain conversation state across iterations
6. Report results when the goal is achieved

The complete implementation is approximately 200 lines. Every line earns its place.

---

## II. The Agent Loop

Every agent, regardless of framework or complexity, runs the same fundamental loop:

```
1. Observe: Gather context (user input, tool results, state)
2. Think: Reason about the current situation and decide what to do
3. Act: Execute a tool or produce a final response
4. Loop: If the task is not complete, return to step 1
```

This is the sense-think-act cycle from robotics, adapted for LLM-based agents. The implementation is a `while` loop that sends messages to the model, checks if the model wants to use tools, executes those tools, feeds results back, and repeats until the model produces a final text response.

```typescript
while (true) {
  const response = await callModel(messages, tools);

  if (response.stopReason === 'end_turn') {
    // Model produced a final response -- task complete
    return response.content;
  }

  if (response.stopReason === 'tool_use') {
    // Model wants to use tools -- execute and continue
    const toolResults = await executeTools(response.toolCalls);
    messages.push({ role: 'assistant', content: response.content });
    messages.push({ role: 'user', content: toolResults });
  }
}
```

That is the entire skeleton. Everything else is detail around this loop.

---

## III. The Full Implementation

Here is the complete agent. Read it top to bottom, then we will walk through each section.

```typescript
import Anthropic from '@anthropic-ai/sdk';

// --- Types ---

interface Tool {
  name: string;
  description: string;
  input_schema: object;
  execute: (input: Record<string, unknown>) => Promise<string>;
}

interface AgentConfig {
  model: string;
  maxIterations: number;
  systemPrompt: string;
  tools: Tool[];
  verbose: boolean;
}

interface AgentResult {
  success: boolean;
  output: string;
  iterations: number;
  toolCalls: { tool: string; input: unknown; output: string }[];
}

// --- Tools ---

const tools: Tool[] = [
  {
    name: "read_file",
    description:
      "Read the contents of a file at the given path. Returns the file " +
      "content as a string. Use this to examine existing files before " +
      "modifying them. Returns an error if the file does not exist.",
    input_schema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Absolute or relative file path to read."
        }
      },
      required: ["path"]
    },
    execute: async (input) => {
      const fs = await import('fs/promises');
      try {
        const content = await fs.readFile(input.path as string, 'utf-8');
        return content;
      } catch (error) {
        const err = error as NodeJS.ErrnoException;
        if (err.code === 'ENOENT') {
          return `Error: File not found at '${input.path}'. Check the path and try again.`;
        }
        return `Error reading file: ${err.message}`;
      }
    }
  },
  {
    name: "write_file",
    description:
      "Write content to a file at the given path. Creates the file if it " +
      "does not exist. Overwrites existing content. Use read_file first " +
      "to check existing content before overwriting. Creates parent " +
      "directories automatically.",
    input_schema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "File path to write to."
        },
        content: {
          type: "string",
          description: "Content to write to the file."
        }
      },
      required: ["path", "content"]
    },
    execute: async (input) => {
      const fs = await import('fs/promises');
      const path = await import('path');
      try {
        const dir = path.dirname(input.path as string);
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(input.path as string, input.content as string, 'utf-8');
        return `Successfully wrote ${(input.content as string).length} characters to ${input.path}`;
      } catch (error) {
        return `Error writing file: ${(error as Error).message}`;
      }
    }
  },
  {
    name: "list_directory",
    description:
      "List files and directories at the given path. Returns names with " +
      "type indicators: '/' suffix for directories, no suffix for files. " +
      "Does not recurse into subdirectories.",
    input_schema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Directory path to list. Default: current directory."
        }
      },
      required: []
    },
    execute: async (input) => {
      const fs = await import('fs/promises');
      try {
        const dirPath = (input.path as string) || '.';
        const entries = await fs.readdir(dirPath, { withFileTypes: true });
        const listing = entries.map(e =>
          e.isDirectory() ? `${e.name}/` : e.name
        );
        return listing.join('\n') || '(empty directory)';
      } catch (error) {
        return `Error listing directory: ${(error as Error).message}`;
      }
    }
  },
  {
    name: "run_command",
    description:
      "Execute a shell command and return its stdout and stderr. Use for " +
      "running tests, installing packages, checking system state, or any " +
      "operation that requires a shell. Commands time out after 30 seconds. " +
      "Do NOT use for long-running processes or interactive commands.",
    input_schema: {
      type: "object",
      properties: {
        command: {
          type: "string",
          description: "The shell command to execute."
        }
      },
      required: ["command"]
    },
    execute: async (input) => {
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);
      try {
        const { stdout, stderr } = await execAsync(input.command as string, {
          timeout: 30000,
          maxBuffer: 1024 * 1024
        });
        let result = '';
        if (stdout) result += stdout;
        if (stderr) result += `\nSTDERR:\n${stderr}`;
        return result || '(command produced no output)';
      } catch (error) {
        const err = error as { message: string; stdout?: string; stderr?: string; killed?: boolean };
        if (err.killed) {
          return 'Error: Command timed out after 30 seconds.';
        }
        return `Command failed:\n${err.stderr || err.message}`;
      }
    }
  }
];

// --- Agent Core ---

async function runAgent(goal: string, config?: Partial<AgentConfig>): Promise<AgentResult> {
  const client = new Anthropic();

  const defaults: AgentConfig = {
    model: 'claude-sonnet-4-20250514',
    maxIterations: 25,
    systemPrompt:
      "You are a skilled software agent. You accomplish goals by breaking them " +
      "into steps and using the available tools. Work methodically: understand " +
      "the current state before making changes, verify your work after each step, " +
      "and report clearly when done. If you encounter an error, analyze it and " +
      "try a different approach rather than repeating the same action.",
    tools,
    verbose: true
  };

  const cfg = { ...defaults, ...config };
  const toolLog: AgentResult['toolCalls'] = [];

  // Build the messages array -- this is the agent's working memory
  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: goal }
  ];

  // Build tool definitions for the API (without execute functions)
  const apiTools: Anthropic.Tool[] = cfg.tools.map(t => ({
    name: t.name,
    description: t.description,
    input_schema: t.input_schema as Anthropic.Tool.InputSchema
  }));

  // The agent loop
  let iteration = 0;
  while (iteration < cfg.maxIterations) {
    iteration++;

    if (cfg.verbose) {
      console.log(`\n--- Iteration ${iteration} ---`);
    }

    // Call the model
    const response = await client.messages.create({
      model: cfg.model,
      max_tokens: 4096,
      system: cfg.systemPrompt,
      tools: apiTools,
      messages
    });

    // Check stop reason
    if (response.stop_reason === 'end_turn') {
      // Model produced a final response
      const textBlocks = response.content.filter(
        (b): b is Anthropic.TextBlock => b.type === 'text'
      );
      const output = textBlocks.map(b => b.text).join('\n');

      if (cfg.verbose) {
        console.log(`\nAgent completed in ${iteration} iterations.`);
      }

      return {
        success: true,
        output,
        iterations: iteration,
        toolCalls: toolLog
      };
    }

    if (response.stop_reason === 'tool_use') {
      // Extract tool use blocks
      const toolUseBlocks = response.content.filter(
        (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
      );

      // Add assistant message with all content (text + tool use)
      messages.push({ role: 'assistant', content: response.content });

      // Execute each tool call and collect results
      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const toolUse of toolUseBlocks) {
        if (cfg.verbose) {
          console.log(`  Tool: ${toolUse.name}`);
          console.log(`  Input: ${JSON.stringify(toolUse.input).slice(0, 200)}`);
        }

        // Find the tool implementation
        const tool = cfg.tools.find(t => t.name === toolUse.name);
        let output: string;

        if (!tool) {
          output = `Error: Unknown tool '${toolUse.name}'. Available: ${cfg.tools.map(t => t.name).join(', ')}`;
        } else {
          try {
            output = await tool.execute(toolUse.input as Record<string, unknown>);
          } catch (error) {
            output = `Tool execution error: ${(error as Error).message}`;
          }
        }

        if (cfg.verbose) {
          console.log(`  Output: ${output.slice(0, 200)}${output.length > 200 ? '...' : ''}`);
        }

        toolLog.push({
          tool: toolUse.name,
          input: toolUse.input,
          output
        });

        toolResults.push({
          type: 'tool_result',
          tool_use_id: toolUse.id,
          content: output
        });
      }

      // Add tool results as user message
      messages.push({ role: 'user', content: toolResults });
    }
  }

  // Max iterations exceeded
  return {
    success: false,
    output: `Agent did not complete within ${cfg.maxIterations} iterations.`,
    iterations: cfg.maxIterations,
    toolCalls: toolLog
  };
}

// --- Entry Point ---

async function main() {
  const goal = process.argv[2];
  if (!goal) {
    console.error('Usage: npx tsx agent.ts "Your goal here"');
    process.exit(1);
  }

  console.log(`Goal: ${goal}\n`);

  const result = await runAgent(goal);

  console.log('\n=== Result ===');
  console.log(`Success: ${result.success}`);
  console.log(`Iterations: ${result.iterations}`);
  console.log(`Tool calls: ${result.toolCalls.length}`);
  console.log(`\n${result.output}`);
}

main().catch(console.error);
```

---

## IV. Walking Through the Mechanics

### The Message Array Is Working Memory

The `messages` array is the agent's working memory. Every observation (user input, tool results) and every action (assistant responses with tool calls) accumulates in this array. The model sees the complete history on every iteration, which allows it to reason about what it has tried, what worked, what failed, and what to do next.

This is simultaneously the mechanism's strength and its weakness. The strength: the model has full context for decision-making. The weakness: the context window is finite. After enough iterations, the messages array will exceed the model's context limit. Chapter 4 addresses memory management strategies for long-running agents.

### Tool Execution Is Synchronous and Explicit

Each tool call follows the same pattern: extract the tool use block from the model's response, find the matching tool implementation, execute it, capture the output, and package it as a tool result. The results are added to the messages array as a user message (this is the API contract -- tool results come from the "user" role).

Notice that tool execution is synchronous within an iteration but multiple tools can be called per iteration. When the model emits multiple tool use blocks in a single response, all are executed before the results are returned. In the current implementation, they execute sequentially. A production agent might execute independent tool calls in parallel.

### The Stop Condition Is the Model's Decision

The agent loop continues until one of two conditions is met: the model responds with `stop_reason: 'end_turn'` (meaning it has produced a final text response without requesting tool use) or the iteration limit is reached.

The model decides when the task is complete. This is a deliberate design choice. The model has the context to judge whether the goal has been achieved. The iteration limit is a safety net, not a primary control mechanism.

### Error Handling Is Information, Not Failure

When a tool fails, the error message is returned to the model as the tool result. The model sees the error, reasons about it, and decides what to do. Maybe it retries with different arguments. Maybe it uses a different tool. Maybe it abandons that approach and tries something else entirely.

This is why the error messages in Chapter 2 included `suggestion` fields. The model reads those suggestions and incorporates them into its next action. Good error messages make agents resilient. Bad error messages make agents stuck.

---

## V. Running the Agent

Save the code as `agent.ts` and run it:

```bash
# Install dependencies
npm install @anthropic-ai/sdk tsx

# Set your API key
export ANTHROPIC_API_KEY=sk-ant-...

# Run with a goal
npx tsx agent.ts "Create a TypeScript utility module called math-utils.ts with functions for mean, median, mode, and standard deviation. Include JSDoc comments and write a test file that verifies each function."
```

The agent will:

1. Plan the implementation (what functions, what signatures, what edge cases)
2. Write `math-utils.ts` using the `write_file` tool
3. Write `math-utils.test.ts` using the `write_file` tool
4. Run the tests using `run_command` to execute `npx tsx math-utils.test.ts`
5. If tests fail, read the error output, fix the code, and re-run
6. Report the results when all tests pass

A typical run takes 4-8 iterations and 6-12 tool calls. The agent does not just write code -- it verifies its own work.

---

## VI. Testing Strategies

Testing agents is fundamentally different from testing functions. A function is deterministic: same input, same output. An agent is stochastic: same goal, different execution paths, equivalent outcomes. You test agents on outcomes, not on traces.

### Outcome Tests

Define what success looks like, run the agent, and verify the outcome.

```typescript
async function testAgent() {
  const result = await runAgent(
    "Create a file called hello.txt containing 'Hello, World!'"
  );

  // Verify outcome, not process
  const fs = await import('fs/promises');
  const content = await fs.readFile('hello.txt', 'utf-8');
  assert(content.trim() === 'Hello, World!');
  assert(result.success === true);
  assert(result.iterations <= 5); // Should not take many iterations
}
```

### Boundary Tests

Push the agent to its limits to find failure modes.

```typescript
// Test: Can the agent handle a tool failure and recover?
const brokenTools = tools.map(t =>
  t.name === 'write_file'
    ? { ...t, execute: async () => { throw new Error('Disk full'); } }
    : t
);
const result = await runAgent("Create a file called test.txt", {
  tools: brokenTools
});
// Agent should report the failure, not crash
assert(result.output.includes('disk') || result.output.includes('error'));

// Test: Does the agent respect iteration limits?
const result2 = await runAgent(
  "Count to infinity by listing every integer",
  { maxIterations: 3 }
);
assert(result2.success === false);
assert(result2.iterations === 3);
```

### Cost Tests

Agents consume API tokens. Track token usage per run and set budgets.

```typescript
async function runAgentWithBudget(goal: string, maxTokens: number) {
  let totalTokens = 0;
  // Wrap the client to track usage
  // ... (implementation tracks response.usage on each call)

  if (totalTokens > maxTokens) {
    return { success: false, output: `Budget exceeded: ${totalTokens} tokens used.` };
  }
}
```

---

## VII. Common Pitfalls

### 1. Infinite Loops

The agent gets stuck in a cycle: try action A, fail, try action A again, fail again. This happens when error messages do not provide enough information for the agent to try something different.

**Fix**: Improve error messages with specific suggestions. Add loop detection: if the agent calls the same tool with the same arguments three times, inject a meta-prompt: "You have tried this approach three times without success. Please try a different approach."

### 2. Context Window Overflow

Long-running agents accumulate messages until the context window is exceeded. The API returns an error, and the agent crashes.

**Fix**: Monitor the token count of the messages array. When it approaches the context limit, summarize older messages: keep the goal, the current state, and recent interactions; compress everything else into a summary. Chapter 4 covers this in detail.

### 3. Tool Selection Failures

The agent picks the wrong tool because tool descriptions are ambiguous. It uses `run_command` to read a file (by running `cat`) instead of using `read_file`.

**Fix**: Make tool descriptions explicit about when to use each tool and when NOT to use it. Add negative guidance: "Do NOT use run_command to read files -- use read_file instead."

### 4. Over-Planning, Under-Acting

The agent spends iterations thinking about what to do without actually doing it. It produces long reasoning text but never calls a tool.

**Fix**: Include in the system prompt: "After assessing the situation, take action immediately. Do not spend multiple turns planning without executing. Use tools to gather information rather than speculating."

### 5. Premature Completion

The agent declares success before verifying its work. It writes code but does not run the tests. It creates a file but does not confirm the content.

**Fix**: Include in the system prompt: "Always verify your work before reporting completion. If you created a file, read it back. If you wrote code, run the tests. If you configured a system, check that it works."

---

## VIII. From Script to System

You now have a working agent. It can accept goals, plan, use tools, handle errors, and verify results. It runs from the command line and costs a few cents per invocation.

This is a script. A useful script, but a script nonetheless. It has no memory across invocations. It runs a single goal and exits. It cannot coordinate with other agents. It has no authentication, no rate limiting, no observability.

The rest of this book transforms this script into a production system.

Chapter 4 adds memory -- the ability to learn from past interactions and maintain knowledge across sessions. Chapter 5 adds orchestration -- the ability to coordinate multiple agents working on related tasks. Later chapters add security, evaluation, voice interfaces, computer use, and deployment infrastructure.

But all of it builds on the loop you now understand: observe, think, act, repeat. Every agent framework, every orchestration system, every autonomous coding tool runs this loop at its core. The abstractions vary. The loop does not.

You now have a working agent. The rest of this book is about making it production-grade.
