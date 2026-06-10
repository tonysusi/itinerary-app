import FIFALogo from "./FIFALogo";

export default function MatchesToggle({ showMatches, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      title={showMatches ? "Hide World Cup matches" : "Show World Cup matches"}
      aria-pressed={showMatches}
      aria-label={showMatches ? "Hide World Cup matches" : "Show World Cup matches"}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-white shadow-sm transition hover:shadow ${
        showMatches
          ? "border-stone-200 hover:border-stone-300"
          : "border-stone-200 opacity-75 hover:border-stone-300 hover:opacity-100"
      }`}
    >
      <FIFALogo className="h-7 w-7 object-contain" grayscale={!showMatches} />
    </button>
  );
}
