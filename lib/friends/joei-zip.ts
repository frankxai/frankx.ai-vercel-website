// ZIP storage mode keeps this small, fixed-size download independent of an archive dependency.
export function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff
  for (const byte of bytes) {
    crc ^= byte
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0)
  }
  return (crc ^ 0xffffffff) >>> 0
}

export function createJoeiZip(entries: readonly { name: string; bytes: Uint8Array }[]): Uint8Array {
  const local: Buffer[] = []
  const directory: Buffer[] = []
  let offset = 0
  for (const entry of entries) {
    if (!entry.name || entry.name.startsWith('/') || entry.name.split('/').some(part => part === '..')) {
      throw new Error('Invalid archive entry name')
    }
    const name = Buffer.from(entry.name, 'utf8')
    const bytes = Buffer.from(entry.bytes)
    const checksum = crc32(bytes)
    const header = Buffer.alloc(30)
    header.writeUInt32LE(0x04034b50, 0)
    header.writeUInt16LE(20, 4)
    header.writeUInt16LE(0x0800, 6)
    header.writeUInt16LE(33, 12) // DOS date: 1980-01-01, deterministic for a fixed edition.
    header.writeUInt32LE(checksum, 14)
    header.writeUInt32LE(bytes.length, 18)
    header.writeUInt32LE(bytes.length, 22)
    header.writeUInt16LE(name.length, 26)
    const record = Buffer.alloc(46)
    record.writeUInt32LE(0x02014b50, 0)
    record.writeUInt16LE(20, 4)
    record.writeUInt16LE(20, 6)
    record.writeUInt16LE(0x0800, 8)
    record.writeUInt16LE(33, 14)
    record.writeUInt32LE(checksum, 16)
    record.writeUInt32LE(bytes.length, 20)
    record.writeUInt32LE(bytes.length, 24)
    record.writeUInt16LE(name.length, 28)
    record.writeUInt32LE(offset, 42)
    local.push(header, name, bytes)
    directory.push(record, name)
    offset += header.length + name.length + bytes.length
  }
  const central = Buffer.concat(directory)
  const end = Buffer.alloc(22)
  end.writeUInt32LE(0x06054b50, 0)
  end.writeUInt16LE(entries.length, 8)
  end.writeUInt16LE(entries.length, 10)
  end.writeUInt32LE(central.length, 12)
  end.writeUInt32LE(offset, 16)
  return new Uint8Array(Buffer.concat([...local, central, end]))
}
