'use client';

import { useState, useEffect, useRef } from 'react';

interface TacticCardProps {
  title: string;
  creator: string;
  formation: string;
  version: string;
  style: string;
  level: string;
  rating: number;
  reviewCount: number;
  winRate: number;
  quote?: string;
  isTrending?: boolean;
  trendingType?: 'trending' | 'rising';
  trendingDetail?: string;
  positions?: { top: string; left: string }[];
}

const DEFAULT_POSITIONS = [
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
];

export default function TacticCard({
  title,
  creator,
  formation,
  version,
  style,
  level,
  rating,
  reviewCount,
  winRate,
  quote,
  isTrending = false,
  trendingType = 'trending',
  trendingDetail,
  positions = DEFAULT_POSITIONS,
}: TacticCardProps) {
  const [currentFace, setCurrentFace] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovered) {
      setCurrentFace(1);
      intervalRef.current = setTimeout(() => {
        if (isHovered) setCurrentFace(2);
      }, 2000);
    } else {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      setCurrentFace(0);
    }

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [isHovered]);

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < fullStars ? 'star-filled' : 'star-empty'}>★</span>
      );
    }
    return stars;
  };

  const getWinRateClass = () => {
    if (winRate >= 65) return 'wr-good';
    if (winRate >= 50) return 'wr-ok';
    return 'wr-low';
  };

  const downloads = Math.floor(winRate * 38 + Math.random() * 800);
  const matches = Math.floor(winRate * 12 + Math.random() * 200);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-surface border rounded-[10px] overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative group ${
        isTrending 
          ? 'border-[rgba(196,135,90,0.3)] hover:border-[rgba(196,135,90,0.5)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_32px_rgba(196,135,90,0.15)]' 
          : 'border-border hover:border-[rgba(196,135,90,0.3)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_28px_var(--copper-dim)]'
      } hover:-translate-y-[5px]`}
    >
      {/* Top accent line */}
      <div 
        className={`absolute top-0 left-0 right-0 h-[2px] z-[5] transition-opacity duration-500 ${
          isTrending 
            ? 'opacity-100' 
            : 'opacity-0 group-hover:opacity-100'
        }`}
        style={{ 
          background: isTrending 
            ? 'linear-gradient(90deg, var(--copper), var(--copper-bright))' 
            : 'linear-gradient(90deg, transparent, var(--copper), transparent)'
        }}
      />

      {/* Trending bar */}
      {isTrending && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-[rgba(196,135,90,0.15)] font-mono text-[9px] tracking-[0.06em] text-copper"
          style={{ background: 'linear-gradient(135deg, rgba(196,135,90,0.14), rgba(196,135,90,0.06))' }}
        >
          <span className="text-[11px] flex-shrink-0">
            {trendingType === 'trending' ? '🔥' : '📈'}
          </span>
          <span className="font-medium uppercase tracking-[0.1em]">
            {trendingType === 'trending' ? 'Trending' : 'Rising'}
          </span>
          {trendingDetail && (
            <span className="text-[rgba(196,135,90,0.7)] ml-auto text-[8px] tracking-[0.04em]">
              {trendingDetail}
            </span>
          )}
        </div>
      )}

      {/* Card head - 3 faces */}
      <div className="h-[105px] relative overflow-hidden">
        {/* Face 1: Formation */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-800 ${
            isTrending ? 'bg-[#141210]' : 'bg-pitch-dark'
          } ${currentFace === 0 ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Center line */}
          <div 
            className="absolute top-1/2 left-0 right-0 h-[1px]"
            style={{ background: isTrending ? 'rgba(196,135,90,0.18)' : 'var(--pitch-line)' }}
          />
          {/* Center circle */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full border"
            style={{ borderColor: isTrending ? 'rgba(196,135,90,0.18)' : 'var(--pitch-line)' }}
          />
          {/* Formation dots */}
          {positions.map((pos, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-copper rounded-full shadow-[0_0_10px_rgba(196,135,90,0.4)] transition-all duration-400"
              style={{ top: pos.top, left: pos.left }}
            />
          ))}
        </div>

        {/* Face 2: Stats */}
        <div 
          className={`absolute inset-0 flex items-center justify-center gap-4 px-[18px] transition-opacity duration-800 ${
            currentFace === 1 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ background: 'linear-gradient(135deg, var(--bg), rgba(90,138,80,0.04))' }}
        >
          <div className="flex flex-col items-center">
            <div className="font-mono text-[32px] font-medium text-copper leading-none">
              {winRate}<span className="text-xs opacity-70">%</span>
            </div>
            <div className="font-mono text-[8px] text-cream-muted tracking-[0.1em] uppercase mt-0.5">Win Rate</div>
          </div>
          <div className="w-[1px] h-9 bg-border flex-shrink-0" />
          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-[15px] text-cream font-medium">{downloads.toLocaleString()}</span>
              <span className="font-mono text-[9px] text-cream-muted tracking-[0.06em] uppercase">Downloads</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-[15px] text-cream font-medium">{matches}</span>
              <span className="font-mono text-[9px] text-cream-muted tracking-[0.06em] uppercase">Matches</span>
            </div>
          </div>
        </div>

        {/* Face 3: Quote */}
        <div 
          className={`absolute inset-0 p-3.5 transition-opacity duration-800 ${
            currentFace === 2 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ background: 'linear-gradient(135deg, var(--surface), rgba(196,135,90,0.03))' }}
        >
          <div className="font-serif italic text-[11px] text-cream-secondary leading-normal pl-2.5 border-l-2 border-copper line-clamp-4">
            &ldquo;{quote || 'A solid tactical approach that delivers consistent results across different team levels.'}&rdquo;
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 pt-3.5">
        {/* Top line */}
        <div className="flex items-center gap-1.5 mb-1">
          <span className="font-mono text-[11px] font-medium text-copper bg-copper-dim border border-[rgba(196,135,90,0.15)] rounded px-1.5 py-px whitespace-nowrap">
            {formation}
          </span>
          <span className="font-mono text-[9px] tracking-[0.08em] text-cream-muted uppercase">
            {version}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-[15px] font-medium tracking-tight leading-tight mb-0.5 transition-colors duration-300 group-hover:text-copper-bright">
          {title}
        </h3>

        {/* Creator */}
        <div className="text-[12px] text-cream-muted mb-2">
          by <a href="#" className="text-cream-secondary transition-colors duration-300 hover:text-copper">{creator}</a>
        </div>

        {/* Tags */}
        <div className="flex gap-1 mb-2 flex-wrap">
          <span className="tag tag-style">{style}</span>
          <span className="tag tag-level">{level}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1.5">
            <div className="flex gap-px text-[12px]">
              {renderStars()}
            </div>
            <span className="font-mono text-xs font-medium">{rating.toFixed(1)}</span>
            <span className="font-mono text-[10px] text-cream-muted">({reviewCount})</span>
          </div>
          <span className={`wr-badge ${getWinRateClass()}`}>
            {winRate}% Win Rate
          </span>
        </div>
      </div>
    </div>
  );
}
