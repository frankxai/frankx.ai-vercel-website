import { NextResponse } from 'next/server';
import { readdirSync, readFileSync, existsSync, statSync } from 'fs';
import { join } from 'path';

interface ContentItem {
  id: string;
  title: string;
  platform: 'linkedin' | 'twitter' | 'instagram' | 'youtube';
  status: 'draft' | 'scheduled' | 'published';
  caption: string; // The actual post text
  imagePath?: string;
  imageUrl?: string;
  blogUrl?: string;
  createdAt: string;
  bestTime?: string;
  targetAudience?: string;
}

function extractCaption(mdContent: string): string {
  // Extract the "Post Copy" section from the markdown
  const postCopyMatch = mdContent.match(/## Post Copy\s*\n\n([\s\S]*?)(?=\n---|\n##|$)/);
  if (postCopyMatch) {
    return postCopyMatch[1].trim();
  }

  // For Twitter threads, extract all tweets
  const threadMatch = mdContent.match(/## Thread\s*\n\n([\s\S]*?)(?=\n---|\n##|$)/);
  if (threadMatch) {
    return threadMatch[1].trim();
  }

  // Fallback: return everything after the first ---
  const parts = mdContent.split('---');
  if (parts.length > 2) {
    return parts.slice(2).join('---').trim();
  }

  return mdContent;
}

function extractMetadata(mdContent: string): { bestTime?: string; targetAudience?: string; blogUrl?: string } {
  const bestTimeMatch = mdContent.match(/\*\*Best time:\*\*\s*(.+)/);
  const audienceMatch = mdContent.match(/\*\*Target audience:\*\*\s*(.+)/);
  const urlMatch = mdContent.match(/https:\/\/www\.frankx\.ai\/blog\/[\w-]+/);

  return {
    bestTime: bestTimeMatch?.[1]?.trim(),
    targetAudience: audienceMatch?.[1]?.trim(),
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
          (f.endsWith('.png') || f.endsWith('.jpg'))
        ) || files.find(f =>
          f.startsWith(slug) &&
          (f.endsWith('.png') || f.endsWith('.jpg')) &&
          !f.includes('_thumb')
        );

        const caption = extractCaption(mdContent);
        const metadata = extractMetadata(mdContent);

        content.push({
          id: `linkedin-${slug}`,
          title,
          platform: 'linkedin',
          status: 'draft',
          caption,
          imagePath: imageFile ? `/social/linkedin/${imageFile}` : undefined,
          imageUrl: imageFile ? `/social/linkedin/${imageFile}` : undefined,
          blogUrl: metadata.blogUrl,
          createdAt: stats.mtime.toISOString(),
          bestTime: metadata.bestTime,
          targetAudience: metadata.targetAudience,
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

        const caption = extractCaption(mdContent);
        const metadata = extractMetadata(mdContent);

        // Twitter uses LinkedIn image if available
        const linkedinDir2 = join(socialDir, 'linkedin');
        let imageFile: string | undefined;
        if (existsSync(linkedinDir2)) {
          const linkedinFiles = readdirSync(linkedinDir2);
          imageFile = linkedinFiles.find(f =>
            f.startsWith(slug) &&
            f.includes('-1x1') &&
            (f.endsWith('.png') || f.endsWith('.jpg'))
          );
        }

        content.push({
          id: `twitter-${slug}`,
          title,
          platform: 'twitter',
          status: 'draft',
          caption,
          imagePath: imageFile ? `/social/linkedin/${imageFile}` : undefined,
          imageUrl: imageFile ? `/social/linkedin/${imageFile}` : undefined,
          blogUrl: metadata.blogUrl,
          createdAt: stats.mtime.toISOString(),
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
