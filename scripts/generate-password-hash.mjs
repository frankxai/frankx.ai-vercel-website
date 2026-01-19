#!/usr/bin/env node

/**
 * Password Hash Generator for FrankX.AI Admin Authentication
 *
 * Usage:
 *   node scripts/generate-password-hash.mjs your-password-here
 *
 * Generates a bcrypt hash that can be used for ADMIN_PASSWORD_HASH env var.
 */

import bcrypt from 'bcryptjs'

const password = process.argv[2]

if (!password) {
  console.error('❌ Error: Please provide a password')
  console.error('Usage: node scripts/generate-password-hash.mjs your-password-here')
  process.exit(1)
}

// Validate password strength
if (password.length < 12) {
  console.warn('⚠️  Warning: Password should be at least 12 characters for security')
}

if (!/[A-Z]/.test(password)) {
  console.warn('⚠️  Warning: Password should contain at least one uppercase letter')
}

if (!/[a-z]/.test(password)) {
  console.warn('⚠️  Warning: Password should contain at least one lowercase letter')
}

if (!/[0-9]/.test(password)) {
  console.warn('⚠️  Warning: Password should contain at least one number')
}

if (!/[^A-Za-z0-9]/.test(password)) {
  console.warn('⚠️  Warning: Password should contain at least one special character')
}

// Generate hash (saltRounds = 10 is recommended balance of speed vs security)
const hash = await bcrypt.hash(password, 10)

console.log('\n✅ Password hash generated successfully!\n')
console.log('Copy this hash to your .env.local file:\n')
console.log(`ADMIN_PASSWORD_HASH=${hash}\n`)
console.log('⚠️  IMPORTANT: Store this in your environment variables, NOT in code!\n')

// Verify hash works
const testVerify = await bcrypt.compare(password, hash)
console.log(`✅ Hash verification test: ${testVerify ? 'PASSED' : 'FAILED'}\n`)
