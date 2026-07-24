import {
  Boxes,
  CheckCircle2,
  CircleDot,
  Clapperboard,
  Compass,
  FileInput,
  GitCompareArrows,
  ImageIcon,
  Images,
  Loader2,
  PackageCheck,
  ScanEye,
  Wand2,
  XCircle,
  type LucideIcon,
} from "lucide-react"
import type { NodeCategory, RunState } from "@/lib/v0/foundry/types"

export const CATEGORY_ICON: Record<NodeCategory, LucideIcon> = {
  input: FileInput,
  reference: Images,
  direction: Compass,
  "image-generation": ImageIcon,
  "video-generation": Clapperboard,
  "3d-generation": Boxes,
  transform: Wand2,
  compare: GitCompareArrows,
  review: ScanEye,
  export: PackageCheck,
}

/** Every accent stays within the single tech spectrum (emerald primary, cyan secondary). */
export const CATEGORY_ACCENT: Record<NodeCategory, string> = {
  input: "text-[#8a8a93]",
  reference: "text-[#8a8a93]",
  direction: "text-[#06b6d4]",
  "image-generation": "text-[#10b981]",
  "video-generation": "text-[#10b981]",
  "3d-generation": "text-[#10b981]",
  transform: "text-[#8a8a93]",
  compare: "text-[#06b6d4]",
  review: "text-[#06b6d4]",
  export: "text-[#10b981]",
}

export interface RunStateStyle {
  label: string
  dot: string
  text: string
  icon: LucideIcon
  spin?: boolean
}

export const RUN_STATE_STYLE: Record<RunState, RunStateStyle> = {
  idle: { label: "Idle", dot: "bg-[#5c5c64]", text: "text-[#5c5c64]", icon: CircleDot },
  queued: { label: "Queued", dot: "bg-[#06b6d4]", text: "text-[#06b6d4]", icon: CircleDot },
  running: { label: "Running", dot: "bg-[#10b981]", text: "text-[#10b981]", icon: Loader2, spin: true },
  "review-needed": { label: "Review needed", dot: "bg-[#06b6d4]", text: "text-[#06b6d4]", icon: ScanEye },
  complete: { label: "Complete", dot: "bg-[#10b981]", text: "text-[#10b981]", icon: CheckCircle2 },
  failed: { label: "Failed", dot: "bg-[#e26d6d]", text: "text-[#e26d6d]", icon: XCircle },
}
