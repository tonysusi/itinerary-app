"use client";

import { useEffect, useState } from "react";

const TIMEZONES = [
  { name: "PST", offset: -8 },
  { name: "EST", offset: -5 },
  { name: "NZT", offset: 12 },
];

function formatTimeForTimezone(offset) {
  const now = new Date();
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
  const tzTime = new Date(utcTime + offset * 3600000);

  const hours = String(tzTime.getHours()).padStart(2, "0");
  const minutes = String(tzTime.getMinutes()).padStart(2, "0");
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days[tzTime.getDay()];
  const date = tzTime.getDate();

  return { time: `${hours}:${minutes}`, day, date };
}

export default function TimezoneFooter({ visible }) {
  const [tzData, setTzData] = useState(
    TIMEZONES.map((tz) => ({ ...tz, ...formatTimeForTimezone(tz.offset) }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTzData(
        TIMEZONES.map((tz) => ({ ...tz, ...formatTimeForTimezone(tz.offset) }))
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl justify-center gap-8 px-6 py-3 sm:gap-12">
        {tzData.map((tz) => (
          <div key={tz.name} className="flex flex-col items-center gap-1">
            <span className="text-xs font-semibold text-slate-600">{tz.name}</span>
            <span className="text-sm font-mono font-bold text-slate-950">
              {tz.time}
            </span>
            <span className="text-xs text-slate-500">
              {tz.day} {tz.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
