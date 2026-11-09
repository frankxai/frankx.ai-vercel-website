import type { DesignSystemState } from '../../model/spec.js';
import type { RuleDescriptor, RuleFinding } from './types.js';
/**
 * Token count summary — emits an info diagnostic summarizing how many
 * tokens are defined in each section.
 */
export declare function tokenSummary(state: DesignSystemState): RuleFinding[];
export declare const tokenSummaryRule: RuleDescriptor;
