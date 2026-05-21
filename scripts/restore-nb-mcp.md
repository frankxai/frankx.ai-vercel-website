# Restore NB / InfoGenius MCP Server

The NB MCP server source is intact at:

```
C:\Users\frank\Arcanea\arcanea-infogenius\mcp-server\dist\index.js
```

It's `arcanea-infogenius-mcp` v2.0.0 — "Gemini 3 Pro visual generation with Guardian AI routing" — built and ready. Claude Desktop just isn't pointing at it anymore (the `mcpServers` block in `claude_desktop_config.json` got wiped during a reinstall).

## To re-register (optional — the library works without it)

**File:** `C:\Users\frank\AppData\Roaming\Claude\claude_desktop_config.json`

**Current state:** preferences only, no `mcpServers` block.

**Add this top-level block:**

```json
{
  "mcpServers": {
    "nanobanana": {
      "command": "node",
      "args": ["C:\\Users\\frank\\Arcanea\\arcanea-infogenius\\mcp-server\\dist\\index.js"],
      "env": {
        "GOOGLE_GENERATIVE_AI_API_KEY": "<paste from Arcanea/.env.local>"
      }
    },
    "infogenius": {
      "command": "node",
      "args": ["C:\\Users\\frank\\Arcanea\\arcanea-infogenius\\mcp-server\\dist\\index.js"],
      "env": {
        "GOOGLE_GENERATIVE_AI_API_KEY": "<paste from Arcanea/.env.local>"
      }
    }
  },
  "preferences": { ...keep existing preferences... }
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
