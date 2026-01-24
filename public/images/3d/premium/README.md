# Premium 3D Icons - FrankX.AI

High-quality 3D icons from [3dicons.co](https://3dicons.co) - CC0 License (free for commercial use).

## Why These Are Better

| 3dicons.co (Premium) | Microsoft Fluent (Previous) |
|---------------------|----------------------------|
| 500x500 WebP | 300x300 PNG |
| Dynamic gradient style | Flat color style |
| Professional lighting | Basic shading |
| CC0 - No attribution | MIT License |

## Available Icons (21)

| File | Use Case | Best For |
|------|----------|----------|
| `rocket-dynamic.webp` | Launch, innovation | Hero CTAs, product launches |
| `bulb-dynamic.webp` | Ideas, creativity | Feature sections, insights |
| `star-dynamic.webp` | Premium, featured | Ratings, highlights |
| `crown-dynamic.webp` | Premium tier, VIP | Pricing, exclusive content |
| `fire-dynamic.webp` | Trending, hot | Popular content, urgency |
| `flash-dynamic.webp` | Speed, performance | Tech features, quick actions |
| `target-dynamic.webp` | Goals, precision | Strategy, focus areas |
| `chart-dynamic.webp` | Analytics, growth | Metrics, results |
| `gear-dynamic.webp` | Settings, config | Technical, automation |
| `tools-dynamic.webp` | Build, create | Development, workshops |
| `shield-dynamic.webp` | Security, trust | Safety, privacy |
| `computer-dynamic.webp` | Tech, digital | Products, tech content |
| `megaphone-dynamic.webp` | Announce, marketing | Launches, news |
| `thumbs-up-dynamic.webp` | Approval, success | Social proof, reviews |
| `folder-dynamic.webp` | Organize, files | Resources, downloads |
| `dollar-dynamic.webp` | Money, pricing | Pricing, monetization |
| `map-pin-dynamic.webp` | Location, navigate | Roadmaps, journeys |
| `calendar-dynamic.webp` | Schedule, dates | Events, planning |
| `gift-dynamic.webp` | Rewards, offers | Promotions, bonuses |
| `bell-dynamic.webp` | Notifications, alerts | Updates, reminders |
| `leaf-dynamic.webp` | Growth, nature | Sustainability, organic |

## Usage

### Next.js Image Component
```tsx
import Image from 'next/image'

<Image
  src="/images/3d/premium/rocket-dynamic.webp"
  alt="Launch rocket"
  width={200}
  height={200}
  className="drop-shadow-2xl"
/>
```

### With Floating Animation
```tsx
import Floating3DAsset from '@/components/ui/Floating3DAsset'

<Floating3DAsset
  src="/images/3d/premium/rocket-dynamic.webp"
  position="top-right"
  size="lg"
  animation="float"
/>
```

### Hero Section Pattern
```tsx
<section className="relative">
  {/* Background accent */}
  <div className="absolute -top-10 -right-10 opacity-20 blur-sm">
    <Image src="/images/3d/premium/star-dynamic.webp" width={400} height={400} alt="" />
  </div>

  {/* Foreground focal icon */}
  <div className="absolute bottom-0 right-0 animate-float">
    <Image src="/images/3d/premium/rocket-dynamic.webp" width={200} height={200} alt="" />
  </div>

  <h1>Your Headline</h1>
</section>
```

## Getting More Icons

Browse all icons at [3dicons.co/explore](https://3dicons.co/explore)

### CDN Pattern
```bash
# Format: sizes/{slug}/dynamic/500/color.webp
curl -sL "https://bvconuycpdvgzbvbkijl.supabase.co/storage/v1/object/public/sizes/{slug}/dynamic/500/color.webp" -o {name}-dynamic.webp
```

### Finding Slugs
1. Go to [3dicons.co/explore](https://3dicons.co/explore)
2. Click any icon
3. URL shows slug: `/icons/{hex}-{name}?angle=dynamic`
4. Use that slug in CDN URL

### Example Downloads
```bash
# Heart icon
curl -sL "https://bvconuycpdvgzbvbkijl.supabase.co/storage/v1/object/public/sizes/e32138-heart/dynamic/500/color.webp" -o heart-dynamic.webp

# Globe icon
curl -sL "https://bvconuycpdvgzbvbkijl.supabase.co/storage/v1/object/public/sizes/1a82ff-globe/dynamic/500/color.webp" -o globe-dynamic.webp
```

## License

**CC0 - Creative Commons Zero**
- Free for commercial use
- No attribution required
- Modify freely

Source: [3dicons.co](https://3dicons.co) by [@realvjy](https://twitter.com/realvjy)
