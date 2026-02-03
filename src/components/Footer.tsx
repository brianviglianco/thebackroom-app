import Link from 'next/link';
import { Logo } from './Logo';

const footerLinks = {
  browse: [
    { href: '/explore', label: 'All Tactics' },
    { href: '/ranking', label: 'Ranking' },
    { href: '/explore?sort=top-rated', label: 'Top Rated' },
    { href: '/explore?sort=newest', label: 'New This Week' },
  ],
  community: [
    { href: '/managers', label: 'Managers' },
    { href: '/discord', label: 'Discord' },
    { href: '/submit', label: 'Submit Tactic' },
  ],
  about: [
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ],
};

export function Footer() {
  return (
    <footer className="max-w-[1440px] mx-auto px-12 py-10 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9">
        {/* Brand */}
        <div className="max-w-[260px]">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo className="h-[34px] w-[34px]" />
            <span className="font-serif text-xl font-medium text-copper tracking-tight">
              the backroom
            </span>
          </Link>
          <p className="text-sm text-cream-muted leading-relaxed mt-2.5">
            Football Manager tactics, rated and reviewed by the community.
          </p>
        </div>

        {/* Browse */}
        <div>
          <h4 className="font-mono text-[10px] tracking-[0.12em] uppercase text-cream-muted mb-3.5">
            Browse
          </h4>
          {footerLinks.browse.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-cream-secondary text-sm py-0.5 transition-colors duration-300 hover:text-copper"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Community */}
        <div>
          <h4 className="font-mono text-[10px] tracking-[0.12em] uppercase text-cream-muted mb-3.5">
            Community
          </h4>
          {footerLinks.community.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-cream-secondary text-sm py-0.5 transition-colors duration-300 hover:text-copper"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* About */}
        <div>
          <h4 className="font-mono text-[10px] tracking-[0.12em] uppercase text-cream-muted mb-3.5">
            About
          </h4>
          {footerLinks.about.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-cream-secondary text-sm py-0.5 transition-colors duration-300 hover:text-copper"
            >
              {link.label}
            </Link>
          ))}
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
