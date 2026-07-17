import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Learn Guitar | Beginner Chords, Practice & Resources | FrankX",
  description:
    "A free beginner guitar guide to open chords, strumming, practice structure, first songs, external resources, and responsible AI tool use.",
  path: "/music/learn/guitar",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
