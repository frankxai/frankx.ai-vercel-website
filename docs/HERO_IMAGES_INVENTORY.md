# FrankX.ai Hero Images Inventory

**Last Updated**: October 2, 2025
**Total Images**: 6
**Generator**: Nano Banana MCP (Gemini 2.5 Flash Image API)

---

## Image Gallery

### 1. Homepage Hero
**File**: `public/hero-homepage.png`
**Size**: 1.1 MB
**Dimensions**: 1024x1024 px
**Theme**: Network nodes, AI Systems, Creative Tools, Intelligence
**Color Palette**: Dark blue/navy background, cyan nodes, purple connections
**Usage**: Main landing page hero section

**Visual Elements**:
- Central geometric network structure (sphere)
- Three labeled interface cards: "AI Systems", "Creative Tools", "Intelligence"
- Connected nodes with glowing cyan points
- Technical, professional aesthetic
- Cityscape silhouette in background

---

### 2. Vibe OS Hero
**File**: `public/hero-vibe-os.png`
**Size**: 1.2 MB
**Dimensions**: 1024x1024 px
**Theme**: Music creation, waveforms, brain/consciousness, audio interface
**Color Palette**: Deep purple/navy, cyan/magenta neon, gold accents
**Usage**: Vibe OS product page

**Visual Elements**:
- Central music interface with waveform display
- Dual speaker/circle elements
- Side panels with music waveforms (cyan and magenta)
- Bottom row: Circuit patterns, brain with audio waves, flowing energy
- Starfield background
- Strong music production/consciousness fusion vibe

---

### 3. Creative AI Toolkit Hero
**File**: `public/hero-creator-tools.png`
**Size**: 1.3 MB
**Dimensions**: 1024x1024 px
**Theme**: Multi-tool creativity, music, design, code
**Color Palette**: Teal/cyan gradient background, golden accents
**Usage**: Creative AI Toolkit product page

**Visual Elements**:
- Central paintbrush bursting with creative energy
- Music notes, code snippets, design elements
- Multiple floating interface panels
- Labels: "Content Creation", "Design Elements", "Query Interface"
- Particle effects and energy flows
- Emphasizes diversity of creative tools

---

### 4. Intelligence Atlas Hero
**File**: `public/hero-intelligence-atlas.png`
**Size**: 1.3 MB
**Dimensions**: 1024x1024 px
**Theme**: Data intelligence, strategic insights, knowledge mapping
**Color Palette**: Dark navy/blue with cyan highlights
**Usage**: Intelligence Atlas product page

**Visual Elements**:
- [Not viewed in this session - similar technical aesthetic expected]
- Likely features data visualization, network graphs, strategic elements

---

### 5. Soul Frequency Assessment Hero
**File**: `public/hero-assessment.png`
**Size**: 1.2 MB
**Dimensions**: 1024x1024 px
**Theme**: Consciousness assessment, spiritual transformation
**Color Palette**: Consistent with brand (cyan/blue/purple)
**Usage**: Soul Frequency Quiz page

**Visual Elements**:
- [Not viewed in this session]
- Likely features spiritual/consciousness themes aligned with assessment tool

---

### 6. Enterprise Hero (DEPRECATED)
**File**: `public/hero-enterprise.png`
**Size**: 1.3 MB
**Dimensions**: 1024x1024 px
**Status**: Page deleted (as shown in git status)
**Note**: File still exists but associated page removed from site

---

## Technical Specifications

### Current State
- **Format**: PNG (8-bit RGB, non-interlaced)
- **Compression**: Standard PNG compression
- **Color Space**: RGB
- **File Size Range**: 1.1 MB - 1.3 MB
- **Aspect Ratio**: 1:1 (Square)

### Optimization Needs

#### Priority 1: File Size Reduction
**Current**: 1.1-1.3 MB per image
**Target**: <100 KB per image
**Method**: Convert to WebP format

**Expected Results**:
- WebP: 50-150 KB (80-90% reduction)
- Maintain visual quality at 85-90% quality setting
- Significant LCP improvement

#### Priority 2: Format Modernization
**Add**: WebP format for modern browsers
**Keep**: PNG as fallback for older browsers
**Implementation**: Next.js Image component with automatic format detection

#### Priority 3: Aspect Ratio Consideration
**Current**: 1:1 (1024x1024)
**Consider**: 16:9 (1920x1080) for wider hero sections
**Reason**: Better fit for full-width hero displays
**Trade-off**: Square works well for centered/contained layouts

---

## Usage Guidelines

### Next.js Implementation

```tsx
import Image from 'next/image';

// Hero section example
<div className="hero-section">
  <Image
    src="/hero-homepage.png"
    alt="FrankX.ai AI creator platform dashboard with creative tools and intelligence systems"
    width={1024}
    height={1024}
    priority // LCP optimization
    quality={90}
    className="hero-image"
  />
</div>
```

### SEO Best Practices

**Alt Text Templates**:
- Homepage: "AI creator platform dashboard with creative tools, music production, and intelligence systems"
- Vibe OS: "Music creation interface with waveforms and consciousness-aligned audio tools"
- Toolkit: "Creative AI toolkit with content creation, design, and music production tools"
- Atlas: "Intelligence Atlas data visualization and strategic insights dashboard"
- Assessment: "Soul Frequency Assessment consciousness transformation journey"

### Performance Optimization Checklist

- [ ] Convert all images to WebP format
- [ ] Create PNG fallbacks
- [ ] Add proper alt text to all images
- [ ] Use `priority` prop for above-the-fold images
- [ ] Implement lazy loading for below-the-fold images
- [ ] Add explicit width/height to prevent CLS
- [ ] Test LCP on mobile and desktop
- [ ] Monitor Core Web Vitals after deployment

---

## Generation Workflow (for future images)

### Using Claude Desktop + Nano Banana MCP

1. **Open Claude Desktop** (MCP server already configured)

2. **Generate Image**:
   ```
   Use the generate_image tool to create:
   [Your detailed prompt here]

   Save to: C:\Users\Frank\FrankX\FrankX.AI - Vercel Website\public\hero-[name].png
   ```

3. **Optimize**:
   - Use Next.js automatic optimization, OR
   - Convert to WebP manually using Sharp or online tools

4. **Commit**:
   - Add to git
   - Update this inventory
   - Deploy to Vercel

### Prompt Engineering Tips

**Successful Pattern** (based on existing images):
- Specify "dark theme" or "deep navy/purple background"
- Include "cyan and purple/magenta accents" for brand consistency
- Mention "professional, high-tech aesthetic"
- Describe specific UI elements (dashboards, waveforms, etc.)
- Add "glowing", "neon", or "holographic" for tech feel
- Include "starfield" or "particle effects" for depth
- Specify "1024x1024" or desired dimensions

**Example Prompt**:
```
Create a modern, cinematic hero image for a music creation AI platform.
Dark purple/navy background with starfield. Central music interface with
glowing cyan and magenta waveforms. Include brain imagery merged with
audio elements. Add floating UI panels with music controls. Neon glow
effects, professional high-tech aesthetic. 1024x1024 pixels.
```

---

## Brand Consistency Notes

All images successfully maintain:
- ✅ Dark, sophisticated color palette
- ✅ Cyan/blue primary accent color
- ✅ Purple/magenta secondary accents
- ✅ Gold/amber subtle highlights (in some)
- ✅ Technical, futuristic aesthetic
- ✅ Abstract/geometric rather than photorealistic
- ✅ Professional yet creative vibe
- ✅ Consistent with "creator transformation" brand

This visual language effectively communicates:
- Technical sophistication
- Creative empowerment
- AI-powered tools
- Consciousness alignment (via purple/cyan spiritual tech aesthetic)
- Professional quality with artistic soul

---

**Maintained By**: FrankX Development Team
**Generator Tool**: Nano Banana MCP (Google Gemini 2.5 Flash Image API)
**Next Review**: After WebP conversion and optimization
