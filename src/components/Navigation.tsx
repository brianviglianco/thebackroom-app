'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[rgba(26,23,20,0.92)] backdrop-blur-[24px] border-b border-[rgba(62,54,44,0.5)]">
      {/* Top copper accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-30"
        style={{ background: 'linear-gradient(90deg, transparent, var(--copper), transparent)' }}
      />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 h-[54px] flex items-center gap-3 md:gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-2.5 flex-shrink-0">
          <svg className="h-7 w-7 md:h-8 md:w-8" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
          <span className="font-serif text-base md:text-lg font-medium text-copper tracking-tight">the backroom</span>
        </Link>

        {/* Search - hidden on mobile, visible on md+ */}
        <div
          className={`hidden md:flex items-center gap-2 bg-surface border border-border rounded-[7px] px-3 py-1.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex-shrink-0 ${
            searchFocused ? 'w-[520px] border-[rgba(196,135,90,0.3)] shadow-[0_0_16px_var(--copper-dim)]' : 'w-[260px]'
          }`}
        >
          <span className="text-cream-muted text-sm flex-shrink-0">⌕</span>
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent border-none text-cream text-[13px] font-sans w-full outline-none placeholder:text-cream-muted"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <span className="font-mono text-[9px] text-cream-faint px-1.5 py-0.5 border border-border rounded-[3px] flex-shrink-0">/</span>
        </div>

        {/* Nav Links - hidden on mobile */}
        <ul className="hidden lg:flex gap-5 list-none flex-1 justify-center">
          <li><Link href="/how-it-works" className="text-cream-muted text-[14px] transition-colors duration-300 hover:text-cream">How It Works</Link></li>
          <li>
            <Link href="/" className="text-cream-muted text-[14px] transition-colors duration-300 hover:text-cream">
              Tactics
            </Link>
          </li>
          <li><Link href="/ranking" className="text-cream-muted text-[14px] transition-colors duration-300 hover:text-cream">Ranking</Link></li>
          <li><Link href="/creators" className="text-cream-muted text-[14px] transition-colors duration-300 hover:text-cream">Creators</Link></li>
          <li><Link href="/about" className="text-cream-muted text-[14px] transition-colors duration-300 hover:text-cream">About</Link></li>
        </ul>

        {/* Right Side - desktop */}
        <div className="hidden lg:flex gap-4 ml-auto flex-shrink-0 items-center">
          <Link
            href="/submit"
            className="font-mono text-[12px] text-copper transition-colors duration-300 hover:text-copper-bright border-r border-border pr-4 flex items-center gap-1"
          >
            <span className="text-[14px] leading-none">+</span> Submit
          </Link>
          <button className="bg-transparent border-none text-cream-muted text-[13px] font-sans cursor-pointer transition-colors duration-300 hover:text-cream p-0">
            Log in
          </button>
          <button className="px-[18px] py-[7px] bg-copper border-none rounded-md text-bg text-[13px] font-medium font-sans cursor-pointer transition-all duration-300 tracking-tight shadow-[0_2px_10px_rgba(196,135,90,0.2)] hover:bg-copper-bright hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(196,135,90,0.3)]">
            Sign up
          </button>
        </div>

        {/* Mobile: Sign up + Hamburger */}
        <div className="flex lg:hidden items-center gap-3 ml-auto">
          <button className="px-3 py-1.5 bg-copper border-none rounded-md text-bg text-[12px] font-medium font-sans cursor-pointer">
            Sign up
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-transparent border-none text-cream p-1 cursor-pointer"
            aria-label="Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-[rgba(26,23,20,0.98)] backdrop-blur-[24px]">
          {/* Mobile search */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2 bg-surface border border-border rounded-[7px] px-3 py-2">
              <span className="text-cream-muted text-sm">⌕</span>
              <input
                type="text"
                placeholder="Search anything..."
                className="bg-transparent border-none text-cream text-[13px] font-sans w-full outline-none placeholder:text-cream-muted"
              />
            </div>
          </div>
          {/* Nav links */}
          <div className="flex flex-col py-2">
            <Link href="/how-it-works" onClick={() => setMenuOpen(false)} className="px-4 py-3 text-cream-muted text-[15px] border-b border-border">How It Works</Link>
            <Link href="/" onClick={() => setMenuOpen(false)} className="px-4 py-3 text-cream text-[15px] border-b border-border">Tactics</Link>
            <Link href="/ranking" onClick={() => setMenuOpen(false)} className="px-4 py-3 text-cream-muted text-[15px] border-b border-border">Ranking</Link>
            <Link href="/creators" onClick={() => setMenuOpen(false)} className="px-4 py-3 text-cream-muted text-[15px] border-b border-border">Creators</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="px-4 py-3 text-cream-muted text-[15px] border-b border-border">About</Link>
            <Link href="/submit" onClick={() => setMenuOpen(false)} className="px-4 py-3 text-copper text-[15px] border-b border-border">+ Submit Tactic</Link>
          </div>
          {/* Auth */}
          <div className="px-4 py-3 flex items-center gap-3">
            <button className="bg-transparent border-none text-cream-muted text-[14px] font-sans cursor-pointer p-0">Log in</button>
          </div>
        </div>
      )}
    </nav>
  );
}
