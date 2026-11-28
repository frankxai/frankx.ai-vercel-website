import type { Metadata, Viewport } from "next";
import "@/lib/glass/tokens.css";

export const metadata: Metadata = {
  title: "Glass materials | Design lab",
  description:
    "Orbital and liquid glass as data surfaces: layered light, tier rules, and the CSS-vs-WebGL gate.",
  robots: { index: false, follow: false },
};

// The phone predicates: without viewportFit, every env(safe-area-inset-*) resolves to 0,
// and without a viewport export the layout falls back to a 980px virtual screen.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#070a10",
};

export default function GlassLabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
