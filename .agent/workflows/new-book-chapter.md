---
description: Create a new book chapter with proper frontmatter and update the Table of Contents.
---

1. **Ask User** for the Chapter Number and Title.
2. **Generate Slug** from the title (kebab-case).
3. **Create File** in `content/book/chapter-[number]-[slug].mdx`.
   - Frontmatter:
     ```yaml
     title: "Chapter [Number]: [Title]"
     description: "Brief summary..."
     status: draft
     date: [Current Date]
     ```
4. **Update Table of Contents** (if a TOC file exists, e.g., `content/book/README.md` or similar).
5. **Open File** for the user to start writing.
