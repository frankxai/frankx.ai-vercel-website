# FrankX Content Inventory System

A comprehensive content tracking system for three brands:
- **FrankX** - Personal creator brand
- **AI Architect Academy** - Educational content
- **Arcanea** - Creative gaming universe

## Directory Structure

```
data/inventories/
├── index.json                      # Master index
├── profiles.json                   # Social profiles for all brands
├── README.md                       # This file
│
├── _schema/
│   └── inventory-types.ts          # TypeScript type definitions
│
├── frankx/                         # FrankX Personal Brand
│   ├── music.json                  # Suno tracks (500+)
│   ├── art.json                    # AI art, visuals
│   ├── videos.json                 # YouTube, tutorials
│   ├── blog-articles.json          # Auto-generated from content/blog/
│   └── social/
│       ├── linkedin.json
│       ├── instagram.json
│       ├── x-twitter.json
│       └── threads.json
│
├── ai-architect-academy/           # Educational Brand
│   ├── courses.json
│   ├── tutorials.json
│   └── resources.json
│
└── arcanea/                        # Creative Universe
    ├── lore.json                   # World-building content
    ├── music.json                  # Arcanea-themed tracks
    ├── art.json                    # Concept art
    └── implementations.json        # Code repos
```

## Quick Start

### Auto-Generate Blog Inventory
```bash
node scripts/generate-blog-inventory.mjs
```

### Import Suno Tracks
```bash
# From a text file with URLs (one per line)
node scripts/import-suno-tracks.mjs --file my-suno-urls.txt

# From CSV (title,url,genre,mood,date)
node scripts/import-suno-tracks.mjs --csv my-tracks.csv

# Interactive mode
node scripts/import-suno-tracks.mjs --interactive
```

### Manual Entry
Each JSON file includes a `_template` field showing the required structure. Copy the template to add new entries.

## What Syncs to Production

| Inventory | Syncs to frankx.ai? |
|-----------|---------------------|
| `frankx/*` | ✅ Yes |
| `ai-architect-academy/*` | ✅ Yes |
| `arcanea/*` | ❌ No (private) |
| `profiles.json` | ✅ Yes |
| `_schema/*` | ✅ Yes |

## TypeScript Integration

Import types in your code:
```typescript
import type {
  MusicTrack,
  BlogArticle,
  SocialPost,
  Brand
} from '@/data/inventories/_schema/inventory-types';
```

## Stats Dashboard (Current)

| Content Type | Tracked | Estimated Total |
|-------------|---------|-----------------|
| Blog Articles | 51 | 51 |
| Suno Tracks | 6 | 500+ |
| Videos | 0 | ~20 |
| LinkedIn Posts | 0 | ~100 |
| Instagram Posts | 0 | ~50 |
| Products | 6 | 6 |

## Adding New Content

### Music Track
```json
{
  "id": "track-slug",
  "type": "music",
  "title": "Track Title",
  "brand": "frankx",
  "platform": "suno",
  "sunoUrl": "https://suno.com/s/abc123",
  "genre": ["ambient", "electronic"],
  "mood": ["calm", "focused"],
  "createdAt": "2025-01-15"
}
```

### Social Post
```json
{
  "id": "li-2025-01-15-topic",
  "type": "social",
  "platform": "linkedin",
  "title": "Post Hook",
  "content": "Full post text...",
  "brand": "frankx",
  "createdAt": "2025-01-15",
  "engagement": {
    "likes": 150,
    "comments": 25
  }
}
```

## Roadmap

- [ ] Build `/app/inventory/` dashboard page
- [ ] Add search/filter functionality
- [ ] Create social media import tools
- [ ] Build analytics tracking
- [ ] Auto-sync engagement metrics

---

*Created: 2026-01-23 | Part of the FrankX Content Intelligence System*
