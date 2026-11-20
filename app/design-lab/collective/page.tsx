import type { Metadata } from "next";
import catalog from "@/data/media/companion-collection.v2.json";
import CompanionStudio from "./CompanionStudio";

export const metadata: Metadata = {
  title: "Companion studio | FrankX",
  description:
    "Inspect the companion collection and prepare a placement brief for a website or story.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/design-lab/collective" },
};

export default function CompanionPage() {
  return <CompanionStudio catalog={catalog} />;
}
