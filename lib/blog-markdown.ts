import type { BlogPost } from './blog'

/** The markdown form of a post served to agents by /api/md and the MCP get_article tool. */
export function blogPostToMarkdown(post: BlogPost): string {
  return [
    `# ${post.title}`,
    '',
    `> ${post.description}`,
    '',
    `**Author:** ${post.author}  `,
    `**Date:** ${post.date}  `,
    `**Reading time:** ${post.readingTime}  `,
    `**Category:** ${post.category}  `,
    post.tags?.length ? `**Tags:** ${post.tags.join(', ')}  ` : null,
    '',
    '---',
    '',
    post.content,
  ].filter((line): line is string => line !== null).join('\n')
}
