# Quick Setup Guide - AI Architect Skills Landing Page
**Get Your Premium Landing Page Running in 10 Minutes**

---

## ⚡ Quick Start (3 Commands)

```bash
# 1. Create Next.js project
npx create-next-app@latest ai-architect-landing --typescript --tailwind --app
cd ai-architect-landing

# 2. Install dependencies
npm install framer-motion lucide-react class-variance-authority clsx tailwind-merge tailwindcss-animate

# 3. Copy files from this directory
# Then run: npm run dev
```

---

## 📋 Complete Checklist

### Step 1: Project Setup ✅
```bash
npx create-next-app@latest ai-architect-landing \
  --typescript \
  --tailwind \
  --app \
  --src-dir=false \
  --import-alias="@/*"
```

When prompted:
- Would you like to use TypeScript? **Yes**
- Would you like to use ESLint? **Yes**
- Would you like to use Tailwind CSS? **Yes**
- Would you like to use `src/` directory? **No**
- Would you like to use App Router? **Yes**
- Would you like to customize the default import alias? **No**

### Step 2: Install Dependencies ✅
```bash
cd ai-architect-landing

npm install \
  framer-motion \
  lucide-react \
  class-variance-authority \
  clsx \
  tailwind-merge \
  tailwindcss-animate
```

### Step 3: Copy Core Files ✅

#### A. Main Landing Page
Copy `page.tsx` to:
```
your-project/app/page.tsx
```

#### B. Global Styles
Copy `globals.css` to:
```
your-project/app/globals.css
```

#### C. Tailwind Config
Copy `tailwind.config.js` to:
```
your-project/tailwind.config.js
```

### Step 4: Create Magic UI Components ✅

#### A. Create directory structure
```bash
mkdir -p components/ui/magic-ui
mkdir -p lib
```

#### B. Copy ShimmerButton
Create `components/ui/magic-ui/shimmer-button.tsx`:

```typescript
import React, { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "rgba(0, 0, 0, 1)",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={
          {
            "--shimmer-color": shimmerColor,
            "--shimmer-size": shimmerSize,
            "--shimmer-duration": shimmerDuration,
            "--border-radius": borderRadius,
            "--background": background,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--background)] [border-radius:var(--border-radius)] dark:text-black",
          "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-[1px]",
          className,
        )}
        ref={ref}
        {...props}
      >
        <div
          className={cn(
            "-z-30 blur-xl",
            "absolute inset-0 overflow-visible [container-type:size]",
          )}
        >
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--shimmer-size)*0.5)),transparent_0,var(--shimmer-color)_var(--shimmer-size),transparent_var(--shimmer-size))] [translate:0_0]" />
          </div>
        </div>
        {children}
        <div
          className={cn(
            "insert-0 absolute size-full",
            "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]",
            "transform-gpu transition-all duration-300 ease-in-out",
            "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
            "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]",
          )}
        />
        <div
          className={cn(
            "absolute -z-20 [background:var(--background)] [border-radius:var(--border-radius)] [inset:var(--shimmer-size)]",
          )}
        />
      </button>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";

export default ShimmerButton;
```

#### C. Copy Marquee
Create `components/ui/magic-ui/marquee.tsx`:

```typescript
import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
```

#### D. Create Utility Functions
Create `lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Step 5: Run Development Server ✅
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🎯 Customization Checklist

### Essential Updates Before Launch

#### 1. Update Links ✅
In `page.tsx`, find and replace all `href="#"` with actual URLs:
- **Download Free CTA** → Your GitHub/download link
- **Buy Professional** → Your Gumroad/payment link
- **Social media links** → Your Twitter, LinkedIn, GitHub
- **Footer links** → Actual page links

#### 2. Update Content ✅
Replace placeholder content:
- **Testimonials** → Real customer quotes (or remove section)
- **Stats** → Actual metrics (downloads, users, etc.)
- **Company names** → Real or anonymize
- **Features list** → Match your actual offerings

#### 3. Set Up Analytics ✅
Add to `app/layout.tsx`:

```typescript
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YOUR_GA_ID');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### 4. Configure SEO ✅
Update `app/layout.tsx` metadata:

```typescript
export const metadata = {
  title: 'AI Architect Skills | Master AI Architecture in Weeks',
  description: '10 production-tested skills for AI Architects. Learn Claude SDK, LangGraph, MCP, and more.',
  keywords: 'AI architect, Claude SDK, LangGraph, MCP, AI training',
  openGraph: {
    title: 'AI Architect Skills',
    description: 'Master AI Architecture in Weeks, Not Years',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Architect Skills',
    description: 'Master AI Architecture in Weeks, Not Years',
    images: ['/twitter-image.png'],
  },
};
```

---

## 🚀 Deployment Checklist

### Pre-Deploy

- [ ] Test on mobile devices
- [ ] Test on all major browsers
- [ ] Update all placeholder content
- [ ] Add real testimonials or remove section
- [ ] Set up payment links (Gumroad/Stripe)
- [ ] Add analytics tracking
- [ ] Configure SEO metadata
- [ ] Create OG images (1200×630)
- [ ] Test all CTAs and links
- [ ] Run Lighthouse audit (score 90+)

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Or connect GitHub repo for automatic deployments:
1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Deploy!

### Post-Deploy

- [ ] Verify all links work
- [ ] Test payment flow
- [ ] Set up domain (custom domain)
- [ ] Configure SSL (automatic on Vercel)
- [ ] Submit to Google Search Console
- [ ] Share on social media
- [ ] Monitor analytics

---

## 🐛 Common Issues & Solutions

### Issue: "Module not found: Can't resolve '@/lib/utils'"
**Solution:**
```bash
# Ensure the path alias is configured in tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Issue: Animations not smooth
**Solution:**
- Reduce number of floating particles (line 20-40 in page.tsx)
- Disable animations on mobile:
```typescript
const isMobile = window.innerWidth < 768;
initial={isMobile ? {} : { opacity: 0, y: 20 }}
```

### Issue: Tailwind classes not applying
**Solution:**
```bash
# Restart dev server
npm run dev

# Or rebuild
rm -rf .next
npm run dev
```

### Issue: Build fails
**Solution:**
```bash
# Clear cache and rebuild
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

---

## 📊 Performance Checklist

Run before deploying:

```bash
npm run build
npm run start

# Then test in Chrome DevTools:
# 1. Open DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Run audit
```

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

**Optimize if needed:**
- Compress images → [TinyPNG](https://tinypng.com)
- Lazy load images → Next.js does this automatically
- Reduce animations on mobile
- Enable caching headers (Vercel does this)

---

## 💡 Pro Tips

### 1. A/B Testing
Use different versions for different audiences:
- Version A: Free tier focus
- Version B: Professional tier focus
- Version C: Enterprise tier focus

### 2. Conversion Optimization
- Add exit-intent popup
- Add live chat (Intercom/Drift)
- Add video demo
- Show money-back guarantee prominently
- Add trust badges

### 3. Content Updates
Keep fresh:
- Update testimonials monthly
- Add new stats quarterly
- Refresh featured skills
- Update screenshots/demos

### 4. Technical SEO
- Add structured data (Schema.org)
- Create sitemap.xml
- Add robots.txt
- Optimize images (WebP format)
- Use semantic HTML

---

## 🎓 Learning Resources

**Next.js:**
- [Official Docs](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

**Framer Motion:**
- [Official Docs](https://www.framer.com/motion/)
- [Examples](https://www.framer.com/motion/examples/)

**Tailwind CSS:**
- [Official Docs](https://tailwindcss.com/docs)
- [Components](https://tailwindui.com/)

**Magic UI:**
- [Components Library](https://magicui.design/)

---

## ✅ Final Checklist

Before going live:

- [ ] All content is accurate
- [ ] All links work
- [ ] Payment integration tested
- [ ] Analytics configured
- [ ] SEO optimized
- [ ] Mobile responsive
- [ ] Fast loading (< 3s)
- [ ] Accessible (WCAG 2.1)
- [ ] Cross-browser tested
- [ ] Social sharing works
- [ ] Email capture works (if applicable)
- [ ] Legal pages (privacy, terms)
- [ ] Backup/version control
- [ ] Domain configured
- [ ] SSL enabled

---

## 🆘 Need Help?

**Technical Issues:**
- Check the main README.md for detailed troubleshooting
- Review Next.js documentation
- Search GitHub issues

**Design Questions:**
- Refer to Magic UI docs
- Check Tailwind CSS documentation
- Review Framer Motion guides

**Business Questions:**
- Review PACKAGING-STRATEGY.md
- See ACTION-PLAN.md
- Check MONETIZATION-MODEL.md

---

**Ready to launch? You've got this! 🚀**

*Landing page created by FrankX - Building premium products for premium audiences*

---

*Last Updated: December 18, 2025*
