const fetch = require('node-fetch');

class ApiRequest {
  async fetchData(endpoint) {
    try {
      const response = await fetch(endpoint);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log('fetch data error', error);
      return null;
    }
  }
}

module.exports = ApiRequest;
