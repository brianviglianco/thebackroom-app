'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

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
  {
    initials: "AS", author: "ArmchairSacchi",
    ratingResults: 3, ratingExperience: 3, ratingEase: 2,
    quote: "Decent results but the setup instructions were confusing. Took me three attempts to get the roles right. Once it clicked, won more than I lost — but not plug and play.",
    tactic: "Bielsa's Vertical Hell",
    club: "Leeds United", league: "Championship",
    wins: 18, draws: 9, losses: 11, fmVersion: "FM26 v26.2",
    time: "4 days ago", verified: true,
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

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
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

// Get review at index with circular wrapping
function getReview(index: number) {
  return REVIEWS[((index % REVIEWS.length) + REVIEWS.length) % REVIEWS.length];
}

export default function ReviewsCarousel() {
  // currentIndex = index of the LEFT card (desktop shows currentIndex and currentIndex+1)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideOffset, setSlideOffset] = useState(0); // 0 = resting, negative = sliding left
  const currentIndexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalReviews = REVIEWS.length;

  // Advance by 1: slide left then snap
  const advance = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    // Start CSS transition: slide left by (50% + gap)
    setSlideOffset(-1);
    // After transition ends, snap to new index without animation
    setTimeout(() => {
      const next = (currentIndexRef.current + 1) % totalReviews;
      currentIndexRef.current = next;
      setCurrentIndex(next);
      setSlideOffset(0);
      setIsAnimating(false);
    }, 400);
  }, [isAnimating, totalReviews]);

  // Go to specific index (for dot navigation)
  const goToIndex = useCallback((target: number) => {
    if (target === currentIndexRef.current || isAnimating) return;
    setIsAnimating(true);
    setSlideOffset(-1);
    setTimeout(() => {
      currentIndexRef.current = target;
      setCurrentIndex(target);
      setSlideOffset(0);
      setIsAnimating(false);
    }, 400);
  }, [isAnimating]);

  // Auto-rotate every 8s
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(advance, 8000);
    return () => clearInterval(interval);
  }, [isPaused, advance]);

  // We render 3 cards: current, current+1, current+2 (the +2 is the one sliding in from right)
  const card0 = getReview(currentIndex);
  const card1 = getReview(currentIndex + 1);
  const card2 = getReview(currentIndex + 2);

  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
      <div className="sec-eyebrow">💬 From the Touchline</div>
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="font-serif text-[22px] md:text-section font-normal tracking-tight">What Managers are saying</h2>
        <a href="#" className="text-copper font-mono text-[11px] border-b border-transparent transition-all duration-300 hover:border-copper">
          ALL REVIEWS →
        </a>
      </div>

      {/* Carousel viewport */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        ref={containerRef}
      >
        {/* Track: 3 cards side by side, each ~50% width minus gap on desktop */}
        <div
          className="flex gap-4 md:gap-5"
          style={{
            transition: slideOffset !== 0 ? 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
            transform: slideOffset === -1 ? 'translateX(calc(-50% - 10px))' : 'translateX(0)',
          }}
        >
          {/* Card 0 (current left) */}
          <div className="w-full md:w-[calc(50%-10px)] flex-shrink-0">
            <ReviewCard review={card0} />
          </div>
          {/* Card 1 (current right) */}
          <div className="w-full md:w-[calc(50%-10px)] flex-shrink-0 hidden md:block">
            <ReviewCard review={card1} />
          </div>
          {/* Card 2 (next, off-screen right, slides in) */}
          <div className="w-full md:w-[calc(50%-10px)] flex-shrink-0 hidden md:block">
            <ReviewCard review={card2} />
          </div>
        </div>
      </div>

      {/* Dot navigation — one dot per review */}
      <div className="flex items-center gap-2 mt-5">
        {REVIEWS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 border-none cursor-pointer ${
              idx === currentIndex
                ? 'bg-copper w-5'
                : 'bg-cream-faint opacity-40 hover:opacity-70'
            }`}
            aria-label={`Go to review ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
