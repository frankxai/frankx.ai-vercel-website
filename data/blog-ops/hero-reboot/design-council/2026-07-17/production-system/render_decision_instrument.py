#!/usr/bin/env python3
"""Render FrankX decision-instrument assets with installed Microsoft Edge.

No image-model text, no remote fonts, no package install. Local HTML + local
OFL fonts are the source; Edge supplies deterministic rasterization.
"""

from __future__ import annotations

import shutil
import struct
import subprocess
import sys
import tempfile
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[6]
SOURCE = Path(__file__).with_name("decision-instrument-v2.html")
PROFILE = Path(__file__).with_name(".edge-render-profile")
QA_DIR = Path(__file__).with_name("qa")

EDGE_CANDIDATES = (
    Path("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"),
    Path("C:/Program Files/Microsoft/Edge/Application/msedge.exe"),
)

JOBS = (
    ("hero", 1600, 900, ROOT / "public/images/blog/production-agentic-ai-systems-hero-v3.png"),
    ("og", 1200, 630, ROOT / "public/images/blog/production-agentic-ai-systems-og-v3.png"),
    ("portrait", 1080, 1350, ROOT / "public/images/blog/production-agentic-ai-systems-portrait-v3.png"),
    ("story", 1080, 1920, ROOT / "public/images/blog/production-agentic-ai-systems-story-v3.png"),
)

THUMBS = (
    ("hero", 320, 180, QA_DIR / "hero-320x180.png"),
    ("og", 320, 168, QA_DIR / "og-320x168.png"),
)


def png_dimensions(path: Path) -> tuple[int, int]:
    with path.open("rb") as handle:
        header = handle.read(24)
    if header[:8] != b"\x89PNG\r\n\x1a\n":
        raise ValueError(f"Not a PNG: {path}")
    return struct.unpack(">II", header[16:24])


def find_edge() -> Path:
    edge = next((candidate for candidate in EDGE_CANDIDATES if candidate.exists()), None)
    if edge is None:
        raise FileNotFoundError("Microsoft Edge executable not found")
    return edge


def render_one(edge: Path, name: str, width: int, height: int, output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix=f"di-render-{name}-") as tmp:
        temp_out = Path(tmp) / f"{name}.png"
        command = [
            str(edge),
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            "--no-first-run",
            "--disable-features=msEdgeSidebarV2",
            f"--user-data-dir={PROFILE}",
            f"--window-size={width},{height}",
            "--force-device-scale-factor=1",
            # Fonts load via file:// + document.fonts; allow enough virtual time.
            "--virtual-time-budget=12000",
            f"--screenshot={temp_out.resolve()}",
            f"{SOURCE.resolve().as_uri()}?format={quote(name)}",
        ]
        result = subprocess.run(command, capture_output=True, text=True, timeout=90)
        if result.returncode != 0:
            sys.stderr.write(result.stdout or "")
            sys.stderr.write(result.stderr or "")
            raise RuntimeError(f"Edge render failed for {name} (code {result.returncode})")
        if not temp_out.exists() or temp_out.stat().st_size < 1024:
            raise RuntimeError(f"Screenshot missing or too small for {name}: {temp_out}")
        actual = png_dimensions(temp_out)
        if actual != (width, height):
            raise RuntimeError(f"Dimension mismatch for {name}: {actual} != {(width, height)}")
        # Atomic replace into final public path
        final_tmp = output.with_suffix(output.suffix + ".tmp")
        shutil.copy2(temp_out, final_tmp)
        final_tmp.replace(output)
        print(f"RENDERED {name:8s} {width}x{height} {output.relative_to(ROOT)} ({output.stat().st_size} bytes)")


def maybe_thumbs() -> None:
    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        print("THUMBS skipped (ffmpeg not on PATH)")
        return
    QA_DIR.mkdir(parents=True, exist_ok=True)
    sources = {name: path for name, _w, _h, path in JOBS}
    for name, width, height, out in THUMBS:
        src = sources[name]
        cmd = [
            ffmpeg,
            "-y",
            "-i",
            str(src),
            "-vf",
            f"scale={width}:{height}",
            str(out),
        ]
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
        if result.returncode != 0:
            raise RuntimeError(f"ffmpeg thumb failed for {name}: {result.stderr[-400:]}")
        actual = png_dimensions(out)
        if actual != (width, height):
            raise RuntimeError(f"Thumb dimension mismatch for {name}: {actual}")
        print(f"THUMB    {name:8s} {width}x{height} {out.relative_to(ROOT)}")


def main() -> int:
    if not SOURCE.exists():
        print(f"Source missing: {SOURCE}", file=sys.stderr)
        return 2
    for font in (
        SOURCE.parent / "fonts/poppins/Poppins-Bold.ttf",
        SOURCE.parent / "fonts/inter/Inter-Variable.ttf",
        SOURCE.parent / "fonts/jetbrains-mono/JetBrainsMono-Variable.ttf",
    ):
        if not font.exists():
            print(f"Local font missing: {font}", file=sys.stderr)
            return 2

    edge = find_edge()
    shutil.rmtree(PROFILE, ignore_errors=True)
    PROFILE.mkdir(parents=True, exist_ok=True)
    try:
        for name, width, height, output in JOBS:
            render_one(edge, name, width, height, output)
        maybe_thumbs()
    finally:
        shutil.rmtree(PROFILE, ignore_errors=True)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # noqa: BLE001 — CLI surface
        print(f"ERROR: {exc}", file=sys.stderr)
        raise SystemExit(1)
