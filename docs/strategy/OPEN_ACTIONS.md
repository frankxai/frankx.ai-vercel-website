## Open Actions

### Stripe MCP Setup (Feb 14, 2026)

- **Status**: Plugin installed but not enabled/authenticated
- **Location**: `~/.claude/plugins/marketplaces/anthropics/external_plugins/stripe/`
- **Action needed**:
  1. Run `claude plugins enable stripe` in separate terminal
  2. Authenticate with Stripe OAuth
  3. Or: `claude mcp add stripe -e STRIPE_SECRET_KEY=sk_test_... -- npx -y @anthropic-ai/stripe-mcp-server`
- **Purpose**: Payment links, subscriptions, product management for value ladder ($27-697)
- **Also needed**: Lemon Squeezy keys in `.env.local` (lib already built)
