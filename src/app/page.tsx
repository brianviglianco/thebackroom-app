'use client';

import { Navigation, Hero, FilterCard, ResultsGrid, StaffPicks, ReviewsCarousel, TheDugout, Newsletter, Footer } from '@/components';

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <Navigation />
      <Hero />
      <FilterCard />
      <ResultsGrid />

      {/* Spacing before Staff Picks */}
      <div className="h-[48px] md:h-[72px]" />

      <StaffPicks />

      {/* Spacing before Reviews */}
      <div className="h-[48px] md:h-[72px]" />

      <ReviewsCarousel />

      {/* Spacing before Creators */}
      <div className="h-[48px] md:h-[72px]" />

      <TheDugout />

      {/* Spacing before Newsletter */}
      <div className="h-[48px] md:h-[72px]" />

      <Newsletter />

      {/* Spacing before Footer */}
      <div className="h-[40px] md:h-[72px]" />

      <Footer />
    </main>
  );
}
