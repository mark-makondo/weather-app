const Config = {
  weather: {
    BASE_URI: 'https://api.openweathermap.org/data/2.5/weather',
    API_KEY: process.env.REACT_APP_WEATHER_API_KEY,
  },
  backend: {
    URI: process.env.REACT_APP_BACKEND_SERVER,
  },
};

export default Config;
