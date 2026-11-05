import type { DtcgEmitterSpec, DtcgEmitterResult } from './spec.js';
import type { DesignSystemState } from '../model/spec.js';
/**
 * Pure function mapping DesignSystemState → DTCG tokens.json (W3C Design Tokens Format Module 2025.10).
 * No side effects.
 */
export declare class DtcgEmitterHandler implements DtcgEmitterSpec {
    execute(state: DesignSystemState): DtcgEmitterResult;
    private mapColors;
    private colorToValue;
    private mapDimensionGroup;
    private dimToValue;
    private mapTypography;
    private typographyToValue;
    /** Round to 3 decimal places for clean output. */
    private round;
}
