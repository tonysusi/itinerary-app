/**
 * FIFA World Cup 2026 match schedule
 * Times in ET (Eastern Time)
 * Source: Official FIFA/FOX Sports schedule
 */

// Key: "DD MMM" (e.g. "11 Jun") - matches dateLabel format from itinerary
const SCHEDULE = {
  "11 Jun": [
    { time: "3:00 PM ET", match: "Mexico vs South Africa", venue: "Mexico City" },
    { time: "10:00 PM ET", match: "South Korea vs UEFA playoff D", venue: "Guadalajara, Mexico" },
  ],
  "12 Jun": [
    { time: "3:00 PM ET", match: "Canada vs UEFA playoff A", venue: "Toronto" },
    { time: "9:00 PM ET", match: "USA vs Paraguay", venue: "Los Angeles" },
  ],
  "13 Jun": [
    { time: "12:00 AM ET", match: "Australia vs UEFA playoff C", venue: "Vancouver" },
    { time: "3:00 PM ET", match: "Qatar vs Switzerland", venue: "San Francisco Bay" },
    { time: "6:00 PM ET", match: "Brazil vs Morocco", venue: "New York/New Jersey" },
    { time: "9:00 PM ET", match: "Haiti vs Scotland", venue: "Boston" },
  ],
  "14 Jun": [
    { time: "1:00 PM ET", match: "Germany vs Curaçao", venue: "Houston" },
    { time: "4:00 PM ET", match: "Netherlands vs Japan", venue: "Dallas" },
    { time: "7:00 PM ET", match: "Ivory Coast vs Ecuador", venue: "Philadelphia" },
    { time: "10:00 PM ET", match: "Tunisia vs UEFA playoff B", venue: "Monterrey, Mexico" },
  ],
  "15 Jun": [
    { time: "12:00 PM ET", match: "Spain vs Cape Verde", venue: "Atlanta" },
    { time: "3:00 PM ET", match: "Belgium vs Egypt", venue: "Seattle" },
    { time: "6:00 PM ET", match: "Saudi Arabia vs Uruguay", venue: "Miami" },
    { time: "9:00 PM ET", match: "Iran vs New Zealand", venue: "Los Angeles" },
  ],
  "16 Jun": [
    { time: "12:00 AM ET", match: "Austria vs Jordan", venue: "San Francisco Bay" },
    { time: "3:00 PM ET", match: "France vs Senegal", venue: "New York/New Jersey" },
    { time: "6:00 PM ET", match: "Norway vs FIFA playoff 2", venue: "Boston" },
    { time: "9:00 PM ET", match: "Argentina vs Algeria", venue: "Kansas City" },
  ],
  "17 Jun": [
    { time: "1:00 PM ET", match: "Portugal vs FIFA playoff 1", venue: "Houston" },
    { time: "4:00 PM ET", match: "England vs Croatia", venue: "Dallas" },
    { time: "7:00 PM ET", match: "Ghana vs Panama", venue: "Toronto" },
    { time: "10:00 PM ET", match: "Uzbekistan vs Colombia", venue: "Mexico City" },
  ],
  "18 Jun": [
    { time: "12:00 PM ET", match: "South Africa vs UEFA playoff D", venue: "Atlanta" },
    { time: "3:00 PM ET", match: "Switzerland vs UEFA playoff A", venue: "Los Angeles" },
    { time: "6:00 PM ET", match: "Canada vs Qatar", venue: "Vancouver" },
    { time: "9:00 PM ET", match: "Mexico vs South Korea", venue: "Guadalajara, Mexico" },
  ],
  "19 Jun": [
    { time: "12:00 AM ET", match: "Paraguay vs UEFA playoff C", venue: "San Francisco Bay" },
    { time: "3:00 PM ET", match: "USA vs Australia", venue: "Seattle" },
    { time: "3:00 PM ET", match: "Scotland vs Morocco", venue: "Boston" },
    { time: "9:00 PM ET", match: "Brazil vs Haiti", venue: "Philadelphia" },
  ],
  "20 Jun": [
    { time: "12:00 AM ET", match: "Tunisia vs Japan", venue: "Monterrey, Mexico" },
    { time: "1:00 PM ET", match: "Netherlands vs UEFA playoff B", venue: "Houston" },
    { time: "4:00 PM ET", match: "Germany vs Ivory Coast", venue: "Toronto" },
    { time: "8:00 PM ET", match: "Ecuador vs Curaçao", venue: "Kansas City" },
  ],
  "21 Jun": [
    { time: "12:00 PM ET", match: "Spain vs Saudi Arabia", venue: "Atlanta" },
    { time: "3:00 PM ET", match: "Belgium vs Iran", venue: "Los Angeles" },
    { time: "6:00 PM ET", match: "Uruguay vs Cape Verde", venue: "Miami" },
    { time: "9:00 PM ET", match: "New Zealand vs Egypt", venue: "Vancouver" },
  ],
  "22 Jun": [
    { time: "1:00 PM ET", match: "Argentina vs Austria", venue: "Dallas" },
    { time: "5:00 PM ET", match: "France vs FIFA playoff 2", venue: "Philadelphia" },
    { time: "8:00 PM ET", match: "Norway vs Senegal", venue: "New York/New Jersey" },
    { time: "11:00 PM ET", match: "Jordan vs Algeria", venue: "San Francisco Bay" },
  ],
  "23 Jun": [
    { time: "1:00 PM ET", match: "Portugal vs Uzbekistan", venue: "Houston" },
    { time: "4:00 PM ET", match: "England vs Ghana", venue: "Boston" },
    { time: "7:00 PM ET", match: "Panama vs Croatia", venue: "Toronto" },
    { time: "10:00 PM ET", match: "Colombia vs FIFA playoff 1", venue: "Guadalajara, Mexico" },
  ],
  "24 Jun": [
    { time: "3:00 PM ET", match: "Canada vs Switzerland", venue: "Vancouver" },
    { time: "3:00 PM ET", match: "Qatar vs UEFA playoff A", venue: "Seattle" },
    { time: "6:00 PM ET", match: "Scotland vs Brazil", venue: "Miami" },
    { time: "6:00 PM ET", match: "Morocco vs Haiti", venue: "Atlanta" },
    { time: "9:00 PM ET", match: "Mexico vs UEFA playoff D", venue: "Mexico City" },
    { time: "9:00 PM ET", match: "South Korea vs South Africa", venue: "Monterrey, Mexico" },
  ],
  "25 Jun": [
    { time: "4:00 PM ET", match: "Ecuador vs Germany", venue: "New York/New Jersey" },
    { time: "4:00 PM ET", match: "Curaçao vs Ivory Coast", venue: "Philadelphia" },
    { time: "7:00 PM ET", match: "Tunisia vs Netherlands", venue: "Kansas City" },
    { time: "7:00 PM ET", match: "Japan vs UEFA playoff B", venue: "Dallas" },
    { time: "10:00 PM ET", match: "USA vs UEFA playoff C", venue: "Los Angeles" },
    { time: "10:00 PM ET", match: "Paraguay vs Australia", venue: "San Francisco Bay" },
  ],
  "26 Jun": [
    { time: "3:00 PM ET", match: "Norway vs France", venue: "Boston" },
    { time: "3:00 PM ET", match: "Senegal vs FIFA playoff 2", venue: "Toronto" },
    { time: "8:00 PM ET", match: "Uruguay vs Spain", venue: "Guadalajara, Mexico" },
    { time: "8:00 PM ET", match: "Cape Verde vs Saudi Arabia", venue: "Houston" },
    { time: "11:00 PM ET", match: "New Zealand vs Belgium", venue: "Vancouver" },
    { time: "11:00 PM ET", match: "Egypt vs Iran", venue: "Seattle" },
  ],
  "27 Jun": [
    { time: "5:00 PM ET", match: "Panama vs England", venue: "New York/New Jersey" },
    { time: "5:00 PM ET", match: "Croatia vs Ghana", venue: "Philadelphia" },
    { time: "7:30 PM ET", match: "Colombia vs Portugal", venue: "Miami" },
    { time: "7:30 PM ET", match: "Uzbekistan vs FIFA playoff 1", venue: "Atlanta" },
    { time: "10:00 PM ET", match: "Jordan vs Argentina", venue: "Dallas" },
    { time: "10:00 PM ET", match: "Algeria vs Austria", venue: "Kansas City" },
  ],
  "28 Jun": [
    { time: "3:00 PM ET", match: "Round of 32: Group A 2nd vs Group B 2nd", venue: "Los Angeles" },
  ],
  "29 Jun": [
    { time: "1:00 PM ET", match: "Round of 32: Group C Winner vs Group F 2nd", venue: "Houston" },
    { time: "4:30 PM ET", match: "Round of 32: Group E Winner vs Third Place", venue: "Boston" },
    { time: "9:00 PM ET", match: "Round of 32: Group F Winner vs Group C 2nd", venue: "Monterrey, Mexico" },
  ],
  "30 Jun": [
    { time: "1:00 PM ET", match: "Round of 32: Group E 2nd vs Group I 2nd", venue: "Dallas" },
    { time: "5:00 PM ET", match: "Round of 32: Group I Winner vs Third Place", venue: "New York/New Jersey" },
    { time: "9:00 PM ET", match: "Round of 32: Group A Winner vs Third Place", venue: "Mexico City" },
  ],
  "01 Jul": [
    { time: "12:00 PM ET", match: "Round of 32: Group L Winner vs Third Place", venue: "Atlanta" },
    { time: "4:00 PM ET", match: "Round of 32: Group G Winner vs Third Place", venue: "Seattle" },
    { time: "8:00 PM ET", match: "Round of 32: Group D Winner vs Third Place", venue: "San Francisco Bay" },
  ],
  "02 Jul": [
    { time: "3:00 PM ET", match: "Round of 32: Group H Winner vs Group J 2nd", venue: "Los Angeles" },
    { time: "7:00 PM ET", match: "Round of 32: Group K 2nd vs Group L 2nd", venue: "Toronto" },
    { time: "11:00 PM ET", match: "Round of 32: Group B Winner vs Third Place", venue: "Vancouver" },
  ],
  "03 Jul": [
    { time: "2:00 PM ET", match: "Round of 32: Group D 2nd vs Group G 2nd", venue: "Dallas" },
    { time: "6:00 PM ET", match: "Round of 32: Group J Winner vs Group H 2nd", venue: "Miami" },
    { time: "9:30 PM ET", match: "Round of 32: Group K Winner vs Third Place", venue: "Kansas City" },
  ],
  "04 Jul": [
    { time: "1:00 PM ET", match: "Round of 16: TBD vs TBD", venue: "Houston" },
    { time: "5:00 PM ET", match: "Round of 16: TBD vs TBD", venue: "Philadelphia" },
  ],
  "05 Jul": [
    { time: "4:00 PM ET", match: "Round of 16: TBD vs TBD", venue: "New York/New Jersey" },
    { time: "8:00 PM ET", match: "Round of 16: TBD vs TBD", venue: "Mexico City" },
  ],
  "06 Jul": [
    { time: "3:00 PM ET", match: "Round of 16: TBD vs TBD", venue: "Dallas" },
    { time: "8:00 PM ET", match: "Round of 16: TBD vs TBD", venue: "Seattle" },
  ],
  "07 Jul": [
    { time: "12:00 PM ET", match: "Round of 16: TBD vs TBD", venue: "Atlanta" },
    { time: "4:00 PM ET", match: "Round of 16: TBD vs TBD", venue: "Vancouver" },
  ],
  "09 Jul": [
    { time: "4:00 PM ET", match: "Quarterfinal: TBD vs TBD", venue: "Boston" },
  ],
  "10 Jul": [
    { time: "3:00 PM ET", match: "Quarterfinal: TBD vs TBD", venue: "Los Angeles" },
  ],
  "11 Jul": [
    { time: "5:00 PM ET", match: "Quarterfinal: TBD vs TBD", venue: "Miami" },
    { time: "9:00 PM ET", match: "Quarterfinal: TBD vs TBD", venue: "Kansas City" },
  ],
  "14 Jul": [
    { time: "3:00 PM ET", match: "Semifinal: TBD vs TBD", venue: "Dallas" },
  ],
  "15 Jul": [
    { time: "3:00 PM ET", match: "Semifinal: TBD vs TBD", venue: "Atlanta" },
  ],
  "18 Jul": [
    { time: "5:00 PM ET", match: "Third-place match: TBD vs TBD", venue: "Miami" },
  ],
  "19 Jul": [
    { time: "3:00 PM ET", match: "World Cup Final: TBD vs TBD", venue: "New York/New Jersey" },
  ],
};

/**
 * Get World Cup games for a given date
 * @param {string} dateLabel - e.g. "Thu 11 Jun 2026"
 * @returns {Array} Array of { time, match, venue }
 */
export function getGamesForDate(dateLabel) {
  if (!dateLabel) return [];
  const match = dateLabel.match(/(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/);
  if (!match) return [];
  const key = `${match[1].padStart(2, "0")} ${match[2]}`;
  return SCHEDULE[key] || [];
}
