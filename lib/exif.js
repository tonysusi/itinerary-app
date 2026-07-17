/**
 * EXIF date parsing helper
 * Converts EXIF date format (2026:06:12 14:35:22) to ISO date (2026-06-12)
 */

export function parseExifDate(exifDate) {
  if (!exifDate) return null;

  // EXIF format: "2026:06:12 14:35:22"
  const datePart = exifDate.split(' ')[0];
  if (!datePart) return null;

  // Convert from "2026:06:12" to "2026-06-12"
  const isoDate = datePart.replace(/:/g, '-');

  // Validate format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    return null;
  }

  return isoDate;
}

/**
 * Formats a date as YYYY-MM-DD
 */
export function formatDateToISO(date) {
  if (!date) return null;

  if (typeof date === 'string') {
    // If already a string, validate it's ISO format
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }
    return null;
  }

  // If it's a Date object
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return null;
}
