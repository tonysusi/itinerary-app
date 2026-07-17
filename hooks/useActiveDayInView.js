"use client";

import { useEffect, useRef, useState } from "react";

const STICKY_HEADER_OFFSET = 56;

export function useActiveDayInView(days) {
  const sectionRef = useRef(null);
  const dayRefs = useRef({});
  const [activeDay, setActiveDay] = useState(null);
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    if (!days.length) return;

    const updateActiveDay = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionRect = section.getBoundingClientRect();
      const inDayList =
        sectionRect.top <= STICKY_HEADER_OFFSET && sectionRect.bottom > STICKY_HEADER_OFFSET;
      setStickyVisible(inDayList);

      let current = days[0];
      for (const day of days) {
        const element = dayRefs.current[day.day];
        if (!element) continue;
        if (element.getBoundingClientRect().top <= STICKY_HEADER_OFFSET + 12) {
          current = day;
        }
      }
      setActiveDay(current);
    };

    updateActiveDay();
    window.addEventListener("scroll", updateActiveDay, { passive: true });
    window.addEventListener("resize", updateActiveDay);

    return () => {
      window.removeEventListener("scroll", updateActiveDay);
      window.removeEventListener("resize", updateActiveDay);
    };
  }, [days]);

  const registerDayRef = (dayNumber, element) => {
    if (element) dayRefs.current[dayNumber] = element;
    else delete dayRefs.current[dayNumber];
  };

  return { sectionRef, registerDayRef, activeDay, stickyVisible };
}
