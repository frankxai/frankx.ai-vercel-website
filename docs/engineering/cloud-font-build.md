# Reproducible Cloud font build

The application loads its existing families from ten exact Fontsource `5.3.0` packages. Their published CSS retains separate `unicode-range` rules for every upstream subset and references the unmodified OFL-1.1 binaries. The browser therefore selects Latin, Latin Extended, or another packaged subset by the characters on the page instead of treating two same-style files as competing faces.

`app/local-fonts.css` imports only the selected weights and normal/italic styles. It exposes the existing CSS variable names with category-appropriate fallback stacks. The stylesheet does not preload every face: font files are requested when CSS matching requires them, avoiding duplicate eager payloads. This differs from `next/font/google`: its `subsets` option marks which downloaded subset files are preloaded, while the generated CSS can still contain other coverage.

The Fontsource CSS includes broader scripts where each family publishes them. Latin covers German characters such as `Ä Ö Ü ä ö ü ß`; Latin Extended covers samples such as `Ā Č Ł ő Ț`. Fontconfig-based tests inspect the actual installed WOFF2 character maps, selected weights, and italic files. These checks establish binary coverage, not pixel-level metric or visual fidelity. Browser rendering, mobile wrapping, and fallback behavior remain release evidence to collect.

## Isolated setup

Run commands through the checked setup wrapper:

```bash
scripts/codex-cloud-setup.sh pnpm install --frozen-lockfile
scripts/codex-cloud-setup.sh pnpm run type-check
scripts/codex-cloud-setup.sh pnpm run lint
scripts/codex-cloud-setup.sh pnpm run ai-slop:audit:strict
scripts/codex-cloud-setup.sh env CI=true pnpm run build
```

The wrapper resolves the repository root from its own location, validates the pins and Linux x64 platform, and uses Node.js `v22.23.3` only from a user cache. It verifies the official archive against SHA-256 `df450af89261115ef9f9e3830c3eeb2cc9213b63c720b1af623cb5dcbe2e02de`, rejects unregistered Node pins, reports the cached runtime path, and invokes pnpm `10.28.0` through Corepack. It changes neither the account default runtime nor persistent project settings.

## Evidence boundary

The rejected Cloud result is retained in its own parent commit. It used Latin-only `next/font/local` faces and Node `22.12.0`; passing source and license assertions did not prove coverage. The refinement adds actual binary character-map validation and preserves subset CSS ranges. No generic hosted browser or exact-revision independent provider review is available in this environment, so screenshots and rendered fidelity remain pending rather than inferred from build success.
