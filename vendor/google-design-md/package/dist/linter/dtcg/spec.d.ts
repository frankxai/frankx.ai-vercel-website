import { z } from 'zod';
import type { DesignSystemState } from '../model/spec.js';
export interface DtcgColorValue {
    colorSpace: 'srgb';
    components: [number, number, number];
    hex?: string;
}
export interface DtcgDimensionValue {
    value: number;
    unit: string;
}
export interface DtcgTypographyValue {
    fontFamily?: string;
    fontSize?: DtcgDimensionValue;
    fontWeight?: number;
    letterSpacing?: DtcgDimensionValue;
    lineHeight?: number;
}
export interface DtcgToken {
    $type?: string;
    $value: DtcgColorValue | DtcgDimensionValue | DtcgTypographyValue | string | number;
    $description?: string;
}
export interface DtcgGroup {
    $type?: string;
    $description?: string;
    [key: string]: DtcgToken | DtcgGroup | string | undefined;
}
/** The complete tokens.json output file. */
export interface DtcgTokenFile extends DtcgGroup {
    $schema?: string;
}
export declare const DtcgEmitterResultSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    success: z.ZodLiteral<true>;
    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, z.core.$strip>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>], "success">;
export type DtcgEmitterResult = z.infer<typeof DtcgEmitterResultSchema>;
export interface DtcgEmitterSpec {
    execute(state: DesignSystemState): DtcgEmitterResult;
}
