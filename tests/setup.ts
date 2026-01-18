import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers)

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock framer-motion for faster tests
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_, prop) => {
        return vi.fn(({ children, ...props }: any) => {
          // Return a simple div with the motion props
          return children
        })
      },
    }
  ),
  AnimatePresence: ({ children }: any) => children,
  useAnimation: () => ({
    start: vi.fn(),
    set: vi.fn(),
  }),
  useInView: () => true,
}))

// Suppress console errors in tests
global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn(),
}
