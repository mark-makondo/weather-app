require('dotenv').config();

const puppeteerRoutes = require('./routers/puppeteerRoutes');
const automationRoutes = require('./routers/automationRoutes');

const cors = require('cors');
const express = require('express');

const Mongoose = require('./config/mongodb');
const Scheduler = require('./config/scheduler');

//settings
const settings = require('../settings');

const mongoose = new Mongoose();
const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/puppeteer', puppeteerRoutes);
app.use('/automation', automationRoutes);

// const sched = new Scheduler();
// const task = sched.scheduleTask();

app.get('/task/start', (req, res) => {
  console.log('starting task again...');
  // task.start();
  if (settings.TASKS.length > 0) {
    settings.TASKS[0].task.start();
    console.log('done');
    res.send('task start');
  } else {
    console.log('no running task');
    res.send('no running task to start');
  }
});

app.get('/task/stop', (req, res) => {
  console.log('stopping task...');
  // task.stop();
  settings.TASKS[0].task.stop();
  console.log('done');
  res.send('task stop');
});

mongoose.run(app, PORT);
