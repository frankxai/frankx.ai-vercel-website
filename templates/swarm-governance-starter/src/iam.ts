/**
 * Per-role IAM: which tools a role may call and which paths it may touch.
 * Deny by default — the only way to allow something is to list it.
 *
 * The profile shape (allowed tools + path globs + a global deny list that no
 * profile can override) follows the Agent IAM pattern from Agentic Creator OS:
 * per-tool, per-directory scoping so a content role can never run commands and
 * a research role can never write.
 *
 * Fail-closed properties:
 *  - no IAM config loaded (missing/unreadable/invalid file) → every check denies
 *  - unknown role → deny
 *  - tool not explicitly allowed → deny
 *  - path matching the global deny list → deny, regardless of profile
 *  - path not matching any allowed glob → deny
 */

import { readFileSync } from "node:fs";
import { z } from "zod";

import type { Tier } from "./types.js";

const profileSchema = z.object({
  description: z.string().optional(),
  allowedTools: z.array(z.string()),
  allowedPaths: z.array(z.string()),
  deniedPaths: z.array(z.string()).default([]),
  /**
   * The most permissive tier this role's spend proposals may resolve to:
   *  - "none"                 → the role may not propose spend at all (denied)
   *  - "coordinator-approval" → within-cap spend needs the coordinator (the floor for money)
   *  - "human-approval"       → every spend from this role needs a human
   */
  maxSpendTier: z.enum(["none", "coordinator-approval", "human-approval"]).default("none"),
});

const iamSchema = z.object({
  version: z.string(),
  profiles: z.record(profileSchema),
  globalDeny: z
    .object({ paths: z.array(z.string()).default([]) })
    .default({ paths: [] }),
});

export type IamProfile = z.infer<typeof profileSchema>;
export type IamConfig = z.infer<typeof iamSchema>;

export interface IamDecision {
  allowed: boolean;
  reason: string;
}

/**
 * Load and validate iam.json. Throws on a missing, unreadable, or invalid
 * file — callers must treat a throw as "no IAM", and `can()` denies everything
 * when handed no IAM. A broken policy file never widens access.
 */
export function loadIam(path: string): IamConfig {
  const raw = readFileSync(path, "utf8");
  return iamSchema.parse(JSON.parse(raw));
}

/**
 * Convert one glob to a RegExp. Supports `**` (any chars, including `/`) and
 * `*` (any chars except `/`). A pattern without a `/` matches the path's
 * basename (so `.env*` catches `.env` and `config/.env.local`); a pattern with
 * a `/` matches the full path.
 */
export function globToRegExp(glob: string): RegExp {
  const DOUBLE_STAR = "\u0000"; // placeholder so `**` survives the `*` rewrite
  const escaped = glob
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*\*/g, DOUBLE_STAR)
    .replace(/\*/g, "[^/]*")
    .split(DOUBLE_STAR)
    .join(".*");
  return new RegExp(`^${escaped}$`);
}

function matchesAny(path: string, globs: readonly string[]): boolean {
  return globs.some((glob) => {
    const target = glob.includes("/") ? path : (path.split("/").pop() ?? path);
    return globToRegExp(glob).test(target);
  });
}

/**
 * can() — may `role` invoke `tool` (optionally against `path`)?
 * Every branch that is not an explicit allow is a deny.
 */
export function can(
  iam: IamConfig | null | undefined,
  role: string,
  tool: string,
  path?: string,
): IamDecision {
  if (!iam) {
    return { allowed: false, reason: "no IAM config loaded — deny by default" };
  }
  const profile = iam.profiles[role];
  if (!profile) {
    return { allowed: false, reason: `unknown role '${role}' — deny by default` };
  }
  if (!profile.allowedTools.includes(tool)) {
    return { allowed: false, reason: `tool '${tool}' not in allowedTools for role '${role}'` };
  }
  if (path !== undefined) {
    if (matchesAny(path, iam.globalDeny.paths)) {
      return { allowed: false, reason: `path '${path}' matches the global deny list (secrets)` };
    }
    if (matchesAny(path, profile.deniedPaths)) {
      return { allowed: false, reason: `path '${path}' is denied for role '${role}'` };
    }
    if (!matchesAny(path, profile.allowedPaths)) {
      return { allowed: false, reason: `path '${path}' is outside role '${role}' allowed paths` };
    }
  }
  return { allowed: true, reason: `role '${role}' may call '${tool}'${path ? ` on '${path}'` : ""}` };
}

/**
 * The floor tier for a role's spend proposals, or "deny" when the role may not
 * propose spend at all. No IAM / unknown role → "deny" (fail-closed).
 */
export function spendFloor(iam: IamConfig | null | undefined, role: string): Tier | "deny" {
  const profile = iam?.profiles[role];
  if (!profile || profile.maxSpendTier === "none") return "deny";
  return profile.maxSpendTier;
}
