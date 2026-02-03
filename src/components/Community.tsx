'use client';

import { useState } from 'react';

const MANAGERS = [
  {
    rank: 1,
    initials: "TP",
    name: "TacticalPadre",
    signature: "4-3-3 Counter-Attack specialist",
    bio: "Known for making underdogs punch above their weight. His counter-attack systems have been downloaded 28k+ times and tested across 1,400+ saves. The go-to creator for lower league managers.",
    tactics: 12,
    avgRating: 4.4,
    downloads: "28.3k",
    avgWinRate: "73%",
    bestTactic: "Guardiola's Ghost · ★ 4.3",
    isFeatured: true,
  },
  {
    rank: 2,
    initials: "WS",
    name: "WorkTheSpace",
    signature: "4-2-3-1 specialist · YouTube creator",
    bio: "High-press evangelist with a loyal following. His tactics are designed for mid-table teams that want to compete with the big boys.",
    tactics: 8,
    avgRating: 4.6,
    downloads: "15.1k",
    avgWinRate: "78%",
    bestTactic: "Bielsa's Vertical Hell · ★ 4.7",
  },
  {
    rank: 3,
    initials: "KN",
    name: "Knap",
    signature: "FM legend · 23 tactics across 5 versions",
    bio: "The most prolific tactic creator in FM history. If there's a meta, Knap has already broken it. His Standard series is the benchmark.",
    tactics: 23,
    avgRating: 4.3,
    downloads: "41.2k",
    avgWinRate: "76%",
    bestTactic: "Knap's Standard · ★ 4.8",
  },
];

const REVIEWS = [
  {
    initials: "MP",
    author: "ManagerPep",
    rating: 5.0,
    quote: "Four promotions in a row with Woking. This tactic turned my no-name squad into a machine. The wing-backs are absolutely relentless.",
    tactic: "Guardiola's Ghost",
    formation: "4-3-3",
    style: "Counter-Attack",
    winRate: "73%",
    time: "3 hrs ago",
  },
  {
    initials: "RF",
    author: "RealFergie",
    rating: 4.0,
    quote: "Works brilliantly against top teams but struggles against low blocks. Best used situationally. The pressing is next level though.",
    tactic: "Bielsa's Vertical Hell",
    formation: "4-2-3-1",
    style: "High Press",
    winRate: "81%",
    time: "6 hrs ago",
  },
  {
    initials: "TC",
    author: "TacticsCruz",
    rating: 5.0,
    quote: "Finally a tactic that embraces being the underdog. Sat back, absorbed pressure, and hit them on the break.",
    tactic: "The Sardine Can",
    formation: "5-3-2",
    style: "Counter-Attack",
    winRate: "73%",
    time: "1 day ago",
  },
  {
    initials: "JL",
    author: "JürgenLover",
    rating: 4.2,
    quote: "Sacchi would be proud. The pressing traps are automated, relentless, and genuinely devastating against possession-heavy sides.",
    tactic: "Sacchi Reborn",
    formation: "4-2-3-1",
    style: "High Press",
    winRate: "77%",
    time: "2 days ago",
  },
  {
    initials: "DM",
    author: "DerMeister",
    rating: 4.5,
    quote: "Ran this for two full seasons with Hamburg. The midfield triangle is perfectly balanced — wins the ball high and transitions instantly.",
    tactic: "Total Voetbal 2.0",
    formation: "4-3-3",
    style: "Possession",
    winRate: "75%",
    time: "3 days ago",
  },
];

// Period labels for badges - FIX-003: Dynamic text based on toggle
const PERIOD_LABELS: Record<string, { featured: string; rank: string }> = {
  'this-week': { featured: 'Manager of the Week', rank: 'This Week' },
  'this-month': { featured: 'Manager of the Month', rank: 'This Month' },
  'all-time': { featured: 'Manager of All Time', rank: 'All Time' },
};

export default function Community() {
  const [period, setPeriod] = useState('this-week');

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < fullStars ? 'star-filled' : 'star-empty'}>★</span>
      );
    }
    return stars;
  };

  // Get current period labels - FIX-003: Connected to period state
  const periodLabels = PERIOD_LABELS[period] || PERIOD_LABELS['this-week'];

  return (
    <section id="community" className="max-w-[1440px] mx-auto px-12">
      {/* Section header */}
      <div className="sec-eyebrow">👥 The Community</div>
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="font-serif text-section font-normal tracking-tight">From the Touchline</h2>
      </div>

      {/* FIX-001: Two-column layout with proper alignment
          - grid-cols-2: Two equal columns
          - gap-y-0: No vertical gap (footers align at same baseline)
          - gap-x-12: 48px horizontal gap between columns
          - Explicit grid-row assignments ensure rows align */}
      <div 
        className="grid grid-cols-2 gap-y-0 gap-x-12"
        style={{ gridTemplateRows: 'auto 1fr auto', alignItems: 'start' }}
      >
        
        {/* ===== LEFT COLUMN: MANAGERS ===== */}
        
        {/* Row 1: Header (left) */}
        <div 
          className="flex gap-1 pb-4 min-h-[42px] items-end"
          style={{ gridColumn: 1, gridRow: 1 }}
        >
          {['This Week', 'This Month', 'All Time'].map((p) => {
            const periodKey = p.toLowerCase().replace(' ', '-');
            return (
              <button
                key={p}
                onClick={() => setPeriod(periodKey)}
                className={`px-3.5 py-1.5 bg-transparent border rounded text-cream-muted text-[11px] font-sans cursor-pointer transition-all duration-300 hover:text-cream hover:border-[rgba(196,135,90,0.2)] ${
                  period === periodKey
                    ? '!border-copper !bg-copper-dim !text-copper'
                    : 'border-border'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Row 1: Header (right) */}
        <div
          className="pb-4 min-h-[42px] flex items-end"
          style={{ gridColumn: 2, gridRow: 1 }}
        >
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cream-secondary flex items-center gap-1.5">
            💬 Recent Tactic Reviews
          </div>
        </div>

        {/* Row 2: Body (left - managers) */}
        <div 
          className="flex flex-col gap-3"
          style={{ gridColumn: 1, gridRow: 2 }}
        >
          {MANAGERS.map((mgr) => (
            <div
              key={mgr.rank}
              className={`bg-surface border rounded-[10px] p-5 relative overflow-hidden cursor-pointer transition-all duration-400 hover:border-[rgba(196,135,90,0.3)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.3)] ${
                mgr.isFeatured 
                  ? 'border-[rgba(196,135,90,0.15)] p-6' 
                  : 'border-border'
              }`}
              style={mgr.isFeatured ? { background: 'linear-gradient(135deg, rgba(196,135,90,0.06), rgba(196,135,90,0.02))' } : undefined}
            >
              {/* Featured accent */}
              {mgr.isFeatured && (
                <div 
                  className="absolute top-0 left-0 right-0 h-[1px] opacity-40"
                  style={{ background: 'linear-gradient(90deg, transparent, var(--copper), transparent)' }}
                />
              )}

              {/* Badge - FIX-003: Dynamic text based on period */}
              {mgr.isFeatured ? (
                <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-copper mb-3.5 flex items-center gap-1.5">
                  <span className="text-sm">🏆</span> {periodLabels.featured}
                </div>
              ) : (
                <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-cream-muted mb-2.5 flex items-center gap-1.5">
                  <span className="text-xs">#{mgr.rank}</span> {periodLabels.rank}
                </div>
              )}

              {/* Profile */}
              <div className="flex items-center gap-3.5 mb-3">
                <div 
                  className={`rounded-full flex items-center justify-center font-serif font-semibold flex-shrink-0 ${
                    mgr.isFeatured 
                      ? 'w-14 h-14 text-xl border-[2.5px] border-copper text-copper bg-copper-dim shadow-[0_0_18px_rgba(196,135,90,0.25)]'
                      : 'w-10 h-10 text-sm border-2 border-border text-cream-muted bg-surface-elevated'
                  }`}
                >
                  {mgr.initials}
                </div>
                <div>
                  <div className={`font-serif font-medium transition-colors duration-300 ${
                    mgr.isFeatured ? 'text-xl' : 'text-[15px]'
                  }`}>
                    {mgr.name}
                  </div>
                  <div className="text-[11px] text-cream-muted mt-px">{mgr.signature}</div>
                </div>
              </div>

              {/* Bio */}
              <p className={`text-cream-secondary leading-relaxed mb-3.5 ${
                mgr.isFeatured ? 'text-xs max-w-[420px]' : 'text-[11px] text-cream-muted line-clamp-2'
              }`}>
                {mgr.bio}
              </p>

              {/* Stats - ALL cards have copper stats (FIX-002 applied) */}
              <div className={`flex ${mgr.isFeatured ? 'gap-5 mb-3.5' : 'gap-4'}`}>
                <div className="flex flex-col">
                  <span className={`font-mono font-medium text-copper ${mgr.isFeatured ? 'text-[15px]' : 'text-xs'}`}>{mgr.tactics}</span>
                  <span className={`text-cream-muted ${mgr.isFeatured ? 'text-[10px]' : 'text-[9px]'}`}>Tactics</span>
                </div>
                <div className="flex flex-col">
                  <span className={`font-mono font-medium text-copper ${mgr.isFeatured ? 'text-[15px]' : 'text-xs'}`}>★ {mgr.avgRating}</span>
                  <span className={`text-cream-muted ${mgr.isFeatured ? 'text-[10px]' : 'text-[9px]'}`}>Avg rating</span>
                </div>
                <div className="flex flex-col">
                  <span className={`font-mono font-medium text-copper ${mgr.isFeatured ? 'text-[15px]' : 'text-xs'}`}>{mgr.downloads}</span>
                  <span className={`text-cream-muted ${mgr.isFeatured ? 'text-[10px]' : 'text-[9px]'}`}>Downloads</span>
                </div>
                <div className="flex flex-col">
                  <span className={`font-mono font-medium text-copper ${mgr.isFeatured ? 'text-[15px]' : 'text-xs'}`}>{mgr.avgWinRate}</span>
                  <span className={`text-cream-muted ${mgr.isFeatured ? 'text-[10px]' : 'text-[9px]'}`}>{mgr.isFeatured ? 'Avg Win Rate' : 'Win Rate'}</span>
                </div>
              </div>

              {/* Best tactic */}
              {mgr.bestTactic && (
                <div className={`pt-3 border-t border-border flex items-center gap-2 ${mgr.isFeatured ? '' : 'mt-3'}`}>
                  <span className="font-mono text-[9px] text-cream-muted tracking-[0.1em] uppercase flex-shrink-0">Best tactic:</span>
                  <span className={`font-serif font-medium text-copper transition-colors duration-300 hover:text-copper-bright ${mgr.isFeatured ? 'text-[13px]' : 'text-[12px]'}`}>
                    {mgr.bestTactic}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Row 2: Body (right - reviews) */}
        <div 
          className="flex flex-col"
          style={{ gridColumn: 2, gridRow: 2 }}
        >
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className={`py-5 cursor-pointer transition-all duration-300 group ${
                idx === 0 ? 'pt-0' : ''
              } ${idx < REVIEWS.length - 1 ? 'border-b border-border' : 'pb-0'}`}
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-surface-elevated flex items-center justify-center text-[9px] font-medium text-cream-muted">
                  {review.initials}
                </div>
                <span className="text-xs text-cream-secondary">{review.author}</span>
                <div className="flex gap-px text-[11px] ml-auto">
                  {renderStars(review.rating)}
                </div>
                <span className="font-mono text-[11px] font-medium ml-1">{review.rating.toFixed(1)}</span>
              </div>

              {/* Quote */}
              <p className="font-serif italic text-sm text-cream-secondary leading-relaxed mb-2 line-clamp-2">
                &ldquo;{review.quote}&rdquo;
              </p>

              {/* Tactic link */}
              <div className="font-serif text-[13px] font-medium text-copper transition-colors duration-300 group-hover:text-copper-bright">
                {review.tactic}
              </div>
              <div className="text-[10px] text-cream-muted mt-0.5">
                {review.formation} · {review.style} · {review.winRate} Win Rate · {review.time}
              </div>
            </div>
          ))}
        </div>

        {/* Row 3: Footer (left) - FIX-001: Explicit grid position, matching padding */}
        <div 
          className="pt-4 text-center"
          style={{ gridColumn: 1, gridRow: 3 }}
        >
          <a href="#" className="text-copper font-mono text-xs border-b border-transparent transition-all duration-300 hover:border-copper">
            All managers →
          </a>
        </div>

        {/* Row 3: Footer (right) - FIX-001: Explicit grid position */}
        <div 
          className="pt-3.5 border-t border-border text-center"
          style={{ gridColumn: 2, gridRow: 3 }}
        >
          <a href="#" className="text-copper font-mono text-xs border-b border-transparent transition-all duration-300 hover:border-copper">
            All reviews →
          </a>
        </div>
      </div>
    </section>
  );
}
