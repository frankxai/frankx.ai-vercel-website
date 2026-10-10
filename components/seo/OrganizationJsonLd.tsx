
import { siteConfig } from '@/lib/seo'
import { SCHEMA_SAME_AS, SOCIAL_PROFILES } from '@/lib/social-links'

export default function OrganizationJsonLd() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        url: siteConfig.url,
        name: siteConfig.name,
        legalName: 'FrankX',
        logo: `${siteConfig.url}/logo.png`,
        description: siteConfig.description,
        sameAs: SCHEMA_SAME_AS,
        founder: {
            '@type': 'Person',
            '@id': `${siteConfig.url}/#frank-riemer`,
            name: 'Frank Riemer',
            jobTitle: 'AI Architect',
            worksFor: {
                '@type': 'Organization',
                name: 'Oracle EMEA AI Center of Excellence',
            },
            sameAs: [
                SOCIAL_PROFILES.linkedin.url,
                SOCIAL_PROFILES.x.url,
                SOCIAL_PROFILES.github.url,
                SOCIAL_PROFILES.suno.url,
                SOCIAL_PROFILES.youtube.url,
            ],
        },
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'hello@frankx.ai',
            contactType: 'customer support',
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
