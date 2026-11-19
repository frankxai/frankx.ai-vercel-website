import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import s from './amsterdam-lab.module.css'

export const labBriefs = [
  {
    id: 'water', title: 'Which canal rules apply here?', discipline: 'Waterways · sustainable mobility',
    task: 'A resident points to a stretch of canal. Can a student-built guide find the relevant published boating zone and show exactly what the map establishes?',
    deliverable: 'A source-linked map reader, a dated data snapshot and a set of boundary cases another team can replay.',
    data: 'Use the city’s published water-zone geometries and record the version. Check reuse terms before distributing extracts. Questions about water quality or flood risk require different evidence.',
    review: 'A reviewer checks location, source and justified abstentions against the same map used by a human reader.',
  },
  {
    id: 'music', title: 'Can listeners hear the brief?', discipline: 'Music · authorship · listening research',
    task: 'A local musician supplies an original loop and a creative brief. Two teams arrange it with the same time budget, one with AI assistance. Listeners hear both in random order.',
    deliverable: 'Two consent-cleared excerpts, a contribution sheet and an anonymised account of which choices listeners recognised.',
    data: 'Use performer-approved stems. Agree credit, reuse and withdrawal before recording. Keep unpublished stems out of third-party tools unless the musician opts in.',
    review: 'Can listeners identify the intended musical change? Score fidelity to the brief separately from taste, editing time and artist preference.',
  },
  {
    id: 'economics', title: 'What does one accepted job cost?', discipline: 'Labour economics · AI adoption',
    task: 'An Amsterdam business supplies a synthetic service request and an acceptance rubric. Students compare a conventional workflow with an agent-assisted one on matched requests.',
    deliverable: 'A replayable workflow and a unit-cost sheet counting human review, corrections, model calls and rejected work.',
    data: 'Synthetic orders, an agreed hourly labour assumption and metered usage. Price donated credits at replacement cost as well as cash paid.',
    review: 'Divide total delivery cost by accepted jobs. Report errors and who absorbed the rework. Zero accepted jobs means the service is not ready to price.',
  },
] as const

export function CampusMap() {
  return <figure className={s.map}>
    <div className={s.mapTop}><span>Amsterdam</span><span>Proposed collaboration</span></div>
    <svg viewBox="0 0 440 294" role="img" aria-label="Faculty frame a question, city practitioners supply a case and founders mentor. Student teams at the campus build and hand work to independent reviewers.">
      <g fill="none" stroke="currentColor" opacity=".13">
        {[0, 1, 2, 3, 4, 5, 6].map(i => <path key={i} transform={`translate(${i * 14} ${-i * 9})`} d="M-90 170Q20 20 116 4Q223 -18 265 46T473 43 M-10 370Q95 213 197 228T490 154" />)}
      </g>
      <g fill="none" strokeWidth="2.6">
        <path stroke="#9abdf6" d="M23 66H121Q136 66 148 82L195 144Q207 159 224 159H242" />
        <path stroke="#eabe81" d="M23 143H118Q141 143 160 151L181 160Q196 166 217 166H242" />
        <path stroke="#b5a9ed" d="M23 222H109Q127 222 140 208L168 182Q180 172 203 172H242" />
        <path stroke="#f5efe2" d="M242 166H286Q299 166 311 152L342 118Q353 106 370 106H416 M242 166H286Q301 166 313 182L341 215Q353 228 370 228H416" />
      </g>
      <g strokeWidth="2" fill="#142031">
        <circle cx="24" cy="66" r="5" stroke="#9abdf6"/><circle cx="24" cy="143" r="5" stroke="#eabe81"/><circle cx="24" cy="222" r="5" stroke="#b5a9ed"/>
        <circle cx="242" cy="166" r="16" stroke="#ede4d0"/><circle cx="242" cy="166" r="6" fill="#ede4d0"/>
        <circle cx="415" cy="106" r="5" stroke="#ede4d0"/><circle cx="415" cy="228" r="5" stroke="#ede4d0"/>
      </g>
      <g className={s.mapText} fill="#f5f1e9">
        <text x="23" y="53">Faculty</text><text x="23" y="130">City practitioners</text><text x="23" y="209">AI founders</text>
        <text x="242" y="124" textAnchor="middle">Campus lab</text>
        <text x="418" y="90" textAnchor="end">Peer review</text><text x="418" y="253" textAnchor="end">Field trial</text>
      </g>
    </svg>
    <figcaption>Students build at the centre. Faculty set the standard of evidence. A field trial needs a willing local host.</figcaption>
  </figure>
}

const brands = [
  ['OpenAI', '/images/logos/openai.svg', 'Customer', 'ChatGPT in Frank’s working practice.', 'https://openai.com/'],
  ['Anthropic', 'anthropic', 'Past event credits', 'Claude credits received through an Amsterdam builder event.', 'https://www.anthropic.com/'],
  ['Supabase', 'supabase', 'Event ecosystem', 'Frank participated in the Claude × Supabase build event in Amsterdam.', 'https://supabase.com/'],
  ['xAI / Grok', 'grok', 'Model evaluation', 'A model Frank explores for comparison across providers.', 'https://grok.com/'],
  ['ElevenLabs', 'elevenlabs', 'Affiliate member', 'Frank can earn referral commissions. A candidate for consent-based audio work.', 'https://elevenlabs.io/affiliates'],
  ['Cloudflare', 'cloudflare', 'Startup programme', 'Starlight received infrastructure credits through Cloudflare for Startups.', 'https://www.cloudflare.com/forstartups/'],
] as const

export function ProviderRelationships() {
  return <section className={s.panel}>
    <p className={s.kicker}>Technology relationships</p>
    <h3>Who Frank works with, and how</h3>
    <p className={s.deck}>These are relationships from Frank’s own practice. Campus sponsorship, student accounts and credit allocations would each need a fresh agreement.</p>
    <div className={s.providers}>{brands.map(([name, logo, role, note, url]) =>
      <article key={name}>
        <div className={s.providerLine}><Image src={logo.startsWith('/') ? logo : `/images/partnerships/uva-rec-impact/${logo}.svg`} alt="" width={26} height={26} unoptimized className={s.logo}/>
        <a href={url}>{name} <ArrowUpRight size={14} aria-hidden="true"/></a></div>
        <span className={s.role}>{role}</span><p>{note}</p>
      </article>)}</div>
    <p className={s.note}>All provider links here go directly to their sites. The academic lead chooses tools and controls assessment.</p>
  </section>
}

export function EvaluationPlate() {
  return <figure className={s.plate}>
    <figcaption><span className={s.kicker}>Evaluation design</span><strong>Does assistance improve the water-zone answer?</strong></figcaption>
    <div className={s.source}>One dated city map · matched location questions</div>
    <div className={s.arms}><div><small>Condition A</small><b>Read the map</b><span>Human lookup and citation</span></div>
      <div><small>Condition B</small><b>Ask the assistant</b><span>Human verification and correction</span></div></div>
    <div className={s.verdict}><strong>Blind review of both answer sets</strong><span>Supported answers · review minutes · cost per accepted answer</span></div>
    <p>Counterbalance task order. Include points near zone boundaries and questions the map cannot answer. Record the model version and repeat failures on the saved snapshot.</p>
    <a href="https://api.data.amsterdam.nl/v1/docs/datasets/water.html">Inspect Amsterdam’s water dataset <ArrowUpRight size={14} aria-hidden="true"/></a>
  </figure>
}

export function ConveningPlan() {
  return <section className={s.panel}>
    <p className={s.kicker}>From a campus session to a field trial</p><h3>Give each participant a decision to own</h3>
    <div className={s.agenda}>
      <article><h4>Before the room opens</h4><p>Frank invites Amsterdam AI founders and one practitioner to bring a real question. The REC contact identifies a course or supervisor. Faculty and students agree the learning goal, data rights and what would count as a useful failure.</p></article>
      <article><h4>Inside the workshop</h4><p>Frank and a provider event manager could co-design a 90-minute build. Ask for a technical mentor, expiring team credits and a named support contact. Agree a per-team cap and a no-credit route using a saved model response before announcing seats.</p></article>
      <article><h4>At the review</h4><p>Students hand their prototype to another team to reproduce. A business or civic host decides whether to test it in context. Invited investors can challenge costs and demand assumptions after academic assessment. Teams choose whether to meet them.</p></article>
    </div>
    <details className={s.funding}><summary>What would justify funding a second round?</summary>
      <p>Bring a replication record, a named beneficiary and a host willing to supply staff time. Price facilitation, accessibility, participant support and compute separately. The organiser records each contribution as requested, pledged or received.</p>
      <p>For a larger study, an academic lead and the university research-support team can screen a specific EU call for eligibility, consortium, co-financing, timeline and publication terms. Pursue a bid only when the question and eligible costs fit. A sponsor may support venue, mentoring or credits through a written offer.</p>
      <div className={s.links}><a href="https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/home">EU Funding &amp; Tenders Portal ↗</a><a href="https://ai4business.uva.nl/">UvA AI4Business data challenges ↗</a></div>
    </details>
  </section>
}
