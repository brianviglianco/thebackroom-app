'use client';

import { useState } from 'react';

export default function NewsletterCompact() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
      {/* CHANGED: ~25% smaller — reduced padding, smaller fonts */}
      <div
        className="relative rounded-xl overflow-hidden p-4 md:p-7 px-4 md:px-8"
        style={{
          background: 'linear-gradient(135deg, rgba(196,135,90,0.08), rgba(196,135,90,0.03))',
          border: '1px solid rgba(196,135,90,0.15)',
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] opacity-40" style={{ background: 'linear-gradient(90deg, transparent, var(--copper), transparent)' }} />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
          {/* Left */}
          <div className="flex-1 max-w-[460px]">
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-copper mb-1.5 flex items-center gap-2">
              <span className="w-[14px] h-[1px] bg-copper" />
              Weekly Digest
            </div>
            <h3 className="font-serif text-[17px] md:text-[19px] font-medium tracking-tight mb-1">
              Get the best tactics before everyone else
            </h3>
            <p className="text-[11px] md:text-[12px] text-cream-secondary leading-relaxed">
              Every Friday: top-rated tactics, trending formations, creator spotlights. Free, no spam.
            </p>
          </div>

          {/* Right */}
          <div className="flex-shrink-0 w-full md:w-[360px]">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-3 py-2.5 bg-bg border border-border rounded-[7px] text-cream text-[12px] font-sans placeholder:text-cream-faint transition-colors duration-300 focus:border-[rgba(196,135,90,0.3)] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-copper border-none rounded-[7px] text-bg text-[12px] font-medium font-sans cursor-pointer transition-all duration-300 whitespace-nowrap shadow-[0_4px_16px_rgba(196,135,90,0.25)] hover:bg-copper-bright hover:-translate-y-0.5"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2.5 py-2">
                <span className="text-copper text-base">&#10003;</span>
                <span className="text-cream-secondary text-[13px]">You&apos;re in. First digest drops this Friday.</span>
              </div>
            )}
            <p className="text-[10px] text-cream-faint mt-2">
              Join 2,400+ FM managers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
