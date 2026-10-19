import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"
import { lstatSync, readFileSync } from "node:fs"
import { dirname, extname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { inflateSync } from "node:zlib"

const MIB = 1024 * 1024
const KIB = 1024
const MAX_SIDECAR_BYTES = 512 * KIB
const MAX_GENERIC_FILE_BYTES = 2 * MIB
const MAX_GOVERNED_CHANGE_BYTES = 5 * MIB
const MAX_TOTAL_CHANGE_BYTES = 20 * MIB
const MAX_IMAGE_EDGE = 16_384
const MAX_IMAGE_PIXELS = 40_000_000
const TRUSTED_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const DEFAULT_POLICY_FILE = resolve(TRUSTED_ROOT, ".github/media-guard-policy.json")

const limits = new Map([
  [".avif", 1 * MIB],
  [".gif", 1 * MIB],
  [".ico", 512 * KIB],
  [".jpeg", 1 * MIB],
  [".jpg", 1 * MIB],
  [".png", 1 * MIB],
  [".svg", 512 * KIB],
  [".webp", 1 * MIB],
  [".m4a", 2 * MIB],
  [".mp3", 2 * MIB],
  [".ogg", 2 * MIB],
  [".mp4", 2 * MIB],
  [".webm", 2 * MIB],
  [".pdf", 2 * MIB],
  [".eot", 512 * KIB],
  [".otf", 512 * KIB],
  [".ttf", 512 * KIB],
  [".woff", 512 * KIB],
  [".woff2", 512 * KIB],
])

const prohibitedSuffixes = [
  ".tar.bz2",
  ".tar.gz",
  ".tar.xz",
  ".7z",
  ".ai",
  ".avi",
  ".bmp",
  ".bz2",
  ".flac",
  ".gz",
  ".heic",
  ".heif",
  ".mkv",
  ".mov",
  ".psd",
  ".rar",
  ".tar",
  ".tgz",
  ".tif",
  ".tiff",
  ".wav",
  ".xz",
  ".zip",
]

const controlledMediaRoot = /(?:^|\/)(?:public|generated_audio|generated_imgs)(?:\/|$)|(?:^|\/)content\/music\/source(?:\/|$)/i
const controlledMediaPath = /(?:^|\/)(?:audios?|downloads?|fonts?|images?|media|videos?)(?:\/|$)/i
const protectedPolicyFiles = new Set([
  ".github/media-guard-policy.json",
  ".github/workflows/media-guard-trusted.yml",
  ".github/workflows/media-guard.yml",
  "scripts/media-guard.mjs",
  "scripts/report-media-guard-status.mjs",
  "scripts/resolve-media-guard-pr.mjs",
  "scripts/tests/media-guard.contract.mjs",
])
const allowedMediaSidecars = new Set([
  ".css",
  ".csv",
  ".html",
  ".js",
  ".json",
  ".lrc",
  ".map",
  ".md",
  ".mjs",
  ".srt",
  ".txt",
  ".vtt",
  ".webmanifest",
  ".xml",
  ".yaml",
  ".yml",
])

function argument(name) {
  const index = process.argv.indexOf(name)
  if (index === -1) return null
  const value = process.argv[index + 1]
  if (!value || value.startsWith("--")) throw new Error(`${name} requires a value`)
  return value
}

function protectPolicyFiles() {
  return process.argv.includes("--protect-policy")
}

function hasRef(ref) {
  try {
    execFileSync("git", ["rev-parse", "--verify", ref], { stdio: "ignore" })
    return true
  } catch {
    return false
  }
}

function resolvedBase() {
  const requestedBase = argument("--base")
  const githubBase = process.env.GITHUB_BASE_REF
    ? `origin/${process.env.GITHUB_BASE_REF}`
    : null
  return requestedBase || (githubBase && hasRef(githubBase) ? githubBase : null) || (hasRef("HEAD^") ? "HEAD^" : null)
}

function verifyTrustedMerge(base) {
  const trustedMerge = argument("--trusted-merge")
  const expectedHead = argument("--head")
  if (!trustedMerge && !expectedHead) return
  if (!trustedMerge || !expectedHead || !base) {
    throw new Error("--trusted-merge and --head require an explicit --base")
  }
  const shaPattern = /^[0-9a-f]{40}$/u
  if (![trustedMerge, expectedHead, base].every((value) => shaPattern.test(value))) {
    throw new Error("trusted merge, head, and base values must be full lowercase Git SHAs")
  }
  const actual = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim()
  const parents = execFileSync("git", ["show", "-s", "--format=%P", "HEAD"], {
    encoding: "utf8",
  }).trim().split(/\s+/u)
  if (actual !== trustedMerge) throw new Error("checked-out candidate is not the resolved merge commit")
  if (parents.length !== 2 || parents[0] !== base || parents[1] !== expectedHead) {
    throw new Error("candidate merge parents do not match the resolved base and PR head")
  }
}

function changedFiles(base) {
  const args = base
    ? ["diff", "--no-renames", "--name-status", "--diff-filter=ADMT", "-z", `${base}...HEAD`]
    : ["diff-tree", "--root", "--no-renames", "--no-commit-id", "--name-status", "-r", "-z", "HEAD"]

  const fields = execFileSync("git", args)
    .toString("utf8")
    .split("\0")
    .filter(Boolean)
  if (fields.length % 2 !== 0) throw new Error("Unexpected Git name-status output")

  const entries = []
  for (let index = 0; index < fields.length; index += 2) {
    entries.push({ status: fields[index], file: fields[index + 1] })
  }
  return entries
}

function loadPolicy() {
  const policyFile = argument("--policy-file") || DEFAULT_POLICY_FILE
  let policy
  try {
    policy = JSON.parse(readFileSync(policyFile, "utf8"))
  } catch (error) {
    throw new Error(`trusted media policy cannot be read: ${error.message}`)
  }
  if (policy?.schemaVersion !== 1 || !policy.requiredAssets || Array.isArray(policy.requiredAssets)) {
    throw new Error("trusted media policy must use schemaVersion 1 and a requiredAssets object")
  }
  const requiredAssets = new Map()
  for (const [file, digest] of Object.entries(policy.requiredAssets)) {
    const validPath =
      file.length > 0 &&
      !file.startsWith("/") &&
      !file.includes("\\") &&
      !file.split("/").some((segment) => segment === "" || segment === "." || segment === "..")
    if (!validPath || !/^[0-9a-f]{64}$/u.test(digest)) {
      throw new Error(`invalid required asset policy entry for ${JSON.stringify(file)}`)
    }
    requiredAssets.set(file, digest)
  }
  return requiredAssets
}

function formatMiB(bytes) {
  return `${(bytes / MIB).toFixed(2)} MiB`
}

function escapeWorkflowCommandProperty(value) {
  return value
    .replace(/%/g, "%25")
    .replace(/\r/g, "%0D")
    .replace(/\n/g, "%0A")
    .replace(/:/g, "%3A")
    .replace(/,/g, "%2C")
}

function escapeWorkflowCommandMessage(value) {
  return value.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A")
}

function formatLogValue(value) {
  return JSON.stringify(value)
}

function prohibitedSuffix(file) {
  const lower = file.toLowerCase()
  return prohibitedSuffixes.find((suffix) => lower.endsWith(suffix)) || null
}

function isControlledMediaFile(file) {
  return controlledMediaRoot.test(file) || controlledMediaPath.test(file)
}

function isGitLfsPointer(bytes) {
  if (bytes.length > 1_024) return false
  const lines = bytes.toString("utf8").split(/\r?\n/u)
  return (
    lines[0] === "version https://git-lfs.github.com/spec/v1" &&
    lines.some((line) => /^oid sha256:[0-9a-f]{64}$/u.test(line)) &&
    lines.some((line) => /^size [0-9]+$/u.test(line))
  )
}

function ensure(condition, message) {
  if (!condition) throw new Error(message)
}

function ensureDimensions(width, height, label) {
  ensure(Number.isInteger(width) && Number.isInteger(height), `${label} dimensions are malformed`)
  ensure(width > 0 && height > 0, `${label} dimensions must be positive`)
  ensure(width <= MAX_IMAGE_EDGE && height <= MAX_IMAGE_EDGE, `${label} dimensions exceed the safe edge limit`)
  ensure(width * height <= MAX_IMAGE_PIXELS, `${label} dimensions exceed the safe pixel budget`)
}

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

function pngPasses(width, height, interlace) {
  if (interlace === 0) return [[width, height]]
  const adam7 = [
    [0, 0, 8, 8],
    [4, 0, 8, 8],
    [0, 4, 4, 8],
    [2, 0, 4, 4],
    [0, 2, 2, 4],
    [1, 0, 2, 2],
    [0, 1, 1, 2],
  ]
  return adam7.map(([x, y, dx, dy]) => [
    width > x ? Math.ceil((width - x) / dx) : 0,
    height > y ? Math.ceil((height - y) / dy) : 0,
  ])
}

function validatePng(bytes) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  ensure(bytes.length >= 67 && bytes.subarray(0, 8).equals(signature), "PNG signature or payload is invalid")
  let offset = 8
  let header = null
  let sawPalette = false
  let sawIdat = false
  let idatEnded = false
  let sawEnd = false
  const compressed = []
  while (offset < bytes.length) {
    ensure(offset + 12 <= bytes.length, "PNG chunk header is truncated")
    const length = bytes.readUInt32BE(offset)
    const end = offset + 12 + length
    ensure(end <= bytes.length, "PNG chunk payload is truncated")
    const typeBytes = bytes.subarray(offset + 4, offset + 8)
    const type = typeBytes.toString("ascii")
    ensure(/^[A-Za-z]{4}$/u.test(type), "PNG chunk type is malformed")
    const payload = bytes.subarray(offset + 8, offset + 8 + length)
    const expectedCrc = bytes.readUInt32BE(offset + 8 + length)
    ensure(crc32(Buffer.concat([typeBytes, payload])) === expectedCrc, `PNG ${type} checksum is invalid`)
    if (offset === 8) ensure(type === "IHDR", "PNG IHDR must be the first chunk")
    if (type === "IHDR") {
      ensure(!header && length === 13, "PNG IHDR is malformed")
      const width = payload.readUInt32BE(0)
      const height = payload.readUInt32BE(4)
      const bitDepth = payload[8]
      const colorType = payload[9]
      const validDepths = new Map([
        [0, new Set([1, 2, 4, 8, 16])],
        [2, new Set([8, 16])],
        [3, new Set([1, 2, 4, 8])],
        [4, new Set([8, 16])],
        [6, new Set([8, 16])],
      ])
      ensureDimensions(width, height, "PNG")
      ensure(validDepths.get(colorType)?.has(bitDepth), "PNG bit depth and color type are invalid")
      ensure(payload[10] === 0 && payload[11] === 0, "PNG compression or filter method is unsupported")
      ensure(payload[12] === 0 || payload[12] === 1, "PNG interlace method is invalid")
      header = { width, height, bitDepth, colorType, interlace: payload[12] }
    } else if (type === "PLTE") {
      ensure(header && !sawIdat && length > 0 && length % 3 === 0 && length <= 768, "PNG palette is invalid")
      sawPalette = true
    } else if (type === "IDAT") {
      ensure(header && !idatEnded && length > 0, "PNG IDAT sequence is invalid")
      sawIdat = true
      compressed.push(payload)
    } else if (type === "IEND") {
      ensure(header && sawIdat && length === 0, "PNG IEND is invalid")
      sawEnd = true
      offset = end
      break
    } else {
      if (sawIdat) idatEnded = true
      ensure((typeBytes[0] & 0x20) !== 0, `unknown critical PNG chunk ${type}`)
    }
    offset = end
  }
  ensure(header && sawEnd && offset === bytes.length, "PNG stream is incomplete or has trailing bytes")
  if (header.colorType === 3) ensure(sawPalette, "indexed PNG is missing its palette")
  const channels = new Map([[0, 1], [2, 3], [3, 1], [4, 2], [6, 4]]).get(header.colorType)
  const rowBits = channels * header.bitDepth
  const passes = pngPasses(header.width, header.height, header.interlace)
  const expectedLength = passes.reduce(
    (sum, [width, height]) => sum + (width && height ? height * (1 + Math.ceil((width * rowBits) / 8)) : 0),
    0,
  )
  let decoded
  try {
    decoded = inflateSync(Buffer.concat(compressed), { maxOutputLength: expectedLength + 1 })
  } catch {
    throw new Error("PNG pixel payload cannot be decoded")
  }
  ensure(decoded.length === expectedLength, "PNG decoded pixel payload length is invalid")
  let decodedOffset = 0
  for (const [width, height] of passes) {
    const rowBytes = Math.ceil((width * rowBits) / 8)
    for (let row = 0; row < height; row += 1) {
      ensure(decoded[decodedOffset] <= 4, "PNG row filter is invalid")
      decodedOffset += 1 + rowBytes
    }
  }
}

function validateJpeg(bytes) {
  ensure(bytes.length >= 32 && bytes[0] === 0xff && bytes[1] === 0xd8, "JPEG signature or payload is invalid")
  let offset = 2
  let sawFrame = false
  let sawQuantization = false
  let sawHuffman = false
  let arithmeticFrame = false
  let sawScan = false
  let entropyBytes = 0
  let sawEnd = false
  const quantizationTables = new Set()
  const dcTables = new Set()
  const acTables = new Set()
  const frameComponents = new Set()
  const frameQuantizationTables = new Set()
  const frameMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf])
  while (offset < bytes.length) {
    ensure(bytes[offset] === 0xff, "JPEG marker stream is malformed")
    while (offset < bytes.length && bytes[offset] === 0xff) offset += 1
    ensure(offset < bytes.length, "JPEG marker is truncated")
    const marker = bytes[offset]
    offset += 1
    if (marker === 0xd9) {
      sawEnd = true
      break
    }
    if (marker === 0x01 || marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd7)) continue
    ensure(marker !== 0x00 && offset + 2 <= bytes.length, "JPEG segment header is invalid")
    const length = bytes.readUInt16BE(offset)
    ensure(length >= 2 && offset + length <= bytes.length, "JPEG segment payload is truncated")
    const start = offset + 2
    const end = offset + length
    if (marker === 0xdb) {
      let cursor = start
      while (cursor < end) {
        const tableInfo = bytes[cursor]
        cursor += 1
        const precision = tableInfo >>> 4
        const tableId = tableInfo & 0x0f
        ensure(precision <= 1 && tableId <= 3, "JPEG quantization table selector is invalid")
        const tableBytes = precision === 0 ? 64 : 128
        ensure(cursor + tableBytes <= end, "JPEG quantization table is truncated")
        for (let index = 0; index < 64; index += 1) {
          const value = precision === 0 ? bytes[cursor + index] : bytes.readUInt16BE(cursor + index * 2)
          ensure(value > 0, "JPEG quantization table contains a zero value")
        }
        quantizationTables.add(tableId)
        cursor += tableBytes
      }
      ensure(cursor === end, "JPEG quantization segment is malformed")
      sawQuantization = true
    }
    if (marker === 0xc4) {
      let cursor = start
      while (cursor < end) {
        ensure(cursor + 17 <= end, "JPEG Huffman table header is truncated")
        const tableInfo = bytes[cursor]
        const tableClass = tableInfo >>> 4
        const tableId = tableInfo & 0x0f
        ensure(tableClass <= 1 && tableId <= 3, "JPEG Huffman table selector is invalid")
        let symbols = 0
        for (let index = 1; index <= 16; index += 1) symbols += bytes[cursor + index]
        ensure(symbols > 0 && symbols <= 256 && cursor + 17 + symbols <= end, "JPEG Huffman symbols are invalid")
        ;(tableClass === 0 ? dcTables : acTables).add(tableId)
        cursor += 17 + symbols
      }
      ensure(cursor === end, "JPEG Huffman segment is malformed")
      sawHuffman = true
    }
    if (frameMarkers.has(marker)) {
      ensure(length >= 8, "JPEG frame header is truncated")
      ensureDimensions(bytes.readUInt16BE(start + 3), bytes.readUInt16BE(start + 1), "JPEG")
      const components = bytes[start + 5]
      ensure(bytes[start] > 0 && components > 0 && length === 8 + components * 3, "JPEG frame precision or components are invalid")
      for (let index = 0; index < components; index += 1) {
        const componentOffset = start + 6 + index * 3
        const componentId = bytes[componentOffset]
        const sampling = bytes[componentOffset + 1]
        const quantization = bytes[componentOffset + 2]
        ensure(componentId > 0 && !frameComponents.has(componentId), "JPEG frame component IDs are invalid")
        ensure((sampling >>> 4) > 0 && (sampling & 0x0f) > 0 && quantization <= 3, "JPEG sampling or quantization selector is invalid")
        frameComponents.add(componentId)
        frameQuantizationTables.add(quantization)
      }
      sawFrame = true
      arithmeticFrame ||= new Set([0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]).has(marker)
    }
    if (marker === 0xda) {
      const components = bytes[start]
      ensure(components > 0 && length === 6 + components * 2, "JPEG scan components are invalid")
      for (let index = 0; index < components; index += 1) {
        const componentId = bytes[start + 1 + index * 2]
        const tables = bytes[start + 2 + index * 2]
        const dcTable = tables >>> 4
        const acTable = tables & 0x0f
        ensure(frameComponents.has(componentId), "JPEG scan references an unknown frame component")
        if (!arithmeticFrame) ensure(dcTables.has(dcTable) && acTables.has(acTable), "JPEG scan references a missing Huffman table")
      }
    }
    offset = end
    if (marker !== 0xda) continue
    ensure(length >= 6, "JPEG scan header is truncated")
    sawScan = true
    while (offset < bytes.length) {
      if (bytes[offset] !== 0xff) {
        entropyBytes += 1
        offset += 1
        continue
      }
      ensure(offset + 1 < bytes.length, "JPEG entropy stream is truncated")
      const next = bytes[offset + 1]
      if (next === 0x00) {
        entropyBytes += 1
        offset += 2
      } else if (next === 0xff) {
        offset += 1
      } else if (next >= 0xd0 && next <= 0xd7) {
        offset += 2
      } else {
        break
      }
    }
  }
  ensure(sawEnd && offset === bytes.length, "JPEG stream is incomplete or has trailing bytes")
  ensure(sawFrame && sawQuantization && (sawHuffman || arithmeticFrame), "JPEG coding tables or frame are missing")
  ensure([...frameQuantizationTables].every((table) => quantizationTables.has(table)), "JPEG frame references a missing quantization table")
  ensure(sawScan && entropyBytes > 0, "JPEG contains no encoded image payload")
}

function readUInt24LE(bytes, offset) {
  return bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16)
}

function validateWebpBitstream(type, payload) {
  if (type === "VP8 ") {
    ensure(payload.length >= 20, "WebP VP8 payload is truncated")
    ensure(payload[3] === 0x9d && payload[4] === 0x01 && payload[5] === 0x2a, "WebP VP8 frame signature is invalid")
    const frameTag = payload.readUIntLE(0, 3)
    const firstPartitionLength = frameTag >>> 5
    ensure((frameTag & 1) === 0 && ((frameTag >>> 1) & 0x07) <= 3, "WebP VP8 key-frame header is invalid")
    ensure(firstPartitionLength > 0 && 10 + firstPartitionLength <= payload.length, "WebP VP8 bitstream partition is truncated")
    ensureDimensions(payload.readUInt16LE(6) & 0x3fff, payload.readUInt16LE(8) & 0x3fff, "WebP")
    return true
  }
  if (type === "VP8L") {
    ensure(payload.length >= 10 && payload[0] === 0x2f, "WebP VP8L payload is invalid")
    const bits = payload.readUInt32LE(1)
    ensure((bits >>> 29) === 0, "WebP VP8L version is invalid")
    ensureDimensions((bits & 0x3fff) + 1, ((bits >>> 14) & 0x3fff) + 1, "WebP")
    return true
  }
  return false
}

function validateWebp(bytes) {
  ensure(bytes.length >= 26, "WebP payload is too small")
  ensure(bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP", "WebP signature is invalid")
  ensure(bytes.readUInt32LE(4) + 8 === bytes.length, "WebP RIFF length is invalid")
  let offset = 12
  let sawDimensions = false
  let sawBitstream = false
  while (offset < bytes.length) {
    ensure(offset + 8 <= bytes.length, "WebP chunk header is truncated")
    const type = bytes.toString("ascii", offset, offset + 4)
    const length = bytes.readUInt32LE(offset + 4)
    const start = offset + 8
    const end = start + length
    ensure(end <= bytes.length, "WebP chunk payload is truncated")
    const payload = bytes.subarray(start, end)
    if (type === "VP8X") {
      ensure(length === 10, "WebP VP8X header is invalid")
      ensureDimensions(readUInt24LE(payload, 4) + 1, readUInt24LE(payload, 7) + 1, "WebP")
      sawDimensions = true
    }
    if (validateWebpBitstream(type, payload)) {
      sawDimensions = true
      sawBitstream = true
    }
    if (type === "ANMF") {
      ensure(length >= 24, "WebP animation frame is truncated")
      ensureDimensions(readUInt24LE(payload, 6) + 1, readUInt24LE(payload, 9) + 1, "WebP frame")
      sawDimensions = true
      let childOffset = 16
      while (childOffset + 8 <= payload.length) {
        const childType = payload.toString("ascii", childOffset, childOffset + 4)
        const childLength = payload.readUInt32LE(childOffset + 4)
        const childStart = childOffset + 8
        const childEnd = childStart + childLength
        ensure(childEnd <= payload.length, "WebP animation subchunk is truncated")
        sawBitstream ||= validateWebpBitstream(childType, payload.subarray(childStart, childEnd))
        childOffset = childEnd + (childLength & 1)
      }
      ensure(childOffset === payload.length, "WebP animation subchunks are malformed")
    }
    offset = end + (length & 1)
  }
  ensure(offset === bytes.length && sawDimensions && sawBitstream, "WebP has no decodable image bitstream")
}

function readGifSubBlocks(bytes, initialOffset) {
  let offset = initialOffset
  let payloadBytes = 0
  while (true) {
    ensure(offset < bytes.length, "GIF data sub-block is truncated")
    const length = bytes[offset]
    offset += 1
    if (length === 0) return [offset, payloadBytes]
    ensure(offset + length <= bytes.length, "GIF data sub-block payload is truncated")
    payloadBytes += length
    offset += length
  }
}

function validateGif(bytes) {
  const signature = bytes.toString("ascii", 0, 6)
  ensure(bytes.length >= 35 && (signature === "GIF87a" || signature === "GIF89a"), "GIF signature or payload is invalid")
  ensureDimensions(bytes.readUInt16LE(6), bytes.readUInt16LE(8), "GIF")
  let offset = 13
  if (bytes[10] & 0x80) offset += 3 * (2 ** ((bytes[10] & 0x07) + 1))
  ensure(offset <= bytes.length, "GIF global color table is truncated")
  let sawImage = false
  while (offset < bytes.length) {
    const marker = bytes[offset]
    offset += 1
    if (marker === 0x3b) {
      ensure(sawImage && offset === bytes.length, "GIF stream is incomplete or has trailing bytes")
      return
    }
    if (marker === 0x21) {
      ensure(offset < bytes.length, "GIF extension is truncated")
      offset += 1
      ;[offset] = readGifSubBlocks(bytes, offset)
      continue
    }
    ensure(marker === 0x2c && offset + 9 <= bytes.length, "GIF block marker is invalid")
    const width = bytes.readUInt16LE(offset + 4)
    const height = bytes.readUInt16LE(offset + 6)
    ensureDimensions(width, height, "GIF frame")
    const packed = bytes[offset + 8]
    offset += 9
    if (packed & 0x80) offset += 3 * (2 ** ((packed & 0x07) + 1))
    ensure(offset < bytes.length && bytes[offset] >= 2 && bytes[offset] <= 12, "GIF LZW code size is invalid")
    offset += 1
    let payloadBytes
    ;[offset, payloadBytes] = readGifSubBlocks(bytes, offset)
    ensure(payloadBytes > 0, "GIF frame has no encoded pixels")
    sawImage = true
  }
  throw new Error("GIF trailer is missing")
}

function validateIco(bytes) {
  ensure(bytes.length >= 22 && bytes.readUInt16LE(0) === 0 && [1, 2].includes(bytes.readUInt16LE(2)), "ICO signature is invalid")
  const count = bytes.readUInt16LE(4)
  ensure(count > 0 && 6 + count * 16 <= bytes.length, "ICO directory is invalid")
  for (let index = 0; index < count; index += 1) {
    const offset = 6 + index * 16
    const width = bytes[offset] || 256
    const height = bytes[offset + 1] || 256
    ensureDimensions(width, height, "ICO")
    const length = bytes.readUInt32LE(offset + 8)
    const imageOffset = bytes.readUInt32LE(offset + 12)
    ensure(length >= 16 && imageOffset >= 6 + count * 16 && imageOffset + length <= bytes.length, "ICO image payload is invalid")
    const payload = bytes.subarray(imageOffset, imageOffset + length)
    const png = payload.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    if (png) {
      validatePng(payload)
    } else {
      ensure(payload.length >= 44 && payload.readUInt32LE(0) >= 40, "ICO image has no PNG or DIB payload")
      const dibWidth = Math.abs(payload.readInt32LE(4))
      const dibHeight = Math.ceil(Math.abs(payload.readInt32LE(8)) / 2)
      ensureDimensions(dibWidth, dibHeight, "ICO DIB")
      ensure(payload.readUInt16LE(12) === 1 && payload.readUInt16LE(14) > 0, "ICO DIB planes or bit depth are invalid")
      ensure(payload.length > payload.readUInt32LE(0), "ICO DIB contains no encoded pixel payload")
    }
  }
}

function validateSvg(bytes) {
  ensure(bytes.length >= 32, "SVG payload is too small")
  let source
  try {
    source = new TextDecoder("utf-8", { fatal: true }).decode(bytes)
  } catch {
    throw new Error("SVG is not valid UTF-8")
  }
  ensure(!/<!DOCTYPE|<!ENTITY|<script\b|<foreignObject\b|\son[a-z]+\s*=|(?:href|src)\s*=\s*["']\s*(?:javascript:|data:text\/html)/iu.test(source), "SVG contains executable or externalized markup")
  const opening = source.match(/<svg\b([^>]*)>/iu)
  ensure(opening && (/<\/svg\s*>/iu.test(source) || /<svg\b[^>]*\/\s*>/iu.test(source)), "SVG root element is incomplete")
  const attributes = opening[1]
  const viewBox = attributes.match(/\bviewBox\s*=\s*["']\s*([+-]?(?:\d+\.?\d*|\.\d+))[,\s]+([+-]?(?:\d+\.?\d*|\.\d+))[,\s]+([+-]?(?:\d+\.?\d*|\.\d+))[,\s]+([+-]?(?:\d+\.?\d*|\.\d+))\s*["']/iu)
  const width = attributes.match(/\bwidth\s*=\s*["']\s*([0-9]+(?:\.[0-9]+)?)/iu)
  const height = attributes.match(/\bheight\s*=\s*["']\s*([0-9]+(?:\.[0-9]+)?)/iu)
  if (viewBox) ensureDimensions(Math.ceil(Number(viewBox[3])), Math.ceil(Number(viewBox[4])), "SVG")
  else if (width && height) ensureDimensions(Math.ceil(Number(width[1])), Math.ceil(Number(height[1])), "SVG")
  else throw new Error("SVG must declare positive width/height or a viewBox")
}

function topLevelBoxes(bytes) {
  const boxes = []
  let offset = 0
  while (offset < bytes.length) {
    ensure(offset + 8 <= bytes.length, "ISO media box header is truncated")
    let length = bytes.readUInt32BE(offset)
    const type = bytes.toString("ascii", offset + 4, offset + 8)
    let header = 8
    if (length === 1) {
      ensure(offset + 16 <= bytes.length, "ISO media extended box header is truncated")
      const extended = bytes.readBigUInt64BE(offset + 8)
      ensure(extended <= BigInt(Number.MAX_SAFE_INTEGER), "ISO media box is too large")
      length = Number(extended)
      header = 16
    } else if (length === 0) {
      length = bytes.length - offset
    }
    ensure(length >= header && offset + length <= bytes.length, "ISO media box length is invalid")
    boxes.push({ type, start: offset + header, end: offset + length, length: length - header })
    offset += length
  }
  return boxes
}

function validateIsoMedia(bytes, extension) {
  ensure(bytes.length >= 24, `${extension} payload is too small`)
  const boxes = topLevelBoxes(bytes)
  const fileType = boxes.find((box) => box.type === "ftyp")
  ensure(fileType && fileType.length >= 8, `${extension} ftyp box is missing`)
  const brands = []
  brands.push(bytes.toString("ascii", fileType.start, fileType.start + 4))
  for (let offset = fileType.start + 8; offset + 4 <= fileType.end; offset += 4) {
    brands.push(bytes.toString("ascii", offset, offset + 4))
  }
  const mediaPayload = boxes.find((box) => ["mdat", "moov", "meta"].includes(box.type) && box.length > 0)
  ensure(mediaPayload, `${extension} has no encoded media payload`)
  if (extension === ".avif") {
    ensure(brands.some((brand) => brand === "avif" || brand === "avis"), "AVIF compatible brand is missing")
    const marker = bytes.indexOf(Buffer.from("ispe", "ascii"))
    ensure(marker >= 4 && marker + 16 <= bytes.length, "AVIF spatial dimensions are missing")
    const ispeSize = bytes.readUInt32BE(marker - 4)
    ensure(ispeSize >= 20 && marker - 4 + ispeSize <= bytes.length, "AVIF spatial box is malformed")
    ensureDimensions(bytes.readUInt32BE(marker + 8), bytes.readUInt32BE(marker + 12), "AVIF")
  }
}

function validateMp3(bytes) {
  ensure(bytes.length >= 32, "MP3 payload is too small")
  let offset = 0
  if (bytes.toString("ascii", 0, 3) === "ID3") {
    ensure(bytes[3] > 0 && bytes[3] < 5 && (bytes[5] & 0x0f) === 0, "MP3 ID3 header is invalid")
    const tagSize = ((bytes[6] & 0x7f) << 21) | ((bytes[7] & 0x7f) << 14) | ((bytes[8] & 0x7f) << 7) | (bytes[9] & 0x7f)
    offset = 10 + tagSize
  }
  let found = false
  for (; offset + 4 <= Math.min(bytes.length, 65_536); offset += 1) {
    if (bytes[offset] !== 0xff || (bytes[offset + 1] & 0xe6) !== 0xe2) continue
    const bitrate = (bytes[offset + 2] >>> 4) & 0x0f
    const sampleRate = (bytes[offset + 2] >>> 2) & 0x03
    if (bitrate !== 0 && bitrate !== 0x0f && sampleRate !== 0x03) {
      found = true
      break
    }
  }
  ensure(found, "MP3 contains no valid audio frame")
}

function validateOgg(bytes) {
  ensure(bytes.length >= 29 && bytes.toString("ascii", 0, 4) === "OggS" && bytes[4] === 0, "Ogg signature or version is invalid")
  const segments = bytes[26]
  ensure(segments > 0 && 27 + segments <= bytes.length, "Ogg segment table is invalid")
  let payload = 0
  for (let index = 0; index < segments; index += 1) payload += bytes[27 + index]
  ensure(payload > 0 && 27 + segments + payload <= bytes.length, "Ogg page payload is truncated")
}

function validateWebm(bytes) {
  ensure(bytes.length >= 32 && bytes.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3])), "WebM EBML signature is invalid")
  ensure(bytes.indexOf(Buffer.from([0x18, 0x53, 0x80, 0x67])) >= 0, "WebM Segment element is missing")
  ensure(bytes.indexOf(Buffer.from([0x1f, 0x43, 0xb6, 0x75])) >= 0 || bytes.indexOf(Buffer.from([0xa3])) >= 0, "WebM contains no cluster or media block")
}

function validatePdf(bytes) {
  ensure(bytes.length >= 64 && /^%PDF-1\.[0-7]/u.test(bytes.toString("latin1", 0, 8)), "PDF signature or version is invalid")
  const tail = bytes.toString("latin1", Math.max(0, bytes.length - 1_024))
  ensure(/%%EOF\s*$/u.test(tail) && /\b\d+\s+\d+\s+obj\b/u.test(bytes.toString("latin1")), "PDF object stream or EOF marker is missing")
}

function validateSfnt(bytes, extension) {
  ensure(bytes.length >= 28, `${extension} font payload is too small`)
  const signature = bytes.toString("ascii", 0, 4)
  const numericSignature = bytes.readUInt32BE(0)
  ensure(signature === "OTTO" || signature === "true" || numericSignature === 0x00010000, `${extension} sfnt signature is invalid`)
  const tables = bytes.readUInt16BE(4)
  ensure(tables > 0 && 12 + tables * 16 <= bytes.length, `${extension} font table directory is invalid`)
  for (let index = 0; index < tables; index += 1) {
    const offset = 12 + index * 16
    const tableOffset = bytes.readUInt32BE(offset + 8)
    const tableLength = bytes.readUInt32BE(offset + 12)
    ensure(tableLength > 0 && tableOffset + tableLength <= bytes.length, `${extension} font table payload is invalid`)
  }
}

function validateWoff(bytes, extension) {
  const header = extension === ".woff2" ? 48 : 44
  const signature = extension === ".woff2" ? "wOF2" : "wOFF"
  ensure(bytes.length >= header && bytes.toString("ascii", 0, 4) === signature, `${extension} signature is invalid`)
  ensure(bytes.readUInt32BE(8) === bytes.length && bytes.readUInt16BE(12) > 0, `${extension} length or table count is invalid`)
  if (extension === ".woff") {
    const tables = bytes.readUInt16BE(12)
    ensure(header + tables * 20 <= bytes.length, ".woff table directory is truncated")
    for (let index = 0; index < tables; index += 1) {
      const offset = header + index * 20
      const tableOffset = bytes.readUInt32BE(offset + 4)
      const compressedLength = bytes.readUInt32BE(offset + 8)
      ensure(compressedLength > 0 && tableOffset + compressedLength <= bytes.length, ".woff table payload is invalid")
    }
  }
}

function validateEot(bytes) {
  ensure(bytes.length >= 82 && bytes.readUInt16LE(34) === 0x504c, "EOT signature or payload is invalid")
  ensure(bytes.readUInt32LE(0) === bytes.length && bytes.readUInt32LE(4) > 0, "EOT declared size is invalid")
}

function validateMediaBytes(extension, bytes) {
  try {
    if (extension === ".png") validatePng(bytes)
    else if (extension === ".jpg" || extension === ".jpeg") validateJpeg(bytes)
    else if (extension === ".webp") validateWebp(bytes)
    else if (extension === ".gif") validateGif(bytes)
    else if (extension === ".ico") validateIco(bytes)
    else if (extension === ".svg") validateSvg(bytes)
    else if (extension === ".avif" || extension === ".mp4" || extension === ".m4a") validateIsoMedia(bytes, extension)
    else if (extension === ".mp3") validateMp3(bytes)
    else if (extension === ".ogg") validateOgg(bytes)
    else if (extension === ".webm") validateWebm(bytes)
    else if (extension === ".pdf") validatePdf(bytes)
    else if (extension === ".ttf" || extension === ".otf") validateSfnt(bytes, extension)
    else if (extension === ".woff" || extension === ".woff2") validateWoff(bytes, extension)
    else if (extension === ".eot") validateEot(bytes)
    return null
  } catch (error) {
    return error.message
  }
}

const base = resolvedBase()
verifyTrustedMerge(base)
const requiredAssets = loadPolicy()
const entries = changedFiles(base)
const violations = []
let governedChangeBytes = 0
let totalChangeBytes = 0
let firstGovernedFile = null
let firstChangedFile = null

for (const { status, file } of entries) {
  if (protectPolicyFiles() && protectedPolicyFiles.has(file)) {
    violations.push({
      file,
      reason: "media-guard trust roots require a separately authorized base-policy update",
      size: 0,
    })
  }
  if (status === "D") continue

  const extension = extname(file).toLowerCase()
  let stats
  try {
    stats = lstatSync(file)
  } catch {
    violations.push({ file, reason: "changed path is unavailable for inspection", size: 0 })
    continue
  }
  const size = stats.size
  totalChangeBytes += size
  firstChangedFile ||= file

  const blockedSuffix = prohibitedSuffix(file)
  const limit = limits.get(extension)
  const controlled = isControlledMediaFile(file)
  if (controlled || limit || blockedSuffix) {
    governedChangeBytes += size
    firstGovernedFile ||= file
  }

  if (stats.isSymbolicLink()) {
    violations.push({ file, reason: "repository additions and type changes must not be symbolic links", size })
    continue
  }
  if (!stats.isFile()) {
    violations.push({ file, reason: "repository additions and type changes must be regular files", size })
    continue
  }

  const bytes = readFileSync(file)
  if (isGitLfsPointer(bytes)) {
    violations.push({ file, reason: "Git LFS pointers are not permitted; use the portfolio object store", size })
    continue
  }
  if (blockedSuffix) {
    violations.push({ file, reason: `${blockedSuffix} source/archive files belong in object storage`, size })
    continue
  }
  if (limit && size > limit) {
    violations.push({ file, reason: `${extension} exceeds the ${formatMiB(limit)} Git limit`, size })
    continue
  }
  if (controlled && !limit && !allowedMediaSidecars.has(extension)) {
    violations.push({ file, reason: `${extension || "extensionless"} is not a classified web-media format`, size })
    continue
  }
  if (controlled && allowedMediaSidecars.has(extension) && size > MAX_SIDECAR_BYTES) {
    violations.push({ file, reason: `${extension} sidecar exceeds the ${formatMiB(MAX_SIDECAR_BYTES)} Git limit`, size })
    continue
  }
  if (limit) {
    const invalidReason = validateMediaBytes(extension, bytes)
    if (invalidReason) {
      violations.push({ file, reason: `invalid ${extension} media: ${invalidReason}`, size })
      continue
    }
  }
  if (size > MAX_GENERIC_FILE_BYTES) {
    violations.push({ file, reason: `unclassified file exceeds the ${formatMiB(MAX_GENERIC_FILE_BYTES)} Git limit`, size })
  }
}

for (const [file, expectedDigest] of requiredAssets) {
  let stats
  let bytes
  try {
    stats = lstatSync(file)
    if (!stats.isFile() || stats.isSymbolicLink()) throw new Error("not a regular file")
    bytes = readFileSync(file)
  } catch {
    violations.push({ file, reason: "required media asset is missing or not a regular file", size: 0 })
    continue
  }
  const actualDigest = createHash("sha256").update(bytes).digest("hex")
  if (actualDigest !== expectedDigest) {
    violations.push({ file, reason: "required media asset content changed without a trusted base-policy update", size: stats.size })
  }
}

if (governedChangeBytes > MAX_GOVERNED_CHANGE_BYTES && firstGovernedFile) {
  violations.push({
    file: firstGovernedFile,
    reason: `governed media changes exceed the ${formatMiB(MAX_GOVERNED_CHANGE_BYTES)} pull-request budget`,
    size: governedChangeBytes,
  })
}
if (totalChangeBytes > MAX_TOTAL_CHANGE_BYTES && firstChangedFile) {
  violations.push({
    file: firstChangedFile,
    reason: `changed files exceed the ${formatMiB(MAX_TOTAL_CHANGE_BYTES)} pull-request budget`,
    size: totalChangeBytes,
  })
}

if (violations.length > 0) {
  console.error("Media policy violations:\n")
  for (const violation of violations) {
    console.error(`- ${formatLogValue(violation.file)} (${formatMiB(violation.size)}): ${formatLogValue(violation.reason)}`)
    console.error(`::error file=${escapeWorkflowCommandProperty(violation.file)}::${escapeWorkflowCommandMessage(violation.reason)}; file size ${formatMiB(violation.size)}`)
  }
  console.error("\nStore the original in the portfolio object store and commit only its versioned URL/manifest entry.")
  process.exit(1)
}

console.log(`Media guard passed for ${entries.length} changed path(s).`)
