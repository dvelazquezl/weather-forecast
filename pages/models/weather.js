const placeholderData = {
  current: {
    temp: 20,
    feels_like: 22,
    weather: [{ description: "clear sky", icon: "01d" }],
    humidity: 50,
    wind_speed: 5,
  },
};

class Weather {
  constructor(apiResponse = placeholderData) {
    this.temperature = Math.round(apiResponse.current.temp);
    this.feelsLike = Math.round(apiResponse.current.feels_like);
    this.description = apiResponse.current.weather[0].description;
    this.icon = apiResponse.current.weather[0].icon;
    this.humidity = apiResponse.current.humidity;
    this.windSpeed = Math.round(apiResponse.current.wind_speed * 3.6);
  }
  getIconImage() {
    return `https://openweathermap.org/img/wn/${this.icon}@2x.png`;
  }
}

export default Weather;
