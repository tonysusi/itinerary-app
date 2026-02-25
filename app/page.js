"use client";

import { useState, useEffect } from "react";
import DayCard from "@/components/DayCard";
import MatchesPanel from "@/components/MatchesPanel";
import TimeDisplay from "@/components/TimeDisplay";

export default function Home() {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <TimeDisplay />
      </header>

      <section className="space-y-6">
        {itinerary.days.map((day) => (
          <div
            key={day.day}
            className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6"
          >
            <div className="flex-1 min-w-0">
              <DayCard
                day={day}
                weather={day.weather}
                activity={day.activity}
                flight={day.flight}
                accommodation={day.accommodation}
                location={day.location}
              />
            </div>
            <MatchesPanel games={day.games} dateLabel={day.dateLabel} />
          </div>
        ))}
      </section>
    </main>
  );
}
