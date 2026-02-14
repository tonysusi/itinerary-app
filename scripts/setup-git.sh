#!/bin/sh
# Run this script to initialize Git and prepare for first push to GitHub.
# Replace YOUR_USERNAME with your GitHub username before pushing.

set -e
cd "$(dirname "$0")/.."

git init
git add .
git commit -m "Initial commit: itinerary app"
git branch -M main

echo ""
echo "Next steps:"
echo "1. Create a new repository on GitHub named 'itinerary-app'"
echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/itinerary-app.git"
echo "3. Run: git push -u origin main"
echo "4. Import the repo at vercel.com to deploy"
