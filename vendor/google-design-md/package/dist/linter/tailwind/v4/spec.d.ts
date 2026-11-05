import { z } from 'zod';
import type { DesignSystemState } from '../../model/spec.js';
export declare const TailwindV4ThemeDataSchema: z.ZodObject<{
    colors: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    fontFamily: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    fontSize: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    lineHeight: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    letterSpacing: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    fontWeight: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    borderRadius: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    spacing: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, z.core.$strip>;
export type TailwindV4ThemeData = z.infer<typeof TailwindV4ThemeDataSchema>;
export declare const TailwindV4EmitterResultSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    success: z.ZodLiteral<true>;
    data: z.ZodObject<{
        theme: z.ZodObject<{
            colors: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            fontFamily: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            fontSize: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            lineHeight: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            letterSpacing: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            fontWeight: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            borderRadius: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            spacing: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, z.core.$strip>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>], "success">;
export type TailwindV4EmitterResult = z.infer<typeof TailwindV4EmitterResultSchema>;
export interface TailwindV4EmitterSpec {
    execute(state: DesignSystemState): TailwindV4EmitterResult;
}
