// formatting date, days and time
let now = new Date();
let hours = now.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}
let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];
let day = days[now.getDay()];
let date = now.getDate();
if (date < 10) {
    date = `0${date}`;
}
let month = now.getMonth() + 1;
if (month < 10) {
    month = `0${month}`;
}
let year = now.getFullYear();

let dayAndDate = document.getElementById("day-and-date");
let time = document.getElementById("time");
dayAndDate.innerHTML = `${day} ${date}/${month}/${year}`;
time.innerHTML = `${hours}:${minutes}`;

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let dayNumber = date.getDay();
    let day = days[`${dayNumber}`];
    return `${day}`;
}

// display weather and forecast by city name
function displayWeatherByCity(response) {
    let displayedCity = document.getElementById("displayed-city");
    let currentTemperature = document.getElementById("current-temperature");
    let sky = document.getElementById("sky");
    let humidity = document.getElementById("humidity");
    let wind = document.getElementById("wind");
    displayedCity.innerHTML = `${response.data.name}`;
    currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}`;
    sky.innerHTML = `${response.data.weather[0].description}`;
    humidity.innerHTML = `${response.data.main.humidity}`;
    wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
    let todayIcon = document.getElementById("today-icon");
    todayIcon.setAttribute(
        "src",
        `src/weather icons/png/${response.data.weather[0].icon}.png`
    );
    celsiusTemperature = Math.round(response.data.main.temp);
}

let form = document.getElementById("search-engine-form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let searchedCity = document.getElementById("searched-city");
    let apiKey = "3975788e63c7f2d707103c2c24ee6bb0";
    let urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&appid=${apiKey}&units=metric`;
    axios.get(urlCity).then(displayWeatherByCity);
});

function displayForecast(response) {
    let forecastElement = document.getElementById("forecast");
    forecastElement.innerHTML = null;
    for (let index = 1; index < 6; index++) {
        let forecast = response.data.daily[index];
        forecastElement.innerHTML += ` <div class="col">
                <ul>
                    <li>${formatDay(forecast.dt)}</li>
                    <li id="forecast-temperature-text"><span id="forecast-temperature">${Math.round(
                      forecast.temp.day
                    )}</span>°C</li>
                    <li><img src="src/weather icons/png/${
                      forecast.weather[0].icon
                    }.png" alt="weather icon" class="forecast-icon"></li>
                </ul>
            </div>
    `;
    }
}

// display weather and forecast by local coordinates - using displayForecast function from above
function getSearchedCityCoords(response) {
    let lon = response.data.coord.lon;
    let lat = response.data.coord.lat;
    let apiKey = "3975788e63c7f2d707103c2c24ee6bb0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    let searchedCity = document.getElementById("searched-city");
    let apiKey = "3975788e63c7f2d707103c2c24ee6bb0";
    let urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&appid=${apiKey}&units=metric`;
    axios.get(urlCity).then(getSearchedCityCoords);
});

function displayWeatherByGeolocation(response) {
    let displayedCity = document.getElementById("displayed-city");
    let currentTemperature = document.getElementById("current-temperature");
    let sky = document.getElementById("sky");
    let humidity = document.getElementById("humidity");
    let wind = document.getElementById("wind");
    displayedCity.innerHTML = `${response.data.name}`;
    currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}`;
    sky.innerHTML = `${response.data.weather[0].description}`;
    humidity.innerHTML = `${response.data.main.humidity}`;
    wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
    let todayIcon = document.getElementById("today-icon");
    todayIcon.setAttribute(
        "src",
        `src/weather icons/png/${response.data.weather[0].icon}.png`
    );
    celsiusTemperature = Math.round(response.data.main.temp);
}

let locationButton = document.getElementById("current-location-button");
locationButton.addEventListener("click", function(event) {
    event.preventDefault();

    function handlePosition(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let apiKey = "3975788e63c7f2d707103c2c24ee6bb0";
        let urlGeolocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        let urlGeolocationForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        axios.get(urlGeolocation).then(displayWeatherByGeolocation);
        axios.get(urlGeolocationForecast).then(displayForecast);
    }
    navigator.geolocation.getCurrentPosition(handlePosition);
});

// displaying weather by local coordinates when screen loads, using functions from above
window.onload = function(event) {
    event.preventDefault();

    function handlePosition(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let apiKey = "3975788e63c7f2d707103c2c24ee6bb0";
        let urlGeolocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        let urlGeolocationForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        axios.get(urlGeolocation).then(displayWeatherByGeolocation);
        axios.get(urlGeolocationForecast).then(displayForecast);
    }
    navigator.geolocation.getCurrentPosition(handlePosition);
};

// converting main displayed temperature to celsius or fahrenheit and modifying classes on links
function convertToFahrenheit(event) {
    event.preventDefault();
    let fahrenheitTemperature = Math.round(celsiusTemperature * (9 / 5) + 32);
    let currentTemperature = document.getElementById("current-temperature");
    currentTemperature.innerHTML = fahrenheitTemperature;

    fahrenheitLink.classList.add("active");
    fahrenheitLink.classList.remove("inactive");
    celsiusLink.classList.add("inactive");
    celsiusLink.classList.remove("active");
}

function convertToCelsius(event) {
    event.preventDefault();
    let currentTemperature = document.getElementById("current-temperature");
    currentTemperature.innerHTML = celsiusTemperature;
    celsiusLink.classList.add("active");
    celsiusLink.classList.remove("inactive");
    fahrenheitLink.classList.add("inactive");
    fahrenheitLink.classList.remove("active");
}
let celsiusTemperature = null;
let fahrenheitLink = document.getElementById("fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.getElementById("celsius");
celsiusLink.addEventListener("click", convertToCelsius);