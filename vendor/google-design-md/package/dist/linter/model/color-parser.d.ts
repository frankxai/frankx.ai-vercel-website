export interface ParsedColorResult {
    hex: string;
    r: number;
    g: number;
    b: number;
    a?: number;
    luminance: number;
}
/**
 * Parse a CSS color string into its sRGB representation + WCAG relative luminance.
 * Returns null if the color is invalid.
 */
export declare function parseCssColor(colorStr: string, depth?: number): ParsedColorResult | null;
