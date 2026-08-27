import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  ciAlwaysReportingErrors,
  stripYamlComment,
  withoutBlockScalarContent
} from "./helpers/workflow-yaml-contract.mjs";

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

function containsYamlAlias(line) {
  let quote = null;
  let escaped = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (quote === '"' && escaped) {
      escaped = false;
      continue;
    }
    if (quote === '"' && character === "\\") {
      escaped = true;
      continue;
    }
    if (quote) {
      if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === "#" && (index === 0 || /\s/.test(line[index - 1]))) break;
    if (character !== "*") continue;

    const remainder = line.slice(index + 1);
    const alias = remainder.match(/^([0-9A-Za-z_-]+)(?=$|[\s,\]}#])/);
    if (!alias) continue;

    let cursor = index - 1;
    while (cursor >= 0 && /\s/.test(line[cursor])) cursor -= 1;
    if (cursor < 0 || /[:[{,]/.test(line[cursor])) return true;
    if (line[cursor] === "-" && line.slice(0, cursor).trim() === "") return true;
  }

  return false;
}

function checkoutWithMapping(source, stepIndent) {
  const lines = source.split(/\r?\n/);
  const withIndent = " ".repeat(stepIndent + 2);
  const indexes = lines.flatMap((line, index) =>
    stripYamlComment(line) === `${withIndent}with:` ? [index] : []
  );
  if (indexes.length !== 1) return { count: indexes.length, lines: [] };

  const start = indexes[0] + 1;
  let end = lines.length;
  for (let index = start; index < lines.length; index += 1) {
    const semanticLine = stripYamlComment(lines[index]);
    if (semanticLine.trim() === "") continue;
    const indentation = semanticLine.match(/^\s*/)[0].length;
    if (indentation <= stepIndent + 2) {
      end = index;
      break;
    }
  }

  return { count: 1, lines: lines.slice(start, end) };
}

function checkoutBlocks(workflow) {
  const lines = withoutBlockScalarContent(workflow).split(/\r?\n/);
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
  const structuralWorkflow = withoutBlockScalarContent(workflow);
  const blocks = checkoutBlocks(structuralWorkflow);
  const checkoutReferences = structuralWorkflow.match(/actions\/checkout@/gi) || [];
  const errors = workflow
    .split(/\r?\n/)
    .flatMap((line, index) => {
      if (/^\s*(?:-\s*)?uses:\s*[|>](?:[1-9][+-]?|[+-][1-9]?)?\s*(?:#.*)?$/i.test(line)) {
        return [`line ${index + 1} uses a block scalar for an action reference`];
      }
      if (/^\s*(?:-\s*)?uses:\s*"[^"\n]*\\/i.test(line)) {
        return [`line ${index + 1} uses escapes in an action reference`];
      }
      return [];
    })
    .concat(structuralWorkflow
      .split(/\r?\n/)
      .flatMap((line, index) => {
        if (/(?:^|\s)uses:\s*[^\n]*\\/i.test(line)) {
          return [`line ${index + 1} hides an escaped action behind a uses mapping`];
        }
        if (
          /^\s*(?:-\s*)?(?:[!&]\S+\s+)+uses\s*:/i.test(line) ||
          /(?:^|\s)uses:\s*(?:[!&]\S+\s+)+/i.test(line)
        ) {
          return [`line ${index + 1} decorates an action mapping with YAML node properties`];
        }
        if (
          /^\s*(?:-\s*)?["'][^"'\n]+["']\s*:/.test(line) ||
          /[{,]\s*["'][^"'\n]+["']\s*:/.test(line) ||
          /^\s*(?:-\s*)?\?\s+/.test(line)
        ) {
          return [`line ${index + 1} uses a noncanonical mapping key`];
        }
        if (
          /^\s*-\s*(?:\{|\*)/.test(line) ||
          /^\s*(?:-\s*)?<<:\s*\*/.test(line) ||
          /^\s*steps:\s*\S/.test(line)
        ) {
          return [`line ${index + 1} can hide an encoded or aliased action step`];
        }
        return [];
      }))
    .concat(structuralWorkflow
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
    }));

  if (checkoutReferences.length !== blocks.length) {
    errors.push(
      `found ${checkoutReferences.length} checkout references but parsed ${blocks.length} steps`
    );
  }

  return errors.concat(blocks.flatMap(({ source, stepIndent }, index) => {
    const structuralSource = withoutBlockScalarContent(source);
    const structuralLines = structuralSource.split(/\r?\n/);
    const stepFieldIndent = " ".repeat(stepIndent + 2);
    const optionIndent = " ".repeat(stepIndent + 4);
    const firstLine = stripYamlComment(structuralLines[0] ?? "");
    const firstField = firstLine.match(
      new RegExp(`^${" ".repeat(stepIndent)}-\\s+([A-Za-z_][0-9A-Za-z_-]*):`)
    );
    const stepFieldLines = structuralLines
      .map(stripYamlComment)
      .filter(line => line.trim() !== "" && line.startsWith(stepFieldIndent))
      .filter(line => line.match(/^\s*/)[0].length === stepIndent + 2);
    const canonicalStepFieldPattern = new RegExp(
      `^${stepFieldIndent}([A-Za-z_][0-9A-Za-z_-]*):(?:\\s.*)?$`
    );
    const stepFieldMatches = stepFieldLines.map(line => line.match(canonicalStepFieldPattern));
    const canonicalStepFields = Boolean(firstField) && stepFieldMatches.every(Boolean);
    const stepFieldKeys = [
      ...(firstField ? [firstField[1].toLowerCase()] : []),
      ...stepFieldMatches.filter(Boolean).map(match => match[1].toLowerCase())
    ];
    const uniqueStepFields = new Set(stepFieldKeys).size === stepFieldKeys.length;
    const withMapping = checkoutWithMapping(structuralSource, stepIndent);
    const semanticWithLines = withMapping.lines
      .map(stripYamlComment)
      .filter(line => line.trim() !== "");
    const canonicalEntryPattern = new RegExp(
      `^${optionIndent}([A-Za-z_][0-9A-Za-z_-]*):(?:\\s.*)?$`
    );
    const entryMatches = semanticWithLines.map(line => line.match(canonicalEntryPattern));
    const canonicalEntries = entryMatches.every(Boolean);
    const inputKeys = entryMatches.filter(Boolean).map(match => match[1].toLowerCase());
    const uniqueInputKeys = new Set(inputKeys).size === inputKeys.length;
    const falseCount = (
      semanticWithLines.filter(
        line => line === `${optionIndent}persist-credentials: false`
      )
    ).length;
    const persistenceOccurrences = structuralSource
      .split(/\r?\n/)
      .map(stripYamlComment)
      .join("\n")
      .match(/persist-credentials/gi)?.length ?? 0;
    const hasAlias = structuralSource.split(/\r?\n/).some(containsYamlAlias);
    const blockErrors = hasAlias
      ? [`checkout block ${index + 1} uses a YAML alias; checkout steps must be explicit`]
      : [];
    if (
      withMapping.count !== 1 ||
      !canonicalStepFields ||
      !uniqueStepFields ||
      !canonicalEntries ||
      !uniqueInputKeys ||
      falseCount !== 1 ||
      persistenceOccurrences !== 1 ||
      hasAlias
    ) {
      blockErrors.push(
        `checkout block ${index + 1} must set persist-credentials: false exactly once`
      );
    }
    return blockErrors;
  }));
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

test("checkout parser rejects a scalar-alias bypass hidden by a block-scalar decoy", () => {
  const workflow = `
x-enabled: &enabled true
jobs:
  check:
    steps:
      - uses: actions/checkout@v5
        with:
          persist-credentials: *enabled
        name: |
          persist-credentials: false
  `;

  const errors = checkoutPersistenceErrors(workflow);
  assert.ok(errors.some(error => /YAML alias/.test(error)));
  assert.ok(errors.includes("checkout block 1 must set persist-credentials: false exactly once"));
});

test("checkout parser accepts only the exact lowercase boolean credential control", () => {
  const hostileOptions = [
    "Persist-Credentials: false",
    "'persist-credentials': false",
    "persist-credentials: 'false'",
    "persist-credentials: !!bool false",
    "persist-credentials: [false]"
  ];

  for (const option of hostileOptions) {
    const workflow = `
jobs:
  check:
    steps:
      - uses: actions/checkout@v5
        with:
          ${option}
    `;

    assert.ok(
      checkoutPersistenceErrors(workflow).includes(
        "checkout block 1 must set persist-credentials: false exactly once"
      ),
      `must reject ${option}`
    );
  }
});

test("checkout parser binds the credential control to the canonical with mapping", () => {
  const hostileWorkflows = [
    `
jobs:
  check:
    steps:
      - uses: actions/checkout@v5
        with:
          "persist-credentials": true
        env:
          persist-credentials: false
    `,
    `
jobs:
  check:
    steps:
      - uses: actions/checkout@v5
        with:
          ? persist-credentials
          : true
        env:
          persist-credentials: false
    `,
    `
jobs:
  check:
    steps:
      - uses: actions/checkout@v5
        with:
          "persist-credentials": true
          decoy: { persist-credentials: false }
    `
  ];

  for (const workflow of hostileWorkflows) {
    assert.ok(
      checkoutPersistenceErrors(workflow).includes(
        "checkout block 1 must set persist-credentials: false exactly once"
      )
    );
  }
});

test("checkout parser does not confuse shell glob text with a YAML alias node", () => {
  const workflow = `
jobs:
  check:
    steps:
      - uses: actions/checkout@v5
        with:
          persist-credentials: false
        run: echo *enabled
  `;

  assert.deepEqual(checkoutPersistenceErrors(workflow), []);
});

test("checkout parser rejects encoded or quoted duplicate step keys", () => {
  const workflow = String.raw`
jobs:
  check:
    steps:
      - uses: actions/checkout@v5
        with:
          persist-credentials: false
        "wi\u0074h":
          "persist-\u0063redentials": true
  `;

  assert.ok(
    checkoutPersistenceErrors(workflow).includes(
      "checkout block 1 must set persist-credentials: false exactly once"
    )
  );
});

test("checkout parser rejects folded, literal, and escaped action references", () => {
  const hostileUses = [
    `uses: >-\n          actions/checkout@v5`,
    `uses: |\n          actions/checkout@v5`,
    String.raw`uses: "actions\/checkout@v5"`,
    String.raw`uses: "actions\u002fcheckout@v5"`,
    String.raw`uses: "actions/chec\u006bout@v5"`
  ];

  for (const uses of hostileUses) {
    const workflow = `
jobs:
  check:
    steps:
      - ${uses}
        with:
          persist-credentials: true
    `;

    assert.notDeepEqual(checkoutPersistenceErrors(workflow), [], `must reject ${uses}`);
  }
});

test("checkout parser rejects multiline, quoted-key, and flow-encoded checkout actions", () => {
  const hostileUses = [
    String.raw`uses: "actions\
          /checkout@v5"`,
    String.raw`"uses": "actions\u002fcheckout@v5"`,
    String.raw`"u\u0073es": "actions\u002fcheckout@v5"`
  ];

  for (const uses of hostileUses) {
    const workflow = `
jobs:
  check:
    steps:
      - ${uses}
        with:
          persist-credentials: true
    `;

    assert.notDeepEqual(checkoutPersistenceErrors(workflow), [], `must reject ${uses}`);
  }

  const flowWorkflow = String.raw`
jobs:
  check:
    steps:
      - { "u\u0073es": "actions\u002fcheckout@v5", with: { persist-credentials: true } }
  `;
  assert.notDeepEqual(checkoutPersistenceErrors(flowWorkflow), []);
});

test("checkout parser rejects tag and anchor decoration around encoded actions", () => {
  const hostileUses = [
    String.raw`uses: !!str "actions\u002fcheckout@v5"`,
    String.raw`uses: &action "actions\u002fcheckout@v5"`,
    String.raw`!!str uses: "actions\u002fcheckout@v5"`,
    String.raw`uses: !<tag:yaml.org,2002:str> "actions\u002fcheckout@v5"`,
    String.raw`&key !!str uses: "actions\u002fcheckout@v5"`
  ];

  for (const uses of hostileUses) {
    const workflow = `
jobs:
  check:
    steps:
      - ${uses}
        with:
          persist-credentials: true
    `;

    assert.notDeepEqual(checkoutPersistenceErrors(workflow), [], `must reject ${uses}`);
  }
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
    "CI required-check triggers must exactly cover main/staging pushes and reviewable pull requests"
  ]);
});

test("CI trigger parser rejects quoted, escaped, branch, and event suppression", () => {
  const hostileWorkflows = [
    String.raw`
on:
  push:
    branches: [main, staging]
    "paths": ["scripts/**"]
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]
    branches: [main, staging]
    "\u0070aths-ignore": ["docs/**"]
`,
    `
on:
  push:
    branches: [never]
  pull_request:
    types: [closed]
    branches-ignore: [main]
`
  ];

  for (const workflow of hostileWorkflows) {
    assert.deepEqual(ciAlwaysReportingErrors(workflow), [
      "CI required-check triggers must exactly cover main/staging pushes and reviewable pull requests"
    ]);
  }
});

test("CI trigger parser rejects an escaped duplicate top-level on mapping", () => {
  const workflow = String.raw`
name: CI
on:
  push:
    branches: [main, staging]
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]
    branches: [main, staging]
"\u006fn":
  push:
    branches: [never]
jobs: {}
`;

  assert.deepEqual(ciAlwaysReportingErrors(workflow), [
    "CI must use unique canonical plain top-level mapping keys"
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
