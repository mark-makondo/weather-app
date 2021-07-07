const cron = require('node-cron');

const fetch = require('node-fetch');

const EmailSender = require('../services/emailSender');

class Scheduler {
  scheduleTask(callback = null) {
    //run every 10 seconds
    return cron.schedule('*/20 * * * * *', async () => {
      //run every 30 minues
      // cron.schedule('30 * * * * *', async () => {

      if (callback) {
        callback();
      }

      // //fetch openweather result
      // const city = 'Manila';
      // const response = await fetch(
      //   `${process.env.OPEN_WEATHER_URI}/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API}`
      // );
      // const data = await response.json();

      // const emailSender = new EmailSender();
      // const options = {
      //   sendTo: 'vandyke1906@gmail.com',
      //   subject: 'Mini App Result',
      //   htmlMessage: `<h1> Test Message here </h1> </br> <pre>${JSON.stringify(data, null, 2)}</pre>`,
      // };
      // emailSender.send(options);
    });
  }
}

module.exports = Scheduler;
