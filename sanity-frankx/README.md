# FrankX Sanity CMS

Alternative CMS setup using Sanity for comparison testing.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Sanity Project
```bash
# Sign in to Sanity
npx sanity login

# Initialize project (if not done)
npx sanity init --project-id your-project-id --dataset production
```

### 3. Get Project ID
- Visit https://www.sanity.io/manage
- Create new project or use existing
- Copy your Project ID

### 4. Set Environment Variables
Create `.env.local`:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 5. Run Sanity Studio
```bash
npm run sanity
```
Opens at: http://localhost:3333

### 6. Run Next.js App
```bash
npm run dev
```
Opens at: http://localhost:3001

## Features

- **Courses Collection**: Title, slug, description, price, thumbnail, category, content
- **Articles Collection**: Title, slug, published date, excerpt, cover image, body
- **Real-time Editing**: Sanity Studio with live preview
- **Image Management**: Built-in image CDN with hotspot cropping
- **Rich Text**: Block content editor

## Cost

- **Free Tier**: 3 users, 10k documents, 5GB assets
- **Growth Plan**: $99/month (unlimited)

## Comparison with Tina

| Feature | Sanity | Tina |
|---------|--------|------|
| Cost | $0-99/mo | $0/mo |
| Storage | Cloud (Sanity) | Git (your repo) |
| Real-time | Yes | Optional |
| Image CDN | Included | Manual |
| Admin UI | Sanity Studio | Optional Cloud |

## Documentation

- Sanity Docs: https://www.sanity.io/docs
- Next.js Integration: https://www.sanity.io/plugins/next-sanity
- Schema Guide: https://www.sanity.io/docs/schema-types
