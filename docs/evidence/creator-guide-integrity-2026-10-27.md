# Creator guide factual corrections — 27 October 2026

Status: branch draft for review. This evidence covers targeted editorial corrections to the existing ChatGPT and Claude guides. It is not a release approval, a complete product review, or a model benchmark.

## Scope

- Preserve the existing guide URLs, original publication dates, learning hub callouts, and practical prompt examples.
- Remove duplicate body H1s because the guide layout renders the page title.
- Replace fixed model, price, entitlement, and context-window claims with official feature and plan references.
- Remove unmeasured assistant ratings, unsupported superiority and safety claims, and unverifiable first-person usage claims.
- Correct the claim that a difficult prompt alone enables Claude thinking; link the actual model, effort, and thinking controls.
- Replace unconditional custom-GPT creation recommendations after checking OpenAI's current creation and migration documentation.
- Add a separately labelled editorial correction date. The date does not imply live tests of provider features.

## Primary source evidence

Provider pages were consulted on 27 October 2026. The corrections deliberately avoid copying volatile model lists, prices, or limits into this evergreen guide.

| Official source | Correction supported |
| --- | --- |
| [ChatGPT plans](https://chatgpt.com/pricing/) | Plan-specific access; remove old fixed prices and entitlements |
| [ChatGPT capabilities](https://help.openai.com/en/articles/9260256-chatgpt-capabilities-overview) | Image, voice, file, and search capabilities depend on access and settings |
| [Creating and editing GPTs](https://help.openai.com/en/articles/8554397-creating-and-editing-gpts) | Personal accounts cannot create new GPTs; existing GPTs and workspaces have migration rules |
| [Projects in ChatGPT](https://help.openai.com/en/articles/10169521-projects-in-chatgpt) | Reusable project instructions/files and Canvas within projects |
| [ChatGPT file uploads](https://help.openai.com/en/articles/8555545-uploading-files-and-audio-to-chatgpt) | Supported files and account-dependent availability |
| [Memory in ChatGPT](https://help.openai.com/en/articles/8590148-memory-in-chatgpt) | Memory is conditional and controlled by account/settings |
| [Claude plans](https://claude.com/pricing) | Current plan and access reference instead of hardcoded entitlements |
| [Claude model, effort, and thinking settings](https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings) | Actual controls and model-dependent behavior |
| [Claude usage and length limits](https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work) | Usage and context are distinct limits |
| [Claude context windows](https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans) | Context capacity varies by model |
| [Claude Artifacts](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them) | Output workspace and capability settings |
| [Claude Projects](https://support.claude.com/en/articles/9517075-what-are-projects) | Project versions and rollout differ by account |
| [Claude Code access](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan) | Plan and interface guidance for repository work |

The old Canvas help URL returned 404 during retrieval. It was not retained as a source; the current Projects documentation supports the narrower Canvas mention.

## Validation

- `node --test scripts/tests/creator-guide-integrity.test.mjs`: 3 passed. Both guide bodies compile with `@mdx-js/mdx`; checks cover original publication dates, separately labelled correction dates, layout-owned H1s, current official plan links, retained learning callouts/practice prompts, removal of known stale claims and rating tables, and corrected GPT creation guidance.
- `git diff --check`: passed.
- `node scripts/audit-ai-slop.mjs --strict`: passed, 2,658 files scanned and 0 hits.
- Full-site build, type-check, lint, runtime rendering, and integrated route checks belong to the parent implementation review; they were not run as part of this content-only correction.
- No assistant outputs were benchmarked. No provider account features were exercised. No deployment or publication was performed.

## Governance limitation

Repository instructions require the [human-writing standard](https://github.com/Starlight-Intelligence/starlight-agent-config/blob/main/core/policies/human-writing-standard.v1.md). The parent implementation session reported that the source repository returned 404 and could not be read. Other repository and FrankX voice guidance was available, but it does not substitute for the missing mandatory source.

This branch therefore supplies source-backed correction text and review evidence only. A reviewer must resolve the missing governance source and complete the integrated release checks before treating this as approved public copy. No new positioning, credentials, partnerships, or firsthand model experience were invented.
