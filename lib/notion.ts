import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export const getDatabase = async (databaseId: string) => {
  const response = await (notion.databases as any).query({
    database_id: databaseId,
  })
  return response.results
}
