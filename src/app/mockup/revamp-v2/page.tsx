'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import RevampHero from '@/components/mockups/revamp/RevampHero';
import FilterCardEnhanced from '@/components/mockups/FilterCardEnhanced';
import ResultsGrid from '@/components/ResultsGrid';
import ReviewsCarousel from '@/components/mockups/revamp-v2/ReviewsCarousel';
import TheDugout from '@/components/mockups/revamp-v2/TheDugout';
import NewsletterCompact from '@/components/mockups/NewsletterCompact';
import Footer from '@/components/Footer';

export default function RevampV2Mockup() {
  const [resultsExpanded, setResultsExpanded] = useState(false);

  return (
    <main className="min-h-screen bg-bg">
      {/* Mockup banner */}
      <div className="fixed top-[54px] left-0 right-0 z-[99] bg-[rgba(196,135,90,0.12)] border-b border-[rgba(196,135,90,0.2)] backdrop-blur-[8px]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-2 flex items-center justify-between">
          <div className="font-mono text-[10px] md:text-[11px] text-copper tracking-[0.06em]">
            MOCKUP V2: Homepage Revamp &mdash; Creative Sections
          </div>
          <div className="flex items-center gap-3">
            <a href="/mockup/revamp" className="font-mono text-[10px] text-cream-muted transition-colors duration-300 hover:text-copper">
              V1 Revamp &rarr;
            </a>
            <a href="/" className="font-mono text-[10px] text-cream-muted transition-colors duration-300 hover:text-copper">
              Original &rarr;
            </a>
          </div>
        </div>
      </div>

      <Navigation />

      {/* Extra top padding for mockup banner */}
      <div className="h-[36px]" />

      {/* 1. Hero (approved — lowercase CTA, proof bar) */}
      <RevampHero />

      {/* 2. Explore Tactics — enhanced filters (production style) */}
      <FilterCardEnhanced onSearch={() => setResultsExpanded(true)} />

      {/* 3. Results Grid — collapsed by default, expands on filter/CTA */}
      <ResultsGrid expanded={resultsExpanded} onExpand={() => setResultsExpanded(true)} />

      {/* Spacing */}
      <div className="h-[48px] md:h-[72px]" />

      {/* 4. Reviews Carousel — auto-rotating structured reviews */}
      <ReviewsCarousel />

      {/* Spacing */}
      <div className="h-[48px] md:h-[72px]" />

      {/* 5. The Dugout — Top Creators strip */}
      <TheDugout />

      {/* Spacing */}
      <div className="h-[48px] md:h-[72px]" />

      {/* 6. Newsletter (compact version — approved from clarity-polish) */}
      <NewsletterCompact />

      {/* Spacing */}
      <div className="h-[48px] md:h-[72px]" />

      {/* 6. Footer */}
      <Footer />
    </main>
  );
}
