'use client';

import { useState } from 'react';

const MANAGERS = [
  {
    rank: 1, initials: "TP", name: "TacticalPadre",
    signature: "4-3-3 Counter-Attack specialist",
    bio: "Known for making underdogs punch above their weight. His counter-attack systems have been downloaded 28k+ times and tested across 1,400+ saves.",
    tactics: 12, avgRating: 4.4, downloads: "28.3k", avgWinRate: "73%",
    bestTactic: "Guardiola's Ghost · ★ 4.3", isFeatured: true,
  },
  {
    rank: 2, initials: "WS", name: "WorkTheSpace",
    signature: "4-2-3-1 specialist · YouTube creator",
    bio: "High-press evangelist with a loyal following.",
    tactics: 8, avgRating: 4.6, downloads: "15.1k", avgWinRate: "78%",
    bestTactic: "Bielsa's Vertical Hell · ★ 4.7",
  },
  {
    rank: 3, initials: "KN", name: "Knap",
    signature: "FM legend · 23 tactics across 5 versions",
    bio: "The most prolific tactic creator in FM history.",
    tactics: 23, avgRating: 4.3, downloads: "41.2k", avgWinRate: "76%",
    bestTactic: "Knap's Standard · ★ 4.8",
  },
];

const STRUCTURED_REVIEWS = [
  {
    initials: "MP", author: "ManagerPep",
    ratingResults: 5, ratingExperience: 5, ratingEase: 4,
    quote: "Four promotions in a row with Woking. This tactic turned my no-name squad into a machine. The wing-backs are absolutely relentless.",
    tactic: "Guardiola's Ghost", formation: "4-3-3", style: "Counter-Attack",
    club: "Woking AFC", league: "Vanarama National League",
    wins: 31, draws: 7, losses: 4, fmVersion: "FM26 v26.3",
    time: "3 hrs ago", verified: true,
  },
  {
    initials: "RF", author: "RealFergie",
    ratingResults: 4, ratingExperience: 4, ratingEase: 3,
    quote: "Works brilliantly against top teams but struggles against low blocks. Best used situationally. The pressing is next level though.",
    tactic: "Bielsa's Vertical Hell", formation: "4-2-3-1", style: "High Press",
    club: "Aston Villa", league: "Premier League",
    wins: 22, draws: 8, losses: 8, fmVersion: "FM26 v26.2",
    time: "6 hrs ago", verified: true,
  },
  {
    initials: "TC", author: "TacticsCruz",
    ratingResults: 5, ratingExperience: 5, ratingEase: 5,
    quote: "Finally a tactic that embraces being the underdog. Sat back, absorbed pressure, and hit them on the break.",
    tactic: "The Sardine Can", formation: "5-3-2", style: "Counter-Attack",
    club: "Wrexham AFC", league: "Championship",
    wins: 25, draws: 8, losses: 5, fmVersion: "FM26 v26.3",
    time: "1 day ago", verified: false,
  },
  {
    initials: "JL", author: "JürgenLover",
    ratingResults: 4, ratingExperience: 4, ratingEase: 4,
    quote: "Sacchi would be proud. The pressing traps are automated, relentless, and genuinely devastating against possession-heavy sides.",
    tactic: "Sacchi Reborn", formation: "4-2-3-1", style: "High Press",
    club: "Dortmund", league: "Bundesliga",
    wins: 20, draws: 10, losses: 8, fmVersion: "FM26 v26.1",
    time: "2 days ago", verified: true,
  },
  {
    initials: "DM", author: "DerMeister",
    ratingResults: 5, ratingExperience: 4, ratingEase: 4,
    quote: "Ran this for two full seasons with Hamburg. The midfield triangle is perfectly balanced — wins the ball high and transitions instantly.",
    tactic: "Total Voetbal 2.0", formation: "4-3-3", style: "Possession",
    club: "Hamburger SV", league: "2. Bundesliga",
    wins: 28, draws: 6, losses: 4, fmVersion: "FM26 v26.3",
    time: "3 days ago", verified: false,
  },
];

function MiniStars({ rating, label }: { rating: number; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-mono text-[9px] text-cream-muted tracking-[0.04em] uppercase w-[52px]">{label}</span>
      <div className="flex gap-px">
        {[1, 2, 3, 4, 5].map(i => (
          <span key={i} className={`text-[10px] ${i <= rating ? 'star-filled' : 'star-empty'}`}>★</span>
        ))}
      </div>
    </div>
  );
}

const PERIOD_LABELS: Record<string, { featured: string; rank: string }> = {
  'this-week': { featured: 'Manager of the Week', rank: 'This Week' },
  'this-month': { featured: 'Manager of the Month', rank: 'This Month' },
  'all-time': { featured: 'Manager of All Time', rank: 'All Time' },
};

export default function StructuredCommunity() {
  const [period, setPeriod] = useState('this-week');
  const periodLabels = PERIOD_LABELS[period] || PERIOD_LABELS['this-week'];

  return (
    <section id="community" className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
      <div className="sec-eyebrow">👥 The Community</div>
      <div className="flex items-baseline justify-between mb-4 md:mb-5">
        <h2 className="font-serif text-[22px] md:text-section font-normal tracking-tight">From the Touchline</h2>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-12">
        {/* MANAGERS (unchanged) */}
        <div className="flex gap-1 pb-4 min-h-[42px] items-end">
          {['This Week', 'This Month', 'All Time'].map((p) => {
            const periodKey = p.toLowerCase().replace(' ', '-');
            return (
              <button key={p} onClick={() => setPeriod(periodKey)}
                className={`px-3.5 py-1.5 bg-transparent border rounded text-cream-muted text-[11px] font-sans cursor-pointer transition-all duration-300 hover:text-cream hover:border-[rgba(196,135,90,0.2)] ${
                  period === periodKey ? '!border-copper !bg-copper-dim !text-copper' : 'border-border'
                }`}
              >{p}</button>
            );
          })}
        </div>

        {/* Reviews header desktop */}
        <div className="hidden lg:flex pb-4 min-h-[42px] items-end">
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cream-secondary flex items-center gap-1.5">
            💬 Recent Tactic Reviews <span className="text-cream-faint text-[9px] normal-case tracking-normal ml-1">(structured with match data)</span>
          </div>
        </div>

        {/* Manager cards (same as original) */}
        <div className="flex flex-col gap-3">
          {MANAGERS.map((mgr) => (
            <div key={mgr.rank}
              className={`bg-surface border rounded-[10px] p-4 md:p-5 relative overflow-hidden cursor-pointer transition-all duration-400 hover:border-[rgba(196,135,90,0.3)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.3)] ${
                mgr.isFeatured ? 'border-[rgba(196,135,90,0.15)] md:p-6' : 'border-border'
              }`}
              style={mgr.isFeatured ? { background: 'linear-gradient(135deg, rgba(196,135,90,0.06), rgba(196,135,90,0.02))' } : undefined}
            >
              {mgr.isFeatured && <div className="absolute top-0 left-0 right-0 h-[1px] opacity-40" style={{ background: 'linear-gradient(90deg, transparent, var(--copper), transparent)' }} />}
              {mgr.isFeatured ? (
                <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-copper mb-3.5 flex items-center gap-1.5"><span className="text-sm">🏆</span> {periodLabels.featured}</div>
              ) : (
                <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-cream-muted mb-2.5 flex items-center gap-1.5"><span className="text-xs">#{mgr.rank}</span> {periodLabels.rank}</div>
              )}
              <div className="flex items-center gap-3.5 mb-3">
                <div className={`rounded-full flex items-center justify-center font-serif font-semibold flex-shrink-0 ${
                  mgr.isFeatured ? 'w-12 h-12 md:w-14 md:h-14 text-lg md:text-xl border-[2.5px] border-copper text-copper bg-copper-dim shadow-[0_0_18px_rgba(196,135,90,0.25)]' : 'w-10 h-10 text-sm border-2 border-border text-cream-muted bg-surface-elevated'
                }`}>{mgr.initials}</div>
                <div>
                  <div className={`font-serif font-medium ${mgr.isFeatured ? 'text-lg md:text-xl' : 'text-[15px]'}`}>{mgr.name}</div>
                  <div className="text-[11px] text-cream-muted mt-px">{mgr.signature}</div>
                </div>
              </div>
              <p className={`text-cream-secondary leading-relaxed mb-3.5 ${mgr.isFeatured ? 'text-xs max-w-[420px]' : 'text-[11px] text-cream-muted line-clamp-2'}`}>{mgr.bio}</p>
              <div className={`flex flex-wrap ${mgr.isFeatured ? 'gap-4 md:gap-5 mb-3.5' : 'gap-3 md:gap-4'}`}>
                {[
                  { val: mgr.tactics, label: 'Tactics' },
                  { val: `★ ${mgr.avgRating}`, label: 'Avg rating' },
                  { val: mgr.downloads, label: 'Downloads' },
                  { val: mgr.avgWinRate, label: mgr.isFeatured ? 'Avg Win Rate' : 'Win Rate' },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <span className={`font-mono font-medium text-copper ${mgr.isFeatured ? 'text-[15px]' : 'text-xs'}`}>{s.val}</span>
                    <span className={`text-cream-muted ${mgr.isFeatured ? 'text-[10px]' : 'text-[9px]'}`}>{s.label}</span>
                  </div>
                ))}
              </div>
              {mgr.bestTactic && (
                <div className={`pt-3 border-t border-border flex items-center gap-2 ${mgr.isFeatured ? '' : 'mt-3'}`}>
                  <span className="font-mono text-[9px] text-cream-muted tracking-[0.1em] uppercase flex-shrink-0">Best tactic:</span>
                  <span className={`font-serif font-medium text-copper ${mgr.isFeatured ? 'text-[13px]' : 'text-[12px]'}`}>{mgr.bestTactic}</span>
                </div>
              )}
            </div>
          ))}
          <div className="pt-4 text-center">
            <a href="#" className="text-copper font-mono text-xs border-b border-transparent transition-all duration-300 hover:border-copper">All managers →</a>
          </div>
        </div>

        {/* REVIEWS — ENHANCED: structured cards */}
        <div className="lg:hidden pt-8 pb-4">
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cream-secondary flex items-center gap-1.5">
            💬 Recent Tactic Reviews
          </div>
        </div>

        <div className="flex flex-col">
          {STRUCTURED_REVIEWS.map((review, idx) => (
            <div key={idx} className={`py-4 cursor-pointer transition-all duration-300 group ${idx === 0 ? 'lg:pt-0' : ''} ${idx < STRUCTURED_REVIEWS.length - 1 ? 'border-b border-border' : 'pb-0'}`}>
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-surface-elevated flex items-center justify-center text-[9px] font-medium text-cream-muted">{review.initials}</div>
                <span className="text-xs text-cream-secondary">{review.author}</span>
                {review.verified && (
                  <span className="font-mono text-[8px] text-green-accent bg-[rgba(90,138,80,0.1)] border border-[rgba(90,138,80,0.15)] rounded px-1.5 py-px tracking-[0.04em]">VERIFIED</span>
                )}
                <span className="text-[10px] text-cream-faint ml-auto">{review.time}</span>
              </div>

              {/* NEW: Context bar */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="font-mono text-[10px] text-cream-secondary">{review.club}</span>
                <span className="text-cream-faint text-[10px]">·</span>
                <span className="font-mono text-[10px] text-cream-muted">{review.league}</span>
                <span className="text-cream-faint text-[10px]">·</span>
                <span className="font-mono text-[10px] text-cream-muted">
                  {review.wins}W {review.draws}D {review.losses}L
                  <span className="text-cream-faint ml-1">({review.wins + review.draws + review.losses})</span>
                </span>
                <span className="text-cream-faint text-[10px]">·</span>
                <span className="font-mono text-[9px] text-cream-faint">{review.fmVersion}</span>
              </div>

              {/* NEW: 3-axis ratings */}
              <div className="flex gap-4 mb-2">
                <MiniStars rating={review.ratingResults} label="Results" />
                <MiniStars rating={review.ratingExperience} label="Fun" />
                <MiniStars rating={review.ratingEase} label="Ease" />
              </div>

              {/* Quote */}
              <p className="font-serif italic text-[13px] text-cream-secondary leading-relaxed mb-1.5 line-clamp-2">
                &ldquo;{review.quote}&rdquo;
              </p>

              {/* Tactic link */}
              <div className="font-serif text-[13px] font-medium text-copper transition-colors duration-300 group-hover:text-copper-bright">{review.tactic}</div>
            </div>
          ))}

          <div className="pt-3.5 border-t border-border text-center">
            <a href="#" className="text-copper font-mono text-xs border-b border-transparent transition-all duration-300 hover:border-copper">All reviews →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
