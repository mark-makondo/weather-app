const AutomationService = require('../services/automationService');

exports.createAutomation = async (req, res) => {
  try {
    const { data } = req.body;
    const service = new AutomationService();
    const automation = await service.add(data);
    res.sendStatus(200);
  } catch (error) {
    console.error('create automation error');
    res.status(400).send({ error: error.message });
  }
};
