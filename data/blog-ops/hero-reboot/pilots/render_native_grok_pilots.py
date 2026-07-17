#!/usr/bin/env python3
"""Render one FrankX Hero Reboot pilot at a time with native Grok /imagine.

Source-frame exploration only. Never changes article frontmatter, source code, or deployment.
A saved image is the success signal because Grok may return non-zero after output exists.
"""
from __future__ import annotations

import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[5]
JOBS = Path(__file__).with_name("pilot-jobs.json")
OUTPUT = Path(__file__).with_name("assets")
RECEIPT = Path(__file__).with_name("native-grok-pilot-results.json")


def render(job: dict) -> dict:
    output = OUTPUT / f"{job['id']}.png"
    if output.is_file() and output.stat().st_size > 10_000:
        return {"id": job["id"], "status": "skipped-existing", "output": str(output), "bytes": output.stat().st_size}

    instruction = (
        "Use native /imagine image generation now. Generate exactly one 16:9 source-frame pilot and save the rendered PNG at "
        f"{output}. Create only that image file. Do not modify article files, frontmatter, source code, prompts, or any other asset. "
        f"Art direction: {job['prompt']}"
    )
    completed = subprocess.run(
        ["grok", "--single", instruction, "--always-approve", "--cwd", str(ROOT), "--output-format", "plain", "--max-turns", "6"],
        text=True,
        capture_output=True,
        timeout=600,
    )
    exists = output.is_file() and output.stat().st_size > 10_000
    return {
        "id": job["id"],
        "slug": job["slug"],
        "territory": job["territory"],
        "status": "rendered" if exists else "failed",
        "output": str(output),
        "bytes": output.stat().st_size if exists else 0,
        "exitCode": completed.returncode,
        "tail": (completed.stdout + "\n" + completed.stderr)[-1200:],
    }


def main() -> int:
    requested = set(sys.argv[1:])
    payload = json.loads(JOBS.read_text(encoding="utf-8"))
    OUTPUT.mkdir(parents=True, exist_ok=True)
    jobs = [job for job in payload["jobs"] if not requested or job["id"] in requested]
    results = []
    for job in jobs:
        result = render(job)
        results.append(result)
        print(f"{result['id']}: {result['status']} ({result['bytes']} bytes)", flush=True)
    RECEIPT.write_text(
        json.dumps({"batchId": payload["batchId"], "renderedAt": datetime.now(timezone.utc).isoformat(), "mode": "sequential-native-grok", "results": results}, indent=2) + "\n",
        encoding="utf-8",
    )
    return 0 if all(result["status"] != "failed" for result in results) else 1


if __name__ == "__main__":
    raise SystemExit(main())
