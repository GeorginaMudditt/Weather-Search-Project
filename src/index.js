function updateDate(response) {
  let now = new Date();

  let dayElement = document.querySelector("#day");
  let dateElement = document.querySelector("#date");
  let monthElement = document.querySelector("#month");
  let timeElement = document.querySelector("#time");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let date = now.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let hours = now.getHours();
  let minutes = now.getMinutes().toString().padStart(2, "0");

  dayElement.innerHTML = day;
  dateElement.innerHTML = date;
  monthElement.innerHTML = month;
  timeElement.innerHTML = `${hours}:${minutes}`;
}

function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-temp-celsius");
  let summaryElement = document.querySelector("#summary");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = `${Math.round(
    response.data.temperature.current
  )}°C`;
  summaryElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-weather-icon"></img>`;
}

function searchACity(city) {
  let apiKey = "21f1caaedf3t0e238fc991db4d2f34bo";
  let encodedCity = encodeURIComponent(city);
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${encodedCity}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(updateWeather)
    .catch(function (error) {
      alert(
        "Sorry, we couldn't find the weather for this city. Please try again."
      );
    });
}

function enterACity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  let city = cityInputElement.value;
  let cityElement = document.querySelector("#city-name");

  cityElement.innerHTML = city;
  searchACity(city);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", enterACity);

searchACity("London");
updateDate();

function getForecast(city) {
  let apiKey = "21f1caaedf3t0e238fc991db4d2f34bo";
  let encodedCity = encodeURIComponent(city);
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${encodedCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
        <div class="forecast-container">
            <div class="forecast-day">
                <p>${day}</p>
                <div id="forecast-icon">🌤️</div>
                <p>min: <span class="min-temp">12</span>°C<br />
                    max: <span class="max-temp">21</span>°C
                </p>    
            </div>
        </div>
   `;
  });
  forecastElement.innerHTML = forecastHtml;
}

getForecast("London");
displayForecast();
