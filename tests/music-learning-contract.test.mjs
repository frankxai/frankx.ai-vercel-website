import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const compact = (source) => source.replace(/\s+/g, " ");

const hub = read("app/music/learn/page.tsx");
const science = read("app/music/learn/science/page.tsx");
const piano = read("app/music/learn/piano/page.tsx");
const violin = read("app/music/learn/violin/page.tsx");
const routeWiringPatterns = [
  /ROUTE_GROUPS\.map\(\(group\) =>/,
  /group\.routes\.map\(\(route\) =>/,
  /href=\{route\.href\}/,
];
const layouts = [
  "app/music/learn/layout.tsx",
  "app/music/learn/guitar/layout.tsx",
  "app/music/learn/orchestration/layout.tsx",
  "app/music/learn/piano/layout.tsx",
  "app/music/learn/production/layout.tsx",
  "app/music/learn/reading/layout.tsx",
  "app/music/learn/science/layout.tsx",
  "app/music/learn/theory/layout.tsx",
  "app/music/learn/violin/layout.tsx",
].map(read).join("\n");

test("the canonical hub exposes every live learning route", () => {
  for (const route of [
    "/music/learn/theory",
    "/music/learn/reading",
    "/music/learn/piano",
    "/music/learn/violin",
    "/music/learn/guitar",
    "/music/learn/production",
    "/music/learn/orchestration",
    "/music/learn/science",
  ]) {
    assert.match(hub, new RegExp(`href:\\s*["']${route}["']`));
  }
  for (const pattern of routeWiringPatterns) assert.match(hub, pattern);
});

test("the hub is a free editorial layer with explicit privacy, guardian, and rights boundaries", () => {
  const source = compact(hub);
  assert.match(source, /free, self-paced map/i);
  assert.match(
    source,
    /does not ask for a name, email, account, recording, or upload/i,
  );
  assert.match(source, /parent, guardian, or teacher/i);
  assert.match(
    source,
    /public-domain or properly licensed scores, samples, and recordings/i,
  );
  assert.doesNotMatch(
    source,
    /<form|<input|paid academy|Kurs starten|zurück zu aleas welt/i,
  );
  assert.match(source, /hover:-translate-y-\[0\.5px\]/);
  assert.doesNotMatch(source, /hover:-translate-y-0\.5/);
});

test("the science route removes medical-sounding frequency promises and publishes its evidence boundary", () => {
  const source = compact(science);
  for (const retiredClaim of [
    "Reduces physical and energetic pain",
    "Influences cellular regeneration and tissue repair",
    "Clears traumatic experiences",
    "Raises awareness",
    "frequency of oneness",
    "miracle frequency",
    "nervous system recovery",
  ]) {
    assert.doesNotMatch(source, new RegExp(retiredClaim, "i"));
  }
  assert.match(source, /does not diagnose, treat, prevent, or cure/i);
  assert.match(source, /A frequency is not a treatment/i);
  assert.match(source, /nccih\.nih\.gov/);
  assert.match(source, /who\.int/);
  assert.match(source, /iso\.org/);
  assert.match(source, /pubmed\.ncbi\.nlm\.nih\.gov/);
});

test("metadata no longer positions the library as a duplicate academy or guarantees mastery", () => {
  assert.doesNotMatch(
    layouts,
    /FrankX Music Academy|Best Teachers|Master orchestration|professional sound/i,
  );
  assert.match(layouts, /free, self-paced music learning map/i);
});

test("German-first family routes state their no-intake and guardian posture", () => {
  for (const source of [piano, violin]) {
    assert.match(source, /Diese Seite speichert keine Namen/);
    assert.match(
      source,
      /Elternteil, einer Aufsichtsperson oder einer Lehrkraft/,
    );
  }
});
