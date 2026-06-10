/**
 * Instagram Photos API endpoint using Apify
 * Fetches Instagram photos by location and date using Apify's Instagram Scraper
 */

import { ApifyClient } from "apify-client";

export async function POST(request) {
  try {
    const { location, date } = await request.json();

    if (!location || !date) {
      return Response.json({ error: "Missing location or date" }, { status: 400 });
    }

    const apifyToken = process.env.APIFY_API_TOKEN;
    if (!apifyToken) {
      console.error("APIFY_API_TOKEN not configured");
      return Response.json({ error: "Instagram service not configured" }, { status: 500 });
    }

    const client = new ApifyClient({ token: apifyToken });

    // Parse date from format "Mon 1 Jan 2026" to get year
    const dateMatch = date.match(/\b(\d{4})\b/);
    const year = dateMatch ? parseInt(dateMatch[1]) : new Date().getFullYear();

    // Fetch posts from @tonysusi with location filter
    const run = await client.actor("apify/instagram-post-scraper").call({
      usernames: ["tonysusi"],
      resultsLimit: 100,
      resultsType: "posts",
      searchType: "location",
      searchTerm: location,
    });

    // Get results from the default dataset
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    // Filter photos to match the trip date (within ±1 day for flexibility)
    const dateObj = new Date(`${date} ${year}`);
    const dayBefore = new Date(dateObj);
    dayBefore.setDate(dayBefore.getDate() - 1);
    const dayAfter = new Date(dateObj);
    dayAfter.setDate(dayAfter.getDate() + 1);

    const filteredPhotos = items
      .filter((item) => {
        if (!item.timestamp) return false;
        const itemDate = new Date(item.timestamp);
        return itemDate >= dayBefore && itemDate <= dayAfter;
      })
      .map((item) => ({
        id: item.id,
        url: item.displayUrl || item.thumbnail,
        caption: item.caption || "",
        timestamp: item.timestamp,
        link: item.url,
      }))
      .slice(0, 10); // Limit to 10 photos per location

    return Response.json({ photos: filteredPhotos });
  } catch (error) {
    console.error("Instagram API error:", error);
    return Response.json({ error: "Failed to fetch photos" }, { status: 500 });
  }
}
