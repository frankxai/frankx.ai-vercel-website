import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const blogDirectory = path.join(process.cwd(), 'content/blog')
  const fileNames = fs.readdirSync(blogDirectory)

  return NextResponse.json(fileNames)
}
