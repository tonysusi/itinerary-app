/**
 * Country name to three-letter abbreviation (FIFA-style)
 * Covers all FIFA World Cup 2026 participating nations
 */
const COUNTRY_CODES = {
  Algeria: "ALG",
  Argentina: "ARG",
  Australia: "AUS",
  Austria: "AUT",
  Belgium: "BEL",
  Brazil: "BRA",
  Canada: "CAN",
  "Cape Verde": "CPV",
  Colombia: "COL",
  Croatia: "CRO",
  Curaçao: "CUW",
  "Ivory Coast": "CIV",
  Ecuador: "ECU",
  Egypt: "EGY",
  England: "ENG",
  France: "FRA",
  Germany: "GER",
  Ghana: "GHA",
  Haiti: "HAI",
  Iran: "IRN",
  Japan: "JPN",
  Jordan: "JOR",
  Mexico: "MEX",
  Morocco: "MAR",
  Netherlands: "NED",
  "New Zealand": "NZL",
  Norway: "NOR",
  Panama: "PAN",
  Paraguay: "PAR",
  Portugal: "POR",
  Qatar: "QAT",
  "Saudi Arabia": "KSA",
  Scotland: "SCO",
  Senegal: "SEN",
  Spain: "ESP",
  Switzerland: "SUI",
  Tunisia: "TUN",
  Uruguay: "URU",
  USA: "USA",
  "United States": "USA",
  Uzbekistan: "UZB",
  "South Africa": "RSA",
  "South Korea": "KOR",
};

/**
 * Format a match string, replacing country names with three-letter abbreviations where possible
 * e.g. "Mexico vs South Africa" -> "MEX vs RSA"
 * e.g. "USA vs Paraguay" -> "USA vs PAR"
 * Playoff winners and TBD remain as text
 */
export function formatMatchWithFlags(matchStr) {
  if (!matchStr) return "";

  // Handle " vs " separator
  const parts = matchStr.split(" vs ");
  if (parts.length !== 2) return matchStr;

  const [team1, team2] = parts.map((t) => t.trim());

  const getAbbr = (name) => COUNTRY_CODES[name] || null;

  const abbr1 = getAbbr(team1);
  const abbr2 = getAbbr(team2);

  const display1 = abbr1 ? abbr1 : team1;
  const display2 = abbr2 ? abbr2 : team2;

  return `${display1} vs ${display2}`;
}
