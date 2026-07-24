import type { Metadata } from "next"

import { VisualFoundry } from "@/components/v0/studio/VisualFoundry"

export const metadata: Metadata = {
  title: "Visual Foundry",
  description:
    "Compose image, video, and 3D generation as a reusable workflow with review gates and provenance.",
}

export default function StudioPage() {
  return <VisualFoundry />
}
