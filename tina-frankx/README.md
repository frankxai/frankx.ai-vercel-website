# FrankX Tina CMS

Git-based content management for FrankX AI Music Academy courses and articles.

## 🚀 Quick Start

The CMS is already running at **http://localhost:3000**

### View the Site
```bash
# Already running!
open http://localhost:3000
```

### Stop the Server
```bash
# Kill the current dev server
pkill -f "next dev"
```

### Restart the Server
```bash
cd /mnt/c/Users/Frank/FrankX/tina-frankx
npm run dev
```

## 📝 How to Edit Content

### Option 1: Direct File Editing (Recommended for Now)

Edit markdown files directly in your editor:

```bash
# Edit existing course
code content/courses/ai-music-production-fundamentals.mdx

# Create new course
cp content/courses/ai-music-production-fundamentals.mdx \
   content/courses/my-new-course.mdx

# Then edit the new file
code content/courses/my-new-course.mdx
```

### Option 2: Visual Editor (Optional - Requires Tina Cloud)

1. Sign up at https://tina.io (free tier: 2 users, unlimited docs)
2. Create a new project
3. Get your Client ID and Token
4. Create `.env.local`:

```bash
NEXT_PUBLIC_TINA_CLIENT_ID=your-client-id-here
TINA_TOKEN=your-token-here
```

5. Restart server:
```bash
npm run dev
```

6. Visit http://localhost:3000/admin

## 📚 Content Structure

### Courses (`content/courses/*.mdx`)

Frontmatter fields:
```yaml
---
title: Course Title
slug: course-slug
description: Short description
price: 97
thumbnail: /uploads/course-image.jpg
category: ai-music  # or automation, creator-tools
---

## Course content in markdown...
```

### Articles (`content/articles/*.mdx`)

Frontmatter fields:
```yaml
---
title: Article Title
slug: article-slug
publishedAt: 2025-01-15T10:00:00.000Z
excerpt: Article summary
coverImage: /uploads/article-cover.jpg
---

## Article content in markdown...
```

## 🗂️ Project Structure

```
tina-frankx/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Home page
│   ├── layout.tsx           # Root layout
│   └── admin/               # Admin routes
├── content/                  # Your content (git-tracked)
│   ├── courses/             # Course MDX files
│   └── articles/            # Article MDX files (future)
├── tina/                     # Tina configuration
│   └── config.ts            # Schema definitions
├── public/                   # Static assets
│   └── uploads/             # Uploaded images
└── package.json             # Dependencies
```

## 🎯 Key Features

### ✅ What Works Now
- Next.js app running on localhost:3000
- Content stored as MDX files in your repo
- Courses and Articles collections configured
- TypeScript type safety
- Git version control for all content
- Zero database required
- Zero hosting costs

### 🔜 Coming Soon (with Tina Cloud)
- Visual inline editing
- Real-time preview
- Media library
- Team collaboration

## 💰 Cost Comparison

| Option | Monthly Cost | Setup Time | Status |
|--------|-------------|------------|--------|
| **Tina (Current)** | **$0** | 15 min | ✅ Working |
| Tina Cloud (optional) | $0-29 | 5 min | Optional |
| Sanity | $0-99 | 15 min | Alternative |
| Payload | $29-77 | Failed | ❌ Broken |

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
# Opens at http://localhost:3000
```

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📖 Content Examples

### Create a New Course

1. Copy the template:
```bash
cp content/courses/ai-music-production-fundamentals.mdx \
   content/courses/my-new-course.mdx
```

2. Edit frontmatter:
```yaml
---
title: Advanced Suno AI Techniques
slug: advanced-suno-ai-techniques
description: Master advanced prompt engineering and style control
price: 197
category: ai-music
---
```

3. Add content in markdown
4. Commit to git
5. Done! It's live on localhost

### Add an Image

1. Add image to `public/uploads/`
2. Reference in frontmatter:
```yaml
thumbnail: /uploads/my-course-thumbnail.jpg
```

## 🔧 Configuration

### Tina Schema (`tina/config.ts`)

Add/modify collections:
```typescript
schema: {
  collections: [
    {
      name: "course",
      label: "Courses",
      path: "content/courses",
      fields: [
        // Your fields here
      ]
    }
  ]
}
```

### Next.js Config (`next.config.js`)

Already configured for:
- React strict mode
- No need for database
- Static export ready

## 🤝 Git Workflow

```bash
# Edit content
code content/courses/my-course.mdx

# Check changes
git status
git diff

# Commit
git add content/
git commit -m "Add new course: Advanced Suno AI"

# Push to repo
git push
```

## 🆘 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill existing process
pkill -f "next dev"

# Or use different port
npm run dev -- -p 3001
```

### Clear Next.js Cache
```bash
rm -rf .next
npm run dev
```

### TypeScript Errors
```bash
# Regenerate types
npx tina init
```

## 📚 Resources

- **Tina Docs**: https://tina.io/docs/
- **Next.js Docs**: https://nextjs.org/docs
- **MDX Guide**: https://mdxjs.com/

## 🎓 Why Tina CMS?

1. **Git-Native**: Content is version-controlled automatically
2. **Zero Infrastructure**: No database, no backend servers
3. **Developer-Friendly**: Edit in VS Code or visual editor
4. **Type-Safe**: Full TypeScript support
5. **Free**: $0 for self-hosted, optional cloud features
6. **Portable**: Content is just markdown files

## 🚀 Next Steps

1. **Edit sample course**: Try modifying `content/courses/ai-music-production-fundamentals.mdx`
2. **Create new course**: Copy and customize the sample
3. **Add images**: Put images in `public/uploads/`
4. **Commit changes**: Use git to version control
5. **Deploy**: Push to Vercel when ready

---

**Need Help?**
- Check docs: https://tina.io/docs/
- Example project: https://github.com/tinacms/tinacms

**Status**: ✅ Running at http://localhost:3000
