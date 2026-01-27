import { NextResponse } from 'next/server';
import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface ContentItem {
  id: string;
  title: string;
  platform: 'linkedin' | 'twitter' | 'instagram' | 'youtube';
  status: 'draft' | 'scheduled' | 'published';
  scheduledFor?: string;
  imagePath?: string;
  captionPath?: string;
  createdAt: string;
  blogSlug?: string;
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

        // Extract title from first line
        const titleMatch = mdContent.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : slug;

        // Check for corresponding image
        const imagePath = files.find(f => f.startsWith(slug) && (f.endsWith('.png') || f.endsWith('.jpg')));

        content.push({
          id: `linkedin-${slug}`,
          title,
          platform: 'linkedin',
          status: 'draft',
          imagePath: imagePath ? `/social/linkedin/${imagePath}` : undefined,
          captionPath: `/social/linkedin/${mdFile}`,
          createdAt: new Date().toISOString(),
          blogSlug: slug,
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

        const titleMatch = mdContent.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : slug;

        content.push({
          id: `twitter-${slug}`,
          title,
          platform: 'twitter',
          status: 'draft',
          captionPath: `/social/twitter/${mdFile}`,
          createdAt: new Date().toISOString(),
          blogSlug: slug,
        });
      }
    }

    // Check staging folder for pending content
    const stagingDir = join(socialDir, '_staging');
    if (existsSync(stagingDir)) {
      const stagingFolders = readdirSync(stagingDir);
      for (const folder of stagingFolders) {
        const folderPath = join(stagingDir, folder);
        if (existsSync(join(folderPath))) {
          content.push({
            id: `staging-${folder}`,
            title: `Pending: ${folder.replace(/-/g, ' ')}`,
            platform: 'linkedin', // Default
            status: 'draft',
            createdAt: new Date().toISOString(),
            blogSlug: folder,
          });
        }
      }
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Failed to load content:', error);
    return NextResponse.json({ content: [] });
  }
}
