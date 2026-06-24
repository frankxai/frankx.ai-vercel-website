import { redirect } from "next/navigation";

export const metadata = {
  title: "Ana AI Business Kit - moved",
  description:
    "Compatibility route for the older Ana Intelligence System page. The practical Ana business system now lives at /allies/ana-cancino.",
  robots: { index: false, follow: true, nocache: true },
  alternates: { canonical: "https://frankx.ai/allies/ana-cancino" },
};

export default function AnaIntelligenceSystemCompatibilityPage() {
  redirect("/allies/ana-cancino");
}
