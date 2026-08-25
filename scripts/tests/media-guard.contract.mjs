import assert from "node:assert/strict"
import { execFileSync, spawnSync } from "node:child_process"
import { createHash } from "node:crypto"
import { mkdir, mkdtemp, readFile, rename, rm, symlink, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { deflateSync } from "node:zlib"

// The .contract suffix keeps repository-wide Vitest discovery from treating
// this Node-native suite as a Vitest module.
const MIB = 1024 * 1024
const guard = fileURLToPath(new URL("../media-guard.mjs", import.meta.url))
const repositoryRoot = fileURLToPath(new URL("../../", import.meta.url))
const posixOnly = { skip: process.platform === "win32" ? "requires POSIX filenames or symlink semantics" : false }

const WEBP_2X2 = Buffer.from(
  "UklGRjYAAABXRUJQVlA4ICoAAACwAQCdASoCAAIAAgA0JaACdLoABGaAAP7udn/3BmfV2OH9zcW5+hQAAAA=",
  "base64",
)

const crcTable = Array.from({ length: 256 }, (_, value) => {
  let crc = value
  for (let bit = 0; bit < 8; bit += 1) crc = (crc & 1) ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1
  return crc >>> 0
})

function crc32(bytes) {
  let crc = 0xffffffff
  for (const byte of bytes) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function pngChunk(type, payload) {
  const typeBytes = Buffer.from(type, "ascii")
  const length = Buffer.alloc(4)
  length.writeUInt32BE(payload.length)
  const checksum = Buffer.alloc(4)
  checksum.writeUInt32BE(crc32(Buffer.concat([typeBytes, payload])))
  return Buffer.concat([length, typeBytes, payload, checksum])
}

function validPng(targetSize = null, pixel = [0x33, 0x66, 0x99, 0xff]) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  const header = Buffer.alloc(13)
  header.writeUInt32BE(1, 0)
  header.writeUInt32BE(1, 4)
  header[8] = 8
  header[9] = 6
  const chunks = [pngChunk("IHDR", header)]
  const imageData = pngChunk("IDAT", deflateSync(Buffer.from([0, ...pixel])))
  const end = pngChunk("IEND", Buffer.alloc(0))
  const unpaddedLength = signature.length + chunks[0].length + imageData.length + end.length
  if (targetSize !== null) {
    const payloadLength = targetSize - unpaddedLength - 12
    assert.ok(payloadLength >= 8, "target PNG size leaves no room for a valid text chunk")
    const padding = Buffer.alloc(payloadLength, 0x61)
    Buffer.from("padding\0", "ascii").copy(padding)
    chunks.push(pngChunk("tEXt", padding))
  }
  chunks.push(imageData, end)
  const png = Buffer.concat([signature, ...chunks])
  if (targetSize !== null) assert.equal(png.length, targetSize)
  return png
}

function jpegSegment(marker, payload) {
  const header = Buffer.from([0xff, marker, 0, payload.length + 2])
  return Buffer.concat([header, payload])
}

function validJpeg() {
  const quantization = Buffer.concat([Buffer.from([0]), Buffer.alloc(64, 1)])
  const frame = Buffer.from([8, 0, 1, 0, 1, 1, 1, 0x11, 0])
  const codeLengths = Buffer.from([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const dcTable = Buffer.concat([Buffer.from([0x00]), codeLengths, Buffer.from([0])])
  const acTable = Buffer.concat([Buffer.from([0x10]), codeLengths, Buffer.from([0])])
  const scan = Buffer.from([1, 1, 0x00, 0, 63, 0])
  return Buffer.concat([
    Buffer.from([0xff, 0xd8]),
    jpegSegment(0xdb, quantization),
    jpegSegment(0xc0, frame),
    jpegSegment(0xc4, dcTable),
    jpegSegment(0xc4, acTable),
    jpegSegment(0xda, scan),
    Buffer.from([0x3f, 0xff, 0xd9]),
  ])
}

async function repository(t) {
  const root = await mkdtemp(join(tmpdir(), "media-guard-"))
  t.after(() => rm(root, { recursive: true, force: true }))
  git(root, "init", "--quiet")
  git(root, "config", "user.email", "media-guard@example.test")
  git(root, "config", "user.name", "Media Guard Test")
  await write(root, "README.md", "baseline\n")
  git(root, "add", ".")
  git(root, "commit", "--quiet", "-m", "baseline")
  return { root, base: git(root, "rev-parse", "HEAD").trim() }
}

function git(cwd, ...args) {
  return execFileSync("git", args, { cwd, encoding: "utf8" })
}

async function write(root, path, value) {
  const target = join(root, path)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, value)
}

function commit(root, message = "scenario") {
  git(root, "add", "-A")
  git(root, "commit", "--quiet", "-m", message)
}

function run(root, base, env = {}, extraArguments = []) {
  return spawnSync(process.execPath, base ? [guard, ...extraArguments, "--base", base] : [guard, ...extraArguments], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, ...env },
  })
}

async function trustedPolicy(t, requiredAssets) {
  const root = await mkdtemp(join(tmpdir(), "media-guard-policy-"))
  t.after(() => rm(root, { recursive: true, force: true }))
  const path = join(root, "policy.json")
  await writeFile(path, `${JSON.stringify({ schemaVersion: 1, requiredAssets }, null, 2)}\n`)
  return path
}

test("allows decoded classified media at the exact size boundary", async (t) => {
  const { root, base } = await repository(t)
  await write(root, "public/images/hero.png", validPng(MIB))
  commit(root)

  const result = run(root, base)
  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout, /passed for 1 changed path/u)
})

test("accepts legitimate decoded PNG, JPEG, and WebP media", async (t) => {
  const { root, base } = await repository(t)
  await write(root, "public/images/hero.png", validPng())
  await write(root, "public/images/hero.jpg", validJpeg())
  await write(root, "public/images/hero.webp", WEBP_2X2)
  commit(root)

  const result = run(root, base)
  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout, /passed for 3 changed path/u)
})

test("binds trusted inspection to the exact base, head, and two-parent merge commit", async (t) => {
  const { root, base } = await repository(t)
  git(root, "checkout", "--quiet", "-b", "candidate")
  await write(root, "public/images/hero.png", validPng())
  commit(root, "candidate media")
  const head = git(root, "rev-parse", "HEAD").trim()
  git(root, "checkout", "--quiet", "--detach", base)
  git(root, "merge", "--quiet", "--no-ff", "candidate", "-m", "candidate merge")
  const merge = git(root, "rev-parse", "HEAD").trim()

  const accepted = run(root, base, {}, ["--head", head, "--trusted-merge", merge])
  assert.equal(accepted.status, 0, accepted.stderr)

  const rejected = run(root, base, {}, ["--head", base, "--trusted-merge", merge])
  assert.equal(rejected.status, 1)
  assert.match(rejected.stderr, /merge parents do not match/u)
})

test("rejects fake PNG, JPEG, and WebP signatures and forged payload headers", async (t) => {
  const { root, base } = await repository(t)
  await write(root, "public/images/fake.png", Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    Buffer.alloc(120),
  ]))
  await write(root, "public/images/fake.jpg", Buffer.concat([Buffer.from([0xff, 0xd8]), Buffer.alloc(120), Buffer.from([0xff, 0xd9])]))
  const forgedHeader = Buffer.alloc(13)
  forgedHeader.writeUInt32BE(1, 0)
  forgedHeader.writeUInt32BE(1, 4)
  forgedHeader[8] = 8
  forgedHeader[9] = 6
  await write(root, "public/images/forged.png", Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pngChunk("IHDR", forgedHeader),
    pngChunk("IDAT", Buffer.from("checksum-valid but not zlib")),
    pngChunk("IEND", Buffer.alloc(0)),
  ]))
  const fakeWebp = Buffer.alloc(40)
  fakeWebp.write("RIFF", 0, "ascii")
  fakeWebp.writeUInt32LE(32, 4)
  fakeWebp.write("WEBPVP8 ", 8, "ascii")
  fakeWebp.writeUInt32LE(20, 16)
  fakeWebp.writeUIntLE((20 << 5) | 0x10, 20, 3)
  fakeWebp.set([0x9d, 0x01, 0x2a, 0x01, 0x00, 0x01, 0x00], 23)
  await write(root, "public/images/fake.webp", fakeWebp)
  commit(root)

  const result = run(root, base)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /invalid \.png media/u)
  assert.match(result.stderr, /PNG pixel payload cannot be decoded/u)
  assert.match(result.stderr, /invalid \.jpg media/u)
  assert.match(result.stderr, /invalid \.webp media/u)
})

test("rejects the exact PR 502 text placeholder renamed as PNG", async (t) => {
  const { root, base } = await repository(t)
  await write(
    root,
    "public/images/blog/evals-are-the-experiment-hero.png",
    "[Binary content from the first attached image: evals-are-the-experiment-hero.png]",
  )
  commit(root)

  const result = run(root, base)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /invalid \.png media: PNG signature or payload is invalid/u)
})

test("rejects renamed text even when the destination has an allowed media suffix", async (t) => {
  const { root } = await repository(t)
  await write(root, "legacy.txt", "this is not an image\n")
  commit(root, "legacy text")
  const renameBase = git(root, "rev-parse", "HEAD").trim()
  await mkdir(join(root, "public/images"), { recursive: true })
  await rename(join(root, "legacy.txt"), join(root, "public/images/renamed.png"))
  commit(root)

  const result = run(root, renameBase)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /renamed\.png/u)
  assert.match(result.stderr, /invalid \.png media/u)
})

test("rejects oversized classified web media", async (t) => {
  const { root, base } = await repository(t)
  await write(root, "public/video/hero.webm", Buffer.alloc(2 * MIB + 1))
  commit(root)

  const result = run(root, base)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /\.webm exceeds the 2\.00 MiB Git limit/u)
})

test("rejects compound and compressed archives", async (t) => {
  const { root, base } = await repository(t)
  await write(root, "public/downloads/source.tar.gz", "archive")
  commit(root)

  const result = run(root, base)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /\.tar\.gz source\/archive files belong in object storage/u)
})

test("treats renamed destinations as additions", async (t) => {
  const { root } = await repository(t)
  await write(root, "legacy.bin", "legacy audio")
  commit(root, "legacy source")
  const renameBase = git(root, "rev-parse", "HEAD").trim()
  await mkdir(join(root, "public/audio"), { recursive: true })
  await rename(join(root, "legacy.bin"), join(root, "public/audio/renamed.wav"))
  commit(root)

  const result = run(root, renameBase)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /renamed\.wav/u)
})

test("escapes workflow-command properties in hostile filenames", posixOnly, async (t) => {
  const { root, base } = await repository(t)
  const filename = "public/images/a:b,c%25\r\n::warning::injected.png"
  await write(root, filename, Buffer.alloc(MIB + 1))
  commit(root)

  const result = run(root, base)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /::error file=public\/images\/a%3Ab%2Cc%2525%0D%0A%3A%3Awarning%3A%3Ainjected\.png::/u)
  assert.doesNotMatch(result.stderr, /(?:^|\n)::warning::injected\.png/mu)
})

test("rejects unclassified files in plural controlled media paths", async (t) => {
  const { root, base } = await repository(t)
  await write(root, "public/videos/hero.jxl", "next-generation video")
  commit(root)

  const result = run(root, base)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /\.jxl is not a classified web-media format/u)
})

test("rejects dangling symlinks in controlled media paths", posixOnly, async (t) => {
  const { root, base } = await repository(t)
  await mkdir(join(root, "public/images"), { recursive: true })
  await symlink("missing-target.png", join(root, "public/images/hero.png"))
  commit(root)

  const result = run(root, base)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /must not be symbolic links/u)
})

test("escapes workflow-command messages derived from hostile extensions", posixOnly, async (t) => {
  const { root, base } = await repository(t)
  const filename = "public/images/asset.\n::error::injected"
  await write(root, filename, "unclassified")
  commit(root)

  const result = run(root, base)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /%0A::error::injected is not a classified web-media format/u)
  assert.doesNotMatch(result.stderr, /(?:^|\n)::error::injected/mu)
})

test("falls back to HEAD^ when the GitHub base ref is unavailable", async (t) => {
  const { root } = await repository(t)
  await write(root, "public/video/oversized.mp4", Buffer.alloc(2 * MIB + 1))
  commit(root)

  const result = run(root, null, { GITHUB_BASE_REF: "missing-base-ref" })
  assert.equal(result.status, 1)
  assert.match(result.stderr, /\.mp4 exceeds the 2\.00 MiB Git limit/u)
  assert.doesNotMatch(result.stderr, /unknown revision|ambiguous argument/u)
})

for (const filename of [
  "public/root.jxl",
  "generated_imgs/root.jxl",
  "generated_audio/root.jxl",
  "content/music/source/root.jxl",
]) {
  test(`rejects unclassified media at controlled root ${filename}`, async (t) => {
    const { root, base } = await repository(t)
    await write(root, filename, "unclassified media")
    commit(root)

    const result = run(root, base)
    assert.equal(result.status, 1)
    assert.match(result.stderr, /\.jxl is not a classified web-media format/u)
  })
}

test("allows explicit text and config sidecars at controlled roots", async (t) => {
  const { root, base } = await repository(t)
  await write(root, "public/manifest.webmanifest", "{}")
  await write(root, "generated_audio/catalog.json", "{}")
  await write(root, "generated_imgs/README.md", "metadata\n")
  await write(root, "content/music/source/lyrics.lrc", "[00:00.00]Instrumental\n")
  commit(root)

  const result = run(root, base)
  assert.equal(result.status, 0, result.stderr)
})

test("rejects unclassified media in nested monorepo public roots", async (t) => {
  const { root, base } = await repository(t)
  await write(root, "apps/web/public/root.jxl", "unclassified media")
  commit(root)

  const result = run(root, base)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /\.jxl is not a classified web-media format/u)
})

test("rejects classified-media symlinks outside controlled paths", posixOnly, async (t) => {
  const { root, base } = await repository(t)
  await write(root, "payload.bin", Buffer.alloc(3 * MIB))
  await mkdir(join(root, "assets"), { recursive: true })
  await symlink("../payload.bin", join(root, "assets/hero.png"))
  commit(root)

  const result = run(root, base)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /must not be symbolic links/u)
  assert.match(result.stderr, /unclassified file exceeds the 2\.00 MiB Git limit/u)
})

test("rejects regular-file to symlink type changes", posixOnly, async (t) => {
  const { root } = await repository(t)
  await write(root, "public/images/hero.png", "baseline image")
  commit(root, "tracked image")
  const typeChangeBase = git(root, "rev-parse", "HEAD").trim()
  await rm(join(root, "public/images/hero.png"))
  await symlink("../../payload.bin", join(root, "public/images/hero.png"))
  commit(root)

  const result = run(root, typeChangeBase)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /must not be symbolic links/u)
})

test("rejects oversized allowed sidecars", async (t) => {
  const { root, base } = await repository(t)
  await write(root, "generated_imgs/catalog.json", Buffer.alloc(512 * 1024 + 1))
  commit(root)

  const result = run(root, base)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /\.json sidecar exceeds the 0\.50 MiB Git limit/u)
})

test("rejects oversized generic files outside media paths", async (t) => {
  const { root, base } = await repository(t)
  await write(root, "payload.bin", Buffer.alloc(2 * MIB + 1))
  commit(root)

  const result = run(root, base)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /unclassified file exceeds the 2\.00 MiB Git limit/u)
})

test("rejects aggregate governed-media debt", async (t) => {
  const { root, base } = await repository(t)
  const boundaryPng = validPng(MIB)
  for (let index = 0; index < 6; index += 1) {
    await write(root, `public/images/asset-${index}.png`, boundaryPng)
  }
  commit(root)

  const result = run(root, base)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /governed media changes exceed the 5\.00 MiB pull-request budget/u)
})

test("rejects aggregate repository bloat", async (t) => {
  const { root, base } = await repository(t)
  for (let index = 0; index < 11; index += 1) {
    await write(root, `fixtures/chunk-${index}.txt`, Buffer.alloc(2 * MIB))
  }
  commit(root)

  const result = run(root, base)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /changed files exceed the 20\.00 MiB pull-request budget/u)
})

test("protects every executable and configuration trust root from deletion", async (t) => {
  const { root } = await repository(t)
  for (const file of [
    ".github/media-guard-policy.json",
    ".github/workflows/media-guard.yml",
    ".github/workflows/media-guard-trusted.yml",
    "scripts/media-guard.mjs",
    "scripts/resolve-media-guard-pr.mjs",
    "scripts/report-media-guard-status.mjs",
    "scripts/tests/media-guard.contract.mjs",
  ]) {
    await write(root, file, "trusted baseline\n")
  }
  commit(root, "trusted policy")
  const policyBase = git(root, "rev-parse", "HEAD").trim()
  await rm(join(root, ".github/workflows/media-guard.yml"))
  await rm(join(root, "scripts/media-guard.mjs"))
  commit(root)

  const result = run(root, policyBase, {}, ["--protect-policy"])
  assert.equal(result.status, 1)
  assert.match(result.stderr, /media-guard\.yml/u)
  assert.match(result.stderr, /scripts\/media-guard\.mjs/u)
  assert.match(result.stderr, /separately authorized base-policy update/u)
})

test("base checker defeats a PR that edits checker, workflow, config, and flags to self-exempt", async (t) => {
  const { root } = await repository(t)
  const required = validPng()
  await write(root, "public/images/required.png", required)
  commit(root, "trusted asset")
  const base = git(root, "rev-parse", "HEAD").trim()
  const policyFile = await trustedPolicy(t, {
    "public/images/required.png": createHash("sha256").update(required).digest("hex"),
  })

  await write(root, ".github/workflows/media-guard.yml", "name: Media Guard\non: pull_request_target\njobs: { bypass: { runs-on: ubuntu-latest, steps: [] } }\n")
  await write(root, ".github/workflows/media-guard-trusted.yml", "name: Media Guard Trusted\njobs: { bypass: { runs-on: ubuntu-latest, steps: [] } }\n")
  await write(root, ".github/media-guard-policy.json", '{"schemaVersion":1,"requiredAssets":{},"allowUnsafe":true}\n')
  await write(root, "scripts/media-guard.mjs", "throw new Error('candidate checker must never execute')\n")
  await write(root, "scripts/resolve-media-guard-pr.mjs", "console.log('candidate resolver bypass')\n")
  await write(root, "scripts/report-media-guard-status.mjs", "console.log('candidate status bypass')\n")
  await write(root, "public/images/required.png", validPng(null, [0xff, 0, 0, 0xff]))
  await write(root, "public/images/fake.png", "[Binary content from the first attached image: fake.png]")
  commit(root, "hostile self exemption")

  const result = run(root, base, { MEDIA_GUARD_ALLOW_UNSAFE: "true" }, ["--protect-policy", "--policy-file", policyFile])
  assert.equal(result.status, 1)
  assert.match(result.stderr, /media-guard\.yml/u)
  assert.match(result.stderr, /media-guard-trusted\.yml/u)
  assert.match(result.stderr, /scripts\/media-guard\.mjs/u)
  assert.match(result.stderr, /required media asset content changed/u)
  assert.match(result.stderr, /invalid \.png media/u)
  assert.doesNotMatch(result.stdout, /candidate .* bypass/u)
})

test("rejects deletion of a base-policy required media asset", async (t) => {
  const { root } = await repository(t)
  const asset = validPng()
  await write(root, "public/images/required.png", asset)
  commit(root, "required asset")
  const base = git(root, "rev-parse", "HEAD").trim()
  const policyFile = await trustedPolicy(t, {
    "public/images/required.png": createHash("sha256").update(asset).digest("hex"),
  })
  await rm(join(root, "public/images/required.png"))
  commit(root)

  const result = run(root, base, {}, ["--policy-file", policyFile])
  assert.equal(result.status, 1)
  assert.match(result.stderr, /required media asset is missing/u)
})

test("rejects content changes to a base-policy required media asset", async (t) => {
  const { root } = await repository(t)
  const asset = validPng()
  await write(root, "public/images/required.png", asset)
  commit(root, "required asset")
  const base = git(root, "rev-parse", "HEAD").trim()
  const policyFile = await trustedPolicy(t, {
    "public/images/required.png": createHash("sha256").update(asset).digest("hex"),
  })
  await write(root, "public/images/required.png", validPng(null, [0xff, 0xcc, 0, 0xff]))
  commit(root)

  const result = run(root, base, {}, ["--policy-file", policyFile])
  assert.equal(result.status, 1)
  assert.match(result.stderr, /required media asset content changed/u)
})

test("rejects Git submodules masquerading as media files", posixOnly, async (t) => {
  const { root, base } = await repository(t)
  const source = await mkdtemp(join(tmpdir(), "media-guard-submodule-"))
  t.after(() => rm(source, { recursive: true, force: true }))
  git(source, "init", "--quiet")
  git(source, "config", "user.email", "media-guard@example.test")
  git(source, "config", "user.name", "Media Guard Test")
  await write(source, "README.md", "submodule payload\n")
  git(source, "add", ".")
  git(source, "commit", "--quiet", "-m", "payload")
  git(root, "-c", "protocol.file.allow=always", "submodule", "add", "--quiet", source, "public/images/hero.png")
  commit(root)

  const result = run(root, base)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /must be regular files/u)
})

test("rejects Git LFS pointer media", async (t) => {
  const { root, base } = await repository(t)
  await write(
    root,
    "public/images/hero.png",
    "version https://git-lfs.github.com/spec/v1\n" +
      `oid sha256:${"a".repeat(64)}\n` +
      "size 1073741824\n",
  )
  commit(root)

  const result = run(root, base)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /Git LFS pointers are not permitted/u)
})

test("trusted workflow is base-controlled, read-minimal, and exact-SHA pinned", async () => {
  const request = await readFile(join(repositoryRoot, ".github/workflows/media-guard.yml"), "utf8")
  const trusted = await readFile(join(repositoryRoot, ".github/workflows/media-guard-trusted.yml"), "utf8")
  const resolver = await readFile(join(repositoryRoot, "scripts/resolve-media-guard-pr.mjs"), "utf8")

  assert.match(request, /\n  pull_request:\n/u)
  assert.doesNotMatch(request, /pull_request_target/u)
  assert.match(request, /permissions: \{\}/u)
  assert.doesNotMatch(request, /^\s*uses:/mu)
  assert.doesNotMatch(request, /media-guard\.mjs/u)

  assert.match(trusted, /\n  workflow_run:\n/u)
  assert.doesNotMatch(trusted, /pull_request_target/u)
  assert.match(trusted, /permissions:\n  contents: read\n  pull-requests: read/u)
  assert.doesNotMatch(trusted, /^\s*statuses: write$/mu)
  assert.match(trusted, /environment: media-guard-trusted/u)
  assert.match(trusted, /actions\/create-github-app-token@[0-9a-f]{40}/u)
  assert.match(trusted, /permission-statuses: write/u)
  assert.equal((trusted.match(/GITHUB_TOKEN: \$\{\{ steps\.app-token\.outputs\.token \}\}/gu) || []).length, 3)
  assert.match(trusted, /node "\$GITHUB_WORKSPACE\/trusted\/scripts\/media-guard\.mjs"/u)
  assert.match(trusted, /--protect-policy/u)
  assert.match(trusted, /persist-credentials: false/g)
  const actions = [...trusted.matchAll(/^\s*uses:\s*(\S+)/gmu)].map((match) => match[1])
  assert.equal(actions.length, 4)
  for (const action of actions) assert.match(action, /^actions\/(?:checkout|create-github-app-token)@[0-9a-f]{40}$/u)

  assert.match(resolver, /run\.event !== "pull_request"/u)
  assert.match(resolver, /headSha !== eventHead/u)
  assert.match(resolver, /pullRequest\.base\.sha/u)
  assert.match(resolver, /pullRequest\.merge_commit_sha/u)
})
