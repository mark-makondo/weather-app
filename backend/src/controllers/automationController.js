const AutomationService = require('../services/automationService');

exports.createAutomation = async (req, res) => {
  try {
    const { data } = req.body;
    const service = new AutomationService();
    const automation = await service.add(data);
    res.status(200).send(automation);
  } catch (error) {
    console.error('create automation error');
    res.status(400).send({ error: error.message });
  }
};

exports.getAllAutomations = async (req, res) => {
  try {
    const service = new AutomationService();
    const data = await service.getAll();
    res.status(200).send(data);
  } catch (error) {
    console.error('create automation error');
    res.status(400).send({ error: error.message });
  }
};
