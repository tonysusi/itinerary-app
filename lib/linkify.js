const PHONE_PATTERN =
  /(?:\+?1[-.\s]?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}\b/g;

const ADDRESS_PATTERN =
  /\d{1,6}\s+(?:[NSEW]\.?\s+)?(?:(?:\d+(?:st|nd|rd|th)|[A-Za-z0-9'.-]+)\s+)*(?:Street|St|Drive|Dr|Road|Rd|Avenue|Ave|Boulevard|Blvd|Lane|Ln|Way|Circle|Cir|Court|Ct|Highway|Hwy|Place|Pl|Parkway|Pkwy|Trail|Terrace|Ter)\.?(?:\s+#\s*\d+[A-Za-z]?)?(?:,\s*[A-Za-z][A-Za-z\s'.-]+)?(?:,\s*[A-Z]{2})?(?:\s+\d{5}(?:-\d{4})?)?/gi;

const NAMED_PLACE_PATTERN =
  /([A-Z0-9][A-Za-z0-9\s'.-]+(?:State Park|RV Park|National Park|Harbor Village|Tree Farm|Christmas Tree Farm|Hipcamp|Belltown Inn|Hotel Zed|Airport Marriott))(?:,\s*([A-Z]{2}))?/g;

function normalizePhone(value) {
  const digits = value.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return digits;
}

function mapsUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query.trim())}`;
}

function collectMatches(text, pattern) {
  const matches = [];
  const regex = new RegExp(pattern.source, pattern.flags);
  let match = regex.exec(text);

  while (match) {
    const value =
      pattern === NAMED_PLACE_PATTERN
        ? `${match[1].trim()}${match[2] ? `, ${match[2]}` : ""}`
        : match[0].trim();
    const start = match.index;
    matches.push({
      start,
      end: start + match[0].length,
      type: pattern === PHONE_PATTERN ? "phone" : "address",
      value,
      raw: value,
    });
    match = regex.exec(text);
  }

  return matches;
}

export function linkifyText(text) {
  if (!text) return [{ type: "text", value: "" }];

  const matches = [
    ...collectMatches(text, PHONE_PATTERN),
    ...collectMatches(text, ADDRESS_PATTERN),
    ...collectMatches(text, NAMED_PLACE_PATTERN),
  ].sort((a, b) => a.start - b.start || b.end - a.end);

  const deduped = [];
  for (const match of matches) {
    const overlaps = deduped.some(
      (existing) => match.start < existing.end && match.end > existing.start
    );
    if (!overlaps) deduped.push(match);
  }

  if (deduped.length === 0) {
    return [{ type: "text", value: text }];
  }

  const segments = [];
  let cursor = 0;

  for (const match of deduped) {
    if (match.start > cursor) {
      segments.push({ type: "text", value: text.slice(cursor, match.start) });
    }

    segments.push({
      type: match.type,
      value: match.value,
      raw: match.raw,
      href:
        match.type === "phone"
          ? `tel:${normalizePhone(match.raw)}`
          : mapsUrl(match.value),
      label:
        match.type === "phone"
          ? `Call ${match.value}`
          : `Open ${match.value} in Maps`,
    });

    cursor = match.end;
  }

  if (cursor < text.length) {
    segments.push({ type: "text", value: text.slice(cursor) });
  }

  return segments;
}
