"use client"

import { X } from "lucide-react"
import { useDialogFocusTrap } from "./use-dialog-focus-trap"

/**
 * Minimal accessible modal (no Radix dependency, portable to the destination).
 * Traps initial focus, closes on Escape and backdrop click, restores focus.
 */
export function Modal({
  title,
  onClose,
  children,
  widthClass = "max-w-lg",
}: {
  title: string
  onClose: () => void
  children: React.ReactNode
  widthClass?: string
}) {
  const panelRef = useDialogFocusTrap<HTMLDivElement>(onClose)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`flex max-h-[85vh] w-full ${widthClass} flex-col overflow-hidden rounded-lg border border-[#1e1e1e] bg-[#111113] outline-none`}
      >
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-[#1e1e1e] px-4">
          <h2 className="font-display text-sm font-semibold text-[#f4f4f5]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#1e1e1e] text-[#8a8a93] hover:text-[#f4f4f5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
