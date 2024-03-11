const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "3c747250846fc97b5e99f5bc3fab7c33";
const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const locationIcon = document.getElementById("location");

const getCurrentWeatherByname = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const getCurrentWeatherByCoordinates = async (lat, lon) => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const getForecastWeatherByCoordinates = async (lat, lon) => {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const getForecastWeatherByname = async (city) => {
  const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const renderCurrentWeather = (data) => {
  const weatherJSX = `
    <h1>${data.name},${data.sys.country}</h1>
    <div id = "main">
        <img alt = "${
          data.weather[0].main
        }" src ="https://api.openweathermap.org/img/w/${
    data.weather[0].icon
  }.png" >
        <span>${data.weather[0].main}</span>        
        <p>${Math.round(data.main.temp)} °C</p>
    </div>
    <div id = "info">
        <p>Humidity: <span>${data.main.humidity} %</span></p>
        <p>Wind Speed: <span>${data.wind.speed} m/s</span></p>

    </div>
    `;

  weatherContainer.innerHTML = weatherJSX;
};

const renderForecastWeather = (data) => {
  forecastContainer.inn`erHTML = "";
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  data.forEach((i) => {
    const forecastJSX = `
      <div>
        <img alt = "${i.weather[0].main}" 
        src ="https://api.openweathermap.org/img/w/${i.weather[0].icon}.png"/>
        <h3>${DAYS[new Date(i.dt * 1000).getDay()]}</h3>
        <p>${Math.round(i.main.temp)} °C</p>
        <span>${i.weather[0].main}</span>
      </div>
    `;
    forecastContainer.innerHTML += forecastJSX;
  });
};

const searchHandler = async () => {
  const cityName = searchInput.value;
  if (!cityName) {
    alert("pls add city name");
  }
  const currentData = await getCurrentWeatherByname(cityName);
  const forecastData = await getForecastWeatherByname(cityName);
  renderCurrentWeather(currentData);
  renderForecastWeather(forecastData);
};

const positionCallback = async (position) => {
  const { latitude, longitude } = position.coords;
  const currentData = await getCurrentWeatherByCoordinates(latitude, longitude);
  renderCurrentWeather(currentData);
  const forecastData = await getForecastWeatherByCoordinates(
    latitude,
    longitude
  );
  renderForecastWeather(forecastData);
};
const errorCallback = (error) => {
  console.log(error.message);
};

const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    alert("you'r Browser Doesn't Support Geolocation");
  }
};

searchButton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locationHandler);
window.onload = () => {
  searchInput.focus();
};
