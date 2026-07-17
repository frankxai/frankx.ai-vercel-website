#!/usr/bin/env python3
"""Sequential native Grok renderer for the approved FrankX header job cards.

Runs one image job at a time and regards a verified saved PNG as success even if
Grok returns a non-zero status after its final turn. It never edits articles,
frontmatter, or source code.
"""
from __future__ import annotations

import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
BATCH = Path(__file__).with_name("batch.json")
OUTPUT = ROOT / "public/images/blog/header-studio-2026-07-17"
RESULTS = Path(__file__).with_name("native-grok-results.json")


def render(job: dict) -> dict:
    output = OUTPUT / f"{job['id']}.png"
    if output.is_file() and output.stat().st_size > 10_000:
        return {"id": job["id"], "status": "skipped-existing", "output": str(output), "bytes": output.stat().st_size}

    instruction = (
        "Use native /imagine image generation now. Generate exactly one 16:9 master from this art direction "
        f"and save the rendered PNG at {output}. Create only that image file. Do not modify source code, "
        "article files, frontmatter, prompts, or any other asset. "
        f"Art direction: {job['prompt']}"
    )
    completed = subprocess.run(
        [
            "grok", "--single", instruction,
            "--always-approve", "--cwd", str(ROOT),
            "--output-format", "plain", "--max-turns", "6",
        ],
        text=True,
        capture_output=True,
        timeout=600,
    )
    exists = output.is_file() and output.stat().st_size > 10_000
    return {
        "id": job["id"],
        "slug": job["slug"],
        "status": "rendered" if exists else "failed",
        "output": str(output),
        "bytes": output.stat().st_size if exists else 0,
        "exitCode": completed.returncode,
        "tail": (completed.stdout + "\n" + completed.stderr)[-1200:],
    }


def main() -> int:
    first = int(sys.argv[1]) if len(sys.argv) > 1 else 2
    last = int(sys.argv[2]) if len(sys.argv) > 2 else 20
    payload = json.loads(BATCH.read_text(encoding="utf-8"))
    OUTPUT.mkdir(parents=True, exist_ok=True)
    jobs = payload["jobs"][first - 1:last]
    results = []
    for job in jobs:
        result = render(job)
        results.append(result)
        print(f"{result['id']}: {result['status']} ({result['bytes']} bytes)", flush=True)
    receipt = {
        "batchId": payload["batchId"],
        "renderedAt": datetime.now(timezone.utc).isoformat(),
        "range": [first, last],
        "mode": "sequential-native-grok",
        "results": results,
    }
    RESULTS.write_text(json.dumps(receipt, indent=2) + "\n", encoding="utf-8")
    return 0 if all(item["status"] != "failed" for item in results) else 1


if __name__ == "__main__":
    raise SystemExit(main())
