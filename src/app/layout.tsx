import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Backroom - Football Manager tactics, rated and reviewed by the community.",
  description: "Find the right Football Manager tactic for your save. Structured reviews with win rates, team context, and match data from real saves. Not hype — evidence.",
  keywords: ["Football Manager", "FM tactics", "FM26", "FM25", "tactics", "formations", "counter attack", "possession"],
  authors: [{ name: "The Backroom" }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.svg',
  },
  openGraph: {
    title: "The Backroom - Football Manager tactics, rated and reviewed by the community.",
    description: "Find the right Football Manager tactic for your save. Structured reviews with win rates, team context, and match data from real saves.",
    url: "https://thebackroom.fm",
    siteName: "The Backroom",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Backroom - Football Manager tactics, rated and reviewed by the community.",
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
