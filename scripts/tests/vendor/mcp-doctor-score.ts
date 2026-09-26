// Vendored verbatim from frankxai/mcp-doctor src/checker/score.ts at fe7e7db (branch agent/claude/score-command).
// The published @frankxai/mcp-doctor does not export scoreTools yet; import it from the package once it does.

/**
 * Quality score for an MCP server's tool surface, from what tools/list reveals.
 * Criteria come from the MCP spec (annotations, outputSchema/structuredContent) and the
 * practices that separate leading servers (GitHub, Stripe, Sentry, Cloudflare) and
 * Anthropic's "Writing effective tools for agents".
 */

export interface ScoredTool {
  name: string;
  title?: string;
  description?: string;
  inputSchema?: { type?: string; properties?: Record<string, JsonSchema>; additionalProperties?: unknown };
  outputSchema?: unknown;
  annotations?: {
    title?: string;
    readOnlyHint?: boolean;
    destructiveHint?: boolean;
    idempotentHint?: boolean;
    openWorldHint?: boolean;
  };
}

interface JsonSchema {
  type?: string | string[];
  description?: string;
  maxLength?: number;
  pattern?: string;
  enum?: unknown[];
  const?: unknown;
  format?: string;
  maximum?: number;
  exclusiveMaximum?: number;
  maxItems?: number;
  items?: JsonSchema;
  properties?: Record<string, JsonSchema>;
  additionalProperties?: unknown;
}

export interface Criterion {
  id: string;
  label: string;
  points: 0 | 1 | 2;
  /** Tools the criterion applies to. */
  applicable: number;
  failing: string[];
  advice: string;
}

export interface ScoreReport {
  points: number;
  max: number;
  percent: number;
  criteria: Criterion[];
  manual: string[];
}

const MIN_DESCRIPTION = 80;
const COLLECTION_VERBS = new Set(["list", "search", "find", "query", "browse", "all"]);
const SIZE_PARAMS = new Set(["limit", "page_size", "pageSize", "max_results", "maxResults", "per_page", "perPage"]);
const POSITION_PARAMS = new Set(["cursor", "page", "offset"]);
/** Formats whose values are short by definition; `uri` and friends are not. */
const BOUNDED_FORMATS = new Set(["uuid", "date", "date-time", "time", "email", "ipv4", "ipv6", "duration"]);

/** "listSessions" / "list_sessions" -> ["list", "sessions"]; whole words, so "listening_status" is not a list. */
function words(name: string): string[] {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

export function isCollectionTool(name: string): boolean {
  return words(name).some((word) => COLLECTION_VERBS.has(word));
}

export const MANUAL_CHECKS = [
  "Errors: validation and business failures return isError:true with a fix hint; only unknown tools and malformed requests use JSON-RPC errors",
  "Narrowing: read-only mode, toolsets or a per-tool allowlist, with a small default surface",
  "Responses: resolve IDs to readable names, drop noise fields, stay well under 25,000 tokens",
  "Access: remote Streamable HTTP with OAuth or scoped keys, and human confirmation for irreversible actions",
  "Evals: realistic multi-call tasks with verifiers, tracking accuracy, calls, tokens and errors",
];

function points(passing: number, applicable: number): 0 | 1 | 2 {
  if (applicable === 0) return 2;
  const ratio = passing / applicable;
  return ratio === 1 ? 2 : ratio >= 0.5 ? 1 : 0;
}

function criterion(
  id: string,
  label: string,
  tools: ScoredTool[],
  applies: (tool: ScoredTool) => boolean,
  passes: (tool: ScoredTool) => boolean,
  advice: string,
): Criterion {
  const relevant = tools.filter(applies);
  const failing = relevant.filter((tool) => !passes(tool)).map((tool) => tool.name);
  return { id, label, points: points(relevant.length - failing.length, relevant.length), applicable: relevant.length, failing, advice };
}

/**
 * The whole service name, not its first word: "mcp-doctor" -> "mcp_doctor" (so "mcp_unrelated"
 * does not pass), "@scope/fixture-mcp" -> "fixture", "@modelcontextprotocol/server-filesystem" -> "filesystem".
 */
export function servicePrefix(serverName: string): string {
  const bare = words(serverName.replace(/^@[^/]+\//, "")).join("_");
  const trimmed = bare.replace(/^(mcp_)?server_/, "").replace(/(_mcp)?(_server)?$/, "");
  return trimmed || bare;
}

function namespaceCriterion(tools: ScoredTool[], serverName: string, override?: string): Criterion {
  const prefix = `${override ? words(override).join("_") : servicePrefix(serverName)}_`;
  const failing = tools.filter((tool) => !tool.name.startsWith(prefix)).map((tool) => tool.name);
  const firstSegments = new Set(tools.map((tool) => tool.name.split(/[_.-]/)[0]));
  const pts: 0 | 1 | 2 = failing.length === 0 ? 2 : tools.length > 1 && firstSegments.size === 1 ? 1 : 0;
  return {
    id: "namespace",
    label: `Tool names carry the service prefix "${prefix}"`,
    points: pts,
    applicable: tools.length,
    failing,
    advice: "Prefix every tool with the service name so agents with many servers loaded pick the right one.",
  };
}

/** Anchored and free of unbounded quantifiers, so it caps length: ^[a-z]{2,8}$ yes, ^.*$ no. */
function patternBoundsLength(pattern: string): boolean {
  return pattern.startsWith("^") && pattern.endsWith("$") && !/[*+]|\{\d+,\}/.test(pattern.replace(/\\./g, ""));
}

function bounded(schema: JsonSchema): boolean {
  if (schema.enum !== undefined || schema.const !== undefined) return true;
  const types = Array.isArray(schema.type) ? schema.type : [schema.type];
  if (types.includes("string")) {
    return schema.maxLength !== undefined || (schema.format !== undefined && BOUNDED_FORMATS.has(schema.format)) || (schema.pattern !== undefined && patternBoundsLength(schema.pattern));
  }
  if (types.includes("integer") || types.includes("number")) return schema.maximum !== undefined || schema.exclusiveMaximum !== undefined;
  if (types.includes("array")) return schema.maxItems !== undefined && (schema.items === undefined || bounded(schema.items));
  if (types.includes("object")) {
    return schema.additionalProperties === false && Object.values(schema.properties ?? {}).every(bounded);
  }
  return types.includes("boolean") || types.includes("null");
}

function inputIsDocumentedAndBounded(tool: ScoredTool): boolean {
  const properties = Object.values(tool.inputSchema?.properties ?? {});
  if (properties.length === 0) return tool.inputSchema?.additionalProperties === false;
  return properties.every((property) => Boolean(property.description?.trim()) && bounded(property));
}

function pages(tool: ScoredTool): boolean {
  return Object.entries(tool.inputSchema?.properties ?? {}).some(
    ([key, schema]) => POSITION_PARAMS.has(key) || (SIZE_PARAMS.has(key) && bounded(schema)),
  );
}

function annotated(tool: ScoredTool): boolean {
  const hints = tool.annotations ?? {};
  if (hints.readOnlyHint === undefined) return false;
  return hints.readOnlyHint === true || (hints.destructiveHint !== undefined && hints.idempotentHint !== undefined);
}

/** `prefix` overrides the derived service prefix when the brand is not the server name (starlight-sis ships sis_ tools). */
export function scoreTools(tools: ScoredTool[], serverName: string, prefix?: string): ScoreReport {
  const every = () => true;
  if (tools.length === 0) {
    const advice = "The server lists no tools, so there is nothing an agent can use. Check it registers tools before connecting.";
    const empty = ["annotations", "titles", "namespace", "descriptions", "inputs", "structured_output", "paging"].map(
      (id): Criterion => ({ id, label: "No tools to grade", points: 0, applicable: 0, failing: [], advice }),
    );
    return { points: 0, max: empty.length * 2, percent: 0, criteria: empty, manual: MANUAL_CHECKS };
  }
  const criteria: Criterion[] = [
    criterion("annotations", "Safety annotations (readOnlyHint; writers add destructiveHint and idempotentHint)", tools, every, annotated,
      "Unannotated tools default to destructive and open-world, and some clients drop them. Set readOnlyHint on every tool."),
    criterion("titles", "Human-readable title", tools, every, (tool) => Boolean(tool.title ?? tool.annotations?.title),
      "Add a title so hosts can show a readable name."),
    namespaceCriterion(tools, serverName, prefix),
    criterion("descriptions", `Descriptions of ${MIN_DESCRIPTION}+ characters (when to use, what it returns, cost)`, tools, every,
      (tool) => (tool.description ?? "").trim().length >= MIN_DESCRIPTION,
      "Say when to use the tool, when not to, and how large or costly the response is."),
    criterion("inputs", "Every input described and bounded; no-input tools set additionalProperties:false", tools, every, inputIsDocumentedAndBounded,
      "Describe each property; give strings maxLength or an enum, numbers a maximum, arrays maxItems, objects additionalProperties:false."),
    criterion("structured_output", "Declares outputSchema (and returns structuredContent)", tools, every, (tool) => tool.outputSchema !== undefined,
      "Declare an object outputSchema, return structuredContent, and keep the JSON text block for older clients."),
    criterion("paging", "List and search tools take a bounded limit or a cursor", tools, (tool) => isCollectionTool(tool.name), pages,
      "Give list and search tools a limit with a maximum (and a sensible default) or a cursor so responses stay small."),
  ];
  const earned = criteria.reduce((sum, item) => sum + item.points, 0);
  const max = criteria.length * 2;
  return { points: earned, max, percent: Math.round((earned / max) * 100), criteria, manual: MANUAL_CHECKS };
}
