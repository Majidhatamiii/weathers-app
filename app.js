import getWeatherData from "./utils/HttpReq.js";
import { showModal, removeModal } from "./utils/modal.js";
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
const modalButton = document.getElementById("modal-button");
const loader = document.querySelector("loader");

const renderCurrentWeather = (data) => {
  if (!data) return;
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
  if (!data) return;
  forecastContainer.innerHTML = "";
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
    showModal("pls add city name");
    return;
  }
  weatherContainer.prepend(loader);

  const currentData = await getWeatherData("current", cityName);
  renderCurrentWeather(currentData);
  const forecastData = await getWeatherData("forecast", cityName);
  renderForecastWeather(forecastData);
};

const positionCallback = async (position) => {
  const currentData = await getWeatherData("current", position.coords);
  renderCurrentWeather(currentData);
  const forecastData = await getWeatherData("forecast", position.coords);
  renderForecastWeather(forecastData);
};
const errorCallback = (error) => {
  showModal(error.message);
};

const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    showModal("you'r Browser Doesn't Support Geolocation");
  }
};

const initHandler = async () => {
  const currentData = await getWeatherData("current", "tehran");
  renderCurrentWeather(currentData);
  const forecastData = await getWeatherData("forecast", "tehran");
  renderForecastWeather(forecastData);
};

searchButton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locationHandler);
modalButton.addEventListener("click", removeModal);
document.addEventListener("DOMContentLoaded", initHandler);
window.onload = () => {
  searchInput.focus();
};
