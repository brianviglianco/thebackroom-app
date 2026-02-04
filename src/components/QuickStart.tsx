'use client';

const QUICK_CARDS = [
  {
    icon: '\u{1F3F0}',
    title: 'Lower League FM26',
    description: 'Best tactics for punching above your weight',
    count: 47,
    href: '/explore?team_level=lower-league&version=fm26',
  },
  {
    icon: '\u26A1',
    title: 'Counter-Attack Underdogs',
    description: 'Hit them on the break when outmatched',
    count: 62,
    href: '/explore?style=counter-attack&team_level=underdog',
  },
  {
    icon: '\u{1F3AF}',
    title: 'Highest Rated FM26',
    description: 'Community favorites for the current version',
    count: 156,
    href: '/explore?version=fm26&sort=rating',
  },
  {
    icon: '\u{1F3AE}',
    title: 'Possession Control',
    description: 'Dominate the ball and dictate tempo',
    count: 38,
    href: '/explore?style=possession',
  },
];

interface QuickStartProps {
  onAdvancedFilters?: () => void;
}

export default function QuickStart({ onAdvancedFilters }: QuickStartProps) {
  return (
    <section id="quick-start" className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-8 md:pt-10">
      <div className="mb-4">
        <div className="sec-eyebrow">🚀 Quick start</div>
        <p className="text-[13px] text-cream-secondary mt-1">
          Pick a common scenario to get started
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {QUICK_CARDS.map((card) => (
          <a
            key={card.title}
            href={card.href}
            className="group bg-surface border border-border rounded-[10px] p-4 md:p-5 transition-all duration-300 hover:border-[rgba(196,135,90,0.3)] hover:bg-surface-hover hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] block"
          >
            <div className="flex items-start gap-3">
              <span className="text-[24px] flex-shrink-0 mt-0.5">{card.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-serif text-[15px] md:text-[16px] font-medium text-cream group-hover:text-copper transition-colors duration-300">
                    {card.title}
                  </h3>
                  <span className="font-mono text-[11px] text-copper flex-shrink-0">
                    {card.count} &rarr;
                  </span>
                </div>
                <p className="text-[12px] text-cream-muted leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Link to advanced filters */}
      <div className="text-center mt-4">
        <button
          onClick={onAdvancedFilters}
          className="font-mono text-[11px] text-cream-muted bg-transparent border-none cursor-pointer transition-colors duration-300 hover:text-copper"
        >
          OR USE ADVANCED FILTERS &darr;
        </button>
      </div>
    </section>
  );
}
