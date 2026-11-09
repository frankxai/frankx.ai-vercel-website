/**
 * GET /api/v1/me — viewer.v1 for FrankX.
 *
 * The session is the admin NextAuth session; this route never accepts a user
 * id from the query or body. FrankX has no customer subscription plan, so the
 * adapter reports `paid: false` and lists one-time product offers with their
 * checkout readiness. No Stripe call is made.
 */

import { NextResponse } from "next/server";
import type { Session } from "next-auth";
import { auth } from "@/lib/auth";
import { buildAdminViewer, offersFromEnv } from "@/lib/viewer-contract";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRIVATE_HEADERS = {
  "Cache-Control": "private, no-store",
  "Referrer-Policy": "no-referrer",
};

function privateJson(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: PRIVATE_HEADERS });
}

export async function GET() {
  let session: Session | null;
  try {
    session = await auth();
  } catch {
    return privateJson(
      { error: "Authentication is unavailable.", code: "auth_unavailable" },
      503,
    );
  }

  const email = session?.user?.email;

  if (!session?.user || !email) {
    return privateJson({ error: "Unauthorized.", code: "unauthorized" }, 401);
  }

  const id =
    (session.user as { id?: string }).id ??
    email;

  return privateJson(
    buildAdminViewer({
      user: { id, email },
      offers: offersFromEnv(process.env),
    }),
  );
}
