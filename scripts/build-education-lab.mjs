import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";
const out = "public/education";
mkdirSync(out, { recursive: true });
const hash = (value) =>
  createHash("sha256").update(value).digest("hex").slice(0, 16);
const compile = (name) =>
  ts.transpileModule(readFileSync(`lib/education/${name}.ts`, "utf8"), {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ES2020,
      removeComments: true,
    },
  }).outputText;
const model = compile("reliable-workflow");
const modelName = `workflow-model.${hash(model)}.js`;
const bench = compile("workflow-browser").replace(
  "./reliable-workflow.js",
  `./${modelName}`,
);
const benchName = `workflow-bench.${hash(bench)}.js`;
const manifest = {
  model: modelName,
  bench: benchName,
  sourceHash: hash(
    readFileSync("lib/education/workflow-browser.ts", "utf8") +
      readFileSync("lib/education/reliable-workflow.ts", "utf8"),
  ),
};
if (process.argv.includes("--check")) {
  const actual = JSON.parse(readFileSync("data/education-assets.json", "utf8"));
  if (
    JSON.stringify(actual) !== JSON.stringify(manifest) ||
    readFileSync(`${out}/${modelName}`, "utf8") !== model ||
    readFileSync(`${out}/${benchName}`, "utf8") !== bench
  )
    throw new Error(
      "Education assets differ from their source. Run node scripts/build-education-lab.mjs.",
    );
  console.log("Education source/asset integrity: passed");
  process.exit(0);
}
// Retain published generations so cached documents keep working across releases.
writeFileSync(`${out}/${modelName}`, model);
writeFileSync(`${out}/${benchName}`, bench);
writeFileSync(
  "data/education-assets.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
const { blankState, exportMarkdown } = await import(
  pathToFileURL(resolve(out, modelName)).href
);
writeFileSync(`${out}/workflow-template.md`, exportMarkdown(blankState()));
console.log(`Education assets: ${modelName}, ${benchName}`);
