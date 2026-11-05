import { z } from 'zod';
export declare const FixerInputSchema: z.ZodObject<{
    content: z.ZodString;
    sections: z.ZodArray<z.ZodObject<{
        heading: z.ZodString;
        content: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type FixerInput = z.infer<typeof FixerInputSchema>;
export type FixerResult = {
    success: true;
    fixedContent: string;
    details?: {
        beforeOrder: string[];
        afterOrder: string[];
    };
} | {
    success: false;
    error: string;
};
