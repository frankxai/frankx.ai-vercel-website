function argument(name) {
  const index = process.argv.indexOf(name)
  const value = index === -1 ? null : process.argv[index + 1]
  if (!value || value.startsWith("--")) throw new Error(`${name} requires a value`)
  return value
}

const state = argument("--state")
const sha = argument("--sha")
const rawDescription = argument("--description")
if (!["error", "failure", "pending", "success"].includes(state)) throw new Error("status state is invalid")
if (!/^[0-9a-f]{40}$/u.test(sha)) throw new Error("status SHA is invalid")
if (!process.env.GITHUB_REPOSITORY || !process.env.GITHUB_TOKEN || !process.env.GITHUB_RUN_ID) {
  throw new Error("required GitHub Actions environment is unavailable")
}

const description = rawDescription.replace(/[\r\n]+/gu, " ").slice(0, 140)
const targetUrl = `${process.env.GITHUB_SERVER_URL || "https://github.com"}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
const response = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/statuses/${sha}`, {
  method: "POST",
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "frankx-media-guard",
  },
  body: JSON.stringify({
    state,
    context: "Media Guard Trusted",
    description,
    target_url: targetUrl,
  }),
})
if (!response.ok) {
  const body = (await response.text()).slice(0, 500)
  throw new Error(`GitHub status API returned ${response.status}: ${body}`)
}
console.log(`Media Guard Trusted status ${state} recorded on ${sha}.`)
