function updateTemperature(response) {
  let temperatureElement = document.querySelector("#current-temp-celsius");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
}

function searchACity(city) {
  let apiKey = "21f1caaedf3t0e238fc991db4d2f34bo";
  let encodedCity = encodeURIComponent(city);
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${encodedCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTemperature);
}

function enterACity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  let city = cityInputElement.value;
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = city;
  searchACity(cityInputElement.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", enterACity);

searchACity("London");
