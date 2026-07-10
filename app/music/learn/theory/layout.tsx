import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Music Theory | Notes, Scales, Chords & Keys | FrankX",
  description:
    "A free visual guide to music theory fundamentals: notes, scales, chords, keys, intervals, time signatures, and practical exercises.",
  path: "/music/learn/theory",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
