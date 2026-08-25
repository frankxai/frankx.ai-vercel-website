import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  ".."
);
const require = createRequire(import.meta.url);

const generatorPaths = [
  "scripts/generate-guide-images.js",
  "scripts/generate-single-image.js"
];
const generatorModules = generatorPaths.map(generatorPath => ({
  generatorPath,
  generator: require(path.join(repoRoot, generatorPath))
}));
const workflowDir = path.join(repoRoot, ".github", "workflows");
const workflowPaths = (await readdir(workflowDir))
  .filter(filename => /\.ya?ml$/.test(filename))
  .map(filename => path.join(".github", "workflows", filename))
  .sort();
const historicalReportPath = "docs/NANO_BANANA_MCP_TEST_REPORT.md";

function checkoutBlocks(workflow) {
  const lines = workflow.split(/\r?\n/);
  const blocks = [];

  for (let index = 0; index < lines.length; index += 1) {
    if (!/actions\/checkout@/i.test(lines[index])) continue;

    const usesMatch = lines[index].match(/^(\s*)(?:-\s*)?uses:\s*/i);
    const leadingIndent = lines[index].match(/^\s*/)[0].length;
    const usesIndent = usesMatch?.[1].length ?? leadingIndent;
    let stepStart = index;
    let stepIndent = usesIndent;

    if (!/^\s*-\s*(?:uses:|\{)/i.test(lines[index])) {
      for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
        const stepMatch = lines[cursor].match(/^(\s*)-\s+/);
        if (stepMatch && stepMatch[1].length < usesIndent) {
          stepStart = cursor;
          stepIndent = stepMatch[1].length;
          break;
        }
      }
    }

    let stepEnd = lines.length;
    for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
      const nextStep = lines[cursor].match(/^(\s*)-\s+/);
      if (nextStep && nextStep[1].length === stepIndent) {
        stepEnd = cursor;
        break;
      }
    }

    blocks.push({
      source: lines.slice(stepStart, stepEnd).join("\n"),
      stepIndent
    });
  }

  return blocks;
}

function checkoutPersistenceErrors(workflow) {
  const blocks = checkoutBlocks(workflow);
  const checkoutReferences = workflow.match(/actions\/checkout@/gi) || [];
  const errors = workflow
    .split(/\r?\n/)
    .flatMap((line, index) => {
      if (/^\s*(?:-\s*)?uses:\s*\*/i.test(line)) {
        return [`line ${index + 1} uses a YAML alias; checkout steps must be explicit`];
      }
      if (
        /actions\/checkout@/i.test(line) &&
        !/^\s*(?:-\s*)?uses:\s*(['"]?)actions\/checkout@[0-9A-Za-z._/-]+\1\s*(?:#.*)?$/i.test(line)
      ) {
        return [`line ${index + 1} contains a noncanonical checkout reference`];
      }
      return [];
    });

  if (checkoutReferences.length !== blocks.length) {
    errors.push(
      `found ${checkoutReferences.length} checkout references but parsed ${blocks.length} steps`
    );
  }

  return errors.concat(blocks.flatMap(({ source, stepIndent }, index) => {
    const withIndent = " ".repeat(stepIndent + 2);
    const optionIndent = " ".repeat(stepIndent + 4);
    const withCount = (
      source.match(new RegExp(`^${withIndent}with:\\s*(?:#.*)?$`, "gm")) || []
    ).length;
    const falseCount = (
      source.match(
        new RegExp(
          `^${optionIndent}persist-credentials:\\s*false\\s*(?:#.*)?$`,
          "gm"
        )
      ) || []
    ).length;
    const allPersistenceCount = (
      source.match(/^\s+persist-credentials:\s*(?:true|false)\s*(?:#.*)?$/gm) || []
    ).length;
    const explicitTrue = /^\s+persist-credentials:\s*true\s*(?:#.*)?$/m.test(source);
    return withCount === 1 && falseCount === 1 && allPersistenceCount === 1 && !explicitTrue
      ? []
      : [`checkout block ${index + 1} must set persist-credentials: false exactly once`];
  }));
}

function topLevelMappingBlock(workflow, key) {
  const lines = workflow.split(/\r?\n/);
  const start = lines.findIndex(line => line === `${key}:`);
  if (start === -1) return null;

  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    if (/^[A-Za-z_][0-9A-Za-z_-]*:\s*(?:#.*)?$/.test(lines[index])) {
      end = index;
      break;
    }
  }

  return lines.slice(start, end).join("\n");
}

function ciAlwaysReportingErrors(workflow) {
  const onBlock = topLevelMappingBlock(workflow, "on");
  if (!onBlock) return ["CI must contain one canonical top-level on mapping"];

  const errors = [];
  for (const triggerName of ["push", "pull_request"]) {
    if (!new RegExp(`^  ${triggerName}:\\s*$`, "m").test(onBlock)) {
      errors.push(`CI on mapping must contain ${triggerName}`);
    }
  }
  if (/^\s+paths(?:-ignore)?:\s*$/m.test(onBlock)) {
    errors.push("CI required checks must not use paths or paths-ignore filters");
  }
  return errors;
}

async function withTemporaryOutput(run) {
  const outputDir = await mkdtemp(path.join(os.tmpdir(), "guide-generator-contract-"));
  try {
    return await run(outputDir);
  } finally {
    await rm(outputDir, { recursive: true, force: true });
  }
}

async function withMutedConsole(run) {
  const originalLog = console.log;
  const originalError = console.error;
  console.log = () => {};
  console.error = () => {};
  try {
    return await run();
  } finally {
    console.log = originalLog;
    console.error = originalError;
  }
}

for (const { generatorPath, generator } of generatorModules) {
  test(`${generatorPath} keeps credentials out of source and uses the canonical client`, async () => {
    const source = await readFile(path.join(repoRoot, generatorPath), "utf8");

    assert.doesNotMatch(
      source,
      /AIza[0-9A-Za-z_-]{20,}/,
      "Google API key-like literals must never be committed"
    );
    assert.match(source, /env\.GEMINI_API_KEY/);
    assert.match(source, /GEMINI_API_KEY is required/);
    assert.match(source, /import\(["']\.\/lib\/nb-image\.mjs["']\)/);
    assert.doesNotMatch(source, /@google\/genai|GoogleGenAI/);
  });

  test(`${generatorPath} uses a portable, configurable output directory`, async () => {
    const source = await readFile(path.join(repoRoot, generatorPath), "utf8");

    assert.match(source, /env\.GUIDE_IMAGE_OUTPUT_DIR/);
    assert.match(
      source,
      /path\.join\s*\(\s*__dirname,\s*["']\.\.["'],\s*["']public["'],\s*["']images["'],\s*["']guides["']\s*\)/
    );
    assert.doesNotMatch(source, /[A-Za-z]:\\Users\\/);
  });

  test(`${generatorPath} rejects absent and whitespace-only credentials`, async () => {
    const inertGenerator = async () => ({ path: "unused" });
    await assert.rejects(
      generator.main({ env: {}, generateImageImpl: inertGenerator, delayMilliseconds: 0 }),
      /GEMINI_API_KEY is required/
    );
    await assert.rejects(
      generator.main({
        env: { GEMINI_API_KEY: "   " },
        generateImageImpl: inertGenerator,
        delayMilliseconds: 0
      }),
      /GEMINI_API_KEY is required/
    );
  });

  test(`${generatorPath} creates output paths and completes through a no-network adapter`, async () => {
    await withTemporaryOutput(async outputDir => {
      const calls = [];
      const generateImageImpl = async options => {
        assert.ok(existsSync(path.dirname(options.outputPath)));
        assert.equal(path.dirname(options.outputPath), outputDir);
        assert.equal(options.model, "nbpro");
        assert.equal(options.aspectRatio, "16:9");
        calls.push(options);
        await writeFile(options.outputPath, "nonempty-test-image");
        return { path: options.outputPath };
      };

      await withMutedConsole(() => generator.main({
        env: {
          GEMINI_API_KEY: "non-secret-test-placeholder",
          GUIDE_IMAGE_OUTPUT_DIR: outputDir
        },
        generateImageImpl,
        delayMilliseconds: 0
      }));

      assert.equal(calls.length, generator.imagePrompts?.length || 1);
    });
  });

  test(`${generatorPath} rejects generation failure and its CLI wrapper exits nonzero`, async () => {
    await withTemporaryOutput(async outputDir => {
      const failure = () => Promise.reject(new Error("synthetic generation failure"));
      await withMutedConsole(() => assert.rejects(
        generator.main({
          env: {
            GEMINI_API_KEY: "non-secret-test-placeholder",
            GUIDE_IMAGE_OUTPUT_DIR: outputDir
          },
          generateImageImpl: failure,
          delayMilliseconds: 0
        }),
        /synthetic generation failure|generation request\(s\) failed/
      ));

      const malformedAdapters = [
        async () => false,
        async () => ({}),
        async options => ({ path: options.outputPath })
      ];
      for (const malformedAdapter of malformedAdapters) {
        await withMutedConsole(() => assert.rejects(
          generator.main({
            env: {
              GEMINI_API_KEY: "non-secret-test-placeholder",
              GUIDE_IMAGE_OUTPUT_DIR: outputDir
            },
            generateImageImpl: malformedAdapter,
            delayMilliseconds: 0
          }),
          /returned no generated artifact path|did not write the declared artifact|generation request\(s\) failed/
        ));
      }

      const previousExitCode = process.exitCode;
      process.exitCode = undefined;
      try {
        const succeeded = await withMutedConsole(() => generator.runCli(failure));
        assert.equal(succeeded, false);
        assert.equal(process.exitCode, 1);
      } finally {
        process.exitCode = previousExitCode;
      }
    });
  });
}

test("checkout parser detects direct, named, quoted, case-varied, and inline checkout steps", () => {
  const workflow = `
jobs:
  check:
    steps:
      - uses: actions/checkout@v5
        with:
          persist-credentials: false
      - name: Unsafe named checkout
        uses: 'actions/checkout@v5'
      - name: Unsafe case-varied checkout
        uses: "Actions/Checkout@v5"
      - { uses: actions/checkout@v5 }
  `;

  assert.equal(checkoutBlocks(workflow).length, 4);
  const errors = checkoutPersistenceErrors(workflow);
  assert.ok(errors.some(error => /noncanonical checkout reference/.test(error)));
  assert.ok(errors.includes("checkout block 2 must set persist-credentials: false exactly once"));
  assert.ok(errors.includes("checkout block 3 must set persist-credentials: false exactly once"));
  assert.ok(errors.includes("checkout block 4 must set persist-credentials: false exactly once"));
});

test("checkout parser rejects YAML-anchor indirection instead of borrowing another step's options", () => {
  const workflow = `
x-checkout: &checkout actions/checkout@v5
jobs:
  check:
    steps:
      - uses: *checkout
      - uses: actions/checkout@v5
        with:
          persist-credentials: false
  `;
  const errors = checkoutPersistenceErrors(workflow);

  assert.ok(errors.some(error => /YAML alias/.test(error)));
  assert.ok(errors.some(error => /noncanonical checkout reference/.test(error)));
});

test("checkout parser rejects persist-credentials decoys outside the with mapping", () => {
  const workflow = `
jobs:
  check:
    steps:
      - uses: actions/checkout@v5
        env:
          DECOY: |
            persist-credentials: false
  `;

  assert.deepEqual(checkoutPersistenceErrors(workflow), [
    "checkout block 1 must set persist-credentials: false exactly once"
  ]);
});

test("CI runs the checkout credential contract for every workflow change", async () => {
  const ciWorkflow = await readFile(path.join(workflowDir, "ci.yml"), "utf8");
  assert.deepEqual(ciAlwaysReportingErrors(ciWorkflow), []);
});

test("CI trigger parser anchors to top-level on and rejects block-scalar decoys", () => {
  const workflow = `
env:
  DECOY: |
    push:
      paths:
        - '.github/workflows/**'
    pull_request:
      paths:
        - '.github/workflows/**'
on:
  push:
    paths:
      - 'scripts/**'
  pull_request:
    paths:
      - 'scripts/**'
  `;

  assert.deepEqual(ciAlwaysReportingErrors(workflow), [
    "CI required checks must not use paths or paths-ignore filters"
  ]);
});

for (const workflowPath of workflowPaths) {
  test(`${workflowPath} never persists checkout credentials`, async () => {
    const workflow = await readFile(path.join(repoRoot, workflowPath), "utf8");
    const blocks = checkoutBlocks(workflow);
    if (blocks.length === 0) return;
    assert.deepEqual(checkoutPersistenceErrors(workflow), []);
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
