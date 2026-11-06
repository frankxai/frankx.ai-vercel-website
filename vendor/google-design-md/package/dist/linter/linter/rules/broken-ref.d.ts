import type { DesignSystemState } from '../../model/spec.js';
import type { RuleDescriptor, RuleFinding } from './types.js';
/**
 * Broken/circular references and unknown component sub-tokens.
 */
export declare function brokenRef(state: DesignSystemState): RuleFinding[];
export declare const brokenRefRule: RuleDescriptor;
