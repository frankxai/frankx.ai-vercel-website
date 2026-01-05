# Navigation Quick Tune Reference

Quick reference for adjusting navigation scroll behavior without reading the full UX guide.

## Common Adjustments

### Make Header Hide Faster/Slower

**File**: `components/NavigationMega.tsx`

```typescript
// Current: Header hides after scrolling 80px down
if (!menuOpen && !isOpen && scrollY > 80) {

// Hide sooner (more aggressive):
if (!menuOpen && !isOpen && scrollY > 50) {

// Hide later (more conservative):
if (!menuOpen && !isOpen && scrollY > 120) {
```

### Make Background Darker/Lighter When Scrolled

**File**: `components/NavigationMega.tsx`

```typescript
// Current: 90% → 95% opacity on scroll
isScrolled
  ? 'bg-[#030712]/95 backdrop-blur-xl'
  : 'bg-[#030712]/90 backdrop-blur-xl'

// More transparent (emphasize blur):
isScrolled
  ? 'bg-[#030712]/90 backdrop-blur-xl'
  : 'bg-[#030712]/80 backdrop-blur-xl'

// More opaque (emphasize solid):
isScrolled
  ? 'bg-[#030712]/98 backdrop-blur-xl'
  : 'bg-[#030712]/95 backdrop-blur-xl'
```

### Change Animation Speed

**File**: `components/NavigationMega.tsx`

```typescript
// Current: 300ms (balanced)
'transition-all duration-300 ease-in-out'

// Faster (more snappy):
'transition-all duration-200 ease-in-out'

// Slower (more dramatic):
'transition-all duration-500 ease-in-out'
```

### Change Scroll Detection Threshold

**File**: `components/NavigationMega.tsx`

```typescript
// Current: Background changes after 20px scroll
setIsScrolled(scrollY > 20)

// Earlier visual change:
setIsScrolled(scrollY > 10)

// Later visual change:
setIsScrolled(scrollY > 40)
```

### Disable Auto-Hide (Always Show Header)

**File**: `components/NavigationMega.tsx`

```typescript
// Replace the scroll logic with:
setIsVisible(true)  // Always visible
setIsScrolled(scrollY > 20)  // Still change background on scroll
```

### Change Blur Strength

**File**: `components/NavigationMega.tsx`

```typescript
// Current: blur-xl (20px)
'backdrop-blur-xl'

// Less blur (faster performance):
'backdrop-blur-lg'  // 16px

// More blur (stronger effect):
'backdrop-blur-2xl'  // 24px
```

## Testing Commands

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Test production build locally
npm run start
```

## Quick Visual Test

1. Scroll down slowly - header should hide after ~80px
2. Scroll up slightly - header should appear immediately
3. Open mega menu - header should stay visible even when scrolling
4. Look for smooth 300ms transitions (no jank)
5. Background should darken slightly when scrolled

## Revert to Simple Fixed Header

If you want to go back to always-visible header:

**File**: `components/NavigationMega.tsx`

```typescript
// Remove all scroll logic, replace header className with:
<header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#030712]/95 backdrop-blur-xl">
```

## Performance Check

If animations feel laggy:

1. Check Chrome DevTools > Performance tab
2. Look for 60fps during scroll (green line)
3. If dropping frames, reduce blur strength or simplify transitions
4. Consider disabling animations on lower-end devices

## Browser Support

- Chrome/Edge: Full support ✓
- Firefox: Full support ✓
- Safari: Full support ✓
- Mobile Chrome/Safari: Full support ✓

Backdrop blur has excellent support (95%+ global coverage).

## Need More Control?

See full UX guide: `docs/UX_NAVIGATION_GUIDE.md`
