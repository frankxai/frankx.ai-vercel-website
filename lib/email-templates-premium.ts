/**
 * Premium Email Template System for FrankX.AI
 *
 * State-of-the-art newsletter templates inspired by:
 * - Morning Brew's scannable structure and branded sections
 * - Dense Discovery's visual richness and numbered sections
 * - TLDR's minimalist efficiency
 * - Premium SaaS dark mode designs (Netflix, Linear, Vercel)
 *
 * Design principles:
 * - Editorial magazine meets tech newsletter
 * - Bold typography with clear hierarchy
 * - Numbered sections for scannability (like Dense Discovery)
 * - Gradient accents without overuse
 * - Personal "from the studio" energy
 * - Mobile-first, email-safe CSS
 */

export interface NewsletterSection {
  number?: string
  icon?: string
  label: string
  title: string
  content: string
  link?: string
  linkText?: string
  highlight?: boolean
}

export interface NewsletterData {
  recipientName?: string
  issueNumber?: number
  date?: string
  headline: string
  subheadline?: string
  personalNote?: string
  sections: NewsletterSection[]
  quickTip?: {
    title: string
    content: string
  }
  featuredLink?: {
    title: string
    description: string
    url: string
    image?: string
  }
  closingNote?: string
  ctaText?: string
  ctaUrl?: string
}

/**
 * Premium Newsletter Template
 * Inspired by the best newsletters: Morning Brew, Dense Discovery, TLDR
 */
export function premiumNewsletterEmail(data: NewsletterData): { subject: string; html: string } {
  const name = data.recipientName || 'Creator'
  const issueNum = data.issueNumber ? `#${data.issueNumber}` : ''
  const dateStr = data.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  // Generate sections HTML
  const sectionsHTML = data.sections.map((section, index) => {
    const sectionNumber = section.number || String(index + 1).padStart(2, '0')
    const isHighlight = section.highlight

    return `
    <!--[if mso]><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding: 0 0 24px 0;"><![endif]-->
    <div style="margin-bottom: 24px;">
      <!-- Section Header -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
        <tr>
          <td style="padding: 0;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <!-- Number Badge -->
                <td style="vertical-align: top; padding-right: 16px;">
                  <div style="width: 44px; height: 44px; background: ${isHighlight ? 'linear-gradient(135deg, #06b6d4 0%, #8B5CF6 100%)' : 'rgba(139, 92, 246, 0.15)'}; border-radius: 12px; text-align: center; line-height: 44px;">
                    <span style="font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace; font-size: 14px; font-weight: 700; color: ${isHighlight ? '#ffffff' : '#8B5CF6'}; letter-spacing: -0.02em;">${sectionNumber}</span>
                  </div>
                </td>
                <!-- Label & Title -->
                <td style="vertical-align: middle;">
                  <p style="margin: 0 0 4px 0; font-family: 'SF Mono', 'Monaco', 'Roboto Mono', monospace; font-size: 11px; font-weight: 600; color: #22d3ee; text-transform: uppercase; letter-spacing: 0.1em;">
                    ${section.icon ? section.icon + ' ' : ''}${section.label}
                  </p>
                  <h2 style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 20px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                    ${section.title}
                  </h2>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Section Content -->
      <div style="padding-left: 60px;">
        <p style="margin: 0 0 ${section.link ? '16px' : '0'} 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; color: #94a3b8; line-height: 1.7;">
          ${section.content}
        </p>
        ${section.link ? `
        <a href="${section.link}" style="display: inline-block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 600; color: #22d3ee; text-decoration: none; border-bottom: 1px solid rgba(34, 211, 238, 0.3);">
          ${section.linkText || 'Read more'} &rarr;
        </a>
        ` : ''}
      </div>
    </div>
    <!--[if mso]></td></tr></table><![endif]-->
    `
  }).join('')

  // Quick Tip HTML
  const quickTipHTML = data.quickTip ? `
    <!--[if mso]><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;"><tr><td style="background: #1a1a2e; padding: 24px;"><![endif]-->
    <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%); border-left: 4px solid #8B5CF6; border-radius: 0 12px 12px 0; padding: 20px 24px; margin: 32px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <p style="margin: 0 0 8px 0; font-family: 'SF Mono', 'Monaco', 'Roboto Mono', monospace; font-size: 11px; font-weight: 700; color: #8B5CF6; text-transform: uppercase; letter-spacing: 0.15em;">
              ${data.quickTip.title}
            </p>
            <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; color: #E2E8F0; line-height: 1.6;">
              ${data.quickTip.content}
            </p>
          </td>
        </tr>
      </table>
    </div>
    <!--[if mso]></td></tr></table><![endif]-->
  ` : ''

  // Featured Link HTML (Dense Discovery style)
  const featuredLinkHTML = data.featuredLink ? `
    <div style="background: rgba(6, 182, 212, 0.08); border: 1px solid rgba(6, 182, 212, 0.2); border-radius: 16px; padding: 24px; margin: 24px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <p style="margin: 0 0 8px 0; font-family: 'SF Mono', 'Monaco', 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; color: #22d3ee; text-transform: uppercase; letter-spacing: 0.15em;">
              FEATURED
            </p>
            <h3 style="margin: 0 0 8px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: 700; color: #ffffff;">
              <a href="${data.featuredLink.url}" style="color: #ffffff; text-decoration: none;">${data.featuredLink.title}</a>
            </h3>
            <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #94a3b8; line-height: 1.6;">
              ${data.featuredLink.description}
            </p>
          </td>
        </tr>
      </table>
    </div>
  ` : ''

  // CTA Button HTML
  const ctaHTML = data.ctaText && data.ctaUrl ? `
    <div style="text-align: center; margin: 40px 0;">
      <!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${data.ctaUrl}" style="height:56px;v-text-anchor:middle;width:240px;" arcsize="29%" strokecolor="#06b6d4" fillcolor="#06b6d4">
        <w:anchorlock/>
        <center style="color:#ffffff;font-family:sans-serif;font-size:16px;font-weight:bold;">${data.ctaText} &rarr;</center>
      </v:roundrect>
      <![endif]-->
      <!--[if !mso]><!-->
      <a href="${data.ctaUrl}" style="display: inline-block; padding: 18px 36px; background: linear-gradient(135deg, #06b6d4 0%, #8B5CF6 50%, #9333ea 100%); color: #ffffff; text-decoration: none; border-radius: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 700; font-size: 16px; box-shadow: 0 8px 24px rgba(6, 182, 212, 0.35);">
        ${data.ctaText} &rarr;
      </a>
      <!--<![endif]-->
    </div>
  ` : ''

  const html = `
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="dark light">
  <meta name="supported-color-schemes" content="dark light">
  <title>${data.headline}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    :root { color-scheme: dark light; supported-color-schemes: dark light; }
    @media (prefers-color-scheme: dark) {
      .email-bg { background-color: #0a0a0f !important; }
    }
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; padding: 16px !important; }
      .mobile-padding { padding: 24px 20px !important; }
      .mobile-center { text-align: center !important; }
      .mobile-full { width: 100% !important; display: block !important; }
      .mobile-hide { display: none !important; }
      .section-indent { padding-left: 0 !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0f; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <!-- Preheader -->
  <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #0a0a0f;">
    ${data.subheadline || data.headline} &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <!-- Email Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0f;">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <!-- Main Container -->
        <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

          <!-- ═══════════════════════════════════════════════════════════════ -->
          <!-- HEADER: Masthead -->
          <!-- ═══════════════════════════════════════════════════════════════ -->
          <tr>
            <td style="padding: 0 0 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <!-- Logo Mark -->
                    <div style="display: inline-block; margin-bottom: 16px;">
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="background: linear-gradient(135deg, #06b6d4 0%, #8B5CF6 50%, #9333ea 100%); padding: 3px; border-radius: 16px;">
                            <div style="background: #0a0a0f; padding: 12px 24px; border-radius: 13px;">
                              <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 24px; font-weight: 800; background: linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: -0.03em;">FrankX.AI</span>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <!-- Tagline & Issue Info -->
                    <p style="margin: 0; font-family: 'SF Mono', 'Monaco', 'Roboto Mono', monospace; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.15em;">
                      The Creator AI Studio ${issueNum ? `&nbsp;&bull;&nbsp; Issue ${issueNum}` : ''} &nbsp;&bull;&nbsp; ${dateStr}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══════════════════════════════════════════════════════════════ -->
          <!-- HERO: Main Headline -->
          <!-- ═══════════════════════════════════════════════════════════════ -->
          <tr>
            <td style="padding: 0 0 8px 0;">
              <!-- Gradient Line Accent -->
              <div style="height: 2px; background: linear-gradient(90deg, transparent 0%, #06b6d4 20%, #8B5CF6 50%, #9333ea 80%, transparent 100%); margin-bottom: 32px;"></div>

              <h1 style="margin: 0 0 16px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 36px; font-weight: 800; color: #ffffff; line-height: 1.15; letter-spacing: -0.03em;">
                ${data.headline}
              </h1>
              ${data.subheadline ? `
              <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; color: #94a3b8; line-height: 1.5;">
                ${data.subheadline}
              </p>
              ` : ''}
            </td>
          </tr>

          <!-- ═══════════════════════════════════════════════════════════════ -->
          <!-- PERSONAL NOTE -->
          <!-- ═══════════════════════════════════════════════════════════════ -->
          ${data.personalNote ? `
          <tr>
            <td style="padding: 24px 0 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-left: 3px solid #22d3ee; padding-left: 20px;">
                    <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; color: #CBD5E1; line-height: 1.7; font-style: italic;">
                      ${data.personalNote}
                    </p>
                    <p style="margin: 12px 0 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #64748b;">
                      — Frank
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- ═══════════════════════════════════════════════════════════════ -->
          <!-- CONTENT SECTIONS -->
          <!-- ═══════════════════════════════════════════════════════════════ -->
          <tr>
            <td style="padding: 24px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(180deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.3) 100%); border: 1px solid rgba(100, 116, 139, 0.15); border-radius: 20px;">
                <tr>
                  <td class="mobile-padding" style="padding: 32px;">
                    <!-- Section Intro -->
                    <p style="margin: 0 0 24px 0; font-family: 'SF Mono', 'Monaco', 'Roboto Mono', monospace; font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.15em;">
                      THIS WEEK IN THE STUDIO
                    </p>

                    <!-- Content Sections -->
                    ${sectionsHTML}

                    <!-- Quick Tip -->
                    ${quickTipHTML}

                    <!-- Featured Link -->
                    ${featuredLinkHTML}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══════════════════════════════════════════════════════════════ -->
          <!-- CTA -->
          <!-- ═══════════════════════════════════════════════════════════════ -->
          ${ctaHTML}

          <!-- ═══════════════════════════════════════════════════════════════ -->
          <!-- CLOSING -->
          <!-- ═══════════════════════════════════════════════════════════════ -->
          <tr>
            <td style="padding: 32px 0;">
              <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(100, 116, 139, 0.3) 50%, transparent 100%); margin-bottom: 32px;"></div>

              ${data.closingNote ? `
              <p style="margin: 0 0 16px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; color: #94a3b8; line-height: 1.7;">
                ${data.closingNote}
              </p>
              ` : ''}

              <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; color: #94a3b8; line-height: 1.7;">
                Keep creating,<br>
                <strong style="color: #ffffff;">Frank</strong>
              </p>
            </td>
          </tr>

          <!-- ═══════════════════════════════════════════════════════════════ -->
          <!-- FOOTER -->
          <!-- ═══════════════════════════════════════════════════════════════ -->
          <tr>
            <td style="padding: 32px 0 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <!-- Author Info -->
                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                      <tr>
                        <td style="padding-right: 16px; vertical-align: middle;">
                          <!-- Avatar Circle -->
                          <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #06b6d4 0%, #8B5CF6 100%); border-radius: 50%; padding: 2px;">
                            <div style="width: 44px; height: 44px; background: #1E293B; border-radius: 50%; text-align: center; line-height: 44px;">
                              <span style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 20px; color: #22d3ee;">F</span>
                            </div>
                          </div>
                        </td>
                        <td style="vertical-align: middle;">
                          <p style="margin: 0 0 2px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; font-weight: 600; color: #E2E8F0;">
                            Frank Guzman
                          </p>
                          <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; color: #64748b;">
                            Musician &rarr; AI Architect at Oracle
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Social Links -->
                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 0 12px;">
                          <a href="https://frankx.ai" style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 13px; color: #22d3ee; text-decoration: none;">frankx.ai</a>
                        </td>
                        <td style="color: #475569;">&bull;</td>
                        <td style="padding: 0 12px;">
                          <a href="https://twitter.com/frankxai" style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 13px; color: #22d3ee; text-decoration: none;">Twitter</a>
                        </td>
                        <td style="color: #475569;">&bull;</td>
                        <td style="padding: 0 12px;">
                          <a href="https://linkedin.com/in/frankguzmanai" style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 13px; color: #22d3ee; text-decoration: none;">LinkedIn</a>
                        </td>
                      </tr>
                    </table>

                    <!-- Stats Row (Morning Brew style) -->
                    <table role="presentation" cellpadding="0" cellspacing="0" style="background: rgba(30, 41, 59, 0.5); border-radius: 12px; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 16px 24px; text-align: center; border-right: 1px solid rgba(100, 116, 139, 0.2);">
                          <p style="margin: 0 0 4px 0; font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 20px; font-weight: 700; color: #22d3ee;">500+</p>
                          <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">AI Songs</p>
                        </td>
                        <td style="padding: 16px 24px; text-align: center; border-right: 1px solid rgba(100, 116, 139, 0.2);">
                          <p style="margin: 0 0 4px 0; font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 20px; font-weight: 700; color: #8B5CF6;">10K+</p>
                          <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Creators</p>
                        </td>
                        <td style="padding: 16px 24px; text-align: center;">
                          <p style="margin: 0 0 4px 0; font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 20px; font-weight: 700; color: #a78bfa;">Oracle</p>
                          <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">AI Architect</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Legal -->
                    <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; color: #475569; line-height: 1.6;">
                      You're receiving this because you joined the FrankX.AI community.<br>
                      <a href="{{RESEND_UNSUBSCRIBE_URL}}" style="color: #64748b; text-decoration: underline;">Unsubscribe</a> &nbsp;&bull;&nbsp;
                      <a href="https://frankx.ai/newsletter" style="color: #64748b; text-decoration: underline;">View in browser</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- /Main Container -->

      </td>
    </tr>
  </table>
</body>
</html>
`

  return {
    subject: `${data.headline}${issueNum ? ` | ${issueNum}` : ''}`,
    html
  }
}

/**
 * Generate a sample newsletter for testing
 */
export function samplePremiumNewsletter(): { subject: string; html: string } {
  return premiumNewsletterEmail({
    issueNumber: 1,
    headline: 'Welcome to the Golden Age of Creator AI',
    subheadline: 'Your weekly dispatch from the intersection of music, AI, and conscious creation.',
    personalNote: "It's 2 AM. I'm in the studio, and something magical just happened. After 500+ AI-generated songs and years building enterprise AI at Oracle, I've realized we're living in the most exciting time to be a creator. This newsletter is how I share what I'm learning in the trenches.",
    sections: [
      {
        icon: '🎵',
        label: 'AI Music',
        title: 'Suno v4.5 Changes Everything',
        content: 'The latest update dropped and creators are making studio-quality tracks in minutes. I\'ve been experimenting with frequency-based compositions for consciousness transformation — the results are mind-blowing. Here\'s what I learned this week.',
        link: 'https://frankx.ai/music',
        linkText: 'Explore 500+ AI Songs',
        highlight: true
      },
      {
        icon: '🤖',
        label: 'Agentic Systems',
        title: 'Building the Creator Operating System',
        content: 'What if your AI assistant could manage your entire creative workflow? I\'ve been building ACOS (Agentic Creator Operating System) — a superintelligent system that orchestrates content creation, music production, and publishing automatically.',
        link: 'https://frankx.ai/blog',
        linkText: 'Read the Blueprint'
      },
      {
        icon: '✨',
        label: 'Conscious Creation',
        title: 'Technology That Serves the Soul',
        content: 'Every framework I build is designed to amplify human creativity, not replace it. This is the difference between using AI and partnering with it. The tools are evolving — and so must our relationship with them.',
        link: 'https://frankx.ai/golden-age',
        linkText: 'Enter the Golden Age'
      }
    ],
    quickTip: {
      title: '💡 Creator Tip of the Week',
      content: '<strong style="color: #ffffff;">Start with intention, not instruction.</strong> Before prompting any AI tool, ask yourself: "What transformation do I want to create?" The clearer your intention, the more powerful your output.'
    },
    featuredLink: {
      title: 'The Complete Guide to AI Music Production',
      description: 'Everything I\'ve learned from creating 500+ AI songs, distilled into a comprehensive guide for creators ready to level up.',
      url: 'https://frankx.ai/guides/ai-music'
    },
    closingNote: 'Hit reply anytime. I read every message and respond personally. No spam, no fluff — just real insights from someone building in public.',
    ctaText: 'Visit the Studio',
    ctaUrl: 'https://frankx.ai'
  })
}
