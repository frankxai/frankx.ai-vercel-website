import "server-only"

import { fetchPreview, v0 } from "v0"

import {
  deleteCachedPreview,
  getCachedPreview,
  setCachedPreview,
} from "./cache"
import { resolvePreviewChatId } from "./config"
import { proxyPreviewRequestWithDependencies } from "./proxy-core"

export async function proxyPreviewRequest(
  request: Request,
  previewKey: string,
  path: string[],
): Promise<Response> {
  return proxyPreviewRequestWithDependencies(request, previewKey, path, {
    resolvePreviewChatId,
    getCachedPreview,
    getRemotePreview: async (chatId) => {
      const result = await v0.chats.getPreview({ chatId })
      return result.data ?? null
    },
    setCachedPreview,
    deleteCachedPreview,
    fetchPreview: (input) => fetchPreview(input),
  })
}
