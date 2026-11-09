export type StdinStream = AsyncIterable<Buffer | string> & {
    isTTY?: boolean;
};
export declare class FileReadError extends Error {
    readonly filePath: string;
    readonly code: "FILE_READ_ERROR";
    constructor(filePath: string, cause: unknown);
    get friendlyMessage(): string;
}
/**
 * Read input from a file path or stdin ("-").
 * Throws FileReadError if the file cannot be read.
 */
export declare function readInput(filePath: string, stdin?: StdinStream): Promise<string>;
/**
 * Format output as JSON or human-readable text.
 */
export declare function formatOutput(data: unknown, args: {
    format?: string;
}): string;
/**
 * Serialize a Map-based DesignSystemState to plain objects for JSON output.
 */
export declare function serializeDesignSystem(state: Record<string, unknown>): Record<string, unknown>;
/**
 * Diff two Maps — returns added, removed, and modified keys.
 */
export declare function diffMaps<V>(before: Map<string, V>, after: Map<string, V>): {
    added: string[];
    removed: string[];
    modified: string[];
};
