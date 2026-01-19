// 3-Day Follow-up Email Template

interface FollowUp3DayEmailProps {
  name: string
  pdfTitle: string
  guideSlug: string
  relatedContentUrl?: string
}

export function FollowUp3DayEmail({ name, pdfTitle, guideSlug, relatedContentUrl }: FollowUp3DayEmailProps) {
  const getRelatedContent = (slug: string) => {
    const content = {
      'soulbook-guide': {
        title: 'Creating Your First Transformation Session',
        url: 'https://frankx.ai/blog/transformation-sessions',
        description: 'A step-by-step walkthrough of implementing Soulbook principles'
      },
      'vibe-os-guide': {
        title: 'Advanced Suno AI Techniques',
        url: 'https://frankx.ai/blog/suno-advanced-techniques',
        description: 'Elevate your AI music creation with pro-level prompting'
      }
    }
    return content[slug as keyof typeof content] || content['soulbook-guide']
  }

  const related = getRelatedContent(guideSlug)

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quick Check-in on ${pdfTitle}</title>
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
        Hey ${name} 👋
      </h1>

      <p style="font-size: 16px; color: #94a3b8; line-height: 1.6; margin: 0 0 16px 0;">
        Just checking in! Did you get a chance to dive into the <strong style="color: white;">${pdfTitle}</strong>?
      </p>

      <p style="font-size: 16px; color: #94a3b8; line-height: 1.6; margin: 0 0 24px 0;">
        I know these frameworks can feel overwhelming at first. When I started integrating AI into my creative workflow, I felt the same way.
      </p>

      <div style="background: rgba(6, 182, 212, 0.1); border-left: 3px solid #06b6d4; padding: 16px 20px; margin-bottom: 24px;">
        <p style="font-size: 15px; color: #22d3ee; margin: 0; font-style: italic;">
          "The best way to start? Pick ONE thing from the guide and implement it today. Not tomorrow. Today."
        </p>
      </div>

      <p style="font-size: 16px; color: #94a3b8; line-height: 1.6; margin: 0 0 24px 0;">
        That's how I went from tech-overwhelmed musician to creating 500+ AI songs and building enterprise systems at Oracle.
      </p>

      <h2 style="font-size: 20px; font-weight: 600; color: white; margin: 0 0 16px 0;">
        Quick Win for Today
      </h2>

      <p style="font-size: 16px; color: #94a3b8; line-height: 1.6; margin: 0 0 16px 0;">
        Open the guide and star ⭐ the ONE framework that resonates most. Then spend 15 minutes implementing just that piece.
      </p>

      <p style="font-size: 16px; color: #94a3b8; line-height: 1.6; margin: 0 0 24px 0;">
        Small consistent actions beat perfect plans every time.
      </p>
    </div>

    <!-- Related content -->
    <div style="background: linear-gradient(to bottom, #111827, #0a0f1e); border: 1.5px solid rgba(147, 51, 234, 0.2); border-radius: 16px; padding: 24px; margin-bottom: 32px;">
      <h2 style="font-size: 18px; font-weight: 600; color: white; margin: 0 0 12px 0;">
        📚 Going Deeper
      </h2>
      <p style="font-size: 14px; color: #94a3b8; line-height: 1.6; margin: 0 0 16px 0;">
        I just published this for creators implementing these frameworks:
      </p>

      <div style="background: rgba(6, 182, 212, 0.05); border-radius: 12px; padding: 20px; margin-bottom: 16px;">
        <h3 style="font-size: 16px; font-weight: 600; color: white; margin: 0 0 8px 0;">
          ${related.title}
        </h3>
        <p style="font-size: 14px; color: #94a3b8; line-height: 1.5; margin: 0 0 16px 0;">
          ${related.description}
        </p>
        <a href="${relatedContentUrl || related.url}"
           style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #06b6d4 0%, #9333ea 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
          Read Article →
        </a>
      </div>
    </div>

    <!-- CTA -->
    <div style="text-align: center; padding: 24px; margin-bottom: 32px;">
      <p style="font-size: 14px; color: #94a3b8; margin: 0 0 16px 0;">
        Questions? Stuck on something? Hit reply—I read every email.
      </p>
      <p style="font-size: 14px; color: #64748b; margin: 0;">
        (Seriously. I'm a real person who loves helping creators level up.)
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
      <p style="font-size: 12px; color: #64748b; margin: 0 0 16px 0;">
        <strong style="color: #94a3b8;">Frank Guzman</strong><br>
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
        You're receiving this because you downloaded ${pdfTitle}<br>
        <a href="{{unsubscribe}}" style="color: #64748b; text-decoration: underline;">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>
  `
}

export const followUp3DayEmailSubject = (name: string) =>
  `${name}, quick check-in on your guide 📚`
