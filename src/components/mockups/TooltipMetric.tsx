'use client';

interface TooltipMetricProps {
  value: string;
  tooltip: string;
  className?: string;
}

export default function TooltipMetric({ value, tooltip, className = '' }: TooltipMetricProps) {
  return (
    <span className={`relative group/tip inline-flex ${className}`}>
      <span className="border-b border-dashed border-cream-faint cursor-help">{value}</span>
      <span className="invisible group-hover/tip:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-surface-elevated border border-border rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.4)] z-50 w-[220px] text-center">
        <span className="font-mono text-[10px] text-cream leading-relaxed block">{tooltip}</span>
        <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-surface-elevated border-r border-b border-border rotate-45" />
      </span>
    </span>
  );
}
