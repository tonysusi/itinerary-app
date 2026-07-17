"use client";

import LinkedText from "./LinkedText";
import WeatherBadge from "./WeatherBadge";
import { isCurrentDay, parseDateLabel, extractLocationsFromDay } from "@/lib/day-utils";

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

function getTransportLabel(items) {
  const transportText = items.join(" ").toLowerCase();
  if (transportText.includes("ferr") || transportText.includes("clipper")) {
    return "⛴️ Ferry / Transport";
  }
  return "✈️ Flight / Transport";
}

function DatePill({ calendarData, dayNumber }) {
  return (
    <div className="flex h-[4.5rem] w-20 shrink-0 flex-col items-center justify-center rounded-lg bg-stone-100 px-1 text-center shadow-sm sm:h-20 sm:w-[88px]">
      <span className="text-base font-bold uppercase leading-none tracking-wide text-slate-950 sm:text-lg">
        {calendarData ? calendarData.dayAbbr.toUpperCase() : "—"}
      </span>
      <span className="mt-1 text-sm font-medium leading-none text-slate-600">
        {calendarData ? `${calendarData.month} ${calendarData.date}` : "—"}
      </span>
      <span className="mt-1 text-xs font-normal leading-none text-slate-500">
        Day {dayNumber}
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

function ChevronIcon({ expanded }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
        expanded ? "rotate-180" : ""
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function DayCard({
  day,
  weather,
  activity,
  flight,
  accommodation,
  location,
  expanded,
  onExpandedChange,
}) {
  const calendarData = parseDateLabel(day.dateLabel);
  const activityItems = day.activityItems?.length ? day.activityItems : splitItems(activity);
  const flightItems = day.flightItems?.length ? day.flightItems : splitItems(flight);
  const accommodationItems = day.accommodationItems?.length
    ? day.accommodationItems
    : splitItems(accommodation);
  const timelineItems = activityItems;
  const title = getDayTitle(day, location, activity, flight);
  const transportLabel = getTransportLabel(flightItems);
  const accommodationSummary = accommodationItems[0] || cleanText(accommodation);
  const summaryParts = [
    flightItems[0],
    !flightItems.length && firstLine(activity),
    weather && `${weather.temp}°C ${weather.condition}`,
  ].filter(Boolean);
  const callout = accommodationItems[0] || firstLine(activity) || location;

  return (
    <div className="space-y-3">
      <article
        className={`rounded-[18px] border bg-white p-4 shadow-sm transition-shadow sm:p-6 ${
          expanded
            ? "border-stone-200 hover:shadow-md"
            : "border-stone-200 hover:border-stone-300"
        } ${isCurrentDay(day.dateLabel) ? "ring-2 ring-sky-200 ring-offset-2" : ""}`}
      >
        <button
          type="button"
          className="flex w-full flex-col gap-4 text-left sm:flex-row sm:gap-5"
          onClick={() => onExpandedChange?.(!expanded)}
          aria-expanded={expanded}
        >
          <DatePill calendarData={calendarData} dayNumber={day.day} />

          <div className="min-w-0 flex-1">
            <header className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold leading-snug text-slate-950 sm:text-2xl">
                  {title}
                </h2>
                {!expanded && accommodationSummary && (
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
                    <LinkedText text={accommodationSummary} />
                  </p>
                )}
                {weather && (
                  <div className="mt-3">
                    <WeatherBadge weather={weather} />
                  </div>
                )}
              </div>
              <ChevronIcon expanded={expanded} />
            </header>
          </div>
        </button>

        {expanded && (
          <div className="mt-4 border-t border-stone-100 pt-4 sm:pl-[calc(5.5rem+1.25rem)]">
            {(summaryParts.length > 0 || accommodationSummary) && (
              <p className="text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
                {summaryParts.map((part, index) => (
                  <span key={`${part}-${index}`}>
                    {index > 0 && " · "}
                    {part}
                  </span>
                ))}
                {accommodationSummary && (
                  <span>
                    {summaryParts.length > 0 && " · "}
                    <LinkedText text={accommodationSummary} />
                  </span>
                )}
              </p>
            )}

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
              <div className="border-l-4 border-slate-300 bg-stone-100/80 px-4 py-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                {accommodationItems[0] ? (
                  <LinkedText text={callout} />
                ) : (
                  callout
                )}
              </div>
            )}
          </div>
        )}
      </article>

      {expanded && flightItems.length > 0 && flight !== "—" && (
        <aside className="rounded-[18px] border border-stone-200 bg-white px-4 py-4 shadow-sm sm:px-6">
          <p className="text-base font-bold text-slate-950">{transportLabel}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">
            {flightItems.join(" · ")}
          </p>
        </aside>
      )}

      {expanded && (
        <div className="rounded-[18px] border border-stone-200 bg-white px-4 py-4 shadow-sm sm:px-6">
          <InstagramPhotos
            locations={extractLocationsFromDay(location)}
            dateLabel={day.dateLabel}
          />
        </div>
      )}
    </div>
  );
}
