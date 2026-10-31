import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile, stat } from 'node:fs/promises'
import test from 'node:test'
import ts from 'typescript'

const root = new URL('../../public/fonts/brand/', import.meta.url)
const manifest = JSON.parse(await readFile(new URL('FONT_PROVENANCE.json', root), 'utf8'))
const families = ['Inter', 'Poppins', 'Playfair Display', 'JetBrains Mono', 'Cormorant Garamond', 'Lora', 'Dancing Script', 'EB Garamond', 'DM Serif Display', 'Outfit']

function table(bytes, tag) {
  const count = bytes.readUInt16BE(4)
  assert.ok(12 + count * 16 <= bytes.length, 'invalid sfnt directory')
  for (let i = 0; i < count; i++) {
    const entry = 12 + i * 16
    if (bytes.toString('ascii', entry, entry + 4) !== tag) continue
    const offset = bytes.readUInt32BE(entry + 8), size = bytes.readUInt32BE(entry + 12)
    assert.ok(offset + size <= bytes.length, `invalid ${tag} bounds`)
    return bytes.subarray(offset, offset + size)
  }
  assert.fail(`missing ${tag}`)
}

// Microsoft OpenType cmap formats 4 and 12, read from the actual font bytes.
function unicodeMaps(bytes) {
  const cmap = table(bytes, 'cmap'), maps = [], count = cmap.readUInt16BE(2)
  assert.ok(4 + count * 8 <= cmap.length)
  for (let i = 0; i < count; i++) {
    const entry = 4 + i * 8, platform = cmap.readUInt16BE(entry), encoding = cmap.readUInt16BE(entry + 2)
    if (platform !== 0 && !(platform === 3 && [1, 10].includes(encoding))) continue
    const offset = cmap.readUInt32BE(entry + 4)
    assert.ok(offset + 4 <= cmap.length)
    const format = cmap.readUInt16BE(offset)
    if (![4, 12].includes(format)) continue
    const size = format === 4 ? cmap.readUInt16BE(offset + 2) : cmap.readUInt32BE(offset + 4)
    assert.ok(offset + size <= cmap.length)
    maps.push(cmap.subarray(offset, offset + size))
  }
  assert.ok(maps.length, 'no Unicode cmap')
  return maps
}

function hasGlyph(map, code) {
  if (map.readUInt16BE(0) === 12) {
    const count = map.readUInt32BE(12)
    assert.ok(16 + count * 12 <= map.length)
    for (let i = 0; i < count; i++) {
      const at = 16 + i * 12, start = map.readUInt32BE(at), end = map.readUInt32BE(at + 4)
      if (code >= start && code <= end) return map.readUInt32BE(at + 8) + code - start !== 0
    }
    return false
  }
  if (code > 0xffff) return false
  const count = map.readUInt16BE(6) / 2
  const starts = 16 + count * 2, deltas = starts + count * 2, ranges = deltas + count * 2
  assert.ok(ranges + count * 2 <= map.length)
  for (let i = 0; i < count; i++) {
    if (code < map.readUInt16BE(starts + i * 2) || code > map.readUInt16BE(14 + i * 2)) continue
    const delta = map.readInt16BE(deltas + i * 2), range = map.readUInt16BE(ranges + i * 2)
    if (!range) return ((code + delta) & 0xffff) !== 0
    const at = ranges + i * 2 + range + (code - map.readUInt16BE(starts + i * 2)) * 2
    assert.ok(at + 2 <= map.length)
    const glyph = map.readUInt16BE(at)
    return glyph !== 0 && ((glyph + delta) & 0xffff) !== 0
  }
  return false
}

function literal(node) {
  if (ts.isStringLiteral(node)) return node.text
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(literal)
  if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map(property => {
    assert.ok(ts.isPropertyAssignment(property), 'font options must be literal properties')
    return [property.name.text, literal(property.initializer)]
  }))
  assert.fail('font arguments must contain static literals')
}

function fontDeclarations(source, filename) {
  const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const imported = ast.statements.find(node => ts.isImportDeclaration(node) && node.moduleSpecifier.text === 'next/font/local')
  assert.ok(imported?.importClause?.name, 'route must import the local loader directly')
  const name = imported.importClause.name.text, allowed = new Set(), configs = new Map()
  for (const statement of ast.statements) {
    if (!ts.isVariableStatement(statement) || !(statement.declarationList.flags & ts.NodeFlags.Const)) continue
    for (const declaration of statement.declarationList.declarations) {
      const call = declaration.initializer
      if (!call || !ts.isCallExpression(call) || call.expression.getText(ast) !== name) continue
      assert.equal(call.arguments.length, 1)
      configs.set(declaration.name.getText(ast), literal(call.arguments[0]))
      allowed.add(call)
    }
  }
  function visit(node) {
    if (ts.isCallExpression(node) && node.expression.getText(ast) === name) assert.ok(allowed.has(node), 'font loader must be a direct module scope const')
    ts.forEachChild(node, visit)
  }
  visit(ast)
  return configs
}

test('font bytes, immutable identities and licenses match provenance', async () => {
  assert.match(manifest.sourceRevision, /^[a-f0-9]{40}$/)
  let total = 0
  for (const asset of manifest.assets) {
    assert.match(asset.path, /^[A-Za-z0-9-]+\.ttf$/)
    assert.match(asset.licensePath, /^OFL-[a-z]+\.txt$/)
    const bytes = await readFile(new URL(asset.path, root)); total += bytes.length
    assert.ok(['00010000', '4f54544f'].includes(bytes.subarray(0, 4).toString('hex')), `${asset.path}: invalid sfnt header`)
    assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256)
    assert.equal(bytes.length, asset.bytes)
    const url = new URL(asset.officialDownloadUrl)
    assert.equal(url.origin, 'https://raw.githubusercontent.com')
    assert.ok(url.pathname.startsWith(`/google/fonts/${manifest.sourceRevision}/ofl/`))
    const delivery = asset.delivery
    assert.equal(delivery.path, asset.path.replace(/\.ttf$/, '.woff2'))
    const compressed = await readFile(new URL(delivery.path, root)); total += compressed.length
    assert.equal(compressed.toString('ascii', 0, 4), 'wOF2', `${delivery.path}: invalid WOFF2 header`)
    assert.equal(compressed.readUInt32BE(8), compressed.length, `${delivery.path}: invalid WOFF2 length`)
    assert.equal(createHash('sha256').update(compressed).digest('hex'), delivery.sha256)
    assert.equal(compressed.length, delivery.bytes)
    assert.equal(delivery.sourceInputSha256, asset.sha256)
    assert.ok((await stat(new URL(asset.licensePath, root))).size > 1000)
  }
  for (const license of new Set(manifest.assets.map(asset => asset.licensePath))) {
    const text = await readFile(new URL(license, root), 'utf8')
    assert.match(text, /SIL OPEN FONT LICENSE Version 1\.1/)
    total += Buffer.byteLength(text)
  }
  total += (await stat(new URL('FONT_PROVENANCE.json', root))).size
  assert.ok(total <= 10 * 1024 * 1024, `${total} font bytes exceed the bound`)
  for (const family of families) assert.ok(manifest.assets.some(asset => asset.family === family), `missing ${family}`)
})

test('actual Unicode mappings cover representative English and German in every face', async () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÄÖÜäöüß'
  for (const asset of manifest.assets) {
    const maps = unicodeMaps(await readFile(new URL(asset.path, root)))
    for (const character of characters) assert.ok(maps.some(map => hasGlyph(map, character.codePointAt(0))), `${asset.path} lacks ${character}`)
  }
})

test('framework declaration contract rejects a factory and dynamic arguments', () => {
  const prefix = "import font from 'next/font/local'; "
  assert.throws(() => fontDeclarations(prefix + 'const make = src => font({src});', 'bad.tsx'), /module scope/)
  assert.throws(() => fontDeclarations(prefix + 'const x = font({src: file});', 'bad.tsx'), /static literals/)
  assert.equal(fontDeclarations(prefix + "const x = font({src: 'a.ttf'});", 'good.tsx').size, 1)
})

test('route-local literals preserve baseline variants, variables and preload scope', async () => {
  assert.equal(manifest.baselineSourceCommit, '1cd70d1825e2767a5ab3d6e917081bca32e0e729')
  assert.equal(manifest.usageProfiles.length, 21)
  for (const file of new Set(manifest.usageProfiles.map(profile => profile.routeFile))) {
    const source = await readFile(new URL(`../../${file}`, import.meta.url), 'utf8')
    assert.doesNotMatch(source, /next\/font\/google|@\/lib\/brand-fonts/)
    const declarations = fontDeclarations(source, file)
    const expected = manifest.usageProfiles.filter(profile => profile.routeFile === file)
    assert.equal(declarations.size, expected.length)
    for (const profile of expected) {
      const options = declarations.get(profile.name)
      assert.ok(options, `${file}: missing ${profile.name}`)
      assert.deepEqual(options.src, profile.sources)
      assert.equal(options.variable, profile.variable)
      assert.equal(options.display, profile.display)
      assert.equal(options.preload ?? true, profile.preload)
      assert.equal(options.adjustFontFallback, profile.fallbackFont)
    }
  }
})
