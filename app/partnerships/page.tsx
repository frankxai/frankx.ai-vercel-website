import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { listActivePartners, listOpenOpportunities, listStrategicAlignment } from '@/content/partnerships';
import { cloudflareProgramme, listTechnologyAffiliates } from '@/content/partnerships/technology';
import type { Partner } from '@/content/partnerships/types';
import { MEET_AND_GROW_URL } from '@/lib/cta-links';
import { createMetadata, siteConfig } from '@/lib/seo';
import s from './partnerships.module.css';
export const metadata = createMetadata({
    title: 'Partnerships and applied work',
    description: 'Build with Frank Riemer: AI architecture, workshops and creative work. Explore current programme relationships, affiliate partners and independent proposals.',
    path: '/partnerships',
});
const routes = [
    { title: 'Build a useful system', text: 'Bring a product idea or an architecture decision. Work through the tradeoffs and define a prototype worth testing.', href: '/ai-architecture', action: 'Explore architecture', row: 2, name: 'Brio' },
    { title: 'Learn by making', text: 'Turn a workshop into something people can inspect, change and use after the room empties.', href: '/workshops', action: 'Explore workshops', row: 1, name: 'Nilo' },
    { title: 'Ask a better question', text: 'Connect a research question to sources, a practical experiment and an honest account of what remains uncertain.', href: '/research', action: 'Explore research', row: 3, name: 'Riff' },
] as const;
function Crew({ row, column = 0, name }: {
    row: number;
    column?: number;
    name: string;
}) {
    return <span role="img" aria-label={name} className={s.crew} style={{ '--crew-x': `${column * 100 / 3}%`, '--crew-y': `${row * 100 / 3}%` } as CSSProperties}/>;
}
function External({ href, children, className = '', sponsored = false }: {
    href: string;
    children: ReactNode;
    className?: string;
    sponsored?: boolean;
}) {
    return <a href={href} target="_blank" rel={sponsored ? 'sponsored noopener noreferrer' : 'noopener noreferrer'} className={className}>{children}<ArrowUpRight size={16} aria-hidden="true"/><span className={s.srOnly}> (opens in a new tab)</span></a>;
}
export default function PartnershipsHubPage() {
    const proposals = [...listActivePartners(), ...listStrategicAlignment(), ...listOpenOpportunities()];
    const affiliates = listTechnologyAffiliates();
    const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Partnerships', item: `${siteConfig.url}/partnerships` }] };
    const structuredData = {
        '@context': 'https://schema.org', '@type': 'CollectionPage',
        name: 'FrankX partnerships and applied work', url: `${siteConfig.url}/partnerships`,
        hasPart: proposals.map(partner => ({ '@type': 'WebPage', name: partner.name, url: `${siteConfig.url}/partnerships/${partner.slug}` })),
    };
    return <main className={s.root}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumb, structuredData]) }}/>
    <section className={`${s.section} ${s.hero}`} aria-labelledby="partnership-title">
      <div className={s.topline}><Link href="/connect">Frank Riemer <span> / AI Architect</span></Link><span>Partnerships &amp; applied work</span></div>
      <div className={s.heroGrid}>
        <div className={s.heroCopy}>
          <h1 id="partnership-title">What can we<br />build together?</h1>
          <p className={s.lead}>A useful prototype. A workshop that stays with people. A question worth researching.</p>
          <p className={s.intro}>I bring enterprise workshop experience and the systems I build through FrankX and Starlight Intelligence. You bring the problem, the perspective and the people it matters to.</p>
          <div className={s.actions}>
            <Link href="/contact?intent=partnership" className={s.primary}>
              Discuss a partnership <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <External href="https://github.com/frankxai/frankx.ai-vercel-website/issues/1297" className={s.textLink}>
              See open partner briefs
            </External>
          </div>
          <div className={s.founderNote}><Crew row={0} column={2} name="Mini Frank, the original illustrated founder"/><p>Human judgment.<br /><strong>Room for imagination.</strong></p></div>
        </div>
        <figure className={s.heroFigure}>
          <div className={s.photo}><Image src="/images/oracle-events/oracle-workshop-P1081706.jpg" alt="Frank Riemer facilitating an enterprise workshop beside a flip chart" fill preload sizes="(max-width: 767px) 100vw, 48vw" className={s.heroImage}/><div className={s.photoCaption}><span>From a real room</span><strong>Ideas become useful<br />when people work on them.</strong></div></div>
          <figcaption>Enterprise workshop, 2024 · During my former Oracle role.</figcaption>
        </figure>
      </div>
      <nav className={s.sectionNav} aria-label="On this page"><a href="#documented-work">Ways to collaborate <ArrowRight size={14} aria-hidden="true"/></a><a href="#technology-partners">Technology &amp; creator partners <ArrowRight size={14} aria-hidden="true"/></a><a href="#platform-proposals">Platform proposals <ArrowRight size={14} aria-hidden="true"/></a></nav>
    </section>
    <section id="documented-work" className={s.section} aria-labelledby="work-title">
      <header className={s.sectionHeading}><h2 id="work-title">A starting point<br />for the work.</h2><p>Choose the question that brings us together. We agree the scope, make the work inspectable and leave something the team can carry forward.</p></header>
      <div className={s.workRows}>{routes.map(route => <article className={s.workRow} key={route.href}><div className={s.character}><Crew row={route.row} column={1} name={`${route.name}, original crew illustration`}/></div><div><h3>{route.title}</h3><p>{route.text}</p></div><Link href={route.href} className={s.textLink}>{route.action}<ArrowUpRight size={17} aria-hidden="true"/></Link></article>)}</div>
      <p className={s.smallNote}>Mini Frank, Nilo, Brio and Riff are the original illustrated crew. Frank owns the relationship and the result.</p>
    </section>
    <section id="technology-partners" className={`${s.section} ${s.partnerSection}`} aria-labelledby="partners-title">
      <header className={s.sectionHeading}><h2 id="partners-title">Technology &amp;<br />creator partners.</h2><p>Programme support and affiliate relationships across the tools that make building and creating possible. Each relationship is labeled below.</p></header>
      <article className={s.cloudflare}>
        <div className={s.cloudflareIntro}><div className={s.programmeLabel}>Startup programme</div><h3>Cloudflare<span>®</span></h3><p>{cloudflareProgramme.description}</p><External href={cloudflareProgramme.href} className={s.textLink}>Cloudflare for Startups</External></div>
        <div className={s.cloudflareDetail}><p className={s.status}>{cloudflareProgramme.status}</p><div className={s.products}>{cloudflareProgramme.products.map(product => <External key={product.name} href={product.href} className={s.product}><span><strong>{product.name}</strong><small>{product.description}</small></span></External>)}</div><p className={s.smallNote}>Programme member: Starlight Intelligence. Product links explain the platform; they are not claims of joint delivery or endorsement.</p></div>
      </article>
      <p className={s.disclosure}>Affiliate links below may earn FrankX a commission when you purchase. <Link href="/partners">Read the disclosure policy <ArrowUpRight size={13} aria-hidden="true"/></Link></p>
      <div className={s.affiliates}>{affiliates.map(partner => <article className={s.affiliate} key={partner.id}>
        <div className={s.logoStage}><Image src={partner.logo} width={partner.width} height={partner.height} alt={partner.name} className={s.wordmark}/></div>
        <span className={s.status}>Affiliate partner</span><h3>{partner.title}</h3><p>{partner.description}</p>
        <details className={s.details}><summary>About this relationship <Plus size={15} aria-hidden="true"/></summary><p>{partner.detail}</p><p>Affiliate programme confirmed. Link record checked {partner.verifiedOn}. Recommendations remain Frank&apos;s own.</p></details>
        {partner.href && <External href={partner.href} className={s.partnerLink} sponsored>Explore {partner.name}<span className={s.srOnly}> (affiliate link)</span></External>}
      </article>)}</div>
      <p className={s.smallNote}>Cloudflare and Cloudflare Workers are trademarks and/or registered trademarks of Cloudflare, Inc. Other names and logos belong to their respective owners.</p>
    </section>
    <section id="platform-proposals" className={s.section} aria-labelledby="proposals-title">
      <header className={s.sectionHeading}><h2 id="proposals-title">Ideas for<br />working together.</h2><p>Independent briefs about platforms and possible collaborations. These proposals are separate from the confirmed programme and affiliate relationships above.</p></header>
      <div className={s.proposals}>{proposals.map(partner => <ProposalRow key={partner.slug} partner={partner}/>)}</div>
    </section>
    <section className={`${s.section} ${s.close}`} aria-labelledby="conversation-title"><div><h2 id="conversation-title">Bring the question.<br />Let&apos;s shape the work.</h2><p>A first conversation to compare perspectives, find a useful starting point and decide what is worth doing together.</p><External href={MEET_AND_GROW_URL} className={s.primary}>Meet &amp; grow</External></div><div className={s.closeCrew}><Crew row={0} column={3} name="Mini Frank listening"/><span>Frank Riemer<br /><strong>Founder · AI Architect</strong></span></div></section>
  </main>;
}
function ProposalRow({ partner }: {
    partner: Partner;
}) {
    const status = partner.status === 'in-conversation' ? 'Exploratory conversation' : 'Independent proposal';
    return <Link href={`/partnerships/${partner.slug}`} className={s.proposal}><div className={s.proposalName}>{partner.partnerLogoUrl && <Image src={partner.partnerLogoUrl} alt="" width={32} height={32} className={`${s.proposalLogo} ${partner.slug === 'arrow' ? s.wideLogo : ''}`}/>}<h3>{partner.name}</h3></div><p>{partner.tagline}</p><span className={s.proposalStatus}>{status}<small>No formal partnership implied</small></span><ArrowUpRight size={19} aria-hidden="true"/></Link>;
}
