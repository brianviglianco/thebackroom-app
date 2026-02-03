'use client';

import Link from 'next/link';
import { Logo } from './Logo';

const navLinks = [
  { href: '/', label: 'Tactics', active: true },
  { href: '/ranking', label: 'Ranking' },
  { href: '/managers', label: 'Managers' },
  { href: '/about', label: 'About' },
];

export function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/[0.92] backdrop-blur-nav border-b border-border/50">
      <div className="max-w-[1440px] mx-auto px-12 h-[54px] flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <Logo className="h-8 w-8" />
          <span className="font-serif text-lg font-medium text-copper tracking-tight">
            the backroom
          </span>
        </Link>

        {/* Search */}
        <div className="flex items-center gap-2 bg-surface border border-border rounded-[7px] px-3 py-1.5 w-[260px] flex-shrink-0 transition-all duration-400 focus-within:border-copper/30 focus-within:shadow-copper-glow focus-within:w-[520px]">
          <span className="text-cream-muted text-sm flex-shrink-0">⌕</span>
          <input
            type="text"
            placeholder="Search tactics..."
            className="bg-transparent border-none text-cream text-sm font-sans w-full outline-none placeholder:text-cream-muted"
          />
          <span className="font-mono text-[9px] text-cream-faint px-1.5 py-0.5 border border-border rounded flex-shrink-0">
            /
          </span>
        </div>

        {/* Nav Links */}
        <ul className="hidden lg:flex gap-7 list-none flex-1 justify-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm transition-colors duration-300 ${
                  link.active
                    ? 'text-cream'
                    : 'text-cream-muted hover:text-cream'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex gap-4 ml-auto flex-shrink-0 items-center">
          <button className="btn-ghost text-[13px] p-0">Log in</button>
          <button className="btn-primary py-[7px] px-[18px] text-[13px]">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}
