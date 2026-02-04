'use client';

const CREATORS = [
  {
    initials: 'TP',
    username: 'TacticalPadre',
    signature: '4-3-3 counter-attack specialist',
    tacticsCount: 12,
    avgRating: 4.4,
    downloads: '28.3k',
    verified: true,
  },
  {
    initials: 'WS',
    username: 'WorkTheSpace',
    signature: 'High-press vertical football',
    tacticsCount: 8,
    avgRating: 4.6,
    downloads: '41.2k',
    verified: true,
  },
  {
    initials: 'KN',
    username: 'Knap',
    signature: 'The GOAT. 200+ tactics across 10 FMs',
    tacticsCount: 47,
    avgRating: 4.5,
    downloads: '312k',
    verified: true,
  },
  {
    initials: 'DB',
    username: 'DoctorBenjy',
    signature: 'Underdog siege mentality',
    tacticsCount: 6,
    avgRating: 4.2,
    downloads: '18.7k',
    verified: true,
  },
  {
    initials: 'BN',
    username: 'BustTheNet',
    signature: 'Lower league domination',
    tacticsCount: 9,
    avgRating: 4.3,
    downloads: '22.1k',
    verified: false,
  },
  {
    initials: 'RD',
    username: 'RDFTactics',
    signature: 'Pressing traps and midfield control',
    tacticsCount: 5,
    avgRating: 4.5,
    downloads: '14.8k',
    verified: true,
  },
];

export default function TheDugout() {
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
      {/* Subtle top divider */}
      <div className="border-t border-border mb-6 md:mb-8" />

      {/* Header */}
      <div className="flex items-baseline justify-between mb-5 md:mb-6">
        <div>
          <div className="sec-eyebrow">The Creators</div>
          <h2 className="font-serif text-[22px] md:text-section font-normal tracking-tight">From the dugout</h2>
        </div>
        <a href="/creators" className="text-copper font-mono text-[11px] border-b border-transparent transition-all duration-300 hover:border-copper">
          All creators &rarr;
        </a>
      </div>

      {/* Creator tokens — horizontal scroll on mobile, grid on desktop */}
      <div className="flex gap-4 md:gap-5 overflow-x-auto pb-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-6 scrollbar-hide pt-2">
        {CREATORS.map((creator) => (
          <a
            key={creator.username}
            href={`/creator/${creator.username.toLowerCase()}`}
            className="flex-shrink-0 w-[152px] md:w-auto group cursor-pointer block pt-2"
          >
            {/* Avatar — pt-2 on parent + pb on this div ensures hover translate doesn't clip */}
            <div className="flex justify-center mb-2.5 pb-1">
              <div className={`relative w-[52px] h-[52px] rounded-full flex items-center justify-center text-[13px] font-serif font-semibold transition-all duration-300 group-hover:-translate-y-1 ${
                creator.verified
                  ? 'bg-[rgba(196,135,90,0.06)] text-copper border border-[rgba(196,135,90,0.4)] group-hover:border-copper group-hover:shadow-[0_6px_20px_rgba(196,135,90,0.2)]'
                  : 'bg-surface text-cream-muted border border-border group-hover:border-cream-faint group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)]'
              }`}>
                {creator.initials}
                {creator.verified && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-[15px] h-[15px] bg-bg rounded-full flex items-center justify-center">
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" fill="#C4875A" />
                      <path d="M5 8l2 2 4-4" stroke="#1A1714" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
            </div>

            {/* Name */}
            <div className="text-center mb-0.5">
              <span className="text-[12px] text-cream font-medium transition-colors duration-300 group-hover:text-copper">
                {creator.username}
              </span>
            </div>

            {/* Signature */}
            <div className="text-center mb-2">
              <span className="text-[10px] text-cream-faint leading-tight line-clamp-1">
                {creator.signature}
              </span>
            </div>

            {/* Stats — single line */}
            <div className="text-center">
              <span className="font-mono text-[9px] text-cream-muted">
                {creator.tacticsCount} tactics
              </span>
              <span className="text-cream-faint text-[7px] mx-1">&middot;</span>
              <span className="font-mono text-[9px] text-cream-muted">
                &#9733; {creator.avgRating}
              </span>
              <span className="text-cream-faint text-[7px] mx-1">&middot;</span>
              <span className="font-mono text-[9px] text-cream-faint">
                {creator.downloads}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Subtle bottom divider */}
      <div className="border-b border-border mt-6 md:mt-8" />
    </section>
  );
}
