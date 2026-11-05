import type { DesignSystemState } from '../../model/spec.js';
import { CANONICAL_ORDER, SECTION_ALIASES, resolveAlias } from '../../spec-config.js';
import type { RuleDescriptor, RuleFinding } from './types.js';
export { CANONICAL_ORDER, SECTION_ALIASES, resolveAlias };
export declare function sectionOrder(state: DesignSystemState): RuleFinding[];
export declare const sectionOrderRule: RuleDescriptor;
