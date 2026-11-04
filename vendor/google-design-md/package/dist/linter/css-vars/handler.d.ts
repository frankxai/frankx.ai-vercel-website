import type { CssVarsEmitterSpec, CssVarsEmitterResult } from './spec.js';
import type { DesignSystemState } from '../model/spec.js';
/**
 * Pure function mapping DesignSystemState → CSS custom property declarations.
 * No side effects.
 */
export declare class CssVarsEmitterHandler implements CssVarsEmitterSpec {
    execute(state: DesignSystemState): CssVarsEmitterResult;
    private mapDimensionGroup;
    private dimToString;
    /**
     * Make a token name safe for a CSS custom property. Nested tokens flatten to
     * dotted keys (e.g. `background.light`); a literal dot makes a browser drop
     * the declaration, so collapse dots to hyphens.
     */
    private cssSafe;
}
