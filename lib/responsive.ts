/**
 * Mobile-first responsive design utilities and breakpoints
 */

// Tailwind breakpoints for reference
export const breakpoints = {
  sm: '640px',   // Small devices (landscape phones)
  md: '768px',   // Medium devices (tablets)
  lg: '1024px',  // Large devices (desktops)
  xl: '1280px',  // Extra large devices
  '2xl': '1536px' // 2X Extra large devices
} as const

// Mobile-first responsive container patterns
export const containers = {
  // Mobile-optimized padding
  mobilePadding: 'px-4 sm:px-6 lg:px-8',

  // Content width constraints
  content: 'max-w-7xl mx-auto',
  contentNarrow: 'max-w-4xl mx-auto',
  contentWide: 'max-w-screen-2xl mx-auto',

  // Section spacing
  sectionSpacing: 'py-12 sm:py-16 lg:py-20',
  sectionSpacingTight: 'py-8 sm:py-12 lg:py-16',
  sectionSpacingLoose: 'py-16 sm:py-24 lg:py-32',
} as const

// Typography responsive patterns
export const typography = {
  // Headings - mobile-first scaling
  h1: 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl',
  h2: 'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl',
  h3: 'text-2xl sm:text-3xl lg:text-4xl',
  h4: 'text-xl sm:text-2xl lg:text-3xl',
  h5: 'text-lg sm:text-xl lg:text-2xl',
  h6: 'text-base sm:text-lg lg:text-xl',

  // Body text
  body: 'text-base sm:text-lg',
  bodySmall: 'text-sm sm:text-base',
  bodyLarge: 'text-lg sm:text-xl',

  // Display text for hero sections
  display: 'text-5xl sm:text-6xl lg:text-7xl xl:text-8xl',
  displaySmall: 'text-4xl sm:text-5xl lg:text-6xl',

  // Leading (line height) responsive
  leadingTight: 'leading-tight sm:leading-tight lg:leading-tight',
  leadingNormal: 'leading-normal sm:leading-relaxed lg:leading-relaxed',
  leadingLoose: 'leading-relaxed sm:leading-loose lg:leading-loose',
} as const

// Grid patterns optimized for mobile
export const grids = {
  // Auto-fit responsive grids
  autoCards: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8',
  autoCardsWide: 'grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8',
  autoCardsNarrow: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6',

  // Feature grids
  features2Col: 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12',
  features3Col: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8',
  features4Col: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8',

  // Product/portfolio grids
  products: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
  portfolio: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8',

  // Stats/metrics grids
  stats: 'grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8',
  metrics: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
} as const

// Flexbox patterns for mobile
export const flexPatterns = {
  // Stack on mobile, row on desktop
  stackToRow: 'flex flex-col lg:flex-row',
  stackToRowReverse: 'flex flex-col lg:flex-row-reverse',

  // Center content responsively
  center: 'flex flex-col items-center justify-center',
  centerHorizontal: 'flex flex-col sm:flex-row items-center justify-center',

  // Navigation patterns
  navStack: 'flex flex-col md:flex-row',
  navSpread: 'flex flex-col md:flex-row md:items-center md:justify-between',

  // Card layouts
  cardStack: 'flex flex-col',
  cardRow: 'flex flex-col sm:flex-row',
} as const

// Spacing scales optimized for mobile
export const spacing = {
  // Gap patterns
  gapSmall: 'gap-3 sm:gap-4 lg:gap-6',
  gapMedium: 'gap-4 sm:gap-6 lg:gap-8',
  gapLarge: 'gap-6 sm:gap-8 lg:gap-12',
  gapXLarge: 'gap-8 sm:gap-12 lg:gap-16',

  // Margin patterns
  marginSection: 'mb-12 sm:mb-16 lg:mb-20',
  marginElement: 'mb-6 sm:mb-8 lg:mb-10',
  marginSmall: 'mb-4 sm:mb-6 lg:mb-8',

  // Padding patterns
  paddingSection: 'p-6 sm:p-8 lg:p-12',
  paddingCard: 'p-4 sm:p-6 lg:p-8',
  paddingButton: 'px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4',
} as const

// Mobile-specific interaction patterns
export const interactions = {
  // Touch-friendly hover states
  hoverCard: 'hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-200',
  hoverButton: 'hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-200',

  // Mobile-safe transforms (less aggressive on small screens)
  hoverCardMobile: 'hover:shadow-lg md:hover:-translate-y-1 active:scale-[0.98] transition-all duration-200',
  hoverButtonMobile: 'md:hover:scale-105 md:hover:-translate-y-0.5 active:scale-95 transition-all duration-200',

  // Focus states for keyboard navigation
  focusCard: 'focus-within:ring-2 focus-within:ring-purple-500/50 focus-within:ring-offset-2',
  focusButton: 'focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:ring-offset-2',
} as const

// Responsive visibility utilities
export const visibility = {
  // Show/hide at different breakpoints
  mobileOnly: 'block md:hidden',
  tabletOnly: 'hidden md:block lg:hidden',
  desktopOnly: 'hidden lg:block',

  // Progressive disclosure
  showOnMedium: 'hidden md:block',
  showOnLarge: 'hidden lg:block',
  showOnXLarge: 'hidden xl:block',

  // Hide progressively
  hideOnMedium: 'block md:hidden',
  hideOnLarge: 'block lg:hidden',
  hideOnXLarge: 'block xl:hidden',
} as const

// Image responsive patterns
export const images = {
  // Aspect ratios
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',

  // Responsive sizing
  responsive: 'w-full h-auto',
  cover: 'object-cover w-full h-full',
  contain: 'object-contain w-full h-full',

  // Hero image patterns
  hero: 'w-full h-64 sm:h-80 lg:h-96 xl:h-[32rem] object-cover',
  heroFull: 'w-full h-screen object-cover',
} as const

// Form responsive patterns
export const forms = {
  // Input sizing
  input: 'w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg',
  textarea: 'w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg min-h-[120px] sm:min-h-[150px]',

  // Form layouts
  stack: 'flex flex-col space-y-4 sm:space-y-6',
  grid: 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6',

  // Button groups
  buttonGroup: 'flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4',
  buttonStack: 'flex flex-col space-y-3',
} as const

// Utility function to combine responsive classes
export function combineResponsive(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Utility to check if we're on mobile (client-side only)
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

// Utility to get current breakpoint (client-side only)
export function getCurrentBreakpoint(): keyof typeof breakpoints | 'xs' {
  if (typeof window === 'undefined') return 'xs'
  const width = window.innerWidth

  if (width >= 1536) return '2xl'
  if (width >= 1280) return 'xl'
  if (width >= 1024) return 'lg'
  if (width >= 768) return 'md'
  if (width >= 640) return 'sm'
  return 'xs'
}

export default {
  breakpoints,
  containers,
  typography,
  grids,
  flexPatterns,
  spacing,
  interactions,
  visibility,
  images,
  forms,
  combineResponsive,
  isMobile,
  getCurrentBreakpoint,
}