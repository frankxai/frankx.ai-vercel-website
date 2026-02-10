// Content Management Types

export type ContentStatus = 
  | 'idea' 
  | 'draft' 
  | 'review' 
  | 'edit' 
  | 'seo' 
  | 'published';

export type ContentPillar = 
  | 'Agentic Creator Mastery'
  | 'Conscious AI & Soul Frequency'
  | 'Music & Sound as Consciousness Technology'
  | 'Creator Productivity Systems'
  | 'AI for Families & Professionals';

export type ContentType = 
  | 'pillar-article'
  | 'tutorial'
  | 'framework'
  | 'news'
  | 'case-study'
  | 'interview';

export interface ContentFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  featured?: boolean;
  image?: string;
  readingGoal?: string;
  seoScore?: number;
  wordCount?: number;
  readingTime?: string;
}

export interface ContentMetadata {
  slug: string;
  pillar: ContentPillar;
  status: ContentStatus;
  type: ContentType;
  scheduledDate?: string;
  publishedDate?: string;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  seoScore: number;
  wordCount: number;
}

export interface ContentItem extends Omit<ContentFrontmatter, 'seoScore' | 'wordCount'>, ContentMetadata {
  content: string;
  lastModified: string;
}

export interface ContentCalendarEvent {
  id: string;
  title: string;
  date: string;
  pillar: ContentPillar;
  type: ContentType;
  status: ContentStatus;
  priority: ContentPillar extends string ? string : never;
}

export interface PipelineStats {
  ideas: number;
  drafts: number;
  reviews: number;
  editing: number;
  seo: number;
  published: number;
}

export interface ContentMetrics {
  totalPosts: number;
  totalWords: number;
  avgSeoScore: number;
  pillarDistribution: Record<ContentPillar, number>;
  monthlyOutput: Record<string, number>;
}
