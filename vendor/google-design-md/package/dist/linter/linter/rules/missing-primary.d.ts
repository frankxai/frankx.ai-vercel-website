import type { DesignSystemState } from '../../model/spec.js';
import type { RuleDescriptor, RuleFinding } from './types.js';
/**
 * Missing primary color — warns when colors are defined but no 'primary' exists.
 */
export declare function missingPrimary(state: DesignSystemState): RuleFinding[];
export declare const missingPrimaryRule: RuleDescriptor;
