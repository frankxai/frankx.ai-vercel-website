/**
 * Book Publishing Infrastructure Tests
 *
 * Validates: registry integrity, theme completeness, content file existence,
 * library data consistency, and cross-references between systems.
 *
 * Run: node --test tests/unit/books/books-infrastructure.test.mjs
 */

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

const PROJECT_ROOT = join(import.meta.dirname, '..', '..', '..')

// ─── Load data directly (avoiding TS imports) ─────────────────

// Parse books-registry.ts to extract book slugs and metadata
const registrySource = readFileSync(
  join(PROJECT_ROOT, 'app/books/lib/books-registry.ts'),
  'utf-8'
)

// Parse theme-classes.ts to extract theme IDs
const themeSource = readFileSync(
  join(PROJECT_ROOT, 'app/books/lib/theme-classes.ts'),
  'utf-8'
)

// Parse book-reviews.ts to extract review data
const reviewsSource = readFileSync(
  join(PROJECT_ROOT, 'data/book-reviews.ts'),
  'utf-8'
)

// Extract book slugs from registry (top-level slugs only, not chapter slugs)
function extractBookSlugs() {
  // Match slug that appears right after a comment block like "// ─── N. Book Name"
  // or after the opening { of a booksRegistry entry
  const matches = registrySource.matchAll(/\{\s*\n\s*slug:\s*'([^']+)'/g)
  const slugs = []
  for (const m of matches) {
    // Only top-level book slugs (not chapter slugs which are nested deeper)
    if (!m[1].startsWith('chapter-')) slugs.push(m[1])
  }
  return slugs
}

// Extract content directories from registry
function extractContentDirs() {
  const matches = registrySource.matchAll(/contentDir:\s*'([^']+)'/g)
  return [...matches].map((m) => m[1])
}

// Extract chapter slugs per book
function extractChapterSlugs() {
  const books = {}
  const bookBlocks = registrySource.split(/\/\/ ─── \d+\./)

  for (const block of bookBlocks) {
    const slugMatch = block.match(/slug:\s*'([^']+)'/)
    if (!slugMatch) continue
    const bookSlug = slugMatch[1]

    // Skip if it's a chapter slug (chapters are nested)
    const chapterMatches = [
      ...block.matchAll(/slug:\s*'(chapter-[^']+)'/g),
    ]
    books[bookSlug] = chapterMatches.map((m) => m[1])
  }

  return books
}

// Extract theme IDs defined in themeMap (handles both quoted and unquoted keys)
function extractThemeIds() {
  // Match both 'theme-id': { and themeId: { patterns
  const matches = themeSource.matchAll(/^\s{2}(?:'([^']+)'|([a-zA-Z-]+)):\s*\{$/gm)
  const ids = []
  for (const m of matches) {
    const id = m[1] || m[2]
    if (id && !id.includes('gradient') && id !== 'themeMap') ids.push(id)
  }
  return ids
}

// Extract review slugs from book-reviews.ts
function extractReviewSlugs() {
  const matches = reviewsSource.matchAll(/slug:\s*'([^']+)'/g)
  return [...matches].map((m) => m[1])
}

// Extract relatedBook references from reviews
function extractRelatedBooks() {
  const matches = reviewsSource.matchAll(/relatedBook:\s*'([^']+)'/g)
  return [...matches].map((m) => m[1])
}

// ─── Tests ─────────────────────────────────────────────────────

describe('Book Registry', () => {
  const bookSlugs = extractBookSlugs()
  const chaptersByBook = extractChapterSlugs()

  it('has exactly 6 books registered', () => {
    assert.equal(bookSlugs.length, 6, `Expected 6 books, got ${bookSlugs.length}: ${bookSlugs.join(', ')}`)
  })

  it('contains all expected book slugs', () => {
    const expected = [
      'love-and-poetry',
      'spartan-mindset',
      'golden-age',
      'self-development',
      'imagination',
      'manifestation',
    ]
    for (const slug of expected) {
      assert.ok(
        bookSlugs.includes(slug),
        `Missing book: ${slug}`
      )
    }
  })

  it('each book has at least 3 chapters', () => {
    for (const [book, chapters] of Object.entries(chaptersByBook)) {
      assert.ok(
        chapters.length >= 3,
        `Book "${book}" has only ${chapters.length} chapters (minimum 3)`
      )
    }
  })

  it('chapter slugs follow naming convention', () => {
    for (const [book, chapters] of Object.entries(chaptersByBook)) {
      for (const slug of chapters) {
        assert.match(
          slug,
          /^chapter-\d{2}-/,
          `Chapter "${slug}" in book "${book}" doesn't match "chapter-NN-" pattern`
        )
      }
    }
  })

  it('all content directories exist on disk', () => {
    const dirs = extractContentDirs()
    for (const dir of dirs) {
      const fullPath = join(PROJECT_ROOT, dir)
      assert.ok(
        existsSync(fullPath),
        `Content directory missing: ${dir}`
      )
    }
  })

  it('all published chapter markdown files exist', () => {
    const dirs = extractContentDirs()
    const bookSlugsFromDirs = extractBookSlugs()

    for (const [book, chapters] of Object.entries(chaptersByBook)) {
      // Find the matching content dir
      const dirMatch = registrySource.match(
        new RegExp(`slug:\\s*'${book}'[\\s\\S]*?contentDir:\\s*'([^']+)'`)
      )
      if (!dirMatch) continue

      const contentDir = dirMatch[1]
      for (const chapterSlug of chapters) {
        const mdPath = join(PROJECT_ROOT, contentDir, `${chapterSlug}.md`)
        assert.ok(
          existsSync(mdPath),
          `Chapter file missing: ${contentDir}/${chapterSlug}.md`
        )
      }
    }
  })
})

describe('Theme System', () => {
  const bookSlugs = extractBookSlugs()
  const themeIds = extractThemeIds()

  it('has theme definitions for all book theme IDs', () => {
    // Extract theme IDs used in book configs
    const usedThemeIds = [
      ...registrySource.matchAll(/id:\s*'([^']+)'/g),
    ].map((m) => m[1])

    for (const id of usedThemeIds) {
      assert.ok(
        themeIds.includes(id),
        `Theme "${id}" used in registry but not defined in theme-classes.ts`
      )
    }
  })

  it('each theme has all required ThemeClasses properties', () => {
    const requiredProps = [
      'progressGradient',
      'textPrimary',
      'textAccent',
      'borderPrimary',
      'bgPrimary',
      'bgPage',
      'blockquoteBorder',
      'linkColor',
      'badgeBg',
      'tocActive',
      'hoverBorder',
      'gradientText',
    ]

    for (const themeId of themeIds) {
      // Find the theme block in source
      const blockStart = themeSource.indexOf(`'${themeId}':`)
      if (blockStart === -1) continue

      for (const prop of requiredProps) {
        assert.ok(
          themeSource.includes(prop),
          `Theme system missing property: ${prop}`
        )
      }
    }
  })

  it('getThemeClasses function is exported', () => {
    assert.ok(
      themeSource.includes('export function getThemeClasses'),
      'getThemeClasses not exported from theme-classes.ts'
    )
  })
})

describe('Book Cover Images', () => {
  it('each book has a cover image on disk', () => {
    const coverPaths = [
      'public/images/books/love-and-poetry-cover.png',
      'public/images/books/spartan-mindset-cover.png',
      'public/images/golden-age/hero-golden-age.png',
      'public/images/books/self-development-cover.png',
      'public/images/books/imagination-cover.png',
      'public/images/books/manifestation-cover.png',
    ]

    for (const p of coverPaths) {
      const fullPath = join(PROJECT_ROOT, p)
      assert.ok(existsSync(fullPath), `Cover image missing: ${p}`)
    }
  })

  it('cover images are referenced in registry', () => {
    const coverRefs = [
      ...registrySource.matchAll(/coverImage:\s*'([^']+)'/g),
    ].map((m) => m[1])

    assert.ok(
      coverRefs.length >= 6,
      `Only ${coverRefs.length} cover images referenced (expected 6)`
    )

    for (const ref of coverRefs) {
      assert.match(ref, /^\/images\//, `Cover path should start with /images/: ${ref}`)
    }
  })
})

describe('Library / Book Reviews', () => {
  const reviewSlugs = extractReviewSlugs()
  const relatedBooks = extractRelatedBooks()
  const bookSlugs = extractBookSlugs()

  it('has at least 5 book reviews', () => {
    assert.ok(
      reviewSlugs.length >= 5,
      `Only ${reviewSlugs.length} reviews (expected at least 5)`
    )
  })

  it('review slugs are unique', () => {
    const unique = new Set(reviewSlugs)
    assert.equal(
      unique.size,
      reviewSlugs.length,
      'Duplicate review slugs found'
    )
  })

  it('relatedBook references point to valid books', () => {
    for (const ref of relatedBooks) {
      assert.ok(
        bookSlugs.includes(ref),
        `Review references unknown book: "${ref}"`
      )
    }
  })

  it('review data exports required functions', () => {
    assert.ok(
      reviewsSource.includes('export function getReviewBySlug'),
      'getReviewBySlug not exported'
    )
    assert.ok(
      reviewsSource.includes('export function getReviewsByCategory'),
      'getReviewsByCategory not exported'
    )
    assert.ok(
      reviewsSource.includes('export function getAllReviewSlugs'),
      'getAllReviewSlugs not exported'
    )
  })
})

describe('Route Files', () => {
  it('books hub page exists', () => {
    assert.ok(
      existsSync(join(PROJECT_ROOT, 'app/books/page.tsx')),
      'Missing: app/books/page.tsx'
    )
  })

  it('dynamic book route exists', () => {
    assert.ok(
      existsSync(join(PROJECT_ROOT, 'app/books/[bookSlug]/page.tsx')),
      'Missing: app/books/[bookSlug]/page.tsx'
    )
  })

  it('dynamic chapter route exists', () => {
    assert.ok(
      existsSync(join(PROJECT_ROOT, 'app/books/[bookSlug]/[chapterSlug]/page.tsx')),
      'Missing: app/books/[bookSlug]/[chapterSlug]/page.tsx'
    )
  })

  it('library hub page exists', () => {
    assert.ok(
      existsSync(join(PROJECT_ROOT, 'app/library/page.tsx')),
      'Missing: app/library/page.tsx'
    )
  })

  it('library review route exists', () => {
    assert.ok(
      existsSync(join(PROJECT_ROOT, 'app/library/[slug]/page.tsx')),
      'Missing: app/library/[slug]/page.tsx'
    )
  })

  it('books layout exists', () => {
    assert.ok(
      existsSync(join(PROJECT_ROOT, 'app/books/layout.tsx')),
      'Missing: app/books/layout.tsx'
    )
  })
})

describe('Book Components', () => {
  const components = [
    'app/books/components/BookReader.tsx',
    'app/books/components/BookTOC.tsx',
    'app/books/components/BookProgress.tsx',
    'app/books/components/BookChapterNav.tsx',
  ]

  for (const comp of components) {
    it(`${comp.split('/').pop()} exists`, () => {
      assert.ok(
        existsSync(join(PROJECT_ROOT, comp)),
        `Missing component: ${comp}`
      )
    })
  }
})

describe('PDF Pipeline', () => {
  it('book PDF generation script exists', () => {
    assert.ok(
      existsSync(join(PROJECT_ROOT, 'scripts/generate-book-pdfs.mjs')),
      'Missing: scripts/generate-book-pdfs.mjs'
    )
  })

  it('PDF script has valid syntax', () => {
    const source = readFileSync(
      join(PROJECT_ROOT, 'scripts/generate-book-pdfs.mjs'),
      'utf-8'
    )
    assert.ok(source.includes('import { launch }'), 'Missing puppeteer import')
    assert.ok(source.includes('import { marked }'), 'Missing marked import')
    assert.ok(source.includes('async function main'), 'Missing main function')
  })

  it('PDF script covers all 6 books', () => {
    const source = readFileSync(
      join(PROJECT_ROOT, 'scripts/generate-book-pdfs.mjs'),
      'utf-8'
    )
    const expectedSlugs = [
      'love-and-poetry',
      'spartan-mindset',
      'golden-age',
      'self-development',
      'imagination',
      'manifestation',
    ]
    for (const slug of expectedSlugs) {
      assert.ok(
        source.includes(`'${slug}'`),
        `PDF script missing book: ${slug}`
      )
    }
  })
})

describe('ACOS Skill Module', () => {
  it('book-publishing SKILL.md exists', () => {
    assert.ok(
      existsSync(join(PROJECT_ROOT, '.claude/skills/book-publishing/SKILL.md')),
      'Missing: .claude/skills/book-publishing/SKILL.md'
    )
  })

  it('skill covers all 6 books', () => {
    const skill = readFileSync(
      join(PROJECT_ROOT, '.claude/skills/book-publishing/SKILL.md'),
      'utf-8'
    )
    const expectedBooks = [
      'Love & Poetry',
      'Spartan Mindset',
      'Golden Age',
      'Self-Development',
      'Imagination',
      'Manifestation',
    ]
    for (const book of expectedBooks) {
      assert.ok(
        skill.includes(book),
        `Skill missing book: ${book}`
      )
    }
  })

  it('skill includes voice profiles for each book', () => {
    const skill = readFileSync(
      join(PROJECT_ROOT, '.claude/skills/book-publishing/SKILL.md'),
      'utf-8'
    )
    assert.ok(skill.includes('**Voice**:'), 'Missing voice profiles')
    assert.ok(skill.includes('**Research Sources**:'), 'Missing research sources')
    assert.ok(skill.includes('**Visual Identity**:'), 'Missing visual identity')
    assert.ok(skill.includes('**Writing Rules**:'), 'Missing writing rules')
  })

  it('skill-rules.json includes book-publishing profile', () => {
    const rules = readFileSync(
      join(PROJECT_ROOT, '.claude/skills/skill-rules.json'),
      'utf-8'
    )
    assert.ok(
      rules.includes('"book-publishing"'),
      'skill-rules.json missing book-publishing profile'
    )
  })
})
