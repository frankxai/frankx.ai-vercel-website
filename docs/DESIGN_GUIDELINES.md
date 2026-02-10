# FrankX Design Guidelines
*The Aesthetic of Infinite Intelligence*

## 1. Philosophy: "Gravity-Defying"
Our design should feel weightless. Heavy borders, solid blocks of flat color, and clunky transitions are "heavy".
**Antigravity Design** uses:
-   **Lighting**: Elements are defined by light source, not just borders.
-   **Depth**: Multiple layers of blur and opacity.
-   **Physics**: Motion that feels natural, not linear.

## 2. The "Devin" Standard (AI Native)
Tools like Devin.ai and Perplexity have set a new standard for "AI Native" interfaces.
-   **Terminal + GUI Hybrid**: Don't hide the complexity, make it beautiful. Monospace fonts next to elegant sans-serifs.
-   **Streaming Text**: Text should feel like it's being "thought", not just loaded.
-   **Status Indicators**: Pulsing dots, live logs, subtle progress bars. The user should always know the system is *alive*.

## 3. Typography
**Primary (Headings)**: *Inter* (Tight tracking for large headings).
**Secondary (Body)**: *Inter* or *Geist Sans*.
**Code/Data**: *Geist Mono* or *JetBrains Mono*.

**Type Scale**:
-   **Hero**: 8rem (128px), tracking-tighter, font-bold.
-   **Section**: 4rem (64px), tracking-tight.
-   **Body**: 1.125rem (18px), relaxed line-height.

## 4. Color Palette
**Backgrounds**:
-   `bg-black` (#000000) - The void.
-   `bg-zinc-950` - Subtle depth.

**Accents**:
-   **FrankX Purple**: `#7C3AED` (Violet-600) to `#C084FC` (Purple-400).
-   **AI Blue**: `#3B82F6` (Blue-500) - For technical agents (Codex).
-   **Success Green**: `#4ADE80` (Green-400) - For system status.

## 5. Components

### The "Glass" Card
```css
.card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
}
```

### The "Glow" Effect
Use distinct, colored glows to indicate active states or agent focus.
```css
.glow-purple {
  box-shadow: 0 0 50px -10px rgba(124, 58, 237, 0.3);
}
```

## 6. Motion (Framer Motion)
-   **Entrance**: `initial={{ opacity: 0, y: 20 }}` `animate={{ opacity: 1, y: 0 }}`
-   **Transition**: `transition={{ type: "spring", stiffness: 200, damping: 20 }}`
-   **Hover**: Scale up slightly (1.02), increase brightness.

---
*If it feels like a standard SaaS, iterate again.*
