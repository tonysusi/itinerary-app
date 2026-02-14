import { formatMatchWithFlags } from "@/lib/country-flags";

export default function MatchesPanel({ games, dateLabel }) {
  if (!games || games.length === 0) {
    return (
      <aside className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 lg:min-w-[280px] lg:self-start">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          World Cup Matches
          {dateLabel && <span className="normal-case font-normal text-slate-400"> — {dateLabel}</span>}
        </h3>
        <p className="text-sm text-slate-400">No matches this day</p>
      </aside>
    );
  }

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:min-w-[280px] lg:self-start">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        World Cup Matches
        {dateLabel && <span className="normal-case font-normal text-slate-400"> — {dateLabel}</span>}
      </h3>
      <ul className="space-y-2">
        {games.map((game, i) => (
          <li
            key={i}
            className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm"
          >
            <span className="font-medium text-slate-900" title={game.match}>
              {formatMatchWithFlags(game.match)}
            </span>
            <span className="mx-2 text-slate-400">•</span>
            <span className="text-slate-600">{game.time}</span>
            <span className="mx-2 text-slate-400">•</span>
            <span className="text-slate-500">{game.venue}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
