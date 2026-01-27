import { NextResponse } from 'next/server';
import { readdirSync, readFileSync, existsSync, statSync } from 'fs';
import { join } from 'path';

interface ContentItem {
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
  thumbnailUrl?: string; // 40-50x smaller for previews
  blogUrl?: string;
  createdAt: string;
  bestTime?: string;
  targetAudience?: string;
  engagementHook?: string;
  // Twitter-specific
  tweets?: { text: string; charCount: number; index: number }[];
}

function cleanForPosting(text: string): string {
  return text
    // Remove bold: **text** → text (do this first, before italic)
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    // Remove remaining single asterisks used for italic
    .replace(/\*([^*\n]+)\*/g, '$1')
    // Remove inline code: `code` → code
    .replace(/`([^`]+)`/g, '$1')
    // Remove headers: ## text → text
    .replace(/^#{1,6}\s+/gm, '')
    // Remove horizontal rules
    .replace(/^---+$/gm, '')
    // Clean up excessive newlines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractHashtags(text: string): string[] {
  const matches = text.match(/#[A-Za-z0-9_]+/g);
  return matches || [];
}

function extractCaption(mdContent: string): {
  caption: string;
  captionWithHashtags: string;
  hashtags: string[];
  charCount: number;
} {
  // Normalize line endings (Windows CRLF → Unix LF)
  const normalized = mdContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  let rawCaption = '';

  // Extract the "Post Copy" section from the markdown
  const postCopyMatch = normalized.match(/## Post Copy\s*\n\n([\s\S]*?)(?=\n---|\n##|$)/);
  if (postCopyMatch) {
    rawCaption = postCopyMatch[1].trim();
  } else {
    // Fallback: return everything after the first ---
    const parts = normalized.split('---');
    if (parts.length > 2) {
      rawCaption = parts.slice(2).join('---').trim();
    } else {
      rawCaption = normalized;
    }
  }

  const hashtags = extractHashtags(rawCaption);
  const captionWithHashtags = cleanForPosting(rawCaption);

  // Caption without hashtags (for flexibility)
  const caption = captionWithHashtags.replace(/#[A-Za-z0-9_]+/g, '').replace(/\n\s*\n\s*$/g, '\n').trim();

  return {
    caption,
    captionWithHashtags,
    hashtags,
    charCount: captionWithHashtags.length
  };
}

function extractTweets(mdContent: string): { text: string; charCount: number; index: number }[] | undefined {
  // Normalize line endings
  const normalized = mdContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const threadMatch = normalized.match(/## Thread\s*\n\n([\s\S]*?)(?=\n---|\n##|$)/);
  if (!threadMatch) return undefined;

  const threadContent = threadMatch[1];
  const tweets: { text: string; charCount: number; index: number }[] = [];

  // Parse tweets by **Tweet N:** pattern
  const tweetMatches = threadContent.split(/\*\*Tweet \d+[^:]*:\*\*/).filter(t => t.trim());

  tweetMatches.forEach((tweet, index) => {
    const cleanTweet = tweet.trim();
    if (cleanTweet) {
      tweets.push({
        text: cleanTweet,
        charCount: cleanTweet.length,
        index: index + 1
      });
    }
  });

  return tweets.length > 0 ? tweets : undefined;
}

function extractMetadata(mdContent: string): {
  bestTime?: string;
  targetAudience?: string;
  blogUrl?: string;
  engagementHook?: string;
} {
  // Normalize line endings
  const normalized = mdContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const bestTimeMatch = normalized.match(/\*\*Best time:\*\*\s*(.+)/);
  const audienceMatch = normalized.match(/\*\*Target audience:\*\*\s*(.+)/);
  const hookMatch = normalized.match(/\*\*Engagement (?:hook|strategy):\*\*\s*(.+)/);
  const urlMatch = normalized.match(/https:\/\/www\.frankx\.ai\/blog\/[\w-]+/);

  return {
    bestTime: bestTimeMatch?.[1]?.trim(),
    targetAudience: audienceMatch?.[1]?.trim(),
    engagementHook: hookMatch?.[1]?.trim(),
    blogUrl: urlMatch?.[0],
  };
}

export async function GET() {
  try {
    const socialDir = join(process.cwd(), 'public', 'social');
    const content: ContentItem[] = [];

    // Scan LinkedIn folder
    const linkedinDir = join(socialDir, 'linkedin');
    if (existsSync(linkedinDir)) {
      const files = readdirSync(linkedinDir);
      const mdFiles = files.filter(f => f.endsWith('.md'));

      for (const mdFile of mdFiles) {
        const slug = mdFile.replace('.md', '');
        const mdPath = join(linkedinDir, mdFile);
        const mdContent = readFileSync(mdPath, 'utf-8');
        const stats = statSync(mdPath);

        // Extract title from markdown header
        const titleMatch = mdContent.match(/^#\s+LinkedIn Post:\s*(.+)$/m) ||
                          mdContent.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1].trim() : slug.replace(/-/g, ' ');

        // Check for corresponding image (1x1 format for LinkedIn)
        const imageFile = files.find(f =>
          f.startsWith(slug) &&
          f.includes('-1x1') &&
          (f.endsWith('.png') || f.endsWith('.jpg')) &&
          !f.includes('_thumb')
        ) || files.find(f =>
          f.startsWith(slug) &&
          (f.endsWith('.png') || f.endsWith('.jpg')) &&
          !f.includes('_thumb')
        );

        // Find thumbnail for bandwidth optimization (40-50x smaller)
        const thumbFile = files.find(f =>
          f.startsWith(slug) &&
          f.includes('_thumb') &&
          f.endsWith('.jpeg')
        );

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
          thumbnailUrl: thumbFile ? `/social/linkedin/${thumbFile}` : (imageFile ? `/social/linkedin/${imageFile}` : undefined),
          blogUrl: metadata.blogUrl,
          createdAt: stats.mtime.toISOString(),
          bestTime: metadata.bestTime,
          targetAudience: metadata.targetAudience,
          engagementHook: metadata.engagementHook,
        });
      }
    }

    // Scan Twitter folder
    const twitterDir = join(socialDir, 'twitter');
    if (existsSync(twitterDir)) {
      const files = readdirSync(twitterDir);
      const mdFiles = files.filter(f => f.endsWith('.md'));

      for (const mdFile of mdFiles) {
        const slug = mdFile.replace('.md', '');
        const mdPath = join(twitterDir, mdFile);
        const mdContent = readFileSync(mdPath, 'utf-8');
        const stats = statSync(mdPath);

        const titleMatch = mdContent.match(/^#\s+Twitter\/X Thread:\s*(.+)$/m) ||
                          mdContent.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1].trim() : slug.replace(/-/g, ' ');

        const tweets = extractTweets(mdContent);
        const metadata = extractMetadata(mdContent);

        // Full thread as single string for copying
        const fullThread = tweets?.map(t => t.text).join('\n\n---\n\n') || '';

        // Twitter uses LinkedIn image if available
        const linkedinDir2 = join(socialDir, 'linkedin');
        let imageFile: string | undefined;
        let thumbFile2: string | undefined;
        if (existsSync(linkedinDir2)) {
          const linkedinFiles = readdirSync(linkedinDir2);
          imageFile = linkedinFiles.find(f =>
            f.startsWith(slug) &&
            f.includes('-1x1') &&
            (f.endsWith('.png') || f.endsWith('.jpg')) &&
            !f.includes('_thumb')
          );
          thumbFile2 = linkedinFiles.find(f =>
            f.startsWith(slug) &&
            f.includes('_thumb') &&
            f.endsWith('.jpeg')
          );
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
          thumbnailUrl: thumbFile2 ? `/social/linkedin/${thumbFile2}` : (imageFile ? `/social/linkedin/${imageFile}` : undefined),
          blogUrl: metadata.blogUrl,
          createdAt: stats.mtime.toISOString(),
          bestTime: metadata.bestTime,
          targetAudience: metadata.targetAudience,
          engagementHook: metadata.engagementHook,
          tweets,
        });
      }
    }

    // Sort by creation date (newest first)
    content.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Failed to load content:', error);
    return NextResponse.json({ content: [], error: String(error) });
  }
}
