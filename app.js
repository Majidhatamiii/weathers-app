const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "3c747250846fc97b5e99f5bc3fab7c33";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");

const getCurrentWeatherByname = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const searchHandler = async () => {
  const cityName = searchInput.value;

  const currentData = await getCurrentWeatherByname(cityName);
  console.log(currentData);
};

searchButton.addEventListener("click", searchHandler);
