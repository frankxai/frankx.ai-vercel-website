import type { LinterSpec, LintResult, GradedTokenEdits } from './spec.js';
import type { DesignSystemState } from '../model/spec.js';
/**
 * @deprecated Use `runLinter()` and `preEvaluate()` from './runner.js' directly.
 * This class exists only for backward compatibility.
 */
export declare class LinterHandler implements LinterSpec {
    lint(state: DesignSystemState): LintResult;
    preEvaluate(state: DesignSystemState): GradedTokenEdits;
}
