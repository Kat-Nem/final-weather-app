let now = new Date();
console.log(now);
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
let month = now.getMonth();
if (month < 10) {
    month = `0${month}`;
}
let year = now.getFullYear();

let dayAndDate = document.getElementById("day-and-date");
let time = document.getElementById("time");
dayAndDate.innerHTML = `${day} ${date}/${month}/${year}`;
time.innerHTML = `${hours}:${minutes}`;

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
    console.log(response);
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
        axios.get(urlGeolocation).then(displayWeatherByGeolocation);
    }
    navigator.geolocation.getCurrentPosition(handlePosition);
});

window.onload = function(event) {
    event.preventDefault();

    function handlePosition(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let apiKey = "3975788e63c7f2d707103c2c24ee6bb0";
        let urlGeolocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        axios.get(urlGeolocation).then(displayWeatherByGeolocation);
    }
    navigator.geolocation.getCurrentPosition(handlePosition);
};

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
console.log(celsiusTemperature);
let fahrenheitLink = document.getElementById("fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.getElementById("celsius");
celsiusLink.addEventListener("click", convertToCelsius);