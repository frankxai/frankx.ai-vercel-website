import { z } from 'zod';
export declare const ParserInputSchema: z.ZodObject<{
    content: z.ZodString;
}, z.core.$strip>;
export type ParserInput = z.infer<typeof ParserInputSchema>;
export declare const ParserErrorCode: z.ZodEnum<{
    EMPTY_CONTENT: "EMPTY_CONTENT";
    NO_YAML_FOUND: "NO_YAML_FOUND";
    YAML_PARSE_ERROR: "YAML_PARSE_ERROR";
    DUPLICATE_SECTION: "DUPLICATE_SECTION";
    UNKNOWN_ERROR: "UNKNOWN_ERROR";
}>;
export interface SourceLocation {
    line: number;
    column: number;
    block: 'frontmatter' | number;
}
export interface OmittedSection {
    section: string;
    reason?: string;
}
/** Raw, unresolved parsed output — mirrors the YAML schema */
export interface ParsedDesignSystem {
    version?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    omitted?: OmittedSection[] | undefined;
    colors?: Record<string, any> | undefined;
    typography?: Record<string, Record<string, any>> | undefined;
    rounded?: Record<string, any> | undefined;
    spacing?: Record<string, any> | undefined;
    components?: Record<string, Record<string, any>> | undefined;
    sourceMap: Map<string, SourceLocation>;
    /** Markdown heading names found in the document (e.g., 'Colors', 'Typography') */
    sections?: string[] | undefined;
    /** Full content of each section, including heading and body. */
    documentSections?: Array<{
        heading: string;
        content: string;
    }> | undefined;
    /** Raw YAML values for all top-level keys (known and unknown), used by lint rules. */
    rawValues?: Record<string, unknown> | undefined;
}
/** Canonical top-level YAML keys per the DESIGN.md schema. */
export declare const SCHEMA_KEYS: readonly ["version", "name", "description", "omitted", "colors", "typography", "rounded", "spacing", "components"];
export type SchemaKey = typeof SCHEMA_KEYS[number];
export type ParserResult = {
    success: true;
    data: ParsedDesignSystem;
} | {
    success: false;
    error: {
        code: z.infer<typeof ParserErrorCode>;
        message: string;
        recoverable: boolean;
    };
};
export interface ParserSpec {
    execute(input: ParserInput): ParserResult;
}
