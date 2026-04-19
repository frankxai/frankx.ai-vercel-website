# Testing Your Server

> "Testing shows the presence, not the absence of bugs."
> — Edsger W. Dijkstra

---

An MCP server that works most of the time is a server that will fail at the worst time.

Testing MCP servers is not optional. It is the practice that separates a demo from a product. A server that handles the happy path is impressive. A server that handles malformed inputs, network failures, authentication errors, and edge cases is reliable.

This chapter covers how to test MCP servers — from simple smoke tests to comprehensive integration testing.

---

## I. The Testing Pyramid for MCP

MCP servers have three testing layers, mirroring the classic testing pyramid:

**Unit tests** (bottom layer, many tests, fast): Test individual handler functions in isolation. Does the weather lookup return the correct format? Does the SQL validator reject DROP statements? Does the input schema match the expected types?

**Integration tests** (middle layer, moderate tests, medium speed): Test the server's interaction with external services. Does the database connection work? Does the API authentication succeed? Does the deployment trigger actually deploy?

**End-to-end tests** (top layer, few tests, slow): Test the complete flow from AI client to server to external service and back. Does Claude Code correctly use the tool? Does the response format parse correctly in the client?

---

## II. Unit Testing Your Handlers

The simplest and most valuable tests are handler unit tests. Extract your handler logic into pure functions, then test those functions independently.

```javascript
// handler.js — extracted logic
export function validateQuery(query) {
  const forbidden = ['DROP', 'DELETE', 'TRUNCATE', 'ALTER', 'INSERT', 'UPDATE']
  const upper = query.toUpperCase().trim()
  if (forbidden.some(f => upper.startsWith(f))) {
    return { valid: false, error: 'Only SELECT queries are allowed.' }
  }
  return { valid: true }
}

export function formatWeatherResponse(city, data) {
  if (!data) return `Weather data not available for ${city}.`
  return `Weather in ${city}: ${data.temp}, ${data.condition}. Humidity: ${data.humidity}`
}
```

```javascript
// handler.test.js
import { validateQuery, formatWeatherResponse } from './handler.js'

test('rejects DROP queries', () => {
  expect(validateQuery('DROP TABLE users').valid).toBe(false)
})

test('allows SELECT queries', () => {
  expect(validateQuery('SELECT * FROM users').valid).toBe(true)
})

test('formats weather correctly', () => {
  const result = formatWeatherResponse('Amsterdam', { temp: '14°C', condition: 'Cloudy', humidity: '72%' })
  expect(result).toContain('14°C')
  expect(result).toContain('Amsterdam')
})

test('handles missing data', () => {
  const result = formatWeatherResponse('Unknown', null)
  expect(result).toContain('not available')
})
```

These tests run in milliseconds, require no external dependencies, and catch the most common bugs: malformed output, missing validation, and edge case handling.

---

## III. Integration Testing

Integration tests verify that your server correctly interacts with external services. These tests are slower, require credentials, and should run in a test environment — never against production.

```javascript
// integration.test.js
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

test('database server connects and queries', async () => {
  const server = createDatabaseServer({ connectionString: process.env.TEST_DB_URL })

  // Test Resource: list tables
  const tables = await server.handleResourceRequest('schema://tables')
  expect(tables.contents).toBeDefined()
  expect(tables.contents.length).toBeGreaterThan(0)

  // Test Tool: run query
  const result = await server.handleToolCall('run-query', { query: 'SELECT 1 as test' })
  expect(result.content[0].text).toContain('test')
})
```

**Key practice**: Use a separate test database with known data. Never test against production. Seed the test database with predictable data so your assertions are deterministic.

---

## IV. Testing with Claude Code

The ultimate test: does your server work correctly when Claude Code calls it?

Create a test script that uses Claude Code to exercise your server:

1. Start Claude Code with your server configured
2. Give it a specific instruction: "Using the weather server, get the weather for Amsterdam"
3. Verify the output matches expectations

This is manual testing — but it catches issues that automated tests miss, particularly around Tool description clarity and response formatting. If Claude Code misinterprets what your server does, the Tool description needs improvement.

**Common issues caught by Claude Code testing:**
- Tool descriptions too vague (Claude selects the wrong tool)
- Response format not parseable (Claude cannot extract the answer)
- Missing input validation (Claude sends unexpected parameter types)
- Error messages not helpful (Claude cannot recover from failures)

---

## V. The Testing Checklist

Before declaring any MCP server production-ready:

- [ ] All handler functions have unit tests
- [ ] Input validation rejects malformed inputs gracefully
- [ ] Error handling returns structured messages, not stack traces
- [ ] Destructive operations are blocked or require explicit confirmation
- [ ] Authentication works with real credentials
- [ ] The server recovers from connection failures
- [ ] Tool descriptions are clear enough for Claude to route correctly
- [ ] Response formats are consistent and parseable
- [ ] Audit logging captures all Tool invocations
- [ ] The server runs for 24+ hours without memory leaks

This checklist is your governance pillar applied to MCP development. Not every item requires a formal test — some can be verified manually. But every item must be verified before the server handles real work.

Test it. Then trust it. In that order.
