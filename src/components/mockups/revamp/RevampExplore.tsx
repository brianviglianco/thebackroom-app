'use client';

import { useState, useRef, useEffect } from 'react';

// ====== DATA ======

const FORMATIONS = [
  { name: '4-3-3', positions: [[46,2],[8,20],[30,22],[62,22],[84,20],[22,44],[46,46],[70,44],[12,72],[46,76],[80,72]] },
  { name: '4-2-3-1', positions: [[46,2],[10,22],[34,22],[58,22],[82,22],[34,42],[58,42],[14,62],[46,64],[78,62],[46,82]] },
  { name: '3-5-2', positions: [[46,2],[18,22],[46,24],[74,22],[4,44],[26,46],[46,44],[66,46],[88,44],[34,72],[58,72]] },
  { name: '4-4-2', positions: [[46,2],[8,20],[30,22],[62,22],[84,20],[6,44],[30,46],[62,46],[86,44],[34,72],[58,72]] },
  { name: '5-3-2', positions: [[46,2],[6,18],[24,22],[46,24],[68,22],[86,18],[22,44],[46,46],[70,44],[34,72],[58,72]] },
];

const STYLES = ['Counter-Attack', 'Possession', 'High Press', 'Direct', 'Balanced', 'Wing Play'];
const LEVELS = ['Top Club', 'Mid-Table', 'Underdog', 'Lower League', 'Newly Promoted'];
const WIN_RATES = ['50%+', '60%+', '70%+', '80%+'];

const TACTICS = [
  {
    formation: '4-2-3-1', version: 'FM26 · v1.0', title: "Bielsa's Vertical Hell",
    creator: 'WorkTheSpace', style: 'High Press', level: 'Mid-Table',
    rating: 4.7, reviewCount: 89, winRate: 81, matches: 312,
    isTrending: true, trendingType: 'trending' as const,
    positions: [
      { top: '82%', left: '48%' }, { top: '62%', left: '10%' },
      { top: '64%', left: '32%' }, { top: '64%', left: '64%' },
      { top: '62%', left: '86%' }, { top: '44%', left: '34%' },
      { top: '44%', left: '62%' }, { top: '24%', left: '14%' },
      { top: '26%', left: '48%' }, { top: '24%', left: '82%' },
      { top: '8%', left: '48%' },
    ],
  },
  {
    formation: '4-3-3', version: 'FM26 · v3.2', title: "Guardiola's Ghost",
    creator: 'TacticalPadre', style: 'Counter-Attack', level: 'Underdog',
    rating: 4.3, reviewCount: 142, winRate: 73, matches: 247,
    isTrending: true, trendingType: 'rising' as const,
    positions: [
      { top: '82%', left: '48%' }, { top: '62%', left: '10%' },
      { top: '64%', left: '32%' }, { top: '64%', left: '64%' },
      { top: '62%', left: '86%' }, { top: '40%', left: '22%' },
      { top: '38%', left: '48%' }, { top: '40%', left: '74%' },
      { top: '16%', left: '14%' }, { top: '10%', left: '48%' },
      { top: '16%', left: '82%' },
    ],
  },
  {
    formation: '4-3-3', version: 'FM25 · v5.2', title: "Knap's Standard",
    creator: 'Knap', style: 'Possession', level: 'Top Club',
    rating: 4.8, reviewCount: 203, winRate: 82, matches: 580,
    positions: [
      { top: '82%', left: '48%' }, { top: '62%', left: '10%' },
      { top: '64%', left: '32%' }, { top: '64%', left: '64%' },
      { top: '62%', left: '86%' }, { top: '40%', left: '22%' },
      { top: '38%', left: '48%' }, { top: '40%', left: '74%' },
      { top: '16%', left: '14%' }, { top: '10%', left: '48%' },
      { top: '16%', left: '82%' },
    ],
  },
  {
    formation: '4-2-3-1', version: 'FM26 · v1.3', title: 'Sacchi Reborn',
    creator: 'RDFTactics', style: 'High Press', level: 'Top Club',
    rating: 4.6, reviewCount: 98, winRate: 77, matches: 189,
    positions: [
      { top: '82%', left: '48%' }, { top: '62%', left: '10%' },
      { top: '64%', left: '32%' }, { top: '64%', left: '64%' },
      { top: '62%', left: '86%' }, { top: '44%', left: '34%' },
      { top: '44%', left: '62%' }, { top: '24%', left: '14%' },
      { top: '26%', left: '48%' }, { top: '24%', left: '82%' },
      { top: '8%', left: '48%' },
    ],
  },
  {
    formation: '5-3-2', version: 'FM26 · v2.1', title: 'The Sardine Can',
    creator: 'BustTheNet', style: 'Counter-Attack', level: 'Lower League',
    rating: 4.1, reviewCount: 67, winRate: 73, matches: 156,
    positions: [
      { top: '82%', left: '48%' }, { top: '58%', left: '6%' },
      { top: '64%', left: '24%' }, { top: '66%', left: '48%' },
      { top: '64%', left: '72%' }, { top: '58%', left: '90%' },
      { top: '40%', left: '24%' }, { top: '38%', left: '48%' },
      { top: '40%', left: '72%' }, { top: '14%', left: '34%' },
      { top: '14%', left: '62%' },
    ],
  },
  {
    formation: '4-3-3', version: 'FM26 · v4.0', title: 'Fortress Europa',
    creator: 'DoctorBenjy', style: 'Balanced', level: 'Underdog',
    rating: 4.0, reviewCount: 54, winRate: 68, matches: 203,
    positions: [
      { top: '82%', left: '48%' }, { top: '62%', left: '10%' },
      { top: '64%', left: '32%' }, { top: '64%', left: '64%' },
      { top: '62%', left: '86%' }, { top: '40%', left: '22%' },
      { top: '38%', left: '48%' }, { top: '40%', left: '74%' },
      { top: '16%', left: '14%' }, { top: '10%', left: '48%' },
      { top: '16%', left: '82%' },
    ],
  },
  {
    formation: '4-3-3', version: 'FM26 · v2.0', title: 'Budapest Blitz',
    creator: 'SecondYellow', style: 'Direct', level: 'Underdog',
    rating: 3.9, reviewCount: 43, winRate: 55, matches: 87,
    positions: [
      { top: '82%', left: '48%' }, { top: '62%', left: '10%' },
      { top: '64%', left: '32%' }, { top: '64%', left: '64%' },
      { top: '62%', left: '86%' }, { top: '40%', left: '22%' },
      { top: '38%', left: '48%' }, { top: '40%', left: '74%' },
      { top: '16%', left: '14%' }, { top: '10%', left: '48%' },
      { top: '16%', left: '82%' },
    ],
  },
  {
    formation: '4-4-2', version: 'FM26 · v1.1', title: 'The Low Block',
    creator: 'FM_Alchemist', style: 'Counter-Attack', level: 'Lower League',
    rating: 4.2, reviewCount: 71, winRate: 71, matches: 168,
    positions: [
      { top: '82%', left: '48%' }, { top: '62%', left: '10%' },
      { top: '64%', left: '32%' }, { top: '64%', left: '64%' },
      { top: '62%', left: '86%' }, { top: '40%', left: '8%' },
      { top: '42%', left: '32%' }, { top: '42%', left: '64%' },
      { top: '40%', left: '88%' }, { top: '14%', left: '34%' },
      { top: '14%', left: '62%' },
    ],
  },
];

// ====== TACTIC CARD (simplified, with tooltip metrics) ======

interface TacticData {
  formation: string;
  version: string;
  title: string;
  creator: string;
  style: string;
  level: string;
  rating: number;
  reviewCount: number;
  winRate: number;
  matches: number;
  isTrending?: boolean;
  trendingType?: 'trending' | 'rising';
  positions: { top: string; left: string }[];
}

function RevampTacticCard({ title, creator, formation, version, style, level, rating, reviewCount, winRate, matches, isTrending, trendingType, positions }: TacticData) {
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
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current); };
  }, [isHovered]);

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(<span key={i} className={i < fullStars ? 'star-filled' : 'star-empty'}>&#9733;</span>);
    }
    return stars;
  };

  const getWinRateClass = () => {
    if (winRate >= 65) return 'wr-good';
    if (winRate >= 50) return 'wr-ok';
    return 'wr-low';
  };

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
      {/* Top accent */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] z-[5] transition-opacity duration-500 ${
          isTrending ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        style={{
          background: isTrending
            ? 'linear-gradient(90deg, var(--copper), var(--copper-bright))'
            : 'linear-gradient(90deg, transparent, var(--copper), transparent)'
        }}
      />

      {/* Trending bar */}
      {isTrending && (
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 border-b border-[rgba(196,135,90,0.15)] font-mono text-[9px] tracking-[0.06em] text-copper"
          style={{ background: 'linear-gradient(135deg, rgba(196,135,90,0.14), rgba(196,135,90,0.06))' }}
        >
          <span className="text-[11px] flex-shrink-0">{trendingType === 'trending' ? '🔥' : '📈'}</span>
          <span className="font-medium uppercase tracking-[0.1em]">{trendingType === 'trending' ? 'Trending' : 'Rising'}</span>
        </div>
      )}

      {/* Card head - 3 faces */}
      <div className="h-[105px] relative overflow-hidden">
        {/* Face 1: Formation */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-800 ${isTrending ? 'bg-[#141210]' : 'bg-pitch-dark'} ${currentFace === 0 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-1/2 left-0 right-0 h-[1px]" style={{ background: isTrending ? 'rgba(196,135,90,0.18)' : 'var(--pitch-line)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full border" style={{ borderColor: isTrending ? 'rgba(196,135,90,0.18)' : 'var(--pitch-line)' }} />
          {positions.map((pos, i) => (
            <div key={i} className="absolute w-2 h-2 bg-copper rounded-full shadow-[0_0_10px_rgba(196,135,90,0.4)]" style={{ top: pos.top, left: pos.left }} />
          ))}
        </div>

        {/* Face 2: Stats with context */}
        <div className={`absolute inset-0 flex items-center justify-center gap-4 px-[18px] transition-opacity duration-800 ${currentFace === 1 ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'linear-gradient(135deg, var(--bg), rgba(90,138,80,0.04))' }}>
          <div className="flex flex-col items-center">
            <div className="font-mono text-[32px] font-medium text-copper leading-none">
              {winRate}<span className="text-xs opacity-70">%</span>
            </div>
            <div className="font-mono text-[8px] text-cream-muted tracking-[0.1em] uppercase mt-0.5">Win Rate</div>
          </div>
          <div className="w-[1px] h-9 bg-border flex-shrink-0" />
          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-[15px] text-cream font-medium">{matches}</span>
              <span className="font-mono text-[9px] text-cream-muted tracking-[0.06em] uppercase">Matches</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-[15px] text-cream font-medium">{reviewCount}</span>
              <span className="font-mono text-[9px] text-cream-muted tracking-[0.06em] uppercase">Reviews</span>
            </div>
          </div>
        </div>

        {/* Face 3: N/A (cleaner cards) */}
        <div className={`absolute inset-0 p-3.5 flex items-center transition-opacity duration-800 ${currentFace === 2 ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'linear-gradient(135deg, var(--surface), rgba(196,135,90,0.03))' }}>
          <div className="font-mono text-[10px] text-cream-muted leading-relaxed px-3">
            <div className="flex justify-between mb-1"><span>Win Rate</span><span className="text-cream">{winRate}% <span className="text-cream-faint">({matches} matches)</span></span></div>
            <div className="flex justify-between mb-1"><span>Rating</span><span className="text-cream">{rating.toFixed(1)} <span className="text-cream-faint">({reviewCount} reviews)</span></span></div>
            <div className="flex justify-between"><span>Style</span><span className="text-cream">{style} · {level}</span></div>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 pt-3.5">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="font-mono text-[11px] font-medium text-copper bg-copper-dim border border-[rgba(196,135,90,0.15)] rounded px-1.5 py-px whitespace-nowrap">{formation}</span>
          <span className="font-mono text-[9px] tracking-[0.08em] text-cream-muted uppercase">{version}</span>
        </div>
        <h3 className="font-serif text-[15px] font-medium tracking-tight leading-tight mb-0.5 transition-colors duration-300 group-hover:text-copper-bright">{title}</h3>
        <div className="text-[12px] text-cream-muted mb-2">
          by <a href="#" className="text-cream-secondary transition-colors duration-300 hover:text-copper">{creator}</a>
        </div>
        <div className="flex gap-1 mb-2 flex-wrap">
          <span className="tag tag-style">{style}</span>
          <span className="tag tag-level">{level}</span>
        </div>
        {/* Footer with tooltip-style context */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1.5">
            <div className="flex gap-px text-[12px]">{renderStars()}</div>
            <span className="font-mono text-xs font-medium">{rating.toFixed(1)}</span>
            <span className="font-mono text-[10px] text-cream-muted">({reviewCount})</span>
          </div>
          {/* Win rate with sample size */}
          <div className="relative group/wr">
            <span className={`wr-badge ${getWinRateClass()}`}>
              {winRate}% WR
            </span>
            {/* Tooltip */}
            <div className="invisible group-hover/wr:visible absolute bottom-full right-0 mb-2 px-3 py-2 bg-surface-elevated border border-border rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.4)] z-50 w-[200px]">
              <div className="font-mono text-[10px] text-cream leading-relaxed">
                {winRate}% win rate across {matches} competitive matches. Min 50 matches required.
              </div>
              <div className="absolute bottom-[-4px] right-4 w-2 h-2 bg-surface-elevated border-r border-b border-border rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ====== MAIN COMPONENT ======

export default function RevampExplore() {
  const [selectedFormation, setSelectedFormation] = useState('4-3-3');
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['Counter-Attack']);
  const [selectedLevels, setSelectedLevels] = useState<string[]>(['Underdog']);
  const [selectedVersion, setSelectedVersion] = useState('FM26');
  const [minRating, setMinRating] = useState(4);
  const [selectedWinRate, setSelectedWinRate] = useState('60%+');
  const [sortBy, setSortBy] = useState('rating');

  const toggleStyle = (s: string) => setSelectedStyles(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleLevel = (l: string) => setSelectedLevels(prev => prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l]);

  return (
    <div id="revamp-explore" className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-8 md:pt-10">
      {/* Filter card */}
      <div className="bg-surface border border-border rounded-[14px] overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-[1px] opacity-30" style={{ background: 'linear-gradient(90deg, transparent, var(--copper), transparent)' }} />

        {/* Header */}
        <div className="px-4 md:px-8 py-4 md:py-6 pb-4 md:pb-5 flex flex-col md:flex-row md:items-center justify-between border-b border-border gap-2">
          <div className="flex items-baseline gap-2.5">
            <h2 className="font-serif text-[20px] md:text-[24px] font-normal">Explore Tactics</h2>
            <span className="text-[12px] md:text-[14px] text-cream-muted font-light hidden sm:inline">Select filters to find your tactic</span>
          </div>
          <button className="font-mono text-[10px] text-cream-muted cursor-pointer transition-colors duration-300 hover:text-copper bg-transparent border-none self-start md:self-auto">
            Reset all filters
          </button>
        </div>

        {/* Filter columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-border">
          {/* Formation */}
          <div className="p-4 md:p-6 border-b md:border-b lg:border-b-0 lg:border-r border-border">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-cream-muted mb-1 flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-copper-dim text-copper text-[8px] font-medium">1</span>
              Formation
            </div>
            <div className="text-[10px] text-cream-faint italic mb-2.5">in possession phase</div>
            <div className="grid grid-cols-3 gap-2">
              {FORMATIONS.map((fm) => (
                <div
                  key={fm.name}
                  onClick={() => setSelectedFormation(fm.name)}
                  className={`h-[80px] bg-bg border rounded-[7px] cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-1 p-2 ${
                    selectedFormation === fm.name
                      ? 'border-copper bg-copper-dim shadow-[0_0_12px_var(--copper-dim)]'
                      : 'border-border hover:border-[rgba(196,135,90,0.3)] hover:bg-surface-hover'
                  }`}
                >
                  <div className="w-[50px] h-[56px] relative">
                    {fm.positions.map((pos, i) => (
                      <div
                        key={i}
                        className={`absolute w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          selectedFormation === fm.name ? 'bg-copper shadow-[0_0_5px_rgba(196,135,90,0.5)]' : 'bg-cream-faint'
                        }`}
                        style={{ left: `${pos[0]}%`, bottom: `${pos[1]}%` }}
                      />
                    ))}
                  </div>
                  <span className={`font-mono text-[10px] transition-colors duration-300 ${selectedFormation === fm.name ? 'text-copper' : 'text-cream-faint'}`}>
                    {fm.name}
                  </span>
                </div>
              ))}
              <div
                onClick={() => setSelectedFormation('All')}
                className={`h-[80px] bg-bg border rounded-[7px] cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-1 p-2 ${
                  selectedFormation === 'All'
                    ? 'border-copper bg-copper-dim shadow-[0_0_12px_var(--copper-dim)]'
                    : 'border-border hover:border-[rgba(196,135,90,0.3)] hover:bg-surface-hover'
                }`}
              >
                <div className="w-full h-[56px] flex items-center justify-center">
                  <span className="font-mono text-[10px] text-cream-muted">Any</span>
                </div>
                <span className={`font-mono text-[10px] transition-colors duration-300 ${selectedFormation === 'All' ? 'text-copper' : 'text-cream-faint'}`}>
                  All
                </span>
              </div>
            </div>
          </div>

          {/* Playing Style */}
          <div className="p-4 md:p-6 border-b md:border-b lg:border-b-0 lg:border-r border-border">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-cream-muted mb-1 flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-copper-dim text-copper text-[8px] font-medium">2</span>
              Playing Style
            </div>
            <div className="text-[10px] text-cream-faint mb-2.5">Tactical approach</div>
            <div className="flex gap-1.5 flex-wrap mt-1">
              {STYLES.map((s) => (
                <span key={s} onClick={() => toggleStyle(s)} className={`chip ${selectedStyles.includes(s) ? 'selected-green' : ''}`}>{s}</span>
              ))}
            </div>
          </div>

          {/* Team Level */}
          <div className="p-4 md:p-6 border-b md:border-b-0 lg:border-r border-border">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-cream-muted mb-1 flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-copper-dim text-copper text-[8px] font-medium">3</span>
              Team Level
            </div>
            <div className="text-[10px] text-cream-faint mb-2.5">Your squad strength</div>
            <div className="flex gap-1.5 flex-wrap mt-1">
              {LEVELS.map((l) => (
                <span key={l} onClick={() => toggleLevel(l)} className={`chip ${selectedLevels.includes(l) ? 'selected-copper' : ''}`}>{l}</span>
              ))}
            </div>
          </div>

          {/* Refine */}
          <div className="p-4 md:p-6">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-cream-muted mb-1 flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-copper-dim text-copper text-[8px] font-medium">4</span>
              FM Version & Filters
            </div>
            <select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value)}
              className="w-full appearance-none px-3 py-[7px] bg-bg border border-border rounded-md text-cream text-xs font-sans cursor-pointer mb-2 pr-7 transition-colors duration-300 focus:border-[rgba(196,135,90,0.3)] mt-2"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%237A6E62' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 10px center'
              }}
            >
              <option value="FM26">FM26</option>
              <option value="FM25">FM25</option>
              <option value="FM24">FM24</option>
              <option value="All">All versions</option>
            </select>
            <div className="mb-1.5">
              <div className="text-[11px] text-cream-muted mb-1">Min. rating</div>
              <div className="flex items-center gap-2.5">
                <div className="flex gap-0.5 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} onClick={() => setMinRating(star)} className={`text-xl transition-colors duration-300 ${star <= minRating ? 'text-copper' : 'text-cream-faint'}`}>&#9733;</span>
                  ))}
                </div>
                <span className="font-mono text-xs text-cream-muted">{minRating}+</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-cream-muted mb-1">
                Min. win rate <span className="text-cream-faint text-[9px]">(50+ match samples)</span>
              </div>
              <div className="flex gap-1 mt-2">
                {WIN_RATES.map((wr) => (
                  <span
                    key={wr}
                    onClick={() => setSelectedWinRate(wr)}
                    className={`px-2.5 py-1 bg-bg border rounded font-mono text-[10px] text-cream-muted cursor-pointer transition-all duration-300 ${
                      selectedWinRate === wr ? 'border-green-accent bg-[rgba(90,138,80,0.1)] text-green-accent' : 'border-border'
                    }`}
                  >
                    {wr}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom action bar — streamlined */}
        <div className="px-4 md:px-7 py-4 md:py-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <div className="text-[12px] text-cream-muted">
            Not sure? Try a quick search:
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="px-4 py-1.5 bg-bg border border-border rounded-full text-xs text-cream-secondary cursor-pointer transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap hover:border-[rgba(196,135,90,0.3)] hover:text-cream hover:bg-surface-hover">
              🏰 Best for Lower League FM26
            </span>
            <span className="px-4 py-1.5 bg-bg border border-border rounded-full text-xs text-cream-secondary cursor-pointer transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap hover:border-[rgba(196,135,90,0.3)] hover:text-cream hover:bg-surface-hover">
              ⚡ Top Counter-Attack Underdogs
            </span>
            <span className="px-4 py-1.5 bg-bg border border-border rounded-full text-xs text-cream-secondary cursor-pointer transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap hover:border-[rgba(196,135,90,0.3)] hover:text-cream hover:bg-surface-hover">
              🎯 Highest Rated Possession
            </span>
          </div>
        </div>
      </div>

      {/* Results — always visible, no collapsed state */}
      <div className="pt-6 md:pt-8">
        {/* Results bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
          <span className="text-sm text-cream-secondary">
            Showing <strong className="text-cream font-medium">23 tactics</strong> matching your filters
          </span>
          <div className="flex gap-1 items-center overflow-x-auto">
            <span className="text-xs text-cream-muted mr-1.5 flex-shrink-0">Sort:</span>
            {['Top Rated', 'Win Rate', 'Downloads', 'Newest'].map((sort) => {
              const sortKey = sort.toLowerCase().replace(' ', '-');
              return (
                <button
                  key={sort}
                  onClick={() => setSortBy(sortKey)}
                  className={`px-3 md:px-4 py-[7px] bg-transparent border rounded-md text-[12px] md:text-[13px] font-sans cursor-pointer transition-all duration-300 whitespace-nowrap ${
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {TACTICS.map((tactic, index) => (
            <RevampTacticCard key={index} {...tactic} />
          ))}
        </div>

        {/* Load more */}
        <div className="text-center pt-2 pb-2">
          <button className="px-7 py-2 bg-surface border border-border rounded-md text-cream-secondary text-[13px] font-sans cursor-pointer transition-all duration-300 hover:border-copper hover:text-copper">
            Load more tactics →
          </button>
        </div>
      </div>
    </div>
  );
}
