import type { DesignSystemState } from '../../model/spec.js';
import type { RuleDescriptor, RuleFinding } from './types.js';
/**
 * Unknown key — warns when a top-level YAML key looks like a typo of a known
 * schema key. The DESIGN.md schema is intentionally extensible (custom keys
 * are allowed), so only close matches to known keys are reported; unrelated
 * extension keys stay silent.
 */
export declare function unknownKey(state: DesignSystemState): RuleFinding[];
export declare const unknownKeyRule: RuleDescriptor;
