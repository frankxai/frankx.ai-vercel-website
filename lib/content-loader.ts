/**
 * FrankX Content Loader
 *
 * Reads all content from /content/ (single source of truth)
 * Used by Next.js app for blog posts, books, etc.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Single source of truth - main content folder
const CONTENT_ROOT = path.join(process.cwd(), '..', '..', 'content');

export interface Article {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  theme: string;
  excerpt?: string;
  content: string;
  readingTime: number;
  tags?: string[];
  featured?: boolean;
}

export interface Book {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  genre: string;
  description: string;
  coverImage?: string;
  status: 'draft' | 'in-progress' | 'complete';
  chapters: BookChapter[];
  wordCount: number;
  publishedDate?: string;
}

export interface BookChapter {
  number: number;
  title: string;
  slug: string;
  content: string;
  wordCount: number;
  readingTime: number;
}

// ============================================================================
// ARTICLES
// ============================================================================

/**
 * Get all published articles
 */
export async function getArticles(theme?: string): Promise<Article[]> {
  const articlesPath = path.join(CONTENT_ROOT, 'articles');

  if (!fs.existsSync(articlesPath)) {
    return [];
  }

  const themes = theme
    ? [theme]
    : fs.readdirSync(articlesPath).filter(f => fs.statSync(path.join(articlesPath, f)).isDirectory());

  const articles: Article[] = [];

  for (const themeFolder of themes) {
    const themePath = path.join(articlesPath, themeFolder);

    if (!fs.existsSync(themePath)) continue;

    const files = fs.readdirSync(themePath).filter(f => f.endsWith('.md'));

    for (const file of files) {
      const filePath = path.join(themePath, file);
      const article = await parseArticle(filePath, themeFolder);

      if (article) {
        articles.push(article);
      }
    }
  }

  // Sort by date, newest first
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get single article by slug
 */
export async function getArticle(slug: string, theme?: string): Promise<Article | null> {
  const articles = await getArticles(theme);
  return articles.find(a => a.slug === slug) || null;
}

/**
 * Parse article markdown file
 */
async function parseArticle(filePath: string, theme: string): Promise<Article | null> {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Skip if not published
    if (data.status && data.status !== 'published') {
      return null;
    }

    const slug = path.basename(filePath, '.md');
    const processedContent = await markdownToHtml(content);
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // ~200 words per minute

    return {
      slug,
      title: data.title || slug,
      subtitle: data.subtitle,
      author: data.author || 'Frank',
      date: data.date || data.published_date || new Date().toISOString(),
      theme: data.theme || theme,
      excerpt: data.excerpt || content.substring(0, 160) + '...',
      content: processedContent,
      readingTime,
      tags: data.tags || [],
      featured: data.featured || false,
    };
  } catch (error) {
    console.error(`Error parsing article ${filePath}:`, error);
    return null;
  }
}

// ============================================================================
// BOOKS
// ============================================================================

/**
 * Get all books
 */
export async function getBooks(): Promise<Book[]> {
  const booksPath = path.join(CONTENT_ROOT, 'books');

  if (!fs.existsSync(booksPath)) {
    return [];
  }

  const folders = fs.readdirSync(booksPath).filter(f => {
    const folderPath = path.join(booksPath, f);
    return fs.statSync(folderPath).isDirectory() && !f.startsWith('_');
  });

  const books: Book[] = [];

  for (const folder of folders) {
    const book = await parseBook(folder);
    if (book) {
      books.push(book);
    }
  }

  return books.sort((a, b) => (b.publishedDate || '').localeCompare(a.publishedDate || ''));
}

/**
 * Get single book by slug
 */
export async function getBook(slug: string): Promise<Book | null> {
  const books = await getBooks();
  return books.find(b => b.slug === slug) || null;
}

/**
 * Get book chapters
 */
export async function getBookChapters(bookSlug: string): Promise<BookChapter[]> {
  const bookPath = path.join(CONTENT_ROOT, 'books', bookSlug, 'final');

  if (!fs.existsSync(bookPath)) {
    return [];
  }

  const files = fs.readdirSync(bookPath)
    .filter(f => f.endsWith('.md'))
    .sort(); // Assumes chapter-01.md, chapter-02.md naming

  const chapters: BookChapter[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(bookPath, file);
    const chapter = await parseChapter(filePath, i + 1);

    if (chapter) {
      chapters.push(chapter);
    }
  }

  return chapters;
}

/**
 * Get single chapter
 */
export async function getBookChapter(
  bookSlug: string,
  chapterSlug: string
): Promise<BookChapter | null> {
  const chapters = await getBookChapters(bookSlug);
  return chapters.find(c => c.slug === chapterSlug) || null;
}

/**
 * Parse book folder
 */
async function parseBook(bookSlug: string): Promise<Book | null> {
  try {
    const bookPath = path.join(CONTENT_ROOT, 'books', bookSlug);
    const metadataPath = path.join(bookPath, 'metadata.json');

    // Load metadata if exists
    let metadata: any = {};
    if (fs.existsSync(metadataPath)) {
      metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    }

    // Get chapters
    const chapters = await getBookChapters(bookSlug);
    const wordCount = chapters.reduce((sum, ch) => sum + ch.wordCount, 0);

    return {
      slug: bookSlug,
      title: metadata.title || bookSlug,
      subtitle: metadata.subtitle,
      author: metadata.author || 'Frank',
      genre: metadata.genre || 'Unknown',
      description: metadata.description || '',
      coverImage: metadata.cover?.file,
      status: metadata.status || (chapters.length > 0 ? 'in-progress' : 'draft'),
      chapters,
      wordCount,
      publishedDate: metadata.publishDate,
    };
  } catch (error) {
    console.error(`Error parsing book ${bookSlug}:`, error);
    return null;
  }
}

/**
 * Parse chapter file
 */
async function parseChapter(filePath: string, number: number): Promise<BookChapter | null> {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const slug = path.basename(filePath, '.md');
    const processedContent = await markdownToHtml(content);
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      number,
      title: data.title || `Chapter ${number}`,
      slug,
      content: processedContent,
      wordCount,
      readingTime,
    };
  } catch (error) {
    console.error(`Error parsing chapter ${filePath}:`, error);
    return null;
  }
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Convert markdown to HTML
 */
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(html, { sanitize: false })
    .process(markdown);

  return result.toString();
}

/**
 * Get content stats
 */
export async function getContentStats() {
  const articles = await getArticles();
  const books = await getBooks();

  const articlesByTheme = articles.reduce((acc, article) => {
    acc[article.theme] = (acc[article.theme] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalArticles: articles.length,
    totalBooks: books.length,
    articlesByTheme,
    recentArticles: articles.slice(0, 5),
    featuredArticles: articles.filter(a => a.featured),
  };
}

/**
 * Search content
 */
export async function searchContent(query: string): Promise<{
  articles: Article[];
  books: Book[];
}> {
  const allArticles = await getArticles();
  const allBooks = await getBooks();

  const lowerQuery = query.toLowerCase();

  const articles = allArticles.filter(article =>
    article.title.toLowerCase().includes(lowerQuery) ||
    article.content.toLowerCase().includes(lowerQuery) ||
    article.excerpt?.toLowerCase().includes(lowerQuery) ||
    article.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );

  const books = allBooks.filter(book =>
    book.title.toLowerCase().includes(lowerQuery) ||
    book.description.toLowerCase().includes(lowerQuery) ||
    book.genre.toLowerCase().includes(lowerQuery)
  );

  return { articles, books };
}
