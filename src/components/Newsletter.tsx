'use client';

import { useState } from 'react';

export default function Newsletter() {
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
    <section className="max-w-[1440px] mx-auto px-12">
      <div
        className="relative rounded-xl overflow-hidden p-10 px-12"
        style={{
          background: 'linear-gradient(135deg, rgba(196,135,90,0.08), rgba(196,135,90,0.03))',
          border: '1px solid rgba(196,135,90,0.15)',
        }}
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] opacity-40"
          style={{ background: 'linear-gradient(90deg, transparent, var(--copper), transparent)' }}
        />

        <div className="flex items-center justify-between gap-12">
          {/* Left: Copy */}
          <div className="flex-1 max-w-[520px]">
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-copper mb-2 flex items-center gap-2">
              <span className="w-[14px] h-[1px] bg-copper" />
              Weekly Digest
            </div>
            <h3 className="font-serif text-[22px] font-medium tracking-tight mb-2">
              Get the best tactics before everyone else
            </h3>
            <p className="text-[13px] text-cream-secondary leading-relaxed">
              Every Friday: top-rated new tactics, trending formations, creator spotlights, and FM tips from the community. Free, no spam, unsubscribe anytime.
            </p>
          </div>

          {/* Right: Form */}
          <div className="flex-shrink-0 w-[400px]">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 bg-bg border border-border rounded-[7px] text-cream text-[13px] font-sans placeholder:text-cream-faint transition-colors duration-300 focus:border-[rgba(196,135,90,0.3)] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-copper border-none rounded-[7px] text-bg text-[13px] font-medium font-sans cursor-pointer transition-all duration-300 whitespace-nowrap shadow-[0_4px_16px_rgba(196,135,90,0.25)] hover:bg-copper-bright hover:-translate-y-0.5"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2.5 py-3">
                <span className="text-copper text-lg">&#10003;</span>
                <span className="text-cream-secondary text-[14px]">
                  You&apos;re in. First digest drops this Friday.
                </span>
              </div>
            )}
            <p className="text-[11px] text-cream-faint mt-2.5">
              Join 2,400+ FM managers. Read by creators like Knap, WorkTheSpace, and Zealand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
