import type { Metadata } from 'next';
import { HubPage, buildHubMetadata } from '@/lib/rails/render-helpers';

export const metadata: Metadata = buildHubMetadata('reality');

export default function OnRealityPage() {
  return <HubPage hub="reality" />;
}
