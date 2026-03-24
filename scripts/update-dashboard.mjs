import fs from 'fs'
import path from 'path'

const contentDashboardPath = path.join(process.cwd(), 'content-dashboard.html')
const blogDirectory = path.join(process.cwd(), 'content/blog')

const main = async () => {
  const files = fs.readdirSync(blogDirectory)

  const articles = await Promise.all(files.map(async (file) => {
    const fullPath = path.join(blogDirectory, file)
    const content = fs.readFileSync(fullPath, 'utf8')
    const date = content.match(/date: "(.*?)"/)?.[1] || ''
    return { file, date }
  }))

  let contentDashboard = fs.readFileSync(contentDashboardPath, 'utf8')

  const articleProductionRegex = /<div id="article-production" class="mt-6">[\s\S]*?<\/div>/
  const newArticleProduction = `
    <div id="article-production" class="mt-6">
      <div id="calendar"></div>
    </div>
  `;
  contentDashboard = contentDashboard.replace(articleProductionRegex, newArticleProduction);

  const interlinkingRegex = /<div id="interlinking" class="mt-6">[\s\S]*?<\/div>/
  let graph = 'graph TD;\n';
  for (const file of files) {
    const fullPath = path.join(blogDirectory, file)
    const content = fs.readFileSync(fullPath, 'utf8')
    const links = content.match(/\((.*?)\)/g) || [];
    for (const link of links) {
      if (link.includes('/blog/')) {
        const to = link.substring(link.lastIndexOf('/') + 1, link.length - 1);
        graph += `  ${file.replace('.mdx', '')} --> ${to.replace('.mdx', '')};
`;
      }
    }
  }
  const newInterlinking = `
    <div id="interlinking" class="mt-6">
      <div class="mermaid">${graph}</div>
    </div>
  `;
  contentDashboard = contentDashboard.replace(interlinkingRegex, newInterlinking);

  fs.writeFileSync(contentDashboardPath, contentDashboard);
}

main()
