/**
 * Accessibility utilities and patterns for consistent a11y implementation
 */

// Standard touch target sizes (WCAG 2.1 AA compliance)
export const touchTargets = {
  minimum: 'min-h-[44px] min-w-[44px]', // 44px minimum for WCAG AA
  comfortable: 'min-h-[48px] min-w-[48px]', // 48px for better usability
  spacious: 'min-h-[52px] min-w-[52px]', // 52px for optimal mobile experience
} as const

// Focus ring patterns for consistent focus styling
export const focusRings = {
  default: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
  primary: 'focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:ring-offset-2 focus:ring-offset-slate-900',
  secondary: 'focus:outline-none focus:ring-2 focus:ring-slate-400/70 focus:ring-offset-2 focus:ring-offset-slate-900',
  inverse: 'focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-slate-900',
} as const

// Screen reader only content utility
export const srOnly = 'sr-only absolute -top-px overflow-hidden whitespace-nowrap border-0 w-px h-px p-0 m-0 clip-[rect(0,0,0,0)]'

// Skip link for keyboard navigation
export const skipLink = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-purple-600 text-white px-4 py-2 rounded-lg'

// ARIA helper functions
export const aria = {
  // Generate consistent ARIA labels for navigation items
  navLabel: (name: string, isAnchor?: boolean) =>
    `Navigate to ${name} ${isAnchor ? 'section' : 'page'}`,

  // Generate ARIA labels for buttons
  buttonLabel: (action: string, target?: string) =>
    target ? `${action} ${target}` : action,

  // Generate ARIA descriptions for complex controls
  describe: (description: string) => description.toLowerCase().replace(/\s+/g, '-'),

  // Loading states
  loading: 'Loading content, please wait',

  // Form helpers
  required: 'Required field',
  optional: 'Optional field',
  error: (field: string) => `Error in ${field} field`,
} as const

// Reduced motion detection and styles
export const motion = {
  // Respect user's reduced motion preference
  safe: 'motion-safe:transition-all motion-safe:duration-300',
  safeBounce: 'motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out',
  safeSlide: 'motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out',

  // Disable animations for reduced motion users
  reduced: 'motion-reduce:transition-none motion-reduce:transform-none',
} as const

// Mobile-optimized interaction styles
export const mobile = {
  // Touch-friendly hover states
  hover: 'hover:bg-white/10 active:bg-white/20 active:scale-[0.98]',

  // Prevent hover on touch devices
  touchSafe: 'md:hover:bg-white/10',

  // Mobile-optimized transforms
  transform: 'active:scale-[0.98] md:hover:scale-105',

  // Touch feedback
  feedback: 'active:opacity-80 active:scale-[0.96] transition-all duration-150',
} as const

// Color contrast helpers (WCAG AA compliant)
export const contrast = {
  // Text on dark backgrounds
  textOnDark: 'text-slate-100', // 15.3:1 ratio
  textOnDarkSecondary: 'text-slate-300', // 8.9:1 ratio

  // Text on light backgrounds
  textOnLight: 'text-slate-900', // 21:1 ratio
  textOnLightSecondary: 'text-slate-700', // 11.9:1 ratio

  // Interactive elements
  linkDefault: 'text-purple-400 hover:text-purple-300',
  linkOnLight: 'text-purple-700 hover:text-purple-800',
} as const

// Semantic HTML helpers
export const semantic = {
  // Landmark roles
  main: 'role="main"',
  navigation: 'role="navigation"',
  banner: 'role="banner"',
  contentinfo: 'role="contentinfo"',
  complementary: 'role="complementary"',

  // Content structure
  heading: (level: 1 | 2 | 3 | 4 | 5 | 6) => `role="heading" aria-level="${level}"`,

  // Interactive patterns
  button: 'role="button"',
  link: 'role="link"',
  menuitem: 'role="menuitem"',
  tab: 'role="tab"',
  tabpanel: 'role="tabpanel"',
} as const

// Utility function to combine accessibility classes
export function combineA11y(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Utility to generate unique IDs for ARIA relationships
let idCounter = 0
export function generateId(prefix = 'element'): string {
  return `${prefix}-${++idCounter}`
}

// Common accessibility patterns
export const patterns = {
  // Modal/Dialog
  modal: {
    overlay: 'fixed inset-0 z-50 bg-black/50',
    content: 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50',
    focus: 'focus-trap-active',
  },

  // Dropdown/Menu
  dropdown: {
    trigger: combineA11y(focusRings.default, touchTargets.minimum),
    menu: 'absolute z-10 min-w-max',
    item: combineA11y(focusRings.default, touchTargets.minimum, mobile.feedback),
  },

  // Form controls
  form: {
    label: 'block text-sm font-medium mb-2',
    input: combineA11y(focusRings.default, touchTargets.minimum),
    error: 'text-red-400 text-sm mt-1',
    help: 'text-slate-400 text-sm mt-1',
  },

  // Card/Interactive content
  card: {
    interactive: combineA11y(focusRings.default, mobile.feedback),
    static: 'focus-within:ring-2 focus-within:ring-purple-500/50',
  },
} as const

const accessibilityUtils = {
  touchTargets,
  focusRings,
  srOnly,
  skipLink,
  aria,
  motion,
  mobile,
  contrast,
  semantic,
  patterns,
  combineA11y,
  generateId,
}

export default accessibilityUtils