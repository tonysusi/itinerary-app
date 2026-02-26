import { parseItinerary } from "@/lib/parser";
import { getMockWeatherSeeded } from "@/lib/weather";
import { getGamesForDate } from "@/lib/worldcup-schedule";

export async function GET() {
  try {
    const itinerary = parseItinerary();

    const daysWithWeather = itinerary.days.map((day, index) => ({
      ...day,
      weather: getMockWeatherSeeded(index),
      games: getGamesForDate(day.dateLabel),
    }));

    return Response.json({
      ...itinerary,
      days: daysWithWeather,
    });
  } catch (error) {
    console.error("Error parsing itinerary:", error);
    return Response.json(
      { error: "Failed to load itinerary" },
      { status: 500 }
    );
  }
}
