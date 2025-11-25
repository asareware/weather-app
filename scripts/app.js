// Cache key DOM elements for this template
var searchForm = document.getElementById("search-form");
var cityInput = document.getElementById("city-input");
var cityPhoto = document.getElementById("city-photo");
var timeLabel = document.getElementById("time-label");
var photoNote = document.getElementById("photo-note");
var cityName = document.getElementById("city-name");
var weatherTemp = document.getElementById("weather-temp");
var weatherSummary = document.getElementById("weather-summary");
var localTime = document.getElementById("local-time");

// Stock photos to distinguish day versus night states
var previewImages = {
  day: "https://images.unsplash.com/photo-1496588152823-e89e7b4779b5?auto=format&fit=crop&w=1600&q=80",
  night: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80"
};

// Respond to the search form without calling any API
searchForm.addEventListener("submit", function handleSearch(event) {
  event.preventDefault();

  var query = cityInput.value.trim();

  if (query.length === 0) {
    // Reset to a neutral state when nothing is typed
    applyPreviewState("City name", "Country name", "Weather description", "72", "22", "Local time");
    return;
  }

  // Populate the card with placeholder values that use the user's query
  applyPreviewState(query, "Country name placeholder", "Weather summary placeholder", "72", "22", buildLocalTimeString());
});

// Choose a day or night image based on the visitor's current time
function selectPreviewImage() {
  var currentHour = new Date().getHours();
  var isDaytime = currentHour >= 6 && currentHour < 18;

  if (isDaytime) {
    return {
      url: previewImages.day,
      label: "Day preview"
    };
  }

  return {
    url: previewImages.night,
    label: "Night preview"
  };
}

// Apply placeholder values to the UI to show the layout
function applyPreviewState(cityValue, countryValue, weatherValue, tempFValue, tempCValue, timeValue) {
  var photoChoice = selectPreviewImage();
  var cityCountry = cityValue + ", " + countryValue;

  cityPhoto.style.backgroundImage = "url('" + photoChoice.url + "')";
  timeLabel.textContent = photoChoice.label;
  photoNote.textContent = "Static photo. Replace with a city image service.";

  cityName.textContent = cityCountry;
  weatherTemp.textContent = tempFValue + "°F / " + tempCValue + "°C";
  weatherSummary.textContent = weatherValue;
  localTime.textContent = timeValue;
}

// Format a readable time for the preview card
function buildLocalTimeString() {
  var now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Initialize the preview card on load
applyPreviewState("Accra", "Ghana", "Partly cloudy preview", "82", "28", buildLocalTimeString());
