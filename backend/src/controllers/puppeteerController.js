const PuppeteerService = require('../services/puppeteerService.js');

// settings
const settings = require('../../settings');

const { OPEN_WEATHER_DOC } = settings;

exports.start = async (req, res) => {
  try {
    const service = new PuppeteerService();

    await service.startBrowser();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
};

exports.getApi = async (req, res) => {
  try {
    const URI = OPEN_WEATHER_DOC;
    const service = new PuppeteerService();

    const data = await service.queryDOM(URI);

    await service.puppeteer.reset();

    res.status(200).send(data);
  } catch (error) {
    console.error(error);
  }
};
