const Puppeteer = require('../config/puppeteer');

class PuppeteerService {
  constructor() {}

  startBrowser = async (URI) => {
    try {
      const puppeteer = new Puppeteer();

      await puppeteer.start(URI);
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = PuppeteerService;
