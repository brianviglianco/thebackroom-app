'use client';

import { useState, useCallback } from 'react';
import HeroCanvas from './HeroCanvas';

export default function Hero() {
  const [actionFeed, setActionFeed] = useState({ action: '', name: '' });

  // FIXED: useCallback prevents creating a new function reference on every render
  // This stops the HeroCanvas useEffect from resetting the animation
  const handleActionChange = useCallback((action: string, name: string) => {
    setActionFeed({ action, name });
  }, []);

  const isGoal = actionFeed.action.includes('GOAL');

  return (
    <div className="relative overflow-hidden border-b border-border min-h-[520px]">
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(165deg, var(--bg) 0%, #1C2218 30%, #20291D 60%, #263524 100%)'
        }}
      />

      {/* Canvas animation */}
      <HeroCanvas onActionChange={handleActionChange} />

      {/* Overlays */}
      <div 
        className="absolute inset-0 z-[2]"
        style={{
          background: 'linear-gradient(to right, var(--bg) 0%, rgba(26,23,20,0.97) 12%, rgba(26,23,20,0.85) 28%, rgba(26,23,20,0.55) 45%, rgba(26,23,20,0.2) 62%, rgba(26,23,20,0) 80%)'
        }}
      />
      <div 
        className="absolute top-0 left-0 right-0 h-[90px] z-[3]"
        style={{
          background: 'linear-gradient(to bottom, rgba(26,23,20,0.9) 0%, rgba(26,23,20,0.4) 50%, rgba(26,23,20,0) 100%)'
        }}
      />
      <div 
        className="absolute bottom-0 left-0 right-0 h-[60px] z-[3]"
        style={{
          background: 'linear-gradient(to top, var(--bg), rgba(26,23,20,0))'
        }}
      />

      {/* Content */}
      <div 
        className="relative z-[5] max-w-[580px] pt-[120px] pb-16 flex flex-col justify-center min-h-[520px]"
        style={{ marginLeft: 'max(48px, calc((100vw - 1440px)/2 + 48px))' }}
      >
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-copper mb-4 flex items-center gap-2.5">
          <span className="w-[18px] h-[1px] bg-copper" />
          thebackroom.fm
        </div>
        <h1 className="font-serif text-hero font-normal leading-[1.08] tracking-tight mb-4">
          Find the <em className="italic font-light text-copper">right</em><br />
          Football Manager tactic<br />
          for <em className="italic font-light text-copper">your save</em>
        </h1>
        <p className="text-[15px] text-cream-secondary max-w-[440px] leading-relaxed font-light mb-7">
          Structured reviews with win rates, team context, and match data from real saves. Not hype — evidence.
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => document.getElementById('explore-tactics')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 bg-copper border-none rounded-[7px] text-bg text-[14px] font-medium font-sans cursor-pointer transition-all duration-300 shadow-[0_4px_16px_rgba(196,135,90,0.25)] hover:bg-copper-bright hover:-translate-y-0.5"
          >
            Explore Tactics
          </button>
          <a href="#community" className="font-mono text-[12px] text-cream-muted transition-colors duration-300 hover:text-copper">
            Browse managers →
          </a>
        </div>
      </div>

      {/* Action Feed */}
      <div className="absolute bottom-8 right-9 z-[6] flex flex-col items-end gap-2">
        <div className="font-mono text-[8px] tracking-[0.15em] uppercase text-cream-faint mb-0.5">
          Live match sim
        </div>
        <div
          className={`font-mono text-[11px] tracking-[0.18em] uppercase text-copper text-right transition-opacity duration-600 ${
            actionFeed.name ? 'opacity-85' : 'opacity-0'
          }`}
        >
          {actionFeed.name}
        </div>
        <div
          className={`font-mono text-[13px] text-cream-secondary text-right whitespace-nowrap min-h-[20px] transition-opacity duration-500 ${
            actionFeed.action ? 'opacity-100' : 'opacity-0'
          } ${isGoal ? 'text-copper font-medium text-[15px] [text-shadow:0_0_20px_rgba(196,135,90,0.4)]' : ''}`}
        >
          {actionFeed.action}
        </div>
      </div>
    </div>
  );
}
