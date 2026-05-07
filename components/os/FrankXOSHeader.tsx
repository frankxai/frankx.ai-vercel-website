import Link from 'next/link'
import { ArrowLeft, Network } from 'lucide-react'
import { osModules } from '@/data/os-modules'

interface FrankXOSHeaderProps {
  /** ID of the current module from data/os-modules.ts, or null for /os index */
  currentModuleId?: string | null
  /** Override label if not a named module */
  customLabel?: string
}

/**
 * Uniform header strip that places any page within the FrankX OS map.
 *
 * Render at the top of /os, /os/{slug} deep-dives, and eventually any module root page.
 * Keeps users oriented across silos.
 */
export function FrankXOSHeader({ currentModuleId, customLabel }: FrankXOSHeaderProps) {
  const current = currentModuleId
    ? osModules.find((m) => m.id === currentModuleId)
    : null

  const label = customLabel ?? current?.name ?? 'Operating System'

  return (
    <div className="border-b border-white/[0.06] bg-black/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/os"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <Network className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium">FrankX OS</span>
          </Link>

          {current || customLabel ? (
            <>
              <div className="flex-1 flex items-center gap-2 text-sm text-zinc-500">
                <span className="text-zinc-600" aria-hidden="true">
                  /
                </span>
                <span className="text-zinc-300">{label}</span>
              </div>

              <Link
                href="/os"
                className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <ArrowLeft className="w-3 h-3" aria-hidden="true" />
                All modules
              </Link>
            </>
          ) : (
            <span className="text-xs text-zinc-500">
              Frank&apos;s Personal AI Operating System
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
