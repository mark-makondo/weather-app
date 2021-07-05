// model
const ScrapedApi = require('../models/ScrapedApiModel');

class ApiService {
  constructor() {
    this.apis = ScrapedApi;
  }

  async getApis(id = null) {
    const apis = await this.apis.find(!!id ? { _id: id } : {}).catch((err) => console.error(err));

    return apis;
  }
}

module.exports = ApiService;
