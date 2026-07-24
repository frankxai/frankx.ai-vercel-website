import { ExternalLink, LockKeyhole } from "lucide-react"

import { getPreviewReadiness } from "@/lib/v0/preview/config"

interface V0PreviewFrameProps {
  previewKey: string
  title: string
  fallbackHref: string
}

const readinessCopy = {
  disabled: "Secure preview is disabled for this deployment.",
  "credentials-required": "Secure preview credentials are not configured.",
  "mapping-required": "This package has no deploy-time preview mapping.",
  "shared-cache-required":
    "Production preview requires the shared token cache.",
  ready: "",
} as const

export function V0PreviewFrame({
  previewKey,
  title,
  fallbackHref,
}: V0PreviewFrameProps) {
  const readiness = getPreviewReadiness(previewKey)

  if (readiness !== "ready") {
    return (
      <div className="flex aspect-[16/10] min-h-[320px] w-full items-center justify-center overflow-hidden border border-white/10 bg-[#111113] p-6 sm:p-8">
        <div className="w-full min-w-0 max-w-sm text-center">
          <LockKeyhole
            className="mx-auto h-5 w-5 text-emerald-400"
            aria-hidden="true"
          />
          <p className="mt-4 text-sm font-medium text-white">
            Read-only v0 preview
          </p>
          <p className="mt-2 break-words text-sm leading-6 text-white/55">
            {readinessCopy[readiness]}
          </p>
          <a
            href={fallbackHref}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md border border-white/15 px-4 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Open product surface
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    )
  }

  return (
    <iframe
      src={`/api/v0-preview/${previewKey}/`}
      title={title}
      className="aspect-[16/10] min-h-[420px] w-full border border-white/10 bg-[#111113]"
      loading="lazy"
      referrerPolicy="no-referrer"
      sandbox="allow-scripts allow-downloads allow-pointer-lock"
    />
  )
}
