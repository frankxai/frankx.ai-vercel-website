# Google design.md security rebuild, Codex, 4 November 2026, revision 2

Author: Codex. Upstream author: Google LLC, Apache-2.0. Review state: final CI pending.
Revision 1 records the initial archive implementation; this revision supersedes it.

The local package retains the Google CLI/linter interface and removes embedded
Zod 3 through the adjacent migration patch and a pinned source rebuild. Its 58
text files are committed under `package/`; root installation uses the pnpm `file:`
directory protocol. Every runtime dependency stays declared and locked. There is
no committed archive, registry publication, install hook or Media Guard exemption.

`rebuild.mjs` verifies the upstream archive hash at commit
`9bf8eae67128b6cc55ad9bf86665767deb4c11cd`, applies the patch, runs the upstream
tests and declaration typecheck, and emits the text package using Bun 1.3.12.
CI compares the complete generated tree byte for byte and tests the installed
CLI's valid and invalid inputs. Source downloaded during a rebuild stays temporary.

```sh
# Linux, Node 22, pnpm 10.28.0, Bun 1.3.12, root frozen installation:
node vendor/google-design-md/rebuild.mjs /tmp/design-md-verified
diff -qr vendor/google-design-md/package /tmp/design-md-verified/package
```

Media Guard rejected the first `.tgz` approach. The implementation now follows
that policy by keeping inspectable Node source and declarations. The narrow
`.gitignore` rule tracks only this verified package's runtime files while ordinary
build directories remain ignored. Replace this temporary fork when upstream
[issue 184](https://github.com/google-labs-code/design.md/issues/184) is resolved
and the upstream package's real bundled code and compatibility tests pass.
