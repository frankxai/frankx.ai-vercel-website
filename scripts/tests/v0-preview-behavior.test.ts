import assert from "node:assert/strict"
import { describe, it } from "node:test"

import {
  getPreviewTtlSeconds,
  isPreviewFresh,
} from "../../lib/v0/preview/cache-policy"
import {
  loadPreviewWithDependencies,
  proxyPreviewRequestWithDependencies,
  type PreviewFetchInput,
  type PreviewLoaderDependencies,
  type PreviewProxyDependencies,
} from "../../lib/v0/preview/proxy-core"

const freshPreview = {
  url: "https://preview.example.test",
  token: "private-preview-token",
  expiresAt: "2030-01-01T00:10:00.000Z",
}

function loaderDependencies(
  overrides: Partial<PreviewLoaderDependencies> = {},
): PreviewLoaderDependencies {
  return {
    getCachedPreview: async () => null,
    getRemotePreview: async () => null,
    setCachedPreview: async () => undefined,
    deleteCachedPreview: async () => undefined,
    ...overrides,
  }
}

describe("v0 preview cache behavior", () => {
  it("uses a fresh cache hit without requesting or rewriting remote data", async () => {
    let remoteReads = 0
    let writes = 0
    const result = await loadPreviewWithDependencies(
      "visual-foundry",
      "private-chat-id",
      loaderDependencies({
        getCachedPreview: async () => freshPreview,
        getRemotePreview: async () => {
          remoteReads += 1
          return null
        },
        setCachedPreview: async () => {
          writes += 1
        },
      }),
    )

    assert.deepEqual(result, freshPreview)
    assert.equal(remoteReads, 0)
    assert.equal(writes, 0)
  })

  it("normalizes and caches a remote preview on a cache miss", async () => {
    const expiresAt = new Date("2030-01-01T00:10:00.000Z")
    let stored: typeof freshPreview | null = null
    const result = await loadPreviewWithDependencies(
      "visual-foundry",
      "private-chat-id",
      loaderDependencies({
        getRemotePreview: async (chatId) => {
          assert.equal(chatId, "private-chat-id")
          return { ...freshPreview, expiresAt }
        },
        setCachedPreview: async (previewKey, preview) => {
          assert.equal(previewKey, "visual-foundry")
          stored = preview
        },
      }),
    )

    assert.deepEqual(result, freshPreview)
    assert.deepEqual(stored, freshPreview)
  })

  it("invalidates missing and near-expiry previews before reuse", async () => {
    let invalidations = 0
    const missing = await loadPreviewWithDependencies(
      "visual-foundry",
      "private-chat-id",
      loaderDependencies({
        deleteCachedPreview: async () => {
          invalidations += 1
        },
      }),
    )

    const now = Date.parse("2030-01-01T00:00:00.000Z")
    assert.equal(missing, null)
    assert.equal(invalidations, 1)
    assert.equal(
      isPreviewFresh(
        { expiresAt: "2030-01-01T00:00:59.999Z" },
        now,
      ),
      false,
    )
    assert.equal(
      isPreviewFresh(
        { expiresAt: "2030-01-01T00:01:00.001Z" },
        now,
      ),
      true,
    )
    assert.equal(
      getPreviewTtlSeconds(
        { expiresAt: "2030-01-01T00:02:30.000Z" },
        now,
      ),
      90,
    )
  })
})

describe("v0 preview proxy behavior", () => {
  it("rejects non-read-only methods before resolving credentials", async () => {
    let credentialReads = 0
    const dependencies = {
      ...loaderDependencies(),
      resolvePreviewChatId: () => {
        credentialReads += 1
        return "private-chat-id"
      },
      fetchPreview: async () => new Response("unexpected"),
    }
    const response = await proxyPreviewRequestWithDependencies(
      new Request("https://frankx.ai/api/v0-preview/visual-foundry/", {
        method: "POST",
        body: "mutation",
      }),
      "visual-foundry",
      [],
      dependencies,
    )

    assert.equal(response.status, 405)
    assert.equal(response.headers.get("allow"), "GET, HEAD")
    assert.equal(credentialReads, 0)
  })

  it("proxies nested navigation with an allowlist and a safe loading fallback", async () => {
    let captured: PreviewFetchInput | null = null
    let invalidatedKey: string | null = null
    const dependencies: PreviewProxyDependencies = {
      ...loaderDependencies({
        getCachedPreview: async () => freshPreview,
        deleteCachedPreview: async (previewKey) => {
          invalidatedKey = previewKey
        },
      }),
      resolvePreviewChatId: (previewKey) => {
        assert.equal(previewKey, "visual-foundry")
        return "private-chat-id"
      },
      fetchPreview: async (input) => {
        captured = input
        return new Response("preview-body", {
          status: 206,
          headers: {
            "content-type": "text/css",
            "set-cookie": "session=blocked",
            "x-powered-by": "upstream",
          },
        })
      },
    }
    const request = new Request(
      "https://frankx.ai/api/v0-preview/visual-foundry/assets/app.css?theme=dark",
      {
        headers: {
          accept: "text/css",
          range: "bytes=0-99",
          cookie: "frankx-session=blocked",
          authorization: "Bearer blocked",
          "x-forwarded-host": "blocked.example",
        },
      },
    )
    const response = await proxyPreviewRequestWithDependencies(
      request,
      "visual-foundry",
      ["assets", "app.css"],
      dependencies,
    )

    assert.ok(captured)
    const proxied = captured as PreviewFetchInput | null
    assert.ok(proxied)
    assert.equal(proxied.request.headers.get("accept"), "text/css")
    assert.equal(proxied.request.headers.get("range"), "bytes=0-99")
    assert.equal(proxied.request.headers.get("cookie"), null)
    assert.equal(proxied.request.headers.get("authorization"), null)
    assert.equal(proxied.request.headers.get("x-forwarded-host"), null)
    assert.deepEqual(proxied.path, ["assets", "app.css"])
    assert.deepEqual(proxied.preview, {
      ...freshPreview,
      expiresAt: new Date(freshPreview.expiresAt),
    })

    const fallback = new URL(proxied.fallbackUrl, "https://frankx.ai")
    assert.equal(
      fallback.pathname,
      "/api/v0-preview/visual-foundry/loading",
    )
    assert.equal(
      fallback.searchParams.get("returnTo"),
      "/api/v0-preview/visual-foundry/assets/app.css?theme=dark",
    )

    await proxied.onPreviewRefresh()
    assert.equal(invalidatedKey, "visual-foundry")
    assert.equal(response.status, 206)
    assert.equal(await response.text(), "preview-body")
    assert.equal(response.headers.get("set-cookie"), null)
    assert.equal(response.headers.get("x-powered-by"), null)
    assert.equal(response.headers.get("cache-control"), "private, no-store")
    assert.equal(response.headers.get("referrer-policy"), "no-referrer")
    assert.equal(response.headers.get("x-content-type-options"), "nosniff")
  })
})
