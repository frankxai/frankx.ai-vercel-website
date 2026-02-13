// v0 Homepage component: scroll-indicator
// Chat: kp1UCsrMJI8

'use client'

import { ChevronDown } from 'lucide-react'

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          Scroll
        </div>
        <div className="flex h-12 w-6 items-start justify-center rounded-full border border-white/20 p-1">
          <div className="h-2 w-2 animate-bounce rounded-full bg-gradient-to-b from-primary to-secondary" />
        </div>
        <ChevronDown className="h-4 w-4 animate-bounce text-muted-foreground" />
      </div>
    </div>
  )
}
