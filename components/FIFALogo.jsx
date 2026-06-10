/**
 * FIFA World Cup 2026 Logo
 * Source: https://commons.wikimedia.org/wiki/File:2026_FIFA_World_Cup_emblem.svg
 */
export default function FIFALogo({ className = "", grayscale = true }) {
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/1/17/2026_FIFA_World_Cup_emblem.svg"
      alt="FIFA World Cup 2026"
      className={`max-w-full h-auto ${className}`}
      style={grayscale ? { filter: "grayscale(100%) contrast(1.2)" } : undefined}
    />
  );
}
