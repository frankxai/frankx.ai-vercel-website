export interface ZipEntry {
  path: string
  content: string | Uint8Array
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let k = 0; k < 8; k++) {
      c = (c & 1) !== 0 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    }
    table[i] = c >>> 0
  }
  return table
})()

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff
  for (let i = 0; i < bytes.length; i++) {
    crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8)
  }
  return (crc ^ 0xffffffff) >>> 0
}

export function buildZipArchive(entries: ZipEntry[]): Uint8Array<ArrayBuffer> {
  if (entries.length === 0 || entries.length > 64) {
    throw new Error('Archive must contain between 1 and 64 entries.')
  }
  const encoder = new TextEncoder()
  const seen = new Set<string>()
  const locals: Uint8Array[] = []
  const centrals: Uint8Array[] = []
  let offset = 0

  for (const entry of entries) {
    if (
      !entry.path ||
      entry.path.startsWith('/') ||
      entry.path.includes('..') ||
      !/^[A-Za-z0-9_./-]+$/.test(entry.path) ||
      seen.has(entry.path)
    ) {
      throw new Error(`Invalid archive entry path: ${entry.path}`)
    }
    seen.add(entry.path)

    const nameBytes = encoder.encode(entry.path)
    const bodyBytes = typeof entry.content === 'string' ? encoder.encode(entry.content) : entry.content
    if (offset + bodyBytes.length > 4_194_304) {
      throw new Error('Archive exceeds 4 MB safety ceiling.')
    }
    const checksum = crc32(bodyBytes)

    const local = new Uint8Array(30 + nameBytes.length + bodyBytes.length)
    const lv = new DataView(local.buffer)
    lv.setUint32(0, 0x04034b50, true)
    lv.setUint16(4, 20, true)
    lv.setUint16(6, 0x0800, true)
    lv.setUint16(12, 0x5421, true)
    lv.setUint32(14, checksum, true)
    lv.setUint32(18, bodyBytes.length, true)
    lv.setUint32(22, bodyBytes.length, true)
    lv.setUint16(26, nameBytes.length, true)
    local.set(nameBytes, 30)
    local.set(bodyBytes, 30 + nameBytes.length)

    const central = new Uint8Array(46 + nameBytes.length)
    const cv = new DataView(central.buffer)
    cv.setUint32(0, 0x02014b50, true)
    cv.setUint16(4, 20, true)
    cv.setUint16(6, 20, true)
    cv.setUint16(8, 0x0800, true)
    cv.setUint16(14, 0x5421, true)
    cv.setUint32(16, checksum, true)
    cv.setUint32(20, bodyBytes.length, true)
    cv.setUint32(24, bodyBytes.length, true)
    cv.setUint16(28, nameBytes.length, true)
    cv.setUint32(42, offset, true)
    central.set(nameBytes, 46)

    offset += local.length
    locals.push(local)
    centrals.push(central)
  }

  const centralSize = centrals.reduce((sum, item) => sum + item.length, 0)
  const out = new Uint8Array(offset + centralSize + 22)
  let cursor = 0
  for (const part of [...locals, ...centrals]) {
    out.set(part, cursor)
    cursor += part.length
  }
  const ev = new DataView(out.buffer, cursor)
  ev.setUint32(0, 0x06054b50, true)
  ev.setUint16(8, entries.length, true)
  ev.setUint16(10, entries.length, true)
  ev.setUint32(12, centralSize, true)
  ev.setUint32(16, offset, true)

  return out
}
