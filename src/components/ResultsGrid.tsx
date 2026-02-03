'use client';

import { useState } from 'react';
import TacticCard from './TacticCard';

const TACTICS = [
  {
    formation: '4-2-3-1',
    version: 'FM26 · v1.0',
    title: "Bielsa's Vertical Hell",
    creator: 'WorkTheSpace',
    style: 'High Press',
    level: 'Mid-Table',
    rating: 4.7,
    reviewCount: 89,
    winRate: 81,
    quote: "Pure vertical football that doesn't let the opposition breathe. Next level pressing.",
    isTrending: true,
    trendingType: 'trending' as const,
    trendingDetail: '12k downloads this week',
    positions: [
      { top: '82%', left: '48%' },
      { top: '62%', left: '10%' },
      { top: '64%', left: '32%' },
      { top: '64%', left: '64%' },
      { top: '62%', left: '86%' },
      { top: '44%', left: '34%' },
      { top: '44%', left: '62%' },
      { top: '24%', left: '14%' },
      { top: '26%', left: '48%' },
      { top: '24%', left: '82%' },
      { top: '8%', left: '48%' },
    ],
  },
  {
    formation: '4-3-3',
    version: 'FM26 · v3.2',
    title: "Guardiola's Ghost",
    creator: 'TacticalPadre',
    style: 'Counter-Attack',
    level: 'Underdog',
    rating: 4.3,
    reviewCount: 142,
    winRate: 73,
    quote: "Parks the bus and still scores from nowhere. The ultimate siege mentality.",
    isTrending: true,
    trendingType: 'rising' as const,
    trendingDetail: '+340% reviews this week',
    positions: [
      { top: '82%', left: '48%' },
      { top: '62%', left: '10%' },
      { top: '64%', left: '32%' },
      { top: '64%', left: '64%' },
      { top: '62%', left: '86%' },
      { top: '40%', left: '22%' },
      { top: '38%', left: '48%' },
      { top: '40%', left: '74%' },
      { top: '16%', left: '14%' },
      { top: '10%', left: '48%' },
      { top: '16%', left: '82%' },
    ],
  },
  {
    formation: '4-3-3',
    version: 'FM25 · v5.2',
    title: "Knap's Standard",
    creator: 'Knap',
    style: 'Possession',
    level: 'Top Club',
    rating: 4.8,
    reviewCount: 203,
    winRate: 82,
    quote: "The GOAT of FM tactics. Twenty versions later and it still dominates everything.",
    positions: [
      { top: '82%', left: '48%' },
      { top: '62%', left: '10%' },
      { top: '64%', left: '32%' },
      { top: '64%', left: '64%' },
      { top: '62%', left: '86%' },
      { top: '40%', left: '22%' },
      { top: '38%', left: '48%' },
      { top: '40%', left: '74%' },
      { top: '16%', left: '14%' },
      { top: '10%', left: '48%' },
      { top: '16%', left: '82%' },
    ],
  },
  {
    formation: '4-2-3-1',
    version: 'FM26 · v1.3',
    title: 'Sacchi Reborn',
    creator: 'RDFTactics',
    style: 'High Press',
    level: 'Top Club',
    rating: 4.6,
    reviewCount: 98,
    winRate: 77,
    quote: "Sacchi would be proud. The pressing is automated, relentless, and devastating.",
    positions: [
      { top: '82%', left: '48%' },
      { top: '62%', left: '10%' },
      { top: '64%', left: '32%' },
      { top: '64%', left: '64%' },
      { top: '62%', left: '86%' },
      { top: '44%', left: '34%' },
      { top: '44%', left: '62%' },
      { top: '24%', left: '14%' },
      { top: '26%', left: '48%' },
      { top: '24%', left: '82%' },
      { top: '8%', left: '48%' },
    ],
  },
  {
    formation: '5-3-2',
    version: 'FM26 · v2.1',
    title: 'The Sardine Can',
    creator: 'BustTheNet',
    style: 'Counter-Attack',
    level: 'Lower League',
    rating: 4.1,
    reviewCount: 67,
    winRate: 73,
    quote: "Four promotions with Woking. This turned my no-name squad into a machine.",
    positions: [
      { top: '82%', left: '48%' },
      { top: '58%', left: '6%' },
      { top: '64%', left: '24%' },
      { top: '66%', left: '48%' },
      { top: '64%', left: '72%' },
      { top: '58%', left: '90%' },
      { top: '40%', left: '24%' },
      { top: '38%', left: '48%' },
      { top: '40%', left: '72%' },
      { top: '14%', left: '34%' },
      { top: '14%', left: '62%' },
    ],
  },
  {
    formation: '4-3-3',
    version: 'FM26 · v4.0',
    title: 'Fortress Europa',
    creator: 'DoctorBenjy',
    style: 'Balanced',
    level: 'Underdog',
    rating: 4.0,
    reviewCount: 54,
    winRate: 68,
    quote: "The ultimate siege mentality. Parks the bus with intelligence then hits on the break.",
    positions: [
      { top: '82%', left: '48%' },
      { top: '62%', left: '10%' },
      { top: '64%', left: '32%' },
      { top: '64%', left: '64%' },
      { top: '62%', left: '86%' },
      { top: '40%', left: '22%' },
      { top: '38%', left: '48%' },
      { top: '40%', left: '74%' },
      { top: '16%', left: '14%' },
      { top: '10%', left: '48%' },
      { top: '16%', left: '82%' },
    ],
  },
  {
    formation: '4-3-3',
    version: 'FM26 · v2.0',
    title: 'Budapest Blitz',
    creator: 'SecondYellow',
    style: 'Direct',
    level: 'Underdog',
    rating: 3.9,
    reviewCount: 43,
    winRate: 55,
    quote: "Not for everyone but when it clicks, it's the most entertaining FM you'll play.",
    positions: [
      { top: '82%', left: '48%' },
      { top: '62%', left: '10%' },
      { top: '64%', left: '32%' },
      { top: '64%', left: '64%' },
      { top: '62%', left: '86%' },
      { top: '40%', left: '22%' },
      { top: '38%', left: '48%' },
      { top: '40%', left: '74%' },
      { top: '16%', left: '14%' },
      { top: '10%', left: '48%' },
      { top: '16%', left: '82%' },
    ],
  },
  {
    formation: '4-4-2',
    version: 'FM26 · v1.1',
    title: 'The Low Block',
    creator: 'FM_Alchemist',
    style: 'Counter-Attack',
    level: 'Lower League',
    rating: 4.2,
    reviewCount: 71,
    winRate: 71,
    quote: "If your team has legs, this thing doesn't stop running. Pure chaos football.",
    positions: [
      { top: '82%', left: '48%' },
      { top: '62%', left: '10%' },
      { top: '64%', left: '32%' },
      { top: '64%', left: '64%' },
      { top: '62%', left: '86%' },
      { top: '40%', left: '8%' },
      { top: '42%', left: '32%' },
      { top: '42%', left: '64%' },
      { top: '40%', left: '88%' },
      { top: '14%', left: '34%' },
      { top: '14%', left: '62%' },
    ],
  },
];

interface ResultsGridProps {
  expanded: boolean;
  onExpand: () => void;
}

export default function ResultsGrid({ expanded, onExpand }: ResultsGridProps) {
  const [sortBy, setSortBy] = useState('rating');

  return (
    <div className="max-w-[1440px] mx-auto px-12 pt-8">
      {/* Collapsed state */}
      {!expanded && (
        <div 
          onClick={onExpand}
          className="relative overflow-hidden cursor-pointer transition-all duration-400 flex items-center gap-5 rounded-[10px] border border-border p-5 px-7 hover:border-[rgba(196,135,90,0.2)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
          style={{ background: 'linear-gradient(135deg, var(--surface), rgba(196,135,90,0.04))' }}
        >
          <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-copper rounded-l-[10px]" />
          <div className="text-[28px] flex-shrink-0">🔍</div>
          <div className="flex-1 min-w-0">
            <div className="text-[15px] text-cream font-serif font-medium mb-0.5">Don&apos;t know where to start?</div>
            <div className="text-xs text-cream-muted leading-relaxed">Use the filters above to narrow it down, or browse all 847 tactics in the catalog.</div>
          </div>
          <button className="px-5 py-2 bg-copper text-bg font-sans text-xs font-medium border-none rounded-md cursor-pointer whitespace-nowrap transition-all duration-300 flex-shrink-0 hover:bg-copper-bright hover:-translate-y-0.5">
            Browse all tactics →
          </button>
        </div>
      )}

      {/* Expanded state */}
      {expanded && (
        <>
          {/* Results bar */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-cream-secondary">
              Showing <strong className="text-cream font-medium">23 tactics</strong> matching your filters
            </span>
            <div className="flex gap-1 items-center">
              <span className="text-xs text-cream-muted mr-1.5">Sort:</span>
              {['Top Rated', 'Win Rate', 'Downloads', 'Newest'].map((sort) => {
                const sortKey = sort.toLowerCase().replace(' ', '-');
                return (
                  <button
                    key={sort}
                    onClick={() => setSortBy(sortKey)}
                    className={`px-4 py-[7px] bg-transparent border rounded-md text-[13px] font-sans cursor-pointer transition-all duration-300 ${
                      sortBy === sortKey
                        ? 'text-copper border-[rgba(196,135,90,0.25)] bg-copper-dim'
                        : 'text-cream-muted border-transparent hover:text-cream hover:bg-surface'
                    }`}
                  >
                    {sort}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tactics grid */}
          <div className="grid grid-cols-4 gap-3.5 mb-4">
            {TACTICS.map((tactic, index) => (
              <TacticCard key={index} {...tactic} />
            ))}

            {/* Submit CTA inline card */}
            <div 
              className="col-span-4 relative rounded-[10px] p-5 px-7 flex items-center gap-5 cursor-pointer transition-all duration-400 hover:-translate-y-0.5"
              style={{ 
                background: 'linear-gradient(135deg, rgba(196,135,90,0.06), rgba(196,135,90,0.02))',
                border: '1px dashed rgba(196,135,90,0.25)'
              }}
            >
              <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-copper rounded-l-[10px]" />
              <div className="text-2xl flex-shrink-0">📋</div>
              <div className="flex-1 min-w-0">
                <div className="font-serif text-base font-medium mb-0.5">Got a tactic that works? Share it with the community.</div>
                <div className="text-xs text-cream-muted leading-relaxed">Submit your FM tactic, get rated by real managers, and join the leaderboard.</div>
              </div>
              <button className="px-5 py-2 bg-copper text-bg font-sans text-xs font-medium border-none rounded-md cursor-pointer whitespace-nowrap transition-all duration-300 flex-shrink-0 hover:bg-copper-bright">
                Submit Tactic →
              </button>
            </div>
          </div>

          {/* Load more */}
          <div className="text-center pt-2">
            <button className="px-7 py-2 bg-surface border border-border rounded-md text-cream-secondary text-[13px] font-sans cursor-pointer transition-all duration-300 hover:border-copper hover:text-copper">
              Load more tactics →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
