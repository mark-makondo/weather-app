require('dotenv').config();

const puppeteerRoutes = require('./routers/puppeteerRoutes');

const cors = require('cors');
const express = require('express');

// const cron = require('node-cron');
// const fetch = require('node-fetch');
const Scheduler = require('./config/scheduler');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/puppeteer', puppeteerRoutes);

const sched = new Scheduler();
sched.schedule();

// cron.schedule('* * * * *', () => {
//   //   console.log('running a task every minute ' + new Date().toISOString());
//   fetch('https://api.openweathermap.org/data/2.5/weather?q=Manila&appid=eec5077e47c16806527430b6711b06a5')
//     .then((res) => res.json())
//     .then((json) => console.log(json));
// });

app.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));
