import type { LintRule, RuleDescriptor } from './types.js';
/** The default set of lint rule descriptors, in order. */
export declare const DEFAULT_RULE_DESCRIPTORS: RuleDescriptor[];
/** The default set of lint rules, executed in order. */
export declare const DEFAULT_RULES: LintRule[];
export { brokenRef } from './broken-ref.js';
export { missingPrimary } from './missing-primary.js';
export { contrastCheck } from './contrast-ratio.js';
export { orphanedTokens } from './orphaned-tokens.js';
export { tokenSummary } from './token-summary.js';
export { missingSections } from './missing-sections.js';
export { missingTypography } from './missing-typography.js';
export { unknownKey } from './unknown-key.js';
export { sectionOrder } from './section-order.js';
export { tokenLikeIgnored } from './token-like-ignored.js';
export { omittedRule as omitted } from './omitted.js';
export type { LintRule } from './types.js';
