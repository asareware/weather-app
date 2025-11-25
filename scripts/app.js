import { getForecast } from "./forecast.js";

const form = document.querySelector("#location-form");
const input = document.querySelector("#location-input");
const statusEl = document.querySelector("#status");
const currentEl = document.querySelector("[data-current]");
const forecastEl = document.querySelector("[data-forecast]");
const locationHeading = document.querySelector("#current-location");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = input.value.trim();
  if (!location) {
    setStatus("Please enter a location to search.");
    return;
  }
  loadForecast(location);
});

async function loadForecast(location) {
  setStatus("Loading forecast...");
  try {
    const data = await getForecast(location);
    renderCurrent(data);
    renderForecast(data.forecast);
    setStatus(`Updated ${data.updatedAt || "just now"}`);
  } catch (error) {
    console.error(error);
    setStatus("Could not load forecast. Please try again.");
  }
}

function renderCurrent(data) {
  if (!data || !data.current) {
    currentEl.innerHTML = `<p class="muted">No weather data to show yet.</p>`;
    return;
  }

  locationHeading.textContent = data.location;
  const { temp, feelsLike, humidity, wind, conditions } = data.current;

  currentEl.innerHTML = `
    <div class="current__temp">${temp}&deg;C</div>
    <p>${conditions}</p>
    <div class="pill">Feels like ${feelsLike}&deg;C</div>
    <p class="muted">Humidity: ${humidity}%</p>
    <p class="muted">Wind: ${wind}</p>
  `;
}

function renderForecast(days = []) {
  if (!days.length) {
    forecastEl.innerHTML = `<p class="muted">Add a city to see the five day outlook.</p>`;
    return;
  }

  const cards = days
    .map(
      (day) => `
        <article class="forecast-card">
          <h3>${day.day}</h3>
          <p>${day.conditions}</p>
          <p><strong>${day.high}&deg; / ${day.low}&deg;</strong></p>
        </article>
      `
    )
    .join("");

  forecastEl.innerHTML = cards;
}

// Load a default view for quick preview.
loadForecast("Accra, Ghana");

function setStatus(message) {
  statusEl.textContent = message;
}
