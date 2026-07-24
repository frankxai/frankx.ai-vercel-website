import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readdir, readFile, stat } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { describe, it } from "node:test"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")

async function read(relativePath, encoding = "utf8") {
  return readFile(path.join(root, relativePath), encoding)
}

async function collectTextFiles(relativeDirectory) {
  const directory = path.join(root, relativeDirectory)
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const relativePath = path.join(relativeDirectory, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectTextFiles(relativePath)))
    } else if (/\.(?:css|json|md|ts|tsx)$/.test(entry.name)) {
      files.push(relativePath)
    }
  }

  return files
}

describe("v0 catalog data contract", () => {
  it("keeps the curated graph internally referential and source-attributed", async () => {
    const graph = JSON.parse(await read("content/v0/knowledge-graph.json"))
    assert.equal(graph.nodes.length, 61)
    assert.equal(graph.edges.length, 69)

    const ids = graph.nodes.map((node) => node.id)
    assert.equal(new Set(ids).size, ids.length)
    const idSet = new Set(ids)

    for (const source of graph.sources) {
      const url = new URL(source)
      assert.equal(url.protocol, "https:")
    }
    for (const node of graph.nodes) {
      const url = new URL(node.url)
      assert.equal(url.protocol, "https:", node.id)
      assert.ok(node.category, node.id)
      assert.ok(Array.isArray(node.patterns) && node.patterns.length > 0, node.id)
      assert.doesNotMatch(node.ratingSignal ?? "", /v0\.app official/i)
    }
    for (const edge of graph.edges) {
      assert.equal(idSet.has(edge.from), true, `${edge.from} is missing`)
      assert.equal(idSet.has(edge.to), true, `${edge.to} is missing`)
      assert.ok(
        ["inspiredBy", "sameStack", "sharesPattern", "upgradeOf"].includes(
          edge.type,
        ),
      )
    }
  })
})

describe("v0 first-party asset contract", () => {
  it("ships every declared generated still as an inspected high-resolution PNG", async () => {
    const manifest = JSON.parse(
      await read("content/v0/templates/creator-workflow-foundry.json"),
    )
    assert.equal(manifest.sourceClass, "frankx-first-party")
    assert.equal(manifest.assets.length, 5)
    assert.ok(manifest.productionBlockers.length >= 5)

    for (const asset of manifest.assets) {
      assert.equal(asset.kind, "generated-still")
      assert.equal(asset.inspected, true)
      assert.equal(asset.rightsStatus, "internal-review")

      const relativePath = `public${asset.path}`
      const assetStat = await stat(path.join(root, relativePath))
      assert.ok(assetStat.size > 20_000, `${asset.path} is unexpectedly small`)

      const bytes = await read(relativePath, null)
      assert.equal(bytes.subarray(1, 4).toString("ascii"), "PNG")
      const width = bytes.readUInt32BE(16)
      const height = bytes.readUInt32BE(20)
      assert.ok(width >= 900, `${asset.path} width is ${width}`)
      assert.ok(height >= 900, `${asset.path} height is ${height}`)
      assert.ok(width * height >= 1_500_000, `${asset.path} has too few pixels`)
    }
  })
})

describe("v0 secure preview contract", () => {
  it("keeps preview credentials server-only and public identifiers neutral", async () => {
    const publicRoots = [
      "app/api/v0-preview",
      "app/v0",
      "components/v0",
      "content/v0",
      "lib/v0",
    ]
    const files = (
      await Promise.all(publicRoots.map((directory) => collectTextFiles(directory)))
    ).flat()
    const corpus = (
      await Promise.all(files.map(async (file) => `${file}\n${await read(file)}`))
    ).join("\n")

    const privateValueHashes = new Set([
      "f5a25868af34e8d17f0cf7334dc79794d91550b3d59419a86ef5be508a32537a",
      "c5da3360a23fe50868e2c03d4720d191ce305be2c8639644019345d98fcea8c5",
      "1681129e84730ca9d167d837bcd2caf24dcefd76c3a46b048a4bf42232a9305d",
    ])
    const identifierCandidates = new Set(
      corpus.match(/[A-Za-z0-9_-]{6,128}/g) ?? [],
    )
    for (const candidate of identifierCandidates) {
      const fingerprint = createHash("sha256").update(candidate).digest("hex")
      assert.equal(
        privateValueHashes.has(fingerprint),
        false,
        "A private v0 identifier fingerprint appeared in the public corpus.",
      )
    }
    assert.doesNotMatch(corpus, /vusercontent|__v0_token/i)

    const config = await read("lib/v0/preview/config.ts")
    const policy = await read("lib/v0/preview/config-policy.ts")
    const configurationBoundary = `${config}\n${policy}`
    assert.match(config, /import "server-only"/)
    assert.match(configurationBoundary, /V0_PREVIEW_BETA_ENABLED/)
    assert.match(configurationBoundary, /V0_PREVIEW_CHAT_MAP/)
    assert.match(configurationBoundary, /V0_API_KEY/)
    assert.doesNotMatch(configurationBoundary, /NEXT_PUBLIC_/)
  })

  it("allowlists request headers and strips stateful response headers", async () => {
    const proxy = await read("lib/v0/preview/proxy.ts")
    const core = await read("lib/v0/preview/proxy-core.ts")
    const route = await read(
      "app/api/v0-preview/[previewKey]/[[...path]]/route.ts",
    )
    const loadingRoute = await read(
      "app/api/v0-preview/[previewKey]/loading/route.ts",
    )
    assert.match(proxy, /import "server-only"/)
    assert.match(route, /import "server-only"/)
    assert.match(loadingRoute, /import "server-only"/)
    assert.match(core, /const SAFE_PREVIEW_REQUEST_HEADERS/)
    assert.match(core, /const SAFE_PREVIEW_RESPONSE_HEADERS/)
    assert.doesNotMatch(core, /new Headers\(response\.headers\)/)
    assert.match(core, /headers\.set\("cache-control", "private, no-store"\)/)
    assert.doesNotMatch(core, /headers:\s*request\.headers/)
    assert.match(core, /request\.method !== "GET"/)
    assert.match(core, /request\.method !== "HEAD"/)
  })

  it("isolates the embedded preview from the FrankX origin", async () => {
    const frame = await read("components/v0/V0PreviewFrame.tsx")
    const sandbox = frame.match(/sandbox="([^"]+)"/)?.[1] ?? ""
    assert.match(sandbox, /allow-scripts/)
    assert.doesNotMatch(sandbox, /allow-same-origin/)
    assert.doesNotMatch(sandbox, /allow-forms/)
    assert.match(frame, /referrerPolicy="no-referrer"/)
    assert.match(frame, /getPreviewReadiness/)
  })
})
