/**
 * Calendar icon component matching the style guide
 * Displays a three-letter day abbreviation in a colored header
 * and the date number in a white body below
 */

// Color palette for each day of the week
const DAY_COLORS = {
  MON: "#E02B27", // Red
  TUE: "#FF6B35", // Orange
  WED: "#F7931E", // Orange-yellow
  THU: "#4ECDC4", // Teal
  FRI: "#45B7D1", // Blue
  SAT: "#96CEB4", // Green
  SUN: "#FFEAA7", // Yellow
};

export default function CalendarIcon({ dayAbbr, date }) {
  const color = DAY_COLORS[dayAbbr.toUpperCase()] || "#E02B27";
  const displayDay = dayAbbr.toUpperCase().slice(0, 3);
  const displayDate = date.toString();

  return (
    <svg
      width="60"
      height="70"
      viewBox="0 0 60 70"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm"
    >
      {/* Main calendar shape with rounded corners */}
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
          <feOffset dx="0" dy="1" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* White body */}
      <rect
        x="2"
        y="18"
        width="56"
        height="50"
        rx="4"
        fill="white"
        filter="url(#shadow)"
      />

      {/* Colored header */}
      <rect x="2" y="2" width="56" height="18" rx="4" fill={color} />

      {/* Decorative dots */}
      <circle cx="12" cy="11" r="1.5" fill="white" opacity="0.8" />
      <circle cx="48" cy="11" r="1.5" fill="white" opacity="0.8" />

      {/* Day abbreviation text */}
      <text
        x="30"
        y="14"
        textAnchor="middle"
        fill="white"
        fontSize="9"
        fontWeight="600"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="0.5"
      >
        {displayDay}
      </text>

      {/* Date number */}
      <text
        x="30"
        y="52"
        textAnchor="middle"
        fill="black"
        fontSize="24"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {displayDate}
      </text>
    </svg>
  );
}
