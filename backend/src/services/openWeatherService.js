const Puppeteer = require('../config/puppeteer');

// model
const ScrapedApi = require('../models/ScrapedApiModel');

class OpenWeatherService {
  constructor() {
    this.puppeteer = new Puppeteer();
    this.apis = ScrapedApi;
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
  async queryDOM(URI, start = true) {
    try {
      start && (await this.startBrowser());

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

      const data = this.dataOrganizer(organizedData);

      await this.saveToDb(data);

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Split required and optional from scraped innerText table with \t
   *
   * @param {Array} array
   * @returns {Object} Formatted object to be save to database
   */
  dataOrganizer(array) {
    let newData = [];

    array.forEach((data) => {
      let optionalParams = [];
      let requiredParams = [];

      data.params.forEach((param) => {
        if (!param.includes('\t')) return;

        const split = param.split('\t');

        if (split.includes('required')) requiredParams.push(split);
        else if (split.includes('optional')) optionalParams.push(split);
      });

      newData.push({
        title: data.title,
        api: data.api,
        required: requiredParams,
        optional: optionalParams,
      });
    });

    return newData;
  }

  async saveToDb(data) {
    const scrapedApi = new ScrapedApi({
      name: 'Open Weather',
      methods: data,
      baseEndpoint: 'http://api.openweathermap.org/data/2.5/weather?',
    });

    await scrapedApi.save().catch((err) => console.error(err));
  }
}

module.exports = OpenWeatherService;
