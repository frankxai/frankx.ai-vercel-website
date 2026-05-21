#!/usr/bin/env bash
set -euo pipefail

if ! command -v claude >/dev/null 2>&1; then
  echo "Error: claude CLI not found in PATH." >&2
  exit 1
fi

if [[ $# -lt 1 ]]; then
  cat <<'USAGE'
Usage:
  scripts/claude-mcp-bridge.sh "your prompt"

Description:
  Runs Claude in non-interactive mode with MCP tool access enabled.
  This is useful when Codex doesn't have MCP servers attached directly.

Examples:
  scripts/claude-mcp-bridge.sh "List connected MCP servers and available tools."
  scripts/claude-mcp-bridge.sh "Use v0 MCP to create a dashboard concept for misinformation risk monitoring."
USAGE
  exit 1
fi

PROMPT="$*"

claude -p \
  --allowedTools mcp_tool \
  --output-format text \
  "$PROMPT"
