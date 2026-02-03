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
];

export default function Community() {
  const [period, setPeriod] = useState('week');

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

  return (
    <section className="max-w-[1440px] mx-auto px-12">
      {/* Section header */}
      <div className="sec-eyebrow">👥 From the Community</div>
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="font-serif text-section font-normal tracking-tight">Managers & Reviews</h2>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-2 gap-12 items-start">
        {/* Left column - Managers */}
        <div>
          {/* Period toggle */}
          <div className="flex gap-1 pb-4 min-h-[42px] items-end">
            {['This Week', 'This Month', 'All Time'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p.toLowerCase().replace(' ', '-'))}
                className={`px-3.5 py-1.5 bg-transparent border rounded text-cream-muted text-[11px] font-sans cursor-pointer transition-all duration-300 hover:text-cream hover:border-[rgba(196,135,90,0.2)] ${
                  period === p.toLowerCase().replace(' ', '-')
                    ? '!border-copper !bg-copper-dim !text-copper'
                    : 'border-border'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Manager cards */}
          <div className="flex flex-col gap-3">
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

                {/* Badge */}
                {mgr.isFeatured ? (
                  <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-copper mb-3.5 flex items-center gap-1.5">
                    <span className="text-sm">🏆</span> Manager of the Week
                  </div>
                ) : (
                  <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-cream-muted mb-2.5 flex items-center gap-1.5">
                    <span className="text-xs">#{mgr.rank}</span> This Week
                  </div>
                )}

                {/* Profile */}
                <div className="flex items-center gap-3.5 mb-3">
                  <div 
                    className={`rounded-full flex items-center justify-center font-serif font-semibold flex-shrink-0 ${
                      mgr.isFeatured 
                        ? 'w-14 h-14 text-xl border-[2.5px] border-copper text-copper bg-copper-dim shadow-[0_0_18px_rgba(196,135,90,0.25)]'
                        : 'w-10 h-10 text-sm border-2 border-border text-cream-muted bg-surface-elevated group-hover:border-[rgba(196,135,90,0.3)] group-hover:shadow-[0_0_12px_rgba(196,135,90,0.15)]'
                    }`}
                  >
                    {mgr.initials}
                  </div>
                  <div>
                    <div className={`font-serif font-medium transition-colors duration-300 ${
                      mgr.isFeatured ? 'text-xl' : 'text-[15px] hover:text-copper-bright'
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

                {/* Stats */}
                <div className={`flex ${mgr.isFeatured ? 'gap-5 mb-3.5' : 'gap-4'}`}>
                  <div className="flex flex-col">
                    <span className={`font-mono font-medium ${mgr.isFeatured ? 'text-[15px]' : 'text-xs'}`}>{mgr.tactics}</span>
                    <span className={`text-cream-muted ${mgr.isFeatured ? 'text-[10px]' : 'text-[9px]'}`}>Tactics</span>
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-mono font-medium ${mgr.isFeatured ? 'text-[15px]' : 'text-xs'}`}>★ {mgr.avgRating}</span>
                    <span className={`text-cream-muted ${mgr.isFeatured ? 'text-[10px]' : 'text-[9px]'}`}>Avg rating</span>
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-mono font-medium ${mgr.isFeatured ? 'text-[15px]' : 'text-xs'}`}>{mgr.downloads}</span>
                    <span className={`text-cream-muted ${mgr.isFeatured ? 'text-[10px]' : 'text-[9px]'}`}>Downloads</span>
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-mono font-medium ${mgr.isFeatured ? 'text-[15px]' : 'text-xs'}`}>{mgr.avgWinRate}</span>
                    <span className={`text-cream-muted ${mgr.isFeatured ? 'text-[10px]' : 'text-[9px]'}`}>{mgr.isFeatured ? 'Avg Win Rate' : 'Win Rate'}</span>
                  </div>
                </div>

                {/* Best tactic (featured only) */}
                {mgr.isFeatured && mgr.bestTactic && (
                  <div className="pt-3 border-t border-border flex items-center gap-2">
                    <span className="font-mono text-[9px] text-cream-muted tracking-[0.1em] uppercase flex-shrink-0">Best tactic:</span>
                    <span className="font-serif text-[13px] font-medium text-copper transition-colors duration-300 hover:text-copper-bright">
                      {mgr.bestTactic}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer link */}
          <div className="pt-4 text-center">
            <a href="#" className="text-copper font-mono text-xs border-b border-transparent transition-all duration-300 hover:border-copper">
              All managers →
            </a>
          </div>
        </div>

        {/* Right column - Reviews */}
        <div>
          {/* Header */}
          <div className="pb-4 min-h-[42px] flex items-end">
            <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-cream-muted flex items-center gap-1.5">
              💬 Fresh Reviews
            </div>
          </div>

          {/* Reviews */}
          <div className="flex flex-col">
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
                  "{review.quote}"
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

          {/* Footer link */}
          <div className="pt-3.5 border-t border-border text-center">
            <a href="#" className="text-copper font-mono text-xs border-b border-transparent transition-all duration-300 hover:border-copper">
              All reviews →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
