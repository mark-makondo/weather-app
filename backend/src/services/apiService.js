// model
const ScrapedApi = require('../models/ScrapedApiModel');

class ApiService {
  constructor() {
    this.apis = ScrapedApi;
  }

  async getApis(id = null) {
    try {
      const apis = await this.apis.find(!!id ? { _id: id } : {}).sort({ createdAt: -1 });
      return apis;
    } catch (error) {
      console.error('error', error);
      return null;
    }
  }

  async getApiEndPoint(appId, methodTitle) {
    try {
      const api = await this.apis.findById({ _id: appId });
      console.log('api', api);
      const selectedMethod = api.methods.find((m) => m.title === methodTitle);
      return selectedMethod.endpoint;
    } catch (error) {
      console.error('error', error);
      return null;
    }
  }
}

module.exports = ApiService;
