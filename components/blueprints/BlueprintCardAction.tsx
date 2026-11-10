'use client'

import React, { useState } from 'react'
import { ArrowRight, Lock } from 'lucide-react'
import { BlueprintCheckoutModal } from './BlueprintCheckoutModal'

interface BlueprintCardActionProps {
  product: {
    id: string
    name: string
    price: number
    badge: string
    deliverables: string[]
    color: 'emerald' | 'violet'
    checkoutHref: string
  }
}

export function BlueprintCardAction({ product }: BlueprintCardActionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isEmerald = product.color === 'emerald'

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 px-6 font-medium text-sm transition-all duration-200 ${
          isEmerald
            ? 'bg-emerald-400 text-[#0a0a0b] hover:bg-emerald-300 hover:shadow-[0_0_24px_rgba(52,211,153,0.3)]'
            : 'bg-violet-400 text-[#0a0a0b] hover:bg-violet-300 hover:shadow-[0_0_24px_rgba(167,139,250,0.3)]'
        }`}
      >
        <span>get instant access</span>
        <ArrowRight className="h-4 w-4" />
      </button>

      <BlueprintCheckoutModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        product={product}
      />
    </>
  )
}
