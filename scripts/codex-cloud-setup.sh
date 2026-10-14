#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P)"
NODE_VERSION="$(tr -d '[:space:]' < "${REPO_ROOT}/.nvmrc")"
PNPM_VERSION="$(cd "$REPO_ROOT" && node -p "require('./package.json').packageManager.split('@').at(-1)")"

[[ "$NODE_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] || { printf 'Invalid .nvmrc pin: %s\n' "$NODE_VERSION" >&2; exit 64; }
[[ "$PNPM_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] || { printf 'Invalid pnpm pin: %s\n' "$PNPM_VERSION" >&2; exit 64; }
[[ "$(uname -s)" == Linux && "$(uname -m)" == x86_64 ]] || { printf 'Unsupported platform: %s %s (expected Linux x86_64)\n' "$(uname -s)" "$(uname -m)" >&2; exit 65; }
[[ "$NODE_VERSION" == 22.23.3 ]] || { printf 'No trusted checksum registered for Node %s\n' "$NODE_VERSION" >&2; exit 65; }

NODE_ARCHIVE="node-v${NODE_VERSION}-linux-x64.tar.xz"
NODE_SHA256="df450af89261115ef9f9e3830c3eeb2cc9213b63c720b1af623cb5dcbe2e02de"
CACHE_ROOT="${CODEX_TOOL_CACHE:-${HOME}/.cache/frankx-cloud-tools}"
NODE_ROOT="${CACHE_ROOT}/node-v${NODE_VERSION}-linux-x64"
ARCHIVE_PATH="${CACHE_ROOT}/${NODE_ARCHIVE}"

mkdir -p "$CACHE_ROOT"
if [[ ! -x "${NODE_ROOT}/bin/node" || "$("${NODE_ROOT}/bin/node" --version 2>/dev/null || true)" != "v${NODE_VERSION}" ]]; then
  rm -rf -- "$NODE_ROOT"
  if [[ ! -f "$ARCHIVE_PATH" ]] || ! printf '%s  %s\n' "$NODE_SHA256" "$ARCHIVE_PATH" | sha256sum --check --status; then
    rm -f -- "$ARCHIVE_PATH"
    curl --fail --location --silent --show-error --connect-timeout 10 --max-time 120 --proto '=https' --tlsv1.2 \
      "https://nodejs.org/dist/v${NODE_VERSION}/${NODE_ARCHIVE}" --output "$ARCHIVE_PATH"
  fi
  printf '%s  %s\n' "$NODE_SHA256" "$ARCHIVE_PATH" | sha256sum --check --status
  tar -xJf "$ARCHIVE_PATH" -C "$CACHE_ROOT"
fi

export PATH="${NODE_ROOT}/bin:${PATH}"
[[ "$(node --version)" == "v${NODE_VERSION}" ]]
printf 'Using cached Node %s from %s; pnpm %s via Corepack.\n' "$NODE_VERSION" "$NODE_ROOT" "$PNPM_VERSION" >&2

if (($# == 0)); then
  printf 'Usage: %s pnpm install --frozen-lockfile\n' "$0"
  exit 0
fi

cd "$REPO_ROOT"
if [[ "$1" == pnpm ]]; then
  shift
  exec corepack pnpm@"${PNPM_VERSION}" "$@"
fi
exec "$@"
