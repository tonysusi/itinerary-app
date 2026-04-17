"use client";

import { useEffect, useState } from "react";

/**
 * Trip Map Component using OpenStreetMap via Leaflet
 * Shows routes:
 * 1. Road route: LA to Seattle (via coast)
 * 2. Flight: Vancouver to Toronto to Boston
 * 3. Flight: Boston to LA
 */

// City coordinates [lat, lng]
const CITIES = {
  LA: { coords: [34.0522, -118.2437], label: "Los Angeles" },
  SF: { coords: [37.7749, -122.4194], label: "San Francisco" },
  Seattle: { coords: [47.6062, -122.3321], label: "Seattle" },
  Vancouver: { coords: [49.2827, -123.1207], label: "Vancouver" },
  Toronto: { coords: [43.6532, -79.3832], label: "Toronto" },
  Boston: { coords: [42.3601, -71.0589], label: "Boston" },
};

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
      <div className="flex items-center justify-center h-[400px] bg-slate-100 rounded-lg">
        <p className="text-slate-500">Loading map...</p>
      </div>
    );
  }

  const { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip } = ReactLeaflet;

  // Road route coordinates (LA → SF → Seattle along coast)
  const roadRoute = [
    CITIES.LA.coords,
    [34.4208, -119.6982], // Santa Barbara
    [35.2828, -120.6596], // San Luis Obispo
    [36.6002, -121.8947], // Monterey
    CITIES.SF.coords,
    [38.4404, -122.7141], // Santa Rosa
    [40.7990, -124.1636], // Eureka
    [42.3265, -122.8756], // Medford
    [44.0521, -123.0868], // Eugene
    [45.5051, -122.6750], // Portland
    CITIES.Seattle.coords,
  ];

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
    ...generateArc(CITIES.Vancouver.coords, CITIES.Toronto.coords, 25, 0.12),
    ...generateArc(CITIES.Toronto.coords, CITIES.Boston.coords, 15, 0.08),
  ];

  const flightBostonLA = generateArc(CITIES.Boston.coords, CITIES.LA.coords, 30, 0.10);

  // Custom icon for markers
  const createIcon = () => {
    return L.divIcon({
      className: "custom-marker",
      html: '<div style="width: 12px; height: 12px; background: white; border: 2px solid #1F2937; border-radius: 50%;"></div>',
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });
  };

  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={4}
      style={{ height: "400px", width: "100%" }}
      scrollWheelZoom={false}
      className="rounded-lg z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Road route - LA to Seattle (blue dashed) */}
      <Polyline
        positions={roadRoute}
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

      {/* Flight route - Boston to LA (orange) */}
      <Polyline
        positions={flightBostonLA}
        pathOptions={{
          color: "#F59E0B",
          weight: 3,
          opacity: 0.8,
        }}
      />

      {/* City markers */}
      {Object.entries(CITIES).map(([key, city]) => (
        <CircleMarker
          key={key}
          center={city.coords}
          radius={8}
          pathOptions={{
            color: "#1F2937",
            weight: 2,
            fillColor: "white",
            fillOpacity: 1,
          }}
        >
          <Tooltip permanent direction="top" offset={[0, -10]} className="city-label">
            {city.label}
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

function Legend() {
  return (
    <div className="absolute bottom-4 right-4 bg-white/95 rounded-lg shadow-md p-3 z-[1000]">
      <p className="text-xs font-semibold text-slate-700 mb-2">Routes</p>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-blue-500" style={{ backgroundImage: "repeating-linear-gradient(90deg, #3B82F6 0, #3B82F6 6px, transparent 6px, transparent 10px)" }}></div>
          <span className="text-xs text-slate-600">LA → Seattle (road)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-emerald-500"></div>
          <span className="text-xs text-slate-600">VAN → YYZ → BOS</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-amber-500"></div>
          <span className="text-xs text-slate-600">BOS → LA (return)</span>
        </div>
      </div>
    </div>
  );
}

export default function TripMap() {
  return (
    <div className="mb-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Trip Route</h2>
      <div className="relative">
        <MapContent />
        <Legend />
      </div>
    </div>
  );
}
