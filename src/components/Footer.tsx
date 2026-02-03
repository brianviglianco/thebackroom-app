import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="max-w-[1440px] mx-auto px-12 py-10 border-t border-border">
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-9">
        {/* Brand */}
        <div className="max-w-[260px]">
          <Link href="/" className="flex items-center gap-2.5">
            <svg className="h-[34px] w-[34px]" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="94" height="94" rx="14" ry="14" fill="none" stroke="#C4875A" strokeWidth="2"/>
              <line x1="10" y1="56" x2="90" y2="56" stroke="#C4875A" strokeWidth="1.0" strokeOpacity="0.30"/>
              <circle cx="50" cy="56" r="11" fill="none" stroke="#C4875A" strokeWidth="1.0" strokeOpacity="0.28"/>
              <rect x="20" y="5" width="60" height="24" rx="1" fill="none" stroke="#C4875A" strokeWidth="0.9" strokeOpacity="0.25"/>
              <rect x="32" y="5" width="36" height="11" rx="1" fill="none" stroke="#C4875A" strokeWidth="0.8" strokeOpacity="0.22"/>
              <circle cx="50" cy="22" r="1.2" fill="#C4875A" fillOpacity="0.25"/>
              <path d="M5,5 Q5,12 12,12" fill="none" stroke="#C4875A" strokeWidth="0.7" strokeOpacity="0.20"/>
              <path d="M95,5 Q95,12 88,12" fill="none" stroke="#C4875A" strokeWidth="0.7" strokeOpacity="0.20"/>
              <circle cx="50" cy="88" r="4" fill="#C4875A"/>
              <circle cx="18" cy="70" r="4" fill="#C4875A"/>
              <circle cx="39" cy="70" r="4" fill="#C4875A"/>
              <circle cx="61" cy="70" r="4" fill="#C4875A"/>
              <circle cx="82" cy="70" r="4" fill="#C4875A"/>
              <circle cx="28" cy="48" r="4" fill="#C4875A"/>
              <circle cx="50" cy="52" r="4" fill="#C4875A"/>
              <circle cx="72" cy="48" r="4" fill="#C4875A"/>
              <circle cx="24" cy="24" r="4" fill="#C4875A"/>
              <circle cx="50" cy="20" r="4" fill="#C4875A"/>
              <circle cx="76" cy="24" r="4" fill="#C4875A"/>
            </svg>
            <span className="font-serif text-xl font-medium text-copper tracking-tight">the backroom</span>
          </Link>
          <p className="text-[13px] text-cream-muted leading-relaxed mt-2.5">
            Football Manager tactics, rated and reviewed by the community.
          </p>
        </div>

        {/* Browse */}
        <div>
          <h4 className="font-mono text-[10px] tracking-[0.12em] uppercase text-cream-muted mb-3.5">Browse</h4>
          <nav className="flex flex-col">
            <Link href="/tactics" className="text-cream-secondary text-[13px] py-0.5 transition-colors duration-300 hover:text-copper">All Tactics</Link>
            <Link href="/ranking" className="text-cream-secondary text-[13px] py-0.5 transition-colors duration-300 hover:text-copper">Ranking</Link>
            <Link href="/top-rated" className="text-cream-secondary text-[13px] py-0.5 transition-colors duration-300 hover:text-copper">Top Rated</Link>
            <Link href="/new" className="text-cream-secondary text-[13px] py-0.5 transition-colors duration-300 hover:text-copper">New This Week</Link>
          </nav>
        </div>

        {/* Community */}
        <div>
          <h4 className="font-mono text-[10px] tracking-[0.12em] uppercase text-cream-muted mb-3.5">Community</h4>
          <nav className="flex flex-col">
            <Link href="/managers" className="text-cream-secondary text-[13px] py-0.5 transition-colors duration-300 hover:text-copper">Managers</Link>
            <Link href="/discord" className="text-cream-secondary text-[13px] py-0.5 transition-colors duration-300 hover:text-copper">Discord</Link>
            <Link href="/submit" className="text-cream-secondary text-[13px] py-0.5 transition-colors duration-300 hover:text-copper">Submit Tactic</Link>
          </nav>
        </div>

        {/* About */}
        <div>
          <h4 className="font-mono text-[10px] tracking-[0.12em] uppercase text-cream-muted mb-3.5">About</h4>
          <nav className="flex flex-col">
            <Link href="/about" className="text-cream-secondary text-[13px] py-0.5 transition-colors duration-300 hover:text-copper">About</Link>
            <Link href="/faq" className="text-cream-secondary text-[13px] py-0.5 transition-colors duration-300 hover:text-copper">FAQ</Link>
            <Link href="/contact" className="text-cream-secondary text-[13px] py-0.5 transition-colors duration-300 hover:text-copper">Contact</Link>
          </nav>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-9 pt-5 border-t border-border flex justify-between text-xs text-cream-faint">
        <span>© 2026 The Backroom. All rights reserved.</span>
        <span>thebackroom.fm</span>
      </div>
    </footer>
  );
}
