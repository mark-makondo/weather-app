const PuppeteerService = require('../services/puppeteerService.js');

exports.start = async (req, res) => {
  try {
    const URI = 'https://openweathermap.org/current';

    const puppeteerService = new PuppeteerService();

    await puppeteerService.startBrowser(URI);

    // res.status(200).send(result);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
};
