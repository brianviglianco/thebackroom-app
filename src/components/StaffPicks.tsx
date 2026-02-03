'use client';

const STAFF_PICKS = [
  {
    rank: 1,
    title: "Guardiola's Ghost",
    creator: "TacticalPadre",
    quote: "The rare counter-attack tactic that doesn't sacrifice beauty. Survived the Championship with Wrexham and made every match worth watching.",
    editorNote: "Our top pick this month. A counter-attack system that actually plays beautiful football — wing-backs push high in transition and the build-up is patient enough to feel intentional, not desperate. Works at every level we tested.",
    achievements: ["🏆 4 consecutive promotions", "⚡ 142 reviews", "📈 Trending 3 weeks", "✓ FM-Arena tested"],
    style: "Counter-Attack",
    level: "Underdog",
    rating: 4.3,
    winRate: 73,
    formation: "4-3-3",
    version: "FM26",
    downloads: "5.4k",
    reviews: 142,
    positions: [
      { top: '82%', left: '48%' },
      { top: '62%', left: '10%' },
      { top: '64%', left: '32%' },
      { top: '64%', left: '64%' },
      { top: '62%', left: '86%' },
      { top: '40%', left: '22%' },
      { top: '38%', left: '48%' },
      { top: '40%', left: '74%' },
      { top: '16%', left: '14%' },
      { top: '10%', left: '48%' },
      { top: '16%', left: '82%' },
    ],
  },
  {
    rank: 2,
    title: "Bielsa's Vertical Hell",
    creator: "WorkTheSpace",
    quote: "Pure vertical football that doesn't let the opposition breathe. Your front four become a relentless wave of movement.",
    style: "High Press",
    level: "Mid-Table",
    rating: 4.7,
    winRate: 81,
    formation: "4-2-3-1",
    version: "FM26",
  },
  {
    rank: 3,
    title: "The Sardine Can",
    creator: "BustTheNet",
    quote: "The ultimate siege mentality tactic. Parks the bus with intelligence, then scores from nowhere on the break.",
    style: "Counter-Attack",
    level: "Lower League",
    rating: 4.1,
    winRate: 73,
    formation: "5-3-2",
    version: "FM26",
  },
];

export default function StaffPicks() {
  const featured = STAFF_PICKS[0];
  const runners = STAFF_PICKS.slice(1);

  return (
    <div className="bg-bg-warm py-14">
      <section className="max-w-[1440px] mx-auto px-12">
        {/* Section header */}
        <div className="sec-eyebrow">⭐ Editor&apos;s Selection</div>
        <div className="flex items-baseline justify-between mb-5">
          <div className="flex items-baseline gap-3">
            <h2 className="font-serif text-section font-normal tracking-tight">Staff Picks</h2>
            <span className="font-mono text-[11px] text-cream-muted tracking-[0.05em]">Vol. 12 · January 2026</span>
          </div>
          <a href="#" className="text-copper font-mono text-[11px] border-b border-transparent transition-all duration-300 hover:border-copper">
            Past editions →
          </a>
        </div>

        {/* Editorial grid */}
        <div className="grid grid-cols-2 gap-0">
          {/* Featured pick #1 */}
          <div 
            className="col-span-full grid gap-6 p-5 px-6 rounded-xl mb-2 relative cursor-pointer transition-all duration-400 group hover:border-[rgba(196,135,90,0.35)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.35),0_0_20px_var(--copper-dim)]"
            style={{ 
              gridTemplateColumns: '48px 1fr auto',
              background: 'linear-gradient(135deg, rgba(196,135,90,0.06), rgba(196,135,90,0.02))',
              border: '1px solid rgba(196,135,90,0.12)'
            }}
          >
            {/* Top accent */}
            <div 
              className="absolute top-0 left-0 right-0 h-[1px] opacity-30 rounded-t-xl"
              style={{ background: 'linear-gradient(90deg, transparent, var(--copper), transparent)' }}
            />

            {/* Rank */}
            <div className="font-serif text-[52px] font-light text-copper leading-none opacity-90 group-hover:opacity-100 transition-opacity">
              1
            </div>

            {/* Content */}
            <div>
              <h3 className="font-serif text-[26px] font-medium tracking-tight mb-1.5 transition-colors duration-300 group-hover:text-copper-bright">
                {featured.title}
              </h3>
              <p className="font-serif italic text-sm text-cream-secondary leading-relaxed mb-3 max-w-[520px] line-clamp-3">
                &ldquo;{featured.quote}&rdquo;
              </p>
              <p className="text-[13px] text-cream-secondary leading-relaxed mb-3 pl-3 border-l-2 border-copper max-w-[520px] font-light">
                {featured.editorNote}
              </p>
              <div className="flex gap-1.5 flex-wrap mb-2.5">
                {featured.achievements?.map((ach, i) => (
                  <span 
                    key={i}
                    className="font-mono text-[9px] tracking-[0.04em] px-2.5 py-1 border rounded text-copper flex items-center gap-1 whitespace-nowrap"
                    style={{ background: 'rgba(196,135,90,0.08)', borderColor: 'rgba(196,135,90,0.12)' }}
                  >
                    {ach}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-cream-muted">
                  by <a href="#" className="text-cream-secondary transition-colors duration-300 hover:text-copper">{featured.creator}</a>
                </span>
                <span className="tag tag-style">{featured.style}</span>
                <span className="tag tag-level">{featured.level}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-cream-muted flex items-center gap-1">
                    <span className="star-filled">★</span> {featured.rating}
                  </span>
                  <span className="font-mono text-[11px] text-cream-muted">{featured.winRate}% Win Rate</span>
                  <span className="font-mono text-[11px] text-cream-muted">{featured.formation} · {featured.version}</span>
                </div>
              </div>
            </div>

            {/* Visual block */}
            <div 
              className="flex items-center gap-5 p-4 px-5 bg-bg border border-border rounded-[10px] min-w-[280px] self-center"
            >
              {/* Mini pitch */}
              <div className="w-[100px] h-[110px] bg-pitch-dark rounded-md relative flex-shrink-0 border border-pitch-line">
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-pitch-line" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 border border-pitch-line rounded-full" />
                {featured.positions?.map((pos, i) => (
                  <div
                    key={i}
                    className="absolute w-[5px] h-[5px] bg-copper rounded-full shadow-[0_0_6px_rgba(196,135,90,0.4)]"
                    style={{ top: pos.top, left: pos.left }}
                  />
                ))}
              </div>
              
              {/* Stats */}
              <div className="flex flex-col gap-2.5">
                <div>
                  <div className="font-mono text-[28px] font-medium text-copper leading-none">
                    {featured.winRate}<span className="text-base opacity-70">%</span>
                  </div>
                  <div className="font-mono text-[8px] tracking-[0.12em] uppercase text-cream-muted mt-0.5">Win Rate</div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <div className="font-mono text-sm font-medium text-cream">★ {featured.rating}</div>
                    <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-cream-muted">Rating</div>
                  </div>
                  <div>
                    <div className="font-mono text-sm font-medium text-cream">{featured.downloads}</div>
                    <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-cream-muted">Downloads</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <div className="font-mono text-sm font-medium text-cream">{featured.reviews}</div>
                    <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-cream-muted">Reviews</div>
                  </div>
                  <div>
                    <div className="font-mono text-sm font-medium text-cream">{featured.formation}</div>
                    <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-cream-muted">Formation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Runners up #2 and #3 */}
          {runners.map((pick, idx) => (
            <div
              key={pick.rank}
              className={`grid gap-5 py-7 border-b border-border cursor-pointer transition-all duration-400 group ${
                idx === 0 ? 'border-r border-border pr-6' : 'pl-6'
              }`}
              style={{ gridTemplateColumns: '48px 1fr' }}
            >
              <div className="font-serif text-[40px] font-light text-copper leading-none opacity-70 group-hover:opacity-100 transition-opacity">
                {pick.rank}
              </div>
              <div>
                <h3 className="font-serif text-[22px] font-medium tracking-tight mb-1.5 transition-colors duration-300 group-hover:text-copper-bright">
                  {pick.title}
                </h3>
                <p className="font-serif italic text-sm text-cream-secondary leading-relaxed mb-2.5 max-w-[640px] line-clamp-2">
                  &ldquo;{pick.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-cream-muted">
                    by <a href="#" className="text-cream-secondary transition-colors duration-300 hover:text-copper">{pick.creator}</a>
                  </span>
                  <span className="tag tag-style">{pick.style}</span>
                  <span className="tag tag-level">{pick.level}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-cream-muted flex items-center gap-1">
                      <span className="star-filled">★</span> {pick.rating}
                    </span>
                    <span className="font-mono text-[11px] text-cream-muted">{pick.winRate}% Win Rate</span>
                    <span className="font-mono text-[11px] text-cream-muted">{pick.formation} · {pick.version}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
