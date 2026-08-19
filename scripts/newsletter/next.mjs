#!/usr/bin/env node
/**
 * Prints the next issue's identity as JSON. The drafting workflow calls this
 * instead of assuming a number — an unattended run that guesses wrong
 * overwrites a shipped issue.
 */

import { nextIssueNumber, nextFridayISO, readAllIssues } from './lib.mjs'

const issue = nextIssueNumber()
const { date, sendAt } = nextFridayISO()
const recent = readAllIssues()
  .slice(-4)
  .map((i) => ({ issue: i.data.issue, subject: i.data.subject, theme: i.data.theme }))

console.log(JSON.stringify({ issue, date, sendAt, path: `content/newsletters/issues/issue-${issue}.mdx`, recent }, null, 2))
