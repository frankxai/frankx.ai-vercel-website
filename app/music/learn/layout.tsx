import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Learn Music Free | Theory, Instruments & Production | FrankX",
  description:
    "A free, self-paced music learning map for adults and family-supported learners: theory, notation, piano, violin, guitar, production, orchestration, and evidence-aware listening.",
  path: "/music/learn",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
