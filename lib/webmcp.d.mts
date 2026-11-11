export type WebTool = {
  name: string;
  title?: string;
  description: string;
  inputSchema: object;
  annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean };
  execute(input: unknown, options?: { signal?: AbortSignal }): unknown | Promise<unknown>;
};
export type ModelContext = { registerTool(tool: WebTool, options?: { signal?: AbortSignal }): void | Promise<void> };
export function registerWebTools(context: ModelContext | undefined, tools: WebTool[], options?: { signal?: AbortSignal; onError?: (error: unknown) => void }): { ready: Promise<boolean>; stop(): void };
export type ReadDescriptor = Omit<WebTool, 'execute' | 'annotations'> & { annotations: { readOnlyHint: boolean; destructiveHint?: boolean } };
export function createReadOnlyMcpTools(options: { endpoint: string; origin: string; descriptors: readonly ReadDescriptor[]; fetchImpl?: typeof fetch }): WebTool[];

