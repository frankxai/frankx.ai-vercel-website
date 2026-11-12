#!/usr/bin/env python3
"""Drive frankx.ai verification journeys against local next start or production.

See .cursor/skills/verify-frankx/SKILL.md.
"""

from __future__ import annotations

import argparse
import json
import os
import signal
import socket
import subprocess
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

DEFAULT_PORT = 3107

def _last_sunday(year: int, month: int) -> datetime:
    if month == 12:
        day = datetime(year + 1, 1, 1) - timedelta(days=1)
    else:
        day = datetime(year, month + 1, 1) - timedelta(days=1)
    return day - timedelta(days=(day.weekday() - 6) % 7)


def amsterdam_tz():
    """Europe/Amsterdam, with a stdlib CET/CEST fallback when tzdata is missing."""
    try:
        return ZoneInfo("Europe/Amsterdam")
    except ZoneInfoNotFoundError:
        utc_now = datetime.now(timezone.utc).replace(tzinfo=None)
        start = _last_sunday(utc_now.year, 3).replace(hour=1, minute=0, second=0)
        end = _last_sunday(utc_now.year, 10).replace(hour=1, minute=0, second=0)
        if start <= utc_now < end:
            return timezone(timedelta(hours=2), name="CEST")
        return timezone(timedelta(hours=1), name="CET")


AMSTERDAM = amsterdam_tz()

PROD_ORIGIN = "https://www.frankx.ai"
READY_PATH = "/legal/privacy"
READY_NEEDLES = ("Privacy Policy", "Frank Riemer")
VIEWPORTS = (("1280", 1280, 800), ("1024", 1024, 800), ("375", 375, 812))
JOURNEYS = ("golden-age", "prompt-library", "blueprints", "legal-prose", "homepage")
CREATE_NEW_PROCESS_GROUP = 0x00000200


# ---------------------------------------------------------------------------
# Paths and time
# ---------------------------------------------------------------------------

def repo_root() -> Path:
    here = Path(__file__).resolve()
    for candidate in [here.parent, *here.parents]:
        if (candidate / "package.json").is_file() and (
            (candidate / "next.config.mjs").is_file()
            or (candidate / "next.config.js").is_file()
        ):
            return candidate
    raise SystemExit("Could not find the frankx.ai repo root from this script.")


def amsterdam_now() -> datetime:
    return datetime.now(AMSTERDAM)


def amsterdam_date() -> str:
    return amsterdam_now().strftime("%Y-%m-%d")


def iso_amsterdam() -> str:
    return amsterdam_now().isoformat(timespec="seconds")


def git_sha(root: Path) -> str:
    return (
        subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=root, text=True)
        .strip()
    )


def short_sha(sha: str) -> str:
    return sha[:12]


def read_build_id(root: Path) -> str | None:
    path = root / ".next" / "BUILD_ID"
    if not path.is_file():
        return None
    return path.read_text(encoding="utf-8").strip() or None


def run_dir(root: Path) -> Path:
    path = root / ".verify-run"
    path.mkdir(parents=True, exist_ok=True)
    return path


def pid_path(root: Path, port: int) -> Path:
    return run_dir(root) / f"next-start-{port}.json"


def log_path(root: Path, port: int) -> Path:
    return run_dir(root) / f"next-start-{port}.log"


def build_meta_path(root: Path) -> Path:
    return run_dir(root) / "build-meta.json"


def default_evidence_dir(root: Path, sha: str) -> Path:
    override = os.environ.get("VERIFY_EVIDENCE_DIR")
    if override:
        return Path(override)
    return root / ".verify-evidence" / f"{amsterdam_date()}-{short_sha(sha)}"


def write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


def read_json(path: Path) -> dict[str, Any] | None:
    if not path.is_file():
        return None
    return json.loads(path.read_text(encoding="utf-8"))


def which_pnpm() -> str:
    for name in ("pnpm", "pnpm.cmd", "pnpm.exe"):
        path = shutil_which(name)
        if path:
            return path
    raise SystemExit("pnpm is not on PATH. Install pnpm 10.28.0 and retry.")


def shutil_which(name: str) -> str | None:
    import shutil

    return shutil.which(name)

def run_capture(args: list[str]) -> str:
    """Run a process and decode stdout with the Windows OEM code page when needed."""
    encoding = "oem" if os.name == "nt" else "utf-8"
    return subprocess.check_output(
        args,
        stderr=subprocess.DEVNULL,
        encoding=encoding,
        errors="replace",
    )


# ---------------------------------------------------------------------------
# Process / port helpers
# ---------------------------------------------------------------------------

def pid_is_running(pid: int) -> bool:
    if pid <= 0:
        return False
    if os.name == "nt":
        try:
            output = run_capture(
                ["tasklist", "/FI", f"PID eq {pid}", "/FO", "CSV", "/NH"],
            )
        except (subprocess.CalledProcessError, FileNotFoundError):
            return False
        return str(pid) in output and "No tasks" not in output and "keine Aufgaben" not in output.lower()
    try:
        os.kill(pid, 0)
    except OSError:
        return False
    return True


def parent_pid(pid: int) -> int | None:
    if os.name == "nt":
        try:
            output = run_capture(
                [
                    "powershell",
                    "-NoProfile",
                    "-Command",
                    f"(Get-CimInstance Win32_Process -Filter 'ProcessId={pid}').ParentProcessId",
                ],
            ).strip()
            return int(output) if output else None
        except (subprocess.CalledProcessError, ValueError, FileNotFoundError):
            return None
    stat = Path(f"/proc/{pid}/stat")
    if stat.is_file():
        try:
            parts = stat.read_text(encoding="utf-8").split()
            # comm can contain spaces inside parentheses; ppid is the field after ')'.
            close = " ".join(parts).rfind(")")
            rest = " ".join(parts)[close + 1 :].split()
            return int(rest[1])
        except (ValueError, IndexError, OSError):
            return None
    # POSIX without procfs (macOS): ask ps for the parent.
    try:
        output = run_capture(["ps", "-o", "ppid=", "-p", str(pid)]).strip()
        return int(output) if output else None
    except (subprocess.CalledProcessError, ValueError, FileNotFoundError):
        return None


def process_start_fingerprint(pid: int) -> str | None:
    """Stable per-process-instance identity, so a recycled PID is never
    mistaken for the process this script recorded at launch."""
    if pid <= 0:
        return None
    if os.name == "nt":
        try:
            import ctypes

            kernel32 = ctypes.windll.kernel32  # type: ignore[attr-defined]
            handle = kernel32.OpenProcess(0x1000, False, pid)  # PROCESS_QUERY_LIMITED_INFORMATION
            if not handle:
                return None
            try:
                creation = ctypes.c_ulonglong(0)
                exit_time = ctypes.c_ulonglong(0)
                kernel = ctypes.c_ulonglong(0)
                user = ctypes.c_ulonglong(0)
                if not kernel32.GetProcessTimes(
                    handle,
                    ctypes.byref(creation),
                    ctypes.byref(exit_time),
                    ctypes.byref(kernel),
                    ctypes.byref(user),
                ):
                    return None
                return f"win:{creation.value}"
            finally:
                kernel32.CloseHandle(handle)
        except Exception:  # noqa: BLE001 — identity is best-effort, never a crash
            return None
    stat = Path(f"/proc/{pid}/stat")
    if stat.is_file():
        try:
            text = stat.read_text(encoding="utf-8")
            rest = text[text.rfind(")") + 1 :].split()
            # rest[0] is state (field 3); starttime is field 22 => rest[19].
            return f"proc:{rest[19]}"
        except (IndexError, OSError):
            return None
    try:
        output = run_capture(["ps", "-o", "lstart=", "-p", str(pid)]).strip()
        return f"ps:{output}" if output else None
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None


def is_descendant(pid: int, ancestor: int) -> bool:
    if pid == ancestor:
        return True
    seen: set[int] = set()
    current = pid
    while current and current not in seen:
        seen.add(current)
        current_parent = parent_pid(current)
        if current_parent is None:
            return False
        if current_parent == ancestor:
            return True
        current = current_parent
    return False


def listening_pids(port: int) -> list[int]:
    pids: set[int] = set()
    if os.name == "nt":
        try:
            output = run_capture(["netstat", "-ano", "-p", "tcp"])
        except (subprocess.CalledProcessError, FileNotFoundError):
            return []
        token = f":{port}"
        for line in output.splitlines():
            if "LISTENING" not in line.upper() and "ABHÖREN" not in line.upper():
                # German Windows uses ABHÖREN; also match LISTEN.
                if "LISTEN" not in line.upper():
                    continue
            if token not in line:
                continue
            # Require the port as a local address component (":3107 " or ":3107\t").
            parts = line.split()
            if len(parts) < 2:
                continue
            local = parts[1] if parts[0].upper() in {"TCP", "UDP"} else parts[0]
            if not local.endswith(f":{port}"):
                continue
            try:
                pids.add(int(parts[-1]))
            except ValueError:
                continue
        return sorted(pids)

    # POSIX: prefer ss, then lsof, then /proc/net.
    if shutil_which("ss"):
        try:
            output = subprocess.check_output(
                ["ss", "-ltnp", f"sport = :{port}"],
                text=True,
                stderr=subprocess.DEVNULL,
            )
        except (subprocess.CalledProcessError, FileNotFoundError):
            output = ""
        import re

        for match in re.finditer(r"pid=(\d+)", output):
            pids.add(int(match.group(1)))
        if pids:
            return sorted(pids)
    if shutil_which("lsof"):
        try:
            output = subprocess.check_output(
                ["lsof", "-nP", f"-iTCP:{port}", "-sTCP:LISTEN", "-t"],
                text=True,
                stderr=subprocess.DEVNULL,
            )
            for line in output.splitlines():
                line = line.strip()
                if line.isdigit():
                    pids.add(int(line))
        except (subprocess.CalledProcessError, FileNotFoundError):
            pass
        if pids:
            return sorted(pids)
    # /proc fallback for hosts with neither ss nor lsof: find LISTEN socket
    # inodes for this port, then map them to owning processes via fd links.
    inodes: set[str] = set()
    for table in ("/proc/net/tcp", "/proc/net/tcp6"):
        try:
            rows = Path(table).read_text(encoding="utf-8", errors="replace").splitlines()[1:]
        except OSError:
            continue
        for row in rows:
            fields = row.split()
            if len(fields) < 10 or fields[3] != "0A":
                continue
            try:
                local_port = int(fields[1].rsplit(":", 1)[1], 16)
            except (IndexError, ValueError):
                continue
            if local_port == port:
                inodes.add(fields[9])
    if inodes:
        targets = {f"socket:[{inode}]" for inode in inodes}
        try:
            proc_entries = list(Path("/proc").iterdir())
        except OSError:
            proc_entries = []
        for entry in proc_entries:
            if not entry.name.isdigit():
                continue
            try:
                fds = list((entry / "fd").iterdir())
            except OSError:
                continue
            for fd in fds:
                try:
                    if os.readlink(fd) in targets:
                        pids.add(int(entry.name))
                        break
                except OSError:
                    continue
    return sorted(pids)


def port_free(port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        try:
            sock.bind(("127.0.0.1", port))
        except OSError:
            return False
    return True


def http_get(url: str, timeout: float = 8.0) -> tuple[int, str]:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "verify-frankx/1.0"},
        method="GET",
    )
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            body = response.read().decode("utf-8", errors="replace")
            return int(response.status), body
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace") if exc.fp else ""
        return int(exc.code), body
    except Exception as exc:  # noqa: BLE001 — doctor/ready must report any fetch error
        raise RuntimeError(f"GET {url} failed: {exc}") from exc


def ready_ok(origin: str) -> tuple[bool, dict[str, Any]]:
    url = origin.rstrip("/") + READY_PATH
    try:
        status, body = http_get(url)
    except RuntimeError as exc:
        return False, {"url": url, "error": str(exc)}
    missing = [needle for needle in READY_NEEDLES if needle not in body]
    ok = status == 200 and not missing
    return ok, {
        "url": url,
        "status": status,
        "missingNeedles": missing,
        "bodyChars": len(body),
    }


# ---------------------------------------------------------------------------
# Launch / doctor / cleanup
# ---------------------------------------------------------------------------

def write_build_meta(root: Path, sha: str, build_id: str) -> dict[str, Any]:
    meta = {
        "gitSha": sha,
        "buildId": build_id,
        "builtAt": iso_amsterdam(),
        "buildIdPath": ".next/BUILD_ID",
        "note": "Local mapping only. No public SHA endpoint is exposed.",
    }
    write_json(build_meta_path(root), meta)
    return meta


def load_build_meta(root: Path) -> dict[str, Any] | None:
    return read_json(build_meta_path(root))


def run_build(root: Path, origin: str) -> dict[str, Any]:
    env = os.environ.copy()
    env["NEXT_TELEMETRY_DISABLED"] = "1"
    env["NEXT_PUBLIC_SITE_URL"] = origin
    # Do not invent secrets. If a leftover .env.local exists, Next will load it;
    # the skill tells the operator not to copy one in.
    log = run_dir(root) / "next-build.log"
    pnpm = which_pnpm()
    with log.open("w", encoding="utf-8") as handle:
        handle.write(f"# build started {iso_amsterdam()}\n")
        handle.flush()
        proc = subprocess.run(
            [pnpm, "run", "build"],
            cwd=root,
            env=env,
            stdout=handle,
            stderr=subprocess.STDOUT,
            check=False,
        )
    if proc.returncode != 0:
        tail = log.read_text(encoding="utf-8", errors="replace")[-4000:]
        raise SystemExit(f"pnpm run build failed (exit {proc.returncode}). Log: {log}\n{tail}")
    sha = git_sha(root)
    build_id = read_build_id(root)
    if not build_id:
        raise SystemExit("Build finished but .next/BUILD_ID is missing.")
    return write_build_meta(root, sha, build_id)


def start_server(root: Path, port: int) -> dict[str, Any]:
    env = os.environ.copy()
    env["NEXT_TELEMETRY_DISABLED"] = "1"
    env["NEXT_PUBLIC_SITE_URL"] = f"http://127.0.0.1:{port}"
    pnpm = which_pnpm()
    log = log_path(root, port)
    handle = log.open("w", encoding="utf-8")
    handle.write(f"# next start {iso_amsterdam()} port={port}\n")
    handle.flush()
    kwargs: dict[str, Any] = {
        "cwd": root,
        "env": env,
        "stdout": handle,
        "stderr": subprocess.STDOUT,
    }
    if os.name == "nt":
        kwargs["creationflags"] = CREATE_NEW_PROCESS_GROUP
    else:
        kwargs["start_new_session"] = True
    proc = subprocess.Popen(
        [pnpm, "exec", "next", "start", "-H", "127.0.0.1", "-p", str(port)],
        **kwargs,
    )
    record = {
        "launchPid": proc.pid,
        "launchPidFingerprint": process_start_fingerprint(proc.pid),
        "portPid": None,
        "portPidFingerprint": None,
        "port": port,
        "host": "127.0.0.1",
        "baseUrl": f"http://127.0.0.1:{port}",
        "startedAt": iso_amsterdam(),
        "logPath": str(log),
        "gitSha": git_sha(root),
        "buildId": read_build_id(root),
        "popenAlive": True,
    }
    write_json(pid_path(root, port), record)
    deadline = time.time() + 120
    last_ready: dict[str, Any] = {}
    while time.time() < deadline:
        if proc.poll() is not None:
            handle.close()
            tail = log.read_text(encoding="utf-8", errors="replace")[-4000:]
            raise SystemExit(
                f"next start exited {proc.returncode} before becoming ready. Log: {log}\n{tail}"
            )
        owners = listening_pids(port)
        if owners:
            record["portPid"] = owners[0]
            record["portPidFingerprint"] = process_start_fingerprint(owners[0])
            write_json(pid_path(root, port), record)
        ok, last_ready = ready_ok(record["baseUrl"])
        if ok:
            owners = listening_pids(port) or owners
            if owners:
                record["portPid"] = owners[0]
                record["portPidFingerprint"] = process_start_fingerprint(owners[0])
            record["ready"] = last_ready
            record["readyAt"] = iso_amsterdam()
            write_json(pid_path(root, port), record)
            handle.close()
            return record
        time.sleep(1.0)
    handle.close()
    raise SystemExit(
        f"next start on port {port} did not pass the ready probe within 120s. "
        f"Last probe: {json.dumps(last_ready)} Log: {log}"
    )


def doctor_local(root: Path, port: int) -> dict[str, Any]:
    result: dict[str, Any] = {
        "target": "local",
        "port": port,
        "ok": False,
        "checks": {},
    }
    record = read_json(pid_path(root, port))
    if not record:
        result["error"] = f"No PID file at {pid_path(root, port)}"
        return result
    result["pidFile"] = record
    launch_pid = int(record.get("launchPid") or 0)
    running = pid_is_running(launch_pid)
    result["checks"]["launchPidRunning"] = {"ok": running, "pid": launch_pid}
    owners = listening_pids(port)
    result["checks"]["portListeners"] = {"pids": owners, "port": port}
    owned = False
    owner_match: int | None = None
    for owner in owners:
        if owner == launch_pid or is_descendant(owner, launch_pid):
            owned = True
            owner_match = owner
            break
    result["checks"]["portOwnedByOurPid"] = {
        "ok": owned,
        "owner": owner_match,
        "launchPid": launch_pid,
    }
    sha = git_sha(root)
    build_id = read_build_id(root)
    meta = load_build_meta(root)
    sha_ok = bool(meta and meta.get("gitSha") == sha and meta.get("buildId") == build_id)
    result["checks"]["buildSha"] = {
        "ok": sha_ok,
        "headSha": sha,
        "diskBuildId": build_id,
        "recorded": meta,
        "note": "Mapped via .next/BUILD_ID and .verify-run/build-meta.json. No public endpoint.",
    }
    # The running server must serve the build recorded at its own launch. A
    # later rebuild replaces .next on disk; without this binding, doctor would
    # bless the new build metadata while the retained server still serves the
    # old one, and its responses would be reused as evidence for the new SHA.
    server_build_ok = bool(record.get("gitSha") == sha and record.get("buildId") == build_id)
    result["checks"]["serverBuild"] = {
        "ok": server_build_ok,
        "launched": {"gitSha": record.get("gitSha"), "buildId": record.get("buildId")},
        "current": {"gitSha": sha, "buildId": build_id},
        "note": "PID record build identity must equal the current disk build.",
    }
    ok_ready, ready = ready_ok(f"http://127.0.0.1:{port}")
    result["checks"]["readyProbe"] = {"ok": ok_ready, **ready}
    result["ok"] = running and owned and sha_ok and server_build_ok and ok_ready
    return result


def doctor_prod() -> dict[str, Any]:
    ok, ready = ready_ok(PROD_ORIGIN)
    return {
        "target": "prod",
        "ok": ok,
        "checks": {
            "readyProbe": {"ok": ok, **ready},
            "buildSha": {
                "ok": None,
                "note": "Production build SHA is not confirmed: no public SHA endpoint exists, and this skill does not add one.",
            },
        },
    }


def kill_recorded_pids(record: dict[str, Any]) -> list[dict[str, Any]]:
    actions = []
    pids: list[tuple[int, str | None]] = []
    for key, fp_key in (("launchPid", "launchPidFingerprint"), ("portPid", "portPidFingerprint")):
        value = record.get(key)
        if isinstance(value, int) and value > 0 and all(value != seen for seen, _ in pids):
            fingerprint = record.get(fp_key)
            pids.append((value, fingerprint if isinstance(fingerprint, str) else None))
    for pid, fingerprint in pids:
        action: dict[str, Any] = {"pid": pid, "killed": False}
        if not pid_is_running(pid):
            action["alreadyDead"] = True
            actions.append(action)
            continue
        # A numeric PID alone is not identity: the OS recycles PIDs. Signal
        # only the process instance recorded at launch.
        current = process_start_fingerprint(pid)
        if fingerprint is None or current != fingerprint:
            action["skippedIdentityMismatch"] = {"recorded": fingerprint, "current": current}
            actions.append(action)
            continue
        try:
            if os.name == "nt":
                subprocess.run(
                    ["taskkill", "/PID", str(pid), "/T", "/F"],
                    check=False,
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                )
            else:
                try:
                    os.killpg(pid, signal.SIGTERM)
                except OSError:
                    os.kill(pid, signal.SIGTERM)
                deadline = time.time() + 8
                while time.time() < deadline and pid_is_running(pid):
                    time.sleep(0.2)
                if pid_is_running(pid):
                    try:
                        os.killpg(pid, signal.SIGKILL)
                    except OSError:
                        os.kill(pid, signal.SIGKILL)
            action["killed"] = not pid_is_running(pid)
        except OSError as exc:
            action["error"] = str(exc)
        actions.append(action)
    return actions


def cleanup_local(root: Path, port: int) -> dict[str, Any]:
    path = pid_path(root, port)
    record = read_json(path)
    if not record:
        return {"ok": True, "note": "No PID file; nothing to kill.", "port": port}
    actions = kill_recorded_pids(record)
    # Remove the PID file only after signaling. Evidence is not in this directory.
    if path.exists():
        path.unlink()
    return {"ok": True, "port": port, "actions": actions, "removedPidFile": str(path)}


def stop_other_recorded_servers(root: Path, keep_port: int) -> list[dict[str, Any]]:
    """Stop recorded servers on other ports of this same checkout.

    Every local server here serves the one shared `.next` build, so a
    rebuild for this port would corrupt any retained server on another
    port. Stop them all before touching the build.
    """
    stopped: list[dict[str, Any]] = []
    for path in sorted(run_dir(root).glob("next-start-*.json")):
        record = read_json(path)
        other = record.get("port") if record else None
        if not isinstance(other, int):
            try:
                other = int(path.stem.rsplit("-", 1)[1])
            except (IndexError, ValueError):
                continue
        if other != keep_port:
            stopped.append(cleanup_local(root, other))
    return stopped


def ensure_local(root: Path, port: int, rebuild: bool) -> dict[str, Any]:
    origin = f"http://127.0.0.1:{port}"
    existing = doctor_local(root, port)
    if existing["ok"] and not rebuild:
        return {"reused": True, "doctor": existing, "baseUrl": origin}
    if existing.get("pidFile"):
        # Any recorded instance that is not being reused (stale, mismatched, or
        # a forced rebuild) is stopped before we touch the shared .next build
        # or the port. Rebuilding under a retained server would corrupt its
        # build, and relaunching first would clobber the recorded launch PID.
        cleanup_local(root, port)
    if not port_free(port):
        owners = listening_pids(port)
        raise SystemExit(
            f"Port {port} is already in use by PIDs {owners}, and it is not a "
            "doctor-clean instance we started. Choose another --port."
        )
    sha = git_sha(root)
    meta = load_build_meta(root)
    build_id = read_build_id(root)
    need_build = rebuild or not build_id or not meta or meta.get("gitSha") != sha or meta.get("buildId") != build_id
    if need_build:
        stopped = stop_other_recorded_servers(root, port)
        if stopped:
            print(f"Stopped recorded servers on other ports before rebuild: {json.dumps(stopped)}", flush=True)
        print(f"Building production bundle for {short_sha(sha)}…", flush=True)
        run_build(root, origin)
    else:
        print(f"Reusing existing .next build {build_id} for {short_sha(sha)}.", flush=True)
    print(f"Starting next start on 127.0.0.1:{port}…", flush=True)
    record = start_server(root, port)
    doctor = doctor_local(root, port)
    if not doctor["ok"]:
        cleanup_local(root, port)
        raise SystemExit(f"Doctor failed after launch: {json.dumps(doctor, indent=2)}")
    return {"reused": False, "doctor": doctor, "baseUrl": origin, "launch": record}


# ---------------------------------------------------------------------------
# Playwright driving
# ---------------------------------------------------------------------------

def visible_locator(page: Any, selector: str) -> Any:
    locator = page.locator(selector)
    total = locator.count()
    for index in range(total):
        item = locator.nth(index)
        if item.is_visible():
            return item
    return None


def box_of(locator: Any) -> dict[str, float] | None:
    if locator is None:
        return None
    box = locator.bounding_box()
    if not box:
        return None
    return {key: round(float(box[key]), 2) for key in box}


def overflow_metrics(page: Any) -> dict[str, Any]:
    data = page.evaluate(
        """() => ({
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            bodyScrollWidth: document.body ? document.body.scrollWidth : null
        })"""
    )
    limit = int(data["clientWidth"]) + 1
    overflow = int(data["scrollWidth"]) > limit or (
        data["bodyScrollWidth"] is not None and int(data["bodyScrollWidth"]) > limit
    )
    data["horizontalOverflow"] = overflow
    return data



def heading_in_view(page: Any, selector: str, timeout: int = 4000) -> bool:
    loc = page.locator(selector)
    loc.wait_for()
    try:
        page.wait_for_function(
            """(sel) => {
                const el = document.querySelector(sel);
                if (!el) return false;
                const r = el.getBoundingClientRect();
                return r.top < window.innerHeight && r.bottom > 0;
            }""",
            arg=selector,
            timeout=timeout,
        )
        return True
    except Exception:
        return bool(
            loc.evaluate(
                """el => {
                    const r = el.getBoundingClientRect();
                    return r.top < window.innerHeight && r.bottom > 0;
                }"""
            )
        )


def panel_sliver(box: dict[str, float] | None, width: int) -> float:
    """How many CSS pixels of a right-fixed panel remain inside the viewport."""
    if not box:
        return 0.0
    if box["x"] >= width:
        return 0.0
    if box["x"] + box["width"] <= 0:
        return 0.0
    if box["x"] > width * 0.5:
        return max(0.0, width - box["x"])
    return float(box["width"])


CH1_TITLED_ENTRY = "II. The History You Carry"
CH1_SKIPPED_NUMERALS = ("I.", "I", "XI.", "XI", "Section I", "Section XI")
CH2_SECTION_LABELS = [
    "Section I",
    "Section II",
    "Section III",
    "Section IV",
    "Section V",
    "Section VI",
    "Section VII",
    "Section VIII",
]


def panel_a11y(locator: Any) -> dict[str, str | None]:
    if locator is None:
        return {"inert": None, "ariaHidden": None}
    return {
        "inert": locator.get_attribute("inert"),
        "ariaHidden": locator.get_attribute("aria-hidden"),
    }


def assert_ch1_numeral_rule(labels: list[str], name: str, fail) -> None:
    if CH1_TITLED_ENTRY not in labels:
        fail(f"{name}: chapter 1 TOC missing '{CH1_TITLED_ENTRY}'")
    leftover = [label for label in labels if label in CH1_SKIPPED_NUMERALS]
    if leftover:
        fail(
            f"{name}: chapter 1 TOC still lists {leftover}; bare I./XI. must be skipped "
            "when the chapter also has titled headings"
        )


def screenshot(page: Any, path: Path) -> str:
    path.parent.mkdir(parents=True, exist_ok=True)
    page.screenshot(path=str(path), full_page=False)
    return str(path)


def launch_browser():
    from playwright.sync_api import sync_playwright

    playwright = sync_playwright().start()
    try:
        browser = playwright.chromium.launch(channel="chrome", headless=True)
    except Exception as exc:  # noqa: BLE001
        playwright.stop()
        raise SystemExit(
            "Could not launch system Chrome via Playwright channel='chrome'. "
            "Install Google Chrome and the Python Playwright package. "
            f"Original error: {exc}"
        ) from exc
    return playwright, browser


def new_page(browser: Any, width: int, height: int) -> Any:
    context = browser.new_context(
        viewport={"width": width, "height": height},
        device_scale_factor=1,
    )
    page = context.new_page()
    page.set_default_timeout(20000)
    return context, page


def drive_golden_age(page_factory, origin: str, out: Path) -> dict[str, Any]:
    results: dict[str, Any] = {"journey": "golden-age", "viewports": {}, "ok": True, "failures": []}
    ch1 = origin + "/golden-age/chapter-01-when-creation-calls"
    ch2 = origin + "/golden-age/chapter-02-the-orchestration-age"

    def fail(message: str) -> None:
        results["ok"] = False
        results["failures"].append(message)

    for name, width, height in VIEWPORTS:
        context, page = page_factory(width, height)
        vp: dict[str, Any] = {"width": width, "height": height}
        try:
            page.goto(ch1, wait_until="domcontentloaded")
            page.get_by_role("heading", level=1, name="When Creation Calls", exact=True).wait_for()
            vp["h1"] = page.get_by_role("heading", level=1, name="When Creation Calls", exact=True).inner_text()
            toggle = visible_locator(page, 'button[aria-label="Toggle table of contents"]')
            panel = visible_locator(page, "aside#toc-panel")
            # On mobile the closed panel may be in the DOM but translated off-screen.
            # is_visible() can still be true; use the box vs viewport.
            if panel is None:
                # Fall back to any in-DOM panel for closed-mobile measurements.
                if page.locator("aside#toc-panel").count():
                    panel = page.locator("aside#toc-panel").last
            panel_box = box_of(panel) if panel is not None else None
            on_screen = bool(
                panel_box
                and panel_box["x"] + panel_box["width"] > 0
                and panel_box["x"] < width
                and panel_box["y"] + panel_box["height"] > 0
            )
            labels = []
            if panel is not None:
                labels = [text.strip() for text in panel.locator("button").all_inner_texts() if text.strip()]
            vp["toggleVisible"] = bool(toggle and toggle.is_visible())
            vp["panelOnScreen"] = on_screen
            vp["panelBox"] = panel_box
            vp["tocLabels"] = labels
            desktop = width >= 1024
            if desktop:
                if not on_screen:
                    fail(f"{name}: desktop TOC panel is not on screen")
                if vp["toggleVisible"]:
                    fail(f"{name}: TOC toggle should be hidden on desktop")
                shot = screenshot(page, out / f"{name}-chapter-01-toc.png")
                vp["screenshots"] = {"toc": shot}
                assert_ch1_numeral_rule(labels, name, fail)
                a11y = panel_a11y(panel)
                vp["panelA11y"] = a11y
                if a11y["inert"] is not None or a11y["ariaHidden"] is not None:
                    fail(f"{name}: desktop TOC panel must omit inert and aria-hidden (got {a11y})")
                target = visible_locator(page, "aside#toc-panel")
                if target is None:
                    fail(f"{name}: no visible TOC panel to click")
                else:
                    target.get_by_role("button", name="II. The History You Carry", exact=True).click()
                    in_view = heading_in_view(page, "#ii-the-history-you-carry")
                    vp["jumpInView"] = bool(in_view)
                    vp["screenshots"]["afterJump"] = screenshot(page, out / f"{name}-chapter-01-after-jump.png")
                    if not in_view:
                        fail(f"{name}: jump target #ii-the-history-you-carry was not in view")
            else:
                if not vp["toggleVisible"]:
                    fail(f"{name}: mobile TOC toggle is not visible")
                sliver = panel_sliver(panel_box, width)
                vp["closedSliverPx"] = sliver
                closed_a11y = panel_a11y(panel)
                vp["panelA11yClosed"] = closed_a11y
                # Closed mobile uses translate-x-[calc(100%+1.5rem)] so right-6
                # does not leave a sliver. inert and aria-hidden apply only then.
                if panel_box is None or panel_box["x"] < width - 1:
                    fail(
                        f"{name}: closed mobile TOC is not fully off-screen "
                        f"(box={panel_box}, sliver={sliver}px)"
                    )
                if sliver > 1:
                    fail(f"{name}: closed mobile TOC sliver is {sliver}px; expected 0px")
                if closed_a11y["inert"] is None:
                    fail(f"{name}: closed mobile TOC must set inert")
                if closed_a11y["ariaHidden"] != "true":
                    fail(f"{name}: closed mobile TOC must set aria-hidden=true (got {closed_a11y})")
                vp["screenshots"] = {
                    "closed": screenshot(page, out / f"{name}-chapter-01-toc-closed.png")
                }
                if toggle is None:
                    fail(f"{name}: missing mobile toggle")
                else:
                    assert toggle.get_attribute("aria-expanded") in {None, "false"}
                    toggle.click()
                    page.wait_for_timeout(400)
                    toggle_after = visible_locator(page, 'button[aria-label="Toggle table of contents"]')
                    panel_after = visible_locator(page, "aside#toc-panel")
                    box_after = box_of(panel_after)
                    open_on_screen = bool(
                        box_after
                        and box_after["x"] + box_after["width"] > 0
                        and box_after["x"] < width
                    )
                    vp["expanded"] = toggle_after.get_attribute("aria-expanded") if toggle_after else None
                    vp["panelBoxOpen"] = box_after
                    vp["panelOnScreenOpen"] = open_on_screen
                    labels_open = []
                    if panel_after is not None:
                        labels_open = [
                            text.strip()
                            for text in panel_after.locator("button").all_inner_texts()
                            if text.strip()
                        ]
                    vp["tocLabelsOpen"] = labels_open
                    open_a11y = panel_a11y(panel_after)
                    vp["panelA11yOpen"] = open_a11y
                    vp["screenshots"]["open"] = screenshot(page, out / f"{name}-chapter-01-toc-open.png")
                    if not open_on_screen:
                        fail(f"{name}: mobile TOC panel did not open on screen")
                    assert_ch1_numeral_rule(labels_open, f"{name} open", fail)
                    if open_a11y["inert"] is not None or open_a11y["ariaHidden"] is not None:
                        fail(f"{name}: open mobile TOC must omit inert and aria-hidden (got {open_a11y})")
                    if panel_after is not None:
                        panel_after.get_by_role("button", name="II. The History You Carry", exact=True).click()
                        in_view = heading_in_view(page, "#ii-the-history-you-carry")
                        vp["jumpInView"] = bool(in_view)
                        vp["screenshots"]["afterJump"] = screenshot(
                            page, out / f"{name}-chapter-01-after-jump.png"
                        )
                        if not in_view:
                            fail(f"{name}: mobile jump target was not in view")

            # Numerals-only chapter at this width (one screenshot + non-empty TOC).
            if name == "1280":
                page.goto(ch2, wait_until="domcontentloaded")
                page.get_by_role("heading", level=1, name="The Orchestration Age", exact=True).wait_for()
                panel2 = visible_locator(page, "aside#toc-panel")
                labels2 = []
                if panel2 is not None:
                    labels2 = [text.strip() for text in panel2.locator("button").all_inner_texts() if text.strip()]
                vp["chapter2TocLabels"] = labels2
                vp["screenshots"]["chapter2"] = screenshot(page, out / f"{name}-chapter-02-toc.png")
                if labels2 != CH2_SECTION_LABELS:
                    fail(
                        "1280: chapter 2 TOC must be Section I–Section VIII "
                        f"(got {labels2})"
                    )
        finally:
            context.close()
        results["viewports"][name] = vp
    return results


def drive_prompt_library(page_factory, origin: str, out: Path) -> dict[str, Any]:
    results: dict[str, Any] = {"journey": "prompt-library", "viewports": {}, "ok": True, "failures": []}

    def fail(message: str) -> None:
        results["ok"] = False
        results["failures"].append(message)

    for name, width, height in VIEWPORTS:
        context, page = page_factory(width, height)
        vp: dict[str, Any] = {"width": width, "height": height}
        try:
            page.goto(origin + "/prompt-library", wait_until="domcontentloaded")
            page.get_by_role("heading", level=1, name="The Prompt Library").wait_for()
            unavailable = page.get_by_text("Live data unavailable").count() > 0
            links = page.locator('a[href^="/prompt-library/"]')
            hrefs = []
            for index in range(links.count()):
                href = links.nth(index).get_attribute("href") or ""
                if href.rstrip("/") != "/prompt-library":
                    hrefs.append(href)
            scripts = page.locator("article script, main script:not([type='application/ld+json'])")
            raw_script_text = page.get_by_text("<script").count() > 0
            vp.update(
                {
                    "liveUnavailable": unavailable,
                    "cardHrefs": hrefs[:12],
                    "cardCount": len(hrefs),
                    "injectedScriptTags": scripts.count(),
                    "rawScriptTextVisible": raw_script_text,
                    "screenshots": {"grid": screenshot(page, out / f"{name}-prompt-library.png")},
                }
            )
            if unavailable and not hrefs:
                fail(f"{name}: live corpus unavailable and no pattern cards rendered")
            if not hrefs and not unavailable:
                fail(f"{name}: no prompt-library card links")
            if scripts.count() > 0 or raw_script_text:
                fail(f"{name}: unsanitized script content detected in the library render")
            if name == "1280" and hrefs:
                copy = page.get_by_role("button", name="Copy Prompt")
                if copy.count() == 0:
                    page.goto(origin + hrefs[0], wait_until="domcontentloaded")
                    copy = page.get_by_role("button", name="Copy Prompt")
                    vp["openedPattern"] = hrefs[0]
                    vp["screenshots"]["pattern"] = screenshot(page, out / f"{name}-prompt-pattern.png")
                vp["copyPromptPresent"] = copy.count() > 0
                if copy.count():
                    copy.first.click()
                    vp["copyClicked"] = True
                    vp["screenshots"]["afterCopy"] = screenshot(page, out / f"{name}-prompt-after-copy.png")
        finally:
            context.close()
        results["viewports"][name] = vp
    return results


def drive_blueprints(page_factory, origin: str, out: Path) -> dict[str, Any]:
    results: dict[str, Any] = {"journey": "blueprints", "viewports": {}, "ok": True, "failures": []}

    def fail(message: str) -> None:
        results["ok"] = False
        results["failures"].append(message)

    for name, width, height in VIEWPORTS:
        context, page = page_factory(width, height)
        vp: dict[str, Any] = {"width": width, "height": height}
        try:
            page.goto(origin + "/blueprints", wait_until="domcontentloaded")
            heading = page.get_by_role("heading", level=1)
            heading.wait_for()
            text = heading.inner_text()
            vp["h1"] = text
            if "Architecture blueprints" not in text:
                fail(f"{name}: unexpected blueprints heading: {text!r}")
            grid = page.locator("#blueprint-cards")
            grid.wait_for()
            buttons = grid.get_by_role("button")
            vp["cardButtonCount"] = buttons.count()
            vp["screenshots"] = {"grid": screenshot(page, out / f"{name}-blueprints.png")}
            if buttons.count() == 0:
                fail(f"{name}: no blueprint card action buttons")
            elif name == "1280":
                buttons.first.click()
                page.wait_for_timeout(400)
                # BlueprintCheckoutModal renders plain divs (fixed overlay),
                # not role=dialog; detect the overlay markup it actually uses.
                overlay = page.locator("div.fixed.inset-0.z-50")
                vp["modalVisible"] = (
                    page.get_by_role("dialog").count() > 0
                    or page.locator("[role='dialog']").count() > 0
                    or (overlay.count() > 0 and overlay.first.is_visible())
                )
                vp["screenshots"]["modal"] = screenshot(page, out / f"{name}-blueprints-modal.png")
                # Close if a close control exists; never proceed to payment.
                closer = page.get_by_role("button", name="Close")
                if closer.count() == 0:
                    closer = page.locator('button[aria-label="Close"]')
                if closer.count():
                    closer.first.click()
                if not vp["modalVisible"]:
                    fail(f"{name}: checkout modal overlay not detected after card CTA click")
        finally:
            context.close()
        results["viewports"][name] = vp
    return results


def drive_legal_prose(page_factory, origin: str, out: Path) -> dict[str, Any]:
    results: dict[str, Any] = {"journey": "legal-prose", "viewports": {}, "ok": True, "failures": []}

    def fail(message: str) -> None:
        results["ok"] = False
        results["failures"].append(message)

    sibling_ok: dict[str, Any] = {}
    for name, width, height in VIEWPORTS:
        context, page = page_factory(width, height)
        vp: dict[str, Any] = {"width": width, "height": height}
        try:
            page.goto(origin + "/legal/privacy", wait_until="domcontentloaded")
            page.get_by_role("heading", level=1, name="Privacy Policy").wait_for()
            metrics = page.evaluate(
                """() => {
                    const article = document.querySelector('article.prose');
                    const h1 = document.querySelector('article h1');
                    const p = document.querySelector('article p');
                    if (!article || !h1) return { found: false };
                    const h1cs = getComputedStyle(h1);
                    const pcs = p ? getComputedStyle(p) : null;
                    return {
                        found: true,
                        classes: article.className,
                        hasProse: article.classList.contains('prose'),
                        hasInvert: article.classList.contains('prose-invert'),
                        hasZinc: article.classList.contains('prose-zinc'),
                        h1FontSize: h1cs.fontSize,
                        h1FontSizePx: parseFloat(h1cs.fontSize),
                        pFontSize: pcs ? pcs.fontSize : null,
                        pFontSizePx: pcs ? parseFloat(pcs.fontSize) : null,
                        h1Text: h1.textContent.trim()
                    };
                }"""
            )
            vp["typography"] = metrics
            vp["screenshots"] = {"privacy": screenshot(page, out / f"{name}-legal-privacy.png")}
            if not metrics.get("found") or not metrics.get("hasProse"):
                fail(f"{name}: article.prose not found on /legal/privacy")
            elif metrics.get("pFontSizePx") and not (
                metrics["h1FontSizePx"] > metrics["pFontSizePx"]
            ):
                fail(f"{name}: privacy h1 is not larger than body text")
            if name == "1280":
                for path, expect in (
                    ("/legal/terms", "Terms"),
                    ("/legal/imprint", "Imprint"),
                    ("/legal/refund", "Refund"),
                ):
                    page.goto(origin + path, wait_until="domcontentloaded")
                    info = page.evaluate(
                        """() => {
                            const article = document.querySelector('article.prose');
                            const h1 = document.querySelector('h1');
                            return {
                                hasProse: !!(article && article.classList.contains('prose')),
                                h1: h1 ? h1.textContent.trim() : null
                            };
                        }"""
                    )
                    sibling_ok[path] = info
                    if not info.get("hasProse") or not (info.get("h1") and expect.lower() in info["h1"].lower()):
                        fail(f"{path}: missing article.prose or expected h1 containing {expect}")
        finally:
            context.close()
        results["viewports"][name] = vp
    results["siblings"] = sibling_ok
    return results


def drive_homepage(page_factory, origin: str, out: Path) -> dict[str, Any]:
    results: dict[str, Any] = {"journey": "homepage", "viewports": {}, "ok": True, "failures": []}

    def fail(message: str) -> None:
        results["ok"] = False
        results["failures"].append(message)

    for name, width, height in VIEWPORTS:
        context, page = page_factory(width, height)
        vp: dict[str, Any] = {"width": width, "height": height}
        try:
            page.goto(origin + "/", wait_until="domcontentloaded")
            heading = page.locator('h1[aria-label="Build intelligence that compounds."]')
            heading.wait_for()
            cta = page.get_by_role("link", name="Inspect the Blueprints")
            cta.wait_for()
            href = cta.get_attribute("href") or ""
            secondary = page.get_by_role("link", name="Map the Ecosystem")
            overflow = overflow_metrics(page)
            cta_box = box_of(cta)
            vp.update(
                {
                    "h1AriaLabel": heading.get_attribute("aria-label"),
                    "primaryCtaHref": href,
                    "secondaryPresent": secondary.count() > 0,
                    "overflow": overflow,
                    "ctaBox": cta_box,
                    "screenshots": {"hero": screenshot(page, out / f"{name}-homepage.png")},
                }
            )
            if not href.endswith("/ai-architecture"):
                fail(f"{name}: primary CTA href is {href!r}, expected /ai-architecture")
            if width == 375 and overflow["horizontalOverflow"]:
                fail(
                    f"375: horizontal overflow (scrollWidth={overflow['scrollWidth']} "
                    f"clientWidth={overflow['clientWidth']})"
                )
            if width == 375 and cta_box and (cta_box["x"] < -1 or cta_box["x"] + cta_box["width"] > width + 1):
                fail("375: primary CTA is not fully inside the viewport horizontally")
        finally:
            context.close()
        results["viewports"][name] = vp
    return results


DRIVERS = {
    "golden-age": drive_golden_age,
    "prompt-library": drive_prompt_library,
    "blueprints": drive_blueprints,
    "legal-prose": drive_legal_prose,
    "homepage": drive_homepage,
}


def run_journey(journey: str, origin: str, out: Path) -> dict[str, Any]:
    playwright, browser = launch_browser()
    out.mkdir(parents=True, exist_ok=True)

    def factory(width: int, height: int):
        return new_page(browser, width, height)

    try:
        result = DRIVERS[journey](factory, origin, out)
    except Exception as exc:  # noqa: BLE001 — a raised driver must still leave a receipt
        result = {
            "journey": journey,
            "viewports": {},
            "ok": False,
            "failures": [f"driver raised {type(exc).__name__}: {exc}"],
        }
    finally:
        browser.close()
        playwright.stop()
    write_json(out / "measurements.json", result)
    return result


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Verify a frankx.ai journey against local next start or production."
    )
    parser.add_argument("--journey", choices=JOURNEYS, help="Named journey from the feature map.")
    parser.add_argument(
        "--target",
        choices=("local", "prod"),
        default="local",
        help="local launches or reuses a doctored next start; prod is https://www.frankx.ai (read-only).",
    )
    parser.add_argument("--port", type=int, default=DEFAULT_PORT, help="Local next start port (default 3107).")
    parser.add_argument("--evidence-dir", type=Path, default=None, help="Override evidence root.")
    parser.add_argument("--rebuild", action="store_true", help="Force a fresh production build before launch.")
    parser.add_argument("--keep-server", action="store_true", help="Do not kill the local server after the journey.")
    parser.add_argument("--doctor", action="store_true", help="Run the read-only doctor check and exit.")
    parser.add_argument("--cleanup", action="store_true", help="Kill only the PIDs recorded for --port and exit.")
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    root = repo_root()
    sha = git_sha(root)

    if args.cleanup:
        if args.target != "local":
            print("Production has no local process to clean up.")
            return 0
        result = cleanup_local(root, args.port)
        print(json.dumps(result, indent=2))
        return 0

    if args.doctor:
        result = doctor_local(root, args.port) if args.target == "local" else doctor_prod()
        print(json.dumps(result, indent=2))
        return 0 if result["ok"] else 1

    if not args.journey:
        raise SystemExit("Choose --journey, or pass --doctor / --cleanup.")

    launched = False
    origin = PROD_ORIGIN
    doctor: dict[str, Any]
    try:
        if args.target == "local":
            launch_info = ensure_local(root, args.port, rebuild=args.rebuild)
            launched = not launch_info.get("reused")
            origin = launch_info["baseUrl"]
            doctor = launch_info["doctor"]
            print("Doctor clean." + (" Reused running instance." if launch_info.get("reused") else " Launched new instance."), flush=True)
        else:
            doctor = doctor_prod()
            if not doctor["ok"]:
                print(json.dumps(doctor, indent=2))
                return 1
            print("Production ready probe passed.", flush=True)

        evidence_root = Path(args.evidence_dir) if args.evidence_dir else default_evidence_dir(root, sha)
        # Every attempt gets its own directory: a retry must never overwrite
        # or mix with the evidence of the attempt it is retrying.
        attempt = f"{amsterdam_now().strftime('%Y%m%d-%H%M%S')}-{os.getpid()}"
        run_out = evidence_root / f"{args.target}-{args.journey}" / f"attempt-{attempt}"
        print(f"Driving {args.journey} against {origin}…", flush=True)
        result = run_journey(args.journey, origin, run_out)
        summary = {
            "journey": args.journey,
            "target": args.target,
            "origin": origin,
            "ok": result.get("ok", False),
            "failures": result.get("failures", []),
            "gitSha": sha,
            "buildId": read_build_id(root) if args.target == "local" else None,
            "doctor": doctor,
            "evidenceDir": str(run_out),
            "attempt": attempt,
            "finishedAt": iso_amsterdam(),
            "timezone": "Europe/Amsterdam",
        }
        write_json(run_out / "summary.json", summary)
        write_json(evidence_root / f"{args.target}-{args.journey}-{attempt}-summary.json", summary)
        print(json.dumps({k: summary[k] for k in ("ok", "failures", "evidenceDir", "gitSha", "finishedAt")}, indent=2))
        if not result.get("ok"):
            return 1
        return 0
    finally:
        if args.target == "local" and not args.keep_server:
            # Always clean up a server we started, and also a reused one at the
            # end of a full journey, unless the operator asked to keep it.
            # Reuse across journeys in one session: pass --keep-server.
            # The proof run should leave evidence and drop the PIDs we started.
            if launched or not args.keep_server:
                cleanup = cleanup_local(root, args.port)
                print("Cleanup:", json.dumps(cleanup), flush=True)


if __name__ == "__main__":
    sys.exit(main())
