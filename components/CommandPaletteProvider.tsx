'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'

const CommandPalette = dynamic(() => import('@/components/CommandPalette'), {
  ssr: false,
})

export default function CommandPaletteProvider() {
  const [loaded, setLoaded] = useState(false)
  const [open, setOpen] = useState(false)

  const openPalette = useCallback(() => {
    setLoaded(true)
    setOpen(true)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setLoaded(true)
        setOpen((current) => !current)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('frankx:open-command-palette', openPalette)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('frankx:open-command-palette', openPalette)
    }
  }, [openPalette])

  if (!loaded) return null

  return <CommandPalette open={open} onOpenChange={setOpen} />
}
