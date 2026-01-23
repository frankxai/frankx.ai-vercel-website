// PDF Delivery Email Template (Immediate)

interface PDFDeliveryEmailProps {
  name: string
  pdfTitle: string
  pdfUrl: string
  guideSlug: string
}

export function PDFDeliveryEmail({ name, pdfTitle, pdfUrl, guideSlug }: PDFDeliveryEmailProps) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pdfTitle}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0f1e; color: #f1f5f9;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <div style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #06b6d4 0%, #9333ea 100%); border-radius: 12px; margin-bottom: 24px;">
        <span style="font-size: 24px; font-weight: 700; color: white; letter-spacing: -0.02em;">FrankX.AI</span>
      </div>
    </div>

    <!-- Main content -->
    <div style="background: linear-gradient(to bottom, #111827, #0a0f1e); border: 1.5px solid rgba(6, 182, 212, 0.2); border-radius: 16px; padding: 32px; margin-bottom: 32px;">
      <h1 style="font-size: 28px; font-weight: 700; color: white; margin: 0 0 16px 0; line-height: 1.2;">
        Hey ${name}! 👋
      </h1>

      <p style="font-size: 16px; color: #94a3b8; line-height: 1.6; margin: 0 0 24px 0;">
        Here's your <strong style="color: white;">${pdfTitle}</strong> guide. This is the same framework I use to create transformative AI experiences.
      </p>

      <div style="background: rgba(6, 182, 212, 0.1); border: 1.5px solid rgba(6, 182, 212, 0.3); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <p style="font-size: 14px; color: #22d3ee; margin: 0 0 16px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">
          What's Inside
        </p>
        <ul style="margin: 0; padding-left: 24px; color: #cbd5e1;">
          <li style="margin-bottom: 8px;">Proven frameworks used in production</li>
          <li style="margin-bottom: 8px;">Real-world examples and templates</li>
          <li style="margin-bottom: 8px;">Step-by-step implementation guides</li>
        </ul>
      </div>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${pdfUrl}"
           style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #06b6d4 0%, #9333ea 100%); color: white; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 8px 24px rgba(6, 182, 212, 0.3);">
          Download ${pdfTitle} →
        </a>
      </div>

      <p style="font-size: 14px; color: #64748b; margin: 24px 0 0 0; line-height: 1.6;">
        Questions? Just hit reply. I read every email.
      </p>
    </div>

    <!-- Next steps -->
    <div style="background: linear-gradient(to bottom, #111827, #0a0f1e); border: 1.5px solid rgba(147, 51, 234, 0.2); border-radius: 16px; padding: 24px; margin-bottom: 32px;">
      <h2 style="font-size: 20px; font-weight: 600; color: white; margin: 0 0 16px 0;">
        What's Next?
      </h2>
      <p style="font-size: 14px; color: #94a3b8; line-height: 1.6; margin: 0 0 16px 0;">
        Over the next few days, I'll share:
      </p>
      <ul style="margin: 0; padding-left: 24px; color: #cbd5e1; font-size: 14px;">
        <li style="margin-bottom: 8px;">Advanced tips for implementing this framework</li>
        <li style="margin-bottom: 8px;">Behind-the-scenes look at my AI workflow</li>
        <li style="margin-bottom: 8px;">Exclusive resources from the FrankX community</li>
      </ul>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
      <p style="font-size: 12px; color: #64748b; margin: 0 0 16px 0;">
        <strong style="color: #94a3b8;">Frank Riemer</strong><br>
        Musician turned AI Architect at Oracle<br>
        500+ AI songs | Enterprise AI Systems
      </p>

      <div style="margin: 16px 0;">
        <a href="https://frankx.ai" style="color: #22d3ee; text-decoration: none; font-size: 14px; margin: 0 12px;">
          frankx.ai
        </a>
        <span style="color: #64748b;">|</span>
        <a href="https://twitter.com/frankxai" style="color: #22d3ee; text-decoration: none; font-size: 14px; margin: 0 12px;">
          Twitter
        </a>
        <span style="color: #64748b;">|</span>
        <a href="https://linkedin.com/in/frankguzmanai" style="color: #22d3ee; text-decoration: none; font-size: 14px; margin: 0 12px;">
          LinkedIn
        </a>
      </div>

      <p style="font-size: 11px; color: #64748b; margin: 24px 0 0 0;">
        You're receiving this because you requested ${pdfTitle} from FrankX.AI
      </p>
    </div>
  </div>
</body>
</html>
  `
}

export const pdfDeliveryEmailSubject = (pdfTitle: string) =>
  `Your ${pdfTitle} Guide from FrankX.AI`
