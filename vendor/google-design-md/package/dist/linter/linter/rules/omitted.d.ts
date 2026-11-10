import type { DesignSystemState } from '../../model/spec.js';
import type { RuleDescriptor, RuleFinding } from './types.js';
/**
 * Validates omitted sections and alerts on redundant or unknown entries.
 */
export declare function omittedRules(state: DesignSystemState): RuleFinding[];
export declare const omittedRule: RuleDescriptor;
