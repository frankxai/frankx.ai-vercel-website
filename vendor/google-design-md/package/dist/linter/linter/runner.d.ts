import type { DesignSystemState } from '../model/spec.js';
import type { LintResult, GradedTokenEdits } from './spec.js';
import type { LintRule, RuleDescriptor } from './rules/types.js';
/**
 * Pure functional linter runner.
 * Executes each rule against the state and aggregates findings.
 */
export declare function runLinter(state: DesignSystemState, rules?: LintRule[] | RuleDescriptor[]): LintResult;
/**
 * Groups lint findings into a graded edit menu (fixes / improvements / suggestions).
 */
export declare function preEvaluate(state: DesignSystemState, rules?: LintRule[] | RuleDescriptor[]): GradedTokenEdits;
