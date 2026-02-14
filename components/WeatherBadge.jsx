const ICONS = {
  sun: "☀️",
  "cloud-sun": "⛅",
  cloud: "☁️",
  "cloud-rain": "🌧️",
  moon: "🌙",
};

export default function WeatherBadge({ weather }) {
  if (!weather) return null;

  const { temp, condition, icon } = weather;
  const emoji = ICONS[icon] || "🌤️";

  return (
    <div className="inline-flex items-center gap-2 rounded-lg bg-sky-50 px-3 py-2 text-sky-800">
      <span className="text-xl">{emoji}</span>
      <div>
        <span className="font-semibold">{temp}°C</span>
        <span className="ml-2 text-sm text-sky-600">{condition}</span>
      </div>
    </div>
  );
}
