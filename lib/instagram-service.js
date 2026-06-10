/**
 * Instagram photo fetching service
 * Abstracts Instagram API integration (currently using Apify, can be swapped for Graph API or custom scraper)
 * Includes caching to minimize API calls and costs
 */

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
let photoCache = {};

export async function fetchInstagramPhotosByLocation(location, date) {
  if (!location) return [];

  const cacheKey = `${location}-${date}`;

  // Check cache
  if (photoCache[cacheKey] && Date.now() - photoCache[cacheKey].timestamp < CACHE_DURATION) {
    console.log(`[Instagram Cache] Hit for ${location} on ${date}`);
    return photoCache[cacheKey].data;
  }

  try {
    console.log(`[Instagram] Fetching photos for ${location} on ${date}`);
    // Call backend API endpoint to fetch photos
    const response = await fetch("/api/instagram-photos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location, date }),
    });

    if (!response.ok) {
      console.warn(`[Instagram] Failed to fetch (${response.status}): ${location}`);
      return [];
    }

    const data = await response.json();
    const photos = data.photos || [];

    console.log(`[Instagram] Found ${photos.length} photos for ${location}`);

    // Cache the results
    photoCache[cacheKey] = {
      data: photos,
      timestamp: Date.now(),
    };

    return photos;
  } catch (error) {
    console.error("[Instagram] Service error:", error);
    return [];
  }
}

export function clearPhotoCache() {
  console.log("[Instagram] Clearing cache");
  photoCache = {};
}

