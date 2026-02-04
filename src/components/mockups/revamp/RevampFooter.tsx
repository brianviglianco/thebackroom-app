'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RevampFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) setSubscribed(true);
  };

  return (
    <footer className="border-t border-border">
      {/* Newsletter row — compact, absorbed into footer */}
      <div className="border-b border-border" style={{ background: 'linear-gradient(135deg, rgba(196,135,90,0.04), rgba(196,135,90,0.01))' }}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-4 md:py-5">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-copper">Weekly Digest</span>
                <span className="w-[18px] h-[1px] bg-copper opacity-30" />
              </div>
              <p className="text-[12px] md:text-[13px] text-cream-secondary mt-1 font-light">
                Top-rated tactics, trending formations, and FM tips. Every Friday.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              {!subscribed ? (
                <>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 md:w-[220px] px-3 py-2 bg-bg border border-border rounded-md text-cream text-[13px] font-sans outline-none transition-colors duration-300 focus:border-[rgba(196,135,90,0.3)] placeholder:text-cream-muted"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="px-4 py-2 bg-copper border-none rounded-md text-bg text-[12px] font-medium font-sans cursor-pointer transition-all duration-300 whitespace-nowrap hover:bg-copper-bright flex-shrink-0"
                  >
                    Subscribe
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2 text-green-accent font-mono text-[12px]">
                  <span>&#10003;</span> You&apos;re in. First digest drops this Friday.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-6 md:gap-9">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 max-w-[260px]">
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
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="text-cream-faint transition-colors duration-300 hover:text-copper" aria-label="Discord">
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              </a>
              <a href="#" className="text-cream-faint transition-colors duration-300 hover:text-copper" aria-label="X (Twitter)">
                <svg className="w-[16px] h-[16px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="text-cream-faint transition-colors duration-300 hover:text-copper" aria-label="Instagram">
                <svg className="w-[17px] h-[17px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
            </div>
          </div>

          {/* Browse */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.12em] uppercase text-cream-muted mb-3.5">Browse</h4>
            <nav className="flex flex-col">
              <Link href="/tactics" className="text-cream-secondary text-[13px] py-0.5 transition-colors duration-300 hover:text-copper">All Tactics</Link>
              <Link href="/ranking" className="text-cream-secondary text-[13px] py-0.5 transition-colors duration-300 hover:text-copper">Ranking</Link>
              <Link href="/staff-picks" className="text-cream-secondary text-[13px] py-0.5 transition-colors duration-300 hover:text-copper">Staff Picks</Link>
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
              <Link href="/privacy" className="text-cream-secondary text-[13px] py-0.5 transition-colors duration-300 hover:text-copper">Privacy Policy</Link>
              <Link href="/terms" className="text-cream-secondary text-[13px] py-0.5 transition-colors duration-300 hover:text-copper">Terms of Service</Link>
            </nav>
          </div>
        </div>

        <div className="mt-6 md:mt-9 pt-5 border-t border-border flex flex-col md:flex-row justify-between gap-2 text-xs text-cream-faint">
          <span>&copy; 2026 The Backroom. All rights reserved.</span>
          <a href="/" className="transition-colors duration-300 hover:text-copper">thebackroom.fm</a>
        </div>
      </div>
    </footer>
  );
}
