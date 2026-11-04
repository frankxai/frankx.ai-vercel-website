import type { RuleDescriptor } from '../linter/rules/types.js';
/**
 * Load the DESIGN.md format specification document.
 *
 * @param specPath - Explicit absolute path to spec.md. When provided, this
 *   path is used directly with no fallback. Useful for tests and codegen
 *   scripts that know exactly where the file lives.
 *
 * When no path is given, resolution uses two deterministic strategies:
 *   1. Bundle path:  <currentDir>/spec.md — the build copies docs/spec.md here.
 *   2. Dev path:     <repo>/docs/spec.md — relative from src/linter/spec-gen/.
 *
 * This replaces the previous 5-candidate shotgun approach with clear,
 * auditable paths that work across OSes and execution contexts.
 */
export declare function getSpecContent(specPath?: string): string;
export declare function getRulesTable(rules: RuleDescriptor[]): string;
