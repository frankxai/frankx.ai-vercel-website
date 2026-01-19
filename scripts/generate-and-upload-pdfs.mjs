import { launch } from 'puppeteer'
import { put } from '@vercel/blob'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

const PDFS = [
  {
    name: 'soulbook-guide',
    htmlPath: join(projectRoot, 'public/pdf-templates/soulbook-guide.html'),
    title: 'Soulbook Framework Guide',
    blobKey: 'soulbook-guide.pdf'
  },
  {
    name: 'vibe-os-guide',
    htmlPath: join(projectRoot, 'public/pdf-templates/vibe-os-guide.html'),
    title: 'Vibe OS AI Music Creation Guide',
    blobKey: 'vibe-os-guide.pdf'
  }
]

async function generatePDF(htmlPath, outputPath) {
  console.log(`📄 Generating PDF from ${htmlPath}...`)

  let browser
  try {
    browser = await launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    })

    const page = await browser.newPage()

    // Read HTML file content
    const htmlContent = readFileSync(htmlPath, 'utf-8')

    // Set content directly
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
      timeout: 60000
    })

    // Wait for fonts and images to load
    await page.evaluateHandle('document.fonts.ready')
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate PDF
    const pdfBuffer = await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    })

    console.log(`✅ PDF generated: ${outputPath}`)
    return pdfBuffer
  } catch (error) {
    console.error(`❌ Error generating PDF:`, error)
    throw error
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

async function uploadToVercelBlob(pdfBuffer, blobKey, contentType = 'application/pdf') {
  console.log(`☁️  Uploading to Vercel Blob: ${blobKey}...`)

  const blob = await put(blobKey, pdfBuffer, {
    access: 'public',
    contentType,
    token: process.env.BLOB_READ_WRITE_TOKEN
  })

  console.log(`✅ Uploaded: ${blob.url}`)
  return blob
}

async function main() {
  console.log('🚀 Starting PDF generation and upload process...\n')

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ BLOB_READ_WRITE_TOKEN not found in environment variables')
    process.exit(1)
  }

  const results = []

  for (const pdf of PDFS) {
    try {
      console.log(`\n📦 Processing: ${pdf.title}`)
      console.log('─'.repeat(60))

      // Generate PDF
      const outputPath = join(projectRoot, 'public/pdfs', `${pdf.name}.pdf`)
      const pdfBuffer = await generatePDF(pdf.htmlPath, outputPath)

      // Upload to Vercel Blob
      const blob = await uploadToVercelBlob(pdfBuffer, pdf.blobKey)

      results.push({
        name: pdf.name,
        title: pdf.title,
        localPath: outputPath,
        blobUrl: blob.url,
        success: true
      })

      console.log(`✨ ${pdf.title} complete!\n`)
    } catch (error) {
      console.error(`❌ Failed to process ${pdf.title}:`, error.message)
      results.push({
        name: pdf.name,
        title: pdf.title,
        success: false,
        error: error.message
      })
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 SUMMARY')
  console.log('='.repeat(60))

  const successful = results.filter(r => r.success)
  const failed = results.filter(r => !r.success)

  console.log(`\n✅ Successful: ${successful.length}/${results.length}`)
  successful.forEach(r => {
    console.log(`   • ${r.title}`)
    console.log(`     → ${r.blobUrl}`)
  })

  if (failed.length > 0) {
    console.log(`\n❌ Failed: ${failed.length}/${results.length}`)
    failed.forEach(r => {
      console.log(`   • ${r.title}: ${r.error}`)
    })
  }

  console.log('\n🎉 Process complete!\n')
}

main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
