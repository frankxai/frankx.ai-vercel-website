import { redirect } from "next/navigation";

export const metadata = {
  title: "Trinity AI Founder System - moved",
  description:
    "Compatibility route for the Trinity AI founder system. The practical ally system now lives at /allies/trinity-ai.",
  robots: { index: false, follow: true, nocache: true },
  alternates: { canonical: "https://frankx.ai/allies/trinity-ai" },
};

export default function TrinityAICompatibilityPage() {
  redirect("/allies/trinity-ai");
}
