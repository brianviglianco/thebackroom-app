'use client';

import { useState } from 'react';
import TacticCard from './TacticCard';

const MOCK_TACTICS = [
  {
    title: "Bielsa's Vertical Hell",
    creator: "WorkTheSpace",
    formation: "4-2-3-1",
    version: "FM26 · v1.0",
    style: "High Press",
    level: "Mid-Table",
    rating: 4.7,
    reviewCount: 89,
    winRate: 81,
    quote: "Pure vertical football that doesn't let the opposition breathe. Next level pressing.",
    isTrending: true,
    trendingType: 'trending' as const,
    trendingDetail: "12k downloads this week",
  },
  {
    title: "Guardiola's Ghost",
    creator: "TacticalPadre",
    formation: "4-3-3",
    version: "FM26 · v3.2",
    style: "Counter-Attack",
    level: "Underdog",
    rating: 4.3,
    reviewCount: 142,
    winRate: 73,
    quote: "Parks the bus and still scores from nowhere. The ultimate siege mentality.",
    isTrending: true,
    trendingType: 'rising' as const,
    trendingDetail: "+340% reviews this week",
  },
  {
    title: "Knap's Standard",
    creator: "Knap",
    formation: "4-3-3",
    version: "FM25 · v5.2",
    style: "Possession",
    level: "Top Club",
    rating: 4.8,
    reviewCount: 203,
    winRate: 82,
    quote: "The GOAT of FM tactics. Twenty versions later and it still dominates everything.",
  },
  {
    title: "Sacchi Reborn",
    creator: "RDFTactics",
    formation: "4-2-3-1",
    version: "FM26 · v1.3",
    style: "High Press",
    level: "Top Club",
    rating: 4.6,
    reviewCount: 98,
    winRate: 77,
    quote: "Sacchi would be proud. The pressing is automated, relentless, and devastating.",
  },
  {
    title: "The Sardine Can",
    creator: "BustTheNet",
    formation: "5-3-2",
    version: "FM26 · v2.1",
    style: "Counter-Attack",
    level: "Lower League",
    rating: 4.1,
    reviewCount: 67,
    winRate: 73,
    quote: "Four promotions with Woking. This turned my no-name squad into a machine.",
  },
  {
    title: "Fortress Europa",
    creator: "DoctorBenjy",
    formation: "4-3-3",
    version: "FM26 · v4.0",
    style: "Balanced",
    level: "Underdog",
    rating: 4.0,
    reviewCount: 54,
    winRate: 68,
    quote: "The ultimate siege mentality. Parks the bus with intelligence then hits on the break.",
  },
  {
    title: "Budapest Blitz",
    creator: "SecondYellow",
    formation: "4-3-3",
    version: "FM26 · v2.0",
    style: "Direct",
    level: "Underdog",
    rating: 3.9,
    reviewCount: 43,
    winRate: 55,
    quote: "Not for everyone but when it clicks, it's the most entertaining FM you'll play.",
  },
  {
    title: "The Low Block",
    creator: "FM_Alchemist",
    formation: "4-4-2",
    version: "FM26 · v1.1",
    style: "Counter-Attack",
    level: "Lower League",
    rating: 4.2,
    reviewCount: 71,
    winRate: 71,
    quote: "If your team has legs, this thing doesn't stop running. Pure chaos football.",
  },
];

export default function ResultsGrid() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortBy, setSortBy] = useState('rating');

  if (!isExpanded) {
    return (
      <div className="max-w-[1440px] mx-auto px-12 pt-8">
        <div 
          onClick={() => setIsExpanded(true)}
          className="bg-surface border border-border rounded-[10px] p-5 px-7 relative overflow-hidden cursor-pointer transition-all duration-400 flex items-center gap-5 hover:border-[rgba(196,135,90,0.2)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
          style={{ background: 'linear-gradient(135deg, var(--surface), rgba(196,135,90,0.04))' }}
        >
          <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-copper rounded-[3px_0_0_3px]" />
          <div className="text-[28px] flex-shrink-0">🔍</div>
          <div className="flex-1 min-w-0">
            <div className="text-[15px] text-cream font-serif font-medium mb-0.5">Don't know where to start?</div>
            <div className="text-xs text-cream-muted leading-normal">
              Use the filters above to narrow it down, or browse all 847 tactics in the catalog.
            </div>
          </div>
          <button className="px-5 py-2 bg-copper text-bg font-sans text-xs font-medium border-none rounded-md cursor-pointer whitespace-nowrap transition-all duration-300 flex-shrink-0 hover:bg-copper-bright hover:-translate-y-0.5">
            Browse all tactics →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-12 pt-8">
      {/* Results bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-cream-secondary">
          Showing <strong className="text-cream font-medium">23 tactics</strong> matching your filters
        </span>
        <div className="flex gap-1 items-center">
          <span className="text-xs text-cream-muted mr-1.5">Sort:</span>
          {['Top Rated', 'Win Rate', 'Downloads', 'Newest'].map((option) => (
            <button
              key={option}
              onClick={() => setSortBy(option.toLowerCase())}
              className={`px-4 py-[7px] bg-transparent border border-transparent rounded-md text-cream-muted text-[13px] font-sans cursor-pointer transition-all duration-300 hover:text-cream hover:bg-surface ${
                sortBy === option.toLowerCase().replace(' ', '-')
                  ? 'text-copper !border-[rgba(196,135,90,0.25)] !bg-copper-dim'
                  : ''
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-3.5 mb-4">
        {MOCK_TACTICS.map((tactic, index) => (
          <TacticCard key={index} {...tactic} />
        ))}

        {/* Submit CTA inline card */}
        <div className="col-span-full relative rounded-[10px] p-5 px-7 flex items-center gap-5 cursor-pointer transition-all duration-400 border border-dashed border-[rgba(196,135,90,0.25)] hover:border-copper hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, rgba(196,135,90,0.06), rgba(196,135,90,0.02))' }}
        >
          <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-copper rounded-[10px_0_0_10px]" />
          <div className="text-2xl flex-shrink-0">📋</div>
          <div className="flex-1 min-w-0">
            <div className="font-serif text-base font-medium mb-0.5">Got a tactic that works? Share it with the community.</div>
            <div className="text-xs text-cream-muted leading-normal">
              Submit your FM tactic, get rated by real managers, and join the leaderboard.
            </div>
          </div>
          <button className="px-[22px] py-2 bg-copper text-bg text-xs font-medium font-sans border-none rounded-md cursor-pointer transition-all duration-300 flex-shrink-0 whitespace-nowrap hover:bg-copper-bright">
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
    </div>
  );
}
