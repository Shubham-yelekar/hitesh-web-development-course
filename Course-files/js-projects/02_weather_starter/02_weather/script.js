document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const infoBox = document.getElementById("weather-info");
  const infoCityName = document.getElementById("city-name");
  const infoTemperature = document.getElementById("temperature");
  const infoDesc = document.getElementById("description");
  const errorMsg = document.getElementById("error-message");

  const key = "2543f1531048a69f0e877d023419de69";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
      return;
    }
    try {
      const weatherData = await fetchWeatherData(city);
      DisplayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
    console.log(city);
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City Not Found");
    }

    const data = await response.json();
    return data;
  }

  function DisplayWeatherData(data) {
    console.log(data);
    const { name, main, weather } = data;
    infoCityName.textContent = name;
    infoTemperature.textContent = main.temp;
    infoDesc.textContent = weather[0].description;

    weatherInfo.classList.remove("hidden");
    errorMsg.classlist.add("hidden");
  }

  function showError() {
    infoBox.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  }
});
