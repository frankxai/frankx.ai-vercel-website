import { NextResponse } from 'next/server'
import { getDatabase } from '@/lib/notion'

export async function GET() {
  const databaseId = process.env.NOTION_DATABASE_ID
  if (!databaseId) {
    return new Response('Notion database ID not configured', { status: 500 })
  }
  const database = await getDatabase(databaseId)

  const articles = database.map((page: any) => {
    return {
      title: page.properties.Title.title[0].plain_text,
      status: page.properties.Status.select.name,
      date: page.properties.Date.date.start,
      pillar: page.properties.Pillar.select.name,
    }
  })

  return NextResponse.json(articles)
}
