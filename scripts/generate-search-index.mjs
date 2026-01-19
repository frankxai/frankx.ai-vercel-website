import fs from 'fs'
import path from 'path'
import { createSearchIndex } from '../lib/search.js'

const contentDir = path.join(process.cwd(), 'content')
const publicDir = path.join(process.cwd(), 'public')

const getAllFiles = (dirPath, arrayOfFiles = []) => {
  const files = fs.readdirSync(dirPath)

  files.forEach((file) => {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file))
    }
  })

  return arrayOfFiles
}

const main = async () => {
  const allFiles = getAllFiles(contentDir)

  const documents = allFiles.map((file) => {
    const content = fs.readFileSync(file, 'utf8')
    const url = file.replace(contentDir, '').replace('.mdx', '').replace('.md', '')
    const title = content.match(/^# (.*)/)?.[1] || ''

    return {
      title,
      content,
      url,
    }
  })

  const searchIndex = createSearchIndex(documents)

  fs.writeFileSync(
    path.join(publicDir, 'search-index.json'),
    JSON.stringify(searchIndex)
  )

  fs.writeFileSync(
    path.join(publicDir, 'documents.json'),
    JSON.stringify(documents)
  )
}

main()
