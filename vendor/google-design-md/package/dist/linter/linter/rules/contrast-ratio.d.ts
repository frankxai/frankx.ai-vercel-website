import type { DesignSystemState } from '../../model/spec.js';
import type { RuleDescriptor, RuleFinding } from './types.js';
/**
 * WCAG contrast ratio — warns when component backgroundColor/textColor pairs
 * fall below the AA minimum of 4.5:1.
 */
export declare function contrastCheck(state: DesignSystemState): RuleFinding[];
export declare const contrastCheckRule: RuleDescriptor;
