import { execFileSync } from "node:child_process"
import { existsSync, statSync } from "node:fs"
import { extname } from "node:path"

const MIB = 1024 * 1024

const limits = new Map([
  [".avif", 1 * MIB],
  [".gif", 1 * MIB],
  [".jpeg", 1 * MIB],
  [".jpg", 1 * MIB],
  [".png", 1 * MIB],
  [".webp", 1 * MIB],
  [".mp3", 2 * MIB],
  [".mp4", 2 * MIB],
  [".pdf", 2 * MIB],
  [".woff", 512 * 1024],
  [".woff2", 512 * 1024],
])

const sourceFormats = new Set([
  ".7z",
  ".ai",
  ".avi",
  ".flac",
  ".mkv",
  ".mov",
  ".psd",
  ".rar",
  ".tar",
  ".tif",
  ".tiff",
  ".wav",
  ".zip",
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
    ? ["diff", "--name-only", "--diff-filter=AM", "-z", `${base}...HEAD`]
    : ["diff-tree", "--root", "--no-commit-id", "--name-only", "-r", "-z", "HEAD"]

  return execFileSync("git", args)
    .toString("utf8")
    .split("\0")
    .filter(Boolean)
}

function formatMiB(bytes) {
  return `${(bytes / MIB).toFixed(2)} MiB`
}

const files = changedFiles()
const violations = []

for (const file of files) {
  if (!existsSync(file)) continue

  const extension = extname(file).toLowerCase()
  const size = statSync(file).size

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
  }
}

if (violations.length > 0) {
  console.error("Media policy violations:\n")
  for (const violation of violations) {
    console.error(`- ${violation.file} (${formatMiB(violation.size)}): ${violation.reason}`)
    console.error(
      `::error file=${violation.file}::${violation.reason}; file size ${formatMiB(violation.size)}`,
    )
  }
  console.error(
    "\nStore the original in the portfolio object store and commit only its versioned URL/manifest entry.",
  )
  process.exit(1)
}

console.log(`Media guard passed for ${files.length} changed file(s).`)
