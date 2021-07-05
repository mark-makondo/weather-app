const nodemailer = require('nodemailer');

class EmailSender {
  #service = process.env.EMAIL_SERVICE;
  #email = process.env.EMAIL_USERNAME;
  #password = process.env.EMAIL_PASSWORD;
  #transporter = null;

  #transportOptions = {
    service: this.#service,
    auth: {
      user: this.#email,
      pass: this.#password,
    },
  };

  constructor() {
    this.#transporter = nodemailer.createTransport(this.#transportOptions);
  }

  send({ sendTo, subject, htmlMessage }) {
    console.log('sending email...');
    const mailOptions = {
      from: this.#email,
      to: sendTo,
      subject: subject,
      html: htmlMessage,
    };
    this.#transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else console.log('successfully sent!');
    });
  }
}

module.exports = EmailSender;
