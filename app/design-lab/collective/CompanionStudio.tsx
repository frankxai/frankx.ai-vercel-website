"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BRANDS,
  COLLECTION_ID,
  MAX_BUNDLE_BYTES,
  SURFACES,
  exportPlacementBrief,
  importSelection,
  verifyReviewBundle,
} from "@/lib/media/companion-selection.mjs";
import type {
  Catalog,
  CatalogAsset,
  Selection,
} from "@/lib/media/companion-selection.mjs";
import styles from "./companion.module.css";

const STORAGE_KEY = "frankx-companion-placement-v1";
const firstUses = [
  {
    slug: "living-archive",
    surface: "Library",
    job: "Open a story about keeping useful knowledge.",
    limit: "Keep original book covers and source attribution.",
  },
  {
    slug: "wolf-crossing",
    surface: "Learning",
    job: "Introduce a learning route or a decision with several steps.",
    limit: "The scene is a metaphor for guidance.",
  },
  {
    slug: "whale-listening",
    surface: "Music",
    job: "Frame a listening essay or a research discovery.",
    limit: "Keep the music or cited research as the evidence.",
  },
  {
    slug: "robot-repair",
    surface: "Editorial",
    job: "Show the craft behind a build journal.",
    limit: "Pair the illustration with the actual build.",
  },
  {
    slug: "turtle-tide",
    surface: "Social",
    job: "Carry a portrait story about patient maintenance.",
    limit: "Preserve the pebble, water path and planted terrace.",
  },
];
const emptySelection: Selection = {
  collection_id: COLLECTION_ID,
  brand: "FrankX",
  surface: "Editorial",
  target: "",
  assets: [],
};
function download(value: unknown, filename: string) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(value, null, 2)], { type: "application/json" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function CompanionStudio({ catalog }: { catalog: Catalog }) {
  const [selection, setSelection] = useState<Selection>(emptySelection);
  const [images, setImages] = useState<Record<string, string>>({});
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [onlySelected, setOnlySelected] = useState(false);
  const [lightArt, setLightArt] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [storageWarning, setStorageWarning] = useState("");
  const [error, setError] = useState("");
  const [inspected, setInspected] = useState<CatalogAsset | null>(null);
  const bundleInput = useRef<HTMLInputElement>(null),
    briefInput = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const imageUrls = useRef<string[]>([]);
  const operation = useRef(0);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSelection(importSelection(JSON.parse(raw), catalog));
    } catch {
      setError(
        "The saved shortlist could not be restored. Import an exported brief or make a new selection.",
      );
    }
    return () => {
      operation.current++;
      imageUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [catalog]);
  useEffect(() => {
    if (inspected && dialog.current && !dialog.current.open)
      dialog.current.showModal();
  }, [inspected]);
  function save(next: Selection) {
    setSelection(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setStorageWarning("");
    } catch {
      setStorageWarning(
        "Your brief is available for this visit. Browser storage is unavailable; export it to keep a copy.",
      );
    }
  }
  function toggle(asset: CatalogAsset) {
    const exists = selection.assets.some((a) => a.asset_id === asset.asset_id);
    save({
      ...selection,
      assets: exists
        ? selection.assets.filter((a) => a.asset_id !== asset.asset_id)
        : [
            ...selection.assets,
            {
              asset_id: asset.asset_id,
              version_id: asset.version_id,
              web_sha256: asset.web.sha256,
            },
          ],
    });
  }
  async function loadBundle(file: File) {
    const run = ++operation.current;
    setBusy(true);
    setError("");
    setMessage("Checking the artwork against the collection…");
    try {
      if (file.size > MAX_BUNDLE_BYTES)
        throw new Error(
          "The review file is too large. Choose the companion review bundle.",
        );
      const verified = await verifyReviewBundle(
        JSON.parse(await file.text()),
        catalog,
      );
      if (run !== operation.current) return;
      const next: Record<string, string> = {},
        urls: string[] = [];
      try {
        for (const { record, bytes } of verified) {
          const url = URL.createObjectURL(
            new Blob([Uint8Array.from(bytes).buffer], { type: "image/webp" }),
          );
          urls.push(url);
          next[record.asset_id] = url;
        }
      } catch (cause) {
        urls.forEach((url) => URL.revokeObjectURL(url));
        throw cause;
      }
      imageUrls.current.forEach((url) => URL.revokeObjectURL(url));
      imageUrls.current = urls;
      setImages(next);
      setMessage(
        `${verified.length} images checked and loaded locally. Reload the artwork after refreshing this page.`,
      );
    } catch (cause) {
      if (run === operation.current) {
        setError(
          cause instanceof Error
            ? cause.message
            : "The file could not be loaded.",
        );
        setMessage("");
      }
    } finally {
      if (run === operation.current) setBusy(false);
    }
  }
  async function loadBrief(file: File) {
    setError("");
    try {
      if (file.size > 128 * 1024)
        throw new Error("Choose a small exported placement brief.");
      save(importSelection(JSON.parse(await file.text()), catalog));
      setMessage("Placement brief restored. Artwork is loaded separately.");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "The brief could not be loaded.",
      );
    }
  }
  const categories = ["All", ...new Set(catalog.assets.map((a) => a.category))];
  const visible = catalog.assets.filter(
    (a) =>
      (category === "All" || a.category === category) &&
      (!onlySelected ||
        selection.assets.some((pin) => pin.asset_id === a.asset_id)) &&
      [a.title, a.category, a.role, ...a.tags]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  const loaded = Object.keys(images).length > 0;
  return (
    <main className={`${styles.root} ${lightArt ? styles.lightArt : ""}`}>
      <div className={styles.top}>
        <Link href="/design-lab">Back to Design Lab</Link>
        <span>FrankX / Companion studio</span>
      </div>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>The companion collection</p>
        <h1>
          Choose the scene.
          <br />
          Give it a purpose.
        </h1>
        <p>
          Inspect {catalog.assets.length} character studies and prepare a brief
          for your next website or story. Load the review file to see the
          artwork. The file is read locally.
        </p>
        <button
          className={styles.primary}
          disabled={busy}
          onClick={() => bundleInput.current?.click()}
        >
          {busy
            ? "Checking artwork…"
            : loaded
              ? "Replace artwork"
              : "Load review bundle"}
        </button>
        <input
          ref={bundleInput}
          type="file"
          accept=".json,application/json"
          hidden
          aria-label="Review bundle"
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) void loadBundle(file);
          }}
        />
        <p className={styles.small}>
          Use the companion review JSON from the saved collection. Images stay
          in memory; the shortlist is saved in this browser when storage is
          available.
        </p>
      </header>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      {message && (
        <p className={styles.notice} role="status">
          {message}
        </p>
      )}
      {storageWarning && (
        <p className={styles.notice} role="status">
          {storageWarning}
        </p>
      )}
      <section className={styles.brief} aria-labelledby="brief-heading">
        <div>
          <h2 id="brief-heading">Placement brief</h2>
          <p>
            {selection.assets.length} selected. Export exact versions, crop
            intent and the review notes for the next agent.
          </p>
        </div>
        <div className={styles.fields}>
          <label>
            Brand
            <select
              value={selection.brand}
              onChange={(e) => save({ ...selection, brand: e.target.value })}
            >
              {BRANDS.map((brand) => (
                <option key={brand}>{brand}</option>
              ))}
            </select>
          </label>
          <label>
            Surface
            <select
              value={selection.surface}
              onChange={(e) => save({ ...selection, surface: e.target.value })}
            >
              {SURFACES.map((surface) => (
                <option key={surface}>{surface}</option>
              ))}
            </select>
          </label>
          <label className={styles.target}>
            Page or story
            <input
              value={selection.target}
              maxLength={240}
              placeholder="e.g. Library introduction"
              onChange={(e) => save({ ...selection, target: e.target.value })}
            />
          </label>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.primary}
            disabled={!selection.assets.length}
            onClick={() =>
              download(
                exportPlacementBrief(selection, catalog),
                "FrankX-companion-placement-brief.json",
              )
            }
          >
            Export placement brief
          </button>
          <button
            className={styles.secondary}
            onClick={() => briefInput.current?.click()}
          >
            Import brief
          </button>
          <input
            ref={briefInput}
            type="file"
            hidden
            accept=".json,application/json"
            aria-label="Placement brief"
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (file) void loadBrief(file);
            }}
          />
        </div>
        <p className={styles.small}>
          A brief proposes a placement. Public release and character identity
          remain separate decisions.
        </p>
      </section>
      {!loaded && (
        <section className={styles.firstUses} aria-labelledby="uses-heading">
          <h2 id="uses-heading">Start with the useful moment.</h2>
          <p>
            These five scenes have a clear action and a specific editorial use.
          </p>
          {firstUses.map((use) => {
            const a = catalog.assets.find((a) => a.slug === use.slug);
            if (!a) return null;
            return (
              <article key={a.asset_id}>
                <div>
                  <span className={styles.small}>{use.surface}</span>
                  <h3>{a.title}</h3>
                  <p>{use.job}</p>
                  <p className={styles.small}>{use.limit}</p>
                </div>
                <button
                  className={styles.secondary}
                  aria-pressed={selection.assets.some(
                    (pin) => pin.asset_id === a.asset_id,
                  )}
                  onClick={() => toggle(a)}
                >
                  {selection.assets.some((pin) => pin.asset_id === a.asset_id)
                    ? "Remove from brief"
                    : "Add to brief"}
                </button>
              </article>
            );
          })}
        </section>
      )}
      {loaded && (
        <section
          aria-labelledby="collection-heading"
          className={styles.collection}
        >
          <h2 id="collection-heading">Inspect the collection</h2>
          <div className={styles.toolbar}>
            <label className={styles.search}>
              Find an asset
              <input
                type="search"
                value={query}
                placeholder="Character, role, asset…"
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <button
              className={styles.secondary}
              aria-pressed={onlySelected}
              onClick={() => setOnlySelected(!onlySelected)}
            >
              Selected only
            </button>
            <button
              className={styles.secondary}
              aria-pressed={lightArt}
              onClick={() => setLightArt(!lightArt)}
            >
              {lightArt ? "Dark art background" : "Light art background"}
            </button>
          </div>
          <div
            className={styles.filters}
            role="group"
            aria-label="Character family"
          >
            {categories.map((label) => (
              <button
                key={label}
                aria-pressed={category === label}
                onClick={() => setCategory(label)}
              >
                {label}
              </button>
            ))}
          </div>
          <p className={styles.small} role="status">
            {visible.length} matching assets
          </p>
          <div className={styles.grid}>
            {visible.map((a) => (
              <article key={a.asset_id}>
                <button
                  className={styles.artButton}
                  disabled={!images[a.asset_id]}
                  onClick={() => setInspected(a)}
                  aria-label={`Inspect ${a.title}`}
                >
                  {images[a.asset_id] ? (
                    /* Browser-local object URLs cannot be served through image optimization. */ <img
                      src={images[a.asset_id]}
                      width={a.web.width}
                      height={a.web.height}
                      alt={a.alt}
                      loading="lazy"
                    />
                  ) : (
                    <span>Artwork not included in this review file</span>
                  )}
                </button>
                <p className={styles.small}>
                  {a.category} ·{" "}
                  {a.rights.third_party_characters
                    ? "Guest rendition"
                    : "Original candidate"}
                </p>
                <h3>{a.title}</h3>
                <p>{a.alt}</p>
                <button
                  className={styles.secondary}
                  aria-pressed={selection.assets.some(
                    (pin) => pin.asset_id === a.asset_id,
                  )}
                  onClick={() => toggle(a)}
                >
                  {selection.assets.some((pin) => pin.asset_id === a.asset_id)
                    ? "Remove from brief"
                    : "Add to brief"}
                </button>
              </article>
            ))}
          </div>
          {!visible.length && (
            <p className={styles.notice}>
              No matching assets. Change the family, search or selection filter.
            </p>
          )}
        </section>
      )}
      <footer className={styles.footer}>
        <p>
          The collection includes original candidates and generated guest
          renditions. Source references and review notes travel with each
          version. This studio does not publish artwork.
        </p>
      </footer>
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby="asset-title"
        onClose={() => setInspected(null)}
      >
        <form method="dialog" className={styles.dialogBar}>
          <span>Asset details</span>
          <button autoFocus className={styles.secondary}>
            Close
          </button>
        </form>
        {inspected && (
          <>
            <img
              className={styles.detailArt}
              src={images[inspected.asset_id]}
              width={inspected.web.width}
              height={inspected.web.height}
              alt={inspected.alt}
            />
            <div className={styles.detailCopy}>
              <h2 id="asset-title">{inspected.title}</h2>
              <p>{inspected.review_note}</p>
              <dl>
                <dt>Asset</dt>
                <dd>{inspected.asset_id}</dd>
                <dt>Version</dt>
                <dd>{inspected.version_id}</dd>
                <dt>Cast</dt>
                <dd>{inspected.entity_ids.join(", ")}</dd>
              </dl>
              <button
                className={styles.primary}
                aria-pressed={selection.assets.some(
                  (pin) => pin.asset_id === inspected.asset_id,
                )}
                onClick={() => toggle(inspected)}
              >
                {selection.assets.some(
                  (pin) => pin.asset_id === inspected.asset_id,
                )
                  ? "Remove from brief"
                  : "Add to brief"}
              </button>
            </div>
          </>
        )}
      </dialog>
    </main>
  );
}
