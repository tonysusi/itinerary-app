"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Trip Map using MapLibre GL with vector tiles.
 * Bearing is set to 90° so west is at the top; labels stay upright.
 */

const MAP_HEIGHT = 420;
const MAP_BEARING = 90;
const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

// Ordered stop coordinates [lat, lng] — hybrid list synced to campervan itinerary (Jun 11–21)
const STOPS = [
  { id: "lax-start", coords: [33.9416, -118.4085], label: "LAX" },
  { id: "camarillo", coords: [34.2164, -119.0376], label: "Camarillo, CA" },
  { id: "solvang", coords: [34.5958, -120.1376], label: "Solvang (Lulu troll)" },
  { id: "morro-bay", coords: [35.3658, -120.8499], label: "Morro Bay, CA" },
  { id: "elephant-seals", coords: [35.6590, -121.2010], label: "Elephant Seal Vista Point" },
  { id: "hearst-castle", coords: [35.6439, -121.1893], label: "Hearst Castle, San Simeon" },
  { id: "limekiln", coords: [36.0144, -121.5177], label: "Limekiln State Park, CA" },
  { id: "big-sur", coords: [36.1583, -121.6722], label: "Big Sur (McWay Falls)" },
  { id: "pfeiffer-beach", coords: [36.2381, -121.8158], label: "Pfeiffer Beach, CA" },
  { id: "saddle-mountain", coords: [36.5394, -121.8789], label: "Saddle Mountain Carmel" },
  { id: "carmel", coords: [36.5552, -121.9233], label: "Carmel-by-the-Sea, CA" },
  { id: "seventeen-mile-drive", coords: [36.5698, -121.9650], label: "17-Mile Drive (Lone Cypress)" },
  { id: "monterey", coords: [36.6002, -121.8947], label: "Monterey Bay Aquarium" },
  { id: "mountain-view", coords: [37.3861, -122.0839], label: "Mountain View, CA" },
  { id: "san-francisco", coords: [37.7749, -122.4194], label: "San Francisco, CA" },
  { id: "oracle-park", coords: [37.7786, -122.3893], label: "Oracle Park (van parking)" },
  { id: "fishermans-wharf", coords: [37.8080, -122.4098], label: "Fisherman's Wharf & Pier 39" },
  { id: "chinatown", coords: [37.7909, -122.4054], label: "Chinatown, San Francisco" },
  { id: "golden-gate-bridge", coords: [37.8199, -122.4783], label: "Golden Gate Bridge" },
  { id: "golden-gate-park", coords: [37.7694, -122.5107], label: "Golden Gate Park (Dutch Windmill)" },
  { id: "beach-chalet", coords: [37.7695, -122.5090], label: "Beach Chalet" },
  { id: "bolinas", coords: [37.9094, -122.6864], label: "Bolinas (Hipcamp meadow)" },
  { id: "point-reyes", coords: [38.0227, -122.8850], label: "Point Reyes (Limantour Beach)" },
  { id: "confusion-hill", coords: [39.3320, -123.3670], label: "Confusion Hill" },
  { id: "avenue-of-giants", coords: [40.3340, -123.8730], label: "Avenue of the Giants" },
  { id: "prairie-creek", coords: [41.3636, -124.0235], label: "Prairie Creek (Fern Canyon)" },
  { id: "crescent-city", coords: [41.7558, -124.2026], label: "Crescent City, CA" },
  { id: "jedediah-smith", coords: [41.7861, -124.1286], label: "Jedediah Smith (Stout Grove)" },
  { id: "boardman-corridor", coords: [42.1897, -124.3820], label: "Samuel H. Boardman Scenic Corridor" },
  { id: "bandon", coords: [43.1190, -124.4080], label: "Bandon, OR" },
  { id: "sea-lion-caves", coords: [44.1224, -124.1262], label: "Sea Lion Caves" },
  { id: "beverly-beach", coords: [44.7304, -124.0587], label: "Beverly Beach State Park, OR" },
  { id: "astoria", coords: [46.1879, -123.8313], label: "Astoria (Goonies), OR" },
  { id: "fort-stevens", coords: [46.1650, -123.9610], label: "Fort Stevens (Peter Iredale)" },
  { id: "portland", coords: [45.5152, -122.6784], label: "Portland, OR" },
  { id: "ole-bolle", coords: [45.4547, -122.7628], label: "Ole Bolle troll, Portland" },
  { id: "columbia-gorge", coords: [45.5762, -122.1155], label: "Columbia River Gorge (Multnomah Falls)" },
  { id: "mt-st-helens", coords: [46.2709, -122.2179], label: "Mt St Helens (Johnston Ridge)" },
  { id: "ashford", coords: [46.7584, -122.0301], label: "Ashford, WA" },
  { id: "mt-rainier", coords: [46.7865, -121.7356], label: "Mt Rainier (Paradise)" },
  { id: "tacoma", coords: [47.2529, -122.4443], label: "Tacoma (Museum of Glass)" },
  { id: "mukilteo-ferry", coords: [47.9454, -122.3047], label: "Mukilteo → Whidbey ferry" },
  { id: "whidbey-island", coords: [47.9930, -122.5250], label: "Whidbey Island (Freeland)" },
  { id: "langley", coords: [48.0401, -122.4060], label: "Langley, WA" },
  { id: "boeing-everett", coords: [47.9213, -122.2908], label: "Boeing Factory, Everett" },
  { id: "ballard-frankie", coords: [47.6684, -122.3940], label: "Frankie Feetsplinters troll, Ballard" },
  { id: "fremont-troll", coords: [47.6515, -122.3472], label: "Fremont Troll, Seattle" },
  { id: "seattle", coords: [47.5740, -122.3265], label: "Seattle (campervan drop-off)" },
];

const routeGeoJson = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "LineString",
    coordinates: STOPS.map((stop) => [stop.coords[1], stop.coords[0]]),
  },
};

const stopsGeoJson = {
  type: "FeatureCollection",
  features: STOPS.map((stop, index) => ({
    type: "Feature",
    properties: {
      id: stop.id,
      label: stop.label,
      index: index + 1,
      isEndpoint: index === 0 || index === STOPS.length - 1,
    },
    geometry: {
      type: "Point",
      coordinates: [stop.coords[1], stop.coords[0]],
    },
  })),
};

function MapContent() {
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
          bearing: MAP_BEARING,
          pitch: 0,
          scrollZoom: false,
          attributionControl: false,
        });

        mapRef.current = map;

        map.addControl(
          new maplibregl.AttributionControl({ compact: true }),
          "bottom-left"
        );
        map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "top-right");

        map.on("load", () => {
          if (cancelled) return;

          map.addSource("route", { type: "geojson", data: routeGeoJson });
          map.addLayer({
            id: "route-line",
            type: "line",
            source: "route",
            paint: {
              "line-color": "#3B82F6",
              "line-width": 4,
              "line-opacity": 0.8,
              "line-dasharray": [2, 1.5],
            },
          });

          map.addSource("stops", { type: "geojson", data: stopsGeoJson });
          map.addLayer({
            id: "stops-circles",
            type: "circle",
            source: "stops",
            paint: {
              "circle-color": "#FFFFFF",
              "circle-stroke-color": "#1F2937",
              "circle-stroke-width": [
                "case",
                ["boolean", ["get", "isEndpoint"], false],
                2,
                1.5,
              ],
              "circle-radius": [
                "case",
                ["boolean", ["get", "isEndpoint"], false],
                8,
                5,
              ],
            },
          });

          const bounds = new maplibregl.LngLatBounds();
          STOPS.forEach((stop) => bounds.extend([stop.coords[1], stop.coords[0]]));
          map.fitBounds(bounds, { padding: 48, bearing: MAP_BEARING, maxZoom: 7 });

          const popup = new maplibregl.Popup({
            closeButton: false,
            closeOnClick: false,
            className: "trip-map-popup",
          });

          map.on("mouseenter", "stops-circles", (event) => {
            map.getCanvas().style.cursor = "pointer";
            const feature = event.features?.[0];
            if (!feature) return;

            popup
              .setLngLat(feature.geometry.coordinates)
              .setHTML(`${feature.properties.index}. ${feature.properties.label}`)
              .addTo(map);
          });

          map.on("mouseleave", "stops-circles", () => {
            map.getCanvas().style.cursor = "";
            popup.remove();
          });

          setMapReady(true);
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

  if (mapError) {
    return (
      <div
        className="flex items-center justify-center rounded-2xl bg-stone-100 px-4 text-center"
        style={{ height: `${MAP_HEIGHT}px`, width: "100%" }}
      >
        <p className="text-sm text-slate-500">Map unavailable: {mapError}</p>
      </div>
    );
  }

  return (
    <div className="relative" style={{ height: `${MAP_HEIGHT}px`, width: "100%" }}>
      {!mapReady && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-stone-100">
          <p className="text-slate-500">Loading map...</p>
        </div>
      )}
      <div ref={containerRef} className="h-full w-full rounded-2xl" />
    </div>
  );
}

function Legend() {
  return (
    <div className="absolute bottom-4 right-4 z-[1000] rounded-2xl border border-stone-200 bg-white/95 p-3 shadow-md backdrop-blur">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Route</p>
      <div className="flex items-center gap-2">
        <div
          className="h-0.5 w-6 bg-blue-500"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #3B82F6 0, #3B82F6 6px, transparent 6px, transparent 10px)",
          }}
        />
        <span className="text-xs text-slate-600">LAX → Seattle</span>
      </div>
    </div>
  );
}

export default function TripMap() {
  return (
    <div className="mb-8 rounded-[18px] border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold leading-snug text-slate-950 sm:text-2xl">
          Los Angeles → Seattle
        </h2>
        <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
          Pacific coast campervan route with {STOPS.length} stops
        </p>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
        <MapContent />
        <Legend />
      </div>
    </div>
  );
}
