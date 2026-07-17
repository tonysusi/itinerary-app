const MONTH_INDEX = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

export function parseDateLabel(dateLabel) {
  if (!dateLabel) return null;
  const match = dateLabel.match(
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i
  );
  if (!match) return null;
  return {
    dayAbbr: match[1],
    date: parseInt(match[2], 10),
    month: match[3].charAt(0).toUpperCase() + match[3].slice(1).toLowerCase(),
  };
}

/**
 * Convert dateLabel (e.g., "Thu 11 Jun 2026") to ISO date format (2026-06-11)
 * Used for matching photos to itinerary days
 */
export function dateLabelToISO(dateLabel) {
  if (!dateLabel) return null;

  const match = dateLabel.match(
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})/i
  );
  if (!match) return null;

  const monthKey = match[3].charAt(0).toUpperCase() + match[3].slice(1).toLowerCase();
  const month = MONTH_INDEX[monthKey];
  if (month === undefined) return null;

  const year = parseInt(match[4], 10);
  const day = String(parseInt(match[2], 10)).padStart(2, '0');
  const monthPadded = String(month + 1).padStart(2, '0');

  return `${year}-${monthPadded}-${day}`;
}

export function isCurrentDay(dateLabel) {
  const match = dateLabel?.match(
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})/i
  );
  if (!match) return false;

  const monthKey = match[3].charAt(0).toUpperCase() + match[3].slice(1).toLowerCase();
  const month = MONTH_INDEX[monthKey];
  if (month === undefined) return false;

  const dayDate = new Date(parseInt(match[4], 10), month, parseInt(match[2], 10));
  const today = new Date();

  return (
    dayDate.getFullYear() === today.getFullYear() &&
    dayDate.getMonth() === today.getMonth() &&
    dayDate.getDate() === today.getDate()
  );
}

export function formatStickyDateLabel(dateLabel) {
  if (!dateLabel) return "";
  return dateLabel.replace(/\s+\d{4}$/, "");
}

export function extractLocationsFromDay(locationText) {
  if (!locationText) return [];
  return locationText
    .split("→")
    .map((loc) => loc.trim())
    .filter(Boolean);
}
