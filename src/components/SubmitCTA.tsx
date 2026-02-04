import Link from 'next/link';

export default function SubmitCTA() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
      <Link
        href="/submit"
        className="relative overflow-hidden cursor-pointer transition-all duration-400 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5 rounded-[10px] p-4 md:p-5 px-5 md:px-7 hover:border-[rgba(196,135,90,0.2)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
        style={{
          background: 'linear-gradient(135deg, rgba(196,135,90,0.06), rgba(196,135,90,0.02))',
          border: '1px dashed rgba(196,135,90,0.25)',
        }}
      >
        <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-copper rounded-l-[10px]" />
        <div className="text-2xl flex-shrink-0">📋</div>
        <div className="flex-1 min-w-0">
          <div className="font-serif text-base font-medium mb-0.5">Got a tactic that works? Share it with the community.</div>
          <div className="text-xs text-cream-muted leading-relaxed">Submit your FM tactic, get rated by real managers, and join the creator leaderboard.</div>
        </div>
        <span className="px-5 py-2 bg-copper text-bg font-sans text-xs font-medium rounded-md whitespace-nowrap transition-all duration-300 flex-shrink-0 hover:bg-copper-bright">
          Submit tactic &rarr;
        </span>
      </Link>
    </div>
  );
}
