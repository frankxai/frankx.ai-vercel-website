# Quick Setup: Sanity CMS for FrankX

## Why Sanity?
- Most popular headless CMS
- Real-time collaboration
- Excellent Next.js integration
- Free tier: 3 users, 10k docs, 5GB assets

## 5-Minute Setup

### Step 1: Create Sanity Project
```bash
npm create sanity@latest -- --template clean --create-project "FrankX CMS" --dataset production
```

This will:
- Create Sanity account (if needed)
- Set up project
- Install dependencies
- Create studio

### Step 2: Define Course Schema

`schemas/course.ts`:
```typescript
export default {
  name: 'course',
  title: 'Courses',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title'
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number'
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image'
    }
  ]
}
```

### Step 3: Start Studio
```bash
cd sanity-frankx
npm run dev
```

Opens at: http://localhost:3333

### Step 4: Integrate with Next.js

```bash
npm install next-sanity @portabletext/react
```

`lib/sanity.ts`:
```typescript
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false
})
```

### Step 5: Fetch Data in Next.js

```typescript
import { client } from '@/lib/sanity'

const courses = await client.fetch(`*[_type == "course"]`)
```

## Ports
- **Studio**: http://localhost:3333 (Sanity admin)
- **Next.js**: http://localhost:3000 (your site)

## Cost
- **Free**: Good for launch
- **Growth**: $99/month when you scale

## Next Steps
- Create content in Studio
- Query in Next.js
- Deploy both to Vercel

**Want me to set this up?** Let me know!
