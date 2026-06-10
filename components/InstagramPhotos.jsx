"use client";

import { useEffect, useState } from "react";
import { fetchInstagramPhotosByLocation } from "@/lib/instagram-service";

export default function InstagramPhotos({ locations, dateLabel }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!locations || locations.length === 0) {
      setLoading(false);
      return;
    }

    async function loadPhotos() {
      setLoading(true);
      const allPhotos = [];

      for (const location of locations) {
        const locationPhotos = await fetchInstagramPhotosByLocation(location, dateLabel);
        allPhotos.push(...locationPhotos);
      }

      setPhotos(allPhotos);
      setLoading(false);
    }

    loadPhotos();
  }, [locations, dateLabel]);

  // Hide entirely if no photos (per user preference)
  if (!loading && photos.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 border-t border-stone-200 pt-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Instagram from @tonysusi
      </h3>

      {loading ? (
        <div className="flex h-32 items-center justify-center rounded-lg bg-stone-50">
          <p className="text-sm text-slate-400">Loading photos...</p>
        </div>
      ) : (
        <div className="flex gap-2 overflow-x-auto pb-2 sm:snap-x sm:snap-mandatory">
          {photos.map((photo, index) => (
            <a
              key={`${photo.id}-${index}`}
              href={photo.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 snap-start overflow-hidden rounded-lg border border-stone-200 transition hover:shadow-md"
            >
              <img
                src={photo.url}
                alt={photo.caption || "Instagram photo"}
                className="h-32 w-32 object-cover sm:h-40 sm:w-40"
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
