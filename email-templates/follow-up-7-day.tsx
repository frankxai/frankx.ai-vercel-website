// 7-Day Follow-up Email Template

interface FollowUp7DayEmailProps {
  name: string
  pdfTitle: string
  guideSlug: string
}

export function FollowUp7DayEmail({ name, pdfTitle, guideSlug }: FollowUp7DayEmailProps) {
  const getAdvancedTips = (slug: string) => {
    const tips = {
      'soulbook-guide': [
        {
          title: 'Automate Your Reflection Practice',
          description: 'Use Claude to help process daily insights and track patterns in your creative journey.'
        },
        {
          title: 'Create Custom Life Book Templates',
          description: 'Build personalized frameworks that match your unique creative process and goals.'
        },
        {
          title: 'Join the Realm Community',
          description: 'Connect with other creators implementing Soulbook principles and share breakthroughs.'
        }
      ],
      'vibe-os-guide': [
        {
          title: 'Chain Multiple AI Tools',
          description: 'Combine Suno with other AI tools to create complete production workflows.'
        },
        {
          title: 'Monetize Your AI Music',
          description: 'Learn the legal frameworks and platforms for commercializing AI-generated tracks.'
        },
        {
          title: 'Build Your Signature Sound',
          description: 'Develop consistent prompting patterns that create your unique sonic identity.'
        }
      ]
    }
    return tips[slug as keyof typeof tips] || tips['soulbook-guide']
  }

  const advancedTips = getAdvancedTips(guideSlug)

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Advanced Tips for ${pdfTitle}</title>
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
        Ready to Level Up? 🚀
      </h1>

      <p style="font-size: 16px; color: #94a3b8; line-height: 1.6; margin: 0 0 16px 0;">
        Hey ${name},
      </p>

      <p style="font-size: 16px; color: #94a3b8; line-height: 1.6; margin: 0 0 16px 0;">
        You've had the <strong style="color: white;">${pdfTitle}</strong> for a week now. Whether you've implemented everything or just getting started, I want to share some advanced techniques that most creators miss.
      </p>

      <p style="font-size: 16px; color: #94a3b8; line-height: 1.6; margin: 0 0 24px 0;">
        These are the frameworks that took me from "this is cool" to "this is transforming my entire creative practice."
      </p>
    </div>

    <!-- Advanced tips -->
    <div style="margin-bottom: 32px;">
      <h2 style="font-size: 22px; font-weight: 600; color: white; margin: 0 0 24px 0;">
        ⚡ Advanced Techniques
      </h2>

      ${advancedTips.map((tip, index) => `
        <div style="background: linear-gradient(to bottom, #111827, #0a0f1e); border: 1.5px solid rgba(147, 51, 234, 0.2); border-radius: 16px; padding: 24px; margin-bottom: 16px;">
          <h3 style="font-size: 18px; font-weight: 600; color: white; margin: 0 0 12px 0;">
            ${index + 1}. ${tip.title}
          </h3>
          <p style="font-size: 15px; color: #94a3b8; line-height: 1.6; margin: 0;">
            ${tip.description}
          </p>
        </div>
      `).join('')}
    </div>

    <!-- Story section -->
    <div style="background: rgba(6, 182, 212, 0.05); border-left: 4px solid #06b6d4; padding: 24px; margin-bottom: 32px; border-radius: 0 12px 12px 0;">
      <p style="font-size: 15px; color: #94a3b8; line-height: 1.7; margin: 0 0 16px 0; font-style: italic;">
        "When I first started, I treated AI tools like fancy calculators. Push button, get output.
      </p>
      <p style="font-size: 15px; color: #94a3b8; line-height: 1.7; margin: 0 0 16px 0; font-style: italic;">
        But the real magic happens when you build SYSTEMS. When your tools talk to each other. When your creative process becomes a flywheel that compounds daily.
      </p>
      <p style="font-size: 15px; color: #94a3b8; line-height: 1.7; margin: 0; font-style: italic;">
        That's what these advanced techniques unlock."
      </p>
      <p style="font-size: 14px; color: #22d3ee; margin: 16px 0 0 0; font-weight: 600;">
        — Frank
      </p>
    </div>

    <!-- Next level CTA -->
    <div style="background: linear-gradient(135deg, #06b6d4 10%, #9333ea 100%); border-radius: 16px; padding: 32px; text-align: center; margin-bottom: 32px;">
      <h2 style="font-size: 24px; font-weight: 700; color: white; margin: 0 0 16px 0;">
        Want to Go Even Deeper?
      </h2>
      <p style="font-size: 16px; color: rgba(255, 255, 255, 0.9); line-height: 1.6; margin: 0 0 24px 0;">
        Join the FrankX Realm—an exclusive community of creators mastering AI-powered transformation.
      </p>
      <a href="https://frankx.ai/realm"
         style="display: inline-block; padding: 16px 32px; background: white; color: #0a0f1e; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);">
        Explore the Realm →
      </a>
      <p style="font-size: 13px; color: rgba(255, 255, 255, 0.7); margin: 16px 0 0 0;">
        Monthly workshops • Private community • Advanced frameworks
      </p>
    </div>

    <!-- P.S. Section -->
    <div style="padding: 24px; margin-bottom: 32px;">
      <p style="font-size: 14px; color: #94a3b8; line-height: 1.6; margin: 0 0 8px 0;">
        <strong style="color: white;">P.S.</strong> Stuck on something specific? Hit reply and describe your challenge. I personally respond to every email (usually within 24 hours).
      </p>
      <p style="font-size: 14px; color: #64748b; margin: 0;">
        Seriously. Try me. 😊
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
      <p style="font-size: 12px; color: #64748b; margin: 0 0 16px 0;">
        <strong style="color: #94a3b8;">Frank Riemer</strong><br>
        AI Architect at Oracle | Creator<br>
        500+ AI songs | Enterprise AI Systems
      </p>

      <div style="margin: 16px 0;">
        <a href="https://frankx.ai" style="color: #22d3ee; text-decoration: none; font-size: 14px; margin: 0 12px;">
          frankx.ai
        </a>
        <span style="color: #64748b;">|</span>
        <a href="https://x.com/frankxeth" style="color: #22d3ee; text-decoration: none; font-size: 14px; margin: 0 12px;">
          X
        </a>
        <span style="color: #64748b;">|</span>
        <a href="https://www.linkedin.com/in/frank-x-riemer/" style="color: #22d3ee; text-decoration: none; font-size: 14px; margin: 0 12px;">
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

export const followUp7DayEmailSubject = (name: string) =>
  `${name}, ready for the advanced techniques? ⚡`
