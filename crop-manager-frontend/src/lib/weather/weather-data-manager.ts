class WeatherDataManager {
	private static _instance: WeatherDataManager;
	APIKey: string;
	baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    currentWeather: Map<string, any> = new Map();
	// ba3a5ca3cf74095a4b31ec27f3c5cb2b

	public constructor({ APIKey }: { APIKey: string }) {
		this.APIKey = APIKey;
	}

	public static get getInstance() {
		return this._instance;
	}

	public async getCurrentWeather({ city }: { city: string }): Promise<Map<string, any> | void> {
		try {
			const response = await fetch(`${this.baseUrl}?q=${city}&appid=${this.APIKey}&lang=fr`, { method: 'GET' });
			if (response.status == 200) {
				this.currentWeather = await response.json();
				return this.currentWeather;
			} else {
				console.error('Error while fetching weather data');
			}
		} catch (e) {
			console.error('Error executing getCurrentWeather in weather/weather_data_manager.ts', e);
		}
	}

	public setIcon(): void {
		(document.getElementById('wicon') as HTMLImageElement).src = `http://openweathermap.org/img/wn/${this.currentWeather['weather'][0]['icon']}@2x.png`;
	}
}

export default WeatherDataManager;
