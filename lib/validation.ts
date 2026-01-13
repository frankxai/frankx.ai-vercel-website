/**
 * Input Validation and Sanitization
 *
 * Protects against common attacks:
 * - CSV/Formula injection (for CSV exports)
 * - Email validation (stricter than basic regex)
 * - XSS prevention (sanitize user input)
 */

/**
 * Sanitize cell for CSV export
 * Prevents formula injection attacks
 */
export function sanitizeCSVCell(value: string | undefined): string {
  if (!value) return ''

  const str = String(value)

  // If cell starts with dangerous characters, prefix with single quote
  if (/^[=+\-@\t\r]/.test(str)) {
    return `'${str}`
  }

  return str
}

/**
 * Validate email address
 * More robust than simple regex
 */
export function isValidEmail(email: string): boolean {
  // RFC 5322 compliant email regex (simplified but robust)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  if (!emailRegex.test(email)) {
    return false
  }

  // Additional checks
  const [localPart, domain] = email.split('@')

  // Local part should not be too long
  if (localPart.length > 64) {
    return false
  }

  // Domain should not be too long
  if (domain.length > 255) {
    return false
  }

  // Domain should have at least one dot
  if (!domain.includes('.')) {
    return false
  }

  return true
}

/**
 * Sanitize text input to prevent XSS
 */
export function sanitizeText(text: string | undefined, maxLength: number = 500): string {
  if (!text) return ''

  return String(text)
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Remove angle brackets (basic XSS prevention)
}

/**
 * Validate and sanitize lead data
 */
export interface LeadInput {
  email: string
  name: string
  company?: string
  role?: string
  primaryInterest?: string
  referralSource?: string
}

export function validateLeadData(data: any): LeadInput | null {
  // Required fields
  if (!data.email || !data.name) {
    return null
  }

  // Validate email
  if (!isValidEmail(data.email)) {
    return null
  }

  // Sanitize and validate
  return {
    email: data.email.toLowerCase().trim(),
    name: sanitizeText(data.name, 100),
    company: data.company ? sanitizeText(data.company, 100) : undefined,
    role: data.role ? sanitizeText(data.role, 100) : undefined,
    primaryInterest: data.primaryInterest ? sanitizeText(data.primaryInterest, 200) : undefined,
    referralSource: data.referralSource ? sanitizeText(data.referralSource, 100) : undefined
  }
}
