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
    // if already created instance - dont created again instead call previous instance #for singleton
    if (Puppeteer.instance instanceof Puppeteer) {
      return Puppeteer.instance;
    }

    // added singleton
    this.puppeteerObject = {
      browser: null,
      page: null,
      pages: [],
      browsers: [],
      users: [],
    };

    // cant modified the instance that created #for singleton
    Object.freeze(this);

    // global - key #for singleton
    Puppeteer.instance = this;
  }
  get(key) {
    return this.puppeteerObject[key];
  }

  set(key, value) {
    this.puppeteerObject[key] = value;
  }

  async start() {
    try {
      let browserOption = this.#browserOption;

      const data = await puppeteer.launch(browserOption);

      this.set('browser', data);
    } catch (error) {
      console.error(error);
    }
  }

  async setPage(URI) {
    try {
      let pageOption = this.#pageOption;

      const browser = this.get('browser');

      const page = await browser.pages();

      await page[0].goto(URI, pageOption);

      return page[0];
    } catch (error) {
      console.error(error);
    }
  }

  async newPage(URI) {
    try {
      const pageOption = this.#pageOption;

      const page = await this.get('browser').newPage()[0];

      await page.goto(URI, pageOption);
    } catch (error) {
      console.error(error);
    }
  }

  async reset() {
    try {
      await this.get('browser').close();
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Puppeteer;
