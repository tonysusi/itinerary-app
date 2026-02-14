const CONDITIONS = [
  { condition: "Sunny", icon: "sun", tempRange: [18, 28] },
  { condition: "Partly cloudy", icon: "cloud-sun", tempRange: [16, 24] },
  { condition: "Cloudy", icon: "cloud", tempRange: [14, 22] },
  { condition: "Light rain", icon: "cloud-rain", tempRange: [12, 20] },
  { condition: "Clear", icon: "moon", tempRange: [10, 18] },
];

/**
 * Generate mock weather for a day (seeded by day index for consistency)
 * @param {number} dayIndex - 0-based day index
 * @returns {{ temp: number, condition: string, icon: string }}
 */
function getMockWeather(dayIndex = 0) {
  const idx = dayIndex % CONDITIONS.length;
  const { condition, icon, tempRange } = CONDITIONS[idx];
  const [min, max] = tempRange;
  const temp = Math.floor(min + Math.random() * (max - min + 1));

  return { temp, condition, icon };
}

/**
 * Get deterministic mock weather (same result for same dayIndex)
 * @param {number} dayIndex - 0-based day index
 * @returns {{ temp: number, condition: string, icon: string }}
 */
function getMockWeatherSeeded(dayIndex = 0) {
  const idx = dayIndex % CONDITIONS.length;
  const { condition, icon, tempRange } = CONDITIONS[idx];
  const seed = dayIndex * 7 + 13;
  const [min, max] = tempRange;
  const temp = min + (seed % (max - min + 1));

  return { temp, condition, icon };
}

module.exports = { getMockWeather, getMockWeatherSeeded };
