import fs from 'node:fs/promises'
import path from 'node:path'
import readline from 'node:readline'
import { spawn } from 'node:child_process'

const SITE_ROOT = process.cwd()
const SERVER_PATH = '/mnt/c/Users/Frank/MCP Server/Nano banana/nano-banana-mcp/dist/index.js'
const CLAUDE_DESKTOP_CONFIG = '/mnt/c/Users/Frank/AppData/Roaming/Claude/claude_desktop_config.json'
const LATEST_PROTOCOL_VERSION = '2025-06-18'

const prompts = [
  {
    slug: 'frankx-vision-mission-values',
    outputDir: 'public/images/blog',
    prompt:
      'Cinematic editorial hero image for a visionary AI creator brand. Dark premium backdrop, aurora gradients in emerald, cyan, and gold. Abstract intelligence threads, subtle grid, and warm glow. Sophisticated, minimal, high-end. 16:9 composition, no text, no logos.'
  },
  {
    slug: 'frankx-business-plan-canvas',
    outputDir: 'public/images/blog',
    prompt:
      'Premium strategic planning hero image for an AI business canvas. Dark matte background, holographic blueprint overlays, subtle charts and wireframe layers. Emerald and cyan highlights with golden accents. Clean, modern, executive feel. 16:9 composition, no text.'
  },
  {
    slug: 'golden-age-field-guide',
    outputDir: 'public/images/blog',
    prompt:
      'Golden Age of Intelligence field guide hero image. Dark cosmic gradient, sunrise horizon, luminous signal paths and orbiting nodes. Elegant, hopeful, cinematic. Emerald, cyan, and amber highlights. 16:9 composition, no text.'
  },
  {
    slug: 'agent-collective-operating-system',
    outputDir: 'public/images/guides',
    prompt:
      'Operational systems hero image for a multi-agent AI collective. Dark premium base, modular tiles, glowing workflow lines, subtle glassmorphism. Emerald and cyan highlights, sophisticated, clean. 16:9 composition, no text.'
  },
  {
    slug: 'skills-library-playbook',
    outputDir: 'public/images/guides',
    prompt:
      'Skills library playbook hero image. Dark refined background with stacked knowledge cards, luminous index lines, and aurora accents. Emerald, cyan, and warm gold. Modern, minimal, premium. 16:9 composition, no text.'
  },
]

function parseApiKeyFromClaudeConfig(rawConfig) {
  try {
    const config = JSON.parse(rawConfig)
    const nanoBanana = config?.mcpServers?.['nano-banana']
    return nanoBanana?.env?.GEMINI_API_KEY || null
  } catch {
    return null
  }
}

async function resolveGeminiKey() {
  if (process.env.GEMINI_API_KEY) {
    return process.env.GEMINI_API_KEY
  }

  try {
    const rawConfig = await fs.readFile(CLAUDE_DESKTOP_CONFIG, 'utf8')
    const key = parseApiKeyFromClaudeConfig(rawConfig)
    return key || null
  } catch {
    return null
  }
}

class McpClient {
  constructor({ serverPath, apiKey }) {
    this.serverPath = serverPath
    this.apiKey = apiKey
    this.nextId = 1
    this.pending = new Map()
    this.process = null
    this.reader = null
  }

  async start() {
    await fs.access(this.serverPath)
    this.process = spawn('node', [this.serverPath], {
      cwd: SITE_ROOT,
      env: {
        ...process.env,
        GEMINI_API_KEY: this.apiKey,
      },
      stdio: ['pipe', 'pipe', 'inherit'],
    })

    this.reader = readline.createInterface({ input: this.process.stdout })
    this.reader.on('line', (line) => {
      if (!line.trim()) return
      let message
      try {
        message = JSON.parse(line)
      } catch {
        return
      }

      if (message.id && this.pending.has(message.id)) {
        const { resolve } = this.pending.get(message.id)
        this.pending.delete(message.id)
        resolve(message)
      }
    })

    await this.request('initialize', {
      protocolVersion: LATEST_PROTOCOL_VERSION,
      capabilities: {},
      clientInfo: {
        name: 'frankx-image-client',
        version: '1.0.0',
      },
    })

    this.notify('notifications/initialized', {})
  }

  async request(method, params) {
    const id = this.nextId++
    const payload = { jsonrpc: '2.0', id, method, params }

    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
      this.process.stdin.write(`${JSON.stringify(payload)}\n`)
    })
  }

  notify(method, params) {
    const payload = { jsonrpc: '2.0', method, params }
    this.process.stdin.write(`${JSON.stringify(payload)}\n`)
  }

  async callTool(name, args) {
    const result = await this.request('tools/call', {
      name,
      arguments: args,
    })
    return result?.result || result
  }

  async close() {
    if (this.reader) {
      this.reader.close()
    }
    if (this.process) {
      this.process.kill('SIGTERM')
    }
  }
}

async function getLastImagePath(client) {
  const info = await client.callTool('get_last_image_info', {})
  const textBlock = info?.content?.find((item) => item.type === 'text')
  if (!textBlock?.text) return null
  const match = textBlock.text.match(/Path:\s(.+)/)
  return match ? match[1].trim() : null
}

async function copyGeneratedImage(sourcePath, targetPath) {
  await fs.mkdir(path.dirname(targetPath), { recursive: true })
  await fs.copyFile(sourcePath, targetPath)
}

async function main() {
  const apiKey = await resolveGeminiKey()
  if (!apiKey) {
    console.error('Missing GEMINI_API_KEY. Set env var or configure Claude Desktop MCP settings.')
    process.exit(1)
  }

  const client = new McpClient({ serverPath: SERVER_PATH, apiKey })
  await client.start()

  for (const item of prompts) {
    console.log(`Generating image for ${item.slug}...`)
    await client.callTool('generate_image', { prompt: item.prompt })
    const imagePath = await getLastImagePath(client)
    if (!imagePath) {
      console.error(`Failed to locate generated image for ${item.slug}`)
      continue
    }

    const targetPath = path.join(SITE_ROOT, item.outputDir, `${item.slug}.png`)
    await copyGeneratedImage(imagePath, targetPath)
    console.log(`Saved: ${targetPath}`)
  }

  await client.close()
}

main().catch((error) => {
  console.error('Nano Banana generation failed:', error)
  process.exit(1)
})
