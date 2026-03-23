export interface VisionBoardContext {
  generatedAt: string
  site: {
    totalRoutes: number
    topSections: Array<{
      segment: string
      count: number
    }>
    signatureRoutes: string[]
  }
  products: {
    count: number
    names: string[]
    categories: string[]
  }
  content: {
    blogCount: number
    featuredArticles: string[]
    musicPublishedCount: number
    musicEstimatedCount: number
    playlistNames: string[]
    profileCount: number
  }
  strategy: {
    vision: string
    pillars: string[]
    milestones: string[]
    rituals: string[]
    signals: string[]
    nextActions: string[]
    agents: string[]
  }
  engineering: {
    docsCount: number
    docsHighlights: string[]
    dataFilesCount: number
    scriptsCount: number
    componentsCount: number
  }
}
