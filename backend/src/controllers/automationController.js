const AutomationService = require('../services/automationService');

//settings
const settings = require('../../settings');

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

exports.startAutomation = async (req, res) => {
  const { id } = req.query;
  if (settings.TASKS.length > 0) {
    const currentTask = settings.TASKS.filter((t) => t.id == id)[0];
    if (currentTask) {
      console.log('starting task again...');
      currentTask.task.start();
      console.log('task started');
      res.status(200).send({ msg: 'task started', id });
    } else {
      res.status(200).send({ msg: 'task not found on the list' });
    }
  } else {
    console.log('no running task, creating new one...');
    const service = new AutomationService();
    const result = await service.startAutomationTask(id);
    res.status(200).send({ msg: 'task is not on the list, starting again', id: result._id });
  }
};

exports.stopAutomation = (req, res) => {
  const { id } = req.query;
  const currentTask = settings.TASKS.filter((t) => t.id == id)[0];
  if (currentTask) {
    console.log('stopping task...');
    currentTask.task.stop();
    console.log('task stop');
    res.status(200).send({ msg: 'task stop', id });
  } else {
    res.status(200).send({ msg: 'task not found on the list' });
  }
};
