import { z } from 'zod';
import type { DesignSystemState } from '../model/spec.js';
export declare const CssVarDeclarationSchema: z.ZodObject<{
    name: z.ZodString;
    value: z.ZodString;
}, z.core.$strip>;
export type CssVarDeclaration = z.infer<typeof CssVarDeclarationSchema>;
export declare const CssVarsEmitterResultSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    success: z.ZodLiteral<true>;
    data: z.ZodObject<{
        declarations: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            value: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>], "success">;
export type CssVarsEmitterResult = z.infer<typeof CssVarsEmitterResultSchema>;
export interface CssVarsEmitterSpec {
    execute(state: DesignSystemState): CssVarsEmitterResult;
}
