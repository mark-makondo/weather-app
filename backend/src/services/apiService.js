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

  async getAppById(_id) {
    try {
      return await this.apis.findById({ _id });
    } catch (error) {
      console.error('error', error);
      return null;
    }
  }

  /**
   *
   * @param {*} appId
   * @param {*} methodTitle
   * @returns
   */
  async getApiMethod(appId, methodTitle) {
    try {
      const api = await this.apis.findById({ _id: appId });
      const selectedMethod = api.methods.find((m) => m.title === methodTitle);
      return selectedMethod;
    } catch (error) {
      console.error('error', error);
      return null;
    }
  }
}

module.exports = ApiService;
