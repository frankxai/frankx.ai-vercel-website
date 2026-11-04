import { z } from 'zod';
import type { ParsedDesignSystem, OmittedSection } from '../parser/spec.js';
export declare const SeveritySchema: z.ZodEnum<{
    error: "error";
    warning: "warning";
    info: "info";
}>;
export type Severity = z.infer<typeof SeveritySchema>;
export interface Finding {
    severity: Severity;
    path?: string;
    message: string;
    rule?: string;
}
export interface ResolvedColor {
    type: 'color';
    hex: string;
    r: number;
    g: number;
    b: number;
    /** Alpha channel from 0 to 1. Optional, defaults to 1 if not present. */
    a?: number;
    /** WCAG relative luminance */
    luminance: number;
}
export interface ResolvedDimension {
    type: 'dimension';
    value: number;
    /** The unit string. Standard units are 'px' and 'rem'; others are preserved but flagged by the linter. */
    unit: string;
}
export interface ResolvedTypography {
    type: 'typography';
    fontFamily?: string | undefined;
    fontSize?: ResolvedDimension | undefined;
    fontWeight?: number | undefined;
    lineHeight?: ResolvedDimension | undefined;
    letterSpacing?: ResolvedDimension | undefined;
    fontFeature?: string | undefined;
    fontVariation?: string | undefined;
}
export type ResolvedValue = ResolvedColor | ResolvedDimension | ResolvedTypography | string | number | boolean;
export declare const VALID_TYPOGRAPHY_PROPS: string[];
export declare const VALID_COMPONENT_SUB_TOKENS: string[];
export interface DesignSystemState {
    name?: string | undefined;
    description?: string | undefined;
    omitted?: OmittedSection[] | undefined;
    colors: Map<string, ResolvedColor>;
    typography: Map<string, ResolvedTypography>;
    rounded: Map<string, ResolvedDimension>;
    spacing: Map<string, ResolvedDimension>;
    components: Map<string, ComponentDef>;
    /** Flat lookup: "colors.primary" → ResolvedColor */
    symbolTable: Map<string, ResolvedValue>;
    /** Markdown heading names found in the document */
    sections?: string[] | undefined;
    /** Top-level YAML keys that are not part of the known schema */
    unknownKeys?: string[] | undefined;
    /** Raw YAML values for unknown top-level keys, keyed by the unknown key name */
    unknownKeyValues?: Record<string, unknown> | undefined;
}
export interface ComponentDef {
    properties: Map<string, ResolvedValue>;
    /** Unresolved references that failed to resolve */
    unresolvedRefs: string[];
}
export declare const ModelErrorCode: z.ZodEnum<{
    UNKNOWN_ERROR: "UNKNOWN_ERROR";
    INVALID_COLOR: "INVALID_COLOR";
    INVALID_DIMENSION: "INVALID_DIMENSION";
    INVALID_TYPOGRAPHY_PROP: "INVALID_TYPOGRAPHY_PROP";
    UNRESOLVED_REFERENCE: "UNRESOLVED_REFERENCE";
    CIRCULAR_REFERENCE: "CIRCULAR_REFERENCE";
    REFERENCE_TO_NON_PRIMITIVE: "REFERENCE_TO_NON_PRIMITIVE";
    NESTING_DEPTH_EXCEEDED: "NESTING_DEPTH_EXCEEDED";
}>;
export interface ModelResult {
    designSystem: DesignSystemState;
    findings: Finding[];
}
export interface ModelSpec {
    execute(input: ParsedDesignSystem): ModelResult;
}
/**
 * Parse a dimension string into its numeric value and unit suffix.
 * Accepts an optional leading sign and optional decimal (`.5rem` is valid).
 * Returns null for non-dimension strings (bare numbers, keywords like `auto`).
 */
export declare function parseDimensionParts(raw: string): {
    value: number;
    unit: string;
} | null;
/**
 * Validate a hex color string. Accepts #RGB, #RGBA, #RRGGBB, and #RRGGBBAA.
 */
export declare function isValidColor(raw: string): boolean;
/**
 * Validate a dimension string uses a spec-standard unit (px or rem only).
 */
export declare function isStandardDimension(raw: string): boolean;
/**
 * Check if a dimension string is parseable (any known CSS length/percentage unit).
 * Adding support for a new unit: add it to CSS_UNITS above.
 */
export declare function isParseableDimension(raw: string): boolean;
/**
 * @deprecated Use isStandardDimension for spec compliance or isParseableDimension for generous parsing.
 */
export declare const isValidDimension: typeof isStandardDimension;
/**
 * Check if a string is a token reference ({section.token}).
 */
export declare function isTokenReference(raw: string): boolean;
