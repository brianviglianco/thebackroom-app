import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Backroom — FM Tactics Rated by the Community",
  description: "Find the right Football Manager tactic for your save. Structured reviews with win rates, team context, and match data from real saves. Not hype — evidence.",
  keywords: ["Football Manager", "FM tactics", "FM26", "FM25", "tactics", "formations", "counter attack", "possession"],
  authors: [{ name: "The Backroom" }],
  openGraph: {
    title: "The Backroom — FM Tactics Rated by the Community",
    description: "Find the right Football Manager tactic for your save. Structured reviews with win rates, team context, and match data from real saves.",
    url: "https://thebackroom.fm",
    siteName: "The Backroom",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Backroom — FM Tactics Rated by the Community",
    description: "Find the right Football Manager tactic for your save.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
