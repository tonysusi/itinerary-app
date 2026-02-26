/**
 * FIFA World Cup 2026 Logo - Black and White SVG
 * Uses the official SVG from Wikimedia Commons
 * Source: https://commons.wikimedia.org/wiki/File:FIFA_World_Cup_2026.svg
 */
export default function FIFALogo({ className = "" }) {
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/8/85/FIFA_World_Cup_2026.svg"
      alt="FIFA World Cup 2026"
      className={`max-w-full h-auto ${className}`}
      style={{ filter: "grayscale(100%) contrast(1.2)" }}
    />
  );
}
