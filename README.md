# Itinerary App

A Next.js + React app that displays your trip itinerary from a markdown file. Shows local time, destination time, mock weather, daily activities, flight details, and accommodation for each day.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit Your Itinerary

Edit `content/itinerary.md` with your trip details. Format:

```markdown
---
trip: "Paris Getaway"
destination: "Paris, France"
destinationTimezone: "Europe/Paris"
startDate: "2025-03-15"
---

## Day 1
- **Activity:** Airport transfer, check-in, Seine river cruise
- **Flight:** BA304 LHR 09:00 → CDG 11:45
- **Accommodation:** Hôtel du Louvre, 1 night
```

## Deploy to Vercel

1. Initialize Git and push to GitHub:

   ```bash
   git init
   git add .
   git commit -m "Initial commit: itinerary app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/itinerary-app.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → Import Git Repository
3. Select your `itinerary-app` repo
4. Vercel auto-detects Next.js — click Deploy
