import type { DesignSystemState } from '../../model/spec.js';
import type { RuleDescriptor, RuleFinding } from './types.js';
/**
 * Orphaned tokens — tokens defined but never referenced by any component or
 * any sibling token in the same MD3 family.
 */
export declare function orphanedTokens(state: DesignSystemState): RuleFinding[];
export declare const orphanedTokensRule: RuleDescriptor;
