const puppeteer = require('puppeteer');

class Puppeteer {
  #pageOption = {
    waitUntil: 'networkidle0',
  };
  #browserOption = {
    headless: false,
    args: ['--start-maximized'],
    defaultViewport: null,
  };

  constructor() {
    this.browser = null;
  }

  start = async (URI) => {
    try {
      let pageOption = this.#pageOption;
      let browser = this.browser;
      let browserOption = this.#browserOption;

      browser = await puppeteer.launch(browserOption);

      let page = await browser.pages();

      await page[0].goto(URI, pageOption);
    } catch (error) {
      console.error(error);
    }
  };

  newPage = async (URI) => {
    try {
      const pageOption = this.#pageOption;

      const page = await this.browser.newPage()[0];

      await page.goto(URI, pageOption);
    } catch (error) {
      console.error(error);
    }
  };

  reset = async () => {
    try {
      await this.browser.close();
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = Puppeteer;
