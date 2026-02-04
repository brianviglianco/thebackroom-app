'use client';

export default function ValidationSection() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-8 md:pt-12 pb-2">
      <div className="sec-eyebrow">How We Validate</div>
      <h2 className="font-serif text-[20px] md:text-[24px] font-normal tracking-tight mb-5">
        Backed by Real Data
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {/* Verified Saves */}
        <div className="bg-surface border border-border rounded-[10px] p-5 md:p-6 transition-all duration-300 hover:border-[rgba(196,135,90,0.2)]">
          <div className="text-2xl mb-3">📋</div>
          <h3 className="font-serif text-[15px] font-medium mb-2">Verified Saves</h3>
          <p className="text-[12px] text-cream-secondary leading-relaxed">
            Every review requires match data: club, league, record, and FM version. No anonymous star ratings — every review has context you can evaluate.
          </p>
        </div>

        {/* Measured Results */}
        <div className="bg-surface border border-border rounded-[10px] p-5 md:p-6 transition-all duration-300 hover:border-[rgba(196,135,90,0.2)]">
          <div className="text-2xl mb-3">📊</div>
          <h3 className="font-serif text-[15px] font-medium mb-2">Measured Results</h3>
          <p className="text-[12px] text-cream-secondary leading-relaxed">
            Win rates are calculated across a minimum of 50 competitive matches. Sample size is always shown — no inflated stats from 3-game samples.
          </p>
        </div>

        {/* Context Tags */}
        <div className="bg-surface border border-border rounded-[10px] p-5 md:p-6 transition-all duration-300 hover:border-[rgba(196,135,90,0.2)]">
          <div className="text-2xl mb-3">🏷️</div>
          <h3 className="font-serif text-[15px] font-medium mb-2">Context Tags</h3>
          <p className="text-[12px] text-cream-secondary leading-relaxed">
            Every tactic shows team level, playing style, and FM version. A tactic that works for Man City won&apos;t necessarily work for Wrexham — we make that clear.
          </p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <a href="#" className="font-mono text-[11px] text-copper border-b border-transparent transition-all duration-300 hover:border-copper">
          Learn more about our methodology →
        </a>
      </div>
    </div>
  );
}
