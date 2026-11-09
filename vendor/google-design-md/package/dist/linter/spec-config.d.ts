export declare function loadSpecConfig(filePath?: string): {
    version: string;
    limits: {
        max_token_nesting_depth: number;
        max_reference_depth: number;
    };
    units: string[];
    types: Record<string, {
        description: string;
        formats?: string[] | undefined;
        units?: string[] | undefined;
        note?: string | undefined;
        recommendation?: string | undefined;
    }>;
    sections: {
        canonical: string;
        aliases?: string[] | undefined;
    }[];
    typography_properties: {
        name: string;
        type: string;
        description?: string | undefined;
    }[];
    component_sub_tokens: {
        name: string;
        type: string;
        description?: string | undefined;
    }[];
    color_roles: string[];
    recommended_tokens: Record<string, string[]>;
    examples: {
        colors: Record<string, string>;
        typography: Record<string, Record<string, string | number>>;
        components: Record<string, Record<string, string>>;
    };
};
type ParsedConfig = ReturnType<typeof loadSpecConfig>;
/** Return the parsed spec config, loading and caching it on first call. */
export declare function getSpecConfig(): ParsedConfig;
export interface SectionDef {
    /** The canonical section heading. */
    canonical: string;
    /** Acceptable alternative headings that resolve to this section. */
    aliases?: readonly string[] | undefined;
}
export interface TypographyPropertyDef {
    /** Property name as it appears in YAML. */
    name: string;
    /** Human-readable type for the spec document. */
    type: string;
    /** Extended description for the spec (appears after the type). */
    description?: string | undefined;
}
export interface ComponentSubTokenDef {
    /** Sub-token property name. */
    name: string;
    /** The type displayed in the spec (e.g., 'Color', 'Dimension'). */
    type: string;
    /** Extended description for the spec (appears after the type). */
    description?: string | undefined;
}
export interface TypeDef {
    /** One-sentence definition for the type. */
    description: string;
    /** Accepted formats rendered as a bullet list in the generated spec. */
    formats?: readonly string[] | undefined;
    /** Accepted units for dimensional types. */
    units?: readonly string[] | undefined;
    /** Additional normative or implementation note. */
    note?: string | undefined;
    /** Non-normative authoring recommendation. */
    recommendation?: string | undefined;
}
/** Current spec version. Appears in the schema and the front matter example. */
export declare const SPEC_VERSION: string;
/** Performance and safety limits for the model handler. */
export declare const MAX_TOKEN_NESTING_DEPTH: number;
export declare const MAX_REFERENCE_DEPTH: number;
/** Units the spec formally supports for Dimension values. */
export declare const STANDARD_UNITS: string[];
export type StandardUnit = (typeof STANDARD_UNITS)[number];
/** Primitive type definitions rendered into the generated spec. */
export declare const SPEC_TYPES: Record<string, TypeDef>;
export declare const SECTIONS: {
    canonical: string;
    aliases?: string[] | undefined;
}[];
export declare const TYPOGRAPHY_PROPERTIES: readonly TypographyPropertyDef[];
export declare const COMPONENT_SUB_TOKENS: readonly ComponentSubTokenDef[];
/** Core color roles that every design system should define. */
export declare const CORE_COLOR_ROLES: string[];
/** Non-normative recommended token names, organized by category. */
export declare const RECOMMENDED_TOKENS: Record<string, string[]>;
/** Canonical examples that appear in the generated spec document. */
export declare const EXAMPLES: {
    colors: Record<string, string>;
    typography: Record<string, Record<string, string | number>>;
    components: Record<string, Record<string, string>>;
};
/** Primitive type definitions (Color, Dimension, etc.) for the spec document. */
export declare const PRIMITIVE_TYPES: Record<string, TypeDef>;
/** Ordered list of canonical section names. */
export declare const CANONICAL_ORDER: string[];
/** Map of alias → canonical name. */
export declare const SECTION_ALIASES: Record<string, string>;
/** Resolve a section heading to its canonical name. */
export declare function resolveAlias(heading: string): string;
/** Valid typography property names (for linter validation). */
export declare const VALID_TYPOGRAPHY_PROPS: string[];
/** Valid component sub-token names (for linter validation). */
export declare const VALID_COMPONENT_SUB_TOKENS: string[];
/** All config values bundled as a single object for renderer injection. */
export interface SpecConfig {
    SPEC_VERSION: typeof SPEC_VERSION;
    MAX_TOKEN_NESTING_DEPTH: typeof MAX_TOKEN_NESTING_DEPTH;
    MAX_REFERENCE_DEPTH: typeof MAX_REFERENCE_DEPTH;
    STANDARD_UNITS: typeof STANDARD_UNITS;
    SPEC_TYPES: typeof SPEC_TYPES;
    SECTIONS: typeof SECTIONS;
    TYPOGRAPHY_PROPERTIES: typeof TYPOGRAPHY_PROPERTIES;
    COMPONENT_SUB_TOKENS: typeof COMPONENT_SUB_TOKENS;
    CORE_COLOR_ROLES: typeof CORE_COLOR_ROLES;
    RECOMMENDED_TOKENS: typeof RECOMMENDED_TOKENS;
    EXAMPLES: typeof EXAMPLES;
    PRIMITIVE_TYPES: typeof PRIMITIVE_TYPES;
}
/** Build a SpecConfig from the module's exports. */
export declare const SPEC_CONFIG: SpecConfig;
export {};
