import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "How to Read Sheet Music | Free Notation Guide | FrankX",
  description:
    "Learn how to read sheet music from scratch. Visual guide covering the staff, clefs, note values, time signatures, key signatures, dynamics, and common symbols.",
  path: "/music/learn/reading",
  keywords: [
    "how to read sheet music",
    "learn music notation",
    "sheet music for beginners",
    "treble clef notes",
    "bass clef notes",
    "note values",
    "time signatures explained",
    "key signatures",
    "music reading guide",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
