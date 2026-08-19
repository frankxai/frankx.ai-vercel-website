import { NextRequest, NextResponse } from 'next/server';
import { findContentById } from '@/lib/social/content-parser';
import { isPostizConfigured, listIntegrations, createDraft, PostizProviderSettings } from '@/lib/social/postiz';

// GET: setup helper. Returns whether Postiz is configured and, if so, the raw connected-integrations
// list — Frank reads the ids off this once and sets POSTIZ_INTEGRATION_ID_LINKEDIN / _TWITTER.
export async function GET() {
  if (!isPostizConfigured()) {
    return NextResponse.json({
      configured: false,
      message:
        'Set POSTIZ_API_KEY (and POSTIZ_API_URL if self-hosted) to enable Postiz distribution. Until then, use Copy + Open <platform> to publish manually.',
    });
  }

  try {
    const integrations = await listIntegrations();
    return NextResponse.json({
      configured: true,
      integrations,
      message:
        'Read the id off the integration you want, then set POSTIZ_INTEGRATION_ID_LINKEDIN / POSTIZ_INTEGRATION_ID_TWITTER to it.',
    });
  } catch (error) {
    return NextResponse.json({ configured: true, error: String(error) }, { status: 502 });
  }
}

// POST { id: string } — id is a content item id from GET /api/content-studio/content
// (e.g. "linkedin-my-slug"). Creates a DRAFT in Postiz for that platform's connected integration.
// Never schedules or publishes — see lib/social/postiz.ts header for why.
export async function POST(request: NextRequest) {
  if (!isPostizConfigured()) {
    return NextResponse.json(
      {
        error: 'not_configured',
        message: 'POSTIZ_API_KEY is not set. Distribution is disabled until it is — publish manually via Copy + Open <platform>.',
      },
      { status: 501 }
    );
  }

  const body = await request.json().catch(() => null);
  const id = body?.id;
  if (typeof id !== 'string' || !id) {
    return NextResponse.json({ error: 'bad_request', message: '"id" is required (a content item id from GET /api/content-studio/content).' }, { status: 400 });
  }

  const item = findContentById(id);
  if (!item) {
    return NextResponse.json({ error: 'not_found', message: `No content item with id "${id}".` }, { status: 404 });
  }

  let integrationId: string | undefined;
  let settings: PostizProviderSettings;
  if (item.platform === 'linkedin') {
    integrationId = process.env.POSTIZ_INTEGRATION_ID_LINKEDIN;
    settings = { __type: 'linkedin', post_as_images_carousel: false };
  } else if (item.platform === 'twitter') {
    integrationId = process.env.POSTIZ_INTEGRATION_ID_TWITTER;
    settings = { __type: 'x' };
  } else {
    return NextResponse.json({ error: 'unsupported_platform', message: `Postiz distribution for "${item.platform}" isn't wired yet.` }, { status: 400 });
  }

  if (!integrationId) {
    const envVar = item.platform === 'linkedin' ? 'POSTIZ_INTEGRATION_ID_LINKEDIN' : 'POSTIZ_INTEGRATION_ID_TWITTER';
    return NextResponse.json(
      { error: 'integration_not_set', message: `${envVar} is not set. Call GET this endpoint to see connected integration ids.` },
      { status: 400 }
    );
  }

  try {
    const result = await createDraft({
      integrationId,
      content: item.captionWithHashtags,
      settings,
      group: item.id,
    });
    return NextResponse.json({ success: true, draft: result });
  } catch (error) {
    return NextResponse.json({ error: 'postiz_request_failed', message: String(error) }, { status: 502 });
  }
}
