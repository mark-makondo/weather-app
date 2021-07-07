// model
const ResultModel = require('../models/ResultModel');

class ResultService {
  constructor() {
    this.model = ResultModel;
  }
  async add({ app, data }) {
    try {
      return await this.model.create({ app, data });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ResultService;
