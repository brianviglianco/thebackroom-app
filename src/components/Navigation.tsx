'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[rgba(16,14,12,0.92)] backdrop-blur-[24px] border-b border-[rgba(42,36,28,0.5)]">
      <div className="max-w-[1440px] mx-auto px-12 h-[54px] flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <svg className="h-8 w-8" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
          <span className="font-serif text-lg font-medium text-copper tracking-tight">the backroom</span>
        </Link>

        {/* Search */}
        <div 
          className={`flex items-center gap-2 bg-surface border border-border rounded-[7px] px-3 py-1.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex-shrink-0 ${
            searchFocused ? 'w-[520px] border-[rgba(196,135,90,0.3)] shadow-[0_0_16px_var(--copper-dim)]' : 'w-[260px]'
          }`}
        >
          <span className="text-cream-muted text-sm flex-shrink-0">⌕</span>
          <input 
            type="text" 
            placeholder="Search tactics..."
            className="bg-transparent border-none text-cream text-[13px] font-sans w-full outline-none placeholder:text-cream-muted"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <span className="font-mono text-[9px] text-cream-faint px-1.5 py-0.5 border border-border rounded-[3px] flex-shrink-0">/</span>
        </div>

        {/* Nav Links */}
        <ul className="flex gap-7 list-none flex-1 justify-center">
          <li><Link href="/" className="text-cream text-sm transition-colors duration-300 hover:text-cream">Tactics</Link></li>
          <li><Link href="/ranking" className="text-cream-muted text-sm transition-colors duration-300 hover:text-cream">Ranking</Link></li>
          <li><Link href="/managers" className="text-cream-muted text-sm transition-colors duration-300 hover:text-cream">Managers</Link></li>
          <li><Link href="/about" className="text-cream-muted text-sm transition-colors duration-300 hover:text-cream">About</Link></li>
        </ul>

        {/* Right Buttons */}
        <div className="flex gap-4 ml-auto flex-shrink-0 items-center">
          <button className="bg-transparent border-none text-cream-muted text-[13px] font-sans cursor-pointer transition-colors duration-300 hover:text-cream p-0">
            Log in
          </button>
          <button className="px-[18px] py-[7px] bg-copper border-none rounded-md text-bg text-[13px] font-medium font-sans cursor-pointer transition-all duration-300 tracking-tight hover:bg-copper-bright hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(196,135,90,0.3)]">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}
