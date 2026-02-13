import lunr from 'lunr'

export interface SearchDocument {
  title: string
  content: string
  url: string
  tags?: string[]
}

export const createSearchIndex = (documents: SearchDocument[]) => {
  return lunr(function (this: lunr.Builder) {
    this.ref('url')
    this.field('title')
    this.field('content')

    documents.forEach((doc) => {
      this.add(doc)
    })
  })
}
