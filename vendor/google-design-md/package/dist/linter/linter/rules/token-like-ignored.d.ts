import type { DesignSystemState } from '../../model/spec.js';
import type { RuleDescriptor, RuleFinding } from './types.js';
/**
 * Token-like ignored keys — warns when a top-level YAML key is not part of
 * the recognized export schema and its value looks like a design-token map.
 * These values will be silently dropped by `design.md export`.
 */
export declare function tokenLikeIgnored(state: DesignSystemState): RuleFinding[];
export declare const tokenLikeIgnoredRule: RuleDescriptor;
