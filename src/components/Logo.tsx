interface LogoProps {
  className?: string;
}

export function Logo({ className = 'h-8 w-8' }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Border */}
      <rect
        x="3"
        y="3"
        width="94"
        height="94"
        rx="14"
        ry="14"
        fill="none"
        stroke="#C4875A"
        strokeWidth="2"
      />
      {/* Halfway line */}
      <line
        x1="10"
        y1="56"
        x2="90"
        y2="56"
        stroke="#C4875A"
        strokeWidth="1.0"
        strokeOpacity="0.30"
      />
      {/* Center circle */}
      <circle
        cx="50"
        cy="56"
        r="11"
        fill="none"
        stroke="#C4875A"
        strokeWidth="1.0"
        strokeOpacity="0.28"
      />
      {/* Penalty area */}
      <rect
        x="20"
        y="5"
        width="60"
        height="24"
        rx="1"
        fill="none"
        stroke="#C4875A"
        strokeWidth="0.9"
        strokeOpacity="0.25"
      />
      {/* Goal area */}
      <rect
        x="32"
        y="5"
        width="36"
        height="11"
        rx="1"
        fill="none"
        stroke="#C4875A"
        strokeWidth="0.8"
        strokeOpacity="0.22"
      />
      {/* Penalty spot */}
      <circle cx="50" cy="22" r="1.2" fill="#C4875A" fillOpacity="0.25" />
      {/* Corner arcs */}
      <path
        d="M5,5 Q5,12 12,12"
        fill="none"
        stroke="#C4875A"
        strokeWidth="0.7"
        strokeOpacity="0.20"
      />
      <path
        d="M95,5 Q95,12 88,12"
        fill="none"
        stroke="#C4875A"
        strokeWidth="0.7"
        strokeOpacity="0.20"
      />
      {/* Formation dots - 4-3-3 */}
      {/* GK */}
      <circle cx="50" cy="88" r="4" fill="#C4875A" />
      {/* Back 4 */}
      <circle cx="18" cy="70" r="4" fill="#C4875A" />
      <circle cx="39" cy="70" r="4" fill="#C4875A" />
      <circle cx="61" cy="70" r="4" fill="#C4875A" />
      <circle cx="82" cy="70" r="4" fill="#C4875A" />
      {/* Midfield 3 */}
      <circle cx="28" cy="48" r="4" fill="#C4875A" />
      <circle cx="50" cy="52" r="4" fill="#C4875A" />
      <circle cx="72" cy="48" r="4" fill="#C4875A" />
      {/* Front 3 */}
      <circle cx="24" cy="24" r="4" fill="#C4875A" />
      <circle cx="50" cy="20" r="4" fill="#C4875A" />
      <circle cx="76" cy="24" r="4" fill="#C4875A" />
    </svg>
  );
}
