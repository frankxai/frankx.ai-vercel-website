import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import ts from "typescript";
import React, { act } from "react";
import * as selection from "../../lib/media/companion-selection.mjs";

const require = createRequire(import.meta.url);
// Reuse the DOM already pinned by the application's sanitizer dependency.
const { JSDOM } = createRequire(require.resolve("isomorphic-dompurify"))(
  "jsdom",
);
const source = readFileSync(
  new URL(
    "../../app/design-lab/collective/CompanionStudio.tsx",
    import.meta.url,
  ),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const loaded = { exports: {} };
let verification;
new Function("require", "module", "exports", compiled)(
  (name) => {
    if (name === "next/link")
      return { default: (props) => React.createElement("a", props) };
    if (name.endsWith(".css")) return { default: {} };
    if (name.startsWith("@/lib/media/"))
      return {
        ...selection,
        verifyReviewBundle: (...args) =>
          (verification = selection.verifyReviewBundle(...args)),
      };
    return require(name);
  },
  loaded,
  loaded.exports,
);
const Studio = loaded.exports.default;
const bytes = Buffer.from(
  "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
  "base64",
);
const hash = createHash("sha256").update(bytes).digest("hex");
const asset = {
  asset_id: "ast_focus",
  version_id: "ver_1",
  slug: "living-archive",
  title: "Focus fixture",
  category: "Scenes",
  role: "Archive",
  tags: [],
  entity_ids: ["candidate.fixture"],
  alt: "A fixture",
  review_note: "Test only",
  web: { sha256: hash, bytes: bytes.length, width: 1, height: 1 },
  rights: { status: "pending", third_party_characters: false },
};
const catalog = { collection_id: selection.COLLECTION_ID, assets: [asset] };
const bundle = {
  schema_version: 1,
  collection_id: selection.COLLECTION_ID,
  assets: [
    {
      asset_id: asset.asset_id,
      version_id: asset.version_id,
      web_sha256: hash,
      mime: "image/webp",
      data_base64: bytes.toString("base64"),
    },
  ],
};

for (const insideDialog of [false, true]) {
  test(`removing the selected card retains focus${insideDialog ? " after dialog close" : " in the grid"}`, async () => {
    const dom = new JSDOM("<!doctype html><div id='root'></div>", {
      url: "https://fixture.invalid",
    });
    const globals = {
      window: dom.window,
      document: dom.window.document,
      localStorage: dom.window.localStorage,
      IS_REACT_ACT_ENVIRONMENT: true,
    };
    const original = Object.fromEntries(
      Object.keys(globals).map((key) => [
        key,
        Object.getOwnPropertyDescriptor(globalThis, key),
      ]),
    );
    for (const [key, value] of Object.entries(globals))
      Object.defineProperty(globalThis, key, {
        configurable: true,
        writable: true,
        value,
      });
    let invokedBy;
    dom.window.HTMLDialogElement.prototype.showModal = function () {
      invokedBy = dom.window.document.activeElement;
      this.setAttribute("open", "");
      this.querySelector("button").focus();
    };
    dom.window.HTMLDialogElement.prototype.close = function () {
      this.removeAttribute("open");
      if (invokedBy?.isConnected) invokedBy.focus();
      this.dispatchEvent(new dom.window.Event("close"));
    };
    const { createRoot } = await import("react-dom/client");
    const root = createRoot(dom.window.document.getElementById("root"));
    const button = (text, scope = dom.window.document) =>
      [...scope.querySelectorAll("button")].find(
        (element) => element.textContent.trim() === text,
      );
    const click = async (element) => {
      assert.ok(element);
      await act(async () => {
        element.focus();
        element.click();
      });
    };
    try {
      await act(async () =>
        root.render(React.createElement(Studio, { catalog })),
      );
      await click(button("Add to brief"));
      const input = dom.window.document.querySelector(
        '[aria-label="Review bundle"]',
      );
      Object.defineProperty(input, "files", {
        value: [{ size: 1000, text: async () => JSON.stringify(bundle) }],
      });
      await act(async () => {
        input.dispatchEvent(new dom.window.Event("change", { bubbles: true }));
        await Promise.resolve();
        await verification;
      });
      await click(button("Selected only"));
      const dialog = dom.window.document.querySelector("dialog");
      if (insideDialog) {
        await click(
          dom.window.document.querySelector(
            '[aria-label="Inspect Focus fixture"]',
          ),
        );
        assert.equal(dialog.open, true);
      }
      const scope = insideDialog
        ? dialog
        : dom.window.document.querySelector("article");
      await click(button("Remove from brief", scope));
      if (insideDialog) {
        assert.equal(
          dialog.open,
          true,
          "Removal must not close or leave the modal",
        );
        assert.ok(dialog.contains(dom.window.document.activeElement));
        await act(async () => dialog.close());
      }
      assert.equal(dom.window.document.querySelectorAll("article").length, 0);
      assert.ok(
        dom.window.document.activeElement === button("Selected only"),
        "Focus must return to the selection filter",
      );
    } finally {
      await act(async () => root.unmount());
      dom.window.close();
      for (const [key, descriptor] of Object.entries(original)) {
        if (descriptor) Object.defineProperty(globalThis, key, descriptor);
        else delete globalThis[key];
      }
    }
  });
}
