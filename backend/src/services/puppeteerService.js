const Puppeteer = require('../config/puppeteer');

class PuppeteerService {
  constructor() {
    this.puppeteer = new Puppeteer();
  }

  async startBrowser() {
    try {
      await this.puppeteer.start();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @param {URI} URI
   * @returns Open Weather APIs
   */
  async queryDOM(URI) {
    try {
      let organizedData = [];

      const page = await this.puppeteer.setPage(URI);

      const sections = await page.$$('section#one section');
      const sectionsLength = sections.length;

      for (let i = 0; i < sectionsLength; i++) {
        const title = await sections[i].$eval('h3', (title) => title.innerText);
        const api = await sections[i].$$eval('.api', (apis) => apis.map((api) => api.innerText));
        const params = await sections[i].$$eval('table tr', (rows) => rows.map((row) => row.innerText));

        organizedData.push({
          title,
          api,
          params,
        });
      }

      return organizedData;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = PuppeteerService;
