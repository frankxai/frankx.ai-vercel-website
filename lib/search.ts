import lunr from 'lunr'

export interface SearchDocument {
  title: string
  content: string
  url: string
}

export const createSearchIndex = (documents: SearchDocument[]) => {
  return lunr(function () {
    this.ref('url')
    this.field('title')
    this.field('content')

    documents.forEach((doc) => {
      this.add(doc)
    })
  })
}
