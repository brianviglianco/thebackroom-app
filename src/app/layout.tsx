import type { Metadata, Viewport } from 'next';
import { Fraunces, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from '@/components/Analytics';

// Font configurations
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

// Metadata
export const metadata: Metadata = {
  title: {
    default: 'The Backroom — FM Tactics Rated by the Community',
    template: '%s | The Backroom',
  },
  description:
    'Find the right Football Manager tactic for your save. Structured reviews with win rates, team context, and match data from real saves. Not hype — evidence.',
  keywords: [
    'Football Manager',
    'FM26',
    'FM tactics',
    'FM25',
    'tactics',
    'formations',
    'Football Manager tactics',
    'FM community',
  ],
  authors: [{ name: 'The Backroom' }],
  creator: 'The Backroom',
  publisher: 'The Backroom',
  metadataBase: new URL('https://thebackroom.fm'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thebackroom.fm',
    siteName: 'The Backroom',
    title: 'The Backroom — FM Tactics Rated by the Community',
    description:
      'Find the right Football Manager tactic for your save. Structured reviews with win rates, team context, and match data from real saves.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Backroom — FM Tactics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Backroom — FM Tactics Rated by the Community',
    description:
      'Find the right Football Manager tactic for your save. Structured reviews with win rates, team context, and match data.',
    creator: '@thebackroomfm',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#100E0C',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
