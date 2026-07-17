#!/usr/bin/env python3
"""Re-resolve heroes after v11 generation and rebuild master registry."""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
PUBLIC = ROOT / "public"
BLOG = ROOT / "content" / "blog"


def main() -> None:
    # re-run first-pass style resolution lightly on master if exists else 2026 file
    src = OUT / "article-registry-master.json"
    if not src.exists():
        src = OUT / "article-registry-2026-07-15.json"
    articles = json.loads(src.read_text(encoding="utf-8"))

    # index images
    files = [
        p
        for p in (PUBLIC / "images" / "blog").rglob("*")
        if p.is_file() and p.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"}
    ]

    v11_count = 0
    for a in articles:
        slug = a["slug"].split("/")[-1]
        # prefer v11
        v11 = PUBLIC / "images" / "blog" / f"{slug}-hero-v11.jpg"
        if v11.exists():
            rel = f"/images/blog/{slug}-hero-v11.jpg"
            a["resolved_hero"] = rel
            a["hero_path_final"] = rel
            a["image"] = rel
            a["image_file_exists"] = True
            a["header_class"] = "premium_raster"
            a["visual_review_status"] = "generated_v11_awaiting_qa"
            a["action_needed"] = "audit_content_accuracy"
            a["priority_score"] = max(int(a.get("priority_score") or 0) - 30, 5)
            a["opsHeroProvider"] = "nano-banana"
            a["prompt_used"] = a.get("prompt_used") or ""
            plog = OUT / "prompt-log" / f"{slug}.md"
            if plog.exists():
                a["prompt_used"] = plog.read_text(encoding="utf-8")[:500]
            v11_count += 1
            continue

        # else re-check existing image field
        img = a.get("image") or a.get("resolved_hero") or ""
        if img and (PUBLIC / str(img).lstrip("/")).exists():
            a["image_file_exists"] = True
            a["resolved_hero"] = img
            a["hero_path_final"] = img
            if str(img).endswith(".svg") or "visual-system" in str(img):
                a["header_class"] = "svg_or_visual_system"
                a["action_needed"] = "replace_svg_header"
                a["visual_review_status"] = "fail_svg_slop_risk"
            elif "premium" in str(img) or "generated" in str(img) or "-v1" in str(img):
                a["header_class"] = "premium_raster" if "premium" in str(img) or "generated" in str(img) else "raster_other"
            else:
                a["header_class"] = a.get("header_class") or "raster_other"
        else:
            # fuzzy
            cands = [p for p in files if slug.lower() in p.stem.lower()]
            if cands:
                # prefer non-svg
                cands.sort(key=lambda p: (p.suffix == ".svg", len(p.name)))
                rel = "/" + cands[0].relative_to(PUBLIC).as_posix()
                a["resolved_hero"] = rel
                a["hero_path_final"] = rel
                a["image_file_exists"] = True
                if rel.endswith(".svg") or "visual-system" in rel:
                    a["header_class"] = "svg_or_visual_system"
                    a["action_needed"] = "replace_svg_header"
                else:
                    a["header_class"] = "raster_other"
                    a["action_needed"] = "audit_content_accuracy"
            else:
                a["header_class"] = "missing"
                a["action_needed"] = "generate_hero+wire_frontmatter"
                a["visual_review_status"] = "fail_missing_hero"
                a["image_file_exists"] = False

    src.write_text(json.dumps(articles, indent=2, ensure_ascii=False), encoding="utf-8")
    print("v11_count", v11_count)
    print(
        "missing",
        sum(1 for a in articles if a.get("header_class") == "missing"),
    )
    print(
        "svg",
        sum(1 for a in articles if a.get("header_class") == "svg_or_visual_system"),
    )
    # rebuild master artifacts via builder if present
    builder = OUT / "build_master_registry.py"
    # builder expects article-registry-2026-07-15.json — sync
    (OUT / "article-registry-2026-07-15.json").write_text(
        json.dumps(articles, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    subprocess.check_call(["python", str(builder)], cwd=ROOT)
    print("rebuilt master")


if __name__ == "__main__":
    main()
