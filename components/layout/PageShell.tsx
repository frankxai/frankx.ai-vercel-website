'use client'

import { ReactNode } from 'react'
import AuroraBackground from './AuroraBackground'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface PageShellProps {
  children: ReactNode
  /** Aurora variant - tech (emerald/cyan), soul (amber/orange), hybrid (purple), minimal */
  variant?: 'tech' | 'soul' | 'hybrid' | 'minimal'
  /** Intensity of aurora effects */
  intensity?: 'subtle' | 'normal' | 'vibrant'
  /** Whether to show Navigation */
  showNav?: boolean
  /** Whether to show Footer */
  showFooter?: boolean
  /** Whether to show aurora background */
  showAurora?: boolean
  /** Additional CSS classes for main content wrapper */
  className?: string
  /** Content max-width preset */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full'
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
}

export default function PageShell({
  children,
  variant = 'tech',
  intensity = 'normal',
  showNav = true,
  showFooter = true,
  showAurora = true,
  className = '',
  maxWidth = '7xl',
}: PageShellProps) {
  return (
    <div className="min-h-screen bg-void text-white relative">
      {/* Premium Aurora Background */}
      {showAurora && <AuroraBackground variant={variant} intensity={intensity} />}

      {/* Navigation */}
      {showNav && <Navigation />}

      {/* Main Content */}
      <main className={`relative z-10 ${className}`}>
        <div className={`mx-auto px-6 ${maxWidthClasses[maxWidth]}`}>
          {children}
        </div>
      </main>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  )
}

// Export a simpler version for pages that just need the background
export function PageBackground({
  children,
  variant = 'tech',
  intensity = 'normal',
  className = '',
}: {
  children: ReactNode
  variant?: 'tech' | 'soul' | 'hybrid' | 'minimal'
  intensity?: 'subtle' | 'normal' | 'vibrant'
  className?: string
}) {
  return (
    <div className={`min-h-screen bg-void text-white relative ${className}`}>
      <AuroraBackground variant={variant} intensity={intensity} />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
