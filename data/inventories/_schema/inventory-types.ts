/**
 * FrankX Content Inventory Type Definitions
 *
 * Unified schema for tracking all content across three brands:
 * - FrankX (personal brand)
 * - AI Architect Academy (educational)
 * - Arcanea (creative gaming universe)
 */

// ============================================
// CORE TYPES
// ============================================

export type Brand = 'frankx' | 'ai-architect-academy' | 'arcanea';

export type ContentStatus =
  | 'draft'      // Work in progress
  | 'published'  // Live and public
  | 'archived'   // No longer promoted but accessible
  | 'private'    // Internal only
  | 'active'     // Currently active (for implementations)
  | 'planned';   // Planned for future

export type Platform =
  | 'suno'
  | 'youtube'
  | 'linkedin'
  | 'instagram'
  | 'x-twitter'
  | 'threads'
  | 'tiktok'
  | 'spotify'
  | 'website'
  | 'gumroad'
  | 'github'
  | 'other';

// ============================================
// BASE CONTENT ITEM
// ============================================

export interface BaseContentItem {
  id: string;                    // Unique identifier (slug or UUID)
  title: string;                 // Display title
  description?: string;          // Brief summary
  brand: Brand;                  // Which brand owns this
  status: ContentStatus;
  tags: string[];                // Categorization tags
  createdAt: string;             // ISO date string
  updatedAt?: string;            // Last modified
  url?: string;                  // Primary URL (external)
  localPath?: string;            // Local file path if applicable
  thumbnail?: string;            // Cover image URL
  metadata?: Record<string, unknown>; // Flexible additional data
}

// ============================================
// MUSIC / SUNO TRACKS
// ============================================

export interface MusicTrack extends BaseContentItem {
  type: 'music';
  platform: 'suno' | 'spotify' | 'youtube' | 'other';
  sunoId?: string;               // Suno's unique ID (from URL)
  sunoUrl?: string;              // Full Suno URL
  duration?: string;             // e.g., "3:42"
  genre: string[];               // e.g., ["cinematic", "ambient"]
  mood: string[];                // e.g., ["uplifting", "meditative"]
  bpm?: number;                  // Beats per minute
  key?: string;                  // Musical key (e.g., "C minor")
  lyrics?: string;               // Full lyrics if applicable
  promptUsed?: string;           // The Suno prompt that generated it
  vibeOsSession?: boolean;       // Part of Vibe OS methodology
  usageRights: 'personal' | 'commercial' | 'exclusive';
  streamCount?: number;          // If tracked
  downloads?: number;
}

// ============================================
// VISUAL ART
// ============================================

export interface ArtPiece extends BaseContentItem {
  type: 'art';
  platform: 'midjourney' | 'dalle' | 'stable-diffusion' | 'manual' | 'other';
  medium: 'digital' | 'photo' | 'illustration' | 'mixed';
  dimensions?: { width: number; height: number };
  promptUsed?: string;           // AI generation prompt
  style: string[];               // e.g., ["cyberpunk", "portrait"]
  usedIn?: string[];             // Where this art appears (blog posts, products)
  highResPath?: string;          // Path to high-resolution version
  licensable: boolean;           // Available for licensing
}

// ============================================
// VIDEO CONTENT
// ============================================

export interface VideoContent extends BaseContentItem {
  type: 'video';
  platform: Platform;
  youtubeId?: string;
  duration: string;              // e.g., "12:34"
  category: 'tutorial' | 'vlog' | 'course' | 'promo' | 'music-video' | 'other';
  chapters?: { time: string; title: string }[];
  transcript?: string;           // Full transcript or path to file
  views?: number;
  likes?: number;
  relatedProducts?: string[];    // Product IDs this video promotes
}

// ============================================
// BLOG ARTICLES
// ============================================

export interface BlogArticle extends BaseContentItem {
  type: 'blog';
  slug: string;                  // URL slug
  filePath: string;              // Path to .mdx file
  wordCount: number;
  readingTime: string;           // e.g., "5 min read"
  category: string;
  series?: string;               // Part of a series (e.g., "Golden Age")
  seriesOrder?: number;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  pageViews?: number;
  relatedArticles?: string[];    // Other article IDs
}

// ============================================
// SOCIAL MEDIA POSTS
// ============================================

export interface SocialPost extends BaseContentItem {
  type: 'social';
  platform: Platform;
  postType: 'text' | 'image' | 'video' | 'carousel' | 'story' | 'reel' | 'thread';
  content: string;               // The actual post text
  mediaUrls?: string[];          // Attached media
  engagement?: {
    likes?: number;
    comments?: number;
    shares?: number;
    saves?: number;
    impressions?: number;
  };
  hashtags?: string[];
  mentions?: string[];
  linkedContent?: string[];      // IDs of content this post promotes
  scheduledFor?: string;         // If scheduled for future
  bestPerforming?: boolean;      // Mark top performers
}

// ============================================
// PRODUCTS & COURSES
// ============================================

export interface Product extends BaseContentItem {
  type: 'product';
  category: string;
  pricing: {
    amount: number;
    currency: 'USD' | 'EUR' | 'GBP';
    type: 'one-time' | 'subscription' | 'free';
  };
  salesPlatform: 'gumroad' | 'whop' | 'website' | 'other';
  salesUrl: string;
  modules?: { title: string; description: string }[];
  totalSales?: number;
  revenue?: number;
  conversionRate?: number;
  relatedContent?: string[];     // Blog posts, videos about this product
}

// ============================================
// SOCIAL PROFILES
// ============================================

export interface SocialProfile {
  platform: Platform;
  username: string;
  displayName: string;
  url: string;
  followers?: number;
  verified: boolean;
  brand: Brand;
  primary: boolean;              // Primary account for this brand
  bio?: string;
  lastUpdated: string;
}

// ============================================
// ARCANEA-SPECIFIC TYPES
// ============================================

export interface ArcaneaLore extends BaseContentItem {
  type: 'lore';
  category: 'character' | 'location' | 'faction' | 'artifact' | 'event' | 'magic-system';
  canonLevel: 'core' | 'expanded' | 'non-canon';
  relatedLore?: string[];        // IDs of related lore entries
  timeline?: string;             // When in the Arcanea timeline
  firstAppearance?: string;      // Where this lore was introduced
}

export interface ArcaneaImplementation extends BaseContentItem {
  type: 'implementation';
  repoUrl: string;
  techStack: string[];
  implementationType: 'game' | 'app' | 'website' | 'api' | 'tool';
  status: 'active' | 'archived' | 'planned';
  contributors?: string[];
  stars?: number;
  forks?: number;
}

// ============================================
// INVENTORY COLLECTIONS
// ============================================

export interface BrandInventory {
  brand: Brand;
  lastUpdated: string;
  music: MusicTrack[];
  art: ArtPiece[];
  videos: VideoContent[];
  blog: BlogArticle[];
  social: {
    linkedin: SocialPost[];
    instagram: SocialPost[];
    twitter: SocialPost[];
    threads: SocialPost[];
    tiktok: SocialPost[];
  };
  products: Product[];
}

export interface FrankXInventory extends BrandInventory {
  brand: 'frankx';
}

export interface AIArchitectAcademyInventory extends BrandInventory {
  brand: 'ai-architect-academy';
  courses: Product[];
  tutorials: VideoContent[];
}

export interface ArcaneaInventory extends BrandInventory {
  brand: 'arcanea';
  lore: ArcaneaLore[];
  implementations: ArcaneaImplementation[];
}

// ============================================
// MASTER INVENTORY
// ============================================

export interface ContentInventory {
  version: string;
  lastUpdated: string;
  brands: {
    frankx: FrankXInventory;
    'ai-architect-academy': AIArchitectAcademyInventory;
    arcanea: ArcaneaInventory;
  };
  profiles: SocialProfile[];
  stats: {
    totalMusic: number;
    totalArt: number;
    totalVideos: number;
    totalBlogPosts: number;
    totalSocialPosts: number;
    totalProducts: number;
  };
}

// ============================================
// UTILITY TYPES
// ============================================

export type AnyContentItem =
  | MusicTrack
  | ArtPiece
  | VideoContent
  | BlogArticle
  | SocialPost
  | Product
  | ArcaneaLore
  | ArcaneaImplementation;

export type ContentType = AnyContentItem['type'];

// Helper to create a new content item with defaults
export function createContentItem<T extends BaseContentItem>(
  partial: Partial<T> & Pick<T, 'id' | 'title' | 'brand'>
): T {
  return {
    status: 'draft',
    tags: [],
    createdAt: new Date().toISOString(),
    ...partial,
  } as T;
}
