#!/usr/bin/env python3
"""Deterministically compose FrankX pilot Open Graph cards with FFmpeg.

This is post-production typography, not image-model typography. It produces review
artifacts only; it never changes website source, metadata, or publishing state.
"""
from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / "assets"
OUTPUT = ROOT / "social"
FONT_BOLD = "C\\:/Windows/Fonts/arialbd.ttf"
FONT_REGULAR = "C\\:/Windows/Fonts/arial.ttf"

CARDS = [
    {
        "id": "01-acos-studio-that-remembers",
        "kicker": "FRANKX  /  CREATOR SYSTEMS",
        "headline": ["THE COMPLETE GUIDE TO", "AGENTIC CREATOR OS"],
        "headline_size": 47,
        "article_lines": ["The Complete Guide to", "Agentic Creator OS v6"],
        "support": "Build a system that remembers how you work.",
        "accent": "0x10b981",
    },
    {
        "id": "02-production-demo-to-responsibility",
        "kicker": "FRANKX  /  AI ARCHITECTURE",
        "headline": ["A DEMO IS NOT A", "PRODUCTION SYSTEM"],
        "headline_size": 48,
        "article_lines": ["Enterprise Agentic Architecture", "Decision Framework for Production"],
        "support": "The decisions that make agentic systems hold.",
        "accent": "0x06b6d4",
    },
    {
        "id": "03-golden-age-one-person-studio-scale",
        "kicker": "FRANKX  /  CREATOR ECONOMY",
        "headline": ["THE GOLDEN AGE", "OF CREATORS"],
        "headline_size": 54,
        "article_lines": ["The Golden Age of Creators", "Why Now Is Different"],
        "support": "One person. A real studio. A wider possible world.",
        "accent": "0xf59e0b",
    },
]


def esc(text: str) -> str:
    return text.replace("\\", "\\\\").replace("'", "\\'").replace(":", "\\:").replace("%", "\\%")


def text(font: str, value: str, x: int, y: int, size: int, color: str) -> str:
    return f"drawtext=fontfile='{font}':text='{esc(value)}':x={x}:y={y}:fontsize={size}:fontcolor={color}"


def render(card: dict) -> Path:
    source = ASSETS / f"{card['id']}.png"
    destination = OUTPUT / f"{card['id']}-og.png"
    filters = [
        "scale=1200:675",
        "crop=1200:630:0:22",
        "drawbox=x=0:y=0:w=650:h=630:color=0x050c14@0.76:t=fill",
        f"drawbox=x=64:y=64:w=38:h=4:color={card['accent']}:t=fill",
        text(FONT_BOLD, card["kicker"], 118, 51, 17, "0xdbe5ef"),
        text(FONT_BOLD, card["headline"][0], 64, 145, card["headline_size"], "white"),
        text(FONT_BOLD, card["headline"][1], 64, 209, card["headline_size"], "white"),
        text(FONT_REGULAR, card["support"], 64, 315, 25, "0xd8e0e8"),
        f"drawbox=x=64:y=515:w=370:h=3:color={card['accent']}:t=fill",
        text(FONT_REGULAR, card["article_lines"][0], 64, 535, 15, "0xb8c4d0"),
        text(FONT_REGULAR, card["article_lines"][1], 64, 555, 15, "0xb8c4d0"),
    ]
    subprocess.run(
        ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(source), "-vf", ",".join(filters), "-frames:v", "1", str(destination)],
        check=True,
    )
    return destination


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    rendered = [render(card) for card in CARDS]
    for path in rendered:
        print(path)


if __name__ == "__main__":
    main()
