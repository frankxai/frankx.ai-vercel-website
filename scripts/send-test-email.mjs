#!/usr/bin/env node

/**
 * Send Test Email Script
 *
 * Quick script to send test emails using the FrankX.AI email templates
 *
 * Usage:
 *   node scripts/send-test-email.mjs friemerx@gmail.com
 *   node scripts/send-test-email.mjs friemerx@gmail.com welcome
 *   node scripts/send-test-email.mjs friemerx@gmail.com broadcast
 */

import 'dotenv/config'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const API_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

async function sendTestEmail(recipientEmail, templateType = 'test') {
  log('\n📧 FrankX.AI Email Test System\n', 'bright')

  // Check if RESEND_API_KEY is configured
  if (!RESEND_API_KEY) {
    log('❌ ERROR: RESEND_API_KEY not found in environment', 'red')
    log('\n📋 Setup Instructions:', 'yellow')
    log('   1. Go to https://resend.com/api-keys', 'cyan')
    log('   2. Create a new API key', 'cyan')
    log('   3. Add to .env.local file:', 'cyan')
    log('      RESEND_API_KEY=re_your_key_here\n', 'green')
    log('   4. Or set in Vercel dashboard → Environment Variables\n', 'cyan')
    process.exit(1)
  }

  log(`Recipient: ${recipientEmail}`, 'cyan')
  log(`Template: ${templateType}`, 'cyan')
  log(`API Endpoint: ${API_URL}/api/test-email\n`, 'cyan')

  try {
    log('Sending email...', 'yellow')

    const payload = {
      recipientEmail,
      recipientName: 'Frank',
      templateType,
      testMessage: `Test email sent via script at ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles', dateStyle: 'full', timeStyle: 'long' })}`
    }

    if (templateType === 'broadcast') {
      payload.headline = 'Email System Test - Broadcast Template'
      payload.bodyContent = `<p>Hey Frank! This is a test of the broadcast email template.</p>
        <p>The email system is working correctly with:</p>
        <ul>
          <li>FrankX brand styling (Poppins + Inter fonts)</li>
          <li>Cyan to purple gradients</li>
          <li>Glassmorphic design</li>
          <li>Studio energy voice</li>
        </ul>
        <p>All systems operational! 🚀</p>`
      payload.ctaText = 'Visit FrankX.AI'
      payload.ctaUrl = 'https://frankx.ai'
    }

    const response = await fetch(`${API_URL}/api/test-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    if (response.ok) {
      log('\n✅ SUCCESS! Email sent successfully\n', 'green')
      log(`Email ID: ${data.emailId}`, 'cyan')
      log(`Template: ${data.template}`, 'cyan')
      log(`Timestamp: ${data.timestamp}\n`, 'cyan')

      log('📬 Check your inbox:', 'yellow')
      log(`   Email: ${recipientEmail}`, 'cyan')
      log('   Subject: Should contain "FrankX.AI"', 'cyan')
      log('   From: Frank from FrankX.AI\n', 'cyan')

      log('📊 Verify in Resend Dashboard:', 'yellow')
      log('   https://resend.com/emails\n', 'cyan')

      log('💡 Tip: Check spam folder if not in inbox\n', 'yellow')
    } else {
      log('\n❌ ERROR: Failed to send email\n', 'red')
      log('Error details:', 'red')
      console.error(data)

      if (data.troubleshooting) {
        log('\n🔧 Troubleshooting:', 'yellow')
        Object.entries(data.troubleshooting).forEach(([key, value]) => {
          log(`   ${key}. ${value}`, 'cyan')
        })
      }
    }
  } catch (error) {
    log('\n❌ ERROR: Failed to send test email\n', 'red')
    console.error(error)

    if (error.cause?.code === 'ECONNREFUSED') {
      log('\n🚨 Connection Error:', 'yellow')
      log('   Make sure the Next.js dev server is running:', 'cyan')
      log('   npm run dev\n', 'green')
    }
  }
}

// Parse command line arguments
const args = process.argv.slice(2)

if (args.length === 0) {
  log('\n📧 FrankX.AI Email Test Script\n', 'bright')
  log('Usage:', 'yellow')
  log('  node scripts/send-test-email.mjs <email> [template]\n', 'cyan')
  log('Templates:', 'yellow')
  log('  test      - Simple test email (default)', 'cyan')
  log('  welcome   - Newsletter welcome email', 'cyan')
  log('  broadcast - Community broadcast email\n', 'cyan')
  log('Examples:', 'yellow')
  log('  node scripts/send-test-email.mjs friemerx@gmail.com', 'green')
  log('  node scripts/send-test-email.mjs friemerx@gmail.com welcome', 'green')
  log('  node scripts/send-test-email.mjs friemerx@gmail.com broadcast\n', 'green')
  process.exit(0)
}

const recipientEmail = args[0]
const templateType = args[1] || 'test'

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
if (!emailRegex.test(recipientEmail)) {
  log(`\n❌ ERROR: Invalid email format: ${recipientEmail}\n`, 'red')
  process.exit(1)
}

// Validate template type
const validTemplates = ['test', 'welcome', 'broadcast']
if (!validTemplates.includes(templateType)) {
  log(`\n❌ ERROR: Invalid template type: ${templateType}`, 'red')
  log(`Valid options: ${validTemplates.join(', ')}\n`, 'cyan')
  process.exit(1)
}

// Send the email
sendTestEmail(recipientEmail, templateType)
