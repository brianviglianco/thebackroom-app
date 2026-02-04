'use client';

import { useState, useEffect, useCallback } from 'react';

const REVIEWS = [
  {
    initials: "MP", author: "ManagerPep",
    ratingResults: 5, ratingExperience: 5, ratingEase: 4,
    quote: "Four promotions in a row with Woking. This tactic turned my no-name squad into a machine. The wing-backs are absolutely relentless.",
    tactic: "Guardiola's Ghost",
    club: "Woking AFC", league: "Vanarama National League",
    wins: 31, draws: 7, losses: 4, fmVersion: "FM26 v26.3",
    time: "3 hrs ago", verified: true,
  },
  {
    initials: "RF", author: "RealFergie",
    ratingResults: 4, ratingExperience: 4, ratingEase: 3,
    quote: "Works brilliantly against top teams but struggles against low blocks. Best used situationally. The pressing is next level though.",
    tactic: "Bielsa's Vertical Hell",
    club: "Aston Villa", league: "Premier League",
    wins: 22, draws: 8, losses: 8, fmVersion: "FM26 v26.2",
    time: "6 hrs ago", verified: true,
  },
  {
    initials: "TC", author: "TacticsCruz",
    ratingResults: 5, ratingExperience: 5, ratingEase: 5,
    quote: "Finally a tactic that embraces being the underdog. Sat back, absorbed pressure, and hit them on the break. Pure siege mentality.",
    tactic: "The Sardine Can",
    club: "Wrexham AFC", league: "Championship",
    wins: 25, draws: 8, losses: 5, fmVersion: "FM26 v26.3",
    time: "1 day ago", verified: false,
  },
  {
    initials: "JL", author: "JürgenLover",
    ratingResults: 4, ratingExperience: 4, ratingEase: 4,
    quote: "Sacchi would be proud. The pressing traps are automated, relentless, and genuinely devastating against possession-heavy sides.",
    tactic: "Sacchi Reborn",
    club: "Dortmund", league: "Bundesliga",
    wins: 20, draws: 10, losses: 8, fmVersion: "FM26 v26.1",
    time: "2 days ago", verified: true,
  },
  {
    initials: "DM", author: "DerMeister",
    ratingResults: 5, ratingExperience: 4, ratingEase: 4,
    quote: "Ran this for two full seasons with Hamburg. The midfield triangle is perfectly balanced — wins the ball high and transitions instantly.",
    tactic: "Total Voetbal 2.0",
    club: "Hamburger SV", league: "2. Bundesliga",
    wins: 28, draws: 6, losses: 4, fmVersion: "FM26 v26.3",
    time: "3 days ago", verified: false,
  },
];

function MiniStars({ rating, label }: { rating: number; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-mono text-[9px] text-cream-muted tracking-[0.04em] uppercase w-[48px]">{label}</span>
      <div className="flex gap-px">
        {[1, 2, 3, 4, 5].map(i => (
          <span key={i} className={`text-[10px] ${i <= rating ? 'star-filled' : 'star-empty'}`}>&#9733;</span>
        ))}
      </div>
    </div>
  );
}

interface ReviewCardProps {
  review: typeof REVIEWS[0];
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-surface border border-border rounded-[10px] p-4 md:p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-7 h-7 rounded-full bg-surface-elevated flex items-center justify-center text-[9px] font-serif font-semibold text-cream-muted border border-border">
          {review.initials}
        </div>
        <span className="text-[12px] text-cream-secondary font-medium">{review.author}</span>
        {review.verified && (
          <span className="font-mono text-[8px] text-green-accent bg-[rgba(90,138,80,0.1)] border border-[rgba(90,138,80,0.15)] rounded px-1.5 py-px tracking-[0.04em]">VERIFIED</span>
        )}
        <span className="text-[10px] text-cream-faint ml-auto">{review.time}</span>
      </div>

      {/* Context bar */}
      <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
        <span className="font-mono text-[10px] text-cream-secondary">{review.club}</span>
        <span className="text-cream-faint text-[8px]">·</span>
        <span className="font-mono text-[10px] text-cream-muted">{review.league}</span>
        <span className="text-cream-faint text-[8px]">·</span>
        <span className="font-mono text-[10px] text-cream-muted">
          {review.wins}W {review.draws}D {review.losses}L
          <span className="text-cream-faint ml-0.5">({review.wins + review.draws + review.losses})</span>
        </span>
        <span className="text-cream-faint text-[8px]">·</span>
        <span className="font-mono text-[9px] text-cream-faint">{review.fmVersion}</span>
      </div>

      {/* 3-axis ratings */}
      <div className="flex gap-3 mb-3">
        <MiniStars rating={review.ratingResults} label="Results" />
        <MiniStars rating={review.ratingExperience} label="Fun" />
        <MiniStars rating={review.ratingEase} label="Ease" />
      </div>

      {/* Quote */}
      <p className="font-serif italic text-[13px] text-cream-secondary leading-relaxed mb-3 line-clamp-3 flex-1">
        &ldquo;{review.quote}&rdquo;
      </p>

      {/* Tactic link */}
      <div className="font-serif text-[13px] font-medium text-copper transition-colors duration-300 hover:text-copper-bright cursor-pointer">
        → {review.tactic}
      </div>
    </div>
  );
}

export default function ReviewsCarousel() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Desktop shows 2, so we need ceil(5/2) = 3 pages
  const totalPages = Math.ceil(REVIEWS.length / 2);

  const nextPage = useCallback(() => {
    setCurrentPage(prev => (prev + 1) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextPage, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextPage]);

  // Get current pair of reviews
  const startIdx = currentPage * 2;
  const visibleReviews = REVIEWS.slice(startIdx, startIdx + 2);
  // If we only have 1 review left (odd total), wrap around
  if (visibleReviews.length === 1) {
    visibleReviews.push(REVIEWS[0]);
  }

  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
      <div className="sec-eyebrow">💬 From the Touchline</div>
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="font-serif text-[22px] md:text-section font-normal tracking-tight">What managers are saying</h2>
        <a href="#" className="text-copper font-mono text-[11px] border-b border-transparent transition-all duration-300 hover:border-copper">
          All reviews →
        </a>
      </div>

      {/* Carousel viewport */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Desktop: 2 cards, Mobile: 1 card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 transition-opacity duration-500">
          {visibleReviews.map((review, idx) => (
            <div key={`${currentPage}-${idx}`} className={`${idx === 1 ? 'hidden md:block' : ''}`}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        {/* Dot navigation */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 border-none cursor-pointer ${
                idx === currentPage
                  ? 'bg-copper w-5'
                  : 'bg-cream-faint opacity-40 hover:opacity-70'
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
