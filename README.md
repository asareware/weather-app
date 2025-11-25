# Weather App

A lightweight single-page weather UI that lets you search any city in the world and view a snapshot of current conditions plus a quick five-day outlook. The project ships with mock data so you can see the layout instantly; swap in your preferred weather API when ready.

## Project structure
- `index.html` — main page scaffold.
- `styles.css` — styling for the hero, cards, and responsive layout.
- `js/app.js` — client logic for handling searches and rendering results.
- `js/forecast.js` — mock forecast service; replace `getForecast` with real API calls.

## Quick start
1) Open `index.html` directly in your browser for the mock demo, or serve locally (e.g., `python -m http.server`) from the project root.
2) Update `js/forecast.js` with your API integration, then adjust `js/app.js` rendering as needed for the data shape.
