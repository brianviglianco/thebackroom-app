'use client';

import { useState } from 'react';
import { Navigation, Hero, FilterCard, ResultsGrid, StaffPicks, Community, Footer } from '@/components';

export default function Home() {
  const [resultsExpanded, setResultsExpanded] = useState(false);

  return (
    <main className="min-h-screen bg-bg">
      <Navigation />
      <Hero />
      <FilterCard />
      <ResultsGrid expanded={resultsExpanded} onExpand={() => setResultsExpanded(true)} />
      
      {/* Spacing before Staff Picks */}
      <div className="h-[88px]" />
      
      <StaffPicks />
      
      {/* Spacing before Community */}
      <div className="h-[88px]" />
      
      <Community />
      
      {/* Spacing before Footer */}
      <div className="h-[88px]" />
      
      <Footer />
    </main>
  );
}
