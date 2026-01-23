"use client"

import React, { useMemo, useState, useEffect } from "react"

import { cn } from "@/lib/utils"

interface MeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  className?: string
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}: MeteorsProps) => {
  const [windowWidth, setWindowWidth] = useState(1000)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  const meteorStyles = useMemo(() => {
    return [...new Array(number)].map((_, i) => ({
      "--angle": -angle + "deg",
      top: "-5%",
      // Use index-based pseudo-random for consistent rendering
      left: `calc(0% + ${Math.floor(((i * 7919) % 1000) / 1000 * windowWidth)}px)`,
      animationDelay: (((i * 3571) % 1000) / 1000) * (maxDelay - minDelay) + minDelay + "s",
      animationDuration:
        Math.floor((((i * 6199) % 1000) / 1000) * (maxDuration - minDuration) + minDuration) +
        "s",
    }))
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle, windowWidth])

  return (
    <>
      {meteorStyles.map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          style={{ ...style }}
          className={cn(
            "animate-meteor pointer-events-none absolute size-0.5 rotate-[var(--angle)] rounded-full bg-zinc-500 shadow-[0_0_0_1px_#ffffff10]",
            className
          )}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-zinc-500 to-transparent" />
        </span>
      ))}
    </>
  )
}
