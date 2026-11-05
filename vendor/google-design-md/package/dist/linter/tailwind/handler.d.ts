import type { TailwindEmitterSpec, TailwindEmitterResult } from './spec.js';
import type { DesignSystemState } from '../model/spec.js';
/**
 * Pure function mapping DesignSystemState → Tailwind theme.extend config.
 * No side effects.
 */
export declare class TailwindEmitterHandler implements TailwindEmitterSpec {
    execute(state: DesignSystemState): TailwindEmitterResult;
    private mapColors;
    private mapFontFamilies;
    private mapFontSizes;
    private mapDimensions;
    private dimToString;
}
