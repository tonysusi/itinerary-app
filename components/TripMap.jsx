"use client";

import { useEffect, useState } from "react";

/**
 * Trip Map Component using OpenStreetMap via Leaflet
 * Shows routes:
 * 1. Road/ferry route: LAX to Vancouver (via coast and Victoria)
 * 2. Flight: Vancouver to Toronto to Boston
 * 3. Flight: Boston to LAX
 */

// Ordered stop coordinates [lat, lng]
const STOPS = [
  { id: "lax-start", coords: [33.9416, -118.4085], label: "LAX" },
  { id: "camarillo", coords: [34.2164, -119.0376], label: "Camarillo, CA" },
  { id: "morro-bay", coords: [35.3658, -120.8499], label: "Morro Bay, CA" },
  { id: "san-simeon", coords: [35.6439, -121.1893], label: "San Simeon, CA" },
  { id: "limekiln", coords: [36.0144, -121.5177], label: "Limekiln State Park, CA" },
  { id: "pfeiffer-beach", coords: [36.2381, -121.8158], label: "Pfeiffer Beach, CA" },
  { id: "carmel", coords: [36.5552, -121.9233], label: "Carmel-by-the-Sea, CA" },
  { id: "saddle-mountain", coords: [36.5394, -121.8789], label: "Saddle Mountain, Carmel-by-the-Sea, CA" },
  { id: "monterey", coords: [36.6002, -121.8947], label: "Monterey, CA" },
  { id: "mountain-view", coords: [37.3861, -122.0839], label: "Mountain View, CA" },
  { id: "san-francisco", coords: [37.7749, -122.4194], label: "San Francisco, CA" },
  { id: "bolinas", coords: [37.9094, -122.6864], label: "Bolinas, CA" },
  { id: "point-reyes", coords: [38.0834, -122.8350], label: "Point Reyes National Seashore, CA" },
  { id: "prairie-creek", coords: [41.3636, -124.0235], label: "Prairie Creek Redwoods, CA" },
  { id: "crescent-city", coords: [41.7558, -124.2026], label: "Crescent City, CA" },
  { id: "gold-hill", coords: [42.4318, -123.0506], label: "Gold Hill, OR" },
  { id: "reedsport", coords: [43.3286, -124.1112], label: "Reedsport, OR" },
  { id: "newport", coords: [44.6368, -124.0535], label: "Newport, OR" },
  { id: "beverly-beach", coords: [44.7304, -124.0587], label: "Beverly Beach, OR" },
  { id: "cannon-beach", coords: [45.8918, -123.9615], label: "Cannon Beach, OR" },
  { id: "astoria", coords: [46.1879, -123.8313], label: "Astoria, OR" },
  { id: "portland", coords: [45.5152, -122.6784], label: "Portland, OR" },
  { id: "boring", coords: [45.4301, -122.3745], label: "Boring, OR" },
  { id: "seattle", coords: [47.6062, -122.3321], label: "Seattle, WA" },
  { id: "victoria", coords: [48.4284, -123.3656], label: "Victoria, BC" },
  { id: "vancouver", coords: [49.2827, -123.1207], label: "Vancouver, BC" },
  { id: "toronto", coords: [43.6532, -79.3832], label: "Toronto, ON" },
  { id: "boston", coords: [42.3601, -71.0589], label: "Boston, MA" },
  { id: "lax-return", coords: [33.9416, -118.4085], label: "LAX" },
];

// Map bounds to show full USA/Canada
const MAP_BOUNDS = [
  [25, -130], // Southwest
  [55, -60],  // Northeast
];

const MAP_CENTER = [40, -98];

function MapContent() {
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [L, setL] = useState(null);
  const [ReactLeaflet, setReactLeaflet] = useState(null);

  useEffect(() => {
    // Dynamically import Leaflet and react-leaflet on client side
    Promise.all([
      import("leaflet"),
      import("react-leaflet"),
      import("leaflet/dist/leaflet.css"),
    ]).then(([leaflet, reactLeaflet]) => {
      setL(leaflet.default);
      setReactLeaflet(reactLeaflet);
      setLeafletLoaded(true);
    });
  }, []);

  if (!leafletLoaded || !L || !ReactLeaflet) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-2xl bg-stone-100">
        <p className="text-slate-500">Loading map...</p>
      </div>
    );
  }

  const { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip } = ReactLeaflet;

  const stopsById = Object.fromEntries(STOPS.map((stop) => [stop.id, stop]));

  // Road/ferry route coordinates (LAX → Vancouver via coast and Victoria)
  const coastalRoute = STOPS.slice(0, 25).map((stop) => stop.coords);

  // Generate smooth arc points between two coordinates
  const generateArc = (start, end, numPoints = 20, arcHeight = 0.15) => {
    const points = [];
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      const lat = start[0] + (end[0] - start[0]) * t;
      const lng = start[1] + (end[1] - start[1]) * t;
      // Add arc using sine curve - peaks at midpoint
      const arcOffset = Math.sin(t * Math.PI) * arcHeight * Math.abs(end[1] - start[1]);
      points.push([lat + arcOffset, lng]);
    }
    return points;
  };

  // Flight route Vancouver → Toronto → Boston with smooth arcs
  const flightVancouverBoston = [
    ...generateArc(stopsById.vancouver.coords, stopsById.toronto.coords, 25, 0.12),
    ...generateArc(stopsById.toronto.coords, stopsById.boston.coords, 15, 0.08),
  ];

  const flightBostonLax = generateArc(stopsById.boston.coords, stopsById["lax-return"].coords, 30, 0.10);

  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={4}
      style={{ height: "420px", width: "100%" }}
      scrollWheelZoom={false}
      className="z-0 rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Road/ferry route - LAX to Vancouver (blue dashed) */}
      <Polyline
        positions={coastalRoute}
        pathOptions={{
          color: "#3B82F6",
          weight: 4,
          dashArray: "10, 6",
          opacity: 0.8,
        }}
      />

      {/* Flight route - Vancouver to Boston via Toronto (green) */}
      <Polyline
        positions={flightVancouverBoston}
        pathOptions={{
          color: "#10B981",
          weight: 3,
          opacity: 0.8,
        }}
      />

      {/* Flight route - Boston to LAX (orange) */}
      <Polyline
        positions={flightBostonLax}
        pathOptions={{
          color: "#F59E0B",
          weight: 3,
          opacity: 0.8,
        }}
      />

      {/* Stop markers */}
      {STOPS.slice(0, -1).map((stop, index) => (
        <CircleMarker
          key={stop.id}
          center={stop.coords}
          radius={index === 0 ? 8 : 5}
          pathOptions={{
            color: "#1F2937",
            weight: index === 0 ? 2 : 1.5,
            fillColor: "white",
            fillOpacity: 1,
          }}
        >
          <Tooltip direction="top" offset={[0, -10]} className="city-label">
            {index + 1}. {stop.label}
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

function Legend() {
  return (
    <div className="absolute bottom-4 right-4 z-[1000] rounded-2xl border border-stone-200 bg-white/95 p-3 shadow-md backdrop-blur">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Routes</p>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-6 bg-blue-500" style={{ backgroundImage: "repeating-linear-gradient(90deg, #3B82F6 0, #3B82F6 6px, transparent 6px, transparent 10px)" }}></div>
          <span className="text-xs text-slate-600">LAX → Vancouver</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-6 bg-emerald-500"></div>
          <span className="text-xs text-slate-600">VAN → YYZ → BOS</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-6 bg-amber-500"></div>
          <span className="text-xs text-slate-600">BOS → LAX (return)</span>
        </div>
      </div>
    </div>
  );
}

export default function TripMap() {
  return (
    <div className="mb-8 rounded-[18px] border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-16 w-20 shrink-0 flex-col items-center justify-center rounded-lg bg-stone-100 text-center shadow-sm sm:h-[72px] sm:w-[88px]">
          <span className="text-sm font-medium leading-none text-slate-600">Route</span>
          <span className="mt-1 text-xl font-bold leading-none text-slate-950">
            {STOPS.length - 1}
          </span>
        </div>
        <div>
          <h2 className="text-xl font-bold leading-snug text-slate-950 sm:text-2xl">
            West Coast → Canada → East Coast → LAX
          </h2>
          <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
            Campervan coast route, Canada leg, and cross-country flights
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
        <MapContent />
        <Legend />
      </div>
    </div>
  );
}
