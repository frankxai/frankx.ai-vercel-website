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

const canonicalCiTriggerLines = [
  "on:",
  "  push:",
  "    branches: [main, staging]",
  "  pull_request:",
  "    types: [opened, synchronize, reopened, ready_for_review]",
  "    branches: [main, staging]"
];

export function ciAlwaysReportingErrors(workflow) {
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
    return ["CI must use unique canonical plain top-level mapping keys"];
  }

  const onBlock = topLevelMappingBlock(workflow, "on");
  if (!onBlock) return ["CI must contain one canonical top-level on mapping"];

  const semanticLines = onBlock
    .split(/\r?\n/)
    .map(stripYamlComment)
    .filter(line => line.trim() !== "");

  return semanticLines.length === canonicalCiTriggerLines.length &&
    semanticLines.every((line, index) => line === canonicalCiTriggerLines[index])
    ? []
    : [
      "CI required-check triggers must exactly cover main/staging pushes and reviewable pull requests"
    ];
}
