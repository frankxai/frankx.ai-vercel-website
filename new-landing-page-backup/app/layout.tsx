import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FrankX.AI | Where Enterprise AI Meets Your Creative Soul",
  description: "From Oracle AI architect to AI music creator - empowering generative creators through soul-aligned technology. Discover your creative operating system.",
  keywords: ["AI", "Generative Creator", "AI Music", "Enterprise AI", "Creative Technology", "Soul-Aligned AI"],
  authors: [{ name: "FrankX" }],
  openGraph: {
    title: "FrankX.AI | Where Enterprise AI Meets Your Creative Soul",
    description: "Empowering generative creators through soul-aligned technology",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
