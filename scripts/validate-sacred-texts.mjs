import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const corpusRoot = resolve(root, "research/sacred-texts");
const registryPath = resolve(corpusRoot, "registry/christian-thinkers.json");
const ledgerPath = resolve(corpusRoot, "ledgers/source-ledger.jsonl");

function fail(message) {
  throw new Error(`[sacred-texts] ${message}`);
}

function parseJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    fail(`invalid JSON at ${path}: ${error.message}`);
  }
}

function requireKeys(record, keys, context) {
  for (const key of keys) {
    if (record[key] === undefined || record[key] === null || record[key] === "") {
      fail(`${context} is missing ${key}`);
    }
  }
}

const registry = parseJson(registryPath);
if (!Array.isArray(registry.thinkers) || registry.thinkers.length === 0) {
  fail("thinker registry must contain at least one thinker");
}

const thinkerIds = new Set();
const workKeys = new Set();
for (const thinker of registry.thinkers) {
  requireKeys(thinker, ["id", "name", "primary_works"], `thinker ${thinker.name ?? "<unknown>"}`);
  if (thinkerIds.has(thinker.id)) fail(`duplicate thinker id: ${thinker.id}`);
  thinkerIds.add(thinker.id);

  if (!Array.isArray(thinker.primary_works) || thinker.primary_works.length === 0) {
    fail(`${thinker.id} must name at least one primary work`);
  }
  for (const work of thinker.primary_works) {
    requireKeys(work, ["id", "title", "priority_locations"], `work in ${thinker.id}`);
    const key = `${thinker.id}:${work.id}`;
    if (workKeys.has(key)) fail(`duplicate work id within thinker: ${key}`);
    workKeys.add(key);
  }
}

const lines = readFileSync(ledgerPath, "utf8")
  .split(/\r?\n/u)
  .map((line) => line.trim())
  .filter(Boolean);

const sourceIds = new Set();
let capturedCount = 0;
for (const [index, line] of lines.entries()) {
  let record;
  try {
    record = JSON.parse(line);
  } catch (error) {
    fail(`invalid JSONL at line ${index + 1}: ${error.message}`);
  }

  requireKeys(
    record,
    ["source_id", "author_id", "work_id", "title", "language", "source_url", "capture_scope", "textual_status", "rights", "status", "captured_at"],
    `source record ${index + 1}`,
  );

  if (sourceIds.has(record.source_id)) fail(`duplicate source id: ${record.source_id}`);
  sourceIds.add(record.source_id);

  if (record.author_id !== "legal-authority" && !thinkerIds.has(record.author_id)) {
    fail(`unknown author_id ${record.author_id} in ${record.source_id}`);
  }

  if (record.status === "captured") {
    capturedCount += 1;
    if (!record.local_path) fail(`captured record ${record.source_id} has no local_path`);
    if (!existsSync(resolve(root, record.local_path))) {
      fail(`captured record ${record.source_id} points to missing ${record.local_path}`);
    }
    if (!["cleared", "provisional"].includes(record.rights.review_status)) {
      fail(`captured record ${record.source_id} has non-publishable rights status`);
    }
  }

  if (record.author_id === "thomas-merton" && record.capture_scope !== "locator-only") {
    fail("Thomas Merton records must remain locator-only without explicit permission");
  }
}

console.log(
  `[sacred-texts] valid: ${registry.thinkers.length} thinkers, ${lines.length} sources, ${capturedCount} captured witnesses`,
);

