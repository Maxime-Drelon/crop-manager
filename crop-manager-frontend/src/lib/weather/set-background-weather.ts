import WeatherDataManager from "./weather-data-manager"
const dataManager = new WeatherDataManager({APIKey: "ba3a5ca3cf74095a4b31ec27f3c5cb2b"});

const updateWeather = async () => {
    await dataManager.getCurrentWeather({city: "Paris"});
    dataManager.setIcon();
}

const setBackgroundWeather = () => {
    updateWeather();
    // Update weather every 2 minutes
    window.setInterval(updateWeather, 120000);
}

export default setBackgroundWeather;