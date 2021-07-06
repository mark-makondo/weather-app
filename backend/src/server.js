require('dotenv').config();

const puppeteerRoutes = require('./routers/puppeteerRoutes');

const cors = require('cors');
const express = require('express');

const Mongoose = require('./config/mongodb');
const Scheduler = require('./config/scheduler');

const mongoose = new Mongoose();
const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/puppeteer', puppeteerRoutes);

// const sched = new Scheduler();
// const task = sched.scheduleTask();

app.get('/task/start', (req, res) => {
  console.log('starting task...');
  task.start();
  console.log('done');
  res.send('task start');
});

app.get('/task/stop', (req, res) => {
  console.log('stopping task...');
  task.stop();
  console.log('done');
  res.send('task stop');
});

mongoose.run(app, PORT);
