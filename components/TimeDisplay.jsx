"use client";

import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import CalendarIcon from "./CalendarIcon";

export default function TimeDisplay() {
  const [nzTime, setNzTime] = useState({ dayAbbr: "", date: 0, time: "" });
  const [pacificTime, setPacificTime] = useState({ dayAbbr: "", date: 0, time: "" });
  const [easternTime, setEasternTime] = useState({ dayAbbr: "", date: 0, time: "" });

  useEffect(() => {
    const update = () => {
      const nz = DateTime.now().setZone("Pacific/Auckland");
      setNzTime({
        dayAbbr: nz.toFormat("EEE"),
        date: nz.day,
        time: nz.toFormat("HH:mm"),
      });

      const pacific = DateTime.now().setZone("America/Los_Angeles");
      setPacificTime({
        dayAbbr: pacific.toFormat("EEE"),
        date: pacific.day,
        time: pacific.toFormat("HH:mm"),
      });

      const eastern = DateTime.now().setZone("America/New_York");
      setEasternTime({
        dayAbbr: eastern.toFormat("EEE"),
        date: eastern.day,
        time: eastern.toFormat("HH:mm"),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap gap-6 text-sm">
      <div className="rounded-lg bg-slate-100 px-4 py-3 flex items-center gap-3">
        <CalendarIcon dayAbbr={nzTime.dayAbbr} date={nzTime.date} />
        <div>
          <span className="text-slate-500 block">New Zealand time</span>
          <p className="font-mono text-lg font-semibold mt-1">{nzTime.time || "—"}</p>
        </div>
      </div>
      <div className="rounded-lg bg-slate-100 px-4 py-3 flex items-center gap-3">
        <CalendarIcon dayAbbr={pacificTime.dayAbbr} date={pacificTime.date} />
        <div>
          <span className="text-slate-500 block">Pacific time</span>
          <p className="font-mono text-lg font-semibold mt-1">{pacificTime.time || "—"}</p>
        </div>
      </div>
      <div className="rounded-lg bg-slate-100 px-4 py-3 flex items-center gap-3">
        <CalendarIcon dayAbbr={easternTime.dayAbbr} date={easternTime.date} />
        <div>
          <span className="text-slate-500 block">Eastern time</span>
          <p className="font-mono text-lg font-semibold mt-1">{easternTime.time || "—"}</p>
        </div>
      </div>
    </div>
  );
}
