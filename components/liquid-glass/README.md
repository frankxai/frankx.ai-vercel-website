# Liquid Glass Component Library

Premium UI components based on sophisticated material design principles.

## 📚 Documentation

- **[Design System Spec](../../docs/design/LIQUID_GLASS_SYSTEM.md)** — Complete visual language, color systems, shadow rules
- **[Arcanea Visual Language](../../docs/design/ARCANEA_VISUAL_LANGUAGE.md)** — Element theming, iridescence, sacred geometry

## 🎨 Components

### LiquidButton

Liquid metal button with 3D gradient surface.

```tsx
import { LiquidButton } from '@/components/liquid-glass';

<LiquidButton element="fire" size="lg" onClick={handleClick}>
  Launch Mission
</LiquidButton>
```

**Props:**
- `element`: 'fire' | 'water' | 'earth' | 'wind' | 'arcane' | 'default'
- `size`: 'sm' | 'md' | 'lg'
- `isLoading`: boolean
- `fullWidth`: boolean

### GlassCard

Multi-layer glass panel with depth perception.

```tsx
import { GlassCard } from '@/components/liquid-glass';

<GlassCard
  material="crystal"
  elevation="high"
  element="arcane"
  hoverable
>
  <h3>Premium Content</h3>
  <p>With sophisticated glass depth.</p>
</GlassCard>
```

**Props:**
- `material`: 'frosted' | 'crystal' | 'liquid' | 'obsidian'
- `elevation`: 'flat' | 'low' | 'medium' | 'high' | 'floating' | 'modal'
- `element`: ElementType | null
- `hoverable`: boolean
- `padding`: 'none' | 'sm' | 'md' | 'lg' | 'xl'

### IridescentPill

Selection pill with bubble iridescence.

```tsx
import { IridescentPill } from '@/components/liquid-glass';

<IridescentPill
  element="water"
  selected={selectedElement === 'water'}
  onClick={() => setSelectedElement('water')}
>
  Water
</IridescentPill>
```

**Props:**
- `element`: ElementType
- `selected`: boolean
- `size`: 'sm' | 'md' | 'lg'
- `icon`: ReactNode

### LoadingBubble

Breathing bubble loader with rotating shimmer.

```tsx
import { LoadingBubble } from '@/components/liquid-glass';

<LoadingBubble
  element="arcane"
  size="lg"
  label="Loading magic..."
/>
```

**Props:**
- `element`: ElementType
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `label`: string

### FloatingElement

3D perspective container for dimensional depth.

```tsx
import { FloatingElement } from '@/components/liquid-glass';

<FloatingElement rotateX={2} rotateY={-2} animate>
  <img src="/hero.png" alt="Product" />
</FloatingElement>
```

**Props:**
- `rotateX`, `rotateY`, `rotateZ`: number (degrees)
- `animate`: boolean
- `duration`: number (seconds)
- `floatDistance`: number (pixels)

### GlassInput

Input field with iridescent focus ring.

```tsx
import { GlassInput } from '@/components/liquid-glass';

<GlassInput
  label="Email"
  element="arcane"
  placeholder="you@example.com"
  type="email"
  error={!!errors.email}
  errorMessage={errors.email}
/>
```

**Props:**
- `element`: ElementType
- `size`: 'sm' | 'md' | 'lg'
- `error`: boolean
- `errorMessage`: string
- `icon`: ReactNode

## 🎭 Element Themes

All components support 5 element themes + default:

- **fire** — Ember glow, copper accents, warm shimmer
- **water** — Ocean iridescence, silver-blue, flowing
- **earth** — Mineral crystalline, bronze, stable
- **wind** — Pearl white, chrome silver, ethereal
- **arcane** — Void purple, cosmic shimmer, mystical

## 🚀 Usage Patterns

### Element Selection Interface

```tsx
const elements = ['fire', 'water', 'earth', 'wind', 'arcane'] as const;

<div className="flex gap-2">
  {elements.map(el => (
    <IridescentPill
      key={el}
      element={el}
      selected={selected === el}
      onClick={() => setSelected(el)}
    >
      {el.charAt(0).toUpperCase() + el.slice(1)}
    </IridescentPill>
  ))}
</div>
```

### Loading State

```tsx
{isLoading ? (
  <LoadingBubble element="arcane" label="Processing..." />
) : (
  <GlassCard element="arcane">
    {/* Content */}
  </GlassCard>
)}
```

### Form with Glass Inputs

```tsx
<form className="space-y-4">
  <GlassInput
    label="Username"
    element="wind"
    placeholder="Enter username"
  />
  <GlassInput
    label="Password"
    element="wind"
    type="password"
    placeholder="Enter password"
  />
  <LiquidButton element="wind" fullWidth type="submit">
    Sign In
  </LiquidButton>
</form>
```

## ♿ Accessibility

All components include:
- Keyboard navigation support
- ARIA labels and roles
- Focus-visible states
- Screen reader compatibility
- WCAG AA contrast (7:1+ for body text)

## 🎨 Customization

### Custom Element Colors

Extend the element palette in `types.ts`:

```typescript
export const ELEMENT_MATERIALS: Record<ElementType, ElementMaterial> = {
  // ... existing elements
  lightning: {
    base: '#0A0E18',
    primary: '#60A5FA',
    secondary: '#3B82F6',
    emission: '#DBEAFE',
    metal: '#94A3B8',
    glass: 'rgba(96,165,250,0.12)',
    iridescence: [/* ... */],
  },
};
```

### Custom Glass Materials

Add new presets in `types.ts`:

```typescript
export const GLASS_MATERIALS = {
  // ... existing materials
  diamond: {
    opacity: 'rgba(255,255,255,0.10)',
    blur: '80px',
    border: 'rgba(255,255,255,0.20)',
    description: 'Ultra-premium clarity',
  },
};
```

## 📏 Design Tokens

All components use centralized design tokens:

- **Colors**: Element materials, glass materials
- **Shadows**: 3-layer elevation system
- **Easing**: Physics-based motion curves
- **Duration**: Consistent timing scale

See `types.ts` for complete token definitions.

## 🔧 Dependencies

- `react` ^18.0.0
- `framer-motion` ^11.0.0
- `tailwindcss` ^3.4.0

## 📦 Future Components

Planned additions:
- `GlassModal` — Full-screen overlay with blur
- `IridescentCard` — Card with rotating border shimmer
- `ElementSwitcher` — Animated element transition
- `SacredPattern` — Geometric background patterns
- `LuminorAvatar` — 3D character preview

---

*Light inhabits form. Form becomes vessel. Vessel holds power.*
