import type { TailwindV4ThemeData } from './spec.js';
/**
 * Serialize a Tailwind v4 theme data object to a CSS `@theme { ... }` block string.
 * Pure function — no I/O. Values are emitted verbatim (font-family quoting must
 * be done by the handler before calling this).
 */
export declare function serializeToCss(data: TailwindV4ThemeData): string;
