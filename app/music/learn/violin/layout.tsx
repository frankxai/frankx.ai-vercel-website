import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Learn Violin | German-First Beginner Practice | FrankX",
  description:
    "A free German-first violin orientation with curated external teachers, first pieces, and family-supported practice prompts.",
  path: "/music/learn/violin",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
