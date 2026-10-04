import assert from "node:assert/strict";
import { test } from "node:test";
import { execFileSync } from "node:child_process";
import {
  blankState,
  exampleState,
  exportMarkdown,
  fields,
  parseStoredState,
  progress,
} from "../../lib/education/reliable-workflow.ts";

test("incomplete and fictional work never exports as verified competence", () => {
  const example = exampleState();
  assert.equal(progress(example).ready, false);
  const exported = exportMarkdown(example);
  assert.match(exported, /Work in progress/);
  assert.match(exported, /Result \(self-reported\): unrun/);
  assert.match(exported, /Fictional example/);
  assert.match(exported, /pedagogical review and learner validation pending/);
  assert.match(exported, /One reproducible failure/);
});

test("published browser assets match the current typed source", () => {
  assert.match(
    execFileSync(
      process.execPath,
      ["scripts/build-education-lab.mjs", "--check"],
      { encoding: "utf8" },
    ),
    /integrity: passed/,
  );
});
test("progress requires observed tests, passing results and every assessment", () => {
  const state = exampleState();
  state.review.fill(true);
  state.tests = state.tests.map(() => ({ result: "pass", notes: "" }));
  assert.equal(progress(state).ready, false);
  state.tests = state.tests.map(() => ({
    result: "pass",
    notes: "Observed correct unknown with source S2.",
  }));
  assert.equal(progress(state).ready, true);
  assert.match(exportMarkdown(state), /independent review pending/);
  state.tests[1].result = "fail";
  assert.equal(progress(state).ready, false);
  state.tests[1].result = "pass";
  state.values.task = "  ";
  assert.equal(progress(state).ready, false);
});
test("untrusted saved drafts fail closed without losing valid bounded work", () => {
  const valid = exampleState();
  assert.deepEqual(parseStoredState(JSON.stringify(valid)), valid);
  for (const raw of [
    "{",
    "null",
    JSON.stringify({ ...valid, version: 2 }),
    JSON.stringify({ ...valid, tests: [] }),
    JSON.stringify({ ...valid, review: [true] }),
    "x".repeat(40001),
  ])
    assert.equal(parseStoredState(raw), null);
  for (const f of fields)
    assert.equal(
      parseStoredState(
        JSON.stringify({
          ...valid,
          values: { ...valid.values, [f.key]: "x".repeat(2401) },
        }),
      ),
      null,
    );
  assert.equal(
    parseStoredState(
      JSON.stringify({
        ...valid,
        tests: [{ result: "certified", notes: "" }, ...valid.tests.slice(1)],
      }),
    ),
    null,
  );
  const hostile = {
    ...valid,
    extra: "discard",
    values: { ...valid.values, hidden: "discard" },
  };
  assert.deepEqual(parseStoredState(JSON.stringify(hostile)), valid);
});
test("export preserves current notes and explicitly represents empty fields", () => {
  const state = blankState();
  state.tests[0] = {
    result: "fail",
    notes: "Invented a date; reject and retest.",
  };
  assert.match(exportMarkdown(state), /\[Not specified\]/);
  assert.match(exportMarkdown(state), /Invented a date; reject and retest/);
});
