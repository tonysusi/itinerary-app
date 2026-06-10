"use client";

import { formatStickyDateLabel } from "@/lib/day-utils";
import MatchesToggle from "./MatchesToggle";

function getDayCarousel(allDays, activeDay) {
  if (!activeDay || !allDays.length) return [];

  const currentIndex = allDays.findIndex((d) => d.day === activeDay.day);
  if (currentIndex === -1) return [];

  const carousel = [];

  if (currentIndex > 0) {
    carousel.push({ ...allDays[currentIndex - 1], isCurrent: false });
  }

  carousel.push({ ...activeDay, isCurrent: true });

  for (let i = 1; i <= 3; i++) {
    if (currentIndex + i < allDays.length) {
      carousel.push({ ...allDays[currentIndex + i], isCurrent: false });
    }
  }

  return carousel;
}

export default function StickyDayHeader({
  dateLabel,
  visible,
  activeDay,
  allDays,
  onDayClick,
  showMatches,
  onToggleMatches,
  showTz,
  onToggleTz,
}) {
  if (!visible || !dateLabel || !activeDay) return null;

  const carousel = getDayCarousel(allDays, activeDay);

  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6">
        <div className="flex min-w-0 flex-1 items-center gap-1 py-3 sm:gap-2">
          {carousel.map((day) => (
            <button
              key={day.day}
              type="button"
              onClick={() => onDayClick(day.day)}
              className={`cursor-pointer rounded px-2 py-1 text-xs font-medium transition sm:text-sm ${
                day.isCurrent
                  ? "font-bold text-slate-950"
                  : "text-slate-500 hover:bg-stone-100 hover:text-slate-700"
              }`}
            >
              {formatStickyDateLabel(day.dateLabel)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTz}
            title="Show/hide timezones"
            aria-pressed={showTz}
            aria-label="Toggle timezone display"
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-white shadow-sm transition hover:shadow ${
              showTz
                ? "border-stone-200 hover:border-stone-300"
                : "border-stone-200 opacity-75 hover:border-stone-300 hover:opacity-100"
            }`}
          >
            <svg
              className="h-5 w-5 text-slate-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 1 0 20" />
              <path d="M2 12h20" />
              <path d="M12 2c4.4 0 8 3.1 8 7" />
              <path d="M12 22c-4.4 0-8-3.1-8-7" />
            </svg>
          </button>
          <MatchesToggle showMatches={showMatches} onToggle={onToggleMatches} />
        </div>
      </div>
    </div>
  );
}
