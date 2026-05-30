import type { Metadata } from 'next';
import { HubPage, buildHubMetadata } from '@/lib/rails/render-helpers';

export const metadata: Metadata = buildHubMetadata('consciousness');

export default function OnConsciousnessPage() {
  return <HubPage hub="consciousness" />;
}
