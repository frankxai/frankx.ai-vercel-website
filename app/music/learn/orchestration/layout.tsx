import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Learn Orchestration | Arrange, Score & Study Texture | FrankX",
  description:
    "A free orchestration guide to instrument families, balance, voicing, texture, score study, and responsible use of composition tools.",
  path: "/music/learn/orchestration",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
