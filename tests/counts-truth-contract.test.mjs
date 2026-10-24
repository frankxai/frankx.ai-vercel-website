import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const navMega = read("components/NavigationMega.tsx");
const booksRegistry = read("app/books/lib/books-registry.ts");
const booksPage = read("app/books/page.tsx");
const promptLibraryPage = read("app/prompt-library/page.tsx");
const acosData = read("data/acos/agents.ts");
const acosLayout = read("app/acos/layout.tsx");
const acosPage = read("app/acos/page.tsx");
const acosAgentsPage = read("app/acos/agents/page.tsx");
const acosPresencePage = read("app/acos/presence/page.tsx");
const routeEnumeration = read("lib/route-enumeration.mjs");

test("NavigationMega derives book and library counts at build time and drops hardcoded prompt counts", () => {
  assert.match(
    navMega,
    /import\s*\{\s*publishedBookCount\s*\}\s*from\s*['"]@\/app\/books\/lib\/books-registry['"]/,
  );
  assert.match(
    navMega,
    /import\s*\{\s*libraryBooks\s*\}\s*from\s*['"]@\/lib\/library-catalog['"]/,
  );
  assert.match(navMega, /\$\{publishedBookCount\}\s+published books/);
  assert.match(navMega, /\$\{libraryBookCount\}\s+book deep-dives/);

  for (const retiredHardcoded of [
    "23 books",
    "411K",
    "130+",
    "80 book",
    "79 book",
    "(FREE)",
    "NEW ·",
  ]) {
    assert.ok(
      !navMega.includes(retiredHardcoded),
      `Expected ${retiredHardcoded} not to appear in components/NavigationMega.tsx`,
    );
  }
});

test("books-registry has no duplicate book slugs and books/page derives count from getPublishedBooks()", () => {
  const registryArraySource = booksRegistry.slice(
    booksRegistry.indexOf("export const booksRegistry"),
    booksRegistry.indexOf("export function getBookBySlug"),
  );
  const topLevelSlugs = [
    ...registryArraySource.matchAll(/^    slug:\s*'([^']+)'/gm),
  ].map((m) => m[1]);
  const uniqueSlugs = new Set(topLevelSlugs);
  assert.equal(topLevelSlugs.length, 22);
  assert.equal(
    topLevelSlugs.length,
    uniqueSlugs.size,
    `Duplicate book slugs found in books-registry.ts: ${topLevelSlugs.filter((s, i) => topLevelSlugs.indexOf(s) !== i).join(", ")}`,
  );

  assert.match(
    booksRegistry,
    /export const publishedBookCount = getPublishedBooks\('en'\)\.length/,
  );
  assert.match(booksPage, /\{books\.length\}\s*books\./);
  assert.doesNotMatch(booksPage, /Six books|Six Books|23 books|411K/i);
});

test("/prompt-library drops hardcoded 130+ and renders snapshot.patterns.length dynamically", () => {
  assert.doesNotMatch(promptLibraryPage, /130\+/);
  assert.match(promptLibraryPage, /\{snapshot\.patterns\.length\}/);
});

test("/acos routes derive counts from ACOS_REPO_SNAPSHOT, PILLARS, and pillarCounts() with no contradictory hardcoded numbers", () => {
  assert.match(acosData, /export const ACOS_REPO_SNAPSHOT = \{/);
  assert.match(acosData, /repo:\s*'frankxai\/agentic-creator-os'/);
  assert.match(acosData, /verifiedOn:\s*'\d{4}-\d{2}-\d{2}'/);

  assert.match(acosLayout, /ACOS_REPO_SNAPSHOT\.skills/);
  assert.match(acosLayout, /ACOS_REPO_SNAPSHOT\.agents/);
  assert.match(acosPage, /ACOS_REPO_SNAPSHOT\.skills/);
  assert.match(acosPage, /ACOS_REPO_SNAPSHOT\.agents/);
  assert.match(acosPage, /ACOS_REPO_SNAPSHOT\.commands/);
  assert.match(acosPage, /ACOS_REPO_SNAPSHOT\.verifiedOn/);
  assert.match(acosAgentsPage, /catalogCounts\.total/);
  assert.match(acosAgentsPage, /p\.specialists\.length/);
  assert.match(acosPresencePage, /ACOS_REPO_SNAPSHOT\.skills/);
  assert.match(acosPresencePage, /ACOS_REPO_SNAPSHOT\.agents/);

  for (const [name, source] of [
    ["app/acos/layout.tsx", acosLayout],
    ["app/acos/page.tsx", acosPage],
    ["app/acos/agents/page.tsx", acosAgentsPage],
    ["app/acos/presence/page.tsx", acosPresencePage],
  ]) {
    for (const retiredPattern of [
      /\b75\+?\s*(?:auto-activating\s+)?skills/i,
      /\b38\s*(?:specialized\s+)?agents/i,
      /\b35\+\s*(?:creator\s+)?(?:skills|commands)/i,
      /\b117\+\s*commands/i,
      /\b99[-\s]agents?\b/i,
      /\{s\}\/9 shipped/,
    ]) {
      assert.doesNotMatch(
        source,
        retiredPattern,
        `Unexpected hardcoded count matching ${retiredPattern} in ${name}`,
      );
    }
  }
});

test("route-enumeration and canonical library data files reconcile to all 80 library book slugs", () => {
  for (const requiredSource of [
    "data/library-reviews.ts",
    "data/handbook-to-higher-consciousness.ts",
    "data/book-reviews.ts",
    "data/library-reading-guides.json",
  ]) {
    assert.ok(
      routeEnumeration.includes(requiredSource),
      `Expected lib/route-enumeration.mjs to include ${requiredSource}`,
    );
  }

  const guides = JSON.parse(read("data/library-reading-guides.json")).map(
    (g) => g.slug,
  );
  const extractSlugs = (src) =>
    [...src.matchAll(/^\s*slug:\s*['"]([^'"]+)['"]/gm)].map((m) => m[1]);

  const allSlugs = new Set([
    ...guides,
    ...extractSlugs(read("data/handbook-to-higher-consciousness.ts")),
    ...extractSlugs(read("data/book-reviews.ts")),
    ...extractSlugs(read("data/library-reviews.ts")),
  ]);
  assert.equal(allSlugs.size, 80);
});

test("touched components enforce sentence case and contain no uppercase utility classes", () => {
  for (const [name, source] of [
    ["components/NavigationMega.tsx", navMega],
    ["app/books/page.tsx", booksPage],
    ["app/prompt-library/page.tsx", promptLibraryPage],
    ["app/acos/layout.tsx", acosLayout],
    ["app/acos/page.tsx", acosPage],
    ["app/acos/agents/page.tsx", acosAgentsPage],
    ["app/acos/presence/page.tsx", acosPresencePage],
  ]) {
    assert.doesNotMatch(
      source,
      /\buppercase\b/,
      `Expected no uppercase utility class in ${name}`,
    );
  }
});
