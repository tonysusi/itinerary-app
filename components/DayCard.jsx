import WeatherBadge from "./WeatherBadge";

function parseDateLabel(dateLabel) {
  if (!dateLabel) return null;
  // Expected format: "Thu 11 Jun 2026" or similar
  const match = dateLabel.match(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i);
  if (!match) return null;
  return {
    dayAbbr: match[1],
    date: parseInt(match[2], 10),
    month: match[3],
  };
}

const BULLET_COLORS = [
  "bg-slate-600",
  "bg-violet-500",
  "bg-purple-500",
  "bg-rose-600",
  "bg-amber-700",
  "bg-emerald-600",
  "bg-sky-600",
];

function cleanText(value) {
  return value?.replace(/\*/g, "").replace(/\s+/g, " ").trim() || "";
}

function firstLine(value) {
  return cleanText(value?.split("\n")[0]);
}

function getDayTitle(day, location, activity, flight) {
  if (day.day === 1 && flight) return "Auckland → Los Angeles — Arrival Day ✈️";
  return location || firstLine(activity) || `Day ${day.day}`;
}

function splitItems(value) {
  return (value || "")
    .split("\n")
    .map(cleanText)
    .filter(Boolean);
}

function DatePill({ calendarData, dayNumber }) {
  return (
    <div className="flex h-16 w-20 shrink-0 flex-col items-center justify-center rounded-lg bg-stone-100 text-center shadow-sm sm:h-[72px] sm:w-[88px]">
      <span className="text-sm font-medium leading-none text-slate-600">
        {calendarData ? `${calendarData.month} ${calendarData.date}` : "Day"}
      </span>
      <span className="mt-1 text-xl font-bold leading-none text-slate-950">
        Day {Math.max(dayNumber - 1, 0)}
      </span>
    </div>
  );
}

function TimelineItem({ children, index }) {
  return (
    <li className={`flex items-start gap-3 ${index > 4 ? "hidden sm:flex" : ""}`}>
      <span
        className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${
          BULLET_COLORS[index % BULLET_COLORS.length]
        }`}
      />
      <span className="text-sm leading-relaxed text-slate-700 sm:text-base">{children}</span>
    </li>
  );
}

export default function DayCard({ day, weather, activity, flight, accommodation, location }) {
  const calendarData = parseDateLabel(day.dateLabel);
  const activityItems = day.activityItems?.length ? day.activityItems : splitItems(activity);
  const flightItems = day.flightItems?.length ? day.flightItems : splitItems(flight);
  const accommodationItems = day.accommodationItems?.length
    ? day.accommodationItems
    : splitItems(accommodation);
  const timelineItems = activityItems;
  const title = getDayTitle(day, location, activity, flight);
  const subtitleParts = [
    flightItems[0],
    !flightItems.length && firstLine(activity),
    accommodationItems[0],
    weather && `${weather.temp}°C ${weather.condition}`,
  ].filter(Boolean);
  const callout = accommodationItems[0] || firstLine(activity) || location;

  return (
    <div className="space-y-3">
      <article className="rounded-[18px] border border-stone-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
          <DatePill calendarData={calendarData} dayNumber={day.day} />

          <div className="min-w-0 flex-1">
            <header className="pb-3">
              <h2 className="text-xl font-bold leading-snug text-slate-950 sm:text-2xl">
                {title}
              </h2>
              {subtitleParts.length > 0 && (
                <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
                  {subtitleParts.join(" · ")}
                </p>
              )}
              {weather && (
                <div className="mt-3">
                  <WeatherBadge weather={weather} />
                </div>
              )}
            </header>

            {timelineItems.length > 0 && (
              <ul className="space-y-2.5">
                {timelineItems.map((item, index) => (
                  <TimelineItem key={`${item}-${index}`} index={index}>
                    {item}
                  </TimelineItem>
                ))}
              </ul>
            )}

            {callout && (
              <div className="mt-4 border-l-4 border-slate-300 bg-stone-100/80 px-4 py-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                {callout}
              </div>
            )}
          </div>
        </div>
      </article>

      {flightItems.length > 0 && flight !== "—" && (
        <aside className="rounded-[18px] border border-stone-200 bg-white px-4 py-4 shadow-sm sm:px-6">
          <p className="text-base font-bold text-slate-950">✈️ Flight / Transport</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">
            {flightItems.join(" · ")}
          </p>
        </aside>
      )}
    </div>
  );
}
