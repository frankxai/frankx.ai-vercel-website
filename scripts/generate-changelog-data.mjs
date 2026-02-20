#!/usr/bin/env node
/**
 * Changelog Data Generator
 * Auto-generates weekly changelog summaries from git commits
 */

import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
import { fileURLToPath } from 'url'

const execPromise = promisify(exec)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT = path.join(__dirname, '..')
const OUTPUT_FILE = path.join(ROOT, 'data/changelog-data.json')

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
}

function getWeekRange(year, week) {
  const jan4 = new Date(year, 0, 4)
  const firstMonday = new Date(jan4)
  firstMonday.setDate(jan4.getDate() - (jan4.getDay() || 7) + 1)
  const weekStart = new Date(firstMonday)
  weekStart.setDate(firstMonday.getDate() + (week - 1) * 7)
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 6)

  const formatDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return `${formatDate(weekStart)}-${formatDate(weekEnd)}, ${year}`
}

async function getCommitsByWeek() {
  try {
    const { stdout } = await execPromise(`git log --all --pretty=format:"%H|%at|%s|%b" --numstat --since="12 weeks ago"`, { cwd: ROOT })

    const weeklyData = {}
    const lines = stdout.split('\n')
    let currentCommit = null
    let filesChanged = 0
    let linesAdded = 0

    for (const line of lines) {
      if (line.includes('|')) {
        const [hash, timestamp, subject, body] = line.split('|')

        if (currentCommit) {
          const commitData = {
            hash: currentCommit.hash.slice(0, 7),
            subject: currentCommit.subject,
            body: currentCommit.body,
            files: filesChanged,
            linesAdded,
          }

          if (!weeklyData[currentCommit.weekKey]) {
            weeklyData[currentCommit.weekKey] = {
              commits: [],
              totalFiles: 0,
              totalLines: 0,
              year: currentCommit.year,
              week: currentCommit.week,
            }
          }

          weeklyData[currentCommit.weekKey].commits.push(commitData)
          weeklyData[currentCommit.weekKey].totalFiles += filesChanged
          weeklyData[currentCommit.weekKey].totalLines += linesAdded
        }

        const date = new Date(parseInt(timestamp) * 1000)
        const year = date.getFullYear()
        const week = getWeekNumber(date)
        const weekKey = `${year}-W${String(week).padStart(2, '0')}`

        currentCommit = {
          hash,
          subject: subject.trim(),
          body: (body || '').trim(),
          weekKey,
          year,
          week,
        }
        filesChanged = 0
        linesAdded = 0
      } else if (line.match(/^(\d+)\s+(\d+)\s+/)) {
        const match = line.match(/^(\d+)\s+(\d+)\s+/)
        filesChanged++
        linesAdded += parseInt(match[1]) || 0
      }
    }

    return weeklyData
  } catch (error) {
    console.error('Error fetching git history:', error.message)
    return {}
  }
}

function categorizeCommit(subject) {
  const s = subject.toLowerCase()

  if (s.match(/^(feat|feature):/)) return 'shipped'
  if (s.match(/^fix:/)) return 'fixed'
  if (s.match(/^(refactor|perf|style):/)) return 'improved'
  if (s.match(/deploy|production/)) return 'shipped'
  if (s.match(/acos|intelligence|learning/)) return 'shipped'

  return 'improved'
}

function determineImpact(commit) {
  if (commit.files > 20 || commit.linesAdded > 500) return 'major'
  if (commit.files > 5 || commit.linesAdded > 100) return 'medium'
  return 'small'
}

function generateWeeklySummary(weekData) {
  const { commits, totalFiles, totalLines } = weekData

  const categories = {
    shipped: [],
    improved: [],
    fixed: [],
  }

  commits.forEach(commit => {
    const category = categorizeCommit(commit.subject)
    categories[category].push(commit)
  })

  // Generate summary
  const summaryParts = []
  if (categories.shipped.length > 0) summaryParts.push(`${categories.shipped.length} features shipped`)
  if (categories.improved.length > 0) summaryParts.push(`${categories.improved.length} improvements`)
  if (categories.fixed.length > 0) summaryParts.push(`${categories.fixed.length} fixes`)

  return summaryParts.join(', ') || 'Maintenance and updates'
}

async function generateChangelogData() {
  console.log('Generating changelog data...')

  const weeklyCommits = await getCommitsByWeek()

  const weeks = Object.entries(weeklyCommits)
    .sort((a, b) => b[0].localeCompare(a[0])) // Newest first
    .slice(0, 12) // Last 12 weeks
    .map(([weekKey, data]) => {
      const { year, week, commits, totalFiles, totalLines } = data

      const entries = commits
        .filter(c => c.files > 0) // Only commits with file changes
        .slice(0, 10) // Top 10 commits per week
        .map(commit => ({
          id: `cl-${weekKey}-${commit.hash}`,
          date: weekKey,
          type: categorizeCommit(commit.subject),
          title: commit.subject,
          description: commit.body || commit.subject,
          tags: extractTags(commit.subject),
          commit: commit.hash,
          impact: determineImpact(commit),
          metadata: {
            files: commit.files,
            lines: commit.linesAdded,
          },
        }))

      return {
        id: weekKey,
        label: `Week ${week}`,
        dateRange: getWeekRange(year, week),
        summary: generateWeeklySummary(data),
        stats: {
          commits: commits.length,
          linesAdded: totalLines,
          filesChanged: totalFiles,
          newPages: entries.filter(e => e.title.match(/page|route/i)).length,
          imagesGenerated: entries.filter(e => e.title.match(/image|visual|design/i)).length,
        },
        entries,
      }
    })

  const output = {
    generated: new Date().toISOString(),
    weeks,
  }

  // Ensure directory exists
  if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true })
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf8')

  console.log(`✅ Generated changelog for ${weeks.length} weeks`)
  console.log(`📝 Output: ${OUTPUT_FILE}`)
}

function extractTags(message) {
  const tags = []
  const keywords = ['acos', 'deploy', 'build', 'intelligence', 'feed', 'ui', 'api', 'newsletter']
  keywords.forEach(keyword => {
    if (message.toLowerCase().includes(keyword)) tags.push(keyword)
  })
  return tags.slice(0, 3)
}

// Run
generateChangelogData().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
