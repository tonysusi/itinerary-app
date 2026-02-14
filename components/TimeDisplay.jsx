"use client";

import { useState, useEffect } from "react";
import { DateTime } from "luxon";

export default function TimeDisplay({ destinationTimezone, destination }) {
  const [localTime, setLocalTime] = useState("");
  const [destinationTime, setDestinationTime] = useState("");

  useEffect(() => {
    const update = () => {
      setLocalTime(DateTime.now().toFormat("HH:mm:ss"));
      setDestinationTime(
        DateTime.now().setZone(destinationTimezone || "UTC").toFormat("HH:mm:ss")
      );
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [destinationTimezone]);

  return (
    <div className="flex flex-wrap gap-6 text-sm">
      <div className="rounded-lg bg-slate-100 px-4 py-2">
        <span className="text-slate-500">Local time</span>
        <p className="font-mono text-lg font-semibold">{localTime || "—"}</p>
      </div>
      <div className="rounded-lg bg-slate-100 px-4 py-2">
        <span className="text-slate-500">{destination || "Destination"} time</span>
        <p className="font-mono text-lg font-semibold">
          {destinationTime || "—"}
        </p>
      </div>
    </div>
  );
}
