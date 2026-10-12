import { workflowHtml } from "@/lib/education/workflow-html";

// A focused public learning document: no account, site-wide media or runtime AI.
export const dynamic = "force-static";

export function GET() {
  return new Response(workflowHtml(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
}
