// Content Manager - Core logic for content operations

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { 
  ContentItem, 
  ContentMetadata, 
  ContentFrontmatter, 
  ContentStatus,
  ContentPillar,
  ContentType,
  PipelineStats,
  ContentMetrics 
} from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content/blog');
const GUIDES_DIR = path.join(process.cwd(), 'content/guides');

export class ContentManager {
  private contentDir: string;
  private guidesDir: string;

  constructor() {
    this.contentDir = CONTENT_DIR;
    this.guidesDir = GUIDES_DIR;
  }

  // Get all content files
  async getAllContent(): Promise<ContentItem[]> {
    const items: ContentItem[] = [];
    
    // Read blog posts
    if (fs.existsSync(this.contentDir)) {
      const files = fs.readdirSync(this.contentDir).filter(f => f.endsWith('.mdx'));
      for (const file of files) {
        const item = await this.readContentFile(path.join(this.contentDir, file));
        if (item) items.push(item);
      }
    }

    // Read guides
    if (fs.existsSync(this.guidesDir)) {
      const files = fs.readdirSync(this.guidesDir).filter(f => f.endsWith('.mdx'));
      for (const file of files) {
        const item = await this.readContentFile(path.join(this.guidesDir, file));
        if (item) items.push(item);
      }
    }

    return items.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  private async readContentFile(filePath: string): Promise<ContentItem | null> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data, content: body } = matter(content);
      const slug = path.basename(filePath, '.mdx');
      
      return {
        slug,
        content: body,
        ...data as ContentFrontmatter,
        pillar: this.inferPillar(data.category, data.tags),
        status: this.inferStatus(data),
        type: this.inferType(data),
        priority: this.inferPriority(data),
        seoScore: data.seoScore || 0,
        wordCount: this.countWords(body),
        readingTime: this.calculateReadingTime(body),
        lastModified: fs.statSync(filePath).mtime.toISOString()
      };
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error);
      return null;
    }
  }

  private inferPillar(category: string, tags: string[]): ContentPillar {
    const text = `${category} ${tags?.join(' ')}`.toLowerCase();
    
    if (text.includes('agentic') || text.includes('workflow') || text.includes('claude')) {
      return 'Agentic Creator Mastery';
    }
    if (text.includes('conscious') || text.includes('soul') || text.includes('spirit')) {
      return 'Conscious AI & Soul Frequency';
    }
    if (text.includes('music') || text.includes('sound') || text.includes('suno')) {
      return 'Music & Sound as Consciousness Technology';
    }
    if (text.includes('productivity') || text.includes('time') || text.includes('freedom')) {
      return 'Creator Productivity Systems';
    }
    return 'AI for Families & Professionals';
  }

  private inferStatus(data: any): ContentStatus {
    // Check for status in frontmatter or default to published if has date
    if (data.status && ['idea', 'draft', 'review', 'edit', 'seo', 'published'].includes(data.status)) {
      return data.status;
    }
    return data.date ? 'published' : 'idea';
  }

  private inferType(data: any): ContentType {
    if (data.category?.includes('Guide')) return 'pillar-article';
    if (data.readingGoal?.includes('step')) return 'tutorial';
    if (data.readingGoal?.includes('framework')) return 'framework';
    return 'pillar-article';
  }

  private inferPriority(data: any): 'P0' | 'P1' | 'P2' | 'P3' {
    if (data.featured) return 'P0';
    if (data.category?.includes('Guide')) return 'P1';
    return 'P2';
  }

  private countWords(content: string): number {
    return content.split(/\s+/).filter(Boolean).length;
  }

  private calculateReadingTime(content: string): string {
    const words = this.countWords(content);
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  }

  // Pipeline statistics
  async getPipelineStats(): Promise<PipelineStats> {
    const all = await this.getAllContent();
    
    return {
      ideas: all.filter(c => c.status === 'idea').length,
      drafts: all.filter(c => c.status === 'draft').length,
      reviews: all.filter(c => c.status === 'review').length,
      editing: all.filter(c => c.status === 'edit').length,
      seo: all.filter(c => c.status === 'seo').length,
      published: all.filter(c => c.status === 'published').length
    };
  }

  // Content metrics
  async getMetrics(): Promise<ContentMetrics> {
    const all = await this.getAllContent();
    const pillars = all.reduce((acc, item) => {
      acc[item.pillar] = (acc[item.pillar] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Monthly output
    const monthly = all.reduce((acc, item) => {
      const month = item.date.substring(0, 7); // YYYY-MM
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalPosts: all.length,
      totalWords: all.reduce((sum, c) => sum + c.wordCount, 0),
      avgSeoScore: Math.round(all.reduce((sum, c) => sum + c.seoScore, 0) / all.length) || 0,
      pillarDistribution: pillars as any,
      monthlyOutput: monthly
    };
  }

  // Get content by status
  async getByStatus(status: ContentStatus): Promise<ContentItem[]> {
    const all = await this.getAllContent();
    return all.filter(c => c.status === status);
  }

  // Get content by pillar
  async getByPillar(pillar: ContentPillar): Promise<ContentItem[]> {
    const all = await this.getAllContent();
    return all.filter(c => c.pillar === pillar);
  }

  // Get calendar events
  async getCalendarEvents(month: string): Promise<any[]> {
    const all = await this.getAllContent();
    return all
      .filter(c => c.date.startsWith(month))
      .map(c => ({
        id: c.slug,
        title: c.title,
        date: c.date,
        pillar: c.pillar,
        type: c.type,
        status: c.status,
        priority: c.priority
      }));
  }

  // Create new content
  async createContent(slug: string, frontmatter: ContentFrontmatter, content: string): Promise<void> {
    const fullContent = matter.stringify(content, frontmatter);
    const filePath = path.join(this.contentDir, `${slug}.mdx`);
    fs.writeFileSync(filePath, fullContent);
  }

  // Update content
  async updateContent(slug: string, updates: Partial<ContentFrontmatter>): Promise<void> {
    const filePath = path.join(this.contentDir, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Content not found: ${slug}`);
    }
    
    const existing = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(existing);
    const updated = matter.stringify(content, { ...data, ...updates });
    fs.writeFileSync(filePath, updated);
  }

  // Move content through pipeline
  async moveToStatus(slug: string, status: ContentStatus): Promise<void> {
    await this.updateContent(slug, { status } as any);
  }
}

export const contentManager = new ContentManager();
