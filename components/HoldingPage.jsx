"use client";

import { useEffect, useRef, useState } from "react";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";
const NZ_CENTER = [174.0, -41.2];
const NZ_ZOOM = 5;

export default function HoldingPage() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;

    (async () => {
      try {
        const maplibregl = (await import("maplibre-gl")).default;
        await import("maplibre-gl/dist/maplibre-gl.css");

        if (cancelled || !containerRef.current) return;

        const map = new maplibregl.Map({
          container: containerRef.current,
          style: MAP_STYLE,
          center: NZ_CENTER,
          zoom: NZ_ZOOM,
          bearing: 0,
          pitch: 0,
          interactive: false,
          attributionControl: false,
        });

        mapRef.current = map;

        map.addControl(
          new maplibregl.AttributionControl({ compact: true }),
          "bottom-left"
        );

        map.on("load", () => {
          if (!cancelled) setMapReady(true);
        });

        map.on("error", (event) => {
          if (event?.error?.message) {
            setMapError(event.error.message);
          }
        });
      } catch (error) {
        if (!cancelled) {
          setMapError(error instanceof Error ? error.message : "Failed to load map");
        }
      }
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        {mapError ? (
          <div className="flex h-full items-center justify-center bg-stone-100 px-4 text-center">
            <p className="text-sm text-slate-500">Map unavailable: {mapError}</p>
          </div>
        ) : (
          <>
            {!mapReady && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-stone-100">
                <p className="text-slate-500">Loading map...</p>
              </div>
            )}
            <div ref={containerRef} className="h-full w-full" />
          </>
        )}
      </div>

      <div className="relative z-20 flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md rounded-[18px] border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
          <h1 className="text-center text-xl font-bold leading-snug text-slate-950 sm:text-2xl">
            Planning the next trip
          </h1>
        </div>
      </div>
    </main>
  );
}
