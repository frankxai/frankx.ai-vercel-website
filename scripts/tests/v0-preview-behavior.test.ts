import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { fetchPreview as fetchV0Preview } from "v0"

import {
  getPreviewTtlSeconds,
  isPreviewFresh,
} from "../../lib/v0/preview/cache-policy"
import {
  getPreviewConfigurationForEnvironment,
  getSharedPreviewCacheProviderForEnvironment,
} from "../../lib/v0/preview/config-policy"
import {
  getSafePreviewReturnTo,
  loadPreviewWithDependencies,
  proxyPreviewRequestWithDependencies,
  type PreviewFetchInput,
  type PreviewLoaderDependencies,
  type PreviewProxyDependencies,
} from "../../lib/v0/preview/proxy-core"

const freshPreview = {
  url: "https://preview.example.test",
  token: "private-preview-token",
  expiresAt: "2100-01-01T00:10:00.000Z",
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
    const expiresAt = new Date(freshPreview.expiresAt)
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

  it("evicts a stale cache entry before fetching and caching a replacement", async () => {
    const stalePreview = {
      ...freshPreview,
      expiresAt: "2000-01-01T00:00:00.000Z",
    }
    const events: string[] = []
    const result = await loadPreviewWithDependencies(
      "visual-foundry",
      "private-chat-id",
      loaderDependencies({
        getCachedPreview: async () => stalePreview,
        deleteCachedPreview: async () => {
          events.push("delete")
        },
        getRemotePreview: async () => {
          events.push("remote")
          return freshPreview
        },
        setCachedPreview: async () => {
          events.push("set")
        },
      }),
    )

    assert.deepEqual(result, freshPreview)
    assert.deepEqual(events, ["delete", "remote", "set"])
  })

  it("rejects a stale remote preview without caching or returning it", async () => {
    let writes = 0
    let invalidations = 0
    const result = await loadPreviewWithDependencies(
      "visual-foundry",
      "private-chat-id",
      loaderDependencies({
        getRemotePreview: async () => ({
          ...freshPreview,
          expiresAt: "2000-01-01T00:00:00.000Z",
        }),
        setCachedPreview: async () => {
          writes += 1
        },
        deleteCachedPreview: async () => {
          invalidations += 1
        },
      }),
    )

    assert.equal(result, null)
    assert.equal(writes, 0)
    assert.equal(invalidations, 1)
  })

  it("rejects malformed remote preview metadata", async () => {
    const invalidRemotes = [
      { ...freshPreview, expiresAt: "not-a-date" },
      { ...freshPreview, url: "http://preview.example.test" },
      { ...freshPreview, token: "" },
    ]

    for (const remote of invalidRemotes) {
      let writes = 0
      const result = await loadPreviewWithDependencies(
        "visual-foundry",
        "private-chat-id",
        loaderDependencies({
          getRemotePreview: async () => remote,
          setCachedPreview: async () => {
            writes += 1
          },
        }),
      )

      assert.equal(result, null)
      assert.equal(writes, 0)
    }
  })
})

describe("v0 preview readiness policy", () => {
  const configured = {
    V0_PREVIEW_BETA_ENABLED: "true",
    V0_API_KEY: "server-credential",
    V0_PREVIEW_CHAT_MAP: JSON.stringify({
      "visual-foundry": "private-chat-id",
    }),
  }

  it("fails closed through every configuration gate", () => {
    assert.equal(
      getPreviewConfigurationForEnvironment("visual-foundry", {}).readiness,
      "disabled",
    )
    assert.equal(
      getPreviewConfigurationForEnvironment("visual-foundry", {
        V0_PREVIEW_BETA_ENABLED: "true",
      }).readiness,
      "credentials-required",
    )
    assert.equal(
      getPreviewConfigurationForEnvironment("visual-foundry", {
        ...configured,
        V0_PREVIEW_CHAT_MAP: "{invalid",
      }).readiness,
      "mapping-required",
    )
    assert.equal(
      getPreviewConfigurationForEnvironment("invalid/key", configured)
        .readiness,
      "mapping-required",
    )
    assert.equal(
      getPreviewConfigurationForEnvironment("constructor", {
        ...configured,
        V0_PREVIEW_CHAT_MAP: "{}",
      }).readiness,
      "mapping-required",
    )
    assert.equal(
      getPreviewConfigurationForEnvironment("visual-foundry", {
        ...configured,
        VERCEL_ENV: "production",
      }).readiness,
      "shared-cache-required",
    )
  })

  it("returns the private chat id only after development or production is ready", () => {
    assert.deepEqual(
      getPreviewConfigurationForEnvironment("visual-foundry", configured),
      { readiness: "ready", chatId: "private-chat-id" },
    )
    assert.deepEqual(
      getPreviewConfigurationForEnvironment("visual-foundry", {
        ...configured,
        VERCEL_ENV: "production",
        KV_REST_API_URL: "https://cache.example.test",
        KV_REST_API_TOKEN: "server-cache-token",
      }),
      { readiness: "ready", chatId: "private-chat-id" },
    )
    assert.deepEqual(
      getPreviewConfigurationForEnvironment("visual-foundry", {
        ...configured,
        VERCEL_ENV: "production",
        UPSTASH_REDIS_REST_URL: "https://cache.example.test",
        UPSTASH_REDIS_REST_TOKEN: "server-cache-token",
      }),
      { readiness: "ready", chatId: "private-chat-id" },
    )
  })

  it("selects only complete shared-cache bindings", () => {
    assert.equal(getSharedPreviewCacheProviderForEnvironment({}), null)
    assert.equal(
      getSharedPreviewCacheProviderForEnvironment({
        UPSTASH_REDIS_REST_URL: "https://cache.example.test",
      }),
      null,
    )
    assert.equal(
      getSharedPreviewCacheProviderForEnvironment({
        KV_REST_API_URL: "https://cache.example.test",
        KV_REST_API_TOKEN: "server-cache-token",
        UPSTASH_REDIS_REST_URL: "https://other-cache.example.test",
        UPSTASH_REDIS_REST_TOKEN: "other-server-cache-token",
      }),
      "vercel-kv",
    )
    assert.equal(
      getSharedPreviewCacheProviderForEnvironment({
        UPSTASH_REDIS_REST_URL: "https://cache.example.test",
        UPSTASH_REDIS_REST_TOKEN: "server-cache-token",
      }),
      "upstash",
    )
  })
})

describe("v0 preview proxy behavior", () => {
  it("keeps decoded SDK bodies aligned with stripped encoding metadata", async () => {
    const response = await fetchV0Preview({
      request: new Request(
        "https://frankx.ai/api/v0-preview/visual-foundry/assets/app.js",
      ),
      preview: {
        ...freshPreview,
        expiresAt: new Date(freshPreview.expiresAt),
      },
      fallbackUrl:
        "https://frankx.ai/api/v0-preview/visual-foundry/loading",
      path: ["assets", "app.js"],
      fetch: async (_input, init) => {
        assert.equal(
          new Headers(init?.headers).get("x-v0-preview-token"),
          "private-preview-token",
        )
        return new Response("decoded-body", {
          headers: {
            "content-encoding": "gzip",
            "content-length": "42",
            "content-type": "text/javascript",
          },
        })
      },
    })

    assert.equal(response.headers.get("content-encoding"), null)
    assert.equal(response.headers.get("content-length"), null)
    assert.equal(response.headers.get("content-type"), "text/javascript")
    assert.equal(await response.text(), "decoded-body")
  })

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

  it("allows HEAD through the same read-only proxy boundary", async () => {
    const dependencies: PreviewProxyDependencies = {
      ...loaderDependencies({ getCachedPreview: async () => freshPreview }),
      resolvePreviewChatId: () => "private-chat-id",
      fetchPreview: async (input) => {
        assert.equal(input.request.method, "HEAD")
        return new Response(null, { status: 204 })
      },
    }
    const response = await proxyPreviewRequestWithDependencies(
      new Request("https://frankx.ai/api/v0-preview/visual-foundry/", {
        method: "HEAD",
      }),
      "visual-foundry",
      [],
      dependencies,
    )

    assert.equal(response.status, 204)
    assert.equal(await response.text(), "")
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
            "clear-site-data": '"cache"',
            "content-type": "text/css",
            refresh: "0;url=https://attacker.example/collect",
            "set-cookie": "session=blocked",
            "strict-transport-security": "max-age=31536000",
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
          "if-range": '"asset-version"',
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
    assert.equal(proxied.request.headers.get("if-range"), '"asset-version"')
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
    assert.equal(response.headers.get("refresh"), null)
    assert.equal(response.headers.get("clear-site-data"), null)
    assert.equal(response.headers.get("strict-transport-security"), null)
    assert.equal(response.headers.get("x-powered-by"), null)
    assert.equal(response.headers.get("x-v0-preview-refresh"), null)
    assert.equal(response.headers.get("cache-control"), "private, no-store")
    assert.equal(response.headers.get("referrer-policy"), "no-referrer")
    assert.equal(response.headers.get("x-content-type-options"), "nosniff")
  })

  it("rewrites preview-origin redirects and blocks external redirects", async () => {
    const dependencies = (location: string): PreviewProxyDependencies => ({
      ...loaderDependencies({ getCachedPreview: async () => freshPreview }),
      resolvePreviewChatId: () => "private-chat-id",
      fetchPreview: async () =>
        new Response(null, { status: 302, headers: { location } }),
    })
    const request = new Request(
      "https://frankx.ai/api/v0-preview/visual-foundry/settings",
    )
    const rewritten = await proxyPreviewRequestWithDependencies(
      request,
      "visual-foundry",
      ["settings"],
      dependencies("https://preview.example.test/account?tab=billing"),
    )
    assert.equal(rewritten.status, 302)
    assert.equal(
      rewritten.headers.get("location"),
      "/api/v0-preview/visual-foundry/account?tab=billing",
    )

    const blocked = await proxyPreviewRequestWithDependencies(
      request,
      "visual-foundry",
      ["settings"],
      dependencies("https://attacker.example/collect"),
    )
    assert.equal(blocked.status, 502)
    assert.equal(blocked.headers.get("location"), null)
    assert.equal(await blocked.text(), "Preview redirect was blocked.")

    const malformed = await proxyPreviewRequestWithDependencies(
      request,
      "visual-foundry",
      ["settings"],
      dependencies("http://[invalid"),
    )
    assert.equal(malformed.status, 502)
    assert.equal(malformed.headers.get("location"), null)

    const missingLocation = await proxyPreviewRequestWithDependencies(
      request,
      "visual-foundry",
      ["settings"],
      {
        ...loaderDependencies({ getCachedPreview: async () => freshPreview }),
        resolvePreviewChatId: () => "private-chat-id",
        fetchPreview: async () => new Response(null, { status: 302 }),
      },
    )
    assert.equal(missingLocation.status, 502)
    assert.equal(missingLocation.headers.get("location"), null)

    const notModified = await proxyPreviewRequestWithDependencies(
      request,
      "visual-foundry",
      ["settings"],
      {
        ...loaderDependencies({ getCachedPreview: async () => freshPreview }),
        resolvePreviewChatId: () => "private-chat-id",
        fetchPreview: async () => new Response(null, { status: 304 }),
      },
    )
    assert.equal(notModified.status, 304)
  })

  it("keeps SDK loading redirects inside the same preview-key boundary", async () => {
    const dependencies: PreviewProxyDependencies = {
      ...loaderDependencies(),
      resolvePreviewChatId: () => "private-chat-id",
      fetchPreview: async (input) =>
        Response.redirect(
          new URL(input.fallbackUrl, input.request.url),
          302,
        ),
    }
    const response = await proxyPreviewRequestWithDependencies(
      new Request(
        "https://frankx.ai/api/v0-preview/visual-foundry/assets/app.js",
      ),
      "visual-foundry",
      ["assets", "app.js"],
      dependencies,
    )
    const location = new URL(
      response.headers.get("location") ?? "",
      "https://frankx.ai",
    )
    assert.equal(response.status, 302)
    assert.equal(
      location.pathname,
      "/api/v0-preview/visual-foundry/loading",
    )
    assert.equal(
      location.searchParams.get("returnTo"),
      "/api/v0-preview/visual-foundry/assets/app.js",
    )
  })

  it("rejects external and cross-key loading return targets", () => {
    const fallback = "/api/v0-preview/visual-foundry/"
    assert.equal(getSafePreviewReturnTo(null, "visual-foundry"), fallback)
    assert.equal(
      getSafePreviewReturnTo(
        "https://attacker.example/collect",
        "visual-foundry",
      ),
      fallback,
    )
    assert.equal(
      getSafePreviewReturnTo(
        "/api/v0-preview/other-key/asset.js",
        "visual-foundry",
      ),
      fallback,
    )
    assert.equal(
      getSafePreviewReturnTo(
        "/api/v0-preview/visual-foundry/assets/app.js?theme=dark",
        "visual-foundry",
      ),
      "/api/v0-preview/visual-foundry/assets/app.js?theme=dark",
    )
  })
})
