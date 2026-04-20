# Publishing to the Ecosystem

> "If you want to go fast, go alone. If you want to go far, go together."
> — African proverb

---

You have built an MCP server. It works. It is tested. It handles errors gracefully, validates inputs rigorously, and produces structured output that AI clients can parse reliably.

Now the question: do you keep it to yourself, or do you publish it to the ecosystem?

The MCP ecosystem has grown to over 1,400 servers. Each one extends what AI can do. A weather server gives AI access to forecasts. A database server gives AI access to data. A deployment server gives AI the ability to ship code to production. Each published server expands the frontier of AI capability by one node.

This chapter covers how to package, document, publish, and maintain an MCP server for the ecosystem.

---

## I. Packaging for Distribution

An MCP server that runs on your machine is a tool. An MCP server that runs on anyone's machine is a product. The gap between the two is packaging.

**npm is the standard distribution channel for MCP servers.** The ecosystem convention is to publish servers as npm packages that users install with `npx`:

```bash
npx -y @your-org/mcp-server-weather
```

To make this work, your `package.json` needs specific configuration:

```json
{
  "name": "@your-org/mcp-server-weather",
  "version": "1.0.0",
  "description": "MCP server providing real-time weather data from OpenWeatherMap",
  "type": "module",
  "bin": {
    "mcp-server-weather": "./dist/index.js"
  },
  "files": [
    "dist/"
  ],
  "keywords": [
    "mcp",
    "model-context-protocol",
    "weather",
    "ai-tools"
  ],
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "build": "tsc",
    "prepare": "npm run build"
  }
}
```

Key decisions in this configuration:

**The `bin` field.** This makes your server executable via `npx`. Without it, users cannot start the server with a single command. The binary should point to your compiled entry point.

**The `files` field.** Only ship the compiled output. Do not ship your source code, test files, or development configuration. Users need the server, not your development environment.

**The `keywords` field.** Always include `mcp` and `model-context-protocol`. These are how users discover your server when searching npm. Add domain-specific keywords: `weather`, `database`, `deployment`, `email`.

**The `engines` field.** MCP SDK requires Node 18 or later. Declaring this prevents confusing errors on older Node versions.

---

## II. The README That Gets Adopted

Your README is your server's sales pitch, installation guide, and troubleshooting manual in one document. A poorly documented server does not get adopted — regardless of how well it works.

The ecosystem has converged on a standard README structure:

```markdown
# MCP Server: Weather

Real-time weather data via OpenWeatherMap for AI assistants.

## Quick Start

```json
{
  "mcpServers": {
    "weather": {
      "command": "npx",
      "args": ["-y", "@your-org/mcp-server-weather"],
      "env": {
        "OPENWEATHER_API_KEY": "your-key-here"
      }
    }
  }
}
```

## Tools

### get-weather
Get current weather for a city.
- **city** (string, required): City name
- **units** (string, optional): "metric" or "imperial" (default: "metric")

### get-forecast
Get 5-day forecast for a city.
- **city** (string, required): City name
- **days** (number, optional): Number of days, 1-5 (default: 3)

## Resources

### weather://cities
List of supported cities with country codes.

## Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| OPENWEATHER_API_KEY | Yes | API key from openweathermap.org |
| DEFAULT_UNITS | No | Default unit system (metric/imperial) |

## Development

```bash
git clone https://github.com/your-org/mcp-server-weather
cd mcp-server-weather
npm install
npm run build
npm test
```
```

Three elements make this README effective:

**The Quick Start block comes first.** Users want to run your server, not read your architecture decisions. The configuration JSON is copy-pasteable — they can have your server running in under a minute.

**Every Tool and Resource is documented.** Each parameter has a type, a description, and whether it is required. This is not optional documentation — it is the contract between your server and its users.

**Environment variables are tabulated.** Users need to know exactly which secrets to configure and which are optional. A table is faster to scan than prose.

---

## III. Publishing to mcp.so

The MCP ecosystem directory at mcp.so is where builders and users discover servers. Listing your server here puts it in front of the community.

The submission process:

1. **Ensure your server is published on npm** (or available via a public GitHub repository)
2. **Visit mcp.so** and submit your server through the listing form
3. **Provide**: name, description, category, npm package name or GitHub URL, and a link to documentation
4. **Wait for review.** The maintainers verify that the server follows MCP protocol conventions and that the documentation is adequate

Categories on mcp.so include: databases, APIs, developer tools, productivity, communication, and more. Select the category that best describes your server's primary function — not the one with the fewest entries.

**Discoverability tips:**
- A clear, specific server name: `mcp-server-postgres` not `mcp-db-tool`
- A one-sentence description that states what the server does, not what technology it uses
- A complete README with Quick Start configuration
- At least one working example showing the server in action

---

## IV. Versioning and Maintenance

A published server has users. Users depend on your server's behavior. Changing that behavior without warning breaks their workflows.

**Semantic versioning is non-negotiable:**
- **Patch** (1.0.1): Bug fixes, documentation updates. No behavior changes.
- **Minor** (1.1.0): New Tools, new Resources, new optional parameters. Existing behavior unchanged.
- **Major** (2.0.0): Breaking changes — renamed Tools, removed parameters, changed response formats.

```javascript
// BAD — breaking change in a minor version
// v1.1.0: renamed "get-weather" to "fetch-weather"
// Every user's configuration now breaks silently

// GOOD — deprecation in minor, removal in major
// v1.1.0: add "fetch-weather" as alias for "get-weather"
//         log deprecation warning when "get-weather" is called
// v2.0.0: remove "get-weather", only "fetch-weather" remains
```

**The deprecation pattern:**

When you need to rename or remove a Tool, follow a two-step process:

1. In a minor version, add the new Tool and mark the old one as deprecated. When the old Tool is called, it should still work but log a warning.
2. In the next major version, remove the deprecated Tool.

This gives users time to update their configurations. A server that breaks without warning loses trust — and trust is the only currency in an open-source ecosystem.

---

## V. The CHANGELOG

Every version gets a changelog entry. Not because it is a best practice — because it is a survival practice.

```markdown
# Changelog

## [1.2.0] - 2026-03-15
### Added
- `get-air-quality` tool for pollution data
- `units` parameter to `get-forecast` (metric/imperial)

### Fixed
- Temperature rounding error for sub-zero values
- Timeout handling for slow API responses

## [1.1.0] - 2026-02-28
### Added
- `get-forecast` tool with 1-5 day range
- `weather://cities` resource listing supported cities

### Changed
- Improved error messages for invalid city names
```

Format follows Keep a Changelog conventions. Each entry answers: what changed, and what does the user need to do about it?

---

## VI. Contributing to Existing Servers

Not every contribution to the ecosystem is a new server. Some of the most valuable contributions are improvements to existing ones.

The open-source MCP ecosystem accepts contributions across several dimensions:

**New Tools for existing servers.** The Postgres MCP server handles queries — but does it handle schema visualization? Adding a `get-schema-diagram` Tool to an existing database server is often more valuable than building a new server from scratch.

**Better error messages.** Most servers ship with minimal error handling. Replacing "Error: invalid input" with "Error: city name must be a non-empty string (received: null)" is a contribution that every user benefits from.

**Documentation improvements.** Many servers have incomplete READMEs. Adding a Quick Start configuration block, documenting undocumented parameters, or adding usage examples are high-impact contributions that require no server code changes.

**Security fixes.** If you find a vulnerability — input injection, credential exposure, missing validation — report it responsibly and submit a fix. Security contributions are the highest-impact work in any ecosystem.

The contribution workflow:

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request with a clear description of what changed and why
5. Respond to review feedback

Most MCP server repositories are actively maintained. A well-described pull request with tests typically gets reviewed within days.

---

## VII. Building a Server Organization

As you publish more servers, consider organizing them under a single npm scope:

```
@your-org/mcp-server-weather
@your-org/mcp-server-postgres
@your-org/mcp-server-github
@your-org/mcp-server-deploy
```

A consistent naming convention — `@scope/mcp-server-{domain}` — makes your servers discoverable as a family. Users who trust one of your servers will try others.

Beyond npm, maintain a GitHub organization with:
- A monorepo or linked repositories for your servers
- Issue templates for bug reports and feature requests
- A CONTRIBUTING.md that explains how to set up the development environment
- CI/CD that runs tests on every pull request

The organizational structure signals professionalism. A server from an organization with consistent naming, automated tests, and responsive maintainers gets adopted faster than an identical server from an anonymous repository with no CI and no documentation.

---

## VIII. The Economics of Open Source MCP

Why publish a server for free?

The economics are not obvious — but they are real.

**Adoption creates feedback.** Users find bugs you missed. They request features you did not imagine. They submit pull requests that improve your code. A published server gets better faster than a private one.

**Reputation compounds.** In the AI tooling ecosystem, builders with published, well-maintained MCP servers are recognized. This recognition opens doors: consulting opportunities, speaking invitations, job offers, partnership proposals. The server is free. The reputation it builds is not.

**The ecosystem grows.** Every server you publish makes MCP more valuable as a protocol. More servers mean more capability. More capability means more adoption. More adoption means more developers building servers. This flywheel benefits everyone — including you.

**Standards emerge from practice.** By publishing servers, you participate in defining what good MCP servers look like. Your patterns — error handling, documentation structure, testing approach — influence how others build. The ecosystem's conventions are set by those who ship.

---

## IX. The Full Journey

This book has covered the complete path from protocol understanding to ecosystem contribution.

Chapter 1 established what MCP is and why it matters — the USB-C of AI integration, the standard protocol that replaced a thousand custom integrations.

Chapters 2 and 3 taught the fundamentals: the three primitives (Resources, Tools, Prompts) and the process of building a working server from zero.

Chapter 4 explained the transport layer — how messages flow between client and server, and why this plumbing matters for reliability.

Chapters 5 and 6 built real-world servers: a database server that gives AI access to PostgreSQL, and an API wrapper that connects AI to any external service.

Chapter 7 addressed security — the practices that prevent your server from becoming a vulnerability.

Chapter 8 showed how individual servers compose into constellations — the multi-server architecture that transforms MCP from a protocol into a platform.

Chapter 9 covered testing — the discipline that separates demos from products.

And this chapter described how to share your work with the ecosystem — packaging, documentation, publishing, versioning, and the economics of building in public.

---

## X. The Builder's Invitation

The MCP ecosystem is early. Fourteen hundred servers is impressive — but it is a fraction of what is needed. Every API without an MCP server is an integration waiting to be built. Every database without an MCP server is data locked away from AI. Every workflow without an MCP server is a manual process that could be automated.

The tools are available. The protocol is stable. The SDK is well-documented. The ecosystem is welcoming.

What remains is the builder.

Build the server. Test it. Document it. Publish it. Maintain it. Watch as others use your work to accomplish things you did not anticipate. Watch as the ecosystem grows around the node you contributed.

This is how protocols become platforms. This is how tools become infrastructure. This is how individual builders shape the future of how humans and AI work together.

Build it. Ship it. The ecosystem is waiting.
