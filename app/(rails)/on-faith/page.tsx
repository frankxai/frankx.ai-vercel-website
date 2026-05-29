import type { Metadata } from 'next';
import { HubPage, buildHubMetadata } from '@/lib/rails/render-helpers';

export const metadata: Metadata = buildHubMetadata('faith');

export default function OnFaithPage() {
  return <HubPage hub="faith" />;
}
