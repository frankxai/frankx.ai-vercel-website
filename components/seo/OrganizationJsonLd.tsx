
import { siteConfig } from '@/lib/seo'
import { SCHEMA_SAME_AS } from '@/lib/social-links'

export default function OrganizationJsonLd() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        url: siteConfig.url,
        name: siteConfig.name,
        logo: `${siteConfig.url}/logo.png`,
        sameAs: SCHEMA_SAME_AS,
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
