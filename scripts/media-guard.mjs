import { execFileSync } from "node:child_process"
import { extname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const MIB = 1024 * 1024

const limits = new Map([
  [".avif", 1 * MIB],
  [".gif", 1 * MIB],
  [".ico", 256 * 1024],
  [".jpeg", 1 * MIB],
  [".jpg", 1 * MIB],
  [".png", 1 * MIB],
  [".svg", 256 * 1024],
  [".webp", 1 * MIB],
  [".m4a", 2 * MIB],
  [".mp3", 2 * MIB],
  [".mp4", 2 * MIB],
  [".ogg", 2 * MIB],
  [".webm", 2 * MIB],
  [".pdf", 2 * MIB],
  [".otf", 512 * 1024],
  [".ttf", 512 * 1024],
  [".woff", 512 * 1024],
  [".woff2", 512 * 1024],
])

const sourceFormats = new Set([
  ".7z",
  ".aac",
  ".aif",
  ".aiff",
  ".ai",
  ".avi",
  ".blend",
  ".bz2",
  ".dng",
  ".eps",
  ".fig",
  ".flac",
  ".gz",
  ".heic",
  ".heif",
  ".indd",
  ".mkv",
  ".mov",
  ".psd",
  ".rar",
  ".raw",
  ".sketch",
  ".svgz",
  ".tar",
  ".tgz",
  ".tif",
  ".tiff",
  ".wav",
  ".xz",
  ".zip",
  ".zst",
])

const mediaLikeFormats = new Set([
  ".bmp",
  ".jfif",
  ".jxl",
  ".mid",
  ".midi",
  ".ogv",
  ".swf",
])

function parseBaseArgument() {
  const index = process.argv.indexOf("--base")
  if (index === -1) return null
  const value = process.argv[index + 1]
  if (!value) throw new Error("--base requires a Git ref")
  return value
}

function hasRef(ref) {
  try {
    execFileSync("git", ["rev-parse", "--verify", ref], { stdio: "ignore" })
    return true
  } catch {
    return false
  }
}

function changedFiles() {
  const requestedBase = parseBaseArgument()
  const githubBase = process.env.GITHUB_BASE_REF
    ? `origin/${process.env.GITHUB_BASE_REF}`
    : null
  const base = requestedBase || githubBase || (hasRef("HEAD^") ? "HEAD^" : null)

  const args = base
    ? ["diff", "--no-renames", "--name-only", "--diff-filter=AM", "-z", `${base}...HEAD`]
    : ["diff-tree", "--root", "--no-commit-id", "--name-only", "-r", "-z", "HEAD"]

  return execFileSync("git", args)
    .toString("utf8")
    .split("\0")
    .filter(Boolean)
}

function formatMiB(bytes) {
  return `${(bytes / MIB).toFixed(2)} MiB`
}

function gitBlobSize(file) {
  const output = execFileSync("git", ["cat-file", "-s", `HEAD:${file}`], {
    encoding: "utf8",
  }).trim()
  const size = Number.parseInt(output, 10)
  if (!Number.isSafeInteger(size) || size < 0) {
    throw new Error(`Could not determine the Git blob size for ${JSON.stringify(file)}`)
  }
  return size
}

export function escapeWorkflowCommandData(value) {
  return String(value)
    .replace(/%/g, "%25")
    .replace(/\r/g, "%0D")
    .replace(/\n/g, "%0A")
}

export function escapeWorkflowCommandProperty(value) {
  return escapeWorkflowCommandData(value)
    .replace(/:/g, "%3A")
    .replace(/,/g, "%2C")
}

export function runMediaGuard() {
  const files = changedFiles()
  const violations = []

  for (const file of files) {
    const extension = extname(file).toLowerCase()
    const size = gitBlobSize(file)

    if (sourceFormats.has(extension)) {
      violations.push({
        file,
        reason: `${extension} source/archive files belong in object storage`,
        size,
      })
      continue
    }

    const limit = limits.get(extension)
    if (limit && size > limit) {
      violations.push({
        file,
        reason: `${extension} exceeds the ${formatMiB(limit)} Git limit`,
        size,
      })
      continue
    }

    if (!limit && mediaLikeFormats.has(extension)) {
      violations.push({
        file,
        reason: `${extension} has no approved Git media policy`,
        size,
      })
    }
  }

  if (violations.length > 0) {
    console.error("Media policy violations:\n")
    for (const violation of violations) {
      const detail = `${violation.reason}; file size ${formatMiB(violation.size)}`
      console.error(
        `- ${JSON.stringify(violation.file)} (${formatMiB(violation.size)}): ${violation.reason}`,
      )
      console.error(
        `::error file=${escapeWorkflowCommandProperty(violation.file)}::${escapeWorkflowCommandData(detail)}`,
      )
    }
    console.error(
      "\nStore the original in the portfolio object store and commit only its versioned URL/manifest entry.",
    )
    process.exitCode = 1
    return
  }

  console.log(`Media guard passed for ${files.length} changed file(s).`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runMediaGuard()
}
