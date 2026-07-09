// Shared markdown -> ContentItem parsing, extracted from app/api/content-studio/content/route.ts
// so app/api/content-studio/distribute/route.ts can re-derive one item without duplicating the
// caption/hashtag/tweet extraction logic. Behavior is unchanged from the original inline version.
import { readdirSync, readFileSync, existsSync, statSync } from 'fs';
import { join } from 'path';

export interface Tweet {
  text: string;
  charCount: number;
  index: number;
}

export interface ContentItem {
  id: string;
  title: string;
  platform: 'linkedin' | 'twitter' | 'instagram' | 'youtube';
  status: 'draft' | 'scheduled' | 'published';
  caption: string; // The actual post text (clean, no markdown)
  captionWithHashtags: string; // Full post ready to paste
  hashtags: string[]; // Extracted hashtags
  charCount: number;
  imagePath?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  blogUrl?: string;
  createdAt: string;
  bestTime?: string;
  targetAudience?: string;
  engagementHook?: string;
  tweets?: Tweet[];
}

export function cleanForPosting(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function extractHashtags(text: string): string[] {
  const matches = text.match(/#[A-Za-z0-9_]+/g);
  return matches || [];
}

export function extractCaption(mdContent: string): {
  caption: string;
  captionWithHashtags: string;
  hashtags: string[];
  charCount: number;
} {
  let rawCaption = '';

  const postCopyMatch = mdContent.match(/## Post Copy\s*\n\n([\s\S]*?)(?=\n---|\n##|$)/);
  if (postCopyMatch) {
    rawCaption = postCopyMatch[1].trim();
  } else {
    const parts = mdContent.split('---');
    if (parts.length > 2) {
      rawCaption = parts.slice(2).join('---').trim();
    } else {
      rawCaption = mdContent;
    }
  }

  const hashtags = extractHashtags(rawCaption);
  const captionWithHashtags = cleanForPosting(rawCaption);
  const caption = captionWithHashtags.replace(/#[A-Za-z0-9_]+/g, '').replace(/\n\s*\n\s*$/g, '\n').trim();

  return { caption, captionWithHashtags, hashtags, charCount: captionWithHashtags.length };
}

export function extractTweets(mdContent: string): Tweet[] | undefined {
  const threadMatch = mdContent.match(/## Thread\s*\n\n([\s\S]*?)(?=\n---|\n##|$)/);
  if (!threadMatch) return undefined;

  const threadContent = threadMatch[1];
  const tweets: Tweet[] = [];
  const tweetMatches = threadContent.split(/\*\*Tweet \d+[^:]*:\*\*/).filter((t) => t.trim());

  tweetMatches.forEach((tweet, index) => {
    const cleanTweet = tweet.trim();
    if (cleanTweet) {
      tweets.push({ text: cleanTweet, charCount: cleanTweet.length, index: index + 1 });
    }
  });

  return tweets.length > 0 ? tweets : undefined;
}

export function extractMetadata(mdContent: string): {
  bestTime?: string;
  targetAudience?: string;
  blogUrl?: string;
  engagementHook?: string;
} {
  const bestTimeMatch = mdContent.match(/\*\*Best time:\*\*\s*(.+)/);
  const audienceMatch = mdContent.match(/\*\*Target audience:\*\*\s*(.+)/);
  const hookMatch = mdContent.match(/\*\*Engagement (?:hook|strategy):\*\*\s*(.+)/);
  const urlMatch = mdContent.match(/https:\/\/www\.frankx\.ai\/blog\/[\w-]+/);

  return {
    bestTime: bestTimeMatch?.[1]?.trim(),
    targetAudience: audienceMatch?.[1]?.trim(),
    engagementHook: hookMatch?.[1]?.trim(),
    blogUrl: urlMatch?.[0],
  };
}

/** List every content item across the linkedin/ and twitter/ social folders (source of truth). */
export function listAllContent(): ContentItem[] {
  const socialDir = join(process.cwd(), 'public', 'social');
  const content: ContentItem[] = [];

  const linkedinDir = join(socialDir, 'linkedin');
  if (existsSync(linkedinDir)) {
    const files = readdirSync(linkedinDir);
    const mdFiles = files.filter((f) => f.endsWith('.md'));

    for (const mdFile of mdFiles) {
      const slug = mdFile.replace('.md', '');
      const mdPath = join(linkedinDir, mdFile);
      const mdContent = readFileSync(mdPath, 'utf-8');
      const stats = statSync(mdPath);

      const titleMatch = mdContent.match(/^#\s+LinkedIn Post:\s*(.+)$/m) || mdContent.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1].trim() : slug.replace(/-/g, ' ');

      const imageFile =
        files.find((f) => f.startsWith(slug) && f.includes('-1x1') && (f.endsWith('.png') || f.endsWith('.jpg')) && !f.includes('_thumb')) ||
        files.find((f) => f.startsWith(slug) && (f.endsWith('.png') || f.endsWith('.jpg')) && !f.includes('_thumb'));

      const thumbFile = files.find((f) => f.startsWith(slug) && f.includes('_thumb') && f.endsWith('.jpeg'));

      const captionData = extractCaption(mdContent);
      const metadata = extractMetadata(mdContent);

      content.push({
        id: `linkedin-${slug}`,
        title,
        platform: 'linkedin',
        status: 'draft',
        caption: captionData.caption,
        captionWithHashtags: captionData.captionWithHashtags,
        hashtags: captionData.hashtags,
        charCount: captionData.charCount,
        imagePath: imageFile ? `/social/linkedin/${imageFile}` : undefined,
        imageUrl: imageFile ? `/social/linkedin/${imageFile}` : undefined,
        thumbnailUrl: thumbFile ? `/social/linkedin/${thumbFile}` : imageFile ? `/social/linkedin/${imageFile}` : undefined,
        blogUrl: metadata.blogUrl,
        createdAt: stats.mtime.toISOString(),
        bestTime: metadata.bestTime,
        targetAudience: metadata.targetAudience,
        engagementHook: metadata.engagementHook,
      });
    }
  }

  const twitterDir = join(socialDir, 'twitter');
  if (existsSync(twitterDir)) {
    const files = readdirSync(twitterDir);
    const mdFiles = files.filter((f) => f.endsWith('.md'));

    for (const mdFile of mdFiles) {
      const slug = mdFile.replace('.md', '');
      const mdPath = join(twitterDir, mdFile);
      const mdContent = readFileSync(mdPath, 'utf-8');
      const stats = statSync(mdPath);

      const titleMatch = mdContent.match(/^#\s+Twitter\/X Thread:\s*(.+)$/m) || mdContent.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1].trim() : slug.replace(/-/g, ' ');

      const tweets = extractTweets(mdContent);
      const metadata = extractMetadata(mdContent);
      const fullThread = tweets?.map((t) => t.text).join('\n\n---\n\n') || '';

      const linkedinDir2 = join(socialDir, 'linkedin');
      let imageFile: string | undefined;
      let thumbFile2: string | undefined;
      if (existsSync(linkedinDir2)) {
        const linkedinFiles = readdirSync(linkedinDir2);
        imageFile = linkedinFiles.find((f) => f.startsWith(slug) && f.includes('-1x1') && (f.endsWith('.png') || f.endsWith('.jpg')) && !f.includes('_thumb'));
        thumbFile2 = linkedinFiles.find((f) => f.startsWith(slug) && f.includes('_thumb') && f.endsWith('.jpeg'));
      }

      content.push({
        id: `twitter-${slug}`,
        title,
        platform: 'twitter',
        status: 'draft',
        caption: fullThread,
        captionWithHashtags: fullThread,
        hashtags: [],
        charCount: fullThread.length,
        imagePath: imageFile ? `/social/linkedin/${imageFile}` : undefined,
        imageUrl: imageFile ? `/social/linkedin/${imageFile}` : undefined,
        thumbnailUrl: thumbFile2 ? `/social/linkedin/${thumbFile2}` : imageFile ? `/social/linkedin/${imageFile}` : undefined,
        blogUrl: metadata.blogUrl,
        createdAt: stats.mtime.toISOString(),
        bestTime: metadata.bestTime,
        targetAudience: metadata.targetAudience,
        engagementHook: metadata.engagementHook,
        tweets,
      });
    }
  }

  content.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return content;
}

/** Find one item by its `platform-slug` id (as produced by listAllContent). */
export function findContentById(id: string): ContentItem | undefined {
  return listAllContent().find((item) => item.id === id);
}
