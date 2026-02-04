'use client';

const FEATURED_PICK = {
  title: "Guardiola's Ghost",
  creator: "TacticalPadre",
  quote: "The rare counter-attack tactic that doesn't sacrifice beauty. Survived the Championship with Wrexham and made every match worth watching.",
  editorNote: "Our top pick this month. A counter-attack system that actually plays beautiful football — wing-backs push high in transition and the build-up is patient enough to feel intentional, not desperate.",
  achievements: [
    { label: '🏆 4 consecutive promotions', description: 'Achieved by 3+ managers using this tactic' },
    { label: '⚡ 142 reviews', description: 'All reviews include match data' },
    { label: '📈 Trending 3 weeks', description: 'Top 10 most downloaded for 3+ weeks' },
    { label: '✓ FM-Arena tested', description: 'Validated through 100+ match simulation on FM-Arena.com' },
  ],
  style: "Counter-Attack",
  level: "Underdog",
  rating: 4.3,
  winRate: 73,
  formation: "4-3-3",
  version: "FM26",
  downloads: "5.4k",
  reviews: 142,
  matches: 247,
  positions: [
    { top: '82%', left: '48%' }, { top: '62%', left: '10%' },
    { top: '64%', left: '32%' }, { top: '64%', left: '64%' },
    { top: '62%', left: '86%' }, { top: '40%', left: '22%' },
    { top: '38%', left: '48%' }, { top: '40%', left: '74%' },
    { top: '16%', left: '14%' }, { top: '10%', left: '48%' },
    { top: '16%', left: '82%' },
  ],
};

const STRUCTURED_REVIEWS = [
  {
    initials: "MP",
    author: "ManagerPep",
    ratingResults: 5,
    ratingExperience: 5,
    ratingEase: 4,
    quote: "Four promotions in a row with Woking. This tactic turned my no-name squad into a machine.",
    tactic: "Guardiola's Ghost",
    club: "Woking AFC",
    league: "Vanarama National League",
    wins: 31, draws: 7, losses: 4,
    fmVersion: "FM26 v26.3",
    time: "3 hrs ago",
    verified: true,
  },
  {
    initials: "RF",
    author: "RealFergie",
    ratingResults: 4,
    ratingExperience: 4,
    ratingEase: 3,
    quote: "Works brilliantly against top teams but struggles against low blocks. The pressing is next level though.",
    tactic: "Bielsa's Vertical Hell",
    club: "Aston Villa",
    league: "Premier League",
    wins: 22, draws: 8, losses: 8,
    fmVersion: "FM26 v26.2",
    time: "6 hrs ago",
    verified: true,
  },
  {
    initials: "TC",
    author: "TacticsCruz",
    ratingResults: 5,
    ratingExperience: 5,
    ratingEase: 5,
    quote: "Finally a tactic that embraces being the underdog. Sat back, absorbed pressure, and hit them on the break.",
    tactic: "The Sardine Can",
    club: "Wrexham AFC",
    league: "Championship",
    wins: 25, draws: 8, losses: 5,
    fmVersion: "FM26 v26.3",
    time: "1 day ago",
    verified: false,
  },
];

function MiniStars({ rating, label }: { rating: number; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-mono text-[9px] text-cream-muted tracking-[0.04em] uppercase w-[52px]">{label}</span>
      <div className="flex gap-px">
        {[1, 2, 3, 4, 5].map(i => (
          <span key={i} className={`text-[10px] ${i <= rating ? 'star-filled' : 'star-empty'}`}>&#9733;</span>
        ))}
      </div>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section id="revamp-social" className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
      <div className="sec-eyebrow">What managers are saying</div>
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="font-serif text-[22px] md:text-section font-normal tracking-tight">Featured & Reviews</h2>
        <a href="#" className="text-copper font-mono text-[11px] border-b border-transparent transition-all duration-300 hover:border-copper">
          All reviews →
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Left: Staff Pick #1 */}
        <div
          className="p-4 md:p-6 rounded-xl relative cursor-pointer transition-all duration-400 group hover:border-[rgba(196,135,90,0.35)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.35),0_0_20px_var(--copper-dim)]"
          style={{
            background: 'linear-gradient(135deg, rgba(196,135,90,0.06), rgba(196,135,90,0.02))',
            border: '1px solid rgba(196,135,90,0.12)'
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] opacity-30 rounded-t-xl" style={{ background: 'linear-gradient(90deg, transparent, var(--copper), transparent)' }} />

          <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-copper mb-3 flex items-center gap-1.5">
            <span className="text-sm">⭐</span> Staff Pick · January 2026
          </div>

          <h3 className="font-serif text-[22px] md:text-[26px] font-medium tracking-tight mb-2 transition-colors duration-300 group-hover:text-copper-bright">
            {FEATURED_PICK.title}
          </h3>

          <p className="font-serif italic text-sm text-cream-secondary leading-relaxed mb-3 max-w-[520px] line-clamp-2">
            &ldquo;{FEATURED_PICK.quote}&rdquo;
          </p>

          <p className="text-[12px] md:text-[13px] text-cream-secondary leading-relaxed mb-3 pl-3 border-l-2 border-copper max-w-[520px] font-light">
            {FEATURED_PICK.editorNote}
          </p>

          {/* Badges with inline definitions */}
          <div className="flex gap-1.5 flex-wrap mb-3">
            {FEATURED_PICK.achievements.map((ach, i) => (
              <div key={i} className="relative group/badge">
                <span
                  className="font-mono text-[9px] tracking-[0.04em] px-2.5 py-1 border rounded text-copper flex items-center gap-1 whitespace-nowrap cursor-help"
                  style={{ background: 'rgba(196,135,90,0.08)', borderColor: 'rgba(196,135,90,0.12)' }}
                >
                  {ach.label}
                </span>
                {/* Badge tooltip */}
                <div className="invisible group-hover/badge:visible absolute bottom-full left-0 mb-2 px-3 py-2 bg-surface-elevated border border-border rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.4)] z-50 w-[220px]">
                  <div className="font-mono text-[10px] text-cream leading-relaxed">{ach.description}</div>
                  <div className="absolute bottom-[-4px] left-4 w-2 h-2 bg-surface-elevated border-r border-b border-border rotate-45" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-cream-muted">
              by <a href="#" className="text-cream-secondary transition-colors duration-300 hover:text-copper">{FEATURED_PICK.creator}</a>
            </span>
            <span className="tag tag-style">{FEATURED_PICK.style}</span>
            <span className="tag tag-level">{FEATURED_PICK.level}</span>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
            <div className="relative group/wr">
              <span className="font-mono text-[11px] text-cream-muted flex items-center gap-1 cursor-help border-b border-dashed border-cream-faint">
                {FEATURED_PICK.winRate}% Win Rate
              </span>
              <div className="invisible group-hover/wr:visible absolute bottom-full left-0 mb-2 px-3 py-2 bg-surface-elevated border border-border rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.4)] z-50 w-[200px]">
                <div className="font-mono text-[10px] text-cream leading-relaxed">
                  {FEATURED_PICK.winRate}% across {FEATURED_PICK.matches} competitive matches in {FEATURED_PICK.reviews} manager saves (FM26).
                </div>
                <div className="absolute bottom-[-4px] left-4 w-2 h-2 bg-surface-elevated border-r border-b border-border rotate-45" />
              </div>
            </div>
            <span className="font-mono text-[11px] text-cream-muted flex items-center gap-1">
              <span className="star-filled">&#9733;</span> {FEATURED_PICK.rating}
            </span>
            <span className="font-mono text-[11px] text-cream-muted">{FEATURED_PICK.downloads} downloads</span>
            <span className="font-mono text-[11px] text-cream-muted hidden sm:inline">{FEATURED_PICK.formation} · {FEATURED_PICK.version}</span>
          </div>
        </div>

        {/* Right: 3 Structured Reviews */}
        <div className="flex flex-col">
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cream-secondary flex items-center gap-1.5 mb-4">
            💬 Recent Reviews
          </div>

          {STRUCTURED_REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className={`py-4 cursor-pointer transition-all duration-300 group ${
                idx < STRUCTURED_REVIEWS.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-surface-elevated flex items-center justify-center text-[9px] font-medium text-cream-muted">
                  {review.initials}
                </div>
                <span className="text-xs text-cream-secondary">{review.author}</span>
                {review.verified && (
                  <span className="font-mono text-[8px] text-green-accent bg-[rgba(90,138,80,0.1)] border border-[rgba(90,138,80,0.15)] rounded px-1.5 py-px tracking-[0.04em]">
                    VERIFIED
                  </span>
                )}
                <span className="text-[10px] text-cream-faint ml-auto">{review.time}</span>
              </div>

              {/* Context bar: Club / League / Record / Version */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="font-mono text-[10px] text-cream-secondary">{review.club}</span>
                <span className="text-cream-faint text-[10px]">·</span>
                <span className="font-mono text-[10px] text-cream-muted">{review.league}</span>
                <span className="text-cream-faint text-[10px]">·</span>
                <span className="font-mono text-[10px] text-cream-muted">
                  {review.wins}W {review.draws}D {review.losses}L
                  <span className="text-cream-faint ml-1">({review.wins + review.draws + review.losses} matches)</span>
                </span>
                <span className="text-cream-faint text-[10px]">·</span>
                <span className="font-mono text-[9px] text-cream-faint tracking-[0.04em]">{review.fmVersion}</span>
              </div>

              {/* 3-axis ratings */}
              <div className="flex gap-4 mb-2">
                <MiniStars rating={review.ratingResults} label="Results" />
                <MiniStars rating={review.ratingExperience} label="Fun" />
                <MiniStars rating={review.ratingEase} label="Ease" />
              </div>

              {/* Quote */}
              <p className="font-serif italic text-[13px] text-cream-secondary leading-relaxed line-clamp-2">
                &ldquo;{review.quote}&rdquo;
              </p>

              {/* Tactic link */}
              <div className="font-serif text-[13px] font-medium text-copper transition-colors duration-300 group-hover:text-copper-bright mt-1.5">
                {review.tactic}
              </div>
            </div>
          ))}

          {/* All reviews link */}
          <div className="pt-3 border-t border-border text-center">
            <a href="#" className="text-copper font-mono text-xs border-b border-transparent transition-all duration-300 hover:border-copper">
              All reviews →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
