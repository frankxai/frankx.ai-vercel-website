import type { DesignSystemState } from './model/spec.js';
import type { Finding } from './linter/spec.js';
import type { LintRule } from './linter/rules/types.js';
import type { TailwindEmitterResult } from './tailwind/spec.js';
export interface LintOptions {
    /** Custom lint rules. Defaults to DEFAULT_RULES if omitted. */
    rules?: LintRule[];
}
export interface LintReport {
    /** The fully resolved design system model. */
    designSystem: DesignSystemState;
    /** All findings from the linter. */
    findings: Finding[];
    /** Aggregate counts by severity. */
    summary: {
        errors: number;
        warnings: number;
        infos: number;
    };
    /** Generated Tailwind CSS theme configuration. */
    tailwindConfig: TailwindEmitterResult;
    /** Markdown heading names found in the document. */
    sections: string[];
    /** The partitioned document sections. */
    documentSections: Array<{
        heading: string;
        content: string;
    }>;
}
/**
 * Lint a DESIGN.md document.
 *
 * Parses the markdown, resolves all design tokens into a typed model,
 * runs lint rules, and generates a Tailwind CSS theme configuration.
 *
 * @param content - Raw DESIGN.md content (markdown with YAML frontmatter or code blocks)
 * @param options - Optional configuration (custom rules, etc.)
 * @returns A LintReport with the resolved design system, findings, and Tailwind config
 * @throws If parsing or model resolution fails unrecoverably
 */
export declare function lint(content: string, options?: LintOptions): LintReport;
