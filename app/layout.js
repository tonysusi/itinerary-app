import "./globals.css";

export const metadata = {
  title: "Itinerary App",
  description: "Your trip itinerary with times, weather, and daily activities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
