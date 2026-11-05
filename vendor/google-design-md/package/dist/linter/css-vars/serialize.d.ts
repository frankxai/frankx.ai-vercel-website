import type { CssVarDeclaration } from './spec.js';
export interface SerializeCssVarsOptions {
    prefix?: string | undefined;
}
/**
 * Serialize declarations to a CSS `:root { ... }` block string.
 * Pure function — no I/O. Values are emitted verbatim.
 */
export declare function serializeCssVars(declarations: CssVarDeclaration[], options?: SerializeCssVarsOptions): string;
