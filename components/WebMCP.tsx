'use client'

import { useEffect } from 'react'
import { browserDescriptors } from '@/lib/mcp/browser-descriptors.mjs'
import { createReadOnlyMcpTools, registerWebTools, type ModelContext } from '@/lib/webmcp.mjs'

export default function WebMCP() {
  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContext }).modelContext
    if (!context?.registerTool) return
    const registration = registerWebTools(context, createReadOnlyMcpTools({
      endpoint: '/api/mcp', origin: window.location.origin, descriptors: browserDescriptors,
    }), { onError: () => console.warn('FrankX browser tools are unavailable.') })
    return registration.stop
  }, [])
  return null
}
