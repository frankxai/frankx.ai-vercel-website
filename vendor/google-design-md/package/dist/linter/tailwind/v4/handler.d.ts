import type { TailwindV4EmitterSpec, TailwindV4EmitterResult } from './spec.js';
import type { DesignSystemState } from '../../model/spec.js';
/**
 * Pure function mapping DesignSystemState → Tailwind v4 theme data.
 * Token names are validated against CSS-identifier rules. Font-family values
 * are wrapped in double quotes, with embedded `"` and `\` escaped.
 */
export declare class TailwindV4EmitterHandler implements TailwindV4EmitterSpec {
    execute(state: DesignSystemState): TailwindV4EmitterResult;
}
