# Reproducible Cloud font build

The application loads its existing families from exact Fontsource `5.3.0` packages. Static packages retain only the explicitly selected faces: Inter 300–700, Poppins 600–800, Cormorant Garamond 300–700 normal/italic, Dancing Script 400–700, and DM Serif Display 400. Poppins remains static because Fontsource does not publish a Poppins variable package.

The declarations that previously omitted `weight` were Google variable-font requests. Their replacements use the licensed `@fontsource-variable` packages and preserve continuous `wght` ranges: EB Garamond 400–800, JetBrains Mono 100–800, Lora 400–700, Outfit 100–900, and Playfair Display 400–900. Playfair Display and Lora include their separate italic variable binaries. The imported package CSS retains every published subset and `unicode-range`; the OFL-1.1 WOFF2 files are not modified or merged.

`app/local-fonts.css` exposes every original CSS variable through an `fx-font-var-*` binding class. This namespace cannot collide with Tailwind's `font-*` family utilities. Fontsource family names end in `Variable` for variable packages, so the bindings use those installed names rather than the static-family names.

The stylesheet does not preload every face. Font files are requested when CSS matching requires them, avoiding duplicate eager payloads. This differs from `next/font/google`: its `subsets` option chooses which downloaded subset files Next preloads when `preload` is enabled, while Fontsource keeps selection in `unicode-range` declarations.

## Fallback fidelity

Next 16.4 enables `adjustFontFallback` by default for Google fonts. Its loader uses `calculateSizeAdjustValues` with `dist/server/capsize-font-metrics.json` to generate a family-specific local Arial or Times New Roman fallback with `size-adjust`, `ascent-override`, `descent-override`, and `line-gap-override`. A plain category stack does not preserve that behavior.

The local stylesheet now carries the exact descriptors returned by that installed Next 16.4 implementation for all ten affected families and places each generated alias immediately after the webfont. The regression test calculates the values again from the installed Next package and compares every CSS descriptor. This retains the source-derived automatic fallback mechanism without hand-estimated metrics. Pixel rendering, mobile wrapping, LCP, and CLS still require browser evidence; source-level equivalence is not a rendered-performance result.

## Coverage and verification

Fontsource CSS includes broader scripts where each family publishes them. Latin covers German characters such as `Ä Ö Ü ä ö ü ß`; Latin Extended covers samples such as `Ā Č Ł ő Ț`. The font test inspects installed metadata, source CSS, WOFF2 headers, Fontconfig character maps, and the variable flag from the actual WOFF2 binaries. It also reads the immutable pre-change layouts from Git, derives their original CSS variable declarations, and proves that each declaration has both a new CSS definition and a consuming layout class. This makes a missing `--font-playfair` binding in either book layout fail for behavior, not because a copied marker string disappeared.

## Isolated setup

Run commands through the checked setup wrapper:

```bash
scripts/codex-cloud-setup.sh pnpm install --frozen-lockfile
scripts/codex-cloud-setup.sh pnpm run test:local-font-build
scripts/codex-cloud-setup.sh pnpm run type-check
scripts/codex-cloud-setup.sh pnpm run lint
scripts/codex-cloud-setup.sh pnpm run ai-slop:audit:strict
scripts/codex-cloud-setup.sh env CI=true pnpm run build
```

The wrapper resolves the repository root from its own location, validates the pins and Linux x64 platform, and uses Node.js `v22.23.3` only from a user cache. It verifies the official archive against SHA-256 `df450af89261115ef9f9e3830c3eeb2cc9213b63c720b1af623cb5dcbe2e02de`, rejects unregistered Node pins, reports the cached runtime path, and invokes pnpm `10.28.0` through Corepack. It changes neither the account default runtime nor persistent project settings.

## Evidence boundary

The rejected Cloud result is retained in its own parent commit. It used Latin-only `next/font/local` faces and Node `22.12.0`; passing source and license assertions did not prove coverage. This refinement validates actual binary coverage, restores continuous variable axes, preserves subset CSS ranges, and reproduces Next's source-derived fallback descriptors. No browser download retry or independent provider review was performed. Screenshots, rendered desktop/mobile fidelity, LCP, CLS, and exact-revision independent review remain release blockers rather than inferred from a successful native build.
