# Google design.md security rebuild, Codex, 4 November 2026, revision 1

Author: Codex. Review state: rebuilt; upstream tests/typecheck passed; final CI and independent review pending.
Upstream author: Google LLC. License: Apache-2.0, preserved in the package.

The upstream 0.4.0 release bundles vulnerable Zod 3 into its JavaScript. A pnpm
override changes the dependency tree without replacing that embedded code.
Upstream [issue 184](https://github.com/google-labs-code/design.md/issues/184)
tracks the migration. This local package preserves the CLI/linter interface and
all upstream tests while migrating the record/default APIs to Zod 4.6.7.

`rebuild.mjs` downloads commit `9bf8eae67128b6cc55ad9bf86665767deb4c11cd`, checks
the archive SHA256, applies the adjacent patch, runs every CLI source test and
the declaration typecheck, and builds both entry points. All runtime dependencies
remain external, declared and visible to the root lockfile/audit. The script
asserts that Zod is imported instead of bundled. No upstream lifecycle scripts,
new registry publication or production deployment are involved.

On Linux, with the root frozen installation, Bun 1.3.12 and pnpm 10.28.0:

```sh
node vendor/google-design-md/rebuild.mjs /tmp/design-md-package
```

The generated tarball is committed and locked by integrity. Ordinary installs use
that reviewed artifact and do not download or rebuild upstream. Replace this
temporary fork with an upstream release once its bundled-code migration and
compatibility checks pass. Do not restore the vulnerable registry release.
