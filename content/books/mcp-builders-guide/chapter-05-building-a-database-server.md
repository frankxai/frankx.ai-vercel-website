# Building a Database Server

> "Data is not information. Information is not knowledge."
> — Clifford Stoll

---

A database MCP server is the highest-leverage server most engineers will ever build. Every application has a database. Every database contains the ground truth about the system. An AI that can read and query that ground truth directly — not through reports, not through dashboards, not through APIs that were designed to limit what you can see — changes how you work with your own systems.

This chapter builds a complete PostgreSQL MCP server from scratch. Resources for table schemas and query results. Tools for read-only queries and filtered searches. Real code you can deploy today. Then I will show how my Supabase connection works through exactly this pattern.

---

## I. The Design Decisions

Before writing a line of code, make three decisions.

**Read-only or read-write?** Database servers that can write to production are powerful and dangerous. For a first server, read-only is the right choice. You can query anything, understand anything, and the worst possible bug is a slow query — not corrupted data. Once you trust the server's behavior, you can add write tools incrementally.

**Which schema do you expose?** Exposing every table in every schema to an AI is technically possible and practically overwhelming. Start with the tables that answer the questions you actually ask. You can always add more.

**How do you handle credentials?** The database URL contains a username and password. That credential goes into the server's environment, not into any file that gets committed to version control.

With those decisions made, the architecture is clear: a stdio server (local, stateless), connected to PostgreSQL via a connection pool, exposing table schemas as Resources and a query tool for read-only SQL.

---

## II. The Setup

```bash
mkdir postgres-mcp-server
cd postgres-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk pg
npm install --save-dev typescript @types/node @types/pg tsx
```

The `pg` package is the standard Node.js PostgreSQL client. `tsx` lets us run TypeScript directly without a separate compile step during development.

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}
```

Add to `package.json`:

```json
{
  "scripts": {
    "dev": "tsx src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  },
  "type": "module"
}
```

---

## III. The Database Connection

Create `src/db.ts`:

```typescript
import pg from 'pg';

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

pool.on('error', (err) => {
  console.error('Unexpected database pool error:', err.message);
});

export async function query<T extends pg.QueryResultRow>(
  sql: string,
  params?: unknown[]
): Promise<T[]> {
  const client = await pool.connect();
  try {
    const result = await client.query<T>(sql, params);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getTableSchema(tableName: string): Promise<{
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default: string | null;
}[]> {
  return query(
    `SELECT column_name, data_type, is_nullable, column_default
     FROM information_schema.columns
     WHERE table_schema = 'public'
       AND table_name = $1
     ORDER BY ordinal_position`,
    [tableName]
  );
}

export async function getPublicTables(): Promise<{ table_name: string }[]> {
  return query(
    `SELECT table_name
     FROM information_schema.tables
     WHERE table_schema = 'public'
       AND table_type = 'BASE TABLE'
     ORDER BY table_name`
  );
}
```

The connection pool uses `max: 5` because this is a stdio server — it starts fresh per session and does not need a large pool. The `ssl` handling accommodates both local databases (no SSL) and hosted databases like Supabase (SSL required).

The `getTableSchema` and `getPublicTables` functions are the queries that power Resources. They read from `information_schema` — the database's own metadata layer — rather than querying application tables.

---

## IV. The Resources

Resources expose what the database knows about itself. Table schemas are the most valuable resource: they tell the AI what data is available, what types it holds, and how to query it.

Create `src/resources.ts`:

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getPublicTables, getTableSchema, query } from './db.js';

export function registerResources(server: McpServer): void {
  // List all tables: tables://list
  server.resource(
    'tables-list',
    'tables://list',
    { mimeType: 'application/json', description: 'All tables in the public schema' },
    async () => {
      const tables = await getPublicTables();
      return {
        contents: [{
          uri: 'tables://list',
          mimeType: 'application/json',
          text: JSON.stringify(tables.map(t => t.table_name), null, 2)
        }]
      };
    }
  );

  // Schema for a specific table: tables://schema/{tableName}
  server.resource(
    'table-schema',
    new RegExp('^tables://schema/([a-z_][a-z0-9_]*)$'),
    { mimeType: 'application/json', description: 'Column definitions for a table' },
    async (uri) => {
      const match = uri.href.match(/^tables:\/\/schema\/([a-z_][a-z0-9_]*)$/);
      if (!match) throw new Error('Invalid table URI');

      const tableName = match[1];
      const schema = await getTableSchema(tableName);

      if (schema.length === 0) {
        throw new Error(`Table '${tableName}' not found in public schema`);
      }

      return {
        contents: [{
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify({
            table: tableName,
            columns: schema
          }, null, 2)
        }]
      };
    }
  );

  // Row count for a table: tables://count/{tableName}
  server.resource(
    'table-count',
    new RegExp('^tables://count/([a-z_][a-z0-9_]*)$'),
    { mimeType: 'application/json', description: 'Row count for a table' },
    async (uri) => {
      const match = uri.href.match(/^tables:\/\/count\/([a-z_][a-z0-9_]*)$/);
      if (!match) throw new Error('Invalid count URI');

      const tableName = match[1];
      // Validate table name exists before using in query
      const tables = await getPublicTables();
      const exists = tables.some(t => t.table_name === tableName);

      if (!exists) {
        throw new Error(`Table '${tableName}' not found`);
      }

      // Safe to interpolate because we validated against information_schema
      const rows = await query(`SELECT COUNT(*) as count FROM "${tableName}"`);
      const count = parseInt((rows[0] as { count: string }).count, 10);

      return {
        contents: [{
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify({ table: tableName, count }, null, 2)
        }]
      };
    }
  );
}
```

Three resources. Tables list gives the AI an inventory. Table schema gives it the column definitions it needs to write correct queries. Row count gives it a sense of data volume before running expensive queries.

The table name validation in the count resource deserves attention. Parameterized queries protect against SQL injection in `WHERE` clauses, but table names cannot be parameterized — they must appear directly in the SQL string. The pattern here: validate the name against `information_schema` first, then interpolate. The `information_schema` query uses a parameterized value; we only interpolate a name that has been confirmed to exist as a real table.

---

## V. The Tools

Tools execute queries. Two tools cover most needs: a general SQL executor for read-only queries, and a filtered row search for looking up specific records.

Create `src/tools.ts`:

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { query, getPublicTables } from './db.js';

const QUERY_TIMEOUT_MS = 10000;
const MAX_ROWS = 100;

function isReadOnlyQuery(sql: string): boolean {
  const normalized = sql.trim().toUpperCase();

  const forbidden = [
    'INSERT', 'UPDATE', 'DELETE', 'DROP', 'CREATE', 'ALTER',
    'TRUNCATE', 'GRANT', 'REVOKE', 'COPY', 'VACUUM', 'ANALYZE'
  ];

  return !forbidden.some(keyword =>
    normalized.startsWith(keyword) ||
    new RegExp(`\\b${keyword}\\b`).test(normalized)
  );
}

export function registerTools(server: McpServer): void {
  // General read-only SQL query
  server.tool(
    'query-database',
    'Execute a read-only SQL SELECT query against the database',
    {
      sql: z.string().describe('A SQL SELECT query to execute'),
      limit: z.number().int().min(1).max(MAX_ROWS).optional()
        .describe(`Maximum rows to return (default: 20, max: ${MAX_ROWS})`),
    },
    async ({ sql, limit = 20 }) => {
      if (!isReadOnlyQuery(sql)) {
        return {
          content: [{ type: 'text', text: 'Only SELECT queries are allowed. This server is read-only.' }],
          isError: true
        };
      }

      // Wrap the query with a limit and timeout
      const limitedSql = sql.trim().replace(/;$/, '');
      const safeSql = `
        SET statement_timeout = ${QUERY_TIMEOUT_MS};
        SELECT * FROM (${limitedSql}) AS __results LIMIT ${limit};
      `;

      try {
        const rows = await query(safeSql);
        const resultRows = rows.slice(rows.length > 1 ? 1 : 0);

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              rows: resultRows,
              count: resultRows.length,
              truncated: resultRows.length === limit
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{ type: 'text', text: `Query error: ${(error as Error).message}` }],
          isError: true
        };
      }
    }
  );

  // Filtered row search in a specific table
  server.tool(
    'search-table',
    'Search rows in a specific table with optional column filters',
    {
      table: z.string().describe('Table name to search'),
      filters: z.record(z.string(), z.unknown()).optional()
        .describe('Column-value pairs to filter by (exact match)'),
      columns: z.array(z.string()).optional()
        .describe('Specific columns to return (default: all)'),
      limit: z.number().int().min(1).max(MAX_ROWS).optional()
        .describe('Maximum rows to return (default: 20)'),
    },
    async ({ table, filters = {}, columns, limit = 20 }) => {
      // Validate table exists
      const tables = await getPublicTables();
      const tableExists = tables.some(t => t.table_name === table);

      if (!tableExists) {
        return {
          content: [{ type: 'text', text: `Table '${table}' not found` }],
          isError: true
        };
      }

      // Build the SELECT clause
      const selectClause = columns && columns.length > 0
        ? columns.map(c => `"${c.replace(/"/g, '')}"`).join(', ')
        : '*';

      // Build the WHERE clause with parameterized values
      const filterEntries = Object.entries(filters);
      const whereClause = filterEntries.length > 0
        ? 'WHERE ' + filterEntries
            .map((_, i) => `"${filterEntries[i][0].replace(/"/g, '')}" = $${i + 1}`)
            .join(' AND ')
        : '';
      const filterValues = filterEntries.map(([, v]) => v);

      const sql = `
        SELECT ${selectClause}
        FROM "${table}"
        ${whereClause}
        LIMIT ${limit}
      `;

      try {
        const rows = await query(sql, filterValues.length > 0 ? filterValues : undefined);
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              table,
              filters,
              rows,
              count: rows.length,
              truncated: rows.length === limit
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{ type: 'text', text: `Search error: ${(error as Error).message}` }],
          isError: true
        };
      }
    }
  );
}
```

The `isReadOnlyQuery` function is a first line of defense, not a complete security boundary. It catches obvious mistakes — an AI that tries to run a DELETE, a user who accidentally asks for destructive changes. The real security boundary is the PostgreSQL role. Create a read-only role for this server:

```sql
CREATE ROLE mcp_reader WITH LOGIN PASSWORD 'your-password';
GRANT CONNECT ON DATABASE your_database TO mcp_reader;
GRANT USAGE ON SCHEMA public TO mcp_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO mcp_reader;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO mcp_reader;
```

Even if the `isReadOnlyQuery` check is bypassed, a `mcp_reader` role cannot write. Defense in depth.

---

## VI. Assembling the Server

Create `src/server.ts`:

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { pool } from './db.js';
import { registerResources } from './resources.js';
import { registerTools } from './tools.js';

const server = new McpServer({
  name: 'postgres-mcp-server',
  version: '1.0.0',
});

registerResources(server);
registerTools(server);

async function main(): Promise<void> {
  // Verify database connection before accepting client connections
  try {
    const client = await pool.connect();
    client.release();
    console.error('Database connection verified');
  } catch (error) {
    console.error('Failed to connect to database:', (error as Error).message);
    process.exit(1);
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('PostgreSQL MCP server started');
}

process.on('SIGTERM', async () => {
  await pool.end();
  process.exit(0);
});

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
```

The startup verification matters. A server that silently connects but has an invalid database URL will fail on the first tool call with a cryptic error. Fail fast at startup with a clear message.

---

## VII. Testing with Claude Code

Build the server and add it to Claude Code's configuration:

```bash
npm run build
```

Add to `~/.claude/settings.json` (macOS/Linux) or the equivalent on your platform:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "node",
      "args": ["/absolute/path/to/postgres-mcp-server/dist/server.js"],
      "env": {
        "DATABASE_URL": "postgresql://mcp_reader:password@localhost:5432/your_database"
      }
    }
  }
}
```

Restart Claude Code. Open a new session. You can now ask:

- "What tables are in my database?" → AI reads `tables://list` Resource
- "Show me the schema for the users table" → AI reads `tables://schema/users` Resource
- "How many active subscriptions are there?" → AI calls `query-database` with a SELECT COUNT
- "Find all users who signed up in the last 7 days" → AI calls `search-table` or `query-database`

The AI does not guess at your schema. It reads it. The queries it writes are correct for your actual column names and data types.

---

## VIII. How My Supabase Connection Works

Supabase is a hosted PostgreSQL service. The connection string looks like this:

```
postgresql://postgres.projectref:password@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

That URL contains credentials and a regional endpoint. It goes in the environment, never in a committed file.

My Supabase server runs as an HTTP/SSE server rather than stdio, for one reason: connection pooling. Supabase in Session mode limits connections. Opening and closing the pool on every Claude Code session consumes connection slots. As an HTTP/SSE server, the connection pool opens once and stays open.

The server also uses Supabase's connection pooler (port 6543) rather than direct connection (port 5432). The pooler handles connection management at the infrastructure level, which means my application pool can stay small — three connections maximum — while Supabase handles the actual connection lifecycle.

The SSL configuration for Supabase:

```typescript
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
  ssl: {
    rejectUnauthorized: false  // Required for Supabase's certificate chain
  }
});
```

`rejectUnauthorized: false` is acceptable here because the connection goes over TLS — the certificate is not verified against a local CA bundle, but the connection is still encrypted. For production environments where you control the CA, pin the certificate instead.

Beyond the transport and SSL differences, the code is identical to the local server in this chapter. The protocol is the same. The Resources are the same. The Tools are the same. The transport layer is the only thing that changes.

That is the value of a well-designed abstraction. Build it once. Connect it anywhere.
