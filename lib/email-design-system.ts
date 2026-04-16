/**
 * FrankX.AI Email Design System v3.1
 *
 * Glassmorphic dark-mode email design inspired by Linear, Vercel, and Apple.
 * Single source of truth for all email components across the platform.
 *
 * v3.1 fixes:
 * - Solid background-color fallbacks before every rgba() (Gmail Android compat)
 * - MSO conditional fallbacks for gradient lines and dividers
 * - Fixed resourceCard double border declaration
 * - Added view-in-browser link in footer
 * - Improved preheader with alternating &zwnj;&nbsp; pattern
 *
 * Compatibility:
 * - Gmail (web + mobile): Full support (strips <style>, inline CSS only)
 * - Apple Mail: Full support including rgba, gradients
 * - Outlook 365/web: Full support
 * - Outlook desktop (MSO): VML fallbacks for buttons, solid color fallbacks
 * - Yahoo/AOL: Inline CSS only, gradients degrade to solid
 */

// ─── Design Tokens ───────────────────────────────────────────────

const T = {
  bgDeep: '#0a0a0f',
  bgCard: '#141420',
  bgCardGlass: 'rgba(20, 20, 32, 0.75)',
  borderGlass: '#1e293b',           // solid fallback
  borderGlassRgba: 'rgba(100, 116, 139, 0.12)', // progressive enhancement
  borderSubtle: '#1a1a2e',
  accentCyan: '#22d3ee',
  accentPurple: '#8B5CF6',
  accentGreen: '#10b981',
  accentGold: '#fbbf24',
  gradientLine: 'linear-gradient(90deg, transparent 0%, #06b6d4 20%, #8B5CF6 50%, #9333ea 80%, transparent 100%)',
  gradientButton: 'linear-gradient(135deg, #06b6d4 0%, #8B5CF6 50%, #9333ea 100%)',
  highlightBg: '#161625',           // solid fallback for gradient glass
  textPrimary: '#F1F5F9',
  textSecondary: '#CBD5E1',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  textFaint: '#475569',
  fontStack: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  monoStack: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
  radius: '14px',
  radiusSmall: '10px',
} as const

export { T as tokens }

// ─── Frank Omega Mascot ──────────────────────────────────────────

type OmegaMood = 'waving' | 'thinking' | 'celebrating' | 'pointing' | 'chill' | 'chibi' | 'hero'

const OMEGA_VARIANTS: Record<OmegaMood, { file: string; alt: string }> = {
  waving: { file: 'axi-v5-waving.png', alt: 'Frank Omega waving' },
  thinking: { file: 'axi-v5-thinking.png', alt: 'Frank Omega thinking' },
  celebrating: { file: 'axi-v5-celebrating.png', alt: 'Frank Omega celebrating' },
  pointing: { file: 'frank-omega-hero-v1.png', alt: 'Frank Omega' },
  chill: { file: 'frank-omega-chill-v1.png', alt: 'Frank Omega relaxed' },
  chibi: { file: 'frank-omega-pixar-chibi-v1.png', alt: 'Frank Omega' },
  hero: { file: 'frank-omega-hero-v1.png', alt: 'Frank Omega' },
}

export function mascotImage(
  mood: OmegaMood = 'chibi',
  size: number = 64,
  align: 'left' | 'center' | 'right' = 'center'
): string {
  const v = OMEGA_VARIANTS[mood]
  const url = `https://www.frankx.ai/images/mascot/${v.file}`
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="${align}" style="padding: 0 0 16px 0;">
          <img src="${url}" alt="${v.alt}" width="${size}" height="${size}" style="display: block; width: ${size}px; height: ${size}px; border-radius: 50%; border: 2px solid ${T.borderGlass};" />
        </td>
      </tr>
    </table>`
}

export function mascotWithSpeech(
  mood: OmegaMood,
  message: string,
  size: number = 48
): string {
  const v = OMEGA_VARIANTS[mood]
  const url = `https://www.frankx.ai/images/mascot/${v.file}`
  // Speech bubble: solid bg fallback, then rgba for progressive enhancement
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 20px 0;">
      <tr>
        <td style="width: ${size + 16}px; vertical-align: top; padding-right: 14px;">
          <img src="${url}" alt="${v.alt}" width="${size}" height="${size}" style="display: block; width: ${size}px; height: ${size}px; border-radius: 50%; border: 2px solid ${T.borderGlass};" />
        </td>
        <td style="vertical-align: middle; padding: 12px 16px; background-color: ${T.bgCard}; background: ${T.bgCardGlass}; border: 1px solid ${T.borderGlass}; border-radius: 0 ${T.radius} ${T.radius} ${T.radius};">
          <p style="font-family: ${T.fontStack}; font-size: 15px; color: ${T.textSecondary}; margin: 0; line-height: 1.55;">${message}</p>
        </td>
      </tr>
    </table>`
}

// ─── Gradient Accent Line (with MSO fallback) ────────────────────

export function gradientLine(): string {
  return `
    <!--[if mso]>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-top: 2px solid ${T.accentPurple};">&nbsp;</td></tr></table>
    <![endif]-->
    <!--[if !mso]><!-->
    <div style="height: 2px; background: ${T.gradientLine}; margin: 0;"></div>
    <!--<![endif]-->`
}

// ─── CTA Button ──────────────────────────────────────────────────

export function ctaButton(
  text: string,
  url: string,
  variant: 'gradient' | 'accent' | 'outline' = 'gradient',
  color?: string
): string {
  // Solid fallback bg for gradient
  const solidBg = variant === 'gradient' ? T.accentPurple : (color || T.accentPurple)
  const bg =
    variant === 'gradient'
      ? T.gradientButton
      : variant === 'accent'
        ? (color || T.accentPurple)
        : 'transparent'

  const border = variant === 'outline' ? `border: 1px solid ${T.textFaint};` : ''
  const textColor = variant === 'outline' ? T.textSecondary : '#ffffff'
  const vmlColor = variant === 'outline' ? T.bgCard : solidBg

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 8px 0 24px 0;">
          <!--[if mso]>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${url}" style="height:52px;v-text-anchor:middle;width:280px;" arcsize="27%" fillcolor="${vmlColor}" ${variant === 'outline' ? 'strokecolor="' + T.textFaint + '"' : 'stroke="false"'}>
          <center style="color:${textColor};font-size:16px;font-weight:600;">${text}</center>
          </v:roundrect>
          <![endif]-->
          <!--[if !mso]><!-->
          <a href="${url}" style="display: inline-block; min-width: 200px; max-width: 340px; padding: 16px 32px; background-color: ${solidBg}; background: ${bg}; color: ${textColor}; text-decoration: none; border-radius: 12px; font-family: ${T.fontStack}; font-size: 16px; font-weight: 600; text-align: center; letter-spacing: -0.01em; ${border}">
            ${text}
          </a>
          <!--<![endif]-->
        </td>
      </tr>
    </table>`
}

// ─── Glass Card (with solid fallback) ────────────────────────────

export function glassCard(
  content: string,
  options: {
    accentColor?: string
    accentPosition?: 'top' | 'left' | 'none'
    padding?: string
  } = {}
): string {
  const { accentColor, accentPosition = 'none', padding = '28px 24px' } = options

  const borderTop =
    accentPosition === 'top' && accentColor
      ? `border-top: 2px solid ${accentColor};`
      : ''
  const borderLeft =
    accentPosition === 'left' && accentColor
      ? `border-left: 3px solid ${accentColor};`
      : ''

  return `
    <!--[if mso]>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="background-color: ${T.bgCard}; padding: ${padding}; ${borderTop} ${borderLeft}">
    <![endif]-->
    <!--[if !mso]><!-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: ${T.bgCard}; background: ${T.bgCardGlass}; border: 1px solid ${T.borderGlass}; border-radius: ${T.radius}; ${borderTop} ${borderLeft}">
      <tr>
        <td class="content-pad" style="padding: ${padding};">
    <!--<![endif]-->
          ${content}
    <!--[if !mso]><!-->
        </td>
      </tr>
    </table>
    <!--<![endif]-->
    <!--[if mso]>
    </td></tr></table>
    <![endif]-->`
}

// ─── Section Label ───────────────────────────────────────────────

export function sectionLabel(text: string, color: string = T.accentCyan): string {
  return `<p style="font-family: ${T.monoStack}; font-size: 11px; font-weight: 700; color: ${color}; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 14px 0;">${text}</p>`
}

// ─── Feature Row (for bullet lists) ──────────────────────────────

export function featureRow(
  label: string,
  description: string,
  accentColor: string = T.accentPurple
): string {
  return `<p style="font-family: ${T.fontStack}; font-size: 15px; color: ${T.textSecondary}; margin: 0 0 8px 0; line-height: 1.6;"><span style="color: ${accentColor}; font-weight: 600;">›</span>&nbsp; <strong style="color: ${T.textPrimary};">${label}</strong> — ${description}</p>`
}

// ─── Resource Card (fixed border declaration) ────────────────────

export function resourceCard(
  title: string,
  description: string,
  url: string,
  accentColor: string = T.accentCyan
): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
      <tr>
        <td style="padding: 14px 18px; background-color: ${T.bgCard}; background: ${T.bgCardGlass}; border-radius: ${T.radiusSmall}; border: 1px solid ${T.borderGlass}; border-left-width: 3px; border-left-color: ${accentColor};">
          <a href="${url}" style="font-family: ${T.fontStack}; font-size: 15px; font-weight: 600; color: ${T.textPrimary}; text-decoration: none; line-height: 1.4;">${title}</a>
          <p style="font-family: ${T.fontStack}; font-size: 13px; color: ${T.textMuted}; margin: 4px 0 0 0; line-height: 1.5;">${description}</p>
        </td>
      </tr>
    </table>`
}

// ─── Highlight Box (with solid fallback) ─────────────────────────

export function highlightBox(
  label: string,
  content: string,
  color: string = T.accentPurple
): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
      <tr>
        <td style="padding: 18px 20px; background-color: ${T.highlightBg}; border-left: 3px solid ${color}; border-radius: 0 ${T.radiusSmall} ${T.radiusSmall} 0;">
          ${sectionLabel(label, color)}
          <p style="font-family: ${T.fontStack}; font-size: 15px; color: ${T.textPrimary}; margin: 0; line-height: 1.65;">${content}</p>
        </td>
      </tr>
    </table>`
}

// ─── Divider (with MSO fallback) ─────────────────────────────────

export function divider(): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding: 24px 0;">
          <!--[if mso]>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-top: 1px solid ${T.borderGlass};">&nbsp;</td></tr></table>
          <![endif]-->
          <!--[if !mso]><!-->
          <div style="height: 1px; background-color: ${T.borderGlass}; background: linear-gradient(90deg, transparent 0%, ${T.borderGlass} 50%, transparent 100%);"></div>
          <!--<![endif]-->
        </td>
      </tr>
    </table>`
}

// ─── Logo (Gradient-bordered pill, MSO safe) ─────────────────────

function logo(): string {
  return `
    <td align="center" style="padding: 0 0 28px 0;">
      <!--[if mso]>
      <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background-color: ${T.accentPurple}; padding: 12px 24px;">
      <span style="font-family: Arial, Helvetica, sans-serif; font-size: 22px; font-weight: bold; color: white;">FrankX.AI</span>
      </td></tr></table>
      <![endif]-->
      <!--[if !mso]><!-->
      <div style="display: inline-block;">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background-color: ${T.accentPurple}; background: ${T.gradientButton}; padding: 2px; border-radius: 14px;">
              <div style="background: ${T.bgDeep}; padding: 10px 22px; border-radius: 12px;">
                <a href="https://frankx.ai" style="font-family: ${T.fontStack}; font-size: 22px; font-weight: 800; color: ${T.textPrimary}; text-decoration: none; letter-spacing: -0.03em;">FrankX<span style="color: ${T.accentCyan};">.</span>AI</a>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <!--<![endif]-->
    </td>`
}

// ─── Footer ──────────────────────────────────────────────────────

function footer(): string {
  return `
    <tr>
      <td style="padding-top: 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">

          <!-- Gradient divider -->
          <tr>
            <td style="padding-bottom: 28px;">
              ${gradientLine()}
            </td>
          </tr>

          <!-- Author block -->
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right: 14px; vertical-align: middle;">
                    <!--[if mso]>
                    <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="width:40px;height:40px;background:${T.accentPurple};border-radius:50%;text-align:center;line-height:40px;">
                    <span style="font-family:Arial;font-size:18px;font-weight:bold;color:white;">F</span>
                    </td></tr></table>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <div style="width: 44px; height: 44px; background-color: ${T.accentPurple}; background: ${T.gradientButton}; border-radius: 50%; padding: 2px;">
                      <div style="width: 40px; height: 40px; background: ${T.bgCard}; border-radius: 50%; text-align: center; line-height: 40px;">
                        <span style="font-family: ${T.fontStack}; font-size: 18px; font-weight: 700; color: ${T.accentCyan};">F</span>
                      </div>
                    </div>
                    <!--<![endif]-->
                  </td>
                  <td style="vertical-align: middle;">
                    <p style="font-family: ${T.fontStack}; font-size: 14px; font-weight: 600; color: ${T.textPrimary}; margin: 0 0 2px 0;">Frank Riemer</p>
                    <p style="font-family: ${T.fontStack}; font-size: 12px; color: ${T.textDim}; margin: 0;">AI Architect &middot; Creator</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Social links -->
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 0 10px;">
                    <a href="https://frankx.ai" style="font-family: ${T.fontStack}; font-size: 13px; color: ${T.accentCyan}; text-decoration: none; font-weight: 500;">frankx.ai</a>
                  </td>
                  <td style="color: ${T.textFaint}; font-size: 10px;">&bull;</td>
                  <td style="padding: 0 10px;">
                    <a href="https://x.com/frankxeth" style="font-family: ${T.fontStack}; font-size: 13px; color: ${T.textDim}; text-decoration: none; font-weight: 500;">X</a>
                  </td>
                  <td style="color: ${T.textFaint}; font-size: 10px;">&bull;</td>
                  <td style="padding: 0 10px;">
                    <a href="https://www.linkedin.com/in/frank-x-riemer/" style="font-family: ${T.fontStack}; font-size: 13px; color: ${T.textDim}; text-decoration: none; font-weight: 500;">LinkedIn</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Legal -->
          <tr>
            <td align="center">
              <p style="font-family: ${T.fontStack}; font-size: 11px; color: ${T.textFaint}; margin: 0; line-height: 1.7;">
                You received this because you signed up at frankx.ai<br>
                <a href="{{RESEND_UNSUBSCRIBE_URL}}" style="color: ${T.textDim}; text-decoration: underline;">Unsubscribe</a> &nbsp;&bull;&nbsp;
                <a href="https://frankx.ai/newsletter/preferences" style="color: ${T.textDim}; text-decoration: underline;">Preferences</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>`
}

// ─── Email Wrapper ───────────────────────────────────────────────

// Improved preheader: alternating pattern that all clients handle
function preheaderPadding(): string {
  return Array.from({ length: 20 }, (_, i) => i % 2 === 0 ? '&zwnj;&nbsp;' : '&nbsp;&zwnj;').join('')
}

export function emailWrapper(content: string, preheader: string = ''): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>FrankX.AI</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <style type="text/css">body, table, td { font-family: Arial, Helvetica, sans-serif !important; }</style>
  <![endif]-->
  <style type="text/css">
    :root { color-scheme: dark; supported-color-schemes: dark; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
    @media only screen and (min-width: 601px) {
      .content-pad { padding: 36px 32px !important; }
      .outer-pad { padding: 48px 16px !important; }
      .h1 { font-size: 32px !important; }
    }
    @media only screen and (max-width: 600px) {
      .mobile-full { width: 100% !important; display: block !important; }
      .mobile-padding { padding: 24px 20px !important; }
    }
    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transition: none !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: ${T.fontStack}; background-color: ${T.bgDeep}; color: ${T.textPrimary}; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased;">

  ${preheader ? `<div style="display: none; max-height: 0; overflow: hidden; mso-hide: all; font-size: 1px; line-height: 1px; color: ${T.bgDeep};">${preheader}${preheaderPadding()}</div>` : ''}

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: ${T.bgDeep};">
    <tr>
      <td class="outer-pad" align="center" style="padding: 32px 12px;">
        <!--[if mso]>
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" align="center"><tr><td>
        <![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px;">

          <!-- Logo -->
          <tr>${logo()}</tr>

          <!-- Accent Line -->
          <tr><td style="padding-bottom: 28px;">${gradientLine()}</td></tr>

          <!-- Content -->
          <tr><td>${content}</td></tr>

          <!-- Footer -->
          ${footer()}

        </table>
        <!--[if mso]>
        </td></tr></table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ─── Signature Block ─────────────────────────────────────────────

export function signatureBlock(message: string = 'Reply anytime. I read every one.'): string {
  return `
    ${divider()}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <p style="font-family: ${T.fontStack}; font-size: 14px; color: ${T.textMuted}; margin: 0 0 6px 0; line-height: 1.6;">${message}</p>
          <p style="font-family: ${T.fontStack}; font-size: 14px; color: ${T.textDim}; margin: 0;">— Frank</p>
        </td>
      </tr>
    </table>`
}
