'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FilterCard from '@/components/FilterCard';
import ResultsGrid from '@/components/ResultsGrid';
import StaffPicks from '@/components/StaffPicks';
import Community from '@/components/Community';
import Footer from '@/components/Footer';

export default function Home() {
  const [resultsExpanded, setResultsExpanded] = useState(false);

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <FilterCard />
      <ResultsGrid 
        expanded={resultsExpanded} 
        onExpand={() => setResultsExpanded(true)} 
      />
      
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
