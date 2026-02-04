'use client';

import { useState } from 'react';

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

export default function FilterCard() {
  const [selectedFormation, setSelectedFormation] = useState('4-3-3');
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['Counter-Attack']);
  const [selectedLevels, setSelectedLevels] = useState<string[]>(['Underdog']);
  const [selectedVersion, setSelectedVersion] = useState('FM26');
  const [minRating, setMinRating] = useState(4);
  const [selectedWinRate, setSelectedWinRate] = useState('60%+');

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev =>
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const resetAll = () => {
    setSelectedFormation('4-3-3');
    setSelectedStyles([]);
    setSelectedLevels([]);
    setSelectedVersion('FM26');
    setMinRating(1);
    setSelectedWinRate('50%+');
  };

  return (
    <div id="explore-tactics" className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-8 md:pt-10">
      <div className="bg-surface border border-border rounded-[14px] overflow-hidden relative">
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] opacity-30"
          style={{ background: 'linear-gradient(90deg, transparent, var(--copper), transparent)' }}
        />

        {/* Header */}
        <div className="px-4 md:px-8 py-4 md:py-5 flex items-center justify-between">
          <h2 className="font-serif text-[20px] md:text-[24px] font-normal text-cream">Explore Tactics</h2>
          <span
            onClick={resetAll}
            className="font-mono text-[10px] text-cream-muted cursor-pointer transition-colors duration-300 hover:text-copper"
          >
            Reset all
          </span>
        </div>

        {/* Filter columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-border">
          {/* Formation */}
          <div className="p-4 md:p-6 border-b md:border-b lg:border-b-0 lg:border-r border-border">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-cream-muted mb-1 flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-copper-dim text-copper text-[8px] font-medium">1</span>
              Formation
              <span className="relative group/help ml-1">
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-cream-faint text-[8px] text-cream-faint cursor-help">?</span>
                <span className="invisible group-hover/help:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-surface-elevated border border-border rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.4)] z-50 w-[200px]">
                  <span className="font-sans text-[10px] text-cream leading-relaxed block font-normal normal-case tracking-normal">Shape your team uses when attacking. Defensive shape may differ based on mentality.</span>
                  <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-surface-elevated border-r border-b border-border rotate-45" />
                </span>
              </span>
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
                          selectedFormation === fm.name
                            ? 'bg-copper shadow-[0_0_5px_rgba(196,135,90,0.5)]'
                            : 'bg-cream-faint'
                        }`}
                        style={{ left: `${pos[0]}%`, bottom: `${pos[1]}%` }}
                      />
                    ))}
                  </div>
                  <span className={`font-mono text-[10px] transition-colors duration-300 ${
                    selectedFormation === fm.name ? 'text-copper' : 'text-cream-faint'
                  }`}>
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
                <span className={`font-mono text-[10px] transition-colors duration-300 ${
                  selectedFormation === 'All' ? 'text-copper' : 'text-cream-faint'
                }`}>
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
              {STYLES.map((style) => (
                <span
                  key={style}
                  onClick={() => toggleStyle(style)}
                  className={`chip ${selectedStyles.includes(style) ? 'selected-green' : ''}`}
                >
                  {style}
                </span>
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
              {LEVELS.map((level) => (
                <span
                  key={level}
                  onClick={() => toggleLevel(level)}
                  className={`chip ${selectedLevels.includes(level) ? 'selected-copper' : ''}`}
                >
                  {level}
                </span>
              ))}
            </div>
          </div>

          {/* Refine */}
          <div className="p-4 md:p-6">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-cream-muted mb-1 flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-copper-dim text-copper text-[8px] font-medium">4</span>
              FM Version & Filters
            </div>

            {/* Version select */}
            <select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value)}
              className="w-full appearance-none px-3 py-[7px] bg-bg border border-border rounded-md text-cream text-xs font-sans cursor-pointer mb-2 pr-7 transition-colors duration-300 focus:border-[rgba(196,135,90,0.3)]"
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

            {/* Min rating */}
            <div className="mb-1.5">
              <div className="text-[11px] text-cream-muted mb-1">Min. rating</div>
              <div className="flex items-center gap-2.5">
                <div className="flex gap-0.5 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setMinRating(star)}
                      className={`text-xl transition-colors duration-300 ${star <= minRating ? 'text-copper' : 'text-cream-faint'}`}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
                <span className="font-mono text-xs text-cream-muted">{minRating}+</span>
              </div>
            </div>

            {/* Min win rate */}
            <div>
              <div className="text-[11px] text-cream-muted mb-1">Min. win rate <span className="text-cream-faint text-[9px]">(50+ match samples)</span></div>
              <div className="flex gap-1 mt-2">
                {WIN_RATES.map((wr) => (
                  <span
                    key={wr}
                    onClick={() => setSelectedWinRate(wr)}
                    className={`px-2.5 py-1 bg-bg border rounded font-mono text-[10px] text-cream-muted cursor-pointer transition-all duration-300 ${
                      selectedWinRate === wr
                        ? 'border-green-accent bg-[rgba(90,138,80,0.1)] text-green-accent'
                        : 'border-border'
                    }`}
                  >
                    {wr}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom action bar */}
        <div className="px-4 md:px-7 py-4 md:py-5 pb-5 md:pb-6 flex items-center justify-end">
          <button
            className="px-7 py-2.5 bg-copper border-none rounded-[7px] text-bg text-[13px] font-medium font-sans cursor-pointer transition-all duration-300 flex items-center gap-2 shadow-[0_4px_16px_rgba(196,135,90,0.25)] flex-shrink-0 hover:bg-copper-bright hover:-translate-y-0.5"
          >
            SHOW <span className="font-mono font-medium bg-[rgba(16,14,12,0.25)] px-2 py-0.5 rounded text-xs">23</span> TACTICS &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
