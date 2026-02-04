'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroRefinedCTA from '@/components/mockups/HeroRefinedCTA';
import FilterCard from '@/components/FilterCard';
import ResultsGrid from '@/components/ResultsGrid';
import BadgeGuide from '@/components/mockups/BadgeGuide';
import StaffPicks from '@/components/StaffPicks';
import Community from '@/components/Community';
import NewsletterCompact from '@/components/mockups/NewsletterCompact';
import Footer from '@/components/Footer';

export default function ClarityPolishMockup() {
  const [resultsExpanded, setResultsExpanded] = useState(false);

  return (
    <main className="min-h-screen bg-bg">
      {/* Mockup banner */}
      <div className="fixed top-[54px] left-0 right-0 z-[99] bg-[rgba(196,135,90,0.12)] border-b border-[rgba(196,135,90,0.2)] backdrop-blur-[8px]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-2 flex items-center justify-between">
          <div className="font-mono text-[10px] md:text-[11px] text-copper tracking-[0.06em]">
            MOCKUP 3: CTA Polish &amp; Badge Clarity &amp; Compact Newsletter
          </div>
          <div className="flex items-center gap-3">
            <a href="/mockup/trust-signals" className="font-mono text-[10px] text-cream-faint transition-colors duration-300 hover:text-copper">M1</a>
            <a href="/mockup/review-structure" className="font-mono text-[10px] text-cream-faint transition-colors duration-300 hover:text-copper">M2</a>
            <a href="/mockup/revamp" className="font-mono text-[10px] text-cream-faint transition-colors duration-300 hover:text-copper">Revamp</a>
            <span className="w-[1px] h-3 bg-border" />
            <a href="/" className="font-mono text-[10px] text-cream-muted transition-colors duration-300 hover:text-copper">Original →</a>
          </div>
        </div>
      </div>

      <Navigation />
      <div className="h-[36px]" />

      {/* CHANGED: Refined CTA hero */}
      <HeroRefinedCTA />

      <FilterCard onSearch={() => setResultsExpanded(true)} />
      <ResultsGrid expanded={resultsExpanded} onExpand={() => setResultsExpanded(true)} />
      <div className="h-[48px] md:h-[80px]" />

      {/* NEW: Badge guide before Staff Picks */}
      <BadgeGuide />

      <StaffPicks />
      <div className="h-[48px] md:h-[80px]" />
      <Community />
      <div className="h-[40px] md:h-[56px]" />

      {/* CHANGED: Compact newsletter */}
      <NewsletterCompact />

      <div className="h-[32px] md:h-[56px]" />
      <Footer />
    </main>
  );
}
