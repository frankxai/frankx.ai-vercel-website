export const COLLECTION_ID = "fx-companions-20261030-v2";
export const MAX_BUNDLE_BYTES = 16 * 1024 * 1024;
export const BRANDS = ["FrankX", "GenCreator", "Starlight", "Arcanea"];
export const SURFACES = [
  "Editorial",
  "Library",
  "Learning",
  "Music",
  "Product",
  "Social",
  "Design Lab",
];
const key = /^[a-z0-9_.-]+$/;

function rows(catalog) {
  if (
    catalog?.collection_id !== COLLECTION_ID ||
    !Array.isArray(catalog.assets)
  )
    throw new Error("Unknown asset collection.");
  return catalog.assets;
}
function context(input = {}) {
  return {
    brand: BRANDS.includes(input.brand) ? input.brand : "FrankX",
    surface: SURFACES.includes(input.surface) ? input.surface : "Editorial",
    target:
      typeof input.target === "string" ? input.target.trim().slice(0, 240) : "",
  };
}
export function importSelection(input, catalog) {
  const known = rows(catalog);
  if (
    input?.collection_id !== COLLECTION_ID ||
    !Array.isArray(input.assets) ||
    input.assets.length > known.length
  )
    throw new Error("Choose a shortlist from this collection.");
  const seen = new Set();
  const assets = input.assets.map((pin) => {
    const record = known.find((a) => a.asset_id === pin?.asset_id);
    if (!record || !key.test(pin.asset_id) || seen.has(pin.asset_id))
      throw new Error("The shortlist contains an unknown or duplicate asset.");
    if (pin.version_id !== record.version_id)
      throw new Error(
        "The shortlist contains an older asset version. Choose that asset again.",
      );
    if (pin.web_sha256 !== undefined && pin.web_sha256 !== record.web.sha256)
      throw new Error(
        "The brief refers to a different image rendition. Choose that asset again.",
      );
    seen.add(pin.asset_id);
    return {
      asset_id: record.asset_id,
      version_id: record.version_id,
      web_sha256: record.web.sha256,
    };
  });
  // Imported approval fields are deliberately discarded. A shortlist grants no release authority.
  return { collection_id: COLLECTION_ID, ...context(input), assets };
}
export function exportPlacementBrief(input, catalog) {
  const selection = importSelection(input, catalog);
  const known = rows(catalog);
  return {
    schema_version: 1,
    kind: "placement-proposal",
    ...selection,
    publication_approved: false,
    instruction:
      "Use these exact asset versions for the proposed placement. Preserve source identity, rights state and crop intent. Confirm the current release record before publishing.",
    assets: selection.assets.map((pin) => {
      const a = known.find((row) => row.asset_id === pin.asset_id);
      return {
        ...pin,
        title: a.title,
        category: a.category,
        entity_ids: a.entity_ids,
        web_sha256: a.web.sha256,
        width: a.web.width,
        height: a.web.height,
        alt: a.alt,
        review_note: a.review_note,
        rights_status: a.rights.status,
        third_party_characters: a.rights.third_party_characters,
        public_approved: false,
        crop_intent:
          "Preserve the complete action and anatomy. Review a new crop as a separate rendition.",
      };
    }),
  };
}
export async function verifyReviewBundle(input, catalog) {
  const known = rows(catalog);
  if (
    input?.schema_version !== 1 ||
    input.collection_id !== COLLECTION_ID ||
    !Array.isArray(input.assets) ||
    !input.assets.length ||
    input.assets.length > known.length
  )
    throw new Error("Choose the companion review bundle.");
  const seen = new Set(),
    verified = [];
  let total = 0;
  for (const item of input.assets) {
    const record = known.find((a) => a.asset_id === item?.asset_id);
    if (
      !record ||
      seen.has(record.asset_id) ||
      item.version_id !== record.version_id
    )
      throw new Error(
        "The review file contains an unknown, duplicate or older asset.",
      );
    if (
      item.mime !== "image/webp" ||
      item.web_sha256 !== record.web.sha256 ||
      typeof item.data_base64 !== "string"
    )
      throw new Error("The review file does not match the registered artwork.");
    if (
      item.data_base64.length > Math.ceil(record.web.bytes / 3) * 4 ||
      !/^[A-Za-z0-9+/]*={0,2}$/.test(item.data_base64)
    )
      throw new Error("Invalid image payload.");
    let raw;
    try {
      raw = atob(item.data_base64);
    } catch {
      throw new Error("Invalid image encoding.");
    }
    total += raw.length;
    if (total > MAX_BUNDLE_BYTES || raw.length !== record.web.bytes)
      throw new Error("The image size does not match the collection.");
    const bytes = Uint8Array.from(raw, (c) => c.charCodeAt(0));
    if (raw.slice(0, 4) !== "RIFF" || raw.slice(8, 12) !== "WEBP")
      throw new Error("Only registered WebP images can be loaded.");
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    const hash = Array.from(new Uint8Array(digest), (b) =>
      b.toString(16).padStart(2, "0"),
    ).join("");
    if (hash !== record.web.sha256)
      throw new Error(
        "An image checksum failed. The previous artwork is still loaded.",
      );
    seen.add(record.asset_id);
    verified.push({ record, bytes });
  }
  return verified;
}
