'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type Theme = 'light' | 'dark' | 'system'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme') as Theme
    if (stored) {
      setTheme(stored)
      applyTheme(stored)
    } else {
      applyTheme('system')
    }
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (newTheme === 'system') {
      root.classList.toggle('dark', systemPrefersDark)
    } else {
      root.classList.toggle('dark', newTheme === 'dark')
    }
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  if (!mounted) return null

  const themes: { value: Theme; icon: typeof Moon; label: string }[] = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ]

  return (
    <div className="relative flex items-center gap-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 p-1">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => handleThemeChange(value)}
          className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            theme === value
              ? 'text-white'
              : 'text-white/50 hover:text-white/70'
          }`}
          aria-label={`Switch to ${label} theme`}
          title={`${label} theme`}
        >
          <AnimatePresence>
            {theme === value && (
              <motion.div
                layoutId="theme-indicator"
                className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full border border-emerald-500/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
              />
            )}
          </AnimatePresence>
          <span className="relative z-10 flex items-center gap-2">
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </span>
        </button>
      ))}
    </div>
  )
}
