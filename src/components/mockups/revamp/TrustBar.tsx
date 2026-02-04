'use client';

export default function TrustBar() {
  return (
    <div className="border-b border-border" style={{ background: 'linear-gradient(135deg, rgba(196,135,90,0.04), rgba(196,135,90,0.01))' }}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-3 md:py-3.5">
        <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-copper text-[11px]">&#10003;</span>
            <span className="font-mono text-[10px] md:text-[11px] text-cream-secondary tracking-[0.02em]">Verified saves</span>
          </div>
          <span className="w-[1px] h-3 bg-border hidden md:block" />
          <div className="flex items-center gap-2">
            <span className="text-copper text-[11px]">&#10003;</span>
            <span className="font-mono text-[10px] md:text-[11px] text-cream-secondary tracking-[0.02em]">Measured win rates</span>
          </div>
          <span className="w-[1px] h-3 bg-border hidden md:block" />
          <div className="flex items-center gap-2">
            <span className="text-copper text-[11px]">&#10003;</span>
            <span className="font-mono text-[10px] md:text-[11px] text-cream-secondary tracking-[0.02em]">Reviews with match context</span>
          </div>
          <a href="#" className="font-mono text-[9px] md:text-[10px] text-cream-faint transition-colors duration-300 hover:text-copper tracking-[0.04em] hidden md:inline">
            How it works →
          </a>
        </div>
      </div>
    </div>
  );
}
