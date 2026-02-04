'use client';

import { useState } from 'react';
import { Navigation, Hero, FilterCard, ResultsGrid, ReviewsCarousel, TheDugout, NewsletterCompact, Footer } from '@/components';

export default function Home() {
  const [resultsExpanded, setResultsExpanded] = useState(false);

  return (
    <main className="min-h-screen bg-bg">
      <Navigation />
      <Hero />
      <FilterCard onSearch={() => setResultsExpanded(true)} />
      <ResultsGrid expanded={resultsExpanded} onExpand={() => setResultsExpanded(true)} />

      {/* Spacing before Reviews */}
      <div className="h-[48px] md:h-[72px]" />

      <ReviewsCarousel />

      {/* Spacing before Creators */}
      <div className="h-[48px] md:h-[72px]" />

      <TheDugout />

      {/* Spacing before Newsletter */}
      <div className="h-[48px] md:h-[72px]" />

      <NewsletterCompact />

      {/* Spacing before Footer */}
      <div className="h-[40px] md:h-[72px]" />

      <Footer />
    </main>
  );
}
