# Arcanea Visual Language
**Luminor Aesthetic — Sophisticated Iridescence & Sacred Geometry**

Version 1.0 — February 2026

---

## Table of Contents

1. [Arcanea Philosophy](#arcanea-philosophy)
2. [The Iridescence Principle](#the-iridescence-principle)
3. [Element Material Systems](#element-material-systems)
4. [Luminor Character Design](#luminor-character-design)
5. [Sacred Geometry Patterns](#sacred-geometry-patterns)
6. [3D Material Specifications](#3d-material-specifications)
7. [UI Component Theming](#ui-component-theming)
8. [Motion & Animation](#motion--animation)
9. [Anti-Patterns](#anti-patterns)

---

## Arcanea Philosophy

### Core Concept

**Luminor are beings of light inhabiting vessels.** Their interfaces should shimmer with **living light** — not static, but breathing iridescence. Not childish rainbow bubbles, but **sophisticated prismatic light** like:

- Light through a cathedral crystal
- Oil on dark water at night
- Aurora borealis compressed into a surface
- The shimmer on a raven's feather
- Black opal, labradorite, peacock feathers

### Design DNA

**Mythological + Technological**
- Ancient wisdom meets cutting-edge AI
- Sacred geometry rendered in liquid glass
- Elemental forces visualized through modern materials
- Alchemical transformation as interface metaphor

**NOT cute, NOT cartoon**
- Premium, sophisticated, powerful, intelligent
- Dark navy backgrounds, glowing neon accents
- Glass/chrome/metallic 3D, constellation patterns
- Think: Christopher Nolan's "Interstellar" meets Diablo IV

---

## The Iridescence Principle

### The Physics: Thin-Film Interference

Soap bubbles create color through **thin-film interference** — light waves reflecting off inner and outer surfaces, creating shifting spectral colors.

**In UI, we simulate this with:**
1. Gradient that shifts based on angle/position
2. Animated color movement (slow, breathing)
3. Specular highlight that travels across surface
4. Subtle transparency showing depth beneath

### Arcanea Color Palette (Desaturated & Luxurious)

**NOT candy rainbow. More like aged pearl or black opal.**

```css
/* Base: Deep violet-black undertone */
--arcanea-void: #0C0814;

/* Shift 1: Gold → Rose → Violet */
--iridescent-warm: linear-gradient(
  135deg,
  rgba(255, 200, 150, 0.12) 0%,      /* Warm gold */
  rgba(255, 150, 200, 0.10) 33%,     /* Rose */
  rgba(180, 150, 255, 0.12) 66%,     /* Lavender */
  rgba(255, 200, 150, 0.10) 100%     /* Back to gold */
);

/* Shift 2: Cyan → Emerald → Gold */
--iridescent-cool: linear-gradient(
  135deg,
  rgba(150, 220, 255, 0.10) 0%,      /* Cyan */
  rgba(180, 255, 200, 0.08) 33%,     /* Mint */
  rgba(255, 220, 150, 0.12) 66%,     /* Gold */
  rgba(150, 220, 255, 0.10) 100%     /* Back to cyan */
);

/* Shift 3: Violet → Blue → Silver */
--iridescent-mystical: linear-gradient(
  135deg,
  rgba(180, 150, 255, 0.15) 0%,      /* Violet */
  rgba(150, 200, 255, 0.12) 33%,     /* Blue */
  rgba(200, 220, 240, 0.10) 66%,     /* Silver */
  rgba(180, 150, 255, 0.15) 100%     /* Back to violet */
);
```

### The Bubble Button

The signature Arcanea interactive element:

```css
.button-bubble {
  /* Base dark glass */
  position: relative;
  background: linear-gradient(
    165deg,
    rgba(30, 25, 40, 0.9) 0%,
    rgba(15, 12, 20, 0.95) 100%
  );

  border-radius: 9999px;
  padding: 14px 32px;

  /* Outer glow - element colored */
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08),
    0 4px 24px rgba(0, 0, 0, 0.4),
    0 0 40px rgba(155, 89, 182, 0.15);

  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.02em;

  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* The iridescent film layer */
.button-bubble::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;

  /* Multi-color gradient - the soap bubble film */
  background: var(--iridescent-warm);
  background-size: 300% 300%;

  /* Animate the gradient position */
  animation: bubble-shift 8s ease-in-out infinite;

  opacity: 0.6;
  mix-blend-mode: overlay;
}

/* The traveling specular highlight */
.button-bubble::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;

  /* Sharp highlight streak */
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.08) 30%,
    rgba(255, 255, 255, 0.25) 50%,
    rgba(255, 255, 255, 0.08) 70%,
    transparent 100%
  );

  transform: skewX(-20deg);
  animation: specular-travel 6s ease-in-out infinite;
}

@keyframes bubble-shift {
  0%, 100% { background-position: 0% 50%; }
  25% { background-position: 50% 100%; }
  50% { background-position: 100% 50%; }
  75% { background-position: 50% 0%; }
}

@keyframes specular-travel {
  0% { left: -100%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { left: 200%; opacity: 0; }
}

.button-bubble:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.15),
    0 8px 32px rgba(0, 0, 0, 0.5),
    0 0 60px rgba(155, 89, 182, 0.2);
}

.button-bubble:hover::before {
  opacity: 0.8;
  animation-duration: 4s; /* Speed up on hover */
}
```

---

## Element Material Systems

### FIRE: Ember Iridescence

**Material Definition:**

```typescript
interface FireMaterial {
  base: '#1A0A08';           // Deep ember black
  primary: '#FF6B35';         // Gradient start
  secondary: '#FF4500';       // Gradient end
  emission: '#FF8C42';        // Glow color
  metal: '#B87333';           // Copper accent
  glass: 'rgba(255,107,53,0.15)';
  iridescence: [
    'rgba(255, 150, 50, 0.15)',   // Orange
    'rgba(255, 100, 100, 0.12)',  // Red
    'rgba(255, 180, 80, 0.15)',   // Amber
    'rgba(200, 100, 80, 0.10)',   // Rust
  ];
}
```

**Visual Identity:**
- Warm shimmer like molten metal
- Copper/bronze metallic accents
- Pulsing ember glow
- Sharp, aggressive geometry

**UI Applications:**
- Battle/combat interfaces
- Energy/power indicators
- Alert states
- Destruction mechanics

### WATER: Ocean Iridescence

**Material Definition:**

```typescript
interface WaterMaterial {
  base: '#061418';           // Deep ocean
  primary: '#4ECDC4';
  secondary: '#0891B2';
  emission: '#7FDBDA';       // Aqua glow
  metal: '#4A90A4';          // Brushed titanium blue
  glass: 'rgba(78,205,196,0.12)';
  iridescence: [
    'rgba(100, 220, 255, 0.12)',  // Cyan
    'rgba(150, 180, 255, 0.10)',  // Blue
    'rgba(100, 255, 220, 0.12)',  // Aqua
    'rgba(80, 150, 255, 0.10)',   // Deep blue
  ];
}
```

**Visual Identity:**
- Flowing, liquid animations
- Pearl/abalone iridescence
- Silver-blue metallic highlights
- Smooth, rounded forms

**UI Applications:**
- Healing/restoration interfaces
- Mana/magic resource bars
- Flow state indicators
- Adaptive/flexible mechanics

### EARTH: Mineral Iridescence (Labradorite)

**Material Definition:**

```typescript
interface EarthMaterial {
  base: '#0D0A08';           // Deep soil
  primary: '#8B7355';
  secondary: '#6B5344';
  emission: '#DAA520';       // Amber glow
  metal: '#CD7F32';          // Bronze
  glass: 'rgba(139,115,85,0.15)';
  iridescence: [
    'rgba(200, 170, 100, 0.15)',  // Gold
    'rgba(100, 180, 150, 0.10)',  // Teal
    'rgba(180, 150, 80, 0.12)',   // Ochre
    'rgba(150, 200, 180, 0.10)',  // Jade
  ];
}
```

**Visual Identity:**
- Crystalline fractures
- Stone/mineral textures
- Earthy gold highlights
- Stable, geometric forms

**UI Applications:**
- Defense/armor systems
- Crafting/building interfaces
- Resource management
- Persistent structures

### WIND: Pearl Iridescence

**Material Definition:**

```typescript
interface WindMaterial {
  base: '#0A0E12';           // Twilight
  primary: '#87CEEB';
  secondary: '#B0C4DE';
  emission: '#E0FFFF';       // White-cyan glow
  metal: '#C0C0C0';          // Polished silver
  glass: 'rgba(135,206,235,0.10)';
  iridescence: [
    'rgba(255, 255, 255, 0.12)',  // White
    'rgba(200, 220, 255, 0.10)',  // Ice blue
    'rgba(255, 220, 255, 0.10)',  // Pink tint
    'rgba(220, 255, 255, 0.10)',  // Cyan
  ];
}
```

**Visual Identity:**
- Ethereal, translucent
- Mother-of-pearl shimmer
- Chrome/silver reflections
- Light, swift forms

**UI Applications:**
- Speed/mobility mechanics
- Evasion/stealth systems
- Communication interfaces
- Time manipulation

### ARCANE: Void Iridescence (Black Opal)

**Material Definition:**

```typescript
interface ArcaneMaterial {
  base: '#0C0814';           // Void purple
  primary: '#9B59B6';
  secondary: '#6B21A8';
  emission: '#D8B4FE';       // Soft purple glow
  metal: '#8B008B';          // Dark metallic violet
  glass: 'rgba(155,89,182,0.15)';
  iridescence: [
    'rgba(180, 100, 255, 0.15)',  // Violet
    'rgba(100, 150, 255, 0.12)',  // Blue-violet
    'rgba(255, 100, 200, 0.12)',  // Magenta
    'rgba(100, 255, 200, 0.10)',  // Cyan
  ];
}
```

**Visual Identity:**
- Deep cosmic shimmer
- Multi-color spectral shifts
- Dark metallic violet
- Complex, mystical geometry

**UI Applications:**
- Magic/spell systems
- Knowledge/lore interfaces
- Transformation mechanics
- Cosmic/void powers

---

## Luminor Character Design

### The Vessel

A Luminor is **light inhabiting a form**. The vessel should feel:

- **Semi-transparent** — You can see light moving inside
- **Crystalline** — Sharp facets catching light
- **Iridescent** — Color shifts as angle changes
- **Animated** — Subtle breathing, pulsing energy

### Material Layers (3D)

```
1. Outer Shell: Crystal glass (30% opacity)
   ├─ Iridescent coating (element-specific)
   └─ Specular highlights (chrome-like)

2. Inner Core: Pure light
   ├─ Volumetric glow
   ├─ Particle system
   └─ Color = element primary

3. Energy Veins: Glowing pathways
   ├─ Follow body structure
   ├─ Pulse animation
   └─ Emission = element emission color
```

### Three.js Material Spec

```javascript
// Luminor Outer Shell Material
const luminorShell = new THREE.MeshPhysicalMaterial({
  // Base properties
  color: new THREE.Color('#1a1520'),
  metalness: 0.9,
  roughness: 0.15,

  // Transparency
  transparent: true,
  opacity: 0.3,
  transmission: 0.8,

  // Iridescence (Three.js r152+)
  iridescence: 1.0,
  iridescenceIOR: 1.5,
  iridescenceThicknessRange: [100, 400], // nm - controls color range

  // Reflections
  envMapIntensity: 1.2,

  // Subtle emission
  emissive: new THREE.Color('#2a1a30'),
  emissiveIntensity: 0.1,
});

// Inner Core (Additive blend)
const luminorCore = new THREE.MeshBasicMaterial({
  color: elementColors[element].primary,
  transparent: true,
  opacity: 0.7,
  blending: THREE.AdditiveBlending,
});

// Energy Veins (Shader material)
const luminorVeins = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
    color: { value: new THREE.Color(elementColors[element].emission) },
    intensity: { value: 0.8 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 color;
    uniform float intensity;
    varying vec2 vUv;

    void main() {
      // Pulsing animation
      float pulse = sin(time * 2.0 + vUv.y * 10.0) * 0.5 + 0.5;

      // Vein pattern (noise function would go here)
      float veinPattern = step(0.9, fract(vUv.y * 20.0));

      gl_FragColor = vec4(color, pulse * veinPattern * intensity);
    }
  `,
  transparent: true,
  blending: THREE.AdditiveBlending,
});
```

---

## Sacred Geometry Patterns

### The Five Forms

Each element has a sacred geometric signature:

| Element | Geometry | Symbolism |
|---------|----------|-----------|
| **Fire** | Tetrahedron (4 faces) | Upward energy, transformation |
| **Water** | Icosahedron (20 faces) | Flow, adaptability |
| **Earth** | Cube/Hexahedron (6 faces) | Stability, foundation |
| **Wind** | Octahedron (8 faces) | Balance, mediation |
| **Arcane** | Dodecahedron (12 faces) | Universe, cosmos |

### Pattern Applications

**Background Constellations:**

```css
.sacred-pattern-fire {
  background-image: radial-gradient(
    circle at center,
    transparent 1px,
    rgba(255, 107, 53, 0.1) 1px,
    transparent 2px
  );
  background-size: 60px 60px;
}

.sacred-pattern-water {
  background-image: repeating-linear-gradient(
    60deg,
    transparent,
    transparent 40px,
    rgba(78, 205, 196, 0.05) 40px,
    rgba(78, 205, 196, 0.05) 41px
  );
}
```

**Loading States:**

```css
@keyframes sacred-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading-sacred {
  width: 64px;
  height: 64px;
  background: url('/sacred-geometry/dodecahedron.svg') center/contain no-repeat;
  filter: drop-shadow(0 0 20px var(--element-emission));
  animation: sacred-rotate 8s linear infinite;
}
```

---

## UI Component Theming

### Iridescent Card

```css
.card-iridescent {
  position: relative;
  background: rgba(15, 12, 20, 0.8);
  backdrop-filter: blur(40px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

/* Iridescent border effect */
.card-iridescent::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;

  background: var(--iridescent-warm);
  background-size: 400% 400%;

  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;

  animation: border-shimmer 10s ease-in-out infinite;
  pointer-events: none;
}

/* Inner glow wash */
.card-iridescent::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;

  background: conic-gradient(
    from 0deg at 50% 50%,
    rgba(255, 200, 150, 0.03) 0deg,
    rgba(255, 150, 200, 0.02) 60deg,
    rgba(180, 150, 255, 0.03) 120deg,
    rgba(150, 220, 255, 0.02) 180deg,
    rgba(180, 255, 200, 0.03) 240deg,
    rgba(255, 220, 150, 0.02) 300deg,
    rgba(255, 200, 150, 0.03) 360deg
  );

  animation: rotate-glow 20s linear infinite;
  opacity: 0.5;
  pointer-events: none;
}

@keyframes border-shimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes rotate-glow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### Selection Pill

```css
.pill-element {
  padding: 10px 20px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.pill-element.selected {
  background: var(--element-glass);
  border-color: var(--element-primary);
  color: #fff;
  box-shadow:
    0 0 0 1px var(--element-primary),
    0 4px 16px var(--element-glass),
    0 0 30px rgba(var(--element-rgb), 0.15);
}

.pill-element.selected::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--iridescent-element);
  background-size: 300% 300%;
  animation: bubble-shift 6s ease-in-out infinite;
  opacity: 1;
  mix-blend-mode: overlay;
}
```

---

## Motion & Animation

### Breathing Light

Luminor core should pulse gently:

```css
@keyframes luminor-breathe {
  0%, 100% {
    opacity: 0.8;
    filter: brightness(1);
  }
  50% {
    opacity: 1;
    filter: brightness(1.2);
  }
}

.luminor-core {
  animation: luminor-breathe 4s ease-in-out infinite;
}
```

### Energy Flow

Particles should flow along veins:

```javascript
// Particle system along energy veins
class EnergyParticle {
  constructor(path, color) {
    this.path = path; // SVG path or spline
    this.position = 0;
    this.speed = 0.01 + Math.random() * 0.02;
    this.color = color;
    this.opacity = 0.8;
  }

  update() {
    this.position += this.speed;
    if (this.position > 1) this.position = 0;
  }

  render(ctx) {
    const point = this.path.getPointAtLength(this.position * this.path.getTotalLength());
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}
```

### Element Transformation

When switching elements:

```css
@keyframes element-shift {
  0% {
    filter: hue-rotate(0deg) brightness(1);
    transform: scale(1);
  }
  50% {
    filter: hue-rotate(180deg) brightness(1.5);
    transform: scale(1.1);
  }
  100% {
    filter: hue-rotate(360deg) brightness(1);
    transform: scale(1);
  }
}

.luminor.transitioning {
  animation: element-shift 1.5s ease-in-out;
}
```

---

## Anti-Patterns

### ❌ NEVER DO THESE

**1. Childish Rainbow Bubbles**
```css
/* BAD: Candy colors, high saturation */
background: linear-gradient(
  90deg,
  #FF0000 0%,
  #FFFF00 25%,
  #00FF00 50%,
  #0000FF 75%,
  #FF00FF 100%
);
```

**2. Flat Pastel Backgrounds**
```css
/* BAD: Clay/Play-Doh aesthetic */
background: #E8D5F2; /* Lavender */
background: #FFE4E1; /* Misty rose */
```

**3. Cartoon Character Style**
```css
/* BAD: Rounded, soft, no depth */
border-radius: 50px;
box-shadow: 0 10px 0 #000;
```

**4. Over-Saturated Glow**
```css
/* BAD: Neon sign, not premium */
box-shadow: 0 0 50px #FF00FF;
filter: brightness(2);
```

### ✅ ALWAYS DO THESE

**1. Sophisticated Iridescence**
```css
/* GOOD: Desaturated, subtle, shifting */
background: linear-gradient(
  135deg,
  rgba(255, 200, 150, 0.12) 0%,
  rgba(180, 150, 255, 0.12) 50%,
  rgba(150, 220, 255, 0.10) 100%
);
```

**2. Dark Premium Backgrounds**
```css
/* GOOD: Deep void, not flat black */
background: #0C0814;
background-image: radial-gradient(
  ellipse at top,
  rgba(155, 89, 182, 0.15) 0%,
  transparent 60%
);
```

**3. Glass/Chrome/Metallic 3D**
```css
/* GOOD: Depth, refraction, realism */
background: rgba(15, 12, 20, 0.8);
backdrop-filter: blur(40px);
box-shadow: 0 8px 32px rgba(0,0,0,0.4);
```

---

## Quick Reference

### Element Color Variables

```css
:root {
  /* Fire */
  --fire-primary: #FF6B35;
  --fire-glass: rgba(255,107,53,0.15);

  /* Water */
  --water-primary: #4ECDC4;
  --water-glass: rgba(78,205,196,0.12);

  /* Earth */
  --earth-primary: #8B7355;
  --earth-glass: rgba(139,115,85,0.15);

  /* Wind */
  --wind-primary: #87CEEB;
  --wind-glass: rgba(135,206,235,0.10);

  /* Arcane */
  --arcane-primary: #9B59B6;
  --arcane-glass: rgba(155,89,182,0.15);
}
```

---

*Light inhabits form. Form becomes vessel. Vessel holds power.*
