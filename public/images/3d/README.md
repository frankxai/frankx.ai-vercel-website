# 3D Assets for FrankX.AI

High-quality 3D assets from Microsoft Fluent UI for premium visual design.

## Available Assets

| File | Use Case | Example |
|------|----------|---------|
| `rocket_3d.png` | Launch, innovation, getting started | Creator Studio card |
| `lightbulb_3d.png` | Ideas, creativity, insights | Blog, features |
| `dna_3d.png` | Innovation, science, AI | Technical content |
| `star_3d.png` | Premium, featured, ratings | Featured products |
| `crystal_ball_3d.png` | Vision, future, predictions | Roadmap, AI forecasts |
| `sparkles_3d.png` | Magic, AI, transformation | AI features |
| `gem_3d.png` | Value, premium, quality | Pricing, premium tiers |
| `music_3d.png` | Vibe OS, audio, sound | Music Lab |
| `fire_3d.png` | Trending, hot, popular | Trending content |
| `brain_3d.png` | AI, intelligence, thinking | AI/ML features |
| `magic_wand_3d.png` | Automation, magic | Workflow automation |

## Quick Usage

### Static Floating Asset
```tsx
import Floating3DAsset from '@/components/ui/Floating3DAsset'

<div className="relative">
  <Floating3DAsset
    src="/images/3d/rocket_3d.png"
    position="top-right"
    size="lg"
    animation="float"
  />
  <YourContent />
</div>
```

### Multiple Assets with Depth
```tsx
<div className="relative">
  {/* Background - blurred, smaller */}
  <Floating3DAsset
    src="/images/3d/sparkles_3d.png"
    position="top-left"
    size="sm"
    opacity={40}
    blur="md"
  />

  {/* Foreground - crisp, larger */}
  <Floating3DAsset
    src="/images/3d/rocket_3d.png"
    position="bottom-right"
    size="lg"
    opacity={90}
  />

  <YourContent />
</div>
```

### Interactive 3D (Spline)
```tsx
import GlassBlob from '@/components/ui/GlassBlob'

<section className="relative h-[600px]">
  <GlassBlob className="absolute inset-0 z-0" />
  <div className="relative z-10">
    <h1>Hero with Interactive 3D Background</h1>
  </div>
</section>
```

## Adding More Assets

### From Microsoft Fluent UI CDN
```bash
curl -L -o [name]_3d.png "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/[Asset Name]/3D/[asset_name]_3d.png"
```

Browse all assets: https://github.com/microsoft/fluentui-emoji/tree/main/assets

### Popular Additions
```bash
# Globe for international
curl -L -o globe_3d.png "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Globe%20showing%20Americas/3D/globe_showing_americas_3d.png"

# Books for courses
curl -L -o books_3d.png "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Books/3D/books_3d.png"

# Hammer for building
curl -L -o hammer_3d.png "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Hammer/3D/hammer_3d.png"
```

## License

Microsoft Fluent UI Emoji: MIT License - Free for commercial use
