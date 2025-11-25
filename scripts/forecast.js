// Mock forecast service. Swap this out with your real API client.
const sampleForecast = {
  location: "Accra, Ghana",
  current: {
    temp: 28,
    feelsLike: 30,
    humidity: 68,
    wind: "12 km/h SW",
    conditions: "Partly cloudy"
  },
  forecast: [
    { day: "Today", high: 30, low: 25, conditions: "Partly cloudy" },
    { day: "Tomorrow", high: 31, low: 24, conditions: "Sun and clouds" },
    { day: "Wed", high: 29, low: 23, conditions: "Passing showers" },
    { day: "Thu", high: 28, low: 22, conditions: "Scattered storms" },
    { day: "Fri", high: 30, low: 24, conditions: "Sunny intervals" }
  ]
};

export async function getForecast(location) {
  const safeLocation = location && location.trim() ? location.trim() : sampleForecast.location;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...sampleForecast,
        location: safeLocation,
        updatedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      });
    }, 450);
  });
}
