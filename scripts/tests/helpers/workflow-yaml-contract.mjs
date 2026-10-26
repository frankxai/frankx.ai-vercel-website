export function withoutBlockScalarContent(workflow) {
  const lines = workflow.split(/\r?\n/);
  let scalarParentIndent = null;

  return lines.map(line => {
    const indentation = line.match(/^\s*/)[0].length;

    if (scalarParentIndent !== null) {
      if (line.trim() === "" || indentation > scalarParentIndent) return "";
      scalarParentIndent = null;
    }

    const structuralLine = line.replace(/\s+#.*$/, "");
    if (/:\s*[|>](?:[1-9][+-]?|[+-][1-9]?)?\s*$/.test(structuralLine)) {
      scalarParentIndent = indentation;
    }

    return line;
  }).join("\n");
}

export function stripYamlComment(line) {
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
      if (character === quote) {
        if (quote === "'" && line[index + 1] === "'") {
          index += 1;
        } else {
          quote = null;
        }
      }
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === "#" && (index === 0 || /\s/.test(line[index - 1]))) {
      return line.slice(0, index).trimEnd();
    }
  }

  return line;
}

export function topLevelMappingBlock(workflow, key) {
  const lines = withoutBlockScalarContent(workflow).split(/\r?\n/);
  const start = lines.findIndex(line => stripYamlComment(line) === `${key}:`);
  if (start === -1) return null;

  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    const semanticLine = stripYamlComment(lines[index]);
    if (/^[A-Za-z_][0-9A-Za-z_-]*:\s*$/.test(semanticLine)) {
      end = index;
      break;
    }
  }

  return lines.slice(start, end).join("\n");
}

// 'edited' is required, not merely allowed. A pull_request run builds the merge
// commit, so CI's verdict is about one base branch, and check runs are
// SHA-scoped. Retargeting a pull request fires only 'edited', so without it a
// green build of the staging merge result stays green on the same head after
// the pull request is pointed at main, where the merge result differs.
const canonicalCiTriggerLines = [
  "on:",
  "  push:",
  "    branches: [main]",
  "    paths:",
  "      - 'app/**'",
  "      - 'components/**'",
  "      - 'lib/**'",
  "      - 'content/**'",
  "      - 'data/**'",
  "      - 'public/**'",
  "      - 'scripts/**'",
  "      - 'styles/**'",
  "      - 'types/**'",
  "      - 'package.json'",
  "      - 'pnpm-lock.yaml'",
  "      - 'pnpm-workspace.yaml'",
  "      - 'next.config.mjs'",
  "      - 'vercel.json'",
  "      - 'tailwind.config.js'",
  "      - 'tsconfig.json'",
  "      - 'proxy.ts'",
  "      - 'middleware.ts'",
  "      - 'middleware.js'",
  "      - '.vercelignore'",
  "      - '.npmrc'",
  "      - 'postcss.config.js'",
  "      - 'postcss.config.mjs'",
  "      - 'eslint.config.js'",
  "      - 'eslint.config.mjs'",
  "      - '.eslintrc.json'",
  "      - 'instrumentation.ts'",
  "  pull_request:",
  "    types: [opened, synchronize, reopened, edited, ready_for_review]",
  "    branches: [main, staging]"
];

// Shared by every required check whose trigger block is pinned. `label` only
// names the workflow in messages; the CI strings are asserted verbatim by
// existing tests, so ciAlwaysReportingErrors must keep producing them.
function triggerBlockErrors(workflow, label, canonicalLines, mismatch) {
  const structuralLines = withoutBlockScalarContent(workflow)
    .split(/\r?\n/)
    .map(stripYamlComment)
    .filter(line => line.trim() !== "");
  const topLevelLines = structuralLines.filter(
    line => line.match(/^\s*/)[0].length === 0
  );
  const topLevelMatches = topLevelLines.map(line =>
    line.match(/^([A-Za-z_][0-9A-Za-z_-]*):(?:\s.*)?$/)
  );
  const topLevelKeys = topLevelMatches
    .filter(Boolean)
    .map(match => match[1].toLowerCase());
  if (
    topLevelMatches.some(match => !match) ||
    new Set(topLevelKeys).size !== topLevelKeys.length ||
    topLevelKeys.filter(key => key === "on").length !== 1
  ) {
    return [`${label} must use unique canonical plain top-level mapping keys`];
  }

  const onBlock = topLevelMappingBlock(workflow, "on");
  if (!onBlock) return [`${label} must contain one canonical top-level on mapping`];

  const semanticLines = onBlock
    .split(/\r?\n/)
    .map(stripYamlComment)
    .filter(line => line.trim() !== "");

  return semanticLines.length === canonicalLines.length &&
    semanticLines.every((line, index) => line === canonicalLines[index])
    ? []
    : [mismatch];
}

export function ciAlwaysReportingErrors(workflow) {
  return triggerBlockErrors(
    workflow,
    "CI",
    canonicalCiTriggerLines,
    "CI required-check triggers must cover relevant main pushes and all reviewable pull requests"
  );
}

// Merge Gate and Contract Guard are required status checks. A paths or
// paths-ignore filter leaves every pull request that misses it without a result
// for the check, and GitHub blocks that pull request for good. The filter was
// extended seven times and a .nvmrc-only pull request (#1029) still missed it,
// so the trigger is pinned to exactly this block: adding a filter, dropping
// 'edited' (a retarget would keep a stale SHA-scoped verdict) or dropping a base
// branch fails the contract.
const canonicalAlwaysReportingPullRequestLines = [
  "on:",
  "  pull_request:",
  "    types: [opened, synchronize, reopened, edited, ready_for_review]",
  "    branches: [main, staging]"
];

export function requiredCheckAlwaysReportsErrors(workflow, label) {
  return triggerBlockErrors(
    workflow,
    label,
    canonicalAlwaysReportingPullRequestLines,
    `${label} is a required check and must report on every pull request: pull_request on main and staging, no paths or paths-ignore filter`
  );
}
