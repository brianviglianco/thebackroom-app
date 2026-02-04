'use client';

import { useState } from 'react';

const BADGES = [
  {
    label: '🏆 Consecutive Promotions',
    description: 'Achieved by 3 or more managers using this tactic across different saves. Verified through submitted match records.',
  },
  {
    label: '⚡ X Reviews',
    description: 'Total number of structured reviews with match data (club, league, W-D-L record). Not just star ratings — each includes context.',
  },
  {
    label: '📈 Trending X weeks',
    description: 'This tactic has been in the top 10 most downloaded tactics for the specified number of consecutive weeks.',
  },
  {
    label: '✓ FM-Arena tested',
    description: 'Validated through 100+ match simulation testing on FM-Arena.com, an independent third-party benchmarking tool for FM tactics.',
  },
  {
    label: '✓ Verified creator',
    description: 'Creator identity verified. Minimum 3 published tactics with 4.0+ average rating and 50+ total reviews.',
  },
];

export default function BadgeGuide() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 mb-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 bg-transparent border-none cursor-pointer group py-2"
      >
        <span className="font-mono text-[11px] text-cream-muted tracking-[0.04em] transition-colors duration-300 group-hover:text-copper">
          What do these badges mean?
        </span>
        <span className={`text-cream-faint text-[10px] transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {expanded && (
        <div className="bg-surface border border-border rounded-[10px] p-4 md:p-5 mt-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {BADGES.map((badge, idx) => (
            <div key={idx} className="flex gap-3">
              <div>
                <div
                  className="font-mono text-[10px] tracking-[0.04em] px-2.5 py-1 border rounded text-copper mb-1.5 inline-block"
                  style={{ background: 'rgba(196,135,90,0.08)', borderColor: 'rgba(196,135,90,0.12)' }}
                >
                  {badge.label}
                </div>
                <p className="text-[11px] text-cream-muted leading-relaxed">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
