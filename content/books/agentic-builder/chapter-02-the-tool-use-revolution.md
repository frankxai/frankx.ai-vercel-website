# Chapter 2: The Tool Use Revolution

> "We shape our tools, and thereafter our tools shape us."
> -- Marshall McLuhan

---

## I. The Hands of the Mind

A language model without tools is a brain in a jar. It can reason, analyze, compose, and critique. It can draft contracts, debug algorithms, explain quantum mechanics, and write sonnets. But it cannot check the weather. It cannot query a database. It cannot send an email, create a file, or verify that the code it wrote actually compiles.

Tools are what connect reasoning to reality.

The concept is deceptively simple. You describe a function to the model -- its name, its parameters, what it does -- and the model can choose to call that function when it determines the function would help accomplish its goal. The model does not execute the function itself. It generates structured output indicating which function to call and with what arguments. Your application executes the function, returns the result, and the model continues reasoning with the new information.

This loop -- reason, decide to use a tool, receive results, continue reasoning -- is the atomic unit of agentic behavior. Everything else in this book builds on it.

---

## II. The Evolution of Function Calling

The path from "LLMs that generate text" to "LLMs that use tools" evolved through three distinct phases.

### Phase 1: Prompt Engineering (2022-2023)

Before native function calling existed, developers hacked tool use into existence through prompt engineering. You would instruct the model to output structured JSON when it wanted to use a tool, then parse the output, execute the function, and inject the result back into the conversation.

```
System: You have access to the following tools:
- search(query: string): Searches the web and returns results
- calculator(expression: string): Evaluates a math expression

When you need to use a tool, output EXACTLY this format:
<tool_call>{"name": "search", "args": {"query": "population of Tokyo"}}</tool_call>

Then STOP and wait for the result.
```

This worked surprisingly well with capable models, but it was fragile. Models would forget the format, hallucinate tool names, nest tool calls in prose, or generate invalid JSON. Reliability was perhaps 70-80% for simple cases and degraded rapidly with complexity. Production systems built on prompt-engineered tool use required extensive error handling and retry logic.

### Phase 2: Native Function Calling (2023-2024)

OpenAI introduced native function calling in June 2023, and Anthropic followed with its own tool use implementation. Instead of relying on prompt engineering, the model's output format was extended to include structured tool calls as a first-class response type.

The API contract changed. You define tools in the request:

```typescript
const tools = [{
  name: "query_database",
  description: "Execute a read-only SQL query against the analytics database. Returns rows as JSON arrays. Use this when the user asks about metrics, counts, or data that requires database access.",
  input_schema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "A valid PostgreSQL SELECT query. Must be read-only (no INSERT, UPDATE, DELETE)."
      },
      limit: {
        type: "number",
        description: "Maximum number of rows to return. Default 100. Maximum 1000."
      }
    },
    required: ["query"]
  }
}];
```

The model responds with a structured tool use block:

```json
{
  "type": "tool_use",
  "name": "query_database",
  "input": {
    "query": "SELECT date, count(*) as signups FROM users WHERE date >= '2026-01-01' GROUP BY date ORDER BY date",
    "limit": 30
  }
}
```

Your application executes the query, returns the result as a tool result, and the model continues. Reliability jumped to 95%+ for well-described tools. The model understood the contract because it was trained on the format, not prompted to follow it.

### Phase 3: MCP -- The Universal Protocol (2024-present)

Native function calling solved the model-side problem. Each model provider had reliable tool use. But the ecosystem-side problem remained: every tool had to be custom-built for every application. If you built a Slack integration for your agent, that integration worked only in your agent. The next developer building a Slack integration started from scratch.

The Model Context Protocol (MCP), introduced by Anthropic in November 2024, solved this by standardizing the protocol between tool providers (servers) and tool consumers (clients). An MCP server exposes tools through a standard interface. Any MCP client can discover and use those tools without custom integration code.

The analogy is precise: MCP is to agent tools what HTTP is to web content. Before HTTP, every networked application invented its own communication protocol. After HTTP, a single client (the browser) could interact with any server. Before MCP, every agent framework invented its own tool integration. After MCP, a single agent can interact with any MCP-compatible tool server.

---

## III. Anatomy of a Tool

A well-designed tool has five components. Miss any one and the agent will struggle to use it correctly.

### 1. Name

The tool name is the first thing the model sees when deciding which tool to use. It should be a verb-noun pair that unambiguously describes the action: `query_database`, `send_email`, `create_file`, `search_documents`. Avoid generic names like `run`, `execute`, or `process`. The model selects tools by matching the name and description to the current task. Ambiguous names cause selection errors.

### 2. Description

The description is the most important component. It is API documentation written for an AI reader. The model uses it to decide (a) whether to use this tool, (b) when to use it instead of alternatives, and (c) how to construct valid inputs.

Bad description:
```
"Queries the database"
```

Good description:
```
"Execute a read-only SQL query against the PostgreSQL analytics database.
Returns results as an array of JSON objects, one per row. Column names
become object keys. Use this when the user asks about metrics, statistics,
user counts, revenue data, or any question that requires aggregating data
from the analytics database. Do NOT use this for real-time data -- the
analytics database is refreshed every 6 hours. For real-time metrics,
use the get_live_metrics tool instead."
```

The good description tells the model:
- What the tool does (executes SQL queries)
- What the output format is (JSON array)
- When to use it (metrics, statistics, aggregations)
- When NOT to use it (real-time data)
- What to use instead (get_live_metrics)

That last point -- describing when not to use a tool -- is as important as describing when to use it. Without negative guidance, models will use the first tool that seems approximately right, even when a better option exists.

### 3. Input Schema

The input schema defines what arguments the tool accepts, their types, which are required, and what constraints apply. Use JSON Schema:

```typescript
{
  type: "object",
  properties: {
    query: {
      type: "string",
      description: "A valid PostgreSQL SELECT query. Must be read-only."
    },
    limit: {
      type: "number",
      description: "Max rows to return. Range: 1-1000. Default: 100."
    },
    format: {
      type: "string",
      enum: ["json", "csv", "markdown"],
      description: "Output format. Default: json."
    }
  },
  required: ["query"]
}
```

Every property should have a description. Enum values should be used wherever the set of valid inputs is finite. Default values should be documented in the description. Range constraints should be explicit. The more constraints you encode in the schema, the fewer invalid inputs the model will generate.

### 4. Error Handling

Tools will fail. Network requests time out. Queries return errors. Files do not exist. The question is not whether tools fail but whether the agent can recover when they do.

The key principle: return errors as structured information, not as exceptions that crash the agent loop.

```typescript
async function queryDatabase(input: { query: string; limit?: number }): Promise<ToolResult> {
  try {
    // Validate input before execution
    if (!input.query.trim().toUpperCase().startsWith('SELECT')) {
      return {
        success: false,
        error: "INVALID_QUERY",
        message: "Only SELECT queries are allowed. The query must start with SELECT.",
        suggestion: "Rewrite the query as a SELECT statement."
      };
    }

    const result = await db.query(input.query, { limit: input.limit ?? 100 });

    return {
      success: true,
      data: result.rows,
      metadata: {
        rowCount: result.rows.length,
        executionTimeMs: result.duration,
        truncated: result.rows.length === (input.limit ?? 100)
      }
    };
  } catch (error) {
    if (error.code === '42P01') {
      return {
        success: false,
        error: "TABLE_NOT_FOUND",
        message: `Table does not exist: ${error.table}`,
        suggestion: "Use the list_tables tool to see available tables."
      };
    }
    if (error.code === '42601') {
      return {
        success: false,
        error: "SYNTAX_ERROR",
        message: `SQL syntax error near: ${error.position}`,
        suggestion: "Check the query syntax and try again."
      };
    }
    return {
      success: false,
      error: "EXECUTION_ERROR",
      message: error.message,
      suggestion: "Review the query and retry. If the error persists, try a simpler query."
    };
  }
}
```

Notice the `suggestion` field. This is the agent's recovery path. When a tool fails, the model needs to know not just what went wrong but what to try next. Without suggestions, models tend to retry the same failing input or abandon the task entirely.

### 5. Output Format

The output should be structured, consistent, and informative. The model needs to parse the result and incorporate it into its reasoning. Free-form text outputs are harder for models to process reliably than structured JSON.

Always include metadata alongside data: row counts, execution time, pagination info, truncation warnings. The model uses this metadata to decide whether it has enough information or needs to make additional calls.

---

## IV. Building a Complete Tool: Database Explorer

Let us build a real tool from scratch. This tool allows an agent to explore and query a PostgreSQL database -- the kind of tool you would deploy in a data analysis agent.

```typescript
import { Client } from 'pg';

interface ToolDefinition {
  name: string;
  description: string;
  input_schema: object;
}

interface ToolResult {
  success: boolean;
  data?: unknown;
  error?: string;
  message?: string;
  suggestion?: string;
  metadata?: Record<string, unknown>;
}

// Tool definitions -- what the agent sees
export const databaseTools: ToolDefinition[] = [
  {
    name: "list_tables",
    description:
      "List all tables in the analytics database with their row counts " +
      "and column names. Use this first when you need to understand what " +
      "data is available before writing queries. Returns table name, " +
      "approximate row count, and column definitions.",
    input_schema: {
      type: "object",
      properties: {
        schema: {
          type: "string",
          description: "Database schema to list tables from. Default: 'public'."
        }
      },
      required: []
    }
  },
  {
    name: "describe_table",
    description:
      "Get detailed column information for a specific table: column names, " +
      "data types, nullable status, and sample values. Use this when you " +
      "need to understand a table's structure before writing a query. " +
      "More detailed than list_tables for a single table.",
    input_schema: {
      type: "object",
      properties: {
        table: {
          type: "string",
          description: "The table name to describe."
        }
      },
      required: ["table"]
    }
  },
  {
    name: "query_database",
    description:
      "Execute a read-only SQL query against the PostgreSQL analytics database. " +
      "Returns results as JSON array. Use list_tables and describe_table first " +
      "if you are unsure about the schema. Only SELECT queries are allowed. " +
      "Maximum 1000 rows per query. For large result sets, use LIMIT and OFFSET " +
      "for pagination.",
    input_schema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "A valid PostgreSQL SELECT query."
        },
        limit: {
          type: "number",
          description: "Maximum rows to return. Range: 1-1000. Default: 100."
        }
      },
      required: ["query"]
    }
  }
];

// Tool implementations -- what actually executes
export async function executeDatabaseTool(
  name: string,
  input: Record<string, unknown>,
  client: Client
): Promise<ToolResult> {
  switch (name) {
    case "list_tables":
      return listTables(client, input.schema as string | undefined);
    case "describe_table":
      return describeTable(client, input.table as string);
    case "query_database":
      return queryDatabase(client, input.query as string, input.limit as number | undefined);
    default:
      return {
        success: false,
        error: "UNKNOWN_TOOL",
        message: `No tool named '${name}'`,
        suggestion: "Available tools: list_tables, describe_table, query_database"
      };
  }
}

async function listTables(client: Client, schema = 'public'): Promise<ToolResult> {
  try {
    const result = await client.query(`
      SELECT
        t.table_name,
        pg_stat_user_tables.n_live_tup AS approximate_row_count,
        array_agg(c.column_name ORDER BY c.ordinal_position) AS columns
      FROM information_schema.tables t
      JOIN information_schema.columns c
        ON t.table_name = c.table_name AND t.table_schema = c.table_schema
      LEFT JOIN pg_stat_user_tables
        ON t.table_name = pg_stat_user_tables.relname
      WHERE t.table_schema = $1 AND t.table_type = 'BASE TABLE'
      GROUP BY t.table_name, pg_stat_user_tables.n_live_tup
      ORDER BY t.table_name
    `, [schema]);

    return {
      success: true,
      data: result.rows,
      metadata: { tableCount: result.rows.length, schema }
    };
  } catch (error) {
    return {
      success: false,
      error: "LIST_TABLES_FAILED",
      message: (error as Error).message,
      suggestion: "Verify the schema name exists. Default schema is 'public'."
    };
  }
}

async function describeTable(client: Client, table: string): Promise<ToolResult> {
  if (!table || !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(table)) {
    return {
      success: false,
      error: "INVALID_TABLE_NAME",
      message: `Invalid table name: '${table}'`,
      suggestion: "Table names must contain only letters, numbers, and underscores. Use list_tables to see available tables."
    };
  }

  try {
    const columns = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = $1 AND table_schema = 'public'
      ORDER BY ordinal_position
    `, [table]);

    if (columns.rows.length === 0) {
      return {
        success: false,
        error: "TABLE_NOT_FOUND",
        message: `Table '${table}' does not exist.`,
        suggestion: "Use list_tables to see available tables."
      };
    }

    // Get sample values for each column
    const sample = await client.query(
      `SELECT * FROM "${table}" LIMIT 3`
    );

    return {
      success: true,
      data: {
        table,
        columns: columns.rows,
        sampleRows: sample.rows
      },
      metadata: { columnCount: columns.rows.length }
    };
  } catch (error) {
    return {
      success: false,
      error: "DESCRIBE_FAILED",
      message: (error as Error).message,
      suggestion: "Check that the table name is correct using list_tables."
    };
  }
}

async function queryDatabase(
  client: Client,
  query: string,
  limit = 100
): Promise<ToolResult> {
  // Validate: read-only
  const normalized = query.trim().toUpperCase();
  if (!normalized.startsWith('SELECT') && !normalized.startsWith('WITH')) {
    return {
      success: false,
      error: "WRITE_OPERATION_BLOCKED",
      message: "Only SELECT queries (and WITH/CTE queries) are allowed.",
      suggestion: "Rewrite the query as a SELECT statement."
    };
  }

  // Validate: no destructive keywords
  const forbidden = ['INSERT', 'UPDATE', 'DELETE', 'DROP', 'ALTER', 'TRUNCATE', 'GRANT'];
  for (const keyword of forbidden) {
    if (normalized.includes(keyword)) {
      return {
        success: false,
        error: "FORBIDDEN_KEYWORD",
        message: `Query contains forbidden keyword: ${keyword}`,
        suggestion: "Remove the forbidden keyword. This tool only supports read operations."
      };
    }
  }

  // Enforce limit
  const effectiveLimit = Math.min(Math.max(limit, 1), 1000);
  const limitedQuery = query.replace(/;\s*$/, '') + ` LIMIT ${effectiveLimit}`;

  try {
    const start = Date.now();
    const result = await client.query(limitedQuery);
    const duration = Date.now() - start;

    return {
      success: true,
      data: result.rows,
      metadata: {
        rowCount: result.rows.length,
        executionTimeMs: duration,
        truncated: result.rows.length === effectiveLimit,
        appliedLimit: effectiveLimit
      }
    };
  } catch (error) {
    const pgError = error as { code?: string; position?: string; message: string };
    return {
      success: false,
      error: `QUERY_ERROR_${pgError.code || 'UNKNOWN'}`,
      message: pgError.message,
      suggestion: pgError.code === '42P01'
        ? "Table not found. Use list_tables to see available tables."
        : pgError.code === '42601'
        ? "SQL syntax error. Check your query syntax."
        : "Review the error message and adjust your query."
    };
  }
}
```

This implementation demonstrates the principles in practice: descriptive tool definitions, input validation before execution, structured error responses with recovery suggestions, and metadata that helps the agent make follow-up decisions.

---

## V. MCP: Tools as Infrastructure

The database explorer above is useful for a single agent. But what if you want to share it across multiple agents, applications, and frameworks? This is where MCP transforms tool use from application code into infrastructure.

An MCP server is a process that exposes tools through the MCP protocol. Here is the same database explorer as an MCP server:

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { Client } from 'pg';

const server = new McpServer({
  name: "database-explorer",
  version: "1.0.0"
});

const dbClient = new Client({
  connectionString: process.env.DATABASE_URL
});

server.tool(
  "list_tables",
  "List all tables in the database with row counts and column names. " +
  "Use this first to understand what data is available.",
  { schema: z.string().optional().describe("Database schema. Default: 'public'") },
  async ({ schema }) => {
    const s = schema ?? 'public';
    const result = await dbClient.query(`
      SELECT t.table_name,
             pg_stat_user_tables.n_live_tup AS approximate_row_count,
             array_agg(c.column_name ORDER BY c.ordinal_position) AS columns
      FROM information_schema.tables t
      JOIN information_schema.columns c
        ON t.table_name = c.table_name AND t.table_schema = c.table_schema
      LEFT JOIN pg_stat_user_tables
        ON t.table_name = pg_stat_user_tables.relname
      WHERE t.table_schema = $1 AND t.table_type = 'BASE TABLE'
      GROUP BY t.table_name, pg_stat_user_tables.n_live_tup
      ORDER BY t.table_name
    `, [s]);

    return {
      content: [{
        type: "text",
        text: JSON.stringify(result.rows, null, 2)
      }]
    };
  }
);

server.tool(
  "query_database",
  "Execute a read-only SQL query. Use list_tables first to understand " +
  "the schema. Only SELECT queries allowed. Max 1000 rows.",
  {
    query: z.string().describe("A valid PostgreSQL SELECT query"),
    limit: z.number().min(1).max(1000).optional().describe("Max rows. Default: 100")
  },
  async ({ query, limit }) => {
    const normalized = query.trim().toUpperCase();
    if (!normalized.startsWith('SELECT') && !normalized.startsWith('WITH')) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            error: "Only SELECT queries are allowed.",
            suggestion: "Rewrite as a SELECT statement."
          })
        }],
        isError: true
      };
    }

    const effectiveLimit = limit ?? 100;
    const limitedQuery = query.replace(/;\s*$/, '') + ` LIMIT ${effectiveLimit}`;
    const start = Date.now();
    const result = await dbClient.query(limitedQuery);

    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          rows: result.rows,
          rowCount: result.rows.length,
          executionTimeMs: Date.now() - start,
          truncated: result.rows.length === effectiveLimit
        }, null, 2)
      }]
    };
  }
);

async function main() {
  await dbClient.connect();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
```

The MCP version is structurally similar but now accessible to any MCP client. Claude Desktop, Claude Code, a custom agent built with the Claude Agent SDK, or any third-party MCP-compatible application can connect to this server and use its tools. You build the tool once. Every agent can use it.

---

## VI. Claude Tool Use vs. MCP vs. Computer Use

Three mechanisms exist for agents to interact with the world. They are not interchangeable -- each serves a different use case.

### Native Tool Use

Native tool use is appropriate when you are building a specific agent with a defined set of capabilities. You control the tool definitions, the execution environment, and the response format. Tool definitions are sent with each API request.

**Best for**: Custom agents with application-specific tools. When you need tight control over the tool execution pipeline. When tools require access to application-internal state (database connections, in-memory caches, authenticated sessions).

### MCP Tool Use

MCP is appropriate when you want tools to be reusable across agents and applications, or when you want to leverage the ecosystem of existing MCP servers.

**Best for**: Standardized integrations (Slack, GitHub, databases, file systems). When multiple agents need the same tool. When you want to add capabilities without modifying the agent's code.

### Computer Use

Computer use -- the ability for an agent to interact with graphical interfaces by viewing screenshots and generating mouse/keyboard actions -- is appropriate when the target system has no API and no MCP server.

**Best for**: Legacy applications with only GUI interfaces. Testing web applications from the user's perspective. Workflows that span multiple applications. Automating tasks that a human would do manually.

The decision tree:

1. Does the target system have a well-documented API? Use native tool use or build an MCP server.
2. Does an MCP server already exist for the target system? Use MCP.
3. Does the target system only have a GUI? Use computer use.
4. Does the task require interacting with multiple systems, some with APIs and some without? Combine approaches -- use native/MCP tools for API-accessible systems and computer use for GUI-only systems.

---

## VII. Design Principles for Agent Tools

After building and deploying dozens of tools across enterprise and personal agent systems, I have distilled the following principles:

**1. Tools should do one thing well.** A tool that queries a database, formats the output as a chart, and emails it to a stakeholder is three tools poorly merged into one. Break it apart. The agent can compose single-purpose tools into complex workflows -- that is its job.

**2. Descriptions are contracts.** Write tool descriptions as though you are onboarding a new team member who has never seen your codebase. Explain what the tool does, what the output looks like, when to use it, when not to use it, and what alternatives exist.

**3. Validate inputs aggressively.** The model will occasionally generate invalid inputs. Catch them early with clear error messages rather than letting them propagate into cryptic runtime errors.

**4. Return structured errors with recovery paths.** Never return bare error messages. Always include: what went wrong, why it went wrong, and what the agent should try instead.

**5. Include metadata in outputs.** Row counts, execution times, truncation warnings, pagination cursors -- the agent needs this information to decide its next action.

**6. Scope tools to the minimum necessary permissions.** A database tool should execute read-only queries. A file system tool should be restricted to specific directories. Agents will eventually make mistakes. Limit the blast radius.

**7. Make tools idempotent where possible.** If the agent calls the same tool with the same arguments twice, the result should be the same. This makes retries safe, which is critical because agents will retry.

**8. Test tools with adversarial inputs.** What happens when the model sends an empty string? A SQL injection attempt? A query that returns 10 million rows? A file path with `../../../etc/passwd`? Design for the worst case.

These principles are not theoretical. They come from debugging agents that called the wrong tool because the description was ambiguous, agents that crashed because an error propagated instead of being caught, and agents that entered infinite retry loops because the error message did not tell them what to do differently.

Tools are the interface between intelligence and action. Design them with the same care you would design an API that a million developers will use -- because in the agentic future, they will.
