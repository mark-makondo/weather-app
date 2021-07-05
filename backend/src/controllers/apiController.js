const OpenWeatherService = require('../services/openWeatherService');
const ApiService = require('../services/apiService');

// settings
const settings = require('../../settings');

const { OPEN_WEATHER_DOC } = settings;

exports.scrapeApi = async (req, res) => {
  try {
    const { name } = req.query;

    let data;

    switch (name) {
      case 'openWeather':
        const URI = OPEN_WEATHER_DOC;
        const service = new OpenWeatherService();

        await service.queryDOM(URI);
        await service.puppeteer.reset();

        break;
      default:
        break;
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
};

exports.apis = async (req, res) => {
  const type = req.query;

  const service = new ApiService();

  const data = await service.getApis(!!type.id && type.id).catch((err) => console.error(err));

  res.status(200).send(data);
};
