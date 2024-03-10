const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "3c747250846fc97b5e99f5bc3fab7c33";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const getCurrentWeatherByname = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
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

const searchHandler = async () => {
  const cityName = searchInput.value;
  const currentData = await getCurrentWeatherByname(cityName);
  renderCurrentWeather(currentData);
};

searchButton.addEventListener("click", searchHandler);
window.onload = () => {
  searchInput.focus();
};
