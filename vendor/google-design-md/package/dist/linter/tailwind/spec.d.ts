import { z } from 'zod';
import type { DesignSystemState } from '../model/spec.js';
export declare const TailwindThemeExtendSchema: z.ZodObject<{
    colors: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    fontFamily: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>>;
    fontSize: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodTuple<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>], null>>>;
    borderRadius: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    spacing: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, z.core.$strip>;
export type TailwindThemeExtend = z.infer<typeof TailwindThemeExtendSchema>;
export declare const TailwindEmitterResultSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    success: z.ZodLiteral<true>;
    data: z.ZodObject<{
        theme: z.ZodObject<{
            extend: z.ZodObject<{
                colors: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                fontFamily: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>>;
                fontSize: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodTuple<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>], null>>>;
                borderRadius: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                spacing: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            }, z.core.$strip>;
        }, z.core.$strip>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>], "success">;
export type TailwindEmitterResult = z.infer<typeof TailwindEmitterResultSchema>;
export interface TailwindEmitterSpec {
    execute(state: DesignSystemState): TailwindEmitterResult;
}
