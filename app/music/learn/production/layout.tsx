import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Learn Music Production | Recording, Mixing & Mastering | FrankX",
  description:
    "A free introduction to DAWs, recording, arrangement, mixing, mastering, plugins, and finishing a clearly labeled first demo.",
  path: "/music/learn/production",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
