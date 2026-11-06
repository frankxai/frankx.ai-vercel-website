export type CatalogAsset = {
  asset_id: string;
  version_id: string;
  slug: string;
  title: string;
  category: string;
  entity_ids: string[];
  mode: string;
  role: string;
  tags: string[];
  alt: string;
  review_note: string;
  web: { sha256: string; bytes: number; width: number; height: number };
  rights: {
    status: string;
    third_party_characters: boolean;
    public_approved: boolean;
  };
};
export type Catalog = { collection_id: string; assets: CatalogAsset[] };
export type Selection = {
  collection_id: string;
  brand: string;
  surface: string;
  target: string;
  assets: { asset_id: string; version_id: string; web_sha256: string }[];
};
export const COLLECTION_ID: string;
export const MAX_BUNDLE_BYTES: number;
export const BRANDS: string[];
export const SURFACES: string[];
export function importSelection(input: unknown, catalog: Catalog): Selection;
export function exportPlacementBrief(
  input: unknown,
  catalog: Catalog,
): Selection & {
  schema_version: number;
  kind: string;
  publication_approved: false;
  instruction: string;
};
export function verifyReviewBundle(
  input: unknown,
  catalog: Catalog,
): Promise<{ record: CatalogAsset; bytes: Uint8Array }[]>;
