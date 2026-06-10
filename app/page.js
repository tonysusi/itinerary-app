"use client";

import { useEffect, useState } from "react";
import DayCard from "@/components/DayCard";
import MatchesPanel from "@/components/MatchesPanel";
import MatchesToggle from "@/components/MatchesToggle";
import StickyDayHeader from "@/components/StickyDayHeader";
import TimeDisplay from "@/components/TimeDisplay";
import TimezoneFooter from "@/components/TimezoneFooter";
import TripMap from "@/components/TripMap";
import { useActiveDayInView } from "@/hooks/useActiveDayInView";
import { isCurrentDay } from "@/lib/day-utils";

function buildInitialExpandedDays(days) {
  const initial = new Set();
  const currentDay = days.find((day) => isCurrentDay(day.dateLabel));
  if (currentDay) initial.add(currentDay.day);
  return initial;
}

export default function Home() {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMatches, setShowMatches] = useState(false);
  const [expandedDays, setExpandedDays] = useState(new Set());
  const [showTimezones, setShowTimezones] = useState(false);
  const days = itinerary?.days ?? [];
  const { sectionRef, registerDayRef, activeDay, stickyVisible } = useActiveDayInView(days);

  useEffect(() => {
    if (itinerary?.days?.length) {
      setExpandedDays(buildInitialExpandedDays(itinerary.days));
    }
  }, [itinerary]);

  const toggleDayExpanded = (dayNumber, shouldExpand) => {
    setExpandedDays((previous) => {
      const next = new Set(previous);
      if (shouldExpand) next.add(dayNumber);
      else next.delete(dayNumber);
      return next;
    });
  };

  const handleStickyNavigate = () => {
    if (!activeDay) return;

    const element = document.getElementById(`day-${activeDay.day}`);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
    toggleDayExpanded(activeDay.day, true);
  };

  useEffect(() => {
    fetch("/api/itinerary")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load itinerary");
        return res.json();
      })
      .then(setItinerary)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex min-h-[200px] items-center justify-center">
          <p className="text-slate-500">Loading itinerary...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-lg bg-red-50 p-4 text-red-700">
          {error.message}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-10">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          {itinerary.trip}
        </h1>
        <p className="mb-4 text-slate-600">{itinerary.destination}</p>
        <div className="hidden sm:block">
          <TimeDisplay />
        </div>
      </header>

      <TripMap />

      <StickyDayHeader
        dateLabel={activeDay?.dateLabel}
        visible={stickyVisible}
        activeDay={activeDay}
        allDays={days}
        onDayClick={(dayNumber) => {
          const element = document.getElementById(`day-${dayNumber}`);
          element?.scrollIntoView({ behavior: "smooth", block: "start" });
          toggleDayExpanded(dayNumber, true);
        }}
        showMatches={showMatches}
        onToggleMatches={() => setShowMatches((value) => !value)}
        showTz={showTimezones}
        onToggleTz={() => setShowTimezones((value) => !value)}
      />

      <TimezoneFooter visible={stickyVisible && showTimezones} />

      {!stickyVisible && (
        <div className="mb-6 flex items-center justify-end">
          <MatchesToggle
            showMatches={showMatches}
            onToggle={() => setShowMatches((value) => !value)}
          />
        </div>
      )}

      <section ref={sectionRef} className="space-y-6">
        {days.map((day) => (
          <div
            key={day.day}
            id={`day-${day.day}`}
            ref={(element) => registerDayRef(day.day, element)}
            className="scroll-mt-16 flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6"
          >
            <div className={`w-full min-w-0 ${showMatches ? "lg:w-2/3" : ""}`}>
              <DayCard
                day={day}
                weather={day.weather}
                activity={day.activity}
                flight={day.flight}
                accommodation={day.accommodation}
                location={day.location}
                expanded={expandedDays.has(day.day)}
                onExpandedChange={(shouldExpand) =>
                  toggleDayExpanded(day.day, shouldExpand)
                }
              />
            </div>
            {showMatches && (
              <div className="w-full lg:w-1/3">
                <MatchesPanel games={day.games} dateLabel={day.dateLabel} />
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
