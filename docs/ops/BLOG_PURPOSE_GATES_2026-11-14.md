# Blog authoring gate repair

Owning issue: https://github.com/frankxai/frankx.ai-vercel-website/issues/1243

Base: `baea0d3f51e3e6aed77f7d389f21c1f11b5697e1`.
Implementation owner: Codex / OpenAI. Branch: `agent/codex/blog-purpose-gates`.

## Outcome

A short essay, a tutorial with one useful FAQ answer, and a flagship argument can pass the blog commit hook without adding three question headings or five FAQ entries. Frontmatter parsing, title/description limits, image presence, the existing voice scanner, and flagship summary/freshness/objection checks are preserved.

The synchronized authoring commands and editorial standard now describe optional FAQ content and one shell summary, rather than requiring duplicate summaries and a fixed article shape. The touched factory command also follows the existing feature-branch/draft-PR protocol instead of its stale direct-to-main example. No public articles, rendering code, schema implementation, homepage, dependencies or infrastructure changed.

## Verification

- `node --test scripts/tests/blog-purpose-gates.test.mjs`: 7 passed. Fixtures exercise the actual hook in temporary staged Git repositories and reuse the real voice scanner.
- The same fixtures against the base hook: 4 passed, 3 failed as expected (essay, one-answer tutorial, valid flagship). This reproduces the editorial-format rejection being repaired.
- `bash -n .claude/hooks/blog-commit-gate.sh .claude/hooks/session-start-excellence.sh`: passed.
- `git diff --check`: passed before commit.
- Same-provider internal review: `dispatch_audit` reviewed the final scoped diff, reran all 7 behavioral tests and found no blocking findings. This is not different-provider release acceptance.

Required application checks were attempted once through the available pnpm v11.25.0 wrapper, which automatically launched dependency installation before running scripts. `pnpm run type-check` stopped because the sparse checkout lacks the local `vendor/google-design-md/package` dependency. The lint, strict language-audit and build wrappers were killed with SIGKILL during automatic installation. None of these four scripts executed; none is claimed green. Dependencies were not installed deliberately, and no dependency or lockfile changes resulted. No pnpm/install processes remained at the follow-up process check.

The fixture suite requires Bash, Git, Python 3 and PyYAML, matching the hook's runtime. It ran successfully in this session. Application checks and different-provider review remain required before release.

## Boundaries and remaining work

- `scripts/autoresearch-score.mjs:204-220` still rewards five question headings, five FAQ entries and extra summary sections. Its optimization rubric needs a separate, measured revision; this change does not establish that all content-generation incentives are corrected.
- `scripts/content-publisher.mjs:163-170` still warns about fewer than five frontmatter FAQ entries and no FAQ section. Align that publisher and its callers in the follow-up before treating the entire authoring system as format-neutral.
- The existing hook checks working-tree content rather than reading index bytes and retains its pre-existing bypass/environment behavior. These unrelated weaknesses are outside this repair.
- Article-shell repetition, ToC presentation and existing article edits belong to separate issues. This hook change cannot alter already published pages by itself.

Release state: review candidate only. No merge, production deployment or public content publication.
