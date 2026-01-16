---
description: Scaffold a new blog post in the content directory.
---

1. **Ask User** for the Post Title.
2. **Generate Slug** from the title.
3. **Create File** in `content/blog/[slug].mdx`.
   - Frontmatter:
     ```yaml
     title: "[Title]"
     excerpt: "Write a short excerpt here..."
     date: [Current Date]
     coverImage: "/assets/blog/cover.jpg"
     author:
       name: Frank
       picture: "/assets/blog/authors/frank.jpg"
     ogImage:
       url: "/assets/blog/cover.jpg"
     ```
4. **Open File** for editing.
