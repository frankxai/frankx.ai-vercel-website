# FrankX Keystatic CMS

Alternative CMS using Keystatic (by Thinkmill) for comparison testing.

## What is Keystatic?

Keystatic is a modern git-based CMS built by Thinkmill (creators of KeystoneJS). It's similar to Tina but with a different philosophy and feature set.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Content Directories
```bash
mkdir -p content/courses content/articles public/uploads
```

### 3. Run Development Server
```bash
npm run dev
```
Opens at: http://localhost:3002

### 4. Access Admin
Visit: http://localhost:3002/keystatic

## Features

- **Courses Collection**: Title, description, price, thumbnail, category, content
- **Articles Collection**: Title, published date, excerpt, cover image, body
- **Document Editor**: Rich text editing with formatting, images, links
- **Image Management**: Local file storage in public/uploads
- **Git-Native**: All content stored as markdown files
- **TypeScript**: Full type safety

## Storage

Keystatic supports two storage modes:

1. **Local** (Current): Content in your git repo
2. **GitHub** (Optional): Content in GitHub repo with auth

## Comparison

| Feature | Keystatic | Tina | Sanity |
|---------|-----------|------|--------|
| Cost | Free | Free | $0-99/mo |
| Storage | Git | Git | Cloud |
| Admin UI | Built-in | Optional | Sanity Studio |
| Image CDN | Local | Local | Included |
| Real-time | No | Optional | Yes |

## Why Keystatic?

- **React 19 Ready**: Built for modern React
- **TypeScript-First**: Strong typing throughout
- **Component-Based**: Define UI in code, not config
- **Flexible**: Easy to customize and extend
- **Open Source**: MIT licensed

## Keystatic vs Tina

### Keystatic Advantages:
- More React-native approach
- Better TypeScript integration
- Simpler to customize
- Built by Thinkmill (trusted team)

### Tina Advantages:
- More mature
- Larger community
- Optional cloud features
- More polished UI

## Documentation

- Keystatic Docs: https://keystatic.com/docs
- GitHub: https://github.com/Thinkmill/keystatic
- Examples: https://keystatic.com/docs/examples

## Testing

Compare all three setups:

1. **Tina** - http://localhost:3000
2. **Sanity** - http://localhost:3001 (+ Studio on :3333)
3. **Keystatic** - http://localhost:3002

Each runs on different port for easy comparison.
