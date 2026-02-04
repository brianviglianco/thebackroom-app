'use client';

const CREATORS = [
  { initials: 'TP', name: 'TacticalPadre' },
  { initials: 'WS', name: 'WorkTheSpace' },
  { initials: 'KN', name: 'Knap' },
  { initials: 'DB', name: 'DoctorBenjy' },
];

export default function TrustedByBar() {
  return (
    <div className="border-t border-b border-border bg-bg-warm">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-5 md:py-6">
        <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
          <span className="font-mono text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-cream-muted">
            Trusted by
          </span>

          {/* Overlapping avatars */}
          <div className="flex items-center">
            {CREATORS.map((creator, idx) => (
              <div
                key={creator.initials}
                className="w-8 h-8 rounded-full border-2 border-bg-warm bg-surface-elevated flex items-center justify-center text-[9px] font-serif font-semibold text-cream-muted relative hover:z-10 hover:border-copper hover:text-copper transition-all duration-300 cursor-pointer"
                style={{ marginLeft: idx > 0 ? '-8px' : '0', zIndex: CREATORS.length - idx }}
                title={creator.name}
              >
                {creator.initials}
              </div>
            ))}
          </div>

          {/* Creator names on desktop */}
          <div className="hidden md:flex items-center gap-1.5">
            {CREATORS.map((creator, idx) => (
              <span key={creator.initials}>
                <a href="#" className="text-[12px] text-cream-secondary transition-colors duration-300 hover:text-copper">
                  {creator.name}
                </a>
                {idx < CREATORS.length - 1 && <span className="text-cream-faint text-[12px]">,</span>}
              </span>
            ))}
          </div>

          <a href="/managers" className="font-sans text-[12px] text-cream-muted transition-colors duration-300 hover:text-copper">
            and <span className="text-cream-secondary">840+ managers</span> →
          </a>
        </div>
      </div>
    </div>
  );
}
