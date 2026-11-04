import { readFileSync, writeFileSync, realpathSync, statSync } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import {
  COLLECTION_ID,
  MAX_BUNDLE_BYTES,
} from "../../lib/media/companion-selection.mjs";

const [packet, output] = process.argv.slice(2);
if (!packet || !output)
  throw new Error(
    "Usage: node scripts/media/build-companion-review.mjs <extracted-collection> <new-output.json>",
  );
const root = realpathSync(packet);
const catalog = JSON.parse(
  readFileSync(
    fileURLToPath(
      new URL("../../data/media/companion-collection.v2.json", import.meta.url),
    ),
    "utf8",
  ),
);
const register = JSON.parse(
  readFileSync(path.join(root, "asset-register.json"), "utf8"),
);
const assets = [];
let total = 0;
for (const expected of catalog.assets) {
  const a = register.assets.find((a) => a.asset_id === expected.asset_id);
  if (
    !a ||
    a.version_id !== expected.version_id ||
    a.web.sha256 !== expected.web.sha256
  )
    throw new Error(
      "The packet does not match the pinned catalog: " + expected.asset_id,
    );
  const file = realpathSync(path.resolve(root, a.web.path));
  if (!file.startsWith(root + path.sep) || !statSync(file).isFile())
    throw new Error("Asset path escapes the collection.");
  const bytes = readFileSync(file);
  total += bytes.length;
  if (
    total > MAX_BUNDLE_BYTES ||
    bytes.length !== expected.web.bytes ||
    bytes.subarray(0, 4).toString() !== "RIFF" ||
    bytes.subarray(8, 12).toString() !== "WEBP" ||
    createHash("sha256").update(bytes).digest("hex") !== expected.web.sha256
  )
    throw new Error(
      "Asset bytes do not match the collection: " + expected.asset_id,
    );
  assets.push({
    asset_id: a.asset_id,
    version_id: a.version_id,
    web_sha256: a.web.sha256,
    mime: "image/webp",
    data_base64: bytes.toString("base64"),
  });
}
const data = JSON.stringify({
  schema_version: 1,
  collection_id: COLLECTION_ID,
  assets,
});
if (Buffer.byteLength(data) > MAX_BUNDLE_BYTES)
  throw new Error("Encoded review file exceeds the browser import limit.");
writeFileSync(output, data, { flag: "wx" });
console.log(
  JSON.stringify({
    output,
    assets: assets.length,
    bytes: Buffer.byteLength(data),
    publication_approved: false,
  }),
);
