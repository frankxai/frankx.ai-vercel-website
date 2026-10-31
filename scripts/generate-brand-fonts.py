#!/usr/bin/env python3
"""Regenerate pinned WOFF2 delivery files without networking or application dependencies.

Requires fontTools 4.68.0 and Brotli 1.2.1 in an isolated tooling environment.
The manifest pins both original input bytes and expected output bytes.
"""
from __future__ import annotations

import hashlib
import json
import os
import tempfile
from pathlib import Path

import brotli
import fontTools
from fontTools.ttLib import TTFont

FONTTOOLS_VERSION = "4.68.0"
BROTLI_VERSION = "1.2.1"
ROOT = Path(__file__).resolve().parents[1]
FONT_ROOT = ROOT / "public/fonts/brand"


def digest(path: Path) -> tuple[int, str]:
    data = path.read_bytes()
    return len(data), hashlib.sha256(data).hexdigest()


def main() -> None:
    if fontTools.__version__ != FONTTOOLS_VERSION or brotli.__version__ != BROTLI_VERSION:
        raise SystemExit(f"Expected fontTools {FONTTOOLS_VERSION} and Brotli {BROTLI_VERSION}")
    manifest = json.loads((FONT_ROOT / "FONT_PROVENANCE.json").read_text(encoding="utf-8"))
    generator = manifest["generator"]
    if generator["fontToolsVersion"] != FONTTOOLS_VERSION or generator["brotliVersion"] != BROTLI_VERSION:
        raise SystemExit("Manifest generator versions do not match this generator")

    # Verify every output before replacing any destination. Replacement is atomic per file.
    with tempfile.TemporaryDirectory(prefix=".font-generation-", dir=FONT_ROOT) as temporary:
        generated: list[tuple[Path, Path]] = []
        destinations: set[str] = set()
        for record in manifest["assets"]:
            delivery = record["delivery"]
            for name, suffix in [(record["path"], ".ttf"), (delivery["path"], ".woff2")]:
                if Path(name).name != name or not name.endswith(suffix):
                    raise SystemExit("Font paths must be filenames within the font directory")
            if delivery["path"] in destinations:
                raise SystemExit("Duplicate delivery destination")
            destinations.add(delivery["path"])
            source = FONT_ROOT / record["path"]
            if digest(source) != (record["bytes"], record["sha256"]):
                raise SystemExit(f"Source input does not match manifest: {record['path']}")
            if delivery["sourceInputSha256"] != record["sha256"]:
                raise SystemExit(f"Delivery source link does not match: {record['path']}")
            output = Path(temporary) / delivery["path"]
            with TTFont(source, recalcTimestamp=False) as font:
                font.flavor = "woff2"
                font.save(output, reorderTables=False)
            if digest(output) != (delivery["bytes"], delivery["sha256"]):
                raise SystemExit(f"Generated delivery does not match manifest: {delivery['path']}")
            generated.append((output, FONT_ROOT / delivery["path"]))
        for output, destination in generated:
            os.replace(output, destination)
    print(f"Verified and regenerated {len(generated)} WOFF2 delivery fonts")


if __name__ == "__main__":
    main()
