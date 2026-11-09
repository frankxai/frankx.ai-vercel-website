import type { ParsedDesignSystem } from '../parser/spec.js';
import type { ModelSpec, ModelResult, ResolvedColor } from './spec.js';
/**
 * Builds a resolved DesignSystemState from parsed YAML tokens.
 * Handles color parsing, dimension parsing, typography construction,
 * and chained token reference resolution with cycle detection.
 * Never throws — all errors returned as ModelResult failures.
 */
export declare class ModelHandler implements ModelSpec {
    execute(input: ParsedDesignSystem): ModelResult;
}
/**
 * Parse a CSS color string into a ResolvedColor with RGB + WCAG luminance.
 */
export declare function parseColor(raw: string): ResolvedColor;
/**
 * WCAG 2.1 contrast ratio between two resolved colors.
 */
export declare function contrastRatio(a: ResolvedColor, b: ResolvedColor): number;
