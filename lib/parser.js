const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

/**
 * Parse itinerary markdown file into structured JSON
 * @param {string} filePath - Path to itinerary.md (optional)
 * @returns {Object} Parsed itinerary with trip metadata and days array
 */
function parseItinerary(filePath) {
  const defaultPath = path.join(process.cwd(), "content", "itinerary.md");
  const resolvedPath = filePath || defaultPath;

  const fileContent = fs.readFileSync(resolvedPath, "utf-8");
  const { data: frontmatter, content } = matter(fileContent);

  const days = [];
  // Support "## Day N" / "## Day N – date" and "## Thu 11 Jun 2026" (calendar date) formats
  const dayRegex = /^## Day (\d+)(?:\s*[-–]\s*(.+?))?\s*$/gm;
  const dateRegex = /^## (Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+\d{1,2}\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\s*$/gm;
  let matches = [...content.matchAll(dayRegex)];

  if (matches.length === 0) {
    const dateMatches = [...content.matchAll(dateRegex)];
    matches = dateMatches.map((m, i) => {
      const arr = [m[0], (i + 1).toString(), m[0].replace(/^##\s*/, "").trim()];
      arr.index = m.index;
      return arr;
    });
  }

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const nextMatch = matches[i + 1];
    const dayNum = parseInt(match[1], 10);
    const dateLabel = (match[2] || "").trim();
    const start = match.index + match[0].length;
    const end = nextMatch ? nextMatch.index : content.length;

    const dayContent = content.slice(start, end).trim();
    const {
      activity,
      flight,
      accommodation,
      location,
      activityItems,
      flightItems,
      accommodationItems,
    } = parseDayContent(dayContent);

    days.push({
      day: dayNum,
      dateLabel,
      activity: activity || "",
      flight: flight || "",
      accommodation: accommodation || "",
      location: location || "",
      activityItems,
      flightItems,
      accommodationItems,
    });
  }

  return {
    trip: frontmatter.trip || "My Trip",
    destination: frontmatter.destination || "",
    destinationTimezone: frontmatter.destinationTimezone || "UTC",
    cities: frontmatter.cities || [],
    startDate: frontmatter.startDate || "",
    days,
  };
}

/**
 * Extract activity, flight, accommodation, location from day content
 * Supports both list format (- **X:** value) and inline format (**X:** value)
 */
function parseDayContent(content) {
  const fields = {
    activity: [],
    flight: [],
    accommodation: [],
    location: [],
  };
  const keyMap = {
    Activity: "activity",
    Flight: "flight",
    Accommodation: "accommodation",
    Location: "location",
  };
  let currentKey = null;

  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    const fieldMatch = trimmed.match(/^-\s+\*\*(Activity|Flight|Accommodation|Location):\*\*\s*(.*)$/);

    if (fieldMatch) {
      currentKey = keyMap[fieldMatch[1]];
      if (fieldMatch[2]) {
        fields[currentKey].push(fieldMatch[2].trim());
      }
      return;
    }

    if (currentKey) {
      fields[currentKey].push(trimmed.replace(/^-\s+/, "").trim());
    }
  });

  return {
    activity: fields.activity.join("\n").trim(),
    flight: fields.flight.join("\n").trim(),
    accommodation: fields.accommodation.join("\n").trim(),
    location: fields.location.join("\n").trim(),
    activityItems: fields.activity,
    flightItems: fields.flight,
    accommodationItems: fields.accommodation,
  };
}

module.exports = { parseItinerary };
