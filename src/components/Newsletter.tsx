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
    <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
      <div
        className="relative rounded-xl overflow-hidden p-6 md:p-10 px-5 md:px-12"
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

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
          {/* Left: Copy */}
          <div className="flex-1 max-w-[520px]">
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-copper mb-2 flex items-center gap-2">
              <span className="w-[14px] h-[1px] bg-copper" />
              📬 Newsletter
            </div>
            <h3 className="font-serif text-[20px] md:text-[22px] font-medium tracking-tight mb-2">
              The Matchday Brief
            </h3>
            <p className="text-[12px] md:text-[13px] text-cream-secondary leading-relaxed">
              Top tactics, trending shapes, and creator spotlights&mdash;delivered Fridays. Free. No spam.
            </p>
          </div>

          {/* Right: Form */}
          <div className="flex-shrink-0 w-full md:w-[400px]">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
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
                  SUBSCRIBE
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2.5 py-3">
                <span className="text-copper text-lg">&#10003;</span>
                <span className="text-cream-secondary text-[14px]">
                  You&apos;re in. See you on matchday.
                </span>
              </div>
            )}
            <p className="text-[11px] text-cream-faint mt-2.5">
              Join 2,400+ FM managers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
