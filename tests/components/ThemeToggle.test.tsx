import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Reset document class list
    document.documentElement.classList.remove('dark')
  })

  it('renders all theme options', () => {
    render(<ThemeToggle />)

    expect(screen.getByLabelText(/Switch to Light theme/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Switch to Dark theme/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Switch to System theme/i)).toBeInTheDocument()
  })

  it('defaults to system theme', async () => {
    render(<ThemeToggle />)

    await waitFor(() => {
      const systemButton = screen.getByLabelText(/Switch to System theme/i)
      expect(systemButton).toHaveClass('text-white')
    })
  })

  it('switches to dark theme when dark button clicked', async () => {
    render(<ThemeToggle />)

    const darkButton = screen.getByLabelText(/Switch to Dark theme/i)
    fireEvent.click(darkButton)

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true)
      expect(localStorage.getItem('theme')).toBe('dark')
    })
  })

  it('switches to light theme when light button clicked', async () => {
    // Start with dark mode
    document.documentElement.classList.add('dark')

    render(<ThemeToggle />)

    const lightButton = screen.getByLabelText(/Switch to Light theme/i)
    fireEvent.click(lightButton)

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(false)
      expect(localStorage.getItem('theme')).toBe('light')
    })
  })

  it('persists theme choice to localStorage', async () => {
    render(<ThemeToggle />)

    const darkButton = screen.getByLabelText(/Switch to Dark theme/i)
    fireEvent.click(darkButton)

    await waitFor(() => {
      expect(localStorage.getItem('theme')).toBe('dark')
    })
  })

  it('restores theme from localStorage on mount', async () => {
    localStorage.setItem('theme', 'light')

    render(<ThemeToggle />)

    await waitFor(() => {
      const lightButton = screen.getByLabelText(/Switch to Light theme/i)
      expect(lightButton).toHaveClass('text-white')
    })
  })

  it('applies correct ARIA labels for accessibility', () => {
    render(<ThemeToggle />)

    expect(screen.getByLabelText(/Switch to Light theme/i)).toHaveAttribute('title', 'Light theme')
    expect(screen.getByLabelText(/Switch to Dark theme/i)).toHaveAttribute('title', 'Dark theme')
    expect(screen.getByLabelText(/Switch to System theme/i)).toHaveAttribute('title', 'System theme')
  })
})
