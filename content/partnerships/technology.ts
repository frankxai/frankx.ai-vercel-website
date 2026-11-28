import programs from '@/data/affiliate/programs.json';
import { resolveProgramDestination } from '@/lib/affiliates/resolve-destination';
// Editorial context only. Issued links and programme status belong to the affiliate registry.
const contexts = [
    { id: 'elevenlabs', title: 'Give the work a voice.', description: 'Speech, narration and audio tools for bringing written work to listeners.', logo: '/images/partnerships/logos/elevenlabs-official.svg', width: 158, height: 24, detail: 'Explore text-to-speech, voice tools and dubbing. Use voices you have permission to use.' },
    { id: 'apify', title: 'Start with better sources.', description: 'Web data collection and browser automation for research and useful workflows.', logo: '/images/partnerships/logos/apify-wordmark.svg', width: 98, height: 28, detail: 'Explore tools for collecting and structuring web data. Check access rights and source quality for each project.' },
    { id: 'riverside', title: 'Make the conversation travel.', description: 'Recording and editing tools for interviews, workshops and creator-led stories.', logo: '/images/partnerships/logos/riverside.svg', width: 142, height: 28, detail: 'Explore remote recording, editing and clips. Agree recording and publication permissions with participants.' },
] as const;
export function listTechnologyAffiliates() {
    return contexts.flatMap(context => {
        const program = programs.programs.find(entry => entry.id === context.id);
        if (!program || program.status !== 'active')
            return [];
        const destination = resolveProgramDestination(context.id, programs.programs);
        return [{ ...context, name: program.tool, href: destination?.href ?? program.officialUrl, verifiedOn: program.verifiedOn }];
    });
}
export const cloudflareProgramme = {
    status: 'Cloudflare for Startups participant',
    member: 'Starlight Intelligence',
    confirmedOn: '2026-11-17',
    description: 'Starlight Intelligence participates in Cloudflare for Startups, with programme credits supporting its development work.',
    href: 'https://www.cloudflare.com/startups/',
    products: [
        { name: 'Workers', description: 'Application compute', href: 'https://developers.cloudflare.com/workers/' },
        { name: 'R2', description: 'Object storage', href: 'https://developers.cloudflare.com/r2/' },
        { name: 'Workers AI', description: 'Model inference', href: 'https://developers.cloudflare.com/workers-ai/' },
    ],
} as const;
