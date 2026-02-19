'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  endTime: string
  className?: string
  compact?: boolean
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

function calculateTimeLeft(endTime: string): TimeLeft {
  const difference = new Date(endTime).getTime() - Date.now()
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    total: difference,
  }
}

export default function CountdownTimer({ endTime, className = '', compact = false }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(endTime))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTime))
    }, 1000)
    return () => clearInterval(timer)
  }, [endTime])

  const isUrgent = timeLeft.total > 0 && timeLeft.total < 3600000 // < 1 hour
  const isEnded = timeLeft.total <= 0

  if (isEnded) {
    return (
      <div className={`text-white/40 font-mono text-sm ${className}`}>
        Auction Ended
      </div>
    )
  }

  const urgentClass = isUrgent ? 'text-red-400 animate-pulse' : 'text-white'

  if (compact) {
    return (
      <div className={`font-mono text-sm ${urgentClass} ${className}`}>
        {timeLeft.days > 0 && `${timeLeft.days}d `}
        {String(timeLeft.hours).padStart(2, '0')}:
        {String(timeLeft.minutes).padStart(2, '0')}:
        {String(timeLeft.seconds).padStart(2, '0')}
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {[
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hrs' },
        { value: timeLeft.minutes, label: 'Min' },
        { value: timeLeft.seconds, label: 'Sec' },
      ].map(({ value, label }) => (
        <div
          key={label}
          className={`flex flex-col items-center px-3 py-2 rounded-lg bg-white/[0.04] border ${
            isUrgent ? 'border-red-500/30' : 'border-white/[0.08]'
          }`}
        >
          <span className={`text-xl font-bold font-mono ${urgentClass}`}>
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-white/40">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
