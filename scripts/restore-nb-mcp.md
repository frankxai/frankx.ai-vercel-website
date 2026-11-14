# Restore NB / InfoGenius MCP Server

The canonical InfoGenius v5.2 MCP server source and compiled binary live in the Starlight estate at:

```
C:\Users\frank\starlight\repos\arcanea-infogenius\mcp-server\dist\index.js
```

And the Google AI Studio InfoGenius React web app lives at:

```
C:\Users\frank\starlight\repos\infogenius
```

## Direct CLI (Recommended — Zero MCP Overhead)

You can run the full InfoGenius v5.2 pipeline (Google Search grounded research + Nano Banana Pro 2K/4K image + Veo 3.1 `--animate` + Gemini TTS `--narrate` + `.vis.provenance.json` sidecar) directly from `frankx.ai-vercel-website` or `FrankX`:

```bash
node scripts/infogenius.mjs "Sovereign AI Swarm Architecture" --style glassmorphic --audience expert
node scripts/infogenius.mjs "Model Context Protocol" --style premium --animate --narrate
```

Both `scripts/infogenius.mjs` and `arcanea-infogenius/mcp-server` automatically load `GEMINI_API_KEY` from `C:\Users\frank\.starlight\.env` (or repo `.env.local`).

## To register the MCP server in Claude Desktop / Claude Code (optional)

**File:** `C:\Users\frank\AppData\Roaming\Claude\claude_desktop_config.json` (or `~/.claude/mcp.json`)

**Add this top-level block:**

```json
{
  "mcpServers": {
    "nanobanana": {
      "command": "node",
      "args": ["C:\\Users\\frank\\starlight\\repos\\arcanea-infogenius\\mcp-server\\dist\\index.js"]
    },
    "infogenius": {
      "command": "node",
      "args": ["C:\\Users\\frank\\starlight\\repos\\arcanea-infogenius\\mcp-server\\dist\\index.js"]
    }
  }
}
```

(Both names point at the same binary because some FrankX commands reference `mcp__nanobanana__generate_image` and others reference `mcp__infogenius__*`. Registering under both aliases means every existing command works.)

## After adding the block

1. Quit Claude Desktop completely
2. Restart it
3. The MCP tool `mcp__nanobanana__generate_image` will reappear in tool lists for new sessions
4. Restart Claude Code (or open a new project session) — the agent will have access to the tool again

## Whether to bother

The direct-API library (`scripts/lib/nb-image.mjs` + `scripts/nb-generate.mjs`) renders the same Nano Banana 2 / Pro / 1 output without the MCP. It's more durable across reinstalls. The MCP is convenience — useful when you want to generate inline during a Claude Desktop chat without dropping to a shell.

If you re-register: rotate the expired key in `Arcanea/arcanea-claw/.env` first so the env block has a current value. The library already finds the live `GOOGLE_GENERATIVE_AI_API_KEY` in `Arcanea/.env.local` automatically.
