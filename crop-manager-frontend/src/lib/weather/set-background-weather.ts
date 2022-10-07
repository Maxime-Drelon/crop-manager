import WeatherTypes from "$lib/types/weather";
import { weatherState } from "../../store";
import WeatherDataManager from "./weather-data-manager"
const dataManager = new WeatherDataManager({APIKey: "ba3a5ca3cf74095a4b31ec27f3c5cb2b"});

const updateWeather = async () => {
    await dataManager.getCurrentWeather({city: "Paris"});
    dataManager.setIcon();
}

const startRain = () => {
    weatherState.set(WeatherTypes.raining);
}

const setBackgroundWeather = (scene: THREE.Scene) => {
    updateWeather();
    startRain();
    // Update weather every 2 minutes
    window.setInterval(updateWeather, 120000);
}

export default setBackgroundWeather;