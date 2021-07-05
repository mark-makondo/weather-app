require('dotenv').config();

const puppeteerRoutes = require('./routers/puppeteerRoutes');

const cors = require('cors');
const express = require('express');

const Scheduler = require('./config/scheduler');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/puppeteer', puppeteerRoutes);

const sched = new Scheduler();
sched.schedule();

app.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));
