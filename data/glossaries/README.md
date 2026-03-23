# Book Glossaries System

## Architecture

Each book has a glossary JSON file defining terms that appear in chapters.

### File Structure
```
data/glossaries/
├── README.md
├── love-and-poetry.json
├── spartan-mindset.json
├── golden-age.json
└── self-development.json
```

### Schema

```typescript
interface GlossaryTerm {
  term: string;           // The word or phrase (e.g., "Stoicism")
  definition: string;     // Short definition (50-80 chars for tooltip)
  extended?: string;      // Full explanation (for glossary page)
  chapter?: number;       // First appearance chapter
  aliases?: string[];     // Alternative spellings (e.g., ["stoic", "stoics"])
  relatedTerms?: string[]; // Cross-references
  category?: string;      // Group (e.g., "Philosophy", "Technique")
}

interface BookGlossary {
  bookSlug: string;
  title: string;
  description: string;
  terms: GlossaryTerm[];
}
```

## Integration Points

1. **Inline Tooltips** (`<GlossaryTooltip>`)
   - Hover/tap to reveal definition
   - Dotted underline styling
   - Link to full glossary page

2. **Glossary Page** (`/books/[bookSlug]/glossary`)
   - Alphabetical listing with categories
   - Search/filter functionality
   - Full definitions with cross-references
   - Back-link from each chapter

3. **Chapter Processing**
   - Auto-detect glossary terms in markdown
   - Wrap first occurrence per chapter with tooltip
   - Case-insensitive matching with aliases

## Usage

```tsx
import { getBookGlossary } from '@/lib/glossary';

const glossary = getBookGlossary('spartan-mindset');
```
