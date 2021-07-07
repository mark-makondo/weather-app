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

// app.get('/task/start', (req, res) => {
//   const { id } = req.query;
//   // task.start();
//   if (settings.TASKS.length > 0) {
//     console.log('starting task again...');
//     const currentTask = settings.TASKS.filter((t) => t.id == id)[0];
//     // console.log(id, currentTask, settings.TASKS);
//     if (currentTask) {
//       currentTask.task.start();
//       console.log('task started');
//       res.status(200).send({ msg: 'task started', id });
//     } else {
//       res.status(200).send({ msg: 'task not found on the list' });
//     }
//   } else {
//     console.log('no running task');
//     res.status(200).send('no running task to start');
//   }
// });

// app.get('/task/stop', (req, res) => {
//   const { id } = req.query;
//   console.log('stopping task...');
//   // // task.stop();
//   const currentTask = settings.TASKS.filter((t) => t.id == id)[0];
//   // console.log(id, currentTask, settings.TASKS);
//   if (currentTask) {
//     currentTask.task.stop();
//     console.log('task stop');
//     res.status(200).send({ msg: 'task stop', id });
//   } else {
//     res.status(200).send({ msg: 'task not found on the list' });
//   }
// });

mongoose.run(app, PORT);
