import type { DesignSystemState } from '../../model/spec.js';
import type { RuleDescriptor, RuleFinding } from './types.js';
/**
 * Missing sections — notes when optional sections (spacing, rounded) are absent.
 */
export declare function missingSections(state: DesignSystemState): RuleFinding[];
export declare const missingSectionsRule: RuleDescriptor;
