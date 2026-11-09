/**
 * Spec renderers: pure functions that turn spec-config data into
 * markdown fragments. Used by the MDX compiler via scope injection.
 *
 * Each function returns a ready-to-embed markdown string.
 */
import type { SpecConfig } from '../spec-config.js';
/** Front matter example (overview section). */
export declare function frontmatterExample(config: SpecConfig): string;
/** Colors YAML example. */
export declare function colorsExample(config: SpecConfig): string;
/** Typography YAML example. */
export declare function typographyExample(config: SpecConfig): string;
/** Components YAML example. */
export declare function componentsExample(config: SpecConfig): string;
/** Typography property list (for the schema section). */
export declare function typographyPropertyList(config: SpecConfig): string;
/** Primitive type definitions (Color, Dimension, etc.) for the schema section. */
export declare function typeDefinitions(config: SpecConfig, typeName?: string): string;
/** Numbered section order list with aliases. */
export declare function sectionOrderList(config: SpecConfig): string;
/** Component sub-token property list. */
export declare function componentSubTokenList(config: SpecConfig): string;
/** Recommended token names grouped by category. */
export declare function recommendedTokens(config: SpecConfig): string;
