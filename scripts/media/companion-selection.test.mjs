import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  COLLECTION_ID,
  importSelection,
  exportPlacementBrief,
  verifyReviewBundle,
} from "../../lib/media/companion-selection.mjs";

test("the deployment retains its catalog while excluding review documents", () => {
  const root = fileURLToPath(new URL("../../", import.meta.url));
  const fixture = mkdtempSync(join(tmpdir(), "frankx-companion-ignore-"));
  const catalogPath = "data/media/companion-collection.v2.json";
  const excluded = [
    "docs/media/collective-20261030/companion-collection.v2.json",
    "docs/media/collective-20261030/README.md",
    "docs/media/collective-20261030/REVIEW.md",
    "docs/media/collective-20261030/integration.patch",
    "docs/media/collective-20261030/unknown.json",
    "docs/media/collective-20261030/assets/private.webp",
    "docs/media/another-collection/private-notes.md",
    "docs/architecture/private-notes.md",
  ];
  // Vercel uses gitignore semantics. Runtime data must survive filtering,
  // while documentation and any artwork accidentally placed there stay out.
  try {
    writeFileSync(
      join(fixture, ".gitignore"),
      readFileSync(join(root, ".vercelignore")),
    );
    writeFileSync(join(fixture, ".global-ignore"), "");
    assert.equal(spawnSync("git", ["init", "--quiet", fixture]).status, 0);
    const result = spawnSync(
      "git",
      [
        "-c",
        `core.excludesFile=${join(fixture, ".global-ignore")}`,
        "check-ignore",
        "--no-index",
        "--stdin",
      ],
      {
        cwd: fixture,
        input: [catalogPath, ...excluded].join("\n") + "\n",
        encoding: "utf8",
      },
    );
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(result.stdout.trim().split("\n"), excluded);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

const bytes = Buffer.from(
  "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
  "base64",
);
const hash = createHash("sha256").update(bytes).digest("hex");
const record = {
  asset_id: "ast_test",
  version_id: "ver_1",
  title: "Test",
  category: "Wolves",
  entity_ids: ["candidate.test"],
  web: { sha256: hash, bytes: bytes.length, width: 1, height: 1 },
  rights: {
    status: "pending",
    third_party_characters: true,
    public_approved: false,
  },
  alt: "A test specimen.",
  review_note: "Review only.",
};
const catalog = { collection_id: COLLECTION_ID, assets: [record] };
const selection = () => ({
  collection_id: COLLECTION_ID,
  assets: [{ asset_id: "ast_test", version_id: "ver_1" }],
});
const bundle = () => ({
  schema_version: 1,
  collection_id: COLLECTION_ID,
  assets: [
    {
      asset_id: "ast_test",
      version_id: "ver_1",
      web_sha256: hash,
      mime: "image/webp",
      data_base64: bytes.toString("base64"),
    },
  ],
});

test("restores the original picker shortlist and bounds placement context", () => {
  const restored = importSelection(
    {
      ...selection(),
      brand: "FrankX",
      surface: "Library",
      target: "x".repeat(500),
    },
    catalog,
  );
  assert.equal(restored.target.length, 240);
  assert.equal(restored.surface, "Library");
  assert.equal(
    importSelection(
      { ...selection(), brand: "Unknown", surface: "Unknown" },
      catalog,
    ).brand,
    "FrankX",
  );
});
test("rejects unknown, duplicate, stale and wrong-collection selections", () => {
  for (const input of [
    { ...selection(), collection_id: "other" },
    { ...selection(), assets: [{ asset_id: "other", version_id: "ver_1" }] },
    {
      ...selection(),
      assets: [{ asset_id: "ast_test", version_id: "ver_old" }],
    },
    { ...selection(), assets: [...selection().assets, ...selection().assets] },
  ])
    assert.throws(() => importSelection(input, catalog));
});
test("a forged approval cannot travel in an exported placement proposal", () => {
  const input = {
    ...selection(),
    publication_approved: true,
    assets: [
      {
        ...selection().assets[0],
        public_approved: true,
        approval: { actor: "forged" },
      },
    ],
  };
  const before = JSON.stringify(input),
    result = exportPlacementBrief(input, catalog);
  assert.equal(result.publication_approved, false);
  assert.equal(result.assets[0].public_approved, false);
  assert.equal(result.assets[0].third_party_characters, true);
  assert.equal(result.assets[0].web_sha256, hash);
  assert.equal(result.assets[0].approval, undefined);
  assert.equal(JSON.stringify(input), before);
});
test("rejects stale rendition pins while upgrading a legacy shortlist", () => {
  assert.throws(
    () =>
      importSelection(
        {
          ...selection(),
          assets: [{ ...selection().assets[0], web_sha256: "f".repeat(64) }],
        },
        catalog,
      ),
    /different image rendition/,
  );
  assert.equal(
    importSelection(selection(), catalog).assets[0].web_sha256,
    hash,
  );
  assert.equal(
    importSelection(exportPlacementBrief(selection(), catalog), catalog)
      .assets[0].web_sha256,
    hash,
  );
});
test("loads only a pinned and checksum-matching WebP payload", async () => {
  const result = await verifyReviewBundle(bundle(), catalog);
  assert.deepEqual(Buffer.from(result[0].bytes), bytes);
  assert.equal(result[0].record, record);
});
test("rejects altered bytes, encoding, MIME, sizes and versions", async () => {
  const altered = Buffer.from(bytes);
  altered[altered.length - 1] ^= 1;
  for (const patch of [
    { data_base64: altered.toString("base64") },
    { data_base64: "%%%" },
    { mime: "image/svg+xml" },
    { web_sha256: "a".repeat(64) },
    { version_id: "ver_old" },
    { data_base64: bytes.subarray(0, -1).toString("base64") },
  ]) {
    const input = bundle();
    Object.assign(input.assets[0], patch);
    await assert.rejects(verifyReviewBundle(input, catalog));
  }
});
test("rejects unknown, empty, duplicate and foreign bundles without mutation", async () => {
  const good = bundle(),
    before = JSON.stringify(good);
  for (const input of [
    { ...good, collection_id: "other" },
    { ...good, assets: [] },
    { ...good, assets: [{ ...good.assets[0], asset_id: "unknown" }] },
    { ...good, assets: [...good.assets, ...good.assets] },
  ])
    await assert.rejects(verifyReviewBundle(input, catalog));
  assert.equal(JSON.stringify(good), before);
});
