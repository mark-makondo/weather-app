// model
const ResultModel = require('../models/ResultModel');

class ResultService {
  constructor() {
    this.model = ResultModel;
  }
  async add({ app, methodUsed, data }) {
    try {
      return await this.model.create({ app, methodUsed, data });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ResultService;
