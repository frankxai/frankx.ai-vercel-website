import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Music, Sound & Evidence | Research and Claim Boundaries | FrankX",
  description:
    "An evidence-aware guide to music, listening, practice, tuning, hearing safety, and the limits of frequency and health claims.",
  path: "/music/learn/science",
  keywords: [
    "music science brain",
    "Hz frequency music",
    "binaural beats",
    "music frequency evidence",
    "music neuroscience",
    "safe listening",
    "music health claims",
    "standard musical pitch",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
