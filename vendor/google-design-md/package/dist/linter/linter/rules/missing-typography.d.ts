import type { DesignSystemState } from '../../model/spec.js';
import type { RuleDescriptor, RuleFinding } from './types.js';
/**
 * Missing typography — warns when colors are defined but no typography tokens exist.
 * Without typography tokens, agents will fall back to their own font choices,
 * reducing the author's control over the design system's typographic identity.
 */
export declare function missingTypography(state: DesignSystemState): RuleFinding[];
export declare const missingTypographyRule: RuleDescriptor;
