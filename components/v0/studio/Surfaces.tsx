"use client"

import { useEffect, useId } from "react"
import { AlertTriangle, CheckCircle2, Info, X, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { EngineStatus } from "@/lib/v0/foundry/types"
import { ENGINE_STATUS_LABELS } from "@/lib/v0/foundry/run-engine"
import type { Notice } from "./use-foundry-studio"

/* --------------------------------- status --------------------------------- */

const STATUS_TONE: Record<EngineStatus, string> = {
  idle: "text-[#5c5c64]",
  running: "text-[#10b981]",
  "review-needed": "text-[#06b6d4]",
  complete: "text-[#10b981]",
  failed: "text-[#e26d6d]",
  cancelled: "text-[#8a8a93]",
}

export function StatusChip({ status }: { status: EngineStatus }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md border border-[#1e1e1e] bg-[#111113] px-2 py-1 font-mono text-[11px]"
      role="status"
      aria-live="polite"
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full bg-current",
          STATUS_TONE[status],
          status === "running" && "animate-pulse",
        )}
        aria-hidden="true"
      />
      <span className={STATUS_TONE[status]}>{ENGINE_STATUS_LABELS[status]}</span>
    </span>
  )
}

/* ------------------------------- empty state ------------------------------ */

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-6 py-10 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#1e1e1e] bg-[#111113]">
        <Icon className="h-5 w-5 text-[#5c5c64]" aria-hidden="true" />
      </span>
      <p className="font-display text-sm font-medium text-[#f4f4f5]">{title}</p>
      <p className="max-w-[34ch] text-pretty text-xs leading-relaxed text-[#8a8a93]">{description}</p>
    </div>
  )
}

/* ------------------------------ error banner ------------------------------ */

export function ErrorBanner({ message, onDismiss }: { message: string; onDismiss?: () => void }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-md border border-[#e26d6d]/50 bg-[#e26d6d]/10 px-3 py-2 text-xs leading-relaxed text-[#e26d6d]"
    >
      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span className="flex-1">{message}</span>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          className="rounded p-0.5 text-[#e26d6d]/80 hover:text-[#e26d6d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e26d6d]"
          aria-label="Dismiss error"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  )
}

/* ------------------------------ notice toast ------------------------------ */

const NOTICE_ICON: Record<Notice["tone"], LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  error: AlertTriangle,
}
const NOTICE_TONE: Record<Notice["tone"], string> = {
  info: "text-[#06b6d4]",
  success: "text-[#10b981]",
  error: "text-[#e26d6d]",
}

export function NoticeToast({ notice, onDismiss }: { notice: Notice | null; onDismiss: () => void }) {
  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(onDismiss, 4200)
    return () => window.clearTimeout(timer)
  }, [notice, onDismiss])

  if (!notice) return null
  const Icon = NOTICE_ICON[notice.tone]

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:bottom-6">
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-auto flex max-w-md items-start gap-2 rounded-lg border border-[#1e1e1e] bg-[#111113] px-3 py-2 shadow-lg"
      >
        <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", NOTICE_TONE[notice.tone])} aria-hidden="true" />
        <span className="flex-1 text-xs leading-relaxed text-[#f4f4f5]">{notice.message}</span>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded p-0.5 text-[#5c5c64] hover:text-[#f4f4f5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]"
          aria-label="Dismiss notification"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

/* ------------------------------- form fields ------------------------------ */

const inputBase =
  "w-full rounded-md border border-[#1e1e1e] bg-[#0a0a0b] px-2.5 py-2 font-sans text-[13px] text-[#f4f4f5] placeholder:text-[#5c5c64] focus:outline-none focus-visible:border-[#10b981] focus-visible:ring-2 focus-visible:ring-[#10b981]/40"
const labelBase = "mb-1.5 block font-mono text-[10px] uppercase tracking-wide text-[#8a8a93]"

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  mono,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  mono?: boolean
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className={labelBase}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputBase, mono && "font-mono text-xs")}
      />
    </div>
  )
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className={labelBase}>
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputBase, "resize-none leading-relaxed")}
      />
    </div>
  )
}

export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string
  value: number | undefined
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className={labelBase}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        value={value ?? ""}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(inputBase, "font-mono text-xs")}
      />
    </div>
  )
}

export function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className={labelBase}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputBase, "cursor-pointer appearance-none")}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#111113] text-[#f4f4f5]">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function RangeField({
  label,
  value,
  onChange,
  min = 1,
  max = 10,
  step = 1,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
}) {
  const id = useId()
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className={labelBase + " mb-0"}>
          {label}
        </label>
        <span className="font-mono text-xs text-[#10b981]">{value}</span>
      </div>
      <input
        id={id}
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="fx-range h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#1e1e1e] accent-[#10b981]"
      />
    </div>
  )
}
