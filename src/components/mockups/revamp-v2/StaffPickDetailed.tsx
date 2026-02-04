'use client';

const PICK = {
  title: "Guardiola's Ghost",
  creator: {
    name: "TacticalPadre",
    initials: "TP",
    signature: "4-3-3 Counter-Attack specialist",
    bio: "Known for making underdogs punch above their weight. His counter-attack systems have been downloaded 28k+ times and tested across 1,400+ saves. The go-to creator for lower league managers.",
    tactics: 12,
    avgRating: 4.4,
    downloads: "28.3k",
    isVerified: true,
    otherTactics: ["The Low Block 2.0", "Sardinia Express", "Counter Blitz"],
  },
  quote: "The rare counter-attack tactic that doesn't sacrifice beauty. Survived the Championship with Wrexham and made every match worth watching.",
  editorNote: "Our top pick this month. A counter-attack system that actually plays beautiful football — wing-backs push high in transition and the build-up is patient enough to feel intentional, not desperate.",
  badges: [
    { label: '🏆 4 consecutive promotions', tip: 'Achieved by 3+ managers using this tactic across different saves.' },
    { label: '⚡ 142 reviews', tip: 'All reviews include match data: club, league, W-D-L record.' },
    { label: '📈 Trending 3 weeks', tip: 'Top 10 most downloaded tactics for 3+ consecutive weeks.' },
    { label: '✓ FM-Arena tested', tip: 'Validated through 100+ match simulation on FM-Arena.com.' },
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
};

export default function StaffPickDetailed() {
  return (
    <div className="bg-bg-warm py-10 md:py-14">
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Section header */}
        <div className="sec-eyebrow">⭐ Staff Pick · January 2026</div>
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="font-serif text-[22px] md:text-section font-normal tracking-tight">Editor&apos;s Selection</h2>
          <a href="#" className="text-copper font-mono text-[11px] border-b border-transparent transition-all duration-300 hover:border-copper">
            Past editions →
          </a>
        </div>

        {/* 2-column card */}
        <div
          className="rounded-xl overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, rgba(196,135,90,0.06), rgba(196,135,90,0.02))',
            border: '1px solid rgba(196,135,90,0.12)'
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] opacity-30 rounded-t-xl" style={{ background: 'linear-gradient(90deg, transparent, var(--copper), transparent)' }} />

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
            {/* LEFT: Tactic details */}
            <div className="p-5 md:p-7 lg:border-r lg:border-[rgba(196,135,90,0.08)]">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[11px] font-medium text-copper bg-copper-dim border border-[rgba(196,135,90,0.15)] rounded px-2 py-0.5">{PICK.formation}</span>
                <span className="font-mono text-[9px] tracking-[0.08em] text-cream-muted uppercase">{PICK.version}</span>
                <span className="tag tag-style">{PICK.style}</span>
                <span className="tag tag-level">{PICK.level}</span>
              </div>

              <h3 className="font-serif text-[24px] md:text-[28px] font-medium tracking-tight mb-2">
                {PICK.title}
              </h3>

              <p className="font-serif italic text-[14px] text-cream-secondary leading-relaxed mb-4 max-w-[520px]">
                &ldquo;{PICK.quote}&rdquo;
              </p>

              <p className="text-[12px] md:text-[13px] text-cream-secondary leading-relaxed mb-4 pl-3 border-l-2 border-copper max-w-[520px] font-light">
                {PICK.editorNote}
              </p>

              {/* Badges with ? tooltips */}
              <div className="flex gap-1.5 flex-wrap mb-4">
                {PICK.badges.map((badge, i) => (
                  <span key={i} className="relative group/badge">
                    <span
                      className="font-mono text-[9px] tracking-[0.04em] px-2.5 py-1 border rounded text-copper flex items-center gap-1.5 whitespace-nowrap cursor-help"
                      style={{ background: 'rgba(196,135,90,0.08)', borderColor: 'rgba(196,135,90,0.12)' }}
                    >
                      {badge.label}
                      <svg className="w-3 h-3 text-cream-faint opacity-60 group-hover/badge:opacity-100 group-hover/badge:text-copper transition-all" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 12.5a5.5 5.5 0 110-11 5.5 5.5 0 010 11zM7.25 5a.75.75 0 101.5 0 .75.75 0 00-1.5 0zM7.25 7.25a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5z"/>
                      </svg>
                    </span>
                    {/* Tooltip */}
                    <span className="invisible group-hover/badge:visible absolute bottom-full left-0 mb-2 px-3 py-2 bg-surface-elevated border border-border rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.4)] z-50 w-[220px]">
                      <span className="font-mono text-[10px] text-cream leading-relaxed block">{badge.tip}</span>
                      <span className="absolute bottom-[-4px] left-4 w-2 h-2 bg-surface-elevated border-r border-b border-border rotate-45" />
                    </span>
                  </span>
                ))}
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-5 pt-3 border-t border-[rgba(196,135,90,0.08)]">
                <div>
                  <div className="font-mono text-[22px] font-medium text-copper leading-none">{PICK.winRate}<span className="text-sm opacity-70">%</span></div>
                  <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-cream-muted mt-0.5">Win Rate ({PICK.matches} matches)</div>
                </div>
                <div>
                  <div className="font-mono text-[16px] font-medium text-cream leading-none">★ {PICK.rating}</div>
                  <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-cream-muted mt-0.5">Rating ({PICK.reviews} reviews)</div>
                </div>
                <div>
                  <div className="font-mono text-[16px] font-medium text-cream leading-none">{PICK.downloads}</div>
                  <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-cream-muted mt-0.5">Downloads</div>
                </div>
              </div>
            </div>

            {/* RIGHT: Creator Spotlight */}
            <div className="p-5 md:p-7 bg-[rgba(0,0,0,0.12)]">
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-copper mb-4 flex items-center gap-2">
                <span className="w-[14px] h-[1px] bg-copper opacity-40" />
                Creator Spotlight
              </div>

              {/* Avatar + name */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-[2.5px] border-copper bg-copper-dim flex items-center justify-center font-serif text-2xl md:text-3xl font-semibold text-copper shadow-[0_0_24px_rgba(196,135,90,0.2)]">
                  {PICK.creator.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-[18px] md:text-[20px] font-medium">{PICK.creator.name}</span>
                    {PICK.creator.isVerified && (
                      <span className="font-mono text-[8px] text-green-accent bg-[rgba(90,138,80,0.1)] border border-[rgba(90,138,80,0.15)] rounded px-1.5 py-px tracking-[0.04em]">VERIFIED</span>
                    )}
                  </div>
                  <div className="text-[11px] text-cream-muted mt-0.5">{PICK.creator.signature}</div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-[12px] text-cream-secondary leading-relaxed mb-4">
                {PICK.creator.bio}
              </p>

              {/* Creator stats */}
              <div className="flex gap-5 mb-5">
                <div>
                  <div className="font-mono text-[14px] font-medium text-copper">{PICK.creator.tactics}</div>
                  <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-cream-muted mt-0.5">Tactics</div>
                </div>
                <div>
                  <div className="font-mono text-[14px] font-medium text-copper">★ {PICK.creator.avgRating}</div>
                  <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-cream-muted mt-0.5">Avg Rating</div>
                </div>
                <div>
                  <div className="font-mono text-[14px] font-medium text-copper">{PICK.creator.downloads}</div>
                  <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-cream-muted mt-0.5">Downloads</div>
                </div>
              </div>

              {/* Other tactics */}
              <div className="mb-4">
                <div className="font-mono text-[9px] tracking-[0.08em] uppercase text-cream-muted mb-2">
                  Other tactics by {PICK.creator.name}
                </div>
                <div className="flex flex-col gap-1.5">
                  {PICK.creator.otherTactics.map((tactic, i) => (
                    <a key={i} href="#" className="font-serif text-[13px] text-copper transition-colors duration-300 hover:text-copper-bright">
                      {tactic}
                    </a>
                  ))}
                </div>
              </div>

              {/* View profile */}
              <a href="#" className="font-mono text-[11px] text-cream-muted transition-colors duration-300 hover:text-copper border-b border-transparent hover:border-copper">
                View full profile →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
