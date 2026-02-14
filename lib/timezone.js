const { DateTime } = require("luxon");

/**
 * Get current local time (user's browser/system timezone)
 * @returns {string} Formatted local time
 */
function getLocalTime() {
  return DateTime.now().toFormat("HH:mm:ss");
}

/**
 * Get current time in destination timezone
 * @param {string} timezone - IANA timezone (e.g. "Europe/Paris")
 * @returns {string} Formatted destination time
 */
function getDestinationTime(timezone) {
  return DateTime.now().setZone(timezone).toFormat("HH:mm:ss");
}

/**
 * Get both local and destination times
 * @param {string} destinationTimezone - IANA timezone
 * @returns {{ local: string, destination: string }}
 */
function getTimes(destinationTimezone) {
  return {
    local: getLocalTime(),
    destination: getDestinationTime(destinationTimezone || "UTC"),
  };
}

module.exports = { getLocalTime, getDestinationTime, getTimes };
