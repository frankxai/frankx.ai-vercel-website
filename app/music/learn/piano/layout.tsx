import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Learn Piano | German-First Beginner Practice | FrankX",
  description:
    "A free German-first piano starter with an interactive keyboard, curated external teachers, first songs, and family-supported practice prompts.",
  path: "/music/learn/piano",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
