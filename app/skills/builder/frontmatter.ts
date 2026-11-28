export function skillFrontmatter(name: string, description: string, category: string, date: string) {
  return [
    '---',
    `name: ${JSON.stringify(name)}`,
    `description: ${JSON.stringify(description)}`,
    `category: ${category}`,
    'version: 1.0.0',
    `last_updated: ${date}`,
    '---',
  ].join('\n')
}
