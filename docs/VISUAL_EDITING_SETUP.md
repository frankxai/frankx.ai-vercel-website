# Visual Editing with Tina CMS

This guide sets up visual content editing for FrankX blog posts using Tina CMS.

## Why Tina CMS?

- **Works with existing MDX** - No migration needed
- **Git-backed** - Every edit is a commit
- **Visual editing** - WYSIWYG for non-technical editing
- **Free tier** - $0 for solo creators
- **Local development** - Edit visually without cloud account

## Quick Start (Local Mode)

### 1. Install Tina

```bash
npm install tinacms @tinacms/cli
```

### 2. Add Scripts to package.json

```json
{
  "scripts": {
    "tina": "tinacms dev -c \"next dev\"",
    "tina:build": "tinacms build && next build"
  }
}
```

### 3. Run Visual Editor

```bash
npm run tina
```

Then open: `http://localhost:3000/admin`

## Cloud Mode (Optional)

For production visual editing (live site editing):

1. Create account at [tina.io](https://tina.io)
2. Create a new project
3. Add environment variables:

```env
NEXT_PUBLIC_TINA_CLIENT_ID=your-client-id
TINA_TOKEN=your-token
NEXT_PUBLIC_TINA_BRANCH=main
```

4. Deploy to Vercel with these env vars

## Schema Customization

The Tina schema (`tina/config.ts`) defines:

- **Blog collection** - Maps to `content/blog/*.mdx`
- **Fields** - All frontmatter fields with validation
- **Categories** - Dropdown with 5 approved categories
- **Templates** - Callout and AffiliateLink components

### Adding Custom Components

To add new MDX components:

```typescript
// In tina/config.ts, add to templates array:
{
  name: 'NewComponent',
  label: 'My New Component',
  fields: [
    { type: 'string', name: 'title', label: 'Title' },
    // ... more fields
  ],
}
```

## Workflow

### Writing New Content

1. Open `http://localhost:3000/admin`
2. Click "Blog Posts" → "Create New"
3. Fill in frontmatter fields (dropdown for category!)
4. Write content in visual editor
5. Save → Creates new MDX file with proper frontmatter
6. Git commit automatically tracks changes

### Editing Existing Content

1. Open admin panel
2. Click on any existing post
3. Edit visually
4. Changes are saved to MDX file on disk

## Comparison: When to Use What

| Task | Use |
|------|-----|
| Quick prose edits | Tina visual editor |
| Complex MDX code | VS Code |
| Frontmatter validation | `node scripts/validate-blog-frontmatter.js` |
| Bulk edits | VS Code + find/replace |
| New article structure | Either |

## Do I Need Payload CMS?

**No.** You would only need Payload if you had:
- Multiple non-technical editors
- Complex relational content (courses with lessons with quizzes)
- Need for workflow approvals
- Enterprise features like audit logs

For a solo creator blog with 20-50 articles, Tina + MDX is the right choice.

## Troubleshooting

### "Cannot find module 'tinacms'"
Run `npm install tinacms @tinacms/cli`

### Visual editor shows raw MDX
Check that your components are registered in tina/config.ts templates

### Changes not saving
Ensure you're running `npm run tina` (not regular `npm run dev`)
