import WeatherBadge from "./WeatherBadge";
import CalendarIcon from "./CalendarIcon";

function parseDateLabel(dateLabel) {
  if (!dateLabel) return null;
  // Expected format: "Thu 11 Jun 2026" or similar
  const match = dateLabel.match(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i);
  if (!match) return null;
  return {
    dayAbbr: match[1],
    date: parseInt(match[2], 10),
  };
}

export default function DayCard({ day, weather, activity, flight, accommodation, location }) {
  const dateLabel = day.dateLabel ? ` - ${day.dateLabel}` : "";
  const calendarData = parseDateLabel(day.dateLabel);

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <header className="mb-4 border-b border-slate-100 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Day {day.day}
              {dateLabel}
            </h2>
            {location && (
              <p className="mt-1 text-sm font-medium text-slate-600">{location}</p>
            )}
          </div>
          {calendarData && (
            <CalendarIcon dayAbbr={calendarData.dayAbbr} date={calendarData.date} />
          )}
        </div>
        {weather && (
          <div className="mt-3">
            <WeatherBadge weather={weather} />
          </div>
        )}
      </header>

      <div className="space-y-4">
        {activity && (
          <section>
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Activity
            </h3>
            <p className="text-slate-700">{activity}</p>
          </section>
        )}

        {flight && flight !== "—" && (
          <section>
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Flight
            </h3>
            <p className="text-slate-700">{flight}</p>
          </section>
        )}

        {accommodation && (
          <section>
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Accommodation
            </h3>
            <p className="text-slate-700">{accommodation}</p>
          </section>
        )}
      </div>
    </article>
  );
}
