'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FilterCardEnhanced from '@/components/mockups/FilterCardEnhanced';
import ResultsGrid from '@/components/ResultsGrid';
import StaffPicks from '@/components/StaffPicks';
import StructuredCommunity from '@/components/mockups/StructuredReviewCard';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function ReviewStructureMockup() {
  const [resultsExpanded, setResultsExpanded] = useState(false);

  return (
    <main className="min-h-screen bg-bg">
      {/* Mockup banner */}
      <div className="fixed top-[54px] left-0 right-0 z-[99] bg-[rgba(196,135,90,0.12)] border-b border-[rgba(196,135,90,0.2)] backdrop-blur-[8px]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-2 flex items-center justify-between">
          <div className="font-mono text-[10px] md:text-[11px] text-copper tracking-[0.06em]">
            MOCKUP 2: Structured Reviews &amp; Clear Filters
          </div>
          <div className="flex items-center gap-3">
            <a href="/mockup/trust-signals" className="font-mono text-[10px] text-cream-faint transition-colors duration-300 hover:text-copper">M1</a>
            <a href="/mockup/clarity-polish" className="font-mono text-[10px] text-cream-faint transition-colors duration-300 hover:text-copper">M3</a>
            <a href="/mockup/revamp" className="font-mono text-[10px] text-cream-faint transition-colors duration-300 hover:text-copper">Revamp</a>
            <span className="w-[1px] h-3 bg-border" />
            <a href="/" className="font-mono text-[10px] text-cream-muted transition-colors duration-300 hover:text-copper">Original →</a>
          </div>
        </div>
      </div>

      <Navigation />
      <div className="h-[36px]" />

      {/* Original hero */}
      <Hero />

      {/* CHANGED: Enhanced filter card */}
      <FilterCardEnhanced onSearch={() => setResultsExpanded(true)} />

      <ResultsGrid expanded={resultsExpanded} onExpand={() => setResultsExpanded(true)} />
      <div className="h-[48px] md:h-[80px]" />
      <StaffPicks />
      <div className="h-[48px] md:h-[80px]" />

      {/* CHANGED: Structured reviews in community */}
      <StructuredCommunity />

      <div className="h-[40px] md:h-[72px]" />
      <Newsletter />
      <div className="h-[40px] md:h-[72px]" />
      <Footer />
    </main>
  );
}
