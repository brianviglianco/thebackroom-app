'use client';

import { useState, useMemo } from 'react';

interface Creator {
  initials: string;
  username: string;
  signature: string;
  tacticsCount: number;
  avgRating: number;
  downloads: string;
  downloadsNum: number;
  verified: boolean;
  specialties: string[];
  reviewCount: number;
  proofLine: string;
  trending: 'up' | 'stable';
}

const CREATORS: Creator[] = [
  {
    initials: 'TP',
    username: 'TacticalPadre',
    signature: '4-3-3 counter-attack specialist',
    tacticsCount: 12,
    avgRating: 4.4,
    downloads: '28.3k',
    downloadsNum: 28300,
    verified: true,
    specialties: ['Counter-Attack', '4-3-3'],
    reviewCount: 189,
    proofLine: 'Highest rated newcomer this season',
    trending: 'up',
  },
  {
    initials: 'WS',
    username: 'WorkTheSpace',
    signature: 'High-press vertical football',
    tacticsCount: 8,
    avgRating: 4.6,
    downloads: '41.2k',
    downloadsNum: 41200,
    verified: true,
    specialties: ['High Press', 'Vertical'],
    reviewCount: 234,
    proofLine: '+5 spots this month',
    trending: 'up',
  },
  {
    initials: 'KN',
    username: 'Knap',
    signature: 'The GOAT. 200+ tactics across 10 FMs',
    tacticsCount: 47,
    avgRating: 4.5,
    downloads: '312k',
    downloadsNum: 312000,
    verified: true,
    specialties: ['Exploit', 'Plug & Play'],
    reviewCount: 487,
    proofLine: '#1 by downloads 6 months running',
    trending: 'stable',
  },
  {
    initials: 'DB',
    username: 'DoctorBenjy',
    signature: 'Underdog siege mentality',
    tacticsCount: 6,
    avgRating: 4.2,
    downloads: '18.7k',
    downloadsNum: 18700,
    verified: true,
    specialties: ['Underdog', 'Siege'],
    reviewCount: 156,
    proofLine: 'Consistent top-5 performer',
    trending: 'stable',
  },
  {
    initials: 'BN',
    username: 'BustTheNet',
    signature: 'Lower league domination',
    tacticsCount: 9,
    avgRating: 4.3,
    downloads: '22.1k',
    downloadsNum: 22100,
    verified: false,
    specialties: ['Lower League', 'Direct'],
    reviewCount: 98,
    proofLine: 'Rising through the ranks',
    trending: 'up',
  },
  {
    initials: 'RD',
    username: 'RDFTactics',
    signature: 'Pressing traps and midfield control',
    tacticsCount: 5,
    avgRating: 4.5,
    downloads: '14.8k',
    downloadsNum: 14800,
    verified: true,
    specialties: ['Pressing', 'Midfield Control'],
    reviewCount: 67,
    proofLine: 'New entry this month',
    trending: 'up',
  },
];

type SortKey = 'downloads' | 'rating' | 'tactics';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'rating', label: 'Rating' },
  { key: 'downloads', label: 'Downloads' },
  { key: 'tactics', label: 'Tactics' },
];

function getPrimaryMetric(creator: Creator, sortBy: SortKey) {
  switch (sortBy) {
    case 'rating':
      return { value: `★ ${creator.avgRating}`, suffix: `${creator.reviewCount} reviews` };
    case 'downloads':
      return { value: creator.downloads, suffix: 'downloads' };
    case 'tactics':
      return { value: `${creator.tacticsCount}`, suffix: 'tactics' };
  }
}

function getSecondaryMetrics(creator: Creator, sortBy: SortKey) {
  const metrics: string[] = [];
  if (sortBy !== 'rating') metrics.push(`★ ${creator.avgRating}`);
  if (sortBy !== 'downloads') metrics.push(`${creator.downloads} dl`);
  if (sortBy !== 'tactics') metrics.push(`${creator.tacticsCount} tactics`);
  return metrics;
}

/* ── Podium Card (Top 3) ── */
function PodiumCard({ creator, rank, sortBy, isChampion = false }: {
  creator: Creator;
  rank: number;
  sortBy: SortKey;
  isChampion?: boolean;
}) {
  const primary = getPrimaryMetric(creator, sortBy);
  const secondary = getSecondaryMetrics(creator, sortBy);

  return (
    <a
      href={`/creator/${creator.username.toLowerCase()}`}
      className={`group relative block rounded-[12px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] ${
        isChampion
          ? 'bg-surface border-[1.5px] border-[rgba(196,135,90,0.35)] p-6 md:p-7'
          : 'bg-surface border border-border p-5 md:p-6'
      }`}
    >
      {/* Champion glow */}
      {isChampion && (
        <div className="absolute inset-0 rounded-[12px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(196,135,90,0.07) 0%, transparent 70%)' }}
        />
      )}

      {/* Rank + Crown */}
      <div className="relative mb-4">
        {isChampion && (
          <svg className="absolute -top-1 left-[22px] w-5 h-5 text-copper" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z" />
          </svg>
        )}
        <span className={`font-serif font-bold text-copper leading-none ${
          isChampion ? 'text-[52px] md:text-[60px]' : 'text-[40px] md:text-[46px]'
        }`}>
          #{rank}
        </span>
      </div>

      {/* Avatar + Name + Verified */}
      <div className="flex items-center gap-3 mb-3">
        <div className={`relative w-[48px] h-[48px] rounded-full flex items-center justify-center text-[14px] font-serif font-semibold flex-shrink-0 transition-all duration-300 group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)] ${
          creator.verified
            ? 'bg-[rgba(196,135,90,0.08)] text-copper border border-[rgba(196,135,90,0.35)] group-hover:border-copper'
            : 'bg-surface-elevated text-cream-muted border border-border group-hover:border-cream-faint'
        }`}>
          {creator.initials}
        </div>
        <div className="min-w-0">
          <div className="text-[15px] text-cream font-medium transition-colors duration-300 group-hover:text-copper truncate">
            {creator.username}
          </div>
          {creator.verified && (
            <span className="inline-flex items-center gap-1 font-mono text-[8px] text-copper bg-copper-dim border border-[rgba(196,135,90,0.2)] rounded-full px-2 py-0.5 tracking-[0.04em] mt-0.5">
              <svg width="8" height="8" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" fill="#C4875A" />
                <path d="M5 8l2 2 4-4" stroke="#1A1714" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              VERIFIED
            </span>
          )}
        </div>
      </div>

      {/* Specialty chips */}
      <div className="flex gap-1.5 mb-4">
        {creator.specialties.slice(0, 2).map(spec => (
          <span key={spec} className="tag tag-style text-[9px]">{spec}</span>
        ))}
      </div>

      {/* Primary metric */}
      <div className="mb-2">
        <span className={`font-mono text-copper font-semibold tracking-tight ${
          isChampion ? 'text-[24px] md:text-[28px]' : 'text-[20px] md:text-[22px]'
        }`}>
          {primary.value}
        </span>
        <span className="font-mono text-[10px] text-cream-faint ml-2">{primary.suffix}</span>
      </div>

      {/* Secondary metrics */}
      <div className="flex items-center gap-2 pt-2.5 border-t border-border mb-3">
        {secondary.map((m, i) => (
          <span key={i} className="font-mono text-[10px] text-cream-muted">
            {m}{i < secondary.length - 1 && <span className="text-cream-faint ml-2">·</span>}
          </span>
        ))}
      </div>

      {/* Proof line + Trending */}
      <div className="flex items-center gap-2 mb-3">
        {creator.trending === 'up' && (
          <span className="text-[10px] text-green-accent">↑</span>
        )}
        <span className="font-serif italic text-[11px] text-cream-muted leading-relaxed">
          {creator.proofLine}
        </span>
      </div>

      {/* CTA */}
      <span className="font-mono text-[11px] text-copper border-b border-transparent group-hover:border-copper transition-all duration-300">
        VIEW PROFILE →
      </span>
    </a>
  );
}

/* ── Table Row (Rank 4+) ── */
function CreatorTableRow({ creator, rank, sortBy, isEven }: {
  creator: Creator;
  rank: number;
  sortBy: SortKey;
  isEven: boolean;
}) {
  const primary = getPrimaryMetric(creator, sortBy);
  const secondary = getSecondaryMetrics(creator, sortBy);

  return (
    <a
      href={`/creator/${creator.username.toLowerCase()}`}
      className={`group flex items-center gap-3 px-4 md:px-5 py-3.5 transition-all duration-200 border-b border-border last:border-b-0 ${
        isEven ? 'bg-transparent' : 'bg-[rgba(42,37,32,0.4)]'
      } hover:bg-surface-hover`}
    >
      {/* Rank */}
      <span className="font-mono text-[14px] text-cream-faint font-medium w-8 text-center flex-shrink-0">
        {rank}
      </span>

      {/* Avatar + Name + Verified */}
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <div className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center text-[10px] font-serif font-semibold text-cream-muted border border-border flex-shrink-0">
          {creator.initials}
        </div>
        <span className="text-[13px] text-cream font-medium group-hover:text-copper transition-colors duration-200 truncate">
          {creator.username}
        </span>
        {creator.verified && (
          <svg className="flex-shrink-0" width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="#C4875A" />
            <path d="M5 8l2 2 4-4" stroke="#1A1714" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Specialty chips — hidden on mobile */}
      <div className="hidden md:flex gap-1 flex-shrink-0">
        {creator.specialties.slice(0, 2).map(s => (
          <span key={s} className="tag tag-style text-[9px]">{s}</span>
        ))}
      </div>

      {/* Primary metric */}
      <span className="font-mono text-[13px] text-copper font-medium flex-shrink-0 w-[80px] text-right">
        {primary.value}
      </span>

      {/* Secondary — hidden on mobile */}
      <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-cream-muted flex-shrink-0 w-[120px]">
        {secondary.map((m, i) => (
          <span key={i}>{m}{i < secondary.length - 1 && <span className="text-cream-faint ml-1">·</span>}</span>
        ))}
      </div>

      {/* View CTA */}
      <span className="font-mono text-[10px] text-copper opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 hidden md:block">
        VIEW →
      </span>
    </a>
  );
}

/* ── Main Component ── */
export default function TheDugout() {
  const [sortBy, setSortBy] = useState<SortKey>('rating');

  const sortedCreators = useMemo(() => {
    return [...CREATORS].sort((a, b) => {
      switch (sortBy) {
        case 'downloads': return b.downloadsNum - a.downloadsNum;
        case 'rating': return b.avgRating - a.avgRating;
        case 'tactics': return b.tacticsCount - a.tacticsCount;
        default: return 0;
      }
    });
  }, [sortBy]);

  const podium = sortedCreators.slice(0, 3);
  const rest = sortedCreators.slice(3);

  return (
    <section id="creators" className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 md:mb-8">
        <div>
          <div className="sec-eyebrow">🏟️ From the Backroom</div>
          <h2 className="font-serif text-[22px] md:text-section font-normal tracking-tight">Top Creators</h2>
          <p className="text-[13px] text-cream-muted mt-1.5 max-w-[440px] leading-relaxed">
            Discover the most trusted tactic makers&mdash;ranked by real community results.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2">
          <div className="flex items-center gap-1.5">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSortBy(opt.key)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono cursor-pointer transition-all duration-300 border ${
                  sortBy === opt.key
                    ? 'text-copper border-[rgba(196,135,90,0.25)] bg-copper-dim'
                    : 'text-cream-muted border-transparent bg-transparent hover:text-cream hover:bg-surface'
                }`}
              >
                {opt.label}
              </button>
            ))}
            <span className="hidden md:block w-[1px] h-4 bg-border mx-1" />
            <a href="/creators" className="text-copper font-mono text-[11px] border-b border-transparent transition-all duration-300 hover:border-copper">
              ALL CREATORS →
            </a>
          </div>
          <span className="font-mono text-[9px] text-cream-faint tracking-[0.04em]">
            Ranking updates daily. Min. 5 reviews to qualify.
          </span>
        </div>
      </div>

      {/* ── Top 3 Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-5 md:mb-7">
        <PodiumCard creator={podium[0]} rank={1} sortBy={sortBy} />
        <PodiumCard creator={podium[1]} rank={2} sortBy={sortBy} />
        <PodiumCard creator={podium[2]} rank={3} sortBy={sortBy} />
      </div>

      {/* ── Table (Rank 4+) ── */}
      {rest.length > 0 && (
        <div className="bg-surface border border-border rounded-[10px] overflow-hidden">
          {/* Table header — desktop only */}
          <div className="hidden md:flex items-center gap-3 px-5 py-2.5 border-b border-border">
            <span className="font-mono text-[9px] text-cream-faint uppercase tracking-[0.06em] w-8 text-center">#</span>
            <span className="font-mono text-[9px] text-cream-faint uppercase tracking-[0.06em] flex-1">Creator</span>
            <span className="font-mono text-[9px] text-cream-faint uppercase tracking-[0.06em] w-[120px]">Specialty</span>
            <span className="font-mono text-[9px] text-cream-faint uppercase tracking-[0.06em] w-[80px] text-right">
              {sortBy === 'rating' ? 'Rating' : sortBy === 'downloads' ? 'Downloads' : 'Tactics'}
            </span>
            <span className="font-mono text-[9px] text-cream-faint uppercase tracking-[0.06em] w-[120px]">Stats</span>
            <span className="w-[44px]" />
          </div>

          {/* Rows */}
          {rest.map((creator, idx) => (
            <CreatorTableRow
              key={creator.username}
              creator={creator}
              rank={idx + 4}
              sortBy={sortBy}
              isEven={idx % 2 === 0}
            />
          ))}
        </div>
      )}
    </section>
  );
}
