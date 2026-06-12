'use client'

import { useState } from 'react'
import { Check, Share2 } from 'lucide-react'

type ShareChallengeProps = {
  day: number
  dareTitle: string
  streak: number
}

export default function ShareChallenge({ day, dareTitle, streak }: ShareChallengeProps) {
  const [copied, setCopied] = useState(false)

  const url = 'https://frankx.ai/dare'
  const message =
    streak > 1
      ? `Day ${day} of the Beautiful Mind Quest. Today's dare: ${dareTitle}. I'm ${streak} days in — your move. ${url}`
      : `Day ${day} of the Beautiful Mind Quest. Today's dare: ${dareTitle}. Your move. ${url}`

  const share = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'The Beautiful Mind Quest', text: message, url })
        return
      } catch {
        // user dismissed the share sheet — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable — nothing sensible to do
    }
  }

  return (
    <button
      onClick={share}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white/80 text-sm font-medium hover:border-white/30 hover:text-white transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copied — send it to them
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          Challenge a friend
        </>
      )}
    </button>
  )
}
