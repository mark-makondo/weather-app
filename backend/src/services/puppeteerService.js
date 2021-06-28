const Puppeteer = require('../config/puppeteer');

class PuppeteerService {
  constructor() {
    this.client = null;
  }

  startBrowser = async (URI) => {
    try {
      let puppeteer = new Puppeteer();

      this.client = puppeteer;

      await puppeteer.start(URI);
      console.log(this.client);
    } catch (error) {
      console.error(error);
    }
  };

  queryDOM = async () => {
    try {
      let { browser } = this.client;
      console.log(browser);
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = PuppeteerService;
