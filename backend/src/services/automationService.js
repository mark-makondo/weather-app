// model
const AutomationModel = require('../models/AutomationModel');

class AutomationService {
  constructor() {
    this.model = AutomationModel;
  }

  async add(data) {
    try {
      //manipulate data and add endpoint
      return await this.model.create({ data });
    } catch (error) {
      console.error('error', error);
      return null;
    }
  }
}

module.exports = AutomationService;
