'use client';

import Navigation from '@/components/Navigation';
import RevampHero from '@/components/mockups/revamp/RevampHero';
import TrustBar from '@/components/mockups/revamp/TrustBar';
import RevampExplore from '@/components/mockups/revamp/RevampExplore';
import SocialProof from '@/components/mockups/revamp/SocialProof';
import RevampFooter from '@/components/mockups/revamp/RevampFooter';

export default function RevampMockup() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Mockup banner */}
      <div className="fixed top-[54px] left-0 right-0 z-[99] bg-[rgba(196,135,90,0.12)] border-b border-[rgba(196,135,90,0.2)] backdrop-blur-[8px]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-2 flex items-center justify-between">
          <div className="font-mono text-[10px] md:text-[11px] text-copper tracking-[0.06em]">
            MOCKUP: Full Homepage Revamp (lean &amp; focused)
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="font-mono text-[10px] text-cream-muted transition-colors duration-300 hover:text-copper">
              Original →
            </a>
          </div>
        </div>
      </div>

      <Navigation />

      {/* Extra top padding for mockup banner */}
      <div className="h-[36px]" />

      <RevampHero />
      <TrustBar />
      <RevampExplore />

      {/* Spacing before Social Proof */}
      <div className="h-[48px] md:h-[72px]" />

      <SocialProof />

      {/* Spacing before Footer */}
      <div className="h-[40px] md:h-[64px]" />

      <RevampFooter />
    </main>
  );
}
