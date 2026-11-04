/**
 * Package version, sourced from the nearest package.json at runtime.
 *
 * Path resolution is stable across all execution contexts:
 *   Source (src/version.ts)      → ../package.json = packages/cli/package.json
 *   Bundle (dist/index.js)       → ../package.json = packages/cli/package.json
 *   Installed (node_modules/…)   → ../package.json = <pkg root>/package.json
 *   npx cache                    → ../package.json = <cache pkg>/package.json
 *
 * npm always includes package.json in the published tarball, so '../package.json'
 * relative to the dist/ entry point is universally valid.
 */
export declare const VERSION: string;
