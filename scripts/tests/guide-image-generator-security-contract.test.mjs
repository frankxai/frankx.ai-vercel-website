import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  ".."
);

const generatorPaths = [
  "scripts/generate-guide-images.js",
  "scripts/generate-single-image.js"
];

const workflowPaths = [
  ".github/workflows/web-excellence.yml",
  ".github/workflows/media-guard.yml"
];
const historicalReportPath = "docs/NANO_BANANA_MCP_TEST_REPORT.md";

function checkoutBlocks(workflow) {
  const lines = workflow.split(/\r?\n/);
  const blocks = [];

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^(\s*)-\s+uses:\s*actions\/checkout@/);
    if (!match) continue;

    const stepIndent = match[1].length;
    const block = [lines[index]];

    for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
      const nextStep = lines[cursor].match(/^(\s*)-\s+/);
      if (nextStep && nextStep[1].length === stepIndent) break;
      block.push(lines[cursor]);
    }

    blocks.push({ source: block.join("\n"), stepIndent });
  }

  return blocks;
}

for (const generatorPath of generatorPaths) {
  test(`${generatorPath} keeps Gemini credentials out of source`, async () => {
    const source = await readFile(path.join(repoRoot, generatorPath), "utf8");

    assert.doesNotMatch(
      source,
      /AIza[0-9A-Za-z_-]{20,}/,
      "Google API key-like literals must never be committed"
    );
    assert.match(source, /process\.env\.GEMINI_API_KEY/);
    assert.match(source, /if\s*\(\s*!API_KEY\s*\)[\s\S]*?throw new Error\s*\(/);
    assert.match(source, /GEMINI_API_KEY is required/);
    assert.match(source, /new GoogleGenAI\s*\(\s*\{\s*apiKey:\s*API_KEY\s*\}\s*\)/);
  });

  test(`${generatorPath} uses a portable, configurable output directory`, async () => {
    const source = await readFile(path.join(repoRoot, generatorPath), "utf8");

    assert.match(source, /process\.env\.GUIDE_IMAGE_OUTPUT_DIR/);
    assert.match(
      source,
      /path\.join\s*\(\s*__dirname,\s*["']\.\.["'],\s*["']public["'],\s*["']images["'],\s*["']guides["']\s*\)/
    );
    assert.doesNotMatch(source, /[A-Za-z]:\\Users\\/);
  });
}

for (const workflowPath of workflowPaths) {
  test(`${workflowPath} checkout does not persist GitHub credentials`, async () => {
    const workflow = await readFile(path.join(repoRoot, workflowPath), "utf8");
    const blocks = checkoutBlocks(workflow);

    assert.ok(blocks.length > 0, "expected at least one actions/checkout step");
    for (const { source, stepIndent } of blocks) {
      const optionIndent = " ".repeat(stepIndent + 4);
      assert.match(
        source,
        new RegExp(`^${optionIndent}persist-credentials:\\s*false\\s*(?:#.*)?$`, "m")
      );
    }
  });
}

test("the historical Nano Banana report does not retain a live-looking credential", async () => {
  const report = await readFile(path.join(repoRoot, historicalReportPath), "utf8");

  assert.doesNotMatch(
    report,
    /AIza[0-9A-Za-z_-]{20,}/,
    "historical reports must redact Google API key-like literals"
  );
  assert.match(report, /GEMINI_API_KEY environment variable/);
});
