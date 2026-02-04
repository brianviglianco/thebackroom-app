'use client';

const STEPS = [
  {
    number: 1,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
    title: 'Browse',
    description: 'Filter by formation, style, or team level. Find tactics that match how you want to play.',
  },
  {
    number: 2,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
    title: 'Verified Data',
    description: 'Every win rate comes from real saves tracked by the community — not creator claims or hype.',
  },
  {
    number: 3,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Download & Rate',
    description: 'Used it? Leave a review. Rate results, fun, and ease. Help others find what actually works.',
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-12 md:pt-16 pb-4 md:pb-8">
      <div className="text-center mb-8 md:mb-10">
        <div className="sec-eyebrow justify-center before:hidden">How it works</div>
        <p className="text-[13px] md:text-[14px] text-cream-secondary mt-2">
          See why our data is different from random forum posts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-[900px] mx-auto">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="relative bg-surface border border-border rounded-[12px] p-5 md:p-6 text-center group transition-all duration-300 hover:border-[rgba(196,135,90,0.2)] hover:bg-surface-hover"
          >
            {/* Icon */}
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-copper-dim flex items-center justify-center text-copper transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(196,135,90,0.15)]">
              {step.icon}
            </div>

            {/* Title */}
            <h3 className="font-serif text-[16px] md:text-[18px] font-medium mb-2 text-cream">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-[12px] md:text-[13px] text-cream-secondary leading-relaxed">
              {step.description}
            </p>

            {/* Step number */}
            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-bg border border-border flex items-center justify-center">
              <span className="font-mono text-[9px] text-cream-faint">{step.number}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
