const PuppeteerService = require('../services/puppeteerService.js');

exports.start = async (req, res) => {
  try {
    const URI = 'https://openweathermap.org/current';

    const service = new PuppeteerService();

    await service.startBrowser(URI);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
};

exports.getApi = async (req, res) => {
  try {
    const service = new PuppeteerService();

    await service.queryDOM();
    // await puppeteerService.client.reset();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
};
